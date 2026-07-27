# Chapter 21: Authorization

## 21.1 Transport-Level Authorization

The MCP authorization specification applies to HTTP-based transports.

For stdio servers, credentials should normally be obtained through the environment or process configuration rather than the HTTP authorization flow.

---

## 21.2 Authorization Flow

Conceptually:

```text
Client connects to protected MCP server
             ↓
Server requires authorization
             ↓
Client discovers authorization server
             ↓
User grants access
             ↓
Client receives access token
             ↓
Client calls MCP server
```

---

## 21.3 Authentication vs Authorization

```text
Authentication:
Who is the user or client?

Authorization:
What is the user or client allowed to do?
```

MCP transport authorization does not replace application-level permission checks.

---

## 21.4 Scope Design

Use narrow scopes such as:

```text
customers.read
orders.read
orders.update
email.send
documents.search
```

Avoid one broad scope such as:

```text
everything
```

---

## 21.5 Do Not Pass Tokens Through

An MCP server must not blindly pass the client's MCP bearer token to unrelated downstream services.

Risks include:

```text
Token theft
Audience mismatch
Bypassing server controls
Broken audit trails
Privilege escalation
```

The server should use proper downstream authorization credentials intended for the target service.

---

