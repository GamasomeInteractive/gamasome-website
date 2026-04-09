import { defineConfig } from 'tinacms'
import { VersionHistoryScreen, VersionHistoryIcon } from './VersionHistoryScreen'
import { ThemePickerScreen, ThemePickerIcon } from './ThemePickerScreen'
import { TemplatePickerScreen, TemplatePickerIcon } from './TemplatePickerScreen'

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
          // @ts-expect-error placeholder is valid HTML but not typed in TinaCMS
          placeholder: '1.0',
        },
      },
    ],
  }
}

// ── Shared field groups reused across all service pages ──────────────
function servicePageFields() {
  return [
    { type: 'string' as const, name: 'pageTitle',       label: 'SEO Page Title' },
    { type: 'string' as const, name: 'pageDescription', label: 'SEO Description', ui: { component: 'textarea' } },
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
function aiPlatformTemplateFields() {
  return [
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
        { type: 'string' as const, name: 'backgroundVideoUrl', label: 'Background Video URL (YouTube embed)' },
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
      ],
    },
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
        { type: 'string' as const, name: 'headline', label: 'Headline' },
        { type: 'string' as const, name: 'subtext',  label: 'Sub-text', ui: { component: 'textarea' } },
        { type: 'image'  as const, name: 'backgroundImage', label: 'Background Image' },
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

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'static/images',
      publicFolder: 'public',
      static: true,
    },
  },

  // Override preview URL — images live in git (public/static/images/),
  // not on Tina CDN, so strip the CDN prefix and serve from our own domain.
  ui: {
    previewSrc: ({ src }: { src: string }) => {
      const CDN_RE = /^https:\/\/assets\.tina\.io\/[a-f0-9-]+\//
      return src.replace(CDN_RE, '/')
    },
  },

  schema: {
    collections: [
      // ── GLOBAL SITE SETTINGS ─────────────────────────────────────────
      {
        label: '⚙️ Site Settings',
        name: 'siteSettings',
        path: 'content/settings',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'siteName', label: 'Site Name' },
          { type: 'string', name: 'tagline', label: 'Tagline' },
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
              itemProps: (item) => ({ label: item?.title ?? 'Link' }),
            },
            fields: [
              { type: 'string', name: 'title', label: 'Menu Label' },
              { type: 'string', name: 'href', label: 'URL Path (e.g. /ai-platform)' },
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
            ui: { itemProps: (item) => ({ label: item?.title ?? 'Link' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL Path' },
            ],
          },
          { type: 'string', name: 'copyrightName', label: 'Copyright Name' },
          { type: 'boolean', name: 'newsletterEnabled', label: 'Show Newsletter Signup' },
          {
            type: 'object',
            name: 'navLinks',
            label: '🔗 Footer Nav Links (Company column)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? 'Link' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL Path' },
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
          itemProps: (item: any) => ({ label: item?.hero?.title || item?.hero?.headline || item?._sys?.filename || 'Page' }),
          router: ({ document }: { document: any }) => `/${document._sys.filename}`,
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
      // ── BLOG POSTS ──────────────────────────────────────────────────
      {
        label: '📝 Blog Posts',
        name: 'blog',
        path: 'data/blog',
        format: 'mdx',
        match: { include: '**/*' },
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
            type: 'string', name: 'images', label: 'Featured Images (URLs)', list: true,
          },
          {
            type: 'string', name: 'authors', label: 'Authors', list: true,
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
    ],
  },
})
