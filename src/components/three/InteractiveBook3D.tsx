'use client';

import { useState, type MouseEvent } from 'react';
import { BookOpen, ExternalLink, Rotate3d } from 'lucide-react';
import type { PublishedBook } from '@/data/site-data';

interface InteractiveBook3DProps {
  book: PublishedBook;
}

type BookViewMode = 'cover' | 'spine' | 'back';

const VIEW_ANGLES: Record<BookViewMode, { x: number; y: number }> = {
  cover: { x: 6, y: -24 },
  spine: { x: 6, y: 38 },
  back: { x: 4, y: -160 },
};

const COVER_STYLES = {
  crimson: {
    front:
      'bg-gradient-to-br from-[#5A1116] via-[#3A0A0E] to-[#1A0507] border-gold/45',
    spine: 'bg-gradient-to-b from-[#450C11] to-[#230608] border-gold/40',
    badge: 'bg-gold/15 text-gold-light border-gold/40',
  },
  obsidian: {
    front:
      'bg-gradient-to-br from-[#191B22] via-[#101116] to-[#08090C] border-gold/40',
    spine: 'bg-gradient-to-b from-[#14161D] to-[#08090C] border-gold/35',
    badge: 'bg-crimson/35 text-ivory border-crimson-bright/50',
  },
  gold: {
    front:
      'bg-gradient-to-br from-[#2C2314] via-[#1B150C] to-[#0E0B07] border-gold/55',
    spine: 'bg-gradient-to-b from-[#3A2D18] to-[#19130A] border-gold/45',
    badge: 'bg-gold/20 text-gold-light border-gold/50',
  },
} as const;

export function InteractiveBook3D({ book }: InteractiveBook3DProps) {
  const [viewMode, setViewMode] = useState<BookViewMode>('cover');
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number } | null>(
    null,
  );

  const palette = COVER_STYLES[book.coverTone];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({
      x: Number((-ny * 14).toFixed(2)),
      y: Number((nx * 24).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset(null);
  };

  const cycleView = () => {
    setViewMode((prev) =>
      prev === 'cover' ? 'spine' : prev === 'spine' ? 'back' : 'cover',
    );
  };

  const baseAngle = VIEW_ANGLES[viewMode];
  const rotateX = baseAngle.x + (mouseOffset ? mouseOffset.x : 0);
  const rotateY = baseAngle.y + (mouseOffset ? mouseOffset.y : 0);

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-gold/20 bg-obsidian-soft/85 p-5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-6">
      <div>
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="perspective-1200 relative mx-auto mb-6 flex h-72 w-full flex-col items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-radial from-gold/12 via-transparent to-transparent px-4 py-4 select-none"
        >
          <div
            onClick={cycleView}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cycleView();
              }
            }}
            aria-label={`Girar modelo 3D do livro ${book.shortTitle}`}
            className="flex flex-1 cursor-pointer items-center justify-center focus:outline-2 focus:outline-gold"
          >
            {/* Watertight 152 x 220 x 30 px 3D Book Prism */}
            <div
              className={`preserve-3d relative h-[220px] w-[152px] transition-transform ${
                mouseOffset ? 'duration-100 ease-linear' : 'duration-500 ease-out'
              }`}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              {/* 1. Front Cover */}
              <div
                className={`backface-hidden absolute top-0 left-0 flex h-[220px] w-[152px] flex-col justify-between rounded-r-md border p-3.5 shadow-2xl ${palette.front}`}
                style={{ transform: 'translateZ(15px)' }}
              >
                <div className="flex items-center justify-between gap-1 border-b border-gold/25 pb-2">
                  <span className="font-mono text-[9px] tracking-widest text-gold uppercase">
                    {book.year}
                  </span>
                  <span className="truncate font-mono text-[8px] text-ivory/70 uppercase">
                    {book.category}
                  </span>
                </div>

                <div className="my-auto py-1">
                  <p className="font-serif text-[16px] leading-tight font-bold text-ivory">
                    {book.shortTitle}
                  </p>
                  <p className="mt-1.5 line-clamp-3 text-[10px] leading-snug text-ivory/75">
                    {book.subtitle}
                  </p>
                </div>

                <div className="border-t border-gold/25 pt-2">
                  <p className="font-mono text-[8px] tracking-wider text-gold-light uppercase">
                    Jeferson G. Martins
                  </p>
                </div>
              </div>

              {/* 2. Back Cover */}
              <div
                className={`backface-hidden absolute top-0 left-0 flex h-[220px] w-[152px] flex-col justify-between rounded-l-md border p-3.5 shadow-2xl ${palette.front}`}
                style={{ transform: 'translateZ(-15px) rotateY(180deg)' }}
              >
                <div className="border-b border-gold/25 pb-1.5">
                  <p className="font-mono text-[8px] tracking-wider text-gold uppercase">
                    Sinopse da Obra
                  </p>
                </div>

                <p className="line-clamp-6 text-[9.5px] leading-relaxed text-ivory/80">
                  {book.synopsis}
                </p>

                <div className="space-y-0.5 border-t border-gold/25 pt-2 font-mono text-[8px] text-gold-light">
                  <p className="truncate">{book.publisher}</p>
                  {book.isbnPrinted ? <p>ISBN {book.isbnPrinted}</p> : null}
                </div>
              </div>

              {/* 3. Left Spine */}
              <div
                className={`backface-hidden absolute top-0 left-0 flex h-[220px] w-[30px] items-center justify-center border-y border-l ${palette.spine}`}
                style={{ transform: 'translateX(-15px) rotateY(-90deg)' }}
              >
                <span
                  className="font-serif text-[10px] font-semibold tracking-wider whitespace-nowrap text-gold-light"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {book.shortTitle}
                </span>
              </div>

              {/* 4. Right Page Block (inset 4px from top/bottom and right cover edge) */}
              <div
                className="backface-hidden absolute top-[4px] left-0 h-[212px] w-[28px] border-y border-stone-400/50"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, #ece5d8 0px, #ece5d8 2px, #cfc4b0 3px)',
                  transform: 'translateX(134px) rotateY(90deg)',
                }}
              />

              {/* 5. Top Page Block */}
              <div
                className="backface-hidden absolute top-0 left-[2px] h-[28px] w-[146px] border-x border-stone-400/40"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, #ece5d8 0px, #ece5d8 2px, #cfc4b0 3px)',
                  transform: 'translateY(-10px) rotateX(90deg)',
                }}
              />

              {/* 6. Bottom Page Block */}
              <div
                className="backface-hidden absolute top-0 left-[2px] h-[28px] w-[146px] border-x border-stone-400/40"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, #ece5d8 0px, #ece5d8 2px, #cfc4b0 3px)',
                  transform: 'translateY(202px) rotateX(-90deg)',
                }}
              />
            </div>
          </div>

          {/* 3D Angle Selector Controls */}
          <div
            role="group"
            aria-label={`Controles de ângulo 3D para ${book.shortTitle}`}
            className="relative z-10 mt-2 flex items-center gap-1 rounded-full border border-gold/25 bg-obsidian/85 p-1 backdrop-blur-sm"
          >
            <Rotate3d className="mr-0.5 ml-1.5 h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {(
              [
                { id: 'cover', label: 'Capa' },
                { id: 'spine', label: 'Lombada' },
                { id: 'back', label: 'Contracapa' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setViewMode(opt.id)}
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors duration-150 ${
                  viewMode === opt.id
                    ? 'bg-gold font-semibold text-obsidian'
                    : 'text-ivory/80 hover:text-gold-light'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${palette.badge}`}
          >
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            {book.category}
          </span>
          <span className="font-mono text-xs text-muted">
            {book.publisher} • {book.year}
          </span>
        </div>

        <h3 className="text-balance-heading font-serif text-xl font-semibold text-ivory sm:text-2xl">
          {book.title}
        </h3>

        <p className="text-pretty-body mt-2.5 text-sm leading-relaxed text-ivory/80">
          {book.synopsis}
        </p>

        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-xs text-ivory/75">
          {book.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4">
        {book.links.map((link) => (
          <a
            key={link.linklistId}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-between gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 text-sm font-medium text-ivory transition-colors duration-150 hover:border-gold hover:bg-gold/20 active:scale-[0.99]"
          >
            <span>{link.label}</span>
            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-gold-light">
              {link.format}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
