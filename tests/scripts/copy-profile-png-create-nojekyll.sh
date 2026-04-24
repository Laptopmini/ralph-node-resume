#!/usr/bin/env bash
set -euo pipefail

FAIL=0

# Check public/profile.png exists and is a non-empty file
if [ ! -f "public/profile.png" ]; then
  echo "FAIL: public/profile.png does not exist"
  FAIL=1
elif [ ! -s "public/profile.png" ]; then
  echo "FAIL: public/profile.png is empty"
  FAIL=1
fi

# Check that the source profile.png still exists at repo root
if [ ! -f "profile.png" ]; then
  echo "FAIL: root profile.png is missing"
  FAIL=1
fi

# If both exist, verify they are identical
if [ -f "profile.png" ] && [ -f "public/profile.png" ]; then
  if ! cmp -s "profile.png" "public/profile.png"; then
    echo "FAIL: public/profile.png is not an identical copy of root profile.png"
    FAIL=1
  fi
fi

# Check public/.nojekyll exists
if [ ! -f "public/.nojekyll" ]; then
  echo "FAIL: public/.nojekyll does not exist"
  FAIL=1
fi

if [ "$FAIL" -ne 0 ]; then
  echo "Some checks failed"
  exit 1
fi

echo "All profile.png and .nojekyll checks passed"
