<script setup lang="ts">
import { catalogWheels, catalogAccessories } from '../data/catalog'
const asset = useAsset()
useHead({ title: 'Products — VIVE' })
const construction = ref<string[]>([])
const route = useRoute()
const initialSeries = ref('')
const series = ref('')
// Static hosts serve the same HTML for every query; apply URL filters after
// hydration so the initial client tree matches the prerendered catalog.
onMounted(() => {
  if (['OFF-ROAD', 'STREET', 'RACING', 'ACCESSORIES'].includes(String(route.query.series))) {
    initialSeries.value = String(route.query.series)
    series.value = initialSeries.value
  }
})
const sort = ref('featured')
const mobileFiltersOpen = ref(false)
const sortOptions = [{ value: 'featured', label: 'SORT BY：' }, { value: 'asc', label: 'NAME A–Z' }, { value: 'desc', label: 'NAME Z–A' }]
const filteredAccessories = computed(() => {
  const items = [...catalogAccessories]
  if (sort.value === 'asc') items.sort((a, b) => a.name.localeCompare(b.name))
  if (sort.value === 'desc') items.sort((a, b) => b.name.localeCompare(a.name))
  return items
})
const filteredWheels = computed(() => {
  const wheels = catalogWheels.filter(wheel => (!construction.value.length || construction.value.includes(wheel.type)) && (!series.value || series.value === 'ACCESSORIES' || wheel.series === series.value))
  if (sort.value === 'asc') wheels.sort((a, b) => a.name.localeCompare(b.name))
  if (sort.value === 'desc') wheels.sort((a, b) => b.name.localeCompare(a.name))
  return wheels
})
</script>
<template>
  <InnerPage>
    <section class="catalog-hero inner-photo">
      <img class="inner-background" :src="asset('inner-pages/06181.webp')" alt="Close-up of a polished VIVE wheel on a blue vehicle" fetchpriority="high"><div class="inner-shade" />
    </section>
    <section id="wheel-filters" class="catalog">
      <div class="catalog-heading"><MotionTitle as="h1" text="WHEEL FILTERS" /><DarkSelect v-model="sort" class="catalog-sort-control catalog-sort-desktop" :options="sortOptions" label="Sort wheels" /></div>
      <button class="catalog-mobile-toggle outline-button" type="button" :aria-expanded="mobileFiltersOpen" aria-controls="catalog-filter-panel" @click="mobileFiltersOpen = !mobileFiltersOpen"><span>Sort + Filter</span><ArrowIcon :direction="mobileFiltersOpen ? 'up' : 'down'" /></button>
      <div class="catalog-layout">
        <div id="catalog-filter-panel" class="catalog-filter-panel" :class="{ 'is-open': mobileFiltersOpen }">
          <CatalogFilters :initial-series="initialSeries" @construction="construction = $event" @series="series = $event">
            <template #sort><DarkSelect v-model="sort" class="catalog-sort-control catalog-sort-mobile" :options="sortOptions" label="Sort wheels" /></template>
          </CatalogFilters>
        </div>
        <Transition name="catalog-results" mode="out-in"><div :key="series" class="catalog-grid">
          <div v-if="series === 'ACCESSORIES'" class="catalog-accessories-track" role="region" aria-label="Accessory collection" tabindex="0">
            <CatalogAccessoryCard v-for="item in filteredAccessories" :key="item.name" :item="item" />
          </div>
          <template v-else>
          <div v-for="group in 2" :key="group" class="catalog-wheel-group">
            <article class="catalog-introduction" data-reveal="lift" :data-reveal-group="group === 1 ? 'catalog-entry' : undefined">
              <div class="catalog-introduction-logo"><img :src="asset('inner-pages/9a7c4.webp')" alt="VIVE"></div>
              <p>Advancing the traditional casting process, the Hybrid Forged Series utilizes flow forming to cut down on weight and increase strength. Flow forming also allows for a great range of wheel widths within each design.</p>
            </article>
            <div class="catalog-wheel-track" role="region" :aria-label="`Wheel collection ${group}`" tabindex="0"><CatalogCard v-for="(wheel, index) in filteredWheels" :key="group + '-' + wheel.name + '-' + wheel.image" :wheel="wheel" :entry="group === 1 && index < 2" /></div>
          </div>
          <p v-if="construction.length" class="catalog-results-notice" role="status">{{ filteredWheels.length * 2 }} wheels · {{ construction.join(' / ') }}</p>
          </template>
        </div></Transition>
      </div>
    </section>
  </InnerPage>
</template>
