# Chapter 29: Common MCP Mistakes

## 29.1 Printing Logs to stdout in stdio Mode

This corrupts protocol communication.

Use:

```text
stderr
```

---

## 29.2 Treating Tool Descriptions as Security

A description such as:

```text
Only administrators should call this.
```

does not enforce anything.

Check the user's actual permission in server code.

---

## 29.3 Exposing One Giant Tool

Bad:

```text
manage_company(...)
```

Better:

```text
get_customer(...)
update_customer_email(...)
create_support_ticket(...)
```

---

## 29.4 Returning Excessive Data

Do not return an entire database table to the model.

Use filters, pagination or resources.

---

## 29.5 Trusting Tool Arguments

Every tool argument is untrusted.

Validate:

```text
Type
Range
Length
Format
Permission
Ownership
Business state
```

---

## 29.6 Giving Every Client Full Access

Issue narrow permissions.

Separate:

```text
Read
Write
Delete
Administrative
```

---

## 29.7 Assuming the Model Will Ask for Confirmation

The host or server must enforce confirmation for sensitive operations.

Do not rely on model behaviour.

---

## 29.8 Using Resources for Side Effects

A resource read should not unexpectedly:

```text
Delete data
Send email
Modify a record
Issue a payment
```

Use a clearly named tool for actions.

---

## 29.9 Hard-Coding Provider Logic into the Server

An MCP server should normally be usable by different compatible hosts.

Avoid assuming one particular:

```text
LLM provider
Chat interface
Model tool-call format
Host application
```

---

## 29.10 Depending on Draft Features Without Isolation

The MCP specification is evolving.

For experimental or upcoming features:

```text
Pin protocol and SDK versions
Hide features behind interfaces
Test capability negotiation
Provide fallback behaviour
Document assumptions
```

---

