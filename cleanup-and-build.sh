#!/bin/bash

# Portfolio Build Cleanup Script
# Run this script before deployment to ensure clean build

echo "🧹 Starting portfolio cleanup and build..."

# Stop dev server if running
echo "Stopping dev server..."
pkill -f "vite" || true

# Clean node_modules and package-lock
echo "Cleaning dependencies..."
rm -rf node_modules package-lock.json

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist .vite

# Run fresh build
echo "Running fresh build..."
npm run build

# Check build results
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Build output in ./dist/"
    echo "🚀 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Portfolio is ready for Vercel deployment!"