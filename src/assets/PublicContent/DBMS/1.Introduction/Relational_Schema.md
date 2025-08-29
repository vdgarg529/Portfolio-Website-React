# Relational Model and Integrity Constraints

## 1. Relational Model Fundamentals

1. **Relational Model (RM)** organises the data in the form of **relations (tables)**.
    
2. A relational DB consists of a **collection of tables**, each of which is assigned a **unique name**.
    
3. A **row** in a table represents a relationship among a set of values, and a table is a collection of such relationships.
    
4. **Tuple**: A single row of the table representing a single data point / a unique record.
    
5. **Attribute/Column**: Represents a property of the relation. Each attribute has a permitted value, called the **domain of the attribute**.
    
6. **Relation Schema**: Defines the design and structure of the relation, containing the name of the relation and all the columns/attributes.
    
7. Common RM-based DBMS systems, aka RDBMS: Oracle, IBM DB2, **MySQL**, Microsoft SQL Server, PostgreSQL, MS Access.
    
8. **Degree of a Relation**: The number of attributes/columns in a given table/relation.
    
9. **Cardinality**: The total number of tuples/rows in a given relation.
    
10. **Relational Key**: A set of attributes that can uniquely identify each tuple.
    

### Important Properties of a Table in the Relational Model

1. The name of a relation is distinct among all other relations.
    
2. The values in each attribute must be **atomic** (indivisible; cannot be broken down further). This is known as **First Normal Form (1NF)**.
    
3. The name of each attribute/column must be unique.
    
4. Each tuple must be unique in a table.
    
5. The sequence of rows and columns has no significance; the order of storage does not imply any meaning.
    
6. Tables must follow **integrity constraints** - rules that help to maintain data consistency and accuracy across the tables.
    

## 2. Relational Model Keys

1. **Super Key (SK)**: Any set (or combination) of attributes present in a table which can uniquely identify each tuple. It may contain extra, non-unique attributes.
    
2. **Candidate Key (CK)**: A _minimal_ subset of super keys, which can uniquely identify each tuple. It contains no redundant attributes.
    
    - A Candidate Key value **should not be NULL**.
        
3. **Primary Key (PK)**:
    
    - Selected from the set of Candidate Keys.
        
    - Often the key with the least number of attributes or the most natural identifier.
        
    - Used as the main reference point for the table.
        
4. **Alternate Key (AK)**:
    
    - All Candidate Keys that were _not_ chosen as the Primary Key.
        
5. **Foreign Key (FK)**:
    
    - It creates a relationship between two tables (relations).
        
    - A relation, say `r1`, may include among its attributes the Primary Key of another relation, say `r2`. This attribute is called a Foreign Key from `r1` referencing `r2`.
        
    - The relation `r1` is also known as the **Referencing Relation** (or Child table) of the Foreign Key dependency.
        
    - The relation `r2` is called the **Referenced Relation** (or Parent table) of the Foreign Key.
        
    - A Foreign Key helps to cross-reference between two different relations and enforces referential integrity.
        
6. **Composite Key**: A Primary Key formed by using two or more attributes.
    
7. **Compound Key**: A Primary Key which is formed using two Foreign Keys. (Note: This is a specific type of Composite Key).
    
8. **Surrogate Key**:
    
    - A synthetic Primary Key.
        
    - It has no business meaning and is generated automatically by the DBMS, usually as an integer value.
        
    - It is often used as a Primary Key when no natural key exists or when a natural key is inefficient (e.g., very long).
        

## 3. Integrity Constraints

Integrity Constraints are rules applied to database tables to ensure the accuracy, consistency, and reliability of the data. CRUD Operations (Create, Read, Update, Delete) must adhere to these policies so the database remains consistent. They are introduced to prevent accidental corruption of the DB.

### Types of Integrity Constraints:

1. **Domain Constraints**
    
    - Restrict the value in the attribute of a relation by specifying its **domain**.
        
    - They restrict the **data types** and the **range of values** for every attribute.
        
    - **E.g.,** An attribute `Age` must be an integer greater than 0.
        
    - **E.g.,** Specifying that enrolment should only happen for candidates with a birth year < 2002.
        
2. **Entity Integrity Constraints**
    
    - Requires that **every relation must have a Primary Key**.
        
    - The Primary Key attribute(s) **cannot be NULL**.
        
    - This ensures that every tuple is uniquely identifiable.
        
3. **Referential Integrity Constraints**
    
    - Specified between two relations to help maintain consistency among their tuples.
        
    - It requires that a value appearing in a specified attribute (the **Foreign Key**) of any tuple in the _referencing relation_ must also appear in the specified attributes (the **Primary Key**) of _at least one tuple_ in the _referenced relation_.
        
    - If a Foreign Key (FK) in a referencing table refers to a Primary Key (PK) of a referenced table, then every value of the FK in the referencing table must either be **NULL** or **available** in the referenced table.
        
    - A Foreign Key must have a matching Primary Key for each of its values in the parent table, or it must be NULL.
        
4. **Key Constraints (Column Constraints)**  
    The six common types of key constraints present in a Database Management System are:
    
    - **NOT NULL**: This constraint restricts a column from having a NULL value. It ensures that every row must have a value for this column.
        
    - **UNIQUE**: This constraint ensures that all values in a column are different from each other.
        
    - **DEFAULT**: This constraint is used to set a default value for a column. The default value is added to all new records if no other value is specified.
        
    - **CHECK**: This is an integrity constraint that ensures the data in a column meets a specific condition. It verifies data integrity before and after CRUD operations.
        
    - **PRIMARY KEY**: This is an attribute or set of attributes that can uniquely identify each entity in the entity set. It is a combination of **NOT NULL** and **UNIQUE** constraints.
        
    - **FOREIGN KEY**: This constraint prevents actions that would destroy the links between tables. It ensures that a value in one table must match a value in another table, maintaining the connection between them.
        

