#include "app.h"
#include <iostream>

int main() {
    std::cout << "[INFO] Starting Real-Time Task Manager Backend\n";

    app::initialize();
    app::connect_mongo();
    app::start_server(8080);

    return 0;
}
