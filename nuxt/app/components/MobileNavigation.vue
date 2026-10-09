<script setup lang="ts">
const menu = ref<HTMLDetailsElement | null>(null)
const close = () => { if (menu.value) menu.value.open = false }
const escape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !menu.value?.open) return
  close()
  menu.value.querySelector('summary')?.focus()
}
onMounted(() => document.addEventListener('keydown', escape))
onBeforeUnmount(() => document.removeEventListener('keydown', escape))
</script>
<template>
  <details ref="menu" class="mobile-navigation">
    <summary aria-label="Main menu">MENU</summary>
    <nav aria-label="Mobile navigation">
      <a v-for="[label, href] in [['PRODUCTS','/products'],['TECHNOLOGY','/technology'],['ABOUT','/about'],['JOURNAL','/journal'],['FAQS','/faqs'],['CONTACT US','/contact']]" :key="href" :href="href" @click="close">{{ label }}</a>
    </nav>
  </details>
</template>
<style>
.mobile-navigation{display:none}
@media(max-width:1100px){
 .mobile-navigation{display:block;margin-left:auto;font-size:14px;line-height:20px}
 .mobile-navigation summary{list-style:none;cursor:pointer;min-height:44px;display:flex;align-items:center;padding:12px 24px}
 .mobile-navigation summary::-webkit-details-marker{display:none}
 .mobile-navigation nav{position:absolute!important;inset:100% 0 auto!important;transform:none!important;display:flex!important;flex-direction:column!important;gap:0!important;padding:16px 24px 24px;background:#101111;border-bottom:1px solid #fff3;max-height:calc(100svh - 64px);overflow:auto}
 .mobile-navigation nav a{font-size:16px!important;line-height:24px;min-height:48px;padding:12px 0;border-bottom:1px solid #fff2}
 .mobile-navigation nav a::before,.mobile-navigation nav a::after{display:none}
 .site-header:has(.mobile-navigation[open]),.inner-header:has(.mobile-navigation[open]){transform:none!important;background:#101111}
}
</style>
