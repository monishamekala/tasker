#pragma once
#include <set>
#include <string>
#include <unordered_map>
#include <chrono>

class ORSet {
public:
    void add(const std::string& element, const std::string& tag);
    void remove(const std::string& element, const std::string& tag);
    std::set<std::string> value() const;
    static ORSet merge(const ORSet& a, const ORSet& b);

private:
    std::unordered_map<std::string, std::set<std::string>> adds;
    std::unordered_map<std::string, std::set<std::string>> removes;
};
