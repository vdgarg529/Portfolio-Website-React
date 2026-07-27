# Chapter 18: Elicitation

## 18.1 What Is Elicitation?

Elicitation lets a server request additional user information through the client.

The stable specification supports:

```text
Form mode
URL mode
```

---

## 18.2 Form Mode

Form mode collects structured, non-sensitive information.

Example:

```text
Server needs:
Project name
Environment
Deployment region
```

The server sends a schema, and the client gathers the data from the user.

---

## 18.3 URL Mode

URL mode directs the user to an external URL.

Use cases:

```text
Payment workflow
Third-party authorization
Sensitive external form
Identity verification
```

Sensitive values do not pass through the MCP client in URL mode.

---

## 18.4 Sensitive Information Rule

Form-mode elicitation must not be used to request sensitive credentials such as:

```text
Passwords
API keys
Access tokens
Payment credentials
```

Use an appropriate secure out-of-band flow instead.

---

