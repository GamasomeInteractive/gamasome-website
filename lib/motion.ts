/**
 * Shared motion tokens — single source of truth for all 3 animation layers.
 *
 * Layer 1 — CSS:  use cssEase / cssDuration as inline styles or @theme vars
 * Layer 2 — JS:   use ease / dur with Framer Motion
 * Layer 3 — WebGL: use dur.cinematic for scene timing alignment
 */

// ── Easing ─────────────────────────────────────────────────────────────────

export const ease = {
  /** Standard smooth-out — most UI reveals, buttons */
  smooth:    [0.22, 1, 0.36, 1]       as const,
  /** Cinematic overshoot — hero entrances, large reveals */
  cinematic: [0.22, 1.3, 0.36, 1.3]  as const,
  /** Balanced in-out — modals, drawers */
  inOut:     [0.4, 0, 0.2, 1]         as const,
  /** Quick snap — tooltips, menus */
  snap:      [0.34, 1.56, 0.64, 1]   as const,
} satisfies Record<string, readonly [number, number, number, number]>

/** CSS cubic-bezier strings (for `transition` / `animation` properties) */
export const cssEase = {
  smooth:    'cubic-bezier(0.22, 1, 0.36, 1)',
  cinematic: 'cubic-bezier(0.22, 1.3, 0.36, 1.3)',
  inOut:     'cubic-bezier(0.4, 0, 0.2, 1)',
  snap:      'cubic-bezier(0.34, 1.56, 0.64, 1)',
}

// ── Duration ───────────────────────────────────────────────────────────────

/** Framer Motion durations in seconds */
export const dur = {
  instant:   0.1,
  fast:      0.25,
  normal:    0.5,
  slow:      0.9,
  cinematic: 2.4,
}

/** CSS duration strings (for `transition-duration` / `animation-duration`) */
export const cssDur = {
  instant:   '100ms',
  fast:      '250ms',
  normal:    '500ms',
  slow:      '900ms',
  cinematic: '2400ms',
}

// ── Viewport margin for scroll triggers ────────────────────────────────────

/** How far into the viewport an element must be before animating */
export const triggerMargin = '-100px' as const

// ── Runtime helper ─────────────────────────────────────────────────────────

/**
 * Compute effective motion tokens from CMS-controlled settings.
 * Used by MotionProvider to hydrate the React context.
 */
export function getEffectiveMotion(
  easePreset: keyof typeof ease = 'cinematic',
  durationScale = 1.0,
) {
  const selectedEase = ease[easePreset] ?? ease.cinematic
  return {
    ease: selectedEase,
    dur: {
      instant:   dur.instant,
      fast:      dur.fast      * durationScale,
      normal:    dur.normal    * durationScale,
      slow:      dur.slow      * durationScale,
      cinematic: dur.cinematic * durationScale,
    },
  }
}

/**
 * Build the CSS custom property overrides string for server injection.
 * Inject as <style>{buildMotionCss(...)}</style> inside <head>.
 */
export function buildMotionCss(
  easePreset: keyof typeof cssEase = 'cinematic',
  durationScale = 1.0,
  disableAnimations = false,
): string {
  if (disableAnimations) {
    return `:root {
  --motion-instant: 0ms; --motion-fast: 0ms;
  --motion-normal: 0ms; --motion-slow: 0ms; --motion-cinematic: 0ms;
}`
  }
  const scale = (ms: number) => `${Math.round(ms * durationScale)}ms`
  return `:root {
  --motion-instant:   ${scale(100)};
  --motion-fast:      ${scale(250)};
  --motion-normal:    ${scale(500)};
  --motion-slow:      ${scale(900)};
  --motion-cinematic: ${scale(2400)};
  --motion-ease:      ${cssEase[easePreset] ?? cssEase.cinematic};
  --motion-snap:      ${cssEase.snap};
}`
}
