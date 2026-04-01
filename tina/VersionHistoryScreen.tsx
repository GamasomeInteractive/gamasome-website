import React, { useState, useEffect, useCallback } from 'react'

export function VersionHistoryIcon() {
  return React.createElement('span', { style: { fontSize: '1.1em', lineHeight: 1 } }, '🕐')
}

interface Version {
  id: string
  name: string
  description: string
  timestamp: string
  fileCount: number
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

export function VersionHistoryScreen() {
  const [versions, setVersions]       = useState<Version[]>([])
  const [loading, setLoading]         = useState(true)
  const [saveName, setSaveName]       = useState('')
  const [saveDesc, setSaveDesc]       = useState('')
  const [saving, setSaving]           = useState(false)
  const [busyId, setBusyId]           = useState<string | null>(null)
  const [confirmRestore, setConfirmRestore]         = useState<Version | null>(null)
  const [confirmDelete, setConfirmDelete]           = useState<Version | null>(null)
  const [confirmRestoreDefaults, setConfirmRestoreDefaults] = useState(false)
  const [toast, setToast]             = useState<{ msg: string; ok: boolean } | null>(null)

  const flash = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 4000)
  }

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/versions')
      const d = await res.json()
      setVersions(d.versions || [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])
  useEffect(() => {
    if (!loading && versions.length === 0 && !saveName) setSaveName('Version 1 (Default)')
  }, [loading, versions.length]) // eslint-disable-line

  const handleSave = async () => {
    const n = saveName.trim(); if (!n) return
    setSaving(true)
    try {
      const res = await fetch('/api/versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', name: n, description: saveDesc.trim() }) })
      if (res.ok) { setSaveName(''); setSaveDesc(''); await load(); flash(`"${n}" saved`) }
      else flash('Save failed', false)
    } finally { setSaving(false) }
  }

  const handleRestore = async (ver: Version) => {
    setConfirmRestore(null); setBusyId(ver.id)
    try {
      const res = await fetch('/api/versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'restore', id: ver.id }) })
      if (res.ok) flash(`Restored "${ver.name}" — reload the editor to see changes`)
      else flash('Restore failed', false)
    } finally { setBusyId(null) }
  }

  const handleDelete = async (ver: Version) => {
    setConfirmDelete(null); setBusyId(ver.id)
    try {
      const res = await fetch('/api/versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id: ver.id }) })
      if (res.ok) { await load(); flash(`"${ver.name}" deleted`) }
      else flash('Delete failed', false)
    } finally { setBusyId(null) }
  }

  const handleRestoreDefaults = async () => {
    setConfirmRestoreDefaults(false); setBusyId('__defaults__')
    try {
      const res = await fetch('/api/versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'restore-defaults' }) })
      if (res.ok) flash('Settings restored to factory defaults — reload to see changes')
      else flash('Restore failed', false)
    } finally { setBusyId(null) }
  }

  const css = {
    root:    { fontFamily: 'system-ui,-apple-system,sans-serif', minHeight: '100%', background: '#07091B', color: '#fff', overflowY: 'auto' as const },
    header:  { borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky' as const, top: 0, background: '#07091B', zIndex: 50 },
    body:    { maxWidth: 640, margin: '0 auto', padding: '24px 24px 40px' },
    card:    { borderRadius: 14, border: '1px solid rgba(255,255,255,0.09)', background: '#0D1127', padding: 20 },
    input:   { width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', padding: '9px 14px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' as const },
    btn: (variant: 'primary'|'danger'|'ghost'): React.CSSProperties => ({
      borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
      background: variant === 'primary' ? '#2D9CDB' : variant === 'danger' ? '#DC2626' : 'transparent',
      color: variant === 'ghost' ? 'rgba(255,255,255,0.4)' : '#fff',
      ...(variant === 'ghost' ? { border: '1px solid rgba(255,255,255,0.1)' } : {}),
    }),
    overlay: { position: 'fixed' as const, inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
    dialog:  { background: '#0D1127', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28, maxWidth: 420, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' },
    versionRow: { borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  }

  return (
    <div style={css.root}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, background: toast.ok ? '#00FCE2' : '#DC2626', color: toast.ok ? '#000' : '#fff', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, maxWidth: 320, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          {toast.msg}
        </div>
      )}

      {/* Confirm Restore */}
      {confirmRestore && (
        <div style={css.overlay}>
          <div style={css.dialog}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Restore "{confirmRestore.name}"?</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 20 }}>
              This overwrites <strong style={{ color: '#fff' }}>{confirmRestore.fileCount} content files</strong> with the saved snapshot. Changes after this version will be lost.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button style={css.btn('ghost')} onClick={() => setConfirmRestore(null)}>Cancel</button>
              <button style={css.btn('primary')} onClick={() => handleRestore(confirmRestore)} disabled={busyId === confirmRestore.id}>
                {busyId === confirmRestore.id ? 'Restoring…' : '↩ Restore'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Restore Defaults */}
      {confirmRestoreDefaults && (
        <div style={css.overlay}>
          <div style={css.dialog}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>↺ Restore Default Settings?</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 8 }}>
              This will reset <strong style={{ color: '#fff' }}>Site Settings</strong> (theme, motion, contact, social) back to factory defaults.
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)', lineHeight: 1.5, marginBottom: 20 }}>
              ⚠ Page content, navigation, and service pages are <strong style={{ color: 'rgba(255,100,100,1)' }}>not affected</strong>. Consider saving a snapshot first.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button style={css.btn('ghost')} onClick={() => setConfirmRestoreDefaults(false)}>Cancel</button>
              <button style={{ ...css.btn('danger'), display: 'flex', alignItems: 'center', gap: 6 }} onClick={handleRestoreDefaults} disabled={busyId === '__defaults__'}>
                {busyId === '__defaults__' ? 'Resetting…' : '↺ Yes, Restore Defaults'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div style={css.overlay}>
          <div style={css.dialog}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Delete "{confirmDelete.name}"?</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 20 }}>
              This snapshot will be permanently removed and cannot be recovered.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button style={css.btn('ghost')} onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button style={css.btn('danger')} onClick={() => handleDelete(confirmDelete)} disabled={busyId === confirmDelete.id}>
                {busyId === confirmDelete.id ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={css.header}>
        <span style={{ fontSize: 24 }}>🕐</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Version History</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Save &amp; restore named snapshots of all content files</div>
        </div>
      </div>

      <div style={css.body}>
        {/* Save form */}
        <div style={css.card}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Save Current State</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Takes a snapshot of all content files right now.</div>
          <input
            style={css.input}
            type="text"
            placeholder="Version name — e.g. Before homepage redesign…"
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          <textarea
            style={{ ...css.input, marginTop: 8, resize: 'none' as const, height: 56 }}
            placeholder="Description (optional)"
            value={saveDesc}
            onChange={e => setSaveDesc(e.target.value)}
            rows={2}
          />
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{ ...css.btn('primary'), opacity: !saveName.trim() || saving ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={handleSave}
              disabled={!saveName.trim() || saving}
            >
              {saving ? 'Saving…' : '💾 Save Version'}
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
            Saved Snapshots {!loading && versions.length > 0 && `(${versions.length})`}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading…</div>
          ) : versions.length === 0 ? (
            <div style={{ borderRadius: 14, border: '1px dashed rgba(255,255,255,0.08)', padding: '48px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📂</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>No versions saved yet.</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>Use the form above to save your first snapshot.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {versions.map((ver, idx) => (
                <div key={ver.id} style={css.versionRow}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {idx === 0 && (
                        <span style={{ borderRadius: 20, border: '1px solid rgba(0,252,226,0.3)', background: 'rgba(0,252,226,0.1)', padding: '1px 7px', fontSize: 9, fontWeight: 700, color: '#00FCE2', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Latest
                        </span>
                      )}
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{ver.name}</span>
                    </div>
                    {ver.description && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{ver.description}</div>}
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 5 }}>
                      {fmt(ver.timestamp)} · {timeAgo(ver.timestamp)} · {ver.fileCount} files
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
                    <button
                      style={{ borderRadius: 8, border: '1px solid rgba(45,156,219,0.35)', padding: '5px 12px', fontSize: 11, fontWeight: 600, color: '#2D9CDB', background: 'transparent', cursor: 'pointer', opacity: busyId === ver.id ? 0.4 : 1 }}
                      onClick={() => setConfirmRestore(ver)} disabled={busyId === ver.id}
                    >
                      {busyId === ver.id ? '…' : '↩ Restore'}
                    </button>
                    <button
                      style={{ borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', padding: '5px 10px', fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'transparent', cursor: 'pointer', opacity: busyId === ver.id ? 0.4 : 1 }}
                      onClick={() => setConfirmDelete(ver)} disabled={busyId === ver.id} title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div style={{ marginTop: 40, borderRadius: 14, border: '1px solid rgba(220,38,38,0.25)', background: 'rgba(220,38,38,0.04)', padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(220,38,38,0.7)', marginBottom: 4 }}>Danger Zone</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>↺ Restore Default Settings</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                Resets theme, motion &amp; site settings to factory values.<br />Page content is not affected.
              </div>
            </div>
            <button
              style={{ ...css.btn('danger'), flexShrink: 0, opacity: busyId === '__defaults__' ? 0.5 : 1, background: 'transparent', border: '1px solid rgba(220,38,38,0.5)', color: '#f87171' }}
              onClick={() => setConfirmRestoreDefaults(true)}
              disabled={busyId === '__defaults__'}
            >
              {busyId === '__defaults__' ? 'Resetting…' : '↺ Restore Defaults'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
          Snapshots are stored in <code>content/versions/</code> and tracked by git.
        </div>
      </div>
    </div>
  )
}
