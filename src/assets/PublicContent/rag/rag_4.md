# Chapter 4: Types of RAG

## 4.1 Naive RAG

Naive RAG performs:

```text
Question
   ↓
Retrieve top-k chunks
   ↓
Place chunks in prompt
   ↓
Generate answer
```

Use naive RAG for:

```text
Learning

Small demonstrations

Simple knowledge bases

Early prototypes
```

Limitations:

```text
No query rewriting

No reranking

No context-quality checks

No retrieval fallback

Fixed top-k retrieval

Weak citation control
```

---

## 4.2 Advanced RAG

Advanced RAG adds improvements before and after retrieval.

Examples:

```text
Metadata filtering

Hybrid search

Query expansion

Query decomposition

Reranking

Context compression

Parent-child retrieval

Answer verification
```

---

## 4.3 Modular RAG

Modular RAG treats each stage as a replaceable component.

```text
Query processor
      ↓
Retriever
      ↓
Reranker
      ↓
Context builder
      ↓
Generator
      ↓
Evaluator
```

Benefits:

```text
Individual components can be tested.

Different retrievers can be compared.

Models can be changed independently.

Failures can be diagnosed more easily.
```

---

## 4.4 Agentic RAG

Agentic RAG allows an agent to decide:

```text
Whether retrieval is required

Which source should be searched

How many searches should run

Whether the query should be rewritten

Whether enough evidence has been found

Whether another retrieval round is required
```

Example:

```text
User question
      ↓
Agent analyses question
      ↓
Search policy documents
      ↓
Search support tickets
      ↓
Compare evidence
      ↓
Generate response
```

Agentic RAG is more flexible but usually has:

```text
Higher latency

Higher cost

More complex evaluation

Less predictable execution
```

---

