<script setup lang="ts">
import { materialTopics } from '../data/technology'
const asset = useAsset()
const material = ref(0)
const scene = ref<HTMLElement | null>(null)
const pinned = ref(false)
useScrollScene(scene, (_, animated) => { pinned.value = animated })
const select = (index: number) => { material.value = index }
const keydown = (event: KeyboardEvent, index: number) => {
  if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  select(event.key === 'Home' ? 0 : event.key === 'End' ? materialTopics.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : materialTopics.length - 1)) % materialTopics.length)
  document.getElementById(`material-tab-${material.value}`)?.focus()
}
</script>
<template>
  <section id="materials" ref="scene" class="technology-materials-scene" :class="{ 'is-pinned': pinned }">
  <div class="technology-materials">
    <div class="technology-materials-sidebar"><MotionTitle text="DEFINE PERFORMANCE STARTING FROM THE MATERIALS" /><div class="technology-material-tabs" role="tablist" aria-label="Engineering technologies" aria-orientation="vertical" data-reveal="lift">
      <button v-for="(item, i) in materialTopics" :id="`material-tab-${i}`" :key="item.title" role="tab" :aria-selected="material === i" :aria-controls="`material-panel-${i}`" :tabindex="material === i ? 0 : -1" @click="select(i)" @keydown="keydown($event, i)"><span>{{ item.title }}</span></button>
    </div></div>
    <div class="technology-material-display">
      <div v-for="(item, i) in materialTopics" :id="`material-panel-${i}`" :key="item.title" class="technology-material-panel inner-photo" :class="{ 'is-active': material === i }" role="tabpanel" :aria-labelledby="`material-tab-${i}`" :aria-hidden="material !== i" :inert="material !== i">
        <img class="inner-background" :src="asset(`technology/${item.image}.webp`)" :alt="item.title" loading="lazy" /><div class="inner-shade" /><p>{{ item.text }}</p>
      </div>
    </div>
  </div>
  </section>
</template>
<style>
.technology-materials-scene{position:relative}.technology-materials-scene.is-pinned{height:175svh}.technology-materials-scene.is-pinned>.technology-materials{position:sticky;top:0}
.technology-materials-scene .technology-material-tabs button{display:block;border:0;border-top:1px solid #ffffff66;padding-left:calc(80 * var(--u));padding-right:calc(32 * var(--u))}.technology-materials-scene .technology-material-tabs button:last-child{border-bottom:1px solid #ffffff66}.technology-materials-scene .technology-material-tabs button[aria-selected=true]{box-shadow:inset -1px 0 #fff}.technology-material-tabs button>span{display:block}
.technology-material-display .technology-material-panel .inner-shade{background:linear-gradient(180deg,#0001 25%,#0005 55%,#000e 100%)}
.technology-material-display{position:relative;min-width:0;overflow:hidden}.technology-material-display .technology-material-panel{position:absolute;inset:0;height:100%;opacity:0;visibility:hidden;transition:opacity .5s ease,visibility 0s .5s}.technology-material-display .technology-material-panel.is-active{opacity:1;visibility:visible;transition-delay:0s;z-index:1}.technology-material-display .inner-background{transform:scale(1.025);transition:transform .75s cubic-bezier(.16,1,.3,1)}.technology-material-display .is-active .inner-background{transform:scale(1)}.technology-material-display .inner-shade{background:linear-gradient(180deg,#0001 25%,#0005 55%,#000e 100%)}.technology-material-display p{opacity:0;translate:0 12px;transition:opacity .28s ease,translate .4s ease}.technology-material-display .is-active p{opacity:1;translate:0 0;transition-delay:.12s}.technology-material-tabs button{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #fff5;padding-right:calc(32 * var(--u))}.technology-material-tabs button[aria-selected=true]{box-shadow:inset -2px 0 #fff}.technology-material-tabs i{font-style:normal;font-size:24px;transition:transform .3s;font-weight:400}.technology-material-tabs i.active{transform:rotate(45deg)}
@media(max-width:760px){.technology-material-display{height:620px}.technology-materials-scene .technology-material-tabs button{padding-inline:24px}.technology-material-display .technology-material-panel{height:100%}}
@media(prefers-reduced-motion:reduce){.technology-material-display .technology-material-panel,.technology-material-display .inner-background,.technology-material-display p,.technology-material-tabs i{transition:none;transform:none;translate:none}}
</style>
