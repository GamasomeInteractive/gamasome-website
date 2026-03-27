import { defineType, defineField, defineArrayMember } from 'sanity'

export const aiPlatformPage = defineType({
  name: 'aiPlatformPage',
  title: 'AI Platform Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '🚀 Hero' },
    { name: 'stats', title: '📊 Stats' },
    { name: 'capabilities', title: '⚡ Capabilities' },
    { name: 'useCases', title: '🌍 Use Cases' },
    { name: 'process', title: '🔄 How It Works' },
    { name: 'cta', title: '📣 CTA' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      group: 'hero',
      initialValue: 'AI Platform',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      description: 'First line of the headline',
    }),
    defineField({
      name: 'heroHeadlineAccent',
      title: 'Hero Headline Accent',
      type: 'string',
      group: 'hero',
      description: 'Second line — shown in gradient color',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Sub-headline',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image / Video',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'videoUrl', title: 'Background Video URL (YouTube / Vimeo embed URL)', type: 'url' }),
        defineField({ name: 'useVideo', title: 'Use Video instead of image?', type: 'boolean' }),
      ],
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'href', title: 'Link URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'href', title: 'Link URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'heroThemeOverride',
      title: 'Hero Colors (override global theme)',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'primaryColor', title: 'Primary Color', type: 'color' },
        { name: 'accentColor', title: 'Accent Color', type: 'color' },
        { name: 'bgColor', title: 'Background Color', type: 'color' },
      ],
    }),

    // ── STATS ────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. 50M+)', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'sublabel', title: 'Sub-label', type: 'string' },
            { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        }),
      ],
    }),

    // ── CAPABILITIES ─────────────────────────────────────────────
    defineField({
      name: 'capabilitiesSectionTitle',
      title: 'Capabilities Section Title',
      type: 'string',
      group: 'capabilities',
      initialValue: 'Core AI Capabilities',
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      group: 'capabilities',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (emoji)', type: 'string' },
            { name: 'image', title: 'Icon Image (replaces emoji)', type: 'image', options: { hotspot: true } },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'accentColor', title: 'Accent Color', type: 'color' },
            { name: 'demoVideoUrl', title: 'Demo Video URL', type: 'url' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'image' },
          },
        }),
      ],
    }),

    // ── USE CASES ────────────────────────────────────────────────
    defineField({
      name: 'useCasesSectionTitle',
      title: 'Use Cases Section Title',
      type: 'string',
      group: 'useCases',
      initialValue: 'Industries We Transform',
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      group: 'useCases',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'tag', title: 'Industry Tag (e.g. RETAIL)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
            { name: 'accentColor', title: 'Accent Color', type: 'color' },
            {
              name: 'media',
              title: 'Media (Video)',
              type: 'object',
              fields: [
                { name: 'videoUrl', title: 'Video URL (YouTube / Vimeo embed)', type: 'url' },
                { name: 'videoFile', title: 'Video File Upload', type: 'file', options: { accept: 'video/*' } },
              ],
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'tag', media: 'coverImage' },
          },
        }),
      ],
    }),

    // ── HOW IT WORKS ─────────────────────────────────────────────
    defineField({
      name: 'processSectionTitle',
      title: 'Process Section Title',
      type: 'string',
      group: 'process',
      initialValue: 'How It Works',
    }),
    defineField({
      name: 'howItWorks',
      title: 'Steps',
      type: 'array',
      group: 'process',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'number', title: 'Step Number (01, 02…)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'icon', title: 'Icon (emoji)', type: 'string' },
            { name: 'illustration', title: 'Illustration', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
          },
        }),
      ],
    }),

    // ── CTA ──────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Sub-text',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryBtn',
      title: 'Primary Button',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaSecondaryBtn',
      title: 'Secondary Button',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA Background Image',
      type: 'image',
      group: 'cta',
      options: { hotspot: true },
    }),

    // ── SEO ──────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Share Image',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
    prepare: () => ({ title: 'AI Platform Page' }),
  },
})
