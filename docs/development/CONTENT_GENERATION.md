# Content Automation Prompts
## AI-Powered Content Generation for Multi-Template Platform

### Executive Summary

This document provides comprehensive Claude AI prompts for generating high-quality, business-specific content across both mobile app marketing and professional consulting templates. Each prompt is designed to produce content that aligns with business goals, target audience needs, and conversion optimization best practices.

---

## 🎯 Prompt Engineering Strategy

### Universal Prompt Structure
```
ROLE: [Specific professional role]
CONTEXT: [Business context and goals] 
TASK: [Specific content generation task]
CONSTRAINTS: [Word limits, tone, format requirements]
OUTPUT: [Expected deliverable format]
EXAMPLES: [Reference examples or patterns]
VALIDATION: [Quality criteria]
```

### Content Quality Framework
```javascript
const contentQuality = {
  relevance: "Addresses target audience pain points and goals",
  clarity: "Clear, jargon-free language appropriate for audience",
  persuasion: "Compelling value propositions with clear benefits",
  optimization: "SEO-friendly with natural keyword integration",
  conversion: "Clear calls-to-action aligned with business goals",
  authenticity: "Genuine voice that builds trust and credibility"
}
```

---

## 📱 App Marketing Content Prompts

### App Hero Section Generation
```
ROLE: You are an expert mobile app marketing copywriter with 10+ years of experience creating high-converting app store listings and marketing websites.

CONTEXT: I need to create compelling hero section content for a mobile app marketing website. The hero section is the first thing visitors see and must immediately communicate value and drive downloads.

TASK: Generate hero section content including:
1. Headline (5-8 words, benefit-focused)
2. Subheadline (15-25 words, explaining value proposition)
3. Primary CTA text (2-3 words, action-oriented)
4. Secondary CTA text (2-4 words, low-commitment)

APP DETAILS:
- App Name: {{APP_NAME}}
- Category: {{APP_CATEGORY}}
- Primary Benefit: {{PRIMARY_BENEFIT}}
- Target Audience: {{TARGET_AUDIENCE}}
- Unique Selling Proposition: {{USP}}
- Available Platforms: {{PLATFORMS}}

CONSTRAINTS:
- Headline must be under 8 words
- Focus on user benefits, not features
- Use emotional triggers appropriate for the target audience
- Avoid technical jargon
- Include power words that drive action

OUTPUT FORMAT:
```
HEADLINE: [5-8 word benefit-focused headline]
SUBHEADLINE: [15-25 word value proposition]
PRIMARY_CTA: [2-3 word download action]
SECONDARY_CTA: [2-4 word learning action]
EMOTION_TRIGGER: [Primary emotional appeal used]
BENEFIT_FOCUS: [Main benefit highlighted]
```

EXAMPLES:
```
HEADLINE: "Budget Tracking Made Simple"
SUBHEADLINE: "Take control of your finances with AI-powered insights and effortless expense tracking"
PRIMARY_CTA: "Download Free"
SECONDARY_CTA: "See How It Works"
```

VALIDATION: Ensure the content would make a potential user understand the app's value within 3 seconds and feel compelled to either download or learn more.
```

### App Features Description Generator
```
ROLE: You are a product marketing specialist who excels at translating technical app features into compelling user benefits that drive conversions.

CONTEXT: I need to create feature descriptions for an app marketing website that clearly communicate value to potential users. Each feature should focus on user benefits rather than technical capabilities.

TASK: Generate feature descriptions that transform technical features into user-centered benefits.

APP DETAILS:
- App Name: {{APP_NAME}}
- App Category: {{APP_CATEGORY}}
- Target Users: {{TARGET_USERS}}
- Core Problem Solved: {{CORE_PROBLEM}}

FEATURE INPUT:
{{FEATURE_LIST}}

CONSTRAINTS:
- Each feature description: 50-80 words
- Lead with benefit, support with feature
- Use "you" language for direct connection
- Include emotional outcomes
- End with implied action or result
- Avoid technical jargon

OUTPUT FORMAT:
For each feature:
```
FEATURE_NAME: [User-friendly feature name]
BENEFIT_HEADLINE: [8-12 word benefit statement]
DESCRIPTION: [50-80 word benefit-focused description]
EMOTIONAL_OUTCOME: [How user feels after using this]
ICON_SUGGESTION: [Appropriate icon name]
```

WRITING FORMULA:
1. Start with the benefit/outcome
2. Explain how the feature delivers this
3. Include emotional payoff
4. Imply ease of use

EXAMPLE:
```
FEATURE_NAME: "Smart Budget Alerts"
BENEFIT_HEADLINE: "Never Overspend Again"
DESCRIPTION: "Stay on track with intelligent notifications that alert you before you exceed your budget limits. Our AI learns your spending patterns and warns you at just the right moment, helping you make confident financial decisions without constantly checking your balance."
EMOTIONAL_OUTCOME: "Confident and in control of finances"
ICON_SUGGESTION: "bell-alert"
```

VALIDATION: Each description should make a user think "I need this" and understand exactly how their life improves.
```

### App Store Description Generator
```
ROLE: You are an App Store Optimization (ASO) expert who has optimized thousands of app descriptions for maximum visibility and conversion.

CONTEXT: I need to create app store descriptions that rank well in search results while compelling users to download. The description must work for both Apple App Store and Google Play Store.

TASK: Generate ASO-optimized app descriptions with strategic keyword placement and conversion-focused copy.

APP DETAILS:
- App Name: {{APP_NAME}}
- Primary Keywords: {{PRIMARY_KEYWORDS}}
- Secondary Keywords: {{SECONDARY_KEYWORDS}}
- Target Audience: {{TARGET_AUDIENCE}}
- Core Value Proposition: {{VALUE_PROPOSITION}}
- Key Features: {{KEY_FEATURES}}
- User Pain Points: {{PAIN_POINTS}}

CONSTRAINTS:
- First 125 characters are critical (above the fold)
- Use keywords naturally, avoid keyword stuffing
- Include social proof when available
- Clear feature benefits with bullet points
- Strong call-to-action
- Write for humans first, algorithms second

OUTPUT FORMAT:
```
HOOK (First 125 characters):
[Compelling opening that includes primary keyword and clear benefit]

PROBLEM_STATEMENT (50-75 words):
[Identify user pain points and frustrations]

SOLUTION_OVERVIEW (75-100 words):
[How the app solves these problems uniquely]

KEY_BENEFITS (Bullet points):
• [Benefit 1 with primary keyword]
• [Benefit 2 with secondary keyword]
• [Benefit 3 with emotional outcome]
• [Benefit 4 with social proof if available]

CLOSING_CTA (25-50 words):
[Strong call-to-action with urgency or incentive]

KEYWORDS_USED:
Primary: [List of primary keywords used]
Secondary: [List of secondary keywords used]
```

ASO OPTIMIZATION CHECKLIST:
□ Primary keyword in first 25 words
□ Keywords used naturally in context
□ Clear value proposition above the fold
□ Specific benefits over vague promises
□ Social proof or credibility indicators
□ Action-oriented language throughout

VALIDATION: The description should make someone who needs this app feel like it was created specifically for them.
```

### App Blog Content Generator
```
ROLE: You are a content marketing strategist specializing in mobile app marketing, with expertise in creating blog content that drives organic traffic and app downloads.

CONTEXT: I need blog posts that attract potential app users through search engines, provide genuine value, and naturally guide readers toward app downloads.

TASK: Create blog post outlines and key content sections that align with app marketing goals.

APP DETAILS:
- App Name: {{APP_NAME}}
- App Category: {{APP_CATEGORY}}
- Target Keywords: {{TARGET_KEYWORDS}}
- User Problems: {{USER_PROBLEMS}}
- App Solutions: {{APP_SOLUTIONS}}
- Content Goals: {{CONTENT_GOALS}}

BLOG POST TYPES:
1. Problem-Solution Posts
2. How-To Guides  
3. Industry Insights
4. User Success Stories
5. Comparison Posts

CONSTRAINTS:
- SEO-optimized for target keywords
- Provide genuine value beyond app promotion
- Natural app mentions (not forced)
- Include compelling calls-to-action
- 1500-2500 words per post
- Engaging, scannable format

OUTPUT FORMAT:
```
POST_TITLE: [SEO-optimized title with target keyword]
META_DESCRIPTION: [150-character search snippet]
TARGET_KEYWORD: [Primary keyword focus]
READER_INTENT: [What reader wants to accomplish]

OUTLINE:
1. Hook Opening (100-150 words)
   [Attention-grabbing start that identifies with reader problem]

2. Problem Deep Dive (300-400 words)
   [Detailed exploration of user pain points]

3. Solution Framework (500-700 words)
   [Actionable advice and strategies]

4. App Integration (200-300 words)
   [Natural mention of how app enhances solution]

5. Actionable Steps (400-500 words)
   [Specific implementation guidance]

6. Conclusion + CTA (150-200 words)
   [Summary and app download encouragement]

INTERNAL_LINKS: [Suggestions for linking to other app pages]
EXTERNAL_LINKS: [Authoritative sources to link to]
CTA_PLACEMENTS: [Where to naturally mention app]
```

CONTENT QUALITY CRITERIA:
- Actionable advice that works without the app
- App mentioned as enhancement, not requirement
- Expert insights that build authority
- Reader-first approach over app-first

VALIDATION: A reader should gain valuable knowledge even if they never download the app, but feel the app would make their life significantly easier.
```

---

## 👔 Consulting Content Prompts

### Consulting Services Description Generator
```
ROLE: You are a B2B marketing expert specializing in professional services, with 15+ years of experience helping consultants articulate their value propositions and generate qualified leads.

CONTEXT: I need to create compelling service descriptions for a consulting website that establish authority, differentiate from competitors, and convert prospects into clients.

TASK: Generate comprehensive service descriptions that position the consultant as the obvious choice for prospective clients.

CONSULTING DETAILS:
- Firm Name: {{FIRM_NAME}}
- Service Area: {{SERVICE_AREA}}
- Target Industries: {{TARGET_INDUSTRIES}}
- Client Types: {{CLIENT_TYPES}}
- Methodology: {{METHODOLOGY}}
- Unique Differentiators: {{DIFFERENTIATORS}}
- Typical Outcomes: {{TYPICAL_OUTCOMES}}

CONSTRAINTS:
- Focus on client outcomes over consultant activities
- Include specific, quantifiable benefits when possible
- Address common client objections
- Professional but approachable tone
- 800-1200 words per service
- Clear call-to-action for next steps

OUTPUT FORMAT:
```
SERVICE_NAME: [Client-focused service name]
TAGLINE: [One-sentence value proposition]

OVERVIEW (150-200 words):
[What the service is and why clients need it]

IDEAL_FOR (100-150 words):
[Specific client situations and challenges addressed]

APPROACH (200-300 words):
[Your methodology and what makes it effective]

DELIVERABLES (150-200 words):
[Specific outcomes and tangible results]

SUCCESS_METRICS (100-150 words):
[How success is measured and typical improvements]

ENGAGEMENT_MODEL (100-150 words):
[How you work with clients - timeline, structure, communication]

NEXT_STEPS (50-100 words):
[Clear call-to-action for prospects]

FAQ_SECTION:
Q: [Common client question]
A: [Authority-building answer]
```

PERSUASION FRAMEWORK:
1. Identify specific client pain
2. Position service as solution
3. Demonstrate expertise through methodology
4. Prove value through outcomes
5. Remove risk through process clarity
6. Guide toward engagement

VALIDATION: A prospect should finish reading and think "This person understands my exact problem and clearly knows how to solve it."
```

### Case Study Generator
```
ROLE: You are a B2B storytelling expert who creates compelling case studies that build credibility and generate new business for professional service providers.

CONTEXT: I need to create detailed case studies that showcase consulting expertise while respecting client confidentiality. These will be the primary social proof for attracting similar clients.

TASK: Generate comprehensive case studies that tell a compelling story of transformation while highlighting consultant expertise.

PROJECT DETAILS:
- Client Industry: {{CLIENT_INDUSTRY}}
- Client Size: {{CLIENT_SIZE}}
- Initial Challenge: {{INITIAL_CHALLENGE}}
- Approach Taken: {{APPROACH_TAKEN}}
- Timeline: {{PROJECT_TIMELINE}}
- Key Results: {{KEY_RESULTS}}
- Client Feedback: {{CLIENT_FEEDBACK}}

CONSTRAINTS:
- Maintain client confidentiality (use "Leading X Company")
- Focus on business impact over activities
- Include specific metrics and outcomes
- Structure as transformation story
- 800-1200 words
- Include quotable highlights

OUTPUT FORMAT:
```
CASE_TITLE: [Outcome-focused title]
CLIENT_PROFILE: [Anonymous industry description]
CHALLENGE_SUMMARY: [One-sentence problem statement]

THE_SITUATION (200-250 words):
[Context, stakes, and urgency of client challenge]

THE_CHALLENGE (150-200 words):
[Specific problems, obstacles, and complexities]

OUR_APPROACH (300-400 words):
[Methodology, key decisions, and implementation strategy]

THE_SOLUTION (200-300 words):
[Specific actions taken and interventions implemented]

RESULTS_ACHIEVED (150-200 words):
[Quantified outcomes and business impact]

CLIENT_TESTIMONIAL:
"[Powerful quote about experience and results]"
- [Title], [Industry] Company

KEY_INSIGHTS (100-150 words):
[Lessons learned and broader applications]

METRICS_HIGHLIGHT:
• [Quantified result 1]
• [Quantified result 2]  
• [Quantified result 3]
• [Timeline achievement]
```

STORYTELLING ELEMENTS:
- Hero's journey structure (challenge → transformation → success)
- Specific details that add credibility
- Moments of insight or breakthrough
- Quantified impact wherever possible
- Client voice through quotes

VALIDATION: A similar prospect should think "I have the exact same problems - this consultant clearly knows how to solve them."
```

### Team Bio Generator
```
ROLE: You are a professional services marketing expert who crafts executive biographies that build trust, establish authority, and differentiate consultants from competitors.

CONTEXT: I need team member biographies for a consulting website that establish credibility while remaining personable and approachable to potential clients.

TASK: Create compelling team biographies that position each person as a trusted expert in their field.

TEAM_MEMBER_DETAILS:
- Name: {{NAME}}
- Title: {{TITLE}}
- Experience: {{YEARS_EXPERIENCE}}
- Education: {{EDUCATION}}
- Specialties: {{SPECIALTIES}}
- Notable Achievements: {{ACHIEVEMENTS}}
- Previous Companies: {{PREVIOUS_COMPANIES}}
- Certifications: {{CERTIFICATIONS}}
- Personal Interests: {{PERSONAL_INTERESTS}}

CONSTRAINTS:
- Professional but personable tone
- Lead with most impressive credentials
- Include client impact stories
- Balance expertise with approachability
- 300-500 words per bio
- Include personal touch at end

OUTPUT FORMAT:
```
HEADLINE: [Name] - [Value proposition title]

EXPERIENCE_LEAD (75-100 words):
[Opening that establishes expertise and credibility]

EXPERTISE_AREAS (100-150 words):
[Specific capabilities and specializations]

CAREER_HIGHLIGHTS (100-150 words):
[Notable achievements and client impact examples]

APPROACH_PHILOSOPHY (75-100 words):
[How they work with clients and their methodology]

CREDENTIALS (50-75 words):
[Education, certifications, and affiliations]

PERSONAL_TOUCH (25-50 words):
[Interests, values, or personality insights]

CONTACT_CTA:
[Specific invitation to connect]
```

AUTHORITY BUILDING ELEMENTS:
- Quantified client results where possible
- Recognition or awards received
- Thought leadership (speaking, writing)
- Unique methodology or approach
- Industry-specific expertise

TRUST BUILDING ELEMENTS:
- Years of experience
- Blue-chip client examples
- Educational credentials
- Professional certifications
- Personal values alignment

VALIDATION: A prospect should feel confident this person has the expertise to solve their problems and would be pleasant to work with.
```

### Thought Leadership Content Generator
```
ROLE: You are a thought leadership strategist who helps consultants establish industry authority through insights-driven content that attracts high-value clients.

CONTEXT: I need blog posts and articles that position the consulting firm as industry experts while providing genuine value to prospects and peers.

TASK: Create thought leadership content that demonstrates deep industry knowledge and forward-thinking insights.

CONTENT_DETAILS:
- Industry Focus: {{INDUSTRY_FOCUS}}
- Target Audience: {{TARGET_AUDIENCE}}
- Content Topic: {{CONTENT_TOPIC}}
- Key Insights: {{KEY_INSIGHTS}}
- Firm Perspective: {{FIRM_PERSPECTIVE}}
- Call-to-Action Goal: {{CTA_GOAL}}

THOUGHT_LEADERSHIP_TYPES:
1. Industry Trend Analysis
2. Strategic Framework Development
3. Challenge Deep Dives
4. Future Predictions
5. Best Practice Synthesis

CONSTRAINTS:
- Expert-level insights not found elsewhere
- Support claims with data and examples
- Practical applications for readers
- Professional, authoritative tone
- 2000-3000 words for comprehensive coverage
- Minimal self-promotion

OUTPUT FORMAT:
```
ARTICLE_TITLE: [Thought-provoking, insight-driven title]
SUBTITLE: [Clarifying explanation of angle or approach]
TARGET_READER: [Specific decision-maker persona]

EXECUTIVE_SUMMARY (150-200 words):
[Key insights and takeaways]

INTRODUCTION (200-300 words):
[Context, relevance, and stakes]

CURRENT_STATE_ANALYSIS (400-500 words):
[What's happening now and why it matters]

KEY_INSIGHTS (600-800 words):
[Original thinking and frameworks]

IMPLICATIONS (300-400 words):
[What this means for leaders and organizations]

ACTIONABLE_RECOMMENDATIONS (400-500 words):
[Specific steps readers can take]

CONCLUSION (150-200 words):
[Summary and future outlook]

ABOUT_AUTHOR (100 words):
[Credibility statement and contact]

SUPPORTING_ELEMENTS:
• [Data sources and statistics]
• [Framework diagrams needed]
• [Real-world examples]
• [Expert quotes or references]
```

AUTHORITY MARKERS:
- Original frameworks or models
- Proprietary research or data
- Unique client experiences
- Industry predictions
- Contrarian perspectives backed by evidence

VALIDATION: Industry peers should want to share this content, and prospects should see the firm as ahead of the curve in their thinking.
```

---

## 🔧 Shared Content Prompts

### Privacy Policy Generator
```
ROLE: You are a legal technology expert specializing in privacy compliance for digital businesses, with expertise in GDPR, CCPA, and other international privacy regulations.

CONTEXT: I need a privacy policy that covers both app marketing and consulting business models while maintaining compliance with international privacy laws.

TASK: Generate a comprehensive privacy policy that addresses both business types while being clear and user-friendly.

BUSINESS_DETAILS:
- Business Type: {{BUSINESS_TYPE}}
- Data Collection: {{DATA_COLLECTION_TYPES}}
- Third-Party Services: {{THIRD_PARTY_SERVICES}}
- Geographic Scope: {{GEOGRAPHIC_SCOPE}}
- User Rights: {{USER_RIGHTS_OFFERED}}

COMPLIANCE_REQUIREMENTS:
- GDPR (EU users)
- CCPA (California users)  
- PIPEDA (Canadian users)
- General privacy best practices

OUTPUT FORMAT:
```
PRIVACY_POLICY: [Business Name]

LAST_UPDATED: [Date]

OVERVIEW (200-300 words):
[What this policy covers and our commitment to privacy]

INFORMATION_WE_COLLECT:
[Detailed list of data types collected]

HOW_WE_USE_INFORMATION:
[Specific purposes for data use]

INFORMATION_SHARING:
[When and with whom data is shared]

DATA_SECURITY:
[Security measures implemented]

YOUR_RIGHTS:
[User rights and how to exercise them]

CONTACT_INFORMATION:
[How to reach us about privacy concerns]
```

BUSINESS_TYPE_CUSTOMIZATIONS:
App Business: Focus on app data, device info, usage analytics
Consulting Business: Emphasize confidentiality, client data protection
```

### Contact Page Content Generator
```
ROLE: You are a conversion optimization expert who specializes in creating contact pages that maximize lead generation while providing excellent user experience.

CONTEXT: I need contact page content that encourages prospects to reach out while qualifying leads effectively for both app and consulting businesses.

TASK: Create contact page content optimized for lead generation and user experience.

BUSINESS_DETAILS:
- Business Type: {{BUSINESS_TYPE}}
- Primary Contact Goal: {{PRIMARY_CONTACT_GOAL}}
- Secondary Goals: {{SECONDARY_GOALS}}
- Response Time: {{RESPONSE_TIME}}
- Contact Methods: {{CONTACT_METHODS}}

OUTPUT FORMAT:
```
PAGE_HEADLINE: [Encouraging, benefit-focused headline]

OPENING_MESSAGE (100-150 words):
[Welcoming message that encourages contact]

CONTACT_OPTIONS:
[List of ways to get in touch with context for each]

RESPONSE_EXPECTATIONS (50-75 words):
[What happens after someone contacts you]

FAQ_SECTION:
[Common questions that remove barriers to contact]

OFFICE_INFORMATION:
[Address, hours, additional location details if applicable]
```

BUSINESS_TYPE_VARIATIONS:
App Business: Focus on support, feedback, partnerships
Consulting Business: Emphasize consultation, project discussions, expertise sharing
```

---

## 📊 Content Automation Workflow

### Automated Content Generation Pipeline
```javascript
const contentGenerationWorkflow = {
  initialization: {
    step: "Load business configuration and template type",
    inputs: ["Business config", "Template type", "Content requirements"],
    outputs: ["Content generation plan", "Prompt selection"]
  },
  
  contentGeneration: {
    step: "Generate content using appropriate prompts",
    process: [
      "Select template-specific prompts",
      "Customize prompts with business data", 
      "Generate content via Claude API",
      "Validate content quality",
      "Apply business-specific optimizations"
    ]
  },
  
  qualityAssurance: {
    step: "Review and optimize generated content", 
    checks: [
      "Brand voice consistency",
      "SEO optimization",
      "Conversion optimization",
      "Accessibility compliance",
      "Business goal alignment"
    ]
  },
  
  deployment: {
    step: "Integrate content into site structure",
    outputs: ["Formatted content files", "Meta information", "Internal linking"]
  }
}
```

### Content Quality Validation
```javascript
const contentQualityChecks = {
  appMarketing: {
    heroSection: "Clear value prop, compelling CTA, under 8 words headline",
    features: "Benefit-focused, emotional outcomes, 50-80 words each",
    appStore: "ASO-optimized, keyword placement, conversion-focused"
  },
  consulting: {
    services: "Outcome-focused, authority-building, client-centric language",
    caseStudies: "Specific metrics, transformation story, confidentiality",
    teamBios: "Credibility establishment, approachable expertise, client impact"
  },
  universal: {
    seo: "Keyword optimization, meta descriptions, internal linking",
    readability: "Clear structure, scannable format, appropriate reading level",
    conversion: "Clear CTAs, benefit-focused messaging, trust signals"
  }
}
```

---

*This comprehensive content automation system ensures consistent, high-quality content generation across both app marketing and consulting templates while maintaining business-specific optimization and conversion focus.*