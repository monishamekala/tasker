# Workers

This directory contains event-processing workers that consume RocketMQ task events and perform actions like:

- SLA deadline checks
- User notifications
- State reconciliation

## Files

- `event_processor.cpp`: RocketMQ consumer entry point
- `task_sla_checker.cpp`: SLA tracking logic
- `notifier.cpp`: Notification stub

## Build

```bash
make
./worker
