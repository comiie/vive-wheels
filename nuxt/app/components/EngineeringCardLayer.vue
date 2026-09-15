<script setup lang="ts">
import { engineeringSteps } from '../data/content'
const props = withDefaults(defineProps<{ index: number; active?: boolean }>(), { active: false })
const emit = defineEmits<{ previous: []; next: [] }>()
const asset = useAsset()
const step = computed(() => engineeringSteps[props.index]!)
</script>

<template>
  <div class="engineering-card-slide" :role="active ? 'tabpanel' : undefined" :id="active ? `engineering-panel-${index}` : undefined"
    :aria-labelledby="active ? `engineering-tab-${index}` : undefined" :aria-live="active ? 'polite' : undefined" :aria-hidden="active ? undefined : true">
    <div class="engineering-image"><img class="engineering-media" :src="asset(step.image)" :alt="active ? step.alt : ''" decoding="async"></div>
    <div class="engineering-copy"><div class="engineering-copy-slide">
      <span class="counter">{{ String(index + 1).padStart(2, '0') }} /07</span><h3>{{ step.title }}</h3><p>{{ step.description }}</p>
    </div></div>
    <div class="engineering-arrows">
      <button type="button" :tabindex="active ? 0 : -1" aria-label="Previous engineering capability" @click="active && emit('previous')"><img :src="asset('imgFrame2147238906.svg')" alt=""></button>
      <button type="button" :tabindex="active ? 0 : -1" aria-label="Next engineering capability" @click="active && emit('next')"><img :src="asset('imgFrame2147238907.svg')" alt=""></button>
    </div>
  </div>
</template>
