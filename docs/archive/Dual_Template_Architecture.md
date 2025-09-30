# Dual-Template Technical Architecture
## Shared Infrastructure with Business-Specific Adaptations

### Executive Summary

This document defines the technical architecture for our multi-template website generation platform, focusing on shared infrastructure that supports both mobile app marketing and professional consulting business models. The architecture prioritizes code reusability, maintainability, and business-specific optimization while maintaining consistent performance and user experience.

---

## 🏗️ Master Architecture Overview

### Multi-Template System Design
```
┌─────────────────────────────────────────────────────────────────┐
│                    SHARED PLATFORM CORE                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   Components    │ │   Content       │ │   Automation    │   │
│  │   Library       │ │   Management    │ │   Scripts       │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  APP MARKETING  │    │   CONSULTING    │    │   FUTURE        │
│    TEMPLATE     │    │    TEMPLATE     │    │   TEMPLATES     │
│                 │    │                 │    │                 │
│ • Hero + CTA    │    │ • Services      │    │ • E-commerce    │
│ • Features      │    │ • Case Studies  │    │ • SaaS          │
│ • App Downloads │    │ • Team Profiles │    │ • Portfolio     │
│ • Pricing       │    │ • Lead Forms    │    │ • Events        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Repository Structure for Dual Templates
```bash
astro-websites/                    # Master platform repository
├── packages/                              # Monorepo structure for scalability
│   ├── core/                             # Shared platform core
│   │   ├── components/                   # Template-agnostic components
│   │   │   ├── ui/                      # Base UI components
│   │   │   │   ├── Button.astro         # ✅ Shared across templates
│   │   │   │   ├── Card.astro           # ✅ Shared across templates
│   │   │   │   ├── Hero.astro           # ✅ Configurable for both
│   │   │   │   ├── ContactForm.astro    # ✅ Adaptable to context
│   │   │   │   └── Navigation.astro     # ✅ Dynamic menu system
│   │   │   ├── layout/                  # Layout components
│   │   │   │   ├── BaseLayout.astro     # ✅ Universal base layout
│   │   │   │   ├── Header.astro         # ✅ Adaptive header
│   │   │   │   └── Footer.astro         # ✅ Business-type aware
│   │   │   └── content/                 # Content components
│   │   │       ├── BlogPost.astro       # ✅ Universal blog system
│   │   │       ├── SEOHead.astro        # ✅ Business-aware SEO
│   │   │       └── LanguageSwitcher.astro # ✅ Universal i18n
│   │   ├── utils/                        # Shared utilities
│   │   │   ├── i18n.js                  # ✅ Multi-language system
│   │   │   ├── analytics.js             # ✅ Business-aware tracking
│   │   │   ├── seo.js                   # ✅ SEO optimization
│   │   │   └── validation.js            # ✅ Universal validation
│   │   ├── automation/                   # Content generation
│   │   │   ├── claude-client.js         # ✅ AI content generation
│   │   │   ├── content-generator.js     # ✅ Template-aware content
│   │   │   └── translation-service.js   # ✅ Multi-language automation
│   │   └── config/                       # Shared configuration
│   │       ├── base-config.js           # ✅ Platform base settings
│   │       ├── theme-system.js          # ✅ Multi-template themes
│   │       └── deployment.js            # ✅ Universal deployment
│   ├── templates/                        # Business-specific templates
│   │   ├── app-marketing/               # Mobile app template
│   │   │   ├── components/              # App-specific components
│   │   │   │   ├── AppDownloadButtons.astro
│   │   │   │   ├── FeatureShowcase.astro
│   │   │   │   ├── PricingTable.astro
│   │   │   │   ├── AppScreenshots.astro
│   │   │   │   └── AppStoreOptimization.astro
│   │   │   ├── layouts/                 # App page layouts
│   │   │   │   ├── AppHomepage.astro
│   │   │   │   ├── AppFeatures.astro
│   │   │   │   └── AppPricing.astro
│   │   │   ├── content/                 # App content structure
│   │   │   │   ├── apps/                # App configurations
│   │   │   │   └── blog/               # App marketing blog
│   │   │   └── config/                  # App template config
│   │   │       ├── app-theme.js
│   │   │       └── app-seo.js
│   │   └── consulting/                  # Professional services template
│   │       ├── components/              # Consulting-specific components
│   │       │   ├── ServicesGrid.astro
│   │       │   ├── CaseStudyCard.astro
│   │       │   ├── TestimonialCarousel.astro
│   │       │   ├── TeamMember.astro
│   │       │   ├── ProcessSteps.astro
│   │       │   ├── LeadQualificationForm.astro
│   │       │   └── ConsultationBooking.astro
│   │       ├── layouts/                 # Consulting page layouts
│   │       │   ├── ConsultingHomepage.astro
│   │       │   ├── ServicesPage.astro
│   │       │   ├── CaseStudiesPage.astro
│   │       │   └── AboutPage.astro
│   │       ├── content/                 # Consulting content structure
│   │       │   ├── consulting-firms/   # Consulting configurations
│   │       │   └── insights/           # Thought leadership blog
│   │       └── config/                  # Consulting template config
│   │           ├── consulting-theme.js
│   │           └── consulting-seo.js
│   └── generated-sites/                 # Output directories
│       ├── app-sites/                   # Generated app marketing sites
│       └── consulting-sites/            # Generated consulting sites
├── automation/                          # Site generation scripts
│   ├── generators/                      # Template generators
│   │   ├── app-generator.js            # App site generation
│   │   ├── consulting-generator.js     # Consulting site generation
│   │   └── base-generator.js           # Shared generation logic
│   ├── prompts/                         # AI content prompts
│   │   ├── app-marketing/              # App-specific prompts
│   │   │   ├── hero-content.txt
│   │   │   ├── features.txt
│   │   │   ├── app-store-description.txt
│   │   │   └── app-blog-topics.txt
│   │   ├── consulting/                  # Consulting-specific prompts
│   │   │   ├── services-description.txt
│   │   │   ├── case-study-generation.txt
│   │   │   ├── about-company.txt
│   │   │   ├── team-bios.txt
│   │   │   └── thought-leadership.txt
│   │   └── shared/                      # Universal prompts
│   │       ├── privacy-policy.txt
│   │       ├── terms-of-service.txt
│   │       └── contact-page.txt
│   ├── validators/                      # Configuration validation
│   │   ├── app-config-validator.js
│   │   ├── consulting-config-validator.js
│   │   └── base-config-validator.js
│   └── deployers/                       # Deployment automation
│       ├── vercel-deployer.js
│       ├── netlify-deployer.js
│       └── github-pages-deployer.js
├── tools/                               # Development and maintenance tools
│   ├── template-switcher.js            # Switch between business templates
│   ├── content-migrator.js             # Migrate content between versions
│   ├── performance-auditor.js          # Cross-template performance testing
│   └── accessibility-checker.js        # Universal accessibility validation
└── docs/                                # Comprehensive documentation
    ├── architecture/                    # Architecture documentation
    ├── templates/                       # Template-specific guides
    │   ├── app-marketing/
    │   └── consulting/
    ├── deployment/                      # Deployment guides
    └── automation/                      # Automation documentation
```

---

## 🔧 Shared Component Architecture

### Universal Component Design Principles
```typescript
// packages/core/components/ui/Button.astro
---
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  businessType?: 'app' | 'consulting' | 'auto' // Business context awareness
  intent?: 'download' | 'contact' | 'learn-more' | 'book-consultation'
  class?: string
}

const { 
  variant = 'primary', 
  size = 'md', 
  href, 
  businessType = 'auto',
  intent,
  class: className = '',
  ...props 
} = Astro.props

// Business-aware styling
const getBusinessContext = () => {
  if (businessType !== 'auto') return businessType
  // Auto-detect from site configuration or page context
  return Astro.locals.businessType || 'app'
}

const context = getBusinessContext()

// Context-aware variants
const variants = {
  app: {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg transform hover:scale-105',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  },
  consulting: {
    primary: 'bg-primary text-white hover:bg-primary-dark font-semibold tracking-wide',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
  }
}

// Intent-based analytics tracking
const intentTracking = {
  download: 'data-track="app-download"',
  contact: 'data-track="contact-form"', 
  'learn-more': 'data-track="learn-more"',
  'book-consultation': 'data-track="consultation-booking"'
}

const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
const contextVariant = variants[context][variant]
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
}

const classes = `${baseClasses} ${contextVariant} ${sizeClasses[size]} ${className}`
const trackingProps = intent ? intentTracking[intent] : ''
---

{href ? (
  <a href={href} class={classes} {...trackingProps} {...props}>
    <slot />
  </a>
) : (
  <button class={classes} {...trackingProps} {...props}>
    <slot />
  </button>
)}
```

### Context-Aware Hero Component
```typescript
// packages/core/components/ui/Hero.astro
---
export interface HeroProps {
  businessType?: 'app' | 'consulting' | 'auto'
  title: string
  subtitle?: string
  primaryCTA?: { text: string; href: string; intent: string }
  secondaryCTA?: { text: string; href: string; intent: string }
  backgroundImage?: string
  overlayOpacity?: number
}

const { 
  businessType = 'auto',
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  overlayOpacity = 0.7
} = Astro.props

const context = businessType === 'auto' ? Astro.locals.businessType : businessType

// Business-specific layouts and styling
const heroConfig = {
  app: {
    containerClass: 'min-h-screen flex items-center justify-center text-center',
    titleClass: 'text-4xl md:text-6xl font-bold text-white mb-6 leading-tight',
    subtitleClass: 'text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto',
    ctaWrapperClass: 'flex flex-col sm:flex-row gap-4 justify-center items-center',
    backgroundClass: 'bg-gradient-to-br from-primary/20 to-secondary/20'
  },
  consulting: {
    containerClass: 'min-h-[80vh] flex items-center justify-center text-center lg:text-left',
    titleClass: 'text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight',
    subtitleClass: 'text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl',
    ctaWrapperClass: 'flex flex-col sm:flex-row gap-4 justify-center lg:justify-start',
    backgroundClass: 'bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'
  }
}

const config = heroConfig[context]
---

<section class={`relative ${config.containerClass} ${config.backgroundClass}`}>
  {backgroundImage && (
    <div class="absolute inset-0 z-0">
      <img 
        src={backgroundImage} 
        alt="" 
        class="w-full h-full object-cover"
        loading="eager"
      />
      <div 
        class="absolute inset-0 bg-black" 
        style={`opacity: ${overlayOpacity}`}
      ></div>
    </div>
  )}
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-4xl mx-auto lg:mx-0">
      <h1 class={config.titleClass}>
        {title}
      </h1>
      
      {subtitle && (
        <p class={config.subtitleClass}>
          {subtitle}
        </p>
      )}
      
      {(primaryCTA || secondaryCTA) && (
        <div class={config.ctaWrapperClass}>
          {primaryCTA && (
            <Button
              href={primaryCTA.href}
              size="lg"
              intent={primaryCTA.intent}
              businessType={context}
            >
              {primaryCTA.text}
            </Button>
          )}
          
          {secondaryCTA && (
            <Button
              href={secondaryCTA.href}
              variant="outline"
              size="lg"
              intent={secondaryCTA.intent}
              businessType={context}
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      )}
    </div>
  </div>
</section>
```

---

## 🎨 Template-Specific Architecture

### App Marketing Template Structure
```typescript
// packages/templates/app-marketing/components/FeatureShowcase.astro
---
import { Card } from '@core/components/ui'
import type { AppFeature } from '../types/app-config'

export interface FeatureShowcaseProps {
  features: AppFeature[]
  layout?: 'grid' | 'carousel' | 'tabs'
  showIcons?: boolean
}

const { features, layout = 'grid', showIcons = true } = Astro.props

const layoutClasses = {
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  carousel: 'flex overflow-x-auto gap-6 pb-4',
  tabs: 'space-y-8'
}
---

<section class="py-16 bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Why Choose Our App?
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Discover the features that make our app stand out from the competition
      </p>
    </div>
    
    <div class={layoutClasses[layout]}>
      {features.map((feature) => (
        <Card class="p-6 text-center hover:shadow-lg transition-shadow">
          {showIcons && feature.icon && (
            <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <i class={`${feature.icon} text-2xl text-primary`}></i>
            </div>
          )}
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {feature.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### Consulting Template Structure
```typescript
// packages/templates/consulting/components/ServicesGrid.astro
---
import { Card, Button } from '@core/components/ui'
import type { ConsultingService } from '../types/consulting-config'

export interface ServicesGridProps {
  services: ConsultingService[]
  showPricing?: boolean
  ctaText?: string
}

const { services, showPricing = false, ctaText = "Learn More" } = Astro.props
---

<section class="py-20 bg-white dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
        Our Services
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        We help organizations achieve their goals through strategic consulting and implementation
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <Card class="p-8 h-full flex flex-col group hover:shadow-2xl transition-all duration-300">
          <div class="mb-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>
          
          {service.outcomes && (
            <div class="mb-6">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">
                Typical Outcomes:
              </h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {service.outcomes.map((outcome) => (
                  <li class="flex items-start">
                    <span class="text-primary mr-2">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {showPricing && service.pricing && (
            <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="text-2xl font-bold text-primary">
                {service.pricing.display}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {service.pricing.model}
              </div>
            </div>
          )}
          
          <div class="mt-auto">
            <Button 
              href={`/services/${service.slug}`}
              variant="outline"
              businessType="consulting"
              intent="learn-more"
              class="w-full"
            >
              {ctaText}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>
```

---

## 🗄️ Configuration Management System

### Universal Business Configuration Schema
```typescript
// packages/core/config/business-config.ts
export interface BusinessConfig {
  // Universal business information
  businessInfo: {
    name: string
    displayName: string
    type: 'app' | 'consulting' | 'saas' | 'ecommerce' // Template type
    tagline: string
    description: string
    logo: string
    favicon: string
  }
  
  // Contact and location
  contact: {
    email: string
    phone?: string
    address?: {
      street: string
      city: string
      state: string
      country: string
      postalCode: string
    }
    social: {
      linkedin?: string
      twitter?: string
      facebook?: string
      instagram?: string
    }
  }
  
  // Website configuration
  website: {
    domain: string
    defaultLanguage: string
    supportedLanguages: string[]
    timezone: string
    currency?: string
  }
  
  // Branding and design
  branding: {
    primaryColor: string
    secondaryColor: string
    accentColor?: string
    fontFamily: {
      primary: string    // Body text
      headings: string   // Headlines
      display?: string   // Special text
    }
    theme: 'light' | 'dark' | 'auto'
  }
  
  // SEO and marketing
  seo: {
    keywords: string[]
    metaDescription: string
    ogImage: string
    twitterCard: 'summary' | 'summary_large_image'
    schema: {
      organizationType: string
      industry: string
    }
  }
  
  // Analytics and tracking
  analytics: {
    googleAnalytics?: string
    vercelAnalytics: boolean
    facebookPixel?: string
    customEvents: Array<{
      name: string
      trigger: string
      businessValue: string
    }>
  }
  
  // Template-specific configuration
  templateConfig: AppConfig | ConsultingConfig | Record<string, any>
}

// App-specific configuration extension
export interface AppConfig {
  app: {
    category: string
    platform: 'ios' | 'android' | 'web' | 'cross-platform'
    downloadLinks: {
      ios?: string
      android?: string
      web?: string
    }
    features: Array<{
      title: string
      description: string
      icon: string
      highlight?: boolean
    }>
    screenshots: Array<{
      url: string
      alt: string
      platform: 'ios' | 'android' | 'web'
    }>
    pricing?: {
      model: 'free' | 'freemium' | 'paid' | 'subscription'
      tiers: Array<{
        name: string
        price: number
        currency: string
        period?: 'month' | 'year'
        features: string[]
        highlighted?: boolean
      }>
    }
  }
}

// Consulting-specific configuration extension
export interface ConsultingConfig {
  consulting: {
    industry: string[]
    serviceAreas: string[]
    clientTypes: string[]
    methodology: {
      name: string
      description: string
      steps: Array<{
        title: string
        description: string
        duration?: string
      }>
    }
    services: Array<{
      title: string
      slug: string
      description: string
      outcomes: string[]
      pricing: {
        model: 'hourly' | 'project' | 'retainer' | 'value-based'
        display: string
        range?: {
          min: number
          max: number
          currency: string
        }
      }
    }>
    team: Array<{
      name: string
      title: string
      bio: string
      image: string
      linkedin?: string
      email?: string
      specialties: string[]
    }>
    caseStudies: Array<{
      title: string
      client: string
      industry: string
      challenge: string
      solution: string
      results: Array<{
        metric: string
        value: string
        description: string
      }>
      testimonial?: {
        quote: string
        author: string
        title: string
        company: string
      }
    }>
  }
}
```

### Template Detection and Routing
```typescript
// packages/core/utils/template-router.ts
export class TemplateRouter {
  static detectBusinessType(config: BusinessConfig): 'app' | 'consulting' {
    return config.businessInfo.type
  }
  
  static getTemplateComponents(businessType: string) {
    const componentMap = {
      app: {
        hero: '@templates/app-marketing/components/AppHero.astro',
        features: '@templates/app-marketing/components/FeatureShowcase.astro',
        downloads: '@templates/app-marketing/components/AppDownloadButtons.astro',
        pricing: '@templates/app-marketing/components/PricingTable.astro'
      },
      consulting: {
        hero: '@templates/consulting/components/ConsultingHero.astro',
        services: '@templates/consulting/components/ServicesGrid.astro',
        caseStudies: '@templates/consulting/components/CaseStudyShowcase.astro',
        team: '@templates/consulting/components/TeamGrid.astro',
        contact: '@templates/consulting/components/LeadQualificationForm.astro'
      }
    }
    
    return componentMap[businessType] || componentMap.app
  }
  
  static getTemplateLayouts(businessType: string) {
    const layoutMap = {
      app: {
        homepage: '@templates/app-marketing/layouts/AppHomepage.astro',
        features: '@templates/app-marketing/layouts/AppFeatures.astro',
        pricing: '@templates/app-marketing/layouts/AppPricing.astro'
      },
      consulting: {
        homepage: '@templates/consulting/layouts/ConsultingHomepage.astro',
        services: '@templates/consulting/layouts/ServicesPage.astro',
        about: '@templates/consulting/layouts/AboutPage.astro',
        caseStudies: '@templates/consulting/layouts/CaseStudiesPage.astro'
      }
    }
    
    return layoutMap[businessType] || layoutMap.app
  }
}
```

---

## 🚀 Automation and Generation System

### Template-Aware Site Generator
```typescript
// automation/generators/base-generator.ts
export abstract class BaseGenerator {
  protected config: BusinessConfig
  protected outputDir: string
  protected templateType: string
  
  constructor(config: BusinessConfig, outputDir: string) {
    this.config = config
    this.outputDir = outputDir
    this.templateType = config.businessInfo.type
  }
  
  abstract generatePages(): Promise<void>
  abstract generateContent(): Promise<void>
  abstract generateAssets(): Promise<void>
  
  async generate(): Promise<void> {
    console.log(`🚀 Generating ${this.templateType} site for ${this.config.businessInfo.name}...`)
    
    // 1. Setup directory structure
    await this.setupDirectories()
    
    // 2. Copy shared core files
    await this.copySharedFiles()
    
    // 3. Copy template-specific files
    await this.copyTemplateFiles()
    
    // 4. Generate configuration files
    await this.generateConfigFiles()
    
    // 5. Generate pages
    await this.generatePages()
    
    // 6. Generate content
    await this.generateContent()
    
    // 7. Generate assets
    await this.generateAssets()
    
    // 8. Build and optimize
    await this.buildSite()
    
    console.log(`✅ ${this.templateType} site generated successfully`)
  }
  
  protected async setupDirectories(): Promise<void> {
    const dirs = [
      'src/components',
      'src/layouts', 
      'src/pages',
      'src/content',
      'src/assets',
      'public'
    ]
    
    for (const dir of dirs) {
      await fs.mkdir(path.join(this.outputDir, dir), { recursive: true })
    }
  }
  
  protected async copySharedFiles(): Promise<void> {
    const sharedPath = path.join(__dirname, '../../packages/core')
    await this.copyDirectory(sharedPath, path.join(this.outputDir, 'src/shared'))
  }
  
  protected async copyTemplateFiles(): Promise<void> {
    const templatePath = path.join(__dirname, `../../packages/templates/${this.templateType}`)
    await this.copyDirectory(templatePath, path.join(this.outputDir, 'src/template'))
  }
  
  protected async generateConfigFiles(): Promise<void> {
    // Generate astro.config.mjs
    const astroConfig = this.generateAstroConfig()
    await fs.writeFile(
      path.join(this.outputDir, 'astro.config.mjs'),
      astroConfig
    )
    
    // Generate package.json
    const packageJson = this.generatePackageJson()
    await fs.writeFile(
      path.join(this.outputDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    )
    
    // Generate business configuration
    const businessConfig = `export const businessConfig = ${JSON.stringify(this.config, null, 2)}`
    await fs.writeFile(
      path.join(this.outputDir, 'src/config/business-config.js'),
      businessConfig
    )
  }
  
  protected async buildSite(): Promise<void> {
    console.log('📦 Installing dependencies...')
    execSync('npm install', { cwd: this.outputDir, stdio: 'inherit' })
    
    console.log('🏗️ Building site...')
    execSync('npm run build', { cwd: this.outputDir, stdio: 'inherit' })
  }
}

// App-specific generator
export class AppGenerator extends BaseGenerator {
  async generatePages(): Promise<void> {
    const appConfig = this.config.templateConfig as AppConfig
    
    // Generate homepage
    const homepage = this.generateAppHomepage(appConfig)
    await fs.writeFile(
      path.join(this.outputDir, 'src/pages/index.astro'),
      homepage
    )
    
    // Generate features page
    const featuresPage = this.generateFeaturesPage(appConfig)
    await fs.writeFile(
      path.join(this.outputDir, 'src/pages/features.astro'),
      featuresPage
    )
    
    // Generate pricing page if applicable
    if (appConfig.app.pricing) {
      const pricingPage = this.generatePricingPage(appConfig)
      await fs.writeFile(
        path.join(this.outputDir, 'src/pages/pricing.astro'),
        pricingPage
      )
    }
  }
  
  async generateContent(): Promise<void> {
    // Generate app-specific content using Claude
    const contentGenerator = new AppContentGenerator(this.config)
    await contentGenerator.generateHeroContent()
    await contentGenerator.generateFeatureDescriptions()
    await contentGenerator.generateAppStoreContent()
  }
  
  async generateAssets(): Promise<void> {
    // Copy app assets (screenshots, icons, etc.)
    const appConfig = this.config.templateConfig as AppConfig
    
    for (const screenshot of appConfig.app.screenshots) {
      // Process and optimize screenshots
      await this.optimizeImage(screenshot.url, 'screenshots')
    }
    
    // Generate app store assets
    await this.generateAppStoreAssets()
  }
}

// Consulting-specific generator
export class ConsultingGenerator extends BaseGenerator {
  async generatePages(): Promise<void> {
    const consultingConfig = this.config.templateConfig as ConsultingConfig
    
    // Generate homepage
    const homepage = this.generateConsultingHomepage(consultingConfig)
    await fs.writeFile(
      path.join(this.outputDir, 'src/pages/index.astro'),
      homepage
    )
    
    // Generate services pages
    for (const service of consultingConfig.consulting.services) {
      const servicePage = this.generateServicePage(service)
      await fs.writeFile(
        path.join(this.outputDir, `src/pages/services/${service.slug}.astro`),
        servicePage
      )
    }
    
    // Generate about page
    const aboutPage = this.generateAboutPage(consultingConfig)
    await fs.writeFile(
      path.join(this.outputDir, 'src/pages/about.astro'),
      aboutPage
    )
    
    // Generate case studies pages
    const caseStudiesPage = this.generateCaseStudiesPage(consultingConfig)
    await fs.writeFile(
      path.join(this.outputDir, 'src/pages/case-studies.astro'),
      caseStudiesPage
    )
  }
  
  async generateContent(): Promise<void> {
    // Generate consulting-specific content using Claude
    const contentGenerator = new ConsultingContentGenerator(this.config)
    await contentGenerator.generateServiceDescriptions()
    await contentGenerator.generateCaseStudies()
    await contentGenerator.generateTeamBios()
    await contentGenerator.generateAboutContent()
  }
  
  async generateAssets(): Promise<void> {
    const consultingConfig = this.config.templateConfig as ConsultingConfig
    
    // Process team photos
    for (const teamMember of consultingConfig.consulting.team) {
      await this.optimizeImage(teamMember.image, 'team')
    }
    
    // Generate consulting-specific assets
    await this.generateConsultingAssets()
  }
}
```

---

## 📊 Performance and Monitoring

### Cross-Template Performance Monitoring
```typescript
// packages/core/utils/performance-monitor.ts
export class PerformanceMonitor {
  static async auditSite(siteUrl: string, businessType: string): Promise<PerformanceReport> {
    const lighthouse = await import('lighthouse')
    const chrome = await import('chrome-launcher')
    
    const chromeInstance = await chrome.launch({ chromeFlags: ['--headless'] })
    
    try {
      const runnerResult = await lighthouse(siteUrl, {
        port: chromeInstance.port,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      })
      
      const report: PerformanceReport = {
        url: siteUrl,
        businessType,
        timestamp: Date.now(),
        scores: {
          performance: runnerResult.lhr.categories.performance.score * 100,
          accessibility: runnerResult.lhr.categories.accessibility.score * 100,
          bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
          seo: runnerResult.lhr.categories.seo.score * 100
        },
        metrics: {
          firstContentfulPaint: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
          largestContentfulPaint: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
          cumulativeLayoutShift: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
          totalBlockingTime: runnerResult.lhr.audits['total-blocking-time'].numericValue
        },
        businessSpecificChecks: await this.runBusinessSpecificChecks(siteUrl, businessType)
      }
      
      return report
    } finally {
      await chromeInstance.kill()
    }
  }
  
  static async runBusinessSpecificChecks(url: string, businessType: string): Promise<BusinessSpecificChecks> {
    const checks: BusinessSpecificChecks = {
      conversionElements: [],
      businessLogic: [],
      contentQuality: []
    }
    
    if (businessType === 'app') {
      checks.conversionElements = await this.checkAppDownloadButtons(url)
      checks.businessLogic = await this.checkAppStoreOptimization(url)
    } else if (businessType === 'consulting') {
      checks.conversionElements = await this.checkContactForms(url)
      checks.businessLogic = await this.checkConsultingCredentials(url)
    }
    
    return checks
  }
}

interface PerformanceReport {
  url: string
  businessType: string
  timestamp: number
  scores: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  metrics: {
    firstContentfulPaint: number
    largestContentfulPaint: number
    cumulativeLayoutShift: number
    totalBlockingTime: number
  }
  businessSpecificChecks: BusinessSpecificChecks
}
```

---

## 🔒 Security and Compliance

### Template-Aware Security Configuration
```typescript
// packages/core/config/security-config.ts
export class SecurityConfig {
  static getSecurityHeaders(businessType: string): Record<string, string> {
    const baseHeaders = {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }
    
    const businessSpecificHeaders = {
      app: {
        'Content-Security-Policy': `
          default-src 'self';
          script-src 'self' 'unsafe-inline' https://apps.apple.com https://play.google.com;
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https: blob:;
          connect-src 'self' https://itunes.apple.com;
          font-src 'self';
        `.replace(/\s+/g, ' ').trim()
      },
      consulting: {
        'Content-Security-Policy': `
          default-src 'self';
          script-src 'self' 'unsafe-inline' https://js.hsforms.net https://calendly.com;
          style-src 'self' 'unsafe-inline' https://assets.calendly.com;
          img-src 'self' data: https: blob:;
          connect-src 'self' https://api.hsforms.com https://calendly.com;
          font-src 'self';
          frame-src https://calendly.com https://meetings.hubspot.com;
        `.replace(/\s+/g, ' ').trim()
      }
    }
    
    return {
      ...baseHeaders,
      ...businessSpecificHeaders[businessType]
    }
  }
  
  static getPrivacyCompliance(businessType: string): PrivacyConfig {
    return {
      gdprRequired: true,
      ccpaRequired: businessType === 'consulting', // B2B often needs CCPA
      cookieConsent: false, // Our cookieless approach
      dataRetention: businessType === 'consulting' ? '7 years' : '2 years',
      encryptionRequired: businessType === 'consulting',
      auditTrail: businessType === 'consulting'
    }
  }
}
```

---

This comprehensive dual-template technical architecture provides a robust foundation for supporting both mobile app marketing and professional consulting websites while maintaining code reusability, performance, and business-specific optimization capabilities.

---