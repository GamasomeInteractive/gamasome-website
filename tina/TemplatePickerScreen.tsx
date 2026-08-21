import React, { useState, useEffect, useCallback } from 'react'
import { TEMPLATES, formatSlug } from '../lib/templates'

export function TemplatePickerIcon() {
  return React.createElement('span', { style: { fontSize: '1.1em', lineHeight: 1 } }, '⊞')
}

interface PageTemplateMap { [slug: string]: string }

// ── Inline CSS mini-previews ──────────────────────────────────────────
function ClassicPreview() {
  return (
    <div style={{ height: '100%', background: '#fff', padding: 10, display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ borderRadius: 5, height: 28, background: '#07091B', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
        <div style={{ height: 6, width: 60, borderRadius: 10, background: 'rgba(255,255,255,0.7)' }} />
      </div>
      {[0, 1].map(i => (
        <div key={i} style={{ display: 'flex', gap: 6, flexDirection: i % 2 === 1 ? 'row-reverse' : 'row', background: '#F9FBFF', borderRadius: 5, padding: 6 }}>
          <div style={{ width: 44, height: 32, borderRadius: 4, background: '#e2e8f0', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
            <div style={{ height: 5, borderRadius: 10, background: '#374151', width: '70%' }} />
            <div style={{ height: 3, borderRadius: 10, background: '#9ca3af', width: '100%' }} />
            <div style={{ height: 3, borderRadius: 10, background: '#9ca3af', width: '85%' }} />
            <div style={{ height: 10, width: 36, borderRadius: 10, background: '#2D9CDB', marginTop: 2 }} />
          </div>
        </div>
      ))}
      <div style={{ borderRadius: 5, height: 20, background: '#2D9CDB', display: 'flex', gap: 4, alignItems: 'center', padding: '0 6px' }}>
        {[1,2,3,4].map(j => <div key={j} style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.3)' }} />)}
      </div>
    </div>
  )
}

function GridPreview() {
  return (
    <div style={{ height: '100%', background: '#F8FAFC', padding: 10, display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ borderRadius: 5, height: 28, background: '#07091B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <div style={{ height: 5, width: 56, borderRadius: 10, background: 'rgba(255,255,255,0.85)' }} />
        <div style={{ height: 3, width: 40, borderRadius: 10, background: 'rgba(255,255,255,0.4)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, flex: 1 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ borderRadius: 6, background: '#fff', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ height: 3, background: 'linear-gradient(to right,#2D9CDB,#00FCE2)' }} />
            <div style={{ padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 18, borderRadius: 4, background: '#f1f5f9' }} />
              <div style={{ height: 3, borderRadius: 10, background: '#d1d5db', width: '100%' }} />
              <div style={{ height: 3, borderRadius: 10, background: '#d1d5db', width: '80%' }} />
              <div style={{ height: 8, width: 24, borderRadius: 10, background: '#2D9CDB', marginTop: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DarkPreview() {
  const A = '#00FCE2', C = '#0D1130', B = '#07091B'
  return (
    <div style={{ height: '100%', background: B, padding: 10, display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ borderRadius: 5, height: 28, background: B, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8px' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `linear-gradient(${A}44 1px,transparent 1px),linear-gradient(90deg,${A}44 1px,transparent 1px)`, backgroundSize: '10px 10px' }} />
        <div style={{ height: 2, width: 20, borderRadius: 2, background: A, boxShadow: `0 0 4px ${A}`, marginBottom: 4 }} />
        <div style={{ height: 5, width: 56, borderRadius: 10, background: 'rgba(255,255,255,0.8)' }} />
        <div style={{ height: 3, width: 40, borderRadius: 10, background: 'rgba(255,255,255,0.35)', marginTop: 3 }} />
      </div>
      {[0, 1].map(i => (
        <div key={i} style={{ display: 'flex', gap: 5, flexDirection: i % 2 === 1 ? 'row-reverse' : 'row' }}>
          <div style={{ width: 44, height: 28, borderRadius: 5, background: C, border: `1px solid ${A}30`, boxShadow: `0 0 5px ${A}15`, flexShrink: 0 }} />
          <div style={{ flex: 1, borderRadius: 5, padding: '5px 7px', background: C, border: `1px solid ${A}18`, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
            <div style={{ height: 2, width: 16, borderRadius: 2, background: A }} />
            <div style={{ height: 4, borderRadius: 10, background: 'rgba(255,255,255,0.6)', width: '70%' }} />
            <div style={{ height: 3, borderRadius: 10, background: 'rgba(255,255,255,0.22)', width: '100%' }} />
          </div>
        </div>
      ))}
      <div style={{ borderRadius: 5, height: 18, background: C, border: `1px solid ${A}28`, display: 'flex', gap: 4, alignItems: 'center', padding: '0 6px' }}>
        {[1,2,3,4].map(j => <div key={j} style={{ width: 10, height: 10, borderRadius: 3, background: `${A}18`, border: `1px solid ${A}35` }} />)}
      </div>
    </div>
  )
}

const PREVIEWS: Record<string, React.FC> = { classic: ClassicPreview, grid: GridPreview, dark: DarkPreview }

export function TemplatePickerScreen() {
  const [pages, setPages]           = useState<PageTemplateMap>({})
  const [saving, setSaving]         = useState(false)
  const [savedMsg, setSavedMsg]     = useState('')
  const [activeSlug, setActiveSlug] = useState<string>('')

  const load = useCallback(async () => {
    const res = await fetch('/api/template')
    const json = (await res.json()) as { pages: Record<string, string> }
    setPages(json.pages)
    setActiveSlug((prev) => prev || Object.keys(json.pages)[0] || '')
  }, [])

  useEffect(() => { load() }, [load])

  const apply = async (pageSlugs: string[] | 'all', templateId: string) => {
    setSaving(true); setSavedMsg('')
    try {
      await fetch('/api/template', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pageSlugs, templateId }) })
      await load()
      const label = pageSlugs === 'all' ? 'All pages' : formatSlug(pageSlugs[0])
      setSavedMsg(`✓ ${label} → ${templateId}`)
      setTimeout(() => setSavedMsg(''), 3000)
    } finally { setSaving(false) }
  }

  const A = '#00FCE2', BG = '#07091B', CARD = '#0D1130'
  const currentTemplate = pages[activeSlug] || 'classic'

  const css = {
    root:     { fontFamily: 'system-ui,-apple-system,sans-serif', minHeight: '100%', background: BG, color: '#fff', overflowY: 'auto' as const },
    header:   { borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky' as const, top: 0, background: BG, zIndex: 50 },
    body:     { padding: '16px 20px 40px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 } as React.CSSProperties,
    pageBtn:  (active: boolean): React.CSSProperties => ({
      width: '100%', textAlign: 'left', borderRadius: 10, padding: '8px 12px',
      background: active ? `${A}18` : CARD,
      border: active ? `1px solid ${A}55` : '1px solid rgba(255,255,255,0.07)',
      color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    }),
    tmplCard: (active: boolean, accent: string): React.CSSProperties => ({
      borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      border: active ? `2px solid ${accent}` : '2px solid rgba(255,255,255,0.08)',
      background: CARD,
      boxShadow: active ? `0 0 20px ${accent}35` : 'none',
      transform: active ? 'translateY(-2px)' : 'none',
      transition: 'all 0.15s',
    }),
  }

  return (
    <div style={css.root}>
      {/* Header */}
      <div style={css.header}>
        <span style={{ fontSize: 22 }}>⊞</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Template Picker</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Choose a layout for each service page</div>
        </div>
      </div>

      <div style={css.body}>
        {/* Left — page list */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Pages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {Object.keys(pages).map(slug => {
              const t = pages[slug] || 'classic'
              const tmpl = TEMPLATES.find(x => x.id === t)
              const isActive = activeSlug === slug
              return (
                <button key={slug} style={css.pageBtn(isActive)} onClick={() => setActiveSlug(slug)}>
                  <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{formatSlug(slug)}</span>
                  {tmpl && (
                    <span style={{ flexShrink: 0, borderRadius: 20, padding: '1px 7px', fontSize: 9, fontWeight: 700, background: `${tmpl.accent}20`, color: tmpl.accent, border: `1px solid ${tmpl.accent}40` }}>
                      {tmpl.emoji}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Apply-all shortcuts */}
          <div style={{ marginTop: 16, borderRadius: 10, padding: 12, background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Apply to ALL</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {TEMPLATES.map(t => (
                <button
                  key={t.id} disabled={saving}
                  onClick={() => apply('all', t.id)}
                  style={{ borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', border: `1px solid ${t.accent}40`, background: `${t.accent}18`, color: t.accent, display: 'flex', alignItems: 'center', gap: 6, opacity: saving ? 0.5 : 1 }}
                >
                  <span>{t.emoji}</span><span>{t.name} — All</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — template cards */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            Template for <span style={{ color: A }}>{formatSlug(activeSlug)}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {TEMPLATES.map(t => {
              const Preview = PREVIEWS[t.id]
              const isSelected = currentTemplate === t.id
              return (
                <button
                  key={t.id} disabled={saving}
                  onClick={() => apply([activeSlug], t.id)}
                  style={{ ...css.tmplCard(isSelected, t.accent), position: 'relative', opacity: saving ? 0.6 : 1 }}
                >
                  {/* ✓ badge */}
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, width: 20, height: 20, borderRadius: '50%', background: t.accent, color: '#000', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                  )}
                  {/* Preview */}
                  <div style={{ height: 120, borderBottom: `1px solid ${isSelected ? `${t.accent}30` : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden' }}>
                    {Preview && <Preview />}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '10px 12px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 14 }}>{t.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: isSelected ? t.accent : '#fff' }}>{t.name}</span>
                      {isSelected && <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, borderRadius: 20, padding: '1px 6px', background: `${t.accent}20`, color: t.accent }}>Active</span>}
                    </div>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, margin: 0 }}>{t.description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Status */}
          <div style={{ marginTop: 14, height: 20, fontSize: 12, color: saving ? 'rgba(255,255,255,0.4)' : A }}>
            {saving ? 'Saving…' : savedMsg}
          </div>
        </div>
      </div>
    </div>
  )
}
