import Lenis from 'lenis'

export function usePageMotion(modalOpen: Ref<boolean>) {
  let lenis: Lenis | undefined
  let frame = 0
  let resetFrame = 0
  let previousRestoration: ScrollRestoration = 'auto'
  const resetToHero = () => {
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  watch(modalOpen, (open) => {
    if (open) lenis?.stop()
    else lenis?.start()
  })

  onMounted(() => {
    previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    lenis = new Lenis({ duration: 1.32, smoothWheel: true, wheelMultiplier: 0.86, touchMultiplier: 1.08 })
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    resetToHero()
    resetFrame = requestAnimationFrame(() => {
      resetToHero()
      resetFrame = requestAnimationFrame(resetToHero)
    })
    window.addEventListener('pageshow', resetToHero)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    cancelAnimationFrame(resetFrame)
    window.removeEventListener('pageshow', resetToHero)
    history.scrollRestoration = previousRestoration
    lenis?.destroy()
  })
}
