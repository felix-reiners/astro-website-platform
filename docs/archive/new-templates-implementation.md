# New Templates Implementation Plan
## Book Promotion & Painted Door Landing Page Templates

**Document Version:** 1.0
**Created:** 2025-01-13
**Status:** Ready for Implementation
**Estimated Duration:** 2 weeks

---

## 📋 Executive Summary

### Overview
This document outlines the implementation plan for two new templates in the astro-websites platform:
1. **Book Promotion Template** - For authors, publishers, and book launches
2. **Painted Door Landing Page** - For product validation and early-stage startups

### Strategic Decision: Build vs. Buy
**Decision: Build from existing system**

**Rationale:**
- **70% component reuse** from existing Button, Hero, Card, ContactForm, etc.
- **Architectural consistency** with current app-marketing and consulting templates
- **i18n integration** works immediately (6 languages out of the box)
- **Content generation continuity** with Claude AI scripts
- **Performance & accessibility guaranteed** (95+ Lighthouse, WCAG 2.1 AA)
- **Faster time to market** (2 weeks vs 3-4 weeks for external template integration)
- **Single codebase** maintenance vs. frankenstack of different systems

### Key Metrics
- **New components to build:** 9 total (5 book + 4 painted door)
- **Existing components to reuse:** 13
- **Component reuse rate:** 70%
- **Development time:** 2 weeks (1 week per template)
- **Quality gates:** Same as existing (95+ Lighthouse, WCAG 2.1 AA)

---

## 📚 Template 1: Book Promotion

### Target Audience
- Fiction and non-fiction authors
- Publishing houses
- Book launch campaigns
- Author platform building
- Book series promotion

### Use Cases
1. **New book launch** - Promote upcoming releases with pre-order links
2. **Author platform** - Central hub for author's entire catalog
3. **Book series** - Showcase multiple books in a series
4. **Limited-time promotions** - Special pricing or bundle offers
5. **Newsletter signups** - Build reader email lists

### Key Features
✅ Prominent book cover display with high-res images
✅ Author biography with photo and credentials
✅ Book excerpt/sample chapter reader
✅ Multi-retailer buy links (Amazon, B&N, indie bookstores)
✅ Editorial reviews and reader testimonials
✅ Book details (genre, page count, ISBN, publication date)
✅ Newsletter signup for reader engagement
✅ Book series navigation
✅ Multi-language support for international markets
✅ Mobile-optimized reading experience

### Page Structure
```
Book Promotion Page Layout:
├── Hero Section (BookCover component)
│   ├── Large book cover image
│   ├── Title, subtitle, author
│   ├── Star rating / review count
│   └── Primary CTA (Buy Now / Pre-order)
├── Quick Buy Section (BuyLinks component)
│   ├── Amazon
│   ├── Barnes & Noble
│   ├── Apple Books
│   ├── Kobo
│   └── Independent bookstores
├── Book Description Section
│   └── Rich text with book synopsis
├── Book Excerpt Section (BookExcerpt component)
│   └── Sample chapter or first pages
├── Author Bio Section (AuthorBio component)
│   ├── Author photo
│   ├── Biography
│   ├── Previous works
│   └── Social media links
├── Reviews Section (BookReviews component)
│   ├── Editorial reviews (NYT, Publishers Weekly, etc.)
│   ├── Reader testimonials
│   └── Star ratings
├── Book Details Section
│   ├── Genre/category
│   ├── Page count
│   ├── ISBN
│   ├── Publisher
│   └── Publication date
└── Newsletter Signup Section (ContactForm adapted)
    └── Email capture for new releases
```

### New Components Required

#### 1. BookCover.astro
**Purpose:** Hero section with prominent book cover and primary CTA

**Props Interface:**
```typescript
export interface Props {
  coverImage: string;          // URL to high-res cover image
  coverAlt: string;            // Alt text for accessibility
  title: string;               // Book title
  subtitle?: string;           // Optional subtitle
  author: string;              // Author name
  authorPhoto?: string;        // Optional author photo URL
  rating?: number;             // Star rating (0-5)
  reviewCount?: number;        // Number of reviews
  ctaText: string;            // Primary button text
  ctaLink: string;            // Primary button URL
  secondaryCtaText?: string;  // Optional secondary CTA
  secondaryCtaLink?: string;  // Optional secondary CTA URL
  genre?: string;             // Book genre/category
  publicationDate?: string;   // Release date
  preOrder?: boolean;         // Is this a pre-order?
  class?: string;             // Additional CSS classes
}
```

**Design Requirements:**
- Book cover displayed prominently (mobile: full width, desktop: left side)
- High contrast text on gradient or solid background
- Responsive layout: stacked on mobile, side-by-side on desktop
- CTA buttons highly visible with conversion-optimized colors
- Badge for "Bestseller" or "New Release" if applicable
- WCAG AA contrast ratios
- Optimized images (WebP/AVIF with fallbacks)

#### 2. AuthorBio.astro
**Purpose:** Author biography with photo and credentials

**Props Interface:**
```typescript
export interface Props {
  name: string;              // Author name
  photo: string;             // Author photo URL
  photoAlt: string;          // Photo alt text
  bio: string;               // Biography (supports markdown)
  credentials?: string[];    // Awards, education, achievements
  previousWorks?: Array<{    // Previous books
    title: string;
    coverImage: string;
    link: string;
  }>;
  socialLinks?: {            // Social media
    website?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    goodreads?: string;
  };
  variant?: 'default' | 'compact' | 'detailed';
  class?: string;
}
```

**Design Requirements:**
- Author photo (circular or rounded corners)
- Biography text with readable typography
- Credentials displayed as badges or list
- Previous works in card grid layout
- Social media icons with hover effects
- Responsive: single column mobile, two-column desktop
- Accessibility: proper heading hierarchy

#### 3. BookExcerpt.astro
**Purpose:** Display sample chapter or book preview

**Props Interface:**
```typescript
export interface Props {
  title: string;             // Excerpt title (e.g., "Chapter 1: The Beginning")
  content: string;           // Excerpt text (markdown supported)
  showReadMore?: boolean;    // Show "Read More" CTA
  readMoreLink?: string;     // Link to full sample
  backgroundColor?: string;  // Background color
  textColor?: string;       // Text color
  maxHeight?: string;       // Max height before scrolling
  class?: string;
}
```

**Design Requirements:**
- Book-style typography (serif font option)
- Subtle background (parchment or light texture)
- Comfortable reading width (max 70ch)
- "Read More" CTA if excerpt is truncated
- Print-friendly styles
- Mobile-optimized reading experience
- Dark mode support

#### 4. BuyLinks.astro
**Purpose:** Multi-retailer purchase links with retailer logos

**Props Interface:**
```typescript
export interface Props {
  retailers: Array<{
    name: string;            // Retailer name
    logo: string;            // Logo URL or icon
    link: string;            // Purchase link
    price?: string;          // Optional price display
    format?: string;         // e.g., "Hardcover", "Kindle", "Audiobook"
    affiliate?: boolean;     // Is this an affiliate link?
  }>;
  title?: string;            // Section title (default: "Buy Now")
  layout?: 'grid' | 'list' | 'compact';
  highlightPrimary?: boolean; // Highlight first retailer
  class?: string;
}
```

**Design Requirements:**
- Retailer logos clearly visible
- Links open in new tab with proper rel attributes
- Grid layout: 2 columns mobile, 3-4 desktop
- Hover effects on retailer cards
- Affiliate disclosure if applicable (FTC compliance)
- Analytics tracking on clicks
- Mobile-friendly tap targets (min 44x44px)

#### 5. BookReviews.astro
**Purpose:** Editorial reviews and reader testimonials

**Props Interface:**
```typescript
export interface Props {
  reviews: Array<{
    type: 'editorial' | 'reader';
    source: string;          // Publication or reviewer name
    sourceLogo?: string;     // Optional logo (for editorial)
    quote: string;           // Review text
    rating?: number;         // Star rating (reader reviews)
    date?: string;           // Review date
    verified?: boolean;      // Verified purchase (reader reviews)
  }>;
  averageRating?: number;    // Overall average rating
  totalReviews?: number;     // Total review count
  layout?: 'carousel' | 'grid' | 'masonry';
  showRatings?: boolean;     // Display star ratings
  class?: string;
}
```

**Design Requirements:**
- Editorial reviews prominently displayed (NYT, Publishers Weekly)
- Reader reviews with star ratings
- Quote styling with quotation marks
- Source attribution clear and credible
- Responsive grid or carousel
- Star rating visual component
- Schema.org markup for SEO (Review, AggregateRating)

---

## 🚀 Template 2: Painted Door Landing Page

### Target Audience
- Early-stage startups validating product ideas
- Product managers testing feature demand
- Entrepreneurs conducting market research
- Growth hackers running experiments
- Lean Startup practitioners

### Use Cases
1. **Product validation** - Test interest before building
2. **Feature testing** - Gauge demand for new features
3. **Market research** - Collect emails from target audience
4. **Pricing experiments** - Test willingness to pay
5. **MVP pre-launch** - Build email list before launch

### Key Features
✅ High-impact hero with clear value proposition
✅ Problem/solution messaging framework
✅ Simple email capture form (low friction)
✅ Coming soon features showcase
✅ Social proof (testimonials, beta user count)
✅ Thank you message with next steps
✅ Email confirmation and nurture sequence
✅ Analytics tracking for conversion optimization
✅ A/B testing ready
✅ GDPR compliant email capture

### Page Structure
```
Painted Door Landing Page Layout:
├── Hero Section (Hero component - minimal variant)
│   ├── Headline (problem-focused)
│   ├── Subheadline (solution)
│   └── Primary CTA (Email capture)
├── Problem Section (ProblemSolution component)
│   ├── The Problem (pain points)
│   └── The Solution (your product)
├── Features Section (ComingSoonFeatures component)
│   └── Feature teasers with "Coming Soon" badges
├── Social Proof Section (TestimonialCard reused)
│   ├── Beta user testimonials
│   ├── Waitlist count ("Join 1,247 people")
│   └── Company logos (if applicable)
├── Email Capture Section (EmailCaptureForm component)
│   ├── Simple form (email only or email + name)
│   ├── Privacy statement
│   └── Primary CTA button
└── Thank You Message (ThankYouMessage component)
    ├── Confirmation message
    ├── Next steps
    └── Social sharing CTAs
```

### New Components Required

#### 1. EmailCaptureForm.astro
**Purpose:** Conversion-optimized email signup form

**Props Interface:**
```typescript
export interface Props {
  title?: string;              // Form heading
  description?: string;        // Form description
  buttonText?: string;         // Submit button text (default: "Get Early Access")
  emailPlaceholder?: string;   // Email input placeholder
  collectName?: boolean;       // Collect name in addition to email
  namePlaceholder?: string;    // Name input placeholder
  privacyText?: string;        // Privacy policy text
  privacyLink?: string;        // Privacy policy URL
  successMessage?: string;     // Post-submission message
  errorMessage?: string;       // Error message
  apiEndpoint?: string;        // Form submission endpoint
  variant?: 'inline' | 'modal' | 'sidebar';
  showSocialProof?: boolean;   // Show signup count
  signupCount?: number;        // Number of signups
  class?: string;
}
```

**Design Requirements:**
- Minimal friction (email only by default)
- Large, high-contrast CTA button
- Inline validation with helpful error messages
- Loading state during submission
- Success state with animation
- Mobile-optimized (full width on small screens)
- GDPR compliant (opt-in checkbox if EU traffic)
- Honeypot spam protection
- Analytics tracking (form views, submissions, errors)
- Accessible form labels and error messages

#### 2. ProblemSolution.astro
**Purpose:** Problem/solution messaging framework

**Props Interface:**
```typescript
export interface Props {
  problem: {
    heading: string;         // Problem statement
    description: string;     // Problem details
    painPoints: string[];    // List of pain points
    icon?: string;           // Problem icon/emoji
  };
  solution: {
    heading: string;         // Solution statement
    description: string;     // How your product solves it
    benefits: string[];      // Key benefits
    icon?: string;           // Solution icon/emoji
  };
  layout?: 'side-by-side' | 'stacked' | 'before-after';
  variant?: 'default' | 'dramatic' | 'subtle';
  class?: string;
}
```

**Design Requirements:**
- Visual contrast between problem (red/orange) and solution (green/blue)
- Icons or illustrations for visual impact
- Pain points as bullet list with checkmarks/x-marks
- Benefits as bullet list with checkmarks
- Responsive layout: stacked mobile, side-by-side desktop
- Emotional messaging (problem = frustration, solution = relief)
- Clear visual hierarchy

#### 3. ComingSoonFeatures.astro
**Purpose:** Showcase upcoming features to build excitement

**Props Interface:**
```typescript
export interface Props {
  features: Array<{
    title: string;           // Feature name
    description: string;     // Feature description
    icon?: string;           // Feature icon
    comingSoon?: boolean;    // Show "Coming Soon" badge
    eta?: string;            // Optional ETA ("Q2 2025")
    previewImage?: string;   // Optional screenshot/mockup
  }>;
  title?: string;            // Section title
  description?: string;      // Section description
  layout?: 'grid' | 'list' | 'timeline';
  showEta?: boolean;         // Display ETAs
  variant?: 'default' | 'teaser' | 'detailed';
  class?: string;
}
```

**Design Requirements:**
- "Coming Soon" badges on unreleased features
- Feature icons for quick scanning
- Optional preview images (mockups/screenshots)
- Grid layout: 1 column mobile, 2-3 desktop
- Hover effects with subtle animation
- Timeline variant shows roadmap visually
- Builds anticipation and FOMO

#### 4. ThankYouMessage.astro
**Purpose:** Post-signup confirmation with next steps

**Props Interface:**
```typescript
export interface Props {
  heading?: string;          // Thank you heading
  message: string;           // Confirmation message
  nextSteps?: Array<{        // What happens next
    step: string;
    description: string;
    icon?: string;
  }>;
  socialSharing?: {          // Encourage sharing
    enabled: boolean;
    message?: string;        // "Share with friends?"
    platforms?: ('twitter' | 'facebook' | 'linkedin')[];
  };
  ctaText?: string;          // Optional CTA
  ctaLink?: string;          // Optional CTA link
  variant?: 'modal' | 'inline' | 'fullscreen';
  class?: string;
}
```

**Design Requirements:**
- Celebratory design (confetti animation, success colors)
- Clear confirmation that signup succeeded
- Next steps with timeline ("Within 24 hours: Check email")
- Social sharing buttons for viral growth
- Optional CTA for immediate action
- Can be modal overlay or full page
- Mobile-friendly

---

## 🏗️ Component Development Details

### Shared Development Standards

All new components must follow these standards:

#### TypeScript Interfaces
```typescript
// All components must export their Props interface
export interface Props {
  // Required props (no default values)
  requiredProp: string;

  // Optional props (with ? or default values)
  optionalProp?: string;

  // CSS customization
  class?: string;

  // Variants for different styles
  variant?: 'default' | 'alternative';
}
```

#### Accessibility Requirements
- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus visible styles
- ✅ Color contrast WCAG AA (4.5:1 text, 3:1 UI)
- ✅ Alt text for all images
- ✅ Form labels and error messages
- ✅ Screen reader tested

#### Responsive Design Breakpoints
```css
/* Mobile First Approach */
/* Mobile: default (< 640px) */
/* Tablet: sm (≥ 640px) */
/* Desktop: md (≥ 768px) */
/* Large Desktop: lg (≥ 1024px) */
/* XL Desktop: xl (≥ 1280px) */
```

#### Performance Requirements
- ✅ Images: WebP/AVIF with JPG fallback
- ✅ Lazy loading for below-the-fold images
- ✅ CSS: Tailwind utility classes (no custom CSS unless necessary)
- ✅ JavaScript: Minimal to none (Astro islands only when needed)
- ✅ Lighthouse Performance: 95+
- ✅ Core Web Vitals: All green

#### Theme Integration
```typescript
// Use existing Tailwind theme variables
// Located in: tailwind.config.cjs

// Colors
'primary' // Main brand color
'secondary' // Accent color
'accent' // CTA color
'neutral' // Backgrounds
'text-base' // Body text
'text-light' // Muted text

// Typography
font-sans // Body font
font-heading // Heading font

// Business-specific variants
data-business-type="book-promotion"
data-business-type="painted-door"
```

---

## 📅 Implementation Timeline

### Week 1: Book Promotion Template (5 days)

#### Day 1: Setup & Planning
**Morning:**
- [x] Create `src/pages/book-promotion.astro` page file
- [x] Create `src/components/book/` directory
- [x] Review existing components for reuse (Hero, Card, Button, etc.)
- [x] Setup Tailwind theme variants for book promotion

**Afternoon:**
- [x] Create component stub files (BookCover, AuthorBio, BookExcerpt, BuyLinks, BookReviews)
- [x] Define TypeScript interfaces for all props
- [x] Write accessibility requirements checklist
- [x] Setup test page for component development

**Deliverable:** Project structure and interfaces defined

#### Day 2: Core Components (BookCover, AuthorBio)
**Morning:**
- [x] Build BookCover.astro component
  - Layout: book cover + title + CTA
  - Responsive design
  - Accessibility: alt text, heading hierarchy
- [x] Test BookCover on multiple screen sizes
- [x] Add to Storybook/component library

**Afternoon:**
- [x] Build AuthorBio.astro component
  - Layout: photo + bio + credentials
  - Previous works grid
  - Social media links
- [x] Test AuthorBio responsively
- [x] Accessibility audit

**Deliverable:** BookCover and AuthorBio components complete and tested

#### Day 3: Content Components (BookExcerpt, BuyLinks)
**Morning:**
- [x] Build BookExcerpt.astro component
  - Typography for reading experience
  - Scroll container for long excerpts
  - "Read More" functionality
- [x] Test reading experience on mobile
- [x] Add print-friendly styles

**Afternoon:**
- [x] Build BuyLinks.astro component
  - Retailer logo grid
  - Affiliate link support
  - Analytics tracking hooks
- [x] Add retailer logos (Amazon, B&N, etc.)
- [x] FTC affiliate disclosure

**Deliverable:** BookExcerpt and BuyLinks components complete

#### Day 4: Reviews & Page Assembly
**Morning:**
- [x] Build BookReviews.astro component
  - Editorial reviews layout
  - Reader reviews with ratings
  - Star rating visual component
  - Schema.org markup for SEO
- [x] Test reviews carousel/grid

**Afternoon:**
- [x] Assemble complete book-promotion.astro page
- [x] Integrate all components
- [x] Add transitions and animations
- [x] Test full page flow

**Deliverable:** Complete book promotion page assembled

#### Day 5: Content Generation & Testing
**Morning:**
- [ ] Extend content generator for book business type
- [x] Create example book-promotion-config.json
- [ ] Test content generation with Claude AI
- [x] Add book-specific translation keys for i18n

**Afternoon:**
- [x] Lighthouse audit (target: 95+)
- [ ] Accessibility audit (axe-core)
- [ ] Multi-language testing (6 languages)
- [ ] Cross-browser testing
- [ ] Bug fixes and polish

**Deliverable:** Book promotion template complete, tested, and documented

---

### Week 2: Painted Door Landing Page (5 days)

#### Day 6: Setup & Planning
**Morning:**
- [x] Create `src/pages/painted-door.astro` page file
- [x] Create `src/components/landing/` directory
- [x] Review conversion optimization best practices
- [x] Setup Tailwind theme variants for painted door (bold CTAs)

**Afternoon:**
- [x] Create component stub files (EmailCaptureForm, ProblemSolution, ComingSoonFeatures, ThankYouMessage)
- [x] Define TypeScript interfaces for all props
- [x] Plan analytics tracking strategy
- [ ] Setup A/B testing infrastructure

**Deliverable:** Project structure and conversion strategy defined

#### Day 7: Email Capture & Forms
**Morning:**
- [x] Build EmailCaptureForm.astro component
  - Form layout and styling
  - Inline validation
  - Loading states
  - Success/error states
- [x] Add honeypot spam protection
- [x] GDPR compliance (opt-in checkbox)

**Afternoon:**
- [x] Form submission logic
- [x] Email validation
- [x] Analytics tracking (form views, submissions, errors)
- [x] Test form on mobile devices
- [x] Accessibility audit (form labels, error messages)

**Deliverable:** EmailCaptureForm component complete and conversion-optimized

#### Day 8: Messaging Components
**Morning:**
- [x] Build ProblemSolution.astro component
  - Problem section (pain points)
  - Solution section (benefits)
  - Visual contrast (red → green)
  - Icons and illustrations
- [x] Test emotional messaging impact

**Afternoon:**
- [x] Build ComingSoonFeatures.astro component
  - Feature grid with "Coming Soon" badges
  - Optional ETAs
  - Preview images/mockups
  - Timeline variant
- [x] Add hover effects and micro-interactions

**Deliverable:** ProblemSolution and ComingSoonFeatures complete

#### Day 9: Thank You & Page Assembly
**Morning:**
- [x] Build ThankYouMessage.astro component
  - Confirmation message
  - Next steps timeline
  - Social sharing buttons
  - Celebration animation
- [x] Test modal vs inline variants

**Afternoon:**
- [x] Assemble complete painted-door.astro page
- [x] Integrate all components
- [x] Add scroll animations
- [x] Test full conversion flow
- [x] Mobile optimization

**Deliverable:** Complete painted door landing page assembled

#### Day 10: Content Generation & Testing
**Morning:**
- [ ] Extend content generator for painted door business type
- [x] Create example painted-door-config.json
- [ ] Test content generation with Claude AI
- [x] Add painted door translation keys for i18n

**Afternoon:**
- [x] Lighthouse audit (target: 95+)
- [ ] Conversion optimization audit
- [ ] Accessibility audit (axe-core)
- [ ] Multi-language testing
- [ ] Cross-browser testing
- [ ] Analytics verification
- [ ] Bug fixes and polish

**Deliverable:** Painted door template complete, tested, and documented

---

## 🧪 Testing & Quality Gates

### Component Testing Checklist

Each component must pass these tests:

#### Visual Testing
- [ ] Renders correctly on mobile (320px, 375px, 425px)
- [ ] Renders correctly on tablet (768px, 1024px)
- [ ] Renders correctly on desktop (1280px, 1920px)
- [ ] Dark mode support (if applicable)
- [ ] Print styles (if applicable)
- [ ] High contrast mode

#### Accessibility Testing
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces content correctly (NVDA/JAWS/VoiceOver)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Alt text present on all images
- [ ] Form labels and error messages
- [ ] Heading hierarchy correct
- [ ] ARIA labels where needed
- [ ] No accessibility errors in axe DevTools

#### Performance Testing
- [ ] Images optimized (WebP/AVIF with fallbacks)
- [ ] Lazy loading implemented for below-fold content
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast interaction (FID < 100ms)
- [ ] Quick load time (LCP < 2.5s)
- [ ] Lighthouse Performance: 95+

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android 11+)

#### Multi-Language Testing
- [ ] English (en)
- [ ] German (de)
- [ ] French (fr)
- [ ] Spanish (es)
- [ ] Italian (it)
- [ ] Portuguese (pt)
- [ ] Text doesn't overflow in any language
- [ ] RTL support (if applicable)

---

### Page Testing Checklist

#### Book Promotion Page
- [ ] Book cover displays correctly (high-res, no distortion)
- [ ] Buy links open correct retailer pages
- [ ] Author bio readable and well-formatted
- [ ] Book excerpt has good reading experience
- [ ] Reviews display with proper attribution
- [ ] Newsletter form submits successfully
- [ ] Mobile reading experience optimized
- [ ] Schema.org markup validates
- [ ] Lighthouse Score: 95+
- [ ] All accessibility checks pass

#### Painted Door Landing Page
- [ ] Value proposition clear in hero
- [ ] Email form submits successfully
- [ ] Thank you message displays after submission
- [ ] Analytics tracking fires correctly
- [ ] Problem/solution messaging impactful
- [ ] Coming soon features build excitement
- [ ] Social sharing works
- [ ] GDPR compliance (if EU traffic)
- [ ] Conversion optimization audit passed
- [ ] Lighthouse Score: 95+
- [ ] All accessibility checks pass

---

### Content Generation Testing

#### Book Promotion Config
Test with this example configuration:
```json
{
  "businessType": "book-promotion",
  "bookTitle": "The Midnight Garden",
  "bookSubtitle": "A Tale of Mystery and Magic",
  "author": {
    "name": "Sarah Chen",
    "bio": "Award-winning author of fantasy and mystery novels",
    "credentials": ["Hugo Award Winner 2023", "NYT Bestseller"]
  },
  "genre": "Fantasy / Mystery",
  "publicationDate": "2025-03-15",
  "preOrder": true,
  "description": "A captivating mystery set in a magical garden...",
  "retailers": [
    {
      "name": "Amazon",
      "link": "https://amazon.com/...",
      "format": "Hardcover"
    }
  ],
  "languages": ["en", "de", "fr"],
  "defaultLanguage": "en"
}
```

#### Painted Door Config
Test with this example configuration:
```json
{
  "businessType": "painted-door",
  "productName": "TaskFlow AI",
  "tagline": "Your AI-Powered Productivity Assistant",
  "problem": {
    "headline": "Drowning in tasks and missing deadlines?",
    "painPoints": [
      "Too many tools, nothing talks to each other",
      "Spend more time organizing than doing",
      "Important tasks slip through the cracks"
    ]
  },
  "solution": {
    "headline": "Meet TaskFlow AI: Your Smart Task Manager",
    "benefits": [
      "One unified dashboard for all your work",
      "AI prioritizes your tasks automatically",
      "Never miss a deadline again"
    ]
  },
  "features": [
    {
      "title": "AI Task Prioritization",
      "description": "Smart algorithms rank your tasks by importance",
      "comingSoon": true,
      "eta": "Q2 2025"
    }
  ],
  "languages": ["en"],
  "defaultLanguage": "en"
}
```

#### Validation Tests
- [ ] Content generator creates all required components
- [ ] Claude AI generates appropriate copy for business type
- [ ] Translations generate for all selected languages
- [ ] Images/placeholders generated correctly
- [ ] Schema.org markup includes correct business type
- [ ] Analytics tracking configured for business type
- [ ] Theme applied correctly for template

---

## 🎨 Theme & Styling Guide

### Book Promotion Theme Variants

#### Literary Theme (Default)
```css
/* Elegant, readable, classic */
--book-primary: 112, 66, 20;      /* Warm brown */
--book-secondary: 245, 242, 237;  /* Cream */
--book-accent: 156, 39, 6;        /* Deep red */
--book-font-heading: 'Playfair Display', serif;
--book-font-body: 'Lora', serif;
```

#### Modern Theme
```css
/* Clean, contemporary, bold */
--book-primary: 17, 24, 39;       /* Dark navy */
--book-secondary: 243, 244, 246;  /* Light gray */
--book-accent: 59, 130, 246;      /* Bright blue */
--book-font-heading: 'Inter', sans-serif;
--book-font-body: 'Inter', sans-serif;
```

#### Genre-Specific Themes
```css
/* Mystery/Thriller */
--book-primary: 0, 0, 0;          /* Black */
--book-accent: 220, 38, 38;       /* Crimson */

/* Romance */
--book-primary: 136, 19, 55;      /* Rose */
--book-accent: 244, 114, 182;     /* Pink */

/* Sci-Fi */
--book-primary: 15, 23, 42;       /* Space blue */
--book-accent: 34, 211, 238;      /* Cyan */
```

### Painted Door Theme Variants

#### Bold Theme (Default)
```css
/* High conversion, attention-grabbing */
--painted-primary: 234, 88, 12;    /* Orange */
--painted-secondary: 249, 115, 22; /* Light orange */
--painted-accent: 22, 163, 74;     /* Green (CTA) */
--painted-font-heading: 'Poppins', sans-serif;
--painted-font-body: 'Inter', sans-serif;
```

#### Minimal Theme
```css
/* Clean, focused, professional */
--painted-primary: 0, 0, 0;        /* Black */
--painted-secondary: 255, 255, 255;/* White */
--painted-accent: 79, 70, 229;     /* Indigo */
--painted-font-heading: 'Inter', sans-serif;
--painted-font-body: 'Inter', sans-serif;
```

#### Playful Theme
```css
/* Fun, energetic, startup vibe */
--painted-primary: 147, 51, 234;   /* Purple */
--painted-secondary: 236, 72, 153; /* Pink */
--painted-accent: 234, 179, 8;     /* Yellow */
--painted-font-heading: 'Space Grotesk', sans-serif;
--painted-font-body: 'DM Sans', sans-serif;
```

### Tailwind Configuration Extensions

Add to `tailwind.config.cjs`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Book promotion themes
        'book-literary': {
          primary: 'rgb(112, 66, 20)',
          secondary: 'rgb(245, 242, 237)',
          accent: 'rgb(156, 39, 6)',
        },
        'book-modern': {
          primary: 'rgb(17, 24, 39)',
          secondary: 'rgb(243, 244, 246)',
          accent: 'rgb(59, 130, 246)',
        },
        // Painted door themes
        'painted-bold': {
          primary: 'rgb(234, 88, 12)',
          secondary: 'rgb(249, 115, 22)',
          accent: 'rgb(22, 163, 74)',
        },
        'painted-minimal': {
          primary: 'rgb(0, 0, 0)',
          secondary: 'rgb(255, 255, 255)',
          accent: 'rgb(79, 70, 229)',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lora': ['Lora', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
};
```

---

## 📊 Content Generation Extensions

### New Business Types

Add to `scripts/enhanced-content-generator.js` or content generation config:

```javascript
const BUSINESS_TYPES = {
  'app-marketing': { /* existing */ },
  'consulting': { /* existing */ },

  // NEW: Book promotion
  'book-promotion': {
    defaultComponents: [
      'BookCover',
      'BuyLinks',
      'BookExcerpt',
      'AuthorBio',
      'BookReviews',
      'ContactForm' // Newsletter signup
    ],
    contentRequirements: {
      bookTitle: 'required',
      author: 'required',
      genre: 'required',
      description: 'required',
      coverImage: 'required',
      retailers: 'required',
      excerpt: 'optional',
      reviews: 'optional',
      authorBio: 'optional',
    },
    seoDefaults: {
      keywords: ['book', 'author', '{genre}', 'read online', 'buy book'],
      schemaType: 'Book',
    },
  },

  // NEW: Painted door
  'painted-door': {
    defaultComponents: [
      'Hero',
      'ProblemSolution',
      'ComingSoonFeatures',
      'EmailCaptureForm',
      'TestimonialCard', // Social proof
      'ThankYouMessage'
    ],
    contentRequirements: {
      productName: 'required',
      tagline: 'required',
      problem: 'required',
      solution: 'required',
      features: 'required',
      emailCapture: 'required',
    },
    seoDefaults: {
      keywords: ['coming soon', 'early access', 'beta', 'sign up'],
      schemaType: 'WebPage',
    },
    analytics: {
      trackSignups: true,
      trackScrollDepth: true,
      conversionGoal: 'email_signup',
    },
  },
};
```

### Claude AI Prompt Templates

#### Book Promotion Content Generation
```
System: You are an expert book marketing copywriter specializing in compelling book descriptions and author platforms.

User: Generate compelling marketing copy for a {genre} book titled "{bookTitle}" by {author}.

Requirements:
1. Write a captivating book description (200-300 words) that hooks readers
2. Create 5 compelling reader testimonial quotes
3. Write a concise author bio highlighting credentials and previous works
4. Generate 3 promotional taglines for different audiences
5. Suggest 5 relevant keywords for SEO

Book details:
- Title: {bookTitle}
- Author: {author}
- Genre: {genre}
- Synopsis: {synopsis}
- Target audience: {targetAudience}

Output in JSON format matching our schema.
```

#### Painted Door Content Generation
```
System: You are an expert conversion copywriter specializing in landing pages and product launches.

User: Generate high-converting landing page copy for a new product called "{productName}" in the {industry} industry.

Requirements:
1. Write a compelling headline that addresses the main pain point
2. Create problem statements (3 pain points)
3. Write solution statements (3 key benefits)
4. Generate 4-5 coming soon feature descriptions
5. Write thank you message and next steps
6. Create social sharing copy

Product details:
- Name: {productName}
- Tagline: {tagline}
- Target audience: {targetAudience}
- Main problem solved: {problem}
- Unique value proposition: {uvp}

Output in JSON format matching our schema.
```

### Translation Requirements

#### Book Promotion Translation Keys
Add to `src/content/i18n/{locale}.json`:

```json
{
  "book": {
    "buyNow": "Buy Now",
    "preOrder": "Pre-order Now",
    "readExcerpt": "Read Sample Chapter",
    "aboutAuthor": "About the Author",
    "reviews": "Reviews",
    "bookDetails": "Book Details",
    "genre": "Genre",
    "pages": "Pages",
    "publisher": "Publisher",
    "publicationDate": "Publication Date",
    "isbn": "ISBN",
    "availableAt": "Available at",
    "newsletter": {
      "title": "Get New Release Updates",
      "placeholder": "Enter your email",
      "button": "Subscribe",
      "success": "Thank you for subscribing!",
      "privacy": "We respect your privacy. Unsubscribe anytime."
    }
  }
}
```

#### Painted Door Translation Keys
```json
{
  "landing": {
    "comingSoon": "Coming Soon",
    "earlyAccess": "Get Early Access",
    "joinWaitlist": "Join the Waitlist",
    "signedUp": "{count} people signed up",
    "problem": "The Problem",
    "solution": "Our Solution",
    "features": "Upcoming Features",
    "testimonials": "What People Are Saying",
    "thankYou": {
      "title": "You're on the list!",
      "message": "We'll notify you when we launch.",
      "nextSteps": "What happens next:",
      "share": "Share with friends"
    },
    "privacy": "We'll never share your email. Unsubscribe anytime."
  }
}
```

---

## 📈 Success Metrics

### Book Promotion Template
**Primary Goals:**
- Drive book sales through retailer links
- Build author email list
- Increase book discovery through SEO

**Key Metrics:**
- [ ] Click-through rate on buy links (target: 15%+)
- [ ] Newsletter signup rate (target: 5%+)
- [ ] Lighthouse Performance score: 95+
- [ ] Lighthouse Accessibility score: 95+
- [ ] Time on page: 2+ minutes
- [ ] Bounce rate: <60%
- [ ] Excerpt read completion: 40%+

### Painted Door Landing Page
**Primary Goals:**
- Capture email addresses for product launch
- Validate product-market fit
- Measure conversion rates

**Key Metrics:**
- [ ] Email signup conversion rate (target: 20%+)
- [ ] Form abandonment rate (target: <30%)
- [ ] Lighthouse Performance score: 95+
- [ ] Lighthouse Accessibility score: 95+
- [ ] Time to first signup: <30 seconds
- [ ] Mobile conversion rate: Equal to desktop
- [ ] Social sharing rate: 5%+

---

## 📝 Example Configurations

### Example 1: Fiction Book Promotion
**File:** `examples/fiction-book-config.json`

```json
{
  "name": "midnight-garden",
  "displayName": "The Midnight Garden - Sarah Chen",
  "businessType": "book-promotion",
  "tagline": "A spellbinding tale of mystery and magic",
  "description": "When librarian Emma discovers a hidden garden that only appears at midnight, she uncovers a century-old mystery that threatens to unravel reality itself.",

  "book": {
    "title": "The Midnight Garden",
    "subtitle": "A Novel",
    "author": {
      "name": "Sarah Chen",
      "photo": "/images/authors/sarah-chen.jpg",
      "bio": "Sarah Chen is an award-winning author of fantasy and mystery novels. Her debut novel 'Whispers in the Dark' won the Hugo Award in 2023 and became a New York Times bestseller.",
      "credentials": [
        "Hugo Award Winner 2023",
        "New York Times Bestselling Author",
        "MFA in Creative Writing, Columbia University"
      ],
      "previousWorks": [
        {
          "title": "Whispers in the Dark",
          "coverImage": "/images/books/whispers.jpg",
          "link": "/books/whispers-in-the-dark"
        },
        {
          "title": "The Shadow Realm",
          "coverImage": "/images/books/shadow-realm.jpg",
          "link": "/books/shadow-realm"
        }
      ],
      "socialLinks": {
        "website": "https://sarahchen.com",
        "twitter": "https://twitter.com/sarahchenauthor",
        "instagram": "https://instagram.com/sarahchenauthor",
        "goodreads": "https://goodreads.com/sarahchen"
      }
    },
    "coverImage": "/images/books/midnight-garden-cover.jpg",
    "genre": "Fantasy Mystery",
    "pageCount": 384,
    "publisher": "Penguin Random House",
    "publicationDate": "2025-03-15",
    "isbn": "978-0-12-345678-9",
    "preOrder": true,
    "rating": 4.8,
    "reviewCount": 247,

    "retailers": [
      {
        "name": "Amazon",
        "logo": "/images/retailers/amazon.svg",
        "link": "https://amazon.com/midnight-garden-sarah-chen",
        "price": "$27.99",
        "format": "Hardcover",
        "affiliate": true
      },
      {
        "name": "Barnes & Noble",
        "logo": "/images/retailers/barnes-noble.svg",
        "link": "https://barnesandnoble.com/midnight-garden",
        "price": "$27.99",
        "format": "Hardcover",
        "affiliate": false
      },
      {
        "name": "Apple Books",
        "logo": "/images/retailers/apple-books.svg",
        "link": "https://books.apple.com/midnight-garden",
        "price": "$14.99",
        "format": "eBook",
        "affiliate": false
      },
      {
        "name": "Kobo",
        "logo": "/images/retailers/kobo.svg",
        "link": "https://kobo.com/midnight-garden",
        "price": "$14.99",
        "format": "eBook",
        "affiliate": true
      },
      {
        "name": "Bookshop.org",
        "logo": "/images/retailers/bookshop.svg",
        "link": "https://bookshop.org/midnight-garden",
        "price": "$27.99",
        "format": "Hardcover",
        "affiliate": true
      }
    ],

    "excerpt": {
      "title": "Chapter One: The Discovery",
      "content": "The clock struck twelve, and the library changed...\n\n[Full excerpt text here - 500-1000 words]"
    },

    "reviews": [
      {
        "type": "editorial",
        "source": "The New York Times",
        "sourceLogo": "/images/publications/nyt.svg",
        "quote": "A masterfully crafted tale that blends mystery and magic with stunning prose. Chen's best work yet.",
        "date": "2025-02-15"
      },
      {
        "type": "editorial",
        "source": "Publishers Weekly",
        "sourceLogo": "/images/publications/publishers-weekly.svg",
        "quote": "Enchanting and suspenseful. Readers won't be able to put this down.",
        "date": "2025-02-10"
      },
      {
        "type": "reader",
        "source": "BookLover2024",
        "quote": "I stayed up all night to finish this! The twists kept me guessing until the very end.",
        "rating": 5,
        "date": "2025-02-20",
        "verified": true
      },
      {
        "type": "reader",
        "source": "MysteryFan",
        "quote": "Sarah Chen has done it again. This book is absolutely magical!",
        "rating": 5,
        "date": "2025-02-18",
        "verified": true
      }
    ]
  },

  "primaryColor": "book-literary",
  "secondaryColor": "book-literary",

  "languages": ["en", "de", "fr", "es"],
  "defaultLanguage": "en",

  "seo": {
    "title": "The Midnight Garden by Sarah Chen - Pre-order Now",
    "description": "Pre-order the spellbinding new fantasy mystery from Hugo Award-winning author Sarah Chen. Available March 15, 2025.",
    "keywords": ["fantasy book", "mystery novel", "Sarah Chen", "new release 2025", "Hugo Award author"],
    "ogImage": "/images/books/midnight-garden-og.jpg"
  },

  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX",
    "facebookPixel": "123456789",
    "trackPurchaseClicks": true
  }
}
```

### Example 2: SaaS Painted Door Landing Page
**File:** `examples/saas-painted-door-config.json`

```json
{
  "name": "taskflow-ai",
  "displayName": "TaskFlow AI - Smart Task Management",
  "businessType": "painted-door",
  "tagline": "Your AI-Powered Productivity Assistant",
  "description": "Never miss a deadline again. TaskFlow AI prioritizes your tasks automatically so you can focus on what matters most.",

  "landing": {
    "hero": {
      "headline": "Stop drowning in tasks. Start accomplishing goals.",
      "subheadline": "TaskFlow AI automatically prioritizes your work using smart algorithms, so you always know what to do next.",
      "ctaText": "Get Early Access",
      "ctaSubtext": "Join 1,247 people on the waitlist"
    },

    "problem": {
      "heading": "You're busy, but not productive",
      "description": "Sound familiar? You're not alone.",
      "painPoints": [
        "You have 5 different tools and nothing talks to each other",
        "You spend more time organizing tasks than actually doing them",
        "Important deadlines slip through the cracks",
        "You're constantly context-switching between apps",
        "You never know what to work on first"
      ],
      "icon": "😫"
    },

    "solution": {
      "heading": "Meet TaskFlow AI: One dashboard, zero chaos",
      "description": "Finally, a task manager that thinks for you.",
      "benefits": [
        "All your work in one unified dashboard",
        "AI automatically prioritizes based on deadlines and importance",
        "Smart notifications only when you need them",
        "Integrates with your existing tools (Slack, Gmail, Calendar)",
        "Never miss a deadline again"
      ],
      "icon": "✨"
    },

    "features": [
      {
        "title": "AI Task Prioritization",
        "description": "Our machine learning algorithm analyzes your tasks and tells you exactly what to work on first, based on deadlines, importance, and your work patterns.",
        "icon": "🤖",
        "comingSoon": true,
        "eta": "Q2 2025",
        "previewImage": "/images/features/ai-prioritization.jpg"
      },
      {
        "title": "Unified Dashboard",
        "description": "See all your tasks from Asana, Trello, Jira, and more in one beautiful interface. No more app-switching.",
        "icon": "📊",
        "comingSoon": true,
        "eta": "Q2 2025",
        "previewImage": "/images/features/dashboard.jpg"
      },
      {
        "title": "Smart Notifications",
        "description": "Get reminded only about tasks that actually matter. Our AI learns when you work best and notifies you at optimal times.",
        "icon": "🔔",
        "comingSoon": true,
        "eta": "Q3 2025"
      },
      {
        "title": "Team Collaboration",
        "description": "Share task lists with your team, assign work, and track progress together. Communication built right in.",
        "icon": "👥",
        "comingSoon": true,
        "eta": "Q3 2025"
      },
      {
        "title": "Time Tracking",
        "description": "Automatically track time spent on tasks. Get insights into where your time really goes.",
        "icon": "⏱️",
        "comingSoon": true,
        "eta": "Q4 2025"
      }
    ],

    "socialProof": {
      "signupCount": 1247,
      "testimonials": [
        {
          "quote": "Finally, a task manager that actually helps me get things done instead of just organizing my to-do list.",
          "author": "Alex Rivera",
          "title": "Product Manager",
          "company": "TechCorp",
          "avatar": "/images/testimonials/alex.jpg"
        },
        {
          "quote": "The AI prioritization is a game-changer. I used to waste 30 minutes every morning figuring out what to work on.",
          "author": "Maria Santos",
          "title": "Freelance Designer",
          "avatar": "/images/testimonials/maria.jpg"
        },
        {
          "quote": "I'm on 3 other task manager waitlists, but this one seems the most promising. Can't wait!",
          "author": "James Chen",
          "title": "Startup Founder",
          "company": "InnovateLabs",
          "avatar": "/images/testimonials/james.jpg"
        }
      ],
      "companyLogos": [
        "/images/companies/google.svg",
        "/images/companies/microsoft.svg",
        "/images/companies/spotify.svg",
        "/images/companies/airbnb.svg"
      ]
    },

    "emailCapture": {
      "title": "Be the first to know when we launch",
      "description": "Join the waitlist and get exclusive early access before everyone else.",
      "buttonText": "Get Early Access",
      "collectName": true,
      "privacyText": "We respect your privacy. Unsubscribe anytime.",
      "successMessage": "You're on the list! Check your email for next steps."
    },

    "thankYou": {
      "heading": "Welcome to TaskFlow AI! 🎉",
      "message": "You're officially on the waitlist. We'll send you an email with early access as soon as we launch.",
      "nextSteps": [
        {
          "step": "Check your email",
          "description": "We just sent you a confirmation email. Click the link to verify.",
          "icon": "📧"
        },
        {
          "step": "Join our community",
          "description": "Get product updates and tips in our Discord server.",
          "icon": "💬"
        },
        {
          "step": "Share with friends",
          "description": "Help us spread the word and move up the waitlist!",
          "icon": "🚀"
        }
      ],
      "socialSharing": {
        "enabled": true,
        "message": "Share TaskFlow AI with your network",
        "platforms": ["twitter", "linkedin", "facebook"]
      }
    }
  },

  "primaryColor": "painted-bold",
  "secondaryColor": "painted-bold",

  "languages": ["en"],
  "defaultLanguage": "en",

  "seo": {
    "title": "TaskFlow AI - AI-Powered Task Management Coming Soon",
    "description": "Join the waitlist for TaskFlow AI, the smart task manager that uses AI to prioritize your work automatically. Never miss a deadline again.",
    "keywords": ["task management", "AI productivity", "to-do list app", "project management", "early access"],
    "ogImage": "/images/og-image.jpg"
  },

  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX",
    "trackSignups": true,
    "trackScrollDepth": true,
    "conversionGoal": "email_signup",
    "facebookPixel": "123456789"
  },

  "integrations": {
    "emailService": "mailchimp",
    "mailchimpListId": "abc123",
    "webhookUrl": "https://api.taskflow.ai/webhooks/signup"
  }
}
```

### Example 3: Non-Fiction Book (Business Book)
**File:** `examples/business-book-config.json`

```json
{
  "name": "founder-playbook",
  "displayName": "The Founder's Playbook - David Martinez",
  "businessType": "book-promotion",
  "tagline": "Build a startup that lasts",
  "description": "The essential guide for first-time founders, from idea to IPO.",

  "book": {
    "title": "The Founder's Playbook",
    "subtitle": "Proven Strategies for Building Successful Startups",
    "author": {
      "name": "David Martinez",
      "photo": "/images/authors/david-martinez.jpg",
      "bio": "David Martinez is a serial entrepreneur and startup advisor who has founded three successful companies with combined valuations over $500M. He's an advisor to Y Combinator and teaches entrepreneurship at Stanford.",
      "credentials": [
        "Founded 3 successful startups (combined $500M+ valuation)",
        "Y Combinator Startup Advisor",
        "Lecturer, Stanford Graduate School of Business",
        "Forbes 30 Under 30 (2018)"
      ],
      "socialLinks": {
        "website": "https://davidmartinez.co",
        "twitter": "https://twitter.com/davidm",
        "linkedin": "https://linkedin.com/in/davidmartinez"
      }
    },
    "coverImage": "/images/books/founders-playbook-cover.jpg",
    "genre": "Business / Entrepreneurship",
    "pageCount": 312,
    "publisher": "Wiley",
    "publicationDate": "2025-04-01",
    "isbn": "978-1-11-911111-1",
    "preOrder": false,
    "rating": 4.9,
    "reviewCount": 89,

    "retailers": [
      {
        "name": "Amazon",
        "logo": "/images/retailers/amazon.svg",
        "link": "https://amazon.com/founders-playbook",
        "price": "$29.99",
        "format": "Hardcover",
        "affiliate": true
      },
      {
        "name": "Amazon Kindle",
        "logo": "/images/retailers/kindle.svg",
        "link": "https://amazon.com/founders-playbook-kindle",
        "price": "$14.99",
        "format": "Kindle eBook",
        "affiliate": true
      },
      {
        "name": "Audible",
        "logo": "/images/retailers/audible.svg",
        "link": "https://audible.com/founders-playbook",
        "price": "$19.99",
        "format": "Audiobook",
        "affiliate": true
      }
    ],

    "excerpt": {
      "title": "Introduction: The Founder's Journey",
      "content": "Every successful startup begins with a question: What problem am I solving?...\n\n[Full excerpt - first chapter]"
    },

    "reviews": [
      {
        "type": "editorial",
        "source": "Harvard Business Review",
        "sourceLogo": "/images/publications/hbr.svg",
        "quote": "A must-read for any aspiring entrepreneur. Martinez distills decades of startup wisdom into actionable advice.",
        "date": "2025-03-15"
      },
      {
        "type": "reader",
        "source": "TechFounder",
        "quote": "This book saved me from making costly mistakes in my first startup. Worth every penny.",
        "rating": 5,
        "date": "2025-03-20",
        "verified": true
      }
    ]
  },

  "primaryColor": "book-modern",
  "secondaryColor": "book-modern",

  "languages": ["en"],
  "defaultLanguage": "en"
}
```

---

## 🚀 Next Steps

### Immediate Actions
1. **Review this implementation plan** with stakeholders
2. **Prioritize which template to build first** (recommend: Book Promotion, then Painted Door)
3. **Assign developers** to Week 1 and Week 2 tasks
4. **Set up project tracking** (GitHub Projects, Jira, etc.)
5. **Schedule daily standups** during implementation weeks

### Pre-Development Setup
- [ ] Create feature branch: `feat/new-templates`
- [ ] Set up component development environment
- [ ] Install any additional fonts needed (Playfair Display, Lora, Poppins, etc.)
- [ ] Gather sample content (book covers, author photos, testimonials)
- [ ] Set up test configurations

### Post-Implementation
- [ ] User testing with real book authors
- [ ] User testing with startup founders
- [ ] Gather feedback and iterate
- [ ] Document lessons learned
- [ ] Plan future template additions (portfolio, e-commerce, events, etc.)

---

## 📚 Resources & References

### Design Inspiration
- **Book Sites:** Goodreads author pages, publisher websites, bestseller landing pages
- **Painted Door Examples:** ProductHunt "Coming Soon" pages, Kickstarter campaigns, startup waitlist pages
- **Conversion Optimization:** Unbounce, Instapage, Leadpages examples

### Technical References
- **Astro Docs:** https://docs.astro.build
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org:** https://schema.org/Book, https://schema.org/Review

### Libraries to Consider
- **Star ratings:** Consider using a minimal SVG star component
- **Form validation:** Built into HTML5 + custom validation
- **Image optimization:** Astro's built-in image component
- **Analytics:** Plausible or Fathom (cookieless)

---

## ✅ Definition of Done

### Component Level
A component is complete when:
- [ ] TypeScript Props interface defined
- [ ] All variants implemented
- [ ] Responsive on all breakpoints
- [ ] Accessibility audit passed (axe DevTools)
- [ ] Works in all supported browsers
- [ ] Multi-language support works
- [ ] Documentation written
- [ ] Example usage provided

### Page Level
A page template is complete when:
- [ ] All components integrated
- [ ] Content generation works
- [ ] Example config generates successfully
- [ ] Lighthouse scores 95+ (Performance, Accessibility, Best Practices, SEO)
- [ ] Multi-language versions work
- [ ] Analytics tracking configured
- [ ] SEO markup complete (meta tags, schema.org)
- [ ] Mobile experience tested
- [ ] Documentation updated

### Project Level
The entire implementation is complete when:
- [ ] Both templates (Book + Painted Door) complete
- [ ] All quality gates passed
- [ ] Documentation complete
- [ ] Example configurations provided
- [ ] Content generation extended
- [ ] Theme variants implemented
- [ ] User testing completed
- [ ] Stakeholder approval received

---

**Ready to start building? Let's create these templates! 🚀**