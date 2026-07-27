# Chapter 19: Protocol Utilities

## 19.1 Ping

Either party can send:

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "method": "ping",
  "params": {}
}
```

Ping checks whether the other participant is still responsive.

---

## 19.2 Progress

A request can include a progress token:

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "method": "tools/call",
  "params": {
    "_meta": {
      "progressToken": "job-101"
    },
    "name": "generate_report",
    "arguments": {}
  }
}
```

The receiver may send:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": {
    "progressToken": "job-101",
    "progress": 50,
    "total": 100,
    "message": "Analysing records"
  }
}
```

Progress values must increase, and notifications must stop after the operation finishes.

---

## 19.3 Cancellation

Either side can request cancellation of an active request:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/cancelled",
  "params": {
    "requestId": 10,
    "reason": "User cancelled the report"
  }
}
```

Cancellation is best-effort and must handle race conditions, because the operation may finish before the cancellation arrives.

---

## 19.4 Pagination

List operations may support cursor-based pagination.

Examples include:

```text
tools/list
resources/list
resources/templates/list
prompts/list
```

Conceptual request:

```json
{
  "jsonrpc": "2.0",
  "id": 11,
  "method": "tools/list",
  "params": {
    "cursor": "next-page-token"
  }
}
```

---

## 19.5 Argument Completion

Servers may offer completion suggestions for:

```text
Prompt arguments
Resource-template arguments
```

For example, a resource URI argument beginning with:

```text
fra
```

might return:

```text
framework
france
fraud
```

The completion utility can return up to 100 ranked suggestions in a response.

---

## 19.6 List-Changed Notifications

A server can notify clients when the available:

```text
Tools
Resources
Prompts
```

have changed.

The client should then invalidate its cached list and request it again.

---

