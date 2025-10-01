# Multi-Template Website Generation Platform

Generate professional websites for mobile apps and consulting businesses with AI-powered content, multi-language support, and 95+ Lighthouse scores.

## 🚀 Features

- **Dual Templates**: App marketing and consulting business websites
- **6 Languages**: EN, DE, FR, ES, IT, PT with cultural adaptation
- **95+ Lighthouse Scores**: Performance, accessibility, best practices, SEO
- **AI Content Generation**: Claude AI integration for expert-quality content
- **WCAG 2.1 AA Compliance**: Full accessibility
- **Privacy-First**: Cookieless analytics, GDPR compliant

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Claude API key (optional, for AI content generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/astro-websites.git
cd astro-websites

# Install dependencies
pnpm install

# Copy environment variables (optional)
cp .env.example .env

# Start development server
pnpm dev
```

Visit `http://localhost:4321` to see the platform.

### Generate Your First Site

```bash
# App marketing site
pnpm generate examples/fitness-app-config.json

# Consulting business site
pnpm generate examples/creative-agency-config.json
```

Generated sites appear in `generated-sites/` directory.

## 📁 Project Structure

```
astro-websites/
├── src/
│   ├── components/        # UI components (ui/, marketing/, consulting/)
│   ├── layouts/          # Page layouts
│   ├── pages/            # Astro pages
│   ├── config/           # i18n and site configuration
│   └── styles/           # Global styles
├── scripts/              # Site generation scripts
├── examples/             # Example configurations
├── generated-sites/      # Generated site output
└── docs/                # Comprehensive documentation
```

## 🎯 Site Generation

### Configuration Example

```json
{
  "name": "YourApp",
  "displayName": "YourApp - Amazing Mobile Experience",
  "businessType": "app-marketing",
  "tagline": "Your personal companion",
  "description": "Beautiful app description here",
  "primaryColor": "blue",
  "languages": ["en", "de", "fr"],
  "features": [
    {
      "icon": "⚡",
      "title": "Fast Performance",
      "description": "Lightning-fast user experience"
    }
  ],
  "appStore": {
    "ios": "https://apps.apple.com/app/yourapp/id123456789",
    "android": "https://play.google.com/store/apps/details?id=com.yourapp"
  }
}
```

### Business Types

- **`app-marketing`**: App store optimization, feature showcases, download CTAs
- **`consulting`**: Service portfolios, case studies, lead generation forms

### Supported Languages

EN (English), DE (German), FR (French), ES (Spanish), IT (Italian), PT (Portuguese)

## 🔧 Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm generate <file>  # Generate site from config
pnpm typecheck        # TypeScript type checking
pnpm lint             # Run linting

# Testing
pnpm test             # Run all tests (unit + E2E)
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm test:e2e:ui      # Interactive E2E testing (recommended)
pnpm test:visual      # Run visual regression tests
pnpm test:components  # Run component tests
```

## 🧪 Testing & Quality Assurance

### Comprehensive Test Suite

**145+ Automated Tests** covering:
- ✅ **E2E Tests** - User flows and navigation
- ✅ **Visual Regression** - Screenshot-based UI testing
- ✅ **Component Tests** - Individual component behavior
- ✅ **Multi-Site Tests** - Consistency across generated sites
- ✅ **Accessibility** - WCAG 2.1 AA compliance with @axe-core

### Quick Start Testing

```bash
# Interactive mode (best for development)
pnpm test:e2e:ui

# Run visual regression tests
pnpm test:visual

# Update visual baselines after UI changes
pnpm test:visual:update

# Component showcase pages (for manual inspection)
# Visit http://localhost:4321/test
```

### Component Showcase Pages

Interactive test pages for visual inspection:
- **`/test`** - Index of all showcases
- **`/test/buttons`** - All button variants and states
- **`/test/cards`** - All card variants and contexts
- **`/test/components`** - All components in one place

Features business context switcher and dark mode toggle.

### CI/CD Integration

All tests run automatically on:
- Push to main branch
- Pull requests (with results commented on PR)
- Includes screenshots, videos, and detailed reports as artifacts

See **[PLAYWRIGHT.md](docs/development/PLAYWRIGHT.md)** for complete testing guide.

## 🌍 Environment Variables

```bash
# Claude AI (optional - for AI content generation)
CLAUDE_API_KEY=your_claude_api_key_here

# Site Configuration
SITE=https://yourdomain.com
ASTRO_PUBLIC_SITE_URL=http://localhost:4321
ASTRO_PUBLIC_ANALYTICS_ENABLED=false
```

## 📊 Quality Standards

Every generated site meets:

- **Lighthouse Scores**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **WCAG 2.1 AA**: Full accessibility compliance
- **Core Web Vitals**: Optimized LCP, FID, CLS
- **Mobile-first**: Responsive design for all devices

## 📧 Form Integrations

### Newsletter Signups (Substack)
Perfect for book launches, courses, and content products:

```astro
import NewsletterSignup from '@/components/ui/NewsletterSignup.astro';

<NewsletterSignup
  substackUrl="https://yourname.substack.com/subscribe"
  title="Get Notified at Launch"
  variant="card"
/>
```

### App Signups (Audienceful)
Ideal for app launches and drip campaigns:

```astro
import AppSignup from '@/components/ui/AppSignup.astro';

<AppSignup
  audiencefulFormId="YOUR_FORM_ID"
  title="Join Waitlist"
  includeNameField={true}
  variant="card"
/>
```

**Demo Pages:**
- `/demo-book` - Substack integration examples
- `/demo-app` - Audienceful integration examples

See `FORM_INTEGRATION_GUIDE.md` for complete setup instructions.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Option 1: Connect GitHub repo at vercel.com
# Option 2: Deploy via CLI
npm i -g vercel
vercel login
vercel --prod
```

**Required Environment Variables:**
- `SITE` - Your production URL (e.g., `https://yourdomain.com`)

### Manual

```bash
pnpm build
# Deploy dist/ directory to your hosting provider
```

## 📚 Documentation

### For Developers
- **[CONTRIBUTING.md](docs/development/CONTRIBUTING.md)** - Development workflow and code standards
- **[ARCHITECTURE.md](docs/development/ARCHITECTURE.md)** - Platform architecture (3-level system)
- **[PLAYWRIGHT.md](docs/development/PLAYWRIGHT.md)** - Testing with Playwright (E2E, visual, component tests)
- **[FORM_INTEGRATIONS.md](docs/development/FORM_INTEGRATIONS.md)** - Substack & Audienceful integration
- **[CONTENT_GENERATION.md](docs/development/CONTENT_GENERATION.md)** - AI content generation prompts
- **[CLAUDE.md](CLAUDE.md)** - Instructions for Claude Code AI assistant

### For Marketing/Business Users
- **[QUICK_START.md](docs/marketing/QUICK_START.md)** - 5-minute setup guide
- **[SITE_GENERATION.md](docs/marketing/SITE_GENERATION.md)** - How to generate websites
- **[LAUNCH_CHECKLIST.md](docs/marketing/LAUNCH_CHECKLIST.md)** - Pre-launch checklist

## 🤝 Contributing

See [CONTRIBUTING.md](docs/development/CONTRIBUTING.md) for detailed guidelines.

Quick steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes following code standards
4. Run quality checks (`pnpm build`)
5. Submit a pull request

## 📜 License

MIT License - see LICENSE file for details

---

**Built with** Astro 5, React 19, Tailwind CSS 4, TypeScript, and Claude AI