# Chapter 19: Multi-Hop RAG

## 19.1 What Is Multi-Hop Retrieval?

Multi-hop questions require evidence from multiple sources or retrieval steps.

Example:

```text
Which customer requirement caused the policy change,
and which later deal benefited from the fix?
```

This may require:

```text
Retrieve customer requirement

Retrieve engineering change

Retrieve later sales deal

Connect evidence
```

---

## 19.2 Iterative Retrieval

```text
Initial question
      ↓
Retrieve first evidence
      ↓
Identify missing entity
      ↓
Create follow-up query
      ↓
Retrieve additional evidence
      ↓
Generate final answer
```

---

## 19.3 Query Planning

Create a plan:

```text
1. Identify the policy change.
2. Find the customer request that triggered it.
3. Find later deals mentioning the fix.
4. Compare dates and evidence.
```

---

## 19.4 Stopping Conditions

An iterative RAG system should stop when:

```text
All required subquestions are answered

Evidence confidence is sufficient

Maximum retrieval rounds are reached

No new useful information is found

Token or cost limit is reached
```

---

