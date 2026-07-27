# Chapter 8: MCP Tools

## 8.1 What Is a Tool?

A tool is an operation that a client or model can invoke.

Examples:

```text
Search a database
Create a calendar event
Calculate a value
Send an email
Read a customer record
Run a report
Update an issue
Call an API
```

Tools are uniquely identified by name and include input schemas and descriptive metadata.

---

## 8.2 Tool Structure

A tool normally includes:

```text
name
title
description
inputSchema
optional outputSchema
annotations
icons or metadata
```

Example conceptual definition:

```json
{
  "name": "get_customer",
  "description": "Retrieve one customer using their customer ID.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "customer_id": {
        "type": "string"
      }
    },
    "required": [
      "customer_id"
    ]
  }
}
```

---

## 8.3 List Tools

Client request:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}
```

---

## 8.4 Call a Tool

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_customer",
    "arguments": {
      "customer_id": "C-101"
    }
  }
}
```

---

## 8.5 Tool Result

A tool result may contain:

```text
Text
Images
Audio
Embedded resources
Resource links
Structured content
```

Example:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Customer C-101 is active."
      }
    ],
    "isError": false
  }
}
```

---

## 8.6 Tool Error vs Protocol Error

### Tool execution error

The request itself was valid, but the operation failed.

Examples:

```text
Customer not found
Insufficient balance
Invalid business state
External service unavailable
```

Return a normal tool result with an error indication.

### Protocol error

The MCP request was invalid.

Examples:

```text
Unknown tool
Invalid JSON-RPC request
Malformed parameters
Unsupported method
```

Return a JSON-RPC error.

---

## 8.7 Tool Annotations

Tool annotations can communicate behavioural hints such as whether an operation is:

```text
Read-only
Destructive
Idempotent
Open-world or externally interacting
```

These are hints rather than substitutes for server-side security.

The server must always enforce actual permissions.

---

## 8.8 Good Tool Design

A good tool should:

```text
Perform one clear operation
Have a precise name
Use a narrow input schema
Validate every argument
Return concise structured information
Have clear error behaviour
Enforce authorization in code
Be idempotent where possible
```

Weak:

```text
manage_everything
```

Better:

```text
get_order
cancel_order
update_delivery_address
```

---

## 8.9 Read and Write Tools

### Read tool

```text
get_customer
search_documents
list_orders
calculate_summary
```

### Write tool

```text
send_email
delete_file
issue_refund
update_order
deploy_service
```

Write tools require:

```text
Explicit permissions
Input validation
User confirmation
Audit logging
Idempotency protection
```

The MCP tools specification recommends keeping a human in control for sensitive operations and showing tool inputs before invocation where appropriate.

---

