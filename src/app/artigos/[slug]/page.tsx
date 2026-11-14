import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { FaqSection } from '@/components/FaqSection';
import { JsonLdScript } from '@/components/JsonLdScript';
import { MobileFloatingDock } from '@/components/MobileFloatingDock';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { ARTICLES, SITE_CONFIG } from '@/data/site-data';
import { buildPageMetadata } from '@/lib/metadata';
import { buildArticleSchema } from '@/lib/schema';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return buildPageMetadata({
      title: 'Artigo Jurídico | Jeferson Martins Advocacia OAB/SC',
      description:
        'Publicação jurídica da Jeferson Gonçalves Martins Advocacia em Passo de Torres, Santa Catarina (OAB/SC 75.973).',
      path: `/artigos/${slug}`,
    });
  }

  return buildPageMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/artigos/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    keywords: [article.category, article.h1],
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const schema = buildArticleSchema(article);

  return (
    <>
      <JsonLdScript data={schema} />
      <SiteHeader activeRoute="article" />

      <main className="py-10 sm:py-16">
        <article className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold-light">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#artigos" className="hover:text-gold-light">
                  Artigos Jurídicos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-light">{article.category}</li>
            </ol>
          </nav>

          <header className="border-b border-gold/20 pb-8">
            <span className="inline-flex rounded-full border border-gold/35 bg-crimson/35 px-3 py-1 font-mono text-xs text-gold-light uppercase">
              {article.category}
            </span>

            <h1 className="text-balance-heading mt-4 font-serif text-3xl leading-tight font-bold text-ivory sm:text-4xl lg:text-5xl">
              {article.h1}
            </h1>

            <p className="text-pretty-body mt-4 text-base leading-relaxed text-ivory/80 sm:text-lg">
              {article.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
              <span className="font-medium text-ivory">
                Por {SITE_CONFIG.lawyerName} ({SITE_CONFIG.oab})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                Atualizado em {article.updatedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {article.readingTime}
              </span>
            </div>
          </header>

          <section
            aria-labelledby="takeaways-title"
            className="mt-8 rounded-2xl border border-gold/25 bg-obsidian-soft/90 p-5 sm:p-6"
          >
            <h2
              id="takeaways-title"
              className="font-serif text-xl font-semibold text-gold-light"
            >
              Pontos-Chave deste Estudo Jurídico
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ivory/85">
              {article.keyTakeaways.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-balance-heading font-serif text-2xl font-semibold text-ivory sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-ivory/85">
                    {p}
                  </p>
                ))}
                {section.subheadings?.map((sub) => (
                  <div key={sub.heading} className="mt-5 space-y-3 border-l-2 border-gold/40 pl-4">
                    <h3 className="font-serif text-xl font-semibold text-gold-light">
                      {sub.heading}
                    </h3>
                    {sub.paragraphs.map((sp) => (
                      <p key={sp} className="text-base leading-relaxed text-ivory/80">
                        {sp}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>

          <section aria-labelledby="article-table-title" className="mt-12">
            <h2
              id="article-table-title"
              className="font-serif text-2xl font-semibold text-ivory"
            >
              Quadro Comparativo Prático
            </h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-gold/25 bg-obsidian-soft">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="border-b border-gold/25 bg-crimson/25 text-xs text-gold-light uppercase">
                  <tr>
                    {article.comparisonTable.headers.map((header) => (
                      <th key={header} scope="col" className="px-4 py-3.5">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-ivory/85">
                  {article.comparisonTable.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, idx) =>
                        idx === 0 ? (
                          <th key={cell} scope="row" className="px-4 py-3.5 font-medium text-ivory">
                            {cell}
                          </th>
                        ) : (
                          <td key={cell} className="px-4 py-3.5">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-gold/35 bg-gradient-to-br from-crimson/30 to-obsidian-soft p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ivory">
              Precisa Analisar o seu Caso Concreto?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ivory/80 sm:text-base">
              Converse diretamente com o Dr. Jeferson Gonçalves Martins ({SITE_CONFIG.oab})
              pelo WhatsApp para avaliação jurídica personalizada em Passo de Torres (SC) ou
              atendimento online em todo o Brasil.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-[#A8823A] px-5 py-2.5 text-sm font-bold text-obsidian"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Agendar via WhatsApp 24h</span>
              </a>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-ivory hover:border-gold/50"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Voltar à Página Inicial</span>
              </Link>
            </div>
          </section>
        </article>

        <FaqSection
          id="article-faq"
          heading="Perguntas Frequentes sobre este Tema"
          items={article.faq}
        />
      </main>

      <SiteFooter />
      <MobileFloatingDock activeRoute="article" />
    </>
  );
}
