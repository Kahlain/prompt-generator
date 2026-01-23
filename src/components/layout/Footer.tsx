'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <a
            href="https://inocta.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-deep-teal transition-colors group"
          >
            <span>{t('footer.poweredBy')}</span>
            <Image
              src="/images/inocta-logo-color.png"
              alt="Inocta"
              width={70}
              height={22}
              className="h-5 w-auto opacity-70 group-hover:opacity-100 transition-opacity dark:hidden"
            />
            <Image
              src="/images/inocta-logo-white.png"
              alt="Inocta"
              width={70}
              height={22}
              className="h-5 w-auto opacity-70 group-hover:opacity-100 transition-opacity hidden dark:block"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
