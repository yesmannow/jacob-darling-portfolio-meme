/**
 * Bundle Analysis Script
 * Analyzes build output and generates performance metrics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist/assets');

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeBundle() {
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist/assets directory not found. Run npm run build first.');
    process.exit(1);
  }

  const files = fs.readdirSync(distPath);
  const jsFiles = files
    .filter(f => f.endsWith('.js'))
    .map(f => {
      const filePath = path.join(distPath, f);
      const stats = fs.statSync(filePath);
      const gzipPath = filePath + '.gz';
      const brotliPath = filePath + '.br';

      return {
        name: f,
        size: stats.size,
        gzipSize: fs.existsSync(gzipPath) ? fs.statSync(gzipPath).size : null,
        brotliSize: fs.existsSync(brotliPath) ? fs.statSync(brotliPath).size : null,
      };
    })
    .sort((a, b) => b.size - a.size);

  console.log('\n📊 Bundle Analysis Report\n');
  console.log('='.repeat(80));

  // Main bundle
  const mainBundle = jsFiles.find(f => f.name.includes('index'));
  if (mainBundle) {
    console.log('\n🎯 Main Bundle:');
    console.log(`   File: ${mainBundle.name}`);
    console.log(`   Size: ${formatBytes(mainBundle.size)}`);
    if (mainBundle.gzipSize) {
      console.log(`   Gzip: ${formatBytes(mainBundle.gzipSize)} (${Math.round((1 - mainBundle.gzipSize/mainBundle.size) * 100)}% reduction)`);
    }
    if (mainBundle.brotliSize) {
      console.log(`   Brotli: ${formatBytes(mainBundle.brotliSize)} (${Math.round((1 - mainBundle.brotliSize/mainBundle.size) * 100)}% reduction)`);
    }
  }

  // Top 10 largest chunks
  console.log('\n📦 Top 10 Largest Chunks:');
  jsFiles.slice(0, 10).forEach((file, idx) => {
    console.log(`   ${idx + 1}. ${file.name.padEnd(40)} ${formatBytes(file.size).padStart(10)}`);
    if (file.gzipSize) {
      console.log(`      └─ Gzip: ${formatBytes(file.gzipSize)} (${Math.round((1 - file.gzipSize/file.size) * 100)}% reduction)`);
    }
  });

  // Total stats
  const totalSize = jsFiles.reduce((sum, f) => sum + f.size, 0);
  const totalGzipSize = jsFiles.reduce((sum, f) => sum + (f.gzipSize || 0), 0);
  const totalBrotliSize = jsFiles.reduce((sum, f) => sum + (f.brotliSize || 0), 0);

  console.log('\n📈 Totals:');
  console.log(`   All JS Files: ${formatBytes(totalSize)}`);
  if (totalGzipSize > 0) {
    console.log(`   Gzip Total: ${formatBytes(totalGzipSize)} (${Math.round((1 - totalGzipSize/totalSize) * 100)}% reduction)`);
  }
  if (totalBrotliSize > 0) {
    console.log(`   Brotli Total: ${formatBytes(totalBrotliSize)} (${Math.round((1 - totalBrotliSize/totalSize) * 100)}% reduction)`);
  }

  // Vendor chunks
  const vendorChunks = jsFiles.filter(f => f.name.includes('vendor'));
  if (vendorChunks.length > 0) {
    console.log('\n🏷️  Vendor Chunks:');
    vendorChunks.forEach(file => {
      console.log(`   ${file.name.padEnd(40)} ${formatBytes(file.size).padStart(10)}`);
    });
  }

  // Page chunks
  const pageChunks = jsFiles.filter(f => f.name.startsWith('page-'));
  if (pageChunks.length > 0) {
    console.log('\n📄 Page Chunks:');
    pageChunks.slice(0, 10).forEach(file => {
      console.log(`   ${file.name.padEnd(40)} ${formatBytes(file.size).padStart(10)}`);
    });
    if (pageChunks.length > 10) {
      console.log(`   ... and ${pageChunks.length - 10} more page chunks`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ Analysis complete. Total chunks: ${jsFiles.length}\n`);
}

analyzeBundle();

