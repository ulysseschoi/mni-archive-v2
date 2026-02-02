// Sanity CMS Type Definitions for MNI Archive

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Base Types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface Slug {
  _type: 'slug';
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Artwork Type
export interface Artwork extends SanityDocument {
  _type: 'artwork';
  title: string;
  slug: Slug;
  image: SanityImage;
  description?: string;
  category?: 'doodle' | 'illustration' | 'character' | 'sketch' | 'digital';
  createdAt: string;
  featured?: boolean;
}

// Music Type
export interface Music extends SanityDocument {
  _type: 'music';
  title: string;
  slug: Slug;
  audioFile?: SanityFile;
  audioUrl?: string;
  coverImage: SanityImage;
  lyrics?: string;
  duration?: string;
  releaseDate?: string;
  genre?: 'hiphop' | 'rnb' | 'pop' | 'rap' | 'ballad';
}

// Video Type
export interface Video extends SanityDocument {
  _type: 'video';
  title: string;
  slug: Slug;
  videoUrl: string;
  thumbnail: SanityImage;
  description?: string;
  duration?: string;
  publishedAt: string;
  category?: 'music-video' | 'bts' | 'performance' | 'vlog' | 'interview';
}

// Block Content for Writing
export interface Block {
  _type: 'block';
  _key: string;
  style: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
}

// Writing Type
export interface Writing extends SanityDocument {
  _type: 'writing';
  title: string;
  slug: Slug;
  excerpt?: string;
  content: Array<Block | SanityImage>;
  coverImage?: SanityImage;
  publishedAt: string;
  category?: 'blog' | 'poetry' | 'story' | 'thoughts' | 'lyrics';
  tags?: string[];
}

// Union Type for All Content
export type Content = Artwork | Music | Video | Writing;

// API Response Types
export interface ContentListResponse<T> {
  items: T[];
  total: number;
}

export interface RecentContent {
  _id: string;
  _type: 'artwork' | 'music' | 'video' | 'writing';
  title: string;
  slug: Slug;
  date: string;
  media?: SanityImage;
}
