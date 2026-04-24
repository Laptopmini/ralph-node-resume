#!/bin/bash
set -e

DEPLOY_YML=".github/workflows/deploy.yml"

if [ ! -f "$DEPLOY_YML" ]; then
  echo "FAIL: $DEPLOY_YML does not exist"
  exit 1
fi

if ! grep -q "name: Deploy to GitHub Pages" "$DEPLOY_YML"; then
  echo "FAIL: missing workflow name"
  exit 1
fi

if ! grep -q "on:" "$DEPLOY_YML"; then
  echo "FAIL: missing trigger configuration"
  exit 1
fi

if ! grep -q "push:" "$DEPLOY_YML" || ! grep -q "branches:" "$DEPLOY_YML" || ! grep -q "\[main\]" "$DEPLOY_YML"; then
  echo "FAIL: missing push trigger for main branch"
  exit 1
fi

if ! grep -q "workflow_dispatch:" "$DEPLOY_YML"; then
  echo "FAIL: missing workflow_dispatch trigger"
  exit 1
fi

if ! grep -q "permissions:" "$DEPLOY_YML"; then
  echo "FAIL: missing permissions configuration"
  exit 1
fi

if ! grep -q "contents: read" "$DEPLOY_YML"; then
  echo "FAIL: missing contents: read permission"
  exit 1
fi

if ! grep -q "pages: write" "$DEPLOY_YML"; then
  echo "FAIL: missing pages: write permission"
  exit 1
fi

if ! grep -q "id-token: write" "$DEPLOY_YML"; then
  echo "FAIL: missing id-token: write permission"
  exit 1
fi

if ! grep -q "concurrency:" "$DEPLOY_YML"; then
  echo "FAIL: missing concurrency configuration"
  exit 1
fi

if ! grep -q "group: \"pages\"" "$DEPLOY_YML" && ! grep -q "group: 'pages'" "$DEPLOY_YML"; then
  echo "FAIL: missing pages concurrency group"
  exit 1
fi

if ! grep -q "cancel-in-progress: false" "$DEPLOY_YML"; then
  echo "FAIL: missing cancel-in-progress: false"
  exit 1
fi

if ! grep -q "jobs:" "$DEPLOY_YML"; then
  echo "FAIL: missing jobs configuration"
  exit 1
fi

if ! grep -q "build:" "$DEPLOY_YML"; then
  echo "FAIL: missing build job"
  exit 1
fi

if ! grep -q "runs-on: ubuntu-latest" "$DEPLOY_YML"; then
  echo "FAIL: missing runs-on: ubuntu-latest for build job"
  exit 1
fi

if ! grep -q "actions/checkout@v4" "$DEPLOY_YML"; then
  echo "FAIL: missing actions/checkout@v4 step"
  exit 1
fi

if ! grep -q "actions/setup-node@v4" "$DEPLOY_YML"; then
  echo "FAIL: missing actions/setup-node@v4 step"
  exit 1
fi

if ! grep -q "node-version-file: .nvmrc" "$DEPLOY_YML"; then
  echo "FAIL: missing node-version-file: .nvmrc"
  exit 1
fi

if ! grep -q "cache: npm" "$DEPLOY_YML"; then
  echo "FAIL: missing cache: npm"
  exit 1
fi

if ! grep -q "actions/configure-pages@v5" "$DEPLOY_YML"; then
  echo "FAIL: missing actions/configure-pages@v5 step"
  exit 1
fi

if ! grep -q "npm ci" "$DEPLOY_YML"; then
  echo "FAIL: missing npm ci step"
  exit 1
fi

if ! grep -q "npm run build" "$DEPLOY_YML"; then
  echo "FAIL: missing npm run build step"
  exit 1
fi

if ! grep -q "actions/upload-pages-artifact@v3" "$DEPLOY_YML"; then
  echo "FAIL: missing actions/upload-pages-artifact@v3 step"
  exit 1
fi

if ! grep -q "path: ./out" "$DEPLOY_YML"; then
  echo "FAIL: missing path: ./out for upload-pages-artifact"
  exit 1
fi

if ! grep -q "deploy:" "$DEPLOY_YML"; then
  echo "FAIL: missing deploy job"
  exit 1
fi

if ! grep -q "needs: build" "$DEPLOY_YML"; then
  echo "FAIL: missing needs: build for deploy job"
  exit 1
fi

if ! grep -q "environment:" "$DEPLOY_YML" || ! grep -q "name: github-pages" "$DEPLOY_YML"; then
  echo "FAIL: missing environment configuration for deploy job"
  exit 1
fi

if ! grep -q "url: \${{ steps.deployment.outputs.page_url }}" "$DEPLOY_YML"; then
  echo "FAIL: missing page_url output reference"
  exit 1
fi

if ! grep -q "actions/deploy-pages@v4" "$DEPLOY_YML"; then
  echo "FAIL: missing actions/deploy-pages@v4 step"
  exit 1
fi

if ! grep -q "id: deployment" "$DEPLOY_YML"; then
  echo "FAIL: missing id: deployment for deploy-pages step"
  exit 1
fi

echo "PASS: deploy.yml is correctly configured"
exit 0
