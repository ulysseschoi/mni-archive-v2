// Music Schema - 미뇽이의 음악
export default {
  name: 'music',
  title: 'Music',
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
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'External audio URL (Spotify, SoundCloud, etc.)',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
      rows: 10,
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Format: mm:ss (e.g., 03:45)',
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime',
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          { title: 'Hip Hop', value: 'hiphop' },
          { title: 'R&B', value: 'rnb' },
          { title: 'Pop', value: 'pop' },
          { title: 'Rap', value: 'rap' },
          { title: 'Ballad', value: 'ballad' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      duration: 'duration',
    },
    prepare(selection: any) {
      const { title, media, duration } = selection;
      return {
        title,
        subtitle: duration ? `Duration: ${duration}` : 'No duration',
        media,
      };
    },
  },
};
