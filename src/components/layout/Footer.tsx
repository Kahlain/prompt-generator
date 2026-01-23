'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 overflow-hidden">
      {/* Full-bleed dark section with editorial styling */}
      <div className="bg-brand-deep-teal dark:bg-brand-midnight">
        {/* Decorative top edge with gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-warm-sand/50 to-transparent" />

        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 relative">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left: Branding tagline */}
            <div className="text-center md:text-left">
              <p className="text-brand-off-white/60 text-xs tracking-[0.2em] uppercase font-medium">
                AI on Strong Process
              </p>
            </div>

            {/* Center: Logo and powered by */}
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://inocta.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <span className="text-brand-off-white/70 text-sm font-medium group-hover:text-brand-warm-sand transition-colors">
                  {t('footer.poweredBy')}
                </span>
                <div className="relative">
                  <div className="absolute -inset-2 rounded-lg bg-brand-warm-sand/0 group-hover:bg-brand-warm-sand/10 transition-all duration-500 blur-lg" />
                  <Image
                    src="/images/inocta-logo-white.png"
                    alt="Inocta"
                    width={80}
                    height={26}
                    className="h-6 w-auto relative opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <ExternalLink className="h-3 w-3 text-brand-off-white/40 group-hover:text-brand-warm-sand transition-colors" />
              </a>
            </div>

            {/* Right: Made with love */}
            <div className="flex items-center justify-center md:justify-end gap-1.5 text-brand-off-white/50 text-xs">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-brand-terracotta fill-brand-terracotta animate-pulse" />
              <span>in Toronto</span>
            </div>
          </div>

          {/* Bottom bar with copyright */}
          <div className="mt-8 pt-6 border-t border-brand-off-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-brand-off-white/40 text-xs">
                &copy; {currentYear} {t('footer.copyright')}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-brand-off-white/30 text-[10px] tracking-wider uppercase">
                  Prompt Engineering Made Simple
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
