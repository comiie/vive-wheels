<script setup lang="ts">
import { qualitySteps } from '../data/technology'
const asset = useAsset()
const scene = ref<HTMLElement | null>(null)
const viewport = ref<HTMLDivElement | null>(null)
const track = ref<HTMLElement | null>(null)
const pinned = ref(false)
const progress = ref(0)
const railVisible = ref(false)
let distance = 0
useScrollScene(scene, (height, animated) => {
  if (!scene.value || !viewport.value || !track.value) return
  pinned.value = animated
  distance = Math.max(0, track.value.scrollWidth - viewport.value.clientWidth)
  scene.value.style.height = animated ? `${height + distance}px` : 'auto'
  const travel = Math.max(0, Math.min(distance, -scene.value.getBoundingClientRect().top))
  progress.value = distance ? travel / distance : 0
  railVisible.value = animated && distance > 0 && travel < distance - 1
  track.value.style.transform = animated ? `translate3d(${-travel}px,0,0)` : ''
  if (animated) viewport.value.scrollLeft = 0
})
const keydown = (event: KeyboardEvent) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const el = viewport.value
  if (!el || !scene.value) return
  if (pinned.value) {
    const top = window.scrollY + scene.value.getBoundingClientRect().top
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? distance : Math.max(0, Math.min(distance, distance * progress.value + (event.key === 'ArrowRight' ? 1 : -1) * window.innerWidth * .65))
    window.scrollTo({ top: top + next, behavior: 'instant' })
  } else el.scrollTo({ left: event.key === 'Home' ? 0 : event.key === 'End' ? el.scrollWidth : el.scrollLeft + (event.key === 'ArrowRight' ? 1 : -1) * el.clientWidth * .8, behavior: 'instant' })
}
</script>
<template>
  <section id="quality-process" ref="scene" class="technology-workflow-scene" :class="{ 'is-pinned': pinned }">
    <div ref="viewport" class="technology-workflow" tabindex="0" role="region" aria-label="Quality control process — scroll to explore horizontally" @keydown="keydown">
      <div ref="track" class="technology-workflow-track">
        <div class="technology-workflow-intro"><h2 data-reveal="lift">QUALITY<br />CONTROL</h2><img :src="asset('technology/f05d4.webp')" alt="VIVE quality control process" loading="lazy" /></div>
        <article v-for="(step, i) in qualitySteps" :key="step.title" class="technology-step" :class="{ 'is-lower': i % 2 === 1, 'is-first': i === 0 }"><img :src="asset(`technology/${step.image}.webp`)" :alt="step.title" loading="lazy" /><div data-reveal="lift"><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div></article>
      </div>
      <div v-if="pinned" class="workflow-scroll-progress" :class="{ 'is-hidden': !railVisible }" aria-hidden="true"><span :style="{ transform: `scaleX(${progress})` }" /></div>
    </div>
  </section>
</template>
<style>
.workflow-scroll-progress{transition:opacity .18s ease}.workflow-scroll-progress.is-hidden{opacity:0}
.technology-workflow-scene{position:relative}.technology-workflow-scene.is-pinned>.technology-workflow{position:sticky;top:0;height:100svh;overflow:hidden;cursor:default}.technology-workflow-scene.is-pinned .technology-workflow-track{--u:min(calc(100vw / 1920),calc(100svh / 965));height:100svh;will-change:transform}.workflow-scroll-progress{position:absolute;bottom:20px;left:4.1667%;right:4.1667%;height:1px;background:#fff3}.workflow-scroll-progress span{display:block;height:100%;background:#fff;transform-origin:left}.technology-workflow-scene:not(.is-pinned) .technology-workflow{touch-action:pan-x pan-y}
</style>
