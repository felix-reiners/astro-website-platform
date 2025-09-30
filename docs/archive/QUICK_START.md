# 🚀 Quick Start Guide - Generate Your First Website

**⏱️ Time to first website: 10 minutes**

---

## Step 1: Choose Your Business Type (1 minute)

### 📱 App Marketing Sites
Perfect for:
- Mobile apps (iOS/Android)
- SaaS products
- Web applications
- Digital tools

**Example**: Fitness app, productivity tool, game

### 💼 Consulting & Service Sites
Perfect for:
- Professional services
- Creative agencies
- B2B consulting
- Expert businesses

**Example**: Marketing agency, tech consultancy, design studio

---

## Step 2: Copy Example Configuration (2 minutes)

Choose the example closest to your business:

### App Examples
- `examples/fitness-app-config.json` - Health & fitness app
- `examples/saas-app-config.json` - Team productivity software
- `examples/weather-app-config.json` - Utility app

### Consulting Examples
- `examples/creative-agency-config.json` - Design & marketing agency
- `examples/tech-consulting-config.json` - B2B technology consulting

**Copy and rename** your chosen example to `my-site-config.json`

---

## Step 3: Customize Your Details (5 minutes)

Edit your `my-site-config.json` file:

### ✏️ Essential Changes
```json
{
  "name": "YourBusinessName",           // ← Change this
  "displayName": "Your Full Title",     // ← Change this
  "tagline": "Your value proposition",  // ← Change this
  "description": "What you do...",      // ← Change this
  "primaryColor": "blue",               // ← Pick: blue, green, purple, navy, emerald
  "languages": ["en", "de"]             // ← Add your target markets
}
```

### 📱 For Apps - Update Links
```json
{
  "appStore": {
    "ios": "YOUR_APP_STORE_URL",        // ← Your iOS app link
    "android": "YOUR_PLAY_STORE_URL"    // ← Your Android app link
  }
}
```

### 💼 For Consulting - Update Contact
```json
{
  "contact": {
    "email": "your@email.com",          // ← Your business email
    "phone": "your-phone",              // ← Your phone number
    "calendly": "your-booking-link"     // ← Your scheduling link
  }
}
```

---

## Step 4: Generate Your Site (2 minutes)

### Open Terminal/Command Prompt
```bash
# Navigate to platform folder
cd astro-websites

# Generate your site
npm run generate my-site-config.json
```

### What Happens Next:
```
✨ Generating content with AI...        (2-3 minutes)
🌍 Creating multi-language versions... (1-2 minutes)
⚡ Optimizing performance...           (30 seconds)
✅ Site generated successfully!
```

**Your site is ready**: `generated-sites/yourbusinessname/`

---

## Step 5: Preview Your Site (30 seconds)

```bash
# Go to your generated site
cd generated-sites/yourbusinessname

# Install dependencies
npm install

# Start preview
npm run dev
```

**Open**: `http://localhost:4321` to see your site

---

## 🎯 Quick Customization Tips

### Change Colors Instantly
Edit your config file and regenerate:
```json
"primaryColor": "green"    // Instant theme change
```

### Add Languages
```json
"languages": ["en", "de", "fr", "es"]  // Adds 4 markets
```

### Update Content
```json
"features": [
  {
    "title": "New Feature",
    "description": "Updated description"
  }
]
```

### Regenerate After Changes
```bash
npm run generate my-site-config.json
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. Sign up at vercel.com (free)
2. Import your `generated-sites/yourbusinessname` folder
3. Deploy automatically
4. Connect custom domain

### Option 2: Upload to Any Host
1. Build your site: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Point domain to uploaded files

---

## ✅ Quality Checklist

Every generated site includes:

- ✅ **95+ Google PageSpeed Score**
- ✅ **Mobile-responsive design**
- ✅ **SEO optimization**
- ✅ **Accessibility compliance**
- ✅ **Multi-language ready**
- ✅ **Privacy compliant**
- ✅ **Contact forms working**
- ✅ **Analytics ready**

---

## 🆘 Troubleshooting

### Site Generation Fails
- Check your JSON syntax (use an online JSON validator)
- Ensure required fields are filled
- Try with an example config first

### Preview Not Working
```bash
cd generated-sites/yourbusinessname
npm install --force
npm run dev --port 3000
```

### Need Different Content
- Edit your config file
- Run generation again
- Each generation improves content quality

---

## 📞 Next Steps

1. **Test your site** on different devices
2. **Share with your team** for feedback
3. **Deploy to production** when ready
4. **Generate additional language versions**
5. **Set up custom domain**

**🎉 Congratulations!** You've created a professional website in under 10 minutes.

---

## 💡 Pro Tips

- **Start simple**: Use 1-2 languages first
- **Test colors**: Different industries prefer different colors
- **Update regularly**: Regenerate when you add new features/services
- **Multiple variants**: Generate different versions to A/B test

**Need help?** Check `MARKETING_GUIDE.md` for detailed examples and business strategies.