# 🚀 Sanity CMS 연동 가이드

## 현재 상태
✅ **Sanity 스키마 완성**: Artwork, Music, Video, Writing  
✅ **GROQ 쿼리 함수 준비**: lib/sanity.ts에 모든 쿼리 함수 구현됨  
✅ **환경변수 템플릿**: .env.local 파일 생성됨  
⏳ **데이터 소스**: 현재 Mock 데이터 사용 중 (Sanity 설정 시 자동 전환)

---

## 📋 Sanity 설정 단계

### Step 1: Sanity 프로젝트 생성
1. https://sanity.io 접속
2. 로그인 or 회원가입
3. "Create Project" 클릭
4. 프로젝트 이름: `mni-archive` (또는 원하는 이름)
5. **Project ID 복사** (예: `abc123xyz`)

### Step 2: 환경변수 설정
`.env.local` 파일을 열고 Project ID를 입력:

```bash
# Before
NEXT_PUBLIC_SANITY_PROJECT_ID=

# After (예시)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
```

### Step 3: Sanity Studio 설치 (선택사항)
콘텐츠를 관리하려면 Sanity Studio가 필요합니다:

```bash
cd /home/user/mni-archive-v2
npm install sanity
npx sanity init
# Project ID 입력: abc123xyz
# Dataset: production
```

### Step 4: 스키마 배포
```bash
# Sanity Studio 폴더로 이동 (생성된 경우)
cd studio  # 또는 sanity 폴더

# 스키마 배포
npx sanity deploy
```

### Step 5: 개발 서버 재시작
```bash
pm2 restart mni-archive-v2
```

---

## 🎨 스키마 구조

### Artwork
- title (string)
- slug (slug)
- image (image)
- description (text)
- category (string)
- createdAt (datetime)
- featured (boolean)

### Music
- title (string)
- slug (slug)
- audioFile (file)
- audioUrl (url)
- coverImage (image)
- lyrics (text)
- duration (string)
- releaseDate (datetime)
- genre (string)

### Video
- title (string)
- slug (slug)
- videoUrl (url)
- thumbnail (image)
- description (text)
- duration (string)
- publishedAt (datetime)
- category (string)

### Writing
- title (string)
- slug (slug)
- excerpt (text)
- content (array of blocks)
- coverImage (image)
- publishedAt (datetime)
- category (string)
- tags (array of strings)

---

## 🔄 자동 폴백 시스템

앱은 다음과 같이 작동합니다:

1. **Sanity 설정됨** → Sanity에서 데이터 가져오기
2. **Sanity 미설정** → Mock 데이터 사용 (샘플 컨텐츠 표시)
3. **Sanity 에러 발생** → Mock 데이터로 폴백

각 페이지에 **"Using mock data"** 배지가 표시되어 현재 데이터 소스를 확인할 수 있습니다.

---

## 📝 샘플 데이터 생성

Sanity Studio에서 직접 콘텐츠를 추가하거나, `scripts/seed-data.ts`를 실행:

```bash
# 샘플 데이터 스크립트 실행
npx tsx scripts/seed-data.ts
```

이 스크립트는 각 타입별로 3개씩 샘플 데이터를 생성합니다.

---

## 🐛 문제 해결

### "Project ID not found" 에러
- `.env.local`에 올바른 Project ID가 입력되었는지 확인
- PM2 재시작: `pm2 restart mni-archive-v2`

### 데이터가 표시되지 않음
1. Sanity Studio에서 콘텐츠가 Publish되었는지 확인
2. Dataset 이름이 "production"인지 확인
3. GROQ 쿼리 확인: `lib/sanity.ts`

### API Token 관련 에러
- Read-only 접근은 Token 불필요
- Write 작업 시에만 Token 필요
- Token 생성: https://sanity.io/manage/personal/tokens

---

## ✅ 연동 확인 방법

1. 페이지 상단에 **"Using mock data"** 배지가 사라짐
2. Sanity Studio에서 추가한 콘텐츠가 사이트에 표시됨
3. 이미지 URL이 `cdn.sanity.io`로 시작함

---

## 🎯 다음 단계

Sanity 연동 후:
1. **Sanity Studio 커스터마이징**: 스키마 필드 추가/수정
2. **이미지 최적화**: Sanity Image Pipeline 활용
3. **Preview 모드**: Draft 콘텐츠 미리보기 기능
4. **Webhooks**: 콘텐츠 업데이트 시 자동 재배포

---

**참고**: 현재는 Mock 데이터로도 모든 기능이 정상 작동합니다!
