'use client';

import { useTranslations } from 'next-intl';
import { Header, Footer } from '@/components/layout';
import { PromptForm } from '@/components/generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Copy,
  ClipboardPaste,
  MessageSquare,
  CheckCircle2,
  Brain,
  Users,
  FileText,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero / Intro Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-deep-teal/5 to-transparent py-12 md:py-16">
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
          <div className="container mx-auto px-4 max-w-4xl relative">
            <div className="text-center space-y-4 animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-deep-teal">
                {t('header.title')}
              </h1>
              <p className="text-lg text-brand-terracotta font-medium">
                {t('header.subtitle')}
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('header.tagline')}
              </p>
            </div>
          </div>
        </section>

        {/* What is This Tool Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-brand-warm-sand/30 bg-card/50 backdrop-blur interactive-card">
              <CardHeader>
                <CardTitle className="text-xl text-brand-deep-teal flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-terracotta animate-pulse" />
                  {t('intro.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('intro.paragraph1')}</p>
                <p>{t('intro.paragraph2')}</p>
                <p>{t('intro.paragraph3')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <PromptForm />
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-brand-deep-teal mb-8 text-center">
              {t('usage.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UsageStep
                icon={<Copy className="h-6 w-6" />}
                title={t('usage.step1.title')}
                description={t('usage.step1.description')}
                step={1}
              />
              <UsageStep
                icon={<ClipboardPaste className="h-6 w-6" />}
                title={t('usage.step2.title')}
                description={t('usage.step2.description')}
                step={2}
              />
              <UsageStep
                icon={<MessageSquare className="h-6 w-6" />}
                title={t('usage.step3.title')}
                description={t('usage.step3.description')}
                step={3}
              />
              <UsageStep
                icon={<CheckCircle2 className="h-6 w-6" />}
                title={t('usage.step4.title')}
                description={t('usage.step4.description')}
                step={4}
              />
            </div>
            <p className="mt-8 text-sm text-muted-foreground text-center italic">
              {t('usage.note')}
            </p>
          </div>
        </section>

        {/* Techniques Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-brand-deep-teal mb-4 text-center">
              {t('techniques.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {t('techniques.intro')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TechniqueCard
                icon={<Brain className="h-5 w-5" />}
                title={t('techniques.framework.title')}
                description={t('techniques.framework.description')}
                index={1}
              />
              <TechniqueCard
                icon={<Users className="h-5 w-5" />}
                title={t('techniques.audience.title')}
                description={t('techniques.audience.description')}
                index={2}
              />
              <TechniqueCard
                icon={<FileText className="h-5 w-5" />}
                title={t('techniques.directives.title')}
                description={t('techniques.directives.description')}
                index={3}
              />
              <TechniqueCard
                icon={<RefreshCw className="h-5 w-5" />}
                title={t('techniques.feedback.title')}
                description={t('techniques.feedback.description')}
                index={4}
              />
              <TechniqueCard
                icon={<Sparkles className="h-5 w-5" />}
                title={t('techniques.language.title')}
                description={t('techniques.language.description')}
                index={5}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-brand-deep-teal mb-8 text-center">
              {t('faq.title')}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1" className="border-brand-deep-teal/20">
                <AccordionTrigger className="text-left hover:text-brand-deep-teal">
                  {t('faq.q1.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('faq.q1.answer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="border-brand-deep-teal/20">
                <AccordionTrigger className="text-left hover:text-brand-deep-teal">
                  {t('faq.q2.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('faq.q2.answer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="border-brand-deep-teal/20">
                <AccordionTrigger className="text-left hover:text-brand-deep-teal">
                  {t('faq.q3.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('faq.q3.answer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function UsageStep({
  icon,
  title,
  description,
  step,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}) {
  return (
    <Card className={`border-brand-deep-teal/10 interactive-card animate-fade-in-up stagger-${step}`}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-deep-teal/10 flex items-center justify-center text-brand-deep-teal transition-transform group-hover:scale-110">
            <span className="text-lg font-bold">{step}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-terracotta">
              {icon}
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TechniqueCard({
  icon,
  title,
  description,
  index = 1,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <Card className={`border-brand-warm-sand/30 interactive-card animate-fade-in-scale stagger-${index}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-brand-deep-teal mb-2">
          <span className="transition-transform hover:scale-110">{icon}</span>
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
