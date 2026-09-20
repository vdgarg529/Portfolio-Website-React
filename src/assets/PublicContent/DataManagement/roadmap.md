
# Data Management and Agentic Data Engineering Roadmap

## Overall progression

```text
Layer 1: Data-management foundations
                    ↓
Layer 2: Trust and governance
                    ↓
Layer 3: Real-time data platforms
                    ↓
Layer 4: Agentic data engineering
                    ↓
Layer 5: AI-serving infrastructure
```

The first three layers establish a production-grade data platform. Layers four and five add AI agents, autonomous operations and governed access to enterprise data.

---

# Layer 1: Data-management foundations

## Objective

Learn how enterprise data is modelled, ingested, transformed, stored, orchestrated and delivered as reliable data products.

## Phase 1.1: SQL and relational data foundations

### SQL fundamentals

Learn:

* `SELECT`, `INSERT`, `UPDATE` and `DELETE`
* Filtering, sorting and aggregation
* Inner, left, right and full joins
* Subqueries and common table expressions
* `CASE` expressions
* Set operations
* Date, string and numerical functions
* Views and materialized views

### Advanced SQL

Learn:

* Window functions
* Recursive CTEs
* Conditional aggregation
* Lateral joins
* Pivoting and unpivoting
* JSON operations
* Stored functions
* Query optimization
* `EXPLAIN` and execution plans

### Database concepts

Understand:

* OLTP systems
* Primary and foreign keys
* Constraints
* Transactions and ACID
* Isolation levels
* Indexes
* Partitioning
* Normalization
* Denormalization
* Row-oriented storage

### Primary tool

Use PostgreSQL.

### Build

Create a transactional database for an e-commerce, insurance or banking system.

---

## Phase 1.2: Data modelling

### Conceptual modelling

Learn to identify:

* Business entities
* Business processes
* Relationships
* Ownership
* Business definitions
* Cardinality
* Data lifecycle

### Logical modelling

Learn:

* Entity-relationship diagrams
* Natural and surrogate keys
* Normalization
* Reference data
* Hierarchies
* Domain models
* Canonical data models

### Physical modelling

Learn:

* Column data types
* Index strategy
* Partitioning
* Compression
* Naming conventions
* Storage optimization
* Retention strategy

### Analytical modelling

Learn:

* Facts and dimensions
* Grain
* Measures
* Star schemas
* Snowflake schemas
* Conformed dimensions
* Degenerate dimensions
* Role-playing dimensions
* Slowly changing dimensions
* Factless fact tables
* Snapshot fact tables
* Accumulating fact tables

### Additional course topics

Add:

* Modelling for analytics and AI
* Semantic consistency between operational and analytical models
* Entity modelling for knowledge graphs
* Feature-oriented data modelling
* Modelling for machine-readable data products
* Domain-oriented modelling for data mesh

### Build

Create both:

1. A normalized operational model.
2. A dimensional analytical model for the same business domain.

---

## Phase 1.3: Data ingestion and integration

### Core ingestion concepts

Learn:

* ETL versus ELT
* Batch versus streaming
* Full versus incremental loads
* File-based ingestion
* API ingestion
* Database ingestion
* Event ingestion
* Webhooks
* Message queues
* Source and destination systems

### Reliability concepts

Understand:

* Idempotency
* Retries
* Exponential backoff
* Checkpointing
* Watermarks
* Late-arriving data
* Deduplication
* Ordering
* Dead-letter queues
* Poison records
* Backfills
* At-most-once processing
* At-least-once processing
* Exactly-once guarantees

### Change Data Capture

Learn:

* Log-based CDC
* Database snapshots
* Insert, update and delete events
* Schema changes
* Consumer offsets
* Duplicate-event handling
* Debezium connectors

### Data contracts

Define:

* Schema
* Required fields
* Ownership
* Freshness
* Valid values
* Compatibility rules
* Quality expectations
* Security classification
* Deprecation policy
* Producer and consumer responsibilities

### Additional course topics

Add:

* Contracts as code
* Schema evolution policies
* Data product interfaces
* Shift-left validation
* AI-ready ingestion
* Ingestion-to-embedding pipelines
* Legacy-system compatibility
* Data contract enforcement during ingestion

### Build

Create an ingestion service that loads data from:

* A relational database
* A REST API
* CSV or JSON files
* An event topic

The pipeline should support retries, checkpoints, deduplication and quarantine of invalid records.

---

## Phase 1.4: Data warehousing and analytics engineering

### Warehouse concepts

Learn:

* OLTP versus OLAP
* Operational databases versus warehouses
* Row versus column storage
* Data marts
* Enterprise data warehouses
* Staging layers
* Intermediate layers
* Business marts
* Incremental models
* Materialization strategies
* Query workload management

### dbt

Learn:

* Sources
* Models
* Seeds
* Snapshots
* Macros
* Tests
* Documentation
* Lineage graphs
* Incremental models
* Environments
* CI/CD

Use the following structure:

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

### Additional course topics

Add:

* Data products
* Data-product ownership
* Product-level quality SLOs
* Reusable metrics
* Semantic models
* AI-ready analytical tables
* Cost-aware materialization
* Data-product usage monitoring
* Data mesh principles

### Build

Create a dbt project with:

* Staging models
* Intermediate models
* Fact and dimension tables
* Slowly changing dimensions
* Incremental processing
* Documentation
* Tests
* Data-product definitions

---

## Phase 1.5: Workflow orchestration

### Apache Airflow

Learn:

* DAGs
* Tasks
* Operators
* Sensors
* Scheduling
* Dependencies
* Retries
* Backfills
* Catchup
* XCom
* Variables
* Connections
* Executors
* Pools
* Timeouts
* Dynamic task mapping
* Alerts
* Service-level agreements

Airflow should orchestrate processing rather than perform heavy data computation.

```text
Extract
→ validate
→ transform
→ test
→ publish
→ monitor
→ notify
```

### Additional course topics

Add:

* Orchestration graphs
* Event-driven orchestration
* Metadata-driven orchestration
* Conditional pipeline execution
* Dynamic DAG generation
* Human approval steps
* Integration with agentic orchestration
* Pipeline run history and operational memory

### Build

Orchestrate a complete batch data product with:

* Incremental ingestion
* dbt transformations
* Data-quality gates
* Publication
* Alerting
* Backfills
* Failure recovery

---

## Phase 1.6: Data lakes and lakehouses

### Data-lake foundations

Learn:

* Object storage
* Buckets and object keys
* Structured, semi-structured and unstructured data
* Immutable raw data
* Raw, cleaned and curated zones
* File sizing
* Partitioning
* Compaction
* Small-file problems
* Retention
* Lifecycle policies

### File formats

Understand:

* CSV
* JSON
* Avro
* Parquet
* ORC
* Row-oriented versus column-oriented formats
* Compression
* Predicate pushdown
* Column pruning
* Schema embedding
* Splittability

### Open table formats

Study:

* Apache Iceberg
* Delta Lake
* Apache Hudi

Learn Apache Iceberg deeply:

* Snapshots
* Manifest files
* Time travel
* Schema evolution
* Partition evolution
* Hidden partitioning
* Compaction
* Concurrent writes
* Catalog integration

### Additional course topics

Add:

* The lakehouse architecture in 2026
* Streaming-first lakehouse
* Catalog as the lakehouse control plane
* Lakehouse economics
* Warehouse versus lakehouse decisions
* Storage and compute separation
* Data residency
* AI-ready lakehouse design
* Grounding AI agents on governed lakehouse data

### Build

Create a local lakehouse using:

* MinIO
* Parquet
* Apache Iceberg
* Spark
* Trino
* A metadata catalog

---

## Layer 1 completion project

Build an end-to-end batch data platform:

```text
PostgreSQL / APIs / Files
             ↓
       Ingestion layer
             ↓
        Object storage
             ↓
      Iceberg lakehouse
             ↓
       dbt transformations
             ↓
        Business marts
             ↓
     Semantic serving layer
```

---

# Layer 2: Trust and governance

## Objective

Ensure that data is accurate, discoverable, traceable, secure, compliant and owned.

## Phase 2.1: Data quality

### Quality dimensions

Learn:

* Accuracy
* Completeness
* Consistency
* Validity
* Timeliness
* Uniqueness
* Integrity
* Freshness

### Testing levels

Implement:

* Schema tests
* Constraint tests
* Referential-integrity tests
* Transformation unit tests
* Business-rule tests
* Reconciliation tests
* Distribution checks
* Freshness checks
* Volume-anomaly checks

### Tools

Use:

* dbt tests
* Great Expectations
* Soda or another data-quality framework

### Additional course topics

Add:

* Quality as code
* Contract-driven quality
* Automated rule generation
* AI-assisted quality profiling
* Quality scoring for data products
* Quality remediation workflows
* Agent-generated quality recommendations

---

## Phase 2.2: Data observability and SLOs

Track:

* Pipeline success rate
* Processing latency
* Data freshness
* Row-count changes
* Schema changes
* Null-rate changes
* Distribution drift
* Consumer lag
* Failed records
* Cost per pipeline
* Mean time to detection
* Mean time to recovery

### Add data SLOs

Define:

* Freshness SLO
* Availability SLO
* Completeness SLO
* Latency SLO
* Accuracy SLO
* Recovery-time objective
* Recovery-point objective

### Additional course topics

Add:

* Business-impact-aware alerting
* Root-cause analysis
* Dependency-aware incident triage
* Automated incident summaries
* Observability for AI agents
* Agent action auditing
* Model and tool-call monitoring

---

## Phase 2.3: Metadata and catalogues

### Metadata types

Understand:

* Technical metadata
* Business metadata
* Operational metadata
* Administrative metadata
* Usage metadata
* Quality metadata

### Catalogue capabilities

Learn:

* Data dictionaries
* Business glossaries
* Dataset ownership
* Tags
* Classifications
* Search and discovery
* Schema history
* Profiling
* Usage analytics

### Tools

Study:

* DataHub
* OpenMetadata
* Apache Atlas
* Cloud-native catalogues

### Additional course topics

Add:

* Active metadata
* Catalogue as a control plane
* Metadata-triggered actions
* Policy automation
* Contract enforcement
* Impact-aware pipeline execution
* Cost and usage metadata
* Metadata-driven AI agents

Example:

```text
Schema change detected
        ↓
Catalog identifies affected assets
        ↓
Contracts and policies are evaluated
        ↓
Dependent jobs are paused or warned
        ↓
Owners receive an impact report
```

---

## Phase 2.4: Data lineage

Learn:

* Dataset-level lineage
* Table-level lineage
* Column-level lineage
* Transformation lineage
* Runtime lineage
* Impact analysis
* Root-cause analysis

### Tools

Use:

* OpenLineage
* Marquez
* DataHub or OpenMetadata

### Additional course topics

Add:

* Lineage for AI-generated transformations
* Source-to-answer lineage
* Retrieval citations
* Prompt-to-data lineage
* Feature lineage
* Embedding lineage
* Knowledge-graph lineage
* Agent action lineage

---

## Phase 2.5: Data governance

Learn:

* Data ownership
* Data stewardship
* Policies and standards
* Decision rights
* Data domains
* Critical data elements
* Data-issue management
* Regulatory compliance
* Data ethics
* Retention
* Deletion
* Audit trails

### Additional course topics

Add:

* Federated governance
* Data mesh governance
* Runtime AI governance
* Responsible AI controls
* Governance for autonomous agents
* Audit and compliance packs
* Sovereignty and residency
* Policy-as-code
* Human approval for sensitive actions
* Graduated autonomy

---

## Phase 2.6: Master and reference data management

Learn:

* Master data
* Reference data
* Golden records
* Entity resolution
* Deduplication
* Survivorship rules
* Hierarchies
* Matching and merging
* Centralized MDM
* Registry-style MDM

### Additional course topics

Add:

* Agentic MDM
* AI-assisted matching
* Automated stewardship suggestions
* Confidence-based record merging
* Human-in-the-loop approval
* Active metadata for master records
* Knowledge-graph representations of entities
* Entity histories and provenance

---

## Phase 2.7: Privacy and security

Learn:

* Authentication
* Authorization
* RBAC
* ABAC
* Least privilege
* Encryption at rest
* Encryption in transit
* Key management
* Row-level security
* Column-level security
* Dynamic masking
* Tokenization
* Anonymization
* Pseudonymization
* Secrets management
* Audit logging

### Additional course topics

Add:

* Permission-aware retrieval
* Permission-aware Text-to-SQL
* Security context propagation
* Prompt-injection protection
* Data-exfiltration controls
* Sensitive-data detection
* AI-agent identity
* Tool-level permissions
* Runtime policy enforcement

---

## Layer 2 completion project

Create a trust layer for the Layer 1 platform containing:

* Data contracts
* Quality checks
* Dataset owners
* Business glossary
* PII classification
* Column-level lineage
* Freshness SLOs
* Retention policies
* Access policies
* Incident workflows
* Audit reports

---

# Layer 3: Real-time data platforms

## Objective

Build reliable event-driven data products that provide fresh data to applications, analytics systems and AI agents.

## Phase 3.1: Kafka foundations

Learn:

* Brokers
* Topics
* Partitions
* Producers
* Consumers
* Consumer groups
* Offsets
* Replication
* Leaders and followers
* Retention
* Compaction
* Rebalancing
* Schema registries
* Delivery semantics

### Add schema management

Learn:

* Avro
* Protobuf
* JSON Schema
* Compatibility modes
* Event versioning
* Event contracts

---

## Phase 3.2: Distributed stream processing

Study both concepts, but choose one engine first:

* Apache Flink for streaming-first processing
* Spark Structured Streaming for unified batch and streaming

### Core concepts

Learn:

* Event time
* Processing time
* Ingestion time
* Tumbling windows
* Sliding windows
* Session windows
* Watermarks
* Stateful processing
* Out-of-order events
* Stream-table duality
* Stream-stream joins
* Stream-batch joins
* Checkpoint recovery
* Savepoints
* Backpressure
* Data skew

### Additional course topics

Add:

* dbt with Flink or streaming SQL
* Stream-to-table processing
* Incremental materialized views
* Streaming-first lakehouse
* Shift-left architecture
* Event-driven data products
* Event-driven AI agents

---

## Phase 3.3: Streaming reliability

Learn:

* At-least-once processing
* Exactly-once state handling
* Idempotent sinks
* Transactional writes
* Replay
* Backpressure
* Dead-letter topics
* Checkpointing
* Disaster recovery
* Schema evolution
* Partition-key design

### Add freshness SLOs

Monitor:

* Event production lag
* Consumer lag
* Processing latency
* End-to-end freshness
* Watermark delay
* Checkpoint duration
* Failed-event percentage
* Sink commit latency

---

## Phase 3.4: Real-time lakehouse

Learn:

* Kafka-to-Iceberg ingestion
* Flink-to-Iceberg writes
* Streaming upserts
* CDC-to-table
* Small-file management
* Compaction
* Partition evolution
* Snapshot expiration
* Late-event correction
* Streaming and batch reconciliation

### Additional course topics

Add:

* Freshness versus cost trade-offs
* Small-file economics
* Real-time data for agentic AI
* Real-time feature computation
* Real-time embedding updates
* Event-triggered agent workflows

---

## Layer 3 completion project

Build a real-time data product:

```text
Operational PostgreSQL
          ↓
      Debezium CDC
          ↓
         Kafka
          ↓
    Flink or Spark
          ↓
    Apache Iceberg
          ↓
 Real-time dashboard/API/agent
```

The system should demonstrate:

* Deduplication
* Out-of-order event handling
* Checkpoint recovery
* Freshness SLO monitoring
* Schema evolution
* Dead-letter processing
* Replay and reconciliation

---

# Layer 4: Agentic data engineering

## Objective

Use Claude and other language models to assist with pipeline development, monitoring, diagnosis and repair without placing the model directly inside the critical data-processing path.

## Phase 4.1: Agent foundations

Learn:

* LLM prompts
* Structured outputs
* Tool calling
* Function calling
* Agent loops
* Planning and execution
* Reflection
* Human-in-the-loop workflows
* Deterministic versus probabilistic components
* Context-window management

### Primary principle

```text
LLM decides or recommends
Deterministic systems execute and validate
```

Keep the model out of the direct data path wherever correctness and throughput are critical.

---

## Phase 4.2: Claude for data engineering

Use Claude for:

* Generating SQL
* Generating dbt models
* Creating Airflow DAGs
* Creating Flink or Spark jobs
* Explaining pipeline failures
* Generating quality rules
* Documenting datasets
* Proposing schema mappings
* Producing lineage summaries
* Creating incident reports

### Required safeguards

* Structured output schemas
* SQL parsing
* Static analysis
* Read-only execution by default
* Sandbox execution
* Row and cost limits
* Test execution before deployment
* Human approval for production changes

---

## Phase 4.3: MCP and tool integration

Learn the Model Context Protocol concepts:

* MCP clients
* MCP servers
* Resources
* Tools
* Prompts
* Transport
* Authentication
* Permission boundaries

Connect the agent to tools such as:

* Data catalogue
* Airflow
* dbt
* GitHub
* Data-quality platform
* Warehouse
* Kafka monitoring
* Incident-management system

### Guardrail architecture

```text
Layer 1: Model instructions
Layer 2: Client-side validation
Layer 3: Server-side mandatory validation
Layer 4: Restricted tool permissions
Layer 5: Audit and human approval
```

---

## Phase 4.4: Self-healing pipelines

A self-healing pipeline should follow this flow:

```text
Failure detected
      ↓
Context collected
      ↓
Failure classified
      ↓
Safe remediation generated
      ↓
Policy and risk checks
      ↓
Automatic repair or human approval
      ↓
Validation and rollback
      ↓
Incident memory updated
```

### Failure types

Learn to handle:

* Schema changes
* Missing columns
* Type mismatches
* Credential failures
* Temporary network errors
* Data-quality failures
* Resource exhaustion
* Late source delivery
* Broken dependencies
* Cost anomalies

### Remediation levels

Define:

* Level 0: Observe only
* Level 1: Recommend a fix
* Level 2: Execute reversible low-risk actions
* Level 3: Execute with approval
* Level 4: Autonomous execution within a restricted policy

---

## Phase 4.5: Pipeline memory

Store:

* Previous failures
* Root causes
* Applied fixes
* Success rates
* Dataset ownership
* Pipeline dependencies
* Known exceptions
* Runbooks
* Human feedback
* Cost and performance history

### Memory types

Understand:

* Short-term execution memory
* Episodic incident memory
* Semantic system knowledge
* Procedural runbooks
* Policy memory

Memory must have:

* Retention rules
* Versioning
* Access control
* Deletion support
* Provenance

---

## Phase 4.6: Multi-agent pipeline teams

Possible agents:

* Planner agent
* Pipeline-generation agent
* SQL-review agent
* Quality agent
* Security agent
* Cost agent
* Deployment agent
* Incident-response agent

Use an orchestration graph rather than allowing uncontrolled agent-to-agent communication.

### Add A2A concepts

Learn:

* Agent identity
* Capability discovery
* Task delegation
* Shared state
* Message contracts
* Conflict resolution
* Approval boundaries
* Cross-system coordination

---

## Phase 4.7: Autonomous orchestration

Learn:

* Natural language to pipeline specification
* Specification to DAG
* Dynamic pipeline generation
* Policy-aware planning
* Dependency discovery
* Environment-aware deployment
* Rollbacks
* Automated testing
* Cost estimation
* Runtime observability
* Safe stopping conditions

---

## Layer 4 completion project

Build a self-healing pipeline assistant with Claude that can:

1. Read Airflow task metadata.
2. Read dbt test results.
3. Retrieve lineage and ownership.
4. Diagnose the probable failure.
5. Recommend a remediation.
6. Execute only approved safe tools.
7. Validate the repaired pipeline.
8. Record the incident and resolution.

---

# Layer 5: AI-serving infrastructure

## Objective

Serve enterprise data safely and efficiently to AI applications, copilots and autonomous agents.

## Phase 5.1: Semantic layer

Learn:

* Business metrics
* Dimensions
* Measures
* Metric definitions
* Join paths
* Entity definitions
* Time semantics
* Access policies
* Metric versioning
* Semantic consistency

### Tools and approaches

Study:

* dbt Semantic Layer
* MetricFlow
* Cube
* LookML-style semantic modelling

### Additional topics

Add:

* Semantic layers for AI
* Machine-readable business definitions
* Permission-aware metrics
* Semantic search over metadata
* Mapping user terminology to governed data assets

---

## Phase 5.2: Text-to-SQL

Learn the architecture:

```text
User question
      ↓
Intent and entity extraction
      ↓
Relevant schema retrieval
      ↓
Semantic and permission context
      ↓
SQL generation
      ↓
SQL validation
      ↓
Safe execution
      ↓
Result explanation with citations
```

### Safety controls

Implement:

* Read-only credentials
* Allowed schemas and tables
* SQL parser validation
* Query timeout
* Row limits
* Cost limits
* Prohibited statements
* Permission filtering
* PII masking
* Audit logs

### Evaluation

Measure:

* SQL execution accuracy
* Result correctness
* Schema-selection accuracy
* Permission compliance
* Hallucination rate
* Query cost
* Latency
* Citation correctness

---

## Phase 5.3: RAG over enterprise data

Learn:

* Document ingestion
* Chunking
* Embeddings
* Vector indexing
* Metadata filtering
* Hybrid search
* Reranking
* Context construction
* Citation generation
* Retrieval evaluation

### Governed RAG

Add:

* Permission-aware retrieval
* Source-level access checks
* Row-level filtering
* Document classification
* Prompt-injection detection
* Sensitive-data redaction
* Citation and lineage tracking
* Retention and deletion

---

## Phase 5.4: Vector stores and embedding platforms

Learn:

* Dense embeddings
* Sparse retrieval
* Hybrid retrieval
* Similarity metrics
* Index types
* Metadata filters
* Embedding versioning
* Re-embedding
* Index refresh
* Chunk lineage
* Caching

### Tools

Study one or two:

* pgvector
* Milvus
* Weaviate
* Qdrant
* OpenSearch vector search

### Build

Create an ingestion pipeline:

```text
Source data
    ↓
Clean and classify
    ↓
Chunk
    ↓
Embed
    ↓
Vector store
    ↓
Permission-aware retrieval
```

---

## Phase 5.5: GraphRAG and knowledge graphs

Learn:

* Nodes
* Edges
* Properties
* Ontologies
* Entity extraction
* Entity linking
* Relationship extraction
* Community detection
* Graph traversal
* Graph embeddings
* Provenance

### GraphRAG flow

```text
Question
   ↓
Entity identification
   ↓
Graph traversal
   ↓
Related document retrieval
   ↓
Context synthesis
   ↓
Answer with evidence
```

### Use cases

* Customer 360
* Fraud investigation
* Supply-chain dependencies
* Master-data resolution
* Regulatory evidence
* Root-cause analysis
* Organizational knowledge

---

## Phase 5.6: Feature stores

Learn:

* Offline feature stores
* Online feature stores
* Feature definitions
* Feature computation
* Point-in-time correctness
* Training-serving consistency
* Feature freshness
* Feature lineage
* Feature reuse
* Feature monitoring

### Tools

Study:

* Feast
* Cloud-native feature stores
* Lakehouse-based feature platforms

### Add real-time features

Connect:

```text
Kafka/Flink
     ↓
Real-time feature computation
     ↓
Online feature store
     ↓
AI application or model
```

---

## Phase 5.7: Agent memory infrastructure

Learn:

* Conversation memory
* User preferences
* Episodic memory
* Semantic memory
* Entity memory
* Workflow state
* Long-term memory
* Memory retrieval
* Memory summarization

### Governance requirements

Implement:

* User isolation
* Access control
* Retention
* Deletion
* Consent
* PII handling
* Memory provenance
* Versioning
* Relevance scoring
* Auditability

---

## Phase 5.8: AI-serving reliability, cost and evaluation

Track:

* Retrieval latency
* Generation latency
* End-to-end latency
* Token cost
* Embedding cost
* Query cost
* Cache-hit rate
* Retrieval precision
* Retrieval recall
* Citation correctness
* Permission violations
* Hallucination rate
* User success rate

### Cost controls

Learn:

* Semantic caching
* Embedding caching
* Query-result caching
* Model routing
* Context compression
* Batch embedding
* Storage tiering
* Rate limits
* Budget enforcement

---

## Layer 5 completion project

Build a governed data-access agent that supports:

* Semantic metric questions
* Text-to-SQL
* Document RAG
* GraphRAG
* Permission-aware retrieval
* Citations
* Lineage
* Audit logging
* Cost and latency tracking
* Evaluation datasets

---

# Cross-cutting production track

These topics should not be treated as a separate layer. Apply them throughout all five layers.

## DataOps and platform engineering

Learn:

* Git
* Docker
* CI/CD
* Terraform
* Kubernetes fundamentals
* Environment separation
* Secrets management
* Configuration management
* Automated testing
* Deployment strategies
* Rollbacks

## Reliability

Learn:

* SLOs
* SLIs
* Error budgets
* Runbooks
* Incident response
* Disaster recovery
* Capacity planning
* High availability
* Failure testing

## Security and compliance

Learn:

* IAM
* Network security
* Encryption
* Audit logging
* Privacy
* Residency
* Sovereignty
* Regulatory controls
* Responsible AI
* Runtime AI governance

## FinOps

Track:

* Cost per pipeline
* Cost per dataset
* Cost per data product
* Cost per query
* Cost per AI answer
* Storage cost
* Compute cost
* Streaming cost
* Token cost
* Embedding cost

Learn:

* Chargeback
* Showback
* Budget alerts
* Cost attribution
* Capacity commitments
* Workload scheduling
* Cost-performance optimization

---

# Recommended capstone

## Governed autonomous enterprise data platform

```text
Operational PostgreSQL
          ↓
     Debezium CDC
          ↓
        Kafka
          ↓
      Flink/Spark
          ↓
    Iceberg lakehouse
          ↓
 dbt transformations
          ↓
 Semantic and feature layers
          ↓
Text-to-SQL / RAG / GraphRAG
          ↓
 Governed enterprise agent
```

Supporting components:

```text
Airflow                → batch orchestration
Claude                 → agentic engineering
MCP                    → controlled tool access
Great Expectations     → data validation
OpenLineage            → lineage
DataHub/OpenMetadata   → catalogue and active metadata
Feast                  → feature serving
pgvector/vector store  → retrieval
Prometheus/Grafana     → monitoring
Terraform              → infrastructure
GitHub Actions         → CI/CD
```

## Capstone capabilities

The final system should demonstrate:

* Batch ingestion
* CDC and streaming
* Data contracts
* Data-quality gates
* Lakehouse storage
* Analytical modelling
* Data products
* Active metadata
* Lineage
* Master-data management
* Permission-aware access
* Text-to-SQL
* RAG and GraphRAG
* Feature serving
* Self-healing pipeline recommendations
* Human approval workflows
* Cost monitoring
* Audit reporting

## Business proof

The final presentation should show:

* Problem severity
* Current manual effort
* Time saved
* Data-quality improvement
* Freshness improvement
* Incident reduction
* Cost impact
* Security controls
* Governance evidence
* Measurable ROI

---

# Recommended order of execution

## Foundation stage

1. SQL and PostgreSQL
2. Data modelling
3. Ingestion
4. dbt and warehousing
5. Airflow
6. Lakehouse

## Trust stage

7. Data quality
8. Observability and SLOs
9. Metadata and lineage
10. Governance
11. MDM
12. Privacy and security

## Real-time stage

13. Kafka
14. Flink or Spark Structured Streaming
15. Stream-to-table
16. Streaming lakehouse
17. Freshness monitoring

## Agentic stage

18. Claude tool calling
19. MCP
20. Guardrails
21. Pipeline diagnosis
22. Self-healing
23. Pipeline memory
24. Multi-agent orchestration

## AI-serving stage

25. Semantic layer
26. Text-to-SQL
27. Vector stores
28. RAG
29. Knowledge graphs and GraphRAG
30. Feature stores
31. Agent memory
32. Evaluation, cost and production hardening
