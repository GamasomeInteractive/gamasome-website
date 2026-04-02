import { TinaNodeBackend, LocalBackendAuthProvider, createDatabase } from '@tinacms/datalayer'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

console.log('[tina] ENV check:', {
  GITHUB_BRANCH: process.env.GITHUB_BRANCH || '(missing)',
  UPSTASH_URL: process.env.UPSTASH_REDIS_REST_URL ? 'SET' : 'MISSING',
  UPSTASH_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? 'SET' : 'MISSING',
  GITHUB_PAT: process.env.GITHUB_PERSONAL_ACCESS_TOKEN ? 'SET' : 'MISSING',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
  isLocal,
})

console.log('[tina] Step 1: creating gitProvider')
const gitProvider = new TinaGitHubProvider({
  branch: process.env.GITHUB_BRANCH || 'main',
  owner: 'GamasomeInteractive',
  repo: 'gamasome-website',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
})
console.log('[tina] Step 1: gitProvider OK')

console.log('[tina] Step 2: creating databaseAdapter (RedisLevel)')
const databaseAdapter = new RedisLevel({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  namespace: process.env.GITHUB_BRANCH || 'main',
})
console.log('[tina] Step 2: databaseAdapter OK')

console.log('[tina] Step 3: createDatabase')
const databaseClient = createDatabase({
  gitProvider,
  databaseAdapter,
})
console.log('[tina] Step 3: databaseClient OK, type:', typeof databaseClient, 'request:', typeof (databaseClient as any).request)

console.log('[tina] Step 4: creating TinaNodeBackend')
const tinaBackend = TinaNodeBackend({
  authProvider: isLocal ? LocalBackendAuthProvider() : {
    isAuthorized: async (req: NextApiRequest, _res: NextApiResponse) => {
      console.log('[tina] isAuthorized: checking JWT token')
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
      console.log('[tina] isAuthorized: token =', token ? `role=${token.role}` : 'NULL')
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
console.log('[tina] Step 4: TinaNodeBackend OK')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[tina] handler called:', req.method, req.url, 'body keys:', req.body ? Object.keys(req.body) : 'no body')
  try {
    return await tinaBackend(req, res)
  } catch (err) {
    console.error('[tina] handler error:', err)
    res.status(500).json({ error: String(err) })
  }
}

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }
