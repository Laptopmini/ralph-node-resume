#!/bin/bash
set -e

WORKFLOW=".github/workflows/deploy.yml"
ERRORS=0

if [ ! -f "$WORKFLOW" ]; then
  echo "FAIL: $WORKFLOW does not exist"
  exit 1
fi

if ! grep -q "name: Deploy to GitHub Pages" "$WORKFLOW"; then
  echo "FAIL: missing 'name: Deploy to GitHub Pages'"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "on:$" "$WORKFLOW" || ! grep -qE "push:$" "$WORKFLOW" || ! grep -qE "branches: \[main\]" "$WORKFLOW" || ! grep -qE "workflow_dispatch:" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect trigger 'on: { push: { branches: [main] }, workflow_dispatch: {} }'"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "permissions:$" "$WORKFLOW" || ! grep -qE "contents: read" "$WORKFLOW" || ! grep -qE "pages: write" "$WORKFLOW" || ! grep -qE "id-token: write" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect top-level permissions"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "concurrency:$" "$WORKFLOW" || ! grep -qE "group: pages" "$WORKFLOW" || ! grep -qE "cancel-in-progress: false" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect concurrency"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "build:" "$WORKFLOW" || ! grep -qE "ubuntu-latest" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "actions/checkout@v4" "$WORKFLOW"; then
  echo "FAIL: missing actions/checkout@v4 in build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "actions/setup-node@v4" "$WORKFLOW" || ! grep -qE "node-version-file: .nvmrc" "$WORKFLOW" || ! grep -qE "cache: npm" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect actions/setup-node@v4 in build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "actions/configure-pages@v5" "$WORKFLOW"; then
  echo "FAIL: missing actions/configure-pages@v5 in build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "npm ci" "$WORKFLOW"; then
  echo "FAIL: missing 'npm ci' in build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "npm run build" "$WORKFLOW"; then
  echo "FAIL: missing 'npm run build' in build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "actions/upload-pages-artifact@v3" "$WORKFLOW" || ! grep -qE "path: ./out" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect actions/upload-pages-artifact@v3 in build job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "deploy:" "$WORKFLOW" || ! grep -qE "needs: build" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect deploy job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "environment:$" "$WORKFLOW" || ! grep -qE "name: github-pages" "$WORKFLOW" || ! grep -qE "url: \${{ steps.deployment.outputs.page_url }}" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect environment in deploy job"
  ERRORS=$((ERRORS + 1))
fi

if ! grep -qE "actions/deploy-pages@v4" "$WORKFLOW" || ! grep -qE "id: deployment" "$WORKFLOW"; then
  echo "FAIL: missing or incorrect actions/deploy-pages@v4 in deploy job"
  ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -gt 0 ]; then
  echo "Validation failed with $ERRORS error(s)"
  exit 1
fi

echo "PASS: $WORKFLOW contains all required configuration"
exit 0
