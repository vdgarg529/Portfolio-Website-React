# 📘 Database Management System (DBMS) Syllabus

---

## Main Topics
1. Functional Dependencies and Normalization (3–4M)  
2. Transaction and Concurrency Control (1–3M)  
3. SQL (2–3M)  
4. Relational Algebra & TRC (2–3M)  
5. File Organization and Indexing (1–2M)  
6. ER Model and Integrity Constraints (1–2M)  

---

## 1. Functional Dependencies and Normalization (3–4M)

### Functional Dependency (FD's)
- FD Concepts  
- FD Types  
- Armstrong’s axioms / Inference rules  
- Attribute Closure  
- Keys Concept  
  - Super Key  
  - Candidate Key  
  - Primary Key  
  - Alternative / Secondary Key  
- Finding Multiple Candidate Keys  
- Membership Set  
- Closure of FD Set  
- Equality Between 2 FD Sets  
- Minimal Cover (Canonical Cover)  
- Lossy and Lossless Join Decomposition  
- Dependency Preserving Decomposition  

### Normalization
- Need of Normalization / Problem with Unnormalized Data  
- Normal Forms:  
  - 1NF  
  - 2NF  
  - 3NF  
  - BCNF  
- Multi-Valued Dependencies  
- NF Decomposition  
  - 2NF Decomposition  
  - 3NF Decomposition  
  - BCNF Decomposition  

---

## 2. Transaction and Concurrency Control (1–3M)

- Transaction Concept  
- ACID Properties  
- Schedules (Serial & Non-Serial Schedule)  
- Serializable Schedule  
  - Conflict Serializable  
  - View Serializable  
- Testing Method for Conflict Serializability  
- Conflict Equivalent Schedule  
- Problems Due to Concurrent Execution  
- Recoverable, Cascadeless, Strict Recoverable Schedule  

### Implementation of Concurrency Control
- Lock-based Protocol  
- 2 Phase Locking Protocols:  
  - Basic 2PL  
  - Strict 2PL  
  - Rigorous 2PL  
  - Conservative 2PL  
- Timestamp-based Protocol  
  - Thomas Write Rule  
- Deadlock Avoidance  
  - Wait-Die  
  - Wound-Wait  

---

## 3. SQL (2–3M)

- SQL & its Clauses  
- Aggregate Operators  
- Set Operators  
- Nested Query  
- Correlated Nested Query  
- Null Value Concept  

---

## 4. Relational Algebra & TRC (2–3M)

### Relational Algebra (RA)
- Selection (σ)  
- Projection (π)  
- Union (∪)  
- Set Difference (−)  
- Cross Product (×)  
- Rename (ρ)  
- Intersection (∩)  
- Division (÷)  
- Join & its Types  

### Relational Calculus
- Tuple Relational Calculus (TRC)  
- Domain Relational Calculus (DRC)  

---

## 5. File Organization and Indexing (1–2M)

- Spanned and Unspanned Organization  
- Sparse & Dense Index  
- Indexing Types (Primary, Clustered, Secondary Index)  
- Multi-level Indexing  
- B-Tree  
- Insertion & Deletion in B-Tree  
- B+ Tree  

---

## 6. ER Model and Integrity Constraints (1–2M)

- Introduction of ER Model  
- Attributes and its Types  
- Relationship Set  
- Participation Constraints  
- Cardinality Ratio  
- Strong and Weak Entity Set  
- Specialization & Generalization  
- Foreign Key Concept and its Constraint  
- Conversion of ER Model to Relations (Tables)  

---
