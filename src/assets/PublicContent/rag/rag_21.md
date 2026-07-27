# Chapter 21: Agentic RAG

## 21.1 Agentic RAG Architecture

```text
User request
      ↓
Agent
      ↓
Choose source
      ↓
Retrieve
      ↓
Inspect result
      ↓
Retrieve again if required
      ↓
Generate answer
```

---

## 21.2 Retrieval as a Tool

```python
def search_knowledge_base(
    query: str
) -> list[dict]:
    """Search approved internal documents."""

    return retriever.search(
        query=query,
        top_k=5
    )
```

The agent can choose this tool when a question depends on the knowledge base.

---

## 21.3 Source-Specific Tools

```text
search_policies
search_support_tickets
query_sales_database
search_code_repository
search_web
```

This is often better than one generic `search_everything` tool because:

```text
Descriptions are clearer

Permissions can differ

Results can be formatted appropriately

Routing is easier to evaluate
```

---

## 21.4 Agentic RAG Risks

```text
Excessive tool calls

Repeated retrieval

High latency

High cost

Unpredictable routes

Incorrect source selection

Prompt injection through retrieved data
```

Set limits:

```text
Maximum search rounds

Maximum tool calls

Maximum total documents

Maximum execution time

Allowed sources
```

---

