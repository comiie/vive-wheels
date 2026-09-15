<script setup lang="ts">
const asset = useAsset()
const scrolled = ref(false)
const visible = ref(true)
const links = [
  { label: 'PRODUCTS', hash: 'products' },
  { label: 'ABOUT', hash: 'about' },
  { label: 'JOURNAL', hash: 'journal' },
  { label: 'FAQS', hash: 'footer' },
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
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'is-hidden': !visible }">
    <a class="brand" href="#top" aria-label="VIVE home">
      <span class="brand-crop"><img :src="asset('imgChatgptImage20265152123561.webp')" alt="VIVE"></span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a v-for="link in links" :key="link.hash" :href="`#${link.hash}`">{{ link.label }}</a>
    </nav>
    <div class="header-actions">
      <button type="button" class="language">EN</button>
      <a class="contact-link" href="mailto:info@vivewheels.com">
        CONTACT US <img :src="asset('imgFrame2147238903.svg')" alt="">
      </a>
    </div>
    <button class="menu-button" type="button" aria-label="Open menu">MENU</button>
  </header>
</template>
