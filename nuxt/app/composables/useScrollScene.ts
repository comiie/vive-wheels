import type { Ref } from 'vue'

export function pinBoundaryOffset(top: number, exit: number, viewport: number) {
  const buffer = Math.min(72, viewport * .08)
  const softMax = (x: number) => x <= -buffer ? 0 : x >= buffer ? x : (x + buffer) ** 2 / (4 * buffer)
  return softMax(top) - Math.max(0, top) - softMax(-exit) - Math.min(0, exit)
}

/** Scroll-driven effects share the page's real (Lenis-smoothed) scroll position. */
export function useScrollScene(root: Ref<HTMLElement | null>, render: (viewport: number, animated: boolean) => void) {
  let frame = 0
  let visible = true
  let observer: IntersectionObserver | undefined
  let resize: ResizeObserver | undefined
  let media: MediaQueryList | undefined
  const update = () => {
    frame = 0
    if (!root.value) return
    const height = window.innerHeight
    const animated = !!media?.matches
    render(height, animated)
    // Round the two sticky corners over a short distance, without locking the wheel.
    // Position and velocity remain continuous on entry, exit and reverse scrolling.
    const rect = root.value.getBoundingClientRect()
    const exit = rect.bottom - height
    const offset = animated ? pinBoundaryOffset(rect.top, exit, height) : 0
    root.value.style.setProperty('--pin-offset', `${offset.toFixed(3)}px`)
  }
  const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
  const refresh = () => { cancelAnimationFrame(frame); update() }
  onMounted(() => {
    media = window.matchMedia('(min-width: 761px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)')
    media.addEventListener('change', refresh)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', refresh, { passive: true })
    observer = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; if (visible) schedule() }, { rootMargin: '200px' })
    resize = new ResizeObserver(refresh)
    if (root.value) { observer.observe(root.value); resize.observe(root.value) }
    refresh()
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    observer?.disconnect()
    resize?.disconnect()
    media?.removeEventListener('change', refresh)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', refresh)
  })
}
