# Chapter 24: Logging and Observability

## 24.1 What to Log

```text
Server startup
Protocol version
Connection ID
Tool name
Tool duration
Tool success or failure
Authorization result
Resource URI
External API latency
Cancellation
Timeout
```

---

## 24.2 What Not to Log

```text
Passwords
Access tokens
API keys
Full private documents
Payment details
Sensitive tool arguments
Raw authorization headers
Session IDs
```

---

## 24.3 Structured Log Example

```python
logger.info(
    "tool_completed",
    extra={
        "tool": "get_order",
        "duration_ms": 42,
        "success": True
    }
)
```

---

## 24.4 Metrics

Monitor:

```text
Active connections
Initialization failures
Tool-call count
Tool error rate
Tool latency
Resource-read latency
Authorization failures
Cancellation count
Timeout count
External API failures
```

---

