# Multi-Template Website Generation Platform

Generate professional websites for mobile apps and consulting businesses with AI-powered content, multi-language support, and 95+ Lighthouse scores.

## 🚀 Features

- **Dual Templates**: Specialized templates for app marketing and consulting businesses
- **6 Languages**: EN, DE, FR, ES, IT, PT with cultural adaptation
- **95+ Lighthouse Scores**: Performance, accessibility, best practices, and SEO
- **AI Content Generation**: Claude AI integration for expert-quality content
- **WCAG 2.1 AA Compliance**: Full accessibility for all users
- **Privacy-First**: Cookieless analytics, GDPR compliant by design
- **Agent-First Architecture**: 12 specialized AI agents for autonomous development

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Claude API key (for content generation)

### Installation

1. Clone or download the project:
```bash
git clone https://github.com/yourusername/astro-website-platform.git
cd astro-website-platform
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:4321` to see the platform homepage.

### Troubleshooting Local Development

If the local server doesn't load properly:

1. **Approve build scripts** (if prompted):
```bash
pnpm approve-builds
```

2. **Try with host flag**:
```bash
pnpm dev --host
```

3. **Check alternative ports**:
```bash
pnpm dev --port 3000
```

4. **Use generated sites directly**:
```bash
cd generated-sites/weatherpro
npm install
npm run dev
```

### Generate Your First Site

Use one of the example configurations to generate a complete website:

```bash
# Generate an app marketing site
pnpm generate examples/weather-app-config.json

# Generate a consulting site  
pnpm generate examples/tech-consulting-config.json
```

The generated sites will be created in the `generated-sites/` directory.

## 📁 Project Structure

```
astro-website-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Core UI components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Astro pages
│   ├── config/             # Configuration files
│   │   ├── i18n.ts        # Internationalization config
│   │   └── site.ts        # Site configuration
│   ├── translations/       # Translation files
│   └── styles/            # Global styles
├── scripts/               # Build and generation scripts
│   └── generate-site.js   # Site generation script
├── examples/              # Example configurations
├── generated-sites/       # Output directory for generated sites
└── agents/               # AI agent configurations
```

## 🎯 Site Generation

### Configuration Format

Create a JSON configuration file with your site details:

```json
{
  "name": "YourApp",
  "displayName": "YourApp - Amazing Mobile Experience",
  "businessType": "app-marketing",
  "tagline": "Your personal companion",
  "description": "Beautiful app description here",
  "primaryColor": "blue",
  "secondaryColor": "sky",
  "languages": ["en", "de", "fr"],
  "defaultLanguage": "en",
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

**App Marketing** (`app-marketing`):
- App store links and download buttons
- Feature showcases and pricing plans
- User testimonials and app screenshots
- Mobile-first design and interactions

**Consulting** (`consulting`):
- Service portfolios and case studies
- Team profiles and expertise areas
- Contact forms and consultation booking
- Professional credibility elements

### Supported Languages

- **English** (en) - Primary language
- **German** (de) - Deutsche Sprache
- **French** (fr) - Français
- **Spanish** (es) - Español  
- **Italian** (it) - Italiano
- **Portuguese** (pt) - Português

## 🤖 AI Agent System

The platform uses 12 specialized AI agents for autonomous development:

- **astro-architect**: Framework architecture and routing
- **template-builder**: Template creation and customization
- **component-engineer**: Reusable component development
- **style-master**: Tailwind CSS theming and responsive design
- **i18n-specialist**: Multi-language implementation
- **content-generator**: AI-powered content creation
- **seo-optimizer**: Search engine optimization
- **performance-guardian**: Core Web Vitals optimization
- **accessibility-auditor**: WCAG 2.1 AA compliance
- **test-automation**: Testing strategies and implementation
- **deployment-orchestrator**: CI/CD and deployment automation
- **analytics-engineer**: Privacy-first analytics integration

## 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate a site from config
pnpm generate <config-file>

# Run type checking
pnpm typecheck

# Run linting
pnpm lint
```

## 📊 Quality Gates

Every generated site meets these standards:

- **Lighthouse Scores**: 95+ for Performance, Accessibility, Best Practices, SEO
- **WCAG 2.1 AA**: Full accessibility compliance
- **Core Web Vitals**: Optimized LCP, FID, CLS
- **Multi-language**: Proper i18n implementation
- **Mobile-first**: Responsive design for all devices

## 🌍 Environment Variables

```bash
# Claude AI (required for content generation)
CLAUDE_API_KEY=your_claude_api_key_here

# Vercel Deployment (optional)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here

# Site Configuration
ASTRO_PUBLIC_SITE_URL=http://localhost:4321
ASTRO_PUBLIC_ANALYTICS_ENABLED=false
```

## 📝 Examples

See the `examples/` directory for complete configuration examples:

- `weather-app-config.json` - Mobile app marketing site
- `tech-consulting-config.json` - B2B consulting website

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
# Build the site
pnpm build

# Deploy the dist/ directory to your hosting provider
```

## 📜 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and quality checks
5. Submit a pull request

For bug reports and feature requests, please open an issue on GitHub.

---

**Built with** Astro 5, React 19, Tailwind CSS 4, TypeScript, and Claude AI
