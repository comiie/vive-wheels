<script setup lang="ts">
import '../assets/inner-pages.css'
import '../assets/inner-motion.css'
withDefaults(defineProps<{ upgrade?: boolean }>(), { upgrade: true })
const modalOpen = ref(false)
provide('innerModalOpen', modalOpen)
usePageMotion(modalOpen)
</script>
<template>
  <main class="inner-page">
    <InnerHeader />
    <slot />
    <InnerUpgrade v-if="upgrade" />
    <SiteFooter design-preview />
  </main>
</template>
