# Chapter 20: Adaptive and Corrective RAG

## 20.1 Adaptive Retrieval

Adaptive RAG decides whether retrieval is necessary.

Example:

```text
Question:
Write a friendly greeting.

Retrieval:
Not required.
```

```text
Question:
What is our current reimbursement limit?

Retrieval:
Required.
```

---

## 20.2 Retrieval Quality Evaluation

After retrieval, evaluate:

```text
Are the documents relevant?

Do they contain the answer?

Are they authoritative?

Are they current?

Do they conflict?
```

---

## 20.3 Corrective RAG

Corrective RAG evaluates retrieved information and may trigger corrective actions such as a different retrieval method or external search when initial retrieval is poor.

Conceptual flow:

```text
Retrieve documents
      ↓
Evaluate quality
      ↓
Good?
 ┌────┴─────┐
Yes          No
↓             ↓
Generate     Rewrite query
             Search another source
             Filter irrelevant text
```

---

## 20.4 Self-RAG

Self-RAG introduced adaptive retrieval and self-reflection mechanisms in which a model learns when to retrieve and how to critique retrieved passages and generated responses.

Conceptually:

```text
Is retrieval required?
      ↓
Retrieve
      ↓
Is evidence relevant?
      ↓
Generate
      ↓
Is answer supported?
      ↓
Revise if necessary
```

---

## 20.5 Practical Self-Checking

A production system does not have to reproduce the full Self-RAG training method.

It can implement a simpler workflow:

```text
Generate answer
      ↓
Ask evaluator:
Is every claim supported by context?
      ↓
Unsupported?
      ↓
Revise or abstain
```

---

