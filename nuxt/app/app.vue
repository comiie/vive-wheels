<script setup lang="ts">
const videoOpen = ref(false)
usePageMotion(videoOpen)
const checkpoints = [
  { id: 'products', title: 'PRODUCT COLLECTION' },
  { id: 'about', title: 'ENGINEERING / WHO WE ARE' },
  { id: 'journal', title: 'JOURNAL' },
  { id: 'footer', title: 'FOOTER' },
]
</script>

<template>
  <main>
    <HeroSection @open-video="videoOpen = true" />
    <aside class="migration-review" aria-label="Migration review status">
      <p>NUXT MIGRATION · 第一屏待验收 · 非线上正式版本</p>
      <p>下方区域仅用于验证导航下滑隐藏、上滑显示；后续板块将在首屏确认后逐屏迁移。</p>
      <a href="https://vive.onew.design/" target="_blank" rel="noopener">打开现在线上版本对照 ↗</a>
      <section v-for="checkpoint in checkpoints" :id="checkpoint.id" :key="checkpoint.id" class="migration-checkpoint">
        <h2>{{ checkpoint.title }}</h2>
        <p>待迁移，当前仅为锚点与滚动测试区域。</p>
      </section>
    </aside>
  </main>
  <VideoModal v-if="videoOpen" @close="videoOpen = false" />
</template>

<style>
.migration-review { padding: 70px var(--pad); color: #aaa; font-size: 14px; line-height: 1.8; }
.migration-review > a { display: inline-block; margin-top: 20px; color: #fff; text-decoration: underline; }
.migration-checkpoint { min-height: 40svh; padding-top: 100px; }
.migration-checkpoint h2 { color: #ddd; font-size: clamp(20px, 3vw, 36px); }
</style>
