# Layer 1: Data-Management Foundations

## Phase 1.2: Data Modelling

### Phase objective

Data modelling converts business concepts and processes into structures that databases, analytical platforms, AI systems, and people can consistently understand.

By the end of this phase, you should be able to:

* Translate business requirements into data entities and relationships.
* distinguish conceptual, logical, physical, and analytical models.
* Choose natural and surrogate keys appropriately.
* Normalize operational data and dimensionally model analytical data.
* Define facts, dimensions, measures, and the grain of a fact table.
* Model historical changes using slowly changing dimensions.
* Select indexes, partitions, compression, storage, and retention strategies.
* Create consistent models for analytics, AI, knowledge graphs, and data products.
* Understand how modelling responsibilities change in a data-mesh architecture.

Throughout this phase, we will use an elder-care coordination platform as the main example. It manages elders, caregivers, appointments, care providers, observations, follow-ups, and care-coordination activities.

---

# 1. What is data modelling?

Data modelling is the process of representing:

* What data exists.
* What that data means.
* How different pieces of data relate.
* Which rules the data must follow.
* How the data should be stored.
* How users and systems will consume it.

A data model is therefore more than a diagram of database tables. It captures business meaning and establishes a shared vocabulary between business teams, data engineers, application developers, analysts, governance teams, and AI systems.

For example, the term **appointment** may appear straightforward, but different teams may interpret it differently:

* A clinical team may consider only confirmed consultations.
* An operations team may include requested and cancelled appointments.
* A finance team may count only completed and billable appointments.
* A caregiver may consider transportation arrangements part of the appointment.
* An AI agent may need to distinguish a planned appointment from a completed event.

A data model resolves these differences by explicitly defining:

* What an appointment represents.
* Its lifecycle and valid statuses.
* Its relationships with an elder, provider, and caregiver.
* Which timestamps represent booking, scheduled time, completion, or cancellation.
* Who owns the definition.
* How it will be represented in operational and analytical systems.

---

# 2. Levels of data modelling

Enterprise data models are commonly developed at four levels:

| Model      | Primary question                       | Main audience                    | Typical output                                  |
| ---------- | -------------------------------------- | -------------------------------- | ----------------------------------------------- |
| Conceptual | What business concepts exist?          | Business and domain stakeholders | High-level entities and relationships           |
| Logical    | How is the information structured?     | Data architects and analysts     | Attributes, keys, relationships and rules       |
| Physical   | How will it be implemented?            | Database and data engineers      | Tables, columns, types, indexes and partitions  |
| Analytical | How will data be queried and measured? | Analytics engineers and BI teams | Facts, dimensions, measures and semantic models |

These levels are related but should not be treated as identical.

For example:

```text
Conceptual:
An elder schedules appointments with care providers.

Logical:
ELDER 1 ────< APPOINTMENT >──── 1 CARE_PROVIDER

Physical:
elder(elder_id UUID, ...)
appointment(appointment_id UUID, elder_id UUID, provider_id UUID, ...)

Analytical:
fact_appointment
dim_elder
dim_provider
dim_date
```

The conceptual model communicates business meaning. The logical model adds structure. The physical model defines implementation details. The analytical model reorganizes the data for reporting and decision-making.

---

# 3. Conceptual data modelling

## 3.1 Purpose

Conceptual modelling identifies the important business concepts without deciding how they will be stored in a particular database.

It should remain understandable to business stakeholders. Technical details such as indexes, partition keys, SQL data types, and database-specific syntax do not belong at this level.

A conceptual model usually captures:

* Business entities.
* Business processes.
* Relationships.
* Definitions.
* Ownership.
* Cardinality.
* Entity lifecycles.

---

## 3.2 Business entities

A business entity is a distinguishable concept about which an organization needs to retain information.

Examples include:

* Elder
* Caregiver
* Care provider
* Appointment
* Medication
* Observation
* Follow-up
* Care plan
* Alert
* Consent

Entities are usually nouns, but not every noun in a requirement should become an entity.

Consider:

> A caregiver schedules an appointment for an elder with a care provider.

Potential entities are:

* Caregiver
* Appointment
* Elder
* Care provider

The word “schedule” describes a process or relationship rather than an independent entity.

An entity should generally have:

* A clear business meaning.
* An identifiable lifecycle.
* Information that must be retained.
* A reason to exist independently in the business domain.

---

## 3.3 Business processes

Business processes describe how entities interact and change over time.

Examples in an elder-care platform include:

* Registering an elder.
* Assigning a caregiver.
* Scheduling an appointment.
* Recording an observation.
* Creating a follow-up.
* Acknowledging an alert.
* Closing a coordination gap.

A static entity diagram alone may not explain these transitions. For lifecycle-heavy processes, the model should also capture allowed states.

An appointment might follow:

```text
Requested → Scheduled → Completed
                    ↘ Cancelled
                    ↘ No-show
```

The model must answer questions such as:

* Can a completed appointment later be cancelled?
* Can a cancelled appointment be rescheduled?
* Is rescheduling an update to the same appointment or the creation of a new one?
* Which status represents the current state?
* Should previous states be retained?

These decisions affect auditability, analytics, and application behaviour.

---

## 3.4 Business definitions

Every important entity and attribute should have an unambiguous definition.

Weak definition:

> An elder is an elderly person in the system.

Better definition:

> An elder is a person enrolled in the care-coordination service for whom care events, appointments, follow-ups, and authorized caregiver relationships are maintained.

A good business definition explains:

* What the concept represents.
* What it includes.
* What it excludes.
* When it becomes valid.
* When it stops being valid.
* How it differs from related concepts.

For example, an **open follow-up** might mean:

> A follow-up requirement that has been identified but has not been completed, cancelled, or formally marked unnecessary.

This is better than defining it as merely `status = 'open'`, because business definitions should not depend entirely on one implementation.

---

## 3.5 Relationships

Relationships explain how entities interact.

Examples:

* An elder has appointments.
* A caregiver supports elders.
* A provider conducts appointments.
* An appointment may generate follow-ups.
* A follow-up may be assigned to a caregiver.

Relationships should be given meaningful names:

* `CAREGIVER supports ELDER`
* `ELDER attends APPOINTMENT`
* `PROVIDER conducts APPOINTMENT`
* `APPOINTMENT generates FOLLOW_UP`

Named relationships communicate more meaning than generic connections.

---

## 3.6 Cardinality

Cardinality describes how many instances of one entity can relate to another.

Common forms are:

* One-to-one: `1:1`
* One-to-many: `1:N`
* Many-to-many: `M:N`

Examples:

### One-to-one

One elder may have one current primary care profile.

This does not necessarily mean there has only ever been one profile. Historical profiles may change the relationship into one-to-many over time.

### One-to-many

One elder can have many appointments, but each appointment belongs to one elder.

### Many-to-many

A caregiver can support multiple elders, and an elder can be supported by multiple caregivers.

A many-to-many relationship normally requires an associative entity:

```text
CAREGIVER
    │
    ├────< CAREGIVER_ELDER_ASSIGNMENT >────┤
                                           ELDER
```

The assignment can store information such as:

* Relationship type.
* Assignment start date.
* Assignment end date.
* Primary-caregiver indicator.
* Permissions.
* Contact priority.

This demonstrates why relationships sometimes contain meaningful business data of their own.

---

## 3.7 Optionality

Optionality determines whether participation in a relationship is mandatory.

Examples:

* Every appointment must belong to an elder.
* An appointment may not yet have an assigned provider.
* An elder may have zero or more follow-ups.
* A follow-up may be associated with an appointment, but it could also originate from a caregiver note.

Optionality later influences:

* Nullable columns.
* Foreign-key constraints.
* Validation rules.
* Join behaviour.
* Data-quality checks.

A nullable foreign key should reflect a legitimate business condition rather than compensate for incomplete modelling.

---

## 3.8 Ownership

Every important data concept should have a clearly identified owner.

Ownership may include:

* **Business owner:** accountable for meaning and policy.
* **Data owner:** accountable for appropriate use and quality.
* **Data steward:** maintains definitions and resolves quality issues.
* **Technical owner:** maintains the implementing system.

For example:

| Data concept           | Possible owner        |
| ---------------------- | --------------------- |
| Elder demographic data | Member operations     |
| Appointment status     | Care operations       |
| Provider details       | Provider management   |
| Consent                | Privacy or compliance |
| Data pipeline status   | Data engineering      |

Ownership prevents disagreements from becoming unresolved technical problems.

---

## 3.9 Entity lifecycle

An entity lifecycle describes how an entity is created, changed, and retired.

For every important entity, consider:

* What event creates it?
* Which states are valid?
* Which transitions are allowed?
* Can it be deleted?
* Should it instead be deactivated?
* How long must it be retained?
* Which changes require historical tracking?
* What happens when the source system changes its identifier?

For example, an elder record might have:

```text
Pending → Active → Inactive → Archived
```

Hard deletion might be prohibited because appointment and consent history must remain auditable.

---

# 4. Logical data modelling

Logical modelling converts business concepts into structured entities, attributes, keys, and relationships without committing fully to a particular database technology.

---

## 4.1 Entity-relationship diagrams

An entity-relationship diagram, or ERD, visually represents:

* Entities.
* Attributes.
* Primary keys.
* Foreign keys.
* Relationships.
* Cardinality.
* Optionality.

A simplified logical model might contain:

```text
ELDER
- elder_id
- legal_name
- date_of_birth
- status

APPOINTMENT
- appointment_id
- elder_id
- provider_id
- scheduled_at
- status

CARE_PROVIDER
- provider_id
- provider_name
- provider_type
```

Relationships:

* One elder can have many appointments.
* One provider can conduct many appointments.
* Each appointment belongs to one elder.
* An appointment may initially have no provider.

An ERD is useful, but it must be supported by definitions and rules. A diagram alone cannot explain the complete business meaning of every field.

---

## 4.2 Primary keys

A primary key uniquely identifies a row.

A good primary key must be:

* Unique.
* Non-null.
* Stable.
* Minimal.
* Available whenever the record is created.

Examples:

```text
elder_id
appointment_id
provider_id
```

A key should represent identity, not a property likely to change.

An email address is usually a poor primary key because:

* It can change.
* It may be shared.
* It may be absent.
* Formatting may be inconsistent.
* Privacy requirements may restrict its use.

---

## 4.3 Natural keys

A natural key is derived from business data.

Examples:

* Country code.
* Tax identifier.
* Employee number.
* Medical registration number.
* Source-system appointment number.

Advantages:

* Has business meaning.
* May already be recognized by users.
* Can help detect duplicates.
* Avoids an additional generated identifier in simple domains.

Disadvantages:

* May change.
* May contain sensitive information.
* Can be long or composite.
* May not be globally unique.
* Can be reused by source systems.
* May follow inconsistent standards across countries or systems.

A source-generated appointment number may be unique only inside that source. Its actual business key would therefore be:

```text
(source_system, source_appointment_id)
```

---

## 4.4 Surrogate keys

A surrogate key is generated by the system and has no inherent business meaning.

Examples:

* Integer sequence.
* UUID.
* Warehouse-generated hash key.

Advantages:

* Stable even when business values change.
* Compact joins are possible with integer keys.
* Simplifies integration across multiple sources.
* Supports historical dimension versions.
* Separates internal identity from external identifiers.

Disadvantages:

* Does not itself prevent business duplicates.
* Requires separate uniqueness constraints on business keys.
* Can complicate debugging if source identifiers are discarded.
* Sequential values can reveal record volume if exposed externally.

A common pattern is:

```text
elder_sk              Surrogate warehouse key
elder_id              Governed enterprise identifier
source_system         Source name
source_elder_id       Identifier used by the source
```

The surrogate key supports storage and joins, while the governed and source identifiers support identity resolution and traceability.

---

## 4.5 Natural versus surrogate keys

| Consideration              | Natural key       | Surrogate key               |
| -------------------------- | ----------------- | --------------------------- |
| Business meaning           | Yes               | No                          |
| Stability                  | Depends on source | Usually high                |
| Integration across sources | Difficult         | Easier                      |
| Human readability          | Usually better    | Usually lower               |
| Historical versions        | More difficult    | Easier                      |
| Duplicate prevention       | Can help          | Requires another constraint |
| Exposure of sensitive data | Possible risk     | Lower risk                  |

The two types are complementary. Using a surrogate primary key does not remove the need to identify and validate the natural business key.

---

# 5. Normalization

Normalization organizes relational data to reduce duplication and prevent update anomalies.

The main goals are:

* Store each fact in an appropriate place.
* Avoid contradictory copies of the same information.
* Preserve integrity during insert, update, and delete operations.
* Represent dependencies clearly.

---

## 5.1 Update anomalies

Suppose appointment records repeatedly store provider details:

| appointment_id | provider_id | provider_name | provider_phone |
| -------------- | ----------- | ------------- | -------------- |
| A101           | P10         | City Clinic   | 111111         |
| A102           | P10         | City Clinic   | 111111         |
| A103           | P10         | City Clinic   | 111111         |

If the provider changes its phone number, every appointment row must be updated. If one row is missed, the database contains conflicting values.

A normalized design separates the data:

```text
CARE_PROVIDER
- provider_id
- provider_name
- provider_phone

APPOINTMENT
- appointment_id
- provider_id
- scheduled_at
```

Provider information is updated once.

---

## 5.2 First normal form

A table is in first normal form when:

* Each row is uniquely identifiable.
* Each field contains one value.
* Repeating groups are removed.

Poor design:

| elder_id | phone_numbers    |
| -------- | ---------------- |
| E1       | 9876, 8765, 7654 |

Better design:

```text
ELDER
- elder_id
- name

ELDER_PHONE
- elder_phone_id
- elder_id
- phone_number
- phone_type
- is_primary
```

Storing multiple values in one string makes validation, searching, indexing, and updating difficult.

---

## 5.3 Second normal form

Second normal form requires:

* First normal form.
* Every non-key attribute must depend on the complete key.

Consider:

```text
CAREGIVER_ELDER_ASSIGNMENT
- caregiver_id
- elder_id
- caregiver_name
- assignment_start_date
```

If the primary key is `(caregiver_id, elder_id)`, `caregiver_name` depends only on `caregiver_id`, not on the complete composite key.

It belongs in `CAREGIVER`, while assignment-specific data remains in the associative table.

---

## 5.4 Third normal form

Third normal form requires:

* Second normal form.
* Non-key attributes must not depend on other non-key attributes.

Consider:

```text
ELDER
- elder_id
- postal_code
- city
- state
```

If `postal_code` determines `city` and `state`, those values have a transitive dependency:

```text
elder_id → postal_code → city, state
```

They may be separated into reference data if the business rules make the dependency reliable.

---

## 5.5 When not to normalize completely

Normalization is especially suitable for operational systems with frequent writes and transactional consistency requirements.

Analytical systems often intentionally denormalize data because:

* Queries should require fewer joins.
* Business users need simpler structures.
* Historical context must be preserved.
* Read performance is more important than update efficiency.
* Measures must be aggregated consistently.

The correct principle is not “always normalize” or “always denormalize.” The model must match the workload.

| Workload                     | Typical preference                  |
| ---------------------------- | ----------------------------------- |
| Transaction processing       | Normalized model                    |
| Operational master data      | Normalized or moderately normalized |
| Analytical warehouse         | Dimensional or denormalized model   |
| Data science feature access  | Feature-oriented model              |
| Search or document retrieval | Document-oriented representation    |

---

# 6. Reference data

Reference data describes controlled sets of permitted values used to classify other data.

Examples:

* Appointment status.
* Provider type.
* Relationship type.
* Country code.
* Contact method.
* Follow-up priority.

Reference data is usually:

* Relatively small.
* Shared across systems.
* Controlled through governance.
* More stable than transactional data.

Instead of allowing arbitrary appointment statuses, a model might define:

| status_code | status_name | terminal_status |
| ----------- | ----------- | --------------- |
| REQ         | Requested   | No              |
| SCH         | Scheduled   | No              |
| CMP         | Completed   | Yes             |
| CAN         | Cancelled   | Yes             |
| NOS         | No-show     | Yes             |

Benefits include:

* Consistent values.
* Better validation.
* Clear business definitions.
* Easier mapping across source systems.
* Safer reporting and AI interpretation.

Reference data should not be confused with master data.

* **Reference data** defines allowed classifications.
* **Master data** represents core business entities such as elders, providers, and caregivers.

---

# 7. Hierarchies

A hierarchy represents levels of organization or aggregation.

Examples:

```text
Country → State → City → Facility
Organization → Region → Branch → Care team
Year → Quarter → Month → Day
Service category → Service type → Service
```

Hierarchies support:

* Drill-down reporting.
* Roll-up aggregation.
* Access control.
* Organizational reporting.
* Navigation and categorization.

Important modelling questions include:

* Is the hierarchy balanced?
* Can an item have multiple parents?
* Can levels be skipped?
* Does the hierarchy change over time?
* Must historical reports use the old or current hierarchy?

A provider may move from one regional network to another. If historical reports should preserve the original region, the hierarchy relationship needs effective dates.

---

# 8. Domain and canonical data models

## 8.1 Domain model

A domain model represents the concepts and relationships inside a specific business area.

Possible elder-care domains include:

* Member management.
* Care coordination.
* Provider management.
* Appointment management.
* Alerts and escalation.
* Consent and privacy.

A domain boundary reduces confusion by assigning responsibility for each concept.

For example:

* The provider domain owns provider identity.
* The appointment domain owns appointment lifecycle.
* The care-coordination domain owns follow-ups.
* The consent domain owns authorization rules.

---

## 8.2 Canonical model

A canonical data model provides a standardized enterprise representation that multiple systems can exchange.

Suppose three systems represent appointment status differently:

| Source     | Source value  |
| ---------- | ------------- |
| Hospital A | `DONE`      |
| Clinic B   | `CLOSED`    |
| Mobile app | `COMPLETED` |

The canonical value may be:

```text
COMPLETED
```

The canonical model decouples consumers from source-specific structures.

Benefits:

* Reduces point-to-point mappings.
* Establishes common definitions.
* Simplifies downstream integration.
* Supports consistent governance.
* Improves interoperability.

Risks:

* A universal model can become too large.
* Domain-specific meaning may be lost.
* Changes can become slow and bureaucratic.
* Teams may depend excessively on one central schema.

A practical approach is to use canonical models for genuinely shared concepts while allowing domains to retain specialized extensions.

---

# 9. Physical data modelling

Physical modelling defines how the logical model will be implemented in a specific storage technology.

It covers:

* Tables and columns.
* Data types.
* Constraints.
* Indexes.
* Partitions.
* Compression.
* Naming conventions.
* Storage optimization.
* Retention and archival.

---

## 9.1 Data types

Choosing an appropriate type improves:

* Data integrity.
* Storage efficiency.
* Query performance.
* Interoperability.
* Validation.

Examples:

| Data                  | Suitable type                   |
| --------------------- | ------------------------------- |
| Date of birth         | `DATE`                        |
| Appointment timestamp | Time-zone-aware timestamp       |
| Monetary amount       | Fixed-precision decimal         |
| Identifier            | Integer, UUID or bounded string |
| Status                | Controlled code                 |
| Measurement value     | Numeric with defined precision  |
| Unstructured note     | Text                            |
| Boolean condition     | Boolean                         |

Common mistakes include:

* Storing dates as strings.
* Storing numbers as text.
* Using floating-point values for money.
* Using local timestamps without time zones.
* Allowing unlimited text for every field.
* Encoding several meanings in one column.

A measurement also requires context:

```text
measurement_value = 72
measurement_unit = BPM
measurement_type = HEART_RATE
```

The number `72` alone is not semantically complete.

---

## 9.2 Constraints

Constraints protect the model from invalid data.

Important constraints include:

* Primary key.
* Foreign key.
* Unique constraint.
* Not-null constraint.
* Check constraint.
* Default value.

Examples:

```sql
CHECK (end_date IS NULL OR end_date >= start_date)
CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT'))
UNIQUE (source_system, source_appointment_id)
```

Application validation is useful, but database or platform-level constraints provide another layer of protection. Rules critical to integrity should not exist only inside an application interface.

---

## 9.3 Indexes

An index provides an optimized access path to rows.

Potential indexes include:

* Elder identifier.
* Provider identifier.
* Appointment scheduled time.
* Follow-up status and due date.
* Source-system identifiers.

An index is helpful when queries frequently:

* Filter on a column.
* Join using a column.
* Sort using a column.
* Search for a narrow subset of records.

Indexes have costs:

* Consume storage.
* Slow inserts and updates.
* Require maintenance.
* May be ignored if queries return a large percentage of the table.
* Can become redundant.

A composite index must reflect query patterns. For example:

```text
(status, due_date)
```

may support:

```sql
WHERE status = 'OPEN'
  AND due_date < CURRENT_DATE
```

The order of columns matters.

---

## 9.4 Partitioning

Partitioning divides a large logical table into smaller physical segments.

Common strategies include:

* Range partitioning by date.
* List partitioning by region or source.
* Hash partitioning by identifier.
* Composite partitioning.

A large event table might be partitioned monthly by `event_date`.

Benefits:

* Partition pruning.
* Faster retention operations.
* Easier archival.
* Improved management of large tables.
* More targeted maintenance.

Risks:

* Too many small partitions.
* Skewed partitions.
* Queries that cannot use the partition key.
* Operational complexity.
* Poor performance when the partition strategy does not match access patterns.

Partitioning should be based on real volume, retention, and query requirements—not added automatically to every table.

---

## 9.5 Compression

Compression reduces storage and input/output costs.

Columnar analytical formats achieve effective compression because similar values are stored together.

Compression benefits are particularly strong for:

* Repeated categorical values.
* Sparse data.
* Sorted columns.
* Large fact tables.
* Historical datasets.

Trade-offs include:

* CPU cost for compression and decompression.
* Different codecs favouring speed or compression ratio.
* Reduced benefit for already-compressed content.
* Poor results on encrypted or highly random data.

Frequently accessed data may use faster compression, while archival data may use stronger compression.

---

## 9.6 Naming conventions

Consistent naming improves discoverability and reduces ambiguity.

Possible conventions:

* Use `snake_case`.
* Use singular or plural table names consistently.
* Name primary keys as `<entity>_id`.
* Name timestamps according to the event: `created_at`, `scheduled_at`, `completed_at`.
* Name booleans as clear predicates: `is_active`, `has_consent`.
* Include units where necessary: `duration_seconds`.
* Avoid unexplained abbreviations.
* Avoid reserved database keywords.
* Separate technical metadata from business columns.

Poor names:

```text
date
status1
flag
value
desc
```

Better names:

```text
appointment_scheduled_at
follow_up_status
is_primary_caregiver
heart_rate_bpm
cancellation_reason
```

Names should communicate meaning without requiring users to reverse-engineer the source code.

---

## 9.7 Storage optimization

Storage design depends on access patterns.

Important considerations include:

* Row-oriented versus column-oriented storage.
* Read-heavy versus write-heavy workloads.
* Update frequency.
* Query selectivity.
* Expected data volume.
* Concurrency.
* Retention period.
* Latency requirements.
* Cost.
* Security and residency.

### Row-oriented storage

Suitable for:

* Transactional systems.
* Frequent single-record inserts and updates.
* Point lookups.
* Operational APIs.

### Column-oriented storage

Suitable for:

* Analytical scans.
* Aggregations.
* Large historical datasets.
* Queries that read a subset of columns.

A common enterprise architecture uses row storage for operational systems and columnar warehouse or lakehouse storage for analytics.

---

## 9.8 Retention

Retention defines how long data remains available and what happens afterward.

A retention policy may define:

* Active retention period.
* Archive period.
* Deletion or anonymization rules.
* Legal holds.
* Backup retention.
* Derived-data handling.
* Deletion propagation.

Data should not be retained merely because storage is inexpensive. Long retention increases:

* Privacy exposure.
* Security risk.
* Compliance obligations.
* Discovery and governance cost.
* Risk of outdated data being used by AI systems.

Retention must consider relationships. Deleting an elder’s direct identifiers may not be sufficient if those identifiers remain in notes, embeddings, logs, exports, or backups.

---

# 10. Analytical data modelling

Analytical modelling organizes data for measurement, aggregation, reporting, and decision-making.

The most common approach is dimensional modelling.

Its major components are:

* Fact tables.
* Dimension tables.
* Grain.
* Measures.
* Star and snowflake schemas.

---

## 10.1 Grain

Grain defines exactly what one row in a fact table represents.

Examples:

* One row per appointment.
* One row per appointment status transition.
* One row per elder per day.
* One row per follow-up requirement.
* One row per sensor measurement.

The grain must be declared before dimensions and measures are chosen.

Example:

> One row in `fact_appointment` represents one scheduled appointment occurrence for one elder with one provider.

A fact table should not mix grains. If one row sometimes represents an appointment and sometimes represents an appointment-service combination, aggregations can become incorrect.

Questions to ask:

* What business event does one row represent?
* Can multiple rows exist for the same entity?
* At what time resolution?
* Which dimensions describe the event?
* Which measures can be added across rows?

---

## 10.2 Fact tables

Fact tables record measurable business events or states.

Examples:

* Appointment facts.
* Follow-up facts.
* Observation facts.
* Alert facts.
* Daily elder-care summary facts.

A fact table usually contains:

* Foreign keys to dimensions.
* Numeric measures.
* Degenerate dimensions.
* Event timestamps.
* Audit metadata.

Example:

```text
fact_appointment
- appointment_key
- elder_key
- provider_key
- scheduled_date_key
- completion_date_key
- appointment_status
- wait_duration_minutes
- appointment_count
```

`appointment_count` may be stored as `1` to simplify aggregation, although modern systems can also calculate counts directly.

---

## 10.3 Dimension tables

Dimensions provide descriptive context for facts.

Examples:

* Elder.
* Provider.
* Caregiver.
* Date.
* Time.
* Location.
* Appointment type.
* Status.

Dimensions answer questions such as:

* Who?
* What?
* Where?
* When?
* Why?
* How?

A well-designed dimension contains understandable business attributes rather than forcing analysts to repeatedly join operational lookup tables.

---

## 10.4 Measures

Measures are numeric values analyzed through aggregation.

Examples:

* Appointment count.
* Follow-up count.
* Waiting duration.
* Completion duration.
* Cost.
* Alert count.
* Response time.

Measures can be:

### Additive

Can be summed across every dimension.

Example: appointment count.

### Semi-additive

Can be summed across some dimensions but not all.

Example: account balance can be summed across customers but usually not across dates.

### Non-additive

Cannot be meaningfully summed.

Examples:

* Percentage.
* Ratio.
* Average.
* Heart-rate reading across unrelated events.

Non-additive measures should often be calculated from underlying additive components.

Instead of storing only:

```text
completion_rate = 80%
```

retain:

```text
completed_appointments = 80
eligible_appointments = 100
```

The rate can then be recalculated correctly at different aggregation levels.

---

# 11. Star and snowflake schemas

## 11.1 Star schema

A star schema connects a central fact table directly to denormalized dimensions.

```text
             dim_date
                |
dim_elder — fact_appointment — dim_provider
                |
         dim_appointment_type
```

Advantages:

* Simple for analysts.
* Fewer joins.
* Good query performance.
* Easy semantic-layer integration.
* Clear business structure.

Disadvantages:

* Repeated dimension attributes.
* Additional transformation is required.
* Governance is needed to prevent inconsistent dimensions.

---

## 11.2 Snowflake schema

A snowflake schema normalizes dimensions into related sub-dimensions.

Example:

```text
fact_appointment
       |
dim_provider
       |
dim_provider_location
       |
dim_geography
```

Advantages:

* Less repeated data.
* Reusable hierarchical components.
* May improve maintenance of complex shared structures.

Disadvantages:

* More joins.
* Harder for business users.
* More complex queries.
* Can reduce performance and usability.

In analytical platforms, star schemas are generally preferred for consumption. Snowflaking is justified when dimension structures are large, shared, or require independently governed hierarchies.

---

# 12. Dimension types

## 12.1 Conformed dimensions

A conformed dimension is shared consistently across multiple fact tables or business processes.

For example, `dim_elder` may be used by:

* `fact_appointment`
* `fact_follow_up`
* `fact_alert`
* `fact_observation`

This allows users to compare appointments, alerts, and follow-ups using the same elder definition.

A dimension is not truly conformed merely because tables have the same name. Its keys, attribute meanings, value domains, and history handling must also be consistent.

---

## 12.2 Degenerate dimensions

A degenerate dimension is a business identifier stored directly in a fact table without a separate dimension table.

Examples:

* Appointment number.
* Invoice number.
* Case number.
* Alert reference number.

An appointment number may be useful for grouping and drill-through, but it may have no additional descriptive attributes requiring a separate dimension.

---

## 12.3 Role-playing dimensions

A role-playing dimension is one physical dimension used in multiple logical roles.

The date dimension may represent:

* Scheduled date.
* Created date.
* Completed date.
* Cancelled date.
* Follow-up due date.

For example:

```text
fact_appointment.scheduled_date_key → dim_date.date_key
fact_appointment.completed_date_key → dim_date.date_key
```

Semantic models should expose understandable role names such as `Scheduled Date` and `Completion Date`.

---

# 13. Slowly changing dimensions

Slowly changing dimensions, or SCDs, define how changes to dimension attributes are handled.

Suppose an elder’s city changes from Delhi to Jaipur.

The desired handling depends on the analytical question.

---

## 13.1 SCD Type 0

The original value is retained permanently.

Use when an attribute must never change, such as an original enrollment source.

---

## 13.2 SCD Type 1

The old value is overwritten.

Before:

| elder_key | city  |
| --------- | ----- |
| 101       | Delhi |

After:

| elder_key | city   |
| --------- | ------ |
| 101       | Jaipur |

Use when:

* History is not required.
* A source correction should replace an incorrect value.
* Current-state reporting is sufficient.

Limitation: historical facts will appear associated with the new value.

---

## 13.3 SCD Type 2

A new dimension row is created for every tracked change.

| elder_key | elder_id | city   | valid_from | valid_to   | is_current |
| --------- | -------- | ------ | ---------- | ---------- | ---------- |
| 101       | E10      | Delhi  | 2025-01-01 | 2026-03-31 | false      |
| 205       | E10      | Jaipur | 2026-04-01 | null       | true       |

Facts retain the surrogate key corresponding to the dimension version valid when the event occurred.

Use when historical truth matters.

Type 2 requires:

* Surrogate keys.
* Effective dates.
* Current-row indicator.
* Non-overlapping validity periods.
* Correct handling of late-arriving data.

---

## 13.4 SCD Type 3

The current and previous values are stored in the same row.

```text
current_city
previous_city
```

This supports limited history but does not scale to many changes.

---

## 13.5 Choosing an SCD strategy

Different attributes in the same dimension may require different handling.

| Attribute                   | Possible strategy |
| --------------------------- | ----------------- |
| Corrected spelling of name  | Type 1            |
| Care-management region      | Type 2            |
| Original acquisition source | Type 0            |
| Previous contact category   | Type 3            |

Do not automatically use Type 2 for every attribute. It increases table size and transformation complexity.

---

# 14. Types of fact tables

## 14.1 Transaction fact table

Records one row per business event.

Examples:

* One appointment.
* One sensor reading.
* One payment.
* One alert acknowledgement.

It is typically inserted when the event occurs.

---

## 14.2 Factless fact table

Records the occurrence of an event or relationship without a conventional numeric measure.

Examples:

* Elder attended an appointment.
* Caregiver was assigned to an elder.
* Elder was eligible for a service.
* Provider was available on a date.

The row itself represents the fact. A count can be calculated from the number of rows.

Factless tables are also useful for analysing what did not happen—for example, eligible elders with no completed annual assessment.

---

## 14.3 Periodic snapshot fact table

Captures the state of a process at regular intervals.

Example grain:

> One row per elder per day.

Possible measures:

* Number of open follow-ups.
* Number of overdue tasks.
* Number of appointments scheduled.
* Days since last completed appointment.
* Active caregiver count.

Periodic snapshots support trends but can generate large volumes because rows are produced even when little changes.

---

## 14.4 Accumulating snapshot fact table

Represents a process with predictable milestones. The same row is updated as the process progresses.

Example appointment lifecycle:

```text
requested_date_key
scheduled_date_key
completed_date_key
cancelled_date_key
request_to_schedule_hours
schedule_to_completion_hours
```

It is useful for analysing pipeline duration and bottlenecks.

An accumulating snapshot is appropriate when:

* A process has identifiable stages.
* Milestones occur over time.
* Users need elapsed-time analysis.
* The process has a reasonably stable lifecycle.

---

# 15. Modelling for analytics and AI

Traditional modelling focuses on transactions and reports. AI systems introduce additional requirements:

* Consistent semantic meaning.
* Point-in-time correctness.
* Training-serving consistency.
* Provenance.
* Feature reproducibility.
* Machine-readable metadata.
* Privacy-aware access.
* Unstructured and graph relationships.

A model prepared for AI should answer:

* What does each field mean?
* When was its value valid?
* Which source produced it?
* Can it be used for training?
* Does it contain sensitive data?
* Which transformation created it?
* Was it available at prediction time?
* How fresh is it?
* Which quality checks passed?

Without these controls, an AI model can suffer from leakage, inconsistent features, stale data, or inappropriate use of sensitive information.

---

# 16. Semantic consistency

Semantic consistency means that the same business concept carries the same meaning across systems and use cases.

Common semantic problems include:

* `customer` meaning account holder in one system and service user in another.
* `revenue` being calculated before tax in one report and after tax in another.
* `completed appointment` including no-shows in one dashboard.
* `active elder` being based on account status in one product and recent activity in another.

Semantic consistency requires:

* Governed definitions.
* Conformed dimensions.
* Standard measures.
* Reference-data mappings.
* Clearly named fields.
* Versioned schemas.
* Semantic-layer definitions.
* Ownership and approval processes.

A metric should include:

* Business definition.
* Formula.
* Grain.
* Valid filters.
* Time interpretation.
* Data owner.
* Source.
* Freshness expectation.
* Known exclusions.

For example:

> Follow-up completion rate equals follow-ups completed on or before their due date divided by all follow-ups that became due during the reporting period, excluding cancelled and invalidated requirements.

This is much safer than exposing a field simply named `completion_rate`.

---

# 17. Knowledge-graph entities

A knowledge graph represents information as entities and relationships.

Examples:

```text
(Elder)-[SUPPORTED_BY]->(Caregiver)
(Elder)-[ATTENDED]->(Appointment)
(Appointment)-[CONDUCTED_BY]->(Provider)
(Appointment)-[GENERATED]->(FollowUp)
(FollowUp)-[ASSIGNED_TO]->(Caregiver)
```

Graph modelling is useful when:

* Relationships are central to the use case.
* Paths between entities matter.
* Relationships are many-to-many.
* New relationship types evolve frequently.
* Users need dependency, lineage, fraud, recommendation, or network analysis.

Graph modelling requires decisions about:

* Node identity.
* Relationship direction.
* Relationship properties.
* Entity resolution.
* Ontology and vocabulary.
* Temporal validity.
* Provenance.

A relationship can also contain properties:

```text
(Caregiver)-[SUPPORTS {
    start_date,
    end_date,
    relationship_type,
    is_primary
}]->(Elder)
```

Relational and graph models can coexist. The relational system may remain the governed source, while graph projections support relationship-heavy queries.

---

# 18. Feature-oriented modelling

Feature-oriented modelling prepares reusable inputs for machine-learning systems.

A feature is a measurable property used by a model.

Examples:

* Number of missed appointments in the previous 90 days.
* Days since last completed follow-up.
* Average response time over 30 days.
* Count of active caregivers.
* Number of coordination gaps currently open.

Every feature should specify:

* Entity: what it describes.
* Value type.
* Transformation logic.
* Event timestamp.
* Computation timestamp.
* Validity window.
* Data source.
* Owner.
* Freshness.
* Null behaviour.
* Privacy classification.
* Version.

For example:

```text
Feature:
elder_missed_appointments_90d

Entity:
elder_id

Definition:
Count of appointments with status NO_SHOW during the 90 days
ending at the feature event timestamp.

Type:
integer

Default:
0

Refresh:
daily
```

Point-in-time correctness is essential. A training row dated June 1 must not use information that became available after June 1.

Otherwise, the model experiences data leakage and may appear more accurate during evaluation than it will be in production.

---

# 19. Machine-readable data products

A data product is not merely a table. It is a governed, discoverable, reliable package of data designed for consumers.

A machine-readable data product may include:

* Schema.
* Field descriptions.
* Data contract.
* Ownership.
* Service-level objectives.
* Quality rules.
* Access policy.
* Lineage.
* Version.
* Example queries.
* Supported use cases.
* Deprecation policy.

Example metadata:

```yaml
name: open_followups
owner: care-coordination-domain
grain: one row per unresolved follow-up
primary_key:
  - follow_up_id
freshness_slo: 2 hours
classification: confidential
quality_rules:
  - follow_up_id is unique and non-null
  - elder_id is non-null
  - due_date is not earlier than created_date
```

Machine-readable definitions allow tools and AI agents to:

* Discover datasets.
* Understand schemas.
* Validate contracts.
* Generate safer queries.
* Identify owners.
* Check freshness.
* Apply access restrictions.
* Trace upstream dependencies.

Human-readable documentation remains valuable, but machine-readable metadata enables automated governance and agentic data management.

---

# 20. Data-mesh modelling

Data mesh treats data as a product owned by business-aligned domains rather than as a responsibility handled only by a central data team.

Core ideas include:

* Domain-oriented ownership.
* Data as a product.
* Self-service data infrastructure.
* Federated computational governance.

In a data mesh, domains may own models such as:

| Domain                 | Owned data products                      |
| ---------------------- | ---------------------------------------- |
| Elder management       | Golden elder profile                     |
| Appointment management | Appointment events                       |
| Provider management    | Governed provider directory              |
| Care coordination      | Open follow-ups and coordination gaps    |
| Alerts                 | Alert events and acknowledgement history |

The challenge is balancing domain autonomy with enterprise consistency.

Without shared standards, domains may define:

* Different elder identifiers.
* Incompatible timestamps.
* Conflicting status values.
* Duplicate measures.
* Inconsistent privacy labels.

Federated governance should therefore standardize:

* Shared identifiers.
* Interoperability contracts.
* Required metadata.
* Security classifications.
* Quality expectations.
* Versioning rules.
* Shared reference data.
* Cross-domain semantic definitions.

Data mesh does not mean every team models data independently without coordination. It means modelling responsibility is distributed while interoperability rules remain governed.

---

# 21. Operational versus analytical modelling

| Aspect         | Operational model                  | Analytical model                |
| -------------- | ---------------------------------- | ------------------------------- |
| Main purpose   | Run business processes             | Analyse business performance    |
| Typical design | Normalized                         | Dimensional                     |
| Data focus     | Current transactions               | Historical events and states    |
| Workload       | Inserts, updates, point reads      | Scans, joins and aggregations   |
| History        | Often limited                      | Usually important               |
| Users          | Applications and operational teams | Analysts, BI and AI teams       |
| Example        | Appointment booking tables         | Appointment fact and dimensions |

A healthy data platform usually needs both.

The operational model should not be directly exposed as the only analytical model because:

* Business logic becomes duplicated across reports.
* Transactional schemas are difficult for analysts.
* Historical changes may not be preserved.
* Queries may affect operational performance.
* Metrics can become inconsistent.

The analytical model should be derived through tested and governed transformations.

---

# 22. Common modelling mistakes

## Mistake 1: Designing tables before understanding the business

This creates technically valid schemas that do not represent real processes.

**Better approach:** Identify entities, definitions, ownership, relationships, and lifecycles first.

## Mistake 2: Using source-system schemas as enterprise models

Source schemas reflect application implementation, not necessarily stable business meaning.

**Better approach:** Preserve raw source data but create governed logical and analytical models.

## Mistake 3: Using surrogate keys without business uniqueness rules

Surrogate keys make every row technically unique, including duplicates.

**Better approach:** Define natural business keys and enforce or test their uniqueness separately.

## Mistake 4: Mixing grains

Combining appointment-level and appointment-service-level records creates double counting.

**Better approach:** Declare one precise grain for each fact table.

## Mistake 5: Treating every numeric column as additive

Averaging averages or summing percentages creates invalid results.

**Better approach:** Classify measures and retain their additive components.

## Mistake 6: Ignoring history

Overwriting dimension values changes the apparent context of historical facts.

**Better approach:** Select SCD handling for each meaningful attribute.

## Mistake 7: Over-normalizing analytical data

A highly normalized warehouse can require many joins and become difficult to use.

**Better approach:** Provide dimensional consumption models with conformed dimensions.

## Mistake 8: Creating indexes without workload evidence

Excessive indexes slow writes and consume storage.

**Better approach:** Base indexes on observed joins, filters, sorting, selectivity, and query plans.

## Mistake 9: Using unclear timestamps

A field called `date` does not explain whether it means creation, scheduling, ingestion, or completion.

**Better approach:** Use event-specific names and define time-zone behaviour.

## Mistake 10: Treating documentation as optional

An undocumented field can be technically available but semantically unusable.

**Better approach:** Store definitions, ownership, classifications, and contracts alongside the model.

## Mistake 11: Allowing sensitive data into every downstream model

Duplicating personal data increases security and compliance risk.

**Better approach:** Apply data minimization, masking, restricted access, and purpose-specific models.

## Mistake 12: Modelling AI features without point-in-time correctness

Future information can leak into training data.

**Better approach:** model event time, availability time, computation time, and version explicitly.

---

# 23. Interview questions and answers

### 1. What is the difference between conceptual, logical, and physical modelling?

A conceptual model identifies business entities and relationships. A logical model adds attributes, keys, cardinality, and normalization without depending heavily on a particular technology. A physical model translates the logical design into database-specific tables, columns, data types, indexes, partitions, and constraints.

### 2. What is the difference between a natural and surrogate key?

A natural key comes from business data, while a surrogate key is generated by the system. Natural keys help express business uniqueness, while surrogate keys provide stable internal identity and simplify integration and historical dimension handling.

### 3. Why do we still need a business key when using a surrogate key?

A surrogate key makes each database row unique but does not prevent duplicate business entities. A business-key constraint or data-quality test is still required to detect multiple rows representing the same real-world object.

### 4. What is normalization?

Normalization organizes relational data according to dependencies so that duplication and insert, update, and delete anomalies are reduced. It is especially useful for operational transactional systems.

### 5. Why are analytical models often denormalized?

Analytical systems optimize for readable, aggregation-heavy queries. Dimensional models reduce joins, centralize business logic, preserve history, and make datasets easier for analysts and BI tools to consume.

### 6. What is grain?

Grain is the precise business meaning of one row in a fact table. It must be declared before selecting dimensions and measures because it determines what can be correctly counted or aggregated.

### 7. What is the difference between a fact and a dimension?

A fact records a measurable event or state, while a dimension provides descriptive context for that fact. An appointment event may be a fact; elder, provider, date, and appointment type may be dimensions.

### 8. What is a conformed dimension?

A conformed dimension is consistently shared across multiple facts or business processes. It enables cross-process analysis using the same keys, attributes, definitions, and history rules.

### 9. Explain SCD Type 1 and Type 2.

Type 1 overwrites the old value and retains no history. Type 2 creates a new dimension row with effective dates and a new surrogate key, preserving the historical context of facts.

### 10. What is a factless fact table?

A factless fact table records the existence of an event or relationship without conventional numeric measures. The presence of a row is itself the fact.

### 11. What is the difference between a periodic and accumulating snapshot?

A periodic snapshot records state at regular intervals, such as one row per elder per day. An accumulating snapshot represents one process and updates milestone columns as that process advances.

### 12. When should a table be partitioned?

Partitioning is valuable for large tables when query filtering, retention, or maintenance aligns with a suitable partition key. It should not be introduced without sufficient volume and a compatible access pattern.

### 13. How does data modelling support AI?

It provides consistent entity definitions, historical validity, point-in-time correctness, provenance, feature definitions, quality metadata, privacy classifications, and machine-readable contracts.

### 14. What is a canonical model?

A canonical model is a standardized representation of shared enterprise concepts. It maps source-specific structures and values into consistent definitions for integration and downstream consumption.

### 15. What is the main modelling challenge in data mesh?

The main challenge is preserving interoperability and semantic consistency while allowing domains to own and evolve their data products independently.

---

# 24. Phase-end knowledge check

1. Why should email generally not be used as the primary key for a person?
2. What business information belongs on a caregiver–elder assignment relationship?
3. How do first, second, and third normal forms address different dependency problems?
4. When would a natural key be preferable to a surrogate key?
5. Why must the grain be defined before measures?
6. What can go wrong when one fact table mixes multiple grains?
7. How does a conformed dimension support cross-domain analytics?
8. Which SCD strategy would you use for correcting a spelling error?
9. Which SCD strategy would you use to preserve historical regional assignments?
10. Why is a percentage usually non-additive?
11. How does a periodic snapshot differ from a transaction fact table?
12. When is an accumulating snapshot useful?
13. Why might a star schema be preferable to a snowflake schema?
14. What makes a data product machine-readable?
15. How does point-in-time correctness prevent ML leakage?
16. What should federated governance standardize in a data mesh?
17. Why should retention be considered during modelling?
18. How can ambiguous timestamp names cause analytical errors?
19. Why does a surrogate key not solve duplicate identity problems?
20. How can semantic inconsistency affect an AI agent?

---

# Phase 1.2 summary

Data modelling begins with business meaning and progressively converts it into implementable and consumable structures:

* **Conceptual models** establish entities, processes, relationships, ownership, cardinality, and lifecycles.
* **Logical models** introduce attributes, keys, normalization, reference data, hierarchies, and canonical structures.
* **Physical models** define types, constraints, indexes, partitions, compression, naming, storage, and retention.
* **Analytical models** organize facts, dimensions, grain, measures, schemas, history, and snapshots.
* **AI-oriented models** add semantic consistency, provenance, point-in-time correctness, reusable features, and machine-readable metadata.
* **Data-mesh models** distribute ownership while preserving enterprise interoperability through federated governance.

The Build section has been intentionally omitted. I will stop here and move to the next phase only when you explicitly ask.
