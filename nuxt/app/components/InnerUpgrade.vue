<script setup lang="ts">
const asset = useAsset()
</script>
<template>
  <section class="inner-upgrade" data-reveal="lift">
    <div class="inner-upgrade-image"><img :src="asset('inner-pages/3365e.webp')" alt="Close-up of a black VIVE wheel" loading="lazy"></div>
    <div class="inner-upgrade-copy">
      <MotionTitle :text="'READY TO UPGRADE\nYOUR WHEELS?'" />
      <p>Connect with us to see how VIVE Wheels can enhance your driving.</p>
      <ArrowButton href="/contact">CONTACT US</ArrowButton>
    </div>
  </section>
</template>
