#!/usr/bin/env node
/**
 * Pre-build validation script
 * Runs MCP tools to validate build configuration before building
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const tools = [
  { name: 'asset-checker', script: './mcp-tools/asset-checker.js' },
  { name: 'config-validator', script: './mcp-tools/config-validator.js' },
  { name: 'deps-checker', script: './mcp-tools/deps-checker.js' }
];

console.log('🔍 Running pre-build validation checks...\n');

let hasErrors = false;
const results = {};

for (const tool of tools) {
  try {
    console.log(`Running ${tool.name}...`);
    const output = execSync(`node ${tool.script}`, { encoding: 'utf-8', stdio: 'pipe' });
    const result = JSON.parse(output);
    results[tool.name] = result;
    
    // For asset-checker, missing dist is OK before first build
    if (tool.name === 'asset-checker' && result.errors && 
        result.errors.some(e => e.includes('directory not found'))) {
      console.log(`⚠️  ${tool.name}: Build output not found (expected before first build)\n`);
      continue;
    }
    
    if (result.status === 'OK') {
      console.log(`✅ ${tool.name}: ${result.message}\n`);
    } else {
      console.log(`❌ ${tool.name}: ${result.message}`);
      if (result.issues && result.issues.length > 0) {
        result.issues.forEach(issue => console.log(`   - ${issue}`));
      }
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach(error => console.log(`   - Error: ${error}`));
      }
      console.log('');
      hasErrors = true;
    }
  } catch (error) {
    console.error(`❌ ${tool.name}: Failed to run`);
    console.error(`   Error: ${error.message}\n`);
    hasErrors = true;
    results[tool.name] = { status: 'ERROR', message: error.message };
  }
}

if (hasErrors) {
  console.error('❌ Pre-build validation failed. Please fix the issues above before building.');
  process.exit(1);
} else {
  console.log('✅ All pre-build checks passed!');
  process.exit(0);
}

