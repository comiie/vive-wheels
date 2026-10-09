import type { Ref } from 'vue'

/** Native page scroll drives a pinned story; no wheel interception or scroll lock. */
export function usePinnedSteps(scene: Ref<HTMLElement | null>, count: number, stepScreens = .75) {
  const active = ref(0)
  const progress = ref(0)
  const pinned = ref(false)
  let stepDistance = 1
  useScrollScene(scene, (height, animated) => {
    const root = scene.value
    if (!root) return
    pinned.value = animated
    stepDistance = height * stepScreens
    root.style.height = animated ? `${height + count * stepDistance}px` : 'auto'
    if (!animated) return
    const position = Math.max(0, Math.min(count, -root.getBoundingClientRect().top / stepDistance))
    active.value = Math.min(count - 1, Math.floor(position))
    progress.value = Math.min(1, position - active.value)
  })
  const select = (index: number) => {
    active.value = Math.max(0, Math.min(count - 1, index))
    progress.value = 0
    if (!pinned.value || !scene.value) return
    window.scrollTo({ top: window.scrollY + scene.value.getBoundingClientRect().top + active.value * stepDistance + 1, behavior: 'instant' })
  }
  return { active, progress, pinned, select }
}
