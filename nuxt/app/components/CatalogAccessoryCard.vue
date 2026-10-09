<script setup lang="ts">
defineProps<{ item: { name: string; image: string; type: string } }>()
const asset = useAsset()
</script>
<template>
  <a class="catalog-accessory-card" :style="{ '--card-shape': `url(${asset('inner-pages/a8167.svg')})` }" href="/product/accessories/zinc-lug-nuts" data-reveal="lift" data-reveal-group="catalog-entry">
    <div class="catalog-accessory-photo" :class="'accessory-crop-' + item.type"><div><img :src="asset(`product-details/${item.image}.webp`)" :alt="item.name" /></div></div>
    <h2>{{ item.name }}<ArrowIcon /></h2>
    <p>ACCESSORIES</p>
  </a>
</template>
