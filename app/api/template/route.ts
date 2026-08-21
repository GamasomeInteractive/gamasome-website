import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { TEMPLATES } from '@/lib/templates'

const servicesDir = path.join(process.cwd(), 'content/pages/services')

async function getSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(servicesDir)
    return files.filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
  } catch {
    return []
  }
}

async function readPageTemplate(slug: string): Promise<string> {
  try {
    const raw = await fs.readFile(path.join(servicesDir, `${slug}.json`), 'utf-8')
    return JSON.parse(raw).template || 'classic'
  } catch {
    return 'classic'
  }
}

async function writePageTemplate(slug: string, templateId: string) {
  const filePath = path.join(servicesDir, `${slug}.json`)
  const raw = await fs.readFile(filePath, 'utf-8')
  const data = JSON.parse(raw)
  data.template = templateId
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n')
}

// Local authoring tool only — same guard as app/api/versions/route.ts. Both handlers below
// were reachable unauthenticated in production: GET disclosed internal configuration and
// POST rewrote files under content/ with no authorisation check of any kind.
function devOnly() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }
  return null
}

export async function GET() {
  const guard = devOnly()
  if (guard) return guard
  const slugs = await getSlugs()
  const pages: Record<string, string> = {}
  await Promise.all(
    slugs.map(async (slug) => {
      pages[slug] = await readPageTemplate(slug)
    })
  )
  return NextResponse.json({ pages, templates: TEMPLATES })
}

export async function POST(req: NextRequest) {
  const guard = devOnly()
  if (guard) return guard
  const { pageSlugs, templateId } = (await req.json()) as {
    pageSlugs?: string[] | 'all'
    templateId?: string
  }
  if (typeof templateId !== 'string' || !TEMPLATES.find((t) => t.id === templateId)) {
    return NextResponse.json({ error: 'Unknown template' }, { status: 400 })
  }

  const allSlugs = await getSlugs()
  const slugsToUpdate: string[] =
    pageSlugs === 'all' ? allSlugs : (pageSlugs as string[]).filter((s) => allSlugs.includes(s))

  await Promise.all(slugsToUpdate.map((slug) => writePageTemplate(slug, templateId)))
  return NextResponse.json({ success: true, updated: slugsToUpdate, templateId })
}
