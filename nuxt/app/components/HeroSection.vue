<script setup lang="ts">
const asset = useAsset()
const emit = defineEmits<{ openVideo: [] }>()
</script>

<template>
  <section id="top" class="hero screen">
    <video class="hero-bg" :src="asset('scout-hero-11-21.webm')" :poster="asset('scout-hero-poster.webp')"
      autoplay muted loop playsinline preload="auto" aria-label="Scout autonomous vehicle driving through woodland" />
    <div class="hero-shade" />
    <img class="hero-top-fade" :src="asset('imgRectangle1430107304.webp')" alt="">
    <SiteHeader />
    <div class="hero-copy">
      <h1 aria-label="ENGINEERED FOR THE DRIVEN">
        <span aria-hidden="true"><i style="--word-index: 0">ENGINEERED</i>{{ ' ' }}<i style="--word-index: 2">FOR</i></span>
        <span aria-hidden="true"><i style="--word-index: 1">THE</i>{{ ' ' }}<i style="--word-index: 3">DRIVEN</i></span>
      </h1>
      <p>Performance wheels engineered through advanced materials and uncompromising design.</p>
    </div>
    <button class="video-card" type="button" aria-haspopup="dialog" aria-label="Play Discover VIVE video" @click="emit('openVideo')">
      <div class="video-thumb">
        <img :src="asset('imgImage2.webp')" alt="VIVE off-road video">
        <span class="play"><img :src="asset('imgFrame2087326985.svg')" alt="Play"></span>
      </div>
      <div class="video-meta"><span>NEW VIDEO</span><strong>Discover VIVE</strong></div>
    </button>
  </section>
</template>
