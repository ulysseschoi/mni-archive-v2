# UX Improvements Guide

## 🎨 Global Micro-Interactions System

모든 인터랙션은 **300ms ease-out** 트랜지션으로 일관된 UX 제공.

---

## 📦 새로 추가된 컴포넌트

### 1. LoadingSkeleton.tsx

4가지 variant로 다양한 로딩 상태 지원:

```tsx
import LoadingSkeleton from "@/components/LoadingSkeleton";

// 그리드 레이아웃 (artworks, music, videos)
<LoadingSkeleton variant="grid" count={6} />

// 카드 레이아웃 (drops, shop)
<LoadingSkeleton variant="card" count={3} />

// 텍스트 레이아웃 (상세 페이지)
<LoadingSkeleton variant="text" count={5} />

// 프로필 레이아웃 (profile 페이지)
<LoadingSkeleton variant="profile" />
```

**특징:**
- Shimmer 애니메이션 (1.5s 무한 반복)
- 회색 배경 (bg-white/5)
- Framer Motion으로 부드러운 등장

---

### 2. PageTransition.tsx

페이지 전환 애니메이션:

```tsx
import PageTransition from "@/components/PageTransition";

export default function MyPage() {
  return (
    <PageTransition>
      <main>{/* 페이지 콘텐츠 */}</main>
    </PageTransition>
  );
}
```

**애니메이션:**
- 시작: `opacity: 0, y: 20`
- 종료: `opacity: 1, y: 0`
- Duration: 200ms
- Easing: easeOut

---

## 🎯 커스텀 에러 페이지

### 404 Page (`app/not-found.tsx`)

```
┌───────────────────┐
│       404         │
│ Lost in the       │
│   archive?        │
│                   │
│ [홈으로 돌아가기]    │
│ [작품 보러가기]      │
└───────────────────┘
```

**특징:**
- 검은 배경, 흰 텍스트
- 부드러운 fade in 애니메이션
- 2개 액션 버튼 (홈, 작품)
- 장식 요소 (✦ ✦ ✦)

---

### Error Page (`app/error.tsx`)

```
┌───────────────────┐
│        ⚠         │
│ Something went    │
│ wrong in the void │
│                   │
│ [다시 시도]         │
│ [홈으로 돌아가기]    │
└───────────────────┘
```

**특징:**
- 자동 에러 로깅
- 개발 모드에서 에러 메시지 표시
- Reset 버튼으로 재시도 가능

---

### Loading Page (`app/loading.tsx`)

```
┌───────────────────┐
│    [Spinner]      │
│  The archive is   │
│    loading...     │
│    • • •          │
└───────────────────┘
```

**특징:**
- 회전하는 로딩 스피너
- Pulsing dots 애니메이션
- 미니멀한 디자인

---

## 🎨 Global CSS Classes

모든 클래스는 `app/globals.css`에 정의됨.

### 버튼 인터랙션

```html
<button className="btn-hover">
  Click Me
</button>
```

- **Hover**: `scale(1.02)`
- **Active**: `scale(0.98)`
- **Transition**: 300ms ease-out

---

### 카드 인터랙션

```html
<div className="card-hover">
  <!-- 카드 콘텐츠 -->
</div>
```

- **Hover**: `scale(1.01)` + subtle shadow
- **Shadow**: `box-shadow: 0 20px 50px rgba(255, 255, 255, 0.05)`
- **Transition**: 300ms ease-out

---

### 링크 인터랙션

```html
<a href="/artworks" className="link-hover">
  View Artworks
</a>
```

- **Hover**: `opacity: 0.8`
- **Transition**: 300ms ease-out

---

### 이미지 호버

```html
<div className="overflow-hidden">
  <img src="/image.jpg" className="image-hover" />
</div>
```

- **Hover**: `scale(1.1)`
- **Transition**: 500ms ease-out

---

### Border Glow

```html
<div className="border border-white/10 border-glow">
  <!-- 콘텐츠 -->
</div>
```

- **Hover**: 밝은 border + 미세한 glow
- **Border**: `rgba(255, 255, 255, 0.4)`
- **Shadow**: `0 0 15px rgba(255, 255, 255, 0.1)`

---

### 애니메이션 유틸리티

```html
<!-- Fade In -->
<div className="fade-in">Appears smoothly</div>

<!-- Pulse -->
<div className="pulse-subtle">Gentle pulsing</div>

<!-- Spin -->
<div className="spin-slow">Rotating</div>

<!-- Smooth Transition -->
<div className="transition-smooth">All properties</div>
```

---

## 📱 적용 예시

### 홈 페이지 Quick Links

```tsx
<Link href="/drops">
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="px-6 py-2 border border-white/20..."
  >
    Drops
  </motion.button>
</Link>
```

---

### Navigation Links

```tsx
<Link
  href="/artworks"
  className="relative text-sm font-light tracking-wide link-hover"
>
  Artworks
</Link>
```

---

### Auth 버튼

```tsx
<motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="w-full bg-white text-black..."
>
  로그인
</motion.button>
```

---

## 🎯 적용 가이드라인

### 버튼
- 모든 버튼에 `whileHover`, `whileTap` 적용
- Primary: `bg-white text-black` + hover `bg-gray-200`
- Secondary: `border border-white/20` + hover `bg-white/5`

### 카드
- 모든 카드에 `card-hover` 클래스 추가
- `border border-white/10` 기본 스타일

### 링크
- Navigation links: `link-hover` 클래스
- Hover시 `opacity: 0.8`

### 페이지 전환
- 모든 페이지를 `PageTransition`으로 감싸기
- Fade in 효과 (200ms)

### 로딩 상태
- 데이터 로딩 중: `LoadingSkeleton` 사용
- 페이지 로딩 중: `app/loading.tsx` 자동 표시

---

## 🎨 디자인 원칙

1. **일관성**: 모든 인터랙션은 300ms ease-out
2. **미세함**: Subtle한 효과 (scale 1.01~1.02)
3. **검은/흰**: Pure black (#000000) & white (#FFFFFF)
4. **깔끔함**: 불필요한 애니메이션 지양
5. **성능**: GPU 가속 (transform, opacity만 사용)

---

## 🚀 다음 단계

### 적용할 페이지:
- ✅ Home: Quick links with animations
- ✅ Navigation: link-hover classes
- ⏳ Artworks: card-hover on artwork cards
- ⏳ Drops: button animations
- ⏳ Shop: product card hover effects
- ⏳ Profile: button interactions

### 추가 개선:
- [ ] Skeleton loader를 실제 페이지에 통합
- [ ] Page transitions를 모든 페이지에 적용
- [ ] Custom scrollbar 전역 적용
- [ ] Input focus states 통일

---

## 📝 사용 예시 코드

### Artworks Page with Skeleton

```tsx
"use client";

import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import PageTransition from "@/components/PageTransition";

export default function ArtworksPage() {
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch artworks
    fetchArtworks().then((data) => {
      setArtworks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSkeleton variant="grid" count={6} />;
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white pt-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="card-hover border border-white/10">
              {/* Artwork content */}
            </div>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
```

---

## 🎯 체크리스트

배포 전 확인사항:

- [x] LoadingSkeleton 컴포넌트 생성
- [x] PageTransition 컴포넌트 생성
- [x] 404, error, loading 페이지 생성
- [x] globals.css에 micro-interactions 추가
- [x] Navigation에 link-hover 적용
- [x] Home page에 animated buttons 추가
- [ ] 모든 페이지에 PageTransition 적용
- [ ] 모든 버튼에 hover/tap animations 적용
- [ ] 모든 카드에 card-hover 적용
- [ ] Loading states에 Skeleton 사용

---

## 🔧 문제 해결

### Framer Motion 서버/클라이언트 에러
```tsx
// ✅ 해결: "use client" 추가
"use client";

import { motion } from "framer-motion";
```

### Tailwind v4 @apply 에러
```css
/* ❌ 작동하지 않음 */
.btn-hover {
  @apply scale-[1.02];
}

/* ✅ 해결: 순수 CSS 사용 */
.btn-hover:hover {
  transform: scale(1.02);
}
```

---

**완료!** 🎉
모든 UX 개선사항이 검은/흰 미니멀 감성을 유지하면서 구현되었습니다.
