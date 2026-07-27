# Chapter 33: Final MCP Checklist

```text
[ ] Protocol and SDK versions are pinned.

[ ] Server capabilities are declared accurately.

[ ] Initialization succeeds.

[ ] stdio logs never use stdout.

[ ] Tool names are clear and specific.

[ ] Tool arguments are validated.

[ ] Authorization is enforced server-side.

[ ] Destructive tools require confirmation.

[ ] Tool outputs are bounded in size.

[ ] Resources use stable, meaningful URIs.

[ ] Resource MIME types are correct.

[ ] Prompts have clear arguments.

[ ] Errors distinguish protocol and business failures.

[ ] External calls have timeouts.

[ ] Retries are limited to transient failures.

[ ] Side-effecting calls use idempotency protection.

[ ] Secrets and tokens are never logged.

[ ] Tenant access is enforced in the data layer.

[ ] Prompt injection is treated as a real threat.

[ ] SSRF protections exist for URL-accepting tools.

[ ] Progress notifications are rate-limited.

[ ] Cancellation race conditions are handled.

[ ] Pagination is implemented for large lists.

[ ] Inspector testing has been completed.

[ ] Business logic has unit tests.

[ ] Full client-server integration has been tested.

[ ] Metrics and audit logs are available.

[ ] Public servers are reviewed before Registry publication.
```

---

# Final Concept Summary

MCP answers:

```text
How can an AI application connect to external
data and capabilities through a standard protocol?
```

The host answers:

```text
How should the user, model and servers be coordinated?
```

The client answers:

```text
How does the host communicate with one MCP server?
```

The server answers:

```text
What context and capabilities are available?
```

Tools answer:

```text
What actions can be performed?
```

Resources answer:

```text
What information can be read?
```

Prompts answer:

```text
What reusable interaction patterns are available?
```

Transports answer:

```text
How are protocol messages delivered?
```

Capability negotiation answers:

```text
Which optional features do both sides support?
```

Authorization answers:

```text
Who may access which capabilities?
```

The most important MCP design principle is:

```text
MCP standardizes access to capabilities.

It does not remove the need for secure,
well-designed application logic.
```

A production-quality MCP server should be:

```text
Narrowly scoped
Secure
Discoverable
Versioned
Observable
Testable
Permission-aware
Transport-independent
Safe under retries
Explicit about side effects
```
