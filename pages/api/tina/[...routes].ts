import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'

// The generated databaseClient from tinacms build — has the .request() method
// tinacms build runs before next build in our build script, so this file exists on Vercel
import databaseClient from '../../../tina/__generated__/client'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const gitProvider = new TinaGitHubProvider({
  branch: process.env.GITHUB_BRANCH || 'main',
  owner: 'GamasomeInteractive',
  repo: 'gamasome-website',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
})

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
