// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ── GLOBAL SITE SETTINGS ───────────────────────────────────────
      {
        label: "\u2699\uFE0F Site Settings",
        name: "siteSettings",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "siteName", label: "Site Name" },
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "image", name: "logo", label: "Logo Image" },
          { type: "image", name: "favicon", label: "Favicon" },
          {
            type: "object",
            name: "theme",
            label: "\u{1F3A8} Theme Colors",
            fields: [
              {
                type: "string",
                name: "primaryColor",
                label: "Primary Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "accentColor",
                label: "Accent / Cyan Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "darkBg",
                label: "Dark Background Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "textColor",
                label: "Text Color",
                ui: { component: "color" }
              }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "\u{1F4DE} Contact",
            fields: [
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "\u{1F310} Social Links",
            fields: [
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "twitter", label: "Twitter / X URL" },
              { type: "string", name: "youtube", label: "YouTube URL" },
              { type: "string", name: "instagram", label: "Instagram URL" },
              { type: "string", name: "facebook", label: "Facebook URL" }
            ]
          }
        ]
      },
      // ── HEADER / NAVIGATION ────────────────────────────────────────
      {
        label: "\u{1F9ED} Header & Navigation",
        name: "header",
        path: "content/navigation",
        match: { include: "header" },
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "navLinks",
            label: "Navigation Links",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title ?? "Link" })
            },
            fields: [
              { type: "string", name: "title", label: "Menu Label" },
              { type: "string", name: "href", label: "URL Path (e.g. /ai-platform)" }
            ]
          }
        ]
      },
      // ── FOOTER ─────────────────────────────────────────────────────
      {
        label: "\u{1F9B6} Footer",
        name: "footer",
        path: "content/navigation",
        match: { include: "footer" },
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "ctaHeadline", label: `CTA Headline (e.g. "Interested? Let's Talk!")` },
          {
            type: "string",
            name: "ctaDescription",
            label: "CTA Description",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "offices",
            label: "\u{1F3E2} Office Locations",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.city ?? "Office" }) },
            fields: [
              { type: "string", name: "country", label: "Country" },
              { type: "image", name: "flagImage", label: "Country Flag Image" },
              { type: "string", name: "city", label: "Office Label (e.g. USA Office)" },
              { type: "string", name: "address", label: "Address", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "\u{1F310} Social Links",
            fields: [
              { type: "string", name: "twitter", label: "Twitter / X URL" },
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "facebook", label: "Facebook URL" },
              { type: "string", name: "youtube", label: "YouTube URL" }
            ]
          },
          {
            type: "object",
            name: "legalLinks",
            label: "\u{1F4C4} Legal Links",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Link" }) },
            fields: [
              { type: "string", name: "title", label: "Label" },
              { type: "string", name: "href", label: "URL Path" }
            ]
          },
          { type: "string", name: "copyrightName", label: "Copyright Name" },
          { type: "boolean", name: "newsletterEnabled", label: "Show Newsletter Signup" },
          {
            type: "object",
            name: "navLinks",
            label: "\u{1F517} Footer Nav Links (Company column)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Link" }) },
            fields: [
              { type: "string", name: "title", label: "Label" },
              { type: "string", name: "href", label: "URL Path" }
            ]
          }
        ]
      },
      // ── AI PLATFORM PAGE ───────────────────────────────────────────
      {
        label: "\u{1F680} AI Platform Page",
        name: "aiPlatform",
        path: "content/pages",
        match: { include: "ai-platform" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          itemProps: () => ({ label: "AI Platform Page" }),
          router: ({ document }) => `/ai-platform`
        },
        fields: [
          // ── Hero ──────────────────────────────────────────────────
          {
            type: "object",
            name: "hero",
            label: "\u{1F680} Hero Section",
            fields: [
              { type: "string", name: "badge", label: 'Badge Text (e.g. "AI Platform")' },
              { type: "string", name: "headline", label: "Headline (line 1)" },
              {
                type: "string",
                name: "headlineAccent",
                label: "Headline Accent (line 2 \u2014 shown in gradient)"
              },
              {
                type: "string",
                name: "subheadline",
                label: "Sub-headline",
                ui: { component: "textarea" }
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image (optional)"
              },
              {
                type: "string",
                name: "backgroundVideoUrl",
                label: "Background Video URL (YouTube embed \u2014 overrides image)"
              },
              {
                type: "object",
                name: "colors",
                label: "\u{1F3A8} Section Colors (overrides global theme)",
                fields: [
                  {
                    type: "string",
                    name: "primaryColor",
                    label: "Primary Color",
                    ui: { component: "color" }
                  },
                  {
                    type: "string",
                    name: "accentColor",
                    label: "Accent Color",
                    ui: { component: "color" }
                  },
                  {
                    type: "string",
                    name: "bgColor",
                    label: "Background Color",
                    ui: { component: "color" }
                  }
                ]
              },
              {
                type: "object",
                name: "primaryCta",
                label: "Primary Button",
                fields: [
                  { type: "string", name: "text", label: "Button Text" },
                  { type: "string", name: "href", label: "Link URL" }
                ]
              },
              {
                type: "object",
                name: "secondaryCta",
                label: "Secondary Button",
                fields: [
                  { type: "string", name: "text", label: "Button Text" },
                  { type: "string", name: "href", label: "Link URL" }
                ]
              }
            ]
          },
          // ── Stats ─────────────────────────────────────────────────
          {
            type: "object",
            name: "stats",
            label: "\u{1F4CA} Stats Bar",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.value ?? ""} \u2014 ${item?.label ?? "Stat"}` }) },
            fields: [
              { type: "string", name: "value", label: "Value (e.g. 50M+)" },
              { type: "string", name: "label", label: "Label (e.g. Training Samples)" },
              { type: "string", name: "sublabel", label: "Sub-label (e.g. Annotated & Validated)" }
            ]
          },
          // ── Capabilities ──────────────────────────────────────────
          { type: "string", name: "capabilitiesLabel", label: "Capabilities \u2014 Section Label (small text above heading)" },
          { type: "string", name: "capabilitiesTitle", label: "Capabilities \u2014 Section Heading" },
          {
            type: "object",
            name: "capabilities",
            label: "\u26A1 Core Capabilities",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Capability" }) },
            fields: [
              { type: "string", name: "icon", label: "Icon (emoji, e.g. \u{1F441}\uFE0F)" },
              {
                type: "image",
                name: "iconImage",
                label: "Icon Image (replaces emoji \u2014 SVG or PNG)"
              },
              { type: "string", name: "title", label: "Title" },
              {
                type: "rich-text",
                name: "description",
                label: "Description (WYSIWYG)"
              },
              {
                type: "string",
                name: "accentColor",
                label: "Card Accent Color",
                ui: { component: "color" }
              },
              { type: "string", name: "demoVideoUrl", label: "Demo Video URL (YouTube)" }
            ]
          },
          // ── Use Cases ─────────────────────────────────────────────
          { type: "string", name: "useCasesLabel", label: "Use Cases \u2014 Section Label (small text above heading)" },
          { type: "string", name: "useCasesTitle", label: "Use Cases \u2014 Section Heading" },
          {
            type: "object",
            name: "useCases",
            label: "\u{1F30D} Industry Use Cases",
            list: true,
            ui: { itemProps: (item) => ({ label: `[${item?.tag ?? ""}] ${item?.title ?? "Use Case"}` }) },
            fields: [
              { type: "string", name: "tag", label: "Industry Tag (e.g. RETAIL)" },
              { type: "string", name: "title", label: "Title" },
              {
                type: "rich-text",
                name: "description",
                label: "Description (WYSIWYG)"
              },
              { type: "image", name: "coverImage", label: "Cover Image" },
              {
                type: "string",
                name: "accentColor",
                label: "Accent Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "videoUrl",
                label: "Demo Video URL (YouTube embed)"
              }
            ]
          },
          // ── How It Works ──────────────────────────────────────────
          { type: "string", name: "howItWorksLabel", label: "How It Works \u2014 Section Label (small text above heading)" },
          { type: "string", name: "howItWorksTitle", label: "How It Works \u2014 Section Heading" },
          {
            type: "object",
            name: "howItWorks",
            label: "\u{1F504} How It Works",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.number ?? ""} \u2014 ${item?.title ?? "Step"}` }) },
            fields: [
              { type: "string", name: "number", label: "Step Number (01, 02, 03)" },
              { type: "string", name: "title", label: "Step Title" },
              {
                type: "rich-text",
                name: "description",
                label: "Description (WYSIWYG)"
              },
              { type: "image", name: "illustration", label: "Step Illustration" }
            ]
          },
          // ── CTA ───────────────────────────────────────────────────
          {
            type: "object",
            name: "cta",
            label: "\u{1F4E3} CTA Section",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subtext", label: "Sub-text", ui: { component: "textarea" } },
              { type: "image", name: "backgroundImage", label: "Background Image" },
              {
                type: "object",
                name: "primaryBtn",
                label: "Primary Button",
                fields: [
                  { type: "string", name: "text", label: "Text" },
                  { type: "string", name: "href", label: "URL" }
                ]
              },
              {
                type: "object",
                name: "secondaryBtn",
                label: "Secondary Button",
                fields: [
                  { type: "string", name: "text", label: "Text" },
                  { type: "string", name: "href", label: "URL" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
