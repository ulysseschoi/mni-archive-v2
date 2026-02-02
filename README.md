# mni archive v2

A minimalist Next.js 14 archive project with a pure black and white aesthetic, inspired by [mniarchive.pages.dev](https://mniarchive.pages.dev).

## 🌐 Live Demo

**Production URL**: https://mni-archive-v2.pages.dev

**GitHub Repository**: https://github.com/ulysseschoi/mni-archive-v2

**Branch**: `minimal-deploy` (Production)

**Deployment Guide**: See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) for deployment details

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
- ✅ **Artworks Archive** (/artworks) - Grid view with search/filter/pagination
- ✅ **Music Archive** (/music) - 6 tracks with cover images
- ✅ **Videos Archive** (/videos) - 6 videos with thumbnails
- ✅ **Writings Archive** (/writings) - 6 articles with excerpts
- ⏳ **Detail Pages** - Coming soon (dynamic routing)

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
- `/` - Landing page
- `/artworks` - Artworks grid with search/filter/pagination
- `/music` - Music tracks list (6 items)
- `/videos` - Video gallery (6 items)
- `/writings` - Blog posts list (6 items)

### Query Parameters (Artworks)
- `/artworks?category=doodle` - Filter by category
- `/artworks?search=chaos` - Search query
- `/artworks?page=2` - Pagination

### Note
Detail pages (`/artworks/[slug]`, `/music/[slug]`, etc.) are planned for future implementation.

## 📁 Project Structure

```
mni-archive-v2/
├── app/                    # Next.js App Router
│   ├── artworks/          # Artwork pages
│   │   ├── page.tsx       # Server component with SEO
│   │   └── ArtworksClient.tsx  # Client component with search/filter
│   ├── music/             # Music pages
│   │   └── page.tsx       # Client component with grid layout
│   ├── videos/            # Video pages
│   │   └── page.tsx       # Client component with video cards
│   ├── writings/          # Writing pages
│   │   └── page.tsx       # Client component with article cards
│   ├── layout.tsx         # Root layout with Navigation
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navigation.tsx     # Fixed top nav
│   ├── LandingPage.tsx    # Hero section
│   ├── ArtworkCard.tsx    # Card with Lightbox
│   ├── MusicCard.tsx      # Music track card
│   ├── VideoCard.tsx      # Video thumbnail card
│   ├── WritingCard.tsx    # Blog post card
│   └── Lightbox.tsx       # Image gallery viewer
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

- [ ] **Detail Pages** - Dynamic routes for individual items (`/artworks/[slug]`, `/music/[slug]`, etc.)
- [ ] Search/Filter for Music, Videos, Writings pages (currently only Artworks)
- [ ] Real-time sync with Sanity webhooks
- [ ] Advanced search (fuzzy matching, multiple keywords)
- [ ] Sorting options (date, title, popularity)
- [ ] User authentication & authorization
- [ ] Admin panel for content management
- [ ] Comments system
- [ ] Social sharing buttons
- [ ] RSS feed
- [ ] Sitemap generation (partially ready in SEO_GUIDE.md)
- [ ] JSON-LD structured data

## 🎯 Recommended Next Steps

1. ✅ **Cloudflare Pages Deployment** - Production live! ✓ DONE
2. ✅ **Core Pages** - All 5 pages with mock data ✓ DONE
3. ✅ **Search/Filter/Pagination** - Artworks page ✓ DONE
4. ✅ **Lightbox Gallery** - Full-screen image viewer ✓ DONE
5. **Add Detail Pages** - Implement dynamic routes for each content type
6. **Connect Sanity Studio** - Real CMS content management
7. **Search/Filter for Music/Videos/Writings** - Extend Artworks pattern
8. **Custom Domain** - Configure custom domain on Cloudflare
9. **Analytics** - Add Cloudflare Web Analytics
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
**Status**: ✅ Production Live on Cloudflare Pages

**Production URL**: https://mni-archive-v2.pages.dev

**Key Achievements**:
- ✅ 5/5 core pages deployed to production
- ✅ Search/Filter/Pagination (Artworks)
- ✅ Lightbox image gallery
- ✅ All card components (Artwork, Music, Video, Writing)
- ✅ Static export successfully deployed
- ✅ Mobile responsive with fixed navigation
- ✅ Framer Motion animations
- ✅ All pages returning 200 OK

**Current Deployment**:
- Platform: Cloudflare Pages
- Branch: `minimal-deploy`
- Build: Static Export (Next.js 16)
- Status: ✅ Active

**Next Phase**: Add detail pages for individual content items 🚀
