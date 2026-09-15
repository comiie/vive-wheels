<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
const asset = useAsset()
const video = ref<HTMLVideoElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const dialog = ref<HTMLDivElement | null>(null)
let previousFocus: HTMLElement | null = null
let previousOverflow = ''

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  // Native video controls retain their keyboard handling; prevent focus escaping the dialog.
  if (event.key === 'Tab' && event.shiftKey && document.activeElement === closeButton.value) {
    event.preventDefault()
    video.value?.focus()
  }
}
function containFocus(event: FocusEvent) {
  if (event.target instanceof Node && !dialog.value?.contains(event.target)) closeButton.value?.focus()
}
onMounted(() => {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('focusin', containFocus)
  closeButton.value?.focus()
  void video.value?.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ })
})
onBeforeUnmount(() => {
  video.value?.pause()
  document.body.style.overflow = previousOverflow
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('focusin', containFocus)
  previousFocus?.focus({ preventScroll: true })
})
</script>

<template>
  <Teleport to="body">
    <div ref="dialog" class="video-modal" role="dialog" aria-modal="true" aria-label="Discover VIVE video" data-lenis-prevent @mousedown.self="emit('close')">
      <button ref="closeButton" class="video-modal-close" type="button" aria-label="Close video" @click="emit('close')">×</button>
      <div class="video-modal-frame">
        <video ref="video" :src="asset('scout-hero-11-21.webm')" :poster="asset('scout-hero-poster.webp')" controls playsinline preload="metadata" tabindex="0" />
      </div>
    </div>
  </Teleport>
</template>
