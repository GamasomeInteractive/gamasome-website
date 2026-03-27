import AIPlatformView from './AIPlatformView'
import client from '../../tina/__generated__/client'
import { AiPlatformDocument } from '../../tina/__generated__/types'
import fallback from '../../content/pages/ai-platform.json'

const VARIABLES = { relativePath: 'ai-platform.json' }

async function getData() {
  try {
    return await client.queries.aiPlatform(VARIABLES)
  } catch {
    // TinaCMS GraphQL server not reachable — serve static JSON.
    // We still pass the real query string so useTina can activate
    // the visual editor once the iframe connects.
    return {
      data: { aiPlatform: fallback as any },
      query: AiPlatformDocument,
      variables: VARIABLES,
    }
  }
}

export default async function AIPlatformPage() {
  const { data, query, variables } = await getData()
  return <AIPlatformView data={data} query={query} variables={variables} />
}
