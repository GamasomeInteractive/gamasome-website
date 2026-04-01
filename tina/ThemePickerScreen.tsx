import React, { useState, useEffect } from 'react'
import { THEME_PRESETS, ThemePreset } from '../lib/themePresets'

export function ThemePickerIcon() {
  return React.createElement('span', { style: { fontSize: '1.1em', lineHeight: 1 } }, '🎨')
}

export function ThemePickerScreen() {
  const [currentPreset, setCurrentPreset] = useState('dark-cosmic')
  const [applying, setApplying] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  useEffect(() => {
    fetch('/api/theme')
      .then(r => r.json())
      .then(d => setCurrentPreset(d.currentPreset || 'dark-cosmic'))
      .catch(() => {})
  }, [])

  const flash = (msg: string, ok: boolean) => {
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
      if (res.ok) { setCurrentPreset(preset.id); flash(`✓ "${preset.name}" applied!`, true) }
      else flash('Failed to apply theme.', false)
    } catch { flash('Error applying theme.', false) }
    finally { setApplying(null) }
  }

  const S = {
    root: { fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100%', background: '#07091B', color: '#fff', overflowY: 'auto' as const },
    toast: (ok: boolean): React.CSSProperties => ({
      position: 'fixed', top: 16, right: 16, zIndex: 9999,
      background: ok ? '#065F46' : '#7F1D1D',
      border: `1px solid ${ok ? '#10B981' : '#EF4444'}`,
      borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 500, maxWidth: 320,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }),
    header: { borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky' as const, top: 0, background: '#07091B', zIndex: 50 },
    activeBanner: { padding: '10px 24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, padding: '20px 24px' },
    card: (isActive: boolean, accent: string): React.CSSProperties => ({
      borderRadius: 12, overflow: 'hidden',
      border: isActive ? `2px solid ${accent}` : '2px solid rgba(255,255,255,0.07)',
      background: 'rgba(255,255,255,0.03)',
      transform: isActive ? 'translateY(-2px)' : 'none',
      boxShadow: isActive ? `0 6px 24px ${accent}22` : 'none',
      position: 'relative',
    }),
    applyBtn: (isActive: boolean, isApplying: boolean, primary: string): React.CSSProperties => ({
      width: '100%', padding: '8px 0', borderRadius: 7, fontSize: 13, fontWeight: 600,
      cursor: isActive || isApplying ? 'default' : 'pointer',
      border: 'none', transition: 'all 0.2s',
      background: isActive ? 'rgba(0,252,226,0.12)' : isApplying ? 'rgba(255,255,255,0.1)' : primary,
      color: isActive ? '#00FCE2' : '#fff',
    }),
  }

  return (
    <div style={S.root}>
      {toast && <div style={S.toast(toast.ok)}>{toast.msg}</div>}

      {/* Header */}
      <div style={S.header}>
        <span style={{ fontSize: 24 }}>🎨</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Theme Picker</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Apply a full theme to the AI Platform page</div>
        </div>
      </div>

      {/* Active banner */}
      <div style={S.activeBanner}>
        <span style={{ color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active:</span>
        <span style={{ fontWeight: 600 }}>
          {THEME_PRESETS.find(p => p.id === currentPreset)
            ? `${THEME_PRESETS.find(p => p.id === currentPreset)!.emoji} ${THEME_PRESETS.find(p => p.id === currentPreset)!.name}`
            : currentPreset}
        </span>
      </div>

      {/* Cards */}
      <div style={S.grid}>
        {THEME_PRESETS.map(preset => {
          const isActive = preset.id === currentPreset
          const isApplying = applying === preset.id
          const c = preset.colors
          return (
            <div key={preset.id} style={S.card(isActive, c.accentColor)}>
              {isActive && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: c.accentColor, color: c.bgPrimary, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Active
                </div>
              )}
              {/* Color strip */}
              <div style={{ display: 'flex', height: 6 }}>
                {[c.bgPrimary, c.primaryColor, c.accentColor, c.labelColor, c.bgFooter].map((clr, i) => (
                  <div key={i} style={{ flex: 1, background: clr }} />
                ))}
              </div>
              {/* Mini mockup */}
              <div style={{ background: c.bgPrimary, padding: '14px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '18px 18px' }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 80% 40%,${c.primaryColor}20,transparent 65%)` }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, border: `1px solid ${c.accentColor}40`, borderRadius: 20, padding: '1px 7px', marginBottom: 7 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.accentColor }} />
                    <span style={{ fontSize: 8, fontWeight: 700, color: c.labelColor, letterSpacing: '0.12em', textTransform: 'uppercase' }}>AI Platform</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: c.headingColor, lineHeight: 1.2, marginBottom: 2 }}>Intelligence</div>
                  <div style={{ fontSize: 12, fontWeight: 800, background: `linear-gradient(to right,${c.primaryColor},${c.accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 7 }}>That Delivers</div>
                  <div style={{ fontSize: 9, color: c.bodyColor, lineHeight: 1.5, marginBottom: 8, maxWidth: 180 }}>Powering the next generation of AI applications.</div>
                  <div style={{ display: 'inline-block', background: c.primaryColor, color: '#fff', fontSize: 8, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>Get Started →</div>
                </div>
              </div>
              {/* Footer */}
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{preset.emoji} {preset.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, marginBottom: 10 }}>{preset.description}</div>
                {/* Color dots */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                  {[c.primaryColor, c.accentColor, c.labelColor, c.bgPrimary, c.bgFooter].map((clr, i) => (
                    <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: clr, border: '1px solid rgba(255,255,255,0.15)' }} />
                  ))}
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', alignSelf: 'center', marginLeft: 3 }}>{c.fontFamily}</span>
                </div>
                <button onClick={() => applyTheme(preset)} disabled={isActive || isApplying} style={S.applyBtn(isActive, isApplying, c.primaryColor)}>
                  {isActive ? '✓ Currently Active' : isApplying ? 'Applying…' : 'Apply Theme'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ textAlign: 'center', padding: '16px 24px 32px', color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
        Applying a theme writes the colors into the AI Platform typography settings.
      </div>
    </div>
  )
}
