export interface Framework {
  id: string;
  nameKey: string;
  descriptionKey: string;
}

export const writingFrameworks: Framework[] = [
  {
    id: 'aiPick',
    nameKey: 'frameworks.writing.aiPick.name',
    descriptionKey: 'frameworks.writing.aiPick.description',
  },
  {
    id: 'threeAct',
    nameKey: 'frameworks.writing.threeAct.name',
    descriptionKey: 'frameworks.writing.threeAct.description',
  },
  {
    id: 'fiveWs',
    nameKey: 'frameworks.writing.fiveWs.name',
    descriptionKey: 'frameworks.writing.fiveWs.description',
  },
  {
    id: 'aida',
    nameKey: 'frameworks.writing.aida.name',
    descriptionKey: 'frameworks.writing.aida.description',
  },
  {
    id: 'fab',
    nameKey: 'frameworks.writing.fab.name',
    descriptionKey: 'frameworks.writing.fab.description',
  },
  {
    id: 'gps',
    nameKey: 'frameworks.writing.gps.name',
    descriptionKey: 'frameworks.writing.gps.description',
  },
  {
    id: 'pas',
    nameKey: 'frameworks.writing.pas.name',
    descriptionKey: 'frameworks.writing.pas.description',
  },
  {
    id: 'slap',
    nameKey: 'frameworks.writing.slap.name',
    descriptionKey: 'frameworks.writing.slap.description',
  },
  {
    id: 'stori',
    nameKey: 'frameworks.writing.stori.name',
    descriptionKey: 'frameworks.writing.stori.description',
  },
];

export const reasoningFrameworks: Framework[] = [
  {
    id: 'aiPick',
    nameKey: 'frameworks.reasoning.aiPick.name',
    descriptionKey: 'frameworks.reasoning.aiPick.description',
  },
  {
    id: 'chainOfThought',
    nameKey: 'frameworks.reasoning.chainOfThought.name',
    descriptionKey: 'frameworks.reasoning.chainOfThought.description',
  },
  {
    id: 'iterative',
    nameKey: 'frameworks.reasoning.iterative.name',
    descriptionKey: 'frameworks.reasoning.iterative.description',
  },
  {
    id: 'qStar',
    nameKey: 'frameworks.reasoning.qStar.name',
    descriptionKey: 'frameworks.reasoning.qStar.description',
  },
  {
    id: 'reflective',
    nameKey: 'frameworks.reasoning.reflective.name',
    descriptionKey: 'frameworks.reasoning.reflective.description',
  },
  {
    id: 'summarization',
    nameKey: 'frameworks.reasoning.summarization.name',
    descriptionKey: 'frameworks.reasoning.summarization.description',
  },
];

export function isAiPickFramework(frameworkId: string): boolean {
  return frameworkId === 'aiPick';
}
