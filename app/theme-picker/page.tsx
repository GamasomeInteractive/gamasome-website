'use client'
import { useState, useEffect } from 'react'
import { THEME_PRESETS, ThemePreset } from '@/lib/themePresets'

export default function ThemePickerPage() {
  const [currentPreset, setCurrentPreset] = useState<string>('dark-cosmic')
  const [applying, setApplying] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  // Load current preset on mount
  useEffect(() => {
    fetch('/api/theme')
      .then((r) => r.json())
      .then((d) => setCurrentPreset(d.currentPreset || 'dark-cosmic'))
      .catch(() => {})
  }, [])

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const applyTheme = async (preset: ThemePreset) => {
    setApplying(preset.id)
    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId: preset.id }),
      })
      if (res.ok) {
        setCurrentPreset(preset.id)
        showToast(`✓ "${preset.name}" applied! Refresh the site to preview.`, true)
      } else {
        showToast('Failed to apply theme.', false)
      }
    } catch {
      showToast('Error applying theme.', false)
    } finally {
      setApplying(null)
    }
  }

  return (
    <div
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#07091B', color: '#fff' }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed', top: 20, right: 20, zIndex: 9999,
            background: toast.ok ? '#065F46' : '#7F1D1D',
            border: `1px solid ${toast.ok ? '#10B981' : '#EF4444'}`,
            borderRadius: 8, padding: '12px 18px',
            fontSize: 14, fontWeight: 500, maxWidth: 340,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.3s',
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07091B', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 28 }}>🎨</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Theme Picker</h1>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              Select a theme to apply to your AI Platform page
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a
            href="/ai-platform"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: '#00FCE2', textDecoration: 'none', padding: '6px 14px', border: '1px solid #00FCE230', borderRadius: 6, transition: 'all 0.2s' }}
          >
            Preview Site ↗
          </a>
          <a
            href="/admin/index.html"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}
          >
            ← Back to CMS
          </a>
        </div>
      </div>

      {/* Active banner */}
      <div style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Currently active:</span>
        {(() => {
          const active = THEME_PRESETS.find((p) => p.id === currentPreset)
          return active ? (
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
              {active.emoji} {active.name}
            </span>
          ) : null
        })()}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          Applying a theme overwrites the Typography colors on the AI Platform page.
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: 20,
          padding: '28px 32px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {THEME_PRESETS.map((preset) => {
          const isActive = preset.id === currentPreset
          const isApplying = applying === preset.id
          const c = preset.colors

          return (
            <div
              key={preset.id}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: isActive ? `2px solid ${c.accentColor}` : '2px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                transform: isActive ? 'translateY(-2px)' : 'none',
                boxShadow: isActive ? `0 8px 32px ${c.accentColor}22` : 'none',
                position: 'relative',
              }}
            >
              {/* Active badge */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 10,
                    background: c.accentColor, color: c.bgPrimary,
                    fontSize: 10, fontWeight: 700, padding: '3px 8px',
                    borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}
                >
                  Active
                </div>
              )}

              {/* Color strip */}
              <div style={{ display: 'flex', height: 8 }}>
                {[c.bgPrimary, c.primaryColor, c.accentColor, c.labelColor, c.bgFooter].map((clr, i) => (
                  <div key={i} style={{ flex: 1, background: clr }} />
                ))}
              </div>

              {/* Mini site mockup */}
              <div
                style={{
                  background: c.bgPrimary,
                  padding: '18px 16px',
                  borderBottom: `1px solid rgba(255,255,255,0.06)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle grid bg */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 80% 40%, ${c.primaryColor}20, transparent 65%)` }} />

                {/* Mockup content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1px solid ${c.accentColor}40`, borderRadius: 20, padding: '2px 8px', marginBottom: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.accentColor }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: c.labelColor, letterSpacing: '0.15em', textTransform: 'uppercase' }}>AI Platform</span>
                  </div>
                  {/* Heading */}
                  <div style={{ fontSize: 14, fontWeight: 800, color: c.headingColor, lineHeight: 1.2, marginBottom: 3 }}>
                    Intelligence
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, background: `linear-gradient(to right, ${c.primaryColor}, ${c.accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
                    That Delivers
                  </div>
                  {/* Body text */}
                  <div style={{ fontSize: 10, color: c.bodyColor, lineHeight: 1.5, marginBottom: 10, maxWidth: 200 }}>
                    Powering the next generation of AI applications for enterprise and beyond.
                  </div>
                  {/* CTA button */}
                  <div style={{ display: 'inline-block', background: c.primaryColor, color: '#fff', fontSize: 9, fontWeight: 700, padding: '5px 12px', borderRadius: 20, letterSpacing: '0.05em' }}>
                    Get Started →
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                      {preset.emoji} {preset.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
                      {preset.description}
                    </div>
                  </div>
                </div>

                {/* Color dots row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12, marginTop: 10 }}>
                  {[
                    { label: 'Primary', color: c.primaryColor },
                    { label: 'Accent', color: c.accentColor },
                    { label: 'Label', color: c.labelColor },
                    { label: 'BG', color: c.bgPrimary },
                    { label: 'Footer', color: c.bgFooter },
                  ].map(({ label, color }) => (
                    <div key={label} title={`${label}: ${color}`} style={{ width: 18, height: 18, borderRadius: 4, background: color, border: '1px solid rgba(255,255,255,0.15)', cursor: 'default', flexShrink: 0 }} />
                  ))}
                  <span style={{ marginLeft: 4, fontSize: 10, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                    {c.fontFamily}
                  </span>
                </div>

                {/* Apply button */}
                <button
                  onClick={() => applyTheme(preset)}
                  disabled={isActive || isApplying}
                  style={{
                    width: '100%',
                    padding: '9px 0',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: isActive || isApplying ? 'default' : 'pointer',
                    border: 'none',
                    transition: 'all 0.2s',
                    background: isActive
                      ? `${c.accentColor}20`
                      : isApplying
                      ? 'rgba(255,255,255,0.1)'
                      : c.primaryColor,
                    color: isActive ? c.accentColor : '#fff',
                    letterSpacing: '0.02em',
                  }}
                >
                  {isActive ? '✓ Currently Active' : isApplying ? 'Applying…' : 'Apply Theme'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div style={{ textAlign: 'center', padding: '24px 32px 40px', color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
        Applying a theme updates the Typography colors in the TinaCMS AI Platform collection.
        You can still fine-tune individual colors via the CMS sidebar after applying.
      </div>
    </div>
  )
}
