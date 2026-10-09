<script setup lang="ts">
import { journalArticles } from '../../data/journal'
import { journalBody } from '../../data/journal-body'
const route = useRoute()
const asset = useAsset()
const article = computed(() => journalArticles.find(item => item.slug === route.params.slug))
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
const current = computed(() => journalArticles.findIndex(item => item.slug === route.params.slug))
const previous = computed(() => journalArticles[(current.value - 1 + journalArticles.length) % journalArticles.length]!)
const next = computed(() => journalArticles[(current.value + 1) % journalArticles.length]!)
useHead(() => ({ title: `${article.value?.title} — VIVE` }))
</script>
<template>
  <InnerPage v-if="article" :upgrade="false" class="journal-detail-page">
    <article class="journal-article">
      <a href="/journal" class="outline-button journal-back"><ArrowIcon direction="left" /><span>BACK TO JOURNAL</span></a>
      <MotionTitle as="h1" :text="article.title" />
      <time datetime="2026-07-12" class="article-date" data-reveal="fade">{{ article.date }}</time>
      <div class="article-hero" data-reveal="lift"><img :src="asset('editorial/1216f.webp')" alt="Technician installing a VIVE forged wheel" fetchpriority="high" /></div>
      <div class="article-body" data-reveal="fade"><p v-for="(paragraph, i) in journalBody" :key="i">{{ paragraph }}</p></div>
      <nav class="article-navigation" aria-label="Article navigation"><a :href="`/journal/${previous.slug}`" class="outline-button"><ArrowIcon direction="left" /><span>PREV</span></a><a :href="`/journal/${next.slug}`" class="outline-button"><span>NEXT</span><ArrowIcon /></a></nav>
    </article>
    <section class="article-related">
      <div class="article-related-heading" data-reveal="fade"><MotionTitle text="YOU MIGHT ALSO LIKE" /><ArrowButton href="/journal">LEARN MORE</ArrowButton></div>
      <div class="editorial-grid"><JournalCard v-for="item in journalArticles.slice(0, 4)" :key="item.slug" :article="item" data-reveal="lift" /></div>
    </section>
  </InnerPage>
</template>
