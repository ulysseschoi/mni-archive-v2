# Cloudflare Pages Setup for mni-archive-v2

## 🚨 Critical Build Settings

### Step 1: Go to Cloudflare Pages Dashboard
1. Visit: https://dash.cloudflare.com/
2. Select your account
3. Go to **Workers & Pages**
4. Find and click **mni-archive-v2** project

### Step 2: Update Build Configuration
Go to **Settings** > **Builds & deployments** > **Edit configurations**

#### Required Settings:
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: /
```

**⚠️ IMPORTANT**: The Build output directory MUST be set to `out` (not `.next`)

### Step 3: Environment Variables (Optional)
If using Supabase Auth or other services:

**Settings** > **Environment variables** > **Add variable**

Add these variables:
- `NEXT_PUBLIC_SUPABASE_URL` = your_supabase_url
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your_anon_key

### Step 4: Retry Failed Deployment
After updating settings:
1. Go to **Deployments**
2. Find the failed deployment
3. Click **Retry deployment**

Or push a new commit to trigger automatic deployment.

---

## 📁 Project Configuration Files

### next.config.ts
```typescript
export default {
  output: 'export',  // ✅ Required for static export
  trailingSlash: true,
  images: {
    unoptimized: true,  // ✅ Required for static export
  },
};
```

### wrangler.toml
```toml
name = "mni-archive-v2"
compatibility_date = "2024-01-01"
pages_build_output_dir = "out"  # ✅ Output directory
```

---

## ✅ Verification Checklist

After deployment completes:

### 1. Check Homepage
- [ ] Visit https://mniarchive.com/
- [ ] Intro animation plays on first visit
- [ ] Navigation menu works

### 2. Check Artworks Page
- [ ] Visit https://mniarchive.com/artworks/
- [ ] 5 artwork images load correctly:
  - B의 집 (b-house.png)
  - 고양이 친구 (cat-friend.png)
  - 스케이트보드 타는 친구 (black-briar-skater.png)
  - 열린 상자 (open-box.png)
  - 형상의 미로 (shape-maze.png)
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Lightbox opens on image click

### 3. Check Music Page
- [ ] Visit https://mniarchive.com/music/
- [ ] 5 track covers load correctly:
  - 살랑살랑 (salang-salang.jpg)
  - DA DA! (da-da.jpg)
  - 우리집 고양이 츄르를 좋아해 (cat-churu.jpg)
  - Tea time (tea-time.jpg)
  - Ticket (ticket.jpg)
- [ ] Hover effects work
- [ ] Video modal opens on click

### 4. Check Other Pages
- [ ] /drops - Countdown timer works
- [ ] /shop - Placeholder shows
- [ ] /auth - Login form displays
- [ ] /profile - Protected route redirects

### 5. Mobile Testing
- [ ] Test on mobile device
- [ ] Hamburger menu opens/closes
- [ ] 2x2 grid layout on home page
- [ ] Images load on mobile

---

## 🐛 Troubleshooting

### Error: "build output directory not found"
**Solution**: Update Build output directory to `out` in Cloudflare dashboard

### Images Not Loading
**Cause**: Static files not included in build
**Solution**: Check that `public/artworks/` and `public/music-covers/` folders exist

### 404 Errors on Routes
**Cause**: Missing `trailingSlash: true`
**Solution**: Already configured in next.config.ts

### API Routes Not Working
**Limitation**: Static export does NOT support API routes
**Alternative**: Use Cloudflare Workers for API endpoints

---

## 📊 Build Status

**Current Commit**: 757d3ec
**Files Changed**: 5 files
**Build Output**: out/ directory with 13 static pages

**Expected Build Time**: 2-3 minutes
**Expected Deploy Time**: 1-2 minutes
**Total**: ~5 minutes from push to live

---

## 🎉 Success Indicators

When deployment succeeds, you should see:
- ✅ Green checkmark on deployment
- ✅ Custom domain active: https://mniarchive.com
- ✅ All images loading
- ✅ Navigation working
- ✅ Mobile responsive

---

## 📞 Next Steps

After successful deployment:
1. Test all pages thoroughly
2. Check mobile responsiveness
3. Verify custom domain
4. Test intro animation on first visit
5. Report any issues for immediate fix
