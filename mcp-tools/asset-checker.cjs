// mcp-tools/asset-checker.js
const fs = require("fs");
const path = require("path");

const buildDir = process.env.BUILD_DIR || "dist";
const root = process.cwd();
const dir = path.join(root, buildDir);

if (!fs.existsSync(dir)) {
  console.log(JSON.stringify({ status: "WARN", message: "dist not found (first build ok)" }));
  process.exit(0);
}

function walk(p) {
  return fs.readdirSync(p).flatMap((f) => {
    const full = path.join(p, f);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(dir);
const invalid = files.filter(f => /\.(tsx|jsx|ts)$/.test(f) && !/\.d\.ts$/.test(f));

if (invalid.length) {
  console.log(JSON.stringify({ status: "FAIL", invalid }));
  // still don't block prebuild; just print
  process.exit(0);
}

console.log(JSON.stringify({ status: "OK", message: "No invalid extensions" }));
