import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/site-data';

interface BuildPageMetadataParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
}: BuildPageMetadataParams): Metadata {
  const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.defaultSiteUrl}${normalizedPath === '/' ? '' : normalizedPath}`;
  const ogCoverUrl = `${SITE_CONFIG.defaultSiteUrl}/images/og-cover.jpg`;
  const ogSquareUrl = `${SITE_CONFIG.defaultSiteUrl}/images/og-square.jpg`;

  return {
    title,
    description,
    keywords: [
      'Jeferson Gonçalves Martins',
      'Jeferson Martins Advogado',
      'OAB/SC 75.973',
      'Advogado Passo de Torres SC',
      'Direito das Famílias e Sucessões',
      'Biodireito Constitucional',
      'Direito Médico e da Saúde',
      'Pixirica Tecnologias',
      ...keywords,
    ],
    authors: [{ name: SITE_CONFIG.lawyerName, url: SITE_CONFIG.defaultSiteUrl }],
    creator: SITE_CONFIG.creatorName,
    publisher: SITE_CONFIG.creatorName,
    alternates: {
      canonical: normalizedPath,
      languages: {
        'pt-BR': normalizedPath,
        'x-default': normalizedPath,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'pt_BR',
      url: canonicalUrl,
      siteName: SITE_CONFIG.brandName,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: ogCoverUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.lawyerName} (${SITE_CONFIG.oab}) — Advocacia e Obras Publicadas`,
          type: 'image/jpeg',
        },
        {
          url: ogSquareUrl,
          width: 600,
          height: 600,
          alt: `${SITE_CONFIG.lawyerName} (${SITE_CONFIG.oab})`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.instagramHandle,
      images: [ogCoverUrl],
    },
    other: {
      'geo.region': `${SITE_CONFIG.country}-${SITE_CONFIG.state}`,
      'geo.placename': `${SITE_CONFIG.city}, ${SITE_CONFIG.stateName}, ${SITE_CONFIG.countryName}`,
      'geo.position': `${SITE_CONFIG.latitude};${SITE_CONFIG.longitude}`,
      ICBM: `${SITE_CONFIG.latitude}, ${SITE_CONFIG.longitude}`,
    },
  };
}
