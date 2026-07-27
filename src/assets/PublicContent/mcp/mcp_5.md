# Chapter 5: MCP Lifecycle

## 5.1 Lifecycle Phases

An MCP connection follows three phases:

```text
Initialization
Operation
Shutdown
```

Initialization must occur before normal protocol operations. During initialization, the client and server negotiate a protocol version, exchange implementation information and declare supported capabilities.

---

## 5.2 Initialization Request

The client begins by sending:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-11-25",
    "capabilities": {},
    "clientInfo": {
      "name": "analytics-assistant",
      "version": "1.0.0"
    }
  }
}
```

---

## 5.3 Initialization Response

The server responds with:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2025-11-25",
    "capabilities": {
      "tools": {},
      "resources": {},
      "prompts": {}
    },
    "serverInfo": {
      "name": "analytics-server",
      "version": "1.0.0"
    }
  }
}
```

---

## 5.4 Initialized Notification

After receiving a valid initialization result, the client sends:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/initialized"
}
```

Normal operation then begins.

---

## 5.5 Version Negotiation

The client proposes a supported protocol version.

The server may:

```text
Accept the proposed version
or
Return another supported version
```

If the client cannot support the version selected by the server, it should disconnect.

---

## 5.6 Capability Negotiation

Capabilities tell each participant which optional features are supported.

Server capabilities can include:

```text
tools
resources
prompts
logging
completions
tasks
experimental
```

Client capabilities can include:

```text
sampling
roots
elicitation
tasks
experimental
```

A participant should only use features successfully negotiated during initialization.

---

## 5.7 Shutdown

MCP does not define a special universal shutdown message.

The underlying transport is closed.

For example:

```text
stdio:
Close the child process streams.

HTTP:
Close or terminate the session and connection.
```

---

