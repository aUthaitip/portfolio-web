import { defineField, defineType } from 'sanity'
import { extractPreviewText } from '../lib/preview'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'durationMonths',
      title: 'Actual Duration (Months)',
      type: 'number',
      description: 'Confirmed duration, used instead of estimating from calendar dates.',
      validation: (Rule) => Rule.positive(),
    }),
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
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload the logo of the company.',
    }),
    defineField({
      name: 'companyImage',
      title: 'Company Workplace/Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload a workplace photo or project image from this company to display on the opposite side of the card.',
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
      
      const displayTitle = extractPreviewText(title) || 'Untitled Experience'
      const displayDescription = extractPreviewText(subtitle)
      
      return {
        title: displayTitle,
        subtitle: displayDescription || undefined,
      }
    },
  },
})
