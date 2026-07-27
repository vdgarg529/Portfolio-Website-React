# Chapter 9: Vector Indexes and Vector Databases

## 9.1 What Is a Vector Index?

A vector index stores embeddings and searches for nearby vectors.

```text
Query embedding
      ↓
Nearest-neighbour search
      ↓
Top matching document embeddings
```

FAISS is an established library for efficient similarity search and clustering over dense vectors.

---

## 9.2 Exact Search

Exact search compares the query against every vector.

Benefits:

```text
Exact nearest neighbours

Simple behaviour
```

Limitations:

```text
Slower for very large collections

Higher computation cost
```

Use for:

```text
Small datasets

Evaluation baselines

Development
```

---

## 9.3 Approximate Nearest-Neighbour Search

Approximate search trades a small amount of recall for much faster search.

Common index families include:

```text
HNSW

IVF

Product quantization

Graph-based indexes
```

Use for:

```text
Hundreds of thousands or millions of chunks

Low-latency production search

Large embedding collections
```

---

## 9.4 Simple FAISS Index

```python
import faiss
import numpy as np


document_vectors = np.asarray(
    document_vectors,
    dtype="float32"
)

dimension = document_vectors.shape[1]

index = faiss.IndexFlatIP(
    dimension
)

index.add(
    document_vectors
)

scores, indices = index.search(
    np.asarray(
        query_vector,
        dtype="float32"
    ),
    k=3
)
```

Retrieve documents:

```python
retrieved_documents = [
    documents[index_value]
    for index_value in indices[0]
]
```

---

## 9.5 Vector Database Features

A production vector database may provide:

```text
Persistent storage

Approximate search

Metadata filtering

Namespaces

Deletion and update

Replication

Hybrid search

Backups

Access control

Monitoring
```

---

## 9.6 Metadata Filtering

Example:

```python
filter_query = {
    "department": "Finance",
    "tenant_id": "tenant-101",
    "updated_at": {
        "$gte": "2026-01-01"
    }
}
```

Use metadata filtering for:

```text
Tenant isolation

Permission enforcement

Date restrictions

Product filtering

Document type

Language

Department
```

---

## 9.7 Filtering Before vs After Search

### Pre-filtering

Filter candidates before vector search.

```text
Filter Finance documents
      ↓
Run semantic search
```

Benefits:

```text
Better security

Less irrelevant search space
```

---

### Post-filtering

Run vector search, then remove invalid candidates.

Problem:

```text
The top results may all be removed,
leaving too few useful documents.
```

For permissions, prefer secure pre-filtering or enforced filtered retrieval.

---

## 9.8 Vector Database Selection

Evaluate:

```text
Expected vector count

Latency requirements

Metadata filtering

Hybrid search

Managed vs self-hosted

Cost

Replication

Backup

Tenant isolation

Regional hosting

Operational expertise
```

---

