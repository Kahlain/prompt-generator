'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Sparkles } from 'lucide-react';

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Floating glass container */}
      <div className="mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-2xl border border-brand-deep-teal/10 dark:border-brand-warm-sand/10 bg-background/80 backdrop-blur-xl shadow-lg shadow-brand-deep-teal/5 dark:shadow-brand-warm-sand/5 overflow-hidden">
        {/* Animated gradient accent line at top */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-terracotta via-brand-warm-sand to-brand-deep-teal rounded-t-2xl animate-gradient-shift" />

        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo with hover glow */}
            <a
              href="https://inocta.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-brand-terracotta/0 group-hover:bg-brand-terracotta/10 transition-all duration-500 blur-xl" />
                <Image
                  src="/images/inocta-logo-color.png"
                  alt="Inocta"
                  width={110}
                  height={35}
                  className="h-8 sm:h-9 w-auto relative dark:hidden"
                  priority
                />
                <Image
                  src="/images/inocta-logo-white.png"
                  alt="Inocta"
                  width={110}
                  height={35}
                  className="h-8 sm:h-9 w-auto relative hidden dark:block"
                  priority
                />
              </div>
            </a>

            {/* Center: Title with sparkle accents */}
            <div className="hidden md:flex flex-col items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-terracotta animate-pulse" />
                <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-brand-deep-teal dark:text-brand-warm-sand">
                  {t('header.title')}
                </h1>
                <Sparkles className="h-4 w-4 text-brand-terracotta animate-pulse [animation-delay:500ms]" />
              </div>
              <p className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase mt-0.5">
                {t('header.subtitle')}
              </p>
            </div>

            {/* Right: Pill-shaped control group */}
            <div className="flex items-center">
              <div className="flex items-center bg-muted/50 rounded-xl p-1 border border-border/40 gap-0.5">
                <LanguageToggle />
                <div className="w-px h-5 bg-border/40" />
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile: Title row below */}
          <div className="md:hidden mt-3 pt-3 border-t border-border/20">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-brand-terracotta" />
              <h1 className="text-base font-semibold text-brand-deep-teal dark:text-brand-warm-sand">
                {t('header.title')}
              </h1>
              <Sparkles className="h-3 w-3 text-brand-terracotta" />
            </div>
            <p className="text-[9px] font-medium text-muted-foreground tracking-[0.15em] uppercase text-center mt-0.5">
              {t('header.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
