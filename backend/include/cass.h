#pragma once
#include <string>

namespace cassandra {
    void init();
    void log_task_event(const std::string& task_id, const std::string& type, const std::string& payload);
}
