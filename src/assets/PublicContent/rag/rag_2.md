# Chapter 2: Parametric and Non-Parametric Knowledge

## 2.1 Parametric Knowledge

Parametric knowledge is information stored inside the model’s learned weights.

Example:

```text
The model may know that Paris is the capital of France
because this information was present during training.
```

Characteristics:

```text
Fast to access

Built into the model

Difficult to update directly

May be outdated

May not contain private information

May be difficult to attribute to a source
```

---

## 2.2 Non-Parametric Knowledge

Non-parametric knowledge is stored outside the language model.

Examples:

```text
PDF files
Database rows
Company policies
Web pages
Research papers
Product documentation
Support tickets
Source code
Knowledge graphs
```

It can be searched and updated independently of the LLM.

---

## 2.3 RAG Combines Both

```text
Parametric knowledge:
Language understanding, reasoning and generation.

Non-parametric knowledge:
Specific, current and private facts.
```

Conceptually:

```text
LLM knowledge
      +
Retrieved external knowledge
      =
Grounded response
```

---

