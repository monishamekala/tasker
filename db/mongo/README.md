# MongoDB Schema and Init

This directory contains initialization and schema info for the `taskmgr` MongoDB database.

## Collections

- `users`: user metadata and role-based access
- `tasks`: main task records
- `crdts`: offline merge state (OR-Sets, LWW values)

## How to Seed

```bash
mongosh < db/mongo/init.js
