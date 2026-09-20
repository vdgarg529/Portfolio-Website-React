# Phase 1.6: Data Lakes and Lakehouses

## Phase objective

This phase explains how large volumes of structured, semi-structured, and unstructured data are stored economically in object storage and converted into reliable, transactional, governable lakehouse tables.

The architectural progression is:

```text
Source systems
      ↓
Object storage
      ↓
Immutable raw data
      ↓
Analytical file formats
      ↓
Open table format
      ↓
Catalog and governance
      ↓
Processing and query engines
      ↓
Analytics, ML and AI products
```

By the end of this phase, you should understand:

* Object storage, buckets, objects, and keys.
* Raw, cleaned, and curated lake zones.
* File formats including CSV, JSON, Avro, Parquet, and ORC.
* Compression, column pruning, predicate pushdown, and splittability.
* Partitioning, file sizing, compaction, retention, and lifecycle management.
* The difference between a data lake, warehouse, and lakehouse.
* Apache Iceberg, Delta Lake, and Apache Hudi.
* Iceberg snapshots, manifests, time travel, schema and partition evolution, hidden partitioning, concurrent writes, and catalogs.
* Streaming-first lakehouse design.
* Storage–compute separation and lakehouse economics.
* Data residency and AI-ready lakehouse architecture.
* How AI agents can safely consume governed lakehouse data.

The implementation/build section is intentionally omitted.

---

# 1. What is a data lake?

A data lake is a scalable repository that stores many kinds of data, usually on distributed or object storage.

It may contain:

* Relational database extracts.
* Application events.
* CSV and JSON files.
* CDC records.
* Documents.
* Images.
* Audio.
* Video.
* Logs.
* Model features.
* Embeddings.
* Analytical tables.

A simplified lake architecture is:

```text
Databases ───────┐
APIs ────────────┤
Files ───────────┼──→ Object storage
Events ──────────┤
Documents ───────┘
```

A data lake separates inexpensive, scalable storage from the processing engines that read it.

---

# 2. Why organizations use data lakes

A data lake can provide:

* Low-cost storage at large scale.
* Retention of raw source data.
* Support for many data types.
* Independent processing engines.
* Historical replay.
* Machine-learning datasets.
* Flexible exploration.
* Long-term archives.
* Cross-domain data sharing.

However, storing files in object storage does not automatically create a useful data platform.

Without governance, a lake can become a “data swamp” containing:

* Unknown files.
* Duplicate copies.
* Inconsistent schemas.
* Broken partitions.
* Unclear ownership.
* Sensitive data with excessive access.
* Stale outputs.
* Unusable small files.
* No reliable table state.

---

# 3. Data lake versus data warehouse

| Aspect             | Data lake                                   | Data warehouse              |
| ------------------ | ------------------------------------------- | --------------------------- |
| Main storage       | Object or distributed storage               | Managed analytical storage  |
| Data types         | Structured, semi-structured, unstructured   | Primarily structured        |
| Typical cost model | Lower-cost storage plus separate compute    | Managed storage and compute |
| Schema approach    | Flexible raw storage and governed tables    | Strong tabular structure    |
| Updates            | Difficult with plain files                  | Native table operations     |
| Primary users      | Engineers, scientists, analysts, AI systems | Analysts and BI users       |
| Governance         | Must be deliberately added                  | Usually more integrated     |
| Engine choice      | Potentially multiple engines                | Usually platform-specific   |

The boundary has become less rigid because warehouses increasingly support external and unstructured data, while lakehouses add database-style capabilities to object storage.

---

# 4. Object storage

Object storage stores data as objects inside logical containers.

Each object generally has:

* Object data.
* A key or name.
* System metadata.
* Optional user metadata.
* A version or version identifier when versioning is enabled.
* Access and encryption controls.

Conceptually:

```text
Bucket
  ├── raw/crm/customers/2026/09/18/file-001.json
  ├── raw/crm/customers/2026/09/18/file-002.json
  └── curated/sales/orders/data-00001.parquet
```

Object stores commonly provide:

* High durability.
* Elastic capacity.
* HTTP-based APIs.
* Encryption.
* Versioning.
* Lifecycle rules.
* Replication.
* Access policies.
* Event notifications.

---

# 5. Object storage is not a normal file system

Object storage may display keys using directory-like paths:

```text
raw/orders/year=2026/month=09/file.parquet
```

But `raw`, `orders`, `year=2026`, and `month=09` may not be physical directories. They are often prefixes within an object key.

Important consequences include:

* Renaming a “directory” may require copying many objects.
* Listing many objects can be expensive.
* Atomic directory replacement may not exist.
* File-locking assumptions may not hold.
* Concurrent writes require higher-level coordination.
* Path discovery alone is a weak table-management strategy.

Open table formats exist partly to provide reliable table semantics above these object-storage limitations.

---

# 6. Buckets

A bucket is a top-level object-storage container.

Buckets can define boundaries for:

* Environment.
* Region.
* Security classification.
* Business domain.
* Retention policy.
* Replication policy.
* Billing.
* Ownership.

Possible design:

```text
company-prod-raw-in
company-prod-governed-in
company-prod-sensitive-in
company-dev-data-in
```

Overusing buckets produces operational overhead. Underusing them can create overly broad access and lifecycle policies.

A bucket should represent a meaningful administrative boundary, not merely a convenient folder.

---

# 7. Object keys and naming

An object key uniquely identifies an object within a bucket.

Example:

```text
hospital_a/appointments/ingestion_date=2026-09-18/run_id=R901/part-0001.parquet
```

A good key structure can help with:

* Ownership.
* Discovery.
* Lifecycle rules.
* Troubleshooting.
* Environment separation.
* Partition pruning in path-based systems.

Avoid:

* Personal information in keys.
* Secrets.
* Uncontrolled free-text names.
* Local-machine paths.
* Ambiguous timestamps.
* Random conventions across teams.

Even when a table format manages files, object naming should remain operable and secure.

---

# 8. Structured, semi-structured, and unstructured data

## Structured data

Structured data follows a defined tabular schema.

Examples:

* Customer table.
* Payment table.
* Product reference data.
* Sensor measurements.

```text
customer_id | name | status | created_at
```

## Semi-structured data

Semi-structured data contains organization and fields but may not fit a fixed relational layout.

Examples:

* JSON.
* XML.
* Event payloads.
* Application logs.
* Document metadata.

```json
{
  "event_id": "E101",
  "type": "appointment.completed",
  "payload": {
    "appointment_id": "A90"
  }
}
```

## Unstructured data

Unstructured data has no simple tabular representation.

Examples:

* PDF documents.
* Medical notes.
* Images.
* Audio.
* Video.
* Email bodies.

Unstructured data still requires structured metadata for governance, retrieval, and lifecycle management.

---

# 9. Immutable raw data

An immutable raw layer preserves source data as received.

```text
Source delivery
      ↓
Durable raw object
      ↓
Validation and transformation
```

Benefits include:

* Replay.
* Auditability.
* Reconciliation.
* Recovery from transformation defects.
* Rebuilding new models.
* Forensic investigation.
* Historical reproducibility.

Useful raw metadata includes:

```text
source_system
source_object
source_event_time
ingested_at
delivery_id
checksum
schema_version
pipeline_run_id
security_classification
```

Immutable does not mean “retain forever.” Data may still need deletion due to:

* Privacy requests.
* Regulatory requirements.
* Contractual restrictions.
* Retention limits.
* Security incidents.

Immutability is an operational design principle, not an exemption from governance.

---

# 10. Raw, cleaned, and curated zones

A common architecture separates the lake into zones.

```text
Raw/Bronze
    ↓
Cleaned/Standardized/Silver
    ↓
Curated/Gold
```

The names matter less than the responsibilities.

---

## 10.1 Raw zone

Characteristics:

* Source-aligned.
* Minimally transformed.
* Append-only where possible.
* Rich ingestion metadata.
* Restricted access.
* Suitable for replay.
* May contain invalid or sensitive records.

Example:

```text
raw.hospital_a.appointment_events
```

---

## 10.2 Cleaned or standardized zone

Responsibilities:

* Type casting.
* Schema validation.
* Deduplication.
* Canonical timestamps.
* Controlled values.
* Quality flags.
* Stable identifiers.
* Technical normalization.

Example:

```text
standardized.appointment_events
```

---

## 10.3 Curated zone

Responsibilities:

* Business entities and events.
* Facts and dimensions.
* Consumer-ready tables.
* Governed measures.
* AI feature tables.
* Security-aware data products.

Example:

```text
curated.fact_appointment
curated.dim_elder
```

Raw data should not automatically be exposed to business users simply because it is available.

---

# 11. Zone boundaries and publication

Each transition should have an explicit contract:

```text
Raw → Standardized
Structural validity and source normalization

Standardized → Curated
Business validity and semantic modelling

Curated → Product
Consumer contract, SLO and access policy
```

A table should not move to a higher-trust zone merely because a job completed successfully.

Promotion should depend on:

* Schema checks.
* Quality tests.
* Reconciliation.
* Ownership.
* Classification.
* Documentation.
* Publication metadata.

---

# 12. File sizing

Analytical systems usually perform better with reasonably large files than with millions of tiny files.

There is no universally correct file size. The best size depends on:

* Query engine.
* Storage system.
* Compression.
* Row width.
* Partition size.
* Read concurrency.
* Write frequency.
* Network throughput.
* Update pattern.

A common target is medium-to-large analytical files rather than kilobyte-sized outputs, but the appropriate range must be measured for the workload.

---

# 13. The small-file problem

Suppose streaming ingestion writes one file every second:

```text
86,400 files per day
```

Across 100 sources:

```text
8,640,000 files per day
```

Small files create:

* Large metadata overhead.
* Slow file listing.
* Excessive task scheduling.
* Many object-store requests.
* Poor scan throughput.
* Large manifests or planning cost.
* Inefficient compression.
* Slow query startup.

The data volume may be moderate while the file-count overhead becomes enormous.

---

# 14. Why large files are not always better

Extremely large files can also create problems:

* Limited read parallelism.
* Expensive rewrites.
* Large failure-recovery units.
* Uneven task duration.
* Slow point updates.
* Memory pressure.
* Poor latency for small incremental queries.

File sizing is therefore a balance:

```text
Too small:
metadata and scheduling overhead

Too large:
low parallelism and expensive rewrites
```

---

# 15. Compaction

Compaction rewrites many small files into fewer larger files.

```text
100 small files
       ↓
Read and reorganize
       ↓
4 optimized files
```

Compaction can improve:

* Query planning.
* Scan throughput.
* Compression.
* Object-store efficiency.
* Metadata size.

Compaction must preserve table correctness.

A safe table-format compaction operation generally:

1. Reads files from a known snapshot.
2. Writes replacement files.
3. Validates the output.
4. Atomically commits new metadata.
5. Leaves old files temporarily available.
6. Removes obsolete files only after retention rules permit.

Compaction should not expose a half-rewritten table.

---

# 16. Types of compaction

## Bin-packing compaction

Combines small files to reach a target size.

## Sorting compaction

Rewrites files in an order that improves data skipping or range queries.

## Clustering

Co-locates related data using one or more fields.

## Delete-file compaction

Combines or applies accumulated delete information.

## Partition-level compaction

Optimizes selected partitions instead of the entire table.

Compaction consumes compute and creates new storage writes, so its benefit should be measured against cost.

---

# 17. Partitioning

Partitioning organizes table data into logical groups.

Example:

```text
orders/
  order_date=2026-09-17/
  order_date=2026-09-18/
```

A query filtering on `order_date` can avoid unrelated partitions.

Good partition columns commonly have:

* Frequent query filters.
* Balanced distribution.
* Stable semantics.
* Reasonable cardinality.
* Useful pruning behaviour.

---

# 18. Over-partitioning

Poor partition choice:

```text
partition by customer_id
```

If there are millions of customers, this can produce:

* Millions of tiny partitions.
* Small files.
* High metadata cost.
* Poor write performance.
* Expensive planning.

Another poor choice:

```text
partition by exact event_timestamp
```

A more suitable transform might be:

```text
partition by day(event_timestamp)
```

Partition granularity should match data volume and common access patterns.

---

# 19. Partition skew

A partitioning field may create uneven partitions.

Example:

```text
country = India     → 70% of records
country = Nepal     → 2%
country = Bhutan    → 0.2%
```

The large partition can become a hotspot while small partitions create overhead.

Mitigation may include:

* Combining partition transforms.
* Bucketing.
* Hash distribution.
* Sorting within partitions.
* Choosing a different partition strategy.
* Periodic rebalancing.

---

# 20. Event-time versus ingestion-time partitioning

## Event-time partitioning

Advantages:

* Efficient business-time queries.
* Natural historical analysis.

Challenges:

* Late events update old partitions.
* Backfills touch historical locations.

## Ingestion-time partitioning

Advantages:

* Simple arrival management.
* Easy operational retention.
* Append-friendly.

Challenges:

* Business-time queries may scan many arrival partitions.
* Late events are separated from their logical event dates.

A system may store both timestamps while using one as its primary physical partition strategy.

---

# 21. Retention

Retention defines how long data and metadata remain available.

Different layers may need different periods:

```text
Raw events:             2 years
Curated metrics:        7 years
Temporary staging:      7 days
Query logs:             90 days
Table snapshots:        30 days
Quarantine records:     60 days
```

Retention should consider:

* Legal requirements.
* Privacy.
* Auditability.
* Recovery.
* Reproducibility.
* Cost.
* Consumer needs.
* Backup policies.
* Time-travel guarantees.

---

# 22. Lifecycle policies

Object-storage lifecycle policies automate transitions such as:

```text
Recent data → hot storage
Older data  → cool storage
Archive data → deep archive
Expired data → deletion
```

Policies may also:

* Remove incomplete uploads.
* Expire old object versions.
* Delete temporary files.
* Transition logs to cheaper storage.

Lifecycle rules must understand table-format ownership.

Deleting data files directly because they “look old” can corrupt a table whose metadata still references them.

For lakehouse tables, table-aware expiration and orphan cleanup should be coordinated with object-store lifecycle policies.

---

# 23. CSV

CSV is a plain-text tabular format.

Advantages:

* Human-readable.
* Widely supported.
* Simple exchange format.
* Easy to produce.

Limitations:

* Weak type information.
* Ambiguous null handling.
* Escaping complexity.
* No nested structures.
* No embedded schema.
* Inefficient analytical scanning.
* Larger storage footprint.
* Column pruning is limited.

CSV is appropriate for simple interchange but is rarely the best governed analytical storage format.

---

# 24. JSON

JSON represents nested objects and arrays.

Advantages:

* Human-readable.
* Flexible.
* Common for APIs and events.
* Supports nested structures.
* Extensible.

Limitations:

* Verbose.
* Repeated field names.
* Weak or external schema enforcement.
* Expensive parsing.
* Inefficient large-scale analytical scans.
* Type inconsistency across records.

Examples of drift:

```json
{"heart_rate": 81}
{"heart_rate": "81"}
{"heart_rate": null}
```

Raw JSON should usually be validated and converted into a typed analytical representation.

---

# 25. Avro

Avro is a binary row-oriented serialization format with schema support.

Characteristics include:

* Embedded or associated schema.
* Compact binary encoding.
* Support for schema evolution.
* Strong fit for records and events.
* Efficient sequential writing.
* Support for nested structures.

Suitable uses:

* Event streams.
* CDC payloads.
* Message serialization.
* Row-oriented exchange.
* Archival of typed events.

Avro is not normally as efficient as Parquet or ORC for analytical queries that scan a few columns across many records.

---

# 26. Parquet

Parquet is an open column-oriented file format designed for efficient storage and retrieval.

Its columnar organization supports:

* Column pruning.
* Compression.
* Encoding.
* Statistics.
* Predicate-based skipping.
* Nested data.
* Parallel reads.

Apache Parquet describes itself as an open-source, column-oriented format designed for efficient storage and retrieval, with support for compression and encoding. [Apache Parquet overview](https://parquet.apache.org/docs/overview/)

Parquet is widely used for:

* Data lakes.
* Lakehouse tables.
* Analytical warehouse interchange.
* Feature data.
* Query-engine interoperability.

---

# 27. Parquet’s internal organization

Conceptually:

```text
Parquet file
  ├── Row group 1
  │     ├── Column chunk: customer_id
  │     ├── Column chunk: event_time
  │     └── Column chunk: amount
  ├── Row group 2
  │     ├── Column chunk: customer_id
  │     ├── Column chunk: event_time
  │     └── Column chunk: amount
  └── Footer metadata
```

A query needing only `event_time` and `amount` may avoid reading the `customer_id` chunks.

Statistics may allow complete row groups to be skipped.

---

# 28. ORC

ORC is another column-oriented analytical format.

It supports:

* Columnar storage.
* Compression.
* Type information.
* Indexes and statistics.
* Predicate pushdown.
* Splittable reads.
* Nested structures.

ORC is historically strong in Hive-oriented ecosystems, while Parquet has especially broad multi-engine adoption.

The correct choice depends on:

* Processing engines.
* Existing platform.
* Interoperability requirements.
* Data types.
* Compression and performance tests.

---

# 29. Row-oriented versus column-oriented formats

| Aspect             | Row-oriented                  | Column-oriented                 |
| ------------------ | ----------------------------- | ------------------------------- |
| Example            | Avro                          | Parquet, ORC                    |
| Best for           | Reading/writing full records  | Analytics over selected columns |
| Updates/events     | Natural record representation | Better for batch analytics      |
| Compression        | Moderate                      | Often stronger                  |
| Column pruning     | Limited                       | Strong                          |
| Streaming payload  | Suitable                      | Usually less suitable           |
| Large aggregations | Less efficient                | Efficient                       |

A production platform may use both:

```text
Kafka event → Avro
Lakehouse analytical table → Parquet
```

---

# 30. Compression

Compression reduces storage and I/O.

Two levels may be relevant:

## File-level compression

The entire file is compressed as one stream.

Example:

```text
data.csv.gz
```

This may reduce splittability because readers cannot easily begin at arbitrary positions.

## Block or column compression

Parts of a structured file are compressed independently.

Columnar formats can compress each column chunk using an appropriate codec.

Benefits:

* Lower storage cost.
* Less network transfer.
* Less disk I/O.
* Potentially faster queries.

Costs:

* CPU required for compression.
* CPU required for decompression.
* Different codecs trade compression ratio for speed.

---

# 31. Encoding versus compression

Encoding and compression are related but different.

## Encoding

Represents values more efficiently.

Examples:

* Dictionary encoding.
* Run-length encoding.
* Delta encoding.
* Bit packing.

## Compression

Reduces the resulting byte sequence using a codec.

A status column:

```text
ACTIVE
ACTIVE
ACTIVE
INACTIVE
ACTIVE
```

might first be dictionary encoded:

```text
ACTIVE = 0
INACTIVE = 1

0, 0, 0, 1, 0
```

and then compressed.

---

# 32. Column pruning

Column pruning reads only the columns required by the query.

Query:

```sql
SELECT event_date, SUM(amount)
FROM payments
GROUP BY event_date;
```

The engine may avoid reading:

* Customer name.
* Address.
* Payment description.
* Provider metadata.
* Unrelated payload fields.

Column pruning reduces:

* Data scanned.
* Network transfer.
* Decompression.
* Memory use.
* Query cost.

It works best with column-oriented formats and query engines capable of projecting required columns.

---

# 33. Predicate pushdown and data skipping

Predicate pushdown applies filters as close to the data-reading layer as possible.

Query:

```sql
SELECT *
FROM orders
WHERE order_date = DATE '2026-09-18'
  AND amount > 10000;
```

The engine may use:

* Partition metadata.
* File-level statistics.
* Row-group minimum and maximum values.
* Bloom filters where supported.
* Table-format manifests.

If a row group has:

```text
amount_min = 100
amount_max = 5,000
```

it cannot satisfy `amount > 10,000`, so it may be skipped.

Predicate pushdown does not necessarily mean the filter is evaluated completely inside the file format. It means available metadata and reader capabilities reduce unnecessary reads.

---

# 34. Schema embedding

A file with an embedded schema records information such as:

* Field names.
* Data types.
* Nested structure.
* Nullability information.
* Logical types.

Benefits:

* Safer interpretation.
* Better interoperability.
* Validation.
* Fewer type-inference errors.

Schema embedding does not solve semantic meaning.

A field can remain a valid string while changing from:

```text
appointment_status
```

to:

```text
billing_status
```

Structural schema and business contract must both be governed.

---

# 35. Splittability

A splittable file can be processed in parallel by reading independent sections.

Benefits:

* Better distributed processing.
* Faster scans.
* More balanced tasks.
* Recovery at smaller units.

Factors affecting splittability include:

* File format.
* Compression layout.
* Block structure.
* Index and footer metadata.
* Encryption.
* Object-store range-read support.

A large gzip-compressed CSV is often difficult to split efficiently, while Parquet row groups can be read independently.

---

# 36. File-format comparison

| Format  | Orientation     |             Schema | Nested data | Human-readable | Analytical efficiency |
| ------- | --------------- | -----------------: | ----------: | -------------: | --------------------: |
| CSV     | Row text        | No embedded schema |          No |            Yes |                   Low |
| JSON    | Record text     |   Usually external |         Yes |            Yes |                   Low |
| Avro    | Row binary      |                Yes |         Yes |             No |              Moderate |
| Parquet | Columnar binary |                Yes |         Yes |             No |                  High |
| ORC     | Columnar binary |                Yes |         Yes |             No |                  High |

A file format controls physical representation. It does not alone provide transactions, table history, safe concurrent writes, or table-level schema evolution.

---

# 37. Why plain Parquet is not a complete table

Suppose a “table” is represented by a directory of Parquet files:

```text
orders/
  file-001.parquet
  file-002.parquet
  file-003.parquet
```

Questions immediately arise:

* Which files are currently valid?
* Was `file-003` fully committed?
* Which files were replaced?
* What happens if two writers update simultaneously?
* How are deletes represented?
* How is schema evolution tracked?
* Which partition specification applies?
* How do readers obtain a consistent snapshot?
* How is historical state queried?

A file format describes files. A table format manages a collection of files as a reliable logical table.

---

# 38. What is a lakehouse?

A lakehouse combines:

* Object-storage economics and openness.
* Analytical file formats.
* Table-level metadata.
* Transactional commits.
* Schema enforcement and evolution.
* Query optimization.
* Multiple compute engines.
* Governance and catalog integration.

```text
Object storage
      +
Columnar data files
      +
Open table format
      +
Catalog
      +
Compute engines
      =
Lakehouse
```

A lakehouse is an architecture, not merely a product name or a set of Parquet files.

---

# 39. Open table formats

The major open table-format ecosystems in the syllabus are:

* Apache Iceberg.
* Delta Lake.
* Apache Hudi.

They provide different implementations of capabilities such as:

* Atomic commits.
* Snapshot isolation.
* Inserts, updates, and deletes.
* Schema evolution.
* Partition management.
* Time travel.
* Streaming ingestion.
* Compaction.
* Metadata-based planning.

They manage table state while data remains in object storage.

---

# 40. Apache Iceberg overview

Apache Iceberg is an open table format for large analytical datasets.

It separates:

* Data files.
* Delete files.
* Manifest files.
* Manifest lists.
* Table metadata.
* Catalog pointers.

Iceberg integrates with multiple processing engines and catalogs; its current documentation lists integrations including Spark, Flink, Kafka Connect, Hive, Trino, and several catalog implementations. [Apache Iceberg documentation](https://iceberg.apache.org/docs/latest/)

Conceptually:

```text
Catalog
   ↓
Current table metadata
   ↓
Current snapshot
   ↓
Manifest list
   ↓
Manifests
   ↓
Data and delete files
```

---

# 41. Iceberg metadata hierarchy

A simplified Iceberg table contains:

```text
Catalog entry
    ↓
Metadata file
    ↓
Snapshot
    ↓
Manifest list
    ↓
Manifest files
    ↓
Data files and delete files
```

## Catalog entry

Locates the current table metadata.

## Metadata file

Contains table-level information such as:

* Current snapshot.
* Schemas.
* Partition specifications.
* Properties.
* Snapshot history.

## Snapshot

Represents one committed table state.

## Manifest list

Lists manifests belonging to a snapshot.

## Manifest file

Lists data or delete files and their metadata.

## Data file

Contains table rows, commonly in Parquet, ORC, or Avro.

---

# 42. Iceberg snapshots

A snapshot represents a consistent table version.

Suppose:

```text
Snapshot 100:
files A, B, C

Snapshot 101:
files A, C, D
```

Snapshot 101 may have removed `B` and added `D`.

Readers using snapshot 100 continue to see:

```text
A, B, C
```

Readers using snapshot 101 see:

```text
A, C, D
```

The commit changes metadata rather than editing existing Parquet files in place.

Snapshots support:

* Consistent reads.
* Time travel.
* Rollback.
* Incremental processing.
* Auditability.
* Concurrent operations.

---

# 43. Copy-on-write metadata model

Iceberg operations generally create new files and metadata instead of mutating existing data files in place.

Conceptual commit:

```text
Read current metadata M1
       ↓
Write new data files
       ↓
Create new manifests
       ↓
Create metadata M2
       ↓
Atomically update catalog pointer M1 → M2
```

If the final pointer update fails, the previous table state remains valid.

Newly written but uncommitted files may become orphan files and require controlled cleanup.

---

# 44. Manifest files

Manifest files track data and delete files.

They may contain metadata such as:

* File path.
* File format.
* Partition values.
* Record count.
* File size.
* Column-level bounds.
* Null counts.
* Snapshot association.
* File status.

This allows query planning without recursively listing every object in the table directory.

A query engine can use manifests to determine:

```text
Which files might satisfy the query?
```

Only candidate files then need to be opened.

---

# 45. Manifest pruning

Suppose a query asks for:

```sql
WHERE event_date = DATE '2026-09-18'
```

The engine can use:

1. Partition specifications.
2. Manifest metadata.
3. File statistics.
4. Parquet row-group statistics.

Pruning can therefore occur at several levels:

```text
Skip irrelevant manifests
        ↓
Skip irrelevant data files
        ↓
Skip irrelevant row groups
        ↓
Read required columns
```

Efficient lakehouse queries depend as much on metadata organization as on file format.

---

# 46. Time travel

Time travel reads a previous table state.

Conceptually:

```sql
SELECT *
FROM customer_table
FOR VERSION AS OF <snapshot>;
```

or:

```text
Read table as of a timestamp.
```

Use cases include:

* Investigating a data incident.
* Reproducing a report.
* Comparing before and after a transformation.
* Restoring an earlier state.
* Reconstructing ML training data.
* Auditing historical publication.

Time travel works only while required metadata and files remain retained.

If snapshots or old files have expired, the older state can no longer be queried.

---

# 47. Rollback versus time travel

## Time travel

Reads an old snapshot without changing the current table.

```text
Current remains snapshot 105
Query snapshot 101
```

## Rollback

Changes the table’s current reference to a selected valid historical state or creates a new current state based on it.

Rollback should be governed because:

* Newer valid data may be hidden.
* Downstream consumers may observe a major state change.
* Streaming consumers may require special handling.
* Audit evidence must explain the action.

---

# 48. Iceberg schema evolution

Schema evolution changes the table structure without blindly interpreting columns by position.

Possible changes include:

* Add a column.
* Rename a column.
* Reorder columns.
* Remove a column.
* Promote compatible types.
* Modify nested structures.

Iceberg uses field identifiers to track column identity.

This matters because a renamed column remains the same logical field rather than appearing as:

```text
Delete old column
Add unrelated new column
```

Safe schema evolution still requires consumer compatibility checks and semantic governance.

---

# 49. Unsafe schema changes

Not every structural change should be performed directly.

Potentially dangerous changes include:

* Narrowing a numeric type.
* Reinterpreting a field’s meaning.
* Changing units.
* Changing identifier semantics.
* Making an optional field mandatory.
* Replacing local time with UTC without migration.
* Reusing a removed name for a different concept.

Example:

```text
amount:
Before = rupees
After  = paise
```

The physical type may remain integer while the semantic meaning changes completely.

---

# 50. Partition evolution

Partition evolution changes how future data is partitioned without rewriting all historical data immediately.

Example:

```text
Old specification:
partition by month(event_time)

New specification:
partition by day(event_time)
```

Old files remain governed by the old specification, while new files use the new specification.

The query engine evaluates each file using the appropriate partition specification.

This helps adapt to:

* Growing data volume.
* New query patterns.
* Partition skew.
* Changed retention strategy.
* Streaming requirements.

---

# 51. Hidden partitioning

In traditional path-based partitioning, users must know and correctly apply the physical partition column:

```sql
WHERE event_date = '2026-09-18'
```

even if the business query filters:

```sql
WHERE event_timestamp >= ...
```

With hidden partitioning, the table format applies a transform such as:

```text
day(event_timestamp)
```

The user filters on the logical column, and the engine derives the appropriate partition pruning.

Benefits include:

* Reduced user error.
* Logical queries independent of physical layout.
* Easier partition evolution.
* Cleaner table interfaces.

---

# 52. Iceberg partition transforms

Possible partition transforms include:

* Identity.
* Year.
* Month.
* Day.
* Hour.
* Bucket.
* Truncate.

Examples:

```text
days(event_time)
bucket(32, customer_id)
truncate(4, postal_code)
```

Transforms should be chosen based on:

* Data distribution.
* Query filters.
* Write rate.
* File size.
* Skew.
* Privacy considerations.
* Evolution needs.

---

# 53. Deletes in Iceberg

Delete behaviour can conceptually use two broad approaches.

## Copy-on-write

Affected data files are rewritten without deleted rows.

Advantages:

* Fast subsequent reads.
* Simpler read path.

Disadvantages:

* Expensive for frequent small updates or deletes.

## Merge-on-read

Delete information is written separately and applied during reads.

Advantages:

* Faster writes.
* Suitable for frequent changes.

Disadvantages:

* More expensive reads.
* Requires maintenance and compaction.

Delete files may identify:

* Row positions.
* Equality conditions or keys.

The exact support depends on table-format and engine versions.

---

# 54. Iceberg compaction

Iceberg maintenance may include:

* Rewriting small data files.
* Rewriting delete files.
* Reorganizing manifests.
* Sorting or clustering data.
* Expiring old snapshots.
* Removing orphan files.

These are different operations.

For example:

```text
Expire snapshot
```

removes historical metadata eligibility, while:

```text
Rewrite data files
```

changes physical file layout.

Maintenance should be scheduled based on measured table behaviour, not applied indiscriminately.

---

# 55. Snapshot expiration

Snapshots accumulate over time.

Unlimited retention increases:

* Metadata volume.
* Storage usage.
* Planning overhead.
* Orphan-cleanup complexity.

Snapshot expiration removes old snapshot references according to policy.

Before expiration, determine:

* Required time-travel window.
* Audit requirements.
* Streaming consumer progress.
* Branch and tag references.
* Recovery needs.
* ML reproducibility requirements.
* Legal holds.

A snapshot cannot be safely removed merely because it is old.

---

# 56. Orphan-file cleanup

An orphan file exists in storage but is not referenced by valid table metadata.

Causes include:

* Failed commits.
* Abandoned jobs.
* Interrupted compaction.
* Manual file operations.
* Incorrect migration.

Cleanup must be conservative.

A recently written file may appear unreferenced while a valid job is still preparing to commit it. Therefore, cleanup normally uses an age threshold and table-aware inspection.

Directly deleting “unreferenced-looking” objects can destroy in-progress work.

---

# 57. Concurrent writes

Multiple writers may attempt to update the same table.

Example:

```text
Writer A reads metadata version 100
Writer B reads metadata version 100

Writer A commits version 101
Writer B tries to commit based on version 100
```

The table format must detect conflicts.

If operations do not logically conflict, the failed writer may refresh metadata and retry.

If they modify overlapping data, the system may reject the operation for explicit resolution.

---

# 58. Optimistic concurrency control

Iceberg uses an optimistic approach:

1. Read the current table state.
2. Prepare new files and metadata.
3. Validate assumptions.
4. Attempt an atomic metadata commit.
5. Retry or fail if the base state changed.

This avoids holding long locks during large distributed writes.

Correctness depends on:

* Atomic catalog operations.
* Conflict validation.
* Idempotent retry logic.
* Engine integration.
* Reliable object storage.

---

# 59. Catalog integration

A catalog maps logical table names to current metadata.

Conceptually:

```text
analytics.customer.orders
          ↓
Catalog
          ↓
Current Iceberg metadata file
          ↓
Snapshot and manifests
```

Catalog responsibilities may include:

* Table discovery.
* Namespace management.
* Atomic commit coordination.
* Metadata location.
* Authentication.
* Authorization integration.
* Table properties.
* Governance hooks.

Apache Iceberg supports multiple catalog approaches, including REST-compatible, JDBC, Hive, cloud, and versioned-catalog integrations. [Apache Iceberg catalog integrations](https://iceberg.apache.org/docs/latest/)

---

# 60. Catalog as the lakehouse control plane

In a modern lakehouse, the catalog increasingly acts as the control plane.

It can coordinate:

* Table identity.
* Current metadata.
* Namespaces.
* Access policies.
* Discovery.
* Ownership.
* Lineage.
* Tags and classification.
* Engine interoperability.
* Audit events.
* Credential vending or scoped access.
* Branches and table references.

The storage layer holds objects. The catalog determines how governed engines understand and access those objects.

```text
Users and engines
        ↓
Catalog and policy plane
        ↓
Table metadata
        ↓
Object storage
```

---

# 61. Catalog failure considerations

Because the catalog controls table discovery and commits, it becomes critical infrastructure.

It needs:

* High availability.
* Backup and recovery.
* Authentication.
* Authorization.
* Audit logging.
* Concurrency safety.
* Low-latency metadata access.
* Version compatibility.
* Disaster-recovery planning.

Data files may remain intact while the platform becomes unusable if catalog state is lost or corrupted.

Therefore:

```text
Storage durability alone ≠ table recoverability
```

---

# 62. Delta Lake

Delta Lake is an open table format that adds transactional table capabilities to data lakes.

Its model is centered around a transaction log that records table actions such as:

* Added files.
* Removed files.
* Metadata changes.
* Protocol changes.
* Commit information.

Capabilities include:

* ACID-style table transactions.
* Schema enforcement and evolution.
* Time travel.
* Batch and streaming access.
* Updates, deletes, and merges.
* Change-data processing capabilities.

Delta Lake documentation describes these capabilities around its transaction-log-based table model. [Delta Lake documentation](https://docs.delta.io/index.html)

Delta is especially common in Spark- and Databricks-oriented ecosystems, though interoperability extends beyond one engine.

---

# 63. Apache Hudi

Apache Hudi is a lakehouse platform and table format with strong emphasis on incremental data processing and mutable datasets.

Important concepts include:

* Copy-on-write tables.
* Merge-on-read tables.
* Record-level updates.
* Upserts and deletes.
* Incremental queries.
* Commit timelines.
* Compaction.
* Clustering.
* Indexing.

Hudi is particularly useful for:

* CDC ingestion.
* Frequently updated records.
* Near-real-time analytical tables.
* Incremental downstream consumption.

[Apache Hudi’s overview](https://hudi.apache.org/docs/overview/) presents Hudi as a transactional data-lake platform supporting database-like operations and incremental processing.

---

# 64. Iceberg versus Delta Lake versus Hudi

| Dimension             | Iceberg                                               | Delta Lake                                                   | Hudi                                        |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| Core orientation      | Open analytical table format                          | Transaction-log lakehouse format                             | Incremental and mutable lakehouse platform  |
| Strong reputation     | Multi-engine interoperability and metadata design     | Spark/Databricks ecosystem and unified batch-stream patterns | Upserts, CDC and incremental processing     |
| Table history         | Snapshots                                             | Transaction-log versions                                     | Commit timeline                             |
| Partition abstraction | Strong hidden partitioning and evolution              | Supported through its table features                         | Partition and indexing strategies           |
| Frequent updates      | Supported through engine operations and delete models | Merge/update/delete workflows                                | Central strength                            |
| Streaming             | Spark, Flink and connectors                           | Strong batch/stream integration                              | Strong incremental ingestion and queries    |
| Catalog model         | Multiple catalog implementations                      | Catalog integration varies by environment                    | Metadata and timeline services/integrations |

The decision should be based on:

* Existing engines.
* Required interoperability.
* Update frequency.
* Streaming latency.
* Catalog strategy.
* Operational skills.
* Governance.
* Vendor portability.
* Workload benchmarks.

No format is universally best.

---

# 65. The lakehouse architecture in 2026

The practical lakehouse in 2026 is best understood as several independently evolvable planes:

```text
Ingestion plane
      ↓
Storage plane
      ↓
Table-format plane
      ↓
Catalog and governance plane
      ↓
Compute plane
      ↓
Semantic and serving plane
```

## Ingestion plane

Receives:

* Batch files.
* APIs.
* CDC.
* Event streams.
* Documents.
* AI content.

## Storage plane

Provides durable object storage.

## Table-format plane

Provides snapshots, commits, evolution, deletes, and metadata.

## Catalog and governance plane

Provides discovery, policies, ownership, lineage, and table identity.

## Compute plane

Includes:

* SQL engines.
* Spark.
* Flink.
* Python.
* ML engines.
* Vector-processing systems.

## Serving plane

Provides:

* BI datasets.
* APIs.
* Feature tables.
* Search indexes.
* Vector indexes.
* Agent-access interfaces.

The key architectural shift is that “lakehouse” is not merely storage plus Spark. It is a governed, multi-engine data platform built around open table state and a strong catalog.

---

# 66. Storage and compute separation

Traditional systems often combine storage and compute in one cluster.

A lakehouse separates them:

```text
Object storage
      ↑
 ┌────┼──────────┐
Spark Flink Trino ML engine
```

Benefits:

* Independent scaling.
* Different engines for different workloads.
* Compute can be temporary.
* Storage persists when clusters stop.
* Better workload isolation.
* Potential reduction in idle compute cost.

Challenges:

* Network transfer.
* Object-store latency.
* Cache management.
* Metadata coordination.
* Engine compatibility.
* Egress cost.
* Security across multiple engines.

Separation is valuable only when the architecture controls these trade-offs.

---

# 67. Streaming-first lakehouse

A streaming-first lakehouse treats continuous changes as a primary input rather than an afterthought.

```text
Operational databases
        ↓ CDC
Event broker
        ↓
Stream processor
        ↓
Lakehouse table
        ↓
Incremental consumers
```

Important requirements include:

* Checkpointing.
* Idempotency.
* Exactly-once effect where achievable.
* Event-time handling.
* Late data.
* Upserts and deletes.
* Small-file management.
* Schema evolution.
* Incremental reads.
* Compaction.
* Freshness monitoring.

---

# 68. Micro-batch versus continuous streaming writes

## Micro-batch

Accumulates records for a short interval and commits them together.

Advantages:

* Fewer files.
* Lower commit frequency.
* Simpler table maintenance.

Trade-off:

* Slightly higher latency.

## Continuous or very frequent commits

Writes data with very low delay.

Advantages:

* Lower freshness latency.

Trade-offs:

* Many small files.
* High metadata growth.
* Frequent catalog commits.
* More compaction.

The correct latency should be based on business requirements.

A five-second pipeline is not automatically better than a five-minute pipeline if no consumer needs the difference.

---

# 69. Streaming and compaction interaction

Streaming often creates small files because each checkpoint commits a limited amount of data.

A common design separates:

```text
Fast ingestion path
        ↓
Immediately queryable small files
        ↓
Asynchronous compaction
        ↓
Optimized analytical layout
```

Compaction must not disrupt active readers or writers.

Open table formats make this possible by publishing optimized files through a new atomic snapshot.

---

# 70. Incremental consumption

An incremental consumer asks:

```text
What changed after snapshot or commit X?
```

Rather than rereading the entire table.

Use cases:

* Updating a downstream mart.
* Synchronizing a search index.
* Refreshing an embedding index.
* Feeding a feature store.
* Publishing changed entities.
* Replicating data products.

Incremental semantics must clearly define whether the consumer receives:

* Appended rows only.
* Updated row versions.
* Deletes.
* File-level changes.
* Row-level changes.
* Before and after images.

---

# 71. Lakehouse economics

Lakehouse cost includes more than object-storage capacity.

A useful model is:

```text
Storage
+ API requests
+ metadata operations
+ compute
+ network transfer
+ catalog
+ compaction
+ snapshot retention
+ observability
+ engineering operations
```

Cheap object storage can still produce an expensive platform if:

* Queries scan excessive data.
* Small files increase requests.
* Compaction is uncontrolled.
* Compute clusters remain idle.
* Data is duplicated across zones.
* Retention is indefinite.
* Cross-region transfer is frequent.
* Several engines maintain separate caches or copies.

---

# 72. Cost drivers

## Storage cost

Affected by:

* Raw duplication.
* Time-travel history.
* Replicas.
* Delete files.
* Temporary files.
* Unexpired snapshots.
* Compaction output.

## Compute cost

Affected by:

* Full-table scans.
* File rewrites.
* Joins.
* Clustering.
* Backfills.
* Repeated model training.
* Poor partitioning.

## Request cost

Affected by:

* File listing.
* Small-file reads.
* Metadata access.
* Frequent writes.
* Compaction.

## Network cost

Affected by:

* Cross-region reads.
* Cross-cloud processing.
* Data export.
* Remote model training.

---

# 73. Economic optimization

Useful strategies include:

* Right-size files.
* Partition based on real query patterns.
* Apply column pruning and predicate pushdown.
* Compact only where valuable.
* Expire snapshots according to policy.
* Remove safe orphan files.
* Cache frequently accessed metadata or data.
* Separate critical and exploratory compute.
* Use workload-aware retention.
* Monitor cost per table and data product.
* Avoid uncontrolled copies.
* Co-locate compute and storage where appropriate.

Cost should be attributed to products and consumers rather than treated only as a platform-wide total.

---

# 74. Warehouse versus lakehouse decisions

Choose based on workload and operating model.

A warehouse may be preferable when:

* Most data is structured.
* BI is the dominant use case.
* A managed platform is desired.
* Strong performance with low operational effort matters.
* One SQL ecosystem is sufficient.
* Open multi-engine access is not essential.

A lakehouse may be preferable when:

* Data types are diverse.
* Large-scale raw retention is needed.
* Several engines must access common data.
* ML and AI workloads are central.
* Open formats and portability matter.
* Storage and compute must scale independently.
* Streaming and historical processing share data.

Many enterprises use both.

---

# 75. Hybrid architecture

A hybrid architecture might use:

```text
Operational sources
        ↓
Lakehouse raw and standardized data
        ↓
 ┌──────┴─────────────┐
ML and AI processing  Warehouse business marts
        ↓                    ↓
Features and indexes      BI dashboards
```

The lakehouse may act as:

* Durable raw store.
* Multi-engine processing layer.
* ML training foundation.
* Long-term history.

The warehouse may act as:

* Highly optimized BI serving layer.
* Governed finance reporting layer.
* Low-administration SQL platform.

The decision should be made per workload, not ideologically.

---

# 76. Data residency

Data residency defines where data must be physically stored or processed.

Requirements may apply by:

* Country.
* Region.
* Customer.
* Data category.
* Regulatory regime.
* Contract.
* Cloud boundary.

Example:

```text
Indian customer health data:
Storage region = India
Processing region = India
Backup region = approved Indian region
```

Residency is different from sovereignty and localization, though the terms are sometimes used loosely.

---

# 77. Residency-aware design

A residency-aware lakehouse should control:

* Bucket region.
* Catalog region.
* Processing location.
* Backup location.
* Replication.
* Encryption keys.
* Logs.
* Temporary files.
* Cache location.
* Query-result location.
* Model-training location.
* Cross-border network paths.

A common mistake is to keep primary data in the required region while allowing:

* Logs to leave the region.
* Temporary query results to leave.
* AI prompts to leave.
* Embeddings to be created elsewhere.
* Backups to replicate globally.

Residency must cover the complete processing path.

---

# 78. Multi-region lakehouse patterns

Possible patterns include:

## Regional isolation

Each region has independent storage, catalogs, and compute.

Advantages:

* Strong residency control.
* Reduced cross-region exposure.

Challenges:

* Duplicate platform operation.
* Cross-region analytics complexity.

## Federated catalog

Regional tables remain local but are discoverable through a broader logical catalog.

## Approved aggregation

Sensitive records remain local while approved aggregates move to a central region.

## Tokenized or de-identified sharing

Only approved transformed data crosses regional boundaries.

Every pattern requires explicit governance and threat analysis.

---

# 79. Security in a lakehouse

A secure lakehouse should provide:

* Encryption in transit.
* Encryption at rest.
* Key-management controls.
* Least-privilege identities.
* Table, row, and column authorization.
* Object-storage policies.
* Catalog authorization.
* Audit logging.
* Secret management.
* Network boundaries.
* Data masking.
* Classification.
* Retention and deletion enforcement.

Direct object access can bypass table-level controls.

Where possible, users and engines should access data through governed catalog and policy interfaces rather than unrestricted bucket credentials.

---

# 80. AI-ready lakehouse design

An AI-ready lakehouse supports:

* Structured analytical data.
* Documents.
* Images.
* Audio and video.
* Feature tables.
* Labels.
* Embeddings.
* Retrieval indexes.
* Model outputs.
* Evaluation datasets.
* Provenance metadata.

A conceptual architecture is:

```text
Governed source objects
        ↓
Parsed and standardized content
        ↓
Versioned chunks and features
        ↓
Embeddings and derived representations
        ↓
Serving indexes
        ↓
AI applications and agents
```

The lakehouse should remain the governed source of truth for derived AI assets.

---

# 81. Metadata for AI data

AI-ready objects and records should include:

```text
source_id
source_version
content_hash
created_at
ingested_at
valid_from
valid_to
owner
classification
consent
quality_status
parser_version
chunking_version
embedding_model
embedding_version
index_version
retention_policy
```

This allows the platform to answer:

* Which source produced this chunk?
* Is the source still valid?
* Which parser generated it?
* Which embedding model was used?
* Does the user have permission?
* Is the content current?
* Can the result be reproduced?

---

# 82. Unstructured-data lifecycle

A governed document pipeline may perform:

```text
Receive document
      ↓
Validate type and scan for malware
      ↓
Store immutable original
      ↓
Extract text and structure
      ↓
Classify and redact
      ↓
Create versioned chunks
      ↓
Generate embeddings
      ↓
Publish authorized retrieval index
```

Each derived object should maintain lineage to:

* Original document.
* Document version.
* Extraction version.
* Chunk.
* Embedding.
* Serving index.

Deleting or restricting the source should propagate to derived assets.

---

# 83. Embeddings as derived data

An embedding is not the authoritative source record.

It is a derived representation dependent on:

* Source content.
* Chunking strategy.
* Model.
* Model version.
* Preprocessing.
* Language handling.
* Dimensionality.
* Normalization.

If the source changes, the system must decide whether to:

* Recompute all chunks.
* Recompute only changed chunks.
* Mark previous embeddings inactive.
* Preserve historical embeddings.
* Remove deleted content from indexes.
* Rebuild downstream caches.

The lakehouse can retain versioned source and derivation metadata while a vector database provides low-latency retrieval.

---

# 84. Grounding AI agents on governed data

An AI agent should not receive unrestricted access to raw lake data.

A governed grounding path is:

```text
User request
      ↓
Identity and purpose evaluation
      ↓
Authorized catalog assets
      ↓
Semantic and quality-aware retrieval
      ↓
Policy-filtered context
      ↓
Agent response
      ↓
Citations, provenance and audit
```

The agent should understand:

* Table or document meaning.
* Freshness.
* Validity interval.
* Quality status.
* Ownership.
* Security classification.
* Allowed use.
* Known limitations.
* Source reliability.

---

# 85. Agent-safe table access

An agent-access layer may expose:

* Approved views.
* Semantic metrics.
* Parameterized queries.
* Read-only table tools.
* Bounded retrieval APIs.
* Row- and column-filtered results.

It should avoid exposing:

* Raw bucket credentials.
* Unrestricted SQL.
* Quarantined data by default.
* Deleted historical versions.
* Sensitive columns without purpose validation.
* Arbitrary file paths.
* Untrusted metadata as instructions.

Agent-generated queries should be:

* Authorized.
* Resource-limited.
* Logged.
* Explainable.
* Checked for excessive scanning.
* Associated with user identity and purpose.

---

# 86. Preventing stale AI grounding

A retrieval system can become stale when:

* Source documents change.
* Old chunks remain active.
* Embeddings fail to refresh.
* Deleted content remains indexed.
* Permissions change.
* Table snapshots advance but indexes do not.

Useful controls include:

* Source version in every derived item.
* Current-state flags.
* Index publication checkpoints.
* Reconciliation between source and index.
* Tombstone propagation.
* Freshness SLOs.
* Version-aware retrieval.
* Atomic index promotion.

A vector index should be treated as a governed derived data product.

---

# 87. Lakehouse observability

Monitor several layers.

## Storage

* Bytes stored.
* Object count.
* Request rate.
* Failed requests.
* Cross-region transfer.

## Files

* File-count growth.
* Average and percentile sizes.
* Small-file ratio.
* Compression ratio.
* Corrupt files.

## Tables

* Commit success.
* Snapshot age.
* Manifest count.
* Delete-file count.
* Schema changes.
* Partition growth.
* Orphan-file estimates.

## Queries

* Files scanned.
* Bytes scanned.
* Planning time.
* Pruning effectiveness.
* Runtime.
* Failure rate.

## Products

* Freshness.
* Completeness.
* Quality.
* Usage.
* Cost.
* Consumer impact.

---

# 88. Lakehouse maintenance

Maintenance may include:

```text
Compact data files
Rewrite delete files
Rewrite manifests
Expire snapshots
Remove orphan files
Recluster data
Refresh statistics
Validate metadata
```

These operations have different safety rules.

A maintenance scheduler should consider:

* Table activity.
* Write frequency.
* Query patterns.
* Snapshot-retention policy.
* Streaming checkpoints.
* Available compute.
* Business deadlines.
* Concurrent writes.

Maintenance should be observable and attributable to its cost benefit.

---

# 89. Disaster recovery

A lakehouse disaster-recovery plan must protect more than data files.

It should cover:

* Object data.
* Table metadata.
* Catalog state.
* Access policies.
* Encryption keys.
* Schema registry.
* Workflow configuration.
* Lineage metadata.
* Audit logs.
* Recovery procedures.

Recovery objectives should define:

```text
RPO:
How much recent data may be lost?

RTO:
How quickly must service be restored?
```

A bucket replica without catalog recovery may not provide an operationally usable lakehouse.

---

# 90. Common lakehouse mistakes

## Mistake 1: Treating object storage like a file system

**Problem:** Rename, locking, listing, and atomicity assumptions fail.

**Better approach:** Design for object semantics and use a table format.

## Mistake 2: Calling a folder of Parquet files a lakehouse

**Problem:** No reliable table state, transactions, or evolution.

**Better approach:** Add a table format and catalog.

## Mistake 3: Partitioning by a high-cardinality identifier

**Problem:** Millions of tiny partitions and files.

**Better approach:** Use query-aligned transforms, bucketing, or clustering.

## Mistake 4: Streaming tiny files indefinitely

**Problem:** Metadata and query-planning overhead grows continuously.

**Better approach:** Balance commit latency with asynchronous compaction.

## Mistake 5: Deleting old-looking objects manually

**Problem:** Active snapshots may still reference them.

**Better approach:** Use table-aware snapshot expiration and orphan cleanup.

## Mistake 6: Retaining every snapshot forever

**Problem:** Storage and metadata grow without bound.

**Better approach:** Define recovery, audit, and time-travel retention.

## Mistake 7: Ignoring catalog availability

**Problem:** Durable files become difficult or impossible to use correctly.

**Better approach:** Treat the catalog as critical control-plane infrastructure.

## Mistake 8: Assuming schema compatibility implies semantic compatibility

**Problem:** Correctly typed data silently changes meaning.

**Better approach:** Govern schemas and business contracts.

## Mistake 9: Choosing a table format only by popularity

**Problem:** The format may not fit the engine, update pattern, or operating model.

**Better approach:** Compare requirements and benchmark real workloads.

## Mistake 10: Claiming storage–compute separation eliminates coupling

**Problem:** Engines still depend on catalogs, metadata, networking, and compatible semantics.

**Better approach:** Design and test the complete control and data paths.

## Mistake 11: Ignoring delete propagation to AI indexes

**Problem:** Deleted or restricted content remains retrievable.

**Better approach:** Govern derived embeddings and indexes through source versioning and tombstones.

## Mistake 12: Giving agents direct bucket access

**Problem:** Table, privacy, and governance controls can be bypassed.

**Better approach:** Expose governed semantic or retrieval interfaces.

---

# 91. Practical design exercises

## Exercise 1: Choose a file format

A platform receives:

* High-volume CDC events.
* Daily analytical queries.
* Occasional full-record replay.

Decide:

1. Format for broker events.
2. Format for analytical tables.
3. Compression strategy.
4. Schema-management approach.
5. Historical replay method.

A likely design uses a row-oriented event format for transport and a columnar format for analytics.

---

## Exercise 2: Partition a telemetry table

A telemetry table receives 500 million events per day.

Queries usually filter by:

* Event date.
* Device region.
* Device ID for investigations.

Determine:

1. Primary partition transform.
2. Whether region belongs in the partition specification.
3. Whether device ID should be bucketed.
4. Target file size.
5. Compaction frequency.
6. Late-event policy.

---

## Exercise 3: Design retention

Define retention for:

* Raw events.
* Curated tables.
* Table snapshots.
* Temporary files.
* Quarantine.
* Audit logs.
* Embeddings.
* Deleted documents.

Explain why object lifecycle rules cannot independently delete active Iceberg files.

---

## Exercise 4: Handle concurrent writers

Two jobs update different partitions while a third job performs compaction.

Define:

* Expected conflict behaviour.
* Retry rules.
* Catalog requirements.
* Snapshot validation.
* Monitoring.
* Recovery from abandoned files.

---

## Exercise 5: Ground an AI agent

An agent answers questions about customer-support records.

Define:

* Governed source tables.
* Approved document corpus.
* Row-level access.
* Classification metadata.
* Embedding versions.
* Freshness requirement.
* Citation requirements.
* Delete propagation.
* Query-cost limits.

---

# 92. Conceptual mini-project designs

These are architectural exercises only; the requested build section remains omitted.

## Mini-project 1: Batch lakehouse

```text
PostgreSQL and files
       ↓
Raw object storage
       ↓
Validated Parquet
       ↓
Iceberg standardized tables
       ↓
Curated analytical products
       ↓
SQL query engine
```

Define:

* Bucket boundaries.
* Object keys.
* File formats.
* Table schemas.
* Partition transforms.
* Catalog.
* Compaction.
* Snapshot retention.
* Quality gates.

## Mini-project 2: CDC lakehouse

```text
PostgreSQL
     ↓ CDC
Kafka
     ↓
Stream processor
     ↓
Iceberg/Hudi/Delta table
     ↓
Incremental downstream models
```

Define:

* Event identity.
* Ordering.
* Upserts.
* Deletes.
* Checkpoints.
* File sizing.
* Compaction.
* Incremental consumption.
* Schema evolution.

## Mini-project 3: AI-ready document lakehouse

```text
PDF and document sources
       ↓
Immutable originals
       ↓
Extracted structured text
       ↓
Classified versioned chunks
       ↓
Embeddings
       ↓
Governed retrieval index
```

Define:

* Document identity.
* Versioning.
* Access classification.
* Parser lineage.
* Chunk identity.
* Embedding version.
* Deletion propagation.
* Agent permissions.

---

# 93. Interview questions and answers

### 1. What is a data lake?

A data lake is a scalable storage architecture, commonly based on object storage, that retains structured, semi-structured, and unstructured data for multiple processing and consumption patterns.

### 2. What is object storage?

Object storage stores data as independently addressed objects in buckets, using object keys and metadata rather than traditional block or hierarchical file-system semantics.

### 3. Why is object storage not a normal file system?

Directory paths are usually key prefixes; operations such as rename, locking, listing, and atomic multi-file updates behave differently from a traditional file system.

### 4. Why retain immutable raw data?

It supports replay, auditing, reconciliation, recovery from transformation defects, and creation of future data products.

### 5. What are raw, standardized, and curated zones?

Raw preserves source-aligned data, standardized applies technical cleaning and validation, and curated models governed business entities and consumer products.

### 6. What is the small-file problem?

Large numbers of small files increase metadata, listing, scheduling, object-request, planning, and decompression overhead.

### 7. What is compaction?

Compaction rewrites many small files into fewer optimized files while preserving the table’s logical data.

### 8. How should a partition key be selected?

It should align with frequent filters, distribute data reasonably, have manageable cardinality, and avoid producing tiny or highly skewed partitions.

### 9. What is the difference between event-time and ingestion-time partitioning?

Event-time partitioning supports business-time queries but must handle late data. Ingestion-time partitioning simplifies arrival management but may be inefficient for event-time analysis.

### 10. How do CSV and JSON differ from Parquet?

CSV and JSON are text-based row or record representations. Parquet is a typed binary columnar format optimized for analytical scans.

### 11. What is Avro best suited for?

Avro is well suited to typed row-oriented records, event serialization, CDC payloads, and schema-evolving message streams.

### 12. What are the advantages of Parquet?

Parquet supports column pruning, compression, encoding, statistics, nested data, parallel reads, and predicate-based skipping.

### 13. What is predicate pushdown?

Predicate pushdown applies query filters near the data-reading layer so irrelevant partitions, files, row groups, or records can be skipped.

### 14. What is column pruning?

Column pruning reads only the columns required by a query, reducing I/O, decompression, memory, and cost.

### 15. What is splittability?

Splittability is the ability to process independent sections of a file in parallel.

### 16. Why is Parquet not a table format?

Parquet defines individual files but not atomic multi-file commits, snapshots, concurrent writes, time travel, table history, or table-level evolution.

### 17. What is a lakehouse?

A lakehouse combines object storage and open analytical files with transactional table metadata, catalogs, governance, and multiple processing engines.

### 18. What problem do open table formats solve?

They provide reliable table state, atomic commits, snapshots, updates, deletes, evolution, and metadata-based planning over object-store files.

### 19. What is an Iceberg snapshot?

A snapshot is a committed, consistent version of an Iceberg table referencing a specific set of manifests, data files, and delete files.

### 20. What is a manifest?

A manifest is metadata describing data or delete files, including paths, partitions, record counts, and column statistics.

### 21. How does Iceberg support time travel?

It retains snapshot history, allowing readers to select a prior snapshot or table state while the necessary metadata and files remain available.

### 22. What is schema evolution?

Schema evolution changes the table structure while preserving field identity and compatibility rules.

### 23. What is partition evolution?

Partition evolution changes the partition specification for future files without requiring all historical files to be immediately rewritten.

### 24. What is hidden partitioning?

Hidden partitioning lets users filter logical columns while the table format derives physical partition pruning through configured transforms.

### 25. How does Iceberg handle concurrent writes?

It uses optimistic concurrency: writers prepare changes, validate against the current state, and atomically commit through the catalog or retry after conflicts.

### 26. What is the role of an Iceberg catalog?

The catalog maps logical table names to current metadata and supports discovery, namespaces, atomic commits, and governance integration.

### 27. How does Delta Lake manage table state?

Delta Lake records table actions and versions through a transaction log.

### 28. What is Hudi particularly strong at?

Hudi emphasizes upserts, deletes, CDC ingestion, incremental processing, record-level change management, compaction, and clustering.

### 29. What is copy-on-write?

Copy-on-write rewrites affected data files during updates, increasing write cost but simplifying and accelerating later reads.

### 30. What is merge-on-read?

Merge-on-read records changes separately and combines them during reads, reducing write latency at the cost of more complex reads and maintenance.

### 31. What does storage–compute separation mean?

Data persists in shared object storage while independent compute engines start, scale, process, and stop separately.

### 32. What is a streaming-first lakehouse?

It treats continuous changes, CDC, incremental commits, late data, and streaming consumers as primary architectural requirements.

### 33. Why does streaming create small files?

Low-latency pipelines commit small batches frequently, producing many files unless buffering and compaction are used.

### 34. What is incremental consumption?

It reads only changes since a known snapshot, commit, or checkpoint instead of scanning the complete table.

### 35. What drives lakehouse cost?

Storage, object requests, compute, network transfer, catalogs, metadata processing, compaction, retention, observability, and engineering operations.

### 36. When is a warehouse preferable to a lakehouse?

A warehouse may be preferable for mainly structured BI workloads requiring a tightly managed, optimized SQL experience with low platform-operation effort.

### 37. When is a lakehouse preferable?

A lakehouse may be preferable for diverse data, multi-engine access, ML and AI, open-format requirements, large-scale history, and separated storage and compute.

### 38. What is data residency?

Data residency specifies geographic or jurisdictional requirements for storing and potentially processing data.

### 39. What makes a lakehouse AI-ready?

It preserves governed structured and unstructured sources, versions, provenance, classifications, features, chunks, embeddings, evaluation data, and delete propagation.

### 40. How should AI agents access lakehouse data?

Through authorized catalogs, semantic models, governed views, parameterized tools, and policy-aware retrieval—not unrestricted bucket credentials.

---

# 94. Phase-end knowledge check

1. What differentiates a data lake from a warehouse?
2. What information does an object contain?
3. Why are object-key prefixes not true directories?
4. When should separate buckets be used?
5. Why should sensitive information not appear in object keys?
6. How do structured, semi-structured, and unstructured data differ?
7. Why is immutable raw retention useful?
8. Why does immutability not override privacy deletion?
9. What responsibilities belong to raw, standardized, and curated zones?
10. What causes the small-file problem?
11. Why can extremely large files also be inefficient?
12. What does compaction do?
13. How is sorting compaction different from bin packing?
14. What makes a useful partition field?
15. Why is partitioning by unique customer ID usually harmful?
16. How does partition skew affect processing?
17. How do event-time and ingestion-time partitioning differ?
18. What should a retention policy consider?
19. Why can an object lifecycle rule corrupt a lakehouse table?
20. When is CSV appropriate?
21. Why is JSON expensive for analytics?
22. Why is Avro useful for event streams?
23. How does Parquet organize data?
24. What is the difference between encoding and compression?
25. How do column pruning and predicate pushdown differ?
26. Why does splittability matter?
27. Why is a directory of Parquet files not a complete table?
28. What capabilities define a lakehouse?
29. Which problems do open table formats solve?
30. How is an Iceberg snapshot related to manifests?
31. What information exists in manifest files?
32. How does manifest pruning improve queries?
33. What is required for time travel to remain available?
34. How does rollback differ from time travel?
35. Why are field IDs important for schema evolution?
36. How can a semantic change bypass structural validation?
37. How does partition evolution avoid rewriting all history?
38. What does hidden partitioning hide from consumers?
39. When is copy-on-write preferable?
40. When is merge-on-read preferable?
41. Why are snapshot expiration and orphan cleanup separate operations?
42. How does optimistic concurrency handle competing writers?
43. Why is the catalog a control plane?
44. What must be recovered besides object files after a disaster?
45. How do Iceberg, Delta Lake, and Hudi differ in emphasis?
46. What layers form a practical 2026 lakehouse?
47. What are the benefits and costs of storage–compute separation?
48. Why does streaming require compaction?
49. What semantics should an incremental consumer understand?
50. What costs exist beyond object-storage capacity?
51. When should a warehouse and lakehouse be used together?
52. What components must remain inside a residency boundary?
53. How can direct bucket access bypass governance?
54. What metadata makes unstructured data AI-ready?
55. Why are embeddings treated as derived data?
56. How should source deletion propagate to vector indexes?
57. What information should an agent receive about retrieved data?
58. How can stale AI grounding be detected?
59. Which lakehouse maintenance operations should be monitored?
60. What makes a lakehouse production-ready?

---

# Phase 1.6 summary

Data lakes provide scalable storage, while lakehouses add reliable table semantics, governance, and multi-engine processing.

The major lessons are:

* **Object storage** stores independently addressed objects in buckets and behaves differently from a conventional file system.
* **Immutable raw data** supports replay, audit, reconciliation, and recovery but remains subject to retention and privacy requirements.
* **Raw, standardized, and curated zones** represent increasing levels of validation and business trust.
* **File sizing, partitioning, and compaction** strongly affect both performance and cost.
* The **small-file problem** can overwhelm metadata and query planning even when total data volume is moderate.
* **CSV and JSON** are useful interchange formats; **Avro** suits row-oriented records and events; **Parquet and ORC** suit analytical scans.
* **Column pruning, predicate pushdown, compression, encoding, and splittability** reduce analytical query work.
* A file format such as Parquet does not provide complete table semantics.
* **Open table formats** add atomic commits, snapshots, updates, deletes, evolution, and time travel.
* **Apache Iceberg** organizes table state through metadata files, snapshots, manifest lists, manifests, and data/delete files.
* **Schema evolution** preserves field identity, while **partition evolution** allows physical layout to change over time.
* **Hidden partitioning** separates logical queries from physical partition details.
* **Optimistic concurrency and catalog coordination** support safe concurrent writes.
* **Delta Lake** emphasizes transaction-log-based lakehouse capabilities.
* **Apache Hudi** emphasizes mutable records, CDC, upserts, incremental processing, and compaction.
* The modern lakehouse uses separate **ingestion, storage, table, catalog, compute, and serving planes**.
* **Streaming-first architecture** requires checkpoints, frequent commits, late-data handling, small-file control, and incremental consumption.
* **Lakehouse economics** include compute, requests, metadata, network, maintenance, and operational cost—not only storage.
* **Warehouse and lakehouse architectures** are often complementary.
* **Data residency** must cover data, metadata, logs, caches, backups, embeddings, and processing.
* An **AI-ready lakehouse** governs sources, documents, chunks, features, embeddings, models, and derived indexes.
* AI agents should access lakehouse data through **authorized catalogs, semantic interfaces, and policy-aware retrieval**, not unrestricted object access.

The build section and Layer 1 completion project have been omitted as requested. I will begin **Layer 2, Phase 2.1: Data Quality** only when you explicitly ask for the next phase.
