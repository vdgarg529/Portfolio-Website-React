# Chapter 10: MCP Prompts

## 10.1 What Is an MCP Prompt?

A prompt is a reusable interaction template exposed by a server.

Examples:

```text
Review this code
Generate an incident report
Analyse a customer complaint
Prepare a database migration plan
Summarize a document
```

Prompts are normally user-controlled capabilities that a host may present through commands, menus or workflow actions.

---

## 10.2 Prompt Structure

A prompt can contain:

```text
Name
Description
Arguments
Generated messages
Embedded resources
```

---

## 10.3 List Prompts

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "prompts/list",
  "params": {}
}
```

---

## 10.4 Get a Prompt

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "prompts/get",
  "params": {
    "name": "code_review",
    "arguments": {
      "language": "python"
    }
  }
}
```

A prompt result returns one or more messages to use in an LLM interaction.

---

## 10.5 Prompts vs Tools

```text
Prompt:
Defines how to approach an interaction.

Tool:
Performs an action.

Resource:
Provides information.
```

Example:

```text
Prompt:
review_pull_request

Resource:
repository://project/contributing-guide

Tool:
post_pull_request_comment
```

---

## 10.6 When to Use Prompts

Use prompts for:

```text
Reusable workflows
Domain-specific analysis instructions
User-selectable commands
Standard report formats
Common review procedures
Guided interactions
```

Do not use prompts as a replacement for:

```text
Authorization
Business-rule validation
Tool input validation
Security controls
```

---

