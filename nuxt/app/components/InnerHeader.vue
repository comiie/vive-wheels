<script setup lang="ts">
const asset = useAsset()
const route = useRoute()
const scrolled = ref(false)
const visible = ref(true)
let lastY = 0
let directionDistance = 0
const onScroll = () => {
  const y = Math.max(0, window.scrollY)
  const delta = y - lastY
  directionDistance = Math.sign(delta) === Math.sign(directionDistance) ? directionDistance + delta : delta
  scrolled.value = y > 16
  if (y <= 16) visible.value = true
  else if (Math.abs(directionDistance) > 8) visible.value = directionDistance < 0
  lastY = y
}
onMounted(() => { lastY = window.scrollY; window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="inner-header" :class="{ 'is-scrolled': scrolled, 'is-hidden': !visible }">
    <a class="inner-brand" href="/" aria-label="VIVE home"><span><img :src="asset('inner-pages/9a7c4.webp')" alt="VIVE"></span></a>
    <nav aria-label="Main navigation">
      <a href="/products" :aria-current="route.path.startsWith('/product') ? 'page' : undefined">PRODUCTS</a><a href="/technology" :aria-current="route.path.replace(/\/$/, '') === '/technology' ? 'page' : undefined">TECHNOLOGY</a><a href="/about" :aria-current="route.path.replace(/\/$/, '') === '/about' ? 'page' : undefined">ABOUT</a><a href="/journal" :aria-current="route.path.startsWith('/journal') ? 'page' : undefined">JOURNAL</a><a href="/faqs" :aria-current="route.path.replace(/\/$/, '') === '/faqs' ? 'page' : undefined">FAQS</a>
    </nav>
    <div class="inner-header-actions">
      <div class="inner-language-wrap"><LanguageMenu /></div>
      <a href="/contact">CONTACT US <ArrowIcon /></a>
    </div>
    <MobileNavigation />
  </header>
</template>
