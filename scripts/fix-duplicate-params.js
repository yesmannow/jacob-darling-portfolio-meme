#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const files = glob.sync('src/**/*.tsx');
let fixed = 0;

files.forEach(file => {
  let content = readFileSync(file, 'utf8');
  let changed = false;

  // Fix pattern: ) =>{ param1, param2 }) => {
  // Should be: ) => {
  const pattern = /\)\s*=>\s*\{[\s\S]{1,200}?\}\)\s*=>\s*\{/g;

  content = content.replace(pattern, (match) => {
    // Find the first closing paren and arrow
    const firstArrow = match.indexOf('=>');
    const afterFirstArrow = match.substring(firstArrow + 2).trim();

    // Find the duplicate params section
    const duplicateStart = afterFirstArrow.indexOf('{');
    const duplicateEnd = afterFirstArrow.indexOf('}) =>');

    if (duplicateStart >= 0 && duplicateEnd > duplicateStart) {
      changed = true;
      // Remove everything from the duplicate params to the second =>
      return match.substring(0, firstArrow + 2) + ' {';
    }
    return match;
  });

  // More specific pattern for common cases
  content = content.replace(
    /(\w+)\s*=\s*\(\{([^}]+)\}\s*:\s*(\w+Props)\)\s*=>\s*\{\s*\2\s*\}\)\s*=>\s*\{/g,
    (match, name, params, propsType) => {
      changed = true;
      return `${name} = ({${params}}: ${propsType}) => {`;
    }
  );

  if (changed) {
    writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${file}`);
    fixed++;
  }
});

console.log(`Fixed ${fixed} files`);

