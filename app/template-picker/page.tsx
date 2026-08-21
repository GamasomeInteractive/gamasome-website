'use client'
import { useEffect, useState, useCallback } from 'react'
import { formatSlug } from '@/lib/templates'

interface TemplateDefinition {
  id: string
  name: string
  description: string
  emoji: string
  bg: string
  accent: string
}

interface PageTemplateMap {
  [slug: string]: string
}

// ── Visual mini-preview for each template ────────────────────────────
function ClassicPreview() {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-white p-3">
      {/* Hero */}
      <div
        className="flex h-10 w-full items-center rounded-md px-3"
        style={{ background: '#07091B' }}
      >
        <div className="h-2 w-24 rounded-full bg-white/80" />
      </div>
      {/* Alt rows */}
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`flex gap-2 rounded-md bg-gray-50 p-2 ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
        >
          <div className="h-10 w-16 flex-shrink-0 rounded bg-gray-200" />
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div className="h-1.5 w-3/4 rounded-full bg-gray-800" />
            <div className="h-1 w-full rounded-full bg-gray-400" />
            <div className="h-1 w-5/6 rounded-full bg-gray-400" />
            <div className="mt-1 h-4 w-16 rounded-full" style={{ background: '#2D9CDB' }} />
          </div>
        </div>
      ))}
      {/* Tech bar */}
      <div
        className="flex h-8 items-center gap-1 rounded-md px-2"
        style={{ background: '#2D9CDB' }}
      >
        {[1, 2, 3, 4].map((j) => (
          <div key={j} className="h-4 w-4 flex-shrink-0 rounded bg-white/30" />
        ))}
      </div>
    </div>
  )
}

function GridPreview() {
  return (
    <div
      className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg p-3"
      style={{ background: '#F8FAFC' }}
    >
      {/* Hero centered */}
      <div
        className="flex h-10 w-full flex-col items-center justify-center gap-1 rounded-md"
        style={{ background: '#07091B' }}
      >
        <div className="h-1.5 w-20 rounded-full bg-white/90" />
        <div className="h-1 w-14 rounded-full bg-white/50" />
      </div>
      {/* 3-col card grid */}
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(to right,#2D9CDB,#00FCE2)' }}
            />
            <div className="flex flex-col gap-1 p-1.5">
              <div className="h-6 rounded bg-gray-100" />
              <div className="h-1 w-full rounded-full bg-gray-300" />
              <div className="h-1 w-4/5 rounded-full bg-gray-300" />
              <div className="mt-0.5 h-3 w-8 rounded-full" style={{ background: '#2D9CDB' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DarkPreview() {
  const ACCENT = '#00FCE2'
  const CARD = '#0D1130'
  const BG = '#07091B'
  return (
    <div
      className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg p-3"
      style={{ background: BG }}
    >
      {/* Hero */}
      <div
        className="relative flex h-10 w-full flex-col justify-center overflow-hidden rounded-md px-3"
        style={{ background: BG }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#2D9CDB33 1px,transparent 1px),linear-gradient(90deg,#2D9CDB33 1px,transparent 1px)`,
            backgroundSize: '12px 12px',
          }}
        />
        <div
          className="mb-1 h-0.5 w-6 rounded"
          style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
        />
        <div className="h-2 w-20 rounded-full bg-white/80" />
        <div className="mt-0.5 h-1 w-14 rounded-full bg-white/40" />
      </div>
      {/* Glowing cards */}
      {[0, 1].map((i) => (
        <div key={i} className={`flex gap-1.5 ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}>
          <div
            className="h-10 w-16 flex-shrink-0 rounded-lg"
            style={{
              background: CARD,
              border: `1px solid ${ACCENT}30`,
              boxShadow: `0 0 6px ${ACCENT}20`,
            }}
          />
          <div
            className="flex flex-1 flex-col justify-center gap-1 rounded-lg p-2"
            style={{ background: CARD, border: `1px solid ${ACCENT}20` }}
          >
            <div className="h-0.5 w-4 rounded" style={{ background: ACCENT }} />
            <div className="h-1.5 w-3/4 rounded-full bg-white/60" />
            <div
              className="h-1 w-full rounded-full"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            />
          </div>
        </div>
      ))}
      {/* Neon tech row */}
      <div
        className="flex h-7 items-center gap-1 rounded-md px-2"
        style={{ background: CARD, border: `1px solid ${ACCENT}30` }}
      >
        {[1, 2, 3, 4].map((j) => (
          <div
            key={j}
            className="h-4 w-4 flex-shrink-0 rounded"
            style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
          />
        ))}
      </div>
    </div>
  )
}

const PREVIEWS: Record<string, React.FC> = {
  classic: ClassicPreview,
  grid: GridPreview,
  dark: DarkPreview,
}

// ── Main page ─────────────────────────────────────────────────────────
export default function TemplatePickerPage() {
  const [templates, setTemplates] = useState<TemplateDefinition[]>([])
  const [pages, setPages] = useState<PageTemplateMap>({})
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await fetch('/api/template')
    const json = (await res.json()) as {
      templates: TemplateDefinition[]
      pages: Record<string, string>
    }
    setTemplates(json.templates)
    setPages(json.pages)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function apply(pageSlugs: string[] | 'all', templateId: string) {
    setSaving(true)
    setSavedMsg('')
    try {
      await fetch('/api/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageSlugs, templateId }),
      })
      await load()
      const label = pageSlugs === 'all' ? 'All pages' : formatSlug(pageSlugs[0])
      setSavedMsg(`✓ ${label} → ${templateId}`)
      setTimeout(() => setSavedMsg(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  const ACCENT = '#00FCE2'
  const BG = '#07091B'
  const CARD = '#0D1130'

  const allSlugs = Object.keys(pages)
  const focusedPage = activeSlug ?? allSlugs[0] ?? ''
  const currentTemplate = pages[focusedPage] || 'classic'

  return (
    <div className="min-h-screen font-['Poppins']" style={{ background: BG, color: '#fff' }}>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="mb-2 h-[3px] w-12 rounded" style={{ background: ACCENT }} />
          <h1 className="text-3xl font-bold text-white">Template Picker</h1>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Select a page, then click a template to preview &amp; apply.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* ── Page list ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <p
              className="mb-1 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Pages
            </p>
            {allSlugs.map((slug) => {
              const t = pages[slug] || 'classic'
              const tmpl = templates.find((x) => x.id === t)
              const isActive = focusedPage === slug
              return (
                <button
                  key={slug}
                  onClick={() => setActiveSlug(slug)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition"
                  style={{
                    background: isActive ? `${ACCENT}18` : CARD,
                    border: isActive ? `1px solid ${ACCENT}60` : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span className="text-sm leading-snug font-medium text-white">
                    {formatSlug(slug)}
                  </span>
                  {tmpl && (
                    <span
                      className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{
                        background: `${tmpl.accent}22`,
                        color: tmpl.accent,
                        border: `1px solid ${tmpl.accent}50`,
                      }}
                    >
                      {tmpl.emoji} {tmpl.name}
                    </span>
                  )}
                </button>
              )
            })}

            {/* Apply all shortcut */}
            <div
              className="mt-4 rounded-xl p-4"
              style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="mb-3 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Apply to ALL pages
              </p>
              <div className="flex flex-col gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    disabled={saving}
                    onClick={() => apply('all', t.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition hover:opacity-90 disabled:opacity-40"
                    style={{
                      background: `${t.accent}22`,
                      color: t.accent,
                      border: `1px solid ${t.accent}40`,
                    }}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.name} — All</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Template cards ───────────────────────────────────────── */}
          <div>
            <p
              className="mb-3 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Templates for&nbsp;
              <span style={{ color: ACCENT }}>{formatSlug(focusedPage)}</span>
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {templates.map((t) => {
                const Preview = PREVIEWS[t.id]
                const isSelected = currentTemplate === t.id
                return (
                  <button
                    key={t.id}
                    disabled={saving}
                    onClick={() => apply([focusedPage], t.id)}
                    className="group relative flex flex-col overflow-hidden rounded-2xl text-left transition-all hover:-translate-y-1 disabled:opacity-50"
                    style={{
                      border: isSelected
                        ? `2px solid ${t.accent}`
                        : '2px solid rgba(255,255,255,0.08)',
                      boxShadow: isSelected ? `0 0 24px ${t.accent}40` : 'none',
                      background: CARD,
                    }}
                  >
                    {/* Visual preview */}
                    <div
                      className="relative h-40 w-full overflow-hidden rounded-t-xl border-b"
                      style={{
                        borderColor: isSelected ? `${t.accent}40` : 'rgba(255,255,255,0.06)',
                      }}
                    >
                      {Preview && <Preview />}
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                          style={{ background: t.accent, color: '#000' }}
                        >
                          ✓
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-1 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{t.emoji}</span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: isSelected ? t.accent : '#fff' }}
                        >
                          {t.name}
                        </span>
                        {isSelected && (
                          <span
                            className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold"
                            style={{ background: `${t.accent}22`, color: t.accent }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        {t.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Status */}
            <div className="mt-5 h-6">
              {saving && (
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Saving…
                </p>
              )}
              {savedMsg && (
                <p className="text-sm" style={{ color: ACCENT }}>
                  {savedMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
