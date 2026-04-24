#!/bin/bash
set -e

echo "Testing delete-src-index-tsx task..."

# Check that src/index.ts does NOT exist
if [ -f src/index.ts ]; then
    echo "✗ src/index.ts still exists (should be deleted)"
    exit 1
fi

echo "✓ src/index.ts has been deleted"

echo "All delete-src-index-tsx checks passed!"