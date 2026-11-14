import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import manifest from '@/app/manifest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import {
  ARTICLES,
  BIO_FAQ,
  BIO_OFFICIAL_BOOK_LINKS,
  HOME_FAQ,
  PAGE_METADATA,
  SITE_CONFIG,
} from '@/data/site-data';
import { buildPageMetadata } from '@/lib/metadata';
import {
  buildArticleSchema,
  buildBioSchema,
  buildHomeSchema,
} from '@/lib/schema';

const ROOT = process.cwd();

describe('SEO Técnico 100/100 — Títulos e Meta Descriptions', () => {
  it('Home e Bio possuem <title> estritamente entre 50 e 60 caracteres', () => {
    expect(PAGE_METADATA.home.title.length).toBeGreaterThanOrEqual(50);
    expect(PAGE_METADATA.home.title.length).toBeLessThanOrEqual(60);

    expect(PAGE_METADATA.bio.title.length).toBeGreaterThanOrEqual(50);
    expect(PAGE_METADATA.bio.title.length).toBeLessThanOrEqual(60);
  });

  it('Home e Bio possuem <meta name="description"> estritamente entre 120 e 160 caracteres', () => {
    expect(PAGE_METADATA.home.description.length).toBeGreaterThanOrEqual(120);
    expect(PAGE_METADATA.home.description.length).toBeLessThanOrEqual(160);

    expect(PAGE_METADATA.bio.description.length).toBeGreaterThanOrEqual(120);
    expect(PAGE_METADATA.bio.description.length).toBeLessThanOrEqual(160);
  });

  it('Todos os artigos possuem title (50-60 chars) e description (120-160 chars)', () => {
    for (const article of ARTICLES) {
      expect(article.seoTitle.length).toBeGreaterThanOrEqual(50);
      expect(article.seoTitle.length).toBeLessThanOrEqual(60);
      expect(article.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(article.seoDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it('Metadata inclui canonical, hreflang pt-BR/x-default, Geo-SEO, OpenGraph e Pixirica Tecnologias', () => {
    const homeMeta = buildPageMetadata({
      title: PAGE_METADATA.home.title,
      description: PAGE_METADATA.home.description,
      path: '/',
    });

    expect(homeMeta.creator).toBe('Pixirica Tecnologias');
    expect(homeMeta.publisher).toBe('Pixirica Tecnologias');
    expect(homeMeta.alternates?.canonical).toBe('/');
    expect(homeMeta.alternates?.languages).toMatchObject({
      'pt-BR': '/',
      'x-default': '/',
    });
    expect(homeMeta.other).toMatchObject({
      'geo.region': 'BR-SC',
      'geo.placename': 'Passo de Torres, Santa Catarina, Brasil',
    });
    expect(homeMeta.openGraph).toMatchObject({
      type: 'website',
      locale: 'pt_BR',
    });
  });
});

describe('OpenGraph WhatsApp, Favicons, Manifest & LLMs.txt', () => {
  it('og-cover.jpg (1200x630) < 250 KB e og-square.jpg (600x600) < 150 KB', async () => {
    const coverPath = path.join(ROOT, 'public/images/og-cover.jpg');
    const coverStat = await fs.stat(coverPath);
    const coverMeta = await sharp(coverPath).metadata();
    expect(coverMeta.format).toBe('jpeg');
    expect(coverMeta.width).toBe(1200);
    expect(coverMeta.height).toBe(630);
    expect(coverStat.size).toBeLessThan(250 * 1024);

    const squarePath = path.join(ROOT, 'public/images/og-square.jpg');
    const squareStat = await fs.stat(squarePath);
    const squareMeta = await sharp(squarePath).metadata();
    expect(squareMeta.format).toBe('jpeg');
    expect(squareMeta.width).toBe(600);
    expect(squareMeta.height).toBe(600);
    expect(squareStat.size).toBeLessThan(150 * 1024);
  });

  it('Favicons, vCard e arquivos llms.txt estão presentes em public/', async () => {
    const requiredFiles = [
      'public/favicon.ico',
      'public/icon.png',
      'public/apple-touch-icon.png',
      'public/llms.txt',
      'public/llms-full.txt',
      'public/jeferson-martins.vcf',
    ];

    for (const rel of requiredFiles) {
      const stat = await fs.stat(path.join(ROOT, rel));
      expect(stat.size).toBeGreaterThan(0);
    }

    const llmsTxt = await fs.readFile(path.join(ROOT, 'public/llms.txt'), 'utf8');
    expect(llmsTxt).toContain('Jeferson Gonçalves Martins');
    expect(llmsTxt).toContain('OAB/SC 75.973');
    expect(llmsTxt).toContain('Pixirica Tecnologias');
  });

  it('robots.ts libera todos os crawlers de IA e declara sitemap', () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const aiRule = rules.find((r) => Array.isArray(r.userAgent));
    const agents = aiRule?.userAgent as string[];

    for (const bot of [
      'GPTBot',
      'ChatGPT-User',
      'OAI-SearchBot',
      'ClaudeBot',
      'Claude-Web',
      'anthropic-ai',
      'PerplexityBot',
      'CCBot',
      'Google-Extended',
      'Applebot-Extended',
    ]) {
      expect(agents).toContain(bot);
    }
    expect(config.sitemap).toContain('/sitemap.xml');
  });

  it('sitemap.ts inclui /, /bio e todos os artigos e manifest.ts está válido', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(SITE_CONFIG.defaultSiteUrl);
    expect(urls).toContain(`${SITE_CONFIG.defaultSiteUrl}/bio`);
    for (const article of ARTICLES) {
      expect(urls).toContain(`${SITE_CONFIG.defaultSiteUrl}/artigos/${article.slug}`);
    }

    const webManifest = manifest();
    expect(webManifest.start_url).toBe('/');
    expect(webManifest.icons?.length).toBeGreaterThanOrEqual(2);
  });
});

describe('JSON-LD @graph & Links Oficiais do Linklist', () => {
  it('Preserva todos os 5 links oficiais do Linklist no /bio', () => {
    expect(BIO_OFFICIAL_BOOK_LINKS).toHaveLength(5);
    const urls = BIO_OFFICIAL_BOOK_LINKS.map((b) => b.url);
    expect(urls).toEqual([
      'https://linklist.ai/jvdwwap-v7',
      'https://linklist.ai/frx8rsrbsm',
      'https://linklist.ai/tt2az12yrl',
      'https://linklist.ai/pxUa1dth4p',
      'https://linklist.ai/ed4sivfcwi',
    ]);
  });

  it('JSON-LD @graph da Home, Bio e Artigos contém entidades completas e Pixirica Tecnologias', () => {
    const homeGraph = buildHomeSchema(HOME_FAQ)['@graph'];
    const bioGraph = buildBioSchema(BIO_FAQ)['@graph'];
    const articleGraph = buildArticleSchema(ARTICLES[0])['@graph'];

    expect(JSON.stringify(homeGraph)).toContain('Pixirica Tecnologias');
    expect(JSON.stringify(homeGraph)).toContain('FAQPage');
    expect(JSON.stringify(homeGraph)).toContain('LegalService');
    expect(JSON.stringify(homeGraph)).toContain('WebSite');
    expect(JSON.stringify(homeGraph)).toContain('Person');

    expect(JSON.stringify(bioGraph)).toContain('ProfilePage');
    expect(JSON.stringify(bioGraph)).toContain('FAQPage');
    expect(JSON.stringify(articleGraph)).toContain('Article');
    expect(JSON.stringify(articleGraph)).toContain('BreadcrumbList');
  });
});
