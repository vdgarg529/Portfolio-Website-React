
# Matplotlib Quick Cheatsheet

```python
import matplotlib.pyplot as plt
import numpy as np
```

## 1. Basic Line Plot

```python
x = [1, 2, 3, 4]
y = [10, 20, 15, 30]

plt.plot(x, y)
plt.show()
```

## 2. Add Title and Labels

```python
plt.plot(x, y)

plt.title("Sales Growth")
plt.xlabel("Month")
plt.ylabel("Sales")

plt.show()
```

## 3. Line Style, Color and Marker

```python
plt.plot(
    x,
    y,
    color="blue",
    linestyle="--",
    marker="o",
    linewidth=2,
    markersize=6
)

plt.show()
```

Common line styles:

```python
"-"   # Solid
"--"  # Dashed
":"   # Dotted
"-."  # Dash-dot
```

Common markers:

```python
"o"   # Circle
"s"   # Square
"^"   # Triangle
"x"   # Cross
"*"   # Star
"."   # Point
```

## 4. Plot Multiple Lines

```python
x = [1, 2, 3, 4]

y1 = [10, 20, 25, 30]
y2 = [5, 15, 20, 35]

plt.plot(x, y1, label="Product A")
plt.plot(x, y2, label="Product B")

plt.legend()
plt.show()
```

## 5. Set Figure Size

```python
plt.figure(figsize=(8, 5))

plt.plot(x, y)
plt.show()
```

`figsize` is given as:

```python
(width, height)
```

in inches.

## 6. Add Grid

```python
plt.plot(x, y)

plt.grid(True)
plt.show()
```

Customize grid:

```python
plt.grid(
    axis="both",
    linestyle="--",
    alpha=0.5
)
```

## 7. Set Axis Limits

```python
plt.plot(x, y)

plt.xlim(0, 5)
plt.ylim(0, 40)

plt.show()
```

## 8. Set Axis Ticks

```python
plt.plot(x, y)

plt.xticks([1, 2, 3, 4])
plt.yticks([0, 10, 20, 30, 40])

plt.show()
```

Custom tick labels:

```python
plt.xticks(
    [1, 2, 3, 4],
    ["Jan", "Feb", "Mar", "Apr"]
)
```

Rotate labels:

```python
plt.xticks(rotation=45)
```

## 9. Scatter Plot

```python
x = [1, 2, 3, 4, 5]
y = [10, 15, 8, 20, 18]

plt.scatter(x, y)
plt.show()
```

Customize:

```python
plt.scatter(
    x,
    y,
    s=100,
    alpha=0.7,
    marker="o"
)
```

`s` controls marker size.

## 10. Bar Chart

```python
products = ["A", "B", "C"]
sales = [100, 150, 120]

plt.bar(products, sales)
plt.show()
```

Horizontal bar chart:

```python
plt.barh(products, sales)
plt.show()
```

## 11. Grouped Bar Chart

```python
labels = ["2024", "2025", "2026"]
sales_a = [100, 120, 150]
sales_b = [90, 130, 140]

x = np.arange(len(labels))
width = 0.35

plt.bar(x - width / 2, sales_a, width, label="A")
plt.bar(x + width / 2, sales_b, width, label="B")

plt.xticks(x, labels)
plt.legend()
plt.show()
```

## 12. Stacked Bar Chart

```python
labels = ["Jan", "Feb", "Mar"]
sales_a = [10, 20, 30]
sales_b = [5, 15, 10]

plt.bar(labels, sales_a, label="A")
plt.bar(labels, sales_b, bottom=sales_a, label="B")

plt.legend()
plt.show()
```

## 13. Histogram

```python
data = np.random.normal(50, 10, 1000)

plt.hist(data, bins=20)
plt.show()
```

Customize:

```python
plt.hist(
    data,
    bins=20,
    edgecolor="black",
    alpha=0.7
)
```

## 14. Pie Chart

```python
labels = ["Python", "Java", "C++"]
values = [50, 30, 20]

plt.pie(
    values,
    labels=labels,
    autopct="%1.1f%%"
)

plt.show()
```

Explode one section:

```python
explode = [0.1, 0, 0]

plt.pie(
    values,
    labels=labels,
    autopct="%1.1f%%",
    explode=explode
)

plt.show()
```

Make it circular:

```python
plt.axis("equal")
```

## 15. Box Plot

```python
data = [
    [10, 20, 25, 30, 35],
    [15, 18, 20, 22, 50]
]

plt.boxplot(data, labels=["Group A", "Group B"])
plt.show()
```

A box plot displays:

```python
Median
Quartiles
Spread
Outliers
```

## 16. Area Plot

```python
x = [1, 2, 3, 4]
y = [10, 20, 15, 30]

plt.fill_between(x, y, alpha=0.5)
plt.plot(x, y)

plt.show()
```

## 17. Step Plot

```python
plt.step(x, y, where="mid")
plt.show()
```

Possible values:

```python
where="pre"
where="mid"
where="post"
```

## 18. Stem Plot

```python
plt.stem(x, y)
plt.show()
```

Useful for discrete signals and sequences.

## 19. Error Bar Plot

```python
x = [1, 2, 3, 4]
y = [10, 20, 15, 30]
error = [1, 2, 1.5, 3]

plt.errorbar(
    x,
    y,
    yerr=error,
    fmt="o-",
    capsize=5
)

plt.show()
```

## 20. Subplots

```python
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

axes[0].plot(x, y)
axes[0].set_title("Line Plot")

axes[1].bar(x, y)
axes[1].set_title("Bar Plot")

plt.tight_layout()
plt.show()
```

For a 2 × 2 layout:

```python
fig, axes = plt.subplots(2, 2)
```

Access individual plots:

```python
axes[0, 0]
axes[0, 1]
axes[1, 0]
axes[1, 1]
```

## 21. Object-Oriented Style

Recommended for larger plots:

```python
fig, ax = plt.subplots(figsize=(8, 5))

ax.plot(x, y)
ax.set_title("Sales")
ax.set_xlabel("Month")
ax.set_ylabel("Revenue")
ax.grid(True)

plt.show()
```

Use:

```python
ax.set_title()
ax.set_xlabel()
ax.set_ylabel()
ax.set_xlim()
ax.set_ylim()
ax.legend()
```

## 22. Add Legend

```python
plt.plot(x, y1, label="Line A")
plt.plot(x, y2, label="Line B")

plt.legend()
plt.show()
```

Legend position:

```python
plt.legend(loc="upper left")
```

Common locations:

```python
"upper left"
"upper right"
"lower left"
"lower right"
"center"
"best"
```

## 23. Add Text

```python
plt.plot(x, y)

plt.text(
    2,
    20,
    "Important Point"
)

plt.show()
```

## 24. Annotate a Point

```python
plt.plot(x, y, marker="o")

plt.annotate(
    "Maximum",
    xy=(4, 30),
    xytext=(3, 35),
    arrowprops={"arrowstyle": "->"}
)

plt.show()
```

## 25. Add a Horizontal or Vertical Line

Horizontal line:

```python
plt.axhline(
    y=20,
    linestyle="--",
    label="Target"
)
```

Vertical line:

```python
plt.axvline(
    x=3,
    linestyle="--"
)
```

Highlight a region:

```python
plt.axvspan(2, 3, alpha=0.2)
plt.axhspan(10, 20, alpha=0.2)
```

## 26. Logarithmic Scale

```python
plt.plot(x, y)

plt.xscale("log")
plt.yscale("log")

plt.show()
```

Useful when values vary across large ranges.

## 27. Display an Image

```python
image = plt.imread("image.jpg")

plt.imshow(image)
plt.axis("off")
plt.show()
```

For grayscale images:

```python
plt.imshow(image, cmap="gray")
```

## 28. Heatmap

```python
data = np.random.rand(5, 5)

plt.imshow(data, cmap="viridis")
plt.colorbar()

plt.show()
```

Other common color maps:

```python
"viridis"
"plasma"
"inferno"
"magma"
"coolwarm"
"gray"
```

## 29. Color Bar

```python
data = np.random.rand(10, 10)

plot = plt.imshow(data)
plt.colorbar(plot, label="Intensity")

plt.show()
```

## 30. Contour Plot

```python
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)

X, Y = np.meshgrid(x, y)
Z = X**2 + Y**2

plt.contour(X, Y, Z)
plt.show()
```

Filled contour:

```python
plt.contourf(X, Y, Z)
plt.colorbar()
plt.show()
```

## 31. Plot Dates

```python
import pandas as pd

dates = pd.date_range("2026-01-01", periods=5)
values = [10, 15, 12, 18, 20]

plt.plot(dates, values, marker="o")
plt.xticks(rotation=45)

plt.tight_layout()
plt.show()
```

## 32. Secondary Y-Axis

```python
fig, ax1 = plt.subplots()

ax1.plot(x, y1)
ax1.set_ylabel("Sales")

ax2 = ax1.twinx()

ax2.plot(x, y2)
ax2.set_ylabel("Profit")

plt.show()
```

## 33. Save a Plot

```python
plt.plot(x, y)

plt.savefig("plot.png")
plt.show()
```

High-quality image:

```python
plt.savefig(
    "plot.png",
    dpi=300,
    bbox_inches="tight"
)
```

Save as PDF:

```python
plt.savefig("plot.pdf")
```

Save before calling `plt.show()`.

## 34. Remove Axes

```python
plt.plot(x, y)
plt.axis("off")
plt.show()
```

Remove only specific borders:

```python
fig, ax = plt.subplots()

ax.plot(x, y)

ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)

plt.show()
```

## 35. Tight Layout

```python
plt.tight_layout()
```

Prevents titles and labels from overlapping.

For automatic layout:

```python
fig, ax = plt.subplots(constrained_layout=True)
```

## 36. Figure and Axes Difference

```python
fig, ax = plt.subplots()
```

```python
fig
```

represents the complete canvas.

```python
ax
```

represents an individual plot inside the figure.

## 37. Clear and Close Plots

Clear current axes:

```python
plt.cla()
```

Clear current figure:

```python
plt.clf()
```

Close current figure:

```python
plt.close()
```

Close all figures:

```python
plt.close("all")
```

## 38. Plot Pandas DataFrame

```python
import pandas as pd

df = pd.DataFrame({
    "month": [1, 2, 3, 4],
    "sales": [10, 20, 15, 30]
})

df.plot(
    x="month",
    y="sales",
    kind="line"
)

plt.show()
```

Common plot types:

```python
kind="line"
kind="bar"
kind="barh"
kind="scatter"
kind="hist"
kind="box"
kind="pie"
```

Scatter plot with Pandas:

```python
df.plot(
    x="month",
    y="sales",
    kind="scatter"
)
```

## 39. 3D Plot

```python
fig = plt.figure()

ax = fig.add_subplot(
    111,
    projection="3d"
)

x = [1, 2, 3]
y = [4, 5, 6]
z = [7, 8, 9]

ax.scatter(x, y, z)

ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")

plt.show()
```

## 40. Common Plot Types Summary

```python
plt.plot()          # Line plot
plt.scatter()       # Scatter plot
plt.bar()           # Vertical bar chart
plt.barh()          # Horizontal bar chart
plt.hist()          # Histogram
plt.pie()           # Pie chart
plt.boxplot()       # Box plot
plt.fill_between()  # Area plot
plt.imshow()        # Image or heatmap
plt.contour()       # Contour plot
```

## 41. Frequently Used Pattern

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(1, 6)
y = np.array([10, 20, 15, 25, 30])

fig, ax = plt.subplots(figsize=(8, 5))

ax.plot(
    x,
    y,
    marker="o",
    linewidth=2,
    label="Sales"
)

ax.set_title("Monthly Sales")
ax.set_xlabel("Month")
ax.set_ylabel("Sales")
ax.set_xticks(x)
ax.grid(True, alpha=0.4)
ax.legend()

plt.tight_layout()
plt.savefig(
    "monthly_sales.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

## 42. Important Differences

```python
plt.plot()
```

uses the state-based Pyplot interface.

```python
fig, ax = plt.subplots()
ax.plot()
```

uses the object-oriented interface and is preferred for complex plots.

```python
plt.figure()
```

creates a complete figure.

```python
plt.subplot()
```

creates one axes at a specified position.

```python
plt.subplots()
```

creates the figure and one or more axes together.

```python
plt.show()
```

displays the plot.

```python
plt.savefig()
```

saves the plot to a file.
