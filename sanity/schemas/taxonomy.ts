import { defineField, defineType } from 'sanity'

export const pillar = defineType({
  name: 'pillar',
  title: 'Content Pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      description: 'URL segment under /guides/ (tax | software | operations | growth)',
      validation: (r) => r.required().regex(/^[a-z]+$/),
    }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'short', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
  ],
})

export const province = defineType({
  name: 'province',
  title: 'Province',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      type: 'string',
      description: 'URL segment under /provinces/ (bc | ab | on | qc | …)',
      validation: (r) => r.required().regex(/^[a-z]{2}$/),
    }),
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'blurb', type: 'text', rows: 3 }),
  ],
})
