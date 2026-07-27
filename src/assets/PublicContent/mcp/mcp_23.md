# Chapter 23: Testing and Debugging

## 23.1 MCP Inspector

The MCP Inspector is an interactive official development tool for testing servers.

It can inspect:

```text
Connection setup
Capabilities
Resources
Prompts
Tools
Notifications
Tool inputs
Tool outputs
Resource subscriptions
```

---

## 23.2 Start Inspector

```bash
npx -y @modelcontextprotocol/inspector
```

For a local Python server:

```bash
npx -y @modelcontextprotocol/inspector \
    uv \
    --directory /path/to/project \
    run \
    server.py
```

For Streamable HTTP, launch the server and connect the Inspector to its MCP endpoint.

---

## 23.3 What to Test

```text
Server starts correctly
Initialization succeeds
Capabilities are accurate
Tool schemas are valid
Required arguments are enforced
Invalid arguments return useful errors
Resources have correct MIME types
Prompt arguments work
Pagination works
Cancellation works
Progress is monotonic
Authorization is enforced
Concurrent operations are safe
```

---

## 23.4 Unit-Test Server Logic

Keep business logic separate from MCP decorators.

```python
def calculate_profit(
    revenue: float,
    cost: float
) -> float:
    if revenue < 0 or cost < 0:
        raise ValueError(
            "Values cannot be negative."
        )

    return revenue - cost
```

Test:

```python
def test_calculate_profit():
    assert (
        calculate_profit(
            100,
            60
        )
        == 40
    )
```

MCP wrapper:

```python
@mcp.tool()
def profit_tool(
    revenue: float,
    cost: float
) -> float:
    """Calculate profit."""

    return calculate_profit(
        revenue,
        cost
    )
```

---

## 23.5 Integration Tests

Test the complete flow:

```text
Start server
Initialize client
List tools
Call tool
Validate result
Close connection
```

The stable Python SDK includes guidance for in-memory testing as well as full client-server tests.

---

