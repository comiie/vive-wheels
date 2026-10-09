<script setup lang="ts">
const asset = useAsset()
useHead({ title: 'About VIVE' })
const viewport = ref<HTMLDivElement | null>(null)
const { progress, dragging, progressDragging, updateProgress, startDrag, moveDrag, finishDrag, cancelDrag, startProgressDrag, moveProgressDrag, finishProgressDrag, onKeydown } = useProductCarousel(viewport)
const step = (direction: number) => {
  const track = viewport.value?.querySelector<HTMLElement>('.about-manufacturing')
  const card = track?.querySelector('figure')
  if (!track || !card) return
  const distance = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap)
  viewport.value?.scrollBy({ left: direction * distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
const manufacturing = [
  ['695f7', 'Wheel inspection'], ['b2901', 'Precision manufacturing'],
  ['6c269', 'Surface treatment'], ['fe394', 'Manufacturing equipment'], ['40b1c', 'Engineering process'],
]
const support = [
  { title: 'Limited Lifetime Warranty', icon: 'd4ba9', text: 'Provides long-term structural quality assurance for defects in materials, manufacturing, and craftsmanship.' },
  { title: 'Technical Support', icon: '04053', text: 'Provides professional support regarding vehicle compatibility, installation, operation, and maintenance.' },
  { title: 'After-Sales Service', icon: 'efd41', text: 'From product delivery to subsequent use, we provide continuous professional services and support.' },
  { title: 'Warranty Claim', icon: '515ab', text: 'Provide a clear quality assurance application process and professional responses.' },
]
</script>

<template>
  <InnerPage :upgrade="false">
    <section class="inner-about-intro inner-photo">
      <img class="inner-background" :src="asset('inner-pages/4b66b.webp')" alt="VIVE-equipped off-road truck driving through mud" fetchpriority="high">
      <div class="inner-shade" />
      <div class="about-intro-copy">
        <MotionTitle as="h1" text="WHO WE ARE" />
        <p data-reveal="fade">VIVE was born from a passion for automotive culture and a belief in putting our manufacturing expertise to work in our own products. With years of experience in hub development, engineering, and aluminum alloy research, we bring together material knowledge, structural design, and manufacturing precision to create wheels that balance performance and design.</p>
      </div>
    </section>
    <AboutPrinciples />
    <section class="about-engineering">
      <MotionTitle text="ENGINEERING WITH PURPOSE" />
      <div class="about-engineering-heading" data-reveal="fade">
        <p>From forging to CNC precision machining, to surface treatment and quality verification.</p>
        <ArrowButton href="/technology">LEARN MORE</ArrowButton>
      </div>
      <div data-reveal="lift">
      <div ref="viewport" class="about-manufacturing-viewport" :class="{ 'is-dragging': dragging }" @scroll="updateProgress" @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="finishDrag" @pointercancel="cancelDrag" @dragstart.prevent>
      <div class="about-manufacturing">
        <figure v-for="[image, label] in manufacturing" :key="image" :style="{ maskImage: `url(${asset('imgDsc008151.svg')})` }">
          <img :src="asset(`inner-pages/${image}.webp`)" :alt="label" loading="lazy"><div class="inner-shade" />
        </figure>
      </div>
      </div>
      <div class="about-engineering-bottom">
        <div class="about-ruler" :class="{ 'is-dragging': progressDragging }" role="slider" tabindex="0" aria-label="Manufacturing gallery position" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(progress * 100)" @pointerdown="startProgressDrag" @pointermove="moveProgressDrag" @pointerup="finishProgressDrag" @pointercancel="finishProgressDrag" @keydown="onKeydown"><i v-for="i in 118" :key="i" :style="{ height: `calc(var(--u) * ${12 + 18 * Math.max(0, 1 - Math.abs(i / 118 - (.147 + progress * .843)) / .04)})` }" /><b :style="{ left: `${14.7 + progress * 84.3}%` }" /></div>
        <div class="about-arrows"><button type="button" class="outline-button" aria-label="Previous manufacturing image" :disabled="progress <= 0" @click="step(-1)"><ArrowIcon direction="left" /></button><button type="button" class="outline-button" aria-label="Next manufacturing image" :disabled="progress >= .999" @click="step(1)"><ArrowIcon /></button></div>
      </div>
      </div>
    </section>
    <AboutOwnerExperience />
    <section class="about-support">
      <MotionTitle text="WARRANTY &amp; OWNER SUPPORT" />
      <div class="about-support-grid">
        <article v-for="(item, i) in support" :key="item.title" data-reveal="lift" :style="{ '--reveal-delay': `${i * .08}s` }">
          <div class="support-icon"><img :src="asset(`inner-pages/${item.icon}.svg`)" alt=""></div>
          <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </section>
    <section class="about-wheel-hub inner-photo">
      <img class="inner-background" :src="asset('inner-pages/4613d.webp')" alt="A collection of VIVE alloy wheels" loading="lazy">
      <div class="inner-shade" />
      <div class="about-hub-copy">
        <MotionTitle text="EVERY VIVE WHEEL HUB" />
        <p data-reveal="fade">embodies our commitment to materials, engineering, and manufacturing. Every service we provide represents our responsibility and dedication to our users.<br>Whether you’re driving on city roads, mountain paths, racing tracks, or on off-road adventures, we hope that VIVE can be your trusted companion.</p>
      </div>
    </section>
  </InnerPage>
</template>
