# Quick Start Guide - Generate Your First Site in 10 Minutes

🚀 **Get from zero to deployed website in 10 minutes**

---

## What You'll Build

Choose one of three professional templates:

| Template | Use Case | Time to Deploy |
|----------|----------|----------------|
| **📱 App Marketing** | Mobile apps, SaaS | 10 minutes |
| **💼 Consulting** | Agencies, services | 10 minutes |
| **📚 Book Promotion** | Authors, publishers | 10 minutes |

**All sites include:**
- ✅ 95+ Lighthouse scores (proven: 97-100)
- ✅ 5-8 KB gzipped pages
- ✅ 6 languages available
- ✅ Blog system (52 pages)
- ✅ Mobile responsive
- ✅ SEO optimized

---

## Method 1: Use Example Configs (Fastest - 5 Minutes)

### Step 1: Generate from Example (2 minutes)

```bash
# Choose your template:

# App Marketing
npm run generate examples/fitness-app-config.json

# Consulting
npm run generate examples/creative-agency-config.json

# Book Promotion
npm run generate examples/fiction-book-config.json

# SaaS Product
npm run generate examples/saas-app-config.json
```

### Step 2: Preview Your Site (1 minute)

```bash
cd generated-sites/fitnesstracker  # or your site name
npm install
npm run dev
```

Visit: **http://localhost:4321**

### Step 3: Deploy (2 minutes)

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy
vercel --prod
```

**Done! Your site is live!** 🎉

---

## Method 2: Create Custom Config (10 Minutes)

### Step 1: Create Your Config File (5 minutes)

Choose your business type and create a JSON file:

**📱 App Marketing** (`my-app.json`):
```json
{
  "name": "MyApp",
  "displayName": "MyApp - Your Productivity Companion",
  "businessType": "app-marketing",
  "tagline": "Get more done, stress less",
  "description": "The productivity app that adapts to how you work",
  "primaryColor": "blue",
  "languages": ["en"],
  "appStore": {
    "ios": "https://apps.apple.com/app/myapp/id123456789",
    "android": "https://play.google.com/store/apps/details?id=com.myapp"
  },
  "features": [
    {
      "icon": "⚡",
      "title": "Lightning Fast",
      "description": "Instant sync across all your devices"
    },
    {
      "icon": "🎯",
      "title": "Smart Goals",
      "description": "AI-powered goal tracking and recommendations"
    },
    {
      "icon": "📊",
      "title": "Rich Analytics",
      "description": "Beautiful charts that show your progress"
    }
  ],
  "pricing": {
    "free": {
      "name": "Free",
      "price": 0,
      "features": ["Basic features", "3 projects", "1 GB storage"]
    },
    "premium": {
      "name": "Premium",
      "price": 9.99,
      "features": ["All features", "Unlimited projects", "100 GB storage", "Priority support"]
    }
  }
}
```

**💼 Consulting** (`my-agency.json`):
```json
{
  "name": "MyAgency",
  "displayName": "My Agency - Strategic Excellence",
  "businessType": "consulting",
  "tagline": "Strategy that delivers results",
  "description": "We help businesses grow through data-driven strategies",
  "primaryColor": "navy",
  "languages": ["en"],
  "services": [
    {
      "icon": "📈",
      "title": "Growth Strategy",
      "description": "Accelerate your business growth with proven frameworks",
      "deliverables": ["Market analysis", "Growth roadmap", "KPI framework"]
    },
    {
      "icon": "💡",
      "title": "Digital Transformation",
      "description": "Modernize operations with technology and process optimization",
      "deliverables": ["Technology audit", "Implementation plan", "Change management"]
    }
  ],
  "team": [
    {
      "name": "Your Name",
      "role": "Founder & CEO",
      "expertise": ["Strategy", "Digital Transformation"],
      "experience": "15+ years consulting experience"
    }
  ],
  "contact": {
    "email": "hello@myagency.com",
    "phone": "+1-555-AGENCY",
    "calendly": "https://calendly.com/myagency/consultation"
  }
}
```

**📚 Book Promotion** (`my-book.json`):
```json
{
  "name": "MyBook",
  "displayName": "My Amazing Book - A Thrilling Adventure",
  "businessType": "book",
  "tagline": "A journey you'll never forget",
  "description": "An epic tale of courage, betrayal, and redemption",
  "primaryColor": "slate",
  "languages": ["en"],
  "author": {
    "name": "Your Name",
    "bio": "Award-winning author with 3 bestsellers",
    "photo": "/images/author.jpg"
  },
  "book": {
    "genre": "Thriller",
    "pages": 320,
    "releaseDate": "2025-06-15",
    "isbn": "978-1234567890",
    "publisher": "Your Publisher"
  },
  "chapters": [
    {
      "number": 1,
      "title": "The Beginning",
      "preview": "The first paragraph of your gripping opening chapter that hooks readers immediately..."
    }
  ],
  "newsletter": {
    "provider": "substack",
    "url": "https://yourname.substack.com/subscribe"
  }
}
```

### Step 2: Generate Your Site (3 minutes)

```bash
npm run generate my-app.json
```

**What happens automatically:**
- ✅ AI generates SEO-optimized copy
- ✅ Creates multi-language versions (if specified)
- ✅ Builds blog system with 52 pages
- ✅ Optimizes performance (sub-10KB pages)
- ✅ Runs 145 automated tests
- ✅ Validates accessibility compliance

### Step 3: Preview (1 minute)

```bash
cd generated-sites/myapp
npm install
npm run dev
```

### Step 4: Deploy (1 minute)

```bash
vercel --prod
```

**Live! 🎉**

---

## Quick Customization Guide

### Change Colors

```json
{
  "primaryColor": "blue"  // Options: blue, green, purple, orange, navy, emerald, slate, burgundy
}
```

**App Marketing Colors:**
- `blue` - Trust (fintech, productivity)
- `green` - Health (fitness, wellness)
- `purple` - Premium (design, entertainment)
- `orange` - Energy (social, gaming)

**Consulting Colors:**
- `navy` - Authority (B2B, finance)
- `emerald` - Innovation (marketing, tech)
- `slate` - Modern (design studios)
- `burgundy` - Premium (executive services)

### Add Languages

```json
{
  "languages": ["en", "de", "es"]  // Adds German and Spanish
}
```

Supported: `en`, `de`, `fr`, `es`, `it`, `pt`

**Pro tip:** Start with `["en"]` to test, then add others.

### Add Features (App Marketing)

```json
{
  "features": [
    {
      "icon": "emoji or SVG path",
      "title": "Feature Name",
      "description": "Benefit-focused description"
    }
  ]
}
```

### Add Services (Consulting)

```json
{
  "services": [
    {
      "icon": "emoji or SVG path",
      "title": "Service Name",
      "description": "Value proposition",
      "deliverables": ["What", "You", "Deliver"]
    }
  ]
}
```

### Add Chapters (Book)

```json
{
  "chapters": [
    {
      "number": 1,
      "title": "Chapter Title",
      "preview": "First few paragraphs to hook readers..."
    }
  ]
}
```

---

## Form Integrations

### Newsletter Signup (Substack)

**Perfect for:** Book launches, content marketing

**Setup (2 minutes):**

1. Get your Substack URL: `https://yourname.substack.com/subscribe`
2. Add to your config:

```json
{
  "newsletter": {
    "provider": "substack",
    "url": "https://yourname.substack.com/subscribe"
  }
}
```

3. Use in pages:

```astro
<NewsletterSignup
  substackUrl="https://yourname.substack.com/subscribe"
  title="Get Launch Updates"
  description="Plus free chapter previews"
  buttonText="Notify Me"
/>
```

### App Waitlist (Audienceful)

**Perfect for:** App launches, drip campaigns

**Setup (3 minutes):**

1. Create form at app.audienceful.com
2. Copy your Form ID (e.g., `abc123xyz`)
3. Use in pages:

```astro
<AppSignup
  audiencefulFormId="abc123xyz"
  title="Join the Waitlist"
  description="Get early access and exclusive pricing"
  includeNameField={true}
  buttonText="Join Waitlist"
/>
```

**Full guides:**
- Quick: This section
- Detailed: `docs/development/FORM_INTEGRATIONS.md`

---

## Blog System

**Automatically included in every generated site!**

### What You Get

- ✅ 52 static pages
- ✅ RSS feed for subscriptions
- ✅ Category filtering
- ✅ Tag system
- ✅ Featured posts
- ✅ Social sharing
- ✅ SEO optimized

### Adding Blog Posts

Create markdown files in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "SEO description"
pubDate: 2025-01-15
author: "Your Name"
category: "app-marketing"  # or "consulting" or "book" or "general"
tags: ["tag1", "tag2"]
featured: true
---

Your content here with full markdown support...

## Subheadings work

- Lists work
- **Bold** and *italic* work
- Links work
- Images work
```

Blog automatically appears at: `/blog`

---

## Performance Metrics

Your generated site includes:

### Actual Results

**Bundle Size:**
- Initial load: **5-8 KB gzipped** (industry avg: 100KB)
- Average page: **25 KB uncompressed**
- **94% smaller** than target!

**Lighthouse Scores** (verified by CI):
- Performance: **97-100/100** ✅
- Accessibility: **95+/100** ✅
- Best Practices: **95+/100** ✅
- SEO: **95+/100** ✅

**Quality Assurance:**
- **145 automated tests** run on every generation
- **93% code coverage** on critical code
- **Accessibility validated** with axe-core
- **Cross-browser tested** (Chrome, Firefox, Safari)

---

## Deployment Options

### Vercel (Recommended - Free)

```bash
# One-time setup
npm i -g vercel
vercel login

# Deploy
cd generated-sites/yoursite
vercel --prod
```

**Benefits:**
- Free for personal projects
- Automatic SSL
- Global CDN
- Custom domains
- Auto-deployments from Git

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

### Traditional Hosting

1. Run `npm run build`
2. Upload `dist/` folder via FTP/SFTP
3. Point domain to folder

---

## Troubleshooting

### Generation Fails

**Error:** "Cannot find module"
**Fix:** Run `npm install` in project root

**Error:** "CLAUDE_API_KEY not found"
**Fix:** Add to `.env` file:
```
CLAUDE_API_KEY=your_key_here
```

### Build Errors

**Error:** Build fails after generation
**Fix:** Check generated site's terminal output:
```bash
cd generated-sites/yoursite
npm run build
```

### Site Looks Wrong

**Issue:** Colors don't match examples
**Fix:** Verify `primaryColor` in config matches a valid option:
- App: `blue`, `green`, `purple`, `orange`
- Consulting: `navy`, `emerald`, `slate`, `burgundy`

---

## Next Steps

### After Deployment

1. **Set up analytics** (Plausible, Fathom, or similar)
2. **Test forms** (Substack, Audienceful integrations)
3. **Add blog posts** regularly
4. **Monitor performance** with Lighthouse
5. **Collect feedback** from users

### Scaling Up

**Add more languages:**
```json
{
  "languages": ["en", "de", "fr", "es"]
}
```

**A/B test colors:**
Generate multiple versions with different `primaryColor` values.

**Customize further:**
Generated sites are fully editable - modify any file in `generated-sites/yoursite/`

---

## Component Quick Reference

### All Templates Get

- `<Navigation />` - Responsive header with mobile menu
- `<Footer />` - Links, social media, business info
- `<Hero />` - Above-fold section with CTA
- `<Card />` - Content cards with variants
- `<Button />` - CTA buttons with variants
- `<ContactForm />` - Basic contact form

### App Marketing Components

- `<FeatureGrid />` - Feature showcase with icons
- `<PricingTable />` - Pricing tiers comparison
- `<AppDownload />` - App store download buttons
- `<TestimonialCard />` - User reviews
- `<InteractiveAppScreenshots />` - Screenshot carousel
- `<SmartPricingTable />` - Advanced pricing with toggle
- `<AppSignup />` - Audienceful waitlist integration

### Consulting Components

- `<ServicesGrid />` - Service offerings with deliverables
- `<CaseStudyCard />` - Success stories with metrics
- `<LeadQualificationForm />` - Multi-step lead capture
- `<TeamShowcase />` - Team member profiles

### Book Components

- `<ChapterPreview />` - Sample chapter display
- `<AuthorBio />` - Author profile with photo
- `<BookDetails />` - Metadata (pages, ISBN, genre)
- `<NewsletterSignup />` - Substack email capture

---

## Example Sites

**Explore these working examples:**

1. **Fitness App** - `generated-sites/fitnesstracker/`
   - Generated from: `examples/fitness-app-config.json`
   - Shows: App store links, freemium pricing, health focus

2. **SaaS Product** - `generated-sites/projectflow/`
   - Generated from: `examples/saas-app-config.json`
   - Shows: B2B messaging, tiered pricing, integrations

3. **Creative Agency** - `generated-sites/studiobright/`
   - Generated from: `examples/creative-agency-config.json`
   - Shows: Portfolio layout, services, team showcase

**Generate an example to explore:**
```bash
npm run generate examples/fitness-app-config.json
cd generated-sites/fitnesstracker
npm install && npm run dev
```

---

## Getting Help

### Documentation

**For Marketing:**
- **This guide** - Quick start
- `SITE_GENERATION.md` - Complete generation guide
- `LAUNCH_CHECKLIST.md` - Pre-launch tasks

**For Technical:**
- `docs/development/ARCHITECTURE.md` - System overview
- `docs/development/CONTRIBUTING.md` - Development guide
- `docs/development/CICD.md` - Automated testing & deployment

### Support

1. **Review examples** in `examples/` directory
2. **Check documentation** linked above
3. **Generate example site** to compare with yours
4. **Review build logs** for specific errors

---

## Quick Tips

### Marketing

✅ **Lead with benefits, not features**
✅ **Show social proof** (ratings, downloads, testimonials)
✅ **Multiple CTAs** above and below fold
✅ **Clear value proposition** in headline
✅ **Mobile-first** design included

### Technical

✅ **Start simple** - Use `["en"]` for first site
✅ **Test locally** before deploying
✅ **Run Lighthouse** audit after deploy
✅ **Monitor analytics** post-launch
✅ **Update blog regularly** for SEO

### Performance

✅ **Already optimized** - 5-8 KB gzipped
✅ **No JS required** - Static HTML
✅ **Fast builds** - <2 seconds
✅ **Global CDN** - Via Vercel/Netlify
✅ **Perfect scores** - 95+ Lighthouse

---

## FAQs

**Q: How long does generation take?**
A: 5-10 minutes depending on number of languages

**Q: Can I edit the generated site?**
A: Yes! All files in `generated-sites/yoursite/` are editable

**Q: How many sites can I generate?**
A: Unlimited - each goes to `generated-sites/[name]/`

**Q: Do I need coding knowledge?**
A: No for basic generation, yes for advanced customization

**Q: What if I make a mistake?**
A: Regenerate anytime with `npm run generate your-config.json --force`

**Q: Can I add custom pages?**
A: Yes - add files to `src/pages/` in generated site

**Q: Is the blog required?**
A: No, but included automatically. Delete `src/content/blog/` if not needed.

**Q: Can I use my own domain?**
A: Yes - configure in Vercel/Netlify dashboard

---

## One-Line Summaries

**To generate:** `npm run generate your-config.json`
**To preview:** `cd generated-sites/yoursite && npm run dev`
**To deploy:** `vercel --prod`

That's it! 🚀

---

**Ready to build?** Start with an example config or create your own. You'll have a professional site live in 10 minutes.

**Questions?** See `SITE_GENERATION.md` for comprehensive guide or `LAUNCH_CHECKLIST.md` for pre-launch prep.
