# Chapter 22: Graph RAG

## 22.1 What Is Graph-Based RAG?

Graph RAG retrieves information from relationships among entities.

Example graph:

```text
Customer
   ↓ requested
Feature
   ↓ caused
Architecture change
   ↓ affected
Incident
```

---

## 22.2 Knowledge Graph Components

```text
Nodes:
People, companies, products, events or concepts.

Edges:
Relationships between nodes.

Properties:
Attributes of nodes or relationships.
```

---

## 22.3 When Graph RAG Helps

```text
Questions require relationships.

Evidence spans several documents.

Entity connections matter.

Multi-hop reasoning is common.

The domain has a stable relationship structure.
```

Examples:

```text
Fraud networks

Scientific literature

Supply chains

Enterprise architecture

Legal cases

Organizational knowledge
```

---

## 22.4 Graph RAG Flow

```text
Question
      ↓
Identify entities
      ↓
Find graph nodes
      ↓
Traverse relevant relationships
      ↓
Retrieve supporting documents
      ↓
Generate answer
```

---

## 22.5 Graph RAG Limitations

```text
Graph construction is expensive.

Entity extraction may be inaccurate.

Relationships need maintenance.

Graph traversal can return excessive context.

Not every question benefits from graph structure.
```

Use vector retrieval first unless relationship-based questions justify a graph.

---

