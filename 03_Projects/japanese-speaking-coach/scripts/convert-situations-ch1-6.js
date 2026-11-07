const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const downloadsDir = path.join(process.env.USERPROFILE, 'Downloads');
const targetDir = path.join(__dirname, '../public/images/situations/ch1_6');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const itemIds = [
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
  'q6',
  'q7',
  'q8',
  'q_ch3_1',
  'q_ch3_2',
  'q_ch3_3',
  'q_ch4_1',
  'q_ch4_2',
  'q_ch5_1',
  'q_ch5_2',
  'q_ch5_3',
  'q_ch6_1',
  'q_ch6_2',
  'q_ch6_3',
];

// Threshold timestamp: 7:25 AM today (November 4, 2026)
const thresholdTime = new Date('2026-11-04T07:25:00+07:00').getTime();

async function run() {
  const files = fs.readdirSync(downloadsDir)
    .filter(f => f.startsWith('Generated Image') && f.endsWith('.jpg'))
    .map(f => {
      const fullPath = path.join(downloadsDir, f);
      const stat = fs.statSync(fullPath);
      return { file: f, path: fullPath, mtime: stat.mtimeMs };
    })
    .filter(item => item.mtime >= thresholdTime)
    .sort((a, b) => a.mtime - b.mtime);

  console.log(`Found ${files.length} newly downloaded image(s) since 7:25 AM:`);
  files.forEach((f, idx) => {
    const id = itemIds[idx] || `extra_${idx}`;
    console.log(`[${idx + 1}] ${f.file} -> ${id}`);
  });

  for (let i = 0; i < Math.min(files.length, itemIds.length); i++) {
    const src = files[i].path;
    const id = itemIds[i];
    const dest = path.join(targetDir, `${id}.webp`);

    await sharp(src)
      .resize(512, 512, { fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(dest);

    const stat = fs.statSync(dest);
    console.log(`[CONVERTED] ${id}.webp (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
