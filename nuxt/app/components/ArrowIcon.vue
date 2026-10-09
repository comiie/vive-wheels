<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'right' | 'left' | 'down' | 'up' }>(), { direction: 'right' })
const asset = useAsset()
</script>
<template><span class="vive-arrow" :class="`vive-arrow-${direction}`" :style="{ maskImage: `url(${asset('imgFrame2147238903.svg')})` }" aria-hidden="true" /></template>
<style>
.vive-arrow{display:inline-block;flex:0 0 var(--arrow-size,16px);width:var(--arrow-size,16px);min-width:var(--arrow-size,16px);height:var(--arrow-size,16px);aspect-ratio:1;background:currentColor;mask-size:100% 100%;mask-repeat:no-repeat;mask-position:center;vertical-align:middle;transform-origin:center;transition:rotate .55s cubic-bezier(.22,.68,.1,1)}
.vive-arrow-left{rotate:180deg}.vive-arrow-down{rotate:90deg}.vive-arrow-up{rotate:-90deg}
</style>
