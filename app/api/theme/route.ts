import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { THEME_PRESETS, getPresetById } from '@/lib/themePresets'

const SETTINGS_PATH = path.join(process.cwd(), 'content/settings/index.json')
const AI_PLATFORM_PATH = path.join(process.cwd(), 'content/pages/ai-platform.json')

export async function GET() {
  const raw = await fs.readFile(SETTINGS_PATH, 'utf-8')
  const settings = JSON.parse(raw)
  return NextResponse.json({
    currentPreset: settings.themePreset || 'dark-cosmic',
    presets: THEME_PRESETS,
  })
}

export async function POST(req: NextRequest) {
  const { presetId } = await req.json()
  const preset = getPresetById(presetId)
  if (!preset) {
    return NextResponse.json({ error: 'Unknown preset id' }, { status: 400 })
  }

  // 1. Update site-settings
  const settings = JSON.parse(await fs.readFile(SETTINGS_PATH, 'utf-8'))
  settings.themePreset = presetId
  settings.theme = {
    primaryColor: preset.colors.primaryColor,
    accentColor: preset.colors.accentColor,
    darkBg: preset.colors.bgPrimary,
    textColor: preset.colors.headingColor,
  }
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n')

  // 2. Write preset colors into ai-platform.json typography so TinaCMS picks them up
  const aiPage = JSON.parse(await fs.readFile(AI_PLATFORM_PATH, 'utf-8'))
  aiPage.typography = { ...(aiPage.typography || {}), ...preset.colors }
  await fs.writeFile(AI_PLATFORM_PATH, JSON.stringify(aiPage, null, 2) + '\n')

  return NextResponse.json({ success: true, preset: preset.id })
}
