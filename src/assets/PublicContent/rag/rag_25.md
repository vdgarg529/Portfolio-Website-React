# Chapter 25: RAG Evaluation

## 25.1 Why Evaluate RAG Separately?

RAG has several components that can fail independently.

```text
Retriever may miss the source.

Reranker may order results incorrectly.

Prompt may hide important evidence.

Generator may ignore the context.

Citation may point to the wrong passage.
```

Therefore, evaluate:

```text
Retrieval

Context

Generation

Citations

End-to-end usefulness
```

RAGAS introduced metrics intended to evaluate retrieval quality, faithful context use and answer quality as separate dimensions.

---

## 25.2 Evaluation Dataset

An evaluation example may contain:

```python
example = {
    "question": (
        "What is the manager approval threshold?"
    ),
    "expected_answer": "₹7,500",
    "relevant_document_ids": [
        "expense-policy-2026"
    ],
    "expected_citations": [
        {
            "document_id": "expense-policy-2026",
            "page": 4
        }
    ]
}
```

---

## 25.3 Retrieval Metrics

### Hit Rate

Did at least one relevant document appear in the top-k results?

```text
Hit@k =
1 if a relevant result appears in top k
0 otherwise
```

---

### Recall@k

```text
Relevant documents retrieved in top k
÷
Total relevant documents
```

---

### Precision@k

```text
Relevant documents in top k
÷
k
```

---

### Mean Reciprocal Rank

Measures how high the first relevant result appears.

```text
MRR =
Average of 1 / rank of first relevant result
```

---

### Normalized Discounted Cumulative Gain

NDCG considers:

```text
Result relevance

Ranking position

Different relevance levels
```

Use it when documents have graded relevance.

---

## 25.4 Context Metrics

Evaluate:

```text
Context relevance

Context precision

Context recall

Context redundancy

Context completeness
```

---

## 25.5 Generation Metrics

```text
Answer correctness

Faithfulness

Answer relevance

Completeness

Clarity

Instruction following
```

---

## 25.6 Faithfulness

Faithfulness asks:

```text
Are the answer’s factual claims supported by
the retrieved context?
```

An answer can be correct but unfaithful if it uses unsupported model knowledge.

---

## 25.7 Citation Metrics

```text
Citation precision:
How many citations actually support their claims?

Citation recall:
How many supported claims include citations?

Citation correctness:
Does the cited passage contain the stated evidence?
```

---

## 25.8 Human Evaluation

Human reviewers can score:

```text
Correctness

Usefulness

Evidence quality

Clarity

Safety

Business applicability
```

Use clear rubrics rather than vague judgments such as:

```text
Looks good.
```

---

## 25.9 LLM-as-Judge

A model can evaluate:

```text
Groundedness

Relevance

Completeness

Citation support
```

Limitations:

```text
Judge bias

Model inconsistency

Preference for verbose answers

Shared errors with the generator
```

Validate LLM judges against human-labelled examples.

---

## 25.10 Offline Evaluation

Use a fixed dataset before deployment.

```text
Change chunk size
      ↓
Run evaluation
      ↓
Compare retrieval and answer scores
```

---

## 25.11 Online Evaluation

Monitor production behaviour.

```text
User feedback

Abstention rate

Search reformulation rate

Unanswered questions

Citation clicks

Escalations

Latency

Cost
```

---

