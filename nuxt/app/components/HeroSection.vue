<script setup lang="ts">
const asset = useAsset()
const props = defineProps<{ videoOpen?: boolean }>()
const bannerVideo = ref<HTMLVideoElement | null>(null)
const emit = defineEmits<{ openVideo: [] }>()
watch(() => props.videoOpen, (open) => {
  if (open) bannerVideo.value?.pause()
  else void bannerVideo.value?.play().catch(() => { /* The poster remains visible if autoplay is blocked. */ })
})
</script>

<template>
  <section id="top" class="hero screen">
    <video ref="bannerVideo" class="hero-bg" :poster="asset('vive-factory-poster.webp')"
      autoplay muted loop playsinline preload="auto" aria-label="VIVE wheel manufacturing — 20 second preview">
      <source :src="asset('vive-factory-banner-mobile-20s.webm')" type="video/webm" media="(max-width: 760px)">
      <source :src="asset('vive-factory-banner-20s.webm')" type="video/webm">
    </video>
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
        <img :src="asset('vive-factory-poster.webp')" alt="Watch the full VIVE manufacturing film">
        <span class="play"><img :src="asset('imgFrame2087326985.svg')" alt="Play"></span>
      </div>
      <div class="video-meta"><span>NEW VIDEO</span><strong>Discover VIVE</strong></div>
    </button>
  </section>
</template>
