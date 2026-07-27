# Chapter 25: Production MCP Server Design

## 25.1 Recommended Architecture

```text
MCP transport
      ↓
Protocol handlers
      ↓
Authentication
      ↓
Authorization
      ↓
Input validation
      ↓
Business service
      ↓
Database or external API
      ↓
Output validation
      ↓
Audit logging
```

---

## 25.2 Keep Protocol and Business Logic Separate

```text
MCP layer:
Converts protocol input into application calls.

Service layer:
Implements the actual business operation.

Data layer:
Reads or modifies data.
```

Benefits:

```text
Easier testing
Easier migration between SDK versions
Reusable business logic
Clearer authorization
Simpler observability
```

---

## 25.3 Async for Network Operations

```python
@mcp.tool()
async def get_order_status(
    order_id: str
) -> dict:
    """Retrieve the current order status."""

    return await order_service.fetch(
        order_id
    )
```

Use async for:

```text
HTTP requests
Database queries
Cloud APIs
File storage
Concurrent service calls
```

Do not use async merely for CPU-heavy work.

---

## 25.4 Timeouts

Every external call should have a timeout.

```python
async with httpx.AsyncClient(
    timeout=20.0
) as client:
    response = await client.get(
        url
    )
```

---

## 25.5 Retries

Retry only transient failures:

```text
Timeout
Rate limit
Temporary service outage
Connection reset
```

Do not blindly retry:

```text
Invalid credentials
Permission denied
Invalid user input
Permanent missing object
Destructive operations
```

---

## 25.6 Idempotency

A tool is idempotent when repeating the same request does not create duplicate effects.

Good:

```text
set_customer_status
upsert_record
get_order
```

Risky without protection:

```text
send_payment
send_email
create_order
increment_balance
```

Use:

```text
Idempotency key
Operation identifier
Database uniqueness constraint
Deduplication table
Transaction log
```

---

## 25.7 Result Size Limits

Do not return unlimited data.

Use:

```text
Pagination
Top-k results
Summaries
Resource links
Download handles
Filters
```

Returning thousands of records directly into model context is expensive and unreliable.

---

## 25.8 Stateless vs Stateful Servers

Prefer stateless tool calls where possible.

```text
Input contains everything needed
      ↓
Tool performs operation
      ↓
Result returned
```

Use server-side session state only when necessary.

Stateless operations are easier to:

```text
Scale
Retry
Test
Cache
Load balance
Recover
```

---

