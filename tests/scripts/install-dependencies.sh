#!/bin/bash
set -e

echo "Testing install-dependencies task..."

# Check that next is installed
if npm list next > /dev/null 2>&1; then
    echo "✓ next is installed"
else
    echo "✗ next is NOT installed"
    exit 1
fi

# Check that react is installed
if npm list react > /dev/null 2>&1; then
    echo "✓ react is installed"
else
    echo "✗ react is NOT installed"
    exit 1
fi

# Check that react-dom is installed
if npm list react-dom > /dev/null 2>&1; then
    echo "✓ react-dom is installed"
else
    echo "✗ react-dom is NOT installed"
    exit 1
fi

# Check that framer-motion is installed
if npm list framer-motion > /dev/null 2>&1; then
    echo "✓ framer-motion is installed"
else
    echo "✗ framer-motion is NOT installed"
    exit 1
fi

# Check that tailwindcss is installed
if npm list tailwindcss > /dev/null 2>&1; then
    echo "✓ tailwindcss is installed"
else
    echo "✗ tailwindcss is NOT installed"
    exit 1
fi

# Check that @tailwindcss/postcss is installed
if npm list @tailwindcss/postcss > /dev/null 2>&1; then
    echo "✓ @tailwindcss/postcss is installed"
else
    echo "✗ @tailwindcss/postcss is NOT installed"
    exit 1
fi

# Check that postcss is installed
if npm list postcss > /dev/null 2>&1; then
    echo "✓ postcss is installed"
else
    echo "✗ postcss is NOT installed"
    exit 1
fi

# Check that @types/react is installed
if npm list @types/react > /dev/null 2>&1; then
    echo "✓ @types/react is installed"
else
    echo "✗ @types/react is NOT installed"
    exit 1
fi

# Check that @types/react-dom is installed
if npm list @types/react-dom > /dev/null 2>&1; then
    echo "✓ @types/react-dom is installed"
else
    echo "✗ @types/react-dom is NOT installed"
    exit 1
fi

# Check that @types/node is installed
if npm list @types/node > /dev/null 2>&1; then
    echo "✓ @types/node is installed"
else
    echo "✗ @types/node is NOT installed"
    exit 1
fi

# Check that package.json has the required scripts
echo "Checking package.json scripts..."

if grep -q '"dev": "next dev"' package.json; then
    echo "✓ dev script is present"
else
    echo "✗ dev script is NOT present"
    exit 1
fi

if grep -q '"build": "next build"' package.json; then
    echo "✓ build script is present"
else
    echo "✗ build script is NOT present"
    exit 1
fi

if grep -q '"start": "next start"' package.json; then
    echo "✓ start script is present"
else
    echo "✗ start script is NOT present"
    exit 1
fi

echo "All install-dependencies checks passed!"