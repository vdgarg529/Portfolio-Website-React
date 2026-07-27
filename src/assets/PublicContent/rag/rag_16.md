# Chapter 16: RAG Prompting

## 16.1 Basic Grounded Prompt

```text
You are a helpful assistant.

Answer the question only using the supplied context.

If the context does not contain enough information,
state that the answer is unavailable.

Do not invent facts.

Include source references for important claims.

Context:
{context}

Question:
{question}
```

---

## 16.2 Good RAG Prompt Elements

```text
Role

Grounding instruction

Context boundary

Question

Citation instructions

Missing-information behaviour

Conflict-handling rule

Output format
```

---

## 16.3 Separate Instructions from Context

Use clear delimiters.

```text
<instructions>
Use only the supplied evidence.
</instructions>

<context>
Retrieved document contents
</context>

<question>
User question
</question>
```

Retrieved documents must be treated as untrusted data, not trusted system instructions.

---

## 16.4 Context Formatting

```python
def format_context(
    documents: list[dict]
) -> str:
    blocks = []

    for index, document in enumerate(
        documents,
        start=1
    ):
        blocks.append(
            f"""
[SOURCE {index}]
Name: {document["source"]}
Page: {document.get("page", "unknown")}
Content:
{document["text"]}
""".strip()
        )

    return "\n\n".join(blocks)
```

---

## 16.5 Missing Information

The model should be instructed to say:

```text
The supplied sources do not contain enough
information to answer this question.
```

instead of filling missing details from imagination.

---

## 16.6 Answer Scope

The model should answer only the user’s question.

Avoid:

```text
Repeating every retrieved passage

Including irrelevant background

Inventing recommendations not supported by sources
```

---

