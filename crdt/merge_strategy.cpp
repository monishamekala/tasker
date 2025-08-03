#include "merge_strategy.h"

using json = nlohmann::json;

namespace crdt {

// Merge title and status using LWW strategy
nlohmann::json merge_task_docs(const json& local, const json& remote) {
    json merged;

    auto local_time = std::chrono::system_clock::from_time_t(local["updated_at"]);
    auto remote_time = std::chrono::system_clock::from_time_t(remote["updated_at"]);

    merged["title"] = (remote_time > local_time) ? remote["title"] : local["title"];
    merged["status"] = (remote_time > local_time) ? remote["status"] : local["status"];
    merged["updated_at"] = std::max(remote["updated_at"], local["updated_at"]);

    return merged;
}

}
