# Chapter 11: Hybrid Retrieval

## 11.1 What Is Hybrid Retrieval?

Hybrid retrieval combines:

```text
Dense semantic retrieval
+
Sparse keyword retrieval
```

Flow:

```text
Query
 ├── Dense search
 └── Keyword search
          ↓
Combine rankings
          ↓
Return candidates
```

---

## 11.2 Why Hybrid Retrieval?

Dense retrieval handles:

```text
Meaning

Paraphrases

Conceptual similarity
```

Sparse retrieval handles:

```text
Exact terms

Codes

Names

Identifiers
```

Combining them often provides more reliable coverage.

---

## 11.3 Score Fusion

A simple weighted approach:

```text
Final score
=
0.6 × dense score
+
0.4 × sparse score
```

Before combining, scores may need normalization.

```python
def min_max_normalize(
    values: list[float]
) -> list[float]:
    minimum = min(values)
    maximum = max(values)

    if maximum == minimum:
        return [0.0 for _ in values]

    return [
        (value - minimum)
        / (maximum - minimum)
        for value in values
    ]
```

---

## 11.4 Reciprocal Rank Fusion

Reciprocal Rank Fusion combines ranks rather than raw scores.

Formula:

```text
RRF score(document)
=
Σ 1 / (constant + rank)
```

Example:

```python
def reciprocal_rank_fusion(
    rankings: list[list[str]],
    constant: int = 60
) -> list[tuple[str, float]]:
    combined_scores = {}

    for ranking in rankings:
        for rank, document_id in enumerate(
            ranking,
            start=1
        ):
            combined_scores[document_id] = (
                combined_scores.get(
                    document_id,
                    0.0
                )
                + 1.0 / (
                    constant + rank
                )
            )

    return sorted(
        combined_scores.items(),
        key=lambda item: item[1],
        reverse=True
    )
```

Use RRF when different retrieval systems produce scores that are difficult to compare directly.

---

