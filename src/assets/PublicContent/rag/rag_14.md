# Chapter 14: Reranking

## 14.1 What Is Reranking?

Reranking applies a more accurate model to a smaller set of retrieved candidates.

```text
Retrieve top 30 candidates quickly
      ↓
Rerank using stronger model
      ↓
Keep top 5
```

---

## 14.2 Why Rerank?

Initial retrieval models must search large collections efficiently.

They may return:

```text
Semantically related but unhelpful chunks

Duplicate chunks

Chunks missing the exact answer

Chunks matching only part of the question
```

A reranker performs a more detailed query-document comparison.

---

## 14.3 Cross-Encoder Reranking

A cross-encoder jointly processes:

```text
Query + document
```

and returns a relevance score.

Cross-encoders are commonly used as second-stage rerankers after a faster bi-encoder retrieves candidates.

Example:

```python
from sentence_transformers import (
    CrossEncoder
)


reranker = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

pairs = [
    [query, document]
    for document in retrieved_documents
]

scores = reranker.predict(
    pairs
)

ranked = sorted(
    zip(
        retrieved_documents,
        scores
    ),
    key=lambda item: item[1],
    reverse=True
)
```

---

## 14.4 Bi-Encoder vs Cross-Encoder

### Bi-encoder

```text
Encodes query and documents separately.

Document vectors can be precomputed.

Fast enough for large collections.

Usually used for candidate retrieval.
```

### Cross-encoder

```text
Processes query and document together.

More expensive.

Cannot normally precompute one standalone document score.

Usually used to rerank a limited candidate set.
```

---

## 14.5 LLM-Based Reranking

An LLM can rank candidates by asking:

```text
Which passages contain evidence needed
to answer the question?
```

Benefits:

```text
Can understand complex relevance

Can handle multiple criteria
```

Limitations:

```text
Higher cost

Higher latency

Potentially inconsistent ranking
```

---

## 14.6 Diversity-Aware Reranking

A reranker may consider:

```text
Relevance

Source diversity

Document authority

Recency

Redundancy

Permission

Citation quality
```

---

