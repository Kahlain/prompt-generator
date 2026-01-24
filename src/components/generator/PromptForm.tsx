'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sparkles, RotateCcw, FlaskConical, Loader2 } from 'lucide-react';
import { ContextSection } from './ContextSection';
import { RefinementSection } from './RefinementSection';
import { OutputPanel } from './OutputPanel';
import { StatsPanel } from './StatsPanel';
import { buildPrompt, getTestData, type PromptFormData } from '@/lib/generator/promptBuilder';

const formSchema = z.object({
  role: z.string().min(1),
  background: z.string().min(1),
  task: z.string().min(1),
  geoBoost: z.boolean().optional(),
  tone: z.string().optional(),
  audience: z.string().optional(),
  audienceGeo: z.string().optional(),
  contentFormats: z.string().optional(),
  writingFramework: z.string().optional(),
  writingFrameworkId: z.string().optional(),
  reasoningFramework: z.string().optional(),
  reasoningFrameworkId: z.string().optional(),
  variations: z.string().optional(),
  examples: z.string().optional(),
});

export function PromptForm() {
  const t = useTranslations();
  const locale = useLocale() as 'en' | 'fr';
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PromptFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      background: '',
      task: '',
      geoBoost: true, // Always on - GEO optimization is enabled by default
      tone: '',
      audience: '',
      audienceGeo: '',
      contentFormats: '',
      writingFramework: '',
      writingFrameworkId: '',
      reasoningFramework: '',
      reasoningFrameworkId: '',
      variations: '',
      examples: '',
    },
  });

  const onSubmit = useCallback(
    async (data: PromptFormData) => {
      setError(null);
      setIsGenerating(true);

      // Small delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      const result = buildPrompt(data, {
        locale,
        promptTemplate: {
          actAs: t('prompt.actAs'),
          background: t('prompt.background'),
          yourTask: t('prompt.yourTask'),
          tone: t('prompt.tone'),
          audience: t('prompt.audience'),
          geoContext: t('prompt.geoContext'),
          formats: t('prompt.formats'),
          writingFramework: t('prompt.writingFramework'),
          reasoningFramework: t('prompt.reasoningFramework'),
          variations: t('prompt.variations'),
          examples: t('prompt.examples'),
          beforeStarting: t('prompt.beforeStarting'),
          confirmInitiation: t('prompt.confirmInitiation'),
          askClarification: t('prompt.askClarification'),
          suggestAnswers: t('prompt.suggestAnswers'),
          postCreation: t('prompt.postCreation'),
          reviewOutput: t('prompt.reviewOutput'),
          openToIterations: t('prompt.openToIterations'),
          testingPersonas: t('prompt.testingPersonas'),
          simulatePersonas: t('prompt.simulatePersonas'),
          provideFeedback: t('prompt.provideFeedback'),
          otherConsiderations: t('prompt.otherConsiderations'),
          geoConsideration: t('prompt.geoConsideration'),
          factualResponses: t('prompt.factualResponses'),
          qualityStandards: t('prompt.qualityStandards'),
          geoBoostTitle: t('prompt.geoBoostTitle'),
          geoBoostStats: t('prompt.geoBoostStats'),
          geoBoostCite: t('prompt.geoBoostCite'),
          geoBoostLanguage: t('prompt.geoBoostLanguage'),
          geoBoostStructure: t('prompt.geoBoostStructure'),
          geoBoostTerminology: t('prompt.geoBoostTerminology'),
          geoBoostCoverage: t('prompt.geoBoostCoverage'),
          geoBoostQuotable: t('prompt.geoBoostQuotable'),
          bannedWordsAvoid: t('prompt.bannedWordsAvoid'),
          bannedWordsExclude: t('prompt.bannedWordsExclude'),
          bannedWordsRemove: t('prompt.bannedWordsRemove'),
        },
        aiPickWritingFramework: t('frameworks.writing.aiPick.description'),
        aiPickReasoningFramework: t('frameworks.reasoning.aiPick.description'),
        requiredFieldsError: (fields: string) =>
          t('form.validation.required', { fields }),
        fieldLabels: {
          role: t('form.context.role.label'),
          background: t('form.context.background.label'),
          task: t('form.context.task.label'),
        },
      });

      setIsGenerating(false);

      if (result.errors.length > 0) {
        setError(result.errors[0]);
        return;
      }

      setGeneratedPrompt(result.prompt);

      // Scroll to output after a brief delay
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },
    [t, locale]
  );

  const handleReset = useCallback(() => {
    reset();
    setGeneratedPrompt('');
    setError(null);
  }, [reset]);

  const handleTestData = useCallback(() => {
    const testData = getTestData();
    Object.entries(testData).forEach(([key, value]) => {
      setValue(key as keyof PromptFormData, value);
    });
  }, [setValue]);

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-brand-deep-teal/20 shadow-lg">
          <CardContent className="pt-6">
            <ContextSection register={register} errors={errors} />

            <Separator className="my-8" />

            <RefinementSection register={register} watch={watch} setValue={setValue} />

            {error && (
              <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                type="submit"
                disabled={isGenerating}
                className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white gap-2 btn-press transition-all duration-200 min-w-[140px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="animate-pulse">...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {t('form.actions.generate')}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isGenerating}
                className="gap-2 btn-press transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4" />
                {t('form.actions.reset')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleTestData}
                disabled={isGenerating}
                className="gap-2 text-muted-foreground btn-press transition-all duration-200"
              >
                <FlaskConical className="h-4 w-4" />
                {t('form.actions.testData')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {generatedPrompt && (
        <div
          ref={outputRef}
          className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <OutputPanel prompt={generatedPrompt} />
          <StatsPanel prompt={generatedPrompt} />
        </div>
      )}
    </div>
  );
}
