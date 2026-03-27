import { defineType, defineField } from 'sanity'

// Global site-wide settings — colors, fonts, contact info, social links
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),

    // ── Theme colors ──────────────────────────────────────────────
    defineField({
      name: 'theme',
      title: 'Theme Colors',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'color',
          description: 'Main brand color (buttons, highlights)',
        }),
        defineField({
          name: 'accentColor',
          title: 'Accent / Cyan Color',
          type: 'color',
          description: 'Secondary accent (glows, badges)',
        }),
        defineField({
          name: 'darkBg',
          title: 'Dark Background Color',
          type: 'color',
          description: 'Main dark page background',
        }),
        defineField({
          name: 'cardBg',
          title: 'Card Background Color',
          type: 'color',
        }),
      ],
    }),

    // ── Contact & Social ──────────────────────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter / X URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
