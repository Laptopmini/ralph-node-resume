#!/usr/bin/env bash
set -euo pipefail

FAIL=0
FILE="next.config.mjs"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist"
  exit 1
fi

assert_contains() {
  local desc="$1" pattern="$2"
  if ! grep -qE "$pattern" "$FILE"; then
    echo "FAIL: $desc"
    FAIL=1
  fi
}

assert_contains "output: 'export'" "output.*['\"]export['\"]"
assert_contains "basePath: '/ralph-node-resume'" "basePath.*['\"/]ralph-node-resume['\"]"
assert_contains "assetPrefix: '/ralph-node-resume'" "assetPrefix.*['\"/]ralph-node-resume['\"]"
assert_contains "images.unoptimized: true" "unoptimized.*true"
assert_contains "trailingSlash: true" "trailingSlash.*true"
assert_contains "reactStrictMode: true" "reactStrictMode.*true"

# Verify it's valid JS that exports a config
node -e "import('$PWD/$FILE').then(m => { const c = m.default; if(!c.output || !c.basePath) process.exit(1) })" 2>/dev/null || {
  echo "FAIL: $FILE does not export a valid config"
  FAIL=1
}

if [ "$FAIL" -ne 0 ]; then
  echo "Some next.config.mjs checks failed"
  exit 1
fi

echo "All next.config.mjs checks passed"
