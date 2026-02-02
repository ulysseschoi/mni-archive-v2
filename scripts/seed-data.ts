/**
 * Sanity Sample Data Generator
 * 
 * This script generates sample data for the MNI Archive CMS.
 * Run with: npm run seed-data
 * 
 * Note: You need to set up your .env.local with Sanity credentials first!
 */

import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Sample Artwork Data
const sampleArtworks = [
  {
    _type: 'artwork',
    title: 'Chaotic Dreams',
    slug: { _type: 'slug', current: 'chaotic-dreams' },
    description: 'A spontaneous doodle capturing the chaotic yet lovely essence of everyday dreams. Drawn in one sitting with no regrets.',
    category: 'doodle',
    createdAt: new Date('2026-01-28').toISOString(),
    featured: true,
  },
  {
    _type: 'artwork',
    title: 'Mni Character Study',
    slug: { _type: 'slug', current: 'mni-character-study' },
    description: 'Character exploration featuring rounded shapes and playful expressions. Slightly imperfect, undeniably cute.',
    category: 'character',
    createdAt: new Date('2026-01-25').toISOString(),
    featured: false,
  },
  {
    _type: 'artwork',
    title: 'Urban Sketch Series',
    slug: { _type: 'slug', current: 'urban-sketch-series' },
    description: 'Quick sketches from my neighborhood walks. Raw, unfiltered observations of city life.',
    category: 'sketch',
    createdAt: new Date('2026-01-20').toISOString(),
    featured: true,
  },
];

// Sample Music Data
const sampleMusic = [
  {
    _type: 'music',
    title: 'Lovely Chaos',
    slug: { _type: 'slug', current: 'lovely-chaos' },
    audioUrl: 'https://soundcloud.com/meenoi/lovely-chaos',
    lyrics: '혼돈 속에서 피어나는 사랑\n아름다운 순간들의 조각\n완벽하지 않아도 괜찮아\n우리만의 리듬으로',
    duration: '03:42',
    releaseDate: new Date('2026-01-15').toISOString(),
    genre: 'hiphop',
  },
  {
    _type: 'music',
    title: 'Moonlight Dreams',
    slug: { _type: 'slug', current: 'moonlight-dreams' },
    audioUrl: 'https://soundcloud.com/meenoi/moonlight-dreams',
    lyrics: '달빛 아래 춤추는 우리\n시간이 멈춘 것 같아\nThis moment feels so right\n너와 나의 꿈속에서',
    duration: '04:15',
    releaseDate: new Date('2026-01-10').toISOString(),
    genre: 'rnb',
  },
  {
    _type: 'music',
    title: 'City Lights',
    slug: { _type: 'slug', current: 'city-lights' },
    audioUrl: 'https://soundcloud.com/meenoi/city-lights',
    lyrics: '도시의 불빛이 나를 감싸\n끝없는 밤의 여정\nChasing dreams in the neon glow\n혼자가 아니야',
    duration: '03:28',
    releaseDate: new Date('2026-01-05').toISOString(),
    genre: 'pop',
  },
];

// Sample Video Data
const sampleVideos = [
  {
    _type: 'video',
    title: 'Lovely Chaos - Official MV',
    slug: { _type: 'slug', current: 'lovely-chaos-mv' },
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    description: 'Official music video for Lovely Chaos. Directed by me, edited by me, vibes curated by me.',
    duration: '03:45',
    publishedAt: new Date('2026-01-16').toISOString(),
    category: 'music-video',
  },
  {
    _type: 'video',
    title: 'Behind The Scenes - Studio Session',
    slug: { _type: 'slug', current: 'bts-studio-session' },
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    description: 'Raw footage from my latest recording session. Lots of laughter, a few mistakes, and pure creativity.',
    duration: '12:34',
    publishedAt: new Date('2026-01-12').toISOString(),
    category: 'bts',
  },
  {
    _type: 'video',
    title: 'Live Performance - Tiny Desk',
    slug: { _type: 'slug', current: 'live-tiny-desk' },
    videoUrl: 'https://www.youtube.com/watch?v=example3',
    description: 'Intimate performance of my favorite tracks. Just me, my voice, and good vibes.',
    duration: '18:22',
    publishedAt: new Date('2026-01-08').toISOString(),
    category: 'performance',
  },
];

// Sample Writing Data
const sampleWritings = [
  {
    _type: 'writing',
    title: 'Thoughts on Creativity',
    slug: { _type: 'slug', current: 'thoughts-on-creativity' },
    excerpt: 'Why perfection is overrated and chaos is beautiful. A reflection on my creative process.',
    content: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: '창작은 완벽함을 추구하는 것이 아니라, 진정성을 담아내는 것이다. 매일 그리고, 매일 쓰고, 매일 노래한다. 완벽하지 않아도 괜찮아.',
            marks: [],
          },
        ],
      },
    ],
    publishedAt: new Date('2026-01-22').toISOString(),
    category: 'thoughts',
    tags: ['creativity', 'art', 'music', 'life'],
  },
  {
    _type: 'writing',
    title: 'Midnight Poetry',
    slug: { _type: 'slug', current: 'midnight-poetry' },
    excerpt: 'Words that came to me at 3 AM. Raw, unfiltered, slightly chaotic.',
    content: [
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: '밤은 깊고 생각은 많고\n말은 적고 마음은 크고\n혼돈 속의 평화\n그게 바로 나',
            marks: [],
          },
        ],
      },
    ],
    publishedAt: new Date('2026-01-18').toISOString(),
    category: 'poetry',
    tags: ['poetry', 'night', 'thoughts'],
  },
  {
    _type: 'writing',
    title: 'My Creative Journey',
    slug: { _type: 'slug', current: 'my-creative-journey' },
    excerpt: 'From doodling in notebooks to creating a whole universe. Here\'s my story.',
    content: [
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: '처음엔 그냥 낙서였다. 노트 귀퉁이에, 손등에, 어디든 그렸다. 그게 지금의 나를 만들었다. 완벽하지 않은 것들의 아름다움을 발견했다.',
            marks: [],
          },
        ],
      },
    ],
    publishedAt: new Date('2026-01-14').toISOString(),
    category: 'blog',
    tags: ['journey', 'art', 'music', 'growth'],
  },
];

// Main seed function
async function seedData() {
  console.log('🌱 Starting to seed sample data...\n');

  try {
    // Create Artworks
    console.log('📝 Creating Artworks...');
    for (const artwork of sampleArtworks) {
      const result = await client.create(artwork);
      console.log(`✅ Created artwork: ${result.title}`);
    }

    // Create Music
    console.log('\n🎵 Creating Music...');
    for (const music of sampleMusic) {
      const result = await client.create(music);
      console.log(`✅ Created music: ${result.title}`);
    }

    // Create Videos
    console.log('\n🎬 Creating Videos...');
    for (const video of sampleVideos) {
      const result = await client.create(video);
      console.log(`✅ Created video: ${result.title}`);
    }

    // Create Writings
    console.log('\n✍️  Creating Writings...');
    for (const writing of sampleWritings) {
      const result = await client.create(writing);
      console.log(`✅ Created writing: ${result.title}`);
    }

    console.log('\n🎉 Sample data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${sampleArtworks.length} artworks`);
    console.log(`   - ${sampleMusic.length} music tracks`);
    console.log(`   - ${sampleVideos.length} videos`);
    console.log(`   - ${sampleWritings.length} writings`);
    console.log('\n💡 Note: Images need to be uploaded manually through Sanity Studio.');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedData();
