# Chapter 3: Basic RAG Architecture

## 3.1 Offline Indexing Pipeline

The offline pipeline prepares documents for retrieval.

```text
Raw documents
      ↓
Load documents
      ↓
Clean and normalize
      ↓
Split into chunks
      ↓
Generate embeddings
      ↓
Store vectors and metadata
```

This usually happens:

```text
When documents are first added

When documents change

On a scheduled indexing job

When an administrator requests reindexing
```

---

## 3.2 Online Query Pipeline

The online pipeline runs when the user asks a question.

```text
User question
      ↓
Process or rewrite query
      ↓
Generate query representation
      ↓
Search index
      ↓
Retrieve candidate chunks
      ↓
Filter or rerank
      ↓
Construct context
      ↓
Generate grounded answer
      ↓
Return answer and citations
```

---

## 3.3 Main RAG Components

```text
Data source

Document loader

Document parser

Text cleaner

Chunker

Embedding model

Vector or search index

Retriever

Reranker

Prompt builder

Generator model

Citation generator

Evaluation system
```

---

## 3.4 Minimal RAG

A minimal RAG system contains:

```text
Documents
Chunking
Embeddings
Vector search
Prompt
LLM
```

---

## 3.5 Production RAG

A production RAG system may also contain:

```text
Metadata filters
Keyword search
Hybrid retrieval
Query rewriting
Reranking
Access control
Source citations
Caching
Observability
Evaluation
Fallback behaviour
Human feedback
```

---

