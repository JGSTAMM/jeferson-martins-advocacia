import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  ChevronDown,
  Download,
  ExternalLink,
  Globe,
  Instagram,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { JsonLdScript } from '@/components/JsonLdScript';
import { MobileFloatingDock } from '@/components/MobileFloatingDock';
import { SiteHeader } from '@/components/SiteHeader';
import { ConstitutionalScene3D } from '@/components/three/ConstitutionalScene3D';
import { TiltCard3D } from '@/components/three/TiltCard3D';
import {
  BIO_FAQ,
  BIO_OFFICIAL_BOOK_LINKS,
  PAGE_METADATA,
  PRACTICE_AREAS,
  SITE_CONFIG,
} from '@/data/site-data';
import { buildPageMetadata } from '@/lib/metadata';
import { buildBioSchema } from '@/lib/schema';

export const metadata = buildPageMetadata({
  title: PAGE_METADATA.bio.title,
  description: PAGE_METADATA.bio.description,
  path: '/bio',
  keywords: [
    'Link na Bio Jeferson Martins',
    'linklist jefmartinss',
    'Livros Jeferson Gonçalves Martins',
    'WhatsApp Advogado Passo de Torres',
  ],
});

const TONE_BADGES = {
  crimson: 'border-crimson-bright/60 bg-crimson/35 text-ivory',
  gold: 'border-gold/50 bg-gold/15 text-gold-light',
  obsidian: 'border-white/25 bg-white/10 text-ivory',
} as const;

export default function BioPage() {
  const schema = buildBioSchema(BIO_FAQ);

  return (
    <>
      <JsonLdScript data={schema} />
      <SiteHeader activeRoute="bio" />

      <main className="relative min-h-screen overflow-hidden pb-32">
        <ConstitutionalScene3D variant="bio" className="opacity-50 sm:opacity-65" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/45 via-obsidian/75 to-obsidian"
        />

        <div className="relative z-10 mx-auto max-w-lg px-4 pt-8 sm:pt-12">
          {/* PROFILE CARD */}
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
              <div
                aria-hidden="true"
                className="animate-float-slow pointer-events-none absolute inset-0 rounded-full border border-dashed border-gold/55"
              />
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gold shadow-[0_0_24px_rgba(200,162,90,0.35)] sm:h-28 sm:w-28">
                <Image
                  src="/images/jeferson-bio.jpg"
                  alt="Foto oficial de perfil do Dr. Jeferson Gonçalves Martins, advogado OAB/SC 75.973 e escritor"
                  fill
                  priority
                  sizes="112px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{SITE_CONFIG.openingHoursLabel} • Passo de Torres, SC</span>
            </div>

            <h1
              id="bio-title"
              className="text-balance-heading mt-3 font-serif text-2xl leading-tight font-bold text-ivory sm:text-3xl"
            >
              Jeferson Martins — Advogado (OAB/SC 75.973) e Escritor
            </h1>

            <p className="text-pretty-body mt-2 max-w-sm text-xs leading-relaxed text-ivory/80 sm:text-sm">
              Mestrando em Direito (UNESC) • Especialista em Famílias &amp; Sucessões (ABDConst) •
              Autor de 3 Livros Publicados.
            </p>

            {/* PRIMARY ACTIONS */}
            <div className="mt-5 grid w-full gap-2.5">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gold to-[#A8823A] px-5 py-3 text-sm font-bold text-obsidian shadow-lg shadow-gold/15 transition-transform duration-150 hover:brightness-105 active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Atendimento Jurídico 24h (WhatsApp)</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-ivory transition-colors duration-150 hover:border-gold/50 hover:bg-white/10 active:scale-[0.98] sm:text-sm"
                >
                  <Globe className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span>Site Oficial</span>
                </Link>

                <a
                  href={SITE_CONFIG.vcardUrl}
                  download="jeferson-martins.vcf"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gold/40 bg-obsidian-soft px-4 py-2.5 text-xs font-semibold text-gold-light transition-colors duration-150 hover:border-gold hover:bg-gold/10 active:scale-[0.98] sm:text-sm"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Salvar Contato</span>
                </a>
              </div>
            </div>

            {/* VERIFIED SOCIAL CHANNELS */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 bg-obsidian/70 px-3 py-1 text-ivory/85 hover:border-gold/40 hover:text-gold-light"
              >
                <Instagram className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                <span>{SITE_CONFIG.instagramHandle}</span>
              </a>
              <a
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 bg-obsidian/70 px-3 py-1 text-ivory/85 hover:border-gold/40 hover:text-gold-light"
              >
                <span>Threads</span>
              </a>
              <a
                href={SITE_CONFIG.telUrl}
                className="tabular-nums-strict inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 bg-obsidian/70 px-3 py-1 text-ivory/85 hover:border-gold/40 hover:text-gold-light"
              >
                <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* OFFICIAL 5 BOOK LINKS */}
          <section aria-labelledby="bio-books-title" className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2
                id="bio-books-title"
                className="font-serif text-lg font-semibold text-ivory sm:text-xl"
              >
                Livros Publicados &amp; E-books
              </h2>
              <BookOpen className="h-4 w-4 text-gold" aria-hidden="true" />
            </div>

            <div className="space-y-2.5">
              {BIO_OFFICIAL_BOOK_LINKS.map((item) => (
                <TiltCard3D key={item.id} intensity={5} className="rounded-xl">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[64px] items-center justify-between gap-3 rounded-xl border border-gold/25 bg-obsidian-soft/95 p-3.5 shadow-md transition-colors duration-150 hover:border-gold hover:bg-[#161720] active:scale-[0.99]"
                  >
                    <div className="min-w-0">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium ${TONE_BADGES[item.tone]}`}
                      >
                        {item.tag}
                      </span>
                      <h3 className="mt-1 font-serif text-sm leading-snug font-semibold text-ivory group-hover:text-gold-light sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold-light transition-transform duration-150 group-hover:translate-x-0.5">
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </a>
                </TiltCard3D>
              ))}
            </div>
          </section>

          {/* QUICK LEGAL CONSULTATION ACCORDION */}
          <section aria-labelledby="bio-legal-title" className="mt-8">
            <h2
              id="bio-legal-title"
              className="font-serif text-lg font-semibold text-ivory sm:text-xl"
            >
              Atendimento Jurídico Especializado
            </h2>

            <div className="mt-3 space-y-2">
              <ul className="space-y-2">
                {PRACTICE_AREAS.map((area) => (
                  <li key={area.id}>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(
                        area.whatsappText,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-between gap-2.5 rounded-xl border border-white/10 bg-obsidian-soft/80 px-3.5 py-2.5 text-xs font-medium text-ivory transition-colors duration-150 hover:border-gold/45 hover:text-gold-light"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                        <span>{area.title}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-gold-light">
                        WhatsApp &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* OFFICIAL REPOSITORY & FAQ (COLLAPSIBLE FOR MAXIMUM CLEANLINESS & 100/100 SEO/GEO) */}
          <section aria-labelledby="bio-details-title" className="mt-8">
            <details className="group rounded-2xl border border-gold/20 bg-obsidian-soft/80 p-4 transition-colors duration-150 open:border-gold/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-serif text-sm font-semibold text-gold-light select-none">
                <span className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span id="bio-details-title">Informações Oficiais, Catálogo e Dúvidas Frequentes</span>
                </span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="mt-4 border-t border-white/10 pt-4 text-xs text-ivory/80">
                <p className="leading-relaxed">
                  O Dr. Jeferson Gonçalves Martins ({SITE_CONFIG.oab}) atua com escritório sediado
                  em Passo de Torres, Santa Catarina (CEP {SITE_CONFIG.postalCode}), atendendo de forma
                  presencial no Sul Catarinense e Litoral Norte Gaúcho (Passo de Torres, Torres/RS,
                  Sombrio, Araranguá e Criciúma) e de maneira integralmente digital através do Processo
                  Judicial Eletrônico (PJe e eproc) em todo o território nacional.
                </p>
                <p className="mt-2.5 leading-relaxed">
                  Com formação sólida pela Universidade do Extremo Sul Catarinense (UNESC), onde é mestrando
                  no Programa de Pós-Graduação em Direito com ênfase em Direitos Humanos e Constitucionalismo,
                  e especialização pela Academia Brasileira de Direito Constitucional (ABDConst), o profissional
                  alia prática combativa em Direito das Famílias, Inventários, Direito Médico, Biodireito, Civil
                  e Eleitoral à ampla produção bibliográfica reconhecida nacionalmente.
                </p>

                {/* SEMANTIC TABLE FOR GEO 100/100 */}
                <h3 className="mt-5 font-serif text-sm font-semibold text-ivory">
                  Tabela Resumo de Obras Publicadas e Acesso
                </h3>
                <div className="mt-2.5 overflow-x-auto rounded-xl border border-gold/25 bg-obsidian">
                  <table className="w-full min-w-[360px] border-collapse text-left text-[11px]">
                    <caption className="sr-only">
                      Catálogo oficial de livros e canais do Dr. Jeferson Martins
                    </caption>
                    <thead className="border-b border-gold/20 bg-crimson/20 text-gold-light uppercase">
                      <tr>
                        <th scope="col" className="px-3 py-2">
                          Obra
                        </th>
                        <th scope="col" className="px-3 py-2">
                          Formato
                        </th>
                        <th scope="col" className="px-3 py-2">
                          Canal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-ivory/80">
                      {BIO_OFFICIAL_BOOK_LINKS.map((item) => (
                        <tr key={item.id}>
                          <th scope="row" className="px-3 py-2 font-medium text-ivory">
                            {item.title}
                          </th>
                          <td className="px-3 py-2 text-gold-light">{item.format}</td>
                          <td className="px-3 py-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold-light underline underline-offset-2 hover:text-ivory"
                            >
                              Link Oficial
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* FAQ SECTION */}
                <h3 className="mt-5 font-serif text-sm font-semibold text-ivory">
                  Perguntas Frequentes (FAQ)
                </h3>
                <div className="mt-2 space-y-2.5">
                  {BIO_FAQ.map((faq) => (
                    <div key={faq.question} className="rounded-lg border border-white/5 bg-obsidian/60 p-3">
                      <p className="font-semibold text-gold-light">{faq.question}</p>
                      <p className="mt-1 leading-relaxed text-ivory/75">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </section>

          {/* COMPACT CLEAN FOOTER */}
          <footer className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] text-muted">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.brandName} • {SITE_CONFIG.oab}
            </p>
            <p className="mt-1 text-ivory/60">
              Passo de Torres, Santa Catarina — CEP {SITE_CONFIG.postalCode}
            </p>
            <p className="mt-2 font-medium text-gold-light/90">
              {SITE_CONFIG.creatorSignature}
            </p>
          </footer>
        </div>
      </main>

      <MobileFloatingDock activeRoute="bio" />
    </>
  );
}
