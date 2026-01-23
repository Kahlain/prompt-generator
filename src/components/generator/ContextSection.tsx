'use client';

import { useTranslations } from 'next-intl';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';
import { roles } from '@/lib/generator/formats';
import type { PromptFormData } from '@/lib/generator/promptBuilder';

interface ContextSectionProps {
  register: UseFormRegister<PromptFormData>;
  errors: FieldErrors<PromptFormData>;
}

export function ContextSection({ register, errors }: ContextSectionProps) {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-foreground">
          {t('form.context.title')}
        </h3>
        <Badge variant="default" className="bg-brand-terracotta text-white">
          {t('form.context.required')}
        </Badge>
      </div>

      {/* Role Field */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="role" className="text-sm font-medium">
            {t('form.context.role.label')}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('form.context.role.tooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="role"
          list="role-options"
          placeholder={t('form.context.role.placeholder')}
          className={`focus-ring transition-all duration-200 ${errors.role ? 'border-destructive' : ''}`}
          {...register('role', { required: true })}
        />
        <datalist id="role-options">
          {roles.map((role) => (
            <option key={role.id} value={t(role.nameKey)} />
          ))}
        </datalist>
        <p className="text-xs text-muted-foreground">
          {t('form.context.role.helper')}
        </p>
      </div>

      {/* Background Field */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="background" className="text-sm font-medium">
            {t('form.context.background.label')}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('form.context.background.tooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="background"
          placeholder={t('form.context.background.placeholder')}
          rows={4}
          className={`focus-ring transition-all duration-200 ${errors.background ? 'border-destructive' : ''}`}
          {...register('background', { required: true })}
        />
        <p className="text-xs text-muted-foreground">
          {t('form.context.background.helper')}
        </p>
      </div>

      {/* Task Field */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="task" className="text-sm font-medium">
            {t('form.context.task.label')}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('form.context.task.tooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="task"
          placeholder={t('form.context.task.placeholder')}
          rows={4}
          className={`focus-ring transition-all duration-200 ${errors.task ? 'border-destructive' : ''}`}
          {...register('task', { required: true })}
        />
        <p className="text-xs text-muted-foreground">
          {t('form.context.task.helper')}
        </p>
      </div>
    </div>
  );
}
