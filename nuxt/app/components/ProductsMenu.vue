<script setup lang="ts">
const route = useRoute()
const opened = ref(false)
const root = ref<HTMLElement | null>(null)
const toggle = ref<HTMLButtonElement | null>(null)
const id = useId()
const closeOutside = (event: PointerEvent) => { if (!root.value?.contains(event.target as Node)) opened.value = false }
const leaveFocus = (event: FocusEvent) => { if (!root.value?.contains(event.relatedTarget as Node)) opened.value = false }
const escape = () => { opened.value = false; toggle.value?.focus() }
onMounted(() => document.addEventListener('pointerdown', closeOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOutside))
watch(() => route.fullPath, () => { opened.value = false })
</script>
<template>
  <div ref="root" class="products-menu" @mouseenter="opened = true" @mouseleave="opened = false" @focusout="leaveFocus" @keydown.esc.prevent="escape">
    <a href="/products" :aria-current="route.path.startsWith('/product') || route.path === '/technology' ? 'page' : undefined">PRODUCTS</a>
    <button ref="toggle" type="button" class="products-menu-toggle" aria-label="Toggle product navigation" :aria-expanded="opened" :aria-controls="id" @click="opened = !opened" @keydown.down.prevent="opened = true"><ArrowIcon :direction="opened ? 'up' : 'down'" /></button>
    <Transition name="products-dropdown"><div v-show="opened" :id="id" class="products-submenu" :inert="!opened">
      <a href="/products">ALL PRODUCTS <ArrowIcon /></a>
      <a href="/technology" :aria-current="route.path === '/technology' ? 'page' : undefined">TECHNOLOGY <ArrowIcon /></a>
    </div></Transition>
  </div>
</template>
<style>
.products-menu{position:relative;display:flex;align-items:center;--menu-unit:1px}
.inner-header .products-menu{--menu-unit:var(--u)}
.inner-header nav .products-menu>a::after,.main-nav .products-menu>a::after{left:calc(100% + 28 * var(--menu-unit))}
.products-menu-toggle{position:absolute;left:100%;width:calc(26 * var(--menu-unit));height:calc(36 * var(--menu-unit));border:0;background:none;color:inherit;display:grid;place-items:center;padding:0}
.products-menu-toggle .vive-arrow{--arrow-size:calc(16 * var(--menu-unit));flex:none;width:var(--arrow-size);min-width:var(--arrow-size);height:var(--arrow-size)}
.inner-header nav{gap:calc(76 * var(--u))}.main-nav{gap:76px}
@media (max-width:1200px){.main-nav{gap:40px}}
.products-submenu{position:absolute;top:100%;left:calc(-24 * var(--menu-unit));width:calc(238 * var(--menu-unit));padding:calc(8 * var(--menu-unit)) 0;background:#141616;border:1px solid #ffffff40;box-shadow:0 16px 30px #0005}
.inner-header .products-submenu{top:calc(100% + 30 * var(--u))}
.inner-header .products-submenu::before{content:'';position:absolute;bottom:100%;height:calc(30 * var(--u));width:100%}
.main-nav .products-submenu a,.inner-header nav .products-submenu a{height:auto;min-height:calc(56 * var(--menu-unit));display:flex;align-items:center;justify-content:space-between;gap:12px;padding:calc(16 * var(--menu-unit)) calc(24 * var(--menu-unit));font-size:calc(14 * var(--menu-unit));line-height:1.4;transition:background .25s,color .25s}
.main-nav .products-submenu a::before,.main-nav .products-submenu a::after,.inner-header nav .products-submenu a::before,.inner-header nav .products-submenu a::after{display:none}
.products-submenu a:is(:hover,:focus-visible){background:#fff;color:#000}
.products-submenu a .vive-arrow{transition:translate .3s}.products-submenu a:hover .vive-arrow{translate:3px 0}
.products-dropdown-enter-active,.products-dropdown-leave-active{transition:opacity .18s,translate .24s cubic-bezier(.22,.68,.1,1)}
.products-dropdown-enter-from,.products-dropdown-leave-to{opacity:0;translate:0 -6px}
@media(prefers-reduced-motion:reduce){.products-dropdown-enter-active,.products-dropdown-leave-active{transition:none}}
</style>
