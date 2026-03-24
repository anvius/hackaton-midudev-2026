# ARCHITECTURE

## Style

- Domain-Driven Design
- Vertical slicing
- Screaming architecture

## Slice Layout

`src/backend/certification/`

- `domain/`
- `application/`
- `infrastructure/`

## Dependency Direction

`Infrastructure -> Application -> Domain`

## Runtime

- Backend runtime: Bun
- Frontend framework: SvelteKit
- Database: SQLite

## Deployment

- Container files under `infra/containers/`
- Compose orchestration in `infra/compose.yaml`
- Makefile as command entry point
