const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImage(srcPath, destSubpath) {
  const destPath = path.join(__dirname, '../public', destSubpath.replace(/^\//, ''));
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  await sharp(srcPath)
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .webp({ quality: 82 })
    .toFile(destPath);

  const stat = fs.statSync(destPath);
  console.log(`[CONVERTED] ${srcPath} -> ${destSubpath} (${(stat.size / 1024).toFixed(1)} KB)`);
}

module.exports = { processImage };

if (require.main === module) {
  const [,, src, dest] = process.argv;
  if (!src || !dest) {
    console.error("Usage: node process-downloaded-image.js <srcPath> <destRelativePath>");
    process.exit(1);
  }
  processImage(src, dest).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
