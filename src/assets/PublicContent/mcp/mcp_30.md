# Chapter 30: Recommended Project Structure

```text
analytics_mcp/
│
├── pyproject.toml
├── README.md
├── .env
├── .gitignore
│
├── src/
│   └── analytics_mcp/
│       ├── __init__.py
│       ├── server.py
│       │
│       ├── tools/
│       │   ├── __init__.py
│       │   ├── sales.py
│       │   └── customers.py
│       │
│       ├── resources/
│       │   ├── __init__.py
│       │   └── documentation.py
│       │
│       ├── prompts/
│       │   ├── __init__.py
│       │   └── analysis.py
│       │
│       ├── services/
│       │   ├── database.py
│       │   ├── sales_service.py
│       │   └── auth_service.py
│       │
│       ├── schemas/
│       │   ├── inputs.py
│       │   └── outputs.py
│       │
│       └── config.py
│
└── tests/
    ├── test_tools.py
    ├── test_resources.py
    ├── test_permissions.py
    └── test_integration.py
```

---

