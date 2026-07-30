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
})
