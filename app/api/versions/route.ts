import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONTENT = path.join(process.cwd(), 'content')
const VER_DIR = path.join(CONTENT, 'versions')
const MANIFEST = path.join(VER_DIR, 'manifest.json')

interface VersionRecord {
  id: string
  name: string
  description: string
  timestamp: string
  fileCount: number
}

function readManifest(): { versions: VersionRecord[] } {
  if (!fs.existsSync(MANIFEST)) return { versions: [] }
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'))
  } catch {
    return { versions: [] }
  }
}

function writeManifest(data: { versions: VersionRecord[] }) {
  fs.mkdirSync(VER_DIR, { recursive: true })
  fs.writeFileSync(MANIFEST, JSON.stringify(data, null, 2))
}

/** Recursively list all .json files under content/, skipping the versions/ subdir */
function listContentFiles(): string[] {
  const results: string[] = []
  function walk(dir: string, rel: string) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name)
      const relPath = rel ? `${rel}/${entry.name}` : entry.name
      if (entry.isDirectory() && entry.name !== 'versions') walk(abs, relPath)
      else if (entry.isFile() && entry.name.endsWith('.json')) results.push(relPath)
    }
  }
  walk(CONTENT, '')
  return results
}

function devOnly() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }
  return null
}

export async function GET() {
  const guard = devOnly()
  if (guard) return guard
  return NextResponse.json(readManifest())
}

export async function POST(req: NextRequest) {
  const guard = devOnly()
  if (guard) return guard

  const { action, id, name, description } = (await req.json()) as {
    action?: string
    id?: string
    name?: string
    description?: string
  }

  // ── SAVE current content as a new version ──────────────────────────
  if (action === 'save') {
    const m = readManifest()
    const vid = `v${Date.now()}`
    const snapDir = path.join(VER_DIR, vid)
    const files = listContentFiles()

    for (const file of files) {
      const src = path.join(CONTENT, file)
      const dst = path.join(snapDir, file)
      fs.mkdirSync(path.dirname(dst), { recursive: true })
      fs.copyFileSync(src, dst)
    }

    const record: VersionRecord = {
      id: vid,
      name: (name as string)?.trim() || `Version ${m.versions.length + 1}`,
      description: (description as string)?.trim() || '',
      timestamp: new Date().toISOString(),
      fileCount: files.length,
    }
    m.versions.unshift(record) // newest first
    writeManifest(m)
    return NextResponse.json({ ok: true, version: record })
  }

  // ── RESTORE a saved version back to content/ ───────────────────────
  if (action === 'restore') {
    const m = readManifest()
    if (!m.versions.find((v) => v.id === id)) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 })
    }
    const snapDir = path.join(VER_DIR, id as string)
    function copyDir(src: string, dst: string) {
      if (!fs.existsSync(src)) return
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const s = path.join(src, entry.name)
        const d = path.join(dst, entry.name)
        if (entry.isDirectory()) copyDir(s, d)
        else {
          fs.mkdirSync(path.dirname(d), { recursive: true })
          fs.copyFileSync(s, d)
        }
      }
    }
    copyDir(snapDir, CONTENT)
    return NextResponse.json({ ok: true })
  }

  // ── DELETE a saved version ─────────────────────────────────────────
  if (action === 'delete') {
    const m = readManifest()
    const snapDir = path.join(VER_DIR, id as string)
    if (fs.existsSync(snapDir)) fs.rmSync(snapDir, { recursive: true })
    m.versions = m.versions.filter((v) => v.id !== id)
    writeManifest(m)
    return NextResponse.json({ ok: true })
  }

  // ── RESTORE DEFAULTS — resets settings/index.json to factory values ──
  if (action === 'restore-defaults') {
    const defaults = {
      themePreset: 'dark-cosmic',
      siteName: 'Gamasome',
      tagline: 'Bring Intelligence to the Physical World',
      logo: '',
      favicon: '',
      theme: {
        primaryColor: '#2D9CDB',
        accentColor: '#00FCE2',
        darkBg: '#07091B',
        textColor: '#ffffff',
      },
      contact: { email: 'prasanna@gamasome.com', phone: '+91 8012223541' },
      social: { linkedin: '', twitter: '', youtube: '', instagram: '', facebook: '' },
      motion: { easePreset: 'cinematic', durationScale: 1.0, disableAnimations: false },
    }
    const settingsPath = path.join(CONTENT, 'settings', 'index.json')
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true })
    fs.writeFileSync(settingsPath, JSON.stringify(defaults, null, 2) + '\n')
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
