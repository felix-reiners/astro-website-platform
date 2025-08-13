export interface BaseConfig {
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  languages: string[];
  defaultLanguage: string;
  keywords: string[];
  ogImage?: string;
}

export interface AppMarketingConfig extends BaseConfig {
  businessType: 'app-marketing';
  appStore: {
    ios?: string;
    android?: string;
    web?: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  pricing?: {
    tiers: Array<{
      name: string;
      price: number | string;
      period?: string;
      description?: string;
      features: string[];
      highlighted?: boolean;
      ctaText?: string;
    }>;
  };
  testimonials?: Array<{
    quote: string;
    author: string;
    title?: string;
    company?: string;
    rating?: number;
  }>;
}

export interface ConsultingConfig extends BaseConfig {
  businessType: 'consulting';
  services: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  team: Array<{
    name: string;
    role: string;
    bio: string;
    linkedin?: string;
    avatar?: string;
  }>;
  caseStudies: Array<{
    title: string;
    client: string;
    industry?: string;
    challenge: string;
    solution: string;
    results: string[];
    image?: string;
  }>;
  testimonials?: Array<{
    quote: string;
    author: string;
    title: string;
    company: string;
    rating?: number;
  }>;
}

export type SiteConfig = AppMarketingConfig | ConsultingConfig;

export const validateConfig = (config: any): config is SiteConfig => {
  const required = ['name', 'businessType', 'tagline', 'description', 'primaryColor', 'languages'];
  
  for (const field of required) {
    if (!config[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  if (!['app-marketing', 'consulting'].includes(config.businessType)) {
    throw new Error('businessType must be either "app-marketing" or "consulting"');
  }
  
  if (config.businessType === 'app-marketing') {
    if (!config.features || !Array.isArray(config.features)) {
      throw new Error('App marketing config must include features array');
    }
  }
  
  if (config.businessType === 'consulting') {
    if (!config.services || !Array.isArray(config.services)) {
      throw new Error('Consulting config must include services array');
    }
    if (!config.team || !Array.isArray(config.team)) {
      throw new Error('Consulting config must include team array');
    }
  }
  
  return true;
};

export const getTemplateDefaults = (businessType: 'app-marketing' | 'consulting') => {
  const base = {
    secondaryColor: businessType === 'app-marketing' ? 'blue' : 'slate',
    languages: ['en'],
    defaultLanguage: 'en',
    keywords: []
  };
  
  if (businessType === 'app-marketing') {
    return {
      ...base,
      appStore: {},
      features: [],
      pricing: { tiers: [] }
    };
  }
  
  return {
    ...base,
    services: [],
    team: [],
    caseStudies: []
  };
};

export const mergeWithDefaults = (config: Partial<SiteConfig>): SiteConfig => {
  if (!config.businessType) {
    throw new Error('businessType is required');
  }
  
  const defaults = getTemplateDefaults(config.businessType);
  return { ...defaults, ...config } as SiteConfig;
};