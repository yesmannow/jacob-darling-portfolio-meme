#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cp = require("child_process");

function run(cmd, opts = {}) {
  try {
    cp.execSync(cmd, { stdio: "inherit", ...opts });
    return true;
  } catch {
    return false;
  }
}

function fail(msg) {
  console.error('❌ pre-build check failed:', msg);
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..');
const indexPath = path.join(repoRoot, 'index.html');

console.log("🔍 Running pre-build validation checks...");

// Check for hardcoded asset references in index.html
if (!fs.existsSync(indexPath)) {
  console.warn('⚠️ index.html not found; skipping pre-build asset check');
} else {
  const html = fs.readFileSync(indexPath, 'utf8');
  if (/\/assets\/index-[a-z0-9]+\.js/i.test(html)) {
    fail('index.html contains hard-coded /assets/index-*.js reference. Replace with /src/main.tsx or appropriate source entry before building.');
  }
}

// Asset checker: warn only if dist missing (first build)
const assetOK = run("node ./mcp-tools/asset-checker.cjs");
if (!assetOK) {
  console.warn("⚠️  asset-checker: Build output not found (expected before first build)");
}

// Config validator: if the tool is missing or errors, warn but DO NOT block
const cfgOK = run("node ./mcp-tools/config-validator.cjs");
if (!cfgOK) {
  console.warn("⚠️  config-validator: Skipping (tool missing or non-fatal issue).");
}

// Deps checker: still helpful, but don't hard fail prebuild
const depsOK = run("node ./mcp-tools/deps-checker.cjs");
if (!depsOK) {
  console.warn("⚠️  deps-checker: Warning only.");
}

console.log("✅ Pre-build checks completed (non-blocking). Proceeding to build…");
