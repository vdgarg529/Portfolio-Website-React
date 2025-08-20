# SECURITY SECTION FOR HIGH-LEVEL DESIGN (HLD)

---

## 1. Foundations of Security
### 1.1. Basic Security Principles
- Confidentiality, Integrity, Availability (CIA Triad)  
- Principle of Least Privilege  
- Defense in Depth  
- Threat Modeling (STRIDE, DREAD, Attack Trees)  

### 1.2. Security in System Design
- Security by Design vs Security as an Afterthought  
- Secure Development Lifecycle (SDL)  
- Common Security Design Patterns  

---

## 2. Authentication & Authorization
### 2.1. Authentication vs Authorization  
### 2.2. Authentication Methods
- Username/Password  
- Multi-Factor Authentication (MFA)  
- Biometrics  
- Certificates  

### 2.3. Authorization Models
- Role-Based Access Control (RBAC)  
- Attribute-Based Access Control (ABAC)  
- Policy-Based Access Control (PBAC)  

### 2.4. Identity Providers (IdP) and Federation  

---

## 3. Session & State Management
### 3.1. Session Basics
- Server-Side Sessions  
- Stateless Sessions  

### 3.2. Session Tokens
- Session ID  
- Session Expiry  
- Session Hijacking & Mitigation  

### 3.3. Session Storage Options
- Cookie  
- Local Storage  
- Session Storage  
- In-Memory (JS Variables)  

### 3.4. Best Practices
- Rotation  
- Secure Transmission  
- Timeout Policies  

---

## 4. Token-Based Authentication
### 4.1. JSON Web Tokens (JWT)
- Structure (Header, Payload, Signature)  
- Encoding & Decoding  

### 4.2. Token Types
- Access Token  
- Refresh Token  
- Bearer Token  

### 4.3. Token Lifecycle
- Expiry  
- Renewal & Refresh Tokens  
- Revocation  

### 4.4. Token Storage
- Local Storage vs Cookie  
- HttpOnly, Secure, SameSite flags  
- Auto-send with requests  
- Persist vs Non-Persist Reload  

### 4.5. Common Pitfalls
- JWT Replay Attacks  
- Token Bloat  
- Algorithm Confusion Attacks  

---

## 5. Modern Authentication Protocols
### 5.1. OAuth 2.0
- Grant Types (Auth Code, Implicit, Password, Client Credentials, Device Code)  
- Scopes & Consent  
- PKCE (Proof Key for Code Exchange)  

### 5.2. OpenID Connect (OIDC)
- ID Token vs Access Token  
- UserInfo Endpoint  
- Federation & Claims  

### 5.3. Single Sign-On (SSO)
- SAML vs OIDC vs OAuth2  
- Centralized Authentication  
- Enterprise SSO (Okta, Azure AD, Auth0)  

---

## 6. Web Security Fundamentals
### 6.1. Browser Storage Security
- LocalStorage vs SessionStorage vs Cookies  
- Pros & Cons of Each  

### 6.2. Cross-Site Scripting (XSS)
- Stored, Reflected, DOM XSS  
- Prevention (Sanitization, Encoding, CSP)  

### 6.3. Cross-Site Request Forgery (CSRF)
- Attack Vector  
- CSRF Tokens  
- SameSite Cookie Mitigation  

### 6.4. Clickjacking
- X-Frame-Options  
- Content Security Policy (CSP)  

### 6.5. Secure HTTP Headers
- HSTS (Strict-Transport-Security)  
- X-Content-Type-Options  
- Referrer-Policy  
- Feature-Policy  

---

## 7. API Security
### 7.1. API Authentication & Authorization
- API Keys  
- JWTs  
- OAuth2 Flows  

### 7.2. API Response Security
- Error Handling (No Info Leakage)  
- Rate Limiting & Throttling  
- Pagination & Resource Control  

### 7.3. Input Validation & Sanitization  

### 7.4. Protecting Against Injection Attacks
- SQL Injection  
- NoSQL Injection  
- Command Injection  

---

## 8. Secure Communication
### 8.1. HTTPS & TLS
- TLS Handshake  
- Certificate Authorities  
- Perfect Forward Secrecy  

### 8.2. Mutual TLS (mTLS)  

### 8.3. Secure WebSockets  

### 8.4. Data Encryption
- Symmetric (AES)  
- Asymmetric (RSA, ECC)  
- Hashing (SHA-256, Bcrypt, Argon2)  
- Digital Signatures  

---

## 9. Enterprise Security & Advanced Topics
### 9.1. Identity Federation & SSO  
### 9.2. Centralized Identity & Access Management (IAM)  
### 9.3. Zero Trust Security  
### 9.4. Threat Detection & Intrusion Prevention  
### 9.5. Logging, Monitoring, and Audit Trails  
### 9.6. Secrets Management (Vault, KMS, HSM)  

---

## 10. Cloud & Distributed System Security
### 10.1. Cloud Provider Security (AWS, GCP, Azure)
- IAM Roles & Policies  
- Key Management  
- Secure Storage (S3 Buckets, Blob Storage)  

### 10.2. Microservices Security
- Service-to-Service Authentication  
- mTLS in Service Mesh (Istio, Linkerd)  

### 10.3. API Gateway Security  

### 10.4. Container Security
- Docker Security  
- Kubernetes RBAC & Network Policies  

---

## 11. Advanced Threats & Secure Design Practices
### 11.1. Replay Attacks & Mitigation  
### 11.2. Man-in-the-Middle (MITM) Attacks  
### 11.3. Denial of Service (DoS/DDoS)  
### 11.4. Side-Channel Attacks  
### 11.5. Supply Chain Security  
### 11.6. Security Testing
- Penetration Testing  
- Static Application Security Testing (SAST)  
- Dynamic Application Security Testing (DAST)  
- Threat Modeling in Design Phase  

---

**END OF LIST**
