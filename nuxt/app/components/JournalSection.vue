<script setup lang="ts">
import { journals } from '../data/content'
const asset = useAsset()
</script>

<template>
  <section id="journal" class="journal section">
    <div class="section-heading" data-reveal="fade"><h2 class="reveal-title" data-reveal="words" aria-label="JOURNAL"><RevealWords text="JOURNAL" /></h2><ArrowButton>LEARN MORE</ArrowButton></div>
    <div class="journal-grid">
      <article v-for="([image, title], index) in journals" :key="title" class="journal-card" data-reveal="lift" :style="{ '--reveal-delay': `${index * 0.07}s` }">
        <div class="journal-image"><img :src="asset(image)" alt="" loading="lazy" decoding="async"><time datetime="2026-07-12">2026.7.12</time></div>
        <div class="journal-title"><h3>{{ title }}</h3><img :src="asset('imgFrame2147238930.svg')" alt=""></div>
      </article>
    </div>
  </section>
</template>
