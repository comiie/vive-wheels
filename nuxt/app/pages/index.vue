<script setup lang="ts">
const videoOpen = ref(false)
usePageMotion(videoOpen)
const asset = useAsset()
useHead({ htmlAttrs: { style: `--engineering-mask:url("${asset('imgLouisReedWStCaQpiLtcUnsplash3.svg')}");--journal-mask:url("${asset('imgDsc008151.svg')}")` } })
</script>

<template>
  <main class="home-page">
    <HeroSection :video-open="videoOpen" @open-video="videoOpen = true" />
    <ProductsSection />
    <StoryFlow />
    <UpgradeSection />
    <SiteFooter />
  </main>
  <VideoModal v-if="videoOpen" @close="videoOpen = false" />
</template>
