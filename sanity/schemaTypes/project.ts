import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'localeText',
      description: 'A short summary of the project',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of technologies used (e.g. React, Next.js, Tailwind)',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeBlockContent',
      description: 'Detailed content of the project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      description: '_type',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      
      function extractString(value: any): string {
        if (typeof value === 'string') {
          return value
        }
        if (value && typeof value === 'object') {
          if (Array.isArray(value)) {
            const firstBlock = value[0]
            if (firstBlock && typeof firstBlock === 'object') {
              if ('children' in firstBlock && Array.isArray(firstBlock.children)) {
                return firstBlock.children.map((c: any) => c.text).join('')
              }
              if ('text' in firstBlock && typeof firstBlock.text === 'string') {
                return firstBlock.text
              }
            }
            return ''
          }
          const localizedValue = value.en || value.th || ''
          return extractString(localizedValue)
        }
        return ''
      }
      
      const displayTitle = extractString(title) || 'Untitled Project'
      const displaySummary = extractString(subtitle)
      
      return {
        title: displayTitle,
        subtitle: displaySummary || undefined,
        media,
      }
    },
  },
})
