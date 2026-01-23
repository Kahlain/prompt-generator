export interface PromptStats {
  tokens: number;
  characters: number;
  words: number;
  avgTokenLength: string;
}

/**
 * Simple tokenizer that splits on whitespace and punctuation.
 * This provides an approximate token count similar to OpenAI's tokenizer.
 */
function simpleTokenize(text: string): string[] {
  return text.toLowerCase().match(/\b[\w']+\b|[.,!?;:'"()\[\]{}]/g) || [];
}

/**
 * Calculate statistics for a given text
 */
export function calculateStats(text: string): PromptStats {
  const tokens = simpleTokenize(text);
  const tokenCount = tokens.length;
  const characters = text.length;
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;
  const avgTokenLength = tokenCount > 0 ? characters / tokenCount : 0;

  return {
    tokens: tokenCount,
    characters,
    words,
    avgTokenLength: avgTokenLength.toFixed(1),
  };
}

/**
 * Format a number with comma separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}
