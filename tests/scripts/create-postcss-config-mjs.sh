#!/usr/bin/env bash
set -euo pipefail

FAIL=0
FILE="postcss.config.mjs"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist"
  exit 1
fi

# Verify it references @tailwindcss/postcss
if ! grep -qF "@tailwindcss/postcss" "$FILE"; then
  echo "FAIL: $FILE does not reference @tailwindcss/postcss"
  FAIL=1
fi

# Verify it's valid JS that exports plugins with @tailwindcss/postcss
node -e "
import('$PWD/$FILE').then(m => {
  const c = m.default;
  if (!c.plugins || !('@tailwindcss/postcss' in c.plugins)) process.exit(1);
}).catch(() => process.exit(1));
" 2>/dev/null || {
  echo "FAIL: $FILE does not export correct config"
  FAIL=1
}

if [ "$FAIL" -ne 0 ]; then
  echo "Some postcss.config.mjs checks failed"
  exit 1
fi

echo "All postcss.config.mjs checks passed"
