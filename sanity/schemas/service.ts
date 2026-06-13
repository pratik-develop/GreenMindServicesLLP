export const serviceSchema = {
  name: 'service',
  title: 'Service',
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
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Used on the services listing page and homepage cards.',
    },
    {
      name: 'bullets',
      title: 'Sub-service Bullets',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short hook shown on the dedicated service page hero.',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Opening paragraph on the dedicated service page.',
    },
    {
      name: 'whatYouGet',
      title: 'What You Get',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'text',
    },
    {
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Name', type: 'string' },
            { name: 'detail', title: 'Detail', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'addOns',
      title: 'Add-ons',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'ctaLine',
      title: 'CTA Line',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    },
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
