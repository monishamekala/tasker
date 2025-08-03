use taskmgr;

db.users.insertMany([
  { _id: "u1", name: "Alice", role: "admin" },
  { _id: "u2", name: "Bob", role: "contributor" }
]);

db.tasks.insertOne({
  _id: "t1",
  title: "Initial Setup",
  status: "pending",
  assignee: "u1",
  team: "core",
  updated_at: new Date()
});

db.crdts.insertOne({
  _id: "t1",
  or_set: ["Initial Setup"],
  last_updated: new Date()
});
