# Shopify Headless Commerce 설정 가이드

## 1. Shopify 스토어 생성

### 1.1 Shopify 계정 생성
1. https://shopify.com 접속
2. "Start free trial" 클릭
3. 스토어 정보 입력:
   - **Store name**: mni-archive (또는 원하는 이름)
   - **URL**: mni-archive.myshopify.com
4. 14일 무료 체험 시작

---

## 2. Storefront API 설정

### 2.1 커스텀 앱 생성
1. Shopify Admin 접속
2. **Settings** → **Apps and sales channels** 클릭
3. **Develop apps** 클릭
4. **Create an app** 클릭
5. 앱 정보 입력:
   - **App name**: MNI Archive Storefront
   - **App developer**: (본인 이메일)

### 2.2 Storefront API 권한 설정
1. **Configuration** 탭 클릭
2. **Storefront API integration** 섹션에서 **Configure** 클릭
3. 다음 권한 활성화:
   ```
   ✅ unauthenticated_read_product_listings
   ✅ unauthenticated_read_product_inventory
   ✅ unauthenticated_read_product_pickup_locations
   ✅ unauthenticated_write_checkouts
   ✅ unauthenticated_read_checkouts
   ```
4. **Save** 클릭

### 2.3 API 토큰 생성
1. **API credentials** 탭 클릭
2. **Install app** 클릭
3. **Storefront API access token** 복사
   - 예: `shpat_1234567890abcdef`

---

## 3. 환경 변수 설정

### 3.1 .env.local 파일 생성
`.env.local` 파일에 다음 내용 추가:

```env
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=mni-archive.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_1234567890abcdef
```

⚠️ **주의**: `.env.local`은 `.gitignore`에 포함되어 있으므로 Git에 커밋되지 않습니다.

---

## 4. 제품 생성

### 4.1 첫 번째 제품 추가
1. Shopify Admin → **Products** 클릭
2. **Add product** 클릭
3. 제품 정보 입력:

```
Title: MNI ARCHIVE #01 TEE
Description:
미노이의 손그림이 의류가 되다.

세상에 단 100벌만 존재하는 한정판 티셔츠.
미노이가 직접 그린 'B의 집' 일러스트가 프린팅된 첫 번째 아카이브 컬렉션.

한 땀 한 땀 정성스럽게 제작된 이 티셔츠는 
단순한 의류가 아닌, 입는 예술작품입니다.

- 100% 코튼
- 오버핏 실루엣
- 실크 스크린 프린팅
- 한정판 100벌 (각 넘버링 태그 포함)
- Made in Korea

Price: 89000 KRW
```

### 4.2 제품 이미지 업로드
1. **Media** 섹션에서 **Add media** 클릭
2. `/home/user/mni-archive-v2/public/artworks/b-house.png` 업로드
3. 추가 이미지도 업로드 (최대 10장)

### 4.3 옵션 설정 (사이즈)
1. **Variants** 섹션에서 **Add variant** 클릭
2. **Option name**: Size
3. **Option values**: S, M, L, XL
4. 각 사이즈별로:
   - **Price**: 89000
   - **Quantity**: 25 (또는 원하는 수량)
   - **SKU**: MNI-ARCHIVE-01-S (예시)

### 4.4 제품 태그
**Tags** 필드에 추가:
```
limited-edition, archive-01, tee, artwork
```

### 4.5 URL Handle 설정
**Search engine listing** 섹션에서:
- **URL handle**: mni-archive-01-tee

---

## 5. 컬렉션 생성 (선택사항)

### 5.1 컬렉션 추가
1. Shopify Admin → **Products** → **Collections** 클릭
2. **Create collection** 클릭
3. 컬렉션 정보:
   ```
   Title: Limited Edition Archive
   Description: 미노이 아카이브 한정판 컬렉션
   Collection type: Manual
   ```
4. 제품 추가: 위에서 만든 제품 선택
5. **Save** 클릭

---

## 6. 테스트

### 6.1 GraphQL 쿼리 테스트
1. Shopify Admin → **Apps** → **MNI Archive Storefront** 클릭
2. **API credentials** 탭 클릭
3. **GraphQL Explorer** 링크 클릭
4. 다음 쿼리 실행:

```graphql
{
  products(first: 5) {
    edges {
      node {
        id
        handle
        title
        description
        availableForSale
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
```

### 6.2 Next.js 앱 테스트
1. 개발 서버 시작:
   ```bash
   npm run dev
   ```
2. http://localhost:3000/shop 접속
3. 제품이 표시되는지 확인

---

## 7. Shop 페이지 활성화

### 7.1 lib/shopify.ts 수정
`/home/user/mni-archive-v2/lib/shopify.ts` 파일에서 주석 해제:

**Before:**
```typescript
// fetchProducts(); // Uncomment when Shopify is configured
```

**After:**
```typescript
fetchProducts(); // Shopify configured ✓
```

### 7.2 app/shop/page.tsx 수정
`/home/user/mni-archive-v2/app/shop/page.tsx` 파일에서 주석 해제:

**Before:**
```typescript
// fetchProducts(); // Uncomment when Shopify is configured
```

**After:**
```typescript
fetchProducts(); // Shopify configured ✓
```

---

## 8. 추가 제품 생성 예시

### 8.2 CAT FRIEND HOODIE
```
Title: CAT FRIEND HOODIE
Description: 고양이 친구와 함께하는 따뜻한 순간. 차분한 감성의 후디.
Price: 129000 KRW
Image: /artworks/cat-friend.png
Sizes: S, M, L, XL
Tags: hoodie, cat, artwork
Handle: cat-friend-hoodie
```

### 8.3 SKATER TEE (SOLD OUT)
```
Title: SKATER TEE
Description: 자유로운 영혼의 스케이터. 첫 번째 드롭에서 완판된 전설의 티셔츠.
Price: 89000 KRW
Image: /artworks/black-briar-skater.png
Sizes: S (0), M (0), L (0), XL (0)  # 모든 사이즈 수량 0으로 설정
Tags: sold-out, skater, tee
Handle: skater-tee-sold-out
```

---

## 9. 장바구니 기능 (다음 단계)

### 9.1 필요한 작업
- [ ] Cart Context 생성 (`context/CartContext.tsx`)
- [ ] LocalStorage에 장바구니 저장
- [ ] 장바구니 아이콘 Navigation에 추가
- [ ] 장바구니 Drawer 컴포넌트
- [ ] Shopify Checkout 연동

### 9.2 참고 코드
Cart Context 예시는 다음 단계에서 구현 예정.

---

## 10. 배포 (Cloudflare Pages)

### 10.1 환경 변수 설정
Cloudflare Pages Dashboard → **Settings** → **Environment variables**에서:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = mni-archive.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = shpat_1234567890abcdef
```

### 10.2 빌드 & 배포
```bash
npm run build
npx wrangler pages deploy dist --project-name mni-archive-v2
```

---

## 체크리스트

- [ ] Shopify 스토어 생성
- [ ] 커스텀 앱 생성
- [ ] Storefront API 권한 설정
- [ ] API 토큰 발급
- [ ] `.env.local` 환경 변수 설정
- [ ] 첫 번째 제품 추가 (MNI ARCHIVE #01 TEE)
- [ ] 제품 이미지 업로드
- [ ] 옵션 설정 (사이즈)
- [ ] GraphQL 쿼리 테스트
- [ ] Next.js 앱에서 제품 표시 확인
- [ ] 추가 제품 생성
- [ ] Sold Out 제품 설정
- [ ] Cloudflare Pages 환경 변수 설정
- [ ] 프로덕션 배포

---

## 참고 링크

- **Shopify Storefront API**: https://shopify.dev/docs/api/storefront
- **GraphQL Explorer**: https://shopify.dev/docs/custom-storefronts/tools/graphiql-storefront-api
- **Next.js Commerce**: https://github.com/vercel/commerce

---

## 문제 해결

### 제품이 표시되지 않음
1. `.env.local` 환경 변수 확인
2. Shopify Admin에서 제품 "Online Store" 채널에 추가되었는지 확인
3. GraphQL Explorer에서 쿼리 테스트
4. 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러
- Shopify Storefront API는 CORS를 허용하므로, 이 에러는 발생하지 않아야 합니다.
- 만약 발생한다면 API 토큰이 올바른지 확인하세요.

### 이미지가 표시되지 않음
- Shopify Admin에서 제품 이미지가 업로드되었는지 확인
- 이미지 URL이 HTTPS인지 확인

