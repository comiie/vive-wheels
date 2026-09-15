<script setup lang="ts">
const asset = useAsset()
</script>

<template>
  <section class="upgrade" data-reveal="lift">
    <div class="upgrade-image"><img :src="asset('imgRimBlackMetalGrungeCloseUp3DRendering1.webp')" alt="Close-up of a VIVE wheel" loading="lazy" decoding="async"></div>
    <div class="upgrade-copy"><h2 class="reveal-title" data-reveal="words" aria-label="READY TO UPGRADE YOUR WHEELS?"><RevealWords :text="'READY TO UPGRADE\nYOUR WHEELS?'" /></h2><p>Connect with us to see how VIVE Wheels can enhance your driving.</p><ArrowButton>CONTACT US</ArrowButton></div>
  </section>
</template>
