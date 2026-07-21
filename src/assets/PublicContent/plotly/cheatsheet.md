

# Plotly Quick Cheatsheet

Plotly creates interactive charts with built-in hovering, zooming, panning, selection and legend controls.

## 1. Installation

```bash
pip install plotly
```

For Pandas and NumPy:

```bash
pip install plotly pandas numpy
```

For static PNG, JPEG, SVG or PDF export:

```bash
pip install -U kaleido
```

## 2. Imports

```python
import plotly.express as px
import plotly.graph_objects as go

import pandas as pd
import numpy as np
```

Use:

```python
plotly.express
```

for quick charts.

Use:

```python
plotly.graph_objects
```

for detailed customization.

## 3. Load Sample Data

```python
df = px.data.iris()

print(df.head())
```

Common built-in datasets:

```python
px.data.iris()
px.data.tips()
px.data.gapminder()
px.data.carshare()
px.data.stocks()
px.data.election()
px.data.wind()
px.data.medals_long()
px.data.medals_wide()
```

## 4. Basic Scatter Plot

```python
df = px.data.iris()

fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length"
)

fig.show()
```

## 5. Add Title and Labels

```python
fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    title="Sepal Width vs Length",
    labels={
        "sepal_width": "Sepal Width",
        "sepal_length": "Sepal Length"
    }
)

fig.show()
```

## 6. Add Color Using `color`

```python
fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    color="species"
)

fig.show()
```

For categorical columns, `color` assigns different colors to categories.

For numerical columns, it creates a continuous color scale.

## 7. Bubble Chart

```python
fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    color="species",
    size="petal_length",
    size_max=30
)

fig.show()
```

## 8. Change Marker Symbol

```python
fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    color="species",
    symbol="species"
)

fig.show()
```

## 9. Add Hover Information

```python
fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    color="species",
    hover_name="species",
    hover_data=[
        "petal_width",
        "petal_length"
    ]
)

fig.show()
```

Exclude a column from hover:

```python
fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    hover_data={
        "species_id": False
    }
)
```

## 10. Line Plot

```python
stocks = px.data.stocks()

fig = px.line(
    stocks,
    x="date",
    y="GOOG"
)

fig.show()
```

Add markers:

```python
fig = px.line(
    stocks,
    x="date",
    y="GOOG",
    markers=True
)
```

## 11. Multiple Lines

Convert wide data into long format:

```python
stocks = px.data.stocks()

long_df = stocks.melt(
    id_vars="date",
    var_name="company",
    value_name="price"
)
```

Create the plot:

```python
fig = px.line(
    long_df,
    x="date",
    y="price",
    color="company"
)

fig.show()
```

Plotly Express can also accept multiple columns directly:

```python
fig = px.line(
    stocks,
    x="date",
    y=["GOOG", "AAPL", "AMZN"]
)

fig.show()
```

## 12. Bar Chart

```python
df = px.data.tips()

fig = px.bar(
    df,
    x="day",
    y="total_bill"
)

fig.show()
```

When several rows belong to the same category, Plotly draws several overlapping or stacked records unless the data is aggregated first.

Aggregate before plotting:

```python
summary = (
    df.groupby("day", as_index=False)["total_bill"]
      .sum()
)

fig = px.bar(
    summary,
    x="day",
    y="total_bill"
)

fig.show()
```

## 13. Grouped Bar Chart

```python
summary = (
    df.groupby(["day", "sex"], as_index=False)["total_bill"]
      .sum()
)

fig = px.bar(
    summary,
    x="day",
    y="total_bill",
    color="sex",
    barmode="group"
)

fig.show()
```

## 14. Stacked Bar Chart

```python
fig = px.bar(
    summary,
    x="day",
    y="total_bill",
    color="sex",
    barmode="stack"
)

fig.show()
```

Common bar modes:

```python
barmode="group"
barmode="stack"
barmode="relative"
barmode="overlay"
```

## 15. Horizontal Bar Chart

```python
fig = px.bar(
    summary,
    x="total_bill",
    y="day",
    orientation="h"
)

fig.show()
```

## 16. Display Values on Bars

```python
fig = px.bar(
    summary,
    x="day",
    y="total_bill",
    text_auto=True
)

fig.show()
```

Format values:

```python
fig = px.bar(
    summary,
    x="day",
    y="total_bill",
    text_auto=".2f"
)
```

Move text outside:

```python
fig.update_traces(
    textposition="outside"
)
```

## 17. Histogram

```python
fig = px.histogram(
    df,
    x="total_bill"
)

fig.show()
```

Control bins:

```python
fig = px.histogram(
    df,
    x="total_bill",
    nbins=20
)
```

## 18. Histogram by Category

```python
fig = px.histogram(
    df,
    x="total_bill",
    color="sex",
    barmode="overlay",
    opacity=0.7
)

fig.show()
```

Normalize the histogram:

```python
fig = px.histogram(
    df,
    x="total_bill",
    histnorm="probability"
)
```

Common normalization options:

```python
histnorm="probability"
histnorm="percent"
histnorm="density"
histnorm="probability density"
```

## 19. Box Plot

```python
fig = px.box(
    df,
    x="day",
    y="total_bill"
)

fig.show()
```

Display individual data points:

```python
fig = px.box(
    df,
    x="day",
    y="total_bill",
    points="all"
)
```

Possible values:

```python
points=False
points="outliers"
points="suspectedoutliers"
points="all"
```

## 20. Violin Plot

```python
fig = px.violin(
    df,
    x="day",
    y="total_bill"
)

fig.show()
```

Display box and data points:

```python
fig = px.violin(
    df,
    x="day",
    y="total_bill",
    box=True,
    points="all",
    color="sex"
)

fig.show()
```

## 21. Strip Plot

```python
fig = px.strip(
    df,
    x="day",
    y="total_bill",
    color="sex"
)

fig.show()
```

## 22. Pie Chart

```python
summary = (
    df.groupby("day", as_index=False)["total_bill"]
      .sum()
)

fig = px.pie(
    summary,
    names="day",
    values="total_bill"
)

fig.show()
```

Display percentages:

```python
fig.update_traces(
    textinfo="label+percent"
)
```

## 23. Donut Chart

```python
fig = px.pie(
    summary,
    names="day",
    values="total_bill",
    hole=0.4
)

fig.show()
```

## 24. Area Chart

```python
stocks = px.data.stocks()

fig = px.area(
    stocks,
    x="date",
    y="GOOG"
)

fig.show()
```

Stacked area chart:

```python
long_df = stocks.melt(
    id_vars="date",
    var_name="company",
    value_name="price"
)

fig = px.area(
    long_df,
    x="date",
    y="price",
    color="company"
)

fig.show()
```

## 25. Heatmap from a Matrix

```python
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

fig = px.imshow(
    matrix,
    text_auto=True
)

fig.show()
```

Add row and column labels:

```python
fig = px.imshow(
    matrix,
    x=["A", "B", "C"],
    y=["X", "Y", "Z"],
    text_auto=True,
    aspect="auto"
)

fig.show()
```

## 26. Correlation Heatmap

```python
df = px.data.iris()

numeric_df = df.select_dtypes(include="number")
correlation = numeric_df.corr()

fig = px.imshow(
    correlation,
    text_auto=".2f",
    color_continuous_scale="RdBu_r",
    zmin=-1,
    zmax=1
)

fig.show()
```

## 27. Density Heatmap

```python
df = px.data.tips()

fig = px.density_heatmap(
    df,
    x="total_bill",
    y="tip"
)

fig.show()
```

Control bins:

```python
fig = px.density_heatmap(
    df,
    x="total_bill",
    y="tip",
    nbinsx=20,
    nbinsy=20
)
```

## 28. Density Contour Plot

```python
fig = px.density_contour(
    df,
    x="total_bill",
    y="tip",
    color="sex"
)

fig.show()
```

Fill contour regions:

```python
fig.update_traces(
    contours_coloring="fill"
)
```

## 29. Scatter Matrix

```python
iris = px.data.iris()

fig = px.scatter_matrix(
    iris,
    dimensions=[
        "sepal_width",
        "sepal_length",
        "petal_width",
        "petal_length"
    ],
    color="species"
)

fig.show()
```

Remove upper-half plots:

```python
fig.update_traces(
    diagonal_visible=False,
    showupperhalf=False
)
```

## 30. Faceted Plots

Create separate plots using a column:

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    color="sex",
    facet_col="day"
)

fig.show()
```

Create separate rows:

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    facet_row="smoker"
)

fig.show()
```

Control wrapping:

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    facet_col="day",
    facet_col_wrap=2
)
```

## 31. Trendline

Install Statsmodels when required:

```bash
pip install statsmodels
```

Linear trendline:

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    trendline="ols"
)

fig.show()
```

Other options include:

```python
trendline="ols"
trendline="lowess"
trendline="rolling"
trendline="expanding"
trendline="ewm"
```

View regression results:

```python
results = px.get_trendline_results(fig)

print(results)
```

## 32. Error Bars

```python
data = pd.DataFrame({
    "x": [1, 2, 3, 4],
    "y": [10, 15, 13, 20],
    "error": [1, 2, 1.5, 2]
})

fig = px.scatter(
    data,
    x="x",
    y="y",
    error_y="error"
)

fig.show()
```

For asymmetric errors:

```python
fig = px.scatter(
    data,
    x="x",
    y="y",
    error_y="error",
    error_y_minus=[0.5, 1, 0.5, 1]
)
```

## 33. 3D Scatter Plot

```python
iris = px.data.iris()

fig = px.scatter_3d(
    iris,
    x="sepal_length",
    y="sepal_width",
    z="petal_length",
    color="species",
    size="petal_width"
)

fig.show()
```

## 34. 3D Line Plot

```python
t = np.linspace(0, 10, 200)

data = pd.DataFrame({
    "x": np.cos(t),
    "y": np.sin(t),
    "z": t
})

fig = px.line_3d(
    data,
    x="x",
    y="y",
    z="z"
)

fig.show()
```

## 35. 3D Surface Plot

```python
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)

X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

fig = go.Figure(
    data=go.Surface(
        x=X,
        y=Y,
        z=Z
    )
)

fig.show()
```

## 36. Geographic Scatter Plot

```python
df = px.data.gapminder().query(
    "year == 2007"
)

fig = px.scatter_geo(
    df,
    locations="iso_alpha",
    size="pop",
    color="continent",
    hover_name="country",
    projection="natural earth"
)

fig.show()
```

Common projections:

```python
projection="natural earth"
projection="orthographic"
projection="mercator"
projection="equirectangular"
```

## 37. Choropleth Map

```python
df = px.data.gapminder().query(
    "year == 2007"
)

fig = px.choropleth(
    df,
    locations="iso_alpha",
    color="lifeExp",
    hover_name="country",
    color_continuous_scale="Viridis"
)

fig.show()
```

## 38. Street Map

```python
df = px.data.carshare()

fig = px.scatter_map(
    df,
    lat="centroid_lat",
    lon="centroid_lon",
    color="peak_hour",
    size="car_hours",
    zoom=10,
    map_style="open-street-map"
)

fig.show()
```

Use `px.scatter_map()` rather than the deprecated `px.scatter_mapbox()`.

## 39. Sunburst Chart

```python
tips = px.data.tips()

fig = px.sunburst(
    tips,
    path=["day", "time", "sex"],
    values="total_bill"
)

fig.show()
```

## 40. Treemap

```python
fig = px.treemap(
    tips,
    path=["day", "time", "sex"],
    values="total_bill"
)

fig.show()
```

## 41. Funnel Chart

```python
data = pd.DataFrame({
    "stage": [
        "Website Visits",
        "Registrations",
        "Trials",
        "Purchases"
    ],
    "count": [1000, 600, 300, 120]
})

fig = px.funnel(
    data,
    x="count",
    y="stage"
)

fig.show()
```

## 42. Polar Chart

```python
wind = px.data.wind()

fig = px.scatter_polar(
    wind,
    r="frequency",
    theta="direction",
    color="strength",
    symbol="strength"
)

fig.show()
```

Polar line chart:

```python
fig = px.line_polar(
    wind,
    r="frequency",
    theta="direction",
    color="strength",
    line_close=True
)
```

## 43. Parallel Coordinates

```python
iris = px.data.iris()

fig = px.parallel_coordinates(
    iris,
    dimensions=[
        "sepal_width",
        "sepal_length",
        "petal_width",
        "petal_length"
    ],
    color="species_id"
)

fig.show()
```

## 44. Animation

```python
gapminder = px.data.gapminder()

fig = px.scatter(
    gapminder,
    x="gdpPercap",
    y="lifeExp",
    animation_frame="year",
    animation_group="country",
    size="pop",
    color="continent",
    hover_name="country",
    log_x=True,
    size_max=55,
    range_x=[100, 100000],
    range_y=[25, 90]
)

fig.show()
```

Important animation parameters:

```python
animation_frame=
animation_group=
range_x=
range_y=
```

Fixing axis ranges prevents the scale from changing between frames.

## 45. Plotly Graph Objects

Create a figure manually:

```python
fig = go.Figure()

fig.add_trace(
    go.Scatter(
        x=[1, 2, 3, 4],
        y=[10, 20, 15, 30],
        mode="lines+markers",
        name="Sales"
    )
)

fig.show()
```

Common trace types:

```python
go.Scatter()
go.Bar()
go.Histogram()
go.Box()
go.Violin()
go.Pie()
go.Heatmap()
go.Surface()
go.Scatter3d()
```

## 46. Scatter Modes

```python
mode="lines"
mode="markers"
mode="text"
mode="lines+markers"
mode="markers+text"
mode="lines+markers+text"
```

Example:

```python
fig = go.Figure(
    go.Scatter(
        x=[1, 2, 3],
        y=[10, 20, 15],
        mode="lines+markers+text",
        text=["A", "B", "C"],
        textposition="top center"
    )
)

fig.show()
```

## 47. Add Multiple Traces

```python
fig = go.Figure()

fig.add_trace(
    go.Scatter(
        x=[1, 2, 3],
        y=[10, 20, 30],
        name="Product A"
    )
)

fig.add_trace(
    go.Scatter(
        x=[1, 2, 3],
        y=[15, 18, 25],
        name="Product B"
    )
)

fig.show()
```

## 48. Update Layout

```python
fig.update_layout(
    title="Monthly Sales",
    xaxis_title="Month",
    yaxis_title="Sales",
    width=800,
    height=500
)

fig.show()
```

Common layout options:

```python
fig.update_layout(
    title="Chart Title",
    template="plotly_white",
    hovermode="x unified",
    showlegend=True,
    margin=dict(
        l=50,
        r=50,
        t=80,
        b=50
    )
)
```

## 49. Update Traces

```python
fig.update_traces(
    marker_size=12,
    marker_opacity=0.7
)
```

For line traces:

```python
fig.update_traces(
    line_width=3,
    mode="lines+markers"
)
```

Update selected traces only:

```python
fig.update_traces(
    marker_size=15,
    selector=dict(name="Product A")
)
```

## 50. Update Axes

```python
fig.update_xaxes(
    title="Month",
    showgrid=True,
    zeroline=False
)

fig.update_yaxes(
    title="Revenue",
    showgrid=True,
    zeroline=True
)
```

## 51. Set Axis Ranges

```python
fig.update_xaxes(
    range=[0, 10]
)

fig.update_yaxes(
    range=[0, 100]
)
```

Reverse an axis:

```python
fig.update_yaxes(
    autorange="reversed"
)
```

## 52. Logarithmic Axis

Using Plotly Express:

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    log_x=True,
    log_y=True
)
```

Using Graph Objects:

```python
fig.update_xaxes(
    type="log"
)

fig.update_yaxes(
    type="log"
)
```

## 53. Category Ordering

```python
day_order = [
    "Thur",
    "Fri",
    "Sat",
    "Sun"
]

fig = px.bar(
    summary,
    x="day",
    y="total_bill",
    category_orders={
        "day": day_order
    }
)
```

Using axis settings:

```python
fig.update_xaxes(
    categoryorder="array",
    categoryarray=day_order
)
```

## 54. Templates

```python
fig.update_layout(
    template="plotly_white"
)
```

Common templates:

```python
"plotly"
"plotly_white"
"plotly_dark"
"ggplot2"
"seaborn"
"simple_white"
"presentation"
"none"
```

Set a default template:

```python
import plotly.io as pio

pio.templates.default = "plotly_white"
```

## 55. Discrete Color Sequences

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    color="day",
    color_discrete_sequence=px.colors.qualitative.Set2
)
```

Common qualitative palettes:

```python
px.colors.qualitative.Plotly
px.colors.qualitative.D3
px.colors.qualitative.G10
px.colors.qualitative.Set1
px.colors.qualitative.Set2
px.colors.qualitative.Pastel
px.colors.qualitative.Dark24
```

## 56. Map Specific Categories to Colors

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    color="sex",
    color_discrete_map={
        "Male": "blue",
        "Female": "red"
    }
)
```

## 57. Continuous Color Scales

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip",
    color="size",
    color_continuous_scale="Viridis"
)
```

Common continuous scales:

```python
"Viridis"
"Plasma"
"Inferno"
"Magma"
"Cividis"
"Turbo"
"Blues"
"Reds"
"RdBu"
```

Reverse a scale:

```python
color_continuous_scale="Viridis_r"
```

## 58. Customize Hover Labels

```python
fig.update_traces(
    hovertemplate=(
        "Bill: %{x}<br>"
        "Tip: %{y}<br>"
        "<extra></extra>"
    )
)
```

Common hover variables:

```python
%{x}
%{y}
%{z}
%{text}
%{marker.size}
```

`<extra></extra>` removes the secondary trace-name box.

## 59. Hover Modes

```python
fig.update_layout(
    hovermode="closest"
)
```

Common values:

```python
hovermode="closest"
hovermode="x"
hovermode="y"
hovermode="x unified"
hovermode="y unified"
```

## 60. Add Annotations

```python
fig.add_annotation(
    x=3,
    y=30,
    text="Maximum Value",
    showarrow=True,
    arrowhead=2,
    ax=-40,
    ay=-40
)
```

Add plain text:

```python
fig.add_annotation(
    x=2,
    y=20,
    text="Important",
    showarrow=False
)
```

## 61. Add Horizontal and Vertical Lines

```python
fig.add_hline(
    y=20,
    line_dash="dash",
    annotation_text="Target"
)
```

```python
fig.add_vline(
    x=3,
    line_dash="dot",
    annotation_text="Deadline"
)
```

## 62. Highlight a Region

Vertical region:

```python
fig.add_vrect(
    x0=2,
    x1=4,
    opacity=0.2,
    line_width=0,
    annotation_text="Important Period"
)
```

Horizontal region:

```python
fig.add_hrect(
    y0=10,
    y1=20,
    opacity=0.2,
    line_width=0
)
```

## 63. Subplots

```python
from plotly.subplots import make_subplots

fig = make_subplots(
    rows=1,
    cols=2,
    subplot_titles=[
        "Line Plot",
        "Bar Plot"
    ]
)

fig.add_trace(
    go.Scatter(
        x=[1, 2, 3],
        y=[10, 20, 15]
    ),
    row=1,
    col=1
)

fig.add_trace(
    go.Bar(
        x=["A", "B", "C"],
        y=[10, 15, 12]
    ),
    row=1,
    col=2
)

fig.show()
```

## 64. Shared Axes

```python
fig = make_subplots(
    rows=2,
    cols=1,
    shared_xaxes=True
)
```

Add spacing:

```python
fig = make_subplots(
    rows=2,
    cols=2,
    horizontal_spacing=0.1,
    vertical_spacing=0.15
)
```

## 65. Secondary Y-Axis

```python
fig = make_subplots(
    specs=[
        [{"secondary_y": True}]
    ]
)

fig.add_trace(
    go.Scatter(
        x=[1, 2, 3],
        y=[10, 20, 30],
        name="Sales"
    ),
    secondary_y=False
)

fig.add_trace(
    go.Scatter(
        x=[1, 2, 3],
        y=[1, 3, 2],
        name="Growth"
    ),
    secondary_y=True
)

fig.update_yaxes(
    title_text="Sales",
    secondary_y=False
)

fig.update_yaxes(
    title_text="Growth",
    secondary_y=True
)

fig.show()
```

## 66. Combine Different Plot Types

```python
fig = go.Figure()

fig.add_trace(
    go.Bar(
        x=["Jan", "Feb", "Mar"],
        y=[100, 120, 150],
        name="Sales"
    )
)

fig.add_trace(
    go.Scatter(
        x=["Jan", "Feb", "Mar"],
        y=[90, 125, 140],
        mode="lines+markers",
        name="Target"
    )
)

fig.show()
```

## 67. Legend Customization

```python
fig.update_layout(
    legend=dict(
        title="Category",
        orientation="h",
        x=0.5,
        xanchor="center",
        y=1.1,
        yanchor="bottom"
    )
)
```

Hide a legend:

```python
fig.update_layout(
    showlegend=False
)
```

Hide one trace from the legend:

```python
fig.update_traces(
    showlegend=False,
    selector=dict(name="Target")
)
```

## 68. Figure Size and Margins

```python
fig.update_layout(
    width=900,
    height=500,
    margin=dict(
        l=60,
        r=40,
        t=80,
        b=60
    )
)
```

Enable automatic sizing:

```python
fig.update_layout(
    autosize=True
)
```

## 69. Display Configuration

```python
fig.show(
    config={
        "displaylogo": False,
        "scrollZoom": True,
        "responsive": True
    }
)
```

Common options:

```python
"displaylogo": False
"scrollZoom": True
"responsive": True
"displayModeBar": False
```

Remove selected mode-bar buttons:

```python
fig.show(
    config={
        "modeBarButtonsToRemove": [
            "lasso2d",
            "select2d"
        ]
    }
)
```

## 70. Save as Interactive HTML

```python
fig.write_html(
    "plot.html"
)
```

Create a smaller file using a CDN-hosted Plotly library:

```python
fig.write_html(
    "plot.html",
    include_plotlyjs="cdn"
)
```

Open automatically:

```python
fig.write_html(
    "plot.html",
    auto_open=True
)
```

## 71. Save as Static Image

```python
fig.write_image(
    "plot.png"
)
```

High-resolution image:

```python
fig.write_image(
    "plot.png",
    width=1200,
    height=700,
    scale=2
)
```

Other formats:

```python
fig.write_image("plot.jpg")
fig.write_image("plot.svg")
fig.write_image("plot.pdf")
```

Static image export requires Kaleido.

## 72. Save and Load JSON

Save:

```python
fig.write_json(
    "plot.json"
)
```

Load:

```python
import plotly.io as pio

fig = pio.read_json(
    "plot.json"
)

fig.show()
```

Convert to a dictionary:

```python
figure_dict = fig.to_dict()
```

Convert to JSON text:

```python
json_text = fig.to_json()
```

## 73. Display in Jupyter Notebook

```python
fig.show()
```

Set the renderer manually:

```python
import plotly.io as pio

pio.renderers.default = "notebook"
```

Other renderers may include:

```python
"browser"
"notebook"
"iframe"
"svg"
"png"
```

View available renderers:

```python
print(pio.renderers)
```

## 74. Plot Pandas Data

```python
df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr"],
    "sales": [100, 120, 115, 150]
})

fig = px.line(
    df,
    x="month",
    y="sales",
    markers=True
)

fig.show()
```

## 75. Wide-Form Data

```python
df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar"],
    "product_a": [10, 20, 30],
    "product_b": [15, 18, 25]
})

fig = px.line(
    df,
    x="month",
    y=["product_a", "product_b"],
    markers=True
)

fig.show()
```

## 76. Long-Form Data

```python
df = pd.DataFrame({
    "month": [
        "Jan", "Feb", "Mar",
        "Jan", "Feb", "Mar"
    ],
    "product": [
        "A", "A", "A",
        "B", "B", "B"
    ],
    "sales": [
        10, 20, 30,
        15, 18, 25
    ]
})

fig = px.line(
    df,
    x="month",
    y="sales",
    color="product",
    markers=True
)

fig.show()
```

Long-form data is generally more convenient for color, symbol, animation and faceting.

## 77. Common Plot Selection

```text
Relationship between numerical columns:
px.scatter()

Trend over time:
px.line()

Compare categories:
px.bar()

View a numerical distribution:
px.histogram()

Compare distributions:
px.box()
px.violin()

Part-to-whole relationship:
px.pie()
px.sunburst()
px.treemap()

Matrix values:
px.imshow()

Two-dimensional density:
px.density_heatmap()
px.density_contour()

Geographical values:
px.scatter_geo()
px.choropleth()
px.scatter_map()

Three-dimensional values:
px.scatter_3d()
go.Surface()

Animated data:
animation_frame=
animation_group=
```

## 78. Plotly Express vs Graph Objects

```python
import plotly.express as px
```

Plotly Express:

```text
High-level interface
Shorter code
Works naturally with DataFrames
Best for quick exploration
Creates complete figures
```

```python
import plotly.graph_objects as go
```

Graph Objects:

```text
Lower-level interface
More detailed control
Add traces one at a time
Useful for complex figures
Useful for mixed chart types
```

A Plotly Express figure is still a Graph Objects figure:

```python
fig = px.scatter(
    df,
    x="total_bill",
    y="tip"
)

fig.add_trace(
    go.Scatter(
        x=[10, 20, 30],
        y=[2, 4, 6],
        mode="lines"
    )
)
```

## 79. Frequently Used Pattern

```python
import plotly.express as px
import pandas as pd

df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr"],
    "sales": [100, 120, 115, 150],
    "profit": [15, 20, 18, 30],
    "region": ["North", "South", "North", "South"]
})

fig = px.scatter(
    df,
    x="sales",
    y="profit",
    color="region",
    size="sales",
    hover_name="month",
    title="Sales vs Profit",
    labels={
        "sales": "Sales Revenue",
        "profit": "Profit"
    },
    template="plotly_white"
)

fig.update_traces(
    marker=dict(
        opacity=0.8,
        line=dict(width=1)
    )
)

fig.update_layout(
    width=850,
    height=500,
    hovermode="closest",
    legend_title="Region"
)

fig.write_html(
    "sales_profit.html"
)

fig.show()
```

## 80. Important Differences

```python
px.scatter()
```

Creates a complete scatter plot using the high-level interface.

```python
go.Scatter()
```

Creates an individual scatter trace.

```python
fig.update_layout()
```

Changes figure-wide settings such as title, size, template and legend.

```python
fig.update_traces()
```

Changes data-trace settings such as markers, lines, text and hover.

```python
fig.update_xaxes()
fig.update_yaxes()
```

Changes axis settings.

```python
fig.add_trace()
```

Adds another data series to the figure.

```python
fig.add_annotation()
```

Adds text or arrows.

```python
fig.add_hline()
fig.add_vline()
```

Adds reference lines.

```python
fig.show()
```

Displays the interactive chart.

```python
fig.write_html()
```

Saves an interactive chart.

```python
fig.write_image()
```

Saves a static chart.
