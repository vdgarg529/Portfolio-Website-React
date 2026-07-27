# Chapter 7: Chunking

## 7.1 What Is Chunking?

Chunking divides large documents into smaller units for retrieval.

Example:

```text
100-page manual
      ↓
Sections
      ↓
Paragraph-sized chunks
      ↓
Stored independently
```

Chunking is important because retrieval typically operates on passages rather than complete documents. Dense retrieval research also commonly represents passages independently for efficient search.

---

## 7.2 Why Chunking Is Required

```text
Documents may exceed model context limits.

Smaller passages are easier to retrieve precisely.

Embedding one entire book produces an overly broad representation.

Relevant information may appear in only one section.
```

---

## 7.3 Fixed-Size Chunking

Split after a fixed number of:

```text
Characters
Words
Tokens
```

Example:

```python
def split_words(
    text: str,
    chunk_size: int = 200,
    overlap: int = 40
) -> list[str]:
    words = text.split()
    chunks = []

    step = chunk_size - overlap

    for start in range(
        0,
        len(words),
        step
    ):
        chunk = words[
            start:start + chunk_size
        ]

        if chunk:
            chunks.append(
                " ".join(chunk)
            )

    return chunks
```

Advantages:

```text
Simple
Fast
Predictable
```

Limitations:

```text
Can split sentences
Can break sections
May mix unrelated topics
```

---

## 7.4 Recursive Chunking

Recursive chunking tries boundaries in order.

Example:

```text
Section
Paragraph
Sentence
Word
Character
```

Conceptual separators:

```python
separators = [
    "\n\n",
    "\n",
    ". ",
    " ",
    ""
]
```

Use recursive chunking for general documents.

---

## 7.5 Semantic Chunking

Semantic chunking separates text when the topic changes.

Conceptually:

```text
Sentence embeddings
      ↓
Measure similarity between neighbouring sentences
      ↓
Detect large semantic change
      ↓
Create chunk boundary
```

Use semantic chunking when:

```text
Documents contain long paragraphs.

Topic boundaries do not match formatting.

Retrieval quality is more important than ingestion speed.
```

Limitations:

```text
Higher processing cost

More complex tuning

Results depend on embedding quality
```

---

## 7.6 Structure-Aware Chunking

Use document structure such as:

```text
Titles
Headings
Subheadings
Paragraphs
Lists
Tables
Code blocks
Pages
```

Example:

```text
Heading:
Refund Policy

Chunk:
Refunds are available within 30 days...
```

Store the heading in metadata and possibly in the chunk text.

---

## 7.7 Code Chunking

Source code should often be split by:

```text
Class
Function
Method
Module
Interface
```

Avoid splitting in the middle of:

```text
A function
A class
A comment block
A syntax structure
```

Useful code metadata:

```text
Repository
File path
Language
Class name
Function name
Commit hash
Line range
```

---

## 7.8 Table Chunking

Tables should not always be flattened row by row.

Options:

```text
Keep complete small table

Store table summary plus rows

Create one chunk per logical group

Convert each row into a descriptive sentence

Use a structured database query instead
```

Example row:

```text
Region: North
Revenue: ₹2,500,000
Profit: ₹480,000
```

---

## 7.9 Chunk Size Trade-Off

Small chunks:

```text
Higher retrieval precision

Less context in each chunk

More vectors

More chances of losing surrounding meaning
```

Large chunks:

```text
More surrounding context

Fewer vectors

Higher prompt-token usage

Lower retrieval precision

More irrelevant text
```

---

## 7.10 Chunk Overlap

Overlap repeats information between neighbouring chunks.

Example:

```text
Chunk 1:
Words 1–200

Chunk 2:
Words 161–360
```

Benefits:

```text
Preserves context near boundaries

Reduces broken sentences

Improves retrieval of cross-boundary facts
```

Costs:

```text
More vectors

More storage

Duplicate retrieval

Repeated prompt context
```

---

## 7.11 Starting Chunk Values

General documents:

```text
Chunk size:
400–1,000 tokens

Overlap:
10–20% of chunk size
```

These are starting points, not universal rules.

The best values should be selected using retrieval evaluation.

---

## 7.12 Parent-Child Chunking

Use small chunks for retrieval but return larger parent sections to the LLM.

```text
Large parent section
   ├── Small child chunk 1
   ├── Small child chunk 2
   └── Small child chunk 3
```

Flow:

```text
Retrieve small child
      ↓
Find parent section
      ↓
Send parent context to LLM
```

Benefits:

```text
Precise search

Better surrounding context
```

---

## 7.13 Sentence-Window Retrieval

Retrieve one relevant sentence, then include nearby sentences.

```text
Previous two sentences
Relevant sentence
Next two sentences
```

Use when:

```text
Documents contain dense factual prose.

Single sentences are highly searchable.

Local surrounding context is sufficient.
```

---

