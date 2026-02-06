const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// input logo path (default)
const input = path.resolve(process.argv[2] || "assets/branding/coldbox-logo-edit3.png");

// Controls padding. 0.70–0.85 is usually best.
// Smaller value = more padding = less risk of "losing details".
const LOGO_SCALE = 0.75;

const targets = [
  { dir: "mipmap-mdpi", size: 48 },
  { dir: "mipmap-hdpi", size: 72 },
  { dir: "mipmap-xhdpi", size: 96 },
  { dir: "mipmap-xxhdpi", size: 144 },
  { dir: "mipmap-xxxhdpi", size: 192 },
];

async function writeIcon(folder, baseSize) {
  const resBase = path.resolve("android/app/src/main/res");
  const outDir = path.join(resBase, folder);
  if (!fs.existsSync(outDir)) return;

  const logoSize = Math.round(baseSize * LOGO_SCALE);

  const logo = await sharp(input)
    .resize(logoSize, logoSize, { fit: "contain" }) // no crop
    .png()
    .toBuffer();

  const final = await sharp({
    create: {
      width: baseSize,
      height: baseSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();

  // overwrite standard launcher icons if they exist
  const p1 = path.join(outDir, "ic_launcher.png");
  if (fs.existsSync(p1)) fs.writeFileSync(p1, final);

  const p2 = path.join(outDir, "ic_launcher_round.png");
  if (fs.existsSync(p2)) fs.writeFileSync(p2, final);

  console.log(`Updated ${folder} (${baseSize}x${baseSize})`);
}

(async () => {
  for (const t of targets) await writeIcon(t.dir, t.size);
  console.log("Done.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
