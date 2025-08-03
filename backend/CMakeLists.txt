cmake_minimum_required(VERSION 3.14)
project(TaskManagerBackend)

set(CMAKE_CXX_STANDARD 20)

# Include HTTP and Mongo paths
include_directories(include)

# Add executable
add_executable(task_manager_backend src/main.cpp)

# Link with external libraries if needed (extend here for MongoDB or RocketMQ)
add_executable(task_manager_backend src/main.cpp src/app.cpp)
