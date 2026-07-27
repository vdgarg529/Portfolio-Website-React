# Chapter 13: Retrieval Strategies

## 13.1 Top-k Retrieval

Return the top `k` chunks.

```python
top_k = 5
```

Small `k`:

```text
Less context

Lower cost

Risk of missing evidence
```

Large `k`:

```text
Higher recall

More tokens

More irrelevant content

Greater chance of confusing the model
```

---

## 13.2 Similarity Threshold

Retrieve only chunks above a score threshold.

```python
selected = [
    result
    for result in results
    if result["score"] >= 0.65
]
```

Benefits:

```text
Avoids inserting extremely irrelevant context
```

Risk:

```text
Score scales vary across embedding models and indexes.
```

Thresholds must be calibrated using evaluation data.

---

## 13.3 Maximum Marginal Relevance

Maximum Marginal Relevance balances:

```text
Query relevance
and
Result diversity
```

It reduces retrieval of nearly identical chunks.

Use when:

```text
Documents contain repeated passages.

Top results are highly redundant.

Several perspectives are useful.
```

---

## 13.4 Parent Document Retrieval

```text
Retrieve small child chunk
      ↓
Return its complete parent section
```

Use when:

```text
Small chunks retrieve accurately.

The LLM needs broader context to answer.
```

---

## 13.5 Hierarchical Retrieval

```text
Retrieve relevant document
      ↓
Retrieve relevant section
      ↓
Retrieve relevant passage
```

Hierarchical retrieval helps preserve document-level and passage-level context and has been explored as an alternative to flat passage retrieval.

---

## 13.6 Metadata-Aware Retrieval

Example:

```text
Question:
What is the current travel limit?

Filters:
document_type = policy
status = active
effective_date <= today
department = finance
```

This is more reliable than retrieving from every historical policy version.

---

## 13.7 Time-Aware Retrieval

Rank recent documents more strongly.

Example score:

```text
Final score
=
semantic relevance
+
recency boost
```

Use when:

```text
Policies change

Product documentation is versioned

News or incidents are time-sensitive
```

Do not prioritize recent documents blindly when older authoritative records remain valid.

---

