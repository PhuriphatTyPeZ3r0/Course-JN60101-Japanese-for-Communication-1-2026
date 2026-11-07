const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const downloadsDir = path.join(process.env.USERPROFILE, 'Downloads');
const targetDir = path.join(__dirname, '../public/images/situations/exam2');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  { file: 'Generated Image November 04, 2026 - 7_14AM.jpg', id: 'e2_q1_kaigishitsu' },
  { file: 'Generated Image November 04, 2026 - 7_14AM (1).jpg', id: 'e2_q1_shokudo' },
  { file: 'Generated Image November 04, 2026 - 7_15AM.jpg', id: 'e2_q1_otearai' },
  { file: 'Generated Image November 04, 2026 - 7_15AM (1).jpg', id: 'e2_q1_depato' },
  { file: 'Generated Image November 04, 2026 - 7_16AM.jpg', id: 'e2_q1_supa' },
  { file: 'Generated Image November 04, 2026 - 7_17AM.jpg', id: 'e2_q1_resutoran' },
  { file: 'Generated Image November 04, 2026 - 7_17AM (1).jpg', id: 'e2_q1_yubinkyoku' },
  { file: 'Generated Image November 04, 2026 - 7_18AM.jpg', id: 'e2_q1_uketsuke' },
];

async function run() {
  for (const item of mapping) {
    const src = path.join(downloadsDir, item.file);
    const dest = path.join(targetDir, `${item.id}.webp`);
    if (!fs.existsSync(src)) {
      console.error(`[MISSING] Source file not found: ${src}`);
      continue;
    }

    await sharp(src)
      .resize(512, 512, { fit: 'cover', position: 'center' })
      .webp({ quality: 82 })
      .toFile(dest);

    const stat = fs.statSync(dest);
    console.log(`[CONVERTED] ${item.id} -> ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
