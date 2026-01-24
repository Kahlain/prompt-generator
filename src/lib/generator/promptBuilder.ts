import { generateBannedWordsSection, type BannedWordsSectionOptions } from './bannedWords';
import { isAiPickFramework } from './frameworks';

export interface PromptTemplateStrings {
  actAs: string;
  background: string;
  yourTask: string;
  tone: string;
  audience: string;
  geoContext: string;
  formats: string;
  writingFramework: string;
  reasoningFramework: string;
  variations: string;
  examples: string;
  beforeStarting: string;
  confirmInitiation: string;
  askClarification: string;
  suggestAnswers: string;
  postCreation: string;
  reviewOutput: string;
  openToIterations: string;
  testingPersonas: string;
  simulatePersonas: string;
  provideFeedback: string;
  otherConsiderations: string;
  geoConsideration: string;
  factualResponses: string;
  qualityStandards: string;
  geoBoostTitle: string;
  geoBoostStats: string;
  geoBoostCite: string;
  geoBoostLanguage: string;
  geoBoostStructure: string;
  geoBoostTerminology: string;
  geoBoostCoverage: string;
  geoBoostQuotable: string;
  bannedWordsAvoid: string;
  bannedWordsExclude: string;
  bannedWordsRemove: string;
}

export interface PromptFormData {
  // Required context fields
  role: string;
  background: string;
  task: string;
  // Optional refinement fields
  geoBoost?: boolean;
  tone?: string;
  audience?: string;
  audienceGeo?: string;
  contentFormats?: string;
  writingFramework?: string;
  writingFrameworkId?: string;
  reasoningFramework?: string;
  reasoningFrameworkId?: string;
  variations?: string;
  examples?: string;
}

export interface GeneratedPrompt {
  prompt: string;
  errors: string[];
}

/**
 * Transform the writing framework value based on selection
 */
function transformWritingFramework(
  framework: string | undefined,
  frameworkId: string | undefined,
  aiPickMessage: string
): string | undefined {
  if (!framework) return undefined;
  if (frameworkId && isAiPickFramework(frameworkId)) {
    return aiPickMessage;
  }
  return framework;
}

/**
 * Transform the reasoning framework value based on selection
 */
function transformReasoningFramework(
  framework: string | undefined,
  frameworkId: string | undefined,
  aiPickMessage: string
): string | undefined {
  if (!framework) return undefined;
  if (frameworkId && isAiPickFramework(frameworkId)) {
    return aiPickMessage;
  }
  return framework;
}

/**
 * Generate the GEO boost section for the prompt
 */
function generateGeoBoostSection(template: PromptTemplateStrings): string {
  return `
${template.geoBoostTitle}:
- ${template.geoBoostStats}
- ${template.geoBoostCite}
- ${template.geoBoostLanguage}
- ${template.geoBoostStructure}
- ${template.geoBoostTerminology}
- ${template.geoBoostCoverage}
- ${template.geoBoostQuotable}`;
}

interface AppendixOptions {
  includeGeoBoost: boolean;
  locale: 'en' | 'fr';
  template: PromptTemplateStrings;
}

/**
 * Generate the standard prompt appendix with instructions
 */
function generatePromptAppendix(options: AppendixOptions): string {
  const { includeGeoBoost, locale, template } = options;

  const bannedWordsSection = generateBannedWordsSection({
    locale,
    translations: {
      avoid: template.bannedWordsAvoid,
      exclude: template.bannedWordsExclude,
      remove: template.bannedWordsRemove,
    },
  });

  let appendix = `

${template.beforeStarting}:
- ${template.confirmInitiation}
- ${template.askClarification}
- ${template.suggestAnswers}

${template.postCreation}:
- ${template.reviewOutput}
- ${template.openToIterations}

${template.testingPersonas}:
- ${template.simulatePersonas}
- ${template.provideFeedback}

${template.otherConsiderations}:
- ${template.geoConsideration}
- ${template.factualResponses}

${template.qualityStandards}

${bannedWordsSection}`;

  if (includeGeoBoost) {
    appendix += generateGeoBoostSection(template);
  }

  return appendix;
}

export interface BuildPromptOptions {
  locale: 'en' | 'fr';
  promptTemplate: PromptTemplateStrings;
  aiPickWritingFramework: string;
  aiPickReasoningFramework: string;
  requiredFieldsError: (fields: string) => string;
  fieldLabels: {
    role: string;
    background: string;
    task: string;
  };
}

/**
 * Build the prompt from form data
 */
export function buildPrompt(
  data: PromptFormData,
  options: BuildPromptOptions
): GeneratedPrompt {
  const errors: string[] = [];
  const { locale, promptTemplate } = options;

  // Validate required fields
  const emptyFields: string[] = [];
  if (!data.role?.trim()) emptyFields.push(options.fieldLabels.role);
  if (!data.background?.trim()) emptyFields.push(options.fieldLabels.background);
  if (!data.task?.trim()) emptyFields.push(options.fieldLabels.task);

  if (emptyFields.length > 0) {
    return {
      prompt: '',
      errors: [options.requiredFieldsError(emptyFields.join(', '))],
    };
  }

  // Build the prompt
  const parts: string[] = [];

  // Required fields
  parts.push(`${promptTemplate.actAs} : ${data.role.trim()}`);
  parts.push(`${promptTemplate.background} : ${data.background.trim()}`);
  parts.push(`${promptTemplate.yourTask}: ${data.task.trim()}`);

  // Optional fields
  if (data.tone?.trim()) {
    parts.push(`${promptTemplate.tone}: ${data.tone.trim()}`);
  }

  if (data.audience?.trim()) {
    parts.push(`${promptTemplate.audience}: ${data.audience.trim()}`);
  }

  if (data.audienceGeo?.trim()) {
    parts.push(`${promptTemplate.geoContext}: ${data.audienceGeo.trim()}`);
  }

  if (data.contentFormats?.trim()) {
    parts.push(`${promptTemplate.formats}: ${data.contentFormats.trim()}`);
  }

  const writingFw = transformWritingFramework(
    data.writingFramework,
    data.writingFrameworkId,
    options.aiPickWritingFramework
  );
  if (writingFw) {
    parts.push(`${promptTemplate.writingFramework}: ${writingFw}`);
  }

  const reasoningFw = transformReasoningFramework(
    data.reasoningFramework,
    data.reasoningFrameworkId,
    options.aiPickReasoningFramework
  );
  if (reasoningFw) {
    parts.push(`${promptTemplate.reasoningFramework}: ${reasoningFw}`);
  }

  if (data.variations?.trim()) {
    parts.push(`${promptTemplate.variations}: ${data.variations.trim()}`);
  }

  if (data.examples?.trim()) {
    parts.push(`${promptTemplate.examples}: ${data.examples.trim()}`);
  }

  // Join parts and add appendix
  const prompt = parts.join('\n') + generatePromptAppendix({
    includeGeoBoost: data.geoBoost ?? false,
    locale,
    template: promptTemplate,
  });

  return {
    prompt,
    errors,
  };
}

/**
 * Get test data for development
 */
export function getTestData(): PromptFormData {
  return {
    role: 'Content Writer',
    background:
      'We are a leading technology company specializing in AI and machine learning solutions.',
    task: 'Write a blog post about the future of work in 2030.',
    tone: 'Informative',
    audience: 'Tech-savvy professionals',
    audienceGeo: 'Global audience',
    contentFormats: 'Blog post',
    writingFrameworkId: 'aiPick',
    reasoningFrameworkId: 'aiPick',
    variations: 'Limit to 800 words',
    examples: '',
  };
}
