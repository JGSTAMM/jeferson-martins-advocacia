import Link from 'next/link';
import { Home, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-data';

interface MobileFloatingDockProps {
  activeRoute: 'home' | 'bio' | 'article';
}

export function MobileFloatingDock({ activeRoute }: MobileFloatingDockProps) {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-3 md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2 rounded-2xl border border-gold/35 bg-obsidian/95 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.85)] backdrop-blur-lg">
        {activeRoute === 'bio' ? (
          <Link
            href="/"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-ivory transition-colors duration-150 active:scale-[0.97]"
          >
            <Home className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>Ver Site</span>
          </Link>
        ) : activeRoute === 'article' ? (
          <Link
            href="/"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-ivory transition-colors duration-150 active:scale-[0.97]"
          >
            <Home className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>Início</span>
          </Link>
        ) : (
          <a
            href={SITE_CONFIG.telUrl}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-ivory transition-colors duration-150 active:scale-[0.97]"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>Ligar Agora</span>
          </a>
        )}

        <a
          href={SITE_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 flex-[1.45] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-[#A8823A] px-4 py-2 text-xs font-bold text-obsidian shadow-md transition-transform duration-150 active:scale-[0.97]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>WhatsApp 24h</span>
        </a>
      </div>
    </div>
  );
}
