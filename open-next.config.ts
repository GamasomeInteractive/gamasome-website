import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Minimal config: no incremental cache override, so no R2 bucket is required for
// the first deploy. To enable ISR / on-demand revalidation, import
// `@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache`
// and pass it as `incrementalCache` here, then add the R2 binding in wrangler.jsonc.
export default defineCloudflareConfig()
