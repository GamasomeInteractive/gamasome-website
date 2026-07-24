// schema v2 – analytics, globalSeo, seoFields, blog collection
import { defineConfig } from 'tinacms'
import { VersionHistoryScreen, VersionHistoryIcon } from './VersionHistoryScreen'
import { ThemePickerScreen, ThemePickerIcon } from './ThemePickerScreen'
import { TemplatePickerScreen, TemplatePickerIcon } from './TemplatePickerScreen'

// ── URL consistency auto-fix ────────────────────────────────────────
// next.config.js has trailingSlash:true, so every live URL ends with '/'.
// On save, append '/' to internal paths automatically — no error, no
// blocking. External (http/https), mailto/tel, and anchor links are exempt.
//
// Wired via `ui: { parse: normalizeInternalHref }` on every href field.
// Returning a new value here makes Tina save the corrected version.
function normalizeInternalHref(value: unknown): string {
  if (typeof value !== 'string' || !value) return (value as string) ?? ''
  if (/^https?:\/\//.test(value)) return value
  if (value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:')) return value
  return value.endsWith('/') ? value : `${value}/`
}

// ── Section motion override fields (reused in each section) ──────────
function sectionMotionFields() {
  return {
    type: 'object' as const,
    name: 'motion',
    label: '🎬 Section Animation',
    ui: { description: 'Leave blank to inherit from Site Settings → Animation & Motion.' },
    fields: [
      {
        type: 'string' as const,
        name: 'easePreset',
        label: 'Easing Style',
        defaultValue: 'inherit',
        options: [
          { value: 'inherit',   label: '— Inherit from global —' },
          { value: 'smooth',    label: 'Smooth — standard UI' },
          { value: 'cinematic', label: 'Cinematic — hero / bold entrances' },
          { value: 'inOut',     label: 'Balanced In-Out — panels, modals' },
          { value: 'snap',      label: 'Snap — quick snappy feel' },
        ],
      },
      {
        type: 'number' as const,
        name: 'durationScale',
        label: 'Duration Scale',
        ui: {
          description: 'Leave blank to inherit. 1.0 = normal · 0.5 = 2× faster · 2.0 = 2× slower',
          placeholder: '1.0',
        },
      },
    ],
  }
}

// ── Shared field groups reused across all service pages ──────────────
function seoFields() {
  return {
    type: 'object' as const,
    name: 'seo',
    label: '🔍 SEO',
    fields: [
      {
        type: 'string' as const, name: 'metaTitle', label: 'Meta Title',
        ui: { description: 'Recommended: 50–60 characters. Leave blank to use the hero title.' },
      },
      {
        type: 'string' as const, name: 'metaDescription', label: 'Meta Description',
        ui: { component: 'textarea', description: 'Recommended: 150–160 characters.' },
      },
      {
        type: 'string' as const, name: 'keywords', label: 'Focus Keywords (comma-separated)',
        ui: { description: 'For reference only — not rendered as a meta tag (Google ignores it). Helps your team track target keywords per page.' },
      },
      { type: 'image' as const, name: 'ogImage', label: 'OG / Social Share Image (1200×630px recommended)' },
      {
        type: 'string' as const, name: 'canonicalUrl', label: 'Canonical URL',
        ui: { description: 'Only set if this page duplicates another URL. Leave blank for the default canonical.' },
      },
      {
        type: 'string' as const, name: 'robots', label: 'Robots',
        options: [
          { value: 'index, follow',     label: 'Index & Follow (default)' },
          { value: 'noindex, follow',   label: 'No Index, Follow' },
          { value: 'index, nofollow',   label: 'Index, No Follow' },
          { value: 'noindex, nofollow', label: 'No Index, No Follow' },
        ],
      },
      {
        type: 'string' as const, name: 'changefreq', label: 'Sitemap Change Frequency',
        options: [
          { value: 'daily',   label: 'Daily' },
          { value: 'weekly',  label: 'Weekly (default)' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly',  label: 'Yearly' },
        ],
      },
      {
        type: 'number' as const, name: 'priority', label: 'Sitemap Priority (0.0 – 1.0)',
        ui: { description: 'Home = 1.0, service pages = 0.8, blog = 0.6. Default: 0.8' },
      },
    ],
  }
}

function servicePageFields() {
  return [
    {
      type: 'boolean' as const,
      name: 'hidden',
      label: '🙈 Hide this page',
      ui: {
        description: 'Hidden pages are 404 to visitors and skipped from the sitemap, but the content is preserved. Use this to temporarily take a page offline without deleting it.',
      },
    },
    { type: 'string' as const, name: 'pageTitle',       label: 'SEO Page Title' },
    { type: 'string' as const, name: 'pageDescription', label: 'SEO Description', ui: { component: 'textarea' } },
    seoFields(),
    {
      type: 'object' as const, name: 'hero', label: '🖼 Hero Banner',
      fields: [
        { type: 'image'  as const, name: 'bannerImage', label: 'Banner Background Image' },
        { type: 'string' as const, name: 'title',       label: 'Page Title (h1)' },
        { type: 'string' as const, name: 'subtitle',    label: 'Subtitle', ui: { component: 'textarea' } },
        { type: 'string' as const, name: 'ctaText',     label: 'CTA Button Text' },
        { type: 'string' as const, name: 'ctaHref',     label: 'CTA Button Link' },
        sectionMotionFields(),
      ],
    },
    { type: 'string' as const, name: 'servicesHeading', label: 'Services Section Heading' },
    {
      type: 'object' as const, name: 'servicesMotion', label: '⚙️ Services Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'services', label: '⚙️ Services / Solutions', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Service' }) },
      fields: [
        { type: 'string' as const, name: 'title',       label: 'Title' },
        { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
        { type: 'image'  as const, name: 'image',       label: 'Image' },
        { type: 'string'    as const, name: 'ctaText',     label: 'Button Text (optional)' },
        { type: 'string'    as const, name: 'ctaHref',     label: 'Button Link' },
      ],
    },
    { type: 'boolean' as const, name: 'showEngagement',    label: 'Show "How We Work" section' },
    { type: 'string'  as const, name: 'engagementHeading', label: 'Engagement Section Heading' },
    {
      type: 'object' as const, name: 'engagementMotion', label: '📋 Engagement Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'engagementModels', label: '📋 Engagement Models', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Model' }) },
      fields: [
        { type: 'string' as const, name: 'title',       label: 'Model Name' },
        { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
      ],
    },
    { type: 'string'  as const, name: 'showreelVideoUrl', label: '🎬 Showreel Video URL (YouTube embed, optional)' },
    {
      type: 'object' as const, name: 'spotlight', label: '🌟 Feature Spotlight Section (optional)',
      fields: [
        { type: 'boolean' as const, name: 'enabled',     label: 'Show spotlight section' },
        { type: 'string'  as const, name: 'heading',     label: 'Heading' },
        { type: 'string'  as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
        { type: 'string'  as const, name: 'videoUrl',    label: 'YouTube Embed URL' },
        { type: 'string'    as const, name: 'ctaText',     label: 'CTA Button Text' },
        { type: 'string'    as const, name: 'ctaHref',     label: 'CTA Button Link' },
        sectionMotionFields(),
      ],
    },
    { type: 'boolean' as const, name: 'showUseCases',    label: 'Show Use Cases Videos section' },
    { type: 'string'  as const, name: 'useCasesHeading', label: 'Use Cases Section Heading' },
    {
      type: 'object' as const, name: 'useCasesMotion', label: '📽 Use Cases Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'useCases', label: '📽 Use Case Videos', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Use Case' }) },
      fields: [
        { type: 'string' as const, name: 'title',    label: 'Title' },
        { type: 'string' as const, name: 'videoUrl', label: 'YouTube Embed URL' },
      ],
    },
    { type: 'boolean' as const, name: 'showPortfolio',    label: 'Show Portfolio / Works section' },
    { type: 'string'  as const, name: 'portfolioHeading', label: 'Portfolio Section Heading' },
    {
      type: 'object' as const, name: 'portfolioMotion', label: '🗂 Portfolio Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'portfolio', label: '🗂 Portfolio / Works', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Work' }) },
      fields: [
        { type: 'string' as const, name: 'title', label: 'Title' },
        { type: 'image'  as const, name: 'image', label: 'Image' },
        { type: 'string' as const, name: 'link',  label: 'Link (optional)' },
      ],
    },
    { type: 'string' as const, name: 'techHeading', label: 'Technologies Section Heading' },
    {
      type: 'object' as const, name: 'techMotion', label: '🔧 Technologies Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'technologies', label: '🔧 Technology Stack', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.name ?? 'Technology' }) },
      fields: [
        { type: 'string' as const, name: 'name',  label: 'Technology Name' },
        { type: 'image'  as const, name: 'image', label: 'Logo Image' },
      ],
    },
    {
      type: 'object' as const, name: 'ctaBox', label: '📣 CTA Box',
      fields: [
        { type: 'string' as const, name: 'heading',     label: 'Heading' },
        { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
        {
          type: 'object' as const, name: 'primaryBtn', label: 'Primary Button',
          fields: [
            { type: 'string' as const, name: 'text', label: 'Text' },
            { type: 'string' as const, name: 'href', label: 'Link' },
          ],
        },
        sectionMotionFields(),
      ],
    },
  ]
}

// ── AI Platform template fields (reused inside servicePage templates) ────────
function aiPlatformTemplateFields(): any[] {
  return [
    // ── Visibility ────────────────────────────────────────────────────────
    {
      type: 'boolean' as const,
      name: 'hidden',
      label: '🙈 Hide this page',
      ui: {
        description: 'Hidden pages are 404 to visitors and skipped from the sitemap, but the content is preserved. Use this to temporarily take a page offline without deleting it.',
      },
    },
    // ── Typography & Colors ───────────────────────────────────────────────
    {
      type: 'object' as const,
      name: 'typography',
      label: '✏️ Typography & Page Colors',
      ui: { description: 'Quick-apply a full theme: click the 🎨 Theme Picker in the left sidebar.' },
      fields: [
        {
          type: 'string' as const,
          name: 'fontFamily',
          label: 'Font Family',
          options: [
            { value: 'Poppins',    label: 'Poppins (default)' },
            { value: 'Inter',      label: 'Inter' },
            { value: 'Roboto',     label: 'Roboto' },
            { value: 'Montserrat', label: 'Montserrat' },
            { value: 'Open Sans',  label: 'Open Sans' },
            { value: 'Raleway',    label: 'Raleway' },
            { value: 'Nunito',     label: 'Nunito' },
          ],
        },
        { type: 'string' as const, name: 'headingColor', label: 'Heading Color (h1/h2/h3)',      ui: { component: 'color' } },
        { type: 'string' as const, name: 'bodyColor',    label: 'Body Text Color',                ui: { component: 'color' } },
        { type: 'string' as const, name: 'labelColor',   label: 'Section Label Color (caps)',     ui: { component: 'color' } },
        { type: 'string' as const, name: 'primaryColor', label: 'Primary Color (buttons)',        ui: { component: 'color' } },
        { type: 'string' as const, name: 'accentColor',  label: 'Accent Color (glow)',            ui: { component: 'color' } },
        { type: 'string' as const, name: 'bgPrimary',    label: 'Primary Section Background',     ui: { component: 'color' } },
        { type: 'string' as const, name: 'bgSecondary',  label: 'Alternate Section Background',   ui: { component: 'color' } },
        { type: 'string' as const, name: 'bgStats',      label: 'Stats Bar Background',           ui: { component: 'color' } },
        { type: 'string' as const, name: 'bgFooter',     label: 'Footer Background',              ui: { component: 'color' } },
      ],
    },
    // ── Hero ─────────────────────────────────────────────────────────────
    {
      type: 'object' as const,
      name: 'hero',
      label: '🚀 Hero Section',
      fields: [
        { type: 'string' as const, name: 'badge',              label: 'Badge Text (e.g. "AI Platform")' },
        { type: 'string' as const, name: 'headline',           label: 'Headline (line 1)' },
        { type: 'string' as const, name: 'headlineAccent',     label: 'Headline Accent (line 2 — gradient)' },
        { type: 'string' as const, name: 'subheadline',        label: 'Sub-headline', ui: { component: 'textarea' } },
        { type: 'image'  as const, name: 'backgroundImage',    label: 'Background Image (optional)' },
        { type: 'image'  as const, name: 'image',              label: 'Hero Showcase Image (replaces 3D animation when set)' },
        { type: 'string' as const, name: 'imageAlt',           label: 'Hero Showcase Image Alt Text' },
        { type: 'string' as const, name: 'backgroundVideoUrl', label: 'Background Video URL (YouTube embed)' },
        {
          type: 'object' as const, name: 'trustBadges', label: 'Trust Badges (pills under CTAs)', list: true,
          ui: { itemProps: (item: any) => ({ label: item?.text ?? 'Badge' }) },
          fields: [
            { type: 'string' as const, name: 'text', label: 'Badge Text' },
          ],
        },
        {
          type: 'object' as const, name: 'colors', label: '🎨 Section Colors (overrides global theme)',
          fields: [
            { type: 'string' as const, name: 'primaryColor', label: 'Primary Color', ui: { component: 'color' } },
            { type: 'string' as const, name: 'accentColor',  label: 'Accent Color',  ui: { component: 'color' } },
            { type: 'string' as const, name: 'bgColor',      label: 'Background',    ui: { component: 'color' } },
          ],
        },
        {
          type: 'object' as const, name: 'animation', label: '🎮 3D Animation',
          fields: [
            { type: 'boolean' as const, name: 'enabled',      label: 'Show 3D Animation' },
            { type: 'string'  as const, name: 'primaryColor', label: 'Primary Color', ui: { component: 'color' } },
            { type: 'string'  as const, name: 'accentColor',  label: 'Accent Color',  ui: { component: 'color' } },
          ],
        },
        {
          type: 'object' as const, name: 'primaryCta', label: 'Primary Button',
          fields: [
            { type: 'string' as const, name: 'text', label: 'Button Text' },
            { type: 'string' as const, name: 'href', label: 'Link URL' },
          ],
        },
        {
          type: 'object' as const, name: 'secondaryCta', label: 'Secondary Button',
          fields: [
            { type: 'string' as const, name: 'text', label: 'Button Text' },
            { type: 'string' as const, name: 'href', label: 'Link URL' },
          ],
        },
        sectionMotionFields(),
      ],
    },
    // ── Stats ─────────────────────────────────────────────────────────────
    {
      type: 'object' as const, name: 'stats', label: '📊 Stats Bar', list: true,
      ui: { itemProps: (item: any) => ({ label: `${item?.value ?? ''} — ${item?.label ?? 'Stat'}` }) },
      fields: [
        { type: 'string' as const, name: 'value',    label: 'Value (e.g. 50M+)' },
        { type: 'string' as const, name: 'label',    label: 'Label (e.g. Training Samples)' },
        { type: 'string' as const, name: 'sublabel', label: 'Sub-label' },
        { type: 'string' as const, name: 'descHtml', label: 'Description (single line, supports <a> links — overrides label/sub-label)', ui: { component: 'textarea' } },
      ],
    },
    // ── Direct Answer ─────────────────────────────────────────────────────
    { type: 'string' as const, name: 'directAnswerLabel', label: 'Direct Answer — Section Label' },
    { type: 'string' as const, name: 'directAnswerTitle', label: 'Direct Answer — Heading' },
    {
      type: 'object' as const, name: 'directAnswerBody', label: 'Direct Answer — Body Paragraphs', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.text?.slice(0, 50) ?? 'Paragraph' }) },
      fields: [{ type: 'string' as const, name: 'text', label: 'Paragraph', ui: { component: 'textarea' } }],
    },
    { type: 'string' as const, name: 'directAnswerChecklistTitle', label: 'Direct Answer — Checklist Heading' },
    {
      type: 'object' as const, name: 'directAnswerChecklist', label: 'Direct Answer — Checklist Items', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.text ?? 'Item' }) },
      fields: [{ type: 'string' as const, name: 'text', label: 'Item' }],
    },
    // ── Methods Table ─────────────────────────────────────────────────────
    { type: 'string' as const, name: 'methodsLabel', label: 'Methods — Section Label' },
    { type: 'string' as const, name: 'methodsTitle', label: 'Methods — Heading' },
    { type: 'string' as const, name: 'methodsDescription', label: 'Methods — Description', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'methodsTable', label: '▦ Methods Comparison Table',
      fields: [
        { type: 'string' as const, name: 'headers', label: 'Column Headers', list: true },
        {
          type: 'object' as const, name: 'rows', label: 'Rows', list: true,
          ui: { itemProps: (item: any) => ({ label: item?.method ?? 'Method' }) },
          fields: [
            { type: 'string' as const, name: 'method',      label: 'Method' },
            { type: 'string' as const, name: 'methodSub',   label: 'Method Sub-text' },
            { type: 'string' as const, name: 'bestFor',     label: 'Best for' },
            { type: 'string' as const, name: 'fidelity',    label: 'Data fidelity' },
            { type: 'string' as const, name: 'scalability', label: 'Scalability' },
          ],
        },
      ],
    },
    { type: 'string' as const, name: 'methodsFootnote', label: 'Methods — Footnote', ui: { component: 'textarea' } },
    // ── Pitfalls (What teams get wrong) ───────────────────────────────────
    { type: 'string' as const, name: 'pitfallsLabel', label: 'Pitfalls — Section Label' },
    { type: 'string' as const, name: 'pitfallsTitle', label: 'Pitfalls — Heading' },
    { type: 'string' as const, name: 'pitfallsDescription', label: 'Pitfalls — Description', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'pitfalls', label: '⚠️ Pitfalls', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Pitfall' }) },
      fields: [
        { type: 'string' as const, name: 'title',       label: 'Title' },
        { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
      ],
    },
    // ── Costs ─────────────────────────────────────────────────────────────
    { type: 'string' as const, name: 'costsLabel', label: 'Costs — Section Label' },
    { type: 'string' as const, name: 'costsTitle', label: 'Costs — Heading' },
    { type: 'string' as const, name: 'costsIntro', label: 'Costs — Intro', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'costs', label: '💸 Cost Items', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.text ?? 'Cost item' }) },
      fields: [{ type: 'string' as const, name: 'text', label: 'Item' }],
    },
    { type: 'string' as const, name: 'costsOutro', label: 'Costs — Closing Line', ui: { component: 'textarea' } },
    // ── FAQ ───────────────────────────────────────────────────────────────
    { type: 'string' as const, name: 'faqLabel', label: 'FAQ — Section Label' },
    { type: 'string' as const, name: 'faqTitle', label: 'FAQ — Heading' },
    {
      type: 'object' as const, name: 'faqs', label: '❓ FAQ Items', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.question ?? 'Question' }) },
      fields: [
        { type: 'string' as const, name: 'question', label: 'Question' },
        { type: 'string' as const, name: 'answer',   label: 'Answer', ui: { component: 'textarea' } },
      ],
    },
    // ── Quality Framework (two-column) ────────────────────────────────────
    { type: 'string' as const, name: 'qualityLabel', label: 'Quality — Section Label' },
    { type: 'string' as const, name: 'qualityTitle', label: 'Quality — Heading' },
    { type: 'string' as const, name: 'qualityDescription', label: 'Quality — Description', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'qualityList', label: '📐 Quality Dimensions', list: true,
      ui: { itemProps: (item: any) => ({ label: `${item?.score ?? ''} ${item?.title ?? ''}` }) },
      fields: [
        { type: 'string' as const, name: 'score',       label: 'Score Label (e.g. 01 / TASK)' },
        { type: 'string' as const, name: 'title',       label: 'Title' },
        { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
      ],
    },
    { type: 'string' as const, name: 'qualityCardTitle', label: 'Quality — Side Card Heading' },
    { type: 'string' as const, name: 'qualityCardHtml', label: 'Quality — Side Card HTML (supports <p> and <a> links)', ui: { component: 'textarea' } },
    // ── Problems (Why It Matters) ─────────────────────────────────────────
    { type: 'string' as const, name: 'problemsLabel', label: 'Problems — Section Label' },
    { type: 'string' as const, name: 'problemsTitle', label: 'Problems — Heading' },
    { type: 'string' as const, name: 'problemsDescription', label: 'Problems — Description', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'problems', label: '⚠️ Problems / Why It Matters', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Problem' }) },
      fields: [
        { type: 'string' as const, name: 'icon',        label: 'Icon (emoji, optional)' },
        { type: 'string' as const, name: 'title',       label: 'Title' },
        { type: 'string' as const, name: 'description', label: 'Description (supports <a> links)', ui: { component: 'textarea' } },
      ],
    },
    // ── Multimodal (Delivery Formats) ─────────────────────────────────────
    { type: 'string' as const, name: 'multimodalLabel', label: 'Multimodal — Section Label' },
    { type: 'string' as const, name: 'multimodalTitle', label: 'Multimodal — Heading' },
    { type: 'string' as const, name: 'multimodalDescription', label: 'Multimodal — Description', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'multimodal', label: '🔀 Multimodal / Delivery Formats', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Item' }) },
      fields: [
        { type: 'string' as const, name: 'icon',        label: 'Icon (emoji)' },
        { type: 'string' as const, name: 'title',       label: 'Title' },
        { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
      ],
    },
    // ── Security (checklist) ──────────────────────────────────────────────
    { type: 'string' as const, name: 'securityLabel', label: 'Security — Section Label' },
    { type: 'string' as const, name: 'securityTitle', label: 'Security — Heading' },
    { type: 'string' as const, name: 'securityDescription', label: 'Security — Description', ui: { component: 'textarea' } },
    {
      type: 'object' as const, name: 'security', label: '🔒 Security / Checklist', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Item' }) },
      fields: [
        { type: 'string' as const, name: 'title', label: 'Item', ui: { component: 'textarea' } },
      ],
    },
    // ── How It Works description (label/title/list defined below) ─────────
    { type: 'string' as const, name: 'howItWorksDescription', label: 'How It Works — Description', ui: { component: 'textarea' } },
    // ── Capabilities ──────────────────────────────────────────────────────
    { type: 'string' as const, name: 'capabilitiesLabel', label: 'Capabilities — Section Label' },
    { type: 'string' as const, name: 'capabilitiesTitle', label: 'Capabilities — Heading' },
    {
      type: 'object' as const, name: 'capabilitiesMotion', label: '⚡ Capabilities Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'capabilities', label: '⚡ Core Capabilities', list: true,
      ui: { itemProps: (item: any) => ({ label: item?.title ?? 'Capability' }) },
      fields: [
        { type: 'string' as const, name: 'icon',         label: 'Icon (emoji, e.g. 👁️)' },
        { type: 'image'  as const, name: 'iconImage',    label: 'Icon Image (SVG/PNG, replaces emoji)' },
        { type: 'string' as const, name: 'title',        label: 'Title' },
        { type: 'rich-text' as const, name: 'description', label: 'Description' },
        { type: 'string' as const, name: 'accentColor',  label: 'Card Accent Color', ui: { component: 'color' } },
        { type: 'string' as const, name: 'demoVideoUrl', label: 'Demo Video URL (YouTube)' },
      ],
    },
    // ── Use Cases ─────────────────────────────────────────────────────────
    { type: 'string' as const, name: 'useCasesLabel', label: 'Use Cases — Section Label' },
    { type: 'string' as const, name: 'useCasesTitle', label: 'Use Cases — Heading' },
    {
      type: 'object' as const, name: 'useCasesMotion', label: '🌍 Use Cases Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'useCases', label: '🌍 Industry Use Cases', list: true,
      ui: { itemProps: (item: any) => ({ label: `[${item?.tag ?? ''}] ${item?.title ?? 'Use Case'}` }) },
      fields: [
        { type: 'string'    as const, name: 'tag',         label: 'Industry Tag (e.g. RETAIL)' },
        { type: 'string'    as const, name: 'title',       label: 'Title' },
        { type: 'rich-text' as const, name: 'description', label: 'Description' },
        { type: 'image'     as const, name: 'coverImage',  label: 'Cover Image' },
        { type: 'string'    as const, name: 'accentColor', label: 'Accent Color', ui: { component: 'color' } },
        { type: 'string'    as const, name: 'videoUrl',    label: 'Demo Video URL (YouTube embed)' },
      ],
    },
    // ── How It Works ──────────────────────────────────────────────────────
    { type: 'boolean' as const, name: 'howItWorksPipeline', label: 'Use left-aligned STAGE pipeline layout (instead of centered circles)' },
    { type: 'string' as const, name: 'howItWorksLabel', label: 'How It Works — Section Label' },
    { type: 'string' as const, name: 'howItWorksTitle', label: 'How It Works — Heading' },
    {
      type: 'object' as const, name: 'howItWorksMotion', label: '🔄 How It Works Section Animation',
      fields: sectionMotionFields().fields,
    },
    {
      type: 'object' as const, name: 'howItWorks', label: '🔄 How It Works', list: true,
      ui: { itemProps: (item: any) => ({ label: `${item?.number ?? ''} — ${item?.title ?? 'Step'}` }) },
      fields: [
        { type: 'string'    as const, name: 'number',      label: 'Step Number (01, 02, 03)' },
        { type: 'string'    as const, name: 'title',       label: 'Step Title' },
        { type: 'rich-text' as const, name: 'description', label: 'Description' },
        { type: 'image'     as const, name: 'illustration', label: 'Step Illustration' },
      ],
    },
    // ── CTA ───────────────────────────────────────────────────────────────
    {
      type: 'object' as const, name: 'cta', label: '📣 CTA Section',
      fields: [
        { type: 'string' as const, name: 'label',    label: 'Eyebrow Label (e.g. Next Step) — enables HTML-style CTA when badges are set' },
        { type: 'string' as const, name: 'headline', label: 'Headline' },
        { type: 'string' as const, name: 'subtext',  label: 'Sub-text', ui: { component: 'textarea' } },
        { type: 'image'  as const, name: 'backgroundImage', label: 'Background Image' },
        {
          type: 'object' as const, name: 'badges', label: 'Footer Badge Links (switches CTA to HTML-style layout)', list: true,
          ui: { itemProps: (item: any) => ({ label: item?.text ?? 'Badge' }) },
          fields: [
            { type: 'string' as const, name: 'text', label: 'Text' },
            { type: 'string' as const, name: 'href', label: 'URL' },
          ],
        },
        {
          type: 'object' as const, name: 'primaryBtn', label: 'Primary Button',
          fields: [
            { type: 'string' as const, name: 'text', label: 'Text' },
            { type: 'string' as const, name: 'href', label: 'URL' },
          ],
        },
        {
          type: 'object' as const, name: 'secondaryBtn', label: 'Secondary Button',
          fields: [
            { type: 'string' as const, name: 'text', label: 'Text' },
            { type: 'string' as const, name: 'href', label: 'URL' },
          ],
        },
        sectionMotionFields(),
      ],
    },
  ]
}

export default defineConfig({
  cmsCallback: (cms) => {
    cms.plugins.add({
      __type: 'screen',
      name: 'Theme Picker',
      Icon: ThemePickerIcon,
      layout: 'fullscreen',
      Component: ThemePickerScreen,
    })
    cms.plugins.add({
      __type: 'screen',
      name: 'Version History',
      Icon: VersionHistoryIcon,
      layout: 'fullscreen',
      Component: VersionHistoryScreen,
    })
    cms.plugins.add({
      __type: 'screen',
      name: 'Template Picker',
      Icon: TemplatePickerIcon,
      layout: 'fullscreen',
      Component: TemplatePickerScreen,
    })
    return cms
  },
  branch: process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  // Explicit content API URL — prevents vite parse errors caused by certain UUIDs
  // being inlined by esbuild at build-time (Vercel environment)
  contentApiUrlOverride: process.env.TINA_CONTENT_API_URL || undefined,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'static/images',
      publicFolder: 'public',
      // static:true is READ-ONLY (no uploads). Keep false so editors can upload
      // cover images. Locally, uploads require the Tina backend — run `yarn cms`
      // (tinacms dev), NOT `yarn dev`; files are written to public/static/images.
      static: false,
    },
  },


  schema: {
    collections: [
      // ── GLOBAL SITE SETTINGS ─────────────────────────────────────────
      {
        label: '⚙️ Site Settings',
        name: 'siteSettings',
        path: 'content/settings',
        match: { include: 'index' },
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'siteName', label: 'Site Name' },
          { type: 'string', name: 'tagline', label: 'Tagline' },
          {
            type: 'string',
            name: 'homePage',
            label: '🏠 Home Page',
            ui: {
              description: 'Which service page renders at gamasome.com/ (the root URL). Changes take effect on next deployment.',
            },
            options: [
              { value: 'physical-ai-data-collection', label: 'Physical AI Data Collection' },
              { value: 'simulation-digital-twins', label: 'Simulation & Digital Twins' },
              { value: 'ai-solutions',              label: 'AI Solutions' },
              { value: 'ai-platform',               label: 'AI Platform' },
              { value: 'ai-avatars-platform',       label: 'AI Avatars Platform' },
              { value: 'ar-vr-development',         label: 'AR / VR Development' },
              { value: 'game-development',          label: 'Game Development' },
              { value: 'metaverse',                 label: 'Metaverse' },
              { value: 'robotics-solutions',        label: 'Robotics Solutions' },
            ],
          },
          {
            type: 'string',
            name: 'colorScheme',
            label: '🌓 Blog & Content Theme',
            ui: {
              description: 'Controls light/dark mode for blog posts and content pages. Service pages always use their own dark styling.',
            },
            options: [
              { value: 'light',  label: 'Light (default)' },
              { value: 'dark',   label: 'Dark' },
              { value: 'system', label: 'Follow visitor OS preference' },
            ],
          },
          { type: 'image', name: 'logo', label: 'Logo Image' },
          { type: 'image', name: 'favicon', label: 'Favicon' },
          {
            type: 'object',
            name: 'theme',
            label: '🎨 Theme Colors',
            fields: [
              {
                type: 'string',
                name: 'primaryColor',
                label: 'Primary Color',
                ui: { component: 'color' },
              },
              {
                type: 'string',
                name: 'accentColor',
                label: 'Accent / Cyan Color',
                ui: { component: 'color' },
              },
              {
                type: 'string',
                name: 'darkBg',
                label: 'Dark Background Color',
                ui: { component: 'color' },
              },
              {
                type: 'string',
                name: 'textColor',
                label: 'Text Color',
                ui: { component: 'color' },
              },
            ],
          },
          {
            type: 'object',
            name: 'contact',
            label: '📞 Contact',
            fields: [
              { type: 'string', name: 'email', label: 'Email' },
              { type: 'string', name: 'phone', label: 'Phone' },
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: '🌐 Social Links',
            fields: [
              { type: 'string', name: 'linkedin', label: 'LinkedIn URL' },
              { type: 'string', name: 'twitter', label: 'Twitter / X URL' },
              { type: 'string', name: 'youtube', label: 'YouTube URL' },
              { type: 'string', name: 'instagram', label: 'Instagram URL' },
              { type: 'string', name: 'facebook', label: 'Facebook URL' },
            ],
          },
          {
            type: 'object',
            name: 'motion',
            label: '🎬 Animation & Motion',
            ui: {
              description: 'Controls animation timing and easing across the entire site. Applies to CSS transitions (Layer 1) and JavaScript animations (Layer 2).',
            },
            fields: [
              {
                type: 'string',
                name: 'easePreset',
                label: 'Easing Style',
                options: [
                  { value: 'smooth',    label: 'Smooth — standard UI reveals' },
                  { value: 'cinematic', label: 'Cinematic — hero entrances (slight overshoot)' },
                  { value: 'inOut',     label: 'Balanced In-Out — modals, panels' },
                  { value: 'snap',      label: 'Snap — quick snappy feedback' },
                ],
              },
              {
                type: 'number',
                name: 'durationScale',
                label: 'Duration Scale',
                ui: {
                  description: '1.0 = default timing  ·  0.5 = 2× faster  ·  2.0 = 2× slower',
                },
              },
              {
                type: 'boolean',
                name: 'disableAnimations',
                label: 'Disable All Animations (site-wide accessibility override)',
              },
            ],
          },
          {
            type: 'object',
            name: 'analytics',
            label: '📊 Analytics & Search Console',
            fields: [
              {
                type: 'string',
                name: 'ga4Id',
                label: 'Google Analytics 4 ID',
                ui: { description: 'Format: G-XXXXXXXXXX — from GA4 → Admin → Data Streams → Measurement ID' },
              },
              {
                type: 'string',
                name: 'clarityId',
                label: 'Microsoft Clarity Project ID',
                ui: { description: 'From MS Clarity → Settings → Overview → Project ID' },
              },
              {
                type: 'string',
                name: 'gscVerification',
                label: 'Google Search Console Verification Code',
                ui: { description: 'Only the code value from the <meta name="google-site-verification" content="..."> tag' },
              },
            ],
          },
          {
            type: 'object',
            name: 'robotsTxt',
            label: '🤖 Robots.txt',
            ui: { description: 'Controls which crawlers can access your site. Changes take effect on next deployment.' },
            fields: [
              {
                type: 'boolean',
                name: 'blockAiCrawlers',
                label: 'Block AI Training Crawlers',
                ui: { description: 'Blocks GPTBot, CCBot, Claude-Web, Anthropic-AI, Google-Extended, PerplexityBot from crawling your content for AI training.' },
              },
              {
                type: 'object',
                name: 'customRules',
                label: 'Custom Disallow Rules',
                list: true,
                ui: {
                  description: 'Add paths you want to block from all crawlers (e.g. /admin, /private).',
                  itemProps: (item) => ({ label: item?.path ?? 'Rule' }),
                },
                fields: [
                  {
                    type: 'string',
                    name: 'path',
                    label: 'Disallow Path',
                    ui: { description: 'e.g. /admin or /private' },
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'sitemap',
            label: '🗺 Sitemap',
            ui: { description: 'Controls what appears in /sitemap.xml. Changes take effect on next deployment.' },
            fields: [
              {
                type: 'string',
                name: 'defaultChangefreq',
                label: 'Default Change Frequency',
                ui: { description: 'How often pages are likely to change. Used by search engines for crawl scheduling.' },
                options: [
                  { value: 'always',  label: 'Always' },
                  { value: 'hourly',  label: 'Hourly' },
                  { value: 'daily',   label: 'Daily' },
                  { value: 'weekly',  label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly',  label: 'Yearly' },
                  { value: 'never',   label: 'Never' },
                ],
              },
              {
                type: 'boolean',
                name: 'includeBlogs',
                label: 'Include Blog Posts',
                ui: { description: 'Include all published blog posts in sitemap.xml.' },
              },
              {
                type: 'boolean',
                name: 'includeServicePages',
                label: 'Include Service Pages',
                ui: { description: 'Include all service pages (AI, AR/VR, Robotics, etc.) in sitemap.xml.' },
              },
            ],
          },
          {
            type: 'object',
            name: 'globalSeo',
            label: '🌐 Global SEO Defaults',
            ui: { description: 'Fallback values used when a page has no SEO fields set.' },
            fields: [
              {
                type: 'string', name: 'defaultTitle', label: 'Default Meta Title',
                ui: { description: 'Used on pages without a custom meta title. e.g. "Gamasome — Physical AI & Robotics Data"' },
              },
              {
                type: 'string', name: 'titleSuffix', label: 'Title Suffix',
                ui: { description: 'Appended to every page title. e.g. " | Gamasome"' },
              },
              {
                type: 'string', name: 'defaultDescription', label: 'Default Meta Description',
                ui: { component: 'textarea', description: '150–160 characters. Used when a page has no description.' },
              },
              { type: 'image', name: 'defaultOgImage', label: 'Default OG / Social Share Image' },
              {
                type: 'string', name: 'twitterHandle', label: 'Twitter / X Handle',
                ui: { description: 'e.g. @gamasome' },
              },
            ],
          },
          {
            type: 'object',
            name: 'blogCta',
            label: '📣 Blog Call-to-Action',
            ui: { description: 'Edits the CTA box and bottom banner shown on every blog post.' },
            fields: [
              {
                type: 'object',
                name: 'rail',
                label: 'Sidebar CTA box',
                fields: [
                  { type: 'string', name: 'eyebrow', label: 'Eyebrow / Badge' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
                  { type: 'string', name: 'buttonLabel', label: 'Button Label' },
                  { type: 'string', name: 'buttonHref', label: 'Button Link' },
                ],
              },
              {
                type: 'object',
                name: 'banner',
                label: 'Bottom CTA banner',
                fields: [
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
                  { type: 'string', name: 'buttonLabel', label: 'Button Label' },
                  { type: 'string', name: 'buttonHref', label: 'Button Link' },
                ],
              },
            ],
          },
        ],
      },

      // ── HEADER / NAVIGATION ────────────────────────────────────────
      {
        label: '🧭 Header & Navigation',
        name: 'header',
        path: 'content/navigation',
        match: { include: 'header' },
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'image',
            name: 'logoImage',
            label: 'Logo Image (PNG / SVG — replaces the default SVG)',
          },
          {
            type: 'object',
            name: 'navLinks',
            label: 'Navigation Links',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.hidden ? '🙈 ' : ''}${item?.title ?? 'Link'}`,
              }),
            },
            fields: [
              { type: 'string', name: 'title', label: 'Menu Label' },
              { type: 'string', name: 'href', label: 'URL Path (e.g. /services/ai-platform/)', ui: { parse: normalizeInternalHref } },
              {
                type: 'boolean',
                name: 'hidden',
                label: 'Hide from menu',
                ui: { description: 'Hide this item without deleting it. Useful for temporary removals.' },
              },
              {
                type: 'object',
                name: 'subLinks',
                label: 'Dropdown Sub-links',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title ?? 'Sub-link' }),
                  description: 'Optional. Adds a dropdown of child links under this menu item.',
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Label' },
                  { type: 'string', name: 'href', label: 'URL Path', ui: { parse: normalizeInternalHref } },
                ],
              },
            ],
          },
        ],
      },

      // ── FOOTER ─────────────────────────────────────────────────────
      {
        label: '🦶 Footer',
        name: 'footer',
        path: 'content/navigation',
        match: { include: 'footer' },
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'ctaHeadline', label: 'CTA Headline (e.g. "Interested? Let\'s Talk!")' },
          {
            type: 'string',
            name: 'ctaDescription',
            label: 'CTA Description',
            ui: { component: 'textarea' },
          },
          {
            type: 'object',
            name: 'offices',
            label: '🏢 Office Locations',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.city ?? 'Office' }) },
            fields: [
              { type: 'string', name: 'country', label: 'Country' },
              { type: 'image', name: 'flagImage', label: 'Country Flag Image' },
              { type: 'string', name: 'city', label: 'Office Label (e.g. USA Office)' },
              { type: 'string', name: 'address', label: 'Address', ui: { component: 'textarea' } },
              { type: 'string', name: 'email', label: 'Email' },
              { type: 'string', name: 'phone', label: 'Phone' },
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: '🌐 Social Links',
            fields: [
              { type: 'string', name: 'twitter', label: 'Twitter / X URL' },
              { type: 'string', name: 'linkedin', label: 'LinkedIn URL' },
              { type: 'string', name: 'facebook', label: 'Facebook URL' },
              { type: 'string', name: 'youtube', label: 'YouTube URL' },
            ],
          },
          {
            type: 'object',
            name: 'legalLinks',
            label: '📄 Legal Links',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.hidden ? '🙈 ' : ''}${item?.title ?? 'Link'}`,
              }),
            },
            fields: [
              { type: 'string', name: 'title', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL Path', ui: { parse: normalizeInternalHref } },
              {
                type: 'boolean',
                name: 'hidden',
                label: 'Hide from footer',
                ui: { description: 'Hide this item without deleting it.' },
              },
            ],
          },
          { type: 'string', name: 'copyrightName', label: 'Copyright Name' },
          { type: 'boolean', name: 'newsletterEnabled', label: 'Show Newsletter Signup' },
          {
            type: 'object',
            name: 'navLinks',
            label: '🔗 Footer Nav Links (Company column)',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.hidden ? '🙈 ' : ''}${item?.title ?? 'Link'}`,
              }),
            },
            fields: [
              { type: 'string', name: 'title', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL Path', ui: { parse: normalizeInternalHref } },
              {
                type: 'boolean',
                name: 'hidden',
                label: 'Hide from footer',
                ui: { description: 'Hide this item without deleting it.' },
              },
              {
                type: 'object',
                name: 'subLinks',
                label: 'Sub-links (indented under this item)',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title ?? 'Sub-link' }),
                  description: 'Optional. Shown indented beneath this item, e.g. blog posts under Blog.',
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Label' },
                  { type: 'string', name: 'href', label: 'URL Path', ui: { parse: normalizeInternalHref } },
                ],
              },
            ],
          },
        ],
      },


      // ── SERVICE PAGES (create / delete enabled) ────────────────────
      {
        label: '📄 Service Pages',
        name: 'servicePage',
        path: 'content/pages/services',
        format: 'json',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ui: {
          allowedActions: { create: true, delete: true },
          // @ts-expect-error itemProps is valid TinaCMS API but not in the TypeScript definitions
          itemProps: (item: any) => ({
            label: `${item?.hidden ? '🙈 ' : ''}${item?.hero?.title || item?.hero?.headline || item?._sys?.filename || 'Page'}`,
          }),
          router: ({ document }: { document: any }) => `/services/${document._sys.filename}`,
        },
        templates: [
          {
            name: 'classic',
            label: '📄 Classic Service Page',
            fields: servicePageFields(),
          },
          {
            name: 'aiPlatform',
            label: '🚀 AI Platform',
            fields: aiPlatformTemplateFields(),
          },
        ],
      },

      // ── ABOUT ──────────────────────────────────────────────────────
      {
        label: 'ℹ️ About',
        name: 'about',
        path: 'content/pages',
        match: { include: 'about' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false }, router: () => '/about' },
        fields: [
          {
            type: 'object', name: 'hero', label: '🖼 Hero',
            fields: [
              { type: 'string', name: 'breadcrumb', label: 'Breadcrumb Text' },
              { type: 'string', name: 'title', label: 'Heading' },
              { type: 'image', name: 'image', label: 'Photo (right side)' },
              { type: 'string', name: 'body', label: 'Body Text (use \\n\\n to separate paragraphs)', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object', name: 'business', label: '📹 Business Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'videoUrl', label: 'YouTube Embed URL' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object', name: 'founders', label: '👥 Founders',
            fields: [
              { type: 'string', name: 'heading', label: 'Section Heading' },
              { type: 'string', name: 'description', label: 'Section Description', ui: { component: 'textarea' } },
              {
                type: 'object', name: 'members', label: 'Team Members', list: true,
                ui: { itemProps: (item: any) => ({ label: item?.name ?? 'Member' }) },
                fields: [
                  { type: 'string', name: 'name', label: 'Full Name' },
                  { type: 'string', name: 'role', label: 'Role / Title' },
                  { type: 'image', name: 'image', label: 'Photo' },
                ],
              },
            ],
          },
          {
            type: 'object', name: 'cta', label: '📣 CTA Box',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'ctaText', label: 'Button Text' },
              { type: 'string', name: 'ctaHref', label: 'Button Link' },
            ],
          },
        ],
      },

      // ── CONTACT ────────────────────────────────────────────────────
      {
        label: '📞 Contact',
        name: 'contact',
        path: 'content/pages',
        match: { include: 'contact' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false }, router: () => '/contact' },
        fields: [
          {
            type: 'object', name: 'hero', label: '🖼 Banner',
            fields: [
              { type: 'string', name: 'breadcrumb', label: 'Breadcrumb' },
              { type: 'string', name: 'title', label: 'Page Title' },
              { type: 'image', name: 'bannerImage', label: 'Banner Image' },
            ],
          },
          {
            type: 'object', name: 'offices', label: '🏢 Offices', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.name ?? 'Office' }) },
            fields: [
              { type: 'string', name: 'name', label: 'Office Name (e.g. India Office)' },
              { type: 'string', name: 'address', label: 'Address', ui: { component: 'textarea' } },
              { type: 'string', name: 'email', label: 'Email' },
              { type: 'string', name: 'phone', label: 'Phone' },
              { type: 'string', name: 'mapsUrl', label: 'Google Maps URL (optional)' },
            ],
          },
          {
            type: 'object', name: 'form', label: '📝 Contact Form',
            fields: [
              { type: 'string', name: 'heading', label: 'Form Heading' },
              { type: 'string', name: 'description', label: 'Form Description', ui: { component: 'textarea' } },
              { type: 'string', name: 'submitText', label: 'Submit Button Text' },
              { type: 'string', name: 'formEndpoint', label: 'Form Submission Endpoint URL' },
            ],
          },
        ],
      },
      // ── SCHEDULE / BOOKING PAGE (/prasanna) ─────────────────────────
      {
        label: '📅 Schedule',
        name: 'schedule',
        path: 'content/pages',
        match: { include: 'schedule' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false }, router: () => '/prasanna' },
        fields: [
          {
            type: 'object', name: 'hero', label: '🖼 Banner',
            fields: [
              { type: 'string', name: 'breadcrumb', label: 'Breadcrumb' },
              { type: 'string', name: 'title', label: 'Page Title' },
              { type: 'image', name: 'bannerImage', label: 'Banner Image' },
            ],
          },
          {
            type: 'object', name: 'booking', label: '📆 Booking Embed',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
              {
                type: 'string', name: 'bookingUrl', label: 'Google Appointment Schedule URL',
                ui: { description: 'Public booking link (calendar.google.com/calendar/appointments/schedules/…). Omit the /u/0/ segment.' },
              },
            ],
          },
        ],
      },
      // ── BLOG POSTS ──────────────────────────────────────────────────
      {
        label: '📝 Blog Posts',
        name: 'blog',
        path: 'data/blog',
        format: 'mdx',
        match: { include: '**/*', exclude: 'deriving-ols-estimator' },
        ui: {
          filename: {
            slugify: (values: any) =>
              (values?.title || 'untitled')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, ''),
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'datetime', name: 'date', label: 'Publish Date', required: true },
          { type: 'datetime', name: 'lastmod', label: 'Last Modified (optional)' },
          {
            type: 'string', name: 'tags', label: 'Tags', list: true,
            ui: { component: 'tags' },
          },
          { type: 'boolean', name: 'draft', label: 'Draft (hidden on site)' },
          { type: 'string', name: 'summary', label: 'Summary / Excerpt', ui: { component: 'textarea' } },
          {
            type: 'image', name: 'images', label: 'Featured Images', list: true,
            description: 'Upload or pick the cover image(s). First image is used as the post cover.',
          },
          {
            type: 'string', name: 'authors', label: 'Authors', list: true,
            description: 'Pick author(s). Values are author file slugs in data/authors.',
            options: [
              { value: 'prasanna-venkatesan', label: 'Prasanna Venkatesan (Founder & CEO)' },
              { value: 'default', label: 'Tails Azimuth (template)' },
              { value: 'sparrowhawk', label: 'Sparrow Hawk (template)' },
            ],
          },
          {
            type: 'string', name: 'layout', label: 'Layout',
            options: [
              { value: 'PostLayout', label: 'Post Layout (with TOC & author)' },
              { value: 'PostSimple', label: 'Post Simple (minimal)' },
              { value: 'PostBanner', label: 'Post Banner (full-width image)' },
            ],
          },
          { type: 'string', name: 'canonicalUrl', label: 'Canonical URL (optional)' },
          seoFields(),
          {
            type: 'string', name: 'faqHeading', label: 'FAQ Section Heading (optional)',
            ui: { description: 'Heading above the FAQ accordion. Defaults to "Frequently Asked Questions". Set it to also list the section in the article TOC.' },
          },
          {
            type: 'object', name: 'faqs', label: '❓ FAQs (for FAQ schema — boosts SEO)', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.question ?? 'FAQ' }) },
            fields: [
              { type: 'string', name: 'question', label: 'Question', required: true },
              { type: 'string', name: 'answer', label: 'Answer', required: true, ui: { component: 'textarea' } },
            ],
          },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      // ── AUTHORS ─────────────────────────────────────────────────────
      {
        label: '👤 Authors',
        name: 'author',
        path: 'data/authors',
        format: 'mdx',
        ui: {
          filename: {
            slugify: (values: any) =>
              (values?.name || 'author')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, ''),
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Name', isTitle: true, required: true },
          { type: 'image', name: 'avatar', label: 'Avatar' },
          { type: 'string', name: 'occupation', label: 'Occupation / Title' },
          { type: 'string', name: 'company', label: 'Company' },
          { type: 'string', name: 'email', label: 'Email' },
          { type: 'string', name: 'twitter', label: 'Twitter / X URL' },
          { type: 'string', name: 'linkedin', label: 'LinkedIn URL' },
          { type: 'string', name: 'github', label: 'GitHub URL' },
          { type: 'string', name: 'bluesky', label: 'Bluesky URL' },
          { type: 'rich-text', name: 'body', label: 'Bio', isBody: true },
        ],
      },
    ],
  },
})
