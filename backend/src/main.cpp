#include "app.h"
#include <iostream>
#include "crow_all.h"
#include "crdt/merge_strategy.h"

int main() {
    std::cout << "[INFO] Starting Real-Time Task Manager Backend\n";

    app::initialize();
    app::connect_mongo();
    app::start_server(8080);

    return 0;
}
