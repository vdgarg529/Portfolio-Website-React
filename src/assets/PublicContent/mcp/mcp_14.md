# Chapter 14: Connecting MCP to an LLM

## 14.1 General Tool Loop

MCP itself does not require a particular model provider.

A host usually performs this loop:

```text
List MCP tools
      ↓
Convert schemas to model tool format
      ↓
Call the model
      ↓
Model requests a tool
      ↓
Call MCP tool
      ↓
Return result to model
      ↓
Model produces final response
```

---

## 14.2 Provider-Neutral Pseudocode

```python
tools_response = await (
    session.list_tools()
)

model_tools = [
    {
        "name": tool.name,
        "description": tool.description,
        "input_schema": tool.inputSchema
    }
    for tool in tools_response.tools
]

response = model.generate(
    messages=messages,
    tools=model_tools
)

for tool_call in response.tool_calls:
    result = await session.call_tool(
        tool_call.name,
        tool_call.arguments
    )

    messages.append(
        create_tool_result_message(
            tool_call.id,
            result.content
        )
    )

final_response = model.generate(
    messages=messages,
    tools=model_tools
)
```

The official client tutorial follows this pattern: discover server tools, pass their schemas to the model, execute the selected tool through `session.call_tool()`, and return its result to the model.

---

## 14.3 Who Selects the Tool?

Possible patterns:

```text
Model-controlled:
The model selects the tool.

Application-controlled:
Code selects the tool.

User-controlled:
The user explicitly chooses a tool.

Hybrid:
The model proposes and the user approves.
```

Use deterministic application routing when the correct operation is known.

Use model selection when natural-language interpretation is required.

---

