# Chapter 28: Production RAG Architecture

## 28.1 Recommended Architecture

```text
Data sources
      ↓
Ingestion workers
      ↓
Parsing and chunking
      ↓
Embedding service
      ↓
Search indexes
      ↓
Retrieval API
      ↓
Reranker
      ↓
Context builder
      ↓
Generation service
      ↓
Citation validator
      ↓
Application API
```

---

## 28.2 Separate Ingestion and Query Services

### Ingestion service

```text
Document processing

Chunking

Embedding

Index updates

Deletion

Versioning
```

### Query service

```text
Query rewriting

Retrieval

Reranking

Prompt construction

Generation

Citation output
```

Benefits:

```text
Independent scaling

Simpler deployment

Clearer failures

Separate security controls
```

---

## 28.3 Version Everything

Store:

```text
Document version

Parser version

Chunker version

Embedding model version

Index version

Prompt version

Generator model version

Reranker version
```

This supports reproducibility and rollback.

---

## 28.4 Blue-Green Index Deployment

```text
Active index:
version A

Build:
version B

Evaluate version B

Switch traffic to version B

Keep version A for rollback
```

Avoid updating a production index destructively without a rollback strategy.

---

## 28.5 Observability

Trace:

```text
Original question

Rewritten question

Applied filters

Retrieved document IDs

Retrieval scores

Reranking scores

Context sent to model

Generated answer

Citations

Latency

Token usage

Errors
```

---

## 28.6 Important Production Metrics

```text
Retrieval latency

Generation latency

End-to-end latency

Hit rate

Abstention rate

User satisfaction

Citation correctness

Index freshness

Embedding cost

Generation cost

Error rate
```

---

