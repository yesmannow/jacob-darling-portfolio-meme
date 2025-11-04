#!/usr/bin/env node
/**
 * Post-build verification script
 * Validates build output after building
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync, statSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';

console.log('🔍 Running post-build verification...\n');

const distAssets = 'dist/assets';

// Run asset-checker
try {
  console.log('Running asset-checker...');
  const output = execSync('node ./mcp-tools/asset-checker.cjs', { encoding: 'utf-8', stdio: 'pipe' });
  const result = JSON.parse(output);

  if (result.status === 'OK') {
    console.log(`✅ Asset checker: ${result.message}`);
  } else {
    console.error(`❌ Asset checker: ${result.message}`);
    if (result.invalidFilesFound && result.invalidFilesFound.length > 0) {
      console.error('Invalid files found:');
      result.invalidFilesFound.forEach(file => console.error(`   - ${file}`));
    }
    process.exit(1);
  }
} catch (error) {
  console.error(`❌ Asset checker failed: ${error.message}`);
  process.exit(1);
}

// Verify dist/assets structure
if (!existsSync(distAssets)) {
  console.error(`❌ Build output directory not found: ${distAssets}`);
  process.exit(1);
}

// Check index.html references hashed JS
const html = readFileSync(join(distAssets, '../index.html'), 'utf-8');
if (!html.includes('/assets/index-') || html.includes('/src/main.tsx')) {
  console.error('❌ index.html references invalid entry point');
  process.exit(1);
}

try {
  // Check asset sizes and build output
  const files = await readdir(distAssets);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  const cssFiles = files.filter(f => f.endsWith('.css'));
  const invalidFiles = files.filter(f =>
    (f.endsWith('.tsx') || f.endsWith('.jsx') || (f.endsWith('.ts') && !f.endsWith('.d.ts')))
  );

  console.log(`\n📦 Build output summary:`);
  console.log(`   - JavaScript files: ${jsFiles.length}`);
  console.log(`   - CSS files: ${cssFiles.length}`);

  if (invalidFiles.length > 0) {
    console.error(`\n❌ Invalid files in build output:`);
    invalidFiles.forEach(file => console.error(`   - ${file}`));
    process.exit(1);
  }

  if (jsFiles.length === 0) {
    console.warn(`⚠️  Warning: No JavaScript files found in build output`);
  }

  // Calculate file sizes for deploy.json
  let jsSizeKB = 0;
  let cssSizeKB = 0;
  
  if (jsFiles.length > 0) {
    const jsFile = jsFiles[0];
    const jsStats = statSync(join(distAssets, jsFile));
    jsSizeKB = jsStats.size / 1024;
    console.log(`✅ JS bundle size: ${jsSizeKB.toFixed(2)} KB`);
  }
  
  if (cssFiles.length > 0) {
    const cssFile = cssFiles[0];
    const cssStats = statSync(join(distAssets, cssFile));
    cssSizeKB = cssStats.size / 1024;
    console.log(`✅ CSS bundle size: ${cssSizeKB.toFixed(2)} KB`);
  }

  console.log('✅ Build output verification passed!');

  // Write deploy.json with build metrics
  const distPath = 'dist';
  const deployData = {
    timestamp: new Date().toISOString(),
    jsSizeKB: jsSizeKB.toFixed(2),
    cssSizeKB: cssSizeKB.toFixed(2),
    status: "Healthy"
  };

  writeFileSync(
    join(distPath, 'deploy.json'),
    JSON.stringify(deployData, null, 2)
  );
  console.log("✅ deploy.json written");
} catch (error) {
  console.error(`❌ Error verifying build output: ${error.message}`);
  process.exit(1);
}

