// App Router route handler — ESM packages load natively here, no webpack bundling conflicts
import { createDatabase, resolve, FilesystemBridge } from '@tinacms/datalayer'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const runtime = 'nodejs'

const rootPath = process.cwd()

const gitProvider = new TinaGitHubProvider({
  branch: process.env.GITHUB_BRANCH || 'main',
  owner: 'GamasomeInteractive',
  repo: 'gamasome-website',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
})

const databaseAdapter = new RedisLevel({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  namespace: process.env.GITHUB_BRANCH || 'main',
})

const bridge = new FilesystemBridge(rootPath)

const database = createDatabase({ gitProvider, databaseAdapter, bridge })

// Index schema+content into Redis on cold start if empty
async function ensureIndexed() {
  try {
    const schema = await database.getGraphQLSchema()
    if (schema) return
  } catch {}
  console.log('[tina] indexing content into Redis...')
  const generatedDir = path.join(rootPath, 'tina/__generated__')
  const graphQLSchema = JSON.parse(fs.readFileSync(path.join(generatedDir, '_graphql.json'), 'utf-8'))
  const tinaSchema = JSON.parse(fs.readFileSync(path.join(generatedDir, '_schema.json'), 'utf-8'))
  const lookup = JSON.parse(fs.readFileSync(path.join(generatedDir, '_lookup.json'), 'utf-8'))
  await database.indexContent({ graphQLSchema, tinaSchema, lookup })
  console.log('[tina] indexing complete')
}

const indexingPromise = ensureIndexed().catch((err) =>
  console.error('[tina] indexing error:', err)
)

export async function POST(request: NextRequest) {
  // Auth check
  const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'
  if (!isLocal) {
    const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (token.role !== 'user') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { query, variables } = body
  if (!query) {
    return NextResponse.json({ error: 'no query' }, { status: 400 })
  }

  await indexingPromise

  try {
    const result = await resolve({
      config: { useRelativeMedia: true },
      database,
      query,
      variables: variables || {},
    })
    return NextResponse.json(result)
  } catch (err) {
    console.error('[tina] resolve error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
