// Video Schema - 미뇽이의 비디오 콘텐츠
export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video platform URL',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Format: mm:ss or hh:mm:ss',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Music Video', value: 'music-video' },
          { title: 'Behind The Scenes', value: 'bts' },
          { title: 'Performance', value: 'performance' },
          { title: 'Vlog', value: 'vlog' },
          { title: 'Interview', value: 'interview' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, media, category } = selection;
      return {
        title,
        subtitle: category ? `Category: ${category}` : 'No category',
        media,
      };
    },
  },
};
