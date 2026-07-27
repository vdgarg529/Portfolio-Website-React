# Chapter 12: Complete MCP Server Example

```python
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from mcp.server.fastmcp import FastMCP


mcp = FastMCP(
    "Sales Analytics Server",
    json_response=True
)


SALES = [
    {
        "order_id": "O-1",
        "region": "North",
        "revenue": 1200.0
    },
    {
        "order_id": "O-2",
        "region": "South",
        "revenue": 900.0
    },
    {
        "order_id": "O-3",
        "region": "North",
        "revenue": 1500.0
    }
]


@mcp.tool()
def calculate_region_summary(
    region: str
) -> dict[str, Any]:
    """
    Calculate sales statistics for one region.

    Args:
        region:
            Region name, such as North or South.
    """

    matching = [
        row
        for row in SALES
        if row["region"].lower()
        == region.lower()
    ]

    if not matching:
        return {
            "region": region,
            "order_count": 0,
            "total_revenue": 0,
            "average_revenue": None
        }

    total = sum(
        row["revenue"]
        for row in matching
    )

    return {
        "region": region,
        "order_count": len(matching),
        "total_revenue": total,
        "average_revenue": (
            total / len(matching)
        )
    }


@mcp.tool()
def get_order(
    order_id: str
) -> dict[str, Any]:
    """
    Retrieve one order by its identifier.

    Args:
        order_id:
            Order identifier such as O-1.
    """

    for order in SALES:
        if order["order_id"] == order_id:
            return order

    return {
        "error": (
            f"Order {order_id} "
            "was not found."
        )
    }


@mcp.resource(
    "sales://dataset/description"
)
def dataset_description() -> str:
    """Describe the sales dataset."""

    return (
        "The sales dataset contains order_id, "
        "region and revenue columns."
    )


@mcp.resource(
    "sales://region/{region}"
)
def region_resource(
    region: str
) -> str:
    """Return orders associated with one region."""

    rows = [
        row
        for row in SALES
        if row["region"].lower()
        == region.lower()
    ]

    return "\n".join(
        str(row)
        for row in rows
    )


@mcp.prompt()
def regional_analysis_prompt(
    region: str
) -> str:
    """Generate a regional-sales analysis prompt."""

    return (
        f"Analyse sales performance for {region}. "
        "Use the region resource and summary tool. "
        "Report order count, total revenue, average "
        "revenue and any limitations."
    )


@mcp.tool()
def server_status() -> dict[str, str]:
    """Return the current server status."""

    return {
        "status": "healthy",
        "timestamp": datetime.now(
            timezone.utc
        ).isoformat()
    }


if __name__ == "__main__":
    mcp.run(
        transport="streamable-http"
    )
```

---

