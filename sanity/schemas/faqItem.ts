export const faqItemSchema = {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the FAQ accordion.',
    },
    {
      name: 'page',
      title: 'Shown On',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'home' },
          { title: 'Services', value: 'services' },
          { title: 'All Pages', value: 'all' },
        ],
      },
      initialValue: 'home',
    },
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
