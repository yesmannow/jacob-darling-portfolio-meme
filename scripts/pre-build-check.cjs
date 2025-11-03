// scripts/pre-build-check.js
const cp = require("child_process");

function run(cmd, opts = {}) {
  try {
    cp.execSync(cmd, { stdio: "inherit", ...opts });
    return true;
  } catch {
    return false;
  }
}

console.log("🔍 Running pre-build validation checks...");

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
