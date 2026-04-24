#!/usr/bin/env bash
set -euo pipefail

FAIL=0
TSC="tsconfig.json"

assert_json() {
  local desc="$1" expr="$2"
  if ! node -e "const c=require('./$TSC'); $expr" 2>/dev/null; then
    echo "FAIL: $desc"
    FAIL=1
  fi
}

assert_json "module should be esnext" \
  "if(c.compilerOptions.module.toLowerCase()!=='esnext') process.exit(1)"

assert_json "moduleResolution should be bundler" \
  "if(c.compilerOptions.moduleResolution.toLowerCase()!=='bundler') process.exit(1)"

assert_json "jsx should be preserve" \
  "if(c.compilerOptions.jsx.toLowerCase()!=='preserve') process.exit(1)"

assert_json "noEmit should be true" \
  "if(c.compilerOptions.noEmit!==true) process.exit(1)"

assert_json "lib should include dom" \
  "const l=(c.compilerOptions.lib||[]).map(s=>s.toLowerCase()); if(!l.includes('dom')) process.exit(1)"

assert_json "lib should include dom.iterable" \
  "const l=(c.compilerOptions.lib||[]).map(s=>s.toLowerCase()); if(!l.includes('dom.iterable')) process.exit(1)"

assert_json "lib should include esnext" \
  "const l=(c.compilerOptions.lib||[]).map(s=>s.toLowerCase()); if(!l.includes('esnext')) process.exit(1)"

assert_json "plugins should include next" \
  "const p=c.compilerOptions.plugins||[]; if(!p.some(x=>x.name==='next')) process.exit(1)"

assert_json "paths @/* should map to ./*" \
  "const p=c.compilerOptions.paths||{}; if(!p['@/*']||!p['@/*'].includes('./*')) process.exit(1)"

assert_json "include should have next-env.d.ts" \
  "if(!c.include.includes('next-env.d.ts')) process.exit(1)"

assert_json "include should have **/*.ts" \
  "if(!c.include.includes('**/*.ts')) process.exit(1)"

assert_json "include should have **/*.tsx" \
  "if(!c.include.includes('**/*.tsx')) process.exit(1)"

assert_json "include should have .next/types/**/*.ts" \
  "if(!c.include.includes('.next/types/**/*.ts')) process.exit(1)"

assert_json "exclude should have node_modules" \
  "if(!c.exclude.includes('node_modules')) process.exit(1)"

assert_json "exclude should have .next" \
  "if(!c.exclude.includes('.next')) process.exit(1)"

assert_json "exclude should have dist" \
  "if(!c.exclude.includes('dist')) process.exit(1)"

assert_json "exclude should have out" \
  "if(!c.exclude.includes('out')) process.exit(1)"

if [ "$FAIL" -ne 0 ]; then
  echo "Some tsconfig checks failed"
  exit 1
fi

echo "All tsconfig checks passed"
