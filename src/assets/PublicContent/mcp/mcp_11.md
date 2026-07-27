# Chapter 11: Python SDK and FastMCP

## 11.1 Stable SDK Choice

As of July 22, 2026:

```text
Python SDK v1.x:
Stable and recommended for production.

Python SDK v2:
Prerelease and contains breaking changes.
```

For a production project created before the stable v2 release, pinning the major version avoids an unexpected migration:

```bash
uv add "mcp[cli]>=1.27,<2"
```

---

## 11.2 Create a Project

```bash
uv init analytics-mcp
cd analytics-mcp

uv venv
source .venv/bin/activate

uv add "mcp[cli]>=1.27,<2"
```

Windows activation:

```powershell
.venv\Scripts\activate
```

---

## 11.3 Basic FastMCP Server

```python
from mcp.server.fastmcp import FastMCP


mcp = FastMCP(
    "Analytics Server"
)


@mcp.tool()
def add(
    first: float,
    second: float
) -> float:
    """Add two numerical values."""

    return first + second


if __name__ == "__main__":
    mcp.run(
        transport="stdio"
    )
```

FastMCP uses Python type hints and docstrings to create tool definitions automatically.

---

## 11.4 Tool with Input Validation

```python
from mcp.server.fastmcp import FastMCP


mcp = FastMCP(
    "Order Server"
)


@mcp.tool()
def calculate_discount(
    price: float,
    discount_percent: float
) -> dict:
    """
    Calculate the discounted product price.

    Args:
        price:
            Original product price.

        discount_percent:
            Discount from 0 through 100.
    """

    if price < 0:
        raise ValueError(
            "Price cannot be negative."
        )

    if not 0 <= discount_percent <= 100:
        raise ValueError(
            "Discount must be between 0 and 100."
        )

    final_price = price * (
        1 - discount_percent / 100
    )

    return {
        "original_price": price,
        "discount_percent": discount_percent,
        "final_price": round(
            final_price,
            2
        )
    }
```

---

## 11.5 Add a Resource

```python
@mcp.resource(
    "customer://{customer_id}/profile"
)
def get_customer_profile(
    customer_id: str
) -> str:
    """Return a customer profile."""

    customers = {
        "C-101": {
            "name": "Aman",
            "status": "active"
        }
    }

    customer = customers.get(
        customer_id
    )

    if customer is None:
        return (
            f"Customer {customer_id} "
            "was not found."
        )

    return (
        f"Name: {customer['name']}\n"
        f"Status: {customer['status']}"
    )
```

---

## 11.6 Add a Prompt

```python
@mcp.prompt()
def analyse_customer(
    customer_id: str,
    focus: str = "retention"
) -> str:
    """Create a customer-analysis prompt."""

    return (
        f"Analyse customer {customer_id}. "
        f"Focus primarily on {focus}. "
        "Use available customer resources and "
        "clearly separate facts from assumptions."
    )
```

FastMCP supports decorated tools, dynamic resources and prompt templates.

---

## 11.7 Run with Streamable HTTP

```python
if __name__ == "__main__":
    mcp.run(
        transport="streamable-http"
    )
```

A typical local endpoint is:

```text
http://localhost:8000/mcp
```

---

