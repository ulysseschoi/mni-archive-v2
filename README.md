# mni archive v2

A minimalist Next.js 14 archive project with a pure black and white aesthetic.

## 🎨 Design Philosophy

- **Background**: #000000 (Pure Black)
- **Text**: #FFFFFF (Pure White)  
- **Font**: Inter / Helvetica Neue
- **Style**: Minimalist, Clean, Modern

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint + Prettier

## 📁 Project Structure

```
mni-archive-v2/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with global styles
│   ├── page.tsx      # Home page
│   └── globals.css   # Global CSS with Tailwind
├── components/       # Reusable React components
│   └── Button.tsx    # Sample button component
├── lib/              # Utility functions and helpers
│   └── utils.ts      # Common utilities
├── types/            # TypeScript type definitions
│   └── index.ts      # Shared types
├── styles/           # Additional styles (if needed)
└── public/           # Static assets
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production
```bash
npm run build
npm run start
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
- ✅ Tailwind CSS for styling
- ✅ ESLint + Prettier for code quality
- ✅ Minimalist black & white theme
- ✅ Inter font from Google Fonts
- ✅ Clean folder structure

## 🎯 Current Status

**Completed Features:**
- Project structure setup
- Basic routing with App Router
- Global styling with Tailwind CSS
- TypeScript configuration
- ESLint + Prettier setup
- Minimal homepage with "mni archive" text

**Not Yet Implemented:**
- Archive content management
- API routes
- Database integration
- User authentication
- Content CRUD operations

## 🔮 Next Steps

1. **Design archive content structure** - Define data models for archived items
2. **Create archive listing page** - Display archived items in a grid/list
3. **Add detail pages** - Individual archive item views
4. **Implement API routes** - Backend logic for content management
5. **Add search/filter** - Help users find archived content
6. **Integrate database** - Persistent storage (Supabase, MongoDB, etc.)

## 📄 License

MIT

## 🙋‍♂️ Author

Created with ❤️ for the mni archive project
