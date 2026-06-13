export const blogPostSchema = {
  name: 'blogPost',
  title: 'Blog Post',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Shown on the blog listing card. 1–2 sentences.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Strategy', 'Reporting', 'Communication', 'Measurement', 'Guide', 'Trends'],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Featured posts appear as the wide landscape card at the top of the listing.',
      initialValue: false,
    },
    {
      name: 'sections',
      title: 'Article Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Heading (optional)', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
      description: 'Each section renders as an optional H2 heading + paragraph. Use multiple sections to structure long articles.',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO Title', type: 'string' },
        { name: 'description', title: 'SEO Description', type: 'text' },
      ],
    },
  ],
  orderings: [
    { title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
