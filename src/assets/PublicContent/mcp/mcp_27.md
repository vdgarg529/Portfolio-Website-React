# Chapter 27: MCP vs APIs and Frameworks

## 27.1 MCP vs REST API

```text
REST API:
General software-to-software interface.

MCP:
AI-oriented capability-discovery and context protocol.
```

REST usually defines application-specific endpoints.

MCP standardizes the discovery and invocation model around:

```text
Tools
Resources
Prompts
Capabilities
```

An MCP server frequently wraps an existing REST API.

---

## 27.2 MCP vs Function Calling

```text
Function calling:
A model-provider feature for requesting functions.

MCP:
A protocol for discovering and invoking capabilities
across applications and servers.
```

MCP tools are often converted into a model provider's function-calling schema by the host.

---

## 27.3 MCP vs LangChain

```text
MCP:
Connects AI applications to external capabilities.

LangChain:
Builds LLM applications, chains, agents and RAG systems.
```

LangChain can consume MCP tools.

MCP does not replace agent orchestration.

---

## 27.4 MCP vs LangGraph

```text
MCP:
External integration protocol.

LangGraph:
Stateful workflow and agent orchestration.
```

Typical combination:

```text
LangGraph workflow
      ↓
Agent node
      ↓
MCP client
      ↓
Several MCP servers
```

---

## 27.5 MCP vs CrewAI

```text
MCP:
Provides tools and context.

CrewAI:
Coordinates agents, tasks, Crews and Flows.
```

CrewAI agents can use MCP servers as capability providers.

---

## 27.6 MCP vs RAG

```text
RAG:
Retrieves relevant information for generation.

MCP:
May expose the retriever, search operation or
documents through tools and resources.
```

MCP is an integration mechanism.

RAG is an application pattern.

---

