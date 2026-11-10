import { defineField, defineType } from 'sanity'
import { extractPreviewText } from '../lib/preview'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        defineField({ name: 'degree', title: 'Degree', type: 'localeString' }),
        defineField({ name: 'university', title: 'University', type: 'localeString' }),
        defineField({ name: 'period', title: 'Period', type: 'string' }),
        defineField({ name: 'gpa', title: 'GPA', type: 'number', validation: (Rule) => Rule.min(0).max(4) }),
      ],
    }),
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
      
      const displayName = extractPreviewText(title) || 'Untitled Profile'
      const displayHeadline = extractPreviewText(subtitle)
      
      return {
        title: displayName,
        subtitle: displayHeadline || undefined,
        media,
      }
    },
  },
})
