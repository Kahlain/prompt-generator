'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/utils/clipboard';

interface OutputPanelProps {
  prompt: string;
}

export function OutputPanel({ prompt }: OutputPanelProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!prompt) return null;

  return (
    <Card className="border-brand-deep-teal/20 bg-card/50 backdrop-blur-sm animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-brand-deep-teal">
          {t('output.title')}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={cn(
            'gap-2 transition-all duration-200 btn-press',
            copied
              ? 'border-green-500/50 bg-green-50 dark:bg-green-900/20 animate-pulse-success'
              : 'border-brand-deep-teal/30 hover:bg-brand-deep-teal/10 hover:border-brand-deep-teal/50'
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600 dark:text-green-400 animate-bounce-in" />
              <span className="text-green-600 dark:text-green-400">{t('output.copied')}</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {t('output.copy')}
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea
          value={prompt}
          readOnly
          rows={20}
          className="font-mono text-sm bg-muted/30 resize-none transition-colors focus:bg-muted/50"
        />
      </CardContent>
    </Card>
  );
}
