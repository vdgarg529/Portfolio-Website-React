# Phase 1.4: Data Warehousing and Analytics Engineering

## Phase objective

This phase explains how raw operational data is transformed into governed, reliable, understandable, and efficient analytical data products.

The central progression is:

```text
Operational sources
        ↓
Raw warehouse data
        ↓
Staging models
        ↓
Intermediate transformations
        ↓
Business marts
        ↓
Semantic and serving layers
        ↓
Dashboards, analytics, applications and AI
```

By the end of this phase, you should understand:

* How a data warehouse differs from an operational database.
* How analytical data should be organized into layers.
* How dbt manages SQL transformations as software.
* How facts, dimensions, snapshots, tests, and incremental models work.
* How to design reusable metrics and semantic models.
* How analytical tables can support machine learning and AI systems.
* How data products are owned, monitored, documented, and governed.
* How materialization and workload decisions affect cost and performance.

The implementation/build section is intentionally omitted.

---

# 1. From operational data to analytical data

Operational systems are designed to execute business processes.

Examples include:

* Placing an order.
* Recording a payment.
* Updating a policy.
* Registering a customer.
* Booking an appointment.
* Recording a support ticket.

Analytical systems are designed to understand those processes.

Examples include:

* What was monthly revenue?
* Which customers are likely to churn?
* How many appointments were missed?
* Which product category is growing fastest?
* What is the average claim-processing time?
* Which operational problems require intervention?

A simplified flow is:

```text
Business transaction
        ↓
Operational database
        ↓
Ingestion and CDC
        ↓
Data warehouse
        ↓
Transformation and modelling
        ↓
Analytics and AI
```

The operational system records what happened. The analytical platform makes those events suitable for historical comparison, aggregation, decision-making, and automated consumption.

---

# 2. OLTP versus OLAP

## 2.1 OLTP

OLTP means Online Transaction Processing.

An OLTP database supports frequent, small business transactions such as:

```text
Create customer
Update order
Process payment
Cancel appointment
Change policy status
```

Typical characteristics:

* Large numbers of short transactions.
* Frequent inserts and updates.
* Low-latency point lookups.
* Strong transactional consistency.
* Highly normalized schemas.
* Current operational state.
* Queries usually affect relatively few rows.

Example:

```sql
SELECT order_status
FROM orders
WHERE order_id = 81721;
```

---

## 2.2 OLAP

OLAP means Online Analytical Processing.

An OLAP system supports large analytical queries such as:

```text
Calculate monthly revenue across all regions
Compare claim ratios over five years
Analyze customer behaviour by segment
Measure appointment completion trends
```

Typical characteristics:

* Large scans and aggregations.
* Historical data.
* Fewer writes but heavier reads.
* Denormalized or dimensional models.
* Column-oriented storage.
* Queries may process millions or billions of rows.

Example:

```sql
SELECT
    region,
    DATE_TRUNC('month', order_date) AS order_month,
    SUM(order_amount) AS revenue
FROM fact_orders
GROUP BY region, DATE_TRUNC('month', order_date);
```

---

## 2.3 Comparison

| Aspect          | OLTP                               | OLAP                                  |
| --------------- | ---------------------------------- | ------------------------------------- |
| Primary purpose | Run business operations            | Analyze business activity             |
| Typical query   | Find or update one record          | Aggregate many records                |
| Data scope      | Current state                      | Current and historical data           |
| Transactions    | Frequent and short                 | Less frequent, read-heavy             |
| Modelling       | Usually normalized                 | Often dimensional                     |
| Storage         | Commonly row-oriented              | Commonly column-oriented              |
| Users           | Applications and operational staff | Analysts, BI systems, data scientists |
| Optimization    | Fast writes and point lookups      | Fast scans and aggregations           |
| Example         | PostgreSQL order database          | Snowflake analytical warehouse        |

OLTP and OLAP are complementary. A warehouse should normally receive data from operational systems rather than replace them.

---

# 3. Operational databases versus data warehouses

An operational database is usually the authoritative source for an active business process.

A warehouse integrates data from several systems:

```text
CRM ─────────────┐
Billing system ──┤
Support system ──┼──→ Data warehouse
Application DB ──┤
External API ────┘
```

A warehouse provides:

* Integrated cross-system analysis.
* Historical retention.
* Standardized definitions.
* Large-scale analytical processing.
* Separation of analytics from operational workloads.
* Governed datasets for reporting, ML, and AI.

Running heavy analytical queries directly on an operational database can:

* Consume CPU and memory needed by the application.
* Hold locks or extend transactions.
* Create replica lag.
* Reduce user-facing performance.
* Produce inconsistent business definitions.
* Lose historical states overwritten by application updates.

The warehouse provides an analytical representation of the business without placing uncontrolled workloads on operational systems.

---

# 4. Row-oriented and column-oriented storage

## 4.1 Row-oriented storage

A row-oriented system stores the values of one record together.

Conceptually:

```text
Order 1: [order_id, customer_id, date, status, amount]
Order 2: [order_id, customer_id, date, status, amount]
```

This is efficient when an application needs most columns from a small number of rows.

Example:

```sql
SELECT *
FROM orders
WHERE order_id = 81721;
```

Suitable for:

* Transactional applications.
* Point lookups.
* Record creation.
* Small updates.
* Workloads that frequently access complete rows.

---

## 4.2 Column-oriented storage

A column-oriented system stores values from the same column together.

Conceptually:

```text
order_id:    [1, 2, 3, 4, ...]
customer_id: [A, B, A, C, ...]
amount:      [100, 80, 120, 60, ...]
```

This is efficient when a query reads only a few columns across many rows.

Example:

```sql
SELECT SUM(amount)
FROM fact_orders
WHERE order_date >= DATE '2026-01-01';
```

The query may need only `amount` and `order_date`, without reading customer addresses, descriptions, or other unrelated columns.

Benefits include:

* Column pruning.
* Better compression.
* Efficient vectorized execution.
* Faster aggregation.
* Reduced storage reads.

---

## 4.3 Why columns compress well

Values in one column usually have similar types and repeated patterns.

For example:

```text
status:
completed
completed
cancelled
completed
completed
```

This can be compressed more efficiently than storing different values from an entire row together.

Columnar storage is not automatically faster for every workload. Point updates and single-record lookups may remain better suited to row-oriented systems.

---

# 5. Enterprise data warehouse

An Enterprise Data Warehouse, or EDW, is a governed analytical system integrating data across the organization.

Its objectives include:

* Creating consistent enterprise definitions.
* Combining data from multiple domains.
* Preserving historical information.
* Supporting cross-functional analysis.
* Providing controlled analytical access.
* Reducing duplicated transformation logic.

Example:

```text
Sales data ───────┐
Customer data ────┤
Finance data ─────┼──→ Enterprise warehouse
Operations data ──┤
Support data ─────┘
```

A successful EDW should not become one enormous undocumented database. It still requires:

* Domain ownership.
* Layer boundaries.
* Clear modelling conventions.
* Discoverable datasets.
* Data contracts.
* Quality expectations.
* Access controls.

---

# 6. Data marts

A data mart is an analytical model designed for a particular subject area or consumer need.

Examples:

* Finance mart.
* Customer mart.
* Claims mart.
* Sales mart.
* Appointment operations mart.
* Executive KPI mart.

A mart may contain:

```text
dim_customer
dim_provider
dim_date
fact_appointment
fact_payment
fct_daily_operations
```

Good marts:

* Have a clearly defined business purpose.
* Use stable business terminology.
* Declare their grain.
* Contain tested measures and keys.
* Hide unnecessary source-system complexity.
* Are understandable to their intended consumers.

A mart is not simply a random collection of tables copied for one dashboard.

---

# 7. Warehouse transformation layers

A layered warehouse separates different transformation responsibilities.

```text
Raw sources
     ↓
Staging models
     ↓
Intermediate models
     ↓
Business marts
     ↓
Semantic and serving layers
```

Each layer should have a clear contract.

| Layer          | Primary responsibility                             |
| -------------- | -------------------------------------------------- |
| Raw            | Preserve source data                               |
| Staging        | Clean and standardize individual sources           |
| Intermediate   | Apply reusable business transformations            |
| Business marts | Represent governed business entities and processes |
| Semantic layer | Define reusable business measures                  |
| Serving layer  | Optimize data for a particular consumer            |

Layering improves:

* Debugging.
* Reusability.
* Lineage.
* Testing.
* Change isolation.
* Ownership.
* Consumer understanding.

Too many layers can create unnecessary complexity, so every layer should have a distinct purpose.

---

# 8. Raw source layer

The raw layer preserves data close to its ingested structure.

Typical characteristics:

* Source-aligned naming.
* Minimal transformation.
* Ingestion metadata.
* Restricted consumer access.
* Historical or append-only retention where appropriate.
* Support for replay and audit.

Example fields:

```text
source_system
source_record_id
source_updated_at
ingested_at
pipeline_run_id
payload
```

The raw layer is useful for:

* Reprocessing transformations.
* Investigating source problems.
* Reconciliation.
* Auditing.
* Recovering from transformation defects.

The raw layer should not usually be treated as a business-facing analytical model because its semantics, quality, and structure remain source-dependent.

---

# 9. Staging models

A staging model creates a clean analytical interface for one source relation.

Examples:

```text
raw.crm_customers       → stg_crm__customers
raw.app_orders          → stg_app__orders
raw.billing_payments    → stg_billing__payments
```

Typical staging responsibilities:

* Rename columns consistently.
* Cast data types.
* Standardize null values.
* Normalize basic codes.
* Convert timestamps.
* Remove technically invalid duplicates.
* Add source metadata.
* Perform light, source-specific derivations.

Example:

```sql
SELECT
    customer_id,
    TRIM(full_name) AS customer_name,
    LOWER(email) AS email,
    CAST(created_timestamp AS TIMESTAMP) AS created_at,
    CASE
        WHEN status IN ('A', 'ACTIVE') THEN 'active'
        WHEN status IN ('I', 'INACTIVE') THEN 'inactive'
        ELSE 'unknown'
    END AS customer_status
FROM raw.crm_customers;
```

Staging models should generally avoid:

* Complex multi-source joins.
* Dashboard-specific logic.
* Final business metrics.
* Consumer-specific aggregation.
* Unrelated business rules.

Their purpose is to make source data consistently usable.

---

# 10. Intermediate models

Intermediate models contain reusable transformations between staging and final marts.

Examples:

* Joining orders with payment status.
* Resolving customer identities.
* Calculating order-level totals.
* Sequencing lifecycle events.
* Preparing session boundaries.
* Deriving appointment outcomes.
* Applying reusable allocation logic.

Example flow:

```text
stg_orders ────────────┐
stg_order_items ───────┼──→ int_orders_enriched
stg_payments ──────────┘
```

An intermediate model may:

* Join multiple staging models.
* Deduplicate business entities.
* Pivot or unpivot records.
* Aggregate to an intermediate grain.
* Apply shared business rules.
* Prepare slowly changing dimensions.
* Resolve reusable mappings.

Intermediate models prevent the same complicated logic from being repeated across several marts.

However, creating an intermediate model for every small SQL expression produces unnecessary lineage depth. A model should generally exist when it provides meaningful reuse, clarity, testing, or performance value.

---

# 11. Business marts

Business marts expose trusted analytical representations.

Common categories include:

* Dimension models.
* Fact models.
* Aggregate models.
* Reporting models.
* Data-product outputs.

Example:

```text
dim_customer
dim_date
dim_provider
fact_appointment
fct_daily_care_operations
```

Business marts should define:

* Business purpose.
* Grain.
* Primary key.
* Relevant dimensions.
* Measures.
* Update cadence.
* Owner.
* Freshness expectation.
* Quality requirements.
* Known limitations.

A consumer should be able to use a mart without understanding every source-system detail behind it.

---

# 12. Facts, dimensions, and grain

## 12.1 Fact table

A fact table represents a measurable business event or process.

Examples:

* One row per order.
* One row per order item.
* One row per payment.
* One row per appointment.
* One row per sensor reading.

Fact tables commonly contain:

* Dimension keys.
* Event timestamps.
* Numeric measures.
* Status indicators.
* Degenerate identifiers.

---

## 12.2 Dimension table

A dimension describes the context surrounding facts.

Examples:

* Customer.
* Product.
* Provider.
* Date.
* Region.
* Policy.

Dimension attributes support filtering, grouping, and interpretation.

---

## 12.3 Grain

Grain defines exactly what one row represents.

Examples:

```text
fact_order:
One row per completed customer order.

fact_order_item:
One row per product line within an order.

fact_daily_inventory:
One row per product, warehouse and calendar day.
```

Grain must be declared before choosing measures or joins.

If an order-level table is joined directly to an order-item table, order amounts may be duplicated:

```text
Order amount = ₹1,000
Number of line items = 4

Incorrect joined sum = ₹4,000
```

Many analytical errors are actually grain errors.

---

# 13. Staging, intermediate, and mart boundaries

Consider appointment data from three sources:

```text
Hospital DB
Caregiver application
Billing API
```

A suitable structure could be:

```text
stg_hospital__appointments
stg_caregiver__visits
stg_billing__claims
              ↓
int_appointments_deduplicated
int_appointments_with_claims
int_appointment_lifecycle
              ↓
dim_elder
dim_provider
fact_appointment
fct_daily_coordination
```

The boundaries are:

* Staging understands source structure.
* Intermediate understands reusable transformation logic.
* Marts understand business meaning.
* Semantic models understand governed measures.
* Serving models understand consumer access patterns.

---

# 14. Materialization strategies

Materialization determines how a transformation is represented in the warehouse.

Common choices are:

* View.
* Table.
* Incremental table.
* Ephemeral model.
* Materialized view.

---

## 14.1 View

A view stores SQL logic but generally not its query result.

Advantages:

* Minimal storage.
* Always reflects underlying data.
* Easy to update.
* Suitable for lightweight transformations.

Disadvantages:

* Logic is recomputed during queries.
* Nested views may become slow.
* Performance depends on the warehouse optimizer.

Suitable for:

* Small staging transformations.
* Lightweight renaming or filtering.
* Infrequently queried models.

---

## 14.2 Table

A table stores the transformed result physically.

Advantages:

* Fast downstream reads.
* Predictable performance.
* Suitable for expensive transformations.
* Isolates downstream queries from complex upstream logic.

Disadvantages:

* Requires storage.
* Must be refreshed.
* Full rebuilds may be expensive.
* Data can become stale between refreshes.

Suitable for:

* Frequently queried marts.
* Expensive joins.
* Large aggregations.
* Stable analytical outputs.

---

## 14.3 Incremental table

An incremental model processes only new or changed data after its initial creation.

Advantages:

* Faster updates.
* Lower compute cost.
* Suitable for large datasets.
* Avoids rebuilding complete history.

Disadvantages:

* More complex logic.
* Late and corrected data must be handled.
* Schema changes can be difficult.
* Logic changes may require a full refresh.
* Incorrect checkpoints can create silent gaps.

---

## 14.4 Ephemeral model

An ephemeral model is expanded into downstream SQL rather than created as a warehouse object.

Advantages:

* Avoids unnecessary relations.
* Useful for small reusable transformations.

Disadvantages:

* Compiled SQL may become large.
* Cannot be queried independently.
* Harder to inspect operationally.
* Repeated use may duplicate computation.

---

## 14.5 Materialized view

A materialized view stores query results and refreshes them according to the capabilities of the warehouse.

It can be useful when:

* The warehouse supports efficient refresh.
* Consumers need view-like simplicity.
* Repeated computation is expensive.

Its behaviour is platform-specific, particularly regarding refresh timing and incremental maintenance.

---

# 15. Choosing a materialization

Materialization should be based on evidence.

| Condition                        | Likely option     |
| -------------------------------- | ----------------- |
| Small, simple transformation     | View              |
| Large, frequently queried mart   | Table             |
| Very large append/update dataset | Incremental       |
| Small reusable helper logic      | Ephemeral         |
| Platform-managed precomputation  | Materialized view |

Important decision factors include:

* Data volume.
* Change rate.
* Query frequency.
* Transformation cost.
* Required freshness.
* Storage price.
* Compute price.
* Rebuild time.
* Failure-recovery needs.
* Number of downstream consumers.

Materializing everything as a table wastes storage and compute. Keeping everything as a view repeatedly spends compute during consumption.

---

# 16. Incremental models

An incremental model distinguishes the first execution from later executions.

Initial execution:

```text
Read complete source
        ↓
Transform complete history
        ↓
Create target table
```

Later execution:

```text
Read new or changed records
        ↓
Transform affected records
        ↓
Insert, update or merge target
```

A simplified filter might be:

```sql
WHERE source_updated_at >
      (SELECT MAX(source_updated_at) FROM target_table)
```

This alone is often unsafe because records can arrive late or share the same timestamp.

A safer pattern may use an overlap:

```sql
WHERE source_updated_at >=
      target_max_updated_at - INTERVAL '2 days'
```

Overlapping rows are then deduplicated or merged.

---

# 17. Incremental strategies

## 17.1 Append

New rows are inserted without modifying old rows.

Suitable for:

* Immutable events.
* Logs.
* Telemetry.
* Append-only audit data.

Risk:

* Corrections and duplicates remain unless handled separately.

---

## 17.2 Merge

New records are matched using a unique key.

Conceptually:

```text
If key does not exist → insert
If key exists and incoming version is newer → update
```

Suitable for:

* Mutable source records.
* Current-state fact or dimension tables.
* Late corrections.

Correctness depends on:

* A reliable unique key.
* Version-aware update rules.
* Delete handling.
* Deduplication before merge.

---

## 17.3 Delete and insert

Rows for affected keys or partitions are deleted and rebuilt.

Suitable for:

* Reprocessing bounded partitions.
* Cases where row-level merge is inefficient.
* Derived calculations affected by several related rows.

---

## 17.4 Partition replacement

A complete target partition is replaced.

Example:

```text
Rebuild the last seven event-date partitions.
```

This can simplify late-arriving data handling when changes are naturally bounded by date.

---

# 18. Incremental-model correctness

An incremental model must answer:

1. How is a new record identified?
2. How is an updated record identified?
3. How are deleted records handled?
4. Can records arrive late?
5. Can older versions arrive after newer versions?
6. What is the unique key?
7. How are duplicates resolved?
8. What happens when transformation logic changes?
9. What happens when the schema changes?
10. How is a full refresh performed?
11. How is source-to-target completeness verified?
12. How is the incremental result tested against a full rebuild?

An incremental model is not production-ready simply because it runs faster.

---

# 19. Late-arriving facts and dimensions

## 19.1 Late-arriving fact

A fact arrives after its expected processing period.

Example:

```text
Appointment occurred: September 10
Record ingested:       September 13
```

Possible responses:

* Reprocess recent partitions.
* Merge using event identity.
* Update historical aggregates.
* Mark downstream results as revised.

---

## 19.2 Late-arriving dimension

A fact references a dimension entity not yet available.

Example:

```text
Payment references customer C501
Customer C501 has not yet reached the warehouse
```

Possible approaches:

* Create an “unknown” dimension member.
* Create an inferred dimension member.
* Quarantine the fact temporarily.
* Update the dimension reference later.

The design depends on freshness needs and the importance of referential completeness.

---

# 20. Slowly changing dimensions

A slowly changing dimension manages changes to descriptive attributes over time.

Example:

```text
Customer C1 was in Delhi until June.
Customer C1 moved to Mumbai in July.
```

---

## 20.1 Type 1

Overwrite the old value.

```text
Before: city = Delhi
After:  city = Mumbai
```

Use when:

* History is not required.
* The old value was incorrect.
* Consumers need only the latest value.

---

## 20.2 Type 2

Create a new dimension version.

| customer_key | customer_id | city   | valid_from | valid_to   | is_current |
| -----------: | ----------- | ------ | ---------- | ---------- | ---------- |
|          101 | C1          | Delhi  | 2025-01-01 | 2026-06-30 | false      |
|          184 | C1          | Mumbai | 2026-07-01 | null       | true       |

This supports historically correct analysis.

A June transaction joins to the Delhi version. An August transaction joins to the Mumbai version.

---

## 20.3 Type 3

Retain limited previous-state information in additional columns.

```text
current_city
previous_city
```

This is useful only when limited change history is sufficient.

---

# 21. dbt and analytics engineering

dbt applies software-engineering practices to SQL-based data transformation.

It helps teams manage:

* SQL models.
* Dependencies.
* Reusable macros.
* Tests.
* Documentation.
* Lineage.
* Environments.
* Incremental processing.
* Deployment workflows.

dbt usually transforms data already loaded into a warehouse.

```text
Ingestion tool
      ↓
Warehouse raw data
      ↓
dbt transformations
      ↓
Governed analytical models
```

dbt is not primarily:

* A source-data extraction tool.
* A general-purpose streaming platform.
* A workflow engine for every external system.
* A replacement for warehouse security and governance.
* A business-intelligence dashboard.

---

# 22. dbt project structure

A conceptual project might use:

```text
models/
  staging/
    crm/
    billing/
  intermediate/
  marts/
    finance/
    customer/
  semantic/

seeds/
snapshots/
macros/
tests/
```

Possible naming conventions:

```text
stg_<source>__<entity>
int_<business_transformation>
dim_<entity>
fact_<business_process>
fct_<aggregated_process>
rpt_<consumer_specific_output>
```

Naming should communicate a model’s role without requiring the user to inspect its SQL.

---

# 23. dbt sources

A dbt source represents a raw relation loaded by an ingestion system.

Example:

```yaml
sources:
  - name: crm
    schema: raw_crm
    tables:
      - name: customers
      - name: accounts
```

Sources support:

* Source documentation.
* Source-level testing.
* Freshness monitoring.
* Lineage from raw data.
* Separation between ingestion and transformation.

A model can refer to a source logically rather than hard-coding its physical name.

Conceptually:

```sql
SELECT *
FROM {{ source('crm', 'customers') }}
```

---

# 24. dbt models

A dbt model is usually a SQL query that produces a warehouse relation or reusable transformation.

Conceptually:

```sql
SELECT
    customer_id,
    customer_name,
    created_at
FROM {{ ref('stg_crm__customers') }}
WHERE customer_status = 'active'
```

The `ref` relationship provides:

* Dependency ordering.
* Environment-aware relation resolution.
* Lineage.
* Safer refactoring.
* Documentation connections.

The dependency graph determines execution order:

```text
stg_customers ──→ int_customer_orders ──→ dim_customer
stg_orders ─────→ int_customer_orders ──→ fact_customer_activity
```

---

# 25. Seeds

A seed is a small static dataset commonly stored as CSV and loaded into the warehouse.

Suitable examples:

* Country-code mapping.
* Small status mappings.
* Test fixtures.
* Stable category definitions.
* Manually governed reference values.

Seeds are generally unsuitable for:

* Large frequently changing datasets.
* Sensitive secrets.
* High-volume operational reference data.
* Data that should be managed through a business application.

Seed ownership and review are still necessary because a small mapping table can materially change analytical results.

---

# 26. dbt snapshots

A dbt snapshot captures changes to mutable source records over time.

Suppose the source contains only current customer status:

| customer_id | status  | updated_at |
| ----------- | ------- | ---------- |
| C1          | premium | 2026-09-18 |

A snapshot can retain historical versions:

| customer_id | status   | valid_from | valid_to   |
| ----------- | -------- | ---------- | ---------- |
| C1          | standard | 2025-01-10 | 2026-04-05 |
| C1          | premium  | 2026-04-05 | null       |

Common change-detection approaches include:

* Timestamp-based detection.
* Comparing selected columns.

Snapshots are useful when:

* A mutable source overwrites historical values.
* Historical analytical state is required.
* Source change history is otherwise unavailable.

Snapshots should not be confused with source-database snapshots used during CDC initialization.

---

# 27. dbt macros

A macro is reusable templated transformation logic.

Possible uses:

* Standardizing currencies.
* Generating surrogate keys.
* Applying common date logic.
* Producing repeated SQL expressions.
* Supporting warehouse-specific syntax.
* Automating repetitive tests.

Conceptually:

```sql
{{ normalize_status('source_status') }}
```

Macros reduce duplication, but excessive abstraction can make SQL difficult to understand.

A macro is most useful when:

* Logic is genuinely repeated.
* The interface is stable.
* The generated SQL remains inspectable.
* Behaviour is documented and tested.

---

# 28. dbt tests

Testing converts data assumptions into executable checks.

## 28.1 Generic tests

Common tests include:

* Not null.
* Unique.
* Accepted values.
* Relationships.

Example expectations:

```text
dim_customer.customer_key is unique
fact_order.order_id is not null
fact_order.customer_key references dim_customer
order_status belongs to an approved set
```

---

## 28.2 Singular tests

A singular test is a custom query that returns violating rows.

Examples:

```text
Orders with a negative final amount
Completed appointments without a completion timestamp
Current dimension members with a populated valid_to
Overlapping Type 2 validity periods
```

---

## 28.3 Unit tests

Unit tests validate transformation logic using controlled inputs and expected outputs.

Suitable cases:

* Complex status mapping.
* Deduplication priority.
* Date boundary behaviour.
* Currency conversion.
* SCD change detection.
* Null-handling logic.

---

## 28.4 Tests are not all equal

Tests should be assigned severity based on business impact.

| Failure                               | Possible response   |
| ------------------------------------- | ------------------- |
| Duplicate primary key                 | Block publication   |
| Broken fact-to-dimension relationship | Block or quarantine |
| Minor optional description missing    | Warn                |
| Small freshness delay                 | Warn or alert       |
| Revenue reconciliation failure        | Block publication   |

A large number of weak tests does not compensate for missing business-critical tests.

---

# 29. Documentation and lineage

Documentation should explain:

* What the model represents.
* Its grain.
* Its business owner.
* Its technical owner.
* Important columns.
* Metric definitions.
* Refresh cadence.
* Quality expectations.
* Upstream sources.
* Downstream uses.
* Known limitations.
* Security classification.

Lineage shows dependency relationships:

```text
raw.orders
    ↓
stg_app__orders
    ↓
int_orders_enriched
    ↓
fact_order
    ↓
revenue semantic model
    ↓
executive dashboard
```

Lineage helps answer:

* What breaks if this model changes?
* Where did this metric come from?
* Which source produced this value?
* Which dashboards depend on this column?
* Where should a quality rule be applied?

Lineage alone does not explain business meaning. It must be combined with documentation and ownership.

---

# 30. Environments

Separate environments reduce the risk of unfinished transformations affecting production consumers.

Typical environments include:

```text
Development
     ↓
Continuous integration
     ↓
Staging or acceptance
     ↓
Production
```

Development environments should isolate developer schemas or namespaces.

Production should use:

* Reviewed code.
* Controlled credentials.
* Stable schedules.
* Versioned releases.
* Monitored execution.
* Restricted deployment permissions.

Environment-specific behaviour should be minimized. If development and production logic differ significantly, testing becomes less reliable.

---

# 31. CI/CD for analytics engineering

CI/CD applies automated validation and controlled deployment to analytical code.

A pull-request workflow may include:

```text
Change SQL or configuration
        ↓
Compile project
        ↓
Check changed-model dependencies
        ↓
Execute selected models
        ↓
Run tests
        ↓
Review generated SQL and lineage impact
        ↓
Approve and merge
        ↓
Deploy to production
```

Useful CI checks include:

* SQL compilation.
* Linting.
* Model tests.
* Unit tests.
* Contract validation.
* Documentation validation.
* Detection of breaking changes.
* Comparison of row counts.
* Comparison of critical metrics.
* Validation of downstream impact.

CI should focus on changed models and their affected dependencies when a full project execution is too expensive.

---

# 32. Model contracts

A model contract defines the expected structure of a published analytical model.

It may specify:

* Column names.
* Data types.
* Required columns.
* Nullability.
* Primary or unique keys.
* Business meaning.
* Compatibility expectations.

Example:

```yaml
model: fact_appointment
grain: one row per appointment
columns:
  appointment_id:
    type: string
    nullable: false
  appointment_status:
    type: string
    allowed_values:
      - scheduled
      - completed
      - cancelled
```

Contracts prevent accidental structural changes such as:

* Removing a published column.
* Changing a numeric measure into a string.
* Renaming a field without migration.
* Making a required identifier nullable.

Contracts must be accompanied by semantic governance. A field can retain the same type while its meaning changes.

---

# 33. Query workload management

Warehouses commonly serve competing workloads:

* Executive dashboards.
* Ad hoc analyst queries.
* dbt transformations.
* Data-science exploration.
* Scheduled exports.
* AI retrieval.
* Backfills.
* Regulatory reporting.

Without workload management, one large query can degrade other consumers.

Possible controls include:

* Separate compute clusters or warehouses.
* Resource groups.
* Query priorities.
* Concurrency limits.
* Timeouts.
* Query queues.
* User quotas.
* Scheduled heavy workloads.
* Result caching.
* Automatic scaling.
* Backfill isolation.

A useful separation might be:

```text
Transformation compute
BI dashboard compute
Ad hoc analytics compute
Data-science compute
AI-serving compute
```

Physical separation depends on the platform, but logical workload isolation should be intentional.

---

# 34. Warehouse performance principles

Important performance techniques include:

* Selecting only required columns.
* Filtering early where appropriate.
* Avoiding repeated expensive transformations.
* Choosing correct join keys.
* Reducing accidental many-to-many joins.
* Pre-aggregating frequently reused results.
* Maintaining suitable partitioning or clustering.
* Using incremental processing.
* Avoiding unnecessary model chains.
* Monitoring actual query plans and usage.
* Materializing expensive reused logic.
* Removing unused transformations.

Performance optimization should be driven by measured workloads rather than assumed rules.

A query that is slow once during development may not justify permanent materialization. A moderately expensive query executed thousands of times may justify it.

---

# 35. Cost-aware materialization

Cloud warehouses often charge for some combination of:

* Compute duration.
* Data scanned.
* Storage.
* Data movement.
* Concurrency.
* Serverless operations.

The cost of a model is not limited to its scheduled build.

A model may incur:

```text
Build cost
+ storage cost
+ downstream query cost
+ maintenance cost
+ backfill cost
+ failure-recovery cost
```

Example trade-off:

* A view costs little to store but may repeatedly execute expensive joins.
* A table costs more to store and refresh but makes frequent downstream queries cheaper.
* An incremental table lowers routine build cost but increases operational complexity.

Cost-aware design considers both producer and consumer usage.

---

# 36. Reusable metrics

A reusable metric is a centrally governed business calculation.

Examples:

```text
Gross revenue
Net revenue
Active customer count
Appointment completion rate
Claim approval rate
Average resolution time
```

A metric definition should include:

* Name.
* Description.
* Base measure.
* Aggregation.
* Time dimension.
* Filters.
* Grain.
* Allowed dimensions.
* Currency or unit.
* Owner.
* Version.
* Validity or effective date.
* Treatment of nulls, cancellations, and reversals.

For example:

```text
Appointment completion rate =
Completed eligible appointments
÷
All eligible scheduled appointments
```

The word “eligible” must be defined. Otherwise, teams may disagree about cancelled appointments, rescheduled appointments, or test data.

---

# 37. Semantic models and semantic layers

A semantic layer translates physical data structures into consistent business concepts.

```text
Warehouse tables
       ↓
Semantic entities, dimensions and measures
       ↓
Dashboards, applications, analysts and AI agents
```

It may define:

* Entities.
* Relationships.
* Measures.
* Dimensions.
* Time grains.
* Default filters.
* Business terminology.
* Access policies.

Benefits include:

* Consistent metric definitions.
* Reduced dashboard-specific SQL.
* Reusable business logic.
* Easier self-service analytics.
* Machine-readable data meaning.
* Safer consumption by AI agents.

The semantic layer should not hide poor modelling. It works best when built on well-designed marts with clear grain and tested relationships.

---

# 38. Metric fan-out and join safety

Suppose:

```text
One order has 3 items
One order has 2 payments
```

Joining orders, items, and payments directly may produce:

```text
3 × 2 = 6 rows
```

Both item and payment amounts can become duplicated.

This is called fan-out.

Strategies include:

* Aggregate each child table before joining.
* Model facts separately.
* Declare relationship cardinality.
* Use semantic-layer join rules.
* Test uniqueness at expected grains.
* Avoid mixing measures from incompatible grains.

A semantic system must understand whether a relationship is:

* One-to-one.
* One-to-many.
* Many-to-one.
* Many-to-many.

Otherwise, centrally defined metrics can still return incorrect results.

---

# 39. Data products

A data product is a deliberately managed dataset or analytical interface created for consumers.

A data product should have:

* A defined purpose.
* Intended consumers.
* Clear ownership.
* Discoverable documentation.
* Stable interfaces.
* Quality expectations.
* Freshness SLOs.
* Security classification.
* Support and incident processes.
* Usage monitoring.
* Versioning and deprecation rules.

Examples:

* Customer 360 product.
* Daily revenue product.
* Provider-performance product.
* Appointment coordination product.
* Fraud-feature product.
* Governed embedding corpus.

A collection of tables is not automatically a data product. Product thinking requires responsibility for whether consumers can safely and successfully use it.

---

# 40. Data-product ownership

Ownership should cover both business and technical responsibilities.

## Business owner

Responsible for:

* Business meaning.
* Metric definitions.
* Acceptable use.
* Domain decisions.
* Priority and impact.

## Technical owner

Responsible for:

* Pipeline operation.
* Model implementation.
* Quality controls.
* Performance.
* Incident response.
* Deployment and maintenance.

## Platform owner

Responsible for shared capabilities such as:

* Warehouse infrastructure.
* Access systems.
* Deployment frameworks.
* Observability.
* Standard tooling.

Ownership should be recorded in machine-readable metadata where possible.

---

# 41. Product-level quality SLOs

A Service-Level Objective, or SLO, defines a measurable reliability target.

Possible data-product SLOs include:

## Freshness

```text
95% of daily loads published before 6:00 AM.
```

## Availability

```text
The data product is queryable 99.9% of reporting hours.
```

## Completeness

```text
At least 99.95% of expected source records are represented.
```

## Validity

```text
Fewer than 0.1% of records violate non-critical validation rules.
```

## Incident response

```text
Critical product incidents acknowledged within 15 minutes.
```

## Recovery

```text
Critical publication restored within two hours.
```

SLOs should reflect consumer impact. A technical job succeeding does not prove that the published product is complete or correct.

---

# 42. Data-product usage monitoring

Usage monitoring helps determine whether data products are useful and sustainable.

Possible metrics include:

* Query count.
* Active consumers.
* Dashboard dependencies.
* API requests.
* Model or agent dependencies.
* Data scanned.
* Compute cost.
* Query latency.
* Failure rate.
* Last access time.
* Most-used columns.
* Repeated consumer errors.
* Number of downstream products.

Usage information supports:

* Capacity planning.
* Cost attribution.
* Deprecation.
* Product improvement.
* Identification of critical assets.
* Detection of unused tables.
* Prioritization of documentation.

Unused does not always mean unnecessary. Regulatory and disaster-recovery datasets may be rarely queried but still required.

---

# 43. AI-ready analytical tables

An AI-ready analytical table should be more than a large flattened dataset.

It should preserve:

* Stable entity identifiers.
* Event time.
* Availability time.
* Feature-computation time.
* Historical state.
* Quality status.
* Source provenance.
* Version information.
* Access classification.
* Point-in-time correctness.

Examples include:

* Customer features.
* Risk indicators.
* Recent behavioural aggregates.
* Care coordination history.
* Product usage sequences.
* Label-generation tables.

An AI-ready table should explicitly distinguish:

```text
What was true at event time
What was stored by the source
What was known to the platform
What was available when a prediction was made
```

---

# 44. Point-in-time correctness

Suppose:

```text
Appointment occurred: June 5
Entered into source:   June 10
Prediction made:       June 7
```

A training row representing the June 7 prediction must not use the appointment record because the system did not know about it at that time.

Using such future information causes data leakage.

A point-in-time join conceptually requires:

```text
feature_available_at <= prediction_time
```

When dimensional history is involved, it may also require:

```text
dimension_valid_from <= event_time
AND
dimension_valid_to > event_time
```

AI-ready analytics therefore needs temporal modelling beyond ordinary dashboard aggregation.

---

# 45. Feature-oriented data modelling

Feature-oriented modelling prepares reusable, governed inputs for ML systems.

A feature definition should include:

* Entity.
* Feature name.
* Calculation.
* Source.
* Window.
* Update frequency.
* Availability delay.
* Null behaviour.
* Data type.
* Owner.
* Version.
* Validity rules.

Example:

```text
Feature: completed_appointments_last_30d
Entity: elder
Calculation: count of eligible completed appointments
Window: 30 days before prediction time
Freshness: hourly
Availability delay: up to 10 minutes
```

Feature tables should avoid:

* Mixing incompatible entity grains.
* Using future data.
* Recomputing the same feature differently across teams.
* Omitting availability timestamps.
* Silently changing feature meaning.

---

# 46. Analytics for generative AI and agents

Analytical data may support:

* Text-to-SQL systems.
* Operational copilots.
* Automated summaries.
* Decision-support agents.
* Retrieval-augmented generation.
* Anomaly-explanation agents.

Agents require additional metadata:

* Business descriptions.
* Entity relationships.
* Metric definitions.
* Data freshness.
* Quality status.
* Permitted use.
* Sensitivity classification.
* Known limitations.
* Example query patterns.
* Provenance.

An agent should not treat every accessible column as safe or semantically interchangeable.

A trusted agent-facing flow is:

```text
User question
      ↓
Authorized semantic concepts
      ↓
Governed metrics and models
      ↓
Validated query
      ↓
Result with provenance and freshness
```

---

# 47. Data mesh principles

Data mesh treats data as a product owned by the domain closest to its meaning.

Its main ideas include:

* Domain-oriented ownership.
* Data as a product.
* Self-service data platform.
* Federated computational governance.

Example domain structure:

```text
Customer domain
Orders domain
Payments domain
Support domain
```

Each domain may publish governed products such as:

```text
Customer domain → customer_master
Orders domain   → order_events
Payments domain → payment_status
```

A central platform provides reusable capabilities:

* Warehouse infrastructure.
* CI/CD.
* Testing frameworks.
* Catalogues.
* Access control.
* Observability.
* Contract enforcement.

Federated governance establishes common rules for:

* Identity.
* Privacy.
* Interoperability.
* Metadata.
* Quality.
* Security.
* Versioning.

Data mesh does not mean every team independently invents its own formats and tools.

---

# 48. Centralized warehouse versus data mesh

| Aspect           | Centralized approach                 | Data-mesh approach                      |
| ---------------- | ------------------------------------ | --------------------------------------- |
| Ownership        | Central data team                    | Domain teams                            |
| Business context | May be distant from source domain    | Closer to domain experts                |
| Standards        | Centrally enforced                   | Federated governance                    |
| Platform         | Centrally operated                   | Self-service shared platform            |
| Main risk        | Bottleneck and weak domain context   | Fragmentation and inconsistent maturity |
| Best fit         | Smaller or centralized organizations | Larger multi-domain organizations       |

Many organizations use a hybrid model:

```text
Central platform and standards
             +
Domain-owned transformations and products
```

---

# 49. Analytics-engineering observability

A production analytics platform should monitor:

## Execution

* Run success.
* Model duration.
* Queue time.
* Retry count.
* Failure category.

## Freshness

* Latest source data.
* Latest successful transformation.
* Publication delay.
* Data-product age.

## Quality

* Null rates.
* Duplicate rates.
* Referential failures.
* Volume anomalies.
* Distribution changes.
* Reconciliation differences.

## Performance

* Query duration.
* Bytes scanned.
* Warehouse utilization.
* Concurrency.
* Cache use.

## Cost

* Cost per model.
* Cost per product.
* Cost per consumer workload.
* Backfill cost.
* Unused materialization cost.

## Usage

* Active consumers.
* Downstream dependencies.
* Query frequency.
* Last access time.

Monitoring should distinguish between pipeline health and data health. A model may execute successfully while producing incomplete or incorrect data.

---

# 50. Reconciliation in the warehouse

Reconciliation confirms that transformations preserve intended data.

Possible checks include:

* Source-to-staging counts.
* Staging-to-mart counts.
* Insert/update/delete counts.
* Financial control totals.
* Distinct business keys.
* Minimum and maximum timestamps.
* Null and duplicate counts.
* Partition completeness.
* Aggregate comparison with authoritative systems.

Example:

```text
Source completed payments:       ₹10,000,000
Warehouse completed payments:    ₹10,000,000
Quarantined payments:                      ₹0
Unexplained difference:                    ₹0
```

Matching totals do not prove that every individual record is correct, but unexplained mismatches provide strong evidence of a defect.

---

# 51. Handling corrections and restatements

Historical analytical data may change because of:

* Source corrections.
* Refunds.
* Late-arriving events.
* Updated classification.
* Transformation defects.
* Revised business definitions.

A warehouse should distinguish:

* Ordinary late data.
* Source correction.
* Logic correction.
* Business restatement.
* Manual adjustment.

Useful metadata includes:

```text
record_version
effective_at
loaded_at
reprocessed_at
transformation_version
restatement_reason
```

For sensitive financial or regulated reporting, previously published results may need formal versioning and approval rather than silent replacement.

---

# 52. Backfills in analytics engineering

A backfill reprocesses a historical range.

Before execution, define:

* Affected models.
* Exact date or partition range.
* Code version.
* Expected row volume.
* Compute limits.
* Interaction with live runs.
* Downstream publication behaviour.
* Test criteria.
* Rollback or correction plan.
* Whether notifications or external actions must be suppressed.

Backfills may invalidate:

* Incremental checkpoints.
* Cached dashboards.
* Derived aggregates.
* Semantic metrics.
* ML features.
* Downstream extracts.

A successful job exit is not enough. Post-backfill reconciliation is required.

---

# 53. Common warehouse anti-patterns

## Anti-pattern 1: One giant transformation model

A single query performs all cleaning, joins, business logic, and aggregation.

**Problem:** Difficult to test, reuse, understand, and debug.

**Better approach:** Separate source cleanup, reusable transformation, and business publication.

---

## Anti-pattern 2: Too many unnecessary layers

Every small expression becomes a separate model.

**Problem:** Deep lineage, operational overhead, and difficult navigation.

**Better approach:** Create models only when they add meaningful clarity, reuse, testing, ownership, or performance.

---

## Anti-pattern 3: Undefined grain

A table is described as “order data” without specifying what one row represents.

**Problem:** Incorrect joins and duplicated measures.

**Better approach:** Declare grain before designing columns or metrics.

---

## Anti-pattern 4: Dashboard logic becomes business logic

Each dashboard independently calculates revenue or customer activity.

**Problem:** Conflicting numbers.

**Better approach:** Publish reusable metrics through governed marts and semantic models.

---

## Anti-pattern 5: Full refresh for every model

Complete history is rebuilt regardless of size.

**Problem:** Excessive time and compute cost.

**Better approach:** Use incremental processing where its complexity is justified.

---

## Anti-pattern 6: Incremental logic without late-data handling

Only records newer than the maximum timestamp are processed.

**Problem:** Late or corrected records are missed.

**Better approach:** Use overlap windows, merge logic, partitions, source versions, and reconciliation.

---

## Anti-pattern 7: Tests limited to not-null checks

Technical tests pass while business results remain wrong.

**Better approach:** Add grain, reconciliation, temporal, relationship, and business-rule tests.

---

## Anti-pattern 8: Using the warehouse as an operational application database

High-frequency transactions are written directly into analytical models.

**Problem:** Analytical platforms may not provide the required transactional behaviour or latency.

**Better approach:** Keep operational authority in OLTP systems and synchronize governed data downstream.

---

## Anti-pattern 9: Materializing everything

Every transformation becomes a persistent table.

**Problem:** High storage, refresh cost, and maintenance burden.

**Better approach:** Select materializations using data volume, reuse, latency, and cost.

---

## Anti-pattern 10: No ownership

Nobody is accountable when a metric changes or a product becomes stale.

**Better approach:** Assign business and technical owners with measurable SLOs.

---

## Anti-pattern 11: Ignoring unused models

Old marts continue refreshing indefinitely.

**Problem:** Cost and governance burden grow continuously.

**Better approach:** Monitor use and apply controlled deprecation.

---

## Anti-pattern 12: AI tables without availability time

Training data is joined only on business event time.

**Problem:** Future information leaks into model training.

**Better approach:** Preserve event, ingestion, availability, feature, and prediction times.

---

# 54. Practical design exercises

## Exercise 1: Choose a materialization

A customer mart:

* Contains 200 million records.
* Receives 500,000 changes daily.
* Is queried by 40 dashboards.
* Includes expensive multi-source joins.
* Must be updated hourly.

Questions:

1. Should it be a view, table, or incremental table?
2. What unique key should be used?
3. How should late updates be processed?
4. When is a full refresh required?
5. How will cost and freshness be monitored?

A likely direction is an incremental table with merge or partition rebuilding, but the final design depends on source-update semantics and warehouse capabilities.

---

## Exercise 2: Detect a grain problem

You have:

```text
fact_order: one row per order
fact_payment: one row per payment
fact_refund: one row per refund
```

One order may have several payments and several refunds.

Questions:

1. What happens if all three tables are directly joined?
2. At what grain should each amount be aggregated?
3. Should payments and refunds remain separate facts?
4. How should the semantic layer expose net revenue?

---

## Exercise 3: Design an SCD Type 2 dimension

A customer can change:

* City.
* Membership tier.
* Assigned account manager.

Define:

* Business key.
* Surrogate key.
* Change-detection columns.
* `valid_from`.
* `valid_to`.
* `is_current`.
* Late-change behaviour.
* Tests preventing overlapping validity intervals.

---

## Exercise 4: Define a data-product SLO

For a daily finance mart, specify:

* Publication deadline.
* Freshness target.
* Source reconciliation threshold.
* Availability target.
* Critical test failures.
* Incident owner.
* Recovery target.
* Consumer-notification process.

---

## Exercise 5: Make a table AI-ready

A churn model needs customer activity features.

Identify:

* Entity grain.
* Prediction time.
* Feature windows.
* Availability timestamps.
* Point-in-time joins.
* Feature versions.
* Null behaviour.
* Quality status.
* Sensitive attributes that should be excluded.

---

# 55. Conceptual mini-project designs

These are design exercises only; no implementation is included.

## Mini-project 1: Analytics warehouse for elder care

Design:

```text
Raw appointments
Raw caregiver visits
Raw follow-up requirements
Raw emergency alerts
Raw billing data
            ↓
Staging models
            ↓
Reusable coordination models
            ↓
dim_elder
dim_caregiver
dim_provider
fact_appointment
fact_care_visit
fact_emergency_alert
            ↓
Care coordination semantic metrics
```

Define:

* Grain of every fact.
* Type 2 attributes.
* Incremental strategy.
* Data-quality tests.
* SLOs.
* Security classifications.
* AI-consumption metadata.

---

## Mini-project 2: Revenue semantic layer

Create a conceptual model for:

* Gross revenue.
* Discounts.
* Refunds.
* Taxes.
* Net revenue.
* Recognized revenue.

Specify:

* Source facts.
* Time dimensions.
* Currency handling.
* Cancellation rules.
* Refund timing.
* Join cardinalities.
* Metric ownership.
* Reconciliation controls.

---

## Mini-project 3: Domain-owned data product

Design a customer-domain data product containing:

* Stable customer identity.
* Current profile.
* Historical profile changes.
* Consent state.
* Customer segment.
* Quality status.
* Freshness metadata.

Define:

* Product owner.
* Contract.
* Supported interface.
* SLOs.
* Access policy.
* Versioning.
* Usage monitoring.
* Deprecation process.

---

# 56. Interview questions and answers

### 1. What is the difference between OLTP and OLAP?

OLTP systems execute frequent, small business transactions and are optimized for inserts, updates, and point lookups. OLAP systems analyze large historical datasets and are optimized for scans, aggregations, and multidimensional analysis.

### 2. Why should analytics not run directly on an operational database?

Large analytical queries can compete with application traffic, consume resources, create locks or replica lag, and lack integrated historical data. A warehouse isolates analytical workloads and provides governed models.

### 3. Why is column-oriented storage useful for analytics?

Analytical queries often read a few columns across many rows. Column storage reduces unnecessary reads, compresses similar values efficiently, and supports vectorized aggregation.

### 4. What is a data mart?

A data mart is a governed analytical model designed for a particular business domain or consumer need, such as finance, sales, or customer analytics.

### 5. What is the purpose of a staging model?

A staging model cleans and standardizes one source relation through renaming, type casting, basic normalization, and metadata handling without introducing extensive business logic.

### 6. What belongs in an intermediate model?

Reusable multi-source transformations, deduplication, reusable joins, entity resolution, pivots, lifecycle construction, and calculations that support multiple final marts.

### 7. What is grain?

Grain defines exactly what one row represents. It must be established before measures and joins are designed to prevent duplication and incorrect aggregation.

### 8. What is the difference between a fact and a dimension?

A fact represents a measurable business event or process. A dimension describes the entity or context used to filter and group facts.

### 9. What is an incremental model?

An incremental model processes only new or changed data after its initial build rather than rebuilding the complete dataset during every run.

### 10. Why are incremental models difficult?

They must correctly handle late data, updates, deletes, duplicates, out-of-order changes, schema evolution, code changes, and full refreshes.

### 11. What is an SCD Type 2 dimension?

It preserves attribute history by creating a new dimension row for each relevant change and recording validity intervals.

### 12. What is dbt?

dbt is an analytics-engineering framework that manages SQL transformations using models, dependencies, tests, documentation, macros, environments, and deployment workflows.

### 13. What is the purpose of `ref` in dbt?

It declares a dependency on another model, enables correct build order, supports environment-aware naming, and contributes to lineage.

### 14. What is a dbt source?

A source is a declared raw relation loaded by an ingestion process. It supports documentation, testing, freshness checks, and source-to-model lineage.

### 15. What is a dbt snapshot?

A dbt snapshot records historical versions of mutable source rows so that changes can be analyzed over time.

### 16. What are dbt seeds?

Seeds are small static reference datasets, typically CSV files, that dbt loads into the warehouse.

### 17. What are macros?

Macros are reusable templated functions that generate SQL and reduce repeated transformation logic.

### 18. What is the difference between a view and a table materialization?

A view stores the query definition and computes results when queried. A table stores computed results and must be refreshed but generally provides faster reads.

### 19. What is an ephemeral model?

An ephemeral model is inserted into downstream compiled SQL instead of being created as a physical warehouse relation.

### 20. What is a semantic layer?

A semantic layer defines reusable business entities, dimensions, measures, relationships, and access rules above physical warehouse tables.

### 21. Why are reusable metrics important?

They prevent different teams and dashboards from implementing conflicting definitions of business measures such as revenue or active customers.

### 22. What is join fan-out?

Join fan-out occurs when relationships at different grains multiply rows, causing measures to be duplicated and aggregated incorrectly.

### 23. What is a data product?

A data product is an owned and supported analytical dataset or interface with a purpose, consumers, documentation, quality guarantees, SLOs, and lifecycle management.

### 24. What is a data-product SLO?

It is a measurable reliability target covering qualities such as freshness, completeness, availability, validity, or recovery time.

### 25. What is cost-aware materialization?

It is the selection of views, tables, incremental tables, and other strategies based on total compute, storage, query, refresh, and maintenance costs.

### 26. How should warehouse workloads be isolated?

Transformation, dashboards, ad hoc analysis, data science, and backfills can use separate resource groups, queues, priorities, compute clusters, or schedules.

### 27. What makes an analytical table AI-ready?

It requires stable entities, point-in-time correctness, availability timestamps, provenance, feature versions, quality status, historical state, and controlled access.

### 28. What is point-in-time correctness?

It ensures a training or analytical record uses only information that was available at the historical decision or prediction time.

### 29. What are the main principles of data mesh?

Domain-oriented ownership, data as a product, self-service infrastructure, and federated computational governance.

### 30. What makes an analytics-engineering system production-ready?

It is layered, tested, documented, observable, cost-aware, secure, version-controlled, incrementally correct, governed by contracts, and supported by clear ownership and SLOs.

---

# 57. Phase-end knowledge check

1. How do OLTP and OLAP workloads differ?
2. Why are analytical systems commonly column-oriented?
3. Why should warehouse processing be separated from operational databases?
4. What purpose does an enterprise data warehouse serve?
5. How is a data mart different from a random reporting table?
6. What should be retained in a raw warehouse layer?
7. Which transformations belong in staging models?
8. When should an intermediate model be created?
9. What makes a business mart trustworthy?
10. Why must grain be defined before joins and measures?
11. How can a many-to-many join corrupt a metric?
12. When is a view preferable to a table?
13. When is an incremental materialization justified?
14. How do append, merge, and partition-replacement strategies differ?
15. Why can a maximum-timestamp filter miss records?
16. How should late-arriving facts be handled?
17. How does a late-arriving dimension affect fact processing?
18. What is the difference between SCD Types 1 and 2?
19. What role does dbt play in the data platform?
20. How do dbt sources differ from models?
21. When are seeds appropriate?
22. How do snapshots preserve source history?
23. What are the benefits and risks of macros?
24. What should cause a data-quality test to block publication?
25. How does `ref` support dependency management and lineage?
26. What should analytics CI validate?
27. What is the purpose of a model contract?
28. How does workload management protect dashboard performance?
29. How should total materialization cost be evaluated?
30. What information belongs in a reusable metric definition?
31. Why does a semantic layer require cardinality awareness?
32. What distinguishes a data product from an ordinary table?
33. How should business and technical ownership differ?
34. Which qualities can be expressed as data-product SLOs?
35. How can usage monitoring support deprecation?
36. Why does AI training require availability time?
37. What causes point-in-time leakage?
38. Which metadata makes analytical data safer for AI agents?
39. How does data mesh distribute responsibility?
40. Why must backfills be reconciled after execution?

---

# Phase 1.4 summary

Data warehousing converts source-aligned operational data into governed analytical products.

The major lessons are:

* **OLTP systems** execute transactions, while **OLAP systems** analyze historical data.
* **Columnar storage** supports efficient scanning, compression, and aggregation.
* A layered warehouse separates **raw, staging, intermediate, mart, semantic, and serving responsibilities**.
* **Grain** is the foundation of correct fact-table design and join behaviour.
* **Materialization strategies** balance freshness, performance, compute, storage, and complexity.
* **Incremental models** reduce processing cost but must handle late data, corrections, duplicates, deletes, and full refreshes.
* **Slowly changing dimensions** preserve descriptive history when required.
* **dbt** manages analytical SQL through models, sources, tests, snapshots, macros, documentation, lineage, environments, and CI/CD.
* **Reusable metrics and semantic models** prevent inconsistent business calculations.
* **Query workload management** protects critical consumers from competing analytical workloads.
* A **data product** requires ownership, contracts, documentation, quality SLOs, security, observability, and lifecycle management.
* **Cost-aware materialization** evaluates both transformation and downstream-consumption costs.
* **AI-ready analytical tables** preserve provenance, historical state, quality, availability time, and point-in-time correctness.
* **Data mesh** combines domain ownership with shared platform capabilities and federated governance.

The implementation/build section has been omitted as requested. I will proceed to **Phase 1.5: Workflow Orchestration** only when you explicitly ask for the next phase.
