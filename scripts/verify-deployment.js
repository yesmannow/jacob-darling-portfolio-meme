#!/usr/bin/env node
/**
 * Deployment verification script
 * Checks deployed site for common issues
 */

import { execSync } from 'child_process';

const deploymentUrl = process.env.DEPLOYMENT_URL || process.argv[2];

if (!deploymentUrl) {
  console.error('❌ Deployment URL required');
  console.error('Usage: node scripts/verify-deployment.js <deployment-url>');
  console.error('Or set DEPLOYMENT_URL environment variable');
  process.exit(1);
}

console.log(`🔍 Verifying deployment at: ${deploymentUrl}\n`);

const checks = {
  'Homepage loads': false,
  'Main script loads': false,
  'Content-Type is text/javascript': false,
  'SPA routing works': false,
};

try {
  // Check 1: Homepage loads
  console.log('1. Checking homepage...');
  const homeResponse = execSync(`curl -s -o /dev/null -w "%{http_code}" ${deploymentUrl}`, { encoding: 'utf-8' });
  if (homeResponse.trim() === '200') {
    checks['Homepage loads'] = true;
    console.log('   ✅ Homepage loads (200 OK)');
  } else {
    console.log(`   ❌ Homepage returned: ${homeResponse.trim()}`);
  }

  // Check 2: Main script exists and has correct Content-Type
  console.log('\n2. Checking main script...');
  const html = execSync(`curl -s ${deploymentUrl}`, { encoding: 'utf-8' });
  const scriptMatch = html.match(/src="([^"]+\.js)"/);

  if (scriptMatch) {
    const scriptUrl = scriptMatch[1].startsWith('http') ? scriptMatch[1] : `${deploymentUrl}${scriptMatch[1]}`;
    console.log(`   Found script: ${scriptUrl}`);

    const scriptHeaders = execSync(`curl -s -I ${scriptUrl}`, { encoding: 'utf-8' });
    const contentType = scriptHeaders.match(/content-type:\s*([^\r\n]+)/i);

    if (contentType) {
      checks['Main script loads'] = true;
      const ct = contentType[1].trim().toLowerCase();
      if (ct.includes('text/javascript') || ct.includes('application/javascript')) {
        checks['Content-Type is text/javascript'] = true;
        console.log(`   ✅ Content-Type: ${ct}`);
      } else {
        console.log(`   ⚠️  Content-Type: ${ct} (expected text/javascript)`);
      }
    }
  } else {
    console.log('   ❌ No script found in HTML');
  }

  // Check 3: SPA routing
  console.log('\n3. Checking SPA routing...');
  const testRoutes = ['/about', '/case-studies', '/contact'];
  for (const route of testRoutes) {
    const routeUrl = `${deploymentUrl}${route}`;
    const routeResponse = execSync(`curl -s -o /dev/null -w "%{http_code}" ${routeUrl}`, { encoding: 'utf-8' });
    if (routeResponse.trim() === '200') {
      console.log(`   ✅ ${route} loads (200 OK)`);
      checks['SPA routing works'] = true;
      break;
    } else if (routeResponse.trim() === '404') {
      console.log(`   ❌ ${route} returns 404 (SPA routing may not be configured)`);
    }
  }

  // Summary
  console.log('\n📊 Verification Summary:');
  console.log('─'.repeat(50));
  Object.entries(checks).forEach(([check, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${check}`);
  });
  console.log('─'.repeat(50));

  const allPassed = Object.values(checks).every(v => v);
  if (allPassed) {
    console.log('\n✅ All checks passed! Deployment looks good.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Review the output above.');
    process.exit(1);
  }

} catch (error) {
  console.error(`\n❌ Verification failed: ${error.message}`);
  console.error('\nNote: This script requires curl. Install it or use browser DevTools for manual verification.');
  process.exit(1);
}

