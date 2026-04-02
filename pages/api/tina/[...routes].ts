import type { NextApiRequest, NextApiResponse } from 'next'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

// Lazily initialised — dynamic imports bypass Next.js CJS bundling so
// ESM-only packages (@tinacms/datalayer etc.) load via Node's native loader.
let _backend: ((req: NextApiRequest, res: NextApiResponse) => Promise<void>) | null = null

async function getBackend() {
  if (_backend) return _backend

  const { TinaNodeBackend, LocalBackendAuthProvider } = await import('@tinacms/datalayer')
  const { AuthJsBackendAuthProvider, TinaAuthJSOptions } = await import('tinacms-authjs')
  const { default: GitHubProvider } = await import('next-auth/providers/github')
  const { GitHubProvider: TinaGitHubProvider } = await import('tinacms-gitprovider-github')
  const { Redis } = await import('@upstash/redis')
  const { RedisLevel } = await import('upstash-redis-level')

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

  _backend = TinaNodeBackend({
    authProvider: isLocal
      ? LocalBackendAuthProvider()
      : AuthJsBackendAuthProvider({ authOptions }),
    databaseClient,
    gitProvider,
  })

  return _backend
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const backend = await getBackend()
    return backend(req, res)
  } catch (err) {
    console.error('[tina/gql] handler init error:', err)
    res.status(500).json({ error: 'Tina backend failed to initialise', detail: String(err) })
  }
}

export const config = { api: { bodyParser: false } }
