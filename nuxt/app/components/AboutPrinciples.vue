<script setup lang="ts">
const asset = useAsset()
const scene = ref<HTMLElement | null>(null)
const { active, pinned, select } = usePinnedSteps(scene, 3, .85)
// Reuse supplied site copy until dedicated descriptions are provided.
const principles = [
  { title: 'SAFETY', text: 'Protect every journey with engineering standards, making reliability the foundation of driving.' },
  { title: 'PERFORMANCE', text: 'We bring together material knowledge, structural design, and manufacturing precision to create wheels that balance performance and design.' },
  { title: 'DRIVING EXPERIENCE', text: 'Whether you’re driving on city roads, mountain paths, racing tracks, or on off-road adventures, we hope that VIVE can be your trusted companion.' },
]
</script>
<template>
  <section id="core-principles" ref="scene" class="principles-scene" :class="{ 'is-pinned': pinned }">
    <div class="about-principles inner-photo">
      <img class="inner-background" :src="asset('inner-pages/5c02d.webp')" alt="VIVE technician working on a wheel" loading="lazy" />
      <div class="inner-shade" />
      <div class="about-principles-copy" data-reveal="lift">
        <p class="principles-eyebrow">Core Principles</p>
        <div v-for="(item, i) in principles" :key="item.title" class="principle-item" :class="{ 'is-active': active === i }">
          <h2><button :aria-expanded="active === i" :aria-controls="`principle-description-${i}`" @click="select(i)">{{ item.title }}</button></h2>
          <SmoothCollapse :open="active === i"><p :id="`principle-description-${i}`" class="principles-description">{{ item.text }}</p></SmoothCollapse>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.principles-scene{position:relative}.principles-scene .about-principles{height:100svh;min-height:600px;margin:0;display:grid;place-items:center}.principles-scene.is-pinned .about-principles{position:sticky;top:0;min-height:0}.principles-scene .about-principles-copy{padding:0;width:100%}.principles-scene .principle-item h2{margin:32px 0 0;font-size:min(calc(48 * var(--u)),5.4svh);line-height:1.2}.principles-scene .principle-item:first-of-type h2{margin-top:24px}.principle-item button{border:0;padding:0;background:none;color:#fffc;font:inherit;cursor:pointer;transition:color .3s}.principle-item.is-active button,.principle-item button:hover{color:#fff}.principle-item button:focus-visible{outline:none;text-decoration:underline;text-underline-offset:8px}.principles-scene .principles-description{max-width:90vw;margin-top:24px;margin-bottom:8px}.principles-scene .principles-eyebrow{margin:0}
@media(max-width:760px){.principles-scene .about-principles{min-height:640px}.principles-scene .principle-item h2{font-size:28px}.principles-scene .principles-eyebrow{font-size:16px;line-height:24px}.principles-scene .principles-description{width:calc(100% - 48px);font-size:14px;line-height:22px}}
</style>
