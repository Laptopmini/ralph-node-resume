#!/usr/bin/env bash
set -euo pipefail

FAIL=0

if [ ! -f ".gitignore" ]; then
  echo "FAIL: .gitignore does not exist"
  exit 1
fi

for entry in ".next/" "out/" "next-env.d.ts"; do
  if ! grep -qF "$entry" .gitignore; then
    echo "FAIL: '$entry' not found in .gitignore"
    FAIL=1
  fi
done

if [ "$FAIL" -ne 0 ]; then
  echo "Some .gitignore checks failed"
  exit 1
fi

echo "All .gitignore checks passed"
