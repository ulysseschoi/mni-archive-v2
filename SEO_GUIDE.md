# SEO 최적화 가이드 📊

## 📌 구현된 SEO 기능

### 1. **전역 메타데이터 설정** (`app/layout.tsx`)
- **Title Template**: `%s | MNI Archive`
- **Open Graph**: 소셜 미디어 공유 최적화
- **Twitter Card**: 트위터 공유 최적화
- **Robots**: 검색 엔진 크롤링 허용
- **Keywords**: mni, meenoi, archive, artist, portfolio

### 2. **페이지별 SEO** (`lib/seo.ts`)
모든 페이지에 맞춤형 SEO 설정:
- **Home**: 메인 아카이브 소개
- **Artworks**: 아트워크 컬렉션
- **Music**: 음악 작품 (`music.song` 타입)
- **Videos**: 비디오 콘텐츠 (`video.other` 타입)
- **Writings**: 글 작품 (`article` 타입)

### 3. **동적 SEO 생성** (`generateDynamicSEO`)
각 작품 상세 페이지에 자동으로 SEO 메타데이터 생성:
```typescript
import { generateDynamicSEO } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const artwork = await getArtworkBySlug(params.slug);
  
  return generateDynamicSEO('artworks', {
    title: artwork.title,
    description: artwork.description,
    image: artwork.image,
    publishedAt: artwork.createdAt,
    slug: params.slug,
  });
}
```

## 🚀 SEO 체크리스트

### ✅ 현재 구현된 기능
- [x] Title 태그 최적화
- [x] Meta Description
- [x] Open Graph (Facebook, LinkedIn 등)
- [x] Twitter Card
- [x] Canonical URL
- [x] Robots 메타 태그
- [x] Keywords
- [x] 구조화된 데이터 준비

### ⏳ 추후 권장 사항

#### 1. **Google Search Console 등록**
```bash
# 1. https://search.google.com/search-console 방문
# 2. 속성 추가 → https://mni-archive-v2.pages.dev
# 3. 소유권 확인 코드 복사
```

`app/layout.tsx`에 추가:
```typescript
export const metadata: Metadata = {
  // ... 기존 설정
  verification: {
    google: 'your-google-verification-code',
  },
};
```

#### 2. **사이트맵 생성** (`sitemap.ts`)
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mni-archive-v2.pages.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://mni-archive-v2.pages.dev/artworks',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 동적 페이지 추가...
  ];
}
```

#### 3. **robots.txt** (`robots.ts`)
```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://mni-archive-v2.pages.dev/sitemap.xml',
  };
}
```

#### 4. **JSON-LD 구조화된 데이터**
각 작품 페이지에 추가:
```typescript
// 아트워크 상세 페이지
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VisualArtwork',
  name: artwork.title,
  description: artwork.description,
  image: artwork.image,
  creator: {
    '@type': 'Person',
    name: 'MNI (Meenoi)',
  },
};

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    {/* 페이지 내용 */}
  </>
);
```

#### 5. **Sanity 이미지 최적화 활용**
```typescript
// lib/sanity.ts 헬퍼 함수 사용
import { getThumbnailUrl, getHighResUrl } from '@/lib/sanity';

// 썸네일용
const thumbnailUrl = getThumbnailUrl(artwork.image, 400, 75);

// 상세 페이지용
const highResUrl = getHighResUrl(artwork.image, 1920, 90);

// Open Graph 이미지용
const ogImage = getHighResUrl(artwork.image, 1200, 90);
```

## 📊 SEO 성능 측정 도구

### 1. **Google PageSpeed Insights**
- URL: https://pagespeed.web.dev/
- 입력: `https://mni-archive-v2.pages.dev`
- 확인: Performance, Accessibility, Best Practices, SEO

### 2. **Google Rich Results Test**
- URL: https://search.google.com/test/rich-results
- Open Graph, JSON-LD 확인

### 3. **Open Graph Debugger**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator

## 🎯 핵심 SEO 포인트

1. **제목 최적화**: 각 페이지마다 고유한 타이틀
2. **메타 설명**: 120-160자 이내, 키워드 포함
3. **Open Graph 이미지**: 1200x630px 추천
4. **모바일 최적화**: 반응형 디자인
5. **로딩 속도**: Sanity CDN + 이미지 최적화
6. **내부 링크**: 페이지 간 연결 강화

## 📝 현재 SEO 설정 요약

| 페이지 | Title | Type | Keywords |
|--------|-------|------|----------|
| Home | MNI Archive | website | mni, meenoi, archive |
| Artworks | Artworks \| MNI Archive | article | artwork, illustration, art |
| Music | Music \| MNI Archive | music.song | music, song, album |
| Videos | Videos \| MNI Archive | video.other | video, music video |
| Writings | Writings \| MNI Archive | article | writing, essay, poem |

모든 페이지에 Open Graph, Twitter Card, Canonical URL 자동 적용됨! ✅
