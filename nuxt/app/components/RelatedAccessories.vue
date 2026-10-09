<script setup lang="ts">
const asset = useAsset()
const track = ref<HTMLElement | null>(null)
// Shared temporary hover shot requested by the user; keep every resting image white.
const items = [{ name:'Aluminum Valve Stem', image:'f55e1', hoverImage:'7de27', type:'valve' }, { name:'Aluminum Valve Stem', image:'f55e1', hoverImage:'7de27', type:'valve' }, { name:'Chrome Lug Nuts & Bolts', image:'2256e', hoverImage:'7de27', type:'chrome' }, { name:'Zinc Lug Nuts & Bolts', image:'01c7d', hoverImage:'7de27', type:'zinc' }, { name:'Zinc Lug Nuts & Bolts', image:'01c7d', hoverImage:'7de27', type:'zinc' }]
let frame = 0
let target = 0
let moving = false
const stop = () => { cancelAnimationFrame(frame); moving = false }
const move = (direction: number) => {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.related-card')
  const step = (card?.offsetWidth ?? el.clientWidth / 4) + parseFloat(getComputedStyle(el).columnGap || '0')
  target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, (moving ? target : el.scrollLeft) + direction * step))
  cancelAnimationFrame(frame)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.scrollLeft = target; moving = false; return }
  moving = true
  const from = el.scrollLeft
  const start = performance.now()
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / 780)
    el.scrollLeft = from + (target - from) * (1 - Math.pow(1 - progress, 4))
    if (progress < 1) frame = requestAnimationFrame(tick)
    else moving = false
  }
  frame = requestAnimationFrame(tick)
}
onMounted(() => {
  track.value?.querySelectorAll<HTMLImageElement>('.related-hover-image').forEach(image => {
    if (image.complete && image.naturalWidth > 0) image.classList.add('is-loaded')
  })
})
onBeforeUnmount(stop)
</script>
<template><section id="related-accessories" class="related-accessories"><div class="related-heading"><MotionTitle text="RELATED ACCESSORIES" /><ArrowButton href="/product/accessories/zinc-lug-nuts">READ MORE</ArrowButton></div><div ref="track" class="related-track" @wheel.passive="stop" @pointerdown="stop" tabindex="0" aria-label="Related accessories" data-reveal="lift"><a v-for="(item, index) in items" :key="index" href="/product/accessories/zinc-lug-nuts" class="related-card"><div class="related-photo" :class="'related-' + item.type"><div><img :src="asset(`product-details/${item.image}.webp`)" :alt="item.name" loading="lazy" /></div><img class="related-hover-image" :class="{ 'is-close-crop': item.hoverImage === item.image }" :src="asset(`product-details/${item.hoverImage}.webp`)" alt="" loading="lazy" @load="($event.target as HTMLImageElement).classList.add('is-loaded')" /></div><p>{{ item.name }}<ArrowIcon /></p></a></div><button class="related-prev outline-button" aria-label="Previous accessories" @click="move(-1)">
<ArrowIcon direction="left" /></button><button class="related-next outline-button" aria-label="Next accessories" @click="move(1)">
<ArrowIcon /></button></section></template>
<style>
.related-accessories{position:relative;height:calc(895 * var(--u));padding-top:calc(100 * var(--u));overflow:hidden}.related-heading{display:flex;justify-content:space-between;align-items:baseline;margin:0 calc(80 * var(--u))}.related-track{display:flex;gap:calc(24 * var(--u));overflow-x:auto;scrollbar-width:none;padding:0 calc(80 * var(--u));margin-top:calc(80 * var(--u));overscroll-behavior-x:contain}.related-track::-webkit-scrollbar{display:none}.related-card{flex:0 0 calc(422 * var(--u));display:block}.related-photo{height:calc(500 * var(--u));background:#e9eaea;position:relative;overflow:hidden}.related-photo>div{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);overflow:hidden}.related-photo img{position:absolute;max-width:none;transition:scale .6s cubic-bezier(.16,1,.3,1)}.related-photo>div{transition:scale .6s cubic-bezier(.16,1,.3,1)}.related-card:hover .related-photo>div{scale:1.035}.related-valve>div{width:calc(113 * var(--u));height:calc(327 * var(--u))}.related-valve img{width:535.48%;height:184.44%;left:-217.74%;top:-37.22%}.related-macro>div{width:100%;height:100%}.related-macro img{width:100%;height:126.6%;left:0;top:-15.43%}.related-chrome>div{width:calc(322 * var(--u));height:calc(203 * var(--u))}.related-chrome img{width:168.18%;height:266.4%;left:-31.31%;top:-85.6%}.related-zinc>div{width:calc(320 * var(--u));height:calc(193 * var(--u))}.related-zinc img{width:166.5%;height:275.21%;left:-32%;top:-86.78%}.related-card>p{display:flex;align-items:center;justify-content:space-between;margin-top:calc(33 * var(--u));font-size:calc(20 * var(--u));line-height:calc(24 * var(--u));color:#fffc}.related-card:hover>p{color:#fff}.related-card>p span{font-size:calc(28 * var(--u));transition:translate .35s}.related-card:hover>p span{translate:4px 0}.related-accessories>button{position:absolute;top:calc(468 * var(--u));height:calc(40 * var(--u));width:calc(40 * var(--u));background:#0002;backdrop-filter:blur(20px);border:0;color:white;font-size:calc(28 * var(--u));display:grid;place-items:center}.related-accessories>button:hover{background:#0008}.related-prev{left:calc(104 * var(--u))}.related-next{right:calc(104 * var(--u))}
</style>
<style>
.inner-page .related-accessories>button{top:calc(488 * var(--u));transform:translateY(-50%);padding:0;min-width:0;display:grid;place-items:center;background:#0003;isolation:isolate;overflow:hidden;border:1px solid #fff8}
.inner-page .related-accessories>button::before{display:block}
.inner-page .related-accessories>button:is(:hover,:focus-visible){color:#000}
.inner-page .related-accessories>button:hover{background:#0003}
.related-track{scroll-behavior:auto;touch-action:pan-x pan-y}
.related-photo>img.related-hover-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.025);transition:opacity .3s ease,transform .65s cubic-bezier(.16,1,.3,1);pointer-events:none}
.related-photo>img.related-hover-image.is-close-crop{object-fit:cover;transform:scale(1.7)}
.related-card:focus-visible .related-hover-image.is-loaded{opacity:1;transform:scale(1)}
.related-card:focus-visible .related-hover-image.is-close-crop.is-loaded{transform:scale(2.1)}
@media(hover:hover) and (pointer:fine){.related-card:hover .related-hover-image.is-loaded{opacity:1;transform:scale(1)}.related-card:hover .related-hover-image.is-close-crop.is-loaded{transform:scale(2.1)}}
@media(prefers-reduced-motion:reduce){.related-photo>img.related-hover-image{transition:none}}
</style>
