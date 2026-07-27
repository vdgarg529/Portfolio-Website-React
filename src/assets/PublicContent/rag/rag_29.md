# Chapter 29: Latency and Cost Optimization

## 29.1 RAG Latency Components

```text
Query rewriting

Embedding generation

Vector search

Keyword search

Reranking

Context construction

LLM generation
```

Measure every stage separately.

---

## 29.2 Caching

Cache:

```text
Query embeddings

Repeated retrieval results

Static document summaries

Document embeddings

Reranking results for repeated queries
```

Avoid caching when:

```text
Permissions differ

Documents change frequently

The answer depends on real-time data

User-specific context matters
```

---

## 29.3 Reduce Retrieved Context

Instead of sending 20 complete chunks:

```text
Retrieve 20
      ↓
Rerank
      ↓
Send top 4
```

---

## 29.4 Use Smaller Models for Subtasks

Use smaller models for:

```text
Query classification

Query rewriting

Document relevance grading

Citation formatting
```

Use a stronger model for complex final generation when required.

---

## 29.5 Parallel Retrieval

Run independent searches concurrently.

```python
import asyncio


async def retrieve_all(
    query: str
):
    dense_result, sparse_result = (
        await asyncio.gather(
            dense_search(query),
            sparse_search(query)
        )
    )

    return dense_result, sparse_result
```

---

## 29.6 Batch Embeddings

Instead of embedding one chunk per request:

```python
vectors = model.encode_document(
    document_chunks,
    batch_size=64
)
```

Batching improves ingestion throughput.

---

