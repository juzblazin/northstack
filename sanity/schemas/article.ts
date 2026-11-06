import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{ type: 'pillar' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province (optional — moves canonical URL to /provinces/{code}/{slug})',
      type: 'reference',
      to: [{ type: 'province' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Direct answer / excerpt (first 150 words — snippet bait)',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({ name: 'publishedAt', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'updatedAt', type: 'date' }),
    defineField({ name: 'readingTime', type: 'number', initialValue: 6 }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'callout' },
        { type: 'comparisonTable' },
        { type: 'cta' },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs (rendered as FAQPage schema)',
      type: 'array',
      of: [{ type: 'faqItem' }],
    }),
    defineField({
      name: 'related',
      title: 'Related articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'seoMetadata',
      title: 'SEO overrides',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', pillar: 'pillar.title', province: 'province.code' },
    prepare: ({ title, pillar, province }) => ({
      title,
      subtitle: [pillar, province ? province.toUpperCase() : null].filter(Boolean).join(' · '),
    }),
  },
})
