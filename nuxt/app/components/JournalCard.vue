<script setup lang="ts">
import type { JournalArticle } from '../data/journal'
defineProps<{ article: JournalArticle }>()
const asset = useAsset()
</script>
<template>
  <a class="editorial-card" :href="`/journal/${article.slug}`">
    <div class="editorial-card-photo" :class="`editorial-photo-${article.imageIndex}`" :style="{ maskImage: `url(${asset('editorial/80292.svg')})` }">
      <div class="editorial-card-layers">
        <img v-if="article.imageIndex === 0 || article.imageIndex === 3" class="editorial-photo-worker" :src="asset('editorial/b625c.webp')" alt="Precision wheel manufacturing" loading="lazy" />
        <img v-if="article.imageIndex === 1" :src="asset('editorial/742fb.webp')" alt="VIVE quality inspection" loading="lazy" />
        <template v-if="article.imageIndex === 2"><img class="editorial-photo-underlay" :src="asset('editorial/ceee9.webp')" alt="" loading="lazy" /><img :src="asset('editorial/6c269.webp')" alt="Multi-spoke wheels in production" loading="lazy" /></template>
        <img v-if="article.imageIndex === 3" :src="asset('editorial/74764.webp')" alt="Machined wheel finish" loading="lazy" />
      </div>
      <time datetime="2026-07-12">{{ article.date }}</time>
    </div>
    <div class="editorial-card-title"><h3>{{ article.title }}</h3><ArrowIcon /></div>
  </a>
</template>
