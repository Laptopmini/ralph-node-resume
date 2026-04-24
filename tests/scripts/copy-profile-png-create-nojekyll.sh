#!/bin/bash
set -e

echo "Testing copy-profile-png-create-nojekyll task..."

# Check that public/profile.png exists
if [ ! -f public/profile.png ]; then
    echo "✗ public/profile.png does not exist"
    exit 1
fi

echo "✓ public/profile.png exists"

# Check that public/.nojekyll exists
if [ ! -f public/.nojekyll ]; then
    echo "✗ public/.nojekyll does not exist"
    exit 1
fi

echo "✓ public/.nojekyll exists"

echo "All copy-profile-png-create-nojekyll checks passed!"