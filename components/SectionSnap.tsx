'use client'

import { useEffect } from 'react'

/**
 * Snaps the page to the nearest <section> on each wheel "burst" or touch swipe.
 *
 * Behavior:
 *  - Mouse wheel / trackpad: accumulates deltaY for ~80ms, then snaps once
 *    in the direction of net movement.
 *  - Touch: vertical swipe > 50px snaps in the swipe direction.
 *  - During an active snap animation, further wheel input is ignored to
 *    prevent runaway scrolling.
 *  - Uses Lenis (window.__lenis) for the actual smooth animation, so the
 *    transition feels consistent with the rest of the site's scroll feel.
 *
 * Targets every direct <section> child of the page sections wrapper.
 */
export default function SectionSnap({ rootSelector = 'section' }: { rootSelector?: string }) {
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (!lenis) return

    let isAnimating = false
    let accum = 0
    let wheelTimer: ReturnType<typeof setTimeout> | null = null

    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll<HTMLElement>(rootSelector))

    const findCurrentIndex = (sections: HTMLElement[]) => {
      // Active section = whose top is closest to viewport top (with small bias
      // toward the next one when we've scrolled past 30% of current).
      let idx = 0
      let bestDist = Infinity
      sections.forEach((el, i) => {
        const top = el.getBoundingClientRect().top
        const dist = Math.abs(top)
        if (dist < bestDist) {
          bestDist = dist
          idx = i
        }
      })
      return idx
    }

    const snap = (direction: 1 | -1) => {
      if (isAnimating) return
      const sections = getSections()
      if (sections.length === 0) return
      const current = findCurrentIndex(sections)
      const nextIdx = Math.max(0, Math.min(sections.length - 1, current + direction))
      if (nextIdx === current) return

      isAnimating = true
      lenis.scrollTo(sections[nextIdx], {
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
        onComplete: () => {
          isAnimating = false
        },
      })
    }

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault()
        return
      }
      accum += e.deltaY
      if (wheelTimer) clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => {
        if (Math.abs(accum) > 30) snap(accum > 0 ? 1 : -1)
        accum = 0
      }, 80)
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) > 50) snap(dy > 0 ? 1 : -1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      if (wheelTimer) clearTimeout(wheelTimer)
    }
  }, [rootSelector])

  return null
}
