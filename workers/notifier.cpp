#include "notifier.h"
#include <iostream>

void send_notification(const std::string& user_id, const std::string& message) {
    std::cout << "[Notify] Email → " << user_id << "@example.com | " << message << "\n";
    std::cout << "[Notify] Push  → Sent push message to " << user_id << "\n";
}
