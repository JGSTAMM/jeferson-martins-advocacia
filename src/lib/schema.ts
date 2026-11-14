import {
  PRACTICE_AREAS,
  PUBLISHED_BOOKS,
  SITE_CONFIG,
  type ArticleData,
  type FaqItem,
} from '@/data/site-data';

function getBaseGraphEntities(pageUrl: string) {
  const baseUrl = SITE_CONFIG.defaultSiteUrl;

  const creatorOrg = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#pixirica-tecnologias`,
    name: SITE_CONFIG.creatorName,
  };

  const organization = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: SITE_CONFIG.brandName,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/icon.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      SITE_CONFIG.instagramUrl,
      SITE_CONFIG.threadsUrl,
      SITE_CONFIG.linklistUrl,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${SITE_CONFIG.phoneRaw}`,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.city,
      addressRegion: SITE_CONFIG.state,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: SITE_CONFIG.country,
    },
    creator: { '@id': `${baseUrl}/#pixirica-tecnologias` },
    publisher: { '@id': `${baseUrl}/#pixirica-tecnologias` },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE_CONFIG.brandName,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${baseUrl}/#pixirica-tecnologias` },
    creator: { '@id': `${baseUrl}/#pixirica-tecnologias` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const attorneyPerson = {
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: SITE_CONFIG.lawyerName,
    alternateName: SITE_CONFIG.displayName,
    jobTitle: SITE_CONFIG.roleSummary,
    url: pageUrl,
    image: `${baseUrl}/images/jeferson-hero.jpg`,
    sameAs: [
      SITE_CONFIG.instagramUrl,
      SITE_CONFIG.threadsUrl,
      SITE_CONFIG.linklistUrl,
    ],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'UNESC — Universidade do Extremo Sul Catarinense' },
      { '@type': 'EducationalOrganization', name: 'ABDConst — Academia Brasileira de Direito Constitucional' },
      { '@type': 'CollegeOrUniversity', name: 'UNIVALI — Universidade do Vale do Itajaí' },
      { '@type': 'CollegeOrUniversity', name: 'UNISUL — Universidade do Sul de Santa Catarina' },
    ],
    knowsAbout: [
      'Direito das Famílias e Sucessões',
      'Biodireito Constitucional',
      'Direito Médico e da Saúde',
      'Direito Civil e Processo Civil',
      'Direito Público e Eleitoral',
      'Direitos Humanos',
    ],
  };

  const legalService = {
    '@type': ['LegalService', 'Attorney', 'LocalBusiness'],
    '@id': `${baseUrl}/#legalservice`,
    name: SITE_CONFIG.brandName,
    image: `${baseUrl}/images/og-cover.jpg`,
    url: baseUrl,
    telephone: '+55-48-92001-7268',
    priceRange: '$$',
    hasMap: SITE_CONFIG.googleMapsUrl,
    openingHours: 'Mo-Su 00:00-23:59',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.city,
      addressRegion: SITE_CONFIG.state,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: SITE_CONFIG.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.latitude,
      longitude: SITE_CONFIG.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Passo de Torres' },
      { '@type': 'State', name: 'Santa Catarina' },
      { '@type': 'State', name: 'Rio Grande do Sul' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços Jurídicos Especializados',
      itemListElement: PRACTICE_AREAS.map((area) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: area.title,
          description: area.summary,
        },
      })),
    },
    founder: { '@id': `${baseUrl}/#person` },
    creator: { '@id': `${baseUrl}/#pixirica-tecnologias` },
    publisher: { '@id': `${baseUrl}/#pixirica-tecnologias` },
  };

  const books = PUBLISHED_BOOKS.map((book) => ({
    '@type': 'Book',
    '@id': `${baseUrl}/#book-${book.id}`,
    name: book.title,
    author: { '@id': `${baseUrl}/#person` },
    publisher: {
      '@type': 'Organization',
      name: book.publisher,
    },
    datePublished: book.year,
    ...(book.isbnPrinted ? { isbn: book.isbnPrinted } : {}),
    inLanguage: 'pt-BR',
    url: book.links[0]?.url,
    description: book.synopsis,
  }));

  return {
    creatorOrg,
    organization,
    website,
    attorneyPerson,
    legalService,
    books,
  };
}

export function buildHomeSchema(faqItems: FaqItem[]) {
  const baseUrl = SITE_CONFIG.defaultSiteUrl;
  const entities = getBaseGraphEntities(baseUrl);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      entities.creatorOrg,
      entities.organization,
      entities.website,
      entities.attorneyPerson,
      entities.legalService,
      ...entities.books,
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildBioSchema(faqItems: FaqItem[]) {
  const baseUrl = SITE_CONFIG.defaultSiteUrl;
  const bioUrl = `${baseUrl}/bio`;
  const entities = getBaseGraphEntities(bioUrl);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      entities.creatorOrg,
      entities.organization,
      entities.website,
      entities.attorneyPerson,
      entities.legalService,
      ...entities.books,
      {
        '@type': 'ProfilePage',
        '@id': `${bioUrl}/#profile`,
        url: bioUrl,
        name: 'Links Oficiais e Obras — Dr. Jeferson Martins',
        mainEntity: { '@id': `${baseUrl}/#person` },
        creator: { '@id': `${baseUrl}/#pixirica-tecnologias` },
        publisher: { '@id': `${baseUrl}/#pixirica-tecnologias` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${bioUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildArticleSchema(article: ArticleData) {
  const baseUrl = SITE_CONFIG.defaultSiteUrl;
  const articleUrl = `${baseUrl}/artigos/${article.slug}`;
  const entities = getBaseGraphEntities(articleUrl);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      entities.creatorOrg,
      entities.organization,
      entities.website,
      entities.attorneyPerson,
      entities.legalService,
      {
        '@type': 'Article',
        '@id': `${articleUrl}/#article`,
        headline: article.h1,
        description: article.seoDescription,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'pt-BR',
        author: { '@id': `${baseUrl}/#person` },
        publisher: { '@id': `${baseUrl}/#pixirica-tecnologias` },
        creator: { '@id': `${baseUrl}/#pixirica-tecnologias` },
        mainEntityOfPage: articleUrl,
        image: `${baseUrl}/images/og-cover.jpg`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Artigos Jurídicos',
            item: `${baseUrl}/#artigos`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.h1,
            item: articleUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}/#faq`,
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}
