# Chapter 10: Sparse Retrieval

## 10.1 What Is Sparse Retrieval?

Sparse retrieval represents text using terms or tokens rather than dense semantic vectors.

Common approaches:

```text
TF-IDF

BM25

Inverted indexes
```

---

## 10.2 Sparse Retrieval Strengths

Sparse retrieval performs well for:

```text
Exact keywords

Product codes

Error messages

Legal clause numbers

Names

Acronyms

Identifiers

Rare technical terms
```

Example:

```text
Query:
CUDA_ERROR_OUT_OF_MEMORY

Keyword retrieval may outperform semantic search
because the exact error code is important.
```

---

## 10.3 Sparse Retrieval Limitations

```text
Weak understanding of paraphrases

Vocabulary mismatch

May miss semantically equivalent wording
```

Example:

```text
Query:
How do I end my membership?

Document:
Subscription cancellation procedure
```

Dense retrieval may match this better.

---

## 10.4 TF-IDF Example

```python
from sklearn.feature_extraction.text import (
    TfidfVectorizer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)


vectorizer = TfidfVectorizer(
    stop_words="english"
)

document_matrix = vectorizer.fit_transform(
    documents
)

query_matrix = vectorizer.transform(
    [query]
)

scores = cosine_similarity(
    query_matrix,
    document_matrix
)[0]

top_indices = scores.argsort()[::-1][:3]
```

---

