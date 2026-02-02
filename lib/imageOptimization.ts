import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './sanity';

// Image URL builder
const builder = imageUrlBuilder(client);

/**
 * 기본 이미지 URL 생성
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * 썸네일 이미지 URL 생성 (작은 사이즈)
 * @param source - Sanity image source
 * @param width - 너비 (기본: 400px)
 */
export function getThumbnailUrl(source: SanityImageSource, width: number = 400) {
  return builder
    .image(source)
    .width(width)
    .height(width) // Square thumbnail
    .quality(80)
    .auto('format') // WebP/AVIF 자동 선택
    .fit('crop')
    .url();
}

/**
 * 카드 이미지 URL 생성 (중간 사이즈)
 * @param source - Sanity image source
 * @param width - 너비 (기본: 800px)
 */
export function getCardImageUrl(source: SanityImageSource, width: number = 800) {
  return builder
    .image(source)
    .width(width)
    .quality(85)
    .auto('format')
    .url();
}

/**
 * 상세 페이지 이미지 URL 생성 (큰 사이즈)
 * @param source - Sanity image source
 * @param width - 너비 (기본: 1200px)
 */
export function getDetailImageUrl(source: SanityImageSource, width: number = 1200) {
  return builder
    .image(source)
    .width(width)
    .quality(90)
    .auto('format')
    .url();
}

/**
 * Lightbox 이미지 URL 생성 (원본 품질)
 * @param source - Sanity image source
 * @param maxWidth - 최대 너비 (기본: 2000px)
 */
export function getLightboxImageUrl(source: SanityImageSource, maxWidth: number = 2000) {
  return builder
    .image(source)
    .width(maxWidth)
    .quality(95)
    .auto('format')
    .url();
}

/**
 * 반응형 이미지 srcSet 생성
 * @param source - Sanity image source
 * @param widths - 너비 배열 (기본: [400, 800, 1200, 1600])
 */
export function getResponsiveSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600]
) {
  return widths
    .map((width) => {
      const url = builder
        .image(source)
        .width(width)
        .quality(85)
        .auto('format')
        .url();
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Blur placeholder 생성 (LQIP - Low Quality Image Placeholder)
 * @param source - Sanity image source
 */
export function getBlurDataUrl(source: SanityImageSource) {
  return builder
    .image(source)
    .width(20) // 매우 작은 크기
    .quality(30)
    .blur(10)
    .url();
}

/**
 * 이미지 메타데이터 추출
 * @param image - Sanity image object
 */
export function getImageMetadata(image: any) {
  if (!image || !image.asset) return null;

  return {
    url: urlFor(image).url(),
    width: image.asset.metadata?.dimensions?.width,
    height: image.asset.metadata?.dimensions?.height,
    aspectRatio: image.asset.metadata?.dimensions?.aspectRatio,
    lqip: image.asset.metadata?.lqip, // Low Quality Image Placeholder
    blurHash: image.asset.metadata?.blurHash,
    hasAlpha: image.asset.metadata?.hasAlpha,
    isOpaque: image.asset.metadata?.isOpaque,
  };
}

/**
 * Hotspot을 고려한 이미지 URL 생성
 * @param source - Sanity image source with hotspot
 * @param width - 너비
 * @param height - 높이
 */
export function getCroppedImageUrl(
  source: SanityImageSource,
  width: number,
  height: number
) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .quality(85)
    .auto('format')
    .fit('crop') // Hotspot 기반 자동 크롭
    .url();
}

/**
 * 이미지 타입별 최적화 프리셋
 */
export const imagePresets = {
  // 아트워크 카드 (정사각형)
  artworkCard: (source: SanityImageSource) =>
    builder.image(source).width(600).height(600).quality(85).auto('format').fit('crop').url(),

  // 아트워크 상세
  artworkDetail: (source: SanityImageSource) =>
    builder.image(source).width(1200).quality(90).auto('format').url(),

  // 음악 커버 (정사각형)
  musicCover: (source: SanityImageSource) =>
    builder.image(source).width(500).height(500).quality(85).auto('format').fit('crop').url(),

  // 비디오 썸네일 (16:9)
  videoThumbnail: (source: SanityImageSource) =>
    builder.image(source).width(800).height(450).quality(85).auto('format').fit('crop').url(),

  // 글쓰기 커버 (와이드)
  writingCover: (source: SanityImageSource) =>
    builder.image(source).width(1000).height(500).quality(85).auto('format').fit('crop').url(),

  // Hero 이미지
  hero: (source: SanityImageSource) =>
    builder.image(source).width(1920).quality(90).auto('format').url(),

  // OG 이미지 (소셜 공유)
  ogImage: (source: SanityImageSource) =>
    builder.image(source).width(1200).height(630).quality(85).auto('format').fit('crop').url(),
};

/**
 * Next.js Image 컴포넌트용 로더
 */
export function sanityImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // Sanity CDN URL인 경우
  if (src.includes('cdn.sanity.io')) {
    return `${src}?w=${width}&q=${quality || 85}&auto=format`;
  }
  // 로컬 이미지인 경우
  return src;
}

/**
 * 이미지 최적화 가이드 출력
 */
export function logImageOptimizationTips() {
  console.group('🖼️ Sanity Image Optimization Tips');
  console.log('1. 항상 .auto("format")을 사용하여 WebP/AVIF 자동 변환');
  console.log('2. 적절한 width 설정으로 불필요한 대역폭 절약');
  console.log('3. quality는 70-90 사이가 적절 (기본: 85)');
  console.log('4. Thumbnail에는 .fit("crop") 사용');
  console.log('5. Hotspot 설정으로 중요한 부분 보존');
  console.log('6. LQIP/BlurHash로 로딩 경험 개선');
  console.groupEnd();
}
