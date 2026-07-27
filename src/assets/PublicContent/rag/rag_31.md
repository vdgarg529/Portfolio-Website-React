# Chapter 31: Minimal End-to-End RAG Example

## 31.1 Installation

```bash
pip install sentence-transformers faiss-cpu numpy
```

---

## 31.2 Complete Retrieval Example

```python
from __future__ import annotations

from dataclasses import dataclass

import faiss
import numpy as np

from sentence_transformers import (
    SentenceTransformer
)


@dataclass
class Chunk:
    text: str
    source: str


class SimpleRetriever:
    def __init__(
        self,
        model_name: str = (
            "all-MiniLM-L6-v2"
        )
    ):
        self.model = SentenceTransformer(
            model_name
        )

        self.chunks: list[Chunk] = []
        self.index: faiss.Index | None = None

    def add_chunks(
        self,
        chunks: list[Chunk]
    ) -> None:
        if not chunks:
            raise ValueError(
                "At least one chunk is required."
            )

        texts = [
            chunk.text
            for chunk in chunks
        ]

        vectors = self.model.encode_document(
            texts,
            normalize_embeddings=True
        )

        vectors = np.asarray(
            vectors,
            dtype="float32"
        )

        dimension = vectors.shape[1]

        self.index = faiss.IndexFlatIP(
            dimension
        )

        self.index.add(
            vectors
        )

        self.chunks = chunks

    def search(
        self,
        query: str,
        top_k: int = 3
    ) -> list[dict]:
        if self.index is None:
            raise RuntimeError(
                "The index has not been built."
            )

        query_vector = self.model.encode_query(
            [query],
            normalize_embeddings=True
        )

        query_vector = np.asarray(
            query_vector,
            dtype="float32"
        )

        number_to_return = min(
            top_k,
            len(self.chunks)
        )

        scores, indices = self.index.search(
            query_vector,
            number_to_return
        )

        results = []

        for score, index_value in zip(
            scores[0],
            indices[0]
        ):
            if index_value < 0:
                continue

            chunk = self.chunks[
                index_value
            ]

            results.append({
                "text": chunk.text,
                "source": chunk.source,
                "score": float(score)
            })

        return results
```

---

## 31.3 Use the Retriever

```python
chunks = [
    Chunk(
        text=(
            "Refund requests require a valid "
            "order number and must be submitted "
            "within thirty days."
        ),
        source="refund_policy.md"
    ),
    Chunk(
        text=(
            "Employees may claim travel expenses "
            "within sixty days of completing travel."
        ),
        source="travel_policy.md"
    ),
    Chunk(
        text=(
            "Passwords must contain at least "
            "twelve characters."
        ),
        source="security_policy.md"
    )
]


retriever = SimpleRetriever()

retriever.add_chunks(
    chunks
)


results = retriever.search(
    "What do I need for a refund?",
    top_k=2
)


for result in results:
    print(
        result["score"],
        result["source"],
        result["text"]
    )
```

---

## 31.4 Construct Prompt Context

```python
def build_context(
    results: list[dict]
) -> str:
    blocks = []

    for number, result in enumerate(
        results,
        start=1
    ):
        blocks.append(
            f"""
[SOURCE {number}]
File: {result["source"]}
Content:
{result["text"]}
""".strip()
        )

    return "\n\n".join(blocks)
```

---

## 31.5 Generate Answer

The generation layer can use any suitable LLM provider.

```python
def create_prompt(
    question: str,
    context: str
) -> str:
    return f"""
You are a grounded question-answering assistant.

Use only the supplied context.

If the context does not contain the answer,
say that the information is unavailable.

Cite sources using [SOURCE number].

Context:
{context}

Question:
{question}
""".strip()
```

Usage:

```python
question = (
    "What do I need for a refund?"
)

results = retriever.search(
    question,
    top_k=3
)

context = build_context(
    results
)

prompt = create_prompt(
    question,
    context
)

answer = generate_with_llm(
    prompt
)

print(answer)
```

`generate_with_llm()` represents the generation API selected for the application.

---

