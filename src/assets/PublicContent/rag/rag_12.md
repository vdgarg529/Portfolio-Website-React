# Chapter 12: Query Processing

## 12.1 Why Process the Query?

User questions may be:

```text
Ambiguous

Too short

Conversational

Misspelled

Multi-part

Dependent on previous messages

Written using different terminology from documents
```

Query processing improves retrieval.

---

## 12.2 Query Rewriting

Example:

```text
Conversation:
User: Tell me about LangGraph memory.
User: How is it persisted?

Rewritten query:
How is LangGraph conversation memory persisted?
```

---

## 12.3 Query Expansion

Add related terms.

```text
Original:
employee leave

Expanded:
employee leave, vacation policy,
paid time off, annual leave
```

Use query expansion when the knowledge base contains varying terminology.

---

## 12.4 Multi-Query Retrieval

Generate several versions:

```text
How do employees claim travel expenses?

What is the reimbursement procedure?

Which documents are required for travel claims?
```

Retrieve results for each and merge them.

Benefits:

```text
Higher recall

Different terminology coverage

More robust retrieval
```

Costs:

```text
More retrieval calls

More reranking work

Possible duplicate results
```

---

## 12.5 Query Decomposition

Break a complex query into smaller questions.

Original:

```text
Compare our 2025 and 2026 expense policies
and explain which approval rules changed.
```

Subqueries:

```text
What were the 2025 expense approval rules?

What are the 2026 expense approval rules?

What differences exist between them?
```

Use decomposition for:

```text
Multi-hop questions

Comparisons

Questions involving several entities

Questions requiring evidence from different documents
```

---

## 12.6 Hypothetical Document Embeddings

Concept:

```text
Question
      ↓
Generate a hypothetical ideal answer
      ↓
Embed hypothetical answer
      ↓
Search for similar real documents
```

This can help bridge the gap between short questions and document-style passages.

Use carefully because the hypothetical answer may introduce incorrect assumptions.

---

## 12.7 Routing Queries

Route questions to different sources.

```text
Policy question
      ↓
Policy vector index

Sales question
      ↓
SQL analytics tool

Current weather question
      ↓
Weather API
```

Routing may be:

```text
Rule-based

Classifier-based

LLM-based

Metadata-based
```

Use deterministic routing when exact rules are available.

---

