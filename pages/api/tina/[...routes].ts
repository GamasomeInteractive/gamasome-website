import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from 'tinacms-authjs'
import GitHubProvider from 'next-auth/providers/github'
import { GitHubProvider as TinaGitHubProvider } from 'tinacms-gitprovider-github'
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'
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

const authOptions = TinaAuthJSOptions({
  databaseClient,
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
})

const tinaBackend = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({ authOptions }),
  databaseClient,
  gitProvider,
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return tinaBackend(req, res)
}

export const config = { api: { bodyParser: false } }
