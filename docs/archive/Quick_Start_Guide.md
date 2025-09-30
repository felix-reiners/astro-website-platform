# Quick Start Guide
## Multi-App Website Generation Platform

### Get Your Development Team Running in 30 Minutes

This guide gets your development team set up and productive immediately. Follow these steps to have a working development environment and understand the project structure.

---

## 🚀 Immediate Setup (5 minutes)

### Prerequisites
```bash
□ Node.js 18+ installed
□ Git configured with GitHub access
□ VS Code with Astro extension (recommended)
□ pnpm installed globally: npm install -g pnpm
```

### 1. Fork AstroPaper Repository
```bash
# 1. Go to https://github.com/satnaing/astro-paper
# 2. Click "Use this template" or "Fork"
# 3. Name it: astro-app-template
# 4. Clone your fork

git clone https://github.com/YOUR_USERNAME/astro-app-template.git
cd astro-app-template
```

### 2. Initial Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:4321
```

**✅ You should see AstroPaper running locally**

---

## 🎯 Project Understanding (10 minutes)

### Current State: AstroPaper Blog
```bash
# What you have now:
✅ Blog-focused Astro site
✅ Dark/light mode toggle
✅ Excellent accessibility
✅ SEO optimized
✅ TypeScript support
```

### Target State: App Marketing Platform
```bash
# What you're building:
🎯 Marketing site generator for mobile apps
🎯 Multi-language support (6 languages)
🎯 Theme system for different apps
🎯 Automated content generation
🎯 Cookieless analytics
```

### Key Transformations Needed
1. **Replace blog focus** → **Marketing focus** (Hero, Features, Pricing)
2. **Single site** → **Template generator**
3. **Manual content** → **Automated content**
4. **English only** → **Multi-language**
5. **Fixed design** → **Themeable system**

---

## 📁 Current vs Target Structure

### What AstroPaper Gives You
```bash
src/
├── components/          # Basic blog components
├── content/blog/        # Blog posts
├── layouts/            # Blog layouts
├── pages/              # Blog pages
├── styles/             # Base styles
└── utils/              # Helper functions
```

### What You'll Build
```bash
src/
├── components/
│   ├── ui/             # ADD: Shared UI components
│   ├── marketing/      # ADD: Marketing components
│   ├── i18n/           # ADD: Language components
│   └── layout/         # MODIFY: Layout components
├── content/
│   ├── blog/           # KEEP: Multi-language blog
│   └── i18n/           # ADD: Translation files
├── layouts/            # MODIFY: Marketing layouts
├── pages/
│   ├── [lang]/         # ADD: Language-specific pages
│   └── api/            # ADD: Analytics API
├── styles/
│   └── themes/         # ADD: Theme system
├── utils/              # ENHANCE: i18n utilities
└── config/             # ADD: App configuration
```

---

## 🛠️ First Task: Create Marketing Hero (15 minutes)

### Step 1: Create Hero Component
```bash
# Create new file: src/components/marketing/Hero.astro
mkdir -p src/components/marketing
touch src/components/marketing/Hero.astro
```

### Step 2: Hero Component Code
```astro
---
// src/components/marketing/Hero.astro
export interface Props {
  title: string
  subtitle: string
  ctaText?: string
  appStoreUrl?: string
  playStoreUrl?: string
}

const { 
  title, 
  subtitle, 
  ctaText = "Download Free",
  appStoreUrl,
  playStoreUrl
} = Astro.props
---

<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-skin-accent/10 to-skin-accent/5">
  <div class="container mx-auto px-4 text-center">
    <!-- App Icon Placeholder -->
    <div class="w-32 h-32 mx-auto mb-8 bg-skin-accent rounded-3xl flex items-center justify-center">
      <span class="text-4xl">📱</span>
    </div>
    
    <!-- Title -->
    <h1 class="text-4xl md:text-6xl font-bold text-skin-base mb-6 max-w-4xl mx-auto">
      {title}
    </h1>
    
    <!-- Subtitle -->
    <p class="text-xl md:text-2xl text-skin-muted mb-8 max-w-3xl mx-auto">
      {subtitle}
    </p>
    
    <!-- Download Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {appStoreUrl && (
        <a 
          href={appStoreUrl}
          class="inline-flex items-center px-6 py-3 bg-skin-accent hover:bg-skin-accent-dark text-white rounded-lg font-medium transition-colors"
        >
          📱 {ctaText} - iOS
        </a>
      )}
      {playStoreUrl && (
        <a 
          href={playStoreUrl}
          class="inline-flex items-center px-6 py-3 bg-skin-accent hover:bg-skin-accent-dark text-white rounded-lg font-medium transition-colors"
        >
          🤖 {ctaText} - Android
        </a>
      )}
    </div>
  </div>
</section>
```

### Step 3: Update Homepage
```astro
---
// src/pages/index.astro
// Replace the existing content with:

import Layout from "@layouts/Layout.astro"
import Header from "@components/Header.astro"
import Footer from "@components/Footer.astro"
import Hero from "@components/marketing/Hero.astro"
---

<Layout title="My App - Download Free">
  <Header />
  <main id="main-content">
    <Hero 
      title="Welcome to My Amazing App"
      subtitle="The best productivity app you'll ever use. Download now and transform your workflow."
      appStoreUrl="https://apps.apple.com/app/myapp"
      playStoreUrl="https://play.google.com/store/apps/details?id=com.myapp"
    />
  </main>
  <Footer />
</Layout>
```

### Step 4: Test Your Changes
```bash
# Save files and check http://localhost:4321
# You should see your new marketing hero!
```

**✅ You now have a basic app marketing homepage**

---

## 🎨 Understanding the Theme System

### Current AstroPaper Theming
AstroPaper uses CSS custom properties in `src/styles/base.css`:
```css
/* Current theme variables */
:root,
html[data-theme="light"] {
  --color-fill: 251, 254, 251;
  --color-text-base: 40, 39, 40;
  --color-accent: 13, 148, 136;
  /* ... more variables */
}

html[data-theme="dark"] {
  --color-fill: 33, 35, 37;
  --color-text-base: 234, 237, 243;
  --color-accent: 255, 107, 1;
  /* ... more variables */
}
```

### How to Add App-Specific Colors
1. **Keep the existing structure** (it works great!)
2. **Add new CSS custom properties** for app-specific theming
3. **Use JavaScript to switch themes** based on app configuration

```css
/* Add to base.css */
:root {
  /* App-specific theme variables */
  --app-primary: var(--color-accent);
  --app-secondary: #6366f1;
  --app-accent: #8b5cf6;
}

/* Blue theme */
[data-app-theme="blue"] {
  --app-primary: 59, 130, 246;
  --app-secondary: 99, 102, 241;
}

/* Green theme */
[data-app-theme="green"] {
  --app-primary: 16, 185, 129;
  --app-secondary: 52, 211, 153;
}
```

---

## 🌐 Adding Your First Language

### Step 1: Create Translation File
```bash
# Create German translations
mkdir -p src/content/i18n
```

```json
// src/content/i18n/de.json
{
  "hero": {
    "downloadButton": "Kostenlos Herunterladen",
    "learnMore": "Mehr Erfahren"
  },
  "nav": {
    "home": "Startseite",
    "features": "Funktionen",
    "pricing": "Preise",
    "blog": "Blog"
  }
}
```

### Step 2: Create Translation Utility
```javascript
// src/utils/i18n.js
const translations = {
  en: {
    hero: {
      downloadButton: "Download Free",
      learnMore: "Learn More"
    },
    nav: {
      home: "Home",
      features: "Features", 
      pricing: "Pricing",
      blog: "Blog"
    }
  },
  de: {
    hero: {
      downloadButton: "Kostenlos Herunterladen",
      learnMore: "Mehr Erfahren"
    },
    nav: {
      home: "Startseite",
      features: "Funktionen",
      pricing: "Preise", 
      blog: "Blog"
    }
  }
}

export function t(key, locale = 'en') {
  const keys = key.split('.')
  let value = translations[locale] || translations.en
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
```

### Step 3: Use Translations
```astro
---
// Update Hero.astro
import { t } from '@utils/i18n'

const locale = 'de' // Later: get from URL
---

<a href={appStoreUrl}>
  📱 {t('hero.downloadButton', locale)} - iOS
</a>
```

**✅ You now have basic multi-language support**

---

## 📊 Add Basic Analytics

### Step 1: Create Analytics API
```javascript
// src/pages/api/track.js
export async function POST({ request }) {
  try {
    const { event, data } = await request.json()
    
    // Log to console (Vercel captures these)
    console.log('ANALYTICS:', {
      event,
      timestamp: Date.now(),
      data
    })
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed' }), {
      status: 500
    })
  }
}
```

### Step 2: Add Client Tracking
```html
<!-- Add to Layout.astro in <head> -->
<script>
  // Simple analytics tracking
  function track(event, data = {}) {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data })
    }).catch(() => {}) // Fail silently
  }
  
  // Track page views
  track('page_view', { page: location.pathname })
  
  // Track download clicks
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href*="app"]')) {
      track('app_download_click', { 
        platform: e.target.textContent.includes('iOS') ? 'ios' : 'android'
      })
    }
  })
</script>
```

**✅ You now have cookieless analytics tracking**

---

## 🎯 Next Steps for Your Team

### Week 1 Priorities
```bash
□ Get familiar with Astro framework
□ Understand AstroPaper's structure
□ Create basic marketing components
□ Plan i18n architecture
□ Set up development workflow
```

### Week 2-3: Core Development
```bash
□ Build component library (Hero, Features, Pricing)
□ Implement multi-language routing
□ Create theme system
□ Add app configuration structure
□ Start automation scripts
```

### Week 4: Integration
```bash
□ Test complete workflow
□ Performance optimization
□ Accessibility audit
□ Deploy first test site
```

---

## 📚 Learning Resources

### Astro Framework
- [Official Astro Docs](https://docs.astro.build/)
- [Astro Tutorial](https://docs.astro.build/en/tutorial/0-introduction/)
- [Astro Component Patterns](https://docs.astro.build/en/core-concepts/astro-components/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com/components)

### Accessibility
- [WebAIM Guidelines](https://webaim.org/)
- [ARIA Best Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" errors
```bash
# Solution: Check import paths
# ✅ Use alias imports from tsconfig
import Layout from "@layouts/Layout.astro"

# ❌ Don't use relative paths from root
import Layout from "../../../../layouts/Layout.astro"
```

### Issue: Styles not applying
```bash
# Solution: Check CSS custom property usage
# ✅ Use existing AstroPaper theme variables
class="text-skin-base bg-skin-fill"

# ❌ Don't use hardcoded Tailwind colors yet
class="text-gray-900 bg-white"
```

### Issue: TypeScript errors
```bash
# Solution: Add proper type definitions
# ✅ Define props interface
export interface Props {
  title: string
}

# ✅ Use Astro.props
const { title } = Astro.props
```

---

## 🚨 Critical Decisions Made

### ✅ Confirmed Technical Decisions
1. **AstroPaper as foundation** - Robust, accessible base
2. **Fork strategy** - Complete ownership, no template dependencies
3. **Astro + Tailwind + React** - Modern, performant stack
4. **Multi-language from day 1** - European market focus
5. **Cookieless analytics** - GDPR compliance by design

### 🎯 Project Success Criteria
- **Generate app site in < 30 minutes** (automated)
- **Lighthouse scores 95+** across all metrics
- **WCAG 2.1 AA compliant** accessibility
- **6+ languages supported** out of the box
- **Zero cookie consent banners** required

---

## 📞 Getting Help

### Internal Resources
- **PRD.md** - Complete project requirements
- **Implementation_Plan.md** - Detailed development roadmap
- **Technical_Specifications.md** - Architecture and code examples
- **Development_Guidelines.md** - Code standards and best practices

### External Resources
- **AstroPaper Issues** - Original template support
- **Astro Discord** - Framework community support
- **GitHub Discussions** - Project-specific discussions

---

**🎉 You're ready to start building! Begin with the Hero component above, then work through the Implementation Plan systematically.**

*Remember: Start simple, add complexity gradually. The goal is a robust foundation that can scale to generate hundreds of app websites.*