#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const dist = path.resolve('dist');
if (!fs.existsSync(dist)) { console.error('dist missing'); process.exit(1); }
const assetsDir = path.join(dist, 'assets');
const files = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : fs.readdirSync(dist);
const js = files.find(f => f.endsWith('.js'));
if (!js) { console.error('no JS bundle found in dist'); process.exit(1); }
console.log('post-build-verify OK.');
