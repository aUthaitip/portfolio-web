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
        { 
          name: 'contentImage',
          title: 'Image Block (New)',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image Asset',
              type: 'image',
              options: { hotspot: true }
            })
          ],
          preview: {
            select: {
              media: 'image',
              title: 'image.asset.originalFilename',
              description: '_type',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Image',
                media: selection.media,
              }
            }
          }
        }
      ],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          name: 'contentImage',
          title: 'Image Block (New)',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image Asset',
              type: 'image',
              options: { hotspot: true }
            })
          ],
          preview: {
            select: {
              media: 'image',
              title: 'image.asset.originalFilename',
              description: '_type',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Image',
                media: selection.media,
              }
            }
          }
        }
      ],
    }),
  ],
})
