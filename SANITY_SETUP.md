# Sanity CMS Setup Guide for MNI Archive

This guide will help you set up Sanity CMS for the MNI Archive project.

## 📋 Prerequisites

- Node.js 18+ installed
- A Sanity account (free at https://sanity.io)

## 🚀 Quick Start

### 1. Create a Sanity Project

Visit https://sanity.io/manage and create a new project:
- Click "Create project"
- Choose a project name (e.g., "mni-archive")
- Select a dataset name (use "production" as default)
- Note down your **Project ID**

### 2. Get Your API Token

1. Go to https://sanity.io/manage/personal/tokens
2. Click "Add API Token"
3. Give it a name (e.g., "MNI Archive API")
4. Select "Editor" permissions
5. Copy the token (you won't see it again!)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### 4. Seed Sample Data

Run the seed script to populate your Sanity project with sample data:

```bash
npm run seed-data
```

This will create:
- 3 sample artworks
- 3 sample music tracks
- 3 sample videos
- 3 sample writings

**Note**: Images need to be uploaded manually through Sanity Studio (see below).

### 5. Access Sanity Studio (Optional)

To manage content through the Sanity Studio interface, you'll need to install the Sanity CLI:

```bash
# Install Sanity CLI globally
npm install -g sanity@latest

# Deploy your studio (optional)
sanity deploy
```

Or use Sanity's hosted studio at: `https://your-project-id.sanity.studio`

## 📝 Content Schemas

### Artwork
- **title**: Title of the artwork
- **image**: Main artwork image
- **description**: Description of the artwork
- **category**: doodle, illustration, character, sketch, digital
- **createdAt**: Creation date
- **featured**: Boolean for homepage display

### Music
- **title**: Track title
- **audioFile**: Uploaded audio file (optional)
- **audioUrl**: External audio URL (Spotify, SoundCloud, etc.)
- **coverImage**: Album/track cover art
- **lyrics**: Song lyrics
- **duration**: Track duration (mm:ss format)
- **releaseDate**: Release date
- **genre**: hiphop, rnb, pop, rap, ballad

### Video
- **title**: Video title
- **videoUrl**: YouTube, Vimeo, or other video URL
- **thumbnail**: Video thumbnail image
- **description**: Video description
- **duration**: Video length
- **publishedAt**: Publication date
- **category**: music-video, bts, performance, vlog, interview

### Writing
- **title**: Article/post title
- **excerpt**: Short preview text
- **content**: Rich text content with images
- **coverImage**: Featured image
- **publishedAt**: Publication date
- **category**: blog, poetry, story, thoughts, lyrics
- **tags**: Array of tags

## 🔧 Using the Sanity Client

Import helper functions from `lib/sanity.ts`:

```typescript
import { 
  getAllArtworks, 
  getFeaturedArtworks,
  getAllMusic,
  getAllVideos,
  getAllWritings,
  getRecentContent 
} from '@/lib/sanity';

// Example: Fetch all artworks
const artworks = await getAllArtworks();

// Example: Fetch featured artworks only
const featured = await getFeaturedArtworks();

// Example: Fetch recent content from all types
const recent = await getRecentContent(6);
```

## 🎨 Image URLs

To generate image URLs:

```typescript
import { urlFor } from '@/lib/sanity';

// In your component
const imageUrl = urlFor(artwork.image)
  .width(800)
  .height(600)
  .url();
```

## 📚 TypeScript Types

All Sanity types are defined in `types/sanity.ts`:

```typescript
import type { Artwork, Music, Video, Writing } from '@/types/sanity';
```

## 🐛 Troubleshooting

### "Project not found" error
- Double-check your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Make sure the project exists at https://sanity.io/manage

### "Unauthorized" error
- Verify your `SANITY_API_TOKEN` is correct
- Ensure the token has "Editor" permissions

### Images not showing
- Images must be uploaded through Sanity Studio
- Use the `urlFor()` helper to generate image URLs

## 📖 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Reference](https://www.sanity.io/docs/groq)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/nextjs)

## 🎉 Next Steps

1. Upload images through Sanity Studio
2. Create custom content pages using the data
3. Build archive listing pages
4. Add filtering and search functionality
