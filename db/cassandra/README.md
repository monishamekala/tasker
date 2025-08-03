# Cassandra Schema

This directory holds the schema and seed data for the `taskmgr` keyspace.

## Tables

- `task_events_by_id`: timeline of task events
- `user_audit_log`: what actions users took and when

## Usage

To set up:

```bash
cqlsh -f db/cassandra/schema.cql
cqlsh -f db/cassandra/seed.cql
