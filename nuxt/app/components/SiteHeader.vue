<script setup lang="ts">
const asset = useAsset()
const scrolled = ref(false)
const visible = ref(true)
const links = [
  { label: 'PRODUCTS', href: '/products' },
  { label: 'TECHNOLOGY', href: '/technology' },
  { label: 'ABOUT', href: '/about' },
  { label: 'JOURNAL', href: '/journal' },
  { label: 'FAQS', href: '/faqs' },
]
let previousY = 0
let frame = 0
const updateHeader = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    const currentY = window.scrollY
    const delta = currentY - previousY
    scrolled.value = currentY > 16
    if (currentY <= 16) visible.value = true
    else if (Math.abs(delta) > 5) visible.value = delta < 0
    previousY = currentY
    frame = 0
  })
}
onMounted(() => {
  previousY = window.scrollY
  window.addEventListener('scroll', updateHeader, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeader)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <header class="site-header vive-header" :class="{ 'is-scrolled': scrolled, 'is-hidden': !visible }">
    <a class="brand" href="#top" aria-label="VIVE home">
      <span class="brand-crop"><img :src="asset('inner-pages/9a7c4.webp')" alt="VIVE"></span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
    </nav>
    <div class="header-actions">
      <LanguageMenu />
      <a class="contact-link" href="/contact">
        CONTACT US <img :src="asset('imgFrame2147238903.svg')" alt="">
      </a>
    </div>
    <MobileNavigation />
  </header>
</template>
