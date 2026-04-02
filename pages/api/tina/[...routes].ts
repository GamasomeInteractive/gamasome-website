import { TinaNodeBackend, LocalBackendAuthProvider, createDatabase, resolve } from '@tinacms/datalayer'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

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

const database = createDatabase({ gitProvider, databaseAdapter })

// Wrap database + resolve into a databaseClient with the .request() interface
// that TinaNodeBackend expects. This keeps everything in-process — no HTTP calls.
const databaseClient = {
  request: async ({ query, variables }: { query: string; variables: object }) => {
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
