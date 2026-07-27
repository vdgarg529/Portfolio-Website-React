# Chapter 26: MCP Registry

## 26.1 What Is the Registry?

The official MCP Registry is a centralized metadata repository for publicly accessible MCP servers.

It helps server developers publish metadata and helps downstream directories discover servers. The Registry is currently in preview.

---

## 26.2 What the Registry Stores

The Registry stores metadata such as:

```text
Server name
Version
Description
Package information
Remote endpoint information
Repository information
Installation configuration
```

It does not necessarily host the server package itself.

---

## 26.3 Publishing Workflow

Conceptually:

```text
Publish package or remote server
        ↓
Create server.json
        ↓
Authenticate publisher
        ↓
Publish metadata
        ↓
Registry validates metadata
```

Official tooling uses:

```bash
mcp-publisher init
mcp-publisher login
mcp-publisher publish
```

---

## 26.4 Registry Security Warning

Registry presence does not mean a server is automatically safe.

Before using a server:

```text
Verify publisher
Review permissions
Review source or vendor
Check package history
Test in isolation
Limit credentials
Monitor behaviour
```

---

