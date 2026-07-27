# Chapter 13: Building an MCP Client

## 13.1 What Does a Client Do?

An MCP client:

```text
Starts or connects to a server
Initializes the protocol
Lists capabilities
Reads resources
Gets prompts
Calls tools
Handles server requests
Closes the connection
```

---

## 13.2 stdio Client Imports

```python
from contextlib import AsyncExitStack
from typing import Optional

from mcp import (
    ClientSession,
    StdioServerParameters
)

from mcp.client.stdio import (
    stdio_client
)
```

---

## 13.3 Connect to a Local Server

```python
class MCPClient:
    def __init__(self):
        self.session: Optional[
            ClientSession
        ] = None

        self.exit_stack = (
            AsyncExitStack()
        )

    async def connect(
        self,
        server_path: str
    ) -> None:
        parameters = StdioServerParameters(
            command="python",
            args=[server_path],
            env=None
        )

        transport = await (
            self.exit_stack
                .enter_async_context(
                    stdio_client(
                        parameters
                    )
                )
        )

        read_stream, write_stream = (
            transport
        )

        self.session = await (
            self.exit_stack
                .enter_async_context(
                    ClientSession(
                        read_stream,
                        write_stream
                    )
                )
        )

        await self.session.initialize()
```

The official client tutorial uses `ClientSession`, `StdioServerParameters`, `stdio_client()` and `session.initialize()` for this connection flow.

---

## 13.4 List Tools

```python
response = await (
    self.session.list_tools()
)

for tool in response.tools:
    print(
        tool.name,
        tool.description,
        tool.inputSchema
    )
```

---

## 13.5 Call a Tool

```python
result = await (
    self.session.call_tool(
        "calculate_region_summary",
        {
            "region": "North"
        }
    )
)

print(result.content)
```

---

## 13.6 List Resources

```python
response = await (
    self.session.list_resources()
)

for resource in response.resources:
    print(
        resource.uri,
        resource.name,
        resource.mimeType
    )
```

---

## 13.7 Read a Resource

```python
result = await (
    self.session.read_resource(
        "sales://dataset/description"
    )
)

print(result.contents)
```

---

## 13.8 List and Get Prompts

```python
prompts = await (
    self.session.list_prompts()
)

for prompt in prompts.prompts:
    print(
        prompt.name,
        prompt.description
    )
```

```python
result = await (
    self.session.get_prompt(
        "regional_analysis_prompt",
        {
            "region": "North"
        }
    )
)

print(result.messages)
```

---

## 13.9 Close the Client

```python
async def close(self) -> None:
    await self.exit_stack.aclose()
```

---

