# Chapter 17: Citations and Provenance

## 17.1 Why Citations Matter

Citations help users:

```text
Verify the answer

Inspect evidence

Understand uncertainty

Identify outdated information

Build trust
```

---

## 17.2 Citation Metadata

Store:

```text
Source ID
Document name
Page number
Section
URL
Chunk ID
Version
Updated date
```

---

## 17.3 Inline Citation Format

Example:

```text
The approval threshold is ₹7,500 [Source 2, page 4].
```

---

## 17.4 Citation Validation

A citation should be checked for:

```text
Does the cited source contain the claim?

Does the page number match?

Is the source authoritative?

Is the source currently valid?

Was the source available to the model?
```

---

## 17.5 Do Not Let the Model Invent Source IDs

Provide source identifiers explicitly in the context.

```text
[SOURCE policy-2026-page-4]
...
```

Ask the model to use only supplied source identifiers.

---

## 17.6 Extractive Citation Mapping

A stronger system can:

```text
Generate answer sentences
      ↓
Match each sentence to supporting chunks
      ↓
Attach verified citations
```

This separates answer generation from citation validation.

---

