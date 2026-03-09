/**
 * Creates a WhatsApp-compatible OG image (< 300KB) from lacosta-card.png
 * Run: node scripts/compress-og.js
 */
const fs = require("fs");
const path = require("path");

async function compress() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("Install sharp first: npm install sharp --save-dev --legacy-peer-deps");
    process.exit(1);
  }

  const input = path.join(__dirname, "../public/lacosta-card.png");
  const output = path.join(__dirname, "../public/lacosta-card-og.jpg");

  if (!fs.existsSync(input)) {
    console.error("lacosta-card.png not found in public/");
    process.exit(1);
  }

  let quality = 82;
  let buffer;

  do {
    buffer = await sharp(input)
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    const sizeKB = (buffer.length / 1024).toFixed(1);
    console.log(`Quality ${quality}: ${sizeKB} KB`);

    if (buffer.length <= 300 * 1024) {
      fs.writeFileSync(output, buffer);
      console.log(`\nDone! Saved to public/lacosta-card-og.jpg (${sizeKB} KB)`);
      return;
    }
    quality -= 5;
  } while (quality >= 50);

  fs.writeFileSync(output, buffer);
  console.log("\nCould not get under 300KB. Saved best effort - consider reducing dimensions.");
}

compress().catch((err) => {
  console.error(err);
  process.exit(1);
});
