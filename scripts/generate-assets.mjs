import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

const SOURCE_DIR =
  'C:/Users/Admin/.gemini/antigravity/brain/50110a95-e3b3-4bdb-ad53-b30d41a02881/.user_uploaded';

const SOURCES = {
  hero: path.join(SOURCE_DIR, 'media_1794589817879_e2ff40cf.jpg'),
  bio: path.join(SOURCE_DIR, 'media_1794589836525_c8fd4da3.jpg'),
  estante: path.join(SOURCE_DIR, 'media_1794589845230_eee03535.jpg'),
  escritor: path.join(SOURCE_DIR, 'media_1794590072913_634c377c.jpg'),
};

function createIcoFromPng(pngBuffer, size = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(1, 4); // count = 1

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // size of image data
  entry.writeUInt32LE(header.length + entry.length, 12); // offset

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // 1. Hero portrait (dark blazer, seated at desk)
  await sharp(SOURCES.hero)
    .extract({ left: 8, top: 8, width: 658, height: 874 })
    .resize(800, 1060, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'jeferson-hero.jpg'));

  // 2. Bio portrait (beige blazer with open law books - cropped cleanly from Instagram modal)
  await sharp(SOURCES.bio)
    .extract({ left: 6, top: 16, width: 552, height: 640 })
    .resize(760, 880, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'jeferson-bio.jpg'));

  // 3. Standing bookshelf portrait (cropped cleanly from Instagram modal)
  await sharp(SOURCES.estante)
    .extract({ left: 86, top: 22, width: 486, height: 690 })
    .resize(760, 1078, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'jeferson-estante.jpg'));

  // 4. Writer portrait (reading with coffee mug)
  await sharp(SOURCES.escritor)
    .extract({ left: 6, top: 6, width: 636, height: 646 })
    .resize(760, 772, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'jeferson-escritor.jpg'));

  // 5. OpenGraph Cover 1200x630 (< 250 KB)
  const ogPortrait = await sharp(path.join(IMAGES_DIR, 'jeferson-hero.jpg'))
    .resize(440, 530, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 86 })
    .toBuffer();

  const ogSvgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090A0D"/>
          <stop offset="55%" stop-color="#141115"/>
          <stop offset="100%" stop-color="#2D0B10"/>
        </linearGradient>
        <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C8A25A"/>
          <stop offset="100%" stop-color="#8B6D36"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="28" y="28" width="1144" height="574" rx="18" fill="none" stroke="#C8A25A" stroke-opacity="0.35" stroke-width="1.5"/>
      <rect x="708" y="48" width="444" height="534" rx="14" fill="#171317" stroke="#C8A25A" stroke-opacity="0.55" stroke-width="2"/>
      <rect x="72" y="88" width="236" height="36" rx="18" fill="#6B141A" stroke="#C8A25A" stroke-opacity="0.6"/>
      <text x="190" y="111" text-anchor="middle" fill="#F3E6CE" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.5">OAB/SC 75.973 • 24 HORAS</text>
      <text x="72" y="196" fill="#F6F3EC" font-family="Georgia, serif" font-size="52" font-weight="700">Jeferson Gonçalves</text>
      <text x="72" y="256" fill="#C8A25A" font-family="Georgia, serif" font-size="52" font-weight="700">Martins Advocacia</text>
      <rect x="72" y="288" width="160" height="3" fill="url(#goldLine)"/>
      <text x="72" y="342" fill="#E3DDD2" font-family="Arial, sans-serif" font-size="23" font-weight="600">Advogado, Pesquisador &amp; Escritor</text>
      <text x="72" y="388" fill="#B7AFA3" font-family="Arial, sans-serif" font-size="20">Famílias &amp; Sucessões • Biodireito • Saúde • Civil &amp; Público</text>
      <text x="72" y="426" fill="#B7AFA3" font-family="Arial, sans-serif" font-size="20">Mestrando em Direito (UNESC) • Autor de 3 Livros Publicados</text>
      <rect x="72" y="486" width="560" height="58" rx="10" fill="#15161B" stroke="#C8A25A" stroke-opacity="0.35"/>
      <text x="96" y="521" fill="#F6F3EC" font-family="Arial, sans-serif" font-size="19" font-weight="600">Passo de Torres, SC • WhatsApp +55 48 92001-7268</text>
    </svg>
  `);

  await sharp(ogSvgOverlay)
    .composite([{ input: ogPortrait, left: 710, top: 50 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'og-cover.jpg'));

  // 6. OpenGraph Square 600x600 (< 150 KB)
  const sqPortrait = await sharp(path.join(IMAGES_DIR, 'jeferson-bio.jpg'))
    .resize(560, 420, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 84 })
    .toBuffer();

  const sqSvg = Buffer.from(`
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#0B0C10"/>
      <rect x="16" y="16" width="568" height="568" rx="20" fill="#131115" stroke="#C8A25A" stroke-opacity="0.45" stroke-width="2"/>
      <rect x="20" y="438" width="560" height="142" fill="#0E0D11"/>
      <text x="300" y="485" text-anchor="middle" fill="#F6F3EC" font-family="Georgia, serif" font-size="28" font-weight="700">Jeferson Martins</text>
      <text x="300" y="520" text-anchor="middle" fill="#C8A25A" font-family="Arial, sans-serif" font-size="18" font-weight="700">Advogado (OAB/SC 75.973) e Escritor</text>
      <text x="300" y="552" text-anchor="middle" fill="#B7AFA3" font-family="Arial, sans-serif" font-size="15">Passo de Torres, SC • +55 48 92001-7268</text>
    </svg>
  `);

  await sharp(sqSvg)
    .composite([{ input: sqPortrait, left: 20, top: 20 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'og-square.jpg'));

  // 7. Brand Icon PNG (512x512), Apple Touch Icon (180x180), Favicon ICO (32x32)
  const iconSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B0C10"/>
          <stop offset="100%" stop-color="#4A0F15"/>
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#g)"/>
      <rect x="28" y="28" width="456" height="456" rx="92" fill="none" stroke="#C8A25A" stroke-width="10"/>
      <text x="256" y="294" text-anchor="middle" fill="#F6F3EC" font-family="Georgia, serif" font-size="198" font-weight="700" letter-spacing="-8">JM</text>
      <text x="256" y="382" text-anchor="middle" fill="#C8A25A" font-family="Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="6">OAB/SC 75.973</text>
    </svg>
  `);

  await sharp(iconSvg).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, 'icon.png'));
  await sharp(iconSvg).resize(180, 180).png().toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  const icoPng = await sharp(iconSvg).resize(32, 32).png().toBuffer();
  await fs.writeFile(path.join(PUBLIC_DIR, 'favicon.ico'), createIcoFromPng(icoPng, 32));

  // 8. vCard (.vcf) for instant mobile contact saving
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Martins;Jeferson Gonçalves;Dr.;;',
    'FN:Dr. Jeferson Gonçalves Martins (Advogado OAB/SC 75.973)',
    'ORG:Jeferson Gonçalves Martins Advocacia',
    'TITLE:Advogado (OAB/SC 75.973) e Escritor',
    'TEL;TYPE=CELL,VOICE,WHATSAPP:+5548920017268',
    'ADR;TYPE=WORK:;;Passo de Torres;SC;;88980-000;Brasil',
    'URL:https://www.instagram.com/jefmartinss/',
    'NOTE:Atendimento jurídico 24 horas. Famílias e Sucessões, Direito Médico/Saúde, Biodireito, Civil e Público.',
    'END:VCARD',
    '',
  ].join('\r\n');
  await fs.writeFile(path.join(PUBLIC_DIR, 'jeferson-martins.vcf'), vcard, 'utf8');

  const filesToCheck = [
    'public/images/og-cover.jpg',
    'public/images/og-square.jpg',
    'public/images/jeferson-hero.jpg',
    'public/images/jeferson-bio.jpg',
    'public/images/jeferson-estante.jpg',
    'public/images/jeferson-escritor.jpg',
    'public/icon.png',
    'public/apple-touch-icon.png',
    'public/favicon.ico',
    'public/jeferson-martins.vcf',
  ];

  for (const rel of filesToCheck) {
    const stat = await fs.stat(path.join(ROOT, rel));
    console.log(`${rel}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
