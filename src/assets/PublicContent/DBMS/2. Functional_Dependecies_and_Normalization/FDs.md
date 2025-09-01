# Functional Dependencies (FD) in DBMS

### 1. **Functional Dependency (FD) Concept**

- A **functional dependency (FD)** is a relationship between attributes in a relation.
    
- If `X → Y`, it means: **In a relation R, for any two tuples, if X values are same, then Y values must also be same.**
    
- Example: `RollNo → Name` (Roll number uniquely decides student’s name).

### 2. **Types of Functional Dependencies**

- **Trivial FD** → When `Y ⊆ X`. (e.g., `RollNo, Name → RollNo`)
    
- **Non-Trivial FD** → When `Y ⊈ X`. (e.g., `RollNo → Name`)
    
- **Semi-Trivial FD** → When `X → Y` can be written as `X → (Y ∩ X)` and is partially trivial.


### 3. **Inference Rules (Armstrong’s Axioms)**

Used to derive new FDs from given ones:

1. **Reflexivity** → If Y ⊆ X, then X → Y.
    
2. **Augmentation** → If X → Y, then XZ → YZ.
    
3. **Transitivity** → If X → Y and Y → Z, then X → Z.
    
4. **Union** → If X → Y and X → Z, then X → YZ.
    
5. **Decomposition** → If X → YZ, then X → Y and X → Z.
    
6. **Pseudotransitivity** → If X → Y and YZ → W, then XZ → W.


### 4. **Attribute Closure**

- The set of attributes functionally determined by a given set of attributes.
    
- Denoted as `X+` (closure of X).
    
- Used to **find candidate keys**.
    
- Example: If `{A → B, B → C}`, then `A+ = {A, B, C}`.


### 5. **Keys Concept**

- **Super Key** → A set of attributes that can uniquely identify a tuple.
    
- **Candidate Key** → Minimal super key (no extra attribute).
    
- **Primary Key** → Chosen candidate key.
    
- **Alternative Key** → Other candidate keys not chosen as primary.
    
- **Finding Multiple Candidate Keys** → Use attribute closures of combinations of attributes.



![[Pasted image 20250830180639.png]]

![[Pasted image 20250830181106.png]]

![[Pasted image 20250830181122.png]]

![[Pasted image 20250830181134.png]]

![[Pasted image 20250830181157.png]]


![[Pasted image 20250830181554.png]]


![[Pasted image 20250830181514.png]]





### 6. **FD Set Concepts**

- **Membership Problem** → Check if a given FD can be derived from FD set F.
    
- **Closure of FD Set (F+)** → All FDs implied by F.
    
- **Equivalence of FD Sets** → F ≡ G if F+ = G+.

![[Pasted image 20250830183330.png]]


![[Pasted image 20250830183352.png]]

![[Pasted image 20250830183406.png]]



![[Pasted image 20250830183427.png]]

![[Pasted image 20250830183435.png]]



### 7. **Minimal Cover (Canonical Cover)**

- A simplified FD set with same closure.
    
- Properties:
    
    1. Single attribute on RHS.
        
    2. No redundant attributes on LHS.
        
    3. No redundant FDs.

![[Pasted image 20250830183750.png]]


![[Pasted image 20250830183804.png]]


![[Pasted image 20250830183819.png]]


![[Pasted image 20250830183858.png]]


![[Pasted image 20250830183906.png]]


![[Pasted image 20250830183922.png]]


![[Pasted image 20250830183954.png]]

