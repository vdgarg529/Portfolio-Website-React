# Chapter 37: Final RAG Checklist

```text
[ ] The business questions are clearly defined.

[ ] Authoritative data sources have been identified.

[ ] Document permissions are available.

[ ] Parsing quality has been tested.

[ ] Metadata contains source and version information.

[ ] Chunking has been evaluated using real questions.

[ ] Embedding-model versions are stored.

[ ] Sparse retrieval has been considered.

[ ] Hybrid retrieval has been evaluated.

[ ] Metadata filters are applied before context exposure.

[ ] Candidate count and final context count are separate.

[ ] Reranking has been evaluated.

[ ] Duplicate context is removed.

[ ] Conflicting sources are handled explicitly.

[ ] The model is instructed to abstain when evidence is missing.

[ ] Retrieved content is treated as untrusted data.

[ ] Citations map to real source passages.

[ ] Retrieval metrics are measured.

[ ] Answer faithfulness is measured.

[ ] Permission leakage is tested.

[ ] Index freshness is monitored.

[ ] Latency is measured by pipeline stage.

[ ] Costs are monitored.

[ ] Production traces preserve retrieval evidence.

[ ] Rollback is possible after index updates.

[ ] User feedback is incorporated into evaluation.
```

---

# Final Concept Summary

RAG answers:

```text
How can a language model use external knowledge
before generating an answer?
```

Ingestion answers:

```text
How should source information be prepared?
```

Chunking answers:

```text
What unit of information should be retrieved?
```

Embeddings answer:

```text
How can semantic meaning be represented numerically?
```

Sparse retrieval answers:

```text
How can exact words and identifiers be matched?
```

Dense retrieval answers:

```text
How can conceptually similar information be found?
```

Hybrid retrieval answers:

```text
How can semantic and exact matching be combined?
```

Reranking answers:

```text
Which retrieved candidates are most useful?
```

Context construction answers:

```text
What evidence should be sent to the model?
```

Generation answers:

```text
How should the model produce a grounded response?
```

Citations answer:

```text
Which sources support the generated claims?
```

Evaluation answers:

```text
Which component is working or failing?
```

Security answers:

```text
Which information may this user retrieve?
```

The most important RAG principle is:

```text
A RAG system is only as reliable as:

Its data,
its retrieval,
its context,
and its evaluation.
```

A strong RAG system should be:

```text
Grounded

Permission-aware

Source-backed

Evaluated

Observable

Versioned

Secure

Able to abstain
```
