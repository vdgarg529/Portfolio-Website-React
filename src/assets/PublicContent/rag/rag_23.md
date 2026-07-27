# Chapter 23: Multimodal RAG

## 23.1 What Is Multimodal RAG?

Multimodal RAG retrieves information from:

```text
Text

Images

Charts

Tables

Audio

Video

Slides
```

---

## 23.2 Example

Question:

```text
What trend is visible in the revenue chart?
```

The system must retrieve and interpret the chart, not only nearby extracted text.

---

## 23.3 Multimodal Ingestion

```text
PDF page
 ├── Text
 ├── Image
 ├── Table
 └── Layout information
```

Store relationships between these elements.

---

## 23.4 Image Retrieval

Possible representations:

```text
Image embedding

Generated image caption

OCR text

Nearby document text

Page-level embedding
```

---

## 23.5 Table Retrieval

Options:

```text
Embed table title and description

Store table as markdown

Use structured table queries

Retrieve relevant rows

Send table image to a multimodal model
```

---

## 23.6 Multimodal Challenges

```text
OCR errors

Layout loss

Chart interpretation

Table structure

Higher storage

Higher model cost

Source citation complexity
```

---

