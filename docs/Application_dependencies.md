# Application Dependencies

## Runtime Environment

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 14.15.x | JavaScript runtime for the API |
| npm | 6.14.x | Package manager |
| AWS CLI v2 | 2.x | Interact with AWS from the CLI and CircleCI |
| EB CLI | latest | Deploy to Elastic Beanstalk |
| PostgreSQL client (`psql`) | 12–13 | Connect to the RDS database locally |

---

## Backend API (`udagram-api`)

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.16.4 | HTTP server and routing |
| `sequelize` | ^6.26.0 | ORM for PostgreSQL |
| `sequelize-typescript` | ^2.1.5 | TypeScript decorators for Sequelize |
| `pg` | ^8.7.1 | PostgreSQL driver |
| `aws-sdk` | ^2.429.0 | S3 pre-signed URL generation |
| `bcryptjs` | 2.4.3 | Password hashing |
| `jsonwebtoken` | ^8.5.1 | JWT creation and verification |
| `cors` | ^2.8.5 | Cross-origin request handling |
| `dotenv` | ^8.2.0 | Load env variables from `.env` |
| `body-parser` | ^1.18.3 | Parse incoming request bodies |
| `email-validator` | ^2.0.4 | Validate email addresses |
| `reflect-metadata` | ^0.1.13 | Required for Sequelize decorators |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^4.2.3 | TypeScript compiler |
| `ts-node-dev` | ^1.0.0-pre.32 | Live-reload dev server for TypeScript |
| `@typescript-eslint/*` | ^2.19.2 | TypeScript linting |
| `eslint` | ^6.8.0 | JavaScript linting |
| `mocha` | ^6.1.4 | Test runner |
| `chai` | ^4.2.0 | Assertion library |
| `chai-http` | ^4.2.1 | HTTP assertions for API testing |

---

## Frontend (`udagram-frontend`)

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@angular/core` | 8.2.14 | Angular framework |
| `@angular/router` | 8.2.14 | Client-side routing |
| `@angular/forms` | 8.2.14 | Reactive and template forms |
| `@ionic/angular` | ^4.1.0 | Ionic UI components |
| `rxjs` | ~6.5.4 | Reactive programming (Observables) |
| `zone.js` | ~0.9.1 | Angular change detection |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@angular/cli` | ^8.3.25 | Angular build toolchain |
| `typescript` | ^3.5.3 | TypeScript compiler |
| `karma` | ~4.3.0 | Unit test runner |
| `jasmine-core` | ~3.5.0 | Unit test framework |
| `protractor` | ~5.4.3 | End-to-end test framework |

---

## AWS Services (required before deployment)

| Service | Purpose | Must create manually |
|---------|---------|---------------------|
| RDS PostgreSQL | Stores app data | Yes — create via AWS Console |
| S3 bucket (images) | Stores user-uploaded photos | Yes — create via AWS Console |
| S3 bucket (frontend) | Hosts the static Angular app | Yes — enable static website hosting |
| Elastic Beanstalk app+env | Runs the Node API | Yes — create via `eb init` / `eb create` |
| IAM user | CI/CD credentials | Yes — attach `AdministratorAccess` or scoped policies |

---

## Local Development Setup

```bash
# 1. Clone the repo and source environment variables
source udagram/set_env.sh

# 2. Install and start the API
npm run api:install
npm run api:start        # ts-node-dev on port 8080

# 3. Install and start the frontend (new terminal)
npm run frontend:install
npm run frontend:start   # ng serve on http://localhost:8100
```

### Required local environment variables (`set_env.sh`)

```bash
POSTGRES_USERNAME=<rds-username>
POSTGRES_PASSWORD=<rds-password>
POSTGRES_HOST=<rds-endpoint>
POSTGRES_DB=postgres
AWS_BUCKET=<s3-bucket-name>       # bucket name only, no arn: prefix
AWS_REGION=us-east-1
AWS_PROFILE=default                # matches a profile in ~/.aws/credentials
JWT_SECRET=<random-secret-string>
URL=http://localhost:8100
```
