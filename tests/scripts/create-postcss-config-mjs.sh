#!/bin/bash
set -e

echo "Testing create-postcss-config-mjs task..."

# Check that postcss.config.mjs exists
if [ ! -f postcss.config.mjs ]; then
    echo "✗ postcss.config.mjs does not exist"
    exit 1
fi

echo "✓ postcss.config.mjs exists"

# Check that it exports plugins with @tailwindcss/postcss
if grep -q "@tailwindcss/postcss" postcss.config.mjs; then
    echo "✓ @tailwindcss/postcss plugin is configured"
else
    echo "✗ @tailwindcss/postcss plugin is NOT configured"
    exit 1
fi

echo "All postcss.config.mjs checks passed!"