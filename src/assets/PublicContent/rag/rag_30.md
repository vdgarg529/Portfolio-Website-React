# Chapter 30: Testing RAG Systems

## 30.1 Unit-Test Chunking

```python
def test_chunk_overlap():
    chunks = split_words(
        " ".join(
            str(value)
            for value in range(500)
        ),
        chunk_size=100,
        overlap=20
    )

    assert len(chunks) > 1
```

---

## 30.2 Test Metadata

```python
def test_metadata_contains_source():
    chunk = create_chunk(
        text="Policy content",
        source="policy.pdf"
    )

    assert (
        chunk["metadata"]["source"]
        == "policy.pdf"
    )
```

---

## 30.3 Retrieval Regression Test

```python
def test_refund_query_retrieval():
    results = retriever.search(
        "What documents are required for a refund?",
        top_k=5
    )

    retrieved_ids = {
        result["document_id"]
        for result in results
    }

    assert (
        "refund-policy"
        in retrieved_ids
    )
```

---

## 30.4 Test Permission Filtering

```python
def test_user_cannot_retrieve_other_tenant():
    results = retriever.search(
        query="confidential financial report",
        filters={
            "tenant_id": "tenant-a"
        }
    )

    assert all(
        result["tenant_id"]
        == "tenant-a"
        for result in results
    )
```

---

## 30.5 Test Abstention

```python
def test_unknown_question_abstains():
    answer = rag_system.answer(
        "What is the company policy for moon travel?"
    )

    assert answer["status"] == (
        "insufficient_information"
    )
```

---

## 30.6 Test Citations

```python
def test_citations_exist():
    result = rag_system.answer(
        "What is the travel approval limit?"
    )

    assert result["citations"]

    for citation in result["citations"]:
        assert citation["document_id"]
```

---

