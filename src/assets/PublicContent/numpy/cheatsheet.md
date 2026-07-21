

# NumPy Quick Cheatsheet

```python
import numpy as np
```

## 1. Create Arrays

```python
a = np.array([1, 2, 3])

b = np.array([
    [1, 2],
    [3, 4]
])

zeros = np.zeros((2, 3))
ones = np.ones((2, 3))
full = np.full((2, 3), 7)

identity = np.eye(3)
```

## 2. Create Number Sequences

```python
np.arange(0, 10, 2)
# [0, 2, 4, 6, 8]

np.linspace(0, 1, 5)
# 5 equally spaced values
```

Difference:

```python
np.arange(start, stop, step)
np.linspace(start, stop, number_of_values)
```

## 3. Random Arrays

```python
rng = np.random.default_rng(42)

rng.random((2, 3))          # Random floats from 0 to 1
rng.integers(1, 10, (2, 3)) # Random integers
rng.normal(0, 1, (2, 3))    # Normal distribution
```

Shuffle:

```python
a = np.array([1, 2, 3, 4])
rng.shuffle(a)
```

Randomly select:

```python
rng.choice(a, size=2)
```

## 4. Inspect an Array

```python
a.shape       # Dimensions
a.ndim        # Number of dimensions
a.size        # Total number of elements
a.dtype       # Data type
a.itemsize    # Bytes per element
```

Example:

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

print(a.shape)  # (2, 3)
print(a.ndim)   # 2
print(a.size)   # 6
```

## 5. Change Data Type

```python
a = np.array([1, 2, 3])

a.astype(float)
a.astype(str)
a.astype(np.int64)
```

Create with a specific type:

```python
a = np.array([1, 2, 3], dtype=np.float64)
```

## 6. Access Elements

```python
a = np.array([10, 20, 30, 40])

a[0]      # 10
a[-1]     # 40
a[1:3]    # [20, 30]
a[:2]     # [10, 20]
a[::2]    # [10, 30]
```

For a 2D array:

```python
a = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

a[0, 1]      # 2
a[0]         # First row
a[:, 1]      # Second column
a[0:2, 1:3]  # Subarray
```

## 7. Modify Elements

```python
a = np.array([1, 2, 3])

a[0] = 10
a[1:] = 5
```

For 2D arrays:

```python
a[:, 0] = 0
a[1, :] = 7
```

## 8. Reshape Arrays

```python
a = np.arange(12)

b = a.reshape(3, 4)
c = a.reshape(2, 2, 3)
```

Automatically calculate one dimension:

```python
a.reshape(3, -1)
```

Flatten:

```python
a.flatten()   # Returns a copy
a.ravel()     # Returns a view when possible
```

## 9. Transpose Arrays

```python
a = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

a.T
np.transpose(a)
```

Swap axes:

```python
np.swapaxes(a, 0, 1)
```

## 10. Basic Arithmetic

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a + b
a - b
a * b
a / b
a ** 2
a % 2
```

These operations are element-wise.

```python
a * b
# [4, 10, 18]
```

## 11. Scalar Operations

```python
a = np.array([1, 2, 3])

a + 10
a * 2
a / 2
a ** 3
```

## 12. Mathematical Functions

```python
np.sqrt(a)
np.exp(a)
np.log(a)
np.log10(a)

np.sin(a)
np.cos(a)
np.tan(a)

np.abs(a)
np.round(a, 2)
np.floor(a)
np.ceil(a)
```

## 13. Aggregate Functions

```python
a = np.array([1, 2, 3, 4])

a.sum()
a.mean()
a.median()       # Invalid as a method
np.median(a)

a.min()
a.max()
a.std()
a.var()
```

Index of minimum and maximum:

```python
a.argmin()
a.argmax()
```

Cumulative operations:

```python
a.cumsum()
a.cumprod()
```

## 14. Operations Along an Axis

```python
a = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

a.sum(axis=0)   # Column-wise
a.sum(axis=1)   # Row-wise

a.mean(axis=0)
a.max(axis=1)
```

Remember:

```python
axis=0   # Operate down rows, result per column
axis=1   # Operate across columns, result per row
```

## 15. Boolean Filtering

```python
a = np.array([10, 20, 30, 40])

a[a > 20]
a[a <= 30]
```

Multiple conditions:

```python
a[(a > 10) & (a < 40)]
a[(a == 10) | (a == 40)]
a[~(a > 20)]
```

Use:

```python
&   # AND
|   # OR
~   # NOT
```

Do not use `and` or `or` with NumPy arrays.

## 16. Conditional Operations

```python
a = np.array([10, 20, 30, 40])

np.where(a > 20, 1, 0)
```

Get matching indexes:

```python
np.where(a > 20)
```

Replace conditionally:

```python
a[a > 20] = 0
```

## 17. Broadcasting

```python
a = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

b = np.array([10, 20, 30])

a + b
```

Result:

```python
[
    [11, 22, 33],
    [14, 25, 36]
]
```

NumPy automatically expands compatible dimensions.

Compatible dimensions must either:

```python
Be equal
```

or

```python
One of them must be 1
```

## 18. Combine Arrays

Vertical stacking:

```python
np.vstack((a, b))
```

Horizontal stacking:

```python
np.hstack((a, b))
```

General concatenation:

```python
np.concatenate((a, b), axis=0)
np.concatenate((a, b), axis=1)
```

Stack along a new axis:

```python
np.stack((a, b), axis=0)
```

## 19. Split Arrays

```python
a = np.arange(12)

np.split(a, 3)
np.array_split(a, 5)
```

For 2D arrays:

```python
np.vsplit(a, 2)
np.hsplit(a, 3)
```

`array_split()` allows unequal divisions.

## 20. Sorting

```python
a = np.array([4, 2, 7, 1])

np.sort(a)
a.sort()
```

Indexes that would sort the array:

```python
np.argsort(a)
```

For 2D arrays:

```python
np.sort(a, axis=0)  # Sort columns
np.sort(a, axis=1)  # Sort rows
```

## 21. Unique Values

```python
a = np.array([1, 2, 2, 3, 3, 3])

np.unique(a)
```

With counts:

```python
values, counts = np.unique(a, return_counts=True)
```

## 22. Copy vs View

```python
a = np.array([1, 2, 3])

b = a
c = a.view()
d = a.copy()
```

```python
b = a          # Same object
c = a.view()   # Shares data
d = a.copy()   # Independent copy
```

Example:

```python
d[0] = 100

print(a)
# a remains unchanged
```

## 23. Matrix Multiplication

```python
a = np.array([
    [1, 2],
    [3, 4]
])

b = np.array([
    [5, 6],
    [7, 8]
])
```

Element-wise multiplication:

```python
a * b
```

Matrix multiplication:

```python
a @ b
np.matmul(a, b)
np.dot(a, b)
```

## 24. Linear Algebra

```python
a = np.array([
    [1, 2],
    [3, 4]
])

np.linalg.det(a)       # Determinant
np.linalg.inv(a)       # Inverse
np.linalg.matrix_rank(a)
np.linalg.eig(a)       # Eigenvalues and eigenvectors
```

Solve linear equations:

```python
A = np.array([
    [2, 1],
    [1, 3]
])

b = np.array([8, 13])

x = np.linalg.solve(A, b)
```

Vector norm:

```python
np.linalg.norm(a)
```

## 25. Dot Product

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

np.dot(a, b)
a @ b
```

Result:

```python
32
```

Because:

```python
1*4 + 2*5 + 3*6
```

## 26. Handle Missing Values

```python
a = np.array([1, 2, np.nan, 4])

np.isnan(a)
np.isnan(a).sum()
```

Ignore `NaN` values:

```python
np.nansum(a)
np.nanmean(a)
np.nanmin(a)
np.nanmax(a)
```

Replace `NaN`:

```python
a = np.nan_to_num(a, nan=0)
```

## 27. Infinity Values

```python
a = np.array([1, np.inf, -np.inf])

np.isinf(a)
np.isfinite(a)

np.nan_to_num(
    a,
    posinf=999,
    neginf=-999
)
```

## 28. Compare Arrays

```python
a = np.array([1, 2, 3])
b = np.array([1, 2, 3])

np.array_equal(a, b)
```

For floating-point arrays:

```python
np.allclose(a, b)
```

Check all or any condition:

```python
np.all(a > 0)
np.any(a > 2)
```

## 29. Add or Remove Dimensions

Add a dimension:

```python
a = np.array([1, 2, 3])

a[:, np.newaxis]
a[np.newaxis, :]
```

Using `expand_dims`:

```python
np.expand_dims(a, axis=0)
np.expand_dims(a, axis=1)
```

Remove dimensions of size 1:

```python
np.squeeze(a)
```

## 30. Save and Load Arrays

Save one array:

```python
np.save("array.npy", a)
```

Load:

```python
a = np.load("array.npy")
```

Save multiple arrays:

```python
np.savez("arrays.npz", first=a, second=b)
```

Load multiple arrays:

```python
data = np.load("arrays.npz")

a = data["first"]
b = data["second"]
```

Text files:

```python
np.savetxt("array.csv", a, delimiter=",")
a = np.loadtxt("array.csv", delimiter=",")
```

## 31. Convert Between Lists and Arrays

List to NumPy array:

```python
numbers = [1, 2, 3]

a = np.array(numbers)
```

NumPy array to list:

```python
numbers = a.tolist()
```

## 32. Common Array Creation Functions

```python
np.zeros((3, 3))
np.ones((3, 3))
np.empty((3, 3))

np.full((3, 3), 5)
np.eye(3)

np.zeros_like(a)
np.ones_like(a)
np.full_like(a, 10)
```

## 33. Insert, Append and Delete

Append:

```python
np.append(a, [4, 5])
```

Insert:

```python
np.insert(a, 1, 100)
```

Delete:

```python
np.delete(a, 2)
```

For 2D arrays:

```python
np.delete(a, 0, axis=0)  # Delete row
np.delete(a, 1, axis=1)  # Delete column
```

These functions return new arrays.

## 34. Repeat and Tile

```python
a = np.array([1, 2, 3])

np.repeat(a, 2)
# [1, 1, 2, 2, 3, 3]

np.tile(a, 2)
# [1, 2, 3, 1, 2, 3]
```

## 35. Find Maximum of Multiple Arrays

```python
a = np.array([1, 5, 3])
b = np.array([2, 4, 6])

np.maximum(a, b)
np.minimum(a, b)
```

## 36. Clip Values

```python
a = np.array([1, 5, 10, 20])

np.clip(a, 5, 15)
```

Result:

```python
[5, 5, 10, 15]
```

## 37. Meshgrid

```python
x = np.array([1, 2, 3])
y = np.array([10, 20])

X, Y = np.meshgrid(x, y)
```

Useful for coordinates, graphs and numerical computations.

## 38. Common Cleaning Example

```python
a = np.array([1, 2, np.nan, np.inf, 5])

a = np.nan_to_num(
    a,
    nan=0,
    posinf=0,
    neginf=0
)

a = a[a >= 0]

mean_value = a.mean()
```

## 39. Important Differences

```python
a * b
# Element-wise multiplication
```

```python
a @ b
# Matrix multiplication
```

```python
a.reshape(...)
# Changes shape without changing data
```

```python
a.flatten()
# Returns a copied one-dimensional array
```

```python
a.ravel()
# Returns a view when possible
```

```python
a.copy()
# Independent data
```

```python
a.view()
# Shared data
```

## 40. Frequently Used NumPy Pattern

```python
import numpy as np

a = np.array([10, 20, 30, 40, 50])

filtered = a[a > 20]
scaled = a * 2
average = a.mean()
maximum_index = a.argmax()

reshaped = a.reshape(5, 1)

print(filtered)
print(scaled)
print(average)
print(maximum_index)
print(reshaped)
```
