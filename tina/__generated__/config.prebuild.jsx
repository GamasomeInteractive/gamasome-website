// tina/config.ts
import { defineConfig } from "tinacms";

// tina/VersionHistoryScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
function VersionHistoryIcon() {
  return React.createElement("span", { style: { fontSize: "1.1em", lineHeight: 1 } }, "\u{1F550}");
}
function fmt(iso) {
  return new Date(iso).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
function VersionHistoryScreen() {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveName, setSaveName] = useState("");
  const [saveDesc, setSaveDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [confirmRestore, setConfirmRestore] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmRestoreDefaults, setConfirmRestoreDefaults] = useState(false);
  const [toast, setToast] = useState(null);
  const flash = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4e3);
  };
  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/versions");
      const d = await res.json();
      setVersions(d.versions || []);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    if (!loading && versions.length === 0 && !saveName) setSaveName("Version 1 (Default)");
  }, [loading, versions.length]);
  const handleSave = async () => {
    const n = saveName.trim();
    if (!n) return;
    setSaving(true);
    try {
      const res = await fetch("/api/versions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", name: n, description: saveDesc.trim() }) });
      if (res.ok) {
        setSaveName("");
        setSaveDesc("");
        await load();
        flash(`"${n}" saved`);
      } else flash("Save failed", false);
    } finally {
      setSaving(false);
    }
  };
  const handleRestore = async (ver) => {
    setConfirmRestore(null);
    setBusyId(ver.id);
    try {
      const res = await fetch("/api/versions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "restore", id: ver.id }) });
      if (res.ok) flash(`Restored "${ver.name}" \u2014 reload the editor to see changes`);
      else flash("Restore failed", false);
    } finally {
      setBusyId(null);
    }
  };
  const handleDelete = async (ver) => {
    setConfirmDelete(null);
    setBusyId(ver.id);
    try {
      const res = await fetch("/api/versions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete", id: ver.id }) });
      if (res.ok) {
        await load();
        flash(`"${ver.name}" deleted`);
      } else flash("Delete failed", false);
    } finally {
      setBusyId(null);
    }
  };
  const handleRestoreDefaults = async () => {
    setConfirmRestoreDefaults(false);
    setBusyId("__defaults__");
    try {
      const res = await fetch("/api/versions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "restore-defaults" }) });
      if (res.ok) flash("Settings restored to factory defaults \u2014 reload to see changes");
      else flash("Restore failed", false);
    } finally {
      setBusyId(null);
    }
  };
  const css = {
    root: { fontFamily: "system-ui,-apple-system,sans-serif", minHeight: "100%", background: "#07091B", color: "#fff", overflowY: "auto" },
    header: { borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, background: "#07091B", zIndex: 50 },
    body: { maxWidth: 640, margin: "0 auto", padding: "24px 24px 40px" },
    card: { borderRadius: 14, border: "1px solid rgba(255,255,255,0.09)", background: "#0D1127", padding: 20 },
    input: { width: "100%", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", padding: "9px 14px", fontSize: 13, color: "#fff", outline: "none", boxSizing: "border-box" },
    btn: (variant) => ({
      borderRadius: 8,
      padding: "7px 16px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
      background: variant === "primary" ? "#2D9CDB" : variant === "danger" ? "#DC2626" : "transparent",
      color: variant === "ghost" ? "rgba(255,255,255,0.4)" : "#fff",
      ...variant === "ghost" ? { border: "1px solid rgba(255,255,255,0.1)" } : {}
    }),
    overlay: { position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
    dialog: { background: "#0D1127", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 28, maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" },
    versionRow: { borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", padding: "14px 16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }
  };
  return React.createElement("div", { style: css.root }, toast && React.createElement("div", { style: { position: "fixed", top: 16, right: 16, zIndex: 9999, background: toast.ok ? "#00FCE2" : "#DC2626", color: toast.ok ? "#000" : "#fff", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, maxWidth: 320, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" } }, toast.msg), confirmRestore && React.createElement("div", { style: css.overlay }, React.createElement("div", { style: css.dialog }, React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 12 } }, 'Restore "', confirmRestore.name, '"?'), React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 20 } }, "This overwrites ", React.createElement("strong", { style: { color: "#fff" } }, confirmRestore.fileCount, " content files"), " with the saved snapshot. Changes after this version will be lost."), React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 10 } }, React.createElement("button", { style: css.btn("ghost"), onClick: () => setConfirmRestore(null) }, "Cancel"), React.createElement("button", { style: css.btn("primary"), onClick: () => handleRestore(confirmRestore), disabled: busyId === confirmRestore.id }, busyId === confirmRestore.id ? "Restoring\u2026" : "\u21A9 Restore")))), confirmRestoreDefaults && React.createElement("div", { style: css.overlay }, React.createElement("div", { style: css.dialog }, React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 8 } }, "\u21BA Restore Default Settings?"), React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 8 } }, "This will reset ", React.createElement("strong", { style: { color: "#fff" } }, "Site Settings"), " (theme, motion, contact, social) back to factory defaults."), React.createElement("p", { style: { fontSize: 12, color: "rgba(255,100,100,0.8)", lineHeight: 1.5, marginBottom: 20 } }, "\u26A0 Page content, navigation, and service pages are ", React.createElement("strong", { style: { color: "rgba(255,100,100,1)" } }, "not affected"), ". Consider saving a snapshot first."), React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 10 } }, React.createElement("button", { style: css.btn("ghost"), onClick: () => setConfirmRestoreDefaults(false) }, "Cancel"), React.createElement("button", { style: { ...css.btn("danger"), display: "flex", alignItems: "center", gap: 6 }, onClick: handleRestoreDefaults, disabled: busyId === "__defaults__" }, busyId === "__defaults__" ? "Resetting\u2026" : "\u21BA Yes, Restore Defaults")))), confirmDelete && React.createElement("div", { style: css.overlay }, React.createElement("div", { style: css.dialog }, React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 12 } }, 'Delete "', confirmDelete.name, '"?'), React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 20 } }, "This snapshot will be permanently removed and cannot be recovered."), React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 10 } }, React.createElement("button", { style: css.btn("ghost"), onClick: () => setConfirmDelete(null) }, "Cancel"), React.createElement("button", { style: css.btn("danger"), onClick: () => handleDelete(confirmDelete), disabled: busyId === confirmDelete.id }, busyId === confirmDelete.id ? "Deleting\u2026" : "Yes, Delete")))), React.createElement("div", { style: css.header }, React.createElement("span", { style: { fontSize: 24 } }, "\u{1F550}"), React.createElement("div", null, React.createElement("div", { style: { fontSize: 16, fontWeight: 700 } }, "Version History"), React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 } }, "Save & restore named snapshots of all content files"))), React.createElement("div", { style: css.body }, React.createElement("div", { style: css.card }, React.createElement("div", { style: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: 4 } }, "Save Current State"), React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 14 } }, "Takes a snapshot of all content files right now."), React.createElement(
    "input",
    {
      style: css.input,
      type: "text",
      placeholder: "Version name \u2014 e.g. Before homepage redesign\u2026",
      value: saveName,
      onChange: (e) => setSaveName(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && handleSave()
    }
  ), React.createElement(
    "textarea",
    {
      style: { ...css.input, marginTop: 8, resize: "none", height: 56 },
      placeholder: "Description (optional)",
      value: saveDesc,
      onChange: (e) => setSaveDesc(e.target.value),
      rows: 2
    }
  ), React.createElement("div", { style: { marginTop: 14, display: "flex", justifyContent: "flex-end" } }, React.createElement(
    "button",
    {
      style: { ...css.btn("primary"), opacity: !saveName.trim() || saving ? 0.4 : 1, display: "flex", alignItems: "center", gap: 6 },
      onClick: handleSave,
      disabled: !saveName.trim() || saving
    },
    saving ? "Saving\u2026" : "\u{1F4BE} Save Version"
  ))), React.createElement("div", { style: { marginTop: 28 } }, React.createElement("div", { style: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14 } }, "Saved Snapshots ", !loading && versions.length > 0 && `(${versions.length})`), loading ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)", fontSize: 13 } }, "Loading\u2026") : versions.length === 0 ? React.createElement("div", { style: { borderRadius: 14, border: "1px dashed rgba(255,255,255,0.08)", padding: "48px 20px", textAlign: "center" } }, React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "\u{1F4C2}"), React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.3)" } }, "No versions saved yet."), React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 4 } }, "Use the form above to save your first snapshot.")) : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, versions.map((ver, idx) => React.createElement("div", { key: ver.id, style: css.versionRow }, React.createElement("div", { style: { flex: 1, minWidth: 0 } }, React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } }, idx === 0 && React.createElement("span", { style: { borderRadius: 20, border: "1px solid rgba(0,252,226,0.3)", background: "rgba(0,252,226,0.1)", padding: "1px 7px", fontSize: 9, fontWeight: 700, color: "#00FCE2", textTransform: "uppercase", letterSpacing: "0.08em" } }, "Latest"), React.createElement("span", { style: { fontWeight: 600, fontSize: 13 } }, ver.name)), ver.description && React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 } }, ver.description), React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 5 } }, fmt(ver.timestamp), " \xB7 ", timeAgo(ver.timestamp), " \xB7 ", ver.fileCount, " files")), React.createElement("div", { style: { display: "flex", gap: 6, flexShrink: 0, alignItems: "center" } }, React.createElement(
    "button",
    {
      style: { borderRadius: 8, border: "1px solid rgba(45,156,219,0.35)", padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#2D9CDB", background: "transparent", cursor: "pointer", opacity: busyId === ver.id ? 0.4 : 1 },
      onClick: () => setConfirmRestore(ver),
      disabled: busyId === ver.id
    },
    busyId === ver.id ? "\u2026" : "\u21A9 Restore"
  ), React.createElement(
    "button",
    {
      style: { borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", padding: "5px 10px", fontSize: 11, color: "rgba(255,255,255,0.3)", background: "transparent", cursor: "pointer", opacity: busyId === ver.id ? 0.4 : 1 },
      onClick: () => setConfirmDelete(ver),
      disabled: busyId === ver.id,
      title: "Delete"
    },
    "\u2715"
  )))))), React.createElement("div", { style: { marginTop: 40, borderRadius: 14, border: "1px solid rgba(220,38,38,0.25)", background: "rgba(220,38,38,0.04)", padding: 20 } }, React.createElement("div", { style: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(220,38,38,0.7)", marginBottom: 4 } }, "Danger Zone"), React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, React.createElement("div", null, React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 3 } }, "\u21BA Restore Default Settings"), React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 } }, "Resets theme, motion & site settings to factory values.", React.createElement("br", null), "Page content is not affected.")), React.createElement(
    "button",
    {
      style: { ...css.btn("danger"), flexShrink: 0, opacity: busyId === "__defaults__" ? 0.5 : 1, background: "transparent", border: "1px solid rgba(220,38,38,0.5)", color: "#f87171" },
      onClick: () => setConfirmRestoreDefaults(true),
      disabled: busyId === "__defaults__"
    },
    busyId === "__defaults__" ? "Resetting\u2026" : "\u21BA Restore Defaults"
  ))), React.createElement("div", { style: { marginTop: 24, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)" } }, "Snapshots are stored in ", React.createElement("code", null, "content/versions/"), " and tracked by git.")));
}

// tina/ThemePickerScreen.tsx
import React2, { useState as useState2, useEffect as useEffect2 } from "react";

// lib/themePresets.ts
var THEME_PRESETS = [
  {
    id: "dark-cosmic",
    name: "Dark Cosmic",
    description: "Deep space blue with cyan glow \u2014 the default",
    emoji: "\u{1F30C}",
    colors: {
      fontFamily: "Poppins",
      headingColor: "#ffffff",
      bodyColor: "rgba(255,255,255,0.55)",
      labelColor: "#00FCE2",
      primaryColor: "#2D9CDB",
      accentColor: "#00FCE2",
      bgPrimary: "#07091B",
      bgSecondary: "#0A0E24",
      bgStats: "#0D1127",
      bgFooter: "#111827"
    }
  },
  {
    id: "dark-purple",
    name: "Dark Purple",
    description: "Deep violet with electric purple accents",
    emoji: "\u{1F49C}",
    colors: {
      fontFamily: "Poppins",
      headingColor: "#ffffff",
      bodyColor: "rgba(255,255,255,0.55)",
      labelColor: "#C77DFF",
      primaryColor: "#7B2FBE",
      accentColor: "#C77DFF",
      bgPrimary: "#0D0A1A",
      bgSecondary: "#130E24",
      bgStats: "#18112E",
      bgFooter: "#1F1535"
    }
  },
  {
    id: "dark-emerald",
    name: "Dark Emerald",
    description: "Forest depths with mint-green glow",
    emoji: "\u{1F49A}",
    colors: {
      fontFamily: "Poppins",
      headingColor: "#ffffff",
      bodyColor: "rgba(255,255,255,0.55)",
      labelColor: "#4AFFA9",
      primaryColor: "#00875A",
      accentColor: "#4AFFA9",
      bgPrimary: "#060F0A",
      bgSecondary: "#091A10",
      bgStats: "#0C2016",
      bgFooter: "#152A1D"
    }
  },
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    description: "Dark charcoal with warm golden highlights",
    emoji: "\u2728",
    colors: {
      fontFamily: "Montserrat",
      headingColor: "#FFD700",
      bodyColor: "rgba(255,255,255,0.6)",
      labelColor: "#FFC107",
      primaryColor: "#D4A017",
      accentColor: "#FFD700",
      bgPrimary: "#0D0D0D",
      bgSecondary: "#141414",
      bgStats: "#1A1A1A",
      bgFooter: "#252525"
    }
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    description: "Navy depths with electric blue waves",
    emoji: "\u{1F30A}",
    colors: {
      fontFamily: "Inter",
      headingColor: "#E8F4FD",
      bodyColor: "rgba(232,244,253,0.6)",
      labelColor: "#60EFFF",
      primaryColor: "#0066CC",
      accentColor: "#60EFFF",
      bgPrimary: "#020B18",
      bgSecondary: "#041525",
      bgStats: "#061D30",
      bgFooter: "#0A2A40"
    }
  },
  {
    id: "crimson-night",
    name: "Crimson Night",
    description: "Dark intensity with burning red-orange fire",
    emoji: "\u{1F525}",
    colors: {
      fontFamily: "Raleway",
      headingColor: "#ffffff",
      bodyColor: "rgba(255,255,255,0.55)",
      labelColor: "#FF6B35",
      primaryColor: "#CC2900",
      accentColor: "#FF6B35",
      bgPrimary: "#0F0707",
      bgSecondary: "#180C0C",
      bgStats: "#200F0F",
      bgFooter: "#2D1515"
    }
  }
];

// tina/ThemePickerScreen.tsx
function ThemePickerIcon() {
  return React2.createElement("span", { style: { fontSize: "1.1em", lineHeight: 1 } }, "\u{1F3A8}");
}
function ThemePickerScreen() {
  const [currentPreset, setCurrentPreset] = useState2("dark-cosmic");
  const [applying, setApplying] = useState2(null);
  const [toast, setToast] = useState2(null);
  useEffect2(() => {
    fetch("/api/theme").then((r) => r.json()).then((d) => setCurrentPreset(d.currentPreset || "dark-cosmic")).catch(() => {
    });
  }, []);
  const flash = (msg, ok) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3e3);
  };
  const applyTheme = async (preset) => {
    setApplying(preset.id);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presetId: preset.id })
      });
      if (res.ok) {
        setCurrentPreset(preset.id);
        flash(`\u2713 "${preset.name}" applied!`, true);
      } else flash("Failed to apply theme.", false);
    } catch {
      flash("Error applying theme.", false);
    } finally {
      setApplying(null);
    }
  };
  const S = {
    root: { fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100%", background: "#07091B", color: "#fff", overflowY: "auto" },
    toast: (ok) => ({
      position: "fixed",
      top: 16,
      right: 16,
      zIndex: 9999,
      background: ok ? "#065F46" : "#7F1D1D",
      border: `1px solid ${ok ? "#10B981" : "#EF4444"}`,
      borderRadius: 8,
      padding: "10px 16px",
      fontSize: 13,
      fontWeight: 500,
      maxWidth: 320,
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
    }),
    header: { borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, background: "#07091B", zIndex: 50 },
    activeBanner: { padding: "10px 24px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, fontSize: 12 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, padding: "20px 24px" },
    card: (isActive, accent) => ({
      borderRadius: 12,
      overflow: "hidden",
      border: isActive ? `2px solid ${accent}` : "2px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.03)",
      transform: isActive ? "translateY(-2px)" : "none",
      boxShadow: isActive ? `0 6px 24px ${accent}22` : "none",
      position: "relative"
    }),
    applyBtn: (isActive, isApplying, primary) => ({
      width: "100%",
      padding: "8px 0",
      borderRadius: 7,
      fontSize: 13,
      fontWeight: 600,
      cursor: isActive || isApplying ? "default" : "pointer",
      border: "none",
      transition: "all 0.2s",
      background: isActive ? "rgba(0,252,226,0.12)" : isApplying ? "rgba(255,255,255,0.1)" : primary,
      color: isActive ? "#00FCE2" : "#fff"
    })
  };
  return React2.createElement("div", { style: S.root }, toast && React2.createElement("div", { style: S.toast(toast.ok) }, toast.msg), React2.createElement("div", { style: S.header }, React2.createElement("span", { style: { fontSize: 24 } }, "\u{1F3A8}"), React2.createElement("div", null, React2.createElement("div", { style: { fontSize: 16, fontWeight: 700 } }, "Theme Picker"), React2.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 } }, "Apply a full theme to the AI Platform page"))), React2.createElement("div", { style: S.activeBanner }, React2.createElement("span", { style: { color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" } }, "Active:"), React2.createElement("span", { style: { fontWeight: 600 } }, THEME_PRESETS.find((p) => p.id === currentPreset) ? `${THEME_PRESETS.find((p) => p.id === currentPreset).emoji} ${THEME_PRESETS.find((p) => p.id === currentPreset).name}` : currentPreset)), React2.createElement("div", { style: S.grid }, THEME_PRESETS.map((preset) => {
    const isActive = preset.id === currentPreset;
    const isApplying = applying === preset.id;
    const c = preset.colors;
    return React2.createElement("div", { key: preset.id, style: S.card(isActive, c.accentColor) }, isActive && React2.createElement("div", { style: { position: "absolute", top: 10, right: 10, background: c.accentColor, color: c.bgPrimary, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.08em" } }, "Active"), React2.createElement("div", { style: { display: "flex", height: 6 } }, [c.bgPrimary, c.primaryColor, c.accentColor, c.labelColor, c.bgFooter].map((clr, i) => React2.createElement("div", { key: i, style: { flex: 1, background: clr } }))), React2.createElement("div", { style: { background: c.bgPrimary, padding: "14px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" } }, React2.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "18px 18px" } }), React2.createElement("div", { style: { position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 80% 40%,${c.primaryColor}20,transparent 65%)` } }), React2.createElement("div", { style: { position: "relative", zIndex: 1 } }, React2.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 4, border: `1px solid ${c.accentColor}40`, borderRadius: 20, padding: "1px 7px", marginBottom: 7 } }, React2.createElement("div", { style: { width: 4, height: 4, borderRadius: "50%", background: c.accentColor } }), React2.createElement("span", { style: { fontSize: 8, fontWeight: 700, color: c.labelColor, letterSpacing: "0.12em", textTransform: "uppercase" } }, "AI Platform")), React2.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: c.headingColor, lineHeight: 1.2, marginBottom: 2 } }, "Intelligence"), React2.createElement("div", { style: { fontSize: 12, fontWeight: 800, background: `linear-gradient(to right,${c.primaryColor},${c.accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 7 } }, "That Delivers"), React2.createElement("div", { style: { fontSize: 9, color: c.bodyColor, lineHeight: 1.5, marginBottom: 8, maxWidth: 180 } }, "Powering the next generation of AI applications."), React2.createElement("div", { style: { display: "inline-block", background: c.primaryColor, color: "#fff", fontSize: 8, fontWeight: 700, padding: "4px 10px", borderRadius: 20 } }, "Get Started \u2192"))), React2.createElement("div", { style: { padding: "12px 14px" } }, React2.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 2 } }, preset.emoji, " ", preset.name), React2.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.4, marginBottom: 10 } }, preset.description), React2.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 10 } }, [c.primaryColor, c.accentColor, c.labelColor, c.bgPrimary, c.bgFooter].map((clr, i) => React2.createElement("div", { key: i, style: { width: 16, height: 16, borderRadius: 4, background: clr, border: "1px solid rgba(255,255,255,0.15)" } })), React2.createElement("span", { style: { fontSize: 9, color: "rgba(255,255,255,0.25)", alignSelf: "center", marginLeft: 3 } }, c.fontFamily)), React2.createElement("button", { onClick: () => applyTheme(preset), disabled: isActive || isApplying, style: S.applyBtn(isActive, isApplying, c.primaryColor) }, isActive ? "\u2713 Currently Active" : isApplying ? "Applying\u2026" : "Apply Theme")));
  })), React2.createElement("div", { style: { textAlign: "center", padding: "16px 24px 32px", color: "rgba(255,255,255,0.2)", fontSize: 11 } }, "Applying a theme writes the colors into the AI Platform typography settings."));
}

// tina/TemplatePickerScreen.tsx
import React3, { useState as useState3, useEffect as useEffect3, useCallback as useCallback2 } from "react";

// lib/templates.ts
var TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    description: "White background with alternating left/right image + text cards. Professional and clean.",
    emoji: "\u{1F4C4}",
    bg: "#ffffff",
    accent: "#2D9CDB"
  },
  {
    id: "grid",
    name: "Card Grid",
    description: "Light background with equal-height 3-column cards. Great for showcasing many services.",
    emoji: "\u229E",
    bg: "#F8FAFC",
    accent: "#2D9CDB"
  },
  {
    id: "dark",
    name: "Dark Tech",
    description: "Dark background with glowing card borders and neon accents. Tech-forward and bold.",
    emoji: "\u{1F311}",
    bg: "#07091B",
    accent: "#00FCE2"
  }
];
function formatSlug(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// tina/TemplatePickerScreen.tsx
function TemplatePickerIcon() {
  return React3.createElement("span", { style: { fontSize: "1.1em", lineHeight: 1 } }, "\u229E");
}
function ClassicPreview() {
  return React3.createElement("div", { style: { height: "100%", background: "#fff", padding: 10, display: "flex", flexDirection: "column", gap: 6, borderRadius: 6, overflow: "hidden" } }, React3.createElement("div", { style: { borderRadius: 5, height: 28, background: "#07091B", display: "flex", alignItems: "center", padding: "0 8px" } }, React3.createElement("div", { style: { height: 6, width: 60, borderRadius: 10, background: "rgba(255,255,255,0.7)" } })), [0, 1].map((i) => React3.createElement("div", { key: i, style: { display: "flex", gap: 6, flexDirection: i % 2 === 1 ? "row-reverse" : "row", background: "#F9FBFF", borderRadius: 5, padding: 6 } }, React3.createElement("div", { style: { width: 44, height: 32, borderRadius: 4, background: "#e2e8f0", flexShrink: 0 } }), React3.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" } }, React3.createElement("div", { style: { height: 5, borderRadius: 10, background: "#374151", width: "70%" } }), React3.createElement("div", { style: { height: 3, borderRadius: 10, background: "#9ca3af", width: "100%" } }), React3.createElement("div", { style: { height: 3, borderRadius: 10, background: "#9ca3af", width: "85%" } }), React3.createElement("div", { style: { height: 10, width: 36, borderRadius: 10, background: "#2D9CDB", marginTop: 2 } })))), React3.createElement("div", { style: { borderRadius: 5, height: 20, background: "#2D9CDB", display: "flex", gap: 4, alignItems: "center", padding: "0 6px" } }, [1, 2, 3, 4].map((j) => React3.createElement("div", { key: j, style: { width: 12, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.3)" } }))));
}
function GridPreview() {
  return React3.createElement("div", { style: { height: "100%", background: "#F8FAFC", padding: 10, display: "flex", flexDirection: "column", gap: 6, borderRadius: 6, overflow: "hidden" } }, React3.createElement("div", { style: { borderRadius: 5, height: 28, background: "#07091B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 } }, React3.createElement("div", { style: { height: 5, width: 56, borderRadius: 10, background: "rgba(255,255,255,0.85)" } }), React3.createElement("div", { style: { height: 3, width: 40, borderRadius: 10, background: "rgba(255,255,255,0.4)" } })), React3.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, flex: 1 } }, [1, 2, 3].map((i) => React3.createElement("div", { key: i, style: { borderRadius: 6, background: "#fff", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" } }, React3.createElement("div", { style: { height: 3, background: "linear-gradient(to right,#2D9CDB,#00FCE2)" } }), React3.createElement("div", { style: { padding: 5, display: "flex", flexDirection: "column", gap: 3 } }, React3.createElement("div", { style: { height: 18, borderRadius: 4, background: "#f1f5f9" } }), React3.createElement("div", { style: { height: 3, borderRadius: 10, background: "#d1d5db", width: "100%" } }), React3.createElement("div", { style: { height: 3, borderRadius: 10, background: "#d1d5db", width: "80%" } }), React3.createElement("div", { style: { height: 8, width: 24, borderRadius: 10, background: "#2D9CDB", marginTop: 2 } }))))));
}
function DarkPreview() {
  const A = "#00FCE2", C = "#0D1130", B = "#07091B";
  return React3.createElement("div", { style: { height: "100%", background: B, padding: 10, display: "flex", flexDirection: "column", gap: 6, borderRadius: 6, overflow: "hidden" } }, React3.createElement("div", { style: { borderRadius: 5, height: 28, background: B, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8px" } }, React3.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.08, backgroundImage: `linear-gradient(${A}44 1px,transparent 1px),linear-gradient(90deg,${A}44 1px,transparent 1px)`, backgroundSize: "10px 10px" } }), React3.createElement("div", { style: { height: 2, width: 20, borderRadius: 2, background: A, boxShadow: `0 0 4px ${A}`, marginBottom: 4 } }), React3.createElement("div", { style: { height: 5, width: 56, borderRadius: 10, background: "rgba(255,255,255,0.8)" } }), React3.createElement("div", { style: { height: 3, width: 40, borderRadius: 10, background: "rgba(255,255,255,0.35)", marginTop: 3 } })), [0, 1].map((i) => React3.createElement("div", { key: i, style: { display: "flex", gap: 5, flexDirection: i % 2 === 1 ? "row-reverse" : "row" } }, React3.createElement("div", { style: { width: 44, height: 28, borderRadius: 5, background: C, border: `1px solid ${A}30`, boxShadow: `0 0 5px ${A}15`, flexShrink: 0 } }), React3.createElement("div", { style: { flex: 1, borderRadius: 5, padding: "5px 7px", background: C, border: `1px solid ${A}18`, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" } }, React3.createElement("div", { style: { height: 2, width: 16, borderRadius: 2, background: A } }), React3.createElement("div", { style: { height: 4, borderRadius: 10, background: "rgba(255,255,255,0.6)", width: "70%" } }), React3.createElement("div", { style: { height: 3, borderRadius: 10, background: "rgba(255,255,255,0.22)", width: "100%" } })))), React3.createElement("div", { style: { borderRadius: 5, height: 18, background: C, border: `1px solid ${A}28`, display: "flex", gap: 4, alignItems: "center", padding: "0 6px" } }, [1, 2, 3, 4].map((j) => React3.createElement("div", { key: j, style: { width: 10, height: 10, borderRadius: 3, background: `${A}18`, border: `1px solid ${A}35` } }))));
}
var PREVIEWS = { classic: ClassicPreview, grid: GridPreview, dark: DarkPreview };
function TemplatePickerScreen() {
  const [pages, setPages] = useState3({});
  const [saving, setSaving] = useState3(false);
  const [savedMsg, setSavedMsg] = useState3("");
  const [activeSlug, setActiveSlug] = useState3("");
  const load = useCallback2(async () => {
    const res = await fetch("/api/template");
    const json = await res.json();
    setPages(json.pages);
    setActiveSlug((prev) => prev || Object.keys(json.pages)[0] || "");
  }, []);
  useEffect3(() => {
    load();
  }, [load]);
  const apply = async (pageSlugs, templateId) => {
    setSaving(true);
    setSavedMsg("");
    try {
      await fetch("/api/template", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pageSlugs, templateId }) });
      await load();
      const label = pageSlugs === "all" ? "All pages" : formatSlug(pageSlugs[0]);
      setSavedMsg(`\u2713 ${label} \u2192 ${templateId}`);
      setTimeout(() => setSavedMsg(""), 3e3);
    } finally {
      setSaving(false);
    }
  };
  const A = "#00FCE2", BG = "#07091B", CARD = "#0D1130";
  const currentTemplate = pages[activeSlug] || "classic";
  const css = {
    root: { fontFamily: "system-ui,-apple-system,sans-serif", minHeight: "100%", background: BG, color: "#fff", overflowY: "auto" },
    header: { borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, background: BG, zIndex: 50 },
    body: { padding: "16px 20px 40px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 },
    pageBtn: (active) => ({
      width: "100%",
      textAlign: "left",
      borderRadius: 10,
      padding: "8px 12px",
      background: active ? `${A}18` : CARD,
      border: active ? `1px solid ${A}55` : "1px solid rgba(255,255,255,0.07)",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }),
    tmplCard: (active, accent) => ({
      borderRadius: 14,
      overflow: "hidden",
      cursor: "pointer",
      border: active ? `2px solid ${accent}` : "2px solid rgba(255,255,255,0.08)",
      background: CARD,
      boxShadow: active ? `0 0 20px ${accent}35` : "none",
      transform: active ? "translateY(-2px)" : "none",
      transition: "all 0.15s"
    })
  };
  return React3.createElement("div", { style: css.root }, React3.createElement("div", { style: css.header }, React3.createElement("span", { style: { fontSize: 22 } }, "\u229E"), React3.createElement("div", null, React3.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, "Template Picker"), React3.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 } }, "Choose a layout for each service page"))), React3.createElement("div", { style: css.body }, React3.createElement("div", null, React3.createElement("div", { style: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 10 } }, "Pages"), React3.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } }, Object.keys(pages).map((slug) => {
    const t = pages[slug] || "classic";
    const tmpl = TEMPLATES.find((x) => x.id === t);
    const isActive = activeSlug === slug;
    return React3.createElement("button", { key: slug, style: css.pageBtn(isActive), onClick: () => setActiveSlug(slug) }, React3.createElement("span", { style: { fontSize: 12, fontWeight: 500, lineHeight: 1.3 } }, formatSlug(slug)), tmpl && React3.createElement("span", { style: { flexShrink: 0, borderRadius: 20, padding: "1px 7px", fontSize: 9, fontWeight: 700, background: `${tmpl.accent}20`, color: tmpl.accent, border: `1px solid ${tmpl.accent}40` } }, tmpl.emoji));
  })), React3.createElement("div", { style: { marginTop: 16, borderRadius: 10, padding: 12, background: CARD, border: "1px solid rgba(255,255,255,0.07)" } }, React3.createElement("div", { style: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: 8 } }, "Apply to ALL"), React3.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } }, TEMPLATES.map((t) => React3.createElement(
    "button",
    {
      key: t.id,
      disabled: saving,
      onClick: () => apply("all", t.id),
      style: { borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", border: `1px solid ${t.accent}40`, background: `${t.accent}18`, color: t.accent, display: "flex", alignItems: "center", gap: 6, opacity: saving ? 0.5 : 1 }
    },
    React3.createElement("span", null, t.emoji),
    React3.createElement("span", null, t.name, " \u2014 All")
  ))))), React3.createElement("div", null, React3.createElement("div", { style: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 10 } }, "Template for ", React3.createElement("span", { style: { color: A } }, formatSlug(activeSlug))), React3.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 } }, TEMPLATES.map((t) => {
    const Preview = PREVIEWS[t.id];
    const isSelected = currentTemplate === t.id;
    return React3.createElement(
      "button",
      {
        key: t.id,
        disabled: saving,
        onClick: () => apply([activeSlug], t.id),
        style: { ...css.tmplCard(isSelected, t.accent), position: "relative", opacity: saving ? 0.6 : 1 }
      },
      isSelected && React3.createElement("div", { style: { position: "absolute", top: 8, right: 8, zIndex: 2, width: 20, height: 20, borderRadius: "50%", background: t.accent, color: "#000", fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" } }, "\u2713"),
      React3.createElement("div", { style: { height: 120, borderBottom: `1px solid ${isSelected ? `${t.accent}30` : "rgba(255,255,255,0.06)"}`, overflow: "hidden" } }, Preview && React3.createElement(Preview, null)),
      React3.createElement("div", { style: { padding: "10px 12px", textAlign: "left" } }, React3.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4 } }, React3.createElement("span", { style: { fontSize: 14 } }, t.emoji), React3.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: isSelected ? t.accent : "#fff" } }, t.name), isSelected && React3.createElement("span", { style: { marginLeft: "auto", fontSize: 9, fontWeight: 700, borderRadius: 20, padding: "1px 6px", background: `${t.accent}20`, color: t.accent } }, "Active")), React3.createElement("p", { style: { fontSize: 10, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, margin: 0 } }, t.description))
    );
  })), React3.createElement("div", { style: { marginTop: 14, height: 20, fontSize: 12, color: saving ? "rgba(255,255,255,0.4)" : A } }, saving ? "Saving\u2026" : savedMsg))));
}

// tina/config.ts
function sectionMotionFields() {
  return {
    type: "object",
    name: "motion",
    label: "\u{1F3AC} Section Animation",
    ui: { description: "Leave blank to inherit from Site Settings \u2192 Animation & Motion." },
    fields: [
      {
        type: "string",
        name: "easePreset",
        label: "Easing Style",
        defaultValue: "inherit",
        options: [
          { value: "inherit", label: "\u2014 Inherit from global \u2014" },
          { value: "smooth", label: "Smooth \u2014 standard UI" },
          { value: "cinematic", label: "Cinematic \u2014 hero / bold entrances" },
          { value: "inOut", label: "Balanced In-Out \u2014 panels, modals" },
          { value: "snap", label: "Snap \u2014 quick snappy feel" }
        ]
      },
      {
        type: "number",
        name: "durationScale",
        label: "Duration Scale",
        ui: {
          description: "Leave blank to inherit. 1.0 = normal \xB7 0.5 = 2\xD7 faster \xB7 2.0 = 2\xD7 slower",
          // @ts-expect-error placeholder is valid HTML but not typed in TinaCMS
          placeholder: "1.0"
        }
      }
    ]
  };
}
function servicePageFields() {
  return [
    { type: "string", name: "pageTitle", label: "SEO Page Title" },
    { type: "string", name: "pageDescription", label: "SEO Description", ui: { component: "textarea" } },
    {
      type: "object",
      name: "hero",
      label: "\u{1F5BC} Hero Banner",
      fields: [
        { type: "image", name: "bannerImage", label: "Banner Background Image" },
        { type: "string", name: "title", label: "Page Title (h1)" },
        { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
        { type: "string", name: "ctaText", label: "CTA Button Text" },
        { type: "string", name: "ctaHref", label: "CTA Button Link" },
        sectionMotionFields()
      ]
    },
    { type: "string", name: "servicesHeading", label: "Services Section Heading" },
    {
      type: "object",
      name: "servicesMotion",
      label: "\u2699\uFE0F Services Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "services",
      label: "\u2699\uFE0F Services / Solutions",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ?? "Service" }) },
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        { type: "image", name: "image", label: "Image" },
        { type: "string", name: "ctaText", label: "Button Text (optional)" },
        { type: "string", name: "ctaHref", label: "Button Link" }
      ]
    },
    { type: "boolean", name: "showEngagement", label: 'Show "How We Work" section' },
    { type: "string", name: "engagementHeading", label: "Engagement Section Heading" },
    {
      type: "object",
      name: "engagementMotion",
      label: "\u{1F4CB} Engagement Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "engagementModels",
      label: "\u{1F4CB} Engagement Models",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ?? "Model" }) },
      fields: [
        { type: "string", name: "title", label: "Model Name" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
      ]
    },
    { type: "string", name: "showreelVideoUrl", label: "\u{1F3AC} Showreel Video URL (YouTube embed, optional)" },
    {
      type: "object",
      name: "spotlight",
      label: "\u{1F31F} Feature Spotlight Section (optional)",
      fields: [
        { type: "boolean", name: "enabled", label: "Show spotlight section" },
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        { type: "string", name: "videoUrl", label: "YouTube Embed URL" },
        { type: "string", name: "ctaText", label: "CTA Button Text" },
        { type: "string", name: "ctaHref", label: "CTA Button Link" },
        sectionMotionFields()
      ]
    },
    { type: "boolean", name: "showUseCases", label: "Show Use Cases Videos section" },
    { type: "string", name: "useCasesHeading", label: "Use Cases Section Heading" },
    {
      type: "object",
      name: "useCasesMotion",
      label: "\u{1F4FD} Use Cases Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "useCases",
      label: "\u{1F4FD} Use Case Videos",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ?? "Use Case" }) },
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "videoUrl", label: "YouTube Embed URL" }
      ]
    },
    { type: "boolean", name: "showPortfolio", label: "Show Portfolio / Works section" },
    { type: "string", name: "portfolioHeading", label: "Portfolio Section Heading" },
    {
      type: "object",
      name: "portfolioMotion",
      label: "\u{1F5C2} Portfolio Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "portfolio",
      label: "\u{1F5C2} Portfolio / Works",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ?? "Work" }) },
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "image", name: "image", label: "Image" },
        { type: "string", name: "link", label: "Link (optional)" }
      ]
    },
    { type: "string", name: "techHeading", label: "Technologies Section Heading" },
    {
      type: "object",
      name: "techMotion",
      label: "\u{1F527} Technologies Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "technologies",
      label: "\u{1F527} Technology Stack",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name ?? "Technology" }) },
      fields: [
        { type: "string", name: "name", label: "Technology Name" },
        { type: "image", name: "image", label: "Logo Image" }
      ]
    },
    {
      type: "object",
      name: "ctaBox",
      label: "\u{1F4E3} CTA Box",
      fields: [
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        {
          type: "object",
          name: "primaryBtn",
          label: "Primary Button",
          fields: [
            { type: "string", name: "text", label: "Text" },
            { type: "string", name: "href", label: "Link" }
          ]
        },
        sectionMotionFields()
      ]
    }
  ];
}
function aiPlatformTemplateFields() {
  return [
    // ── Typography & Colors ───────────────────────────────────────────────
    {
      type: "object",
      name: "typography",
      label: "\u270F\uFE0F Typography & Page Colors",
      ui: { description: "Quick-apply a full theme: click the \u{1F3A8} Theme Picker in the left sidebar." },
      fields: [
        {
          type: "string",
          name: "fontFamily",
          label: "Font Family",
          options: [
            { value: "Poppins", label: "Poppins (default)" },
            { value: "Inter", label: "Inter" },
            { value: "Roboto", label: "Roboto" },
            { value: "Montserrat", label: "Montserrat" },
            { value: "Open Sans", label: "Open Sans" },
            { value: "Raleway", label: "Raleway" },
            { value: "Nunito", label: "Nunito" }
          ]
        },
        { type: "string", name: "headingColor", label: "Heading Color (h1/h2/h3)", ui: { component: "color" } },
        { type: "string", name: "bodyColor", label: "Body Text Color", ui: { component: "color" } },
        { type: "string", name: "labelColor", label: "Section Label Color (caps)", ui: { component: "color" } },
        { type: "string", name: "primaryColor", label: "Primary Color (buttons)", ui: { component: "color" } },
        { type: "string", name: "accentColor", label: "Accent Color (glow)", ui: { component: "color" } },
        { type: "string", name: "bgPrimary", label: "Primary Section Background", ui: { component: "color" } },
        { type: "string", name: "bgSecondary", label: "Alternate Section Background", ui: { component: "color" } },
        { type: "string", name: "bgStats", label: "Stats Bar Background", ui: { component: "color" } },
        { type: "string", name: "bgFooter", label: "Footer Background", ui: { component: "color" } }
      ]
    },
    // ── Hero ─────────────────────────────────────────────────────────────
    {
      type: "object",
      name: "hero",
      label: "\u{1F680} Hero Section",
      fields: [
        { type: "string", name: "badge", label: 'Badge Text (e.g. "AI Platform")' },
        { type: "string", name: "headline", label: "Headline (line 1)" },
        { type: "string", name: "headlineAccent", label: "Headline Accent (line 2 \u2014 gradient)" },
        { type: "string", name: "subheadline", label: "Sub-headline", ui: { component: "textarea" } },
        { type: "image", name: "backgroundImage", label: "Background Image (optional)" },
        { type: "string", name: "backgroundVideoUrl", label: "Background Video URL (YouTube embed)" },
        {
          type: "object",
          name: "colors",
          label: "\u{1F3A8} Section Colors (overrides global theme)",
          fields: [
            { type: "string", name: "primaryColor", label: "Primary Color", ui: { component: "color" } },
            { type: "string", name: "accentColor", label: "Accent Color", ui: { component: "color" } },
            { type: "string", name: "bgColor", label: "Background", ui: { component: "color" } }
          ]
        },
        {
          type: "object",
          name: "animation",
          label: "\u{1F3AE} 3D Animation",
          fields: [
            { type: "boolean", name: "enabled", label: "Show 3D Animation" },
            { type: "string", name: "primaryColor", label: "Primary Color", ui: { component: "color" } },
            { type: "string", name: "accentColor", label: "Accent Color", ui: { component: "color" } }
          ]
        },
        {
          type: "object",
          name: "primaryCta",
          label: "Primary Button",
          fields: [
            { type: "string", name: "text", label: "Button Text" },
            { type: "string", name: "href", label: "Link URL" }
          ]
        },
        {
          type: "object",
          name: "secondaryCta",
          label: "Secondary Button",
          fields: [
            { type: "string", name: "text", label: "Button Text" },
            { type: "string", name: "href", label: "Link URL" }
          ]
        },
        sectionMotionFields()
      ]
    },
    // ── Stats ─────────────────────────────────────────────────────────────
    {
      type: "object",
      name: "stats",
      label: "\u{1F4CA} Stats Bar",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.value ?? ""} \u2014 ${item?.label ?? "Stat"}` }) },
      fields: [
        { type: "string", name: "value", label: "Value (e.g. 50M+)" },
        { type: "string", name: "label", label: "Label (e.g. Training Samples)" },
        { type: "string", name: "sublabel", label: "Sub-label" }
      ]
    },
    // ── Capabilities ──────────────────────────────────────────────────────
    { type: "string", name: "capabilitiesLabel", label: "Capabilities \u2014 Section Label" },
    { type: "string", name: "capabilitiesTitle", label: "Capabilities \u2014 Heading" },
    {
      type: "object",
      name: "capabilitiesMotion",
      label: "\u26A1 Capabilities Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "capabilities",
      label: "\u26A1 Core Capabilities",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ?? "Capability" }) },
      fields: [
        { type: "string", name: "icon", label: "Icon (emoji, e.g. \u{1F441}\uFE0F)" },
        { type: "image", name: "iconImage", label: "Icon Image (SVG/PNG, replaces emoji)" },
        { type: "string", name: "title", label: "Title" },
        { type: "rich-text", name: "description", label: "Description" },
        { type: "string", name: "accentColor", label: "Card Accent Color", ui: { component: "color" } },
        { type: "string", name: "demoVideoUrl", label: "Demo Video URL (YouTube)" }
      ]
    },
    // ── Use Cases ─────────────────────────────────────────────────────────
    { type: "string", name: "useCasesLabel", label: "Use Cases \u2014 Section Label" },
    { type: "string", name: "useCasesTitle", label: "Use Cases \u2014 Heading" },
    {
      type: "object",
      name: "useCasesMotion",
      label: "\u{1F30D} Use Cases Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "useCases",
      label: "\u{1F30D} Industry Use Cases",
      list: true,
      ui: { itemProps: (item) => ({ label: `[${item?.tag ?? ""}] ${item?.title ?? "Use Case"}` }) },
      fields: [
        { type: "string", name: "tag", label: "Industry Tag (e.g. RETAIL)" },
        { type: "string", name: "title", label: "Title" },
        { type: "rich-text", name: "description", label: "Description" },
        { type: "image", name: "coverImage", label: "Cover Image" },
        { type: "string", name: "accentColor", label: "Accent Color", ui: { component: "color" } },
        { type: "string", name: "videoUrl", label: "Demo Video URL (YouTube embed)" }
      ]
    },
    // ── How It Works ──────────────────────────────────────────────────────
    { type: "string", name: "howItWorksLabel", label: "How It Works \u2014 Section Label" },
    { type: "string", name: "howItWorksTitle", label: "How It Works \u2014 Heading" },
    {
      type: "object",
      name: "howItWorksMotion",
      label: "\u{1F504} How It Works Section Animation",
      fields: sectionMotionFields().fields
    },
    {
      type: "object",
      name: "howItWorks",
      label: "\u{1F504} How It Works",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.number ?? ""} \u2014 ${item?.title ?? "Step"}` }) },
      fields: [
        { type: "string", name: "number", label: "Step Number (01, 02, 03)" },
        { type: "string", name: "title", label: "Step Title" },
        { type: "rich-text", name: "description", label: "Description" },
        { type: "image", name: "illustration", label: "Step Illustration" }
      ]
    },
    // ── CTA ───────────────────────────────────────────────────────────────
    {
      type: "object",
      name: "cta",
      label: "\u{1F4E3} CTA Section",
      fields: [
        { type: "string", name: "headline", label: "Headline" },
        { type: "string", name: "subtext", label: "Sub-text", ui: { component: "textarea" } },
        { type: "image", name: "backgroundImage", label: "Background Image" },
        {
          type: "object",
          name: "primaryBtn",
          label: "Primary Button",
          fields: [
            { type: "string", name: "text", label: "Text" },
            { type: "string", name: "href", label: "URL" }
          ]
        },
        {
          type: "object",
          name: "secondaryBtn",
          label: "Secondary Button",
          fields: [
            { type: "string", name: "text", label: "Text" },
            { type: "string", name: "href", label: "URL" }
          ]
        },
        sectionMotionFields()
      ]
    }
  ];
}
var config_default = defineConfig({
  cmsCallback: (cms) => {
    cms.plugins.add({
      __type: "screen",
      name: "Theme Picker",
      Icon: ThemePickerIcon,
      layout: "fullscreen",
      Component: ThemePickerScreen
    });
    cms.plugins.add({
      __type: "screen",
      name: "Version History",
      Icon: VersionHistoryIcon,
      layout: "fullscreen",
      Component: VersionHistoryScreen
    });
    cms.plugins.add({
      __type: "screen",
      name: "Template Picker",
      Icon: TemplatePickerIcon,
      layout: "fullscreen",
      Component: TemplatePickerScreen
    });
    return cms;
  },
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  schema: {
    collections: [
      // ── GLOBAL SITE SETTINGS ───────────────────────────────────────
      {
        label: "\u2699\uFE0F Site Settings",
        name: "siteSettings",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "siteName", label: "Site Name" },
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "image", name: "logo", label: "Logo Image" },
          { type: "image", name: "favicon", label: "Favicon" },
          {
            type: "string",
            name: "homePage",
            label: "\u{1F3E0} Home Page",
            ui: {
              description: "Choose which service page is shown at gamasome.com/"
            },
            options: [
              { value: "simulation-digital-twins", label: "Simulation & Digital Twins" },
              { value: "ai-solutions", label: "AI Solutions" },
              { value: "ai-platform", label: "AI Platform" },
              { value: "ar-vr-development", label: "AR / VR Development" },
              { value: "game-development", label: "Game Development" },
              { value: "metaverse", label: "Metaverse" },
              { value: "robotics-solutions", label: "Robotics Solutions" },
              { value: "ai-avatars-platform", label: "AI Avatars Platform" }
            ]
          },
          {
            type: "object",
            name: "theme",
            label: "\u{1F3A8} Theme Colors",
            fields: [
              {
                type: "string",
                name: "primaryColor",
                label: "Primary Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "accentColor",
                label: "Accent / Cyan Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "darkBg",
                label: "Dark Background Color",
                ui: { component: "color" }
              },
              {
                type: "string",
                name: "textColor",
                label: "Text Color",
                ui: { component: "color" }
              }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "\u{1F4DE} Contact",
            fields: [
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "\u{1F310} Social Links",
            fields: [
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "twitter", label: "Twitter / X URL" },
              { type: "string", name: "youtube", label: "YouTube URL" },
              { type: "string", name: "instagram", label: "Instagram URL" },
              { type: "string", name: "facebook", label: "Facebook URL" }
            ]
          },
          {
            type: "object",
            name: "motion",
            label: "\u{1F3AC} Animation & Motion",
            ui: {
              description: "Controls animation timing and easing across the entire site. Applies to CSS transitions (Layer 1) and JavaScript animations (Layer 2)."
            },
            fields: [
              {
                type: "string",
                name: "easePreset",
                label: "Easing Style",
                options: [
                  { value: "smooth", label: "Smooth \u2014 standard UI reveals" },
                  { value: "cinematic", label: "Cinematic \u2014 hero entrances (slight overshoot)" },
                  { value: "inOut", label: "Balanced In-Out \u2014 modals, panels" },
                  { value: "snap", label: "Snap \u2014 quick snappy feedback" }
                ]
              },
              {
                type: "number",
                name: "durationScale",
                label: "Duration Scale",
                ui: {
                  description: "1.0 = default timing  \xB7  0.5 = 2\xD7 faster  \xB7  2.0 = 2\xD7 slower"
                }
              },
              {
                type: "boolean",
                name: "disableAnimations",
                label: "Disable All Animations (site-wide accessibility override)"
              }
            ]
          }
        ]
      },
      // ── HEADER / NAVIGATION ────────────────────────────────────────
      {
        label: "\u{1F9ED} Header & Navigation",
        name: "header",
        path: "content/navigation",
        match: { include: "header" },
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "image",
            name: "logoImage",
            label: "Logo Image (PNG / SVG \u2014 replaces the default SVG)"
          },
          {
            type: "object",
            name: "navLinks",
            label: "Navigation Links",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title ?? "Link" })
            },
            fields: [
              { type: "string", name: "title", label: "Menu Label" },
              { type: "string", name: "href", label: "URL Path (e.g. /ai-platform)" }
            ]
          }
        ]
      },
      // ── FOOTER ─────────────────────────────────────────────────────
      {
        label: "\u{1F9B6} Footer",
        name: "footer",
        path: "content/navigation",
        match: { include: "footer" },
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "ctaHeadline", label: `CTA Headline (e.g. "Interested? Let's Talk!")` },
          {
            type: "string",
            name: "ctaDescription",
            label: "CTA Description",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "offices",
            label: "\u{1F3E2} Office Locations",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.city ?? "Office" }) },
            fields: [
              { type: "string", name: "country", label: "Country" },
              { type: "image", name: "flagImage", label: "Country Flag Image" },
              { type: "string", name: "city", label: "Office Label (e.g. USA Office)" },
              { type: "string", name: "address", label: "Address", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "\u{1F310} Social Links",
            fields: [
              { type: "string", name: "twitter", label: "Twitter / X URL" },
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "facebook", label: "Facebook URL" },
              { type: "string", name: "youtube", label: "YouTube URL" }
            ]
          },
          {
            type: "object",
            name: "legalLinks",
            label: "\u{1F4C4} Legal Links",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Link" }) },
            fields: [
              { type: "string", name: "title", label: "Label" },
              { type: "string", name: "href", label: "URL Path" }
            ]
          },
          { type: "string", name: "copyrightName", label: "Copyright Name" },
          { type: "boolean", name: "newsletterEnabled", label: "Show Newsletter Signup" },
          {
            type: "object",
            name: "navLinks",
            label: "\u{1F517} Footer Nav Links (Company column)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Link" }) },
            fields: [
              { type: "string", name: "title", label: "Label" },
              { type: "string", name: "href", label: "URL Path" }
            ]
          }
        ]
      },
      // ── SERVICE PAGES (create / delete enabled) ────────────────────
      {
        label: "\u{1F4C4} Service Pages",
        name: "servicePage",
        path: "content/pages/services",
        format: "json",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ui: {
          allowedActions: { create: true, delete: true },
          // @ts-expect-error itemProps is valid TinaCMS API but not in the TypeScript definitions
          itemProps: (item) => ({ label: item?.hero?.title || item?.hero?.headline || item?._sys?.filename || "Page" }),
          router: ({ document }) => `/${document._sys.filename}`
        },
        templates: [
          {
            name: "classic",
            label: "\u{1F4C4} Classic Service Page",
            fields: servicePageFields()
          },
          {
            name: "aiPlatform",
            label: "\u{1F680} AI Platform",
            fields: aiPlatformTemplateFields()
          }
        ]
      },
      // ── ABOUT ──────────────────────────────────────────────────────
      {
        label: "\u2139\uFE0F About",
        name: "about",
        path: "content/pages",
        match: { include: "about" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false }, router: () => "/about" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "\u{1F5BC} Hero",
            fields: [
              { type: "string", name: "breadcrumb", label: "Breadcrumb Text" },
              { type: "string", name: "title", label: "Heading" },
              { type: "image", name: "image", label: "Photo (right side)" },
              { type: "string", name: "body", label: "Body Text (use \\n\\n to separate paragraphs)", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "business",
            label: "\u{1F4F9} Business Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "videoUrl", label: "YouTube Embed URL" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "founders",
            label: "\u{1F465} Founders",
            fields: [
              { type: "string", name: "heading", label: "Section Heading" },
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "members",
                label: "Team Members",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name ?? "Member" }) },
                fields: [
                  { type: "string", name: "name", label: "Full Name" },
                  { type: "string", name: "role", label: "Role / Title" },
                  { type: "image", name: "image", label: "Photo" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "\u{1F4E3} CTA Box",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "ctaText", label: "Button Text" },
              { type: "string", name: "ctaHref", label: "Button Link" }
            ]
          }
        ]
      },
      // ── CONTACT ────────────────────────────────────────────────────
      {
        label: "\u{1F4DE} Contact",
        name: "contact",
        path: "content/pages",
        match: { include: "contact" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false }, router: () => "/contact" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "\u{1F5BC} Banner",
            fields: [
              { type: "string", name: "breadcrumb", label: "Breadcrumb" },
              { type: "string", name: "title", label: "Page Title" },
              { type: "image", name: "bannerImage", label: "Banner Image" }
            ]
          },
          {
            type: "object",
            name: "offices",
            label: "\u{1F3E2} Offices",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name ?? "Office" }) },
            fields: [
              { type: "string", name: "name", label: "Office Name (e.g. India Office)" },
              { type: "string", name: "address", label: "Address", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "mapsUrl", label: "Google Maps URL (optional)" }
            ]
          },
          {
            type: "object",
            name: "form",
            label: "\u{1F4DD} Contact Form",
            fields: [
              { type: "string", name: "heading", label: "Form Heading" },
              { type: "string", name: "description", label: "Form Description", ui: { component: "textarea" } },
              { type: "string", name: "submitText", label: "Submit Button Text" },
              { type: "string", name: "formEndpoint", label: "Form Submission Endpoint URL" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
