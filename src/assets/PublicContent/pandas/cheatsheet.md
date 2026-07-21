
# Pandas Quick Cheatsheet

```python
import pandas as pd
```

## 1. Create Data

```python
# Series
s = pd.Series([10, 20, 30])

# DataFrame
df = pd.DataFrame({
    "name": ["Aman", "Riya", "John"],
    "age": [21, 22, 20],
    "marks": [85, 92, 78]
})
```

## 2. Read and Save Files

```python
df = pd.read_csv("data.csv")
df = pd.read_excel("data.xlsx")
df = pd.read_json("data.json")

df.to_csv("output.csv", index=False)
df.to_excel("output.xlsx", index=False)
df.to_json("output.json", orient="records")
```

## 3. Inspect Data

```python
df.head()          # First 5 rows
df.tail()          # Last 5 rows
df.sample(3)       # Random 3 rows

df.shape           # (rows, columns)
df.columns         # Column names
df.index           # Row indexes
df.dtypes          # Data types
df.info()          # Structure and null values
df.describe()      # Statistical summary
```

## 4. Select Columns

```python
df["name"]                    # Single column as Series
df[["name", "marks"]]         # Multiple columns as DataFrame
```

## 5. Select Rows

```python
df.loc[0]                     # Row by label
df.loc[0:2, ["name", "age"]]  # Label-based selection

df.iloc[0]                    # Row by position
df.iloc[0:2, 0:2]             # Position-based selection
```

`loc` includes the ending label, while `iloc` excludes the ending position.

## 6. Filter Data

```python
df[df["marks"] > 80]

df[(df["marks"] > 80) & (df["age"] < 22)]

df[df["name"].isin(["Aman", "Riya"])]

df[df["marks"].between(80, 90)]

df.query("marks > 80 and age < 22")
```

Use:

```python
&   # AND
|   # OR
~   # NOT
```

## 7. Add or Modify Columns

```python
df["passed"] = df["marks"] >= 40

df["bonus_marks"] = df["marks"] + 5

df["grade"] = df["marks"].apply(
    lambda x: "A" if x >= 90 else "B"
)

df = df.assign percentage=df["marks"])
```

## 8. Rename Columns

```python
df.rename(columns={
    "marks": "score",
    "name": "student_name"
}, inplace=True)
```

## 9. Delete Rows or Columns

```python
df.drop(columns=["age"], inplace=True)

df.drop(index=[0, 2], inplace=True)

df.drop_duplicates(inplace=True)
```

## 10. Missing Values

```python
df.isna()                  # Check each value
df.isna().sum()            # Null count per column
df.notna()

df.dropna()                # Remove rows containing nulls
df.dropna(subset=["marks"])

df.fillna(0)
df["marks"].fillna(df["marks"].mean(), inplace=True)
```

## 11. Sorting

```python
df.sort_values("marks")

df.sort_values("marks", ascending=False)

df.sort_values(
    ["age", "marks"],
    ascending=[True, False]
)

df.sort_index()
```

## 12. Useful Statistics

```python
df["marks"].sum()
df["marks"].mean()
df["marks"].median()
df["marks"].min()
df["marks"].max()
df["marks"].std()
df["marks"].count()

df["name"].nunique()
df["name"].unique()
df["name"].value_counts()
```

## 13. GroupBy

```python
df.groupby("department")["salary"].mean()

df.groupby("department").agg({
    "salary": ["mean", "max"],
    "employee_id": "count"
})

df.groupby(["department", "gender"])["salary"].sum()
```

To convert grouped indexes back into columns:

```python
result = df.groupby("department", as_index=False)["salary"].mean()
```

## 14. Merge and Combine DataFrames

```python
# SQL-style join
result = pd.merge(
    df1,
    df2,
    on="id",
    how="inner"
)
```

Join types:

```python
how="inner"
how="left"
how="right"
how="outer"
```

Different column names:

```python
pd.merge(
    df1,
    df2,
    left_on="student_id",
    right_on="id"
)
```

Concatenate:

```python
pd.concat([df1, df2], axis=0)  # Add rows
pd.concat([df1, df2], axis=1)  # Add columns
```

## 15. String Operations

```python
df["name"].str.lower()
df["name"].str.upper()
df["name"].str.strip()

df["name"].str.contains("an", case=False, na=False)

df["email"].str.split("@", expand=True)

df["name"].str.replace("Aman", "Aman Kumar")
```

## 16. Date and Time

```python
df["date"] = pd.to_datetime(df["date"])

df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"] = df["date"].dt.day
df["weekday"] = df["date"].dt.day_name()
```

Filter by date:

```python
df[df["date"] >= "2026-01-01"]
```

## 17. Change Data Types

```python
df["age"] = df["age"].astype(int)
df["marks"] = df["marks"].astype(float)
df["id"] = df["id"].astype(str)

df["marks"] = pd.to_numeric(df["marks"], errors="coerce")
```

## 18. Replace Values

```python
df["gender"].replace({
    "M": "Male",
    "F": "Female"
}, inplace=True)

df.replace("unknown", pd.NA, inplace=True)
```

## 19. Pivot Tables

```python
pd.pivot_table(
    df,
    values="sales",
    index="region",
    columns="product",
    aggfunc="sum",
    fill_value=0
)
```

## 20. Reshape Data

Wide to long:

```python
long_df = df.melt(
    id_vars=["name"],
    var_name="subject",
    value_name="marks"
)
```

Long to wide:

```python
wide_df = df.pivot(
    index="name",
    columns="subject",
    values="marks"
)
```

## 21. Iterate Over Rows

```python
for index, row in df.iterrows():
    print(row["name"], row["marks"])
```

Prefer vectorized operations instead of loops whenever possible:

```python
df["double_marks"] = df["marks"] * 2
```

## 22. Reset and Set Index

```python
df.set_index("id", inplace=True)

df.reset_index(inplace=True)

df.reset_index(drop=True, inplace=True)
```

## 23. Common Cleaning Pipeline

```python
df = pd.read_csv("data.csv")

df.columns = df.columns.str.strip().str.lower()
df.drop_duplicates(inplace=True)
df["date"] = pd.to_datetime(df["date"], errors="coerce")
df["marks"] = pd.to_numeric(df["marks"], errors="coerce")
df["marks"] = df["marks"].fillna(df["marks"].mean())

df.to_csv("cleaned_data.csv", index=False)
```

## Important Difference

```python
df["column"]       # Series
df[["column"]]     # DataFrame
```

```python
df.loc[]           # Label-based
df.iloc[]          # Position-based
```

```python
axis=0             # Rows
axis=1             # Columns
```
