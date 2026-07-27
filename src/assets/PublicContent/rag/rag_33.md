# Chapter 33: When to Use What

## Dense Retrieval

Use when:

```text
Meaning and paraphrases matter.

Users and documents use different wording.

The knowledge base contains natural-language text.
```

---

## Sparse Retrieval

Use when:

```text
Exact terms matter.

Queries contain IDs, codes or names.

Technical keywords must match precisely.
```

---

## Hybrid Retrieval

Use when:

```text
Both conceptual similarity and exact terms matter.

The domain contains technical terminology.

Retrieval reliability is more important than simplicity.
```

---

## Reranking

Use when:

```text
Initial retrieval returns noisy results.

The collection is large.

Answer quality justifies additional latency.
```

---

## Metadata Filtering

Use when:

```text
Permissions matter.

Documents are versioned.

Queries target one product, department or tenant.
```

---

## Query Rewriting

Use when:

```text
Queries are conversational.

Pronouns need resolution.

User wording differs from document terminology.
```

---

## Query Decomposition

Use when:

```text
The question has multiple parts.

Several evidence sources are required.

The answer requires multi-hop reasoning.
```

---

## Parent-Child Retrieval

Use when:

```text
Small chunks retrieve accurately,
but the LLM needs larger surrounding context.
```

---

## Agentic RAG

Use when:

```text
Retrieval is optional.

Several knowledge sources exist.

The number of retrieval rounds is unknown.

The system must reason about missing evidence.
```

---

## Graph RAG

Use when:

```text
Entity relationships are central.

Questions frequently require several hops.

The domain naturally forms a graph.
```

---

## SQL or Database Tools

Use when:

```text
Exact calculations, aggregations,
filters or joins are required.
```

---

