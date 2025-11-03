#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
  let content = readFileSync(file, 'utf8');
  let changed = false;

  // Pattern 1: const Component: React.FC<Props> = ({ ... }) =>
  //           const Component = ({ ... }: Props) =>
  content = content.replace(
    /const\s+(\w+):\s*React\.FC<([^>]+)>\s*=\s*\(/g,
    (match, name, props) => {
      changed = true;
      return `const ${name} = (`;
    }
  );

  // Pattern 2: const Component: React.FC = () =>
  //           const Component = () =>
  content = content.replace(
    /const\s+(\w+):\s*React\.FC\s*=\s*\(/g,
    (match, name) => {
      changed = true;
      return `const ${name} = (`;
    }
  );

  // Pattern 3: export const Component: React.FC<Props> = ({ ... }) =>
  content = content.replace(
    /export\s+const\s+(\w+):\s*React\.FC<([^>]+)>\s*=\s*\(/g,
    (match, name, props) => {
      changed = true;
      return `export const ${name} = (`;
    }
  );

  // Pattern 4: export const Component: React.FC = () =>
  content = content.replace(
    /export\s+const\s+(\w+):\s*React\.FC\s*=\s*\(/g,
    (match, name) => {
      changed = true;
      return `export const ${name} = (`;
    }
  );

  // Pattern 5: Fix cases where props type was incorrectly moved
  // const Component: PropsType = ({ ... }) =>
  // should be const Component = ({ ... }: PropsType) =>
  content = content.replace(
    /const\s+(\w+):\s*(\w+Props)\s*=\s*\(/g,
    (match, name, propsType) => {
      // Only fix if it's a Props interface (ends with Props)
      if (propsType.endsWith('Props')) {
        changed = true;
        // Find the destructuring pattern
        const nextLine = content.substring(content.indexOf(match) + match.length);
        const closingParen = nextLine.indexOf(')');
        if (closingParen > 0) {
          const destructure = nextLine.substring(0, closingParen);
          return `const ${name} = (${destructure}: ${propsType}) =>`;
        }
      }
      return match;
    }
  );

  if (changed) {
    writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

console.log('Done!');

