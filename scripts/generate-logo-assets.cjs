const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = 'public/images/logo';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function createAssets() {
  const source = 'tmp/logo_trimmed.png';
  
  // 1. super-ice-logo.png (original trimmed blue)
  await sharp(source).png().toFile(path.join(outDir, 'super-ice-logo.png'));
  console.log('Created super-ice-logo.png');

  // 2. super-ice-logo-white.png (white with preserved alpha)
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  const whiteData = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    whiteData[i] = 255;
    whiteData[i+1] = 255;
    whiteData[i+2] = 255;
    whiteData[i+3] = data[i+3]; // keep original alpha
  }
  await sharp(whiteData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'super-ice-logo-white.png'));
  console.log('Created super-ice-logo-white.png');

  // 3. super-ice-logo-cyan.png (cyan #00e5ff)
  const cyanData = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    cyanData[i] = 0;
    cyanData[i+1] = 229;
    cyanData[i+2] = 255;
    cyanData[i+3] = data[i+3];
  }
  await sharp(cyanData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'super-ice-logo-cyan.png'));
  console.log('Created super-ice-logo-cyan.png');

  // 4. Square logo with padding (for icons/favicons)
  const squareSize = 512;
  const padding = 40;
  const targetW = squareSize - (padding * 2);
  const targetH = Math.round(targetW * (info.height / info.width));
  
  const resizedBlue = await sharp(source).resize(targetW, targetH, { fit: 'inside' }).toBuffer();
  
  await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: resizedBlue, gravity: 'center' }])
  .png()
  .toFile(path.join(outDir, 'super-ice-logo-square.png'));
  console.log('Created super-ice-logo-square.png');

  // 5. Favicons in public/
  await sharp(path.join(outDir, 'super-ice-logo-square.png')).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(path.join(outDir, 'super-ice-logo-square.png')).resize(16, 16).png().toFile('public/favicon-16x16.png');
  await sharp(path.join(outDir, 'super-ice-logo-square.png')).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(path.join(outDir, 'super-ice-logo-square.png')).resize(32, 32).png().toFile('public/favicon.png');
  console.log('Created favicon PNGs');

  // 6. Favicon SVG
  const b64 = (await sharp(source).png().toBuffer()).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${info.width} ${info.height}">
  <image width="${info.width}" height="${info.height}" href="data:image/png;base64,${b64}"/>
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgContent);
  fs.writeFileSync(path.join(outDir, 'super-ice-logo.svg'), svgContent);
  console.log('Created favicon.svg and super-ice-logo.svg');

  // 7. OG Image (1200x630)
  // Create beautiful social card with logo and typography
  const ogLogo = await sharp(path.join(outDir, 'super-ice-logo.png')).resize(320, 243).toBuffer();
  
  // Background SVG with gradient and icy patterns
  const bgSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#0e1e38" />
          <stop offset="60%" stop-color="#080f1d" />
          <stop offset="100%" stop-color="#04070d" />
        </radialGradient>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00e5ff" />
          <stop offset="100%" stop-color="#0070d8" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)" />
      
      <!-- Subtle icy decorative lines -->
      <circle cx="950" cy="180" r="280" stroke="#00e5ff" stroke-width="1" stroke-opacity="0.15" fill="none" />
      <circle cx="950" cy="180" r="380" stroke="#0070d8" stroke-width="1" stroke-opacity="0.1" fill="none" />
      <circle cx="200" cy="500" r="250" stroke="#00e5ff" stroke-width="1" stroke-opacity="0.1" fill="none" />
      
      <!-- Text content -->
      <text x="560" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Kanit', sans-serif" font-weight="800" font-size="54" fill="#ffffff" letter-spacing="0.05em">SUPER ICE GROUP</text>
      <text x="560" y="290" font-family="-apple-system, BlinkMacSystemFont, 'Kanit', sans-serif" font-weight="600" font-size="22" fill="#00e5ff" letter-spacing="0.25em">PRECISION IN EVERY CUBE</text>
      <text x="560" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Kanit', sans-serif" font-weight="400" font-size="26" fill="#cbd5e1">ผู้ผลิตและจัดส่งน้ำแข็งสำหรับธุรกิจ 24/7</text>
      <text x="560" y="405" font-family="-apple-system, BlinkMacSystemFont, 'Kanit', sans-serif" font-weight="400" font-size="20" fill="#94a3b8">Super Ice &amp; ICEBERG • มาตรฐาน อย. &amp; GMP 420 • 5,000+ ตัน/วัน</text>
    </svg>
  `);

  await sharp(bgSvg)
    .composite([
      { input: ogLogo, left: 160, top: 190 }
    ])
    .png()
    .toFile('public/images/og-image.png');
  console.log('Created public/images/og-image.png');
}

createAssets().catch(console.error);
