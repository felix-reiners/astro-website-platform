export interface ContentGenerationConfig {
  businessType: 'app-marketing' | 'consulting';
  industry?: string;
  targetAudience?: string;
  toneOfVoice?: 'professional' | 'friendly' | 'technical' | 'casual';
  language?: string;
  apiKey?: string;
}

export interface GeneratedContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    secondaryCtaText?: string;
  };
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  services?: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  testimonials?: Array<{
    quote: string;
    author: string;
    title: string;
    company: string;
    rating: number;
  }>;
  caseStudies?: Array<{
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
  }>;
  pricing?: {
    tiers: Array<{
      name: string;
      price: number | string;
      period?: string;
      description: string;
      features: string[];
      highlighted?: boolean;
    }>;
  };
}

class ContentGenerator {
  private config: ContentGenerationConfig;

  constructor(config: ContentGenerationConfig) {
    this.config = config;
  }

  // Generate hero section content
  async generateHero(companyName: string, productName?: string): Promise<GeneratedContent['hero']> {
    if (this.config.apiKey) {
      return this.generateWithAI('hero', { companyName, productName });
    }
    
    // Fallback static generation
    return this.generateStaticHero(companyName, productName);
  }

  // Generate features for app marketing
  async generateFeatures(appCategory?: string): Promise<GeneratedContent['features']> {
    if (this.config.apiKey) {
      return this.generateWithAI('features', { appCategory });
    }
    
    return this.generateStaticFeatures(appCategory);
  }

  // Generate services for consulting
  async generateServices(focusAreas?: string[]): Promise<GeneratedContent['services']> {
    if (this.config.apiKey) {
      return this.generateWithAI('services', { focusAreas });
    }
    
    return this.generateStaticServices(focusAreas);
  }

  // Generate testimonials
  async generateTestimonials(count: number = 3): Promise<GeneratedContent['testimonials']> {
    if (this.config.apiKey) {
      return this.generateWithAI('testimonials', { count });
    }
    
    return this.generateStaticTestimonials(count);
  }

  // Generate case studies for consulting
  async generateCaseStudies(count: number = 2): Promise<GeneratedContent['caseStudies']> {
    if (this.config.apiKey) {
      return this.generateWithAI('caseStudies', { count });
    }
    
    return this.generateStaticCaseStudies(count);
  }

  // Generate pricing tiers
  async generatePricing(basePrice?: number): Promise<GeneratedContent['pricing']> {
    if (this.config.apiKey) {
      return this.generateWithAI('pricing', { basePrice });
    }
    
    return this.generateStaticPricing(basePrice);
  }

  // AI-powered generation (placeholder for Claude API integration)
  private async generateWithAI(contentType: string, context: any): Promise<any> {
    // This would integrate with Claude API when available
    const prompt = this.buildPrompt(contentType, context);
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          prompt,
          businessType: this.config.businessType,
          language: this.config.language || 'en',
          toneOfVoice: this.config.toneOfVoice || 'professional'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.content;
      }
    } catch (error) {
      console.warn('AI generation failed, falling back to static content:', error);
    }
    
    // Fallback to static generation
    return this.generateStaticContent(contentType, context);
  }

  // Build AI prompts
  private buildPrompt(contentType: string, context: any): string {
    const baseContext = `
      Business Type: ${this.config.businessType}
      Industry: ${this.config.industry || 'General'}
      Target Audience: ${this.config.targetAudience || 'Business professionals'}
      Tone: ${this.config.toneOfVoice || 'Professional'}
      Language: ${this.config.language || 'English'}
    `;

    const prompts = {
      hero: `${baseContext}
        Create a compelling hero section for ${context.companyName}${context.productName ? ` (${context.productName})` : ''}.
        Generate: title (max 60 chars), subtitle (max 160 chars), primary CTA, secondary CTA.
        Focus on benefits and emotional connection.`,
        
      features: `${baseContext}
        Generate 6 key features for a ${context.appCategory || 'productivity'} app.
        Each feature should have: emoji icon, title (max 25 chars), description (max 80 chars).
        Focus on user benefits and practical value.`,
        
      services: `${baseContext}
        Generate ${this.config.businessType === 'consulting' ? '6 consulting services' : '4 app features'}.
        Focus areas: ${context.focusAreas?.join(', ') || 'general business needs'}.
        Each should have: emoji icon, title, description, 3-5 bullet point features.`,
        
      testimonials: `${baseContext}
        Generate ${context.count} realistic customer testimonials.
        Include: quote (authentic language), author name, title, company.
        Make them specific and credible, avoid generic praise.`,
        
      caseStudies: `${baseContext}
        Generate ${context.count} detailed case studies.
        Each should have: title, client (anonymized), industry, challenge, solution, 3-4 quantified results.
        Make results realistic and specific.`,
        
      pricing: `${baseContext}
        Generate 3-tier pricing structure${context.basePrice ? ` around $${context.basePrice}` : ''}.
        Include: tier names, prices, descriptions, 4-6 features per tier.
        Make middle tier most attractive (highlighted).`
    };

    return prompts[contentType] || prompts.hero;
  }

  // Static content generation fallbacks
  private generateStaticHero(companyName: string, productName?: string): GeneratedContent['hero'] {
    const templates = {
      'app-marketing': {
        title: `Experience ${productName || companyName}`,
        subtitle: `The ${this.config.industry || 'productivity'} app that transforms how you work and live. Join thousands of users who've already made the switch.`,
        ctaText: 'Download Free',
        secondaryCtaText: 'Watch Demo'
      },
      consulting: {
        title: `Transform Your Business with ${companyName}`,
        subtitle: `Expert ${this.config.industry || 'business'} consulting services to accelerate your growth and digital transformation. Get results that matter.`,
        ctaText: 'Schedule Consultation',
        secondaryCtaText: 'View Case Studies'
      }
    };
    
    return templates[this.config.businessType];
  }

  private generateStaticFeatures(appCategory?: string): GeneratedContent['features'] {
    const featureTemplates = {
      productivity: [
        { icon: '⚡', title: 'Lightning Fast', description: 'Optimized performance for instant results and smooth workflows' },
        { icon: '🔒', title: 'Bank-Level Security', description: 'Your data protected with enterprise-grade encryption' },
        { icon: '🌍', title: 'Works Everywhere', description: 'Available on iOS, Android, and web platforms' },
        { icon: '🤝', title: 'Team Collaboration', description: 'Real-time collaboration tools for seamless teamwork' },
        { icon: '📊', title: 'Smart Analytics', description: 'Insights and reporting to track your progress and goals' },
        { icon: '🔄', title: 'Auto Sync', description: 'Automatic synchronization across all your devices' }
      ],
      business: [
        { icon: '📈', title: 'Growth Analytics', description: 'Advanced metrics to track and optimize business performance' },
        { icon: '🔗', title: 'CRM Integration', description: 'Seamless integration with your existing business tools' },
        { icon: '🏢', title: 'Enterprise Ready', description: 'Scalable solution built for businesses of all sizes' },
        { icon: '👥', title: 'Team Management', description: 'Comprehensive user management and permission controls' },
        { icon: '📱', title: 'Mobile First', description: 'Full-featured mobile apps for on-the-go productivity' },
        { icon: '🛡️', title: 'Compliance Ready', description: 'GDPR, SOX, and industry compliance built-in' }
      ]
    };
    
    return featureTemplates[appCategory] || featureTemplates.productivity;
  }

  private generateStaticServices(focusAreas?: string[]): GeneratedContent['services'] {
    return [
      {
        icon: '☁️',
        title: 'Cloud Transformation',
        description: 'Seamlessly migrate to cloud infrastructure with zero downtime and optimized costs.',
        features: [
          'AWS, Azure, GCP expertise',
          'Zero-downtime migration strategy', 
          'Cost optimization analysis',
          'Security compliance audit',
          'Performance monitoring setup'
        ]
      },
      {
        icon: '🚀',
        title: 'Digital Strategy',
        description: 'Develop comprehensive digital transformation strategies aligned with business objectives.',
        features: [
          'Digital maturity assessment',
          'Technology roadmap planning',
          'Change management support',
          'Stakeholder alignment',
          'Success metrics definition'
        ]
      },
      {
        icon: '🤖',
        title: 'AI Implementation',
        description: 'Leverage artificial intelligence to automate processes and gain competitive advantages.',
        features: [
          'Custom AI solution development',
          'Machine learning model training',
          'Process automation design',
          'Data pipeline optimization',
          'ROI measurement framework'
        ]
      },
      {
        icon: '🔒',
        title: 'Cybersecurity',
        description: 'Protect your organization with comprehensive security strategies and implementations.',
        features: [
          'Security audit and assessment',
          'Compliance framework setup',
          'Incident response planning',
          'Team security training',
          'Ongoing monitoring services'
        ]
      }
    ];
  }

  private generateStaticTestimonials(count: number): GeneratedContent['testimonials'] {
    const templates = {
      'app-marketing': [
        {
          quote: "This app has completely transformed my daily workflow. I'm 40% more productive and love the intuitive interface.",
          author: "Sarah Chen",
          title: "Product Manager",
          company: "TechFlow Inc",
          rating: 5
        },
        {
          quote: "Finally found an app that actually delivers on its promises. The features are exactly what I needed.",
          author: "Michael Rodriguez",
          title: "Freelance Designer",
          company: "Independent",
          rating: 5
        },
        {
          quote: "The customer support is outstanding and the app keeps getting better with each update. Highly recommend!",
          author: "Emily Johnson",
          title: "Marketing Director",
          company: "Growth Dynamics",
          rating: 5
        }
      ],
      consulting: [
        {
          quote: "Their expertise in digital transformation saved us months of trial and error. ROI was positive within quarter one.",
          author: "David Thompson",
          title: "CTO",
          company: "InnovaCorp",
          rating: 5
        },
        {
          quote: "Professional, knowledgeable, and results-driven. They didn't just consult - they became true partners in our success.",
          author: "Jennifer Martinez",
          title: "VP Operations", 
          company: "Global Logistics",
          rating: 5
        },
        {
          quote: "The team's deep industry knowledge and strategic approach helped us navigate complex challenges seamlessly.",
          author: "Robert Kim",
          title: "CEO",
          company: "NextGen Manufacturing",
          rating: 5
        }
      ]
    };
    
    return templates[this.config.businessType].slice(0, count);
  }

  private generateStaticCaseStudies(count: number): GeneratedContent['caseStudies'] {
    const templates = [
      {
        title: 'Enterprise Digital Transformation',
        client: 'Fortune 500 Retailer',
        industry: 'Retail',
        challenge: 'Legacy systems were limiting growth potential and creating operational inefficiencies across 500+ locations.',
        solution: 'Implemented comprehensive cloud migration strategy with modern DevOps practices and AI-powered analytics.',
        results: [
          '60% reduction in infrastructure costs',
          '99.99% system uptime achieved',
          '40% faster time-to-market for new features',
          'Scalable architecture supporting 10M+ daily transactions'
        ]
      },
      {
        title: 'Healthcare AI Implementation',
        client: 'Regional Healthcare Network',
        industry: 'Healthcare',
        challenge: 'Manual processes causing delays in patient care and increasing administrative overhead by 300%.',
        solution: 'Developed custom AI solutions for patient scheduling, resource optimization, and predictive analytics.',
        results: [
          '70% reduction in administrative tasks',
          '30% improvement in patient satisfaction',
          '$2M annual cost savings',
          'HIPAA-compliant AI implementation'
        ]
      },
      {
        title: 'Financial Services Modernization',
        client: 'Community Bank Group',
        industry: 'Financial Services',
        challenge: 'Outdated systems preventing competitive digital banking offerings and regulatory compliance.',
        solution: 'Modernized core banking systems with cloud-native architecture and enhanced security protocols.',
        results: [
          '50% faster loan processing',
          '95% customer satisfaction score',
          'Full regulatory compliance achieved',
          '200% increase in digital adoption'
        ]
      }
    ];
    
    return templates.slice(0, count);
  }

  private generateStaticPricing(basePrice?: number): GeneratedContent['pricing'] {
    const base = basePrice || (this.config.businessType === 'app-marketing' ? 9.99 : 5000);
    
    if (this.config.businessType === 'app-marketing') {
      return {
        tiers: [
          {
            name: 'Free',
            price: 0,
            period: 'month',
            description: 'Perfect for trying out our app',
            features: [
              'Basic features access',
              '5 projects limit',
              'Community support',
              'Mobile app access'
            ]
          },
          {
            name: 'Pro',
            price: base,
            period: 'month',
            description: 'Best for individual users',
            features: [
              'All basic features',
              'Unlimited projects',
              'Priority support',
              'Advanced analytics',
              'Export capabilities',
              'Custom themes'
            ],
            highlighted: true
          },
          {
            name: 'Team',
            price: base * 3,
            period: 'month',
            description: 'Perfect for small teams',
            features: [
              'All Pro features',
              'Team collaboration',
              'Admin controls',
              'Advanced reporting',
              'API access',
              'Custom integrations'
            ]
          }
        ]
      };
    } else {
      return {
        tiers: [
          {
            name: 'Strategy Session',
            price: base / 10,
            description: 'One-time consultation to assess your needs',
            features: [
              '2-hour strategy session',
              'Digital readiness assessment',
              'Technology roadmap',
              'Actionable recommendations',
              'Follow-up report'
            ]
          },
          {
            name: 'Project-Based',
            price: 'Custom',
            description: 'Tailored solutions for specific initiatives',
            features: [
              'Custom project scope',
              'Dedicated project manager',
              'Agile methodology',
              'Regular status updates',
              'Quality assurance',
              'Post-launch support'
            ],
            highlighted: true
          },
          {
            name: 'Retainer',
            price: base,
            period: 'month',
            description: 'Ongoing partnership for continuous improvement',
            features: [
              'Monthly strategic reviews',
              'Dedicated consultant access',
              'Priority project scheduling',
              'Technology monitoring',
              'Performance optimization',
              'Quarterly business reviews'
            ]
          }
        ]
      };
    }
  }

  private generateStaticContent(contentType: string, context: any): any {
    switch (contentType) {
      case 'hero':
        return this.generateStaticHero(context.companyName, context.productName);
      case 'features':
        return this.generateStaticFeatures(context.appCategory);
      case 'services':
        return this.generateStaticServices(context.focusAreas);
      case 'testimonials':
        return this.generateStaticTestimonials(context.count);
      case 'caseStudies':
        return this.generateStaticCaseStudies(context.count);
      case 'pricing':
        return this.generateStaticPricing(context.basePrice);
      default:
        return {};
    }
  }
}

// Factory function to create content generator
export const createContentGenerator = (config: ContentGenerationConfig): ContentGenerator => {
  return new ContentGenerator(config);
};

// Utility function to generate complete site content
export const generateSiteContent = async (
  config: ContentGenerationConfig & {
    companyName: string;
    productName?: string;
    appCategory?: string;
    focusAreas?: string[];
    basePrice?: number;
  }
): Promise<GeneratedContent> => {
  const generator = createContentGenerator(config);
  
  const content: GeneratedContent = {
    hero: await generator.generateHero(config.companyName, config.productName)
  };
  
  if (config.businessType === 'app-marketing') {
    content.features = await generator.generateFeatures(config.appCategory);
    content.pricing = await generator.generatePricing(config.basePrice);
  } else {
    content.services = await generator.generateServices(config.focusAreas);
    content.caseStudies = await generator.generateCaseStudies(2);
  }
  
  content.testimonials = await generator.generateTestimonials(3);
  
  return content;
};