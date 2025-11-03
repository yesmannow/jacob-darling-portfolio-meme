#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const report = {
  timestamp: new Date().toISOString(),
  files: {},
  issues: [],
  status: 'OK'
};

function validateViteConfig(filePath) {
  const file = { path: filePath, exists: false, issues: [] };

  if (!existsSync(filePath)) {
    file.exists = false;
    file.issues.push('File not found');
    report.issues.push(`vite.config.js not found at ${filePath}`);
    return file;
  }

  file.exists = true;
  try {
    const content = readFileSync(filePath, 'utf-8');

    // Check for rollupOptions
    if (!content.includes('rollupOptions')) {
      file.issues.push('Missing rollupOptions configuration');
      report.issues.push('vite.config.js: Missing rollupOptions');
    } else {
      // Check entryFileNames pattern
      const entryFileNamesMatch = content.match(/entryFileNames\s*:\s*["']([^"']+)["']/);
      if (entryFileNamesMatch) {
        const pattern = entryFileNamesMatch[1];
        if (pattern.includes('.tsx') && !pattern.endsWith('.js')) {
          file.issues.push(`entryFileNames may output .tsx files: ${pattern}`);
          report.issues.push(`vite.config.js: entryFileNames pattern should end with .js, found: ${pattern}`);
        }
      }
    }

    // Check for build output directory
    if (!content.includes('build')) {
      file.issues.push('Missing build configuration');
    }
  } catch (error) {
    file.issues.push(`Error reading file: ${error.message}`);
    report.issues.push(`vite.config.js: ${error.message}`);
  }

  return file;
}

function validateTsConfig(filePath) {
  const file = { path: filePath, exists: false, issues: [] };

  if (!existsSync(filePath)) {
    file.exists = false;
    file.issues.push('File not found');
    report.issues.push(`tsconfig.json not found at ${filePath}`);
    return file;
  }

  file.exists = true;
  try {
    const config = JSON.parse(readFileSync(filePath, 'utf-8'));
    const compilerOptions = config.compilerOptions || {};

    // Check jsx setting
    if (compilerOptions.jsx !== 'react-jsx') {
      file.issues.push(`jsx should be "react-jsx", found: ${compilerOptions.jsx || 'not set'}`);
      report.issues.push(`tsconfig.json: jsx should be "react-jsx"`);
    }

    // Check moduleResolution
    if (compilerOptions.moduleResolution !== 'Node' && compilerOptions.moduleResolution !== 'node') {
      file.issues.push(`moduleResolution should be "node", found: ${compilerOptions.moduleResolution || 'not set'}`);
      report.issues.push(`tsconfig.json: moduleResolution should be "node"`);
    }

    // Check typeRoots
    const typeRoots = compilerOptions.typeRoots || [];
    const hasNodeModules = typeRoots.some(root =>
      root.includes('node_modules') || root === './node_modules/@types' || root === 'node_modules'
    );
    if (!hasNodeModules && typeRoots.length > 0) {
      file.issues.push('typeRoots should include node_modules');
      report.issues.push('tsconfig.json: typeRoots should include node_modules');
    } else if (typeRoots.length === 0 && !compilerOptions.types) {
      // If no typeRoots specified, it defaults to node_modules/@types, so this is OK
    }
  } catch (error) {
    file.issues.push(`Error parsing JSON: ${error.message}`);
    report.issues.push(`tsconfig.json: ${error.message}`);
  }

  return file;
}

function validateDeployConfig(filePath, type) {
  const file = { path: filePath, exists: false, type, issues: [] };

  if (!existsSync(filePath)) {
    file.exists = false;
    // Not an error if deploy config doesn't exist
    return file;
  }

  file.exists = true;
  try {
    const content = readFileSync(filePath, 'utf-8');

    if (type === 'netlify') {
      // Check for publish directory
      if (!content.includes('publish') && !content.includes('dist')) {
        file.issues.push('No publish directory specified (should be dist)');
        report.issues.push(`netlify.toml: Should specify publish = "dist"`);
      }
      
      // Check for SPA redirect (/* → /index.html)
      const hasSpaRedirect = content.includes('[[redirects]]') && 
        (content.includes('from = "/*"') || content.includes('from = \'/*\'')) &&
        (content.includes('to = "/index.html"') || content.includes('to = \'/index.html\''));
      
      if (!hasSpaRedirect) {
        file.issues.push('Missing SPA redirect: /* → /index.html');
        report.issues.push(`netlify.toml: Should include SPA redirect for client-side routing`);
      }
      
      // Check for Content-Type header for .js files
      if (!content.includes('Content-Type') || !content.includes('text/javascript')) {
        file.issues.push('Missing Content-Type: text/javascript header for .js files');
        report.issues.push(`netlify.toml: Should set Content-Type: text/javascript for .js files`);
      }
    } else if (type === 'vercel') {
      const config = JSON.parse(content);
      if (config.outputDirectory !== 'dist') {
        file.issues.push(`outputDirectory should be "dist", found: ${config.outputDirectory || 'not set'}`);
        report.issues.push(`vercel.json: outputDirectory should be "dist"`);
      }
      if (config.buildCommand !== 'npm run build' && !config.buildCommand) {
        file.issues.push('buildCommand should be "npm run build"');
      }
      
      // Check for SPA rewrites
      const hasSpaRewrite = config.rewrites && 
        config.rewrites.some(r => r.source === '/(.*)' && r.destination === '/index.html');
      
      if (!hasSpaRewrite) {
        file.issues.push('Missing SPA rewrite: /* → /index.html');
        report.issues.push(`vercel.json: Should include SPA rewrite for client-side routing`);
      }
      
      // Check for Content-Type headers
      const hasJsContentType = config.headers && 
        config.headers.some(h => 
          h.source && h.source.includes('.js') && 
          h.headers && h.headers.some(header => 
            header.key === 'Content-Type' && header.value === 'text/javascript'
          )
        );
      
      if (!hasJsContentType) {
        file.issues.push('Missing Content-Type: text/javascript header for .js files');
        report.issues.push(`vercel.json: Should set Content-Type: text/javascript for .js files`);
      }
    }
  } catch (error) {
    file.issues.push(`Error reading file: ${error.message}`);
    report.issues.push(`${filePath}: ${error.message}`);
  }

  return file;
}

function main() {
  // Validate vite.config.js
  report.files['vite.config.js'] = validateViteConfig('vite.config.js');

  // Validate tsconfig.json
  report.files['tsconfig.json'] = validateTsConfig('tsconfig.json');

  // Validate tsconfig.app.json (if it exists)
  if (existsSync('tsconfig.app.json')) {
    report.files['tsconfig.app.json'] = validateTsConfig('tsconfig.app.json');
  }

  // Validate deploy configs
  report.files['netlify.toml'] = validateDeployConfig('netlify.toml', 'netlify');
  report.files['vercel.json'] = validateDeployConfig('vercel.json', 'vercel');

  if (report.issues.length > 0) {
    report.status = 'ISSUES_FOUND';
    report.message = `Found ${report.issues.length} configuration issue(s)`;
  } else {
    report.message = 'All configuration files are valid';
  }

  console.log(JSON.stringify(report, null, 2));
  process.exit(report.issues.length > 0 ? 1 : 0);
}

main();

