#pragma once
#include <mongocxx/client.hpp>
#include <mongocxx/database.hpp>

namespace db {
    void init();
    mongocxx::database get_db();
}
