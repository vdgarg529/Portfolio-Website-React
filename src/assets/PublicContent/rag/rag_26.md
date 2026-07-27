# Chapter 26: Failure Analysis

## 26.1 Common Failure Categories

```text
Data failure

Chunking failure

Embedding failure

Retrieval failure

Reranking failure

Context failure

Generation failure

Citation failure

Security failure
```

---

## 26.2 Data Failure

Symptoms:

```text
Correct source does not exist in index.

Document is outdated.

Document parsing failed.

Important table was lost.
```

Fix:

```text
Improve ingestion

Track document versions

Validate parsed content

Add ingestion tests
```

---

## 26.3 Chunking Failure

Symptoms:

```text
Answer is divided across several chunks.

Heading is separated from its content.

Retrieved chunk lacks necessary context.
```

Fix:

```text
Increase overlap

Use structure-aware chunking

Use parent-child retrieval

Store headings in chunk text
```

---

## 26.4 Retrieval Failure

Symptoms:

```text
Correct chunk is indexed but not returned.
```

Fix:

```text
Improve query rewriting

Use hybrid search

Change embedding model

Increase candidate count

Add metadata filters

Fine-tune retriever
```

---

## 26.5 Reranking Failure

Symptoms:

```text
Relevant document is retrieved but ranked too low.
```

Fix:

```text
Use a stronger reranker

Fine-tune reranker

Include title and metadata in ranking input

Increase first-stage candidate count
```

---

## 26.6 Context Failure

Symptoms:

```text
Correct chunk is retrieved but omitted from prompt.

Too many irrelevant chunks hide the evidence.

Contradictory policies are mixed.
```

Fix:

```text
Improve context selection

Compress context

Order sources carefully

Deduplicate chunks

Handle conflicting versions
```

---

## 26.7 Generation Failure

Symptoms:

```text
Evidence is present but model answers incorrectly.

Model ignores instructions.

Answer contains unsupported claims.
```

Fix:

```text
Improve grounding prompt

Use a stronger generator

Require structured evidence mapping

Add answer verification

Reduce noisy context
```

---

