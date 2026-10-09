<script setup lang="ts">
defineProps<{ href?: string }>()
</script>

<template>
  <component :is="href ? 'a' : 'button'" class="outline-button" :type="href ? undefined : 'button'" :href="href">
    <span><slot /></span><ArrowIcon />
  </component>
</template>
