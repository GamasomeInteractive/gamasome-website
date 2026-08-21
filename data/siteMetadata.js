// Site-wide SEO defaults live in content/settings/index.json -> globalSeo so they are
// editable in the CMS and defined in exactly one place. That block used to be dead config:
// nothing read it, while the hardcoded values here were what actually rendered, so correct
// values entered in the CMS had no effect. The fields below now derive from it.
const settings = require('../content/settings/index.json')
const globalSeo = settings.globalSeo || {}

/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: globalSeo.defaultTitle || 'Gamasome',
  // Appended by the title template in app/layout.tsx, e.g. '%s | Gamasome'.
  titleSuffix: globalSeo.titleSuffix || ' | Gamasome',
  description: globalSeo.defaultDescription || '',
  author: 'Gamasome',
  headerTitle: '',
  language: 'en-us',
  theme: 'light', // system, dark or light
  siteUrl: 'https://www.gamasome.com',
  siteRepo: 'https://github.com/GamasomeInteractive/gamasome-website',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}${globalSeo.defaultOgImage || '/static/images/logo.png'}`,
  // Only accounts that are actually maintained. The starter template's placeholder
  // profiles (github.com, facebook.com, instagram.com, mastodon, threads, medium,
  // bluesky) and the malformed 'mailto@gamasome.com' address were removed — they were
  // never rendered (footer icons read content/navigation/footer.json) but they seeded
  // the Organization schema and read as broken wherever they surfaced.
  email: settings.contact?.email || 'prasanna@gamasome.com',
  x: 'https://x.com/gamasome',
  twitterHandle: globalSeo.twitterHandle || '@gamasome',
  youtube: 'https://www.youtube.com/@gamasomeinteractive3967',
  linkedin: 'https://www.linkedin.com/company/gamasome/',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: managed via CMS → Site Settings → Analytics
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
