'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateStats, formatNumber, type PromptStats } from '@/lib/utils/tokenCounter';

interface StatsPanelProps {
  prompt: string;
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 transition-colors hover:bg-muted/20 rounded px-2 -mx-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export function StatsPanel({ prompt }: StatsPanelProps) {
  const t = useTranslations();

  if (!prompt) return null;

  const stats: PromptStats = calculateStats(prompt);

  return (
    <Card className="border-brand-warm-sand/30 bg-card/50 backdrop-blur-sm animate-fade-in-up stagger-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-brand-warm-sand flex items-center gap-2">
          {t('stats.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <StatItem label={t('stats.tokens')} value={formatNumber(stats.tokens)} />
          <StatItem label={t('stats.characters')} value={formatNumber(stats.characters)} />
          <StatItem label={t('stats.words')} value={formatNumber(stats.words)} />
          <StatItem
            label={t('stats.avgTokenLength')}
            value={`${stats.avgTokenLength} characters`}
          />
        </div>

        <div className="space-y-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
          <p>
            <strong>Note 1:</strong> {t('stats.note1')}
          </p>
          <p>
            <strong>Note 2:</strong> {t('stats.note2')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
