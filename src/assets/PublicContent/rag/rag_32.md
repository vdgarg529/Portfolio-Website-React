# Chapter 32: More Complete RAG Pipeline

```python
class RAGPipeline:
    def __init__(
        self,
        retriever,
        reranker,
        generator
    ):
        self.retriever = retriever
        self.reranker = reranker
        self.generator = generator

    def answer(
        self,
        question: str,
        filters: dict | None = None
    ) -> dict:
        candidates = self.retriever.search(
            query=question,
            top_k=20,
            filters=filters
        )

        if not candidates:
            return {
                "answer": (
                    "No relevant information "
                    "was found."
                ),
                "citations": [],
                "status": (
                    "insufficient_information"
                )
            }

        ranked = self.reranker.rank(
            query=question,
            documents=candidates
        )

        selected = ranked[:5]

        context = build_context(
            selected
        )

        result = self.generator.generate(
            question=question,
            context=context
        )

        return {
            "answer": result.answer,
            "citations": result.citations,
            "retrieved_documents": selected,
            "status": "answered"
        }
```

---

