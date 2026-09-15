<script setup lang="ts">
import { stats } from '../data/content'
const asset = useAsset()
const counters = stats.map(([number, label]) => {
  const match = number.match(/^([\d.]+)(.*)$/)!
  const target = match[1]!
  return { number, label, target, suffix: match[2]!, decimals: target.includes('.') ? target.split('.')[1]!.length : 0 }
})
</script>

<template>
  <section id="about" class="about screen">
    <video class="about-bg" :src="asset('who-we-are-bg.webm')" autoplay muted loop playsinline preload="auto" aria-hidden="true" />
    <div class="about-overlay" />
    <div class="about-intro" data-reveal="lift"><h2 class="reveal-title" data-reveal="words" aria-label="WHO WE ARE"><RevealWords text="WHO WE ARE" /></h2><p>Premium aluminum alloy wheels crafted for performance</p><ArrowButton>ABOUT US</ArrowButton></div>
    <div class="about-bottom" data-reveal="lift">
      <p class="about-description">VIVE Wheels is built on more than 20 years of expertise in aluminum alloy development and manufacturing. Our foundation lies in material science.</p>
      <div class="stats"><div v-for="counter in counters" :key="counter.label" class="stat"><strong :data-count-target="counter.target" :data-count-suffix="counter.suffix" :data-count-decimals="counter.decimals" :aria-label="counter.number">0{{ counter.suffix }}</strong><span>{{ counter.label }}</span></div></div>
    </div>
  </section>
</template>
