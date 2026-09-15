<script setup lang="ts">
const asset = useAsset()
</script>

<template>
  <button class="outline-button" type="button">
    <span><slot /></span><img :src="asset('imgFrame2147238903.svg')" alt="">
  </button>
</template>
