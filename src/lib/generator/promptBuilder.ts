import { generateBannedWordsSection } from './bannedWords';
import { isAiPickFramework } from './frameworks';

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
function generateGeoBoostSection(): string {
  return `
##GEO Optimization Guidelines:
- Include specific statistics and data points from authoritative sources
- Cite credible references and studies where applicable
- Use clear, direct language that AI systems can easily parse
- Structure content with clear headings and logical flow
- Include relevant technical terminology naturally
- Provide comprehensive coverage of the topic
- Use quotable statements that can be easily extracted`;
}

/**
 * Generate the standard prompt appendix with instructions
 */
function generatePromptAppendix(includeGeoBoost: boolean): string {
  let appendix = `

##Before starting:
- Confirm initiation with me.
- Feel free to ask for clarification.
- Suggest potential answers for each query based on my context.

##Post-creation:
- I will review the initial output.
- Be open to iterations for refining the content.

##Testing on Personas:
- Simulate how three personas perceive the content.
- Provide feedback and suggestions.

##Other Considerations:
- Use the audience's geographical input to evaluate cultural tone adjustments, laws to highlight, or any other elements you need to consider.
- Ensure that the responses are grounded in verifiable facts and refrain from generating speculative or fictional content, prioritizing accuracy and reliability in the output

Focus on upholding the high-quality standards detailed above, respecting the token limit. Indicate the commencement of each phase for smooth collaboration. Bold any changes you suggest in the text.

${generateBannedWordsSection()}`;

  if (includeGeoBoost) {
    appendix += generateGeoBoostSection();
  }

  return appendix;
}

/**
 * Build the prompt from form data
 */
export function buildPrompt(
  data: PromptFormData,
  translations: {
    aiPickWritingFramework: string;
    aiPickReasoningFramework: string;
    requiredFieldsError: (fields: string) => string;
    fieldLabels: {
      role: string;
      background: string;
      task: string;
    };
  }
): GeneratedPrompt {
  const errors: string[] = [];

  // Validate required fields
  const emptyFields: string[] = [];
  if (!data.role?.trim()) emptyFields.push(translations.fieldLabels.role);
  if (!data.background?.trim()) emptyFields.push(translations.fieldLabels.background);
  if (!data.task?.trim()) emptyFields.push(translations.fieldLabels.task);

  if (emptyFields.length > 0) {
    return {
      prompt: '',
      errors: [translations.requiredFieldsError(emptyFields.join(', '))],
    };
  }

  // Build the prompt
  const parts: string[] = [];

  // Required fields
  parts.push(`Act as : ${data.role.trim()}`);
  parts.push(`Background : ${data.background.trim()}`);
  parts.push(`Your Task: ${data.task.trim()}`);

  // Optional fields
  if (data.tone?.trim()) {
    parts.push(`Tone: ${data.tone.trim()}`);
  }

  if (data.audience?.trim()) {
    parts.push(`Audience: ${data.audience.trim()}`);
  }

  if (data.audienceGeo?.trim()) {
    parts.push(`Geo Context: ${data.audienceGeo.trim()}`);
  }

  if (data.contentFormats?.trim()) {
    parts.push(`Formats: ${data.contentFormats.trim()}`);
  }

  const writingFw = transformWritingFramework(
    data.writingFramework,
    data.writingFrameworkId,
    translations.aiPickWritingFramework
  );
  if (writingFw) {
    parts.push(`Writing Framework: ${writingFw}`);
  }

  const reasoningFw = transformReasoningFramework(
    data.reasoningFramework,
    data.reasoningFrameworkId,
    translations.aiPickReasoningFramework
  );
  if (reasoningFw) {
    parts.push(`Reasoning Framework: ${reasoningFw}`);
  }

  if (data.variations?.trim()) {
    parts.push(`Content Variations & Limits: ${data.variations.trim()}`);
  }

  if (data.examples?.trim()) {
    parts.push(`Examples to Follow: ${data.examples.trim()}`);
  }

  // Join parts and add appendix
  const prompt = parts.join('\n') + generatePromptAppendix(data.geoBoost ?? false);

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
