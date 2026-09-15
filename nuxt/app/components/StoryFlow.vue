<script setup lang="ts">
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
    const engineeringProgress = clamp(offset / height)
    const aboutProgress = clamp((offset - height) / height)
    const journalProgress = clamp((offset - height * 2) / height)
    element.querySelector<HTMLElement>('.engineering')?.style.setProperty('--engineering-exit', engineeringProgress.toFixed(4))
    element.querySelector<HTMLElement>('.about')?.style.setProperty('--story-progress', aboutProgress.toFixed(4))
    element.querySelector<HTMLElement>('.journal')?.style.setProperty('--story-progress', journalProgress.toFixed(4))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
