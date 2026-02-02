# mni archive v2

A minimalist Next.js 14 archive project with a pure black and white aesthetic, inspired by [mniarchive.pages.dev](https://mniarchive.pages.dev).

## 🌐 Live Demo

**Production URL**: https://3000-ie7ghbqy55dwsfazfpe0l-c07dda5e.sandbox.novita.ai

## 🎨 Design Philosophy

- **Background**: #000000 (Pure Black)
- **Text**: #FFFFFF (Pure White)  
- **Font**: Inter / Helvetica Neue
- **Style**: Minimalist, Clean, Modern
- **Animations**: Smooth scroll-based interactions with Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **CMS**: Sanity (Headless CMS with mock data fallback)
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
- ✅ **Search & Filter** - Real-time search across title/description
- ✅ **Category Filter** - Dynamic category buttons
- ✅ **Pagination** - 6 items per page with Previous/Next controls
- ✅ **Lightbox Gallery** - Full-screen image viewer with ESC/click to close
- ✅ **Sanity CMS Integration** - Auto-fallback to mock data
- ✅ **Framer Motion Animations** - Smooth page transitions
- ✅ **Mobile Responsive** - Hamburger menu and mobile-optimized layouts

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

### Query Parameters (Future)
- `/artworks?category=doodle` - Filter by category
- `/artworks?search=chaos` - Search query
- `/artworks?page=2` - Pagination

## 📁 Project Structure

```
mni-archive-v2/
├── app/                    # Next.js App Router
│   ├── artworks/          # Artwork pages
│   │   ├── page.tsx       # List (server component)
│   │   ├── ArtworksClient.tsx  # Client component with search/filter
│   │   └── [slug]/        # Detail pages
│   ├── music/             # Music pages
│   ├── videos/            # Video pages
│   ├── writings/          # Writing pages
│   ├── layout.tsx         # Root layout with Navigation
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
│   ├── sanity.ts          # Sanity client + GROQ queries
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
├── sanity/schemas/        # Content schemas
├── scripts/seed-data.ts   # Sample data generator
└── public/                # Static assets
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server

**Using PM2 (recommended):**
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
1. Server component fetches from Sanity (if configured)
2. Falls back to mock data if Sanity unavailable
3. Client component handles search/filter/pagination
4. Real-time updates with useState hooks

## 🎨 Sanity CMS Setup

**See [SANITY_INTEGRATION_GUIDE.md](./SANITY_INTEGRATION_GUIDE.md) for detailed instructions.**

Quick start:
```bash
# 1. Copy environment template
cp .env.local.example .env.local

# 2. Add your Sanity Project ID
# Get from https://sanity.io/manage
# Edit .env.local and add: NEXT_PUBLIC_SANITY_PROJECT_ID=your_id

# 3. Restart server
pm2 restart mni-archive-v2

# 4. Seed sample data (optional)
npx tsx scripts/seed-data.ts
```

**Note**: App works with mock data by default. Sanity is optional!

## 🐛 Troubleshooting

### Sandbox Issues
- **Frozen/timeout**: `pm2 restart mni-archive-v2`
- **Port 3000 in use**: `fuser -k 3000/tcp`
- **Build timeout**: Normal in sandbox, use `pm2 restart` instead

### Hydration Errors
- Fixed with `mounted` state checks
- All Framer Motion animations wait for client mount

### Image Issues
- **Images cropped**: Change `object-cover` to `object-contain` in components
- **Images slow**: Use Next.js Image component (already implemented)

## 🚧 Not Yet Implemented

- [ ] Real-time sync with Sanity webhooks
- [ ] Advanced search (fuzzy matching, multiple keywords)
- [ ] Sorting options (date, title, popularity)
- [ ] User authentication
- [ ] Admin panel
- [ ] Comments system
- [ ] Social sharing
- [ ] RSS feed
- [ ] Sitemap generation

## 🎯 Recommended Next Steps

1. **Connect Sanity Studio** - Set up content management
2. **Add More Content** - Create real artworks, music, videos
3. **Customize Styles** - Adjust colors, fonts, spacing
4. **Deploy to Cloudflare Pages** - Production deployment
5. **Add Analytics** - Track visitor behavior
6. **SEO Optimization** - Meta tags, Open Graph
7. **Performance Tuning** - Image optimization, lazy loading

## 📝 User Guide

### For Visitors
1. **Browse Content**: Use navigation to explore different sections
2. **Search**: Type keywords in the search bar (artworks page)
3. **Filter**: Click category buttons to filter items
4. **View Images**: Click artwork cards to open full-screen lightbox
5. **Navigate**: Use Previous/Next buttons for pagination

### For Content Managers
1. **Setup Sanity**: Follow SANITY_INTEGRATION_GUIDE.md
2. **Add Content**: Use Sanity Studio to create posts
3. **Preview**: Changes appear automatically on the site
4. **Manage**: Edit, delete, or unpublish content anytime

## 📄 License

MIT

## 🤝 Contributing

This is a personal archive project. For questions or suggestions, please open an issue.

---

**Last Updated**: February 2, 2026  
**Version**: 2.0.0  
**Status**: ✅ Production Ready with all core features completed
