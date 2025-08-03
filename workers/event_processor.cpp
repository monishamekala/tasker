#include <iostream>
#include <thread>
#include <chrono>
#include "task_sla_checker.h"
#include "notifier.h"

// Simulated RocketMQ event stream
void simulate_message_loop() {
    std::cout << "[RocketMQ] Connecting to broker...\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    std::cout << "[RocketMQ] Subscribed to topic: task-events\n";

    std::vector<std::string> task_events = {"t1", "t2", "t3"};

    for (const auto& task_id : task_events) {
        std::cout << "[RocketMQ] Processing event for task: " << task_id << "\n";
        check_sla_for_task(task_id);
        send_notification("user_" + task_id.back(), "SLA check for task " + task_id);
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
}

int main() {
    std::cout << "[Worker] RocketMQ Event Processor started.\n";
    simulate_message_loop();
    return 0;
}
