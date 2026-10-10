<script setup lang="ts">
import type { CatalogWheel } from '../data/catalog'
const props = defineProps<{ wheel: CatalogWheel; entry?: boolean }>()
const asset = useAsset()
type Finish = 'Black' | 'Red' | 'Gold'
const selectedFinish = ref<Finish | null>(null)
const displayedFinish = computed(() => selectedFinish.value ?? (props.wheel.colors === '71d4e' ? 'Black' : null))
const displayImage = computed(() => selectedFinish.value ? ({ Black: '8c888', Red: '047c3', Gold: 'd9af7' }[selectedFinish.value]) : props.wheel.image)
const displayCrop = computed(() => selectedFinish.value ? ({ Black: 'silver', Red: 'red', Gold: 'gold' }[selectedFinish.value]) : props.wheel.crop)
const finishes: { name: Finish; color: string }[] = [{ name: 'Black', color: '#000' }, { name: 'Red', color: '#a90000' }, { name: 'Gold', color: '#896b00' }]
</script>
<template>
  <article class="catalog-card" data-reveal="lift" :data-reveal-group="entry ? 'catalog-entry' : undefined">
    <div class="catalog-card-media">
    <div class="catalog-card-shape" :style="{ backgroundImage: `url(${asset(`inner-pages/${wheel.shape}.svg`)})` }" />
    <div class="catalog-card-stage" />
    <span class="catalog-card-badge wipe-control">{{ wheel.type }}</span>
    <a class="catalog-wheel" :class="'catalog-wheel-' + displayCrop" href="/product/street/vi-1"><img :key="displayImage" :src="asset(`inner-pages/${displayImage}.webp`)" :alt="`${wheel.name} ${wheel.type.toLowerCase()} wheel`" loading="lazy"></a>
    </div>
    <div class="catalog-card-copy"><h2>{{ wheel.name }}</h2><p>MONOBLOCK</p></div>
    <div class="catalog-card-colors" role="group" :aria-label="`${wheel.name} finish preference`"><button v-for="finish in finishes" :key="finish.name" type="button" :aria-label="finish.name" :aria-pressed="displayedFinish === finish.name" :style="{ background: finish.color }" @click="selectedFinish = finish.name" /></div>
  </article>
</template>
