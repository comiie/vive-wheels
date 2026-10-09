<script setup lang="ts">
import { journalArticles, journalCategories } from '../../data/journal'
import '../../assets/editorial.css'
useHead({ title: 'Journal — VIVE' })
const asset = useAsset()
const category = ref('brand')
const search = ref('')
const page = ref(1)
const filtered = computed(() => journalArticles.filter(article => (category.value === 'all' || article.category === category.value) && article.title.toLowerCase().includes(search.value.trim().toLowerCase())))
const pageCount = computed(() => Math.ceil(filtered.value.length / 8))
const articles = computed(() => filtered.value.slice((page.value - 1) * 8, page.value * 8))
watch([category, search], () => { page.value = 1 })
const changePage = (next: number) => {
  page.value = Math.max(1, Math.min(pageCount.value, next))
  document.getElementById('journal-results')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
}
</script>
<template>
  <InnerPage :upgrade="false" class="journal-page">
    <section class="journal-index">
      <MotionTitle as="h1" text="JOURNAL" />
      <div class="journal-toolbar" data-reveal="fade">
        <div class="journal-categories" role="group" aria-label="Journal categories"><button v-for="item in journalCategories" :key="item.id" class="wipe-control" :class="{ 'is-filled': category === item.id }" :aria-pressed="category === item.id" @click="category = item.id">{{ item.label }}<span v-if="'count' in item">（{{ item.count }}）</span></button></div>
        <label class="journal-search"><input v-model="search" type="search" placeholder="SEARCH" aria-label="Search journal" /><img :src="asset('editorial/47dab.svg')" alt="" /></label>
      </div>
      <div id="journal-results" class="journal-results" aria-live="polite">
        <div class="editorial-grid"><JournalCard v-for="article in articles" :key="article.slug" :article="article" data-reveal="lift" /></div>
        <p v-if="!articles.length" class="journal-empty">No articles found. Try another search or category.</p>
      </div>
      <nav v-if="pageCount > 1" class="journal-pagination" aria-label="Journal pages">
        <button aria-label="Previous page" :disabled="page === 1" @click="changePage(page - 1)"><img class="pagination-prev" :src="asset('editorial/57c4f.svg')" alt="" /></button>
        <button v-for="number in pageCount" :key="number" :aria-current="page === number ? 'page' : undefined" :aria-label="`Page ${number}`" @click="changePage(number)">{{ number }}</button>
        <button aria-label="Next page" :disabled="page === pageCount" @click="changePage(page + 1)"><img :src="asset('editorial/9f516.svg')" alt="" /></button>
      </nav>
    </section>
  </InnerPage>
</template>
