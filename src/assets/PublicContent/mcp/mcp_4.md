# Chapter 4: JSON-RPC Fundamentals

## 4.1 MCP Message Format

MCP messages use JSON-RPC 2.0.

There are three main message categories:

```text
Request
Response
Notification
```

---

## 4.2 Request

A request expects a response.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

Important fields:

```text
jsonrpc:
Protocol version for JSON-RPC.

id:
Unique request identifier.

method:
Operation to perform.

params:
Input parameters.
```

---

## 4.3 Successful Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": []
  }
}
```

The response ID must correspond to the original request.

---

## 4.4 Error Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid parameters"
  }
}
```

---

## 4.5 Notification

A notification does not expect a response.

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/initialized"
}
```

Notifications are used for events such as:

```text
Initialization completion
Progress
Cancellation
Resource changes
Tool-list changes
Prompt-list changes
Logging
```

---

