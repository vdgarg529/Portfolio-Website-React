# Chapter 24: Structured and Database RAG

## 24.1 RAG over Databases

For database questions, a system may:

```text
Retrieve schema
      ↓
Generate SQL
      ↓
Validate SQL
      ↓
Execute query
      ↓
Explain result
```

---

## 24.2 Do Not Embed Every Database Row Blindly

Embeddings may be unsuitable for:

```text
Precise aggregation

Filtering

Counting

Joining

Sorting

Current balances
```

Example:

```text
What was total sales in June?
```

This should normally use a database query rather than semantic chunk retrieval.

---

## 24.3 Semantic Layer

A semantic layer defines:

```text
Business metrics

Dimensions

Relationships

Allowed joins

Metric definitions
```

Example:

```text
Revenue:
Sum of completed order amount,
excluding tax and cancelled orders.
```

This reduces ambiguity in generated queries.

---

## 24.4 RAG Plus SQL

```text
Retrieve:
Schema, metric definitions and examples.

Generate:
SQL query.

Execute:
Database tool.

Generate:
Natural-language explanation.
```

---

## 24.5 SQL Safety

Use:

```text
Read-only database user

Query allow list

Statement parser

Row limits

Timeout

Cost limit

Human approval for writes
```

Never execute arbitrary model-generated SQL against production without validation.

---

