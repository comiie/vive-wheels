<script setup lang="ts">
const props = defineProps<{ text: string }>()
const lines = computed(() => {
  let index = 0
  return props.text.split('\n').map(line => line.split(' ').map(word => ({ word, index: index++ })))
})
</script>

<template>
  <span v-for="(words, lineIndex) in lines" :key="lineIndex" class="title-line" aria-hidden="true"><template v-for="(item, index) in words" :key="item.index"><span class="reveal-word" :style="{ '--word-index': item.index }">{{ item.word }}</span>{{ index < words.length - 1 ? ' ' : '' }}</template></span>
</template>
