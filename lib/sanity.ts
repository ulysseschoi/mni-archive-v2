import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity 프로젝트 설정
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

// Sanity 클라이언트 생성
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: process.env.SANITY_API_TOKEN || undefined,
});

// 이미지 URL 빌더
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// 이미지 최적화 헬퍼 함수들

/**
 * 썸네일 이미지 URL 생성 (작은 크기, 빠른 로딩)
 * @param source - Sanity 이미지 소스
 * @param width - 너비 (기본값: 400px)
 * @param quality - 품질 (기본값: 75)
 */
export function getThumbnailUrl(
  source: SanityImageSource,
  width: number = 400,
  quality: number = 75
) {
  return urlFor(source)
    .width(width)
    .quality(quality)
    .auto('format')
    .fit('max')
    .url();
}

/**
 * 고해상도 이미지 URL 생성 (상세 페이지용)
 * @param source - Sanity 이미지 소스
 * @param width - 최대 너비 (기본값: 1920px)
 * @param quality - 품질 (기본값: 90)
 */
export function getHighResUrl(
  source: SanityImageSource,
  width: number = 1920,
  quality: number = 90
) {
  return urlFor(source)
    .width(width)
    .quality(quality)
    .auto('format')
    .url();
}

/**
 * 반응형 이미지 srcSet 생성
 * @param source - Sanity 이미지 소스
 * @param widths - 반응형 너비 배열
 * @param quality - 품질 (기본값: 80)
 */
export function getResponsiveSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1920],
  quality: number = 80
) {
  return widths
    .map((width) => {
      const url = urlFor(source)
        .width(width)
        .quality(quality)
        .auto('format')
        .url();
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * 블러 플레이스홀더 생성 (로딩 중 표시)
 * @param source - Sanity 이미지 소스
 */
export function getBlurPlaceholder(source: SanityImageSource) {
  return urlFor(source)
    .width(20)
    .quality(20)
    .blur(50)
    .auto('format')
    .url();
}

// GROQ 쿼리 헬퍼 함수들

/**
 * 모든 Artwork 가져오기
 */
export async function getAllArtworks() {
  const query = `*[_type == "artwork"] | order(createdAt desc) {
    _id,
    title,
    slug,
    image,
    description,
    category,
    createdAt,
    featured
  }`;
  return await client.fetch(query);
}

/**
 * Featured Artworks 가져오기
 */
export async function getFeaturedArtworks() {
  const query = `*[_type == "artwork" && featured == true] | order(createdAt desc) {
    _id,
    title,
    slug,
    image,
    description,
    category,
    createdAt
  }`;
  return await client.fetch(query);
}

/**
 * Artwork 상세 정보 가져오기
 */
export async function getArtworkBySlug(slug: string) {
  const query = `*[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image,
    description,
    category,
    createdAt,
    featured
  }`;
  return await client.fetch(query, { slug });
}

/**
 * 모든 Music 가져오기
 */
export async function getAllMusic() {
  const query = `*[_type == "music"] | order(releaseDate desc) {
    _id,
    title,
    slug,
    audioFile,
    audioUrl,
    coverImage,
    lyrics,
    duration,
    releaseDate,
    genre
  }`;
  return await client.fetch(query);
}

/**
 * Music 상세 정보 가져오기
 */
export async function getMusicBySlug(slug: string) {
  const query = `*[_type == "music" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    audioFile,
    audioUrl,
    coverImage,
    lyrics,
    duration,
    releaseDate,
    genre
  }`;
  return await client.fetch(query, { slug });
}

/**
 * 모든 Video 가져오기
 */
export async function getAllVideos() {
  const query = `*[_type == "video"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    videoUrl,
    thumbnail,
    description,
    duration,
    publishedAt,
    category
  }`;
  return await client.fetch(query);
}

/**
 * Video 상세 정보 가져오기
 */
export async function getVideoBySlug(slug: string) {
  const query = `*[_type == "video" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    videoUrl,
    thumbnail,
    description,
    duration,
    publishedAt,
    category
  }`;
  return await client.fetch(query, { slug });
}

/**
 * 모든 Writing 가져오기
 */
export async function getAllWritings() {
  const query = `*[_type == "writing"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    category,
    tags
  }`;
  return await client.fetch(query);
}

/**
 * Writing 상세 정보 가져오기
 */
export async function getWritingBySlug(slug: string) {
  const query = `*[_type == "writing" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    publishedAt,
    category,
    tags
  }`;
  return await client.fetch(query, { slug });
}

/**
 * 최근 콘텐츠 가져오기 (모든 타입)
 */
export async function getRecentContent(limit: number = 6) {
  const query = `*[_type in ["artwork", "music", "video", "writing"]] | order(
    coalesce(publishedAt, releaseDate, createdAt) desc
  )[0...${limit}] {
    _id,
    _type,
    title,
    slug,
    "date": coalesce(publishedAt, releaseDate, createdAt),
    "media": coalesce(image, coverImage, thumbnail)
  }`;
  return await client.fetch(query);
}
