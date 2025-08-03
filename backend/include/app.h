#pragma once
#include <string>

namespace app {
    void initialize();
    void connect_mongo();
    void start_server(int port);
}
