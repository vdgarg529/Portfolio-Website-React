

# PyTorch Quick Cheatsheet

PyTorch is used for tensor computation, automatic differentiation, neural-network development, GPU acceleration and deep-learning model training.

## 1. Installation

Basic installation:

```bash
pip install torch torchvision torchaudio
```

Verify installation:

```python
import torch

print(torch.__version__)
print(torch.rand(2, 3))
```

For CUDA-specific installation commands, use the PyTorch installation selector because the command depends on the operating system and CUDA version.

## 2. Common Imports

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

from torch.utils.data import Dataset, DataLoader
```

Common optional imports:

```python
import torchvision
import torchvision.transforms as transforms

import numpy as np
import pandas as pd
```

## 3. Create Tensors

From Python data:

```python
x = torch.tensor([1, 2, 3])

matrix = torch.tensor([
    [1, 2],
    [3, 4]
])
```

Specify data type:

```python
x = torch.tensor(
    [1, 2, 3],
    dtype=torch.float32
)
```

## 4. Common Tensor-Creation Functions

```python
torch.zeros(2, 3)
torch.ones(2, 3)
torch.empty(2, 3)

torch.full((2, 3), 7)

torch.eye(3)

torch.arange(0, 10, 2)
torch.linspace(0, 1, 5)
```

Create random tensors:

```python
torch.rand(2, 3)       # Uniform distribution [0, 1)
torch.randn(2, 3)      # Standard normal distribution
torch.randint(0, 10, (2, 3))
```

Create tensors matching another tensor:

```python
torch.zeros_like(x)
torch.ones_like(x)
torch.rand_like(x.float())
```

## 5. Inspect a Tensor

```python
x.shape
x.size()
x.ndim
x.numel()

x.dtype
x.device
x.requires_grad
```

Example:

```python
x = torch.randn(2, 3)

print(x.shape)       # torch.Size([2, 3])
print(x.ndim)        # 2
print(x.numel())     # 6
print(x.dtype)       # torch.float32
```

## 6. Common Data Types

```python
torch.float16
torch.bfloat16
torch.float32
torch.float64

torch.int8
torch.int16
torch.int32
torch.int64

torch.bool
```

Common aliases:

```python
torch.float
torch.double
torch.long
```

Typically:

```text
Neural-network inputs and weights: torch.float32
Classification labels: torch.int64 / torch.long
Binary masks: torch.bool
```

## 7. Change Tensor Type

```python
x = x.float()
x = x.double()
x = x.long()
x = x.bool()
```

Using `to()`:

```python
x = x.to(torch.float32)
```

Using `type()`:

```python
x = x.type(torch.float64)
```

## 8. Access Elements

```python
x = torch.tensor([10, 20, 30, 40])

x[0]       # tensor(10)
x[-1]      # tensor(40)
x[1:3]     # tensor([20, 30])
x[::2]     # tensor([10, 30])
```

For a matrix:

```python
x = torch.tensor([
    [1, 2, 3],
    [4, 5, 6]
])

x[0, 1]       # 2
x[0]          # First row
x[:, 1]       # Second column
x[:, 1:3]     # Selected columns
```

## 9. Convert a Scalar Tensor

```python
x = torch.tensor(25)

value = x.item()

print(value)
print(type(value))
```

`item()` works only when the tensor contains one element.

## 10. Modify Tensor Values

```python
x = torch.tensor([1, 2, 3])

x[0] = 10
x[1:] = 5
```

In-place operations usually end with `_`:

```python
x.add_(5)
x.mul_(2)
x.zero_()
```

Equivalent non-in-place operation:

```python
x = x + 5
```

Use in-place operations carefully when automatic differentiation is involved.

## 11. Basic Arithmetic

```python
a = torch.tensor([1, 2, 3])
b = torch.tensor([4, 5, 6])

a + b
a - b
a * b
a / b
a ** 2
a % 2
```

These operations are element-wise.

## 12. Scalar Operations

```python
x = torch.tensor([1, 2, 3])

x + 10
x - 10
x * 2
x / 2
x ** 3
```

## 13. Mathematical Functions

```python
torch.abs(x)
torch.sqrt(x)
torch.square(x)

torch.exp(x)
torch.log(x)
torch.log10(x)

torch.sin(x)
torch.cos(x)
torch.tan(x)

torch.floor(x)
torch.ceil(x)
torch.round(x)

torch.sigmoid(x)
torch.tanh(x)
```

Clamp values:

```python
torch.clamp(
    x,
    min=0,
    max=1
)
```

## 14. Aggregate Operations

```python
x.sum()
x.mean()
x.min()
x.max()

x.median()
x.std()
x.var()
```

Index of minimum and maximum:

```python
x.argmin()
x.argmax()
```

Cumulative operations:

```python
x.cumsum(dim=0)
x.cumprod(dim=0)
```

## 15. Operations Along Dimensions

```python
x = torch.tensor([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
])

x.sum(dim=0)    # One value per column
x.sum(dim=1)    # One value per row

x.mean(dim=0)
x.max(dim=1)
```

Keep the reduced dimension:

```python
x.sum(
    dim=1,
    keepdim=True
)
```

Remember:

```text
dim=0: combine rows
dim=1: combine columns
```

## 16. Reshape Tensors

```python
x = torch.arange(12)

x = x.reshape(3, 4)
```

Automatically calculate one dimension:

```python
x.reshape(3, -1)
```

Using `view()`:

```python
x.view(3, 4)
```

Difference:

```text
reshape():
Can copy data when needed.

view():
Requires compatible memory layout.
```

Make a tensor contiguous before `view()`:

```python
x = x.contiguous().view(3, 4)
```

## 17. Flatten Tensors

Flatten everything:

```python
x.flatten()
```

Keep the batch dimension:

```python
x.flatten(start_dim=1)
```

Common CNN pattern:

```python
x = torch.flatten(x, start_dim=1)
```

## 18. Add and Remove Dimensions

Add a dimension:

```python
x = torch.tensor([1, 2, 3])

x.unsqueeze(0)   # Shape: (1, 3)
x.unsqueeze(1)   # Shape: (3, 1)
```

Equivalent indexing:

```python
x[None, :]
x[:, None]
```

Remove dimensions of size one:

```python
x.squeeze()
x.squeeze(dim=0)
```

## 19. Transpose and Permute

For a matrix:

```python
x.T
x.transpose(0, 1)
```

Reorder several dimensions:

```python
x = torch.randn(32, 3, 224, 224)

x = x.permute(0, 2, 3, 1)
```

Example:

```text
Before: batch, channels, height, width
After:  batch, height, width, channels
```

## 20. Combine Tensors

Concatenate along an existing dimension:

```python
a = torch.randn(2, 3)
b = torch.randn(2, 3)

torch.cat(
    [a, b],
    dim=0
)
```

Result shape:

```text
(4, 3)
```

Stack along a new dimension:

```python
torch.stack(
    [a, b],
    dim=0
)
```

Result shape:

```text
(2, 2, 3)
```

## 21. Split Tensors

```python
x = torch.arange(12)

torch.chunk(
    x,
    chunks=3
)
```

Split by size:

```python
torch.split(
    x,
    split_size_or_sections=4
)
```

Unequal sizes:

```python
torch.split(
    x,
    [2, 5, 5]
)
```

## 22. Boolean Filtering

```python
x = torch.tensor([10, 20, 30, 40])

x[x > 20]
```

Multiple conditions:

```python
x[(x > 10) & (x < 40)]

x[(x == 10) | (x == 40)]

x[~(x > 20)]
```

Use:

```text
&   AND
|   OR
~   NOT
```

## 23. Conditional Selection

```python
x = torch.tensor([10, 20, 30, 40])

torch.where(
    x > 20,
    1,
    0
)
```

Get indexes:

```python
torch.where(x > 20)
```

Replace conditionally:

```python
x[x > 20] = 0
```

## 24. Sorting and Unique Values

Sort values:

```python
values, indexes = torch.sort(x)
```

Descending order:

```python
values, indexes = torch.sort(
    x,
    descending=True
)
```

Top values:

```python
values, indexes = torch.topk(
    x,
    k=3
)
```

Unique values:

```python
torch.unique(x)
```

Unique values with counts:

```python
values, counts = torch.unique(
    x,
    return_counts=True
)
```

## 25. Matrix Multiplication

Element-wise multiplication:

```python
a * b
```

Matrix multiplication:

```python
a @ b
```

Equivalent functions:

```python
torch.matmul(a, b)
torch.mm(a, b)       # Two-dimensional matrices
torch.bmm(a, b)      # Batched matrices
```

Matrix-vector multiplication:

```python
torch.mv(matrix, vector)
```

Dot product:

```python
torch.dot(a, b)
```

## 26. Linear Algebra

```python
torch.linalg.det(x)
torch.linalg.inv(x)
torch.linalg.matrix_rank(x)

torch.linalg.eig(x)
torch.linalg.svd(x)

torch.linalg.norm(x)
```

Solve a linear system:

```python
A = torch.tensor([
    [2.0, 1.0],
    [1.0, 3.0]
])

b = torch.tensor([8.0, 13.0])

solution = torch.linalg.solve(A, b)
```

## 27. Broadcasting

```python
x = torch.tensor([
    [1, 2, 3],
    [4, 5, 6]
])

y = torch.tensor([10, 20, 30])

result = x + y
```

Result:

```text
[[11, 22, 33],
 [14, 25, 36]]
```

Two dimensions are compatible when:

```text
They are equal
or
One of them is 1
```

## 28. NumPy Conversion

NumPy array to tensor:

```python
import numpy as np

array = np.array([1, 2, 3])

tensor = torch.from_numpy(array)
```

Tensor to NumPy:

```python
array = tensor.numpy()
```

CPU tensor requiring gradients:

```python
array = tensor.detach().cpu().numpy()
```

`torch.from_numpy()` usually shares memory with the NumPy array.

Independent copy:

```python
tensor = torch.tensor(array)
```

## 29. Copy and Detach

Clone data:

```python
copy = x.clone()
```

Detach from the computation graph:

```python
detached = x.detach()
```

Independent detached copy:

```python
copy = x.detach().clone()
```

## 30. Select a Device

```python
if torch.cuda.is_available():
    device = torch.device("cuda")
elif torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")

print(device)
```

Move a tensor:

```python
x = x.to(device)
```

Move a model:

```python
model = model.to(device)
```

The model and input tensors must usually be on the same device.

## 31. CUDA Information

```python
torch.cuda.is_available()
torch.cuda.device_count()

torch.cuda.current_device()
torch.cuda.get_device_name(0)
```

Memory information:

```python
torch.cuda.memory_allocated()
torch.cuda.memory_reserved()
```

Clear unused cached memory:

```python
torch.cuda.empty_cache()
```

This releases unused cached blocks but does not free tensors that are still referenced.

## 32. Set Random Seeds

```python
import random
import numpy as np
import torch

seed = 42

random.seed(seed)
np.random.seed(seed)

torch.manual_seed(seed)

if torch.cuda.is_available():
    torch.cuda.manual_seed_all(seed)
```

Request deterministic algorithms:

```python
torch.use_deterministic_algorithms(True)
```

Deterministic execution can reduce performance and some operations may not have deterministic implementations.

## 33. Automatic Differentiation

```python
x = torch.tensor(
    2.0,
    requires_grad=True
)

y = x ** 3

y.backward()

print(x.grad)
```

For:

```text
y = x³
dy/dx = 3x²
```

At `x = 2`:

```text
gradient = 12
```

## 34. Inspect the Computation Graph

```python
print(x.requires_grad)
print(y.requires_grad)

print(y.grad_fn)
```

Leaf tensors typically store gradients in:

```python
x.grad
```

Intermediate tensors usually do not retain gradients unless requested:

```python
y.retain_grad()
```

## 35. Disable Gradient Tracking

```python
with torch.no_grad():
    predictions = model(inputs)
```

For inference:

```python
with torch.inference_mode():
    predictions = model(inputs)
```

`inference_mode()` provides stronger inference-oriented optimizations than `no_grad()`.

## 36. Stop Gradient Flow

```python
detached_tensor = tensor.detach()
```

Example:

```python
features = feature_extractor(inputs)
features = features.detach()

outputs = classifier(features)
```

Gradients will not flow through the detached tensor to the feature extractor.

## 37. Clear Gradients

Gradients accumulate by default.

```python
optimizer.zero_grad()
```

Memory-efficient form:

```python
optimizer.zero_grad(
    set_to_none=True
)
```

Typical order:

```python
optimizer.zero_grad(set_to_none=True)

outputs = model(inputs)
loss = criterion(outputs, targets)

loss.backward()
optimizer.step()
```

## 38. Build a Neural Network

```python
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()

        self.network = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        return self.network(x)
```

Create the model:

```python
model = NeuralNetwork()
```

Move it to a device:

```python
model = NeuralNetwork().to(device)
```

`nn.Module` is the base class used for PyTorch models and model components. ([PyTorch Documentation][2])

## 39. Call the Model

Correct:

```python
outputs = model(inputs)
```

Avoid calling `forward()` manually:

```python
outputs = model.forward(inputs)
```

Calling the model directly also applies hooks and other `nn.Module` behavior.

## 40. Sequential Model

```python
model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),

    nn.Linear(64, 32),
    nn.ReLU(),

    nn.Linear(32, 2)
)
```

`nn.Sequential` is useful when layers run strictly one after another.

## 41. Common Fully Connected Layers

```python
nn.Linear(
    in_features=128,
    out_features=64
)
```

Flatten:

```python
nn.Flatten()
```

Lazy linear layer:

```python
nn.LazyLinear(
    out_features=64
)
```

A lazy layer infers some input dimensions during the first forward pass.

## 42. Common Activation Functions

Modules:

```python
nn.ReLU()
nn.LeakyReLU(0.01)

nn.GELU()
nn.ELU()

nn.Sigmoid()
nn.Tanh()

nn.Softmax(dim=1)
nn.LogSoftmax(dim=1)
```

Functional versions:

```python
F.relu(x)
F.gelu(x)

torch.sigmoid(x)
torch.softmax(x, dim=1)
```

## 43. Dropout

```python
nn.Dropout(p=0.5)
```

For CNN feature maps:

```python
nn.Dropout2d(p=0.2)
```

Dropout is active during training and disabled during evaluation.

## 44. Batch Normalization

One-dimensional:

```python
nn.BatchNorm1d(
    num_features=128
)
```

Two-dimensional CNN data:

```python
nn.BatchNorm2d(
    num_features=64
)
```

Three-dimensional volumetric data:

```python
nn.BatchNorm3d(
    num_features=32
)
```

## 45. Layer Normalization

```python
nn.LayerNorm(
    normalized_shape=128
)
```

Common transformer-style example:

```python
nn.LayerNorm(
    normalized_shape=embedding_size
)
```

## 46. Common Convolution Layers

One-dimensional:

```python
nn.Conv1d(
    in_channels=16,
    out_channels=32,
    kernel_size=3
)
```

Two-dimensional:

```python
nn.Conv2d(
    in_channels=3,
    out_channels=32,
    kernel_size=3,
    stride=1,
    padding=1
)
```

Three-dimensional:

```python
nn.Conv3d(
    in_channels=1,
    out_channels=16,
    kernel_size=3
)
```

## 47. Pooling Layers

```python
nn.MaxPool1d(kernel_size=2)
nn.MaxPool2d(kernel_size=2)
nn.MaxPool3d(kernel_size=2)
```

Average pooling:

```python
nn.AvgPool2d(kernel_size=2)
```

Adaptive pooling:

```python
nn.AdaptiveAvgPool2d(
    output_size=(1, 1)
)
```

Adaptive pooling produces a fixed output size regardless of the input dimensions.

## 48. Simple CNN

```python
class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(
                3,
                32,
                kernel_size=3,
                padding=1
            ),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(
                32,
                64,
                kernel_size=3,
                padding=1
            ),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.AdaptiveAvgPool2d((1, 1))
        )

        self.classifier = nn.Linear(
            64,
            num_classes
        )

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, start_dim=1)
        return self.classifier(x)
```

## 49. Recurrent Layers

Basic RNN:

```python
nn.RNN(
    input_size=128,
    hidden_size=256,
    num_layers=2,
    batch_first=True
)
```

LSTM:

```python
nn.LSTM(
    input_size=128,
    hidden_size=256,
    num_layers=2,
    batch_first=True
)
```

GRU:

```python
nn.GRU(
    input_size=128,
    hidden_size=256,
    num_layers=2,
    batch_first=True
)
```

Bidirectional:

```python
nn.LSTM(
    input_size=128,
    hidden_size=256,
    batch_first=True,
    bidirectional=True
)
```

## 50. Embedding Layer

```python
embedding = nn.Embedding(
    num_embeddings=10000,
    embedding_dim=128
)
```

Input:

```python
token_ids = torch.tensor([
    [12, 45, 78],
    [9, 10, 11]
])
```

Output:

```python
embedded = embedding(token_ids)
```

Shape:

```text
Input:  (batch, sequence)
Output: (batch, sequence, embedding_dimension)
```

## 51. Transformer Encoder

```python
encoder_layer = nn.TransformerEncoderLayer(
    d_model=256,
    nhead=8,
    dim_feedforward=1024,
    dropout=0.1,
    batch_first=True
)

transformer = nn.TransformerEncoder(
    encoder_layer,
    num_layers=6
)
```

Forward pass:

```python
output = transformer(
    embeddings
)
```

Typical shape:

```text
(batch, sequence_length, embedding_size)
```

## 52. Model Parameters

List parameters:

```python
for name, parameter in model.named_parameters():
    print(
        name,
        parameter.shape,
        parameter.requires_grad
    )
```

Count trainable parameters:

```python
trainable_parameters = sum(
    parameter.numel()
    for parameter in model.parameters()
    if parameter.requires_grad
)

print(trainable_parameters)
```

## 53. Freeze Model Parameters

Freeze everything:

```python
for parameter in model.parameters():
    parameter.requires_grad = False
```

Unfreeze one layer:

```python
for parameter in model.classifier.parameters():
    parameter.requires_grad = True
```

Pass only trainable parameters to the optimizer:

```python
optimizer = torch.optim.Adam(
    filter(
        lambda parameter: parameter.requires_grad,
        model.parameters()
    ),
    lr=1e-3
)
```

## 54. Weight Initialization

```python
def initialize_weights(module):
    if isinstance(module, nn.Linear):
        nn.init.xavier_uniform_(
            module.weight
        )

        if module.bias is not None:
            nn.init.zeros_(
                module.bias
            )

    elif isinstance(module, nn.Conv2d):
        nn.init.kaiming_normal_(
            module.weight,
            mode="fan_out",
            nonlinearity="relu"
        )

model.apply(initialize_weights)
```

Common initialization functions:

```python
nn.init.xavier_uniform_()
nn.init.xavier_normal_()

nn.init.kaiming_uniform_()
nn.init.kaiming_normal_()

nn.init.zeros_()
nn.init.ones_()
nn.init.normal_()
```

## 55. Custom Dataset

```python
class CustomDataset(Dataset):
    def __init__(self, features, labels):
        self.features = torch.tensor(
            features,
            dtype=torch.float32
        )

        self.labels = torch.tensor(
            labels,
            dtype=torch.long
        )

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, index):
        return (
            self.features[index],
            self.labels[index]
        )
```

Create it:

```python
dataset = CustomDataset(
    features,
    labels
)
```

PyTorch separates sample storage through `Dataset` from batching and iteration through `DataLoader`. ([PyTorch Documentation][3])

## 56. TensorDataset

For tensors already in memory:

```python
from torch.utils.data import TensorDataset

dataset = TensorDataset(
    X_tensor,
    y_tensor
)
```

Each item returns:

```python
features, label = dataset[0]
```

## 57. DataLoader

```python
loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True
)
```

Common configuration:

```python
loader = DataLoader(
    dataset,
    batch_size=64,
    shuffle=True,
    num_workers=4,
    pin_memory=True,
    drop_last=False
)
```

Iterate over batches:

```python
for inputs, targets in loader:
    print(inputs.shape)
    print(targets.shape)
```

## 58. Split a Dataset

```python
from torch.utils.data import random_split

train_size = int(
    0.8 * len(dataset)
)

validation_size = (
    len(dataset) - train_size
)

train_dataset, validation_dataset = random_split(
    dataset,
    [train_size, validation_size],
    generator=torch.Generator().manual_seed(42)
)
```

## 59. Image Transforms

```python
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
```

Training augmentation:

```python
train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
```

## 60. Load Images from Folders

Expected structure:

```text
dataset/
    cats/
        image1.jpg
        image2.jpg
    dogs/
        image1.jpg
        image2.jpg
```

Load:

```python
from torchvision.datasets import ImageFolder

dataset = ImageFolder(
    root="dataset",
    transform=transform
)
```

Class mapping:

```python
print(dataset.class_to_idx)
```

## 61. Regression Losses

Mean squared error:

```python
criterion = nn.MSELoss()
```

Mean absolute error:

```python
criterion = nn.L1Loss()
```

Smooth L1:

```python
criterion = nn.SmoothL1Loss()
```

Example:

```python
predictions = model(inputs)

loss = criterion(
    predictions,
    targets
)
```

## 62. Multiclass Classification Loss

```python
criterion = nn.CrossEntropyLoss()
```

Usage:

```python
logits = model(inputs)

loss = criterion(
    logits,
    targets
)
```

Expected formats:

```text
logits shape:
(batch_size, number_of_classes)

targets shape:
(batch_size,)

targets dtype:
torch.long
```

Do not apply `softmax()` before `CrossEntropyLoss`.

Incorrect:

```python
probabilities = torch.softmax(
    logits,
    dim=1
)

loss = criterion(
    probabilities,
    targets
)
```

Correct:

```python
loss = criterion(
    logits,
    targets
)
```

## 63. Binary Classification Loss

Recommended:

```python
criterion = nn.BCEWithLogitsLoss()
```

Usage:

```python
logits = model(inputs).squeeze(1)

loss = criterion(
    logits,
    targets.float()
)
```

Convert logits to probabilities:

```python
probabilities = torch.sigmoid(
    logits
)
```

Convert probabilities to predictions:

```python
predictions = (
    probabilities >= 0.5
).long()
```

Do not apply `sigmoid()` before `BCEWithLogitsLoss`.

## 64. Class-Weighted Loss

Multiclass classification:

```python
class_weights = torch.tensor(
    [1.0, 2.5, 0.8],
    device=device
)

criterion = nn.CrossEntropyLoss(
    weight=class_weights
)
```

Binary classification:

```python
criterion = nn.BCEWithLogitsLoss(
    pos_weight=torch.tensor(
        [3.0],
        device=device
    )
)
```

## 65. Common Optimizers

Stochastic gradient descent:

```python
optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.01,
    momentum=0.9,
    weight_decay=1e-4
)
```

Adam:

```python
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=1e-3
)
```

AdamW:

```python
optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=1e-3,
    weight_decay=1e-2
)
```

RMSprop:

```python
optimizer = torch.optim.RMSprop(
    model.parameters(),
    lr=1e-3
)
```

## 66. Basic Training Loop

```python
model.train()

for inputs, targets in train_loader:
    inputs = inputs.to(device)
    targets = targets.to(device)

    optimizer.zero_grad(
        set_to_none=True
    )

    outputs = model(inputs)

    loss = criterion(
        outputs,
        targets
    )

    loss.backward()

    optimizer.step()
```

The standard optimization sequence is:

```text
Clear gradients
Forward pass
Calculate loss
Backward pass
Update parameters
```

## 67. Complete Training Epoch

```python
def train_one_epoch(
    model,
    loader,
    criterion,
    optimizer,
    device
):
    model.train()

    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    for inputs, targets in loader:
        inputs = inputs.to(
            device,
            non_blocking=True
        )

        targets = targets.to(
            device,
            non_blocking=True
        )

        optimizer.zero_grad(
            set_to_none=True
        )

        logits = model(inputs)

        loss = criterion(
            logits,
            targets
        )

        loss.backward()
        optimizer.step()

        total_loss += (
            loss.item() * inputs.size(0)
        )

        predictions = logits.argmax(
            dim=1
        )

        total_correct += (
            predictions == targets
        ).sum().item()

        total_samples += inputs.size(0)

    average_loss = (
        total_loss / total_samples
    )

    accuracy = (
        total_correct / total_samples
    )

    return average_loss, accuracy
```

## 68. Validation Loop

```python
def evaluate(
    model,
    loader,
    criterion,
    device
):
    model.eval()

    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    with torch.inference_mode():
        for inputs, targets in loader:
            inputs = inputs.to(device)
            targets = targets.to(device)

            logits = model(inputs)

            loss = criterion(
                logits,
                targets
            )

            total_loss += (
                loss.item() * inputs.size(0)
            )

            predictions = logits.argmax(
                dim=1
            )

            total_correct += (
                predictions == targets
            ).sum().item()

            total_samples += inputs.size(0)

    average_loss = (
        total_loss / total_samples
    )

    accuracy = (
        total_correct / total_samples
    )

    return average_loss, accuracy
```

## 69. Training vs Evaluation Mode

Training:

```python
model.train()
```

Evaluation:

```python
model.eval()
```

This affects layers such as:

```text
Dropout
Batch normalization
```

`model.eval()` does not disable gradients by itself. Use it together with:

```python
with torch.inference_mode():
    outputs = model(inputs)
```

The official `nn.Module` documentation distinguishes evaluation mode from gradient-disabling contexts. ([PyTorch Documentation][4])

## 70. Complete Multi-Epoch Training

```python
epochs = 20

for epoch in range(epochs):
    train_loss, train_accuracy = train_one_epoch(
        model,
        train_loader,
        criterion,
        optimizer,
        device
    )

    validation_loss, validation_accuracy = evaluate(
        model,
        validation_loader,
        criterion,
        device
    )

    print(
        f"Epoch {epoch + 1:02d}/{epochs} | "
        f"Train Loss: {train_loss:.4f} | "
        f"Train Accuracy: {train_accuracy:.4f} | "
        f"Validation Loss: {validation_loss:.4f} | "
        f"Validation Accuracy: {validation_accuracy:.4f}"
    )
```

## 71. Classification Predictions

Multiclass:

```python
logits = model(inputs)

predictions = logits.argmax(
    dim=1
)
```

Probabilities:

```python
probabilities = torch.softmax(
    logits,
    dim=1
)
```

Highest confidence:

```python
confidence, predictions = probabilities.max(
    dim=1
)
```

## 72. Calculate Accuracy

```python
predictions = logits.argmax(
    dim=1
)

correct = (
    predictions == targets
).sum().item()

accuracy = (
    correct / targets.size(0)
)
```

## 73. Gradient Clipping

Clip by norm:

```python
torch.nn.utils.clip_grad_norm_(
    model.parameters(),
    max_norm=1.0
)
```

Training order:

```python
loss.backward()

torch.nn.utils.clip_grad_norm_(
    model.parameters(),
    max_norm=1.0
)

optimizer.step()
```

Clip by value:

```python
torch.nn.utils.clip_grad_value_(
    model.parameters(),
    clip_value=1.0
)
```

Gradient clipping is commonly useful for recurrent networks and unstable training.

## 74. Gradient Accumulation

```python
accumulation_steps = 4

optimizer.zero_grad(
    set_to_none=True
)

for step, (inputs, targets) in enumerate(
    train_loader
):
    inputs = inputs.to(device)
    targets = targets.to(device)

    outputs = model(inputs)

    loss = criterion(
        outputs,
        targets
    )

    loss = loss / accumulation_steps

    loss.backward()

    if (
        (step + 1) % accumulation_steps == 0
        or step + 1 == len(train_loader)
    ):
        optimizer.step()

        optimizer.zero_grad(
            set_to_none=True
        )
```

Effective batch size:

```text
batch_size × accumulation_steps
```

## 75. Learning-Rate Scheduler

Step scheduler:

```python
scheduler = torch.optim.lr_scheduler.StepLR(
    optimizer,
    step_size=10,
    gamma=0.1
)
```

Training:

```python
for epoch in range(epochs):
    train_one_epoch(
        model,
        train_loader,
        criterion,
        optimizer,
        device
    )

    scheduler.step()
```

## 76. Reduce Learning Rate on Plateau

```python
scheduler = (
    torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer,
        mode="min",
        factor=0.1,
        patience=3
    )
)
```

After validation:

```python
scheduler.step(
    validation_loss
)
```

## 77. Other Common Schedulers

```python
torch.optim.lr_scheduler.CosineAnnealingLR(
    optimizer,
    T_max=epochs
)
```

```python
torch.optim.lr_scheduler.OneCycleLR(
    optimizer,
    max_lr=1e-2,
    steps_per_epoch=len(train_loader),
    epochs=epochs
)
```

For `OneCycleLR`, call:

```python
scheduler.step()
```

after each optimizer update, not only after each epoch.

## 78. Check Current Learning Rate

```python
current_lr = optimizer.param_groups[0]["lr"]

print(current_lr)
```

For several parameter groups:

```python
for group in optimizer.param_groups:
    print(group["lr"])
```

## 79. Different Learning Rates for Layers

```python
optimizer = torch.optim.AdamW([
    {
        "params": model.features.parameters(),
        "lr": 1e-4
    },
    {
        "params": model.classifier.parameters(),
        "lr": 1e-3
    }
])
```

## 80. Automatic Mixed Precision

Modern CUDA AMP pattern:

```python
scaler = torch.amp.GradScaler(
    "cuda",
    enabled=device.type == "cuda"
)

for inputs, targets in train_loader:
    inputs = inputs.to(device)
    targets = targets.to(device)

    optimizer.zero_grad(
        set_to_none=True
    )

    with torch.amp.autocast(
        "cuda",
        enabled=device.type == "cuda"
    ):
        outputs = model(inputs)

        loss = criterion(
            outputs,
            targets
        )

    scaler.scale(loss).backward()

    scaler.step(optimizer)

    scaler.update()
```

The older `torch.cuda.amp.autocast()` and `torch.cuda.amp.GradScaler()` APIs are deprecated in favour of `torch.amp.autocast("cuda", ...)` and `torch.amp.GradScaler("cuda", ...)`. ([PyTorch Documentation][5])

## 81. AMP with Gradient Clipping

```python
scaler.scale(loss).backward()

scaler.unscale_(optimizer)

torch.nn.utils.clip_grad_norm_(
    model.parameters(),
    max_norm=1.0
)

scaler.step(optimizer)
scaler.update()
```

Gradients should be unscaled before clipping.

## 82. Compile a Model

```python
model = model.to(device)

model = torch.compile(model)
```

Training continues normally:

```python
outputs = model(inputs)
```

Optional modes:

```python
model = torch.compile(
    model,
    mode="default"
)
```

```python
model = torch.compile(
    model,
    mode="reduce-overhead"
)
```

```python
model = torch.compile(
    model,
    mode="max-autotune"
)
```

`torch.compile()` optimizes a model or function and caches compiled results for reuse. ([PyTorch Documentation][6])

## 83. Save Model Weights

Recommended:

```python
torch.save(
    model.state_dict(),
    "model_weights.pth"
)
```

A state dictionary contains model parameters and registered buffers.

## 84. Load Model Weights

```python
model = NeuralNetwork()

state_dict = torch.load(
    "model_weights.pth",
    map_location=device,
    weights_only=True
)

model.load_state_dict(
    state_dict
)

model = model.to(device)
model.eval()
```

Using `weights_only=True` is the recommended pattern when loading model weights. ([PyTorch Documentation][7])

## 85. Save a Training Checkpoint

```python
checkpoint = {
    "epoch": epoch,
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    "scheduler_state_dict": scheduler.state_dict(),
    "validation_loss": validation_loss
}

torch.save(
    checkpoint,
    "checkpoint.pth"
)
```

## 86. Load a Training Checkpoint

```python
checkpoint = torch.load(
    "checkpoint.pth",
    map_location=device,
    weights_only=True
)

model.load_state_dict(
    checkpoint["model_state_dict"]
)

optimizer.load_state_dict(
    checkpoint["optimizer_state_dict"]
)

scheduler.load_state_dict(
    checkpoint["scheduler_state_dict"]
)

start_epoch = checkpoint["epoch"] + 1

validation_loss = checkpoint[
    "validation_loss"
]
```

After loading optimizer state, move optimizer tensors when necessary:

```python
for state in optimizer.state.values():
    for key, value in state.items():
        if torch.is_tensor(value):
            state[key] = value.to(device)
```

## 87. Save the Best Model

```python
best_validation_loss = float("inf")

for epoch in range(epochs):
    train_loss, _ = train_one_epoch(
        model,
        train_loader,
        criterion,
        optimizer,
        device
    )

    validation_loss, _ = evaluate(
        model,
        validation_loader,
        criterion,
        device
    )

    if validation_loss < best_validation_loss:
        best_validation_loss = validation_loss

        torch.save(
            model.state_dict(),
            "best_model.pth"
        )
```

## 88. Early Stopping

```python
best_loss = float("inf")
patience = 5
epochs_without_improvement = 0

for epoch in range(epochs):
    validation_loss, _ = evaluate(
        model,
        validation_loader,
        criterion,
        device
    )

    if validation_loss < best_loss:
        best_loss = validation_loss
        epochs_without_improvement = 0

        torch.save(
            model.state_dict(),
            "best_model.pth"
        )
    else:
        epochs_without_improvement += 1

    if epochs_without_improvement >= patience:
        print("Early stopping")
        break
```

## 89. Transfer Learning

```python
from torchvision.models import (
    resnet18,
    ResNet18_Weights
)

weights = ResNet18_Weights.DEFAULT

model = resnet18(
    weights=weights
)
```

Replace the final classification layer:

```python
input_features = model.fc.in_features

model.fc = nn.Linear(
    input_features,
    number_of_classes
)
```

Freeze the feature extractor:

```python
for parameter in model.parameters():
    parameter.requires_grad = False

model.fc = nn.Linear(
    input_features,
    number_of_classes
)
```

Move to device:

```python
model = model.to(device)
```

## 90. Use Pretrained Image Transforms

```python
weights = ResNet18_Weights.DEFAULT

preprocess = weights.transforms()
```

Apply to an image:

```python
input_tensor = preprocess(image)
```

## 91. Inference on One Sample

```python
model.eval()

input_tensor = input_tensor.unsqueeze(0)
input_tensor = input_tensor.to(device)

with torch.inference_mode():
    logits = model(input_tensor)

    probabilities = torch.softmax(
        logits,
        dim=1
    )

    confidence, predicted_class = probabilities.max(
        dim=1
    )

print(predicted_class.item())
print(confidence.item())
```

## 92. Hooks

Forward hook:

```python
def forward_hook(
    module,
    inputs,
    output
):
    print(
        module.__class__.__name__,
        output.shape
    )

handle = model.layer.register_forward_hook(
    forward_hook
)
```

Remove it:

```python
handle.remove()
```

Gradient hook:

```python
tensor.register_hook(
    lambda gradient: print(gradient)
)
```

## 93. Detect Autograd Errors

```python
with torch.autograd.detect_anomaly():
    outputs = model(inputs)

    loss = criterion(
        outputs,
        targets
    )

    loss.backward()
```

This is helpful for debugging NaN gradients and invalid backward operations, but it slows execution.

## 94. Check for NaN and Infinity

```python
torch.isnan(tensor).any()
torch.isinf(tensor).any()
torch.isfinite(tensor).all()
```

Replace invalid values:

```python
tensor = torch.nan_to_num(
    tensor,
    nan=0.0,
    posinf=1e6,
    neginf=-1e6
)
```

Check model gradients:

```python
for name, parameter in model.named_parameters():
    if parameter.grad is not None:
        if not torch.isfinite(
            parameter.grad
        ).all():
            print(
                "Invalid gradient:",
                name
            )
```

## 95. Inspect Gradient Magnitudes

```python
for name, parameter in model.named_parameters():
    if parameter.grad is not None:
        gradient_norm = (
            parameter.grad.norm().item()
        )

        print(
            name,
            gradient_norm
        )
```

## 96. TensorBoard Logging

Install:

```bash
pip install tensorboard
```

Create a writer:

```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter(
    log_dir="runs/experiment_1"
)
```

Log metrics:

```python
writer.add_scalar(
    "Loss/train",
    train_loss,
    epoch
)

writer.add_scalar(
    "Loss/validation",
    validation_loss,
    epoch
)

writer.add_scalar(
    "Accuracy/validation",
    validation_accuracy,
    epoch
)
```

Close:

```python
writer.close()
```

Run:

```bash
tensorboard --logdir runs
```

## 97. Profile Code

```python
from torch.profiler import (
    profile,
    record_function,
    ProfilerActivity
)

activities = [
    ProfilerActivity.CPU
]

if torch.cuda.is_available():
    activities.append(
        ProfilerActivity.CUDA
    )

with profile(
    activities=activities,
    record_shapes=True,
    profile_memory=True
) as profiler:
    with record_function("model_inference"):
        outputs = model(inputs)

print(
    profiler.key_averages().table(
        sort_by="cpu_time_total",
        row_limit=10
    )
)
```

## 98. DataLoader Performance

```python
train_loader = DataLoader(
    train_dataset,
    batch_size=128,
    shuffle=True,
    num_workers=4,
    pin_memory=True,
    persistent_workers=True,
    prefetch_factor=2
)
```

Move CUDA tensors asynchronously:

```python
inputs = inputs.to(
    device,
    non_blocking=True
)
```

`pin_memory=True` is mainly helpful when transferring CPU batches to CUDA.

## 99. Multi-GPU with DataParallel

Simple approach:

```python
if torch.cuda.device_count() > 1:
    model = nn.DataParallel(model)

model = model.to(device)
```

For serious multi-GPU training, `DistributedDataParallel` is generally preferred.

## 100. Distributed Data Parallel

Basic imports:

```python
import torch.distributed as dist

from torch.nn.parallel import (
    DistributedDataParallel as DDP
)
```

Initialize:

```python
dist.init_process_group(
    backend="nccl"
)

local_rank = int(
    os.environ["LOCAL_RANK"]
)

torch.cuda.set_device(
    local_rank
)

device = torch.device(
    "cuda",
    local_rank
)

model = NeuralNetwork().to(device)

model = DDP(
    model,
    device_ids=[local_rank]
)
```

Launch:

```bash
torchrun --nproc_per_node=4 train.py
```

PyTorch’s official DDP tutorial covers migration from one GPU to multi-GPU execution. ([PyTorch Documentation][8])

## 101. Export to ONNX

```python
model.eval()

example_input = torch.randn(
    1,
    3,
    224,
    224,
    device=device
)

torch.onnx.export(
    model,
    example_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamo=True
)
```

The modern ONNX exporter uses:

```python
dynamo=True
```

([PyTorch Documentation][9])

## 102. Common Shape Conventions

Fully connected input:

```text
(batch_size, features)
```

Image batch:

```text
(batch_size, channels, height, width)
```

Sequence with `batch_first=True`:

```text
(batch_size, sequence_length, features)
```

Multiclass logits:

```text
(batch_size, number_of_classes)
```

Binary logits:

```text
(batch_size,)
or
(batch_size, 1)
```

## 103. Common Training Mistakes

```text
Forgetting optimizer.zero_grad()
Applying softmax before CrossEntropyLoss
Applying sigmoid before BCEWithLogitsLoss
Using float labels with CrossEntropyLoss
Using integer labels with BCEWithLogitsLoss
Keeping the model on CPU while inputs are on GPU
Forgetting model.eval() during validation
Forgetting inference_mode() or no_grad() during inference
Fitting data transformations using validation/test data
Saving only the optimizer but not the model
Using an incorrect tensor shape
Using squeeze() without specifying a dimension
```

## 104. Important Differences

```python
model.train()
```

Enables training behavior for layers such as dropout and batch normalization.

```python
model.eval()
```

Enables evaluation behavior.

```python
torch.no_grad()
```

Disables gradient recording.

```python
torch.inference_mode()
```

Provides an inference-specific gradient-disabled mode.

```python
tensor.detach()
```

Returns a tensor disconnected from the current computation graph.

```python
tensor.clone()
```

Copies the tensor data.

```python
torch.cat()
```

Combines tensors along an existing dimension.

```python
torch.stack()
```

Creates a new dimension and combines tensors along it.

```python
reshape()
```

Returns the requested shape and may copy data.

```python
view()
```

Returns a view and requires compatible memory layout.

```python
CrossEntropyLoss()
```

Uses raw multiclass logits and integer class labels.

```python
BCEWithLogitsLoss()
```

Uses raw binary logits and floating-point labels.

```python
state_dict()
```

Contains model parameters and buffers.

```python
torch.save()
```

Serializes tensors or Python structures.

```python
torch.load()
```

Loads saved data.

## 105. Frequently Used Complete Pattern

```python
import torch
import torch.nn as nn

from torch.utils.data import (
    TensorDataset,
    DataLoader
)

# Device
if torch.cuda.is_available():
    device = torch.device("cuda")
elif torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")

# Example data
X = torch.randn(1000, 20)
y = torch.randint(0, 3, (1000,))

dataset = TensorDataset(X, y)

loader = DataLoader(
    dataset,
    batch_size=64,
    shuffle=True,
    pin_memory=device.type == "cuda"
)

# Model
model = nn.Sequential(
    nn.Linear(20, 128),
    nn.ReLU(),
    nn.Dropout(0.2),

    nn.Linear(128, 64),
    nn.ReLU(),

    nn.Linear(64, 3)
).to(device)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()

optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=1e-3,
    weight_decay=1e-2
)

# Training
epochs = 10

for epoch in range(epochs):
    model.train()

    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    for inputs, targets in loader:
        inputs = inputs.to(
            device,
            non_blocking=True
        )

        targets = targets.to(
            device,
            non_blocking=True
        )

        optimizer.zero_grad(
            set_to_none=True
        )

        logits = model(inputs)

        loss = criterion(
            logits,
            targets
        )

        loss.backward()
        optimizer.step()

        total_loss += (
            loss.item() * inputs.size(0)
        )

        predictions = logits.argmax(
            dim=1
        )

        total_correct += (
            predictions == targets
        ).sum().item()

        total_samples += inputs.size(0)

    average_loss = (
        total_loss / total_samples
    )

    accuracy = (
        total_correct / total_samples
    )

    print(
        f"Epoch {epoch + 1:02d} | "
        f"Loss: {average_loss:.4f} | "
        f"Accuracy: {accuracy:.4f}"
    )

# Save
torch.save(
    model.state_dict(),
    "model.pth"
)

# Inference
model.eval()

with torch.inference_mode():
    sample = torch.randn(
        1,
        20,
        device=device
    )

    logits = model(sample)

    prediction = logits.argmax(
        dim=1
    )

print(
    "Prediction:",
    prediction.item()
)
```
