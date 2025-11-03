#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';

const report = {
  timestamp: new Date().toISOString(),
  dependencies: {
    required: ['react', 'react-dom', '@types/react', '@types/react-dom', 'react-router-dom'],
    missing: [],
    present: []
  },
  status: 'OK',
  issues: []
};

function main() {
  const packageJsonPath = 'package.json';

  if (!existsSync(packageJsonPath)) {
    report.status = 'ERROR';
    report.issues.push('package.json not found');
    console.log(JSON.stringify(report, null, 2));
    process.exit(1);
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {})
    };

    report.dependencies.required.forEach(dep => {
      if (allDeps[dep]) {
        report.dependencies.present.push(dep);
      } else {
        report.dependencies.missing.push(dep);
        report.issues.push(`Missing dependency: ${dep}`);
      }
    });

    if (report.dependencies.missing.length > 0) {
      report.status = 'ISSUES_FOUND';
      report.message = `Missing ${report.dependencies.missing.length} required dependency/ies`;
    } else {
      report.message = 'All required dependencies are present';
    }
  } catch (error) {
    report.status = 'ERROR';
    report.issues.push(`Error reading package.json: ${error.message}`);
  }

  console.log(JSON.stringify(report, null, 2));
  process.exit(report.dependencies.missing.length > 0 ? 1 : 0);
}

main();

