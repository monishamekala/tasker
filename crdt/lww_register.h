#pragma once
#include <string>
#include <chrono>

struct LWWRegister {
    std::string value;
    std::chrono::system_clock::time_point timestamp;

    static LWWRegister merge(const LWWRegister& a, const LWWRegister& b);
};
