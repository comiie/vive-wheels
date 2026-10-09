import Lenis from 'lenis'

export function usePageMotion(modalOpen: Ref<boolean>) {
  let lenis: Lenis | undefined
  let frame = 0
  let resetFrame = 0
  let previousRestoration: ScrollRestoration = 'auto'
  let revealObserver: IntersectionObserver | undefined
  let mutationObserver: MutationObserver | undefined
  let reducedMotion = false
  const anchorTarget = (hash: string) => {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))) } catch { return null }
  }
  const followAnchor = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
    if (!link || link.target || link.hasAttribute('download')) return
    const url = new URL(link.href, location.href)
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return
    const target = anchorTarget(url.hash)
    if (!target) return
    event.preventDefault()
    history.pushState(null, '', url.hash)
    const duration = Number(link.dataset.anchorDuration) || 1.32
    const offset = -parseFloat(getComputedStyle(target).scrollMarginTop || '0')
    lenis?.scrollTo(target, { immediate: reducedMotion, duration, offset })
  }
  const resetToHero = () => {
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
  const restoreLanding = () => {
    const target = location.hash ? anchorTarget(location.hash) : null
    if (target) lenis?.scrollTo(target, { immediate: true })
    else resetToHero()
  }

  watch(modalOpen, (open) => {
    if (open) lenis?.stop()
    else lenis?.start()
  })

  onMounted(() => {
    previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lenis = new Lenis({ duration: .9, smoothWheel: !reducedMotion, wheelMultiplier: 0.92, touchMultiplier: 1.08 })
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    resetToHero()
    resetFrame = requestAnimationFrame(() => {
      resetToHero()
      resetFrame = requestAnimationFrame(() => {
        const target = location.hash ? anchorTarget(location.hash) : null
        if (target) lenis?.scrollTo(target, { immediate: true })
        else resetToHero()
      })
    })
    window.addEventListener('pageshow', restoreLanding)
    document.addEventListener('click', followAnchor)
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        const group = entry.target.getAttribute('data-reveal-group')
        if (group) document.querySelectorAll('[data-reveal-group]').forEach(element => {
          if (element.getAttribute('data-reveal-group') === group) {
            element.classList.add('is-visible')
            revealObserver?.unobserve(element)
          }
        })
        revealObserver?.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(element => revealObserver?.observe(element))
    mutationObserver = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue
        if (node.matches('[data-reveal]')) revealObserver?.observe(node)
        node.querySelectorAll('[data-reveal]').forEach(element => revealObserver?.observe(element))
      }
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    cancelAnimationFrame(resetFrame)
    window.removeEventListener('pageshow', restoreLanding)
    document.removeEventListener('click', followAnchor)
    history.scrollRestoration = previousRestoration
    lenis?.destroy()
    revealObserver?.disconnect()
    mutationObserver?.disconnect()
  })
}
