#!/usr/bin/env node
/**
 * Post-build verification script
 * Validates build output after building
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';

console.log('🔍 Running post-build verification...\n');

const distAssets = 'dist/assets';

// Run asset-checker
try {
  console.log('Running asset-checker...');
  const output = execSync('node ./mcp-tools/asset-checker.js', { encoding: 'utf-8', stdio: 'pipe' });
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

try {
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

  console.log(`\n✅ Build output verification passed!`);
} catch (error) {
  console.error(`❌ Error verifying build output: ${error.message}`);
  process.exit(1);
}

