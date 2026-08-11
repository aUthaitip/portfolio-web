import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'localeString',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
      description: 'A short catchy phrase about what you do (e.g. Frontend Developer)',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'localeText',
      description: 'A brief introduction about yourself',
    }),
    defineField({
      name: 'fullBio',
      title: 'Full About Bio',
      type: 'localeText',
      description: 'A detailed biography for your about me section.',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
      description: '_type',
      media: 'profileImage',
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
      
      const displayName = extractString(title) || 'Untitled Profile'
      const displayHeadline = extractString(subtitle)
      
      return {
        title: displayName,
        subtitle: displayHeadline || undefined,
        media,
      }
    },
  },
})
