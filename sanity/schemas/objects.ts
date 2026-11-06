import { defineField, defineType } from 'sanity'

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      type: 'string',
      initialValue: 'info',
      options: { list: [
        { title: 'Info', value: 'info' },
        { title: 'Warning', value: 'warn' },
        { title: 'Tip', value: 'tip' },
      ], layout: 'radio' },
    }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'body', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
})

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({ name: 'columns', type: 'array', of: [{ type: 'string' }], validation: (r) => r.required().min(1) }),
    defineField({
      name: 'rows',
      type: 'array',
      of: [{ type: 'array', of: [{ type: 'string' }] }],
      validation: (r) => r.required().min(1),
    }),
  ],
})

export const cta = defineType({
  name: 'cta',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'text', rows: 2 }),
    defineField({ name: 'buttonLabel', type: 'string', initialValue: 'Learn more' }),
    defineField({ name: 'href', type: 'string', initialValue: '/tools/tax-compliance-checklist' }),
  ],
})

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Q', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'A', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
})
