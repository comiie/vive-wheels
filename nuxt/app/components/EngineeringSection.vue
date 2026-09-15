<script setup lang="ts">
import { engineeringSteps } from '../data/content'
const asset = useAsset()
const activeIndex = ref(0)
const previousIndex = ref<number | null>(null)
const direction = ref<'next' | 'previous'>('next')
const transitionId = ref(0)
const previewIndex = computed(() => (activeIndex.value + 1) % engineeringSteps.length)
let transitionTimer: ReturnType<typeof setTimeout> | undefined
function changeStep(nextIndex: number, nextDirection: 'next' | 'previous') {
  if (nextIndex === activeIndex.value) return
  clearTimeout(transitionTimer)
  previousIndex.value = activeIndex.value
  direction.value = nextDirection
  activeIndex.value = nextIndex
  const id = ++transitionId.value
  transitionTimer = setTimeout(() => {
    if (id === transitionId.value) previousIndex.value = null
  }, 760)
}
const selectStep = (index: number) => changeStep(index, index > activeIndex.value ? 'next' : 'previous')
const moveStep = (amount: number) => changeStep((activeIndex.value + amount + engineeringSteps.length) % engineeringSteps.length, amount > 0 ? 'next' : 'previous')
onBeforeUnmount(() => clearTimeout(transitionTimer))
</script>

<template>
  <section id="engineering" class="engineering section">
    <div class="section-heading engineering-heading" data-reveal="fade">
      <h2 class="reveal-title" data-reveal="words" aria-label="ENGINEERING EXCELLENCE"><RevealWords text="ENGINEERING EXCELLENCE" /></h2><ArrowButton>LEARN MORE</ArrowButton>
    </div>
    <div class="engineering-panel" data-reveal="lift">
      <EngineeringCardLayer v-if="previousIndex === null || previousIndex !== previewIndex" :key="`preview-${previewIndex}`" :index="previewIndex" class="is-preview" />
      <EngineeringCardLayer v-if="previousIndex !== null" :key="`outgoing-${previousIndex}-${transitionId}`" :index="previousIndex" :class="`is-outgoing is-outgoing-${direction}`" />
      <EngineeringCardLayer :key="`active-${activeIndex}-${transitionId}`" :index="activeIndex" :class="previousIndex === null ? 'is-active' : `is-entering is-entering-${direction}`" active @previous="moveStep(-1)" @next="moveStep(1)" />
    </div>
    <div class="engineering-rail" aria-hidden="true"><img :src="asset('imgVector12.svg')" alt=""><i v-for="(step, index) in engineeringSteps" :key="step.title" :class="{ active: index === activeIndex }" /></div>
    <aside class="engineering-index" data-reveal="lift" role="tablist" aria-label="Engineering capabilities">
      <button v-for="(step, index) in engineeringSteps" :id="`engineering-tab-${index}`" :key="step.title" :class="{ active: index === activeIndex }" type="button" role="tab"
        :aria-controls="`engineering-panel-${index}`" :aria-selected="index === activeIndex" @click="selectStep(index)"><span>{{ step.title }}</span></button>
    </aside>
  </section>
</template>
