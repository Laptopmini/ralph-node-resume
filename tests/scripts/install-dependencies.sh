#!/usr/bin/env bash
set -euo pipefail

FAIL=0
PKG="package.json"

check_dep() {
  local section="$1" name="$2"
  if ! node -e "const p=require('./$PKG'); if(!p['$section']?.['$name']) process.exit(1);" 2>/dev/null; then
    echo "FAIL: $name missing from $section"
    FAIL=1
  fi
}

check_script() {
  local name="$1" expected="$2"
  local actual
  actual=$(node -e "const p=require('./$PKG'); process.stdout.write(p.scripts?.['$name'] || '')" 2>/dev/null)
  if [ "$actual" != "$expected" ]; then
    echo "FAIL: script '$name' expected '$expected', got '$actual'"
    FAIL=1
  fi
}

# Runtime dependencies
check_dep dependencies next
check_dep dependencies react
check_dep dependencies react-dom
check_dep dependencies framer-motion

# Dev dependencies
check_dep devDependencies tailwindcss
check_dep devDependencies "@tailwindcss/postcss"
check_dep devDependencies postcss
check_dep devDependencies "@types/react"
check_dep devDependencies "@types/react-dom"
check_dep devDependencies "@types/node"

# Scripts
check_script dev "next dev"
check_script build "next build"
check_script start "next start"

# Ensure existing scripts are still present
for s in test lint check-types; do
  if ! node -e "const p=require('./$PKG'); if(!p.scripts?.['$s']) process.exit(1);" 2>/dev/null; then
    echo "FAIL: existing script '$s' was removed"
    FAIL=1
  fi
done

# Verify packages are actually installed (node_modules)
for mod in next react react-dom framer-motion; do
  if [ ! -d "node_modules/$mod" ]; then
    echo "FAIL: $mod not found in node_modules"
    FAIL=1
  fi
done

if [ "$FAIL" -ne 0 ]; then
  echo "Some checks failed"
  exit 1
fi

echo "All dependency checks passed"
