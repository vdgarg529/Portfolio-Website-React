
# Chatgpt


### **Basic DBMS Questions (Q1–Q20)**

**Q1. What is DBMS?**  
A DBMS (Database Management System) is software that allows users to store, retrieve, and manage data efficiently. It provides an interface between databases and end-users/applications.  
_Example:_ MySQL, Oracle, PostgreSQL.

**Q2. What are the advantages of DBMS over a traditional file system?**

- Data redundancy control
    
- Data consistency
    
- Security
    
- Concurrent access
    
- Backup and recovery
    
- Better query processing
    

**Q3. What is the difference between DBMS and RDBMS?**

- **DBMS**: Stores data as files (hierarchical or network models). No relationships.
    
- **RDBMS**: Stores data in tables with relationships (foreign keys). Supports normalization, ACID, and SQL.  
    _Example:_ RDBMS → MySQL, Oracle.
    

**Q4. Define data abstraction levels in DBMS.**

1. **Physical level**: How data is stored.
    
2. **Logical level**: Structure of data (tables, schemas).
    
3. **View level**: User-specific data access.
    

**Q5. What is data independence?**  
The ability to modify schema at one level without affecting schema at the next higher level.

- Logical data independence
    
- Physical data independence
    

**Q6. What are keys in DBMS?**

- **Primary Key**: Uniquely identifies a record.
    
- **Foreign Key**: Links two tables.
    
- **Candidate Key**: Possible keys to be primary.
    
- **Composite Key**: Combination of attributes.
    
- **Super Key**: Any set of attributes that uniquely identifies tuples.
    

**Q7. What is a schema?**  
The structure of a database described in formal language. Defines tables, relationships, constraints.

**Q8. Define instance in DBMS.**  
An **instance** is a snapshot of data at a particular moment. Schema = structure; Instance = data.

**Q9. What is ER model?**  
Entity-Relationship model represents entities (objects) and relationships between them. Used in database design.  
_Example:_ Student–Enrolls–Course.

**Q10. What is normalization?**  
Process of organizing data to minimize redundancy and improve integrity.

- 1NF → Atomic values
    
- 2NF → No partial dependency
    
- 3NF → No transitive dependency
    
- BCNF → Stronger version of 3NF
    

**Q11. What is denormalization?**  
Adding redundancy to improve read performance at the cost of extra storage.

**Q12. Define ACID properties.**

- **Atomicity**: All or nothing.
    
- **Consistency**: Valid state maintained.
    
- **Isolation**: Transactions don’t interfere.
    
- **Durability**: Changes persist even after crash.
    

**Q13. What are indexes?**  
Data structures that improve query performance. Types:

- Primary index
    
- Secondary index
    
- Unique index
    
- Clustered index
    

**Q14. What is a view in DBMS?**  
A virtual table created from one or more tables using a query. Improves security & abstraction.

**Q15. What are transactions?**  
A transaction is a sequence of operations treated as a single logical unit of work.

**Q16. Define deadlock in DBMS.**  
Occurs when two or more transactions wait for each other’s resources indefinitely.  
Solutions: Timeout, wait-die, wound-wait, deadlock detection.

**Q17. What is concurrency control?**  
Mechanisms to manage simultaneous transactions without conflict. Uses locking, timestamp ordering, etc.

**Q18. What is a join in DBMS?**  
Combines rows from two or more tables. Types: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF.

**Q19. What are stored procedures?**  
Precompiled SQL code stored in the database, which can be executed as needed.

**Q20. What are triggers?**  
Automatic execution of SQL code in response to an event (INSERT/UPDATE/DELETE).

---




### **Intermediate DBMS Questions (Q21–Q50)**

**Q21. What is functional dependency?**  
A relationship where one attribute uniquely determines another.  
_Example:_ Student_ID → Student_Name.

**Q22. What is multivalued dependency?**  
Occurs when one attribute determines multiple independent values of another attribute.  
_Example:_ Student_ID →→ Hobby.

**Q23. What is the difference between primary key and unique key?**

- **Primary Key**: Only one per table, cannot be NULL.
    
- **Unique Key**: Multiple allowed, can contain NULL.
    

**Q24. Difference between clustered and non-clustered index?**

- **Clustered index**: Rearranges table data physically. Only one per table.
    
- **Non-clustered index**: Creates a pointer to data. Multiple allowed.
    

**Q25. What is a composite key?**  
A primary key consisting of multiple columns.  
_Example:_ (Student_ID, Course_ID).

**Q26. Difference between DELETE, TRUNCATE, and DROP?**

- **DELETE**: Removes specific rows, can be rolled back.
    
- **TRUNCATE**: Removes all rows, faster, cannot filter.
    
- **DROP**: Removes the table completely.
    

**Q27. What is a surrogate key?**  
An artificial key used when no natural primary key exists. Usually auto-increment integers.

**Q28. Difference between OLTP and OLAP?**

- **OLTP**: Online Transaction Processing, real-time operations.
    
- **OLAP**: Online Analytical Processing, data analysis & reporting.
    

**Q29. What are integrity constraints?**  
Rules that enforce valid data:

- Entity Integrity (PK not NULL)
    
- Referential Integrity (FK matches PK)
    
- Domain Integrity (valid values only)
    

**Q30. What is the difference between strong and weak entity?**

- **Strong entity**: Independent, has primary key.
    
- **Weak entity**: Depends on another entity, identified by partial key + owner key.
    

**Q31. What is database partitioning?**  
Dividing large tables into smaller parts for performance and manageability.  
Types: Horizontal, Vertical, Range, Hash.

**Q32. What is sharding?**  
Distributing database across multiple servers to handle large-scale data and queries.

**Q33. What is the difference between horizontal and vertical scaling in DBMS?**

- **Horizontal (sharding)**: Add more machines.
    
- **Vertical**: Add more CPU/RAM to one server.
    

**Q34. Explain two-phase commit protocol.**  
Used in distributed DBMS to ensure atomic transactions:

1. Prepare phase
    
2. Commit/abort phase
    

**Q35. What is RAID in databases?**  
Redundant Array of Independent Disks – improves performance and reliability.  
Levels: RAID 0, 1, 5, 10, etc.

**Q36. What is a cursor in DBMS?**  
A pointer that allows row-by-row traversal of query results.

**Q37. What is checkpoint in DBMS?**  
A point where database saves its state to speed up recovery after crash.

**Q38. What is shadow paging?**  
Recovery technique where updates are made on shadow copies instead of original pages.

**Q39. What is hashing in DBMS?**  
Technique to map data to fixed-size values (hash codes) for faster searching.

**Q40. What is difference between logical and physical data models?**

- **Logical**: Focuses on entities, attributes, relationships.
    
- **Physical**: Defines actual storage (tables, indexes, files).
    

**Q41. What is a relation in DBMS?**  
A relation is a table with rows (tuples) and columns (attributes).

**Q42. What is domain in DBMS?**  
The set of permissible values for an attribute.  
_Example:_ Age domain → 0–120.

**Q43. Explain BCNF (Boyce-Codd Normal Form).**  
A stronger 3NF where every determinant is a candidate key.

**Q44. What is 4NF?**  
Removes multi-valued dependencies in a table.

**Q45. What is 5NF?**  
Removes redundancy caused by join dependencies.

**Q46. What is decomposition in DBMS?**  
Breaking a relation into smaller relations to achieve normalization.

**Q47. What is anomaly in DBMS?**  
Problems due to poor design:

- Insertion anomaly
    
- Deletion anomaly
    
- Update anomaly
    

**Q48. What is distributed database?**  
Database spread across multiple sites, appearing as one logical database.

**Q49. What is replication in DBMS?**  
Copying data across multiple servers for availability & fault tolerance.

**Q50. What is CAP theorem?**  
A distributed system can only guarantee 2 of 3:

- Consistency
    
- Availability
    
- Partition Tolerance
    

---




### **Advanced DBMS Questions (Q51–Q75)**

**Q51. What is query optimization?**  
Process of selecting the most efficient query execution plan using indexes, joins, and algorithms.

**Q52. What is cost-based optimization?**  
DBMS evaluates multiple query plans and chooses the one with the lowest estimated cost.

**Q53. What is heuristic-based optimization?**  
DBMS applies rules of thumb (e.g., perform selection before join) to improve query performance.

**Q54. What are different types of database architectures?**

- 1-tier (direct DB access)
    
- 2-tier (client-server)
    
- 3-tier (presentation, application, database)
    
- N-tier (distributed layers)
    

**Q55. What is data warehouse?**  
A centralized repository optimized for analytical queries and reporting.

**Q56. What is data mart?**  
Subset of data warehouse, focused on a specific business area.

**Q57. Difference between star schema and snowflake schema?**

- **Star schema**: Fact table with denormalized dimension tables.
    
- **Snowflake schema**: Dimensions are normalized into multiple related tables.
    

**Q58. What is fact table and dimension table?**

- **Fact table**: Contains measures (sales, revenue).
    
- **Dimension table**: Describes attributes (time, product, customer).
    

**Q59. What is materialized view?**  
Pre-computed and stored query result for faster access.

**Q60. Difference between logical backup and physical backup?**

- **Logical**: Exports schema + data as SQL statements.
    
- **Physical**: Copies database files directly.
    

**Q61. What is write-ahead logging (WAL)?**  
DBMS writes changes to a log file before applying them to database for crash recovery.

**Q62. What is phantom read?**  
When a transaction reads new rows inserted by another transaction during execution.

**Q63. What is dirty read?**  
When a transaction reads uncommitted changes made by another transaction.

**Q64. What is non-repeatable read?**  
When the same row is read twice but values differ due to another transaction’s update.

**Q65. What is serializability in DBMS?**  
Ensuring concurrent transactions result in the same state as serial execution.

**Q66. What is optimistic vs pessimistic concurrency control?**

- **Optimistic**: Assume no conflicts, validate at commit.
    
- **Pessimistic**: Lock data during access.
    

**Q67. What is a lock in DBMS?**  
A mechanism to control concurrent access. Types: Shared (read), Exclusive (write).

**Q68. What is granularity of locking?**  
The level at which locks are applied (row, page, table, database).

**Q69. What is starvation in DBMS?**  
When a transaction never gets access due to other high-priority transactions.

**Q70. What is timestamp ordering protocol?**  
Concurrency control technique using timestamps to maintain transaction order.

**Q71. What is multiversion concurrency control (MVCC)?**  
Allows multiple versions of data so reads don’t block writes.

**Q72. What is difference between centralized and distributed DBMS?**

- **Centralized**: Data stored in one location.
    
- **Distributed**: Data spread across multiple locations.
    

**Q73. What is federated database system?**  
Multiple autonomous databases appear as a single system through integration.

**Q74. What is polyglot persistence?**  
Using different types of databases (SQL, NoSQL, Graph) for different parts of an application.

**Q75. Difference between OLAP cubes and relational tables?**

- **OLAP cubes**: Pre-aggregated, multidimensional.
    
- **Relational tables**: 2D tables requiring joins for aggregation.
    

---

### **Expert-Level DBMS Questions (Q76–Q100)**

**Q76. What is eventual consistency?**  
In distributed systems, data may not be instantly consistent but will become consistent over time.

**Q77. What is BASE property in DBMS?**

- Basically Available
    
- Soft state
    
- Eventually consistent  
    (Opposite of ACID, used in NoSQL)
    

**Q78. What is difference between SQL and NoSQL databases?**

- **SQL**: Structured, relational, ACID compliant.
    
- **NoSQL**: Schema-less, flexible, BASE compliant.
    

**Q79. What is a graph database?**  
Stores data as nodes, edges, and properties for relationship-heavy queries.  
_Example:_ Neo4j.

**Q80. What is hierarchical database model?**  
Data organized in tree structure with parent-child relationships.  
_Example:_ IMS by IBM.

**Q81. What is network database model?**  
Uses graph-like structure with many-to-many relationships.  
_Example:_ IDMS.

**Q82. Difference between vertical and horizontal fragmentation?**

- **Vertical**: Split attributes (columns).
    
- **Horizontal**: Split tuples (rows).
    

**Q83. What is data dictionary?**  
A metadata repository that stores schema definitions and data about the database.

**Q84. What is difference between schema and subschema?**

- **Schema**: Overall logical structure.
    
- **Subschema**: Part of schema tailored for specific user/application.
    

**Q85. What is shadow copy technique?**  
Maintains a backup copy of database pages for crash recovery.

**Q86. What is log-based recovery?**  
Uses transaction logs (redo/undo) to restore database after crash.

**Q87. What is difference between eager and lazy replication?**

- **Eager**: Update all replicas immediately.
    
- **Lazy**: Update replicas later, asynchronously.
    

**Q88. What is quorum in distributed DBMS?**  
Minimum number of nodes that must agree before an operation is committed.

**Q89. What is consensus algorithm in DBMS?**  
Protocols like Paxos or Raft used to achieve agreement in distributed databases.

**Q90. What is difference between soft and hard state in DBMS?**

- **Soft state**: Data may change over time without input.
    
- **Hard state**: Data only changes with explicit input.
    

**Q91. What is checkpointing in distributed DBMS?**  
Global snapshot of system state for recovery purposes.

**Q92. What is write skew anomaly?**  
Occurs when concurrent transactions insert conflicting data without direct conflict.

**Q93. What is difference between pessimistic logging and optimistic logging?**

- **Pessimistic**: Log before execution to ensure recovery.
    
- **Optimistic**: Log after execution, assumes fewer crashes.
    

**Q94. What is cloud database?**  
Database delivered as a service on cloud platforms like AWS RDS, Google Cloud SQL.

**Q95. What is difference between SQL and NewSQL?**

- **SQL**: Traditional RDBMS with ACID.
    
- **NewSQL**: Modern systems with SQL interface + scalability like NoSQL.  
    _Example:_ CockroachDB.
    

**Q96. What is difference between hot backup and cold backup?**

- **Hot**: Taken while DB is running.
    
- **Cold**: Taken when DB is offline.
    

**Q97. What is the difference between ETL and ELT?**

- **ETL**: Extract → Transform → Load (before loading into DB).
    
- **ELT**: Extract → Load → Transform (inside DB).
    

**Q98. What is temporal database?**  
A database that maintains past, present, and future data with time dimension.

**Q99. What is spatial database?**  
Database optimized for geographic and spatial data types.  
_Example:_ PostGIS.

**Q100. What are common DBMS interview case studies?**

- Design a library management system
    
- Design a ride-sharing DB schema
    
- Handle high-traffic e-commerce transactions




# DeepSeek

### **Section 1: Top 100 DBMS Interview Questions & Answers**

This section covers the core concepts, architecture, and theory of Database Management Systems.

#### **Database Concepts & Architecture**

**1. What is a DBMS, and how is it different from a file system?**  
**Answer:** A DBMS (Database Management System) is software that interacts with end-users, applications, and the database itself to capture and analyze data. It provides a systematic way to create, retrieve, update, and manage data.  
**Key Differences:**

- **Data Redundancy:** File systems have high redundancy; DBMS controls redundancy via normalization.
    
- **Data Inconsistency:** DBMS ensures consistency; file systems often lead to inconsistent data.
    
- **Data Access:** DBMS uses a query language (e.g., SQL) for efficient access; file systems require complex application programs.
    
- **Data Integrity:** DBMS enforces integrity constraints (e.g., PK, FK); file systems do not.
    
- **Concurrency & Security:** DBMS provides advanced concurrency control and security mechanisms; file systems offer very primitive versions.
    

**2. What are the key components of a DBMS?**  
**Answer:**

- **Hardware:** The physical storage (disks, servers).
    
- **Software:** The DBMS software itself (e.g., MySQL, Oracle).
    
- **Data:** The raw facts stored in the database.
    
- **Procedures:** Instructions and rules for using the DBMS.
    
- **Database Access Language:** Typically SQL, used to interact with the data.
    
- **Query Processor:** Interprets and executes SQL queries.
    
- **Storage Manager:** Handles interaction with the file system and manages data storage, indexing, and hashing.
    
- **Transaction Manager:** Ensures ACID properties of transactions.
    

**3. Explain the 3-tier architecture of a DBMS.**  
**Answer:** This architecture separates the system into three logical and independent layers:

- **Presentation Tier (User Tier):** The user interface where the end-user interacts (e.g., a web browser, a desktop app).
    
- **Application Tier (Logic Tier):** Acts as an intermediary between the end-user and the database. It contains the application server and business logic (e.g., processing user input, making logical decisions).
    
- **Data Tier:** Houses the database server where the data is stored and managed. The DBMS resides here. This separation provides data independence, security, and abstraction.
    

**4. What is Data Abstraction?**  
**Answer:** Data abstraction hides the complexity of how the data is physically stored and managed, presenting users with a simplified view. The three levels are:

- **Physical Level:** Describes _how_ the data is physically stored (data structures, files, indices).
    
- **Logical Level:** Describes _what_ data is stored and the relationships among them (tables, columns, constraints). This is the schema the DBA works with.
    
- **View Level:** Describes a subset of the database tailored for specific users or groups, hiding parts they shouldn't see.
    

**5. What is Data Independence?**  
**Answer:** The ability to modify a schema definition at one level without affecting a schema definition at the next higher level.

- **Physical Data Independence:** The ability to change the physical schema without affecting the logical schema (e.g., changing storage devices or indexing strategies without rewriting applications).
    
- **Logical Data Independence:** The ability to change the logical schema without affecting the external views (e.g., adding a new column without breaking existing user views). This is harder to achieve.
    

#### **Data Modeling & ER Diagrams**

**6. What is an Entity-Relationship (ER) Model?**  
**Answer:** A high-level, conceptual data model used to describe the data elements and relationships for a specified system. It uses basic graphical symbols like rectangles (Entities), ovals (Attributes), and diamonds (Relationships) to represent the model.

**7. What are Entities and Attributes?**  
**Answer:**

- **Entity:** A real-world object with an independent existence (e.g., `Student`, `Course`).
    
- **Attribute:** A property that describes an entity (e.g., `StudentID`, `StudentName` for the `Student` entity).
    
    - **Simple vs. Composite:** Simple (atomic) vs. Composite (can be divided, e.g., `Name` -> `FirstName`, `LastName`).
        
    - **Single-valued vs. Multi-valued:** Single (e.g., `Age`) vs. Multi-valued (e.g., `PhoneNumbers`).
        
    - **Derived:** Value can be derived from another attribute (e.g., `Age` can be derived from `DateOfBirth`).
        

**8. What is a Relationship? Explain its types.**  
**Answer:** An association among several entities.

- **Degree of Relationship:** Number of participating entities.
    
    - **Unary (Recursive):** Relationship within a single entity (e.g., `Employee` supervises another `Employee`).
        
    - **Binary:** Relationship between two entities (most common, e.g., `Student` enrolls in a `Course`).
        
    - **Ternary:** Relationship between three entities.
        
- **Cardinality Ratios:** Number of entity instances that can be associated.
    
    - **One-to-One (1:1):** One instance of A relates to one instance of B (e.g., `Country` - `CapitalCity`).
        
    - **One-to-Many (1:N):** One instance of A relates to many instances of B (e.g., `Department` - `Employees`).
        
    - **Many-to-One (N:1):** Inverse of 1:N.
        
    - **Many-to-Many (M:N):** Many instances of A relate to many instances of B (e.g., `Students` - `Courses`). This is resolved with a composite/junction table in the relational model.
        

**9. What is normalization and why is it used?**  
**Answer:** Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves decomposing tables into smaller, well-structured tables and defining relationships between them. The main goals are to:

- Eliminate redundant data.
    
- Ensure data dependencies make sense (only related data is stored in a table).
    
- Minimize data modification anomalies (Insert, Update, Delete).
    

**10. Explain the various normal forms.**  
**Answer:**

- **1NF (First Normal Form):** A table is in 1NF if it contains atomic (indivisible) values and each record is unique. There should be no repeating groups.
    
- **2NF (Second Normal Form):** A table is in 2NF if it is in 1NF and has no partial dependency (i.e., all non-key attributes are fully functionally dependent on the primary key).
    
- **3NF (Third Normal Form):** A table is in 3NF if it is in 2NF and has no transitive dependency (i.e., no non-key attribute is dependent on another non-key attribute).
    
- **BCNF (Boyce-Codd Normal Form):** A stronger version of 3NF. A table is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey.
    
- **4NF (Fourth Normal Form):** Deals with multi-valued dependencies. A table is in 4NF if it is in BCNF and has no multi-valued dependencies.
    

**11. What is denormalization?**  
**Answer:** Denormalization is the intentional process of introducing redundancy into a table to improve read performance (by reducing the number of joins needed) for frequently run queries. It is often used in data warehousing (OLAP) where read speed is prioritized over write speed and data integrity.

#### **SQL & Relational Model**

**12. What is a Relational Database?**  
**Answer:** A database based on the relational model proposed by E.F. Codd. Data is stored in two-dimensional tables (relations) consisting of rows (tuples) and columns (attributes). Relationships between tables are established using foreign keys.

**13. What are the different types of keys in a database?**  
**Answer:**

- **Super Key:** A set of one or more attributes that can uniquely identify a tuple.
    
- **Candidate Key:** A minimal super key (i.e., no subset of it is a super key). A table can have multiple candidate keys.
    
- **Primary Key (PK):** The chosen candidate key used to uniquely identify tuples in a table. It cannot contain NULL values.
    
- **Alternate Key:** Candidate keys that are not chosen as the primary key.
    
- **Foreign Key (FK):** An attribute in one table that refers to the primary key of another table to enforce a relationship.
    
- **Composite Key:** A primary key that consists of more than one attribute.
    
- **Surrogate Key:** A system-generated, artificial key (like an auto-increment ID) used as the primary key. It has no business meaning.
    

**14. What are the different types of SQL commands?**  
**Answer:**

- **DDL (Data Definition Language):** Defines the database structure (e.g., `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`).
    
- **DML (Data Manipulation Language):** Manages data within schema objects (e.g., `SELECT`, `INSERT`, `UPDATE`, `DELETE`). `SELECT` is sometimes considered DQL.
    
- **DCL (Data Control Language):** Grants and revokes user permissions (e.g., `GRANT`, `REVOKE`).
    
- **TCL (Transaction Control Language):** Manages transactions (e.g., `COMMIT`, `ROLLBACK`, `SAVEPOINT`).
    

**15. What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?**  
**Answer:**

|Feature|DELETE|TRUNCATE|DROP|
|---|---|---|---|
|**Type**|DML|DDL|DDL|
|**Where Clause**|Can use `WHERE` to filter|Cannot use `WHERE`|N/A|
|**Speed**|Slower (logs each row)|Faster (deallocates pages)|Fastest|
|**Rollback**|Can be rolled back|Cannot be rolled back*|Cannot be rolled back|
|**Effect**|Removes rows, keeps structure|Removes all rows, resets identity, keeps structure|Removes table entirely from database|
|**Triggers**|Fires triggers|Does not fire triggers|N/A|
|_*In some databases, `TRUNCATE` can be rolled back if done within a transaction._|

**16. What is a View?**  
**Answer:** A virtual table based on the result-set of a SQL statement. It does not store data physically; it's a saved query. Views are used for:

- Simplifying complex queries.
    
- Providing a level of security by hiding sensitive columns.
    
- Ensuring consistent logic.
    

**17. What is the difference between a View and a Materialized View?**  
**Answer:**

- **View:** A virtual table. The query is run every time the view is accessed. Always provides real-time data.
    
- **Materialized View:** A physical copy of the query result stored as a table. Data is not real-time and must be refreshed periodically. Used to improve performance of complex queries at the cost of stale data.
    

#### **Transactions & Concurrency Control**

**18. What is a transaction?**  
**Answer:** A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. It is a sequence of operations (like reads and writes) that must either fully complete (commit) or fully fail (rollback), leaving the database in a consistent state.

**19. Explain the ACID properties.**  
**Answer:**

- **Atomicity:** The transaction must be treated as an atomic unit; it either happens completely or not at all. Managed by the transaction manager.
    
- **Consistency:** A transaction must take the database from one consistent state to another. Ensured by the application and DBMS constraints.
    
- **Isolation:** The execution of multiple transactions concurrently must be isolated from each other. The result should be as if they executed serially. Managed by the concurrency control manager.
    
- **Durability:** Once a transaction is committed, its changes must persist even in the event of a system failure. Managed by the recovery manager.
    

**20. What are concurrency control problems (anomalies)?**  
**Answer:**

- **Dirty Read:** Reading uncommitted data from another transaction that may later be rolled back.
    
- **Non-Repeatable Read:** Getting different values when reading the same row multiple times within a transaction because another transaction has updated it in between.
    
- **Phantom Read:** Getting different sets of rows when executing the same query multiple times within a transaction because another transaction has inserted or deleted rows.
    

**21. What are isolation levels? Explain them.**  
**Answer:** Isolation levels define the degree to which the operations in one transaction are isolated from those in other transactions. They trade off isolation for performance.

- **Read Uncommitted:** Lowest level. Allows dirty reads, non-repeatable reads, and phantom reads.
    
- **Read Committed:** Prevents dirty reads. Allows non-repeatable reads and phantom reads. (Default in many databases).
    
- **Repeatable Read:** Prevents dirty reads and non-repeatable reads. Allows phantom reads.
    
- **Serializable:** Highest level. Prevents all anomalies. Transactions are executed in a completely isolated fashion. Worst performance.
    

**22. What is locking? What are its types?**  
**Answer:** Locking is a concurrency control mechanism to prevent conflicts between transactions.

- **Shared Lock (S-lock):** Used for reading. Multiple transactions can hold a shared lock on the same data item. Incompatible with Exclusive locks.
    
- **Exclusive Lock (X-lock):** Used for writing. Only one transaction can hold an exclusive lock on a data item. Incompatible with both Shared and Exclusive locks.
    

**23. What is a deadlock?**  
**Answer:** A situation where two or more transactions are waiting for each other to release locks, and none can proceed. The DBMS detects deadlocks and aborts (rolls back) one of the transactions to break the cycle.

#### **Indexing & Hashing**

**24. What is an index?**  
**Answer:** An index is a data structure (like a B-Tree) that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space. It works like a book's index, providing a quick way to look up data without scanning the entire table.

**25. What are the different types of indexes?**  
**Answer:**

- **Clustered Index:** Determines the physical order of data in a table. A table can have only one clustered index (e.g., the primary key usually creates one).
    
- **Non-Clustered Index:** Creates a separate structure that points to the physical data. A table can have multiple non-clustered indexes. The index order and physical data order are different.
    
- **Unique Index:** Ensures the index key contains only unique values.
    
- **Composite Index:** An index on multiple columns.
    

**26. What is a B-Tree? Why is it used for indexing?**  
**Answer:** A B-Tree (Balanced Tree) is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. It is used for indexing because:

- It remains balanced, ensuring predictable performance.
    
- It minimizes disk I/O by having a high fan-out (many children per node), which keeps the tree shallow.
    

**27. What is the difference between a clustered and a non-clustered index?**  
**Answer:**

|Aspect|Clustered Index|Non-Clustered Index|
|---|---|---|
|**Number**|Only one per table|Multiple per table|
|**Data Storage**|Determines physical order of data|Creates a separate structure with pointers to data|
|**Speed**|Faster for range queries|Slower than clustered for range queries|
|**Extra Storage**|No|Yes|

**28. What is hashing?**  
**Answer:** Hashing is a technique used to directly map data to a specific location in a hash table using a hash function. It provides very fast O(1) access for exact matches but is inefficient for range queries. Types include static hashing (fixed number of buckets) and dynamic hashing (extensible, linear) that can grow.

#### **Advanced Concepts**

**29. What is a trigger?**  
**Answer:** A trigger is a stored procedure that is automatically executed ("fired") in response to a specific event (INSERT, UPDATE, DELETE) on a particular table. They are used to enforce business rules, audit changes, or maintain derived data.

**30. What is a stored procedure?**  
**Answer:** A stored procedure is a prepared SQL code that you can save and reuse. It is stored in the database and can be called by applications. Benefits include improved performance (pre-compiled), reduced network traffic, and better security.

**31. What is a cursor?**  
**Answer:** A cursor is a database object used to retrieve, manipulate, and navigate row-by-row through a result set. They are resource-intensive and should be avoided when set-based operations are possible.

**32. Explain the CAP Theorem.**  
**Answer:** The CAP theorem states that a distributed data store can only provide two of the following three guarantees simultaneously:

- **Consistency:** Every read receives the most recent write.
    
- **Availability:** Every request receives a (non-error) response.
    
- **Partition Tolerance:** The system continues to operate despite network partitions.  
    In practice, network partitions are unavoidable, so systems must choose between CP (consistency and partition tolerance) or AP (availability and partition tolerance).
    

**33. What is database sharding?**  
**Answer:** Sharding is a type of horizontal partitioning where a large database is split into smaller, faster, more manageable pieces called shards, each stored on a separate database server. It's a key technique for scaling out databases.



## Section 1: Top 100 DBMS Interview Questions & Answers

### Database Concepts & Architecture

**1. What is a DBMS, and how is it different from a file system?**  
**Answer:** A Database Management System (DBMS) is software that interacts with users, applications, and the database itself to capture and analyze data. It provides an interface to perform operations like creation, deletion, modification, and retrieval of data.  
**Key Differences:**

- **Data Redundancy:** File systems have high redundancy; DBMS controls redundancy via normalization.
    
- **Data Inconsistency:** DBMS ensures consistency; file systems often lead to inconsistent data.
    
- **Data Isolation:** DBMS provides data abstraction; file systems require programs to know the exact location and format.
    
- **Concurrency & Security:** DBMS provides sophisticated concurrency control and security mechanisms; file systems offer very primitive or no such features.
    
- **Backup and Recovery:** DBMS has dedicated facilities; file systems rely on the OS, which is not data-centric.
    

**2. Explain the 3-tier architecture of a DBMS.**  
**Answer:** The 3-tier architecture separates the system into three independent, logical modules:

1. **External Level (View Level):** The user's view of the database. It describes only the part of the database relevant to a particular user or group of users, hiding the rest.
    
2. **Conceptual Level (Logical Level):** The community view of the database. It describes _what_ data is stored and the relationships among them. It contains the logical structure of the entire database (tables, constraints, etc.).
    
3. **Internal Level (Physical Level):** The physical representation of the database on the machine. It describes _how_ the data is stored (files, indices, data structures, etc.).  
    This architecture provides **Data Independence**: the capacity to change the schema at one level without affecting the schema at the next higher level.
    

**3. What is Data Independence? Explain its types.**  
**Answer:** Data Independence is the ability to modify a schema definition at one level without affecting a schema definition at the next higher level.

- **Logical Data Independence:** The capacity to change the conceptual schema without having to change the external schemas or application programs. (e.g., Adding a new column or splitting a table should not affect the user views that don't use that column).
    
- **Physical Data Independence:** The capacity to change the internal schema without having to change the conceptual schema. (e.g., Changing storage devices, modifying file organizations, or creating new indexes).
    

**4. What are the key responsibilities of a DBA (Database Administrator)?**  
**Answer:**

- **Schema Definition:** Defining the logical and physical schema.
    
- **Storage Structure and Access Method Definition:** Deciding how data is stored.
    
- **Modifying the Schema and Physical Organization:** As requirements change.
    
- **Granting User Authorization:** Managing security and access control.
    
- **Routine Maintenance:** Backup and recovery, performance tuning, ensuring data integrity and availability.
    

**5. What is a Data Model? List different types.**  
**Answer:** A data model is a collection of conceptual tools for describing data, data relationships, data semantics, and consistency constraints.

- **Relational Model:** Uses tables (relations) to represent data and relationships.
    
- **Hierarchical Model:** Data is organized in a tree-like structure.
    
- **Network Model:** An extension of the hierarchical model, allowing a record to have more than one parent.
    
- **Entity-Relationship Model (ER Model):** A conceptual, high-level data model based on real-world entities and their relationships.
    
- **Object-oriented Data Model:** Based on object-oriented programming concepts like classes and inheritance.
    
- **NoSQL Models:** Document, Key-Value, Graph, and Column-family stores.
    

### ER & Relational Models

**6. What is an ER Diagram?**  
**Answer:** An Entity-Relationship Diagram is a visual representation of the logical structure of a database using ER Model concepts. It uses:

- **Rectangles:** Represent Entity Sets.
    
- **Ellipses:** Represent Attributes.
    
- **Diamonds:** Represent Relationship Sets.
    
- **Lines:** Link attributes to entity sets and entity sets to relationship sets.
    

**7. Explain the differences between a weak entity and a strong entity.**  
**Answer:**

- **Strong Entity:** An entity that has its own primary key. It is represented by a single rectangle.
    
- **Weak Entity:** An entity whose existence depends on another (strong) entity. It does not have a sufficient set of attributes to form a primary key on its own. It is represented by a double rectangle. Its relationship with the owner entity is called an identifying relationship, represented by a double diamond.
    

**8. What are the different types of attributes in an ER model?**  
**Answer:**

- **Simple Attribute:** Atomic, indivisible (e.g., `age`).
    
- **Composite Attribute:** Can be divided into smaller parts (e.g., `name` -> `first_name`, `last_name`).
    
- **Derived Attribute:** Value can be derived from another attribute (e.g., `age` can be derived from `date_of_birth`).
    
- **Single-valued Attribute:** Holds a single value (e.g., `person_id`).
    
- **Multi-valued Attribute:** Holds multiple values (e.g., `phone_number`). Represented by a double ellipse.
    

**9. What is normalization?**  
**Answer:** Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves decomposing (breaking down) tables into smaller, related tables and defining relationships between them. The main goal is to eliminate anomalous behaviors during insert, update, and delete operations.

**10. Explain the First Normal Form (1NF).**  
**Answer:** A table is in 1NF if:

- It only contains atomic (indivisible) values.
    
- Each column contains values of a single type.
    
- Each column has a unique name.
    
- The order of columns/rows does not matter.  
    Essentially, it eliminates repeating groups by ensuring each cell contains a single value.
    

**11. Explain the Second Normal Form (2NF).**  
**Answer:** A table is in 2NF if:

- It is already in 1NF.
    
- It has no partial dependency; i.e., no non-prime attribute is dependent on a proper subset of any candidate key. (All non-key attributes must be fully functionally dependent on the entire primary key).
    

**12. Explain the Third Normal Form (3NF).**  
**Answer:** A table is in 3NF if:

- It is already in 2NF.
    
- It has no transitive dependency; i.e., no non-prime attribute is dependent on another non-prime attribute. (All non-key attributes must be mutually independent and dependent only on the primary key).
    

**13. What is Boyce-Codd Normal Form (BCNF)?**  
**Answer:** A stricter version of 3NF. A table is in BCNF if for every non-trivial functional dependency `X -> Y`, `X` is a superkey. It eliminates all redundancy based on functional dependencies.

**14. What is Denormalization?**  
**Answer:** Denormalization is the intentional process of introducing redundancy into a table to improve read performance (query speed) by avoiding costly joins. It is often used in data warehousing (OLAP systems) at the expense of write performance and increased storage.

**15. What is a functional dependency?**  
**Answer:** A constraint between two sets of attributes in a relation. It is denoted by `X -> Y`, meaning that for any two tuples in the relation, if they have the same value for attribute set `X`, they must have the same value for attribute set `Y`. `X` is called the determinant, and `Y` is the dependent.

### Keys & Constraints

**16. What is a Super Key?**  
**Answer:** A set of one or more attributes that, taken collectively, can uniquely identify a tuple in a relation. A super key may have extra attributes that are not necessary for unique identification.

**17. What is a Candidate Key?**  
**Answer:** A minimal super key. It is a super key without any unnecessary attributes. A relation can have more than one candidate key.

**18. What is a Primary Key?**  
**Answer:** The candidate key chosen by the database designer to uniquely identify tuples within a relation. Its values must be unique and not null.

**19. What is a Foreign Key?**  
**Answer:** An attribute or set of attributes in one relation (the referencing relation) that matches the candidate key of another relation (the referenced relation). It is used to enforce referential integrity.

**20. What is an Alternate Key?**  
**Answer:** All the candidate keys that are not chosen as the primary key are called alternate keys.

**21. What is a Composite Key?**  
**Answer:** A candidate key that consists of two or more attributes.

**22. What is the difference between a primary key and a unique key?**  
**Answer:**

- A table can have only one **primary key**, but it can have multiple **unique keys**.
    
- The **primary key** cannot accept `NULL` values. A **unique key** can accept one `NULL` value (unless defined as `NOT NULL`).
    

**23. What is Referential Integrity?**  
**Answer:** A property stating that a foreign key value must either be null or match a primary key value in the relation it references. It prevents "dangling references."

### Transactions & Concurrency Control

**24. What is a transaction?**  
**Answer:** A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. It is a sequence of operations (read/write) that must either complete fully (commit) or have no effect at all (rollback).

**25. Explain the ACID properties of a transaction.**  
**Answer:**

- **Atomicity:** A transaction is an "all or nothing" unit. It either happens completely or does not happen at all. Managed by the transaction manager.
    
- **Consistency:** A transaction must take the database from one consistent state to another. It is the responsibility of the application and the DBMS.
    
- **Isolation:** The execution of one transaction should be isolated from the execution of other concurrent transactions. The intermediate state of a transaction should not be visible to others.
    
- **Durability:** Once a transaction has been committed, its changes must persist in the database, even in the event of a system failure.
    

**26. What is a schedule?**  
**Answer:** A schedule is a sequence of operations (read, write, commit, abort) from one or more transactions. It defines the order of execution of these operations.

**27. What is serializability, and why is it important?**  
**Answer:** Serializability is a concept that identifies which schedules are correct when transactions execute concurrently. A schedule is serializable if it is equivalent to some serial schedule (where transactions execute one after another without interleaving). It is the fundamental criterion for correctness in concurrency control.

**28. What is concurrency control?**  
**Answer:** Concurrency control is the process of managing simultaneous operations on the database without having them interfere with one another, to ensure transaction isolation and consistency.

**29. What is locking? Explain different types of locks.**  
**Answer:** Locking is a concurrency control mechanism where a transaction claims exclusive or shared rights over a data item.

- **Shared Lock (S-lock):** Read lock. Multiple transactions can hold a shared lock on the same data item for reading.
    
- **Exclusive Lock (X-lock):** Write lock. Only one transaction can hold an exclusive lock on a data item. It prevents any other locks (shared or exclusive) from being acquired on that item.
    

**30. What is a two-phase locking (2PL) protocol?**  
**Answer:** A protocol that ensures serializability. It has two phases:

1. **Growing Phase:** A transaction may obtain locks but cannot release any.
    
2. **Shrinking Phase:** A transaction may release locks but cannot obtain any new ones.  
    This protocol guarantees serializability but does not prevent deadlocks.
    

**31. What is a deadlock?**  
**Answer:** A situation where two or more transactions are waiting for each other to release locks, and none can proceed. (e.g., T1 holds a lock on A and waits for B; T2 holds a lock on B and waits for A).

**32. How can deadlocks be handled?**  
**Answer:**

- **Deadlock Prevention:** Protocols (e.g., wait-die, wound-wait) that ensure a system will never enter a deadlock state.
    
- **Deadlock Detection and Recovery:** The system periodically builds a wait-for graph and checks for cycles. If a cycle (deadlock) is found, one or more transactions are chosen to be rolled back (victim selection) to break the deadlock.
    

**33. What are isolation levels? List them.**  
**Answer:** Isolation levels define the degree to which the operations of one transaction are isolated from other concurrent transactions. They trade off isolation for performance.

- **Read Uncommitted:** Lowest isolation. Allows dirty reads.
    
- **Read Committed:** Prevents dirty reads. A transaction can only read data that has been committed.
    
- **Repeatable Read:** Prevents dirty reads and non-repeatable reads.
    
- **Serializable:** Highest isolation. Prevents phantom reads as well. Transactions are executed in a completely isolated fashion.
    

**34. What are dirty read, non-repeatable read, and phantom read?**  
**Answer:**

- **Dirty Read:** Reading data written by an uncommitted transaction. If that transaction rolls back, the read data is invalid.
    
- **Non-Repeatable Read:** A transaction reads the same row twice and gets different data because another committed transaction has modified it in between.
    
- **Phantom Read:** A transaction re-executes a query returning a set of rows and finds that the set has changed due to another committed transaction that inserted or deleted rows.
    

### Indexing & Hashing

**35. What is an index?**  
**Answer:** An index is a data structure (like a book's index) that provides a fast path to specific data in a database table, significantly speeding up data retrieval operations (`SELECT` queries) at the cost of additional storage and slower writes (`INSERT`, `UPDATE`, `DELETE`).

**36. What is a Clustered Index?**  
**Answer:** An index that defines the physical order in which the rows of a table are stored on disk. Therefore, a table can have only **one** clustered index. The leaf nodes of the index contain the actual data pages.

**37. What is a Non-Clustered Index?**  
**Answer:** An index where the logical order of the index does not match the physical stored order of the rows on disk. The leaf nodes contain pointers to the actual data rows (either the row locator or the primary key of the clustered index). A table can have multiple non-clustered indexes.

**38. What is the difference between a clustered and a non-clustered index?**  
**Answer:**

|Feature|Clustered Index|Non-Clustered Index|
|---|---|---|
|**Number**|Only one per table|Multiple per table|
|**Data Storage**|Leaf nodes are the data pages|Leaf nodes contain pointers to data|
|**Speed**|Faster for range queries|Slower than clustered for range queries|
|**Extra Space**|Does not require extra space|Requires extra space for the index structure|

**39. What is a B-Tree?**  
**Answer:** A self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. It is the most common structure for database indexes. The "B" stands for "Balanced."

**40. What is hashing?**  
**Answer:** A technique used to directly map a key to the address of a data record by using a hash function. It is extremely fast for point queries (equality checks) but inefficient for range queries.

**41. What is a composite index?**  
**Answer:** An index that is built on two or more columns of a table. The order of columns in the index is important. It is useful for queries that filter on multiple columns.

### File Organization & Storage

**42. What is the difference between a DBMS and RDBMS?**  
**Answer:** An RDBMS (Relational DBMS) is a type of DBMS that stores data in a structured format, using rows and columns based on the relational model. All RDBMS are DBMS, but not all DBMS are relational (e.g., hierarchical, network, or NoSQL databases).

**43. What is a data warehouse?**  
**Answer:** A large, centralized repository of data collected from multiple sources, used for reporting and data analysis. It is optimized for read operations and complex queries (OLAP - Online Analytical Processing), as opposed to transactional databases (OLTP - Online Transaction Processing).

**44. What is the difference between OLTP and OLAP systems?**  
**Answer:**

|Feature|OLTP (Online Transaction Processing)|OLAP (Online Analytical Processing)|
|---|---|---|
|**Purpose**|Manage day-to-day transactions|Business intelligence, data analysis|
|**Data Source**|Original source of data|Consolidated data from OLTP systems|
|**Data Model**|Normalized (3NF) for integrity|Denormalized (Star/Snowflake Schema) for speed|
|**Operations**|Short, frequent INSERT/UPDATE|Complex, long-running SELECT queries|
|**Space**|relatively small|Very large (historical data)|
|**Example**|E-commerce order processing|Sales trend analysis report|

**45. What is a NoSQL database?**  
**Answer:** A non-relational database that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. Types include Document, Key-Value, Graph, and Column-oriented. They are designed for scalability, flexibility, and large volumes of data.

**46. What is Codd's 12 Rules?**  
**Answer:** A set of 13 rules (numbered 0 to 12) proposed by Edgar F. Codd that define what is required from a database management system to be considered relational. While no commercial system fully satisfies all rules, they are a foundational theory for RDBMS.

**47. What is a checkpoint in DBMS?**  
**Answer:** A checkpoint is a mechanism where the DBMS periodically writes all modified (dirty) pages from the buffer cache to disk, along with a special checkpoint record in the log. It minimizes recovery time after a crash, as the system only needs to process log records from the last checkpoint onward.

**48. What is a cursor?**  
**Answer:** A database object used to retrieve, manipulate, and navigate the result set of a query one row at a time. It is especially useful in stored procedures when set-based operations are not suitable.

**49. What is a stored procedure?**  
**Answer:** A precompiled collection of SQL statements and optional control-of-flow statements stored under a name and processed as a unit. Benefits include improved performance (precompiled), reduced network traffic, and better security (abstracting direct table access).

**50. What is a trigger?**  
**Answer:** A special kind of stored procedure that automatically executes (fires) in response to a specific event (INSERT, UPDATE, DELETE) on a specified table or view. They are used to enforce business rules, audit changes, or maintain derived data.