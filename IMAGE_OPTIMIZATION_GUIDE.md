# 이미지 최적화 가이드 🖼️

## 📌 구현된 Sanity 이미지 최적화 함수

### 1. **getThumbnailUrl** - 썸네일 이미지
```typescript
import { getThumbnailUrl } from '@/lib/sanity';

// 기본 사용
const thumbnailUrl = getThumbnailUrl(image);
// 출력: 400px 너비, 75% 품질, WebP 자동 변환

// 커스텀 설정
const customThumbnail = getThumbnailUrl(image, 600, 80);
// 출력: 600px 너비, 80% 품질
```

**사용 예시:**
- 카드 그리드
- 목록 페이지
- 미리보기

### 2. **getHighResUrl** - 고해상도 이미지
```typescript
import { getHighResUrl } from '@/lib/sanity';

// 기본 사용
const highResUrl = getHighResUrl(image);
// 출력: 1920px 최대 너비, 90% 품질

// 커스텀 설정
const customHighRes = getHighResUrl(image, 2560, 95);
// 출력: 2560px 너비, 95% 품질
```

**사용 예시:**
- 상세 페이지
- Lightbox
- 배너 이미지

### 3. **getResponsiveSrcSet** - 반응형 이미지
```typescript
import { getResponsiveSrcSet } from '@/lib/sanity';

// 기본 사용 (400, 800, 1200, 1920px)
const srcSet = getResponsiveSrcSet(image);

// 커스텀 크기 배열
const customSrcSet = getResponsiveSrcSet(image, [320, 640, 1280], 85);

// Next.js Image 컴포넌트와 함께
<img
  srcSet={srcSet}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  src={getHighResUrl(image)}
  alt={title}
/>
```

**사용 예시:**
- 반응형 갤러리
- 다양한 화면 크기 대응
- 성능 최적화

### 4. **getBlurPlaceholder** - 블러 플레이스홀더
```typescript
import { getBlurPlaceholder } from '@/lib/sanity';

// 로딩 중 블러 이미지 생성
const blurUrl = getBlurPlaceholder(image);
// 출력: 20px 너비, 20% 품질, 블러 50

// CSS 배경으로 사용
<div
  style={{
    backgroundImage: `url(${blurUrl})`,
    backgroundSize: 'cover',
    filter: 'blur(10px)',
  }}
>
  <img src={getHighResUrl(image)} alt={title} />
</div>
```

**사용 예시:**
- 이미지 로딩 중 표시
- 프로그레시브 이미지 로딩
- 사용자 경험 개선

## 🎨 이미지 잘림 문제 해결 방법

### 문제 상황
- `object-cover`로 인해 이미지가 잘림
- 세로형/특이 비율 이미지 내용 보이지 않음

### ✅ 해결 방법 1: object-contain 사용 (간단)
```typescript
// components/ArtworkCard.tsx
<Image
  src={image}
  alt={title}
  fill
  className="object-contain bg-black"  // object-cover → object-contain
/>
```

**장점:**
- 이미지 전체 표시
- 비율 유지
- 간단한 구현

**단점:**
- 여백 발생 가능

### ✅ 해결 방법 2: 동적 Aspect Ratio (추천)
```typescript
// Sanity에서 이미지 메타데이터 가져오기
const query = `*[_type == "artwork" && slug.current == $slug][0] {
  ...,
  "imageMetadata": image.asset->{
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  }
}`;

// 컴포넌트에서 사용
<div
  className="relative w-full"
  style={{ aspectRatio: imageMetadata.aspectRatio }}
>
  <Image
    src={image}
    fill
    className="object-contain"
    alt={title}
  />
</div>
```

**장점:**
- 이미지마다 최적 비율
- 여백 최소화
- 프로페셔널한 느낌

### ✅ 해결 방법 3: Lightbox + Thumbnail (현재 구현)
```typescript
// 썸네일: 깔끔하게 잘림
<Image
  src={getThumbnailUrl(image)}
  fill
  className="object-cover"  // 그리드 일관성 유지
/>

// Lightbox: 전체 이미지 보기
<Image
  src={getHighResUrl(image)}
  fill
  className="object-contain"  // 원본 전체 표시
/>
```

**장점:**
- 목록: 디자인 일관성
- 상세: 원본 이미지
- 최고의 UX

## 🚀 실전 적용 예시

### 목록 페이지 (Artworks Grid)
```typescript
// app/artworks/ArtworksClient.tsx
import { getThumbnailUrl, getBlurPlaceholder } from '@/lib/sanity';

<ArtworkCard
  title={artwork.title}
  slug={artwork.slug}
  // Sanity 이미지 최적화 사용
  image={getThumbnailUrl(artwork.image, 400, 75)}
  placeholder={getBlurPlaceholder(artwork.image)}
/>
```

### 상세 페이지 (Artwork Detail)
```typescript
// app/artworks/[slug]/page.tsx
import { getHighResUrl, getResponsiveSrcSet } from '@/lib/sanity';

<Image
  src={getHighResUrl(artwork.image, 1920, 90)}
  srcSet={getResponsiveSrcSet(artwork.image)}
  sizes="(max-width: 768px) 100vw, 80vw"
  alt={artwork.title}
  fill
  className="object-contain"
  priority
/>
```

### Lightbox (Full-Screen View)
```typescript
// components/Lightbox.tsx
import { getHighResUrl } from '@/lib/sanity';

<Image
  src={getHighResUrl(image, 2560, 95)}  // 최고 품질
  fill
  className="object-contain"
  alt={title}
/>
```

## 📊 최적화 효과 비교

| 방법 | 파일 크기 | 로딩 속도 | 화질 |
|------|-----------|-----------|------|
| 원본 이미지 | ~2-5 MB | 느림 ❌ | 최고 ✅ |
| getThumbnailUrl | ~30-50 KB | 빠름 ✅ | 양호 ✅ |
| getHighResUrl | ~100-300 KB | 보통 ✅ | 우수 ✅ |
| getResponsiveSrcSet | 자동 선택 | 최적 ✅ | 적응형 ✅ |

## 🎯 권장 사항

### 1. **목록 페이지**
- `getThumbnailUrl(image, 400, 75)` 사용
- `object-cover`로 디자인 일관성 유지
- Lazy loading 적용

### 2. **상세 페이지**
- `getHighResUrl(image, 1920, 90)` 사용
- `getResponsiveSrcSet`로 반응형 지원
- `priority` prop으로 빠른 로딩

### 3. **Lightbox**
- `getHighResUrl(image, 2560, 95)` 사용 (최고 품질)
- `object-contain`으로 전체 이미지 표시
- ESC 키로 닫기

### 4. **로딩 최적화**
- `getBlurPlaceholder` 사용
- 프로그레시브 이미지 로딩
- Next.js `<Image>` 컴포넌트 활용

## 🔧 Sanity Studio 설정

Sanity Studio에서 이미지 최적화 활성화:
```javascript
// sanity.config.ts
import { defineConfig } from 'sanity';

export default defineConfig({
  // ... 기존 설정
  image: {
    formats: ['webp', 'jpeg'],
    quality: {
      default: 80,
      high: 90,
      low: 60,
    },
  },
});
```

## ✅ 최적화 체크리스트

- [x] Sanity Image Pipeline 헬퍼 함수 구현
- [x] 썸네일 최적화 (목록 페이지)
- [x] 고해상도 최적화 (상세 페이지)
- [x] 반응형 srcSet 지원
- [x] 블러 플레이스홀더
- [x] Lightbox 전체 화면 뷰
- [ ] Sanity CDN 연동 (환경변수 설정 후)
- [ ] 이미지 메타데이터 활용 (동적 비율)
- [ ] 프로그레시브 이미지 로딩
- [ ] Lazy loading 최적화

**참고:** Sanity 환경변수 설정 후 모든 Mock 이미지를 Sanity CDN 이미지로 교체하세요! 🚀
