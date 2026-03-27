import { groq } from 'next-sanity'

// ── AI Platform page ─────────────────────────────────────────────────
export const AI_PLATFORM_QUERY = groq`
  *[_type == "aiPlatformPage" && _id == "aiPlatformPage"][0] {
    heroBadge,
    heroHeadline,
    heroHeadlineAccent,
    heroSubheadline,
    heroBackground {
      image { asset->{ url }, alt },
      videoUrl,
      useVideo
    },
    heroPrimaryCta,
    heroSecondaryCta,
    heroThemeOverride {
      primaryColor { hex },
      accentColor  { hex },
      bgColor      { hex }
    },
    stats[] { value, label, sublabel, icon },
    capabilitiesSectionTitle,
    capabilities[] {
      icon,
      image { asset->{ url }, alt },
      title,
      description,
      accentColor { hex },
      demoVideoUrl
    },
    useCasesSectionTitle,
    useCases[] {
      tag,
      title,
      description,
      coverImage { asset->{ url }, alt },
      accentColor { hex },
      media { videoUrl, videoFile { asset->{ url } } }
    },
    processSectionTitle,
    howItWorks[] {
      number,
      title,
      description,
      icon,
      illustration { asset->{ url }, alt }
    },
    ctaHeadline,
    ctaSubtext,
    ctaPrimaryBtn,
    ctaSecondaryBtn,
    ctaBackgroundImage { asset->{ url }, alt },
    seoTitle,
    seoDescription,
    ogImage { asset->{ url } }
  }
`

// ── Site-wide settings ───────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteName,
    tagline,
    logo { asset->{ url } },
    theme {
      primaryColor { hex },
      accentColor  { hex },
      darkBg       { hex },
      cardBg       { hex }
    },
    contactEmail,
    contactPhone,
    social
  }
`
