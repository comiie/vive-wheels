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
      <div class="catalog-heading"><MotionTitle as="h1" text="WHEEL FILTERS" /><DarkSelect v-model="sort" class="catalog-sort-control" :options="[{ value: 'featured', label: 'SORT BY：' }, { value: 'asc', label: 'NAME A–Z' }, { value: 'desc', label: 'NAME Z–A' }]" label="Sort wheels" /></div>
      <div class="catalog-layout">
        <CatalogFilters :initial-series="initialSeries" @construction="construction = $event" @series="series = $event" />
        <Transition name="catalog-results" mode="out-in"><div :key="series" class="catalog-grid">
          <template v-if="series === 'ACCESSORIES'">
            <CatalogAccessoryCard v-for="item in filteredAccessories" :key="item.name" :item="item" />
          </template>
          <template v-else>
          <template v-for="group in 2" :key="group">
            <article class="catalog-introduction" data-reveal="lift" :data-reveal-group="group === 1 ? 'catalog-entry' : undefined">
              <div class="catalog-introduction-logo"><img :src="asset('inner-pages/9a7c4.webp')" alt="VIVE"></div>
              <p>Advancing the traditional casting process, the Hybrid Forged Series utilizes flow forming to cut down on weight and increase strength. Flow forming also allows for a great range of wheel widths within each design.</p>
            </article>
            <CatalogCard v-for="(wheel, index) in filteredWheels" :key="group + '-' + wheel.name + '-' + wheel.image" :wheel="wheel" :entry="group === 1 && index < 2" />
          </template>
          <p v-if="construction.length" class="catalog-results-notice" role="status">{{ filteredWheels.length * 2 }} wheels · {{ construction.join(' / ') }}</p>
          </template>
        </div></Transition>
      </div>
    </section>
  </InnerPage>
</template>
