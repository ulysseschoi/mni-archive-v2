import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'music.song' | 'video.other';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

/**
 * 페이지별 SEO 메타데이터 생성
 */
export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    image = '/mni-artwork-sample.png',
    url = 'https://mni-archive-v2.pages.dev',
    type = 'website',
    publishedTime,
    modifiedTime,
    tags = [],
  } = config;

  const fullTitle = `${title} | MNI Archive`;
  const fullUrl = url.startsWith('http') ? url : `https://mni-archive-v2.pages.dev${url}`;
  const imageUrl = image.startsWith('http') ? image : `https://mni-archive-v2.pages.dev${image}`;

  return {
    title: fullTitle,
    description,
    keywords: ['mni', 'meenoi', 'archive', 'artist', 'portfolio', ...tags].join(', '),
    authors: [{ name: 'MNI (Meenoi)' }],
    creator: 'MNI',
    publisher: 'MNI Archive',
    openGraph: {
      type,
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: 'MNI Archive',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ko_KR',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@mni',
      site: '@mni',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * 홈페이지용 SEO
 */
export const homeSEO = generateSEO({
  title: 'MNI Archive',
  description:
    'The chaotic yet lovely universe of Meenoi. Explore artworks, music, videos, and writings from MNI.',
  url: '/',
  type: 'website',
});

/**
 * Artworks 페이지용 SEO
 */
export const artworksSEO = generateSEO({
  title: 'Artworks',
  description: 'Browse through MNI\'s collection of artworks, illustrations, and visual creations.',
  url: '/artworks',
  tags: ['artwork', 'illustration', 'art', 'drawing'],
});

/**
 * Music 페이지용 SEO
 */
export const musicSEO = generateSEO({
  title: 'Music',
  description: 'Explore MNI\'s music collection featuring original tracks, albums, and collaborations.',
  url: '/music',
  type: 'music.song',
  tags: ['music', 'song', 'album', 'artist'],
});

/**
 * Videos 페이지용 SEO
 */
export const videosSEO = generateSEO({
  title: 'Videos',
  description: 'Watch MNI\'s music videos, behind-the-scenes footage, and creative video content.',
  url: '/videos',
  type: 'video.other',
  tags: ['video', 'music video', 'behind the scenes', 'vlog'],
});

/**
 * Writings 페이지용 SEO
 */
export const writingsSEO = generateSEO({
  title: 'Writings',
  description: 'Read MNI\'s essays, poems, diary entries, and personal thoughts.',
  url: '/writings',
  type: 'article',
  tags: ['writing', 'essay', 'poem', 'diary', 'thoughts'],
});

/**
 * 동적 페이지용 SEO 생성 (상세 페이지)
 */
export function generateDynamicSEO(
  category: 'artworks' | 'music' | 'videos' | 'writings',
  item: {
    title: string;
    description?: string;
    image?: string;
    publishedAt?: string;
    slug: string;
  }
): Metadata {
  const typeMap = {
    artworks: 'article' as const,
    music: 'music.song' as const,
    videos: 'video.other' as const,
    writings: 'article' as const,
  };

  const tagMap = {
    artworks: ['artwork', 'illustration', 'art'],
    music: ['music', 'song', 'track'],
    videos: ['video', 'music video'],
    writings: ['writing', 'article', 'essay'],
  };

  return generateSEO({
    title: item.title,
    description: item.description || `Explore ${item.title} by MNI`,
    image: item.image,
    url: `/${category}/${item.slug}`,
    type: typeMap[category],
    publishedTime: item.publishedAt,
    tags: tagMap[category],
  });
}
