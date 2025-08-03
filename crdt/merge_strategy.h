#pragma once
#include <string>
#include <nlohmann/json.hpp>
#include "or_set.h"
#include "lww_register.h"

namespace crdt {
    nlohmann::json merge_task_docs(const nlohmann::json& local, const nlohmann::json& remote);
}
