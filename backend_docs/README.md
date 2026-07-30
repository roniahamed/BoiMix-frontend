# BoiMix Backend Docs

This folder contains the backend planning, architecture, and database design documents for BoiMix.

## Documents

- `backend_architecture.md`
  - Main backend architecture, final infrastructure decision, and modular monolith structure.
- `backend_implementation_instructions.md`
  - Backend best practices, do/don't rules, and implementation instructions.
- `backend_api_documentation_standards.md`
  - API documentation standards, required endpoint details, and professional documentation rules.
- `backend_coding_standards.md`
  - Coding conventions, module ownership rules, naming, file-size guidance, and code organization standards.
- `backend_testing_standards.md`
  - Required testing expectations for services, APIs, integrations, and critical workflows.
- `backend_deployment_runbook.md`
  - Deployment, migration, rollback, and operational verification guide.
- `backend_env_and_secrets_reference.md`
  - Environment variable and secret reference for backend services and integrations.
- `backend_decision_log.md`
  - Major backend decisions with dates, reasons, and impact.
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
