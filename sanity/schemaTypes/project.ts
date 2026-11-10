import { defineField, defineType } from 'sanity'
import { extractPreviewText } from '../lib/preview'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      initialValue: 'website',
      options: { list: [{ title: 'Website', value: 'website' }, { title: 'UI/UX Design', value: 'design' }], layout: 'radio' },
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma Design / Prototype URL',
      type: 'url',
      description: 'Use a Figma link that visitors have permission to view.',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }).custom((value) => {
        if (!value) return true
        try {
          const host = new URL(value).hostname
          return host === 'figma.com' || host === 'www.figma.com' || 'Enter a figma.com URL.'
        } catch { return 'Enter a valid Figma URL.' }
      }),
    }),
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
      
      const displayTitle = extractPreviewText(title) || 'Untitled Project'
      const displaySummary = extractPreviewText(subtitle)
      
      return {
        title: displayTitle,
        subtitle: displaySummary || undefined,
        media,
      }
    },
  },
})
