# Chapter 16: Sampling

## 16.1 What Is Sampling?

Sampling lets an MCP server request an LLM generation through the client.

```text
Server
  ↓ sampling request
Client
  ↓ selects and calls model
LLM
  ↓ result
Client
  ↓
Server
```

The server does not need to hold the client's model API key. The client remains responsible for model access, model selection and permissions.

---

## 16.2 Use Cases

```text
Server asks the client's model to summarize data
Server creates an agentic nested workflow
Server requests classification
Server requests generation using client-controlled models
```

---

## 16.3 Security Considerations

The client should control:

```text
Whether sampling is allowed
Which model is used
Maximum token usage
Which context is included
Whether user approval is required
```

A server must not assume unrestricted LLM access.

---

