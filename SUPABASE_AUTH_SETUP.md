# Supabase Auth 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속 및 회원가입
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전 설정
4. 프로젝트 생성 완료 (약 2분 소요)

---

## 2. 환경 변수 설정

### Supabase 대시보드에서 API 키 확인:

1. 프로젝트 대시보드 → **Settings** → **API**
2. 다음 값 복사:
   - `Project URL`
   - `anon public` key

### .env.local 파일 생성:

```bash
# 프로젝트 루트에 .env.local 파일 생성
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 3. 데이터베이스 스키마 설정

### SQL Editor에서 다음 쿼리 실행:

```sql
-- profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  membership_tier TEXT DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 자신의 프로필만 읽기 가능
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 자신의 프로필만 업데이트 가능
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 4. 소셜 로그인 설정

### Google OAuth 설정:

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Google** 활성화
3. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 접속
4. OAuth 2.0 클라이언트 ID 생성:
   - 애플리케이션 유형: **웹 애플리케이션**
   - 승인된 리디렉션 URI: `https://your-project-id.supabase.co/auth/v1/callback`
5. Client ID와 Client Secret을 Supabase에 입력

### Apple OAuth 설정:

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Apple** 활성화
3. [Apple Developer](https://developer.apple.com/account/resources/identifiers/list) 접속
4. Service ID 생성 및 설정
5. Key 생성 및 다운로드
6. 설정 값을 Supabase에 입력

---

## 5. 이메일 템플릿 커스터마이징 (선택)

### Supabase 대시보드에서:

1. **Authentication** → **Email Templates**
2. 각 템플릿 편집:
   - Confirm signup
   - Magic Link
   - Reset password
3. MNI 브랜드에 맞게 디자인 수정

---

## 6. URL Configuration

### Supabase 대시보드에서:

1. **Authentication** → **URL Configuration**
2. **Site URL** 설정:
   - 개발: `http://localhost:3000`
   - 프로덕션: `https://mni-archive-v2.pages.dev`
3. **Redirect URLs** 추가:
   - `http://localhost:3000/auth/callback`
   - `https://mni-archive-v2.pages.dev/auth/callback`

---

## 7. 테스트

### 로컬 개발 서버 시작:

```bash
npm run dev
```

### 테스트 시나리오:

1. ✅ `/auth` 페이지 접속
2. ✅ 이메일/비밀번호로 회원가입
3. ✅ 이메일 확인 링크 클릭
4. ✅ 로그인 테스트
5. ✅ Google 로그인 테스트
6. ✅ `/profile` 페이지 접속 확인
7. ✅ 로그아웃 테스트

---

## 8. 보안 체크리스트

- ✅ Row Level Security (RLS) 활성화 확인
- ✅ API 키가 `.env.local`에만 존재 (커밋하지 않음)
- ✅ `.gitignore`에 `.env.local` 포함 확인
- ✅ Supabase 대시보드에서 이메일 확인 필수 설정
- ✅ Rate limiting 설정 (Authentication → Rate Limits)

---

## 9. 프로덕션 배포

### Cloudflare Pages 환경 변수 설정:

```bash
# Cloudflare Pages 대시보드에서 환경 변수 추가
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Site URL 업데이트:

```bash
# Supabase Authentication → URL Configuration
Site URL: https://mni-archive-v2.pages.dev
```

---

## 10. 추가 기능 (향후)

### 멤버십 등급 시스템:

```sql
-- 멤버십 등급별 혜택 테이블
CREATE TABLE membership_benefits (
  tier TEXT PRIMARY KEY,
  early_access_minutes INT DEFAULT 0,
  discount_percentage DECIMAL(3, 2) DEFAULT 0,
  free_shipping BOOLEAN DEFAULT FALSE
);

INSERT INTO membership_benefits VALUES
  ('basic', 0, 0, FALSE),
  ('premium', 30, 0.10, TRUE),
  ('vip', 60, 0.20, TRUE);
```

### 주문 연동:

```sql
-- 주문 내역 테이블
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  shopify_order_id TEXT,
  total_amount DECIMAL(10, 2),
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 문제 해결

### "Invalid API key" 오류:
- `.env.local` 파일 확인
- 개발 서버 재시작 (`npm run dev`)

### 이메일이 안 오는 경우:
- Supabase 대시보드 → Authentication → Email Templates 확인
- SMTP 설정 확인 (무료 플랜은 제한적)

### 소셜 로그인 실패:
- Redirect URI가 정확히 일치하는지 확인
- Google/Apple 설정에서 프로젝트 상태 확인

---

## 참고 자료

- [Supabase Auth 공식 문서](https://supabase.com/docs/guides/auth)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
