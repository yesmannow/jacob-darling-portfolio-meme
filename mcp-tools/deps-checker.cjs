// mcp-tools/deps-checker.js
const pkg = require("../package.json");
const have = (n) => !!((pkg.dependencies && pkg.dependencies[n]) || (pkg.devDependencies && pkg.devDependencies[n]));
const need = ["react","react-dom","react-router-dom","framer-motion","typescript","vite","@vitejs/plugin-react","@types/node","@types/react","@types/react-dom","@types/react-router-dom"];

const missing = need.filter(n => !have(n));
console.log(JSON.stringify({ status: missing.length ? "WARN" : "OK", missing }));
