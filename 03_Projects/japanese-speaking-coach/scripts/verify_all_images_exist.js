const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/exam3-data.ts');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /id:\s*["']([^"']+)["'][\s\S]*?imagePath:\s*["']([^"']+)["']/g;
let match;
let count = 0;
let errors = 0;

while ((match = regex.exec(content)) !== null) {
  count++;
  const id = match[1];
  const imgPath = match[2];
  const diskPath = path.join(__dirname, '../public', imgPath.replace(/^\//, ''));
  if (!fs.existsSync(diskPath)) {
    console.error(`[ERROR] Missing file on disk: ${imgPath} for question ${id}`);
    errors++;
  } else {
    const stat = fs.statSync(diskPath);
    console.log(`[OK] ${id} -> ${imgPath} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}

console.log(`\nVerified: ${count} questions checked, ${errors} errors.`);
if (errors > 0) process.exit(1);
