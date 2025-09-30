# Quick Integration Guide - 5 Minutes to Launch

## For Book/Newsletter Launch (Substack)

### 1. Get Your Substack URL (1 minute)
Your Substack subscribe URL is: `https://yourname.substack.com/subscribe`

### 2. Create Your Page (2 minutes)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NewsletterSignup from '../components/ui/NewsletterSignup.astro';
---

<BaseLayout title="My Book Launch">
  <section class="py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-bold mb-6">My Amazing Book</h1>
      <p class="text-xl text-gray-600 mb-8">
        Coming soon - sign up to get notified!
      </p>

      <div class="max-w-xl mx-auto">
        <NewsletterSignup
          substackUrl="https://yourname.substack.com/subscribe"
          title="Get Notified at Launch"
          description="Plus receive free chapter previews."
          buttonText="Notify Me"
          variant="card"
        />
      </div>
    </div>
  </section>
</BaseLayout>
```

### 3. Test (1 minute)
- Run `npm run dev`
- Visit `http://localhost:4321/your-page`
- Enter email and submit
- Verify it opens Substack

### 4. Deploy (1 minute)
```bash
vercel --prod
```

**Done! 🎉**

---

## For App Launch (Audienceful)

### 1. Get Your Form ID (2 minutes)
1. Log into app.audienceful.com
2. Create new form
3. Copy Form ID (e.g., `abc123xyz`)

### 2. Create Your Page (2 minutes)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AppSignup from '../components/ui/AppSignup.astro';
---

<BaseLayout title="My App Launch">
  <section class="py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-bold mb-6">Revolutionary App</h1>
      <p class="text-xl text-gray-600 mb-8">
        Launching soon - join the waitlist!
      </p>

      <div class="max-w-xl mx-auto">
        <AppSignup
          audiencefulFormId="abc123xyz"
          title="Join 10,000+ on the Waitlist"
          description="Get early access and exclusive launch pricing."
          includeNameField={true}
          buttonText="Join Waitlist"
          variant="card"
        />
      </div>
    </div>
  </section>
</BaseLayout>
```

### 3. Configure Drip Campaign (2 minutes)
In Audienceful dashboard:
1. Create automation
2. Add emails (Day 0, Day 3, Day 7, Launch)
3. Activate

### 4. Test & Deploy (1 minute)
```bash
npm run dev  # Test locally
vercel --prod  # Deploy
```

**Done! 🎉**

---

## Component Quick Reference

### NewsletterSignup Props
```typescript
substackUrl: string;     // Required: Your Substack URL
title?: string;          // Signup heading
description?: string;    // Signup description
buttonText?: string;     // Button text
variant?: 'card' | 'inline' | 'minimal';
```

### AppSignup Props
```typescript
audiencefulFormId: string;  // Required: Your Form ID
title?: string;             // Signup heading
description?: string;       // Signup description
buttonText?: string;        // Button text
includeNameField?: boolean; // Add name field?
variant?: 'card' | 'inline' | 'minimal';
```

---

## See Also

- **Full Guide:** `FORM_INTEGRATION_GUIDE.md`
- **Demo Pages:** Visit `/demo-book` and `/demo-app`
- **Launch Checklist:** `LAUNCH_CHECKLIST.md`