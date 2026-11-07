const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../lib/dataset.ts'), 'utf8');
const itemIds = [
  'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8',
  'q_ch3_1', 'q_ch3_2', 'q_ch3_3',
  'q_ch4_1', 'q_ch4_2',
  'q_ch5_1', 'q_ch5_2', 'q_ch5_3',
  'q_ch6_1', 'q_ch6_2', 'q_ch6_3',
];

let errors = 0;
itemIds.forEach(id => {
  const re = new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?imagePath:\\s*["']([^"']+)["']`);
  const m = re.exec(content);
  if (!m) {
    console.error(`[ERROR] Missing imagePath for ${id}`);
    errors++;
    return;
  }
  const relPath = m[1];
  const absPath = path.join(__dirname, '../public', relPath.replace(/^\//, ''));
  if (!fs.existsSync(absPath)) {
    console.error(`[ERROR] File not found on disk: ${absPath}`);
    errors++;
    return;
  }
  const sz = (fs.statSync(absPath).size / 1024).toFixed(1);
  console.log(`[OK] ${id} -> ${relPath} (${sz} KB)`);
});

console.log(`\nVerified: ${itemIds.length - errors}/${itemIds.length} OK, ${errors} errors.`);
if (errors > 0) process.exit(1);
