import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'localeString',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'localeString',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
      description: 'Leave blank if this is your current job.',
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is Current Job?',
      type: 'boolean',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      description: 'Describe your responsibilities and achievements.',
    }),
  ],
  preview: {
    select: {
      title: 'jobTitle',
      subtitle: 'description',
      description: '_type',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      
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
      
      const displayTitle = extractString(title) || 'Untitled Experience'
      const displayDescription = extractString(subtitle)
      
      return {
        title: displayTitle,
        subtitle: displayDescription || undefined,
      }
    },
  },
})
