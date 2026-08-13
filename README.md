# Udagram — Full-Stack Image Sharing App

Udagram is a full-stack web application that allows users to register, log in, post photos to a public feed, and have those photos processed through an image filtering service. It is deployed on AWS with a fully automated CI/CD pipeline using CircleCI.

<!-- CircleCI build status badge — replace ORG and REPO with your values -->
<!-- [![CircleCI](https://dl.circleci.com/status-badge/img/gh/YOUR-ORG/YOUR-REPO/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/YOUR-ORG/YOUR-REPO/tree/master) -->

---

## Live Application

> **Frontend URL:** `[udagram](http://udagram-647463061799-us-east-1-an.s3-website-us-east-1.amazonaws.com/)`
> *(Replace with your actual S3 static website URL after deployment)*

---

## Application Architecture

| Component | Technology | Hosting |
|-----------|-----------|---------|
| Frontend | Angular 8 + Ionic 4 | AWS S3 static website |
| Backend API | Node.js + Express + TypeScript | AWS Elastic Beanstalk |
| Database | PostgreSQL | AWS RDS |
| Media storage | S3 pre-signed URLs | AWS S3 |
| CI/CD | CircleCI | circleci.com |

For full details see the [`docs/`](docs/) folder:
- [Infrastructure description](docs/Infrastructure_description.md)
- [Pipeline description](docs/Pipeline_description.md)
- [Application dependencies](docs/Application_dependencies.md)

---

## Screenshots

### 1. Application Architecture
![Application architecture diagram](screenshots/architecture.png)

### 2. CI/CD Pipeline Infrastructure
![CI/CD pipeline diagram](screenshots/pipeline.png)

### 3. AWS RDS — PostgreSQL Database
Status **Available**, engine PostgreSQL, region `us-east-1`.

![RDS PostgreSQL instance](screenshots/rds-database.png)

### 4. AWS S3 — Frontend Hosting
Static website hosting enabled on the frontend bucket.

![S3 bucket properties](screenshots/s3-bucket.png)
![S3 bucket overview](screenshots/s3-bucket-overview.png)

### 5. AWS Elastic Beanstalk — API
Environment `udagram-api-dev` running the Node.js API.

![Elastic Beanstalk environment](screenshots/elastic-beanstalk.png)

### 6. CircleCI — Project / Account
![CircleCI project connected to GitHub](screenshots/circleci-account.png)

### 7. CircleCI — Environment Variables
Variable names shown; values stay masked (expected).

![CircleCI environment variables](screenshots/circleci-env-vars.png)

### 8. Last Successful Pipeline Build
`build → hold → deploy` all green.

![CircleCI last successful build](screenshots/circleci-last-build.png)

---

## Local Development

### Prerequisites

- Node.js 14.15.x and npm 6.x
- AWS CLI v2 configured (`aws configure`)
- EB CLI (`pip install awsebcli`)
- PostgreSQL client (`psql --version`)

### Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd udagram

# 2. Set local environment variables
# Copy set_env.sh.example to set_env.sh and fill in your values
source udagram/set_env.sh

# 3. Install and start the API (port 8080)
npm run api:install
npm run api:start

# 4. In a new terminal — install and start the frontend (port 8100)
npm run frontend:install
npm run frontend:start
```

---

## Root-Level npm Scripts

| Script | Description |
|--------|-------------|
| `npm run frontend:install` | Install frontend dependencies |
| `npm run frontend:start` | Start Angular dev server |
| `npm run frontend:build` | Production Angular build |
| `npm run frontend:lint` | Run TSLint on frontend code |
| `npm run frontend:test` | Run Jasmine/Karma unit tests |
| `npm run frontend:deploy` | Build and sync to S3 |
| `npm run api:install` | Install API dependencies |
| `npm run api:build` | Compile TypeScript and package for EB |
| `npm run api:start` | Start API in dev mode (ts-node-dev) |
| `npm run api:deploy` | Build and deploy to Elastic Beanstalk |
| `npm run deploy` | Deploy both API and frontend |

---

## Testing

```bash
# Frontend unit tests (Jasmine + Karma)
npm run frontend:test

# Frontend end-to-end tests (Protractor)
npm run frontend:e2e
```

---

## Built With

- [Angular](https://angular.io/) — Single Page Application Framework
- [Ionic](https://ionicframework.com/) — Mobile-first UI components
- [Node.js](https://nodejs.org) — JavaScript runtime
- [Express](https://expressjs.com/) — REST API framework
- [Sequelize](https://sequelize.org/) — ORM for PostgreSQL
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/) — S3 integration
- [CircleCI](https://circleci.com/) — CI/CD pipeline

## License

[ISC](LICENSE.txt)
