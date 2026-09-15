<script setup lang="ts">
import { products } from '../data/content'
const activeFilter = ref('OFF-ROAD')
const viewport = ref<HTMLDivElement | null>(null)
const repeatedProducts = [...products, ...products]
const { progress, dragging, progressDragging, updateProgress, startDrag, moveDrag, finishDrag, cancelDrag, startProgressDrag, moveProgressDrag, finishProgressDrag, onKeydown } = useProductCarousel(viewport)
</script>

<template>
  <section id="products" class="products section" data-reveal="product-group">
    <div class="section-heading products-heading" data-reveal="fade">
      <h2 class="reveal-title" data-reveal="words" aria-label="PRODUCT COLLECTION"><RevealWords text="PRODUCT COLLECTION" /></h2>
      <div class="filters" aria-label="Product filters">
        <button v-for="filter in ['OFF-ROAD', 'STREET', 'RACING', 'ACCESSORIES']" :key="filter" :class="{ active: activeFilter === filter }" type="button" @click="activeFilter = filter"><span>{{ filter }}</span></button>
      </div>
    </div>
    <div ref="viewport" class="product-viewport" :class="{ 'is-dragging': dragging }" @scroll="updateProgress" @dragstart.prevent
      @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="finishDrag" @pointercancel="cancelDrag" @lostpointercapture="cancelDrag">
      <div class="product-row"><ProductCard v-for="(item, index) in repeatedProducts" :key="`${index}-${item.variant}`" :item="item" /></div>
    </div>
    <div class="products-foot">
      <div class="scale-track" :class="{ 'is-dragging': progressDragging }" :style="{ '--progress-position': `${14.7 + progress * 84.3}%` }"
        role="slider" tabindex="0" aria-label="Product carousel position" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="Math.round(progress * 100)"
        @pointerdown="startProgressDrag" @pointermove="moveProgressDrag" @pointerup="finishProgressDrag" @pointercancel="finishProgressDrag" @lostpointercapture="finishProgressDrag" @keydown="onKeydown"><span /></div>
      <ArrowButton>LEARN MORE</ArrowButton>
    </div>
  </section>
</template>
