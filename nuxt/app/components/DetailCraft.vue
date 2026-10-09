<script setup lang="ts">
const asset = useAsset()
const scene = ref<HTMLElement | null>(null)
const cards = [
  { image: '6c269', title: 'Precision Manufacturing', position: 'bottom' },
  { image: 'b625c', title: 'Spoke-to-Rim Transition', position: 'center 30%' },
  { image: '0e7b9', title: 'Sculpted Surface', position: 'center' },
]
useScrollScene(scene, (viewport, animated) => {
  scene.value?.querySelectorAll<HTMLElement>('.craft-card').forEach(card => {
    const progress = animated ? Math.max(0, Math.min(1, (viewport * .95 - card.getBoundingClientRect().top) / (viewport * .48))) : 1
    card.style.setProperty('--unfold', String(progress))
  })
})
</script>
<template>
  <section id="craft" ref="scene" class="detail-editorial-section detail-craft" data-design-node="727:2914">
    <img class="craft-background" :src="asset('product-details/3365e.webp')" alt="" loading="lazy" />
    <header class="craft-heading" data-reveal="fade">
      <h2>Every Detail Has A Purpose.</h2>
      <p>VI-1 is defined by its balance of sharp geometry, controlled surfaces and carefully proportioned spoke architecture. Rather than adding complexity for visual effect, every detail is designed to contribute to the character of the wheel.</p>
    </header>
    <div class="craft-grid">
      <figure v-for="card in cards" :key="card.image" class="craft-card">
        <div class="craft-image"><img :src="asset(`product-details/${card.image}.webp`)" :alt="card.title" :style="{ objectPosition: card.position }" loading="lazy" /></div>
        <figcaption>{{ card.title }}</figcaption>
      </figure>
    </div>
    <div class="craft-contact" data-reveal="fade"><div><h2>Explore VIVE</h2><p>We offer a variety of colors, textures, and styles. If you cannot find a coating that suits your vehicle, please contact us to discuss customized solutions together.</p></div><ArrowButton href="mailto:info@vivewheels.com">CONTACT US</ArrowButton></div>
  </section>
</template>
<style>
.detail-craft{position:relative;isolation:isolate;overflow:clip;background:#000;padding:calc(100 * var(--u)) calc(80 * var(--u))}
.craft-background{position:absolute;bottom:0;left:0;width:100%;height:55%;object-fit:cover;opacity:.18;z-index:-2;mask-image:linear-gradient(transparent,#000)}
.craft-heading{text-align:center}.craft-heading h2,.craft-contact h2{font-size:calc(48 * var(--u));line-height:1.2;text-transform:uppercase}
.craft-heading p{max-width:calc(800 * var(--u));margin:calc(36 * var(--u)) auto 0;font-size:calc(20 * var(--u));line-height:1.4;color:#fffc}
.craft-grid{position:relative;height:calc(1288 * var(--u));margin-top:calc(80 * var(--u))}
.craft-card{--unfold:1;position:absolute;width:calc(547 * var(--u));margin:0}
.craft-card:nth-child(1){left:calc(77 * var(--u));top:0}.craft-card:nth-child(2){right:0;top:calc(296 * var(--u))}.craft-card:nth-child(3){left:calc(332 * var(--u));top:calc(794 * var(--u))}
.craft-image{height:calc(444 * var(--u));overflow:hidden;clip-path:inset(0 calc((1 - var(--unfold)) * 50%) 0 calc((1 - var(--unfold)) * 50%));will-change:clip-path}
.craft-image img{display:block;width:100%;height:100%;object-fit:cover;transform:scale(calc(1.08 - var(--unfold) * .08));filter:brightness(.9)}
.craft-card figcaption{font-size:calc(28 * var(--u));line-height:1.25;margin-top:calc(24 * var(--u));opacity:var(--unfold);transform:translateY(calc((1 - var(--unfold)) * 18px))}
.craft-contact{display:flex;align-items:center;justify-content:space-between;gap:40px;background:#2c2c2cbf;padding:calc(40 * var(--u)) calc(52 * var(--u));margin-top:calc(80 * var(--u))}.craft-contact p{font-size:calc(20 * var(--u));line-height:1.5;max-width:calc(917 * var(--u));margin-top:calc(24 * var(--u));color:#fffc}.craft-contact>a{flex-shrink:0}
@media(max-width:760px){.detail-craft{padding:60px 24px}.craft-heading h2,.craft-contact h2{font-size:28px}.craft-heading p,.craft-contact p{font-size:14px;max-width:none}.craft-grid{height:auto;display:grid;gap:40px;margin-top:40px}.craft-card{position:static;width:88%}.craft-card:nth-child(2){justify-self:end}.craft-image{height:auto;aspect-ratio:547/444;clip-path:none;will-change:auto}.craft-card figcaption{font-size:18px}.craft-contact{padding:24px;display:block;margin-top:50px}.craft-contact>a{margin-top:24px}}
@media(prefers-reduced-motion:reduce){.craft-image{clip-path:none;will-change:auto}.craft-image img{transform:none}.craft-card figcaption{opacity:1;transform:none}}
</style>
