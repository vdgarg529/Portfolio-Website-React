### 🔑 Common Token Types

1. **Bearer Token**
    
    - Most common in APIs (e.g., OAuth2, JWT).
        
    - Sent as:
        
        ```makefile
        Authorization: Bearer <token>
        ```
        
        
    - The server only needs the token itself (no proof of possession). Whoever holds it can use it → hence "bearer".
        

---

2. **MAC Token (Message Authentication Code)**
    
    - Provides proof of possession.
        
    - Instead of just sending the token, the client signs parts of the request with a secret.
        
    - Sent as:
        
        ```bash
        Authorization: MAC id="<token-id>", ts="<timestamp>", nonce="<nonce>", mac="<signature>"
        ```
        
        
    - More secure than bearer, but less common.
        

---

3. **Basic Token (HTTP Basic Auth)**
    
    - Not a “token” in the modern sense, but often grouped.
        
    - Encodes username and password in base64.
        
    - Sent as:
        
        ```bash
        Authorization: Basic <base64(username:password)>
        ```
        
        
    - Weak security → only safe over HTTPS.
        

---

4. **Digest Token (HTTP Digest Auth)**
    
    - Like Basic, but adds hashing of credentials + request data.
        
    - Sent as:
        
        ```bash
        Authorization: Digest username="...", realm="...", uri="...", response="..."
        ```
        
        
    - More secure than Basic, but rarely used today.
        

---

5. **HOBA (HTTP Origin-Bound Authentication)**
    
    - Token based on digital signatures (RFC 7486).
        
    - Not widely adopted.
        

---

6. **Mutual TLS Tokens**
    
    - Token is bound to a client certificate.
        
    - The client proves possession of a private key during the TLS handshake.
        
    - Strongest but requires infra setup.
        

---

7. **DPoP (Demonstration of Proof-of-Possession)**
    
    - Modern OAuth2 extension.
        
    - Like Bearer, but each request includes a signed proof JWT.
        
    - Prevents token replay if stolen.
        

---

8. **Custom Token Types**
    
    - Some APIs define their own (e.g., `Authorization: ApiKey <key>` or `Token <key>`).
        
    - Functionally similar to Bearer, just with a different keyword.
        

---

### ✅ Summary

- **Most common in practice**:
    
    - **Bearer** (JWT/OAuth2)
        
    - **Basic** (legacy APIs, testing)
        
    - **ApiKey** (simple custom scheme)
        
- **More secure but less common**:
    
    - MAC, Digest, DPoP, Mutual TLS



## 🔑 Token Types Comparison Cheat Sheet

|Token Type|Example `Authorization` Header|Security Level|Typical Use Cases|Strengths|Weaknesses|
|---|---|---|---|---|---|
|**Bearer**|`Authorization: Bearer <token>`|Medium|OAuth2, JWT APIs, REST APIs|Simple, widely supported, stateless|Anyone who has the token can use it (no binding to client)|
|**MAC**|`Authorization: MAC id="abc", ts="123456", nonce="xyz", mac="signature"`|High|Advanced OAuth2, APIs needing stronger integrity|Proof of possession, request signing|Complex to implement, rare adoption|
|**Basic**|`Authorization: Basic <base64(username:password)>`|Low|Legacy APIs, testing|Very simple|Sends credentials each time, reversible Base64, unsafe without HTTPS|
|**Digest**|`Authorization: Digest username="u", realm="r", uri="/", response="hash"`|Medium|Legacy enterprise systems|Protects password with hashing, prevents replay|Rare, complex headers, weaker than modern schemes|
|**HOBA**|`Authorization: HOBA <signed-data>`|High|Experimental (RFC 7486)|Public/private key signatures, origin-bound|Not widely supported|
|**Mutual TLS**|TLS client certificate exchange (not in `Authorization` header, but in handshake)|Very High|Banking, enterprise APIs|Strong binding to device, very secure|Complex infra, certificate management|
|**DPoP**|`Authorization: DPoP <JWT>` + request proof JWT in header|High|Modern OAuth2 enhancements|Prevents token replay, binds token to client|Still emerging, limited support|
|**API Key (Custom)**|`Authorization: ApiKey <key>` or `Authorization: Token <key>` or in query param `?api_key=`|Low–Medium|Simpler APIs, internal services|Easy for developers, no need for OAuth|Often hard-coded, can be leaked, limited scope control|

---

### 🧠 Key Takeaways

- **Bearer tokens (JWTs)** = industry default (e.g., FastAPI, Flask, Node APIs).
    
- **Basic & Digest** = legacy, not recommended for new APIs.
    
- **API Keys** = simple but weaker than OAuth.
    
- **MAC / DPoP / Mutual TLS** = stronger security, but more complexity → used in high-security environments.


# Token Types in Request Flow
```mermaid
flowchart LR
    subgraph Client
        A[Prepare Request] --> B[Attach Token in Authorization Header]
    end

    B --> |Bearer / MAC / Basic / Digest / API Key| C[API Server]

    subgraph Server
        C --> D{Check Token Type}
        D -->|Bearer| E[Validate JWT Signature & Expiry]
        D -->|MAC| F[Verify Request Signature w/ Shared Secret]
        D -->|Basic| G[Decode Base64 → Verify Username+Password]
        D -->|Digest| H[Recompute Hash & Compare]
        D -->|API Key| I[Lookup Key in DB / Config]
        D -->|DPoP| J[Verify Proof-of-Possession JWT]
        D -->|Mutual TLS| K[Validate Client Certificate in TLS Handshake]
    end

    E & F & G & H & I & J & K --> L{Valid?}
    L -->|Yes| M[Allow Access]
    L -->|No| N[Reject with 401 Unauthorized]

```

- The client **attaches a token** in the request header (except for **Mutual TLS**, which happens at the TLS handshake).
    
- The server **branches validation logic** depending on the token type.
    
- If the token checks out → request proceeds; else → rejected.





## *JWT itself is just a token format (a JSON Web Token, RFC 7519).*  
## *The token type (e.g., Bearer, DPoP, MAC) is about how that JWT is transmitted and validated, not the JWT itself.*



### JWT vs Token Type

- **JWT** = a _container_ (header.payload.signature).
    
    - Example:
        
        ```jwt
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwi...
        ```
        
        
    - Can hold claims like `sub`, `exp`, `aud`, etc.
        
    - Can be signed (JWS) or encrypted (JWE).
        
- **Token Type** = how the client/server agree to _use_ that JWT.
    
    - The `Authorization` header determines the scheme.
        
    - Example:
        
        - **Bearer JWT**:
            
            ```makefile
            Authorization: Bearer <jwt>
            ```
            
            
        - **DPoP JWT** (Proof-of-Possession):
            
            ```makefile
            Authorization: DPoP <jwt>
            ```
            
            
            Plus an extra `DPoP` header with a signed proof JWT.
            
        - **JWT Secured Authorization Request (JAR)**: JWT in OAuth2 request, not in header.
            
        - **Mutual TLS-bound JWT**: JWT is tied to a client cert.
            

---

### 🔑 Common JWT “token types”

1. **Bearer JWT** → most common (OAuth2 / APIs).
    
2. **DPoP JWT** → proof-of-possession variant, prevents replay.
    
3. **JWT Profile for OAuth 2.0 Access Tokens** → standardized use of JWTs as access tokens.
    
4. **SAML Assertion wrapped as JWT** → in federated identity.
    
5. **Custom schemes** → Some APIs use `Authorization: Token <jwt>` or embed JWTs in cookies instead of headers.
    

---

### ⚡ Key Point

JWT doesn’t _have_ to be Bearer — but **Bearer is by far the most common**.  
Other schemes (DPoP, Mutual TLS, MAC) can carry JWTs too, but require extra validation logic beyond just checking the signature.





## Same JWT, Different Token Types

Imagine we have a JWT:

```jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZhc mRhbiIsImV4cCI6MTcyMDAwMDAwMH0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```


This is just a **format** (header.payload.signature).  
Now let’s see how it travels under different token types 👇

---

### 1. **Bearer JWT (most common)**

📌 Usage: OAuth2, FastAPI, REST APIs

```http
GET /transactions HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```


- Server: verifies JWT signature + expiry.
    
- Whoever holds it can use it (no extra proof).
    

---

### 2. **DPoP JWT (Proof-of-Possession)**

📌 Usage: OAuth2 with replay protection

```http
GET /transactions HTTP/1.1
Host: api.example.com
Authorization: DPoP eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

DPoP: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIs...
```


- `Authorization` header carries the JWT access token.
    
- Extra **`DPoP` header** carries a _proof JWT_ signed with client’s private key.
    
- Server validates both → prevents stolen token reuse.
    

---

### 3. **Cookie-based JWT (session style)**

📌 Usage: Web apps with HTTP-only cookies

```http
GET /transactions HTTP/1.1
Host: app.example.com
Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```


- JWT stored in a **cookie** instead of `Authorization` header.
    
- Often marked `HttpOnly` + `Secure` to prevent JS access.
    
- Server reads JWT from cookies → validates.
    

---

### 4. **Custom Token Scheme (API Key style)**

📌 Some APIs invent their own keyword

```http
GET /transactions HTTP/1.1
Host: api.example.com
Authorization: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```


- Functionally identical to Bearer, but keyword differs.
    
- Seen in Django REST Framework, older APIs.
    

---

✅ **Key Takeaway**

- **JWT itself is agnostic** — it’s just a signed (or encrypted) blob.
    
- The **token type** is defined by how the client presents it and how the server validates it.
    
- **Bearer** is the default everywhere, but JWTs can ride inside **DPoP, cookies, or custom schemes** too.