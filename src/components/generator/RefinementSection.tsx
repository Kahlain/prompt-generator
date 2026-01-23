'use client';

import { useTranslations } from 'next-intl';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { tones, contentFormats, geographicRegions } from '@/lib/generator/formats';
import { writingFrameworks, reasoningFrameworks } from '@/lib/generator/frameworks';
import type { PromptFormData } from '@/lib/generator/promptBuilder';

interface RefinementSectionProps {
  register: UseFormRegister<PromptFormData>;
  watch: UseFormWatch<PromptFormData>;
  setValue: UseFormSetValue<PromptFormData>;
}

export function RefinementSection({ register, watch, setValue }: RefinementSectionProps) {
  const t = useTranslations();
  const writingFrameworkId = watch('writingFrameworkId');
  const reasoningFrameworkId = watch('reasoningFrameworkId');
  const toneValue = watch('tone');
  const contentFormatsValue = watch('contentFormats');
  const audienceGeoValue = watch('audienceGeo');

  return (
    <Accordion type="single" collapsible defaultValue="refinement" className="w-full">
      <AccordionItem value="refinement" className="border-none">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">
              {t('form.refinement.title')}
            </h3>
            <Badge variant="outline" className="text-muted-foreground">
              {t('form.refinement.optional')}
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-6 pt-2">
          {/* Tone Field */}
          <div className="space-y-2">
            <Label htmlFor="tone" className="text-sm font-medium">
              {t('form.refinement.tone.label')}
            </Label>
            <Combobox
              options={tones.map((tone) => ({
                value: tone.id,
                label: t(tone.nameKey),
              }))}
              value={toneValue || ''}
              onValueChange={(value) => setValue('tone', value)}
              placeholder={t('form.refinement.tone.placeholder')}
              searchPlaceholder={t('form.refinement.tone.placeholder')}
              allowCustomValue={true}
            />
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.tone.helper')}
            </p>
          </div>

          {/* Audience Field */}
          <div className="space-y-2">
            <Label htmlFor="audience" className="text-sm font-medium">
              {t('form.refinement.audience.label')}
            </Label>
            <Input
              id="audience"
              placeholder={t('form.refinement.audience.placeholder')}
              {...register('audience')}
            />
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.audience.helper')}
            </p>
          </div>

          {/* Audience Geo Field */}
          <div className="space-y-2">
            <Label htmlFor="audienceGeo" className="text-sm font-medium">
              {t('form.refinement.audienceGeo.label')}
            </Label>
            <Combobox
              options={geographicRegions.map((region) => ({
                value: region.id,
                label: t(region.nameKey),
              }))}
              value={audienceGeoValue || ''}
              onValueChange={(value) => setValue('audienceGeo', value)}
              placeholder={t('form.refinement.audienceGeo.placeholder')}
              searchPlaceholder={t('form.refinement.audienceGeo.placeholder')}
              allowCustomValue={true}
            />
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.audienceGeo.helper')}
            </p>
          </div>

          {/* Content Formats Field */}
          <div className="space-y-2">
            <Label htmlFor="contentFormats" className="text-sm font-medium">
              {t('form.refinement.contentFormats.label')}
            </Label>
            <Combobox
              options={contentFormats.map((format) => ({
                value: format.id,
                label: t(format.nameKey),
              }))}
              value={contentFormatsValue || ''}
              onValueChange={(value) => setValue('contentFormats', value)}
              placeholder={t('form.refinement.contentFormats.placeholder')}
              searchPlaceholder={t('form.refinement.contentFormats.placeholder')}
              allowCustomValue={true}
            />
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.contentFormats.helper')}
            </p>
          </div>

          {/* Writing Framework Field */}
          <div className="space-y-2">
            <Label htmlFor="writingFramework" className="text-sm font-medium">
              {t('form.refinement.writingFramework.label')}
            </Label>
            <Select
              value={writingFrameworkId}
              onValueChange={(value) => {
                setValue('writingFrameworkId', value);
                const fw = writingFrameworks.find((f) => f.id === value);
                if (fw) {
                  setValue('writingFramework', t(fw.nameKey));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('form.refinement.writingFramework.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {writingFrameworks.map((fw) => (
                  <SelectItem key={fw.id} value={fw.id}>
                    <div className="flex flex-col items-start">
                      <span>{t(fw.nameKey)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {writingFrameworkId && (
              <p className="text-xs text-muted-foreground italic">
                {t(
                  writingFrameworks.find((f) => f.id === writingFrameworkId)?.descriptionKey ?? ''
                )}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.writingFramework.helper')}
            </p>
          </div>

          {/* Reasoning Framework Field */}
          <div className="space-y-2">
            <Label htmlFor="reasoningFramework" className="text-sm font-medium">
              {t('form.refinement.reasoningFramework.label')}
            </Label>
            <Select
              value={reasoningFrameworkId}
              onValueChange={(value) => {
                setValue('reasoningFrameworkId', value);
                const fw = reasoningFrameworks.find((f) => f.id === value);
                if (fw) {
                  setValue('reasoningFramework', t(fw.nameKey));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('form.refinement.reasoningFramework.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {reasoningFrameworks.map((fw) => (
                  <SelectItem key={fw.id} value={fw.id}>
                    <div className="flex flex-col items-start">
                      <span>{t(fw.nameKey)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {reasoningFrameworkId && (
              <p className="text-xs text-muted-foreground italic">
                {t(
                  reasoningFrameworks.find((f) => f.id === reasoningFrameworkId)?.descriptionKey ??
                    ''
                )}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.reasoningFramework.helper')}
            </p>
          </div>

          {/* Variations Field */}
          <div className="space-y-2">
            <Label htmlFor="variations" className="text-sm font-medium">
              {t('form.refinement.variations.label')}
            </Label>
            <Input
              id="variations"
              placeholder={t('form.refinement.variations.placeholder')}
              {...register('variations')}
            />
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.variations.helper')}
            </p>
          </div>

          {/* Examples Field */}
          <div className="space-y-2">
            <Label htmlFor="examples" className="text-sm font-medium">
              {t('form.refinement.examples.label')}
            </Label>
            <Textarea
              id="examples"
              placeholder={t('form.refinement.examples.placeholder')}
              rows={3}
              {...register('examples')}
            />
            <p className="text-xs text-muted-foreground">
              {t('form.refinement.examples.helper')}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
