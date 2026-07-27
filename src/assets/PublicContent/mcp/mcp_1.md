
# Model Context Protocol: Detailed Chapter-Wise Notes

# Chapter 1: Introduction to MCP

## 1.1 What Is MCP?

MCP stands for:

```text
Model Context Protocol
```

It is an open standard for connecting AI applications to external:

```text
Data sources
Tools
Services
Applications
Prompts
Workflows
```

MCP provides a standard communication layer through which an AI host can discover and use capabilities exposed by external servers. It is commonly compared to a USB-C-style interface for AI applications because the same client-side architecture can connect to many independently developed servers.

Conceptually:

```text
AI application
      ↓
MCP client
      ↓
MCP protocol
      ↓
MCP server
      ↓
Database, API, files or service
```

---

## 1.2 What Problem Does MCP Solve?

Without MCP, every AI application may require a separate custom integration for every service.

```text
AI application → Custom GitHub integration
AI application → Custom database integration
AI application → Custom Slack integration
AI application → Custom filesystem integration
```

This creates an `N × M` integration problem:

```text
N AI applications
×
M external systems
```

With MCP:

```text
AI applications implement MCP clients.

External systems implement MCP servers.
```

The same MCP server can potentially work with several compatible hosts.

---

## 1.3 What MCP Does

MCP standardizes:

```text
How clients and servers establish a connection
How capabilities are negotiated
How tools are discovered and invoked
How resources are discovered and read
How reusable prompts are exposed
How progress and cancellation are communicated
How clients and servers exchange structured messages
```

---

## 1.4 What MCP Does Not Do

MCP does not define:

```text
Which LLM an application must use
How an agent should reason
How retrieved context must be inserted into prompts
How a user interface must look
How the host should choose a tool
How the model should plan tasks
How business workflows should be orchestrated
```

MCP focuses on context and capability exchange. The host application remains responsible for deciding how to use the data and functionality supplied by servers.

---

## 1.5 Typical MCP Use Cases

```text
Allow an AI coding assistant to read a repository
Allow a chatbot to query an internal database
Allow an assistant to create calendar events
Allow an agent to search company documentation
Allow an AI system to interact with GitHub
Allow an IDE assistant to call development tools
Allow a business assistant to use CRM data
Allow an AI workflow to access local files safely
```

---

