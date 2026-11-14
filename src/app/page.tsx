import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Clock,
  GraduationCap,
  HeartPulse,
  Instagram,
  Landmark,
  MapPin,
  MessageCircle,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { FaqSection } from '@/components/FaqSection';
import { JsonLdScript } from '@/components/JsonLdScript';
import { MobileFloatingDock } from '@/components/MobileFloatingDock';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { ConstitutionalScene3D } from '@/components/three/ConstitutionalScene3D';
import { InteractiveBook3D } from '@/components/three/InteractiveBook3D';
import { TiltCard3D } from '@/components/three/TiltCard3D';
import {
  ACADEMIC_CREDENTIALS,
  ARTICLES,
  HOME_FAQ,
  PAGE_METADATA,
  PRACTICE_AREAS,
  PUBLISHED_BOOKS,
  SERVICE_COMPARISON_TABLE,
  SITE_CONFIG,
  type PracticeArea,
} from '@/data/site-data';
import { buildPageMetadata } from '@/lib/metadata';
import { buildHomeSchema } from '@/lib/schema';

export const metadata = buildPageMetadata({
  title: PAGE_METADATA.home.title,
  description: PAGE_METADATA.home.description,
  path: '/',
  keywords: [
    'Advogado Passo de Torres',
    'OAB SC 75973',
    'Inventário Santa Catarina',
    'Testamento Vital',
    'Morte Digna Biodireito',
    'A Autobiografia de Uri',
    'Inacabavelmente Confuso',
  ],
});

function AreaIcon({ name }: { name: PracticeArea['iconName'] }) {
  switch (name) {
    case 'users':
      return <Users className="h-5 w-5 text-gold-light" aria-hidden="true" />;
    case 'heart-pulse':
      return <HeartPulse className="h-5 w-5 text-gold-light" aria-hidden="true" />;
    case 'landmark':
      return <Landmark className="h-5 w-5 text-gold-light" aria-hidden="true" />;
    default:
      return <Scale className="h-5 w-5 text-gold-light" aria-hidden="true" />;
  }
}

export default function HomePage() {
  const schema = buildHomeSchema(HOME_FAQ);

  return (
    <>
      <JsonLdScript data={schema} />
      <SiteHeader activeRoute="home" />

      <main className="relative overflow-hidden">
        {/* HERO SECTION WITH THREE.JS 3D SCENE */}
        <section
          aria-labelledby="hero-title"
          className="relative isolate border-b border-gold/15 pt-10 pb-16 sm:pt-16 sm:pb-24"
        >
          <ConstitutionalScene3D variant="hero" className="opacity-95 sm:opacity-100" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/20 via-obsidian/40 to-obsidian/95"
          />

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-gold/35 bg-obsidian-soft/90 px-3.5 py-1.5 text-xs font-medium text-gold-light backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>{SITE_CONFIG.oab}</span>
                <span className="text-gold/50">•</span>
                <span>Passo de Torres, SC</span>
                <span className="text-gold/50">•</span>
                <span>Plantão 24h</span>
              </div>

              <h1
                id="hero-title"
                className="text-balance-heading font-serif text-4xl leading-[1.08] font-bold tracking-tight text-ivory sm:text-5xl lg:text-[3.45rem]"
              >
                Jeferson Gonçalves Martins — Advocacia Estratégica em Passo de Torres, SC
              </h1>

              <p className="text-pretty-body mt-5 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg">
                Atuação jurídica rigorosa e humanizada em{' '}
                <strong className="font-semibold text-gold-light">
                  Direito das Famílias e Sucessões, Direito Médico e da Saúde, Biodireito
                  Constitucional, Civil e Direito Público
                </strong>
                . Mestrando em Direito (UNESC) e autor de obras jurídicas e literárias, com
                atendimento presencial no Sul de Santa Catarina e atuação digital em todo o
                Brasil.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gold to-[#A8823A] px-6 py-3 text-sm font-bold text-obsidian shadow-xl shadow-gold/15 transition-transform duration-150 hover:brightness-105 active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Agendar Atendimento Jurídico 24h</span>
                </a>

                <a
                  href="#atuacao"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gold/40 bg-obsidian-soft/85 px-6 py-3 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors duration-150 hover:border-gold hover:bg-gold/10 active:scale-[0.98]"
                >
                  <Scale className="h-4 w-4 text-gold-light" aria-hidden="true" />
                  <span>Conhecer Áreas de Atuação</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-obsidian-soft/75 p-3.5 backdrop-blur-sm">
                  <dt className="font-mono text-[11px] text-muted uppercase">Registro</dt>
                  <dd className="tabular-nums-strict mt-1 font-serif text-lg font-bold text-gold-light">
                    OAB/SC 75.973
                  </dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-obsidian-soft/75 p-3.5 backdrop-blur-sm">
                  <dt className="font-mono text-[11px] text-muted uppercase">Pesquisa</dt>
                  <dd className="mt-1 font-serif text-lg font-bold text-ivory">
                    Mestrando UNESC
                  </dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-obsidian-soft/75 p-3.5 backdrop-blur-sm">
                  <dt className="font-mono text-[11px] text-muted uppercase">Autoria</dt>
                  <dd className="tabular-nums-strict mt-1 font-serif text-lg font-bold text-ivory">
                    3 Livros
                  </dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-obsidian-soft/75 p-3.5 backdrop-blur-sm">
                  <dt className="font-mono text-[11px] text-muted uppercase">Disponibilidade</dt>
                  <dd className="mt-1 font-serif text-lg font-bold text-emerald-300">
                    Plantão 24h
                  </dd>
                </div>
              </dl>
            </div>

            {/* 3D Portrait Frame */}
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <TiltCard3D intensity={9} className="rounded-3xl">
                <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-obsidian-soft p-2.5 shadow-[0_32px_90px_-24px_rgba(107,20,26,0.55)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src="/images/jeferson-hero.jpg"
                      alt="Dr. Jeferson Gonçalves Martins, advogado OAB/SC 75.973 e escritor, sentado em seu escritório diante da biblioteca jurídica"
                      fill
                      priority
                      sizes="(max-width: 768px) 92vw, 420px"
                      className="object-cover object-top"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
                    />
                    <div className="absolute inset-x-4 bottom-4 rounded-xl border border-gold/30 bg-obsidian/85 p-3.5 backdrop-blur-md">
                      <p className="font-serif text-lg font-semibold text-ivory">
                        Dr. Jeferson Gonçalves Martins
                      </p>
                      <p className="mt-0.5 text-xs text-gold-light">
                        Advogado ({SITE_CONFIG.oab}) • Especialista ABDConst • Escritor
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </section>

        {/* PRACTICE AREAS (3D CARDS + SEMANTIC LIST) */}
        <section
          id="atuacao"
          aria-labelledby="atuacao-title"
          className="border-b border-white/10 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs tracking-widest text-gold uppercase">
                Atuação Jurídica Especializada
              </p>
              <h2
                id="atuacao-title"
                className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
              >
                Áreas de Atuação com Rigor Técnico e Acolhimento Humano
              </h2>
              <p className="text-pretty-body mt-3 text-base text-muted">
                Cada demanda é analisada sob sólida fundamentação constitucional, processual e
                multidisciplinar, buscando soluções seguras no âmbito extrajudicial ou judicial.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {PRACTICE_AREAS.map((area) => (
                <TiltCard3D
                  key={area.id}
                  intensity={7}
                  className="rounded-2xl border border-gold/20 bg-obsidian-soft/90 p-6 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-crimson/35">
                      <AreaIcon name={area.iconName} />
                    </div>
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold-light">
                      {area.badge}
                    </span>
                  </div>

                  <h3 className="text-balance-heading mt-4 font-serif text-2xl font-semibold text-ivory">
                    {area.title}
                  </h3>
                  <p className="text-pretty-body mt-2.5 text-sm leading-relaxed text-ivory/80">
                    {area.summary}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-ivory/75">
                    {area.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <ShieldCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-2">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(
                        area.whatsappText,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-light transition-colors duration-150 hover:text-ivory"
                    >
                      <span>Consultar sobre {area.shortTitle}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </div>
        </section>

        {/* SEMANTIC COMPARISON TABLE (MANDATORY FOR GEO / FEATURED SNIPPETS) */}
        <section
          aria-labelledby="modalidades-title"
          className="border-b border-white/10 bg-[#0D0E13] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 max-w-3xl">
              <p className="font-mono text-xs tracking-widest text-gold uppercase">
                Estrutura de Atendimento
              </p>
              <h2
                id="modalidades-title"
                className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
              >
                Modalidades de Atendimento e Consultoria Jurídica
              </h2>
              <p className="text-pretty-body mt-3 text-base text-muted">
                Comparativo objetivo dos formatos de atendimento presencial em Passo de Torres
                (SC) e digital em todo o Brasil.
              </p>
            </div>

            {/* Mobile Cards View (Fluid, highly readable, zero clipping) */}
            <div className="grid gap-4 md:hidden">
              {SERVICE_COMPARISON_TABLE.map((row) => (
                <div
                  key={row.modality}
                  className="rounded-2xl border border-gold/25 bg-obsidian-soft p-5 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-gold/15 pb-3">
                    <h3 className="font-serif text-lg font-semibold text-ivory">
                      {row.modality}
                    </h3>
                    <span className="shrink-0 rounded-full bg-crimson/35 px-2.5 py-0.5 font-mono text-[10px] text-gold-light">
                      {row.initialResponse}
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2.5 text-xs">
                    <div>
                      <span className="font-mono text-muted uppercase">Escopo: </span>
                      <span className="text-ivory/85">{row.scope}</span>
                    </div>
                    <div>
                      <span className="font-mono text-muted uppercase">Abrangência: </span>
                      <span className="font-medium text-gold-light">{row.coverage}</span>
                    </div>
                    <div>
                      <span className="font-mono text-muted uppercase">Indicado para: </span>
                      <span className="text-ivory/70">{row.audience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (Semantic HTML table for large screens & SEO/GEO) */}
            <div className="hidden overflow-x-auto rounded-2xl border border-gold/25 bg-obsidian-soft shadow-2xl md:block">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparativo das modalidades de atendimento jurídico da Jeferson Gonçalves
                  Martins Advocacia
                </caption>
                <thead className="border-b border-gold/25 bg-crimson/25 text-xs tracking-wider text-gold-light uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Modalidade
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Escopo de Atuação
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Abrangência Geográfica
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Retorno Inicial
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Público Indicado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-ivory/85">
                  {SERVICE_COMPARISON_TABLE.map((row) => (
                    <tr
                      key={row.modality}
                      className="transition-colors duration-150 hover:bg-white/[0.03]"
                    >
                      <th scope="row" className="px-5 py-4 font-serif text-base font-semibold text-ivory">
                        {row.modality}
                      </th>
                      <td className="px-5 py-4">{row.scope}</td>
                      <td className="px-5 py-4 text-gold-light">{row.coverage}</td>
                      <td className="px-5 py-4">{row.initialResponse}</td>
                      <td className="px-5 py-4 text-muted">{row.audience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ACADEMIC TRAJECTORY & MULTIDISCIPLINARY BIO */}
        <section
          id="trajetoria"
          aria-labelledby="trajetoria-title"
          className="border-b border-white/10 py-16 sm:py-20"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="grid grid-cols-2 gap-4">
              <TiltCard3D intensity={8} className="rounded-2xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gold/30 bg-obsidian-soft">
                  <Image
                    src="/images/jeferson-estante.jpg"
                    alt="Dr. Jeferson Martins em pé diante de estante com livros de Direito Civil, Famílias e Processo Civil"
                    fill
                    sizes="(max-width: 768px) 45vw, 240px"
                    className="object-cover object-top"
                  />
                </div>
              </TiltCard3D>
              <TiltCard3D intensity={8} className="mt-8 rounded-2xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gold/30 bg-obsidian-soft">
                  <Image
                    src="/images/jeferson-escritor.jpg"
                    alt="Jeferson Gonçalves Martins estudando e lendo em sua biblioteca particular"
                    fill
                    sizes="(max-width: 768px) 45vw, 240px"
                    className="object-cover object-top"
                  />
                </div>
              </TiltCard3D>
            </div>

            <div>
              <p className="font-mono text-xs tracking-widest text-gold uppercase">
                Autoridade Acadêmica &amp; Formação
              </p>
              <h2
                id="trajetoria-title"
                className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
              >
                Advocacia Sustentada por Pesquisa Constitucional e Visão Interdisciplinar
              </h2>
              <p className="text-pretty-body mt-4 text-base leading-relaxed text-ivory/80">
                A prática advocatícia de Jeferson Gonçalves Martins une a combatividade técnica
                dos tribunais à profundidade da pesquisa acadêmica em Direitos Humanos,
                Bioética, História e Economia.
              </p>

              <ol className="mt-7 space-y-4">
                {ACADEMIC_CREDENTIALS.map((cred) => (
                  <li
                    key={cred.title}
                    className="rounded-2xl border border-gold/20 bg-obsidian-soft/85 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-gold-light">
                        <GraduationCap className="h-4 w-4" aria-hidden="true" />
                        {cred.institution}
                      </span>
                      <span className="rounded-full bg-crimson/40 px-2.5 py-0.5 font-mono text-[11px] text-ivory">
                        {cred.period}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-semibold text-ivory">
                      {cred.title}
                    </h3>
                    <p className="text-pretty-body mt-1.5 text-sm text-muted">
                      {cred.focus}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3D INTERACTIVE BOOKS GALLERY */}
        <section
          id="obras"
          aria-labelledby="obras-title"
          className="border-b border-white/10 bg-[#0D0E13] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="font-mono text-xs tracking-widest text-gold uppercase">
                  Produção Jurídica &amp; Literária
                </p>
                <h2
                  id="obras-title"
                  className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
                >
                  Obras Publicadas — Inspecione os Livros em 3D
                </h2>
                <p className="text-pretty-body mt-3 text-base text-muted">
                  Passe o cursor (no desktop) ou toque em cada exemplar (no celular) para girar
                  a lombada em 3D e acessar os links oficiais nas versões impressa e e-book.
                </p>
              </div>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-gold/35 bg-obsidian-soft px-4 py-2.5 text-sm font-medium text-gold-light hover:border-gold hover:bg-gold/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Atendimento &amp; Dúvidas 24h</span>
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {PUBLISHED_BOOKS.map((book) => (
                <InteractiveBook3D key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

        {/* INDEXABLE LEGAL ARTICLES */}
        <section
          id="artigos"
          aria-labelledby="artigos-title"
          className="border-b border-white/10 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs tracking-widest text-gold uppercase">
                Publicações &amp; Conteúdo Técnico
              </p>
              <h2
                id="artigos-title"
                className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
              >
                Artigos Jurídicos e Guias Práticos para Cidadãos e Famílias
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="flex flex-col justify-between rounded-2xl border border-gold/20 bg-obsidian-soft/85 p-6 transition-colors duration-150 hover:border-gold/45"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-gold-light">
                      <span className="font-mono uppercase">{article.category}</span>
                      <span className="font-mono text-muted">{article.readingTime}</span>
                    </div>
                    <h3 className="text-balance-heading mt-3 font-serif text-xl font-semibold text-ivory">
                      <Link
                        href={`/artigos/${article.slug}`}
                        className="hover:text-gold-light"
                      >
                        {article.h1}
                      </Link>
                    </h3>
                    <p className="text-pretty-body mt-2.5 text-sm leading-relaxed text-ivory/75">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <Link
                      href={`/artigos/${article.slug}`}
                      className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-gold-light hover:text-ivory"
                    >
                      <span>Ler artigo completo</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LOCAL GEO-SEO SECTION (PASSO DE TORRES, SC) */}
        <section
          id="localizacao"
          aria-labelledby="localizacao-title"
          className="border-b border-white/10 bg-[#0D0E13] py-16 sm:py-20"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs tracking-widest text-gold uppercase">
                Presença Regional &amp; Digital
              </p>
              <h2
                id="localizacao-title"
                className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
              >
                Advocacia Sediada em Passo de Torres, SC — Atendimento 24 Horas
              </h2>
              <p className="text-pretty-body mt-4 text-base leading-relaxed text-ivory/80">
                Com sede estratégica na divisa entre Santa Catarina e Rio Grande do Sul, o
                escritório atende presencialmente clientes de Passo de Torres, Torres (RS),
                Sombrio, Araranguá e Criciúma, além de conduzir processos eletrônicos e
                consultorias jurídicas online em todo o Brasil.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-ivory/85">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    Passo de Torres, Santa Catarina — CEP {SITE_CONFIG.postalCode}, Brasil
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>Plantão jurídico 24 horas para urgências e consultas agendadas</span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>Inscrição ativa na Ordem dos Advogados: {SITE_CONFIG.oab}</span>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-[#A8823A] px-5 py-2.5 text-sm font-bold text-obsidian"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp {SITE_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gold/35 bg-obsidian-soft px-5 py-2.5 text-sm font-medium text-ivory hover:border-gold"
                >
                  <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span>Ver Localização no Mapa</span>
                </a>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-obsidian-soft px-5 py-2.5 text-sm font-medium text-ivory hover:border-gold/40"
                >
                  <Instagram className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span>{SITE_CONFIG.instagramHandle}</span>
                </a>
              </div>
            </div>

            <TiltCard3D
              intensity={6}
              className="rounded-3xl border border-gold/25 bg-obsidian-soft p-6 sm:p-8"
            >
              <p className="font-mono text-xs text-gold uppercase">
                Atendimento Direto &amp; Cartão Digital
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ivory">
                Precisa de Orientação Jurídica Agora?
              </h3>
              <p className="text-pretty-body mt-2 text-sm leading-relaxed text-muted">
                Salve o contato oficial do escritório no seu celular ou acesse o hub de links
                para conhecer todas as obras e canais de comunicação.
              </p>

              <div className="mt-6 grid gap-3">
                <a
                  href={SITE_CONFIG.vcardUrl}
                  download="jeferson-martins.vcf"
                  className="inline-flex min-h-12 items-center justify-between rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold-light hover:bg-gold/20"
                >
                  <span>Salvar Contato na Agenda (.vCard)</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-ivory hover:border-gold/40"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
                    <span>Plantão Jurídico via WhatsApp 24h</span>
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </TiltCard3D>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FaqSection
          id="faq"
          heading="Perguntas Frequentes sobre Atendimento e Obras"
          subtitle="Respostas diretas sobre consultas em Passo de Torres, atendimento digital nacional, documentos e publicações."
          items={HOME_FAQ}
        />
      </main>

      <SiteFooter />
      <MobileFloatingDock activeRoute="home" />
    </>
  );
}
