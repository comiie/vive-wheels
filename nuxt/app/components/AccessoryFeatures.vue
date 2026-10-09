<script setup lang="ts">
const asset = useAsset()
const features = [
  { image: '8c7fa', title: 'Precision Fitment', body: 'Designed around specific vehicle and wheel fitment requirements to support a precise installation.' },
  { image: 'aea2d', title: 'Refined Finish', body: 'A carefully finished surface complements the wheel design and maintains a clean, integrated appearance.' },
  { image: 'd4a2f', title: 'Complete The System', body: 'The right hardware completes the connection between wheel, vehicle and driver.' },
]
// Keep image elements mounted and move exactly one card per click.
const slides = [...features, ...features, ...features]
const position = ref(3)
const animated = ref(false)
let busy = false
let queued = 0
let timer: ReturnType<typeof setTimeout> | undefined
let frame = 0
const finish = () => {
  if (!busy) return
  clearTimeout(timer)
  animated.value = false
  position.value = 3 + ((position.value % 3) + 3) % 3
  frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => {
    busy = false
    if (queued) { const direction = Math.sign(queued); queued -= direction; move(direction) }
  }) })
}
const move = (direction: number) => {
  if (busy) { queued = Math.max(-6, Math.min(6, queued + direction)); return }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    position.value = 3 + (position.value + direction + 3) % 3
    return
  }
  busy = true
  animated.value = true
  position.value += direction
  timer = setTimeout(finish, 800)
}
onBeforeUnmount(() => { clearTimeout(timer); cancelAnimationFrame(frame) })
</script>
<template>
  <section class="accessory-features" aria-label="Hardware features" data-reveal="lift">
    <div class="accessory-feature-viewport">
      <div class="accessory-feature-grid" :class="{ 'is-moving': animated }" :style="{ transform: 'translate3d(calc(' + position * -600 + ' * var(--u)),0,0)' }" @transitionend="($event.target === $event.currentTarget && $event.propertyName === 'transform') && finish()">
        <article v-for="(item, index) in slides" :key="index" :aria-hidden="index < position || index >= position + 3">
          <div class="accessory-feature-photo"><img :class="{ 'feature-precision': item.image === '8c7fa' }" :src="asset('product-details/' + item.image + '.webp')" :alt="item.title" loading="lazy" /></div>
          <h2>{{ item.title }}</h2><p>{{ item.body }}</p>
        </article>
      </div>
    </div>
    <button type="button" class="feature-prev outline-button" aria-label="Previous feature" @click="move(-1)"><ArrowIcon direction="left" /></button>
    <button type="button" class="feature-next outline-button" aria-label="Next feature" @click="move(1)"><ArrowIcon /></button>
  </section>
</template>
<style>
.accessory-features{height:calc(810 * var(--u));padding:calc(100 * var(--u)) calc(80 * var(--u));position:relative}
.accessory-feature-viewport{overflow:hidden}
.accessory-feature-grid{display:flex;gap:calc(40 * var(--u));will-change:transform}
.accessory-feature-grid.is-moving{transition:transform .72s cubic-bezier(.22,.68,.1,1)}
.accessory-feature-grid article{flex:0 0 calc(560 * var(--u));min-width:0}
.accessory-feature-photo{height:calc(460 * var(--u));position:relative;overflow:hidden}
.accessory-feature-photo img{width:100%;height:100%;object-fit:cover}
.accessory-feature-photo img.feature-precision{position:absolute;height:182.61%;top:-18.6%;left:0;object-fit:fill}
.product-detail .accessory-feature-grid h2{font-size:calc(20 * var(--u));line-height:calc(24 * var(--u));margin-top:calc(24 * var(--u));color:#fffc}
.accessory-feature-grid p{font-size:calc(18 * var(--u));line-height:calc(24 * var(--u));color:#fffc;letter-spacing:calc(.72 * var(--u))!important;margin-top:calc(24 * var(--u));max-width:calc(540 * var(--u))}
.inner-page .accessory-features>button{position:absolute;top:calc(330 * var(--u));transform:translateY(-50%);width:calc(40 * var(--u));height:calc(40 * var(--u));padding:0;background:#0003;backdrop-filter:blur(20px);border:0;display:flex;align-items:center;justify-content:center}
.feature-prev{left:calc(110 * var(--u))}.feature-next{right:calc(110 * var(--u))}
</style>
