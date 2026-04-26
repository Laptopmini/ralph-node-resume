#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "public/profile.png exists" test -f "./public/profile.png"
assert "public/.nojekyll exists" test -f "./public/.nojekyll"

# Verify profile.png is a valid PNG (starts with PNG magic bytes)
assert_png() {
  local desc="$1" file="$2"
  if [ ! -f "$file" ]; then
    _fail "$desc (file not found)"
    return 0
  fi
  if file "$file" | grep -qi "png"; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

assert_png "public/profile.png is a PNG image" "./public/profile.png"

report_results
