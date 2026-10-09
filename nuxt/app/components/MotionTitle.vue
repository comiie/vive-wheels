<script setup lang="ts">
withDefaults(defineProps<{ text: string; as?: 'h1' | 'h2' }>(), { as: 'h2' })
</script>
<template>
  <component :is="as" class="reveal-title" data-reveal="words" :aria-label="text"><RevealWords :text="text" /></component>
</template>
