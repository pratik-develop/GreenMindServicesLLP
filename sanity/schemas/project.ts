// Project schema for Sanity CMS - will be activated when Sanity is installed
// This serves as documentation for the intended project content structure

export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          'Industrial Infrastructure',
          'Energy & Power',
          'Transportation',
          'Manufacturing',
          'Real Estate & Tourism',
          'Agriculture & Food Processing',
          'Forestry',
          'Other',
        ],
      },
    },
    {
      name: 'showClientName',
      title: 'Show Client Name',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'anonymizedAlias',
      title: 'Anonymized Alias',
      type: 'string',
      description: 'Used when client name should be hidden',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Project Date',
      type: 'date',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['completed', 'ongoing', 'planned'],
      },
      initialValue: 'completed',
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'outcome',
      title: 'Key Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              'Environmental Impact Assessment',
              'ESG Disclosure & Reporting',
              'Environmental Compliance',
              'Regulatory Consulting',
              'Sustainability Strategy',
              'Carbon Footprinting',
              'Environmental Monitoring',
              'Pollution Control',
              'Waste Management',
            ],
          },
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
        },
      ],
    },
  ],
}
