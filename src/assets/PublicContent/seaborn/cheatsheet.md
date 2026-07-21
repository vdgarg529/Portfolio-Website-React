
# Seaborn Quick Cheatsheet

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
```

Seaborn is built on top of Matplotlib and is mainly used for statistical data visualization.

## 1. Load a Sample Dataset

```python
df = sns.load_dataset("tips")

print(df.head())
```

Common built-in datasets:

```python
sns.get_dataset_names()

sns.load_dataset("tips")
sns.load_dataset("titanic")
sns.load_dataset("iris")
sns.load_dataset("penguins")
sns.load_dataset("flights")
```

## 2. Basic Scatter Plot

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.show()
```

## 3. Add Color Using `hue`

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex"
)

plt.show()
```

`hue` separates data using different colors.

## 4. Add Marker Style

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex",
    style="smoker"
)

plt.show()
```

## 5. Change Point Size

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    size="size"
)

plt.show()
```

Control size range:

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    size="size",
    sizes=(40, 200)
)
```

## 6. Line Plot

```python
sns.lineplot(
    data=df,
    x="size",
    y="total_bill"
)

plt.show()
```

With categories:

```python
sns.lineplot(
    data=df,
    x="size",
    y="total_bill",
    hue="sex"
)

plt.show()
```

## 7. Confidence Interval in Line Plot

```python
sns.lineplot(
    data=df,
    x="size",
    y="total_bill",
    errorbar="sd"
)

plt.show()
```

Disable error region:

```python
sns.lineplot(
    data=df,
    x="size",
    y="total_bill",
    errorbar=None
)
```

Common values:

```python
errorbar="ci"
errorbar="sd"
errorbar="se"
errorbar=None
```

## 8. Histogram

```python
sns.histplot(
    data=df,
    x="total_bill"
)

plt.show()
```

Control bins:

```python
sns.histplot(
    data=df,
    x="total_bill",
    bins=20
)
```

Add density curve:

```python
sns.histplot(
    data=df,
    x="total_bill",
    kde=True
)
```

## 9. Histogram by Category

```python
sns.histplot(
    data=df,
    x="total_bill",
    hue="sex",
    bins=20
)

plt.show()
```

Stack histograms:

```python
sns.histplot(
    data=df,
    x="total_bill",
    hue="sex",
    multiple="stack"
)
```

Possible values:

```python
multiple="layer"
multiple="stack"
multiple="dodge"
multiple="fill"
```

## 10. Kernel Density Plot

```python
sns.kdeplot(
    data=df,
    x="total_bill"
)

plt.show()
```

Filled KDE plot:

```python
sns.kdeplot(
    data=df,
    x="total_bill",
    fill=True
)
```

Category-wise KDE:

```python
sns.kdeplot(
    data=df,
    x="total_bill",
    hue="sex",
    fill=True
)
```

## 11. Two-Dimensional KDE Plot

```python
sns.kdeplot(
    data=df,
    x="total_bill",
    y="tip",
    fill=True
)

plt.show()
```

## 12. Empirical Cumulative Distribution

```python
sns.ecdfplot(
    data=df,
    x="total_bill"
)

plt.show()
```

With category:

```python
sns.ecdfplot(
    data=df,
    x="total_bill",
    hue="sex"
)
```

## 13. Rug Plot

```python
sns.rugplot(
    data=df,
    x="total_bill"
)

plt.show()
```

Combine with KDE:

```python
sns.kdeplot(
    data=df,
    x="total_bill"
)

sns.rugplot(
    data=df,
    x="total_bill"
)

plt.show()
```

## 14. Count Plot

```python
sns.countplot(
    data=df,
    x="day"
)

plt.show()
```

With category:

```python
sns.countplot(
    data=df,
    x="day",
    hue="sex"
)
```

Horizontal count plot:

```python
sns.countplot(
    data=df,
    y="day"
)
```

## 15. Bar Plot

```python
sns.barplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

By default, `barplot()` displays the mean value for each category.

Use another estimator:

```python
sns.barplot(
    data=df,
    x="day",
    y="total_bill",
    estimator="sum"
)
```

Using NumPy:

```python
sns.barplot(
    data=df,
    x="day",
    y="total_bill",
    estimator=np.median
)
```

Disable error bars:

```python
sns.barplot(
    data=df,
    x="day",
    y="total_bill",
    errorbar=None
)
```

## 16. Box Plot

```python
sns.boxplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

With category:

```python
sns.boxplot(
    data=df,
    x="day",
    y="total_bill",
    hue="sex"
)
```

A box plot shows:

```text
Median
Quartiles
Spread
Outliers
```

## 17. Violin Plot

```python
sns.violinplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

With category:

```python
sns.violinplot(
    data=df,
    x="day",
    y="total_bill",
    hue="sex"
)
```

Split two categories:

```python
sns.violinplot(
    data=df,
    x="day",
    y="total_bill",
    hue="sex",
    split=True
)
```

## 18. Strip Plot

```python
sns.stripplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

Avoid overlapping points:

```python
sns.stripplot(
    data=df,
    x="day",
    y="total_bill",
    jitter=True
)
```

## 19. Swarm Plot

```python
sns.swarmplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

Swarm plots position points so they do not overlap.

They may become slow for large datasets.

## 20. Box Plot with Data Points

```python
sns.boxplot(
    data=df,
    x="day",
    y="total_bill"
)

sns.stripplot(
    data=df,
    x="day",
    y="total_bill",
    color="black",
    alpha=0.5
)

plt.show()
```

## 21. Point Plot

```python
sns.pointplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

With category:

```python
sns.pointplot(
    data=df,
    x="day",
    y="total_bill",
    hue="sex"
)
```

A point plot shows estimated values and uncertainty.

## 22. Regression Plot

```python
sns.regplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.show()
```

Remove regression line:

```python
sns.regplot(
    data=df,
    x="total_bill",
    y="tip",
    fit_reg=False
)
```

Polynomial regression:

```python
sns.regplot(
    data=df,
    x="total_bill",
    y="tip",
    order=2
)
```

## 23. Linear Model Plot

```python
sns.lmplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.show()
```

With category:

```python
sns.lmplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex"
)
```

Create separate plots:

```python
sns.lmplot(
    data=df,
    x="total_bill",
    y="tip",
    col="sex"
)
```

## 24. Residual Plot

```python
sns.residplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.show()
```

Residual plots help evaluate regression quality.

A random pattern around zero generally indicates a better fit.

## 25. Heatmap

```python
data = np.random.rand(5, 5)

sns.heatmap(data)

plt.show()
```

Display values:

```python
sns.heatmap(
    data,
    annot=True
)
```

Control number format:

```python
sns.heatmap(
    data,
    annot=True,
    fmt=".2f"
)
```

## 26. Correlation Heatmap

```python
numeric_df = df.select_dtypes(include="number")
correlation = numeric_df.corr()

sns.heatmap(
    correlation,
    annot=True,
    fmt=".2f"
)

plt.show()
```

Use a diverging color map:

```python
sns.heatmap(
    correlation,
    annot=True,
    fmt=".2f",
    cmap="coolwarm",
    center=0
)
```

## 27. Mask Part of a Heatmap

```python
mask = np.triu(
    np.ones_like(correlation, dtype=bool)
)

sns.heatmap(
    correlation,
    mask=mask,
    annot=True,
    cmap="coolwarm"
)

plt.show()
```

This is useful for hiding duplicate correlation values.

## 28. Cluster Map

```python
sns.clustermap(
    correlation,
    annot=True
)

plt.show()
```

A cluster map groups similar rows and columns using hierarchical clustering.

## 29. Pair Plot

```python
iris = sns.load_dataset("iris")

sns.pairplot(iris)

plt.show()
```

Color by category:

```python
sns.pairplot(
    iris,
    hue="species"
)
```

Use selected columns:

```python
sns.pairplot(
    iris,
    vars=[
        "sepal_length",
        "sepal_width",
        "petal_length"
    ],
    hue="species"
)
```

Pair plots show relationships between multiple numerical variables.

## 30. Joint Plot

```python
sns.jointplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.show()
```

Possible kinds:

```python
kind="scatter"
kind="kde"
kind="hist"
kind="hex"
kind="reg"
kind="resid"
```

Example:

```python
sns.jointplot(
    data=df,
    x="total_bill",
    y="tip",
    kind="reg"
)
```

## 31. Relational Plot

```python
sns.relplot(
    data=df,
    x="total_bill",
    y="tip",
    kind="scatter"
)

plt.show()
```

Line plot:

```python
sns.relplot(
    data=df,
    x="size",
    y="total_bill",
    kind="line"
)
```

Create multiple panels:

```python
sns.relplot(
    data=df,
    x="total_bill",
    y="tip",
    col="sex",
    row="smoker",
    hue="day"
)
```

## 32. Categorical Plot

```python
sns.catplot(
    data=df,
    x="day",
    y="total_bill",
    kind="bar"
)

plt.show()
```

Common categorical plot types:

```python
kind="strip"
kind="swarm"
kind="box"
kind="violin"
kind="boxen"
kind="point"
kind="bar"
kind="count"
```

Example:

```python
sns.catplot(
    data=df,
    x="day",
    y="total_bill",
    kind="box",
    col="sex"
)
```

## 33. Distribution Plot Interface

```python
sns.displot(
    data=df,
    x="total_bill"
)

plt.show()
```

Common kinds:

```python
kind="hist"
kind="kde"
kind="ecdf"
```

Example:

```python
sns.displot(
    data=df,
    x="total_bill",
    kind="kde",
    hue="sex",
    fill=True
)
```

Multiple panels:

```python
sns.displot(
    data=df,
    x="total_bill",
    col="sex",
    row="smoker"
)
```

## 34. Figure-Level vs Axes-Level Functions

Axes-level functions draw on an existing Matplotlib axes:

```python
sns.scatterplot()
sns.lineplot()
sns.histplot()
sns.boxplot()
sns.barplot()
sns.heatmap()
```

Figure-level functions create and manage their own figure:

```python
sns.relplot()
sns.displot()
sns.catplot()
sns.lmplot()
sns.jointplot()
sns.pairplot()
```

Use axes-level functions when combining several plots manually.

Use figure-level functions when creating faceted plots.

## 35. Use Seaborn with Matplotlib Axes

```python
fig, ax = plt.subplots(figsize=(8, 5))

sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex",
    ax=ax
)

ax.set_title("Total Bill vs Tip")
ax.set_xlabel("Total Bill")
ax.set_ylabel("Tip")

plt.show()
```

## 36. Create Multiple Subplots

```python
fig, axes = plt.subplots(
    1,
    2,
    figsize=(12, 5)
)

sns.histplot(
    data=df,
    x="total_bill",
    ax=axes[0]
)

sns.boxplot(
    data=df,
    x="day",
    y="total_bill",
    ax=axes[1]
)

plt.tight_layout()
plt.show()
```

## 37. Set Theme

```python
sns.set_theme()
```

Choose a style:

```python
sns.set_theme(style="whitegrid")
```

Available styles:

```python
"darkgrid"
"whitegrid"
"dark"
"white"
"ticks"
```

## 38. Set Plot Context

```python
sns.set_context("notebook")
```

Available contexts:

```python
"paper"
"notebook"
"talk"
"poster"
```

Example:

```python
sns.set_theme(
    style="whitegrid",
    context="talk"
)
```

## 39. Remove Plot Borders

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip"
)

sns.despine()
plt.show()
```

Remove left border:

```python
sns.despine(left=True)
```

## 40. Color Palettes

View a palette:

```python
sns.color_palette()
```

Set default palette:

```python
sns.set_palette("deep")
```

Common palettes:

```python
"deep"
"muted"
"pastel"
"bright"
"dark"
"colorblind"
```

Use a palette in a plot:

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="day",
    palette="Set2"
)
```

## 41. Sequential Color Palettes

Useful for ordered numerical values:

```python
sns.color_palette("Blues", as_cmap=True)
sns.color_palette("viridis", as_cmap=True)
```

Example:

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="size",
    palette="viridis"
)
```

## 42. Diverging Color Palettes

Useful when values have a meaningful midpoint:

```python
sns.diverging_palette(
    220,
    20,
    as_cmap=True
)
```

Example:

```python
sns.heatmap(
    correlation,
    cmap="coolwarm",
    center=0
)
```

## 43. Custom Color Palette

```python
custom_palette = [
    "#3498db",
    "#e74c3c",
    "#2ecc71"
]

sns.set_palette(custom_palette)
```

Create from named colors:

```python
palette = sns.color_palette(
    ["red", "blue", "green"]
)
```

## 44. Add Title and Labels

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.title("Bill and Tip Relationship")
plt.xlabel("Total Bill")
plt.ylabel("Tip")

plt.show()
```

Using Matplotlib axes:

```python
fig, ax = plt.subplots()

sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    ax=ax
)

ax.set(
    title="Bill and Tip Relationship",
    xlabel="Total Bill",
    ylabel="Tip"
)

plt.show()
```

## 45. Change Figure Size

```python
plt.figure(figsize=(8, 5))

sns.boxplot(
    data=df,
    x="day",
    y="total_bill"
)

plt.show()
```

For figure-level functions:

```python
sns.relplot(
    data=df,
    x="total_bill",
    y="tip",
    height=5,
    aspect=1.5
)
```

```text
height = plot height
aspect = width divided by height
```

## 46. Rotate Axis Labels

```python
sns.countplot(
    data=df,
    x="day"
)

plt.xticks(rotation=45)
plt.show()
```

## 47. Change Category Order

```python
order = [
    "Thur",
    "Fri",
    "Sat",
    "Sun"
]

sns.countplot(
    data=df,
    x="day",
    order=order
)

plt.show()
```

Change hue order:

```python
sns.barplot(
    data=df,
    x="day",
    y="total_bill",
    hue="sex",
    hue_order=["Male", "Female"]
)
```

## 48. Add Legend

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex"
)

plt.legend(
    title="Gender",
    loc="upper left"
)

plt.show()
```

Move legend outside:

```python
plt.legend(
    bbox_to_anchor=(1.05, 1),
    loc="upper left"
)
```

For figure-level plots:

```python
g = sns.relplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex"
)

sns.move_legend(
    g,
    "upper left",
    bbox_to_anchor=(1, 1)
)
```

## 49. Annotate Bars

```python
ax = sns.barplot(
    data=df,
    x="day",
    y="total_bill"
)

for container in ax.containers:
    ax.bar_label(
        container,
        fmt="%.1f"
    )

plt.show()
```

## 50. Save a Seaborn Plot

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip"
)

plt.savefig(
    "seaborn_plot.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

Save figure-level plots:

```python
g = sns.relplot(
    data=df,
    x="total_bill",
    y="tip"
)

g.savefig(
    "relplot.png",
    dpi=300,
    bbox_inches="tight"
)
```

## 51. Handle Missing Values

Seaborn usually ignores missing values automatically.

Check missing values first:

```python
df.isna().sum()
```

Drop missing values:

```python
clean_df = df.dropna(
    subset=["total_bill", "tip"]
)
```

Then plot:

```python
sns.scatterplot(
    data=clean_df,
    x="total_bill",
    y="tip"
)
```

## 52. Plot Numerical and Categorical Variables

Numerical versus numerical:

```python
sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip"
)
```

Categorical versus numerical:

```python
sns.boxplot(
    data=df,
    x="day",
    y="total_bill"
)
```

Categorical count:

```python
sns.countplot(
    data=df,
    x="day"
)
```

Numerical distribution:

```python
sns.histplot(
    data=df,
    x="total_bill"
)
```

## 53. Wide-Form Data

```python
wide_df = pd.DataFrame({
    "A": [1, 3, 5],
    "B": [2, 4, 6],
    "C": [3, 5, 7]
})

sns.lineplot(data=wide_df)

plt.show()
```

## 54. Long-Form Data

```python
long_df = pd.DataFrame({
    "day": ["Mon", "Tue", "Wed", "Mon", "Tue", "Wed"],
    "product": ["A", "A", "A", "B", "B", "B"],
    "sales": [10, 15, 20, 8, 12, 18]
})

sns.lineplot(
    data=long_df,
    x="day",
    y="sales",
    hue="product"
)

plt.show()
```

Long-form data is generally preferred in Seaborn.

## 55. FacetGrid

```python
g = sns.FacetGrid(
    df,
    col="sex",
    row="smoker"
)

g.map_dataframe(
    sns.scatterplot,
    x="total_bill",
    y="tip"
)

g.add_legend()
plt.show()
```

## 56. Map Multiple Plot Types

```python
g = sns.FacetGrid(
    df,
    col="sex"
)

g.map_dataframe(
    sns.histplot,
    x="total_bill"
)

plt.show()
```

## 57. PairGrid

```python
iris = sns.load_dataset("iris")

g = sns.PairGrid(
    iris,
    hue="species"
)

g.map_upper(sns.scatterplot)
g.map_lower(sns.kdeplot)
g.map_diag(sns.histplot)

g.add_legend()
plt.show()
```

## 58. JointGrid

```python
g = sns.JointGrid(
    data=df,
    x="total_bill",
    y="tip"
)

g.plot_joint(sns.scatterplot)
g.plot_marginals(sns.histplot)

plt.show()
```

## 59. Common Plot Selection

```text
Relationship between two numerical columns:
scatterplot(), lineplot(), regplot()

Distribution of one numerical column:
histplot(), kdeplot(), ecdfplot()

Categorical versus numerical:
barplot(), boxplot(), violinplot(), stripplot(), swarmplot()

Count of categories:
countplot()

Correlation matrix:
heatmap()

Relationships among many numerical columns:
pairplot()

Joint and marginal distribution:
jointplot()

Regression relationship:
regplot(), lmplot(), residplot()
```

## 60. Frequently Used Pattern

```python
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset("tips")

sns.set_theme(
    style="whitegrid",
    context="notebook"
)

fig, ax = plt.subplots(
    figsize=(8, 5)
)

sns.scatterplot(
    data=df,
    x="total_bill",
    y="tip",
    hue="sex",
    style="smoker",
    size="size",
    sizes=(40, 200),
    ax=ax
)

ax.set(
    title="Total Bill vs Tip",
    xlabel="Total Bill",
    ylabel="Tip"
)

ax.legend(
    bbox_to_anchor=(1.05, 1),
    loc="upper left"
)

sns.despine()
plt.tight_layout()

plt.savefig(
    "tips_scatterplot.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

## 61. Important Differences

```python
sns.histplot()
```

Creates an axes-level histogram.

```python
sns.displot()
```

Creates a figure-level distribution plot and supports multiple panels.

```python
sns.scatterplot()
```

Creates an axes-level scatter plot.

```python
sns.relplot()
```

Creates a figure-level relational plot and supports faceting.

```python
sns.boxplot()
```

Creates an axes-level categorical plot.

```python
sns.catplot()
```

Creates a figure-level categorical plot and supports faceting.

```python
sns.regplot()
```

Creates one regression plot on an existing axes.

```python
sns.lmplot()
```

Creates a figure-level regression plot with faceting support.

```python
hue=
```

Separates data by color.

```python
style=
```

Separates data by marker or line style.

```python
size=
```

Separates data by marker or line size.

```python
col=
```

Creates separate plots across columns.

```python
row=
```

Creates separate plots across rows.

```

```
