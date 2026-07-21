
Here is a matching scikit-learn quick cheatsheet, based on the current stable scikit-learn 1.9 API. Scikit-learn provides tools for preprocessing, supervised and unsupervised learning, model selection, pipelines and evaluation. ([Scikit-learn][1])

# Scikit-learn Quick Cheatsheet

Scikit-learn, imported as `sklearn`, is a Python library for traditional machine learning.

It supports:

```text
Classification
Regression
Clustering
Dimensionality reduction
Feature preprocessing
Feature selection
Model evaluation
Hyperparameter tuning
Machine-learning pipelines
```

## 1. Installation

```bash
pip install scikit-learn
```

Upgrade:

```bash
pip install --upgrade scikit-learn
```

Check the installed version:

```python
import sklearn

print(sklearn.__version__)
```

## 2. Common Imports

```python
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
```

## 3. Basic Machine-Learning Workflow

```python
# 1. Prepare features and target
X = df.drop(columns="target")
y = df["target"]

# 2. Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 3. Create the model
model = SomeEstimator()

# 4. Train the model
model.fit(X_train, y_train)

# 5. Make predictions
y_pred = model.predict(X_test)

# 6. Evaluate
score = some_metric(y_test, y_pred)
```

## 4. Core Estimator Methods

Most scikit-learn estimators follow the same API:

```python
model.fit(X_train, y_train)
```

Train the model.

```python
model.predict(X_test)
```

Predict target values.

```python
model.score(X_test, y_test)
```

Return the estimator’s default score.

```python
model.get_params()
```

Get model parameters.

```python
model.set_params(parameter=value)
```

Change model parameters.

Transformers also provide:

```python
transformer.fit(X_train)
transformer.transform(X_train)
transformer.fit_transform(X_train)
```

## 5. Features and Target

```python
X = df.drop(columns="target")
y = df["target"]
```

Convention:

```text
X = input features
y = output target
```

Expected shapes:

```text
X: (number_of_samples, number_of_features)
y: (number_of_samples,)
```

## 6. Train-Test Split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Parameters:

```text
test_size=0.2      20% testing data
train_size=0.8     80% training data
random_state=42    Reproducible split
shuffle=True       Shuffle before splitting
```

## 7. Stratified Split

For classification, preserve the class proportions:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

This is especially useful when classes are imbalanced.

## 8. Built-in Datasets

```python
from sklearn.datasets import (
    load_iris,
    load_diabetes,
    load_breast_cancer,
    load_wine
)
```

Classification dataset:

```python
data = load_iris(as_frame=True)

X = data.data
y = data.target
```

Regression dataset:

```python
data = load_diabetes(as_frame=True)

X = data.data
y = data.target
```

Inspect the dataset:

```python
print(data.DESCR)
print(data.feature_names)
print(data.target_names)
```

## 9. Generate Synthetic Classification Data

```python
from sklearn.datasets import make_classification

X, y = make_classification(
    n_samples=1000,
    n_features=10,
    n_informative=6,
    n_redundant=2,
    n_classes=2,
    random_state=42
)
```

## 10. Generate Synthetic Regression Data

```python
from sklearn.datasets import make_regression

X, y = make_regression(
    n_samples=1000,
    n_features=10,
    noise=10,
    random_state=42
)
```

## 11. Dummy Baseline Models

Always compare a model against a simple baseline.

Classification:

```python
from sklearn.dummy import DummyClassifier

baseline = DummyClassifier(
    strategy="most_frequent"
)

baseline.fit(X_train, y_train)

print(baseline.score(X_test, y_test))
```

Regression:

```python
from sklearn.dummy import DummyRegressor

baseline = DummyRegressor(
    strategy="mean"
)

baseline.fit(X_train, y_train)

print(baseline.score(X_test, y_test))
```

## 12. Standardization

Standardization converts a feature to approximately:

```text
Mean = 0
Standard deviation = 1
```

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Formula:

```text
z = (x - mean) / standard_deviation
```

Fit only on training data.

```python
scaler.fit(X_train)
```

Use the learned statistics on testing data:

```python
scaler.transform(X_test)
```

## 13. Min-Max Scaling

Scale values to a fixed range, normally `[0, 1]`:

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Custom range:

```python
scaler = MinMaxScaler(
    feature_range=(-1, 1)
)
```

## 14. Robust Scaling

Useful when data contains outliers:

```python
from sklearn.preprocessing import RobustScaler

scaler = RobustScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

`RobustScaler` uses the median and interquartile range.

## 15. Normalizing Rows

Scale each sample to unit length:

```python
from sklearn.preprocessing import Normalizer

normalizer = Normalizer(
    norm="l2"
)

X_normalized = normalizer.fit_transform(X)
```

Common norms:

```text
norm="l1"
norm="l2"
norm="max"
```

Difference:

```text
StandardScaler: scales columns/features
Normalizer: scales individual rows/samples
```

## 16. One-Hot Encoding

Convert categorical values into binary columns:

```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(
    handle_unknown="ignore",
    sparse_output=False
)

encoded = encoder.fit_transform(
    df[["city"]]
)
```

Get generated column names:

```python
column_names = encoder.get_feature_names_out(
    ["city"]
)
```

Create a DataFrame:

```python
encoded_df = pd.DataFrame(
    encoded,
    columns=column_names,
    index=df.index
)
```

## 17. Ordinal Encoding

Use when categories have an order:

```python
from sklearn.preprocessing import OrdinalEncoder

encoder = OrdinalEncoder(
    categories=[
        ["low", "medium", "high"]
    ]
)

df[["priority_encoded"]] = encoder.fit_transform(
    df[["priority"]]
)
```

Handle unknown categories:

```python
encoder = OrdinalEncoder(
    handle_unknown="use_encoded_value",
    unknown_value=-1
)
```

## 18. Label Encoding

Use `LabelEncoder` for the target variable, not regular input columns:

```python
from sklearn.preprocessing import LabelEncoder

encoder = LabelEncoder()

y_encoded = encoder.fit_transform(y)
```

Convert predictions back:

```python
original_labels = encoder.inverse_transform(
    y_encoded
)
```

View classes:

```python
print(encoder.classes_)
```

## 19. Missing-Value Imputation

Numerical columns:

```python
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(
    strategy="median"
)

X_train_filled = imputer.fit_transform(X_train)
X_test_filled = imputer.transform(X_test)
```

Common strategies:

```text
strategy="mean"
strategy="median"
strategy="most_frequent"
strategy="constant"
```

For categorical data:

```python
imputer = SimpleImputer(
    strategy="most_frequent"
)
```

Fill with a custom value:

```python
imputer = SimpleImputer(
    strategy="constant",
    fill_value="unknown"
)
```

## 20. Add Missing-Value Indicators

```python
imputer = SimpleImputer(
    strategy="median",
    add_indicator=True
)
```

This creates additional columns indicating whether the original value was missing.

## 21. KNN Imputation

Fill missing values using neighbouring samples:

```python
from sklearn.impute import KNNImputer

imputer = KNNImputer(
    n_neighbors=5
)

X_filled = imputer.fit_transform(X)
```

## 22. Polynomial Features

Generate interaction and polynomial features:

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(
    degree=2,
    include_bias=False
)

X_poly = poly.fit_transform(X)
```

For input features `x1` and `x2`, degree 2 can generate:

```text
x1
x2
x1²
x1 × x2
x2²
```

Get names:

```python
poly.get_feature_names_out()
```

## 23. Custom Transformation

```python
from sklearn.preprocessing import FunctionTransformer

log_transformer = FunctionTransformer(
    np.log1p,
    feature_names_out="one-to-one"
)

X_log = log_transformer.fit_transform(X)
```

## 24. Pipeline

A pipeline applies preprocessing and modeling steps in sequence:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    (
        "model",
        LogisticRegression(max_iter=1000)
    )
])

pipeline.fit(X_train, y_train)

y_pred = pipeline.predict(X_test)
```

A pipeline applies transformations consistently during training, testing and prediction. It is also designed to work directly with cross-validation and hyperparameter search. ([Scikit-learn][2])

## 25. Create a Pipeline with `make_pipeline`

```python
from sklearn.pipeline import make_pipeline

pipeline = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000)
)

pipeline.fit(X_train, y_train)
```

Difference:

```text
Pipeline:
You provide step names.

make_pipeline:
Step names are generated automatically.
```

## 26. Access Pipeline Steps

```python
pipeline.named_steps
```

Access one step:

```python
model = pipeline.named_steps["model"]
```

Access model coefficients:

```python
pipeline.named_steps["model"].coef_
```

## 27. Column Transformer

Apply different transformations to different columns:

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder
)

numeric_columns = [
    "age",
    "salary"
]

categorical_columns = [
    "city",
    "department"
]

preprocessor = ColumnTransformer([
    (
        "numeric",
        StandardScaler(),
        numeric_columns
    ),
    (
        "categorical",
        OneHotEncoder(
            handle_unknown="ignore"
        ),
        categorical_columns
    )
])
```

`ColumnTransformer` transforms column subsets separately and combines the generated features into one feature matrix. ([Scikit-learn][3])

## 28. Complete Mixed-Data Pipeline

```python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder
)
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

numeric_columns = [
    "age",
    "income"
]

categorical_columns = [
    "city",
    "job"
]

numeric_pipeline = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="median")
    ),
    (
        "scaler",
        StandardScaler()
    )
])

categorical_pipeline = Pipeline([
    (
        "imputer",
        SimpleImputer(
            strategy="most_frequent"
        )
    ),
    (
        "encoder",
        OneHotEncoder(
            handle_unknown="ignore"
        )
    )
])

preprocessor = ColumnTransformer([
    (
        "numeric",
        numeric_pipeline,
        numeric_columns
    ),
    (
        "categorical",
        categorical_pipeline,
        categorical_columns
    )
])

model = Pipeline([
    (
        "preprocessor",
        preprocessor
    ),
    (
        "classifier",
        LogisticRegression(max_iter=1000)
    )
])

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
```

## 29. Pipeline Parameter Names

Pipeline parameters use:

```text
step_name__parameter_name
```

Example:

```python
pipeline.set_params(
    model__C=0.1
)
```

For a nested pipeline:

```python
model.set_params(
    preprocessor__numeric__imputer__strategy="mean",
    classifier__C=0.1
)
```

## 30. Return Pandas DataFrames from Transformers

Global configuration:

```python
from sklearn import set_config

set_config(
    transform_output="pandas"
)
```

For one transformer:

```python
scaler = StandardScaler().set_output(
    transform="pandas"
)

X_scaled = scaler.fit_transform(X)
```

Return to default behavior:

```python
set_config(
    transform_output="default"
)
```

## 31. Linear Regression

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
```

Parameters learned by the model:

```python
print(model.coef_)
print(model.intercept_)
```

## 32. Ridge Regression

Linear regression with L2 regularization:

```python
from sklearn.linear_model import Ridge

model = Ridge(
    alpha=1.0
)

model.fit(X_train, y_train)
```

Higher `alpha` means stronger regularization.

## 33. Lasso Regression

Linear regression with L1 regularization:

```python
from sklearn.linear_model import Lasso

model = Lasso(
    alpha=0.1
)

model.fit(X_train, y_train)
```

Lasso can make some feature coefficients exactly zero.

## 34. Elastic Net

Combination of L1 and L2 regularization:

```python
from sklearn.linear_model import ElasticNet

model = ElasticNet(
    alpha=0.1,
    l1_ratio=0.5,
    random_state=42
)

model.fit(X_train, y_train)
```

```text
l1_ratio=1   Lasso-like
l1_ratio=0   Ridge-like
```

## 35. Logistic Regression

Despite its name, logistic regression is used for classification:

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(
    max_iter=1000,
    random_state=42
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
```

Predicted probabilities:

```python
probabilities = model.predict_proba(
    X_test
)
```

Positive-class probabilities:

```python
positive_probability = model.predict_proba(
    X_test
)[:, 1]
```

## 36. K-Nearest Neighbours

Classification:

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(
    n_neighbors=5
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.neighbors import KNeighborsRegressor

model = KNeighborsRegressor(
    n_neighbors=5
)
```

KNN is sensitive to feature scale, so scaling is usually important.

## 37. Support Vector Machine

Classification:

```python
from sklearn.svm import SVC

model = SVC(
    kernel="rbf",
    C=1.0,
    gamma="scale"
)

model.fit(X_train, y_train)
```

Enable probabilities:

```python
model = SVC(
    probability=True,
    random_state=42
)
```

Common kernels:

```text
kernel="linear"
kernel="poly"
kernel="rbf"
kernel="sigmoid"
```

Regression:

```python
from sklearn.svm import SVR

model = SVR(
    kernel="rbf",
    C=1.0
)
```

## 38. Decision Tree

Classification:

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(
    max_depth=5,
    min_samples_split=2,
    random_state=42
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.tree import DecisionTreeRegressor

model = DecisionTreeRegressor(
    max_depth=5,
    random_state=42
)
```

Important parameters:

```text
max_depth
min_samples_split
min_samples_leaf
max_features
criterion
```

## 39. Visualize a Decision Tree

```python
import matplotlib.pyplot as plt

from sklearn.tree import plot_tree

plt.figure(figsize=(16, 8))

plot_tree(
    model,
    feature_names=X.columns,
    class_names=True,
    filled=True
)

plt.show()
```

## 40. Random Forest

Classification:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)
```

A random forest combines predictions from multiple decision trees. ([Scikit-learn][4])

## 41. Extra Trees

```python
from sklearn.ensemble import ExtraTreesClassifier

model = ExtraTreesClassifier(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.ensemble import ExtraTreesRegressor

model = ExtraTreesRegressor(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)
```

## 42. Gradient Boosting

Classification:

```python
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.ensemble import GradientBoostingRegressor

model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    random_state=42
)
```

## 43. Histogram Gradient Boosting

Efficient boosting for medium and large datasets:

```python
from sklearn.ensemble import HistGradientBoostingClassifier

model = HistGradientBoostingClassifier(
    learning_rate=0.1,
    max_iter=200,
    random_state=42
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.ensemble import HistGradientBoostingRegressor

model = HistGradientBoostingRegressor(
    learning_rate=0.1,
    max_iter=200,
    random_state=42
)
```

## 44. AdaBoost

```python
from sklearn.ensemble import AdaBoostClassifier

model = AdaBoostClassifier(
    n_estimators=100,
    learning_rate=0.1,
    random_state=42
)

model.fit(X_train, y_train)
```

Regression:

```python
from sklearn.ensemble import AdaBoostRegressor

model = AdaBoostRegressor(
    n_estimators=100,
    random_state=42
)
```

## 45. Naive Bayes

Gaussian Naive Bayes:

```python
from sklearn.naive_bayes import GaussianNB

model = GaussianNB()

model.fit(X_train, y_train)
```

For count-based features such as word counts:

```python
from sklearn.naive_bayes import MultinomialNB

model = MultinomialNB()
```

For binary features:

```python
from sklearn.naive_bayes import BernoulliNB

model = BernoulliNB()
```

## 46. Voting Classifier

Combine predictions from several models:

```python
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

voting_model = VotingClassifier(
    estimators=[
        (
            "logistic",
            LogisticRegression(max_iter=1000)
        ),
        (
            "forest",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42
            )
        ),
        (
            "svm",
            SVC(probability=True)
        )
    ],
    voting="soft"
)

voting_model.fit(X_train, y_train)
```

```text
voting="hard"   Vote using predicted classes
voting="soft"   Average predicted probabilities
```

## 47. Stacking Classifier

```python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

stacking_model = StackingClassifier(
    estimators=[
        (
            "forest",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42
            )
        ),
        (
            "svm",
            SVC(probability=True)
        )
    ],
    final_estimator=LogisticRegression(
        max_iter=1000
    ),
    cv=5
)

stacking_model.fit(X_train, y_train)
```

## 48. Classification Accuracy

```python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(
    y_test,
    y_pred
)

print(accuracy)
```

Accuracy:

```text
Correct predictions / Total predictions
```

Accuracy can be misleading for highly imbalanced datasets.

## 49. Precision, Recall and F1 Score

```python
from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score
)

precision = precision_score(
    y_test,
    y_pred
)

recall = recall_score(
    y_test,
    y_pred
)

f1 = f1_score(
    y_test,
    y_pred
)
```

```text
Precision:
Out of predicted positives, how many were correct?

Recall:
Out of actual positives, how many were found?

F1:
Harmonic mean of precision and recall.
```

For multiclass classification:

```python
f1 = f1_score(
    y_test,
    y_pred,
    average="weighted"
)
```

Common averages:

```text
average="binary"
average="micro"
average="macro"
average="weighted"
```

## 50. Classification Report

```python
from sklearn.metrics import classification_report

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)
```

The report includes precision, recall, F1 score and support. ([Scikit-learn][5])

Get results as a dictionary:

```python
report = classification_report(
    y_test,
    y_pred,
    output_dict=True,
    zero_division=0
)

report_df = pd.DataFrame(
    report
).transpose()
```

## 51. Confusion Matrix

```python
from sklearn.metrics import confusion_matrix

matrix = confusion_matrix(
    y_test,
    y_pred
)

print(matrix)
```

For binary classification:

```text
[[True Negative,  False Positive],
 [False Negative, True Positive ]]
```

Display it:

```python
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_pred
)
```

## 52. ROC-AUC Score

```python
from sklearn.metrics import roc_auc_score

y_probability = model.predict_proba(
    X_test
)[:, 1]

auc = roc_auc_score(
    y_test,
    y_probability
)

print(auc)
```

Plot the ROC curve:

```python
from sklearn.metrics import RocCurveDisplay

RocCurveDisplay.from_estimator(
    model,
    X_test,
    y_test
)
```

## 53. Precision-Recall Curve

```python
from sklearn.metrics import PrecisionRecallDisplay

PrecisionRecallDisplay.from_estimator(
    model,
    X_test,
    y_test
)
```

Precision-recall curves are especially useful with imbalanced classes.

## 54. Log Loss

```python
from sklearn.metrics import log_loss

probabilities = model.predict_proba(
    X_test
)

loss = log_loss(
    y_test,
    probabilities
)
```

Lower log loss is better.

## 55. Regression Metrics

Mean absolute error:

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(
    y_test,
    y_pred
)
```

Mean squared error:

```python
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(
    y_test,
    y_pred
)
```

Root mean squared error:

```python
from sklearn.metrics import root_mean_squared_error

rmse = root_mean_squared_error(
    y_test,
    y_pred
)
```

R² score:

```python
from sklearn.metrics import r2_score

r2 = r2_score(
    y_test,
    y_pred
)
```

```text
MAE:
Average absolute prediction error.

MSE:
Average squared prediction error.

RMSE:
Square root of MSE.

R²:
Proportion of variance explained by the model.
```

## 56. Prediction Error Display

```python
from sklearn.metrics import PredictionErrorDisplay

PredictionErrorDisplay.from_predictions(
    y_test,
    y_pred,
    kind="actual_vs_predicted"
)
```

Residual plot:

```python
PredictionErrorDisplay.from_predictions(
    y_test,
    y_pred,
    kind="residual_vs_predicted"
)
```

## 57. Cross-Validation

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="accuracy"
)

print(scores)
print(scores.mean())
print(scores.std())
```

For regression:

```python
scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="neg_root_mean_squared_error"
)

rmse_scores = -scores
```

By default, cross-validation uses five folds when `cv=None`. ([Scikit-learn][6])

## 58. Evaluate Multiple Metrics

```python
from sklearn.model_selection import cross_validate

results = cross_validate(
    model,
    X,
    y,
    cv=5,
    scoring=[
        "accuracy",
        "precision",
        "recall",
        "f1"
    ],
    return_train_score=True,
    n_jobs=-1
)

print(results.keys())
```

Common returned values:

```text
fit_time
score_time
test_accuracy
test_precision
test_recall
test_f1
train_accuracy
```

`cross_validate()` supports multiple metrics and records fitting and scoring times. ([Scikit-learn][7])

## 59. K-Fold Cross-Validation

```python
from sklearn.model_selection import KFold

cv = KFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=cv
)
```

## 60. Stratified K-Fold

Use for classification:

```python
from sklearn.model_selection import StratifiedKFold

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=cv,
    scoring="f1_weighted"
)
```

Each fold approximately preserves class proportions.

## 61. Group K-Fold

Prevent samples from the same group appearing in both training and validation sets:

```python
from sklearn.model_selection import GroupKFold

cv = GroupKFold(
    n_splits=5
)

scores = cross_val_score(
    model,
    X,
    y,
    groups=groups,
    cv=cv
)
```

Examples of groups:

```text
Patient ID
Customer ID
Device ID
Location ID
```

## 62. Time-Series Split

```python
from sklearn.model_selection import TimeSeriesSplit

cv = TimeSeriesSplit(
    n_splits=5
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=cv
)
```

Do not randomly shuffle time-series observations.

## 63. Cross-Validated Predictions

```python
from sklearn.model_selection import cross_val_predict

y_cv_pred = cross_val_predict(
    model,
    X,
    y,
    cv=5
)
```

Cross-validated probabilities:

```python
y_cv_probability = cross_val_predict(
    model,
    X,
    y,
    cv=5,
    method="predict_proba"
)
```

## 64. Grid Search

Exhaustively test parameter combinations:

```python
from sklearn.model_selection import GridSearchCV

parameter_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [None, 5, 10],
    "min_samples_split": [2, 5]
}

search = GridSearchCV(
    estimator=RandomForestClassifier(
        random_state=42
    ),
    param_grid=parameter_grid,
    scoring="accuracy",
    cv=5,
    n_jobs=-1
)

search.fit(X_train, y_train)
```

Best results:

```python
print(search.best_params_)
print(search.best_score_)

best_model = search.best_estimator_
```

Complete results:

```python
results = pd.DataFrame(
    search.cv_results_
)
```

`GridSearchCV` performs an exhaustive search over the specified parameter values. ([Scikit-learn][8])

## 65. Grid Search with a Pipeline

```python
pipeline = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),
    (
        "model",
        LogisticRegression(max_iter=1000)
    )
])

parameter_grid = {
    "scaler": [
        StandardScaler(),
        MinMaxScaler()
    ],
    "model__C": [
        0.01,
        0.1,
        1,
        10
    ],
    "model__penalty": [
        "l2"
    ]
}

search = GridSearchCV(
    pipeline,
    parameter_grid,
    cv=5,
    scoring="f1",
    n_jobs=-1
)

search.fit(X_train, y_train)
```

## 66. Randomized Search

Test a fixed number of randomly selected combinations:

```python
from sklearn.model_selection import RandomizedSearchCV

parameter_distributions = {
    "n_estimators": [
        100,
        200,
        300,
        500
    ],
    "max_depth": [
        None,
        5,
        10,
        20
    ],
    "min_samples_split": [
        2,
        5,
        10
    ],
    "max_features": [
        "sqrt",
        "log2",
        None
    ]
}

search = RandomizedSearchCV(
    estimator=RandomForestClassifier(
        random_state=42
    ),
    param_distributions=parameter_distributions,
    n_iter=20,
    scoring="accuracy",
    cv=5,
    random_state=42,
    n_jobs=-1
)

search.fit(X_train, y_train)
```

`RandomizedSearchCV` samples parameter settings rather than testing every possible combination. ([Scikit-learn][9])

## 67. Common Scoring Names

Classification:

```text
"accuracy"
"balanced_accuracy"
"precision"
"recall"
"f1"
"f1_macro"
"f1_weighted"
"roc_auc"
"neg_log_loss"
```

Regression:

```text
"r2"
"neg_mean_absolute_error"
"neg_mean_squared_error"
"neg_root_mean_squared_error"
```

View available scorers:

```python
from sklearn.metrics import get_scorer_names

print(get_scorer_names())
```

Scikit-learn scoring functions are designed so higher scores are considered better.

Therefore, loss metrics are often returned as negative values:

```text
neg_mean_squared_error
neg_mean_absolute_error
neg_log_loss
```

## 68. Create a Custom Scorer

```python
from sklearn.metrics import make_scorer
from sklearn.metrics import fbeta_score

custom_scorer = make_scorer(
    fbeta_score,
    beta=2
)

scores = cross_val_score(
    model,
    X,
    y,
    scoring=custom_scorer,
    cv=5
)
```

For a loss where lower is better:

```python
custom_scorer = make_scorer(
    custom_loss_function,
    greater_is_better=False
)
```

## 69. K-Means Clustering

```python
from sklearn.cluster import KMeans

model = KMeans(
    n_clusters=3,
    n_init="auto",
    random_state=42
)

labels = model.fit_predict(X)
```

Cluster centres:

```python
print(model.cluster_centers_)
```

Inertia:

```python
print(model.inertia_)
```

Predict the cluster for new data:

```python
new_labels = model.predict(
    X_new
)
```

## 70. DBSCAN Clustering

```python
from sklearn.cluster import DBSCAN

model = DBSCAN(
    eps=0.5,
    min_samples=5
)

labels = model.fit_predict(X)
```

Important parameters:

```text
eps:
Maximum neighbourhood distance.

min_samples:
Minimum points needed to form a dense region.
```

Noise points receive the label:

```text
-1
```

## 71. Hierarchical Clustering

```python
from sklearn.cluster import AgglomerativeClustering

model = AgglomerativeClustering(
    n_clusters=3,
    linkage="ward"
)

labels = model.fit_predict(X)
```

Common linkage methods:

```text
"ward"
"complete"
"average"
"single"
```

## 72. Clustering Evaluation

Silhouette score:

```python
from sklearn.metrics import silhouette_score

score = silhouette_score(
    X,
    labels
)

print(score)
```

The silhouette score is generally between `-1` and `1`.

When true labels are available:

```python
from sklearn.metrics import (
    adjusted_rand_score,
    normalized_mutual_info_score
)

ari = adjusted_rand_score(
    true_labels,
    cluster_labels
)

nmi = normalized_mutual_info_score(
    true_labels,
    cluster_labels
)
```

## 73. Principal Component Analysis

Reduce the number of features:

```python
from sklearn.decomposition import PCA

pca = PCA(
    n_components=2
)

X_reduced = pca.fit_transform(X)
```

Explained variance:

```python
print(
    pca.explained_variance_ratio_
)
```

Keep enough components to explain 95% of variance:

```python
pca = PCA(
    n_components=0.95
)
```

PCA is normally used after scaling:

```python
pipeline = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),
    (
        "pca",
        PCA(n_components=0.95)
    ),
    (
        "model",
        LogisticRegression(max_iter=1000)
    )
])
```

## 74. Univariate Feature Selection

Classification:

```python
from sklearn.feature_selection import (
    SelectKBest,
    f_classif
)

selector = SelectKBest(
    score_func=f_classif,
    k=5
)

X_selected = selector.fit_transform(
    X,
    y
)
```

Regression:

```python
from sklearn.feature_selection import (
    SelectKBest,
    f_regression
)

selector = SelectKBest(
    score_func=f_regression,
    k=5
)
```

Get selected features:

```python
selected_columns = X.columns[
    selector.get_support()
]
```

## 75. Chi-Square Feature Selection

```python
from sklearn.feature_selection import chi2

selector = SelectKBest(
    score_func=chi2,
    k=5
)

X_selected = selector.fit_transform(
    X,
    y
)
```

`chi2` requires non-negative feature values.

## 76. Mutual Information

Classification:

```python
from sklearn.feature_selection import mutual_info_classif

scores = mutual_info_classif(
    X,
    y,
    random_state=42
)
```

Regression:

```python
from sklearn.feature_selection import mutual_info_regression

scores = mutual_info_regression(
    X,
    y,
    random_state=42
)
```

## 77. Recursive Feature Elimination

```python
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression

selector = RFE(
    estimator=LogisticRegression(
        max_iter=1000
    ),
    n_features_to_select=5
)

X_selected = selector.fit_transform(
    X,
    y
)
```

Selected features:

```python
selected_features = X.columns[
    selector.support_
]
```

Feature rankings:

```python
print(selector.ranking_)
```

## 78. Variance Threshold

Remove nearly constant features:

```python
from sklearn.feature_selection import VarianceThreshold

selector = VarianceThreshold(
    threshold=0.01
)

X_selected = selector.fit_transform(X)
```

## 79. Model Feature Importance

Tree-based models:

```python
importance = model.feature_importances_

importance_df = pd.DataFrame({
    "feature": X.columns,
    "importance": importance
}).sort_values(
    "importance",
    ascending=False
)
```

Linear model coefficients:

```python
coefficients = model.coef_
```

Binary classification:

```python
coefficient_df = pd.DataFrame({
    "feature": X.columns,
    "coefficient": model.coef_[0]
})
```

## 80. Permutation Importance

Model-independent feature importance:

```python
from sklearn.inspection import permutation_importance

result = permutation_importance(
    model,
    X_test,
    y_test,
    n_repeats=10,
    random_state=42,
    n_jobs=-1
)

importance_df = pd.DataFrame({
    "feature": X.columns,
    "importance": result.importances_mean,
    "std": result.importances_std
}).sort_values(
    "importance",
    ascending=False
)
```

## 81. Partial Dependence Plot

```python
from sklearn.inspection import PartialDependenceDisplay

PartialDependenceDisplay.from_estimator(
    model,
    X_train,
    features=[
        "age",
        "income"
    ]
)
```

Partial dependence shows the average relationship between selected features and model predictions.

## 82. Class Imbalance

Use stratification:

```python
train_test_split(
    X,
    y,
    stratify=y,
    random_state=42
)
```

Use class weights when supported:

```python
model = LogisticRegression(
    class_weight="balanced",
    max_iter=1000
)
```

Random forest:

```python
model = RandomForestClassifier(
    class_weight="balanced",
    random_state=42
)
```

Use suitable metrics:

```text
Precision
Recall
F1 score
Balanced accuracy
ROC-AUC
PR-AUC
```

Balanced accuracy:

```python
from sklearn.metrics import balanced_accuracy_score

score = balanced_accuracy_score(
    y_test,
    y_pred
)
```

## 83. Predicted Classes vs Probabilities

Predicted classes:

```python
y_pred = model.predict(
    X_test
)
```

Predicted probabilities:

```python
y_probability = model.predict_proba(
    X_test
)
```

Decision scores:

```python
scores = model.decision_function(
    X_test
)
```

Not every estimator implements both `predict_proba()` and `decision_function()`.

## 84. Custom Classification Threshold

Default binary threshold:

```python
y_pred = (
    model.predict_proba(X_test)[:, 1]
    >= 0.5
).astype(int)
```

Custom threshold:

```python
threshold = 0.3

y_pred_custom = (
    model.predict_proba(X_test)[:, 1]
    >= threshold
).astype(int)
```

Lowering the threshold usually increases recall and decreases precision.

## 85. Probability Calibration

```python
from sklearn.calibration import CalibratedClassifierCV

base_model = SVC()

calibrated_model = CalibratedClassifierCV(
    estimator=base_model,
    method="sigmoid",
    cv=5
)

calibrated_model.fit(
    X_train,
    y_train
)
```

Common methods:

```text
method="sigmoid"
method="isotonic"
```

Calibration curve:

```python
from sklearn.calibration import CalibrationDisplay

CalibrationDisplay.from_estimator(
    calibrated_model,
    X_test,
    y_test
)
```

## 86. Text Vectorization

Count words:

```python
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(
    stop_words="english"
)

X_counts = vectorizer.fit_transform(
    documents
)
```

View generated words:

```python
print(
    vectorizer.get_feature_names_out()
)
```

## 87. TF-IDF Vectorization

```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=5000,
    ngram_range=(1, 2)
)

X_tfidf = vectorizer.fit_transform(
    documents
)
```

```text
ngram_range=(1, 1)   Single words
ngram_range=(1, 2)   Single words and two-word phrases
ngram_range=(2, 2)   Two-word phrases only
```

## 88. Text Classification Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

text_model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2)
        )
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000
        )
    )
])

text_model.fit(
    X_train_text,
    y_train
)

predictions = text_model.predict(
    X_test_text
)
```

## 89. Multi-Label Classification

```python
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression

model = OneVsRestClassifier(
    LogisticRegression(
        max_iter=1000
    )
)

model.fit(X_train, y_train)
```

Convert label lists to a binary matrix:

```python
from sklearn.preprocessing import MultiLabelBinarizer

encoder = MultiLabelBinarizer()

y_binary = encoder.fit_transform(
    label_lists
)
```

## 90. Multi-Output Regression

```python
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor

model = MultiOutputRegressor(
    RandomForestRegressor(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    )
)

model.fit(X_train, y_train)
```

## 91. Learning Curve

```python
from sklearn.model_selection import learning_curve

train_sizes, train_scores, validation_scores = learning_curve(
    model,
    X,
    y,
    cv=5,
    scoring="accuracy",
    train_sizes=np.linspace(0.1, 1.0, 5),
    n_jobs=-1
)
```

Calculate means:

```python
train_mean = train_scores.mean(axis=1)
validation_mean = validation_scores.mean(axis=1)
```

Learning curves help identify:

```text
Underfitting
Overfitting
Whether more data may help
```

## 92. Validation Curve

```python
from sklearn.model_selection import validation_curve

parameter_range = [
    1,
    3,
    5,
    7,
    10
]

train_scores, validation_scores = validation_curve(
    DecisionTreeClassifier(
        random_state=42
    ),
    X,
    y,
    param_name="max_depth",
    param_range=parameter_range,
    cv=5,
    scoring="accuracy",
    n_jobs=-1
)
```

## 93. Save a Model

```bash
pip install joblib
```

```python
import joblib

joblib.dump(
    model,
    "model.joblib"
)
```

Save a complete pipeline rather than only the final estimator:

```python
joblib.dump(
    pipeline,
    "pipeline.joblib"
)
```

## 94. Load a Model

```python
import joblib

model = joblib.load(
    "model.joblib"
)

predictions = model.predict(
    new_data
)
```

Only load model files from trusted sources.

## 95. Reproducibility

Use a fixed random state:

```python
model = RandomForestClassifier(
    random_state=42
)
```

Use the same value for splitting:

```python
train_test_split(
    X,
    y,
    random_state=42
)
```

Common convention:

```python
RANDOM_STATE = 42
```

Then reuse it:

```python
model = RandomForestClassifier(
    random_state=RANDOM_STATE
)
```

## 96. Parallel Processing

Use all CPU cores when supported:

```python
model = RandomForestClassifier(
    n_estimators=500,
    n_jobs=-1,
    random_state=42
)
```

Cross-validation:

```python
scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    n_jobs=-1
)
```

Hyperparameter search:

```python
search = GridSearchCV(
    model,
    parameter_grid,
    cv=5,
    n_jobs=-1
)
```

```text
n_jobs=None   Default single-process behaviour
n_jobs=1      One worker
n_jobs=-1     Use all available CPU cores
```

## 97. Prevent Data Leakage

Incorrect:

```python
scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y
)
```

This allows information from the testing data to influence preprocessing.

Better:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    random_state=42
)

scaler.fit(X_train)

X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Best:

```python
pipeline = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),
    (
        "model",
        LogisticRegression(max_iter=1000)
    )
])

pipeline.fit(
    X_train,
    y_train
)
```

Scikit-learn recommends pipelines as a way to avoid inconsistent preprocessing and preprocessing leakage. ([Scikit-learn][10])

## 98. Complete Classification Example

```python
import pandas as pd

from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)

# Load data
data = load_breast_cancer(
    as_frame=True
)

X = data.data
y = data.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# Create pipeline
model = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000,
            random_state=42
        )
    )
])

# Train
model.fit(
    X_train,
    y_train
)

# Predict
y_pred = model.predict(
    X_test
)

y_probability = model.predict_proba(
    X_test
)[:, 1]

# Evaluate
print(
    "Accuracy:",
    accuracy_score(y_test, y_pred)
)

print(
    "ROC-AUC:",
    roc_auc_score(
        y_test,
        y_probability
    )
)

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)

print(
    classification_report(
        y_test,
        y_pred,
        target_names=data.target_names,
        zero_division=0
    )
)
```

## 99. Complete Regression Example

```python
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.metrics import (
    mean_absolute_error,
    root_mean_squared_error,
    r2_score
)

# Load data
data = load_diabetes(
    as_frame=True
)

X = data.data
y = data.target

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create pipeline
model = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),
    (
        "regressor",
        Ridge(alpha=1.0)
    )
])

# Train
model.fit(
    X_train,
    y_train
)

# Predict
y_pred = model.predict(
    X_test
)

# Evaluate
print(
    "MAE:",
    mean_absolute_error(
        y_test,
        y_pred
    )
)

print(
    "RMSE:",
    root_mean_squared_error(
        y_test,
        y_pred
    )
)

print(
    "R²:",
    r2_score(
        y_test,
        y_pred
    )
)
```

## 100. Complete Mixed-Data Example

```python
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder
)
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

X = df.drop(columns="target")
y = df["target"]

numeric_columns = X.select_dtypes(
    include="number"
).columns

categorical_columns = X.select_dtypes(
    exclude="number"
).columns

numeric_pipeline = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="median")
    ),
    (
        "scaler",
        StandardScaler()
    )
])

categorical_pipeline = Pipeline([
    (
        "imputer",
        SimpleImputer(
            strategy="most_frequent"
        )
    ),
    (
        "encoder",
        OneHotEncoder(
            handle_unknown="ignore"
        )
    )
])

preprocessor = ColumnTransformer([
    (
        "numeric",
        numeric_pipeline,
        numeric_columns
    ),
    (
        "categorical",
        categorical_pipeline,
        categorical_columns
    )
])

model = Pipeline([
    (
        "preprocessor",
        preprocessor
    ),
    (
        "classifier",
        RandomForestClassifier(
            n_estimators=200,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1
        )
    )
])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

model.fit(
    X_train,
    y_train
)

y_pred = model.predict(
    X_test
)

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)
```

## 101. Quick Estimator Selection

```text
Binary or multiclass classification:
LogisticRegression
RandomForestClassifier
HistGradientBoostingClassifier
SVC
KNeighborsClassifier

Regression:
LinearRegression
Ridge
RandomForestRegressor
HistGradientBoostingRegressor
SVR

Clustering:
KMeans
DBSCAN
AgglomerativeClustering

Dimensionality reduction:
PCA

Text classification:
TfidfVectorizer + LogisticRegression
TfidfVectorizer + MultinomialNB
```

Scikit-learn also provides an estimator-selection flowchart as a rough guide for choosing algorithms. ([Scikit-learn][11])

## 102. Important Differences

```python
model.fit(X, y)
```

Learns model parameters from data.

```python
model.predict(X)
```

Predicts outputs.

```python
model.predict_proba(X)
```

Predicts class probabilities.

```python
transformer.transform(X)
```

Applies a learned transformation.

```python
transformer.fit_transform(X)
```

Fits and transforms the same data.

```python
model.score(X, y)
```

Uses the estimator’s default metric.

For classifiers, this is commonly accuracy.

For regressors, this is commonly R².

```python
cross_val_score()
```

Evaluates one metric using cross-validation.

```python
cross_validate()
```

Evaluates one or more metrics and can return timing and training scores.

```python
GridSearchCV()
```

Tests every specified parameter combination.

```python
RandomizedSearchCV()
```

Tests randomly selected parameter combinations.

```python
StandardScaler()
```

Standardizes each feature.

```python
Normalizer()
```

Normalizes each individual sample.

```python
OneHotEncoder()
```

Encodes categorical input features.

```python
LabelEncoder()
```

Encodes target labels.

```python
Pipeline()
```

Chains preprocessing and modeling steps.

```python
ColumnTransformer()
```

Applies different preprocessing to different columns.

## 103. Frequently Used Pattern

```python
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

X = df.drop(columns="target")
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

model = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),
    (
        "classifier",
        RandomForestClassifier(
            n_estimators=200,
            random_state=42,
            n_jobs=-1
        )
    )
])

model.fit(
    X_train,
    y_train
)

y_pred = model.predict(
    X_test
)

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)
```

This covers the most frequently used scikit-learn operations for preprocessing, classification, regression, clustering, evaluation, pipelines and hyperparameter tuning.

[1]: https://scikit-learn.org/?utm_source=chatgpt.com
[2]: https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html?utm_source=chatgpt.com
[3]: https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html?utm_source=chatgpt.com
[4]: https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html?utm_source=chatgpt.com
[5]: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification_report.html?utm_source=chatgpt.com
[6]: https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_score.html?utm_source=chatgpt.com
[7]: https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_validate.html?utm_source=chatgpt.com
[8]: https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html?utm_source=chatgpt.com
[9]: https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html?utm_source=chatgpt.com
[10]: https://scikit-learn.org/stable/common_pitfalls.html?utm_source=chatgpt.com
[11]: https://scikit-learn.org/stable/machine_learning_map.html?utm_source=chatgpt.com
