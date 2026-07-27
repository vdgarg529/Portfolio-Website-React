# Chapter 6: Document Ingestion

## 6.1 What Is Ingestion?

Ingestion is the process of converting source data into a format that the RAG system can index.

Typical ingestion stages:

```text
Fetch
Parse
Clean
Normalize
Enrich with metadata
Split
Embed
Index
```

---

## 6.2 Document Representation

A document object usually contains:

```python
document = {
    "text": "Document contents",
    "metadata": {
        "source": "employee_policy.pdf",
        "page": 12,
        "department": "Human Resources",
        "updated_at": "2026-06-10"
    }
}
```

---

## 6.3 Why Metadata Matters

Metadata allows the system to:

```text
Identify the source

Display citations

Filter by department

Filter by date

Apply permissions

Separate customers or tenants

Track document versions

Delete or update indexed documents
```

---

## 6.4 Useful Metadata Fields

```text
document_id
chunk_id
source_name
source_uri
page_number
section
heading
author
created_at
updated_at
document_version
department
tenant_id
access_roles
language
content_type
```

---

## 6.5 Document Cleaning

Common cleaning operations:

```text
Remove repeated headers and footers

Remove navigation menus

Fix broken whitespace

Normalize Unicode

Remove irrelevant boilerplate

Preserve headings

Preserve page references

Handle tables separately

Remove duplicate documents
```

---

## 6.6 Do Not Over-Clean

Over-cleaning may remove:

```text
Section boundaries

List structure

Table relationships

Legal clauses

Code formatting

Citation numbers
```

Clean noise while preserving meaning.

---

## 6.7 Incremental Ingestion

Avoid rebuilding the entire index whenever one document changes.

Recommended process:

```text
Detect changed document
      ↓
Remove old chunks for that document
      ↓
Parse updated version
      ↓
Generate new chunks
      ↓
Embed and insert
```

Use a content hash:

```python
import hashlib


def calculate_hash(text: str) -> str:
    return hashlib.sha256(
        text.encode("utf-8")
    ).hexdigest()
```

If the hash is unchanged, reindexing may be unnecessary.

---

