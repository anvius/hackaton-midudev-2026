# Attestly — MVP Specification

Version: `1.3.2`

This repository adopts the [Standard AIR](https://github.com/simplicer/air) structure.

Normative references and semantic domains are maintained in:

- `docs/PRODUCT.md`
- `docs/ARCHITECTURE.md`
- `docs/STANDARDS.md`
- `docs/DECISIONS.md`

---

## Business Goal

Provide a simple and trustworthy way to certify digital content existence without storing the original content.

## Core Use Cases

1. Certify text content.
2. Certify file content.
3. Retrieve a public certificate by ID.

## Certificate Fields

| Field | Description |
|-------|-------------|
| `id` | Unique UUID |
| `hash` | SHA-256 of input content |
| `timestamp` | Server UTC timestamp |
| `fileName` | Optional file name (not persisted) |
| `contentType` | Optional MIME type |
| `originalContentPreview` | Short preview string |

## Constraints

- No original full-content persistence.
- Hash algorithm: SHA-256 only.
- SQLite for MVP persistence.
- Public read access through a unique URL.
- File names are **not** stored in persisted certificates.
- Certificate records are chained with previous-digest linkage.

## Implementation Status

- `Content` Value Object for `TEXT` and `FILE` payloads with validation rules.
- `HashCalculatorService` domain service for deterministic SHA-256 calculation.
- `Certificate` aggregate root with SHA-256 invariant and immutable state.
- `CertificateFactory` domain service to build certificates from content metadata and server timestamp.
- Application ports: `CertificateRepository` and `HashProvider`.
- Application use cases: `CertifyContentUseCase` and `GetCertificateUseCase`.
- Infrastructure adapters: SQLite repository, Bun crypto hash provider, HTTP controllers.
- Acceptance API flow: certify text and fetch certificate by ID.
- Frontend UX flow: drag-and-drop or text input, certificate route, QR and copy actions.
- Bilingual UI (ES/EN) and theme mode (`system`, `light`, `dark`).
- Dedicated process and legal pages with privacy and compliance explanations.
