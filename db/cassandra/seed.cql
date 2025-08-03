USE taskmgr;

INSERT INTO task_events_by_id (task_id, event_time, event_type, payload)
VALUES ('t1', toTimestamp(now()), 'create', '{"title": "Initial Setup"}');

INSERT INTO user_audit_log (user_id, timestamp, action, task_id)
VALUES ('u1', toTimestamp(now()), 'created task', 't1');
