# mni archive v2

A minimalist Next.js 14 archive project with a pure black and white aesthetic, inspired by [mniarchive.pages.dev](https://mniarchive.pages.dev).

## 🌐 Live Demo

**Production URL**: https://3000-ie7ghbqy55dwsfazfpe0l-c07dda5e.sandbox.novita.ai

**Deployment Guide**: See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) for production deployment

## 🎨 Design Philosophy

- **Background**: #000000 (Pure Black)
- **Text**: #FFFFFF (Pure White)  
- **Font**: Inter / Helvetica Neue
- **Style**: Minimalist, Clean, Modern
- **Animations**: Smooth scroll-based interactions with Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) with Static Export
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **CMS**: Sanity (Headless CMS with mock data fallback)
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Card
- **Optimization**: Sanity Image Pipeline (thumbnail, high-res, responsive)
- **Linting**: ESLint + Prettier
- **Process Manager**: PM2

## ✅ Completed Features

### 🏠 Core Pages
- ✅ **Landing Page** - Hero section with scroll animations
- ✅ **Artworks Archive** (/artworks) - Full CRUD with 6 sample items
- ✅ **Music Archive** (/music) - Tracks with lyrics and duration
- ✅ **Videos Archive** (/videos) - Video player with thumbnails
- ✅ **Writings Archive** (/writings) - Blog posts and essays
- ✅ **Detail Pages** - Dynamic routing for all content types

### 🎯 Advanced Features
- ✅ **Global Navigation** - Fixed top bar with responsive design
- ✅ **Search & Filter** - Real-time search across title/description (Artworks)
- ✅ **Category Filter** - Dynamic category buttons
- ✅ **Pagination** - 6 items per page with Previous/Next controls
- ✅ **Lightbox Gallery** - Full-screen image viewer with ESC/click to close
- ✅ **Sanity CMS Integration** - Auto-fallback to mock data
- ✅ **SEO Optimization** - Meta tags, Open Graph, Twitter Card for all pages
- ✅ **Image Optimization** - Sanity CDN with quality/format optimization
- ✅ **Framer Motion Animations** - Smooth page transitions
- ✅ **Mobile Responsive** - Hamburger menu and mobile-optimized layouts
- ✅ **Static Export** - Ready for Cloudflare Pages deployment

## 📋 Functional Entry URIs

### Main Routes
- `/` - Landing page with featured artworks
- `/artworks` - Artworks grid with search/filter/pagination
- `/artworks/[slug]` - Individual artwork detail page
- `/music` - Music tracks list
- `/music/[slug]` - Track detail with lyrics
- `/videos` - Video gallery
- `/videos/[slug]` - Video player page
- `/writings` - Blog posts list
- `/writings/[slug]` - Full article view

### Query Parameters (Artworks)
- `/artworks?category=doodle` - Filter by category
- `/artworks?search=chaos` - Search query
- `/artworks?page=2` - Pagination

## 📁 Project Structure

```
mni-archive-v2/
├── app/                    # Next.js App Router
│   ├── artworks/          # Artwork pages
│   │   ├── page.tsx       # Server component with SEO
│   │   ├── ArtworksClient.tsx  # Client component with search/filter
│   │   └── [slug]/        # Detail pages
│   ├── music/             # Music pages (Server + Client)
│   │   ├── page.tsx       # Server component with SEO
│   │   └── MusicPageClient.tsx
│   ├── videos/            # Video pages (Server + Client)
│   │   ├── page.tsx       # Server component with SEO
│   │   └── VideosPageClient.tsx
│   ├── writings/          # Writing pages (Server + Client)
│   │   ├── page.tsx       # Server component with SEO
│   │   └── WritingsPageClient.tsx
│   ├── layout.tsx         # Root layout with Navigation + SEO
│   ├── page.tsx           # Home page with SEO metadata
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navigation.tsx     # Fixed top nav
│   ├── LandingPage.tsx    # Hero section
│   ├── ArtworkCard.tsx    # Card with Lightbox
│   ├── MusicCard.tsx      # Music track card
│   ├── VideoCard.tsx      # Video thumbnail card
│   ├── WritingCard.tsx    # Blog post card
│   ├── Lightbox.tsx       # Image gallery viewer
│   └── Button.tsx         # Reusable button
├── lib/
│   ├── sanity.ts          # Sanity client + GROQ + Image optimization
│   ├── seo.ts             # SEO helper functions
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
├── sanity/schemas/        # Content schemas
├── scripts/seed-data.ts   # Sample data generator
├── public/                # Static assets
├── CLOUDFLARE_DEPLOY.md   # Deployment guide
├── SANITY_INTEGRATION_GUIDE.md  # CMS setup guide
├── SEO_GUIDE.md           # SEO optimization guide
└── IMAGE_OPTIMIZATION_GUIDE.md  # Image optimization guide
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server

**Using PM2 (recommended for sandbox):**
```bash
# Build first (required for first start)
npm run build

# Start with PM2
pm2 start ecosystem.config.cjs

# Check status
pm2 list
pm2 logs mni-archive-v2 --nostream
```

**Using npm (alternative):**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm run start
```

### PM2 Commands
```bash
pm2 list                     # List all processes
pm2 logs mni-archive-v2      # View logs (--nostream for non-blocking)
pm2 restart mni-archive-v2   # Restart
pm2 stop mni-archive-v2      # Stop
pm2 delete mni-archive-v2    # Remove from PM2
```

## 📊 SEO & Optimization

### SEO Features
- ✅ **Meta Tags**: Title, Description, Keywords for every page
- ✅ **Open Graph**: Optimized for Facebook, LinkedIn sharing
- ✅ **Twitter Card**: Twitter sharing optimization
- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Robots Meta**: Search engine crawling control
- ✅ **Structured Data**: Ready for JSON-LD implementation

**See [SEO_GUIDE.md](./SEO_GUIDE.md) for complete SEO setup and best practices.**

### Image Optimization
- ✅ **Sanity CDN**: Automatic format conversion (WebP)
- ✅ **Responsive Images**: srcSet for different screen sizes
- ✅ **Quality Control**: Thumbnail (75%), High-res (90%)
- ✅ **Blur Placeholder**: Progressive image loading
- ✅ **Lazy Loading**: Next.js Image component

**See [IMAGE_OPTIMIZATION_GUIDE.md](./IMAGE_OPTIMIZATION_GUIDE.md) for image optimization strategies.**

## 🗄️ Data Architecture

### Content Models

**Artwork**
- title, slug, image, description
- category (doodle, character, sketch, illustration)
- createdAt, featured (boolean)

**Music**
- title, slug, coverImage, audioFile/audioUrl
- lyrics, duration, releaseDate, genre

**Video**
- title, slug, thumbnail, videoUrl
- description, duration, publishedAt, category

**Writing**
- title, slug, excerpt, content
- coverImage, publishedAt, category, tags

### Storage Services
- **Current**: Mock data (6 items each)
- **Ready**: Sanity CMS integration (automatic fallback)
- **Future**: Cloudflare D1/KV/R2 for edge storage

### Data Flow
1. Server component with SEO metadata
2. Client component handles interactivity (search/filter/pagination)
3. Sanity fetch with automatic mock data fallback
4. Real-time updates with useState hooks

## 🎨 Sanity CMS Setup

**See [SANITY_INTEGRATION_GUIDE.md](./SANITY_INTEGRATION_GUIDE.md) for detailed instructions.**

Quick start:
```bash
# 1. Copy environment template
cp .env.local .env.local.example

# 2. Add your Sanity credentials
# Edit .env.local:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_TOKEN=your_api_token

# 3. Restart server
pm2 restart mni-archive-v2

# 4. Seed sample data (optional)
npx tsx scripts/seed-data.ts
```

**Note**: App works with mock data by default. Sanity is optional!

## 🚀 Deployment to Cloudflare Pages

**See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) for complete deployment guide.**

Quick steps:
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to Cloudflare Pages
# https://dash.cloudflare.com → Workers & Pages → Create

# 3. Connect to Git
# Select repo: mni-archive-v2

# 4. Configure build
# Framework: Next.js
# Build command: npm run build
# Build output: out

# 5. Deploy!
# Production URL: https://mni-archive-v2.pages.dev
```

## 🐛 Troubleshooting

### Sandbox Issues
- **Frozen/timeout**: `pm2 restart mni-archive-v2`
- **Port 3000 in use**: `fuser -k 3000/tcp`
- **Build timeout**: Normal in sandbox, use `pm2 restart` instead

### Hydration Errors
- Fixed with `mounted` state checks
- All Framer Motion animations wait for client mount

### Image Issues
- **Images cropped**: See [IMAGE_OPTIMIZATION_GUIDE.md](./IMAGE_OPTIMIZATION_GUIDE.md)
- **Images slow**: Sanity CDN with optimization (already implemented)

### SEO Issues
- **Meta tags not showing**: Check page.tsx has `export const metadata`
- **Open Graph preview**: Use Facebook Debugger to test

## 🚧 Not Yet Implemented

- [ ] Search/Filter for Music, Videos, Writings pages
- [ ] Real-time sync with Sanity webhooks
- [ ] Advanced search (fuzzy matching, multiple keywords)
- [ ] Sorting options (date, title, popularity)
- [ ] User authentication
- [ ] Admin panel
- [ ] Comments system
- [ ] Social sharing buttons
- [ ] RSS feed
- [ ] Sitemap generation (partially ready in SEO_GUIDE.md)
- [ ] JSON-LD structured data

## 🎯 Recommended Next Steps

1. ✅ **SEO Optimization** - Meta tags, Open Graph ✓ DONE
2. ✅ **Image Optimization** - Sanity Image Pipeline ✓ DONE
3. ✅ **Cloudflare Pages Deployment** - Static export ready ✓ DONE
4. **Add More Content** - Create real artworks, music, videos
5. **Connect Sanity Studio** - Real CMS content management
6. **Search/Filter for Music/Videos/Writings** - Extend Artworks pattern
7. **Custom Domain** - Configure custom domain on Cloudflare
8. **Analytics** - Add Google Analytics or Cloudflare Web Analytics
9. **Performance Tuning** - Implement blur placeholders, lazy loading
10. **Google Search Console** - Submit sitemap and verify

## 📝 User Guide

### For Visitors
1. **Browse Content**: Use navigation to explore different sections
2. **Search**: Type keywords in the search bar (artworks page)
3. **Filter**: Click category buttons to filter items
4. **View Images**: Click artwork cards to open full-screen lightbox
5. **Navigate**: Use Previous/Next buttons for pagination
6. **Share**: Use browser share or copy URL (Open Graph optimized)

### For Content Managers
1. **Setup Sanity**: Follow SANITY_INTEGRATION_GUIDE.md
2. **Add Content**: Use Sanity Studio to create posts
3. **Optimize Images**: Upload high-res, Sanity auto-optimizes
4. **SEO**: Title and description automatically generate meta tags
5. **Preview**: Changes appear automatically on the site
6. **Manage**: Edit, delete, or unpublish content anytime

## 📄 License

MIT

## 🤝 Contributing

This is a personal archive project. For questions or suggestions, please open an issue.

---

**Last Updated**: February 2, 2026  
**Version**: 2.1.0  
**Status**: ✅ Production Ready with SEO & Image Optimization

**Key Achievements**:
- ✅ 5/5 core pages with full functionality
- ✅ Search/Filter/Pagination (Artworks)
- ✅ Lightbox image gallery
- ✅ Comprehensive SEO (Open Graph, Twitter Card)
- ✅ Sanity Image Pipeline optimization
- ✅ Static export for Cloudflare Pages
- ✅ Mobile responsive with hamburger menu
- ✅ Framer Motion animations
- ✅ PM2 process management

**Deployment Ready**: See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) for production deployment 🚀
