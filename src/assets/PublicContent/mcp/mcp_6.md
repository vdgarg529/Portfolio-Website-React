# Chapter 6: MCP Transports

## 6.1 Standard Input and Output

The `stdio` transport communicates through:

```text
stdin
stdout
```

The host usually starts the MCP server as a child process.

```text
Host process
    ↓ starts
MCP server process
    ↕
stdin/stdout
```

---

## 6.2 stdio Rules

A stdio server must write only valid MCP protocol messages to `stdout`.

Logs should be written to:

```text
stderr
```

Writing normal debugging output to `stdout` can corrupt the MCP message stream.

Correct:

```python
import sys

print(
    "Server starting",
    file=sys.stderr
)
```

Incorrect:

```python
print("Server starting")
```

---

## 6.3 When to Use stdio

Use stdio for:

```text
Local servers
Command-line tools
Desktop applications
Local development
Filesystem access
Local Git operations
Single-user integrations
```

Benefits:

```text
Simple
Low networking overhead
No network port required
Credentials can come from environment variables
Process lifetime is controlled by the host
```

---

## 6.4 Streamable HTTP

Streamable HTTP uses:

```text
HTTP POST
HTTP GET when required
Optional Server-Sent Events for streaming
```

It supports remote server deployment and can handle several clients.

---

## 6.5 When to Use Streamable HTTP

Use it for:

```text
Remote MCP servers
Cloud deployment
Shared services
Multi-user systems
Enterprise integrations
Horizontally scaled applications
```

---

## 6.6 HTTP Sessions

Under the stable `2025-11-25` protocol, a Streamable HTTP server may return an:

```text
MCP-Session-Id
```

The client must then send the session ID on subsequent requests. The server may terminate a session, and clients must handle invalid or expired sessions.

Do not expose session IDs in:

```text
URLs
Application logs
Browser history
Analytics events
```

---

## 6.7 Protocol-Version Header

For HTTP requests after initialization, clients send:

```http
MCP-Protocol-Version: 2025-11-25
```

This lets the server interpret requests using the negotiated protocol revision.

---

## 6.8 Transport Decision Guide

```text
stdio:
Local process, one host, simple installation.

Streamable HTTP:
Remote service, several users, authentication and scaling.

Legacy SSE:
Compatibility with older servers or clients only.
```

---

