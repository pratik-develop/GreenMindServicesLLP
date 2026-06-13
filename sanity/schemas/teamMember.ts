export const teamMemberSchema = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'Shown as avatar fallback (e.g. MK). Max 2 characters.',
      validation: (Rule: any) => Rule.max(2),
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
    },
    {
      name: 'expertise',
      title: 'Expertise Line',
      type: 'string',
      description: 'Short descriptor shown beneath the role (e.g. "Ecology, Environment & APCB").',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
