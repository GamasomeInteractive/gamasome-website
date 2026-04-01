'use client'
import { useState, useEffect, useCallback } from 'react'

interface Version {
  id: string
  name: string
  description: string
  timestamp: string
  fileCount: number
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function timeAgo(iso: string) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export default function VersionHistoryPage() {
  const [versions, setVersions]           = useState<Version[]>([])
  const [loading, setLoading]             = useState(true)
  const [saveName, setSaveName]           = useState('')
  const [saveDesc, setSaveDesc]           = useState('')
  const [saving, setSaving]               = useState(false)
  const [busyId, setBusyId]               = useState<string | null>(null)
  const [confirmRestore, setConfirmRestore] = useState<Version | null>(null)
  const [confirmDelete, setConfirmDelete]   = useState<Version | null>(null)
  const [toast, setToast]                 = useState<{ msg: string; ok: boolean } | null>(null)

  const flash = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 4000)
  }

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/versions')
      const data = await res.json()
      setVersions(data.versions || [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // pre-fill default name when there are no versions yet
  useEffect(() => {
    if (!loading && versions.length === 0 && !saveName) {
      setSaveName('Version 1 (Default)')
    }
  }, [loading, versions.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    const n = saveName.trim()
    if (!n) return
    setSaving(true)
    try {
      const res = await fetch('/api/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', name: n, description: saveDesc.trim() }),
      })
      if (res.ok) {
        setSaveName(''); setSaveDesc('')
        await load()
        flash(`"${n}" saved`)
      } else { flash('Save failed', false) }
    } finally { setSaving(false) }
  }

  const handleRestore = async (ver: Version) => {
    setConfirmRestore(null)
    setBusyId(ver.id)
    try {
      const res = await fetch('/api/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore', id: ver.id }),
      })
      if (res.ok) {
        flash(`Restored to "${ver.name}" — go back to the CMS editor and refresh to see changes`)
      } else { flash('Restore failed', false) }
    } finally { setBusyId(null) }
  }

  const handleDelete = async (ver: Version) => {
    setConfirmDelete(null)
    setBusyId(ver.id)
    try {
      const res = await fetch('/api/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: ver.id }),
      })
      if (res.ok) { await load(); flash(`"${ver.name}" deleted`) }
      else { flash('Delete failed', false) }
    } finally { setBusyId(null) }
  }

  return (
    <div className="min-h-screen bg-[#07091B] font-['Poppins'] text-white">

      {/* ── Toast ──────────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 max-w-sm rounded-xl px-5 py-3.5 text-sm font-medium shadow-2xl transition-all ${toast.ok ? 'bg-[#00FCE2] text-black' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Confirm Restore dialog ─────────────────────────────────── */}
      {confirmRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1127] p-8 shadow-2xl">
            <h3 className="text-lg font-bold">Restore "{confirmRestore.name}"?</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              This will overwrite <span className="font-semibold text-white">{confirmRestore.fileCount} content files</span> with the saved snapshot.
              Any changes made after this version was saved will be lost.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setConfirmRestore(null)} className="rounded-lg border border-white/15 px-5 py-2 text-sm hover:bg-white/5 transition">Cancel</button>
              <button onClick={() => handleRestore(confirmRestore)} disabled={busyId === confirmRestore.id}
                className="rounded-lg bg-[#2D9CDB] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1d8cbf] disabled:opacity-50 transition">
                {busyId === confirmRestore.id ? 'Restoring…' : '↩ Restore this version'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete dialog ──────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1127] p-8 shadow-2xl">
            <h3 className="text-lg font-bold">Delete "{confirmDelete.name}"?</h3>
            <p className="mt-3 text-sm text-white/55">This snapshot will be permanently removed and cannot be recovered.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setConfirmDelete(null)} className="rounded-lg border border-white/15 px-5 py-2 text-sm hover:bg-white/5 transition">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={busyId === confirmDelete.id}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50 transition">
                {busyId === confirmDelete.id ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-6 py-14">

        {/* ── Page header ──────────────────────────────────────────── */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">🕐 Version History</h1>
            <p className="mt-1.5 text-sm text-white/40">
              Manually save named snapshots of all your content and restore them any time.
            </p>
          </div>
          <a href="/admin/index.html"
            className="shrink-0 rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white transition">
            ← Back to CMS
          </a>
        </div>

        {/* ── Save new version ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-[#0D1127] p-6">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/50">Save Current State</h2>
          <p className="mb-4 text-xs text-white/30">Takes a snapshot of all content files right now.</p>

          <input
            type="text"
            placeholder="Version name — e.g. Version 1 (Default), Before homepage redesign…"
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSave()}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm outline-none transition focus:border-[#2D9CDB]/60 placeholder:text-white/20"
          />
          <textarea
            placeholder="Description (optional) — what changed, why you're saving this point…"
            value={saveDesc}
            onChange={e => setSaveDesc(e.target.value)}
            rows={2}
            className="mt-2.5 w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm outline-none transition focus:border-[#2D9CDB]/60 placeholder:text-white/20"
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-white/25">Tip: save before and after big edits so you can always roll back.</p>
            <button
              onClick={handleSave}
              disabled={!saveName.trim() || saving}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2D9CDB] px-5 text-sm font-semibold text-white transition hover:bg-[#1d8cbf] disabled:opacity-40"
            >
              {saving ? (
                <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />Saving…</>
              ) : '💾 Save Version'}
            </button>
          </div>
        </div>

        {/* ── Version list ─────────────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/35">
            Saved Snapshots {!loading && versions.length > 0 && `(${versions.length})`}
          </h2>

          {loading ? (
            <div className="flex items-center gap-3 text-sm text-white/30">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
              Loading…
            </div>
          ) : versions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.08] py-20 text-center">
              <p className="text-3xl">📂</p>
              <p className="mt-3 text-sm text-white/30">No versions saved yet.</p>
              <p className="mt-1 text-xs text-white/20">Use the form above to save your first snapshot.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {versions.map((ver, idx) => (
                <div
                  key={ver.id}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {idx === 0 && (
                          <span className="rounded-full border border-[#00FCE2]/30 bg-[#00FCE2]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#00FCE2] uppercase">
                            Latest
                          </span>
                        )}
                        <span className="font-semibold">{ver.name}</span>
                      </div>
                      {ver.description && (
                        <p className="mt-1 text-sm text-white/40">{ver.description}</p>
                      )}
                      <p className="mt-1.5 text-xs text-white/25">
                        {fmt(ver.timestamp)}
                        <span className="ml-2 text-white/20">({timeAgo(ver.timestamp)})</span>
                        <span className="ml-3 text-white/20">· {ver.fileCount} files</span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => setConfirmRestore(ver)}
                        disabled={busyId === ver.id}
                        className="rounded-lg border border-[#2D9CDB]/30 px-3.5 py-1.5 text-xs font-semibold text-[#2D9CDB] transition hover:bg-[#2D9CDB]/10 disabled:opacity-40"
                      >
                        {busyId === ver.id ? '…' : '↩ Restore'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(ver)}
                        disabled={busyId === ver.id}
                        className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-white/25 transition hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
                        title="Delete this version"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer note ──────────────────────────────────────────── */}
        <p className="mt-12 text-center text-xs text-white/20">
          Snapshots are stored in <code className="font-mono">content/versions/</code> and tracked by git.
        </p>
      </div>
    </div>
  )
}
