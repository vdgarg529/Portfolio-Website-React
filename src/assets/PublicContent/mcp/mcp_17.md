# Chapter 17: Roots

## 17.1 What Is a Root?

A root describes a filesystem boundary or URI made available by a client.

Conceptually:

```text
file:///home/user/project
file:///workspace/repository
```

Roots can help a server understand which directories are relevant or permitted.

---

## 17.2 Roots Are Not a Security Boundary

A root is contextual information.

Actual filesystem security must still be enforced using:

```text
Operating-system permissions
Path validation
Sandboxing
Allow lists
Container restrictions
```

Do not trust a model or a URI alone to enforce safe file access.

---

