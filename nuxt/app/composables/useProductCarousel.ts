export function useProductCarousel(viewport: Ref<HTMLDivElement | null>) {
  const progress = ref(0)
  const dragging = ref(false)
  const progressDragging = ref(false)
  let frame = 0
  let progressTarget = 0
  let pointer: number | null = null
  let progressPointer: number | null = null
  let drag = { startX: 0, startScroll: 0, lastX: 0, lastTime: 0, velocity: 0 }
  const clamp = (value: number) => Math.min(1, Math.max(0, value))
  const maximum = () => Math.max(0, (viewport.value?.scrollWidth ?? 0) - (viewport.value?.clientWidth ?? 0))
  const updateProgress = () => { progress.value = clamp((viewport.value?.scrollLeft ?? 0) / Math.max(1, maximum())) }
  const stopMomentum = () => { cancelAnimationFrame(frame); frame = 0; dragging.value = false }
  const release = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLElement
    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId)
  }
  const glideToProgressTarget = () => {
    if (frame) return
    const glide = () => {
      const element = viewport.value
      if (!element) { frame = 0; return }
      const difference = progressTarget - element.scrollLeft
      if (Math.abs(difference) < 0.35) {
        element.scrollLeft = progressTarget
        updateProgress()
        frame = 0
        return
      }
      const before = element.scrollLeft
      element.scrollLeft += difference * 0.16
      // Engines that round scrollLeft to whole pixels must still settle cleanly.
      if (element.scrollLeft === before) {
        element.scrollLeft = progressTarget
        updateProgress()
        frame = 0
        return
      }
      updateProgress()
      frame = requestAnimationFrame(glide)
    }
    frame = requestAnimationFrame(glide)
  }
  const seekFromPointer = (event: PointerEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const value = clamp((event.clientX - rect.left - rect.width * 0.147) / (rect.width * 0.843))
    progressTarget = value * maximum()
    glideToProgressTarget()
  }
  const startProgressDrag = (event: PointerEvent) => {
    if (event.button !== 0 || progressPointer !== null) return
    stopMomentum()
    progressPointer = event.pointerId
    progressDragging.value = true
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    seekFromPointer(event)
  }
  const moveProgressDrag = (event: PointerEvent) => { if (event.pointerId === progressPointer) seekFromPointer(event) }
  const finishProgressDrag = (event: PointerEvent) => {
    if (event.pointerId !== progressPointer) return
    progressPointer = null
    progressDragging.value = false
    release(event)
  }
  const startDrag = (event: PointerEvent) => {
    if (event.button !== 0 || pointer !== null || (event.target as Element).closest('.color-swatch')) return
    stopMomentum()
    const now = performance.now()
    drag = { startX: event.clientX, startScroll: viewport.value?.scrollLeft ?? 0, lastX: event.clientX, lastTime: now, velocity: 0 }
    pointer = event.pointerId
    dragging.value = true
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }
  const moveDrag = (event: PointerEvent) => {
    if (event.pointerId !== pointer || !viewport.value) return
    const now = performance.now()
    drag.velocity = (drag.lastX - event.clientX) / Math.max(1, now - drag.lastTime)
    drag.lastX = event.clientX
    drag.lastTime = now
    viewport.value.scrollLeft = drag.startScroll - (event.clientX - drag.startX)
    updateProgress()
  }
  const finishDrag = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return
    pointer = null
    release(event)
    let velocity = performance.now() - drag.lastTime > 100 ? 0 : drag.velocity * 17
    const glide = () => {
      const element = viewport.value
      if (!element || Math.abs(velocity) < 0.12) { stopMomentum(); return }
      const before = element.scrollLeft
      element.scrollLeft += velocity
      updateProgress()
      if (element.scrollLeft === before) { stopMomentum(); return }
      velocity *= 0.92
      frame = requestAnimationFrame(glide)
    }
    frame = requestAnimationFrame(glide)
  }
  const cancelDrag = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return
    pointer = null
    release(event)
    stopMomentum()
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || !viewport.value) return
    event.preventDefault()
    stopMomentum()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : clamp(progress.value + (event.key === 'ArrowRight' ? 0.02 : -0.02))
    viewport.value.scrollLeft = next * maximum()
    updateProgress()
  }
  let observer: ResizeObserver | undefined
  onMounted(() => {
    updateProgress()
    observer = new ResizeObserver(() => {
      progressTarget = Math.min(maximum(), progressTarget)
      updateProgress()
    })
    if (viewport.value) observer.observe(viewport.value)
    window.addEventListener('resize', updateProgress)
  })
  onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('resize', updateProgress); stopMomentum() })
  return { progress, dragging, progressDragging, updateProgress, startDrag, moveDrag, finishDrag, cancelDrag, startProgressDrag, moveProgressDrag, finishProgressDrag, onKeydown }
}
