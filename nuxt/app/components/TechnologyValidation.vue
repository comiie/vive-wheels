<script setup lang="ts">
import { validationSlides } from '../data/technology'
const asset = useAsset()
const scene = ref<HTMLElement | null>(null)
const screen = ref<HTMLElement | null>(null)
const validation = ref(0)
const progress = ref(0)
const entered = ref(false)
const pinned = ref(false)
const paused = ref(false)
const reduced = ref(false)
let inView = false
let frame = 0
let last = 0
let elapsed = 0
const duration = 5400
let observer: IntersectionObserver | undefined
let media: MediaQueryList | undefined
useScrollScene(scene, (_, animated) => { pinned.value = animated })
const select = (index: number) => { validation.value = index; elapsed = 0; progress.value = 0; last = 0 }
const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0 }
const canPlay = () => inView && !paused.value && !reduced.value && !document.hidden
const tick = (now: number) => {
  frame = 0
  if (!canPlay()) { last = 0; return }
  if (last) elapsed += Math.min(now - last, 100)
  last = now
  if (elapsed >= duration) select((validation.value + 1) % validationSlides.length)
  progress.value = elapsed / duration
  frame = requestAnimationFrame(tick)
}
const sync = () => { stop(); if (canPlay()) frame = requestAnimationFrame(tick) }
const preference = () => { reduced.value = !!media?.matches; sync() }
const keydown = (event: KeyboardEvent, index: number) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  select(event.key === 'Home' ? 0 : event.key === 'End' ? 1 : (index + 1) % 2)
  document.getElementById(`validation-tab-${validation.value}`)?.focus()
}
watch(paused, sync)
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preference)
  preference()
  observer = new IntersectionObserver(([entry]) => {
    inView = !!entry && entry.intersectionRatio >= .6
    if (inView) entered.value = true
    sync()
  }, { threshold: [0, .6] })
  if (screen.value) observer.observe(screen.value)
  document.addEventListener('visibilitychange', sync)
})
onBeforeUnmount(() => { stop(); observer?.disconnect(); media?.removeEventListener('change', preference); document.removeEventListener('visibilitychange', sync) })
</script>
<template>
  <section id="validation" ref="scene" class="validation-scene" :class="{ 'is-pinned': pinned }">
    <div ref="screen" class="technology-validation inner-photo" :class="{ 'has-entered': entered }" aria-roledescription="carousel" aria-label="Engineering validation" @focusin="($event.target as HTMLElement).closest('.validation-play') || (paused = true)">
      <img v-for="(slide, i) in validationSlides" :key="slide.label" class="technology-validation-background" :class="{ 'is-active': validation === i, 'is-pev': i === 1 }" :src="asset(`technology/${slide.image}.webp`)" :alt="`${slide.label} engineering validation`" :aria-hidden="validation !== i" loading="lazy" /><div class="inner-shade" />
      <div class="technology-validation-tabs" role="tablist" aria-label="Engineering validation">
        <button v-for="(slide, i) in validationSlides" :id="`validation-tab-${i}`" :key="slide.label" role="tab" :aria-selected="validation === i" aria-controls="validation-panel" :tabindex="validation === i ? 0 : -1" @click="select(i)" @keydown="keydown($event, i)">{{ slide.label }}<img :src="asset('inner-pages/bd31f.svg')" alt="" /><span class="validation-tab-progress" :style="{ transform: `scaleX(${validation === i ? (reduced ? 1 : progress) : 0})` }"><img :src="asset('inner-pages/0b625.svg')" alt="" /></span></button>
      </div>
      <button class="validation-play" :aria-label="paused || reduced ? 'Play validation carousel' : 'Pause validation carousel'" @click="paused = !paused" :disabled="reduced">{{ paused || reduced ? 'PLAY' : 'PAUSE' }}</button>
      <div id="validation-panel" class="technology-validation-panel" role="tabpanel" :aria-labelledby="`validation-tab-${validation}`" :aria-live="paused ? 'polite' : 'off'">
        <div :key="validation" class="validation-slide-content">
          <h2><span>（{{ validationSlides[validation]!.label }}）</span>{{ validationSlides[validation]!.title }}</h2>
          <div class="technology-validation-stages" role="region" aria-label="Validation process" tabindex="0"><img :src="asset('technology/8d855.svg')" alt="" /><ol><li v-for="(stage, index) in validationSlides[validation]!.stages" :key="stage" :style="{ '--stage': index }"><i aria-hidden="true" />{{ stage }}</li></ol></div>
        </div>
      </div>
      <div :key="`links-${validation}`" class="technology-series"><a v-for="link in validationSlides[validation]!.links" :key="link.label" :href="link.href" class="wipe-control"><span>{{ link.label }}</span></a></div>
    </div>
  </section>
</template>
<style>
.validation-scene .technology-validation>.inner-shade{background:linear-gradient(180deg,#0006,#0004 35%,#0009 65%,#000e)}
.validation-scene{position:relative}.validation-scene.is-pinned{height:210svh}.validation-scene.is-pinned>.technology-validation{position:sticky;top:0}.validation-scene .technology-validation{height:100svh;min-height:540px}.validation-scene .technology-validation-background{object-fit:cover;opacity:0;transition:opacity .65s ease}.validation-scene .technology-validation-background.is-active{opacity:1}.validation-scene .technology-validation-background.is-pev{left:0;top:-25.26%;width:100%;height:141.83%}.validation-scene .inner-shade{background:linear-gradient(180deg,#0006,#0004 35%,#0009 65%,#000e)}.validation-tab-progress{position:absolute;bottom:0;left:0;width:100%;height:1px;transform-origin:left}.technology-validation-tabs .validation-tab-progress img{position:static;display:block;width:100%;height:1px}.validation-play{position:absolute;right:4.1667%;top:9svh;background:none;border:0;color:#fff9;font:inherit;font-size:11px;letter-spacing:.1em;padding:8px;cursor:pointer}.validation-play:disabled{opacity:.4;cursor:default}.validation-scene .technology-validation-stages li{white-space:normal;padding:0 5px;opacity:0;transform:translateY(12px)}.validation-scene .technology-validation-stages>img{clip-path:inset(0 100% 0 0)}.has-entered .technology-validation-stages li{animation:validation-step .32s both;animation-delay:calc(.18s + var(--stage) * .11s)}.has-entered .technology-validation-stages>img{animation:validation-line 1.1s .12s both}.has-entered .validation-slide-content h2{animation:validation-step .35s both}.validation-scene .technology-series{gap:calc(24 * var(--u))}.validation-scene .technology-series a{white-space:nowrap}
@keyframes validation-step{to{opacity:1;transform:translateY(0)}}
@keyframes validation-line{to{clip-path:inset(0 0 0 0)}}
@media(max-width:760px){.validation-scene .technology-validation{height:100svh;min-height:700px}.validation-scene .technology-validation-panel{top:auto;bottom:180px;padding:0 20px}.validation-scene .technology-validation-panel h2{font-size:26px;line-height:1.2}.validation-scene .technology-validation-tabs{padding:55px 60px 0 24px}.validation-play{top:48px;right:12px;font-size:9px}.validation-scene .technology-series{bottom:30px;gap:10px;flex-wrap:wrap}.validation-scene .technology-series a{font-size:10px;padding:9px}.validation-scene .technology-validation-stages ol{grid-template-columns:repeat(4,1fr);gap:22px 8px}.validation-scene .technology-validation-stages li{font-size:10px;line-height:1.4}.validation-scene .technology-validation-background.is-pev{object-fit:cover}}
@media(prefers-reduced-motion:reduce){.validation-scene .technology-validation-background{transition:none}.validation-scene .technology-validation-stages li{opacity:1;transform:none;animation:none}.validation-scene .technology-validation-stages>img{clip-path:none;animation:none}.has-entered .validation-slide-content h2{animation:none}}
</style>
