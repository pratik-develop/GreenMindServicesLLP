// Certificate schema for Sanity CMS - will be activated when Sanity is installed
// This serves as documentation for the intended certificate content structure

export const certificateSchema = {
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    {
      name: 'certName',
      title: 'Certificate Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'certName',
        maxLength: 96,
      },
    },
    {
      name: 'authority',
      title: 'Issuing Authority',
      type: 'string',
    },
    {
      name: 'certificateNumber',
      title: 'Certificate Number',
      type: 'string',
    },
    {
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
    },
    {
      name: 'isLifetime',
      title: 'Lifetime Validity',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'certFile',
      title: 'Certificate File',
      type: 'file',
      options: {
        accept: 'application/pdf,.pdf',
      },
    },
    {
      name: 'certImage',
      title: 'Certificate Image',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the certificate and its significance',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Environmental Compliance',
          'Quality Management',
          'Health & Safety',
          'Social Responsibility',
          'Industry Specific',
          'Professional Certification',
          'Other',
        ],
      },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'expired', 'pending', 'suspended'],
      },
      initialValue: 'active',
    },
    {
      name: 'featured',
      title: 'Featured Certificate',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'renewalReminder',
      title: 'Renewal Reminder (days)',
      type: 'number',
      description: 'Days before expiry to send reminder',
      initialValue: 90,
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
