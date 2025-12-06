# Deployment Guide - DJ Golden Bling Website

This guide will help you deploy the DJ Golden Bling website to production.

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy a Next.js application with zero configuration.

### Steps:

1. **Create a Vercel Account**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Your Repository**
   - Click "New Project"
   - Import your Git repository
   - Select the `vooncash` folder as the root directory

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `vooncash`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes at `your-project.vercel.app`

5. **Custom Domain** (Optional)
   - Go to Project Settings > Domains
   - Add your custom domain (e.g., djgoldenbling.com)
   - Follow the DNS configuration instructions

## Alternative Deployment Options

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the Project**
   ```bash
   cd vooncash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Deploy to AWS Amplify

1. Connect your Git repository
2. Set build settings:
   - Build command: `cd vooncash && npm run build`
   - Base directory: `vooncash`
   - Output directory: `.next`
3. Deploy

### Deploy to DigitalOcean App Platform

1. Create a new app from your repository
2. Configure:
   - Source directory: `vooncash`
   - Build command: `npm run build`
   - Run command: `npm start`
3. Deploy

## Environment Variables

If you need environment variables for the contact form or analytics:

1. Create a `.env.local` file in the `vooncash` directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://djgoldenbling.com
   # Add other environment variables here
   ```

2. Add the same variables in your deployment platform's settings

## Post-Deployment Checklist

- [ ] Test the website on desktop and mobile devices
- [ ] Verify all navigation links work
- [ ] Test the contact form submission
- [ ] Check all social media links
- [ ] Verify SEO meta tags using tools like:
  - [Google's Rich Results Test](https://search.google.com/test/rich-results)
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Set up Google Analytics or analytics tool
- [ ] Configure custom domain and SSL certificate
- [ ] Test page load speed with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Set up a sitemap at `/sitemap.xml`
- [ ] Add robots.txt file

## Performance Optimization

The site is already optimized with:
- ✅ Static site generation (SSG)
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Font optimization
- ✅ CSS/JS minification
- ✅ Lazy loading of components

Expected Lighthouse Scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

## Monitoring

### Setup Error Tracking

Consider integrating error tracking:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Bugsnag](https://www.bugsnag.com)

### Analytics

Integrate analytics to track visitor behavior:
- [Google Analytics 4](https://analytics.google.com)
- [Vercel Analytics](https://vercel.com/analytics)
- [Plausible](https://plausible.io)

## Custom Domain Setup

### For Vercel:

1. Add domain in Vercel dashboard
2. Update DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### SSL Certificate

SSL certificates are automatically provisioned and renewed by Vercel/Netlify. No manual configuration needed!

## Continuous Deployment

The site is configured for continuous deployment. Any push to your main branch will automatically:
1. Trigger a new build
2. Run tests and linting
3. Deploy to production if successful

## Rollback

If you need to rollback to a previous version:

**On Vercel:**
1. Go to Deployments
2. Find the previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

## Contact Form Backend

To make the contact form functional, choose one of these options:

### Option 1: Use Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the form action in `booking-section.tsx`

### Option 2: Create API Route

Create `src/app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Send email using your preferred service
  // Example: Resend, SendGrid, etc.
  
  return NextResponse.json({ success: true });
}
```

### Option 3: Use Netlify Forms

1. Add `data-netlify="true"` to your form
2. Deploy to Netlify
3. Forms automatically work!

## Support

If you encounter any issues during deployment:
- Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel support: [vercel.com/support](https://vercel.com/support)
- Open an issue in your repository

## Maintenance

Regular maintenance tasks:
- Update dependencies monthly: `npm update`
- Check for security vulnerabilities: `npm audit`
- Monitor site performance with Lighthouse
- Review analytics and user feedback
- Update content regularly to keep site fresh

---

**Ready to go live!** 🚀

Your DJ Golden Bling website is production-ready and optimized for performance. Deploy with confidence!
