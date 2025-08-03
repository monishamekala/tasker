
### 📄 `schema.cql` — Cassandra Keyspace and Table Definitions

```sql
CREATE KEYSPACE IF NOT EXISTS taskmgr WITH REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE taskmgr;

CREATE TABLE IF NOT EXISTS task_events_by_id (
  task_id text,
  event_time timestamp,
  event_type text,
  payload text,
  PRIMARY KEY (task_id, event_time)
) WITH CLUSTERING ORDER BY (event_time DESC);

CREATE TABLE IF NOT EXISTS user_audit_log (
  user_id text,
  timestamp timestamp,
  action text,
  task_id text,
  PRIMARY KEY (user_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
