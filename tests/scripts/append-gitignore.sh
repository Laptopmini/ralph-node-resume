#!/bin/bash
set -e

echo "Testing append-gitignore task..."

# Check that .gitignore exists
if [ ! -f .gitignore ]; then
    echo "✗ .gitignore does not exist"
    exit 1
fi

echo "✓ .gitignore exists"

# Check for .next/
if grep -q '.next/' .gitignore; then
    echo "✓ .next/ is in .gitignore"
else
    echo "✗ .next/ is NOT in .gitignore"
    exit 1
fi

# Check for out/
if grep -q 'out/' .gitignore; then
    echo "✓ out/ is in .gitignore"
else
    echo "✗ out/ is NOT in .gitignore"
    exit 1
fi

# Check for next-env.d.ts
if grep -q 'next-env.d.ts' .gitignore; then
    echo "✓ next-env.d.ts is in .gitignore"
else
    echo "✗ next-env.d.ts is NOT in .gitignore"
    exit 1
fi

echo "All .gitignore checks passed!"