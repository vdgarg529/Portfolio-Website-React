# Phase 1.5: Workflow Orchestration

## Phase objective

This phase explains how production data workflows are scheduled, coordinated, monitored, recovered, and operated using Apache Airflow.

The central workflow is:

```text
Extract
   ↓
Validate
   ↓
Transform
   ↓
Test
   ↓
Publish
   ↓
Monitor
   ↓
Notify
```

By the end of this phase, you should understand:

* What orchestration is and why data platforms need it.
* Airflow’s architecture and execution model.
* DAGs, tasks, operators, sensors, schedules, and dependencies.
* Retries, timeouts, catchup, backfills, and failure recovery.
* XComs, Variables, Connections, executors, and pools.
* Dynamic and conditional workflows.
* Event-driven and metadata-driven orchestration.
* Human approval gates.
* Integration between deterministic workflows and AI agents.
* Pipeline run history as operational memory.

The implementation/build section is intentionally omitted.

---

# 1. What is workflow orchestration?

Workflow orchestration coordinates multiple units of work so they execute:

* At the correct time.
* In the correct order.
* With the correct configuration.
* Under resource constraints.
* With defined retry and failure behaviour.
* With observable execution history.

Consider a daily customer data product:

```text
Extract CRM data
        ↓
Validate source completeness
        ↓
Transform customer records
        ↓
Run quality tests
        ↓
Publish customer mart
        ↓
Refresh dashboard
        ↓
Notify product owner
```

A shell script could execute these commands sequentially, but a production orchestrator additionally provides:

* Scheduling.
* Dependency tracking.
* Task state.
* Retries.
* Parallel execution.
* Backfills.
* Resource control.
* Logs.
* Alerts.
* Manual intervention.
* Historical visibility.

---

# 2. Orchestration versus processing

Airflow should coordinate computation rather than become the main computation engine.

```text
Airflow task
    ↓
Submit Spark job
    ↓
Monitor execution
    ↓
Record final status
```

Suitable Airflow responsibilities include:

* Starting an ingestion job.
* Executing a database procedure.
* Invoking a dbt transformation.
* Submitting a Spark job.
* Starting a Kubernetes workload.
* Checking for source availability.
* Calling an external API.
* Running a quality gate.
* Publishing completion metadata.

Heavy processing should normally run in systems designed for it:

* PostgreSQL or a cloud warehouse for SQL.
* Spark for distributed batch processing.
* Flink for stream processing.
* Kubernetes for container workloads.
* dbt for analytical transformations.
* Dedicated ML infrastructure for training.

A poor pattern is:

```text
Airflow worker
    ↓
Load 500 GB into local memory
    ↓
Transform everything inside Python
```

This wastes worker resources and makes retries, scalability, and isolation difficult.

A better pattern is:

```text
Airflow worker
    ↓
Submit remote transformation
    ↓
Wait efficiently
    ↓
Capture status and metadata
```

---

# 3. Orchestration versus choreography

## Orchestration

A central coordinator determines the workflow.

```text
Airflow
 ├── Start ingestion
 ├── Run validation
 ├── Trigger transformation
 └── Publish result
```

Benefits:

* Central visibility.
* Explicit dependencies.
* Easier monitoring.
* Controlled recovery.
* Clear execution history.

## Choreography

Services respond to events without one central controller.

```text
FileArrived event
      ↓
Validation service
      ↓ emits Validated event
Transformation service
      ↓ emits Published event
```

Benefits:

* Loose coupling.
* Natural event-driven behaviour.
* Independent scaling.

Challenges:

* Harder end-to-end visibility.
* Complex distributed failure handling.
* Difficult debugging across services.

Production platforms frequently combine them:

```text
External events
       ↓
Trigger an orchestrated workflow
       ↓
Workflow coordinates bounded processing
       ↓
Publish completion event
```

---

# 4. Apache Airflow

Apache Airflow is a platform for developing, scheduling, and monitoring batch-oriented workflows.

A workflow is expressed as a Directed Acyclic Graph, or DAG.

```text
A → B → D
 \→ C ↗
```

The graph is:

* **Directed:** dependencies have a direction.
* **Acyclic:** dependency paths cannot form loops.
* **A graph:** tasks are nodes and dependencies are edges.

Airflow’s current documentation organizes its workload model around DAGs, DAG runs, tasks, operators, sensors, TaskFlow, executors, backfills, XComs, Variables, and related concepts. [Apache Airflow core concepts](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html)

---

# 5. Airflow’s conceptual architecture

A production Airflow environment normally contains several cooperating components.

```text
DAG files
    ↓
DAG processor
    ↓
Metadata database ← Scheduler
                         ↓
                      Executor
                         ↓
                       Workers
                         ↓
                  External systems

Web/API server → Metadata database
Triggerer      → Deferred asynchronous tasks
```

## 5.1 Scheduler

The scheduler:

* Examines DAG schedules.
* Creates DAG runs.
* Determines which task instances are ready.
* Checks dependencies and resource limits.
* Submits eligible tasks to an executor.

The scheduler coordinates work; it should not perform the heavy business transformation itself.

## 5.2 DAG processor

The DAG processor reads workflow definitions and converts them into representations Airflow can schedule.

DAG parsing should be:

* Fast.
* Deterministic.
* Free from expensive external calls.
* Free from unexpected side effects.

## 5.3 Metadata database

The metadata database stores Airflow’s operational state, including:

* DAG runs.
* Task instances.
* Scheduling metadata.
* Connections and Variables metadata.
* XCom references.
* Pools.
* Serialized workflow information.
* Execution history.

It is not the warehouse in which business data should be stored.

## 5.4 Executor

The executor determines how scheduled task instances are launched.

Examples of execution styles include:

* Running locally.
* Running through distributed workers.
* Launching Kubernetes pods.
* Using multiple executor configurations.

## 5.5 Workers

Workers execute task logic.

They may:

* Run Python or shell commands.
* Submit database queries.
* Invoke remote jobs.
* Call APIs.
* Monitor external computations.

## 5.6 Web/API server

The user interface and APIs provide:

* DAG visibility.
* Run history.
* Task logs.
* Manual triggers.
* Retry and clearing controls.
* Administrative operations.

## 5.7 Triggerer

The triggerer supports deferred waiting.

Instead of occupying a worker while waiting for an external condition, a deferrable task can release the worker and resume when its trigger fires.

---

# 6. DAGs

A DAG represents the structure and execution policy of a workflow.

A DAG commonly defines:

* A unique identifier.
* Tasks.
* Dependencies.
* Schedule.
* Start date.
* Parameters.
* Retry defaults.
* Concurrency restrictions.
* Catchup behaviour.
* Tags.
* Documentation.
* Failure callbacks.

Conceptually:

```python
with DAG(
    dag_id="daily_customer_product",
    schedule="@daily",
    catchup=False
):
    extract >> validate >> transform >> test >> publish
```

A DAG describes workflow structure. Each scheduled or manually triggered execution creates a separate DAG run.

---

# 7. DAG definition versus DAG run

The distinction is important:

```text
DAG definition
    = reusable workflow blueprint

DAG run
    = one execution of that blueprint
```

For a daily workflow:

```text
DAG: daily_sales_pipeline

Runs:
2026-09-16 interval
2026-09-17 interval
2026-09-18 interval
```

Each run has independent:

* State.
* Logical date.
* Data interval.
* Task instances.
* Parameters.
* Logs.
* Retry attempts.
* Start and completion times.

---

# 8. Data intervals and logical dates

A scheduled run usually represents a data interval.

Suppose a daily DAG processes:

```text
2026-09-17 00:00
through
2026-09-18 00:00
```

The run may be created after that interval has completed.

This distinction prevents a common misunderstanding:

```text
Run creation time ≠ business interval being processed
```

Tasks should normally use the provided interval boundaries instead of computing “yesterday” from the machine clock.

Better:

```text
Process records where:
event_time >= data_interval_start
AND event_time < data_interval_end
```

Risky:

```text
Process current_date - 1
```

The latter can produce incorrect results during backfills, manual runs, retries, or time-zone changes.

---

# 9. Tasks and task instances

## 9.1 Task

A task is a unit of work defined in the DAG.

Examples:

* Extract one source partition.
* Run one dbt model group.
* Validate a row count.
* Publish one dataset.
* Send one notification.

## 9.2 Task instance

A task instance is a particular task executing for a particular DAG run.

```text
Task definition:
validate_orders

Task instances:
validate_orders for September 16
validate_orders for September 17
validate_orders for September 18
```

Each task instance has a state such as:

* Scheduled.
* Queued.
* Running.
* Success.
* Failed.
* Skipped.
* Upstream failed.
* Deferred.
* Retrying.

Operational debugging usually concerns task instances, not merely task definitions.

---

# 10. Choosing task boundaries

A good task should be:

* Independently retryable.
* Observable.
* Idempotent where possible.
* Bounded in responsibility.
* Meaningful to operators.
* Clear about inputs and outputs.

Bad boundary:

```text
Extract all sources
+ transform everything
+ run every test
+ publish all products
+ notify everyone
```

If the final notification fails, the entire process may need to be repeated.

Better boundaries:

```text
extract_customers
extract_orders
        ↓
validate_sources
        ↓
run_dbt_models
        ↓
run_quality_gate
        ↓
publish_product
        ↓
notify_consumers
```

Tasks should not be made excessively small either. Thousands of tiny tasks can create scheduling and metadata overhead.

---

# 11. Operators

An operator is a reusable task template describing a category of work.

Common categories include:

## 11.1 Action operators

Perform work:

* Execute Python.
* Run a shell command.
* Submit SQL.
* Launch a container.
* Invoke a cloud service.
* Transfer data.

## 11.2 Transfer operators

Move data between systems:

```text
Object storage → warehouse
Database → object storage
API response → landing zone
```

Transfer operations still require:

* Idempotency.
* Validation.
* Checkpointing.
* Security.
* Reconciliation.

## 11.3 Sensors

Wait for a condition.

Examples:

* File exists.
* Database partition is ready.
* External workflow completed.
* API reports success.
* Required dataset has been updated.

## 11.4 Custom operators

A custom operator may be appropriate when the organization repeatedly needs the same integration and operational behaviour.

A good custom operator standardizes:

* Authentication.
* Job submission.
* Logging.
* Retry classification.
* Result collection.
* Metadata emission.

It should not hide arbitrary business logic behind an opaque abstraction.

---

# 12. TaskFlow API

The TaskFlow API allows Python functions to be declared as tasks.

Conceptually:

```python
@task
def identify_partitions():
    return ["2026-09-16", "2026-09-17"]

@task
def validate(partitions):
    ...
```

It makes dependency and data-flow declarations easier for Python-oriented workflows.

However:

* The function is still an Airflow task.
* Large values should not be returned through task metadata.
* Heavy computation should still be delegated appropriately.
* Task boundaries must remain operationally meaningful.

---

# 13. Sensors

A sensor waits until a condition becomes true.

Example:

```text
Wait until:
incoming/orders/2026-09-18/_SUCCESS exists
```

A sensor repeatedly evaluates:

```text
Is the condition satisfied?
```

If yes, the workflow continues. If not, it waits according to its configured behaviour.

---

# 14. Sensor execution modes

## 14.1 Worker-occupying wait

A sensor may occupy a worker slot while waiting.

Suitable only for:

* Very short waits.
* Frequent checks.
* Situations where worker capacity is not a concern.

## 14.2 Reschedule-style wait

The sensor releases its worker slot between checks and is scheduled again later.

Useful for longer waits, though repeated rescheduling still creates scheduler and metadata activity.

## 14.3 Deferrable wait

A deferrable operator transfers waiting to the triggerer and resumes when the condition is satisfied.

Suitable for:

* Long external waits.
* Large numbers of concurrent sensors.
* Efficient use of worker capacity.

A sensor should also define:

* Poll interval.
* Total timeout.
* Failure behaviour.
* Whether absence means delay, skip, or failure.
* How late source arrival should be reported.

---

# 15. Scheduling

A DAG can be triggered through:

* A time-based schedule.
* A manually requested run.
* An external API.
* Another workflow.
* A data or asset update.
* An external event.
* A backfill request.

Time-based schedules may include:

```text
Hourly
Daily
Weekly
Cron expression
Custom timetable
```

The schedule should reflect business needs rather than arbitrary technical convenience.

Examples:

```text
Daily finance report:
After the accounting day closes

Hourly customer product:
After source partitions are expected

Weekly compliance export:
After weekly validation completes
```

---

# 16. Time zones and daylight-saving behaviour

Scheduling should use explicit time zones.

Potential problems include:

* Local clock changes.
* Daylight-saving transitions.
* Source systems using different time zones.
* Business dates differing from UTC dates.
* Timestamps without zone information.

Recommended principles:

* Store technical timestamps in UTC.
* Define business calendars explicitly.
* Use timezone-aware datetime values.
* Model business dates separately from system timestamps.
* Test daylight-saving transitions where applicable.

For India-based workflows, IST does not observe daylight saving, but upstream and downstream international systems may.

---

# 17. Dependencies

Dependencies define execution order.

Linear dependency:

```text
extract → validate → transform
```

Fan-out:

```text
              ┌→ transform_customers
validate_data ├→ transform_orders
              └→ transform_payments
```

Fan-in:

```text
transform_customers ─┐
transform_orders ────┼→ publish
transform_payments ──┘
```

Dependencies should represent actual requirements.

Do not make independent tasks sequential merely for visual simplicity, because unnecessary sequencing increases runtime.

---

# 18. Trigger rules and control flow

A downstream task may need different rules for deciding whether it can run.

Examples:

## All upstream tasks succeeded

Suitable for transformations and publication:

```text
validate_all_sources → publish
```

## At least one upstream task succeeded

Suitable where optional branches exist.

## Run after all upstream tasks finish

Suitable for cleanup or final-status collection.

## Run when an upstream task fails

Suitable for failure-specific remediation or notification.

The final DAG state must be understood carefully. A notification or cleanup task succeeding should not accidentally conceal a critical upstream failure.

---

# 19. Branching

Branching selects one or more workflow paths based on runtime information.

Example:

```text
Check file size
   ├── Empty → record_no_data
   └── Non-empty → process_file
```

Another example:

```text
Assess data quality
   ├── Pass → publish
   ├── Warn → publish_with_warning
   └── Fail → quarantine
```

Branch decisions should be:

* Deterministic.
* Logged.
* Explainable.
* Based on explicit metadata.
* Tested for every possible path.

Skipped branches are not failures. Downstream trigger rules must therefore account for skipped states correctly.

---

# 20. Conditional pipeline execution

Conditional execution may depend on:

* Source availability.
* File size.
* Schema version.
* Data-quality result.
* Business calendar.
* Runtime parameter.
* Change detection.
* Product configuration.
* Approval state.
* Cost threshold.

Example:

```text
Has source data changed?
    ├── No → mark unchanged and stop
    └── Yes → transform and publish
```

Another example:

```text
Quality score
    ├── ≥ 99.9% → publish automatically
    ├── 98–99.9% → require approval
    └── < 98% → quarantine
```

Conditions that affect publication should be retained as audit metadata.

---

# 21. Retries

Retries handle transient failures.

Suitable retry cases:

* Temporary network timeout.
* HTTP 429.
* HTTP 503.
* Temporary database unavailability.
* Short broker interruption.
* Temporary object-storage error.

Unsuitable retry cases:

* Invalid SQL.
* Unsupported schema version.
* Missing mandatory business key.
* Permanently revoked credentials.
* Deterministic data-quality failure.
* Code defect.

Retrying permanent failures delays diagnosis and consumes resources.

---

# 22. Retry configuration

A retry policy should define:

* Maximum attempts.
* Initial delay.
* Exponential backoff.
* Maximum delay.
* Jitter where available.
* Which failures are retryable.
* Alerting point.
* Idempotency behaviour.

Example:

```text
Attempt 1 fails
Wait 1 minute

Attempt 2 fails
Wait 2 minutes

Attempt 3 fails
Wait 4 minutes

Final failure
Alert owner and stop publication
```

Retries must be safe.

If a task partially writes output and then fails, repeating it must not create:

* Duplicate rows.
* Duplicate files.
* Duplicate alerts.
* Duplicate API transactions.
* Incorrect checkpoints.

---

# 23. Idempotent task design

An idempotent task produces the same correct final state when repeated.

Possible techniques include:

* Upsert using a stable key.
* Replace a known partition.
* Write to a temporary location and atomically publish.
* Use deterministic object names.
* Record processed delivery IDs.
* Verify output before repeating.
* Separate calculation from external side effects.

Unsafe pattern:

```text
Retry task
    ↓
Append same records again
```

Safer pattern:

```text
Retry task
    ↓
Merge by business key and source version
```

Airflow provides retries, but the task’s target operation determines whether retries are correct.

---

# 24. Timeouts

Different timeout concepts serve different purposes.

## Task execution timeout

Limits how long a task attempt may run.

## Sensor timeout

Limits how long a sensor may wait for its condition.

## DAG run timeout

Limits the duration of the overall workflow run.

## External-job timeout

Limits how long Airflow waits for a submitted external job.

Timeouts should reflect expected workload distributions rather than arbitrary round numbers.

A timeout should also lead to a defined response:

* Retry.
* Cancel external work.
* Mark failure.
* Quarantine.
* Escalate.
* Continue through an approved fallback.

Otherwise, the external computation may continue even after Airflow considers the task failed.

---

# 25. Catchup

Catchup determines whether Airflow should create runs for past scheduled intervals that have not been executed.

Suppose:

```text
DAG start date: September 1
DAG enabled:    September 5
Schedule:       Daily
```

With catchup enabled, Airflow may create runs for the missing intervals.

With catchup disabled, it generally begins with the current scheduling period.

Catchup is useful when:

* Historical intervals must be processed.
* The workflow is interval-aware.
* Tasks are idempotent.
* Source history remains available.

Catchup may be dangerous when:

* A DAG produces notifications.
* Tasks always use current time.
* Historical executions trigger external side effects.
* Large historical load could overwhelm systems.

---

# 26. Backfills

A backfill intentionally creates or reprocesses historical intervals.

Example:

```text
Reprocess:
2026-07-01 through 2026-07-31
```

Backfills may be needed because:

* The pipeline was introduced after historical data existed.
* A transformation defect was corrected.
* A new column or metric was added.
* A source delivered missing data.
* Historical results must be restated.

Current Airflow documentation treats backfills as controlled reprocessing with options around concurrency, run ordering, dry runs, and partitioned workflows. [Apache Airflow backfill concepts](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html)

---

# 27. Backfill safety

Before running a backfill, define:

* Exact interval.
* Code version.
* Source snapshot or availability.
* Target tables and partitions.
* Maximum parallel runs.
* Resource pool.
* Interaction with current production runs.
* Publication behaviour.
* Notification suppression.
* Validation criteria.
* Rollback or correction method.

A backfill should carry metadata such as:

```text
is_backfill = true
backfill_id = BF_2026_0918_01
requested_by = data_platform
reason = corrected_currency_logic
code_version = release_4_8
```

Backfill tasks should not accidentally:

* Send historical customer emails.
* Retrigger operational alerts.
* Overwrite newer state with old state.
* Overload source systems.
* Consume all transformation capacity.
* Republish events without marking them historical.

---

# 28. Catchup versus backfill

| Aspect      | Catchup                                     | Backfill                                          |
| ----------- | ------------------------------------------- | ------------------------------------------------- |
| Purpose     | Automatically create missing scheduled runs | Intentionally process a selected historical range |
| Trigger     | Scheduler behaviour                         | Explicit operational action                       |
| Control     | Broad scheduling configuration              | Usually more controlled                           |
| Typical use | Routine interval completion                 | Recovery, historical loading, corrections         |
| Risk        | Unexpected large run creation               | Operational overload or historical side effects   |

Catchup is not a complete replacement for a governed backfill process.

---

# 29. XCom

XCom means cross-communication between tasks.

It allows tasks to exchange small control values or references.

Suitable values include:

* Generated file path.
* External job identifier.
* Row count.
* Validation status.
* Partition list.
* Manifest location.
* Model version.
* Published table reference.

Example:

```text
submit_spark_job
    ↓ XCom: job_id = "spark_9182"
monitor_spark_job
```

XCom should not normally carry:

* Large DataFrames.
* Entire files.
* Large API responses.
* Sensitive payloads.
* Large binary objects.

Better pattern:

```text
Task A writes data to object storage
        ↓
XCom contains object URI
        ↓
Task B reads from object storage
```

Airflow supports standard and configurable XCom backends, but XCom remains workflow metadata rather than a general data-transfer system. [Apache Airflow communication concepts](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html)

---

# 30. Variables, parameters, and XComs

These concepts serve different purposes.

| Mechanism          | Intended use                              |
| ------------------ | ----------------------------------------- |
| Variable           | Shared runtime configuration              |
| Parameter          | Input supplied for a DAG run              |
| XCom               | Small value passed between task instances |
| Connection         | Credentials and endpoint configuration    |
| Environment/config | Deployment-level configuration            |

Examples:

```text
Variable:
default_data_quality_threshold = 0.995

Parameter:
backfill_start_date = 2026-08-01

XCom:
extracted_row_count = 98231

Connection:
warehouse_prod
```

Do not use Variables as a high-frequency transactional database. Excessive Variable lookups during DAG parsing can reduce scheduler performance.

---

# 31. Connections

A Connection stores information required to connect to an external system.

It may include:

* Connection type.
* Host.
* Port.
* Database or schema.
* Login identity.
* Credential reference.
* Additional encrypted configuration.

Examples:

```text
postgres_warehouse
aws_data_lake
kafka_cluster
dbt_cloud
```

Security principles include:

* Use least privilege.
* Avoid hard-coding credentials in DAG files.
* Prefer a secret manager.
* Rotate credentials.
* Separate development and production identities.
* Restrict who can view or modify Connections.
* Avoid exposing secret fields in logs.

A task should generally refer to a logical connection ID instead of embedding environment-specific endpoints.

---

# 32. Executors

An executor determines where and how task instances run.

## 32.1 Local execution

Tasks run on the Airflow host or local processes.

Suitable for:

* Development.
* Small workloads.
* Simple deployments.

Limitations:

* Limited isolation.
* Limited horizontal scaling.
* Shared host resources.

## 32.2 Queue-based distributed execution

Tasks are sent through a queue to distributed workers.

Suitable for:

* Stable worker fleets.
* Large task volumes.
* Workload queues.
* Horizontal scaling.

Operational needs include:

* Queue availability.
* Worker lifecycle management.
* Autoscaling.
* Dependency consistency.
* Monitoring orphaned work.

## 32.3 Kubernetes-based execution

Tasks run in separate Kubernetes pods.

Benefits:

* Strong task isolation.
* Per-task resource configuration.
* Elastic scaling.
* Different container images.
* Workload-specific dependencies.

Trade-offs:

* Pod startup latency.
* Kubernetes complexity.
* Image-management overhead.
* Cluster cost.
* Log and cleanup management.

## 32.4 Multiple execution approaches

Modern Airflow deployments may route workloads through different executor configurations. For example:

```text
Lightweight task → local worker
Standard ETL task → distributed worker queue
GPU ML task → specialized Kubernetes execution
```

Executor selection should match workload isolation, scaling, latency, and operational requirements.

---

# 33. Pools

Pools limit concurrency for a category of tasks.

Suppose an external API permits only five concurrent requests:

```text
Pool: provider_api
Slots: 5
```

Even if 100 tasks are ready, only work fitting within the available slots can run.

Pools protect:

* Source databases.
* Third-party APIs.
* Warehouses.
* GPU capacity.
* Limited licences.
* Expensive compute.
* Shared network resources.

Airflow pools can assign slots and task priorities, allowing scarce execution capacity to be governed centrally. [Apache Airflow pools](https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/pools.html)

---

# 34. Pool slots and priority

Not every task consumes the same capacity.

Example:

```text
Small metadata check: 1 slot
Large warehouse transformation: 4 slots
Historical backfill partition: 6 slots
```

Priority weights may influence which queued tasks receive available capacity first.

A useful policy might prioritize:

1. Critical production publication.
2. Production recovery.
3. Routine transformations.
4. Development workloads.
5. Historical backfills.

Pools do not replace external-system rate limits, but they prevent Airflow from knowingly exceeding planned concurrency.

---

# 35. Concurrency controls

Concurrency may be controlled at multiple levels:

* Entire Airflow environment.
* Executor.
* Pool.
* DAG.
* Active DAG runs.
* Task.
* Mapped task.
* External platform.

Example:

```text
Environment supports 500 tasks
Warehouse pool allows 40 slots
Finance DAG allows 4 active runs
Large transform uses 5 pool slots
```

These controls should work together.

Too little concurrency causes unnecessary delay. Too much concurrency may:

* Overload source systems.
* Increase warehouse cost.
* Trigger API throttling.
* Cause memory exhaustion.
* Reduce overall throughput through contention.

---

# 36. Dynamic task mapping

Dynamic task mapping creates task instances at runtime based on current data.

Example:

```text
discover_files
     ↓ returns 12 filenames
process_file expands into 12 task instances
     ↓
combine_results
```

This differs from creating tasks through a normal loop while parsing the DAG. With runtime mapping, the scheduler determines the number of task instances from upstream output. Airflow supports map-and-reduce-style patterns and runtime expansion through mapped inputs. [Apache Airflow dynamic task mapping](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html)

Suitable cases include:

* One task per incoming file.
* One task per source table.
* One task per customer tenant.
* One task per partition.
* One task per region.
* One task per model group.

---

# 37. Dynamic mapping risks

Dynamic mapping requires limits.

Suppose source metadata unexpectedly returns one million objects:

```text
1,000,000 objects
       ↓
1,000,000 task instances
```

This can overwhelm:

* Scheduler.
* Metadata database.
* Executor.
* User interface.
* External systems.
* Operational teams.

Controls include:

* Maximum mapping size.
* Input validation.
* Chunking.
* Pool assignment.
* Mapped-task concurrency.
* Batching small work items.
* Failure isolation.
* Clear mapped-instance naming.

Use dynamic mapping when each mapped unit is operationally valuable. Do not create one Airflow task for every tiny record.

---

# 38. Dynamic DAG generation

Dynamic DAG generation creates workflow structure from code or metadata.

Examples:

* One DAG per business domain.
* One workflow per data product.
* One DAG from a source configuration.
* One task group per configured system.

Possible metadata:

```yaml
product: customer_360
schedule: hourly
sources:
  - crm_customers
  - billing_accounts
quality_profile: critical
owner: customer_domain
```

The system generates a consistent DAG using this configuration.

Dynamic DAG generation differs from dynamic task mapping:

| Dynamic DAG generation                  | Dynamic task mapping                      |
| --------------------------------------- | ----------------------------------------- |
| Structure created during parsing        | Task instances expanded during execution  |
| Based on configuration/code             | Often based on runtime upstream output    |
| Scheduler sees generated structure      | Scheduler expands mapped tasks at runtime |
| Useful for repeatable workflow families | Useful for variable numbers of work items |

---

# 39. Safe dynamic DAG generation

A generated DAG framework should provide:

* Stable IDs.
* Deterministic ordering.
* Schema-validated configuration.
* Ownership metadata.
* Standard retries and timeouts.
* Standard pools.
* Documentation.
* Versioning.
* Automated tests.
* Controlled deployment.

Avoid expensive API or database calls at DAG parse time.

Unsafe:

```text
Every scheduler parse:
Call external API
List every customer
Generate workflows
```

Safer:

```text
Deployment process:
Generate validated configuration artifact

Scheduler parse:
Read deterministic local configuration
```

---

# 40. Orchestration graphs

An orchestration graph represents operational dependencies.

Example:

```text
CRM ingestion ────────────┐
Billing ingestion ────────┼→ Customer transformation
Support ingestion ────────┘
                                   ↓
                             Quality gate
                                   ↓
                           Customer product
                                   ↓
                         Dashboard and AI index
```

The graph communicates:

* Execution order.
* Parallelism.
* Critical path.
* Failure propagation.
* Resource contention.
* Publication dependencies.
* Recovery boundaries.

A graph should model real dependencies. Over-connecting tasks creates unnecessary coupling; under-connecting them allows invalid execution order.

---

# 41. Critical path

The critical path is the longest dependency path determining the earliest completion time.

Example:

```text
A: 5 min ─→ C: 20 min ─→ E: 4 min
B: 8 min ─→ D: 3 min  ─→ E
```

The first branch takes longer and determines completion.

Critical-path analysis helps identify whether to optimize:

* A long transformation.
* A blocking sensor.
* Sequential work that could be parallel.
* Resource-queue delay.
* Repeated initialization.
* An unnecessarily broad quality gate.

Optimizing a non-critical task may not improve total workflow duration.

---

# 42. Event-driven orchestration

Time-based orchestration asks:

```text
Is it 2:00 AM?
```

Event-driven orchestration asks:

```text
Has the required data or business event arrived?
```

Possible events include:

* A file arrival.
* A completed source partition.
* A published dataset.
* A successful upstream workflow.
* A message on a broker.
* A model-training completion event.
* A human approval event.

Current Airflow versions support event-oriented scheduling patterns, including asset-based and message-related scheduling capabilities. Event expressions should represent state changes rather than permanently true conditions, otherwise workflows can be triggered repeatedly. [Apache Airflow event-driven scheduling](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/event-scheduling.html)

---

# 43. Time-driven versus event-driven scheduling

| Aspect         | Time-driven                      | Event-driven                   |
| -------------- | -------------------------------- | ------------------------------ |
| Trigger        | Clock or calendar                | External event or asset change |
| Latency        | Depends on schedule interval     | Can react quickly              |
| Missing source | Workflow may start and wait/fail | No run until event occurs      |
| Predictability | Regular run times                | Depends on event arrival       |
| Complexity     | Simpler                          | Requires event reliability     |
| Recovery       | Rerun interval                   | Replay or reconstruct event    |

A hybrid design is common:

```text
Event trigger for low latency
          +
Scheduled reconciliation for completeness
```

---

# 44. Asset-aware orchestration

An asset represents a meaningful data output such as:

```text
warehouse.customer_orders
lake.cleaned_telemetry
mart.daily_revenue
```

A producing workflow updates the asset:

```text
orders_pipeline → customer_orders asset
```

A consuming workflow is triggered or made eligible:

```text
customer_orders asset → revenue_reporting
```

This expresses dependency in terms of data availability rather than DAG identity.

Benefits:

* Producer and consumer are less tightly coupled.
* Lineage becomes more data-oriented.
* Consumers can depend on meaningful products.
* Schedules can reflect actual data changes.

Asset updates must represent successful and valid publication—not merely task completion.

---

# 45. Metadata-driven orchestration

Metadata-driven orchestration uses configuration to determine workflow behaviour.

Metadata may specify:

* Source.
* Destination.
* Schedule.
* Incremental key.
* Validation rules.
* Owner.
* Retry profile.
* Pool.
* Publication target.
* Security classification.
* SLA or deadline.

Example:

```yaml
dataset: appointments
source: hospital_postgres
mode: incremental
watermark: updated_at
schedule: hourly
quality_profile: critical
owner: care_operations
```

Benefits:

* Consistency.
* Faster onboarding.
* Standardized governance.
* Reduced duplicated DAG code.
* Easier global policy updates.

Risks:

* Configuration becomes an implicit programming language.
* Invalid metadata can affect many workflows.
* Excessive abstraction makes debugging difficult.
* One template may not fit every source.

Metadata must therefore be versioned, validated, tested, and reviewed like code.

---

# 46. Human approval steps

Some workflows require deliberate human authorization before a sensitive action.

Examples:

* Publishing a restated financial report.
* Releasing data with quality warnings.
* Deleting historical records.
* Starting an expensive backfill.
* Promoting a model.
* Granting sensitive data access.

Conceptual flow:

```text
Prepare candidate output
        ↓
Run automated checks
        ↓
Create approval request
        ↓
Pause without occupying worker
        ↓
Approve / reject / expire
        ↓
Continue or terminate
```

The approval record should contain:

* Request ID.
* Workflow and run.
* Proposed action.
* Evidence.
* Risk summary.
* Requester.
* Approver.
* Decision.
* Timestamp.
* Comments.
* Expiry.
* Resulting action.

---

# 47. Approval safety

Human approval should not be represented by an informal chat message with no durable link to the workflow.

A production approval mechanism needs:

* Authenticated identity.
* Authorization rules.
* Separation of duties when required.
* Tamper-resistant audit history.
* Timeout and escalation.
* Clear approved scope.
* Revalidation after long delays.
* Protection against duplicate actions.

An approval should authorize a specific immutable candidate.

If the data, parameters, or code change after approval, the previous approval should normally become invalid.

---

# 48. Alerts

Alerts inform operators when action may be required.

Possible triggers include:

* Task failure.
* Exhausted retries.
* Deadline miss.
* Source freshness breach.
* Data-quality failure.
* Excessive runtime.
* Queue delay.
* Pool saturation.
* Backfill failure.
* Unusual volume.

A useful alert answers:

```text
What failed?
Which data product is affected?
When did it begin?
What is the business impact?
What evidence is available?
What action should the operator take?
Who owns the problem?
```

Weak alert:

```text
Task failed.
```

Better alert:

```text
Customer mart publication blocked.
Reason: CRM row count is 42% below baseline.
Affected interval: 2026-09-18.
Owner: Customer Data.
Runbook: ...
```

---

# 49. Avoiding alert fatigue

Alert fatigue occurs when too many low-value notifications train operators to ignore them.

Reduce it by:

* Alerting on consumer impact.
* Deduplicating repeated alerts.
* Grouping related failures.
* Suppressing secondary downstream failures.
* Using severity levels.
* Routing alerts to the correct owner.
* Closing alerts automatically after recovery.
* Monitoring alert usefulness.

A single upstream outage may cause 100 downstream task failures. Operators usually need one correlated incident, not 100 identical messages.

---

# 50. Service-level agreements and deadlines

A service-level agreement describes an expected service commitment.

In orchestration, useful timing concepts include:

* Expected task duration.
* Required product publication time.
* Maximum acceptable freshness delay.
* Incident acknowledgment target.
* Recovery target.

Example:

```text
Daily finance product must be published by 6:00 AM IST.
```

This business deadline is more meaningful than:

```text
transform_task should finish within 30 minutes.
```

The product can miss its deadline because of:

* Late source arrival.
* Queue delay.
* Sensor waiting.
* Retry delay.
* Slow transformation.
* Quality investigation.
* Publication failure.

Modern Airflow documentation includes deadline alerting alongside task timing and retry concepts, so production monitoring should focus on the end-to-end business deadline rather than only one task’s runtime. [Apache Airflow core concepts](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html)

---

# 51. SLI, SLO, and SLA

## Service-Level Indicator

A measured value:

```text
Publication time = 05:42
```

## Service-Level Objective

An internal reliability target:

```text
99% of daily runs publish before 06:00.
```

## Service-Level Agreement

A formal commitment, potentially with business consequences:

```text
The approved finance dataset will be available by 06:00
on 99% of business days.
```

Not every task needs an SLA. Product-level objectives generally provide more value.

---

# 52. Failure propagation

Failures should be classified by scope.

## Task-local failure

One partition fails while others remain valid.

Possible action:

* Retry the partition.
* Quarantine it.
* Continue unaffected partitions.

## Source-wide failure

A source database is unavailable.

Possible action:

* Stop all dependent extraction.
* Avoid repeated source pressure.
* Alert source owner.

## Product-level failure

Output cannot meet its contract.

Possible action:

* Block publication.
* Retain previous valid version.
* Notify consumers.

## Platform-level failure

Scheduler, executor, metadata database, or credentials are unavailable.

Possible action:

* Activate platform incident response.
* Pause risky workloads.
* Recover orchestration state.

The failure boundary should determine the retry and recovery boundary.

---

# 53. Failure recovery

A recoverable workflow must answer:

* Which work completed?
* Which output was durably committed?
* Which checkpoint is authoritative?
* Can failed tasks be repeated safely?
* Must downstream output be removed?
* Are external jobs still running?
* Were consumers exposed to partial output?
* Can publication be rolled back?
* How will correctness be verified?

Possible recovery operations include:

* Retry task.
* Clear and rerun task.
* Rerun selected downstream tasks.
* Rerun complete DAG interval.
* Launch controlled backfill.
* Restore previous published version.
* Repair data and resume.
* Quarantine failed partition.

Manual clearing is not a complete recovery strategy unless the consequences are understood.

---

# 54. Data-quality gates

A quality gate decides whether data can proceed to publication.

```text
Transformation completed
        ↓
Schema checks
        ↓
Uniqueness checks
        ↓
Referential checks
        ↓
Reconciliation
        ↓
Volume and freshness checks
        ↓
Publish or block
```

Possible outcomes:

| Result                 | Action                                            |
| ---------------------- | ------------------------------------------------- |
| Pass                   | Publish                                           |
| Pass with warning      | Publish and record warning                        |
| Requires review        | Await approval                                    |
| Fail                   | Block publication                                 |
| Partial source failure | Publish unaffected scope only if contract permits |

The quality decision, evidence, thresholds, and responsible owner should be retained.

---

# 55. Publication pattern

A product should not become visible incrementally while still being generated.

Unsafe:

```text
Delete current table
       ↓
Insert records for 20 minutes
       ↓
Consumers observe partial data
```

Safer:

```text
Build candidate output
       ↓
Validate candidate
       ↓
Atomically promote candidate
       ↓
Record publication metadata
       ↓
Notify consumers
```

Publication metadata might include:

```text
product_version
data_interval
published_at
source_versions
quality_status
pipeline_run_id
code_version
```

---

# 56. Cross-DAG dependencies

Workflows sometimes depend on other workflows.

Possible methods include:

* Asset-based dependencies.
* External task state.
* Triggering another DAG.
* External events.
* Shared completion metadata.

Direct workflow-to-workflow dependencies can create tight coupling:

```text
DAG A knows exact task ID inside DAG B
```

A product-oriented dependency is often more stable:

```text
DAG A waits for validated customer asset
```

Prefer dependency on a meaningful published result rather than incidental internal task structure.

---

# 57. SubDAGs and task groups

## Task groups

Task groups visually and logically organize related tasks inside a DAG.

Example:

```text
customer_processing
  ├── clean_customer
  ├── resolve_identity
  └── validate_customer
```

They improve readability without necessarily creating a separate execution boundary.

## Separate DAGs

Use separate DAGs when workflows have independent:

* Schedules.
* Ownership.
* Deployment lifecycle.
* Recovery process.
* Access control.
* Product outputs.

A visual group should not be confused with a separately owned workflow.

---

# 58. Pipeline run history

Airflow retains run-level and task-level execution history.

Useful run metadata includes:

* DAG ID.
* Run ID.
* Logical interval.
* Trigger type.
* Start and end times.
* Task states.
* Retry counts.
* Parameters.
* Code version.
* Data inputs.
* Published outputs.
* Quality results.
* Failure classification.
* Manual actions.

This history supports:

* Debugging.
* Auditing.
* Capacity planning.
* Reliability analysis.
* Backfill decisions.
* Root-cause analysis.

However, raw orchestration metadata may not capture the business explanation behind operational decisions.

---

# 59. Operational memory

Operational memory extends execution history with structured knowledge about what happened and why.

Example:

```text
Incident:
CRM source delivered 40% fewer records.

Diagnosis:
Upstream regional export was incomplete.

Decision:
Block customer product publication.

Remediation:
Source owner resent partition.

Recovery:
Reprocessed interval and reconciled counts.

Prevention:
Added region-level completeness control.
```

Operational memory may store:

* Incident summaries.
* Root causes.
* Remediation steps.
* Human decisions.
* Approval evidence.
* Known failure signatures.
* Successful recovery procedures.
* Links to affected runs.
* Post-incident actions.

This transforms historical logs into reusable operational knowledge.

---

# 60. Pipeline run history versus operational memory

| Run history           | Operational memory                   |
| --------------------- | ------------------------------------ |
| Records task states   | Records interpretation and decisions |
| System-generated      | System- and human-generated          |
| Answers what happened | Answers why and how it was resolved  |
| Run-specific          | Reusable across future incidents     |
| Logs and timestamps   | Root cause, decision and remediation |

Both are required for mature operations.

---

# 61. Agentic orchestration

Agentic orchestration introduces AI agents into selected workflow activities.

Possible uses include:

* Summarizing failure evidence.
* Classifying incidents.
* Recommending a recovery procedure.
* Generating investigation queries.
* Finding similar historical failures.
* Proposing a backfill interval.
* Explaining lineage impact.
* Preparing an approval request.

Safe pattern:

```text
Deterministic Airflow workflow
        ↓
Collect bounded evidence
        ↓
Agent analyzes evidence
        ↓
Agent proposes action
        ↓
Policy validation
        ↓
Human or deterministic approval
        ↓
Airflow executes authorized action
```

Airflow remains responsible for controlled execution and state. The agent assists with reasoning.

---

# 62. Deterministic versus agentic responsibilities

| Deterministic orchestration | Agentic assistance                                |
| --------------------------- | ------------------------------------------------- |
| Schedule runs               | Interpret unusual context                         |
| Enforce dependencies        | Summarize failure evidence                        |
| Execute approved tasks      | Suggest likely root causes                        |
| Apply retry limits          | Recommend remediation                             |
| Enforce permissions         | Find similar incidents                            |
| Record state                | Create human-readable explanation                 |
| Publish verified output     | Propose—but not silently authorize—risky action |

An agent should not independently perform destructive or high-impact actions without:

* Bounded permissions.
* Policy validation.
* Evidence.
* Audit logging.
* Approval where required.
* Rollback or recovery planning.

---

# 63. Agent tool boundaries

An operational agent might receive narrowly scoped tools such as:

```text
read_task_logs
read_run_metadata
query_lineage
compare_row_counts
find_similar_incidents
propose_task_retry
create_approval_request
```

It should not automatically receive unrestricted abilities such as:

```text
execute arbitrary SQL
delete production tables
change credentials
disable quality checks
trigger unlimited backfills
```

Tool calls should be:

* Authenticated.
* Authorized.
* Logged.
* Idempotent where possible.
* Limited by scope.
* Associated with a run and reason.

---

# 64. Agent-assisted incident response

A controlled incident process may be:

```text
Pipeline failure
      ↓
Gather logs, lineage and metrics
      ↓
Agent classifies likely cause
      ↓
Retrieve similar resolved incidents
      ↓
Generate recommended action
      ↓
Validate against policy
      ↓
Human approval if required
      ↓
Execute through Airflow
      ↓
Verify recovery
      ↓
Store operational memory
```

The recommendation should include:

* Evidence.
* Confidence.
* Assumptions.
* Affected assets.
* Proposed action.
* Risk.
* Rollback method.
* Required approval.

---

# 65. Observability

Airflow observability should cover more than task success.

## Scheduler health

* Scheduling delay.
* Parsing time.
* Heartbeats.
* Number of queued tasks.
* Orphaned tasks.

## Executor and worker health

* Worker capacity.
* Queue depth.
* Task startup delay.
* Worker failures.
* Resource utilization.

## Workflow health

* Run duration.
* Failure rate.
* Retry rate.
* Success by interval.
* Critical-path duration.

## Data health

* Freshness.
* Completeness.
* Quality results.
* Reconciliation.
* Published version.

## Business health

* Product availability.
* Consumer impact.
* Deadline attainment.
* Incident duration.

A green Airflow DAG does not prove the data is correct.

---

# 66. Important latency measurements

Useful measurements include:

```text
Scheduling delay =
task_scheduled_at - task_became_eligible_at

Queue delay =
task_started_at - task_queued_at

Execution time =
task_finished_at - task_started_at

Pipeline duration =
publication_time - run_start_time

Source-to-publication latency =
publication_time - latest_source_event_time
```

These measurements locate different bottlenecks.

For example:

* High scheduling delay indicates scheduler pressure.
* High queue delay indicates insufficient execution capacity.
* High execution time indicates task or external-system slowness.
* High source-to-publication latency may begin upstream of Airflow.

---

# 67. Logging

Task logs should contain:

* Run and task identifiers.
* Data interval.
* External job ID.
* Input and output references.
* Record counts.
* Major execution stages.
* Classified errors.
* Correlation IDs.
* Final status.

Logs should not contain:

* Passwords.
* Access tokens.
* Authorization headers.
* Full personal records.
* Medical notes.
* Sensitive raw payloads.

Prefer:

```text
source=hospital_a
partition=2026-09-18
records=12504
quality_status=passed
```

over printing entire records.

---

# 68. Security and access control

A production Airflow deployment should enforce:

* Authentication.
* Role-based access.
* Least-privilege task identities.
* Secret management.
* Encrypted communication.
* Restricted UI and API access.
* Audit logs.
* Environment separation.
* Safe log handling.
* Controlled plugin and provider installation.

Airflow’s own service identity should not automatically provide every task with unrestricted access to every source and destination.

Where possible, tasks should use workload-specific credentials.

---

# 69. DAG-code safety

DAG files are executable code. Importing them can execute top-level Python logic.

Avoid top-level actions such as:

* Calling external APIs.
* Querying production databases.
* Loading large files.
* Performing expensive computation.
* Mutating external systems.
* Fetching secrets repeatedly.

Top-level code should primarily define workflow structure.

Slow or unreliable parsing can delay scheduling across many workflows.

---

# 70. Testing orchestration logic

A workflow should be tested at multiple levels.

## DAG structure tests

Verify:

* DAG loads successfully.
* Expected tasks exist.
* Dependencies are correct.
* No cycles exist.
* Owners and tags are present.

## Task tests

Verify:

* Input handling.
* Idempotency.
* Error classification.
* Timeout behaviour.
* Output contracts.

## Control-flow tests

Verify:

* Every branch.
* Skip propagation.
* Trigger rules.
* Approval expiry.
* Optional-source behaviour.

## Recovery tests

Verify:

* Retry after partial write.
* Worker termination.
* Destination outage.
* Missing source.
* Duplicate trigger.
* Historical backfill.
* External job continuing after timeout.

## Load tests

Verify:

* Many concurrent DAG runs.
* Large dynamic mapping.
* Pool saturation.
* Scheduler and metadata-database capacity.

---

# 71. Deployment and versioning

A workflow deployment should identify:

* DAG-code version.
* Dependency version.
* Container image.
* Provider packages.
* Configuration version.
* Data-contract version.
* Transformation version.

This matters when a historical interval is rerun:

```text
Should the interval use:
the original code,
the latest corrected code,
or a specific approved release?
```

The answer depends on whether the goal is exact reproduction, correction, or restatement.

---

# 72. Common orchestration mistakes

## Mistake 1: Performing heavy computation inside Airflow workers

**Problem:** Poor isolation and worker exhaustion.

**Better approach:** Submit work to an appropriate processing platform.

## Mistake 2: Using current time instead of the data interval

**Problem:** Retries and backfills process the wrong data.

**Better approach:** Use explicit logical interval boundaries.

## Mistake 3: Treating retries as automatically safe

**Problem:** Duplicate rows, files, or notifications.

**Better approach:** Design idempotent external operations.

## Mistake 4: Passing large datasets through XCom

**Problem:** Metadata-database pressure and serialization overhead.

**Better approach:** Store data externally and pass a reference.

## Mistake 5: Keeping sensors in worker slots for hours

**Problem:** Worker capacity is wasted.

**Better approach:** Use rescheduling or deferrable waiting.

## Mistake 6: Enabling catchup without historical safety

**Problem:** Unexpected runs and duplicated side effects.

**Better approach:** Validate interval logic and side-effect behaviour.

## Mistake 7: Running unrestricted backfills

**Problem:** Production workloads and sources are overwhelmed.

**Better approach:** Use pools, concurrency limits, validation, and backfill metadata.

## Mistake 8: Creating tasks through expensive parse-time API calls

**Problem:** Slow and unreliable scheduling.

**Better approach:** Use validated static metadata or runtime mapping.

## Mistake 9: Overusing cross-DAG task dependencies

**Problem:** Tight coupling to internal task names.

**Better approach:** Depend on published assets or explicit interfaces.

## Mistake 10: Alerting on every downstream failure

**Problem:** Alert storms obscure root cause.

**Better approach:** Correlate failures and alert on impact.

## Mistake 11: Confusing successful execution with correct data

**Problem:** Technically successful but incomplete products are published.

**Better approach:** Add quality and reconciliation gates.

## Mistake 12: Allowing an agent to execute unrestricted remediation

**Problem:** Unverified reasoning can cause production damage.

**Better approach:** Separate recommendation, policy validation, approval, and execution.

---

# 73. Practical design exercises

## Exercise 1: Daily batch product

A daily source file should arrive by 2:00 AM, and the product must publish by 5:00 AM.

Define:

1. Sensor behaviour.
2. Sensor timeout.
3. Retry policy.
4. Quality gate.
5. Publication mechanism.
6. Deadline alert.
7. Missing-file escalation.
8. Backfill procedure.

---

## Exercise 2: Rate-limited API

A source allows ten concurrent requests and returns 500 partitions.

Design:

1. Dynamic mapping.
2. Pool configuration.
3. Retry handling for HTTP 429.
4. Batch size.
5. XCom contents.
6. Partial-failure behaviour.
7. Completeness reconciliation.

---

## Exercise 3: Conditional publication

A dataset can have three quality states:

```text
Pass
Warning
Failure
```

Define:

* Branches.
* Human approval conditions.
* Publication rules.
* Audit metadata.
* Alert routing.
* Downstream trigger behaviour.

---

## Exercise 4: Safe historical backfill

A transformation defect affected six months.

Define:

* Backfill interval.
* Resource pool.
* Maximum active runs.
* Code version.
* Current-run isolation.
* Side-effect suppression.
* Validation criteria.
* Final publication process.

---

## Exercise 5: Agent-assisted remediation

A workflow fails because of an unknown schema change.

Define:

* Evidence available to the agent.
* Permitted tools.
* Proposed diagnostic process.
* Actions requiring human approval.
* Recovery verification.
* Operational-memory record.

---

# 74. Conceptual mini-project designs

These are architecture exercises only; the requested build section remains omitted.

## Mini-project 1: Governed batch orchestration

Conceptual workflow:

```text
Wait for source manifests
        ↓
Validate checksums
        ↓
Trigger incremental ingestion
        ↓
Run dbt transformations
        ↓
Execute quality tests
        ↓
Reconcile counts
        ↓
Publish product atomically
        ↓
Record metadata and notify
```

Define:

* Task boundaries.
* Retries.
* Pools.
* Timeouts.
* XCom references.
* Failure paths.
* Publication deadline.
* Recovery behaviour.

## Mini-project 2: Metadata-driven source factory

Configuration defines:

* Source connection.
* Dataset.
* Schedule.
* Incremental key.
* Validation rules.
* Owner.
* Destination.
* Pool.

Design:

* Configuration validation.
* Stable workflow identifiers.
* Generated task groups.
* Secret resolution.
* Contract enforcement.
* Deployment process.

## Mini-project 3: Human-controlled restatement

Conceptual flow:

```text
Prepare historical correction
        ↓
Compare old and new metrics
        ↓
Generate impact report
        ↓
Request finance approval
        ↓
Publish approved version
        ↓
Notify consumers
        ↓
Retain audit evidence
```

## Mini-project 4: Agent-assisted operations

Conceptual flow:

```text
Failure detected
      ↓
Collect bounded evidence
      ↓
Retrieve similar incidents
      ↓
Agent recommends action
      ↓
Policy and permission validation
      ↓
Human approval when required
      ↓
Airflow performs action
      ↓
Verification and memory capture
```

---

# 75. Interview questions and answers

### 1. What is workflow orchestration?

Workflow orchestration coordinates tasks, dependencies, schedules, retries, resources, monitoring, and recovery so a multi-step business process executes reliably.

### 2. What is a DAG?

A DAG is a Directed Acyclic Graph in which tasks are nodes and dependencies are directed edges. It cannot contain circular dependencies.

### 3. What is the difference between a DAG and a DAG run?

A DAG is the reusable workflow definition. A DAG run is one execution of that definition for a particular logical interval or trigger.

### 4. What is the difference between a task and a task instance?

A task is defined in the DAG. A task instance is that task executing within a particular DAG run.

### 5. What does the Airflow scheduler do?

It creates scheduled runs, evaluates task dependencies and constraints, and sends eligible task instances to the configured executor.

### 6. What does an executor do?

An executor determines how and where task instances are launched, such as locally, through distributed workers, or in Kubernetes pods.

### 7. What is an operator?

An operator is a reusable template defining a category of task, such as executing Python, SQL, shell commands, transfers, or external jobs.

### 8. What is a sensor?

A sensor waits for an external condition such as file arrival, dataset readiness, or external-job completion.

### 9. Why are deferrable operators useful?

They allow long waits to be managed by the triggerer rather than occupying worker capacity.

### 10. What is a data interval?

It is the logical period of data represented by a workflow run. It should be used instead of computing dates from the current clock.

### 11. What is catchup?

Catchup allows the scheduler to create runs for historical scheduled intervals that were not previously processed.

### 12. What is a backfill?

A backfill intentionally processes or reprocesses a selected historical range, usually under explicit operational controls.

### 13. What is the difference between catchup and backfill?

Catchup is routine scheduler behaviour for missing intervals. A backfill is an explicit reprocessing operation with a defined range and controls.

### 14. Why must tasks be idempotent?

Retries and manual reruns can execute tasks repeatedly. Idempotency ensures repetition does not corrupt the final state.

### 15. What is XCom?

XCom is Airflow’s task-to-task communication mechanism for small values or references associated with task instances.

### 16. Why should large DataFrames not be passed through XCom?

XCom is orchestration metadata. Large objects create serialization, storage, metadata-database, and performance problems.

### 17. What is an Airflow Variable?

A Variable stores shared runtime configuration. It should not be used as a high-frequency transactional state store or secret-management replacement.

### 18. What is an Airflow Connection?

A Connection represents configuration and credentials for an external system through a logical connection identifier.

### 19. What is a pool?

A pool limits concurrent resource use by assigning tasks to a controlled number of slots.

### 20. What is dynamic task mapping?

It creates a variable number of task instances at runtime from input produced by an upstream task or supplied collection.

### 21. How is dynamic mapping different from dynamic DAG generation?

Dynamic mapping expands tasks during a run. Dynamic DAG generation creates workflow structure while DAG definitions are prepared or parsed.

### 22. What is branching?

Branching chooses one or more downstream execution paths based on a runtime decision, while unselected paths are skipped.

### 23. What are trigger rules?

Trigger rules determine what combination of upstream states permits a downstream task to run.

### 24. What is event-driven orchestration?

It triggers workflows in response to events or data availability instead of relying only on fixed time schedules.

### 25. What is asset-aware scheduling?

It models dependencies around data products or assets so consumers can react when governed outputs are updated.

### 26. What is metadata-driven orchestration?

It generates or configures workflows using structured metadata describing sources, destinations, schedules, owners, validations, and policies.

### 27. Why should Airflow not perform heavy computation directly?

Its primary role is coordination. Dedicated processing engines offer better resource isolation, scaling, and execution efficiency.

### 28. What is a quality gate?

A quality gate evaluates checks such as schema, completeness, uniqueness, freshness, and reconciliation before allowing publication.

### 29. How should human approval be incorporated?

The workflow should create a durable, scoped approval request, wait efficiently, authenticate the approver, record the decision, and execute only the approved immutable action.

### 30. What is the difference between pipeline history and operational memory?

Pipeline history records runs and task states. Operational memory records interpretation, root cause, decisions, remediation, and reusable lessons.

### 31. How can agents safely support orchestration?

Agents can collect evidence, classify incidents, retrieve similar cases, and propose actions, while deterministic policies and humans authorize high-impact execution.

### 32. How do you prevent alert fatigue?

Correlate related failures, route by ownership, alert on business impact, suppress secondary failures, assign severity, and automatically resolve recovered incidents.

### 33. What should be monitored besides task success?

Scheduler health, queue delay, worker capacity, data freshness, quality, reconciliation, publication status, business deadlines, and consumer impact.

### 34. What is the critical path?

It is the longest dependency path through the workflow and determines the minimum completion time.

### 35. What makes an Airflow workflow production-ready?

It has clear task boundaries, interval-aware logic, idempotency, controlled retries, timeouts, resource limits, quality gates, secure connections, observability, recovery procedures, and ownership.

---

# 76. Phase-end knowledge check

1. What problem does workflow orchestration solve?
2. How is orchestration different from processing?
3. How does orchestration differ from choreography?
4. What makes a graph a DAG?
5. What does the Airflow scheduler do?
6. What information belongs in the metadata database?
7. What is the executor responsible for?
8. Why should DAG parsing avoid external API calls?
9. What is the difference between a DAG and a DAG run?
10. Why is a logical data interval different from execution time?
11. What makes a good task boundary?
12. When should a custom operator be created?
13. When should a sensor use deferrable execution?
14. How should time zones be handled?
15. How do fan-out and fan-in dependencies work?
16. How can trigger rules accidentally hide failures?
17. What is the difference between branching and failure?
18. Which failures should be retried?
19. Why do retries require idempotency?
20. What timeout categories should a workflow define?
21. When is catchup appropriate?
22. What risks accompany historical backfills?
23. Why should backfills be isolated from normal production processing?
24. What belongs in XCom?
25. How do Variables, Params, Connections, and XComs differ?
26. How should executor choice reflect workload requirements?
27. How do pools protect external systems?
28. Why might one task consume multiple pool slots?
29. How does dynamic task mapping work?
30. What can happen if dynamic mapping is unbounded?
31. How does dynamic DAG generation differ from mapping?
32. What makes metadata-driven orchestration safe?
33. When is event-driven scheduling preferable?
34. Why might an event-driven system still need scheduled reconciliation?
35. What does asset-aware orchestration improve?
36. What evidence should accompany a human approval?
37. Why must approval be tied to an immutable candidate?
38. What information makes an alert actionable?
39. How does a business deadline differ from a task timeout?
40. What should happen when a quality gate fails?
41. Why should publication be atomic?
42. What is operational memory?
43. Which actions may an operations agent recommend?
44. Which agent actions require policy or human approval?
45. How can scheduler delay and queue delay be distinguished?
46. Why does a successful DAG not guarantee correct data?
47. What orchestration metadata should be retained for audit?
48. How should sensitive information be handled in logs?
49. Which recovery scenarios should be tested?
50. What characteristics make an Airflow pipeline production-ready?

---

# Phase 1.5 summary

Workflow orchestration coordinates reliable execution across data systems.

The major lessons are:

* **Airflow coordinates work**; dedicated systems should perform heavy processing.
* A **DAG** defines tasks and dependencies, while a **DAG run** represents one execution for a logical interval.
* The **scheduler** determines eligible work, and the **executor** determines how that work runs.
* **Operators** describe work, while **sensors** wait for external conditions.
* **Deferrable execution** prevents long waits from unnecessarily occupying workers.
* **Dependencies, branches, and trigger rules** define workflow control flow.
* **Retries** should address transient failures and require idempotent tasks.
* **Timeouts** must cover task execution, sensors, workflows, and external jobs.
* **Catchup** handles unprocessed scheduled intervals; **backfills** are controlled historical reprocessing operations.
* **XComs** should carry small control values or references, not business datasets.
* **Variables, parameters, Connections, and XComs** have distinct responsibilities.
* **Executors, pools, slots, and concurrency limits** control execution and protect external systems.
* **Dynamic task mapping** expands work at runtime; **dynamic DAG generation** creates workflow structure from code or metadata.
* **Event-driven and asset-aware orchestration** respond to actual data availability.
* **Metadata-driven orchestration** standardizes workflow families but requires configuration governance.
* **Human approval gates** need authenticated, scoped, durable audit records.
* **Alerts and deadlines** should represent business impact rather than generate low-value task noise.
* **Quality gates and atomic publication** prevent incomplete data products from reaching consumers.
* **Pipeline history** records what ran; **operational memory** records why failures occurred and how they were resolved.
* **Agentic orchestration** should use AI for analysis and recommendations while deterministic controls govern execution.
* Production orchestration must be **secure, observable, idempotent, recoverable, resource-aware, and auditable**.

The implementation/build section has been omitted as requested. I will proceed to **Phase 1.6: Data Lakes and Lakehouses** only when you explicitly request the next phase.
