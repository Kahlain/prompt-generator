export interface ContentFormat {
  id: string;
  nameKey: string;
}

export const contentFormats: ContentFormat[] = [
  { id: 'blogPosts', nameKey: 'formats.blogPosts' },
  { id: 'bulletPoints', nameKey: 'formats.bulletPoints' },
  { id: 'caseStudies', nameKey: 'formats.caseStudies' },
  { id: 'codeBlocks', nameKey: 'formats.codeBlocks' },
  { id: 'ebooks', nameKey: 'formats.ebooks' },
  { id: 'emails', nameKey: 'formats.emails' },
  { id: 'howToGuides', nameKey: 'formats.howToGuides' },
  { id: 'infographics', nameKey: 'formats.infographics' },
  { id: 'json', nameKey: 'formats.json' },
  { id: 'markdownModel', nameKey: 'formats.markdownModel' },
  { id: 'newsletters', nameKey: 'formats.newsletters' },
  { id: 'podcastScripts', nameKey: 'formats.podcastScripts' },
  { id: 'pressReleases', nameKey: 'formats.pressReleases' },
  { id: 'productDescriptions', nameKey: 'formats.productDescriptions' },
  { id: 'qaFormats', nameKey: 'formats.qaFormats' },
  { id: 'slides', nameKey: 'formats.slides' },
  { id: 'socialMediaPosts', nameKey: 'formats.socialMediaPosts' },
  { id: 'userManuals', nameKey: 'formats.userManuals' },
  { id: 'videoScript', nameKey: 'formats.videoScript' },
  { id: 'webinars', nameKey: 'formats.webinars' },
  { id: 'whitepapers', nameKey: 'formats.whitepapers' },
];

export interface Role {
  id: string;
  nameKey: string;
}

export const roles: Role[] = [
  { id: 'digitalMarketing', nameKey: 'roles.digitalMarketing' },
  { id: 'softwareEngineer', nameKey: 'roles.softwareEngineer' },
  { id: 'cfo', nameKey: 'roles.cfo' },
  { id: 'socialMedia', nameKey: 'roles.socialMedia' },
  { id: 'contentWriter', nameKey: 'roles.contentWriter' },
  { id: 'artDirector', nameKey: 'roles.artDirector' },
  { id: 'customerSupport', nameKey: 'roles.customerSupport' },
  { id: 'dataScientist', nameKey: 'roles.dataScientist' },
  { id: 'productManager', nameKey: 'roles.productManager' },
  { id: 'uxDesigner', nameKey: 'roles.uxDesigner' },
  { id: 'businessAnalyst', nameKey: 'roles.businessAnalyst' },
  { id: 'hrManager', nameKey: 'roles.hrManager' },
  { id: 'projectManager', nameKey: 'roles.projectManager' },
  { id: 'salesRepresentative', nameKey: 'roles.salesRepresentative' },
  { id: 'brandStrategist', nameKey: 'roles.brandStrategist' },
  { id: 'copywriter', nameKey: 'roles.copywriter' },
  { id: 'seoSpecialist', nameKey: 'roles.seoSpecialist' },
  { id: 'publicRelations', nameKey: 'roles.publicRelations' },
  { id: 'operationsManager', nameKey: 'roles.operationsManager' },
  { id: 'technicalWriter', nameKey: 'roles.technicalWriter' },
  { id: 'graphicDesigner', nameKey: 'roles.graphicDesigner' },
  { id: 'videoProducer', nameKey: 'roles.videoProducer' },
  { id: 'communityManager', nameKey: 'roles.communityManager' },
  { id: 'ecommerceManager', nameKey: 'roles.ecommerceManager' },
  { id: 'consultant', nameKey: 'roles.consultant' },
  { id: 'educator', nameKey: 'roles.educator' },
  { id: 'researcher', nameKey: 'roles.researcher' },
  { id: 'journalist', nameKey: 'roles.journalist' },
  { id: 'editor', nameKey: 'roles.editor' },
  { id: 'legalCounsel', nameKey: 'roles.legalCounsel' },
  { id: 'accountant', nameKey: 'roles.accountant' },
  { id: 'executiveAssistant', nameKey: 'roles.executiveAssistant' },
  { id: 'eventPlanner', nameKey: 'roles.eventPlanner' },
  { id: 'customerSuccessManager', nameKey: 'roles.customerSuccessManager' },
];

export interface Tone {
  id: string;
  nameKey: string;
}

export const tones: Tone[] = [
  { id: 'informative', nameKey: 'tones.informative' },
  { id: 'persuasive', nameKey: 'tones.persuasive' },
  { id: 'entertaining', nameKey: 'tones.entertaining' },
  { id: 'educational', nameKey: 'tones.educational' },
];

export interface GeographicRegion {
  id: string;
  nameKey: string;
}

export const geographicRegions: GeographicRegion[] = [
  { id: 'global', nameKey: 'geoRegions.global' },
  { id: 'northAmerica', nameKey: 'geoRegions.northAmerica' },
  { id: 'europe', nameKey: 'geoRegions.europe' },
  { id: 'asiaPacific', nameKey: 'geoRegions.asiaPacific' },
  { id: 'latinAmerica', nameKey: 'geoRegions.latinAmerica' },
  { id: 'middleEast', nameKey: 'geoRegions.middleEast' },
  { id: 'africa', nameKey: 'geoRegions.africa' },
  { id: 'usaCanada', nameKey: 'geoRegions.usaCanada' },
  { id: 'ukIreland', nameKey: 'geoRegions.ukIreland' },
  { id: 'frenchSpeaking', nameKey: 'geoRegions.frenchSpeaking' },
  { id: 'germanSpeaking', nameKey: 'geoRegions.germanSpeaking' },
  { id: 'spanishSpeaking', nameKey: 'geoRegions.spanishSpeaking' },
];
