# Chapter 20: Experimental Tasks

## 20.1 What Are MCP Tasks?

Tasks support long-running operations whose result may not be immediately available.

The caller receives a task reference and can later:

```text
Check status
Retrieve results
Cancel the task
Receive status notifications
```

Tasks were introduced in `2025-11-25` and are experimental in that stable revision.

---

## 20.2 Task States

Typical states include:

```text
working
input_required
completed
failed
cancelled
```

---

## 20.3 When to Use Tasks

```text
Long report generation
Large data processing
Background export
Lengthy external API workflow
Human-dependent operation
Asynchronous batch processing
```

Because the feature is experimental, isolate task-specific code behind an internal abstraction.

---

