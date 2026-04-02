import {
  TinaNodeBackend,
  LocalBackendAuthProvider,
  createDatabase,
  resolve,
  FilesystemBridge,
} from '@tinacms/datalayer'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
import { getToken } from 'next-auth/jwt'
import path from 'path'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

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

// FilesystemBridge lets the database read generated schema files from disk
const bridge = new FilesystemBridge(rootPath)

const database = createDatabase({
  gitProvider,
  databaseAdapter,
  bridge,
})

// Seed Redis with schema+content from tina/__generated__ if empty.
// Runs once on cold start. The generated files exist on Vercel because
// tinacms build runs before next build in our build script.
async function ensureIndexed() {
  try {
    const schema = await database.getGraphQLSchema()
    if (schema) return // already indexed
  } catch {
    // not indexed yet — fall through
  }
  console.log('[tina] Redis empty — indexing content from filesystem')
  const generatedDir = path.join(rootPath, 'tina/__generated__')
  const graphQLSchema = JSON.parse(
    fs.readFileSync(path.join(generatedDir, '_graphql.json'), 'utf-8')
  )
  const tinaSchema = JSON.parse(
    fs.readFileSync(path.join(generatedDir, '_schema.json'), 'utf-8')
  )
  const lookup = JSON.parse(
    fs.readFileSync(path.join(generatedDir, '_lookup.json'), 'utf-8')
  )
  await database.indexContent({ graphQLSchema, tinaSchema, lookup })
  console.log('[tina] indexContent complete')
}

// Kick off indexing immediately at module load (cold start)
const indexingPromise = ensureIndexed().catch((err) =>
  console.error('[tina] indexing error:', err)
)

const databaseClient = {
  request: async ({ query, variables }: { query: string; variables: object }) => {
    await indexingPromise
    return resolve({ database, query, variables })
  },
}

const tinaBackend = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : {
        isAuthorized: async (req: NextApiRequest, _res: NextApiResponse) => {
          const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
          if (!token) {
            return { isAuthorized: false, errorCode: 401, errorMessage: 'Unauthorized' }
          }
          if (token.role !== 'user') {
            return { isAuthorized: false, errorCode: 403, errorMessage: 'Forbidden' }
          }
          return { isAuthorized: true }
        },
      },
  databaseClient,
  gitProvider,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return await tinaBackend(req, res)
  } catch (err) {
    console.error('[tina] handler error:', err)
    res.status(500).json({ error: String(err) })
  }
}

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }
