#include "task_sla_checker.h"
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <bsoncxx/json.hpp>
#include <chrono>
#include <ctime>

void check_sla_for_task(const std::string& task_id) {
    static mongocxx::instance inst{};
    static mongocxx::client conn{mongocxx::uri{"mongodb://localhost:27017"}};
    auto db = conn["taskmgr"];
    auto coll = db["tasks"];

    auto result = coll.find_one(bsoncxx::builder::stream::document{} << "_id" << task_id << bsoncxx::builder::stream::finalize);

    if (!result) {
        std::cout << "[SLA] Task " << task_id << " not found in MongoDB.\n";
        return;
    }

    auto doc = result->view();
    auto updated_time = std::chrono::system_clock::now(); // fallback

    if (doc["updated_at"]) {
        auto bson_date = doc["updated_at"].get_date();
        updated_time = std::chrono::system_clock::time_point{std::chrono::milliseconds(bson_date.to_int64())};
    }

    auto now = std::chrono::system_clock::now();
    auto age = std::chrono::duration_cast<std::chrono::hours>(now - updated_time).count();

    std::cout << "[SLA] Task " << task_id << " last updated " << age << " hours ago\n";

    if (age > 48) {
        std::cout << "[SLA] Task " << task_id << " is overdue!\n";
    } else {
        std::cout << "[SLA] Task " << task_id << " is within SLA.\n";
    }
}
