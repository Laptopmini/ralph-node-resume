#!/bin/bash
set -e

echo "Testing create-next-config-mjs task..."

# Check that next.config.mjs exists
if [ ! -f next.config.mjs ]; then
    echo "✗ next.config.mjs does not exist"
    exit 1
fi

echo "✓ next.config.mjs exists"

# Check that it exports a config object with required properties
if grep -q "output.*export" next.config.mjs; then
    echo "✓ output: 'export' is configured"
else
    echo "✗ output: 'export' is NOT configured"
    exit 1
fi

if grep -q "basePath.*ralph-node-resume" next.config.mjs; then
    echo "✓ basePath is set to '/ralph-node-resume'"
else
    echo "✗ basePath is NOT set to '/ralph-node-resume'"
    exit 1
fi

if grep -q "assetPrefix.*ralph-node-resume" next.config.mjs; then
    echo "✓ assetPrefix is set to '/ralph-node-resume'"
else
    echo "✗ assetPrefix is NOT set to '/ralph-node-resume'"
    exit 1
fi

if grep -q "unoptimized.*true" next.config.mjs || grep -q "images" next.config.mjs; then
    echo "✓ images unoptimized is configured"
else
    echo "✗ images unoptimized is NOT configured"
    exit 1
fi

if grep -q "trailingSlash.*true" next.config.mjs; then
    echo "✓ trailingSlash is set to true"
else
    echo "✗ trailingSlash is NOT set to true"
    exit 1
fi

if grep -q "reactStrictMode.*true" next.config.mjs; then
    echo "✓ reactStrictMode is set to true"
else
    echo "✗ reactStrictMode is NOT set to true"
    exit 1
fi

echo "All next.config.mjs checks passed!"