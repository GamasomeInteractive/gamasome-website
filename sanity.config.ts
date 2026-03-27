import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './sanity/schemaTypes'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID'
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'gamasome',
  title: 'Gamasome CMS',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [
    // ── Visual Editor — side-by-side live preview ────────────────────
    presentationTool({
      name: 'presentation',
      title: 'Visual Editor',
      // Points the preview iframe at the local Next.js dev server
      previewUrl: 'http://localhost:3000',
    }),

    structureTool({
      name: 'structure',
      title: 'Content',
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('⚙️  Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('🚀  AI Platform Page')
              .id('aiPlatformPage')
              .child(S.document().schemaType('aiPlatformPage').documentId('aiPlatformPage')),
          ]),
    }),

    visionTool(),
    colorInput(),
  ],

  schema: { types: schemaTypes },
})
