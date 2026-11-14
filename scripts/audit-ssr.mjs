import fs from 'node:fs';
import path from 'node:path';

const htmlFiles = [
  { route: '/', file: '.next/server/app/index.html' },
  { route: '/bio', file: '.next/server/app/bio.html' },
  {
    route: '/artigos/testamento-vital',
    file: '.next/server/app/artigos/testamento-vital-diretrizes-antecipadas-vontade-biodireito.html',
  },
  {
    route: '/artigos/inventario',
    file: '.next/server/app/artigos/planejamento-sucessorio-inventario-direito-familias.html',
  },
  {
    route: '/artigos/saude',
    file: '.next/server/app/artigos/direito-saude-fornecimento-medicamentos-tratamentos.html',
  },
];

let failed = false;

for (const { route, file } of htmlFiles) {
  const html = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const descMatch = html.match(
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/i,
  );
  const title = titleMatch ? titleMatch[1] : '';
  const desc = descMatch ? descMatch[1] : '';

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const headingMatches = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) =>
    Number(m[1]),
  );

  let skippedHeading = false;
  for (let i = 1; i < headingMatches.length; i += 1) {
    if (headingMatches[i] - headingMatches[i - 1] > 1) {
      skippedHeading = true;
      console.error(
        'SKIPPED HEADING on',
        route,
        headingMatches[i - 1],
        '->',
        headingMatches[i],
      );
    }
  }

  const hasUlOrOl = /<(ul|ol)[\s>]/i.test(html);
  const hasTable =
    /<table[\s>]/i.test(html) &&
    /<thead[\s>]/i.test(html) &&
    /<tbody[\s>]/i.test(html);
  const hasCanonical = /rel="canonical"/i.test(html);
  const hasHreflang = /hrefLang="pt-BR"|hreflang="pt-BR"/i.test(html);
  const hasGeo =
    /name="geo\.region"/i.test(html) && /name="geo\.position"/i.test(html);
  const hasOg = /property="og:image"/i.test(html) && /og-cover\.jpg/i.test(html);
  const hasPixirica = /Pixirica Tecnologias/i.test(html);

  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const missingAlt = imgTags.filter((tag) => !/alt="[^"]+"/i.test(tag));

  const textOnly = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log({
    route,
    titleLen: title.length,
    descLen: desc.length,
    h1Count,
    headingSeq: headingMatches.join('>'),
    skippedHeading,
    hasUlOrOl,
    hasTable,
    hasCanonical,
    hasHreflang,
    hasGeo,
    hasOg,
    hasPixirica,
    imgCount: imgTags.length,
    missingAltCount: missingAlt.length,
    textLen: textOnly.length,
  });

  if (
    title.length < 50 ||
    title.length > 60 ||
    desc.length < 120 ||
    desc.length > 160 ||
    h1Count !== 1 ||
    skippedHeading ||
    !hasUlOrOl ||
    !hasTable ||
    !hasCanonical ||
    !hasHreflang ||
    !hasGeo ||
    !hasOg ||
    !hasPixirica ||
    missingAlt.length > 0 ||
    textOnly.length < 3000
  ) {
    failed = true;
  }
}

if (failed) {
  console.error('SSR HTML AUDIT FAILED');
  process.exit(1);
}
console.log('ALL SSR HTML CHECKS PASSED 100%!');
