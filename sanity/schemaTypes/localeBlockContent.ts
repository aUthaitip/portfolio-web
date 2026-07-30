import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'th',
      title: 'Thai',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
    }),
  ],
})
