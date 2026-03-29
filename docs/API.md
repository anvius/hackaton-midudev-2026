# DOCCUM Public API

Base URL: `https://api.doccum.com` (production) | `http://localhost:3000` (development)

All endpoints under `/api/*` support CORS.

---

## Certification

### POST /api/certify

Certify a file. Returns immutable cryptographic proof of existence.

**Request:** `multipart/form-data`

| Field | Type   | Required | Description                  |
|-------|--------|----------|------------------------------|
| file  | File   | yes      | File to certify (max 25 MB)  |

**Response:** `201 Created`

```json
{
  "id": "a76f254b-a82f-4b43-b8a6-1fa307227a78",
  "hash": "dddc052741ad8a25715ba5bcb88660881ee8aa96...",
  "timestamp": "2026-03-29T13:10:05.925Z",
  "fileName": null,
  "contentType": "application/pdf",
  "originalContentPreview": "pdf document (14231 bytes)",
  "chainIndex": 0,
  "previousCertificateDigest": "000000000000000000000000000000000000000000000000",
  "certificateDigest": "cd991a898e3408ee7889bc6b0b3525d9b6a38096...",
  "cubepathUnixTimeCheckedAt": "2026-03-29T13:10:06.006Z",
  "cubepathUnixTimeSourceHash": "e115f7521c6b37895c3cc7eb76d223dbcdac77b9...",
  "cubepathStatusCheckedAt": "2026-03-29T13:10:06.187Z",
  "cubepathStatusSourceHash": "f021ff04c68e7c5542165eb2bc551df7d0e1dcfa...",
  "storesFileName": false,
  "storesOriginalContent": false
}
```

**Errors:** `400 Bad Request` — missing file, exceeds size limit, or domain validation error.

---

### POST /api/certify-text

Certify a text string directly.

**Request:** `application/json`

```json
{
  "text": "Contract clause to certify"
}
```

| Field | Type   | Constraints          |
|-------|--------|----------------------|
| text  | string | 1–100,000 characters |

**Response:** `201 Created` — same `CertificateDto` shape as `/api/certify`.

---

### POST /api/verify

Verify if a file was previously certified.

**Request:** `multipart/form-data`

| Field | Type | Required | Description                    |
|-------|------|----------|--------------------------------|
| file  | File | yes      | File to check (max 25 MB)      |

**Response:** `200 OK`

```json
{
  "verified": true,
  "hash": "dddc052741ad8a25715ba5bcb88660881ee8aa96...",
  "certificate": {
    "id": "a76f254b-a82f-4b43-b8a6-1fa307227a78",
    "hash": "dddc052741ad8a25715ba5bcb88660881ee8aa96...",
    "timestamp": "2026-03-29T13:10:05.925Z",
    "chainIndex": 0,
    "certificateDigest": "cd991a898e3408ee7889bc6b0b3525d9b6a38096..."
  }
}
```

If the file was **not** certified: `verified: false`, `certificate: null`.

---

### GET /api/cert/:id

Retrieve a certificate by its ID.

**Path parameter:** `id` — Certificate UUID.

**Response:** `200 OK` — `CertificateDto`

**Errors:** `404 Not Found` — `{ "error": "Certificate not found" }`

---

### GET /api/certificates/count

Get total number of certificates issued.

**Response:** `200 OK`

```json
{ "total": 42 }
```

---

### GET /api/certificates/latest

Get the ID of the most recently issued certificate.

**Response:** `200 OK`

```json
{ "id": "a76f254b-a82f-4b43-b8a6-1fa307227a78" }
```

**Response when empty:** `404 Not Found` — `{ "id": null }`

---

## Contact

### GET /api/contact/config

Get captcha challenge for the contact form.

**Response:** `200 OK`

```json
{
  "captcha": {
    "firstOperand": 10,
    "secondOperand": 5,
    "token": "1711720205925:hmac_signature"
  }
}
```

### POST /api/contact

Send a contact message.

**Request:** `application/json`

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "I need help with certification",
  "captchaAnswer": 15,
  "captchaToken": "1711720205925:hmac_signature",
  "honeypot": ""
}
```

| Field        | Type   | Description                               |
|-------------|--------|-------------------------------------------|
| name        | string | Sender name                               |
| email       | string | Sender email                              |
| message     | string | Message body                              |
| captchaAnswer | number | Sum of firstOperand + secondOperand     |
| captchaToken  | string | Token from `/api/contact/config`        |
| honeypot    | string | Anti-spam field, must be empty            |

**Response:** `200 OK` — `{ "ok": true }`

---

## System

### GET /health

Health check endpoint (outside `/api` prefix).

**Response:** `200 OK`

```json
{ "status": "ok", "service": "doccum-backend" }
```

### GET /api/public-config

Public configuration for the frontend.

**Response:** `200 OK`

```json
{
  "certification": { "maxUploadBytes": 26214400 },
  "ui": { "hackathonBanner": "Hackathon build" },
  "owner": {
    "legalName": "...",
    "tin": "...",
    "address": "...",
    "contactEmail": "...",
    "url": "..."
  }
}
```

---

## Certificate Fields Reference

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique certificate UUID |
| `hash` | string | SHA-256 hash of the certified content |
| `timestamp` | string | ISO 8601 UTC timestamp of certification |
| `fileName` | string\|null | Always null (privacy by design) |
| `contentType` | string\|null | MIME type of the original content |
| `originalContentPreview` | string\|null | Non-sensitive summary (e.g. "pdf document (14 KB)") |
| `chainIndex` | number | Position in the certificate chain (0-based) |
| `previousCertificateDigest` | string | SHA-256 digest linking to the prior certificate |
| `certificateDigest` | string | This certificate's chain digest |
| `cubepathUnixTimeCheckedAt` | string\|null | When CubePath UnixTime was consulted |
| `cubepathUnixTimeSourceHash` | string\|null | SHA-256 of the CubePath UnixTime response |
| `cubepathStatusCheckedAt` | string\|null | When CubePath Status was consulted |
| `cubepathStatusSourceHash` | string\|null | SHA-256 of the CubePath Status response |
| `storesFileName` | boolean | Whether the original filename is stored (always false) |
| `storesOriginalContent` | boolean | Whether original content is stored (always false) |

---

## Privacy

DOCCUM never stores the original file content or filename. Only the cryptographic hash, timestamp, and chain metadata are persisted. The `storesFileName` and `storesOriginalContent` fields are always `false`, providing transparency about data handling.

## Authentication

The API is currently public and does not require authentication. Rate limiting may apply in production.

## Examples

### cURL: Certify a file

```bash
curl -X POST https://api.doccum.com/api/certify \
  -F "file=@document.pdf"
```

### cURL: Certify text

```bash
curl -X POST https://api.doccum.com/api/certify-text \
  -H "Content-Type: application/json" \
  -d '{"text":"Contract clause v2.1"}'
```

### cURL: Verify a file

```bash
curl -X POST https://api.doccum.com/api/verify \
  -F "file=@document.pdf"
```

### cURL: Get certificate

```bash
curl https://api.doccum.com/api/cert/a76f254b-a82f-4b43-b8a6-1fa307227a78
```
