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
- **CMS**: Sanity (Headless CMS for content management)
- **Linting**: ESLint + Prettier
- **Process Manager**: PM2

## 📁 Project Structure

```
mni-archive-v2/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with global styles
│   ├── page.tsx      # Home page (uses LandingPage component)
│   └── globals.css   # Global CSS with Tailwind v4
├── components/       # Reusable React components
│   ├── LandingPage.tsx  # Main landing page with animations
│   └── Button.tsx    # Sample button component
├── lib/              # Utility functions and helpers
│   ├── sanity.ts     # Sanity client and GROQ queries
│   └── utils.ts      # Common utilities
├── types/            # TypeScript type definitions
│   ├── sanity.ts     # Sanity CMS types
│   └── index.ts      # Shared types
├── sanity/           # Sanity CMS configuration
│   └── schemas/      # Content schemas (artwork, music, video, writing)
├── scripts/          # Utility scripts
│   └── seed-data.ts  # Sample data generator
├── ecosystem.config.cjs  # PM2 configuration
└── public/           # Static assets
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server

**Using npm:**
```bash
npm run dev
```

**Using PM2 (recommended for sandbox):**
```bash
pm2 start ecosystem.config.cjs
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production
```bash
npm run build
npm run start
```

### PM2 Commands
```bash
pm2 list                     # List all processes
pm2 logs mni-archive-v2     # View logs
pm2 restart mni-archive-v2  # Restart the app
pm2 stop mni-archive-v2     # Stop the app
pm2 delete mni-archive-v2   # Remove from PM2
```

### Sanity CMS Setup

**See [SANITY_SETUP.md](./SANITY_SETUP.md) for detailed setup instructions.**

Quick start:
```bash
# 1. Copy environment variables template
cp .env.local.example .env.local

# 2. Add your Sanity credentials to .env.local
# Get them from https://sanity.io/manage

# 3. Seed sample data
npm run seed-data
```

### Format Code
```bash
npm run format
```

### Lint Code
```bash
npm run lint
```

## 📝 Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS v4 for styling
- ✅ Framer Motion for smooth animations
- ✅ Sanity CMS integration for content management
- ✅ ESLint + Prettier for code quality
- ✅ Minimalist black & white theme
- ✅ Inter font from Google Fonts
- ✅ Landing page matching mniarchive.pages.dev design
- ✅ Scroll-based animations and interactions
- ✅ Fully responsive design
- ✅ PM2 process management

## 🎯 Current Status

**Completed Features:**
- ✅ Project structure setup
- ✅ Next.js 14 App Router configuration
- ✅ Tailwind CSS v4 integration
- ✅ Framer Motion animations
- ✅ Sanity CMS integration with 4 content types
- ✅ Content schemas (artwork, music, video, writing)
- ✅ Sanity client with GROQ query helpers
- ✅ TypeScript types for all content
- ✅ Sample data generator script
- ✅ Landing page component with scroll interactions
- ✅ Typography and spacing matching original design
- ✅ Responsive layout for all screen sizes
- ✅ PM2 configuration for process management

**Current Functional URIs:**
- `/` - Landing page with hero section and archive preview
  - Displays "mni archive" branding
  - Shows "Archive #01" content with description
  - Smooth scroll animations using Framer Motion

**Content Management:**
- **Artwork**: Title, image, description, category, created date, featured flag
- **Music**: Title, audio file/URL, cover image, lyrics, duration, release date, genre
- **Video**: Title, video URL, thumbnail, description, duration, published date, category
- **Writing**: Title, excerpt, rich content, cover image, published date, category, tags
  - "Coming Soon" interactive badge

**Not Yet Implemented:**
- Archive detail pages for individual items
- Archive content management system
- API routes for data fetching
- Database integration
- User authentication
- Admin panel for content management
- Search and filter functionality
- Multiple archive collections

## 🔮 Next Steps

1. **Create archive detail pages** - Individual pages for each archive item
2. **Add archive grid/list view** - Display multiple archive items
3. **Implement content CMS** - Manage archive content dynamically
4. **Add API routes** - Backend logic for content management
5. **Integrate database** - Persistent storage (Supabase, Prisma + PostgreSQL, etc.)
6. **Add authentication** - User login and permissions
7. **Implement search** - Help users find archived content
8. **Add admin panel** - Content management interface

## 📄 License

MIT

## 🙋‍♂️ Author

Created with ❤️ for the mni archive project
