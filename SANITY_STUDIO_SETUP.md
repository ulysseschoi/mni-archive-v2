# Sanity Studio 연동 가이드

## 🎯 개요
mni-archive-v2 프로젝트에 Sanity CMS를 연동하여 실제 콘텐츠를 관리하는 방법입니다.

## 📋 방법 1: Sanity.io 웹 Studio 사용 (추천)

### Step 1: Sanity 프로젝트 생성
1. https://sanity.io 접속
2. 로그인 or 회원가입
3. "Create Project" 클릭
4. 프로젝트 이름: `mni-archive` 입력
5. **Project ID 복사** (예: `abc123xyz`)

### Step 2: 환경변수 설정
```bash
# .env.local 파일 편집
cd /home/user/mni-archive-v2
nano .env.local

# 아래 내용 입력 (Project ID를 실제 값으로 변경)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 3: Sanity Management에서 스키마 설정

Sanity 웹사이트에서 스키마를 설정합니다:

1. https://sanity.io/manage 접속
2. 프로젝트 선택
3. "Schema" 탭으로 이동
4. 아래 스키마 타입들을 하나씩 추가:

#### Artwork Schema
```javascript
{
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Doodle', value: 'doodle'},
          {title: 'Character', value: 'character'},
          {title: 'Sketch', value: 'sketch'},
          {title: 'Illustration', value: 'illustration'}
        ]
      }
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

#### Music Schema
```javascript
{
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', validation: Rule => Rule.required()},
    {name: 'slug', type: 'slug', options: {source: 'title'}},
    {name: 'coverImage', type: 'image', options: {hotspot: true}},
    {name: 'audioUrl', type: 'url'},
    {name: 'lyrics', type: 'text'},
    {name: 'duration', type: 'string'},
    {name: 'releaseDate', type: 'datetime'},
    {name: 'genre', type: 'string'}
  ]
}
```

#### Video Schema
```javascript
{
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', validation: Rule => Rule.required()},
    {name: 'slug', type: 'slug', options: {source: 'title'}},
    {name: 'videoUrl', type: 'url'},
    {name: 'thumbnail', type: 'image', options: {hotspot: true}},
    {name: 'description', type: 'text'},
    {name: 'duration', type: 'string'},
    {name: 'publishedAt', type: 'datetime'},
    {name: 'category', type: 'string'}
  ]
}
```

#### Writing Schema
```javascript
{
  name: 'writing',
  title: 'Writing',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', validation: Rule => Rule.required()},
    {name: 'slug', type: 'slug', options: {source: 'title'}},
    {name: 'excerpt', type: 'text'},
    {name: 'content', type: 'array', of: [{type: 'block'}]},
    {name: 'coverImage', type: 'image'},
    {name: 'publishedAt', type: 'datetime'},
    {name: 'category', type: 'string'},
    {name: 'tags', type: 'array', of: [{type: 'string'}]}
  ]
}
```

### Step 4: 콘텐츠 추가
1. Sanity Studio (웹)에서 "Content" 탭으로 이동
2. "Create new" 버튼 클릭
3. 원하는 타입 선택 (Artwork, Music, Video, Writing)
4. 필드 입력 후 "Publish" 클릭

### Step 5: Next.js 앱 재시작
```bash
cd /home/user/mni-archive-v2
pm2 restart mni-archive-v2
```

### Step 6: 확인
웹사이트를 새로고침하면 Sanity에서 추가한 콘텐츠가 표시됩니다!

---

## 📋 방법 2: Sanity CLI Studio (로컬 설치)

### Step 1: 별도 디렉토리에 Studio 설치
```bash
cd /home/user
npm create sanity@latest -- --project abc123xyz --dataset production

# 질문에 답변:
# - Studio 이름: mni-archive-studio
# - Output path: ./studio
# - Schema template: Clean project
```

### Step 2: 스키마 복사
```bash
# 프로젝트의 스키마를 Studio로 복사
cp -r /home/user/mni-archive-v2/sanity/schemas/* /home/user/studio/schemas/
```

### Step 3: Studio 실행
```bash
cd /home/user/studio
npm run dev
```

별도 포트(기본 3333)에서 Studio가 실행됩니다.

---

## 🔗 API 토큰 (Write 작업 필요 시)

### 토큰 생성
1. https://sanity.io/manage 접속
2. 프로젝트 선택
3. "API" → "Tokens" 탭
4. "Add API token" 클릭
5. 권한: Editor
6. 토큰 복사

### 환경변수에 추가
```bash
# .env.local
SANITY_API_TOKEN=your_token_here
```

---

## ✅ 연동 확인

### 1. 데이터 소스 확인
페이지 상단에 "Using mock data" 배지가 **사라지면** Sanity 연동 성공!

### 2. 콘텐츠 표시 확인
Sanity에서 추가한 실제 콘텐츠가 사이트에 표시됩니다.

### 3. 이미지 URL 확인
개발자 도구에서 이미지 URL이 `cdn.sanity.io`로 시작하면 성공!

---

## 🐛 문제 해결

### "Project not found" 에러
- `.env.local`의 Project ID가 정확한지 확인
- PM2 재시작: `pm2 restart mni-archive-v2`

### 데이터가 표시되지 않음
- Sanity Studio에서 콘텐츠가 **Publish** 되었는지 확인
- Dataset 이름이 "production"인지 확인

### 이미지가 깨짐
- Sanity에 이미지가 제대로 업로드되었는지 확인
- Image URL builder 함수 확인: `lib/sanity.ts`의 `urlFor()`

---

## 📚 참고 자료

- Sanity Docs: https://www.sanity.io/docs
- GROQ Query: https://www.sanity.io/docs/groq
- Image URLs: https://www.sanity.io/docs/image-urls

---

## 🎯 Quick Start (요약)

```bash
# 1. Sanity 프로젝트 생성 (웹에서)
# 2. Project ID 복사

# 3. 환경변수 설정
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=your_id" >> .env.local

# 4. 앱 재시작
pm2 restart mni-archive-v2

# 5. Sanity Studio(웹)에서 콘텐츠 추가
# 6. 사이트 새로고침 → 콘텐츠 확인!
```

---

**Note**: 현재 프로젝트는 Mock 데이터 Fallback이 있어서 Sanity 없이도 작동합니다!
