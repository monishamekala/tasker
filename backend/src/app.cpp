#include "app.h"
#include <httplib.h>
#include <nlohmann/json.hpp>
#include <unordered_map>
#include <iostream>

using json = nlohmann::json;
using namespace httplib;

namespace app {

struct Task {
    std::string id;
    std::string title;
    std::string status;
};

std::unordered_map<std::string, Task> tasks;

void initialize() {
    std::cout << "[INIT] App initialized\n";
}

void connect_mongo() {
    std::cout << "[DB] MongoDB stubbed for now\n";
}

void start_server(int port) {
    Server svr;

    // Health check
    svr.Get("/ping", [](const Request&, Response& res) {
        res.set_content("pong", "text/plain");
    });

    // List tasks
    svr.Get("/tasks", [](const Request&, Response& res) {
        json result = json::array();
        for (auto& [id, task] : tasks) {
            result.push_back({{"id", task.id}, {"title", task.title}, {"status", task.status}});
        }
        res.set_content(result.dump(), "application/json");
    });

    // Get task by ID
    svr.Get(R"(/tasks/(\w+))", [](const Request& req, Response& res) {
        auto id = req.matches[1];
        if (tasks.count(id)) {
            auto t = tasks[id];
            res.set_content(json{{"id", t.id}, {"title", t.title}, {"status", t.status}}.dump(), "application/json");
        } else {
            res.status = 404;
            res.set_content("Task not found", "text/plain");
        }
    });

    // Create task
    svr.Post("/tasks", [](const Request& req, Response& res) {
        auto body = json::parse(req.body);
        std::string id = "t" + std::to_string(tasks.size() + 1);
        Task t{id, body["title"], "pending"};
        tasks[id] = t;
        res.status = 201;
        res.set_content(json{{"id", id}}.dump(), "application/json");
    });

    // Update task
    svr.Put(R"(/tasks/(\w+))", [](const Request& req, Response& res) {
        auto id = req.matches[1];
        if (!tasks.count(id)) {
            res.status = 404;
            res.set_content("Task not found", "text/plain");
            return;
        }
        auto body = json::parse(req.body);
        tasks[id].title = body.value("title", tasks[id].title);
        tasks[id].status = body.value("status", tasks[id].status);
        res.set_content(json{{"message", "Task updated"}}.dump(), "application/json");
    });

    // Delete task
    svr.Delete(R"(/tasks/(\w+))", [](const Request& req, Response& res) {
        auto id = req.matches[1];
        if (tasks.erase(id)) {
            res.set_content(json{{"message", "Task deleted"}}.dump(), "application/json");
        } else {
            res.status = 404;
            res.set_content("Task not found", "text/plain");
        }
    });

    // Placeholder for CRDT sync
    svr.Post("/sync", [](const Request& req, Response& res) {
        // TODO: accept CRDT payload and merge
        res.set_content(json{{"message", "Sync endpoint - not implemented"}}.dump(), "application/json");
    });

    // Fetch user role (stubbed)
    svr.Get(R"(/roles/(\w+))", [](const Request& req, Response& res) {
        auto user_id = req.matches[1];
        res.set_content(json{{"user_id", user_id}, {"role", "contributor"}}.dump(), "application/json");
    });

    std::cout << "[HTTP] Server listening on port " << port << "\n";
    svr.listen("0.0.0.0", port);
}

}
