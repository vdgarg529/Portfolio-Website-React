# Chapter 18: Conversational RAG

## 18.1 The Follow-Up Question Problem

Example:

```text
User:
What is the leave policy?

Assistant:
Employees receive 20 days.

User:
What about contractors?
```

The second query is incomplete by itself.

---

## 18.2 Query Contextualization

Rewrite:

```text
What leave policy applies to contractors?
```

before retrieval.

---

## 18.3 Conversation History

Do not automatically include the complete conversation in every retrieval query.

Use:

```text
Recent relevant turns

Conversation summary

Resolved references

Current user intent
```

---

## 18.4 Memory vs Retrieval

Conversation memory stores:

```text
What the user previously said
```

RAG retrieves:

```text
What external sources say
```

Both may be used together.

---

## 18.5 Conversational RAG Flow

```text
User message
      ↓
Resolve references using history
      ↓
Create standalone query
      ↓
Retrieve documents
      ↓
Generate answer using documents and relevant history
```

---

## 18.6 Avoid History Contamination

Previous model answers may be wrong.

Do not treat an earlier AI response as authoritative evidence.

Use authoritative external sources for factual claims.

---

