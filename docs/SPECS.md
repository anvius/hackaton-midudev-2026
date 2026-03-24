# DocCum MVP Specification

Version: `0.1.0`

## Business Goal

Provide a simple and trustworthy way to certify digital content existence without storing full original content.

## Core Use Cases

1. Certify text content.
2. Certify file content.
3. Retrieve public certificate by ID.

## Certificate Fields

- `id`: unique UUID
- `hash`: SHA256 of input content
- `timestamp`: server UTC timestamp
- `fileName`: optional file name
- `contentType`: optional MIME type
- `originalContentPreview`: short preview string

## Constraints

- No original full content persistence.
- Hash algorithm is SHA256 only.
- SQLite for MVP persistence.
- Public read access through unique URL.
- File names are not stored in persisted certificates.
- Certificate records are chained with previous digest linkage.
- External time evidence hashes may be stored from CubePath public pages.

## Implementation Status

- Completed:
	- `Content` Value Object for `TEXT` and `FILE` payloads with validation rules.
	- `HashCalculatorService` domain service for deterministic SHA256 calculation.
	- `Certificate` aggregate root with SHA256 invariant and immutable state.
	- `CertificateFactory` domain service to build certificates from content metadata and server timestamp.
	- Application ports: `CertificateRepository` and `HashProvider`.
	- Application use cases: `CertifyContentUseCase` and `GetCertificateUseCase`.
	- Infrastructure adapters: SQLite repository, Node crypto hash provider, HTTP controllers.
	- Acceptance API flow: certify text and fetch certificate by id.
	- Frontend UX flow: drag/drop or text input, certificate route, QR and copy actions.
	- Bilingual UI (ES/EN) and theme mode (`system`, `light`, `dark`).
	- Dedicated process and legal pages with privacy and compliance explanations.
