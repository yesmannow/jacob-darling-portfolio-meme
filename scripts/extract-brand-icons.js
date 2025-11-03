/**
 * Script to extract SVG icons from simple-icons package
 * Run this before removing simple-icons to extract needed brand icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/assets/icons/brands');
const simpleIconsDataPath = path.join(__dirname, '../node_modules/simple-icons/data/simple-icons.json');

// Ensure directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icons we want to extract (slugs from simple-icons)
const iconsToExtract = [
  'react', 'javascript', 'typescript', 'php', 'html5', 'css3', 'sass',
  'nodejs', 'express', 'mongodb', 'mysql', 'postgresql', 'redis',
  'wordpress', 'woocommerce', 'elementor',
  'github', 'git', 'vscode', 'postman',
  'figma', 'adobe', 'photoshop', 'illustrator',
  'stripe', 'paypal', 'cloudflare',
  'googleanalytics', 'googletagmanager', 'googleads',
  'meta', 'linkedin',
  'vercel', 'netlify',
  'notion', 'slack', 'trello', 'asana',
  'zapier', 'integromat', 'mailchimp', 'activecampaign',
  'ahrefs', 'semrush', 'googlesearchconsole'
];

try {
  // Read simple-icons data
  const data = JSON.parse(fs.readFileSync(simpleIconsDataPath, 'utf8'));
  // The structure might be { icons: [...] } or just an array
  const icons = Array.isArray(data) ? data : (data.icons || []);

  if (icons.length === 0) {
    console.error('❌ No icons found in data file');
    process.exit(1);
  }

  let extracted = 0;
  let skipped = 0;

  iconsToExtract.forEach((slug) => {
    const icon = icons.find((i) => i.slug === slug);

    if (!icon) {
      console.log(`⚠️  Icon not found: ${slug}`);
      skipped++;
      return;
    }

    // Extract SVG path and create optimized SVG file
    const svgContent = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>${icon.title}</title>
  <path d="${icon.path}" fill="#${icon.hex}"/>
</svg>`;

    // Handle special cases (like nodedotjs -> nodejs.svg)
    let filename = slug;
    if (slug === 'nodedotjs') filename = 'nodejs';
    if (slug === 'visualstudiocode') filename = 'vscode';
    if (slug === 'googletagmanager') filename = 'googletagmanager';
    if (slug === 'googleanalytics') filename = 'googleanalytics';
    if (slug === 'googleads') filename = 'googleads';
    if (slug === 'googlesearchconsole') filename = 'googlesearchconsole';

    const filePath = path.join(iconsDir, `${filename}.svg`);
    fs.writeFileSync(filePath, svgContent, 'utf8');
    console.log(`✅ Extracted: ${icon.title} -> ${filename}.svg`);
    extracted++;
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Extracted: ${extracted}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${iconsToExtract.length}`);
} catch (error) {
  console.error('❌ Error extracting icons:', error);
  process.exit(1);
}

