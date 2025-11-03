#!/usr/bin/env node
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const BUILD_DIR = process.env.BUILD_DIR || 'dist';
const ASSETS_PATTERN = process.env.ASSETS_PATTERN || 'assets/**/*.tsx';
const ASSETS_DIR = join(BUILD_DIR, 'assets');

// Invalid extensions that should not be in build output
const INVALID_EXTENSIONS = ['.tsx', '.jsx', '.ts'];

async function findInvalidFiles(dir, basePath = '') {
  const results = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relativePath = join(basePath, entry.name);

      if (entry.isDirectory()) {
        const subResults = await findInvalidFiles(fullPath, relativePath);
        results.push(...subResults);
      } else if (entry.isFile()) {
        // Check for invalid extensions (but allow .d.ts declaration files)
        const hasInvalidExt = INVALID_EXTENSIONS.some(ext =>
          entry.name.endsWith(ext) && !entry.name.endsWith('.d.ts')
        );
        if (hasInvalidExt) {
          results.push(relativePath);
        }
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    if (error.code !== 'ENOENT') {
      console.error(`Error scanning ${dir}:`, error.message);
    }
  }

  return results;
}

async function main() {
  const report = {
    scanPath: ASSETS_DIR,
    timestamp: new Date().toISOString(),
    invalidFilesFound: [],
    invalidExtensions: INVALID_EXTENSIONS,
    errors: []
  };

  try {
    if (!existsSync(ASSETS_DIR)) {
      report.errors.push(`Assets directory not found: ${ASSETS_DIR}`);
      console.log(JSON.stringify(report, null, 2));
      process.exit(0);
    }

    report.invalidFilesFound = await findInvalidFiles(ASSETS_DIR);

    if (report.invalidFilesFound.length > 0) {
      report.status = 'ISSUES_FOUND';
      report.message = `Found ${report.invalidFilesFound.length} invalid file(s) with extensions ${INVALID_EXTENSIONS.join(', ')} in build output`;
    } else {
      report.status = 'OK';
      report.message = 'No invalid file extensions found in build output';
    }
  } catch (error) {
    report.status = 'ERROR';
    report.errors.push(error.message);
  }

  console.log(JSON.stringify(report, null, 2));
  process.exit(report.invalidFilesFound.length > 0 ? 1 : 0);
}

main();

