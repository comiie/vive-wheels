<script setup lang="ts">
import { products, wheelColors } from '../data/content'
const props = defineProps<{ item: typeof products[number] }>()
const asset = useAsset()
const selectedColor = ref<keyof typeof wheelColors>(props.item.color)
const selectedWheel = computed(() => selectedColor.value === props.item.color ? props.item : wheelColors[selectedColor.value])
</script>

<template>
  <article class="product-card">
    <img class="product-shape" :src="asset('imgVector14.svg')" alt="">
    <div class="product-stage" />
    <div class="wheel-box" :class="selectedWheel.variant"><img :key="selectedColor" :src="asset(selectedWheel.image)" :alt="`VIVE VV1R ${selectedColor} forged wheel`"></div>
    <div class="product-copy"><h3>VV1R</h3><p>MONOBLOCK</p></div>
    <div class="swatches" aria-label="Wheel finish options">
      <button v-for="(option, color) in wheelColors" :key="color" class="color-swatch" :class="{ 'is-active': selectedColor === color }"
        type="button" :aria-label="`Select ${color} finish`" :aria-pressed="selectedColor === color"
        @pointerdown.stop @click="selectedColor = color"><span :style="{ background: option.value }" /></button>
    </div>
  </article>
</template>
