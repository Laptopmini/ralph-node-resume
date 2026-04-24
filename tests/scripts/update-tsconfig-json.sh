#!/bin/bash
set -e

echo "Testing update-tsconfig-json task..."

# Check that tsconfig.json exists
if [ ! -f tsconfig.json ]; then
    echo "✗ tsconfig.json does not exist"
    exit 1
fi

echo "✓ tsconfig.json exists"

# Check for required Next.js settings
if grep -q '"module": "esnext"' tsconfig.json; then
    echo "✓ module is set to esnext"
else
    echo "✗ module is NOT set to esnext"
    exit 1
fi

if grep -q '"moduleResolution": "bundler"' tsconfig.json; then
    echo "✓ moduleResolution is set to bundler"
else
    echo "✗ moduleResolution is NOT set to bundler"
    exit 1
fi

if grep -q '"jsx": "preserve"' tsconfig.json; then
    echo "✓ jsx is set to preserve"
else
    echo "✗ jsx is NOT set to preserve"
    exit 1
fi

if grep -q '"noEmit": true' tsconfig.json; then
    echo "✓ noEmit is set to true"
else
    echo "✗ noEmit is NOT set to true"
    exit 1
fi

if grep -q '"dom"' tsconfig.json && grep -q '"dom.iterable"' tsconfig.json && grep -q '"esnext"' tsconfig.json; then
    echo "✓ lib includes dom, dom.iterable, and esnext"
else
    echo "✗ lib does NOT include required values"
    exit 1
fi

if grep -q '"name": "next"' tsconfig.json; then
    echo "✓ Next.js plugin is configured"
else
    echo "✗ Next.js plugin is NOT configured"
    exit 1
fi

if grep -q '"@/\*"' tsconfig.json; then
    echo "✓ paths alias @/* is configured"
else
    echo "✗ paths alias @/* is NOT configured"
    exit 1
fi

if grep -q '"next-env.d.ts"' tsconfig.json && grep -q '".next/types/\*\*/\*.ts"' tsconfig.json; then
    echo "✓ include contains next-env.d.ts and .next/types/**/*.ts"
else
    echo "✗ include does NOT contain required file patterns"
    exit 1
fi

if grep -q '"node_modules"' tsconfig.json && grep -q '".next"' tsconfig.json && grep -q '"dist"' tsconfig.json && grep -q '"out"' tsconfig.json; then
    echo "✓ exclude contains node_modules, .next, dist, out"
else
    echo "✗ exclude does NOT contain all required values"
    exit 1
fi

echo "All tsconfig.json checks passed!"