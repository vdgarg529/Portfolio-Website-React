# Chapter 8: Embeddings

## 8.1 What Is an Embedding?

An embedding is a numerical representation of text.

Conceptually:

```text
"How do I cancel my order?"
      ↓
[0.14, -0.27, 0.88, ...]
```

Texts with similar meanings should have vectors located close to one another.

---

## 8.2 Embedding Uses in RAG

Embeddings are commonly generated for:

```text
Document chunks

User queries

Titles

Images in multimodal systems

Metadata descriptions
```

---

## 8.3 Bi-Encoder Retrieval

A bi-encoder encodes the query and documents separately.

```text
Query → Query embedding

Document → Document embedding
```

Similarity can then be calculated efficiently.

Dense Passage Retrieval demonstrated a dual-encoder approach in which questions and passages are encoded into dense representations for retrieval.

---

## 8.4 Query and Document Encoding

For asymmetric semantic search, current Sentence Transformers guidance recommends using query-specific and document-specific encoding methods where supported.

Example:

```python
from sentence_transformers import (
    SentenceTransformer
)


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

documents = [
    "Employees can claim travel expenses.",
    "Refunds require a valid order number.",
    "Passwords must be at least twelve characters."
]

document_vectors = model.encode_document(
    documents,
    normalize_embeddings=True
)

query = "What is required for a refund?"

query_vector = model.encode_query(
    [query],
    normalize_embeddings=True
)
```

---

## 8.5 Similarity Measures

### Cosine similarity

Measures the angle between vectors.

```text
Higher cosine similarity
=
More similar direction
```

Formula:

```text
cosine_similarity(A, B)
=
(A · B) / (||A|| × ||B||)
```

---

### Dot product

```text
A · B
```

Often used with normalized vectors.

---

### Euclidean distance

Measures straight-line distance between vectors.

```text
Smaller distance
=
More similar vectors
```

---

## 8.6 Embedding Model Selection

Consider:

```text
Language support

Domain support

Embedding dimension

Maximum input length

Retrieval quality

Latency

Cost

Deployment requirements

Privacy

Query/document instruction support
```

---

## 8.7 General vs Domain Embeddings

General embedding model:

```text
Useful across many topics.
```

Domain-specific model:

```text
Trained or fine-tuned for legal, medical,
financial or technical content.
```

Use domain-specific embeddings when general models fail to distinguish important terminology.

---

## 8.8 Multilingual Embeddings

Use multilingual embeddings when:

```text
Documents use several languages.

Questions and documents may use different languages.

Cross-language retrieval is required.
```

Example:

```text
Question in Hindi
      ↓
Retrieve an English policy document
```

---

## 8.9 Embedding Consistency

The same embedding model and configuration should generally be used for:

```text
Indexing documents

Encoding search queries
```

If the model changes:

```text
Existing document vectors may need to be regenerated.
```

Store metadata such as:

```text
embedding_model
embedding_version
embedding_dimension
normalization_method
indexed_at
```

---

