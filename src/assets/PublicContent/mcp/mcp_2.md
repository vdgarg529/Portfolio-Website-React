# Chapter 2: MCP Architecture

## 2.1 Main Participants

MCP uses three main participant types:

```text
Host
Client
Server
```

The host creates a dedicated MCP client connection for each server it connects to.

---

## 2.2 MCP Host

The host is the main AI application.

Examples include:

```text
Desktop AI assistant
Coding assistant
IDE
Chat application
Agent platform
Enterprise AI application
```

The host is responsible for:

```text
Managing the user interface
Managing LLM interactions
Creating MCP clients
Managing user permissions
Selecting which servers to connect to
Deciding how server results enter the model context
Requesting user confirmation
Enforcing security policies
```

---

## 2.3 MCP Client

An MCP client is a connector inside the host.

Each client generally maintains a connection with one MCP server.

```text
Host
 ├── MCP client A → Filesystem server
 ├── MCP client B → GitHub server
 └── MCP client C → Database server
```

Client responsibilities include:

```text
Initialize the connection
Negotiate capabilities
List available server features
Call tools
Read resources
Retrieve prompts
Handle server requests
Handle notifications
Close the connection
```

---

## 2.4 MCP Server

An MCP server exposes context or capabilities.

A server can expose:

```text
Tools
Resources
Prompts
Completion suggestions
Logging messages
```

It may connect to:

```text
A local filesystem
A database
A web API
A SaaS application
An internal service
A developer tool
A knowledge base
```

---

## 2.5 Local and Remote Servers

### Local server

Runs on the same machine as the host.

```text
Host
  ↓ stdio
Local MCP process
```

Examples:

```text
Filesystem server
Local Git repository server
Local development tool
Local database utility
```

### Remote server

Runs as a network service.

```text
Host
  ↓ HTTPS
Remote MCP server
  ↓
Cloud service or API
```

Examples:

```text
CRM integration
Cloud database
Enterprise knowledge service
Remote automation platform
```

---

