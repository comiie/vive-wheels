<script setup lang="ts">
import { pinBoundaryOffset } from '../composables/useScrollScene'
import { engineeringMotion, storyTiming } from '../utils/engineeringMotion'
const flow = ref<HTMLDivElement | null>(null)
let frame = 0
let flowTop = 0
let observer: ResizeObserver | undefined
const clamp = (value: number) => Math.min(1, Math.max(0, value))
const update = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    const element = flow.value
    if (!element) return
    const height = window.innerHeight
    const offset = window.scrollY - flowTop
    const engineering = element.querySelector<HTMLElement>('.engineering')
    const about = element.querySelector<HTMLElement>('.about')
    const journal = element.querySelector<HTMLElement>('.journal')
    const spacer = element.querySelector<HTMLElement>('.story-spacer')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animated = !reducedMotion && window.innerWidth > 1100
    const timing = storyTiming(engineering?.offsetHeight ?? height, about?.offsetHeight ?? height, height)
    element.style.setProperty('--about-hold-space', animated ? `${timing.spacerHeight}px` : '0px')
    const motion = engineeringMotion(offset, engineering?.offsetHeight ?? height, height)
    const engineeringProgress = motion.progress
    const aboutProgress = clamp((offset - timing.engineeringEnd) / (timing.journalTop - timing.engineeringEnd))
    const journalProgress = clamp((offset - timing.journalTop) / height)
    engineering?.style.setProperty('--engineering-translate', `${motion.translate.toFixed(3)}px`)
    element.querySelector<HTMLElement>('.about')?.style.setProperty('--story-progress', aboutProgress.toFixed(4))
    element.querySelector<HTMLElement>('.journal')?.style.setProperty('--story-progress', journalProgress.toFixed(4))
    const flowRect = element.getBoundingClientRect()
    for (const [section, naturalTop] of [[about, flowRect.top], [journal, flowRect.top + (about?.offsetHeight ?? 0) + (spacer?.offsetHeight ?? 0)]] as const) {
      if (!section) continue
      const offset = animated ? pinBoundaryOffset(naturalTop, flowRect.bottom - section.offsetHeight, height) : 0
      section.style.setProperty('--pin-offset', `${offset.toFixed(3)}px`)
    }
    element.querySelectorAll<HTMLElement>('[data-count-target]').forEach((counter, index) => {
      const start = 0.18 + index * 0.055
      const countProgress = reducedMotion ? 1 : clamp((engineeringProgress - start) / 0.5)
      const eased = 1 - Math.pow(1 - countProgress, 3)
      const decimals = Number(counter.dataset.countDecimals)
      const value = Number(counter.dataset.countTarget) * eased
      counter.textContent = `${decimals ? value.toFixed(decimals) : Math.round(value)}${counter.dataset.countSuffix}`
    })
  })
}
const measure = () => {
  if (!flow.value) return
  flowTop = flow.value.getBoundingClientRect().top + window.scrollY
  update()
}
onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (flow.value) observer.observe(flow.value)
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', measure)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', measure)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div ref="flow" class="story-flow"><EngineeringSection /><AboutSection /><div class="story-spacer" aria-hidden="true" /><JournalSection /></div>
</template>
