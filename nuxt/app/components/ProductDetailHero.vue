<script setup lang="ts">
const props = defineProps<{ accessory?: boolean }>()
const asset = useAsset()
const imageIndex = ref(0)
const color = ref(1)
const finishDrawer = ref<{ open: (trigger?: HTMLElement) => void } | null>(null)
const customFinish = ref('')
const colorName = computed(() => color.value === 4 && customFinish.value ? customFinish.value : colors[color.value]!.name)
const quantity = ref(2)
const model = ref<number | null>(null)
const size = ref('19"')
const sizeOptions = ['17"','18"','19"','20"','21"','22"'].map(value => ({ value, label: value }))
const bore = ref('')
const width = ref('')
const offset = ref('')
const finish = ref('')
const inquiry = ref<HTMLDialogElement | null>(null)
const modalOpen = inject<Ref<boolean>>('innerModalOpen', ref(false))
const openInquiry = () => { modalOpen.value = true; inquiry.value?.showModal() }
onBeforeUnmount(() => { modalOpen.value = false })
const descriptionOpen = ref(false)
const colors = [
  { name: 'Silver', file: 'e97f4.svg' }, { name: 'Deep Space Gray', file: '4ff30.svg' },
  { name: 'Blue', file: '742a0.svg' }, { name: 'Burgundy', file: '03c82.svg' }, { name: 'Custom Finish', file: 'b93fd.webp' },
]
const thumbnails = ['ddca6.webp','b7cc2.webp','74764.webp','bbf18.webp']
const mainImage = computed(() => {
  if (imageIndex.value) return thumbnails[imageIndex.value]!
  if (props.accessory) return color.value === 1 ? '01c7d.webp' : '2256e.webp'
  return ['b7cc2.webp','ddca6.webp','b7cc2.webp','74764.webp','ddca6.webp'][color.value]!
})
const optionList = (values: string[]) => values.map(value => ({ value, label: value }))
const unitPrice = computed(() => props.accessory ? 64 : 649)
const summary = computed(() => `${props.accessory ? 'Zinc Lug Nuts & Bolts' : 'VI-1'}\nColor: ${colorName.value}\n${props.accessory ? `Model: ${model.value === null ? 'Please confirm' : 'VI-' + (model.value % 3 + 1)}` : `Size: ${size.value}; Center bore: ${bore.value || 'Please confirm'}; Width: ${width.value || 'Please confirm'}; Offset: ${offset.value || 'Please confirm'}; Finish: ${finish.value || 'Please confirm'}`}\nQuantity: ${quantity.value}\nPlease confirm availability, compatibility and final pricing.`)
const mailHref = computed(() => `mailto:info@vivewheels.com?subject=${encodeURIComponent('VIVE product inquiry')}&body=${encodeURIComponent(summary.value)}`)
const chooseImage = (index: number) => { imageIndex.value = index }
const chooseColor = (index: number, event?: MouseEvent) => {
  color.value = index
  if (index === 4) finishDrawer.value?.open(event?.currentTarget as HTMLElement | undefined)
  else imageIndex.value = 0
}
const chooseFinish = (name: string) => { customFinish.value = name; color.value = 4; finish.value = name }
</script>
<template>
  <section class="detail-hero" :class="{ 'is-accessory': accessory }" data-reveal="fade">
    <div class="detail-gallery" aria-label="Product gallery">
      <div class="detail-thumbnails"><button v-for="(image, index) in thumbnails" :key="image" :class="{ active: imageIndex === index }" :aria-label="`View product image ${index + 1}`" :aria-pressed="imageIndex === index" @click="chooseImage(index)"><img :src="asset(`product-details/${image}`)" alt="" /></button></div>
      <div class="detail-main-image"><Transition name="product-image" mode="out-in"><img :key="mainImage" :src="asset(`product-details/${mainImage}`)" :alt="accessory ? 'Zinc lug nuts and bolts' : 'VI-1 forged wheel'" fetchpriority="high" /></Transition></div>
      <div class="detail-image-dots"><button v-for="(_, index) in thumbnails" :key="index" :class="{ active: imageIndex === index }" :aria-label="`View product image ${index + 1}`" :aria-pressed="imageIndex === index" @click="chooseImage(index)" /></div>
    </div>
    <div class="detail-options">
      <div class="detail-product-heading"><h1>VI-1</h1><a href="/products" class="detail-series">Street</a></div>
      <div class="detail-description"><p>A forged wheel designed around the demands of everyday performance — balancing lightweight construction, structural strength and refined proportions for the modern performance vehicle.</p><button class="detail-more" :aria-expanded="descriptionOpen" @click="descriptionOpen = !descriptionOpen">{{ descriptionOpen ? '...less' : '...more' }}</button><SmoothCollapse :open="descriptionOpen"><p class="detail-description-extra">Contact VIVE to confirm vehicle fitment, available finishes and current specifications before ordering.</p></SmoothCollapse></div>
      <div class="detail-colors"><p><span>COLOR:</span><span class="detail-color-name">{{ colorName }}</span></p><div role="group" aria-label="Color"><button v-for="(swatch, index) in colors" :key="swatch.name" :aria-label="swatch.name" :aria-pressed="color === index" :aria-haspopup="index === 4 ? 'dialog' : undefined" :class="{ selected: color === index && index !== 1 }" @click="chooseColor(index, $event)"><img :src="asset(`product-details/${swatch.file}`)" alt="" /></button></div></div>
      <div v-if="!accessory" class="detail-spec-selects">
        <label>SIZE:<DarkSelect v-model="size" label="Wheel size" :options="sizeOptions" /></label>
        <label>Center Bore:<DarkSelect v-model="bore" placeholder="Please select" label="Center bore" :options="optionList(['65 mm', 'Custom — confirm with VIVE'])" /></label>
        <label>Width:<DarkSelect v-model="width" placeholder="Please select" label="Wheel width" :options="optionList(['7J', '8J', 'Custom — confirm with VIVE'])" /></label>
        <label>Offset:<DarkSelect v-model="offset" placeholder="Please select" label="Wheel offset" :options="optionList(['ET25', 'ET35', 'Custom — confirm with VIVE'])" /></label>
        <label class="detail-finish-select">Finish:<DarkSelect v-model="finish" placeholder="Please select" label="Wheel finish" :options="optionList([...colors.map(item => item.name), ...(customFinish ? [customFinish] : [])])" /></label>
      </div>
      <div v-else class="detail-models"><p>Applicable models：</p><div role="group" aria-label="Applicable model"><button class="wipe-control" v-for="i in 6" :key="i" :aria-pressed="model === i - 1" @click="model = i - 1">VI-{{ (i - 1) % 3 + 1 }}</button></div></div>
      <div class="detail-pricing"><div class="detail-unit-price"><span><small>from：</small>${{ unitPrice }}</span><small>each</small></div><div class="detail-quantity"><span>QTY：</span><div><button aria-label="Decrease quantity" :disabled="quantity <= 1" @click="quantity = Math.max(1, quantity - 1)">−</button><output aria-live="polite">{{ quantity }}</output><button aria-label="Increase quantity" :disabled="quantity >= 99" @click="quantity = Math.min(99, quantity + 1)">+</button></div></div></div>
      <div class="detail-order"><p><span>From：</span>${{ accessory ? unitPrice * quantity : unitPrice }}</p><button class="detail-submit wipe-control is-filled" @click="openInquiry">SUBMIT <ArrowIcon /></button></div>
    </div>
    <dialog ref="inquiry" class="detail-inquiry" data-lenis-prevent @close="modalOpen = false" @click="($event.target === inquiry) && inquiry?.close()"><div><button class="dialog-close" aria-label="Close inquiry" @click="inquiry?.close()">×</button><h2>PRODUCT INQUIRY</h2><pre>{{ summary }}</pre><p>This is an inquiry, not a purchase. Final fitment and pricing will be confirmed by VIVE.</p><a :href="mailHref" class="detail-submit wipe-control is-filled" @click="inquiry?.close()">SEND EMAIL <ArrowIcon /></a></div></dialog>
    <FinishDrawer ref="finishDrawer" @select="chooseFinish" />
  </section>
</template>
