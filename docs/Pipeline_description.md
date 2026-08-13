# Pipeline Description

## Overview

Udagram uses CircleCI for continuous integration and continuous deployment. Every push to the `master` branch triggers the pipeline. Deployment to AWS requires a manual approval step to prevent accidental releases.

---

## Pipeline Stages

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  build   │────▶│  hold    │────▶│  deploy  │
│          │     │(approval)│     │          │
└──────────┘     └──────────┘     └──────────┘
   always         master only       master only
```

---

## Stage Details

### 1. `build`

**Trigger:** Every push to any branch.

**Docker image:** `cimg/node:14.15`

**Steps:**

| Step | Command | Purpose |
|------|---------|---------|
| Install Node | orb `node/install` | Ensures Node 14.15 is available |
| Checkout code | `checkout` | Pulls source from GitHub |
| Install frontend deps | `npm run frontend:install` | `npm install -f` in `udagram-frontend` |
| Install API deps | `npm run api:install` | `npm install` in `udagram-api` |
| Lint frontend | `npm run frontend:lint` | Fails fast on code style violations |
| Build frontend | `npm run frontend:build` | Angular production build (`ng build`) |
| Build API | `npm run api:build` | TypeScript compile + package `Archive.zip` |

---

### 2. `hold`

**Trigger:** Only on `master` branch, after `build` succeeds.

**Type:** Manual approval — a team member must click "Approve" in CircleCI before deployment proceeds.

**Purpose:** Prevents untested or unreviewed code from reaching production automatically.

---

### 3. `deploy`

**Trigger:** After `hold` is approved (master branch only).

**Docker image:** `cimg/base:stable`

**Steps:**

| Step | Details |
|------|---------|
| Install Node | orb `node/install` (v14.15) |
| Install EB CLI | orb `eb/setup` |
| Install AWS CLI | orb `aws-cli/setup` |
| Checkout code | `checkout` |
| Deploy | `npm run deploy` → deploys API to EB, frontend to S3 |

`npm run deploy` expands to:
```
npm run api:deploy    →  npm run build && eb deploy (Elastic Beanstalk)
npm run frontend:deploy  →  ng build + bin/deploy.sh (S3 sync)
```

---

## Environment Variables

All secrets are stored in CircleCI **Project Settings → Environment Variables**. They are never committed to source control.

| Variable | Used by | Description |
|----------|---------|-------------|
| `POSTGRES_USERNAME` | API | RDS master username |
| `POSTGRES_PASSWORD` | API | RDS master password |
| `POSTGRES_HOST` | API | RDS endpoint |
| `POSTGRES_DB` | API | Database name |
| `AWS_BUCKET` | API + deploy.sh | S3 bucket name (no `arn:` prefix) |
| `AWS_REGION` | API + AWS CLI | AWS region (e.g. `us-east-1`) |
| `AWS_ACCESS_KEY_ID` | AWS CLI | IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS CLI | IAM secret key |
| `JWT_SECRET` | API | Secret for signing JWTs |
| `URL` | API | Frontend URL (CORS allowed origin) |

---

## Pipeline Diagram

```
Developer pushes code
        │
        ▼
   GitHub repo
        │
        ▼ (webhook)
   CircleCI
        │
        ▼
   ┌─────────────────────────────┐
   │          BUILD              │
   │  1. Install frontend deps   │
   │  2. Install API deps        │
   │  3. Lint frontend           │
   │  4. Build frontend (ng)     │
   │  5. Build API (tsc + zip)   │
   └──────────────┬──────────────┘
                  │  success
                  ▼ (master branch only)
   ┌─────────────────────────────┐
   │    HOLD (manual approval)   │
   │  Team member reviews &      │
   │  approves in CircleCI UI    │
   └──────────────┬──────────────┘
                  │  approved
                  ▼
   ┌─────────────────────────────┐
   │          DEPLOY             │
   │  1. npm run api:deploy      │
   │     └─▶ eb deploy           │
   │  2. npm run frontend:deploy │
   │     └─▶ aws s3 cp           │
   └─────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
   Elastic Beanstalk        S3
   (API live)            (Frontend live)
```
