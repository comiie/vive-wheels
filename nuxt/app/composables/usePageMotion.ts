import Lenis from 'lenis'

export function usePageMotion(modalOpen: Ref<boolean>) {
  let lenis: Lenis | undefined
  let frame = 0
  let resetFrame = 0
  let previousRestoration: ScrollRestoration = 'auto'
  let revealObserver: IntersectionObserver | undefined
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
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver?.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(element => revealObserver?.observe(element))
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    cancelAnimationFrame(resetFrame)
    window.removeEventListener('pageshow', resetToHero)
    history.scrollRestoration = previousRestoration
    lenis?.destroy()
    revealObserver?.disconnect()
  })
}
