# BoiMix Backend Docs

This folder contains the backend planning, architecture, and database design documents for BoiMix.

## Documents

- `backend_architecture.md`
  - Main backend architecture, final infrastructure decision, and modular monolith structure.
- `backend_implementation_instructions.md`
  - Backend best practices, do/don't rules, and implementation instructions.
- `backend_phase_by_phase_plan.md`
  - Backend implementation roadmap broken into phases.
- `backend_feature_dependency_audit.md`
  - Feature dependency and missing-scope audit for backend planning.
- `database_erd.dbml`
  - Master database ERD in DBML format.
- `database_erd_domains/`
  - Smaller domain-based DBML files for focused ERD review.

## Final Backend Direction

- Architecture style: modular monolith
- Module style: feature-based apps
- Deployment: 2 VPS
- VPS 1: public app stack
- VPS 2: internal search and map stack
- Internal communication: private network only
- Search/map services: not publicly exposed
