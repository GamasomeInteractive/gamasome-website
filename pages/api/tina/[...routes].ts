import { TinaNodeBackend, LocalBackendAuthProvider, createDatabase } from '@tinacms/datalayer'
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

// createDatabase wraps the adapter with the .request() method that
// TinaNodeBackend calls. Passing RedisLevel directly causes "c.request is not a function".
const databaseClient = createDatabase({
  gitProvider,
  databaseAdapter,
})

// Custom auth provider — replaces tinacms-authjs (which imports tinacms UI
// and drags in @udecode/plate-* browser-only packages, crashing the server)
// getToken reads the JWT directly from the cookie — more reliable than
// getServerSession which can have side effects with Tina's response object
const customAuthProvider = {
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
}

const tinaBackend = TinaNodeBackend({
  authProvider: isLocal ? LocalBackendAuthProvider() : customAuthProvider,
  databaseClient,
  gitProvider,
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return tinaBackend(req, res)
}

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }
