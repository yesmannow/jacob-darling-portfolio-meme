// mcp-tools/config-validator.js
const fs = require("fs");

function safeRead(p) { try { return fs.readFileSync(p, "utf8"); } catch { return null; } }

const ts = safeRead("tsconfig.json");
const toml = safeRead("netlify.toml");
const vercel = safeRead("vercel.json");

const report = { status: "OK", issues: [] };

if (ts) {
  try {
    const j = JSON.parse(ts);
    const co = j.compilerOptions || {};
    if (co.jsx !== "react-jsx") report.issues.push('tsconfig: compilerOptions.jsx should be "react-jsx"');
    if (!["node","Node","NodeNext","node16"].includes(String(co.moduleResolution || "").toLowerCase()))
      report.issues.push('tsconfig: compilerOptions.moduleResolution should be "node" (or NodeNext)');
    if (!Array.isArray(co.types) || !co.types.includes("vite/client"))
      report.issues.push('tsconfig: compilerOptions.types should include "vite/client"');
  } catch {
    report.issues.push("tsconfig: JSON parse error");
  }
}

if (toml && !/publish\s*=\s*"dist"/.test(toml)) {
  report.issues.push('netlify.toml: [build].publish should be "dist"');
}

if (vercel) {
  try {
    const v = JSON.parse(vercel);
    const out = v.outputDirectory || v.build?.publish;
    if (out && out !== "dist") report.issues.push('vercel.json: outputDirectory should be "dist"');
  } catch {
    report.issues.push("vercel.json: JSON parse error");
  }
}

if (report.issues.length) report.status = "WARN";
console.log(JSON.stringify(report));
