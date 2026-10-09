<script setup lang="ts">
const asset = useAsset()
const emit = defineEmits<{ construction: [value: string[]]; series: [value: string] }>()
const props = withDefaults(defineProps<{ initialSeries?: string }>(), { initialSeries: '' })
const preferences = ref<string[]>(props.initialSeries ? [props.initialSeries] : [])
watch(() => props.initialSeries, value => { preferences.value = value ? [value] : [] })
const construction = ref<string[]>([])
const collapsed = ref<string[]>([])
const groups = [
  { key: 'series', title: 'Series', values: ['OFF-ROAD', 'STREET', 'RACING', 'ACCESSORIES'] },
  { key: 'sizes', title: 'Size', values: Array.from({ length: 9 }, (_, i) => String(i + 17)) },
  { key: 'prices', title: 'Price', values: ['$0 - $999', '$1,000 - $1,499', '$1,500 - $1,999', '$2,000 +'] },
]
const toggle = (values: string[], value: string) => values.includes(value) ? values.filter(item => item !== value) : [...values, value]
const choose = (value: string) => {
  if (groups[0]!.values.includes(value)) {
    const selected = preferences.value.includes(value) ? '' : value
    preferences.value = preferences.value.filter(item => !groups[0]!.values.includes(item))
    if (selected) preferences.value.push(selected)
    emit('series', selected)
  } else preferences.value = toggle(preferences.value, value)
}
const selectConstruction = (value: string) => { construction.value = toggle(construction.value, value); emit('construction', construction.value) }
const clear = () => { preferences.value = []; construction.value = []; emit('construction', []); emit('series', '') }
const collapse = (name: string) => { collapsed.value = toggle(collapsed.value, name) }
</script>
<template>
  <aside class="catalog-filters" aria-label="Wheel filters" data-reveal="lift" data-reveal-group="catalog-entry">
    <button type="button" class="catalog-clear wipe-control is-filled" @click="clear">CLEAR ALL</button>
    <div v-if="preferences.length || construction.length" class="catalog-chips">
      <span v-for="value in [...preferences, ...construction]" :key="value">{{ value }}<button type="button" :aria-label="`Remove ${value}`" @click="construction.includes(value) ? selectConstruction(value) : choose(value)"><img :src="asset('inner-pages/b0e2a.svg')" alt=""></button></span>
    </div>
    <div class="catalog-divider" :style="{ backgroundImage: `url(${asset('inner-pages/b9861.svg')})` }" />
    <section v-for="group in groups" :key="group.key" :class="['catalog-filter-' + group.key, { 'is-collapsed': collapsed.includes(group.key) }]">
      <h2><button type="button" :aria-expanded="!collapsed.includes(group.key)" :aria-controls="group.key + '-options'" @click="collapse(group.key)">{{ group.title }} <ArrowIcon :direction="collapsed.includes(group.key) ? 'right' : 'down'" /></button></h2>
      <SmoothCollapse :open="!collapsed.includes(group.key)" :id="group.key + '-options'"><div class="catalog-filter-options" :class="{ 'catalog-size-grid': group.key === 'sizes' }">
        <button v-for="label in group.values" :key="label" type="button" :class="{ 'catalog-option': group.key !== 'sizes', selected: preferences.includes(label) }" :aria-pressed="preferences.includes(label)" @click="choose(label)"><i v-if="group.key !== 'sizes'" />{{ label }}</button>
      </div></SmoothCollapse>
    </section>
    <div class="catalog-filter-collapsed"><template v-for="label in ['Center Bore', 'Width', 'Offset']" :key="label"><p><button type="button" :aria-expanded="collapsed.includes(label)" @click="collapse(label)">{{ label }}<ArrowIcon :direction="collapsed.includes(label) ? 'down' : 'right'" /></button></p><SmoothCollapse :open="collapsed.includes(label)"><p class="filter-unavailable">Specifications coming soon. Contact us for fitment advice.</p></SmoothCollapse></template></div>
    <section class="catalog-filter-construction">
      <h2>Construction</h2>
      <button v-for="label in ['FORGED', 'CAST']" :key="label" class="catalog-option" type="button" :aria-pressed="construction.includes(label)" @click="selectConstruction(label)"><i />{{ label }}</button>
    </section>
  </aside>
</template>
