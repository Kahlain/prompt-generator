'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://inocta.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Image
              src="/images/inocta-logo-color.png"
              alt="Inocta"
              width={100}
              height={32}
              className="h-8 w-auto dark:hidden"
              priority
            />
            <Image
              src="/images/inocta-logo-white.png"
              alt="Inocta"
              width={100}
              height={32}
              className="h-8 w-auto hidden dark:block"
              priority
            />
          </a>
          <div className="hidden sm:block h-8 w-px bg-border/60" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">
              {t('header.title')}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {t('header.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
