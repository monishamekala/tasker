#include "db.h"
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

namespace {
    mongocxx::instance inst{};
    mongocxx::client client{mongocxx::uri{"mongodb://localhost:27017"}};
    mongocxx::database database = client["taskmgr"];
}

namespace db {
    void init() {
        // already initialized
    }

    mongocxx::database get_db() {
        return database;
    }
}
