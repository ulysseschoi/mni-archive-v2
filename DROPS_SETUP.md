# Drops 기능 Supabase 설정 가이드

## 1. Supabase 테이블 생성

### drop_notifications 테이블
```sql
-- 드롭 알림 신청 이메일 수집
CREATE TABLE drop_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  drop_id INTEGER NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE,
  notified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 이메일 인덱스 (중복 방지)
CREATE UNIQUE INDEX idx_drop_notifications_email_drop 
ON drop_notifications(email, drop_id);

-- 알림 전송 여부 인덱스
CREATE INDEX idx_drop_notifications_notified 
ON drop_notifications(notified, drop_id);
```

### drops 테이블 (선택사항 - Sanity 대신 Supabase 사용 시)
```sql
-- 드롭 관리
CREATE TABLE drops (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  drop_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  limited_quantity INTEGER NOT NULL,
  price TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sold_out BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 드롭 날짜 인덱스
CREATE INDEX idx_drops_date ON drops(drop_date);
CREATE INDEX idx_drops_active ON drops(is_active, drop_date);
```

---

## 2. 환경 변수 설정

`.env.local` 파일에 추가:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# SendGrid (드롭 알림용)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=drops@mniarchive.com
```

---

## 3. Supabase 패키지 설치

```bash
npm install @supabase/supabase-js
```

---

## 4. Supabase 클라이언트 설정

`lib/supabase.ts` 파일 생성:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side only (API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

---

## 5. API 라우트 실제 연동

`app/api/drops/notify/route.ts` 수정:
```typescript
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { email, dropId } = await request.json()

  // Supabase에 이메일 저장
  const { data, error } = await supabaseAdmin
    .from('drop_notifications')
    .insert([
      {
        email,
        drop_id: dropId,
        subscribed_at: new Date().toISOString(),
        notified: false,
      },
    ])
    .select()

  if (error) {
    // 중복 이메일 처리
    if (error.code === '23505') {
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
```

---

## 6. SendGrid 드롭 알림 설정

### SendGrid 패키지 설치
```bash
npm install @sendgrid/mail
```

### 드롭 알림 전송 함수
`lib/sendgrid.ts` 파일 생성:
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendDropNotification(
  email: string,
  dropInfo: {
    title: string
    dropDate: string
    url: string
  }
) {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `🔥 ${dropInfo.title} - 드롭 시작 30분 전!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000; font-size: 32px; font-weight: bold;">
          ${dropInfo.title}
        </h1>
        <p style="font-size: 18px; color: #666;">
          드롭이 <strong>30분 후</strong>에 시작됩니다!
        </p>
        <p style="font-size: 16px; color: #999;">
          드롭 시작: ${dropInfo.dropDate}
        </p>
        <a 
          href="${dropInfo.url}" 
          style="
            display: inline-block;
            margin-top: 20px;
            padding: 16px 32px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
          "
        >
          지금 확인하기
        </a>
        <p style="font-size: 14px; color: #999; margin-top: 40px;">
          한정 수량이므로 서두르세요!
        </p>
      </div>
    `,
  }

  await sgMail.send(msg)
}
```

### Cron Job으로 알림 전송
`app/api/drops/send-notifications/route.ts` 생성:
```typescript
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendDropNotification } from '@/lib/sendgrid'

export async function GET(request: Request) {
  // Vercel Cron Job 인증
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 30분 후 시작하는 드롭 찾기
  const thirtyMinutesLater = new Date(Date.now() + 30 * 60 * 1000)
  const { data: drops } = await supabaseAdmin
    .from('drops')
    .select('*')
    .eq('is_active', true)
    .lte('drop_date', thirtyMinutesLater.toISOString())
    .gte('drop_date', new Date().toISOString())

  if (!drops || drops.length === 0) {
    return NextResponse.json({ message: 'No drops to notify' })
  }

  // 알림 보낼 이메일 가져오기
  for (const drop of drops) {
    const { data: notifications } = await supabaseAdmin
      .from('drop_notifications')
      .select('email')
      .eq('drop_id', drop.id)
      .eq('notified', false)

    if (notifications) {
      // 이메일 전송
      for (const notification of notifications) {
        await sendDropNotification(notification.email, {
          title: drop.title,
          dropDate: new Date(drop.drop_date).toLocaleString('ko-KR'),
          url: `https://mni-archive-v2.pages.dev/drops`,
        })
      }

      // notified = true로 업데이트
      await supabaseAdmin
        .from('drop_notifications')
        .update({ notified: true, notified_at: new Date().toISOString() })
        .eq('drop_id', drop.id)
        .eq('notified', false)
    }
  }

  return NextResponse.json({ success: true })
}
```

### Vercel Cron Job 설정
`vercel.json` 파일 생성:
```json
{
  "crons": [
    {
      "path": "/api/drops/send-notifications",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

---

## 7. Drops 페이지 실제 데이터 연동

`app/drops/page.tsx` 수정:
```typescript
// Supabase에서 드롭 데이터 가져오기
useEffect(() => {
  async function fetchUpcomingDrop() {
    const { data, error } = await supabase
      .from('drops')
      .select('*')
      .eq('is_active', true)
      .gte('drop_date', new Date().toISOString())
      .order('drop_date', { ascending: true })
      .limit(1)
      .single()

    if (data) {
      setUpcomingDrop(data)
    }
  }

  fetchUpcomingDrop()
}, [])
```

---

## 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] `drop_notifications` 테이블 생성
- [ ] `drops` 테이블 생성 (선택사항)
- [ ] 환경 변수 설정
- [ ] `@supabase/supabase-js` 설치
- [ ] Supabase 클라이언트 설정
- [ ] API 라우트 실제 연동
- [ ] SendGrid 계정 생성 및 API 키 발급
- [ ] `@sendgrid/mail` 설치
- [ ] 드롭 알림 이메일 템플릿 작성
- [ ] Cron Job API 라우트 생성
- [ ] Vercel Cron Job 설정
- [ ] Drops 페이지 실제 데이터 연동
- [ ] 테스트 드롭 생성 및 알림 테스트

---

## 참고 사항

- **Supabase Row Level Security (RLS)**: 프로덕션 환경에서는 RLS 정책을 설정하세요.
- **이메일 중복**: `UNIQUE INDEX`로 동일 이메일 중복 신청 방지
- **Cron Job**: Vercel Pro 플랜에서만 사용 가능
- **SendGrid**: 무료 플랜은 하루 100통 제한
- **드롭 시간**: KST 기준으로 설정 (UTC+9)

