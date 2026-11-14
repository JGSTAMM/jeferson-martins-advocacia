import Link from 'next/link';
import { BookOpen, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ARTICLES, SITE_CONFIG } from '@/data/site-data';

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-[#07080B] pt-14 pb-36 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/45 bg-crimson/50 font-serif text-lg font-bold text-gold-light">
                JM
              </span>
              <div>
                <p className="font-serif text-lg font-semibold text-ivory">
                  {SITE_CONFIG.lawyerName}
                </p>
                <p className="font-mono text-xs text-gold">
                  Advogado • {SITE_CONFIG.oab}
                </p>
              </div>
            </div>
            <p className="text-pretty-body text-sm leading-relaxed text-muted">
              Advocacia estratégica em Direito das Famílias e Sucessões, Direito Médico e
              Biodireito Constitucional, Direito Civil e Direito Público, aliada à produção
              acadêmica e literária.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-ivory">
              Navegação do Escritório
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ivory/75">
              <li>
                <Link href="/" className="hover:text-gold-light">
                  Página Inicial — Escritório de Advocacia
                </Link>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light"
                >
                  Plantão Jurídico 24h (WhatsApp)
                </a>
              </li>
              <li>
                <a href="#atuacao" className="hover:text-gold-light">
                  Áreas de Atuação Jurídica
                </a>
              </li>
              <li>
                <a href="#obras" className="hover:text-gold-light">
                  Livros Publicados do Autor
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-light">
                  Perguntas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-ivory">
              Artigos Jurídicos
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ivory/75">
              {ARTICLES.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/artigos/${article.slug}`}
                    className="inline-flex items-start gap-1.5 hover:text-gold-light"
                  >
                    <BookOpen className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                    <span>{article.h1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-ivory">
              Localização &amp; Plantão 24h
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-ivory/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light"
                >
                  {SITE_CONFIG.city}, {SITE_CONFIG.state}, CEP {SITE_CONFIG.postalCode},{' '}
                  {SITE_CONFIG.countryName}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={SITE_CONFIG.telUrl} className="tabular-nums-strict hover:text-gold-light">
                  {SITE_CONFIG.phoneDisplay} ({SITE_CONFIG.openingHoursLabel})
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light"
                >
                  Atendimento via WhatsApp 24h
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light"
                >
                  Instagram {SITE_CONFIG.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName} ({SITE_CONFIG.oab}). Todos os
            direitos reservados.
          </p>
          <p className="font-medium text-gold-light/90">
            {SITE_CONFIG.creatorSignature}
          </p>
        </div>
      </div>
    </footer>
  );
}
