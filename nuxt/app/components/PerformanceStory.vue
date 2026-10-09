<script setup lang="ts">
const asset = useAsset()
const viewport = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const overflowing = ref(false)
const thumbSize = ref(100)
const thumbTop = ref(0)
let observer: ResizeObserver | undefined
let alive = true
const measure = () => {
  const el = viewport.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  overflowing.value = max > 1
  thumbSize.value = max > 1 ? Math.max(12, el.clientHeight / el.scrollHeight * 100) : 100
  thumbTop.value = max > 1 ? Math.max(0, Math.min(1, el.scrollTop / max)) * (100 - thumbSize.value) : 0
}
const seek = (event: PointerEvent) => {
  const el = viewport.value
  if (!el) return
  const rail = event.currentTarget as HTMLElement
  if (event.type === 'pointerdown') rail.setPointerCapture(event.pointerId)
  if (event.type === 'pointermove' && !rail.hasPointerCapture(event.pointerId)) return
  const rect = rail.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
  el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
}
onMounted(() => {
  observer = new ResizeObserver(measure)
  if (viewport.value) observer.observe(viewport.value)
  if (content.value) observer.observe(content.value)
  document.fonts.ready.then(() => { if (alive) measure() })
  measure()
})
onBeforeUnmount(() => { alive = false; observer?.disconnect() })
</script>

<template>
  <section id="performance" class="detail-editorial-section performance-story" data-design-node="727:2868">
    <img class="performance-background" :src="asset('product-details/1216f.webp')" alt="" loading="lazy" />
    <div class="performance-content" data-reveal="fade">
      <h2>Performance, Refined For The Road.</h2>
      <div class="performance-copy-wrap">
        <div ref="viewport" class="performance-copy" :tabindex="overflowing ? 0 : undefined" :role="overflowing ? 'region' : undefined" :aria-label="overflowing ? 'Performance story, scroll to read more' : undefined" :data-lenis-prevent="overflowing ? '' : undefined" @scroll.passive="measure">
          <div ref="content" class="performance-paragraphs">
            <slot>
              <p>Street Series is developed for drivers who expect more from every mile.</p>
              <p>Built around VIVE's engineering approach, the series combines forged aluminum construction, vehicle-specific fitment and performance-oriented design to create wheels that feel equally at home on the daily commute, open road and spirited drive.</p>
              <p>From proportion and weight distribution to structural integrity and finish, every element is developed with one purpose:</p>
            </slot>
          </div>
        </div>
        <div v-if="overflowing" class="performance-scroll-rail" aria-hidden="true" @pointerdown="seek" @pointermove="seek"><span :style="{ height: thumbSize + '%', top: thumbTop + '%' }" /></div>
      </div>
    </div>
  </section>
</template>

<style>
.performance-story{position:relative;height:calc(100svh - 80 * var(--u));min-height:420px;overflow:hidden;display:flex;align-items:center;isolation:isolate;background:#111}
.performance-background{position:absolute;left:-48.59%;top:-60.84%;width:148.59%;max-width:none;height:176.13%;object-fit:cover;z-index:-2}
.performance-story::before{content:'';position:absolute;inset:0;background:#0007;z-index:-1}
.performance-content{width:100%;padding:40px calc(80 * var(--u));text-align:center}
.performance-content h2{font-size:calc(48 * var(--u));line-height:1.2;text-transform:uppercase;margin:0 0 calc(30 * var(--u))}
.performance-copy-wrap{position:relative}
.performance-copy{max-height:min(30svh,calc(240 * var(--u)));overflow-y:auto;scrollbar-width:none;outline:none;padding:0 calc(150 * var(--u));font-size:calc(18 * var(--u));line-height:1.4;color:#fffc}
.performance-copy::-webkit-scrollbar{display:none}
.performance-copy:focus-visible{background:#0002}
.performance-paragraphs{max-width:calc(1348 * var(--u));margin:0 auto}
.performance-paragraphs p{margin:0}
.performance-scroll-rail{position:absolute;right:0;top:0;bottom:0;width:24px;cursor:ns-resize;touch-action:none}
.performance-scroll-rail::before{content:'';position:absolute;left:11px;top:0;bottom:0;width:2px;background:#fff4}
.performance-scroll-rail span{position:absolute;left:11px;width:2px;background:#fff;pointer-events:none}
@media(max-width:760px){.performance-content{padding:32px 24px}.inner-page .performance-content h2{font-size:28px;line-height:1.2}.performance-copy{font-size:14px;padding:0 18px 0 0;max-height:32svh}.performance-scroll-rail{right:-16px}.performance-paragraphs{max-width:none}}
</style>
