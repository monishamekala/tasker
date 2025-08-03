# CRDT Models

This directory implements Conflict-free Replicated Data Types (CRDTs) used to merge offline edits and distributed updates.

## Implemented

- **OR-Set**: Used for task membership, tag sets, etc.
- **LWW Register**: Used for scalar fields like `title`, `status`
- **Merge Strategy**: Merges task documents from multiple nodes/users

## Usage

```cpp
#include "crdt/merge_strategy.h"
auto merged = crdt::merge_task_docs(local_doc, remote_doc);
