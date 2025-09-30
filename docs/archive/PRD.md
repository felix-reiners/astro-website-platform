# Product Requirements Document (PRD)
## Multi-Template Website Generation Platform

### Executive Summary

We are building an automated platform to generate professional websites for both mobile apps and consulting businesses. The system will create beautiful, SEO-optimized, multi-language websites that can be deployed automatically with minimal human intervention, serving dual business needs and validating the platform's versatility.

---

## 🎯 Project Goals

### Primary Objectives
1. **Semi-automated website generation** for mobile apps and consulting with 90% automation
2. **Professional, accessible websites** that convert visitors to desired actions
3. **Multi-language support** for European markets (EN, DE, FR, ES, IT, PT)
4. **SEO dominance** through static generation and content automation
5. **Zero cookie consent banners** through privacy-first architecture
6. **Scalable template system** supporting multiple business models

### Success Metrics
- Generate new website in **< 30 minutes** (automated)
- Achieve **95+ PageSpeed Insights** scores
- Support **6+ languages** out of the box
- **WCAG 2.1 AA compliant** accessibility
- **Zero manual coding** required for new sites

---

## 🏗️ Strategic Architecture Decisions

### Framework Selection: **AstroPaper Foundation**
**Decision**: Fork AstroPaper and develop multiple template variations

**Rationale**:
- ✅ **Simplest, most robust codebase** - easier to own completely
- ✅ **Best accessibility foundation** - WCAG compliant out of the box
- ✅ **Excellent light/dark mode** - built-in theme system
- ✅ **MIT License** - full commercial use rights
- ✅ **No template dependencies** - we own our fork completely
- ✅ **Template versatility** - proven adaptable for different business models

### Technology Stack
```bash
Frontend Framework: Astro 5+
Styling: Tailwind CSS 4+
Components: React (for interactive elements)
Deployment: Vercel
Analytics: Cookieless (Vercel Analytics + custom server-side)
Fonts: Self-hosted (GDPR compliance)
Repository: GitHub
```

### Multi-Template Architecture
**Decision**: Shared Core + Template Variants

```bash
astro-websites/      # Master platform repo
├── templates/
│   ├── app-marketing/       # Mobile app marketing sites
│   └── consulting/          # Professional consulting sites
├── shared/
│   ├── components/ui/       # Shared UI components
│   ├── automation/          # Content generation scripts
│   ├── i18n/               # Multi-language system
│   └── analytics/          # Privacy-compliant tracking
├── generated-sites/
│   ├── app-sites/          # Generated app marketing sites
│   └── consulting-sites/   # Generated consulting sites
└── docs/                   # Comprehensive documentation
```

---

## 📋 Functional Requirements

### Core Shared Features

#### 1. Template System
- **Business configuration file** with variables (name, colors, logo, etc.)
- **Theme system** with CSS custom properties for easy color changes
- **Component library** shared across all generated sites
- **Layout inheritance** for consistent structure
- **Template switching** capability for different business models

#### 2. Multi-Language Support (i18n)
- **Target languages**: English (US/UK), German, French, Spanish, Italian, Portuguese
- **Content collections** organized by language and template type
- **Language switcher** component
- **SEO-optimized URLs** (e.g., `/de/features`, `/fr/services`)

#### 3. Analytics & Privacy
- **Cookieless tracking** using server-side logging
- **GDPR compliant** by design (no consent banners needed)
- **Basic metrics**: page views, conversion actions, referrers
- **Performance monitoring** across all generated sites

### App Marketing Template Features

#### Marketing Pages
- **Hero section** with app screenshots and download buttons
- **Features showcase** highlighting app functionality
- **Pricing information** (if applicable)
- **Testimonials/reviews** section
- **About/team** pages
- **Contact forms** (privacy-focused)

#### App-Specific Content
- **App store optimization** (ASO) elements
- **Download conversion tracking**
- **Feature comparison tables**
- **User onboarding flows**

### Consulting Template Features

#### Professional Pages
- **Services overview** with detailed offerings
- **Case studies** showcasing results and methodology
- **About page** establishing authority and credibility
- **Team profiles** highlighting expertise
- **Contact/consultation** booking integration
- **Resources/downloads** (whitepapers, assessments)

#### Consulting-Specific Content
- **Lead generation** optimization
- **Authority building** elements
- **Process/methodology** explanations
- **Client testimonials** and success metrics
- **Thought leadership** blog content

#### 4. Blog System (Both Templates)
- **SEO content automation** via Claude
- **Multi-language blog posts**
- **Categories and tags** for content organization
- **RSS feeds** for each language
- **Template-specific** content strategies

### Technical Requirements

#### Performance
- **PageSpeed Insights**: 95+ for all metrics
- **Core Web Vitals**: Green scores required
- **Bundle size**: < 100KB initial load
- **Images**: Optimized with proper alt text and lazy loading

#### Accessibility
- **WCAG 2.1 AA compliance**
- **Screen reader compatibility**
- **Keyboard navigation**
- **Color contrast ratios** > 4.5:1
- **Focus indicators** clearly visible

#### SEO
- **Static HTML generation**
- **Semantic markup** (headings, landmarks, etc.)
- **Open Graph tags** for social sharing
- **Structured data** (JSON-LD) for both business types
- **XML sitemaps** auto-generated
- **robots.txt** optimization

---

## 👥 Team Requirements

### Minimum Development Skills Needed

#### **Frontend Developer (Lead)**
**Required Skills**:
- ✅ **Astro framework** expertise (2+ years)
- ✅ **Tailwind CSS** advanced knowledge
- ✅ **React components** for interactive elements
- ✅ **TypeScript** for type safety
- ✅ **Git workflow** and branching strategies

**Enhanced for Dual Templates**:
- 🎯 **Component abstraction** for template reusability
- 🎯 **Business model understanding** (apps vs consulting)
- 🎯 **Conversion optimization** for different industries

#### **DevOps/Automation Engineer**
**Required Skills**:
- ✅ **Node.js scripting** for automation
- ✅ **GitHub Actions** for CI/CD
- ✅ **Vercel deployment** management
- ✅ **Claude AI integration** experience
- ✅ **Bash/shell scripting**

**Enhanced for Multi-Template**:
- 🎯 **Template orchestration** systems
- 🎯 **Content type management** (apps vs consulting)
- 🎯 **Business-specific automation** workflows

#### **UX/UI Designer**
**Required Skills**:
- ✅ **Mobile app marketing** design patterns
- ✅ **Professional services** website design
- ✅ **Conversion optimization** principles
- ✅ **Accessibility design** guidelines
- ✅ **Multi-language layouts** experience
- ✅ **Design systems** creation

**Nice to Have**:
- 🎯 **B2B vs B2C** design differences
- 🎯 **Trust-building** design elements
- 🎯 **Lead generation** optimization

#### **Content Strategist** (Part-time)
**Required Skills**:
- ✅ **SEO content creation**
- ✅ **Multi-language content** strategy
- ✅ **App marketing** copywriting
- ✅ **Professional services** content strategy
- ✅ **Claude prompt engineering**

**Dual-Template Expertise**:
- 🎯 **Industry-specific** content approaches
- 🎯 **B2B vs B2C** tone and messaging
- 🎯 **Lead nurturing** content funnels

---

## 🔧 Technical Constraints

### Must Haves
- **EU GDPR compliance** without cookie banners
- **Multi-language** support from day one
- **Mobile-first** responsive design
- **Fast deployment** (< 5 minutes per site)
- **Version control** for all generated sites
- **Template isolation** preventing cross-contamination

### Performance Budgets
- **Lighthouse Performance**: > 95
- **Lighthouse Accessibility**: > 95
- **Lighthouse Best Practices**: > 95
- **Lighthouse SEO**: > 95
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

### Browser Support
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions
- **Mobile browsers**: iOS Safari, Chrome Mobile

---

## 🚀 Success Criteria

### Phase 1: App Platform Foundation (Month 1)
- ✅ AstroPaper forked and customized for app marketing
- ✅ Basic template generation working
- ✅ Theme system implemented
- ✅ First app site generated and deployed
- ✅ Consulting template requirements documented

### Phase 2: App Platform Automation (Month 2)
- ✅ Claude integration for app content generation
- ✅ Multi-language system working
- ✅ Automated deployment pipeline
- ✅ 3+ app sites generated successfully
- ✅ Consulting template component planning

### Phase 3: App Platform Scale + Consulting Prep (Month 3)
- ✅ App platform performance optimization complete
- ✅ Analytics system working
- ✅ App platform documentation complete
- ✅ Consulting template architecture designed
- ✅ Cross-template shared components identified

### Phase 4: Consulting Template Development (Month 4)
- ✅ Consulting template components built
- ✅ Business-specific content automation
- ✅ First consulting site generated and deployed
- ✅ Template switching system implemented

### Long-term Vision
- **Generate 50+ websites annually** (apps + consulting)
- **Multi-business-model platform** proven and scalable
- **Advanced automation** with minimal human intervention
- **Performance leader** across multiple industries

---

## 📊 Risk Assessment

### High Risk
- **Scope creep** with dual templates: Maintain clear separation of concerns
- **Performance degradation**: Monitor bundle size across templates
- **Accessibility oversights**: Test both business contexts
- **Template complexity**: Keep shared components truly generic

### Medium Risk
- **Content quality variance**: Different industries need different approaches
- **Design consistency**: Balance shared design system with template uniqueness
- **Business model confusion**: Clear documentation and naming conventions

### Low Risk
- **Framework choice**: Astro proven suitable for both use cases
- **Deployment**: Vercel handles multiple sites efficiently
- **Legal compliance**: Privacy-first approach works for all business types

---

## 🎯 Platform Validation Strategy

### Business Case Validation
1. **App platform**: Proves scalability and automation for external clients
2. **Consulting sites**: Validates platform with immediate business need
3. **Dual templates**: Demonstrates platform versatility and market potential
4. **Revenue streams**: Platform development costs amortized across multiple businesses

### Technical Validation
1. **Shared components**: Proves component abstraction and reusability
2. **Content automation**: Tests Claude integration across different content types
3. **Performance**: Validates architecture scales across business models
4. **Maintenance**: Tests long-term sustainability of multi-template approach

---

## 📞 Next Steps

1. **Team assembly**: Hire/assign team members with dual-template awareness
2. **Repository setup**: Fork AstroPaper, create multi-template structure
3. **Development environment**: Setup workflow supporting template variants
4. **App platform first**: Build and validate core platform
5. **Consulting adaptation**: Apply learnings to consulting template
6. **Cross-template optimization**: Refine shared components and automation

---

*This expanded PRD serves as the north star for building a versatile website generation platform that serves both app marketing and consulting business needs, validating the platform's commercial viability while meeting immediate business requirements.*