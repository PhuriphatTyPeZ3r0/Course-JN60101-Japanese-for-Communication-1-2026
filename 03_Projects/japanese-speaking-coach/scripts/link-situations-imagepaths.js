const fs = require('fs');
const path = require('path');

const datasetPath = path.join(__dirname, '../lib/dataset.ts');
let content = fs.readFileSync(datasetPath, 'utf8');

const itemIds = [
  'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8',
  'q_ch3_1', 'q_ch3_2', 'q_ch3_3',
  'q_ch4_1', 'q_ch4_2',
  'q_ch5_1', 'q_ch5_2', 'q_ch5_3',
  'q_ch6_1', 'q_ch6_2', 'q_ch6_3',
];

for (const id of itemIds) {
  // Check if imagePath is already inside this object
  const checkRegex = new RegExp(`id:\\s*["']${id}["'][^}]+?imagePath:`);
  if (!checkRegex.test(content)) {
    const targetRegex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?)(imageUrl:\\s*["'][^"']+["'])`);
    content = content.replace(targetRegex, `$1imagePath: "/images/situations/ch1_6/${id}.webp",\n    $2`);
    console.log(`[LINKED] ${id} -> /images/situations/ch1_6/${id}.webp`);
  } else {
    console.log(`[EXISTS] ${id} already has imagePath`);
  }
}

fs.writeFileSync(datasetPath, content, 'utf8');
console.log('Finished updating lib/dataset.ts');
