# Chapter 5: Data Sources

## 5.1 Common Knowledge Sources

```text
PDF files

Word documents

PowerPoint files

Spreadsheets

Markdown files

HTML pages

Websites

Databases

APIs

Email

Slack

Notion

Google Drive

Git repositories

Support tickets

Audio transcripts
```

---

## 5.2 Structured Data

Structured data follows a predefined schema.

Examples:

```text
Relational databases
CSV files
JSON records
Spreadsheets
```

For structured data, it may be better to use:

```text
SQL generation

Database tools

Filtered queries

Semantic layers

Precomputed analytical summaries
```

rather than converting every database row into a text embedding.

---

## 5.3 Unstructured Data

Unstructured data includes:

```text
Reports
Emails
Documents
Articles
Contracts
Policies
Research papers
```

These are common candidates for text-based RAG.

---

## 5.4 Semi-Structured Data

Semi-structured data includes:

```text
HTML
JSON
XML
Markdown
Log events
```

Its structural information should be preserved when possible.

Example:

```text
HTML heading
    ↓
Section text
    ↓
Subsection
    ↓
Table
```

Flattening everything into one plain text block may remove useful relationships.

---

