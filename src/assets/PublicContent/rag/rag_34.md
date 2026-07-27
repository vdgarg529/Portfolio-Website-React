# Chapter 34: Common RAG Mistakes

## 34.1 Building RAG Before Defining Questions

Start with:

```text
What questions must the system answer?

Which documents contain those answers?

What evidence should be retrieved?
```

Do not index everything without defining expected use cases.

---

## 34.2 Choosing Chunk Size Without Evaluation

A chunk size that works for one dataset may fail for another.

Use retrieval metrics and real questions.

---

## 34.3 Using Only Vector Search

Vector search may miss:

```text
Exact product IDs

Error codes

Legal references

Names

Acronyms
```

Consider hybrid search.

---

## 34.4 Retrieving Too Many Chunks

More context is not always better.

Excessive context creates:

```text
Higher cost

Higher latency

More distraction

More contradictions
```

---

## 34.5 Returning Results Without Reranking

A fast retriever optimizes candidate search, not always final relevance.

Use reranking when quality matters.

---

## 34.6 Ignoring Document Versions

A model may retrieve an obsolete policy and a current policy together.

Store:

```text
Effective date

Expiration date

Status

Version
```

---

## 34.7 No Permission Filtering

This is a serious security failure.

Never retrieve unauthorized documents into model context.

---

## 34.8 Treating Citations as Decoration

A citation must actually support the claim.

---

## 34.9 Testing Only Final Answers

Evaluate retrieval separately.

Otherwise, it is difficult to know whether the failure came from:

```text
Retriever

Reranker

Prompt

Generator
```

---

## 34.10 Using RAG for Every Problem

RAG is not necessary for:

```text
Creative writing

Simple transformations

General brainstorming

Deterministic calculations

Questions fully contained in the user message
```

---

## 34.11 Assuming RAG Eliminates Hallucinations

RAG can reduce unsupported answers, but the model may still:

```text
Misread evidence

Combine unrelated facts

Ignore context

Invent citations

Overstate certainty
```

---

