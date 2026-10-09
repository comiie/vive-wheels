<script setup lang="ts">
withDefaults(defineProps<{ open: boolean; as?: string }>(), { as: 'div' })
</script>
<template>
  <component :is="as" class="smooth-collapse" :class="{ 'is-expanded': open }" :aria-hidden="!open" :inert="!open">
    <div class="smooth-collapse-content"><slot /></div>
  </component>
</template>
<style>
.smooth-collapse{display:grid;grid-template-rows:0fr;opacity:0;visibility:hidden;transition:grid-template-rows .55s cubic-bezier(.22,.68,.1,1),opacity .4s ease,visibility 0s .55s}
.smooth-collapse.is-expanded{grid-template-rows:1fr;opacity:1;visibility:visible;transition:grid-template-rows .55s cubic-bezier(.22,.68,.1,1),opacity .4s ease,visibility 0s}
.smooth-collapse-content{min-height:0;overflow:hidden}
@media(prefers-reduced-motion:reduce){.smooth-collapse,.smooth-collapse.is-expanded{transition:none}}
</style>
