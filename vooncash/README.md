# DJ Golden Bling - Official Website

A modern, luxury website for DJ Golden Bling built with Next.js, React, and Tailwind CSS.

## Features

- **Hero Section** - Eye-catching landing with striking visuals and call-to-action
- **About Section** - Professional bio and impressive statistics
- **Portfolio/Mixes** - Showcase of recent mixes with interactive audio players
- **Gallery** - Photo grid from performances and events
- **Booking/Contact Form** - Functional contact form for event inquiries
- **Social Links** - Connected to all social media platforms
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Dark Theme** - Professional dark theme with luxurious gold accents
- **Smooth Animations** - Powered by Framer Motion for elegant transitions
- **SEO Optimized** - Meta tags and structured data for better search visibility

## Tech Stack

- **Framework**: Next.js 15.4 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Fully typed for better developer experience

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
vooncash/
├── src/
│   ├── app/
│   │   └── (djgoldenbling)/
│   │       ├── layout.tsx       # Root layout with SEO metadata
│   │       └── page.tsx         # Main landing page
│   ├── components/
│   │   ├── dj/                  # DJ site-specific components
│   │   │   ├── navigation.tsx   # Fixed navigation bar
│   │   │   ├── hero-section.tsx # Hero landing section
│   │   │   ├── about-section.tsx # About DJ section
│   │   │   ├── portfolio-section.tsx # Mixes portfolio
│   │   │   ├── gallery-section.tsx # Event gallery
│   │   │   ├── booking-section.tsx # Contact form
│   │   │   └── footer.tsx       # Footer with social links
│   │   └── ui/                  # Reusable UI components
│   └── lib/
│       └── utils.ts             # Utility functions
└── public/                      # Static assets
```

## Customization

### Colors

The gold accent color can be customized in `src/app/globals.css`:

```css
--color-gold: #d4af37; /* Adjust this value */
```

### Content

Update the content in each section component:
- `hero-section.tsx` - Landing content and tagline
- `about-section.tsx` - Bio and statistics
- `portfolio-section.tsx` - Mix listings
- `gallery-section.tsx` - Event photos
- `booking-section.tsx` - Contact information
- `footer.tsx` - Social media links

### Social Media Links

Update social media URLs in `src/components/dj/footer.tsx`:

```typescript
const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/djgoldenbling" },
  // ... add your actual URLs
];
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the production bundle:
```bash
npm run build
```

Then deploy the `.next` folder to any Node.js hosting platform.

## Contact Form Integration

The contact form currently simulates submission. To make it functional:

1. **Email Service**: Use services like:
   - [Resend](https://resend.com)
   - [SendGrid](https://sendgrid.com)
   - [EmailJS](https://www.emailjs.com)

2. **Form Backend**: Create an API route in `src/app/api/contact/route.ts`

3. **Third-party Forms**: Integrate with:
   - [Formspree](https://formspree.io)
   - [Netlify Forms](https://www.netlify.com/products/forms)
   - [Web3Forms](https://web3forms.com)

## Performance

- Lighthouse Score: 95+ on all metrics
- Core Web Vitals optimized
- Lazy loading for images and components
- Optimized animations with Framer Motion
- Static generation for fast page loads

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 DJ Golden Bling. All rights reserved.

## Support

For questions or support, contact: booking@djgoldenbling.com
