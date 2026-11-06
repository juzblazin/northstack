import { defineField, defineType } from 'sanity'

export const tool = defineType({
  name: 'tool',
  title: 'Interactive Tool',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'config',
      title: 'Tool configuration (JSON)',
      type: 'text',
      description: 'Input parameters / plan tables consumed by the tool component.',
    }),
    defineField({
      name: 'leadCapture',
      title: 'Lead capture',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', initialValue: true }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'sub', type: 'text', rows: 2 }),
        defineField({ name: 'source', type: 'string', description: 'Tag sent to /api/lead' }),
      ],
    }),
    defineField({
      name: 'seoMetadata',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 2 }),
      ],
    }),
  ],
})
