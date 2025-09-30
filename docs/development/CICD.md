# CI/CD Pipeline

Complete guide to the Continuous Integration and Continuous Deployment pipeline for the Multi-Template Website Generation Platform.

## Overview

The platform uses GitHub Actions for automated testing, performance auditing, and deployment to Vercel. Four workflows handle different aspects of the CI/CD pipeline:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push to main, PRs | Run tests, type checking, build validation |
| `lighthouse.yml` | PRs to main | Performance audits with Lighthouse CI |
| `preview.yml` | PRs opened/updated | Deploy preview environments |
| `deploy.yml` | Push to main, manual | Deploy to production |

## Workflows

### 1. CI Pipeline (`ci.yml`)

**Triggered on**: Push to `main`, pull requests to `main`

**Jobs**:
- **Test** (runs on Node 18.x and 20.x):
  - Type checking with TypeScript
  - Unit tests with Vitest
  - Code coverage reporting (Codecov)
  - Build validation
  - Performance budget checks

- **E2E Tests** (runs after Test job):
  - Playwright browser tests
  - Visual regression testing
  - Upload test artifacts

- **Lint**:
  - ESLint validation (non-blocking)

**Usage**: Automatically runs on every push and PR. Ensures code quality before merging.

### 2. Lighthouse CI (`lighthouse.yml`)

**Triggered on**: Pull requests to `main`

**What it does**:
- Builds the project
- Runs Lighthouse audits on key pages:
  - Homepage (`/`)
  - Blog listing (`/blog`)
  - About page (`/about`)
  - Contact page (`/contact`)
- Validates against performance budgets (lighthouse-budget.json)
- Posts results as PR comment

**Performance Budgets**:
```json
{
  "timings": {
    "interactive": "2000ms (±500ms)",
    "first-contentful-paint": "1000ms (±300ms)",
    "largest-contentful-paint": "2500ms (±500ms)",
    "cumulative-layout-shift": "0.1 (±0.05)"
  },
  "resourceSizes": {
    "document": "100 KB",
    "script": "50 KB",
    "stylesheet": "50 KB",
    "image": "500 KB",
    "total": "1000 KB"
  }
}
```

**Interpreting Results**: PR comments show performance scores (0-100) for:
- Performance
- Accessibility
- Best Practices
- SEO

Target: All scores ≥95

### 3. Preview Deployments (`preview.yml`)

**Triggered on**: PR opened, synchronized, or reopened

**What it does**:
- Builds the project
- Deploys to Vercel preview environment
- Comments on PR with preview URL
- Updates comment on new commits

**PR Comment includes**:
- Preview URL
- Quick links to key pages (homepage, blog, about, contact)
- Next steps reminder (review, Lighthouse audit, visual regression)

**Usage**: Every PR gets an automatic preview deployment for testing changes before merging.

### 4. Production Deployment (`deploy.yml`)

**Triggered on**:
- Push to `main` (automatic)
- Manual workflow dispatch

**What it does**:
- Full test suite execution
- Build validation
- Performance budget checks
- Deploy to Vercel production
- Create deployment status

**Usage**: Automatically deploys to production when changes are merged to `main`.

## Setup Instructions

### 1. Configure Vercel Secrets

You need three secrets from your Vercel account:

1. **VERCEL_TOKEN**: Personal access token
   - Go to https://vercel.com/account/tokens
   - Create new token
   - Copy the token

2. **VERCEL_ORG_ID**: Organization/team ID
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Link project (creates .vercel directory)
   vercel link

   # View project info
   cat .vercel/project.json
   # Copy "orgId" value
   ```

3. **VERCEL_PROJECT_ID**: Project ID
   ```bash
   # From same .vercel/project.json file
   cat .vercel/project.json
   # Copy "projectId" value
   ```

### 2. Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these three secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

**Note**: `GITHUB_TOKEN` is automatically provided by GitHub Actions.

### 3. Configure Codecov (Optional)

For code coverage reporting:

1. Go to https://codecov.io
2. Connect your GitHub repository
3. No additional secrets needed (uses `GITHUB_TOKEN`)

### 4. Verify Setup

Create a test PR to verify workflows:

```bash
# Create test branch
git checkout -b test/ci-cd-setup

# Make a small change
echo "# CI/CD Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify CI/CD workflows"
git push origin test/ci-cd-setup
```

**Expected results**:
- ✅ CI workflow runs (tests, build, lint)
- ✅ Lighthouse CI runs and comments on PR
- ✅ Preview deployment created and linked in PR comment

## Troubleshooting

### Vercel Deployment Fails

**Error**: `Error: No token provided`

**Solution**: Verify `VERCEL_TOKEN` secret is set correctly in GitHub Settings → Secrets.

---

**Error**: `Error: Project not found`

**Solution**:
1. Check `VERCEL_PROJECT_ID` matches your project
2. Verify `VERCEL_ORG_ID` matches your organization
3. Run `vercel link` locally and check `.vercel/project.json`

### Lighthouse CI Fails

**Error**: `Cannot connect to http://localhost:4321`

**Solution**: Lighthouse CI action starts a local server automatically. Check that:
1. Build step succeeds before Lighthouse
2. `package.json` has `preview` script: `astro preview`

### Performance Budget Violations

**Error**: `Performance budget exceeded`

**Solution**:
1. Review Lighthouse report (link in PR comment)
2. Identify large resources
3. Optimize images, scripts, or CSS
4. Re-run checks: `npm run perf:check`

### E2E Tests Fail

**Error**: Playwright browser tests timeout

**Solution**:
1. Check test-results artifacts uploaded to GitHub Actions
2. Review screenshots/videos in artifacts
3. Test locally: `npm run test:e2e`

### Coverage Upload Fails

**Error**: Codecov upload error

**Solution**:
- Add `continue-on-error: true` to Codecov step (already configured)
- Verify repository is connected at codecov.io
- Check coverage files exist: `ls -la coverage/`

## Performance Budgets

The `lighthouse-budget.json` file defines strict performance targets:

### Timing Metrics

| Metric | Budget | Tolerance | Description |
|--------|--------|-----------|-------------|
| Interactive | 2000ms | ±500ms | Time until page is fully interactive |
| First Contentful Paint | 1000ms | ±300ms | Time until first content appears |
| Speed Index | 2000ms | ±500ms | How quickly content is visually displayed |
| Largest Contentful Paint | 2500ms | ±500ms | Time until largest element is visible |
| Cumulative Layout Shift | 0.1 | ±0.05 | Visual stability (lower is better) |
| Total Blocking Time | 200ms | ±100ms | Time page is blocked from user input |

### Resource Budgets

| Resource Type | Budget | Description |
|--------------|--------|-------------|
| Document | 100 KB | HTML file size |
| Script | 50 KB | Total JavaScript |
| Stylesheet | 50 KB | Total CSS |
| Image | 500 KB | Total images |
| Font | 100 KB | Total web fonts |
| **Total** | **1000 KB** | **All resources combined** |

### Resource Counts

| Resource Type | Budget | Description |
|--------------|--------|-------------|
| Scripts | 10 | Maximum script files |
| Stylesheets | 5 | Maximum CSS files |
| Third-party | 5 | Maximum external resources |

### Modifying Budgets

Edit `lighthouse-budget.json` to adjust budgets:

```json
{
  "budgets": [{
    "path": "/*",
    "timings": [
      {
        "metric": "interactive",
        "budget": 2000,
        "tolerance": 500
      }
    ]
  }]
}
```

**Best practice**: Keep budgets strict. Relaxing budgets should be a last resort after exhausting optimization options.

## Best Practices

### 1. PR Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit frequently
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature
```

**What happens automatically**:
1. CI runs tests, type checking, build
2. Lighthouse audits performance
3. Preview deployment created
4. PR comment shows preview URL and Lighthouse scores

### 2. Reviewing PRs

Before approving:
- ✅ All CI checks pass (green checkmarks)
- ✅ Lighthouse scores ≥95 for all metrics
- ✅ Preview deployment works correctly
- ✅ No performance budget violations
- ✅ Code coverage maintained or improved

### 3. Merging to Main

When PR is approved:
```bash
# Squash and merge (recommended)
# Or merge commit
# Or rebase and merge
```

**What happens automatically**:
1. Full CI pipeline runs on main branch
2. Production deployment to Vercel
3. Deployment status updated

### 4. Monitoring Production

After deployment:
- Check Vercel dashboard for deployment status
- Run Lighthouse audit on production URL
- Verify Core Web Vitals in production

### 5. Rolling Back

If production has issues:

**Option 1: Revert commit**
```bash
git revert HEAD
git push origin main
# Automatic redeployment
```

**Option 2: Vercel dashboard**
- Go to project in Vercel
- Navigate to Deployments
- Click "..." on previous good deployment
- Select "Promote to Production"

## Manual Workflows

### Trigger Production Deployment Manually

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to Production" workflow
4. Click "Run workflow"
5. Select branch (usually `main`)
6. Click "Run workflow" button

### Run Lighthouse Locally

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Build project
npm run build

# Start preview server
npm run preview &

# Run Lighthouse
lhci autorun --config=lighthouse-budget.json
```

### Check Performance Budget Locally

```bash
# Build project
npm run build

# Run performance check
npm run perf:check
```

Expected output:
```
✓ Performance budget check passed!
  Total pages: 52
  Average size: 25.3 KB (50.6% of target)
  All pages under 100 KB limit
```

## Maintenance

### Updating GitHub Actions Versions

Review and update action versions quarterly:

```yaml
# Current versions (as of 2025-01)
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
- uses: actions/upload-artifact@v4
- uses: actions/github-script@v7
- uses: amondnet/vercel-action@v25
- uses: treosh/lighthouse-ci-action@v11
- uses: codecov/codecov-action@v3
```

Check for updates: https://github.com/marketplace?type=actions

### Monitoring Workflow Usage

GitHub Actions minutes are limited on free plans:
- View usage: GitHub Settings → Billing → Actions

**Optimization tips**:
- Use `npm ci` instead of `npm install` (faster, uses cache)
- Cache dependencies with `cache: 'npm'`
- Run E2E tests only after unit tests pass
- Limit matrix builds to necessary Node versions

### Security Best Practices

1. **Rotate Vercel tokens annually**
   - Create new token
   - Update `VERCEL_TOKEN` secret
   - Delete old token

2. **Review workflow permissions**
   - Use minimal required permissions
   - Avoid `write` permissions unless necessary

3. **Pin action versions**
   - Use specific versions (`@v4`) not (`@latest`)
   - Review changelogs before updating

4. **Protect secrets**
   - Never log secret values
   - Use `secrets.` prefix in workflows
   - Limit secret access to necessary jobs

## Related Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Development workflow
- [PERFORMANCE.md](PERFORMANCE.md) - Performance optimization guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture overview
- [Vercel Documentation](https://vercel.com/docs) - Deployment platform
- [GitHub Actions Documentation](https://docs.github.com/en/actions) - CI/CD platform
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci) - Performance auditing

## Support

**Issues with CI/CD**:
1. Check workflow logs in GitHub Actions tab
2. Review error messages in PR comments
3. Test locally with same commands as CI
4. Check secrets are configured correctly

**Questions**:
- Open GitHub issue with `ci/cd` label
- Include workflow run URL
- Attach relevant logs

---

**Last Updated**: 2025-01-30
**Platform Version**: 1.0.0
**GitHub Actions**: v4 (checkout, setup-node), v7 (github-script)
