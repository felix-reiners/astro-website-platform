# Technical Specifications
## Multi-Template Website Generation Platform

### System Architecture Overview

This document defines the technical architecture, data structures, and implementation details for the multi-app website generation platform.

---

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   App Config    │───▶│  Template Gen   │───▶│  Deployed Site  │
│   (JSON/JS)     │    │   (Scripts)     │    │   (Vercel)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Claude Content  │    │ GitHub Actions  │    │   Analytics     │
│  Generation     │    │     CI/CD       │    │  (Cookieless)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Multi-Template Repository Structure
```bash
astro-websites/
├── templates/
│   ├── app-marketing/       # Mobile app marketing template
│   └── consulting/          # Professional consulting template
├── shared/
│   ├── components/
│   │   ├── ui/              # Shared UI components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Hero.astro
│   │   │   ├── ContactForm.astro
│   │   │   └── TestimonialCard.astro
│   │   ├── app-marketing/   # App-specific components
│   │   │   ├── FeatureGrid.astro
│   │   │   ├── PricingTable.astro
│   │   │   └── AppDownloadButtons.astro
│   │   ├── consulting/      # Consulting-specific components
│   │   │   ├── ServicesGrid.astro
│   │   │   ├── CaseStudyCard.astro
│   │   │   ├── TeamMember.astro
│   │   │   ├── ProcessSteps.astro
│   │   │   └── ConsultationBooking.astro
│   │   ├── i18n/           # Language components
│   │   │   ├── LanguageSwitcher.astro
│   │   │   └── TranslatedContent.astro
│   │   └── layout/         # Layout components
│   │       ├── Header.astro
│   │       ├── Footer.astro
│   │       └── Navigation.astro
│   ├── automation/         # Content generation scripts
│   │   ├── claude-integration.js
│   │   ├── content-generator.js
│   │   └── translation-automation.js
│   └── i18n/              # Multi-language system
│       ├── config.js
│       └── utils.js
│   ├── content/
│   │   ├── blog/           # Blog posts by language
│   │   │   ├── en/
│   │   │   ├── de/
│   │   │   └── ...
│   │   └── i18n/           # Translation files
│   │       ├── en.json
│   │       ├── de.json
│   │       └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Base layout template
│   │   ├── MarketingLayout.astro # Marketing page layout
│   │   └── BlogLayout.astro     # Blog post layout
│   ├── pages/
│   │   ├── [lang]/         # Language-specific pages
│   │   │   ├── index.astro # Homepage
│   │   │   ├── features.astro
│   │   │   ├── pricing.astro
│   │   │   └── blog/
│   │   └── api/
│   │       └── track.js    # Analytics endpoint
│   └── styles/
│       ├── base.css        # Base styles
│       └── themes/         # Theme variations
│           ├── blue.css
│           ├── green.css
│           └── purple.css
├── config/
│   ├── business-config.template.js # Base business configuration
│   ├── app-config.template.js      # App-specific configuration
│   ├── consulting-config.template.js # Consulting-specific configuration
│   ├── theme-config.js             # Available themes (both templates)
│   └── i18n-config.js              # Language configuration
├── scripts/
│   ├── generate-site.js         # Main generation script (template-agnostic)
│   ├── validate-config.js       # Configuration validation
│   ├── template-generator.js    # Template-specific generation
│   └── deploy.js               # Deployment automation
├── prompts/
│   ├── app-marketing/           # App-specific Claude prompts
│   │   ├── hero-content.txt
│   │   ├── features.txt
│   │   ├── pricing.txt
│   │   └── blog-posts.txt
│   ├── consulting/              # Consulting-specific Claude prompts
│   │   ├── services.txt
│   │   ├── case-studies.txt
│   │   ├── about-company.txt
│   │   ├── team-bios.txt
│   │   └── thought-leadership.txt
│   └── shared/                  # Shared prompts
│       ├── privacy-policy.txt
│       ├── terms-service.txt
│       └── contact-page.txt
└── docs/                        # Documentation
    ├── PRD.md
    ├── Implementation_Plan.md
    └── Technical_Specifications.md
```

---

## 📊 Data Structures

### App Configuration Schema
```javascript
// config/app-config.js
export const appConfig = {
  // Basic App Info
  name: "WeatherPro",
  displayName: "WeatherPro - Advanced Weather App",
  tagline: "Your personal weather companion",
  description: "Get accurate weather forecasts with our AI-powered app",
  
  // Branding
  logo: "/assets/logos/weatherpro-logo.svg",
  icon: "/assets/icons/weatherpro-icon.png",
  primaryColor: "blue", // blue, green, purple, orange, red
  secondaryColor: "sky",
  
  // App Store Links
  appStore: {
    ios: "https://apps.apple.com/app/weatherpro/id123456789",
    android: "https://play.google.com/store/apps/details?id=com.weatherpro"
  },
  
  // Website Configuration
  domain: "weatherpro.app",
  defaultLanguage: "en",
  languages: ["en", "de", "fr", "es", "it", "pt"],
  
  // Marketing Content
  hero: {
    headline: "Weather Forecasting Redefined",
    subtitle: "AI-powered predictions with 99% accuracy",
    ctaText: "Download Free",
    backgroundImage: "/assets/hero/weatherpro-hero.jpg"
  },
  
  // Features
  features: [
    {
      icon: "weather-cloud",
      title: "AI Weather Predictions", 
      description: "Advanced AI algorithms for precise forecasts"
    },
    {
      icon: "location",
      title: "Hyperlocal Forecasts",
      description: "Weather data specific to your exact location"
    }
  ],
  
  // Pricing (if applicable)
  pricing: {
    free: {
      name: "Free",
      price: "0",
      features: ["Basic weather", "7-day forecast"]
    },
    premium: {
      name: "Premium", 
      price: "4.99",
      features: ["AI predictions", "Hourly updates", "Weather maps"]
    }
  },
  
  // SEO
  seo: {
    keywords: ["weather app", "forecast", "AI weather"],
    ogImage: "/assets/og/weatherpro-og.jpg"
  },
  
  // Analytics
  analytics: {
    googleAnalytics: "G-XXXXXXXXXX", // Optional
    vercelAnalytics: true
  }
}
```

### Theme Configuration
```javascript
// config/theme-config.js
export const themes = {
  blue: {
    name: "Blue Ocean",
    colors: {
      primary: "#3B82F6",
      primaryDark: "#1E40AF", 
      secondary: "#06B6D4",
      background: "#FFFFFF",
      backgroundDark: "#0F172A",
      text: "#1F2937",
      textDark: "#F9FAFB"
    }
  },
  green: {
    name: "Forest Green",
    colors: {
      primary: "#10B981",
      primaryDark: "#047857",
      secondary: "#34D399", 
      background: "#FFFFFF",
      backgroundDark: "#0F172A",
      text: "#1F2937",
      textDark: "#F9FAFB"
    }
  },
  purple: {
    name: "Royal Purple",
    colors: {
      primary: "#8B5CF6",
      primaryDark: "#6D28D9",
      secondary: "#A78BFA",
      background: "#FFFFFF", 
      backgroundDark: "#0F172A",
      text: "#1F2937",
      textDark: "#F9FAFB"
    }
  }
}
```

### Translation Structure
```json
// src/content/i18n/en.json
{
  "nav": {
    "home": "Home",
    "features": "Features", 
    "pricing": "Pricing",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "downloadButton": "Download Free",
    "learnMore": "Learn More",
    "availableOn": "Available on"
  },
  "features": {
    "title": "Why Choose {{appName}}?",
    "subtitle": "Discover what makes our app special"
  },
  "footer": {
    "copyright": "© {{year}} {{appName}}. All rights reserved.",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  }
}
```

---

## 🎨 Component Architecture

### Base Component Structure
```astro
---
// src/components/ui/Button.astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  class?: string
}

const { 
  variant = 'primary', 
  size = 'md', 
  href, 
  class: className = '',
  ...props 
} = Astro.props

const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2'
const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark', 
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
}
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
---

{href ? (
  <a href={href} class={classes} {...props}>
    <slot />
  </a>
) : (
  <button class={classes} {...props}>
    <slot />
  </button>
)}
```

### Marketing Components
```astro
---
// src/components/marketing/Hero.astro
import { appConfig } from '../../config/app-config.js'
import { t } from '../../utils/i18n.js'
import Button from '../ui/Button.astro'

const { hero } = appConfig
---

<section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
      {hero.headline}
    </h1>
    <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
      {hero.subtitle}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href={appConfig.appStore.ios} size="lg">
        {t('hero.downloadButton')}
      </Button>
      <Button variant="outline" href="#features" size="lg">
        {t('hero.learnMore')}
      </Button>
    </div>
  </div>
</section>
```

---

## 🌐 Internationalization (i18n)

### Language Configuration
```javascript
// config/i18n-config.js
export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'fr', 'es', 'it', 'pt'],
  
  routing: {
    prefixDefaultLocale: false,
    strategy: 'pathname' // /en/features, /de/features
  },
  
  fallback: {
    de: 'en',
    fr: 'en', 
    es: 'en',
    it: 'en',
    pt: 'en'
  },
  
  languages: {
    en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' }
  }
}
```

### Translation Utility
```javascript
// src/utils/i18n.js
import { i18nConfig } from '../../config/i18n-config.js'

// Load translations dynamically
const translations = {}
for (const locale of i18nConfig.locales) {
  translations[locale] = await import(`../content/i18n/${locale}.json`)
}

export function getCurrentLocale(url) {
  const pathname = new URL(url).pathname
  const segments = pathname.split('/').filter(Boolean)
  
  if (segments.length > 0 && i18nConfig.locales.includes(segments[0])) {
    return segments[0]
  }
  
  return i18nConfig.defaultLocale
}

export function t(key, params = {}, locale = i18nConfig.defaultLocale) {
  const keys = key.split('.')
  let value = translations[locale]
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      // Fallback to default locale
      value = translations[i18nConfig.defaultLocale]
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object') {
          value = value[fallbackKey]
        }
      }
      break
    }
  }
  
  // Replace parameters
  if (typeof value === 'string') {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match
    })
  }
  
  return key // Return key if translation not found
}

export function getLocalizedPath(path, locale) {
  if (locale === i18nConfig.defaultLocale && !i18nConfig.routing.prefixDefaultLocale) {
    return path
  }
  return `/${locale}${path}`
}
```

---

## 🔧 Build & Automation

### Site Generation Script
```javascript
// scripts/generate-site.js
import fs from 'fs/promises'
import path from 'path'
import { execSync } from 'child_process'

export async function generateSite(appConfig, outputDir) {
  console.log(`🚀 Generating site for ${appConfig.name}...`)
  
  // 1. Validate configuration
  await validateConfig(appConfig)
  
  // 2. Create output directory
  await fs.mkdir(outputDir, { recursive: true })
  
  // 3. Copy template files
  await copyTemplate('./src', path.join(outputDir, 'src'))
  await copyTemplate('./public', path.join(outputDir, 'public'))
  
  // 4. Generate app-specific configuration
  await generateAppConfig(appConfig, outputDir)
  
  // 5. Generate theme CSS
  await generateThemeCSS(appConfig.primaryColor, outputDir)
  
  // 6. Process content with Claude (if enabled)
  if (appConfig.generateContent) {
    await generateContent(appConfig, outputDir)
  }
  
  // 7. Generate package.json and configs
  await generateProjectFiles(appConfig, outputDir)
  
  // 8. Install dependencies and build
  await buildSite(outputDir)
  
  console.log(`✅ Site generated successfully at ${outputDir}`)
}

async function copyTemplate(source, destination) {
  const stats = await fs.stat(source)
  
  if (stats.isDirectory()) {
    await fs.mkdir(destination, { recursive: true })
    const files = await fs.readdir(source)
    
    for (const file of files) {
      await copyTemplate(
        path.join(source, file),
        path.join(destination, file)
      )
    }
  } else {
    await fs.copyFile(source, destination)
  }
}

async function generateAppConfig(appConfig, outputDir) {
  const configPath = path.join(outputDir, 'src/config/app-config.js')
  const configContent = `export const appConfig = ${JSON.stringify(appConfig, null, 2)}`
  
  await fs.writeFile(configPath, configContent)
}

async function generateThemeCSS(primaryColor, outputDir) {
  const themeConfig = themes[primaryColor]
  if (!themeConfig) {
    throw new Error(`Theme '${primaryColor}' not found`)
  }
  
  let cssContent = ':root {\n'
  for (const [key, value] of Object.entries(themeConfig.colors)) {
    cssContent += `  --${key}: ${value};\n`
  }
  cssContent += '}\n'
  
  const cssPath = path.join(outputDir, 'src/styles/theme.css')
  await fs.writeFile(cssPath, cssContent)
}

async function buildSite(outputDir) {
  console.log('📦 Installing dependencies...')
  execSync('npm install', { cwd: outputDir, stdio: 'inherit' })
  
  console.log('🏗️ Building site...')
  execSync('npm run build', { cwd: outputDir, stdio: 'inherit' })
}
```

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy App Site

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      app_name:
        description: 'App name to deploy'
        required: true
        type: string

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build site
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./dist
```

---

## 📈 Analytics Implementation

### Server-Side Tracking
```javascript
// src/pages/api/track.js
export async function POST({ request }) {
  try {
    const { event, data } = await request.json()
    const timestamp = Date.now()
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Create tracking entry
    const trackingData = {
      timestamp,
      event,
      ip: hashIP(ip), // Hash for privacy
      userAgent: sanitizeUserAgent(userAgent),
      ...data
    }
    
    // Log to console (Vercel captures these)
    console.log('ANALYTICS:', JSON.stringify(trackingData))
    
    // Optional: Store in database
    // await database.insertTracking(trackingData)
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return new Response(JSON.stringify({ error: 'Failed' }), {
      status: 500
    })
  }
}

function hashIP(ip) {
  // Simple hash for privacy (consider crypto.subtle.digest in production)
  return btoa(ip).slice(0, 8)
}

function sanitizeUserAgent(userAgent) {
  // Extract only browser/OS info, remove identifying details
  const browserRegex = /(Chrome|Firefox|Safari|Edge)\/[\d.]+/
  const osRegex = /(Windows|Mac OS|Linux|Android|iOS)[\s\d._]*/
  
  const browser = userAgent.match(browserRegex)?.[0] || 'Unknown'
  const os = userAgent.match(osRegex)?.[0] || 'Unknown'
  
  return `${browser} on ${os}`
}
```

### Client-Side Tracking
```javascript
// src/scripts/analytics.js
class Analytics {
  constructor() {
    this.apiEndpoint = '/api/track'
    this.sessionStart = Date.now()
  }
  
  async track(event, data = {}) {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          data: {
            page: location.pathname,
            referrer: document.referrer,
            timestamp: Date.now(),
            ...data
          }
        })
      })
    } catch (error) {
      // Fail silently
      console.debug('Analytics error:', error)
    }
  }
  
  trackPageView() {
    this.track('page_view')
  }
  
  trackDownload(platform) {
    this.track('app_download', { platform })
  }
  
  trackFeatureClick(feature) {
    this.track('feature_click', { feature })
  }
}

// Initialize analytics
const analytics = new Analytics()
analytics.trackPageView()

// Add event listeners
document.addEventListener('click', (e) => {
  // Track download buttons
  if (e.target.matches('[data-track="download"]')) {
    const platform = e.target.dataset.platform || 'unknown'
    analytics.trackDownload(platform)
  }
  
  // Track feature interactions
  if (e.target.matches('[data-track="feature"]')) {
    const feature = e.target.dataset.feature || e.target.textContent
    analytics.trackFeatureClick(feature)
  }
})
```

---

## 🔒 Security & Privacy

### GDPR Compliance Checklist
```bash
□ No tracking cookies used
□ All fonts self-hosted
□ No third-party analytics with cookies
□ Privacy policy generator included
□ Data processing minimized
□ User consent not required (no personal data collected)
□ IP addresses hashed for privacy
□ User agents sanitized
```

### Content Security Policy
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## ⚡ Performance Optimization

### Bundle Optimization
```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    }
  },
  image: {
    domains: [], // No external image domains
    formats: ['avif', 'webp', 'jpeg'],
    quality: {
      avif: 80,
      webp: 80,
      jpeg: 80
    }
  }
})
```

### Image Optimization Strategy
```astro
---
// src/components/ui/OptimizedImage.astro
import { Image } from 'astro:assets'

export interface Props {
  src: ImageMetadata
  alt: string
  class?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
}

const { 
  src, 
  alt, 
  class: className = '',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw'
} = Astro.props
---

<Image
  src={src}
  alt={alt}
  class={className}
  loading={loading}
  sizes={sizes}
  format="avif"
  fallbackFormat="webp"
  quality={80}
/>
```

---

This technical specification provides the foundation for implementing a robust, scalable app website generation platform that meets all performance, accessibility, and privacy requirements.