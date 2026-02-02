# Cloudflare Pages 배포 가이드

## Quick Start

### 1. GitHub 푸시
```bash
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```

### 2. Cloudflare Pages 설정
1. https://dash.cloudflare.com 로그인
2. Workers & Pages → Create → Connect to Git
3. 저장소 선택: mni-archive-v2
4. Framework: Next.js
5. Build command: `npm run build`
6. Build output: `out`

### 3. 환경변수 (Sanity 사용 시)
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET=production

### 4. Deploy!
Production URL: https://mni-archive-v2.pages.dev

## 현재 설정 (완료)
- ✅ next.config.ts: output='export'
- ✅ Static export 지원
- ✅ 이미지 최적화 비활성화

## 참고
- Docs: https://developers.cloudflare.com/pages
