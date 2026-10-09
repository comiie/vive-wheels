<script setup lang="ts">
import { finishSamples } from '../data/finishes'
const emit = defineEmits<{ select: [name: string] }>()
const asset = useAsset()
const dialog = ref<HTMLDialogElement | null>(null)
const modalOpen = inject<Ref<boolean>>('innerModalOpen', ref(false))
const category = ref('Transparent')
const selected = ref('')
const samples = computed(() => finishSamples.filter(item => item.category === category.value))
let opener: HTMLElement | null = null
let revealAnimation: Animation | undefined
let previousOverflow = ''
const reveal = (opening: boolean) => {
  if (!dialog.value) return
  const from = getComputedStyle(dialog.value).transform
  revealAnimation?.cancel()
  const to = opening ? 'translateX(0%)' : 'translateX(100%)'
  dialog.value.style.transform = to
  // Move the entire top-layer dialog, including its contents. Keeping the sheet
  // in normal layout prevents autofocus from scrolling past a translated child.
  const animation = dialog.value.animate([{ transform: from }, { transform: to }], {
    duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : opening ? 480 : 340,
    easing: opening ? 'cubic-bezier(.25,.65,.3,1)' : 'cubic-bezier(.4,0,.6,1)',
    fill: 'both',
  })
  revealAnimation = animation
  animation.finished.then(() => {
    if (revealAnimation !== animation) return
    revealAnimation = undefined
    animation.cancel()
    if (!opening) dialog.value?.close()
  }).catch(() => { /* Interrupted by a new animation or unmount. */ })
}
const open = (trigger?: HTMLElement) => {
  if (!dialog.value || dialog.value.open) return
  opener = trigger || document.activeElement as HTMLElement
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  modalOpen.value = true
  dialog.value.showModal()
  reveal(true)
}
const closed = () => {
  revealAnimation?.cancel()
  revealAnimation = undefined
  if (dialog.value) dialog.value.style.transform = 'translateX(100%)'
  modalOpen.value = false
  document.body.style.overflow = previousOverflow
  opener?.focus({ preventScroll: true })
}
const close = () => {
  if (dialog.value?.open) reveal(false)
}
const choose = (name: string) => { selected.value = name; emit('select', name); close() }
defineExpose({ open })
onBeforeUnmount(() => {
  revealAnimation?.cancel()
  revealAnimation = undefined
  if (dialog.value?.open) { document.body.style.overflow = previousOverflow; modalOpen.value = false }
})
</script>
<template>
  <Teleport to="body">
    <dialog ref="dialog" class="finish-drawer" aria-labelledby="finish-drawer-title" data-lenis-prevent @cancel.prevent="close" @close="closed" @click="($event.target === dialog) && close()">
      <div class="finish-drawer-sheet">
        <header><div><p>VIVE / CUSTOMIZATION</p><h2 id="finish-drawer-title">CUSTOM FINISH</h2></div><button autofocus aria-label="Close custom finishes" @click="close">×</button></header>
        <p class="finish-intro">Explore color and surface references. Select a sample to include it in your inquiry.</p>
        <div class="finish-categories" role="group" aria-label="Finish category"><button v-for="name in ['Transparent', 'Solid']" :key="name" :aria-pressed="category === name" @click="category = name">{{ name }} Colors</button></div>
        <div class="finish-samples">
          <button v-for="sample in samples" :key="sample.id" class="finish-sample" :aria-pressed="selected === `${sample.name} / ${sample.sheen}`" :aria-label="`Select ${sample.name}, ${sample.sheen}`" @click="choose(`${sample.name} / ${sample.sheen}`)">
            <span class="finish-sample-photo"><img :src="asset(`finish-reference/${sample.id}-0.webp`)" :alt="sample.name" loading="lazy" /><img class="finish-sample-angle" :src="asset(`finish-reference/${sample.id}-1.webp`)" alt="" loading="lazy" /></span>
            <strong>{{ sample.name }}</strong><small>{{ sample.sheen }}</small>
          </button>
        </div>
        <p class="finish-reference-note">Reference samples: <a href="https://vossenwheels.com/finishing/#fndtn-transparent" target="_blank" rel="noopener noreferrer">Vossen Wheels</a>. Final VIVE color, finish and availability require confirmation.</p>
      </div>
    </dialog>
  </Teleport>
</template>
<style>
.finish-drawer{position:fixed;inset:0 0 0 auto;margin:0;width:50vw;max-width:none;height:100dvh;max-height:none;padding:0;border:0;background:transparent;color:#111;overflow:clip;transform:translateX(100%);font-family:'Space Mono',monospace}
.finish-drawer::backdrop{background:#0008;backdrop-filter:blur(3px)}
.finish-drawer header button:focus{outline:none}.finish-drawer header button:focus-visible{box-shadow:0 2px 0 #111}
.finish-drawer-sheet{height:100%;overflow-y:auto;overscroll-behavior:contain;background:#fff;padding:36px clamp(24px,2.2vw,48px)}
.finish-drawer header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}.finish-drawer header p{font-size:11px;letter-spacing:.12em;margin:0 0 10px}.finish-drawer h2{font-size:clamp(22px,2vw,38px);font-weight:400;margin:0}.finish-drawer button{font:inherit;cursor:pointer;color:inherit}.finish-drawer header button{border:0;background:none;font-size:32px;line-height:1;padding:4px 8px}.finish-intro,.finish-reference-note{font-size:12px;line-height:1.7;color:#626262;margin:24px 0}.finish-reference-note a{text-decoration:underline}.finish-categories{display:flex;gap:24px;border-bottom:1px solid #ddd;margin:24px 0}.finish-categories button{padding:12px 0;background:none;border:0;border-bottom:2px solid transparent;font-size:13px;color:#888}.finish-categories button[aria-pressed=true]{border-color:#111;color:#111}.finish-samples{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px 12px}.finish-sample{padding:0 0 12px;background:none;border:0;text-align:center;min-width:0}.finish-sample-photo{display:block;position:relative;aspect-ratio:1;perspective:800px}.finish-sample img{width:100%;height:100%;object-fit:contain;display:block}.finish-sample-angle{position:absolute;inset:0;opacity:0;transition:opacity .25s ease,transform .4s ease;transform:rotateY(-8deg)}.finish-sample strong{font-size:13px;display:block;font-weight:400;margin:8px 0}.finish-sample small{font-size:11px;color:#777}.finish-sample:focus-visible{outline:1px solid #333;outline-offset:5px}.finish-sample:focus-visible .finish-sample-angle{opacity:1;transform:rotateY(0)}
@media(hover:hover){.finish-sample:hover .finish-sample-angle{opacity:1;transform:rotateY(0)}}
.finish-samples{grid-template-columns:repeat(4,minmax(0,1fr));gap:24px 12px}
.finish-sample strong{font-size:12px;overflow-wrap:anywhere}
@media(min-width:1800px){.finish-samples{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(min-width:761px) and (max-width:1100px){.finish-drawer{width:70vw}}
@media(max-width:760px){.finish-drawer{width:100vw}.finish-drawer-sheet{padding:28px 20px}.finish-samples{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px 8px}.finish-sample strong{font-size:11px}}
@media(max-width:420px){.finish-samples{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(prefers-reduced-motion:reduce){.finish-drawer-sheet,.finish-sample-angle{transition:none}}
</style>
