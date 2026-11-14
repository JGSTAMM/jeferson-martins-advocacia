import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/data/site-data';

interface FaqSectionProps {
  id?: string;
  heading: string;
  subtitle?: string;
  items: FaqItem[];
}

export function FaqSection({
  id = 'faq',
  heading,
  subtitle,
  items,
}: FaqSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10">
          <p className="font-mono text-xs tracking-widest text-gold uppercase">
            Esclarecimentos Jurídicos
          </p>
          <h2
            id={`${id}-title`}
            className="text-balance-heading mt-2 font-serif text-3xl font-semibold text-ivory sm:text-4xl"
          >
            {heading}
          </h2>
          {subtitle ? (
            <p className="text-pretty-body mt-3 text-base text-muted">{subtitle}</p>
          ) : null}
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <details
              key={item.question}
              open={idx === 0}
              className="group rounded-2xl border border-gold/20 bg-obsidian-soft/85 px-5 py-4 transition-colors duration-150 open:border-gold/45 open:bg-[#15161E]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold text-ivory select-none sm:text-xl">
                <span>{item.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="text-pretty-body mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-ivory/80 sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
