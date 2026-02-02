import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity 프로젝트 설정
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
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
  token: process.env.SANITY_API_TOKEN,
});

// 이미지 URL 빌더
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
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
