# Chapter 28: When to Use What

## Tool

Use when:

```text
The client or model needs to execute an operation.
```

---

## Resource

Use when:

```text
The server exposes identifiable information for context.
```

---

## Prompt

Use when:

```text
The server provides a reusable interaction pattern.
```

---

## stdio

Use when:

```text
The server is local and launched by the host.
```

---

## Streamable HTTP

Use when:

```text
The server is remote, shared or cloud-hosted.
```

---

## Sampling

Use when:

```text
A stable-protocol server needs the client to perform
an LLM generation and the compatibility risks are accepted.
```

---

## Elicitation

Use when:

```text
The server requires additional information from the user.
```

---

## Progress

Use when:

```text
An operation is long-running and the user needs updates.
```

---

## Cancellation

Use when:

```text
A running operation should support user cancellation.
```

---

## Tasks

Use when:

```text
The operation is asynchronous or long-running,
and experimental protocol support is acceptable.
```

---

## MCP Registry

Use when:

```text
A public server should be discoverable by the ecosystem.
```

---

