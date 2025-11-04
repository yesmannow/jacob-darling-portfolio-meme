#!/usr/bin/env node
const fs = require('fs');
const idx = 'index.html';
if (!fs.existsSync(idx)) { console.warn('index.html missing'); process.exit(0); }
const html = fs.readFileSync(idx,'utf8');
if (/\/assets\/index-[a-f0-9]+\.js/i.test(html)) {
  console.error('pre-build guard: index.html references hashed /assets JS — ensure entry points use /src/main.tsx');
  process.exit(2);
}
console.log('pre-build guard OK.');
