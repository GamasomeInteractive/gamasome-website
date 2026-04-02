import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
import { getServerSession } from 'next-auth/next'
import authOptions from '../../../lib/authOptions'
import type { NextApiRequest, NextApiResponse } from 'next'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const databaseClient = new RedisLevel({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  namespace: process.env.GITHUB_BRANCH || 'main',
})

const gitProvider = new TinaGitHubProvider({
  branch: process.env.GITHUB_BRANCH || 'main',
  owner: 'GamasomeInteractive',
  repo: 'gamasome-website',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
})

// Custom auth provider — replaces tinacms-authjs (which imports tinacms UI
// and drags in @udecode/plate-* browser-only packages, crashing the server)
const customAuthProvider = {
  isAuthorized: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user) {
      return { isAuthorized: false, errorCode: 401, errorMessage: 'Unauthorized' }
    }
    if ((session.user as any).role !== 'user') {
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

export const config = { api: { bodyParser: false } }
