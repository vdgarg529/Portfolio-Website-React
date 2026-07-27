# Chapter 15: Context Construction

## 15.1 What Is Context Construction?

Context construction decides what retrieved information is passed to the LLM and how it is formatted.

```text
Retrieved candidates
      ↓
Remove duplicates
      ↓
Rerank
      ↓
Select evidence
      ↓
Order passages
      ↓
Add source labels
      ↓
Construct prompt context
```

---

## 15.2 Context Budget

The context budget is the maximum number of tokens allocated to retrieved information.

Example:

```text
Model context:
32,000 tokens

System instructions:
2,000

Conversation:
5,000

Output allowance:
4,000

Remaining retrieval budget:
21,000
```

Do not fill the entire model context unnecessarily.

---

## 15.3 Context Ordering

Possible strategies:

```text
Most relevant first

Chronological

Document order

Group by source

Evidence followed by counter-evidence
```

For multi-document questions, grouping by source may improve readability and citation mapping.

---

## 15.4 Deduplication

Remove exact duplicates:

```python
unique_chunks = list(
    dict.fromkeys(
        retrieved_chunks
    )
)
```

Semantic deduplication may be required for nearly identical chunks.

---

## 15.5 Context Compression

Context compression removes irrelevant text from retrieved chunks.

```text
Retrieved section:
2,000 tokens

Relevant sentences:
350 tokens
```

Compression methods:

```text
Extract matching sentences

LLM-based extraction

Keyword windows

Entity-based filtering

Summarization
```

Compression must preserve evidence and source references.

---

## 15.6 Lost-in-the-Middle Problem

Models may pay less attention to evidence positioned in the middle of very long prompts.

Possible mitigation:

```text
Reduce irrelevant context

Place strongest evidence early

Repeat critical evidence near the question

Group related evidence

Use smaller context windows
```

---

## 15.7 Conflicting Sources

Do not silently combine contradictory information.

Prompt the model to:

```text
Identify disagreement

Compare document dates

Compare authority

Explain uncertainty

Avoid selecting one claim without justification
```

Example context format:

```text
Source A — Policy 2025:
Approval limit is ₹5,000.

Source B — Policy 2026:
Approval limit is ₹7,500.
```

---

