# Chapter 3: MCP Protocol Layers

## 3.1 Data Layer

The data layer defines:

```text
JSON-RPC messages
Lifecycle
Capability negotiation
Tools
Resources
Prompts
Client features
Notifications
Utilities
```

---

## 3.2 Transport Layer

The transport layer defines how protocol messages move between the client and server.

The stable specification defines:

```text
stdio
Streamable HTTP
```

SDKs may also retain compatibility with the older HTTP-plus-SSE transport, but Streamable HTTP replaced that older transport in the protocol specification.

---

## 3.3 Separation of Concerns

```text
Protocol:
What messages mean.

Transport:
How messages are delivered.

Host:
How capabilities are presented to users and models.

Server:
How tools and data are implemented.
```

This separation allows the same server logic to be exposed using different transports.

---

