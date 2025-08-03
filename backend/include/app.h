#pragma once

#include "crow_all.h"

namespace app {
    extern crow::SimpleApp app;

    void initialize();
    void connect_mongo();
    void start_server(int port);

    void register_crdt_routes();  // <-- Add this
}
