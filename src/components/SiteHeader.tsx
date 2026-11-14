import Link from 'next/link';
import { MessageCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-data';

interface SiteHeaderProps {
  activeRoute: 'home' | 'bio' | 'article';
}

export function SiteHeader({ activeRoute }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-obsidian/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-3 rounded-lg focus:outline-2 focus:outline-gold"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/45 bg-gradient-to-br from-crimson/70 to-obsidian font-serif text-lg font-bold text-gold-light shadow-inner transition-transform duration-150 group-hover:scale-105">
            JM
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-base leading-tight font-semibold whitespace-nowrap text-ivory sm:text-lg">
              Jeferson Martins
            </span>
            <span className="font-mono text-[10px] tracking-wider whitespace-nowrap text-gold uppercase">
              {SITE_CONFIG.oab}
            </span>
          </span>
        </Link>

        {activeRoute !== 'bio' ? (
          <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
            <a
              href="#atuacao"
              className="text-sm font-medium text-ivory/80 transition-colors duration-150 hover:text-gold-light"
            >
              Áreas de Atuação
            </a>
            <a
              href="#obras"
              className="text-sm font-medium text-ivory/80 transition-colors duration-150 hover:text-gold-light"
            >
              Obras Publicadas
            </a>
            <a
              href="#artigos"
              className="text-sm font-medium text-ivory/80 transition-colors duration-150 hover:text-gold-light"
            >
              Artigos
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-ivory/80 transition-colors duration-150 hover:text-gold-light"
            >
              Dúvidas
            </a>
          </nav>
        ) : null}

        <div className="flex shrink-0 items-center gap-2">
          {activeRoute === 'bio' ? (
            <Link
              href="/"
              className="hidden sm:inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl border border-gold/30 bg-obsidian-soft px-3.5 py-2 text-xs font-medium whitespace-nowrap text-gold-light transition-colors duration-150 hover:border-gold hover:bg-gold/10 sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Site Completo</span>
            </Link>
          ) : null}

          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-gold to-[#A8823A] px-3 py-2 text-xs font-bold text-obsidian shadow-lg shadow-gold/10 transition-transform duration-150 hover:brightness-105 active:scale-[0.97] sm:px-4 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Atendimento 24h</span>
            <span className="sm:hidden">Plantão 24h</span>
          </a>
        </div>
      </div>
    </header>
  );
}
