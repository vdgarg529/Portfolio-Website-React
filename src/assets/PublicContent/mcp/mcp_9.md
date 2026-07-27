# Chapter 9: MCP Resources

## 9.1 What Is a Resource?

A resource is data exposed by a server for use as model or application context.

Examples:

```text
File contents
Database schema
Documentation
Customer record
Configuration file
API response
Application state
Log output
```

Every resource is identified by a URI.

---

## 9.2 Example Resource URI

```text
file:///project/README.md
customer://C-101/profile
database://sales/schema
docs://policies/expenses
```

The URI scheme may be standard or application-specific.

---

## 9.3 List Resources

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "resources/list",
  "params": {}
}
```

---

## 9.4 Read Resource

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "resources/read",
  "params": {
    "uri": "docs://policies/expenses"
  }
}
```

---

## 9.5 Resource Result

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "contents": [
      {
        "uri": "docs://policies/expenses",
        "mimeType": "text/markdown",
        "text": "# Expense Policy\n..."
      }
    ]
  }
}
```

---

## 9.6 Resource Templates

A resource template defines a parameterized URI.

```text
customer://{customer_id}/profile
repository://{owner}/{repository}/readme
database://{database}/schema/{table}
```

The client can use template parameters to construct specific resource URIs.

---

## 9.7 Resource Subscription

A server may support subscriptions.

```text
Client subscribes to resource
          ↓
Resource changes
          ↓
Server sends notification
          ↓
Client rereads the resource
```

Resource capabilities can independently declare:

```text
subscribe
listChanged
```

---

## 9.8 Resources vs Tools

Use a resource when:

```text
The operation primarily reads data
The content has a stable identity or URI
The user may explicitly select it
The host may decide how to include it
```

Use a tool when:

```text
Arguments drive an operation
Computation is required
A side effect may occur
The result is dynamically generated
The model should request an action
```

Example:

```text
Resource:
docs://policies/leave

Tool:
submit_leave_request(...)
```

---

