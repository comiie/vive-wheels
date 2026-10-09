<script setup lang="ts">
const asset = useAsset()
const scene = ref<HTMLElement | null>(null)
const columns = [
  { speed: -.19, cards: [{ image: 'a107d', name: 'BMW M4 G82', spec: 'VI-1 · 20” · Obsidian Black' }, { image: '2a415', name: 'BMW M4 G82', spec: 'VI-1 · 20” · Obsidian Black' }] },
  { speed: .14, cards: [{ image: '3f605', name: 'PORSCHE 911 CARRERA', spec: 'VI-1 · 20” · Titanium Silver' }, { image: '663a7', name: 'PORSCHE 911 CARRERA', spec: 'VI-1 · 20” · Titanium Silver' }] },
  { speed: -.11, cards: [{ image: '05f8e', name: 'Mercedes-AMG GT', spec: 'VI-1 · 21” · Graphite Grey' }, { image: '4d249', name: 'MERCEDES-AMG GT', spec: 'VI-1 · 21” · Graphite Grey' }] },
  { speed: .22, cards: [{ image: 'e03d0', name: 'Porsche 911 Carrera', spec: 'VI-1 · 20” · Titanium Silver' }, { image: 'aa8f9', name: 'PORSCHE 911 CARRERA', spec: 'VI-1 · 20” · Titanium Silver' }] },
]
useScrollScene(scene, (viewport, animated) => {
  if (!scene.value) return
  const rect = scene.value.getBoundingClientRect()
  const travel = Math.max(-viewport, Math.min(viewport, viewport * .5 - (rect.top + rect.height * .5)))
  scene.value.querySelectorAll<HTMLElement>('.product-gallery-column').forEach((column, index) => {
    column.style.transform = animated ? `translate3d(0, ${travel * (columns[index]?.speed ?? 0)}px, 0)` : ''
  })
})
</script>
<template>
  <section id="gallery" ref="scene" class="detail-editorial-section product-editorial-gallery" data-design-node="727:3030">
    <header class="product-gallery-heading" data-reveal="fade"><h2>Gallery</h2><p>A closer look at the form, finish and character of VI-1.</p></header>
    <div class="product-gallery-columns">
      <div v-for="(column, index) in columns" :key="index" class="product-gallery-column">
        <figure v-for="card in column.cards" :key="card.image"><img :src="asset(`product-details/${card.image}.webp`)" :alt="card.name" loading="lazy" /><figcaption><h3>{{ card.name }}</h3><p>{{ card.spec }}</p></figcaption></figure>
      </div>
    </div>
  </section>
</template>
<style>
.product-editorial-gallery{position:relative;isolation:isolate;overflow:clip;background:#0e0f0f;padding:calc(100 * var(--u)) calc(66 * var(--u)) calc(260 * var(--u))}
/* The shade is fixed to the section edge, never to the revealing title or moving columns. */
.product-editorial-gallery::before{content:'';position:absolute;inset:0 0 auto;height:calc(360 * var(--u));z-index:1;pointer-events:none;background:linear-gradient(#0e0f0f 0%,#0e0f0fee 28%,#0e0f0f88 65%,transparent 100%)}
.product-gallery-heading{position:absolute;top:calc(70 * var(--u));left:0;right:0;z-index:2;text-align:center;pointer-events:none;padding:calc(30 * var(--u)) 0 calc(100 * var(--u))}.product-gallery-heading h2{font-size:calc(48 * var(--u));line-height:1.2;text-transform:uppercase}.product-gallery-heading p{font-size:calc(18 * var(--u));line-height:1.4;color:#fffc;margin-top:calc(24 * var(--u))}
.product-gallery-columns{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:calc(50 * var(--u))}
.product-gallery-column{display:flex;flex-direction:column;gap:calc(90 * var(--u));will-change:transform}.product-gallery-column:nth-child(even){padding-top:calc(82 * var(--u))}
.product-gallery-column figure{margin:0}.product-gallery-column img{width:100%;aspect-ratio:422/300;object-fit:cover;display:block}.product-gallery-column figcaption{margin-top:calc(24 * var(--u))}.product-gallery-column h3{font-size:calc(24 * var(--u));line-height:1.25;font-weight:400}.product-gallery-column p{font-size:calc(18 * var(--u));line-height:1.4;color:#fffc;margin-top:calc(8 * var(--u))}
@media(max-width:760px){.product-editorial-gallery::before{display:none}}
@media(max-width:760px){.product-editorial-gallery{padding:60px 24px}.product-gallery-heading{position:relative;top:auto;padding:0;margin-bottom:40px;background:none}.inner-page .product-gallery-heading h2{font-size:28px;line-height:1.2}.product-gallery-heading p{font-size:14px}.product-gallery-columns{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;padding:0}.product-gallery-column{gap:32px;will-change:auto}.product-gallery-column:nth-child(even){padding-top:36px}.product-gallery-column h3{font-size:16px}.product-gallery-column p{font-size:12px}.product-gallery-column figcaption{margin-top:12px}}
@media(prefers-reduced-motion:reduce){.product-gallery-column{transform:none!important;will-change:auto}}
</style>
