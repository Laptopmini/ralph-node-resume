#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

TSC="./tsconfig.json"

assert "tsconfig.json exists" test -f "$TSC"

# Use node to parse JSON and check fields
assert_node() {
  local desc="$1" expr="$2"
  if node -e "const _=JSON.parse(require('fs').readFileSync('$TSC','utf8')); if(!($expr)) process.exit(1);" 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

assert_node "module is esnext" "_.compilerOptions.module.toLowerCase() === 'esnext'"
assert_node "moduleResolution is bundler" "_.compilerOptions.moduleResolution.toLowerCase() === 'bundler'"
assert_node "jsx is preserve" "_.compilerOptions.jsx === 'preserve'"
assert_node "noEmit is true" "_.compilerOptions.noEmit === true"
assert_node "lib includes dom" "_.compilerOptions.lib && _.compilerOptions.lib.map(l=>l.toLowerCase()).includes('dom')"
assert_node "lib includes dom.iterable" "_.compilerOptions.lib && _.compilerOptions.lib.map(l=>l.toLowerCase()).includes('dom.iterable')"
assert_node "lib includes esnext" "_.compilerOptions.lib && _.compilerOptions.lib.map(l=>l.toLowerCase()).includes('esnext')"
assert_node "plugins includes next" "_.compilerOptions.plugins && _.compilerOptions.plugins.some(p => p.name === 'next')"
assert_node "paths @/* defined" "_.compilerOptions.paths && _.compilerOptions.paths['@/*'] && _.compilerOptions.paths['@/*'].includes('./*')"
assert_node "include has next-env.d.ts" "_.include && _.include.includes('next-env.d.ts')"
assert_node "include has **/*.ts" "_.include && _.include.includes('**/*.ts')"
assert_node "include has **/*.tsx" "_.include && _.include.includes('**/*.tsx')"
assert_node "include has .next/types/**/*.ts" "_.include && _.include.includes('.next/types/**/*.ts')"
assert_node "exclude has node_modules" "_.exclude && _.exclude.includes('node_modules')"
assert_node "exclude has .next" "_.exclude && _.exclude.includes('.next')"
assert_node "exclude has dist" "_.exclude && _.exclude.includes('dist')"
assert_node "exclude has out" "_.exclude && _.exclude.includes('out')"

report_results
