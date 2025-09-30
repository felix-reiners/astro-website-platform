# Form Integration Guide
**Substack & Audienceful Integration**

## Quick Reference

### For Book Promo Pages → Use Substack
```astro
import NewsletterSignup from '@/components/ui/NewsletterSignup.astro';

<NewsletterSignup
  substackUrl="https://yoursubstack.substack.com/subscribe"
  title="Get Notified at Launch"
  buttonText="Subscribe"
  variant="card"
/>
```

### For App Pages → Use Audienceful
```astro
import AppSignup from '@/components/ui/AppSignup.astro';

<AppSignup
  audiencefulFormId="YOUR_FORM_ID"
  title="Join Waitlist"
  buttonText="Get Early Access"
  variant="card"
/>
```

---

## Demo Pages (Running on Dev Server)

Visit these URLs to see live examples:

1. **Book Promo Demo** - http://localhost:4321/demo-book
   - Shows 3 Substack signup variants (card, inline, minimal)
   - Perfect for book launches, courses, or content products

2. **App Launch Demo** - http://localhost:4321/demo-app
   - Shows Audienceful integration for drip campaigns
   - Ideal for app launches, SaaS products, mobile apps

---

## Component Reference

### 1. NewsletterSignup (Substack)

**Location:** `src/components/ui/NewsletterSignup.astro`

**Props:**
```typescript
{
  substackUrl: string;        // Required: Your Substack subscribe URL
  title?: string;             // Default: "Subscribe to Our Newsletter"
  description?: string;       // Default: "Get the latest updates..."
  buttonText?: string;        // Default: "Subscribe"
  placeholder?: string;       // Default: "Enter your email"
  variant?: 'inline' | 'card' | 'minimal';  // Default: 'card'
  class?: string;             // Additional CSS classes
}
```

**Variants:**

**Card** (Best for dedicated signup sections):
```astro
<NewsletterSignup
  substackUrl="https://yourbook.substack.com/subscribe"
  title="Join 5,000+ Readers"
  description="Get exclusive chapters and insights."
  variant="card"
/>
```

**Inline** (Best for CTAs in content):
```astro
<NewsletterSignup
  substackUrl="https://yourbook.substack.com/subscribe"
  placeholder="Your email"
  buttonText="Subscribe"
  variant="inline"
/>
```

**Minimal** (Best for footers/sidebars):
```astro
<NewsletterSignup
  substackUrl="https://yourbook.substack.com/subscribe"
  variant="minimal"
/>
```

---

### 2. AppSignup (Audienceful)

**Location:** `src/components/ui/AppSignup.astro`

**Props:**
```typescript
{
  audiencefulFormId: string;  // Required: Your Audienceful form ID
  audiencefulUrl?: string;    // Optional: Custom endpoint
  title?: string;             // Default: "Get Early Access"
  description?: string;       // Default: "Sign up for exclusive updates..."
  buttonText?: string;        // Default: "Get Started"
  placeholder?: string;       // Default: "Enter your email"
  includeNameField?: boolean; // Default: false
  variant?: 'inline' | 'card' | 'minimal';  // Default: 'card'
  class?: string;             // Additional CSS classes
}
```

**Example with Name Field:**
```astro
<AppSignup
  audiencefulFormId="abc123"
  title="Join the Waitlist"
  description="Be first to get early access and exclusive features."
  includeNameField={true}
  variant="card"
/>
```

**Simple Email Only:**
```astro
<AppSignup
  audiencefulFormId="abc123"
  buttonText="Notify Me"
  variant="minimal"
/>
```

---

## Setup Instructions

### Substack Setup (5 minutes)

1. **Get Your Substack URL:**
   - Go to your Substack dashboard
   - Navigate to Settings → Subscription settings
   - Your subscribe URL is: `https://yourname.substack.com/subscribe`

2. **Update Component:**
   ```astro
   <NewsletterSignup
     substackUrl="https://yourname.substack.com/subscribe"
     title="Your Title"
   />
   ```

3. **Test:**
   - Visit your page
   - Enter email and submit
   - Opens Substack in new tab
   - User confirms subscription
   - Done!

**Substack Features:**
- ✅ Free tier: Unlimited subscribers
- ✅ Built-in email templates
- ✅ Automatic welcome emails
- ✅ Subscriber management dashboard
- ✅ No coding required

---

### Audienceful Setup (5 minutes)

1. **Create Form in Audienceful:**
   - Log into app.audienceful.com
   - Go to Forms → Create New Form
   - Copy your Form ID (e.g., `abc123xyz`)

2. **Update Component:**
   ```astro
   <AppSignup
     audiencefulFormId="abc123xyz"
     title="Join Waitlist"
   />
   ```

3. **Configure Drip Campaign:**
   - In Audienceful, create automation
   - Set triggers (immediate, day 3, day 7, etc.)
   - Customize emails
   - Activate campaign

4. **Test:**
   - Visit your page
   - Submit email
   - Check Audienceful dashboard
   - Verify subscriber added to campaign

**Audienceful Features:**
- ✅ Drip campaign automation
- ✅ Segmentation and tagging
- ✅ A/B testing emails
- ✅ Analytics and insights
- ✅ Integrations (Zapier, webhooks)

---

## Use Cases

### Book Launch (Substack)
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import NewsletterSignup from '@/components/ui/NewsletterSignup.astro';
---

<BaseLayout title="My New Book">
  <!-- Hero with signup -->
  <section class="py-20">
    <h1>The Ultimate Guide to X</h1>
    <p>Coming soon...</p>

    <NewsletterSignup
      substackUrl="https://yourbook.substack.com/subscribe"
      title="Get Notified at Launch"
      description="Plus receive free chapter previews."
      variant="card"
    />
  </section>
</BaseLayout>
```

### App Launch (Audienceful)
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import AppSignup from '@/components/ui/AppSignup.astro';
---

<BaseLayout title="MyApp - Launching Soon">
  <!-- Hero with signup -->
  <section class="py-20">
    <h1>Your App Name</h1>
    <p>Revolutionary app launching soon...</p>

    <AppSignup
      audiencefulFormId="your_form_id"
      title="Join 10,000+ on the Waitlist"
      description="Get early access and exclusive launch pricing."
      includeNameField={true}
      variant="card"
    />
  </section>
</BaseLayout>
```

---

## Migration from ContactForm

If you have existing pages using the old ContactForm:

**Before:**
```astro
<ContactForm businessType="app-marketing" />
```

**After (Book/Newsletter):**
```astro
<NewsletterSignup
  substackUrl="https://yourname.substack.com/subscribe"
  title="Subscribe"
  variant="card"
/>
```

**After (App/Drip Campaign):**
```astro
<AppSignup
  audiencefulFormId="your_form_id"
  title="Join Waitlist"
  variant="card"
/>
```

---

## Styling & Customization

Both components accept a `class` prop for custom styling:

```astro
<NewsletterSignup
  substackUrl="..."
  class="my-custom-class shadow-2xl"
  variant="card"
/>
```

All components use Tailwind CSS and respect your theme colors.

---

## Testing Checklist

- [ ] Visit demo pages (demo-book, demo-app)
- [ ] Test form submission (opens in new tab)
- [ ] Verify email received in Substack/Audienceful
- [ ] Test mobile responsiveness
- [ ] Check all variant styles (card, inline, minimal)
- [ ] Test with real email addresses
- [ ] Verify drip campaign triggers (Audienceful)

---

## Support

**Substack Issues:**
- Check: https://support.substack.com
- Verify your subscribe URL is correct
- Ensure publication is active

**Audienceful Issues:**
- Check: https://docs.audienceful.com
- Verify form ID is correct
- Check form is published (not draft)
- Test automation triggers

---

## Next Steps

1. Choose your integration (Substack for books, Audienceful for apps)
2. Get your form URL/ID
3. Update component with your credentials
4. Test on localhost:4321
5. Deploy to production
6. Monitor signups!

**Ready to launch!** 🚀