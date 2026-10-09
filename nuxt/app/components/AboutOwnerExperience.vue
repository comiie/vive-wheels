<script setup lang="ts">
const asset = useAsset()
const scene = ref<HTMLElement | null>(null)
const { active, progress, pinned, select } = usePinnedSteps(scene, 5, .65)
const services = ['Engineering Consultation', 'Transparent Communication', 'Long-Term Support', 'Precision Manufacturing', 'Community & Culture']
// Reuse the site's supplied photography; each service owns a distinct background.
const backgrounds = ['inner-pages/cb766', 'technology/6417a', 'inner-pages/695f7', 'inner-pages/b2901', 'inner-pages/4b66b']
const descriptions = [
  'User experience doesn’t come solely from the product itself, but also from the trust built through every detail.',
  'From professional consultation to product delivery, we provide transparent, efficient communication throughout every stage.',
  'From product delivery to subsequent use, we provide continuous professional services and technical support.',
  'From forging to CNC precision machining, to surface treatment and quality verification.',
  'VIVE was born from a passion for automotive culture and a belief in putting our manufacturing expertise to work in our own products.',
]
const keydown = (event: KeyboardEvent, index: number) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  select(event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (index + (event.key === 'ArrowRight' ? 1 : 4)) % 5)
  document.getElementById(`owner-tab-${active.value}`)?.focus({ preventScroll: true })
}
</script>
<template>
  <section class="about-owner about-owner-scroll">
    <MotionTitle text="OWNER EXPERIENCE" />
    <div id="owner-experience" ref="scene" class="owner-scroll-scene" :class="{ 'is-pinned': pinned }">
      <div class="about-owner-photo">
        <img v-for="(background, i) in backgrounds" :key="background" class="owner-car owner-background" :class="{ 'is-active': active === i, 'is-original': i === 0 }" :src="asset(`${background}.webp`)" :alt="services[i]" :aria-hidden="active !== i" loading="lazy" />
        <div class="inner-shade" />
        <div class="owner-readability-shade" aria-hidden="true" />
        <Transition name="owner-copy" mode="out-in" appear><p :key="active" id="owner-panel" class="owner-description" role="tabpanel" :aria-labelledby="`owner-tab-${active}`">{{ descriptions[active] }}</p></Transition>
        <div class="owner-services" role="tablist" aria-label="Owner experience" data-reveal="fade">
          <button v-for="(service, i) in services" :id="`owner-tab-${i}`" :key="service" type="button" role="tab" :aria-selected="active === i" aria-controls="owner-panel" :tabindex="active === i ? 0 : -1" :class="{ selected: active === i }" @click="select(i)" @keydown="keydown($event, i)">
            <div class="owner-service-line" :style="{ backgroundImage: `url(${asset('inner-pages/bd31f.svg')})` }"><span :style="{ backgroundImage: `url(${asset('inner-pages/0b625.svg')})`, transform: `scaleX(${i < active ? 1 : i === active ? (pinned ? progress : 1) : 0})` }" /></div>
            <p>{{ service }}</p>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.about-owner.about-owner-scroll{height:auto}
.owner-services>button{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;min-width:0}
.owner-readability-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#000b,transparent 70%),linear-gradient(0deg,#000d,transparent 45%)}
.owner-scroll-scene .owner-background{opacity:0;transition:opacity .7s cubic-bezier(.22,.68,.1,1),scale 1s ease;scale:1.025}.owner-scroll-scene .owner-background.is-active{opacity:1;scale:1}.owner-scroll-scene .owner-background:not(.is-original){inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.owner-scroll-scene{position:relative;margin:calc(80 * var(--u)) calc(80 * var(--u)) 0}.owner-scroll-scene .about-owner-photo{margin:0;height:100svh;min-height:540px}.owner-scroll-scene.is-pinned .about-owner-photo{position:sticky;top:0;min-height:0}.owner-scroll-scene .owner-description{top:46%;transform:translateY(-50%)}.owner-scroll-scene .owner-services{top:auto;bottom:6%;}.owner-scroll-scene .owner-service-line{height:1px}.owner-scroll-scene .owner-service-line span{width:100%;height:1px;transform-origin:left}.owner-scroll-scene .owner-car{object-fit:cover}
@media(max-width:760px){.owner-scroll-scene{margin:32px 20px 0}.owner-scroll-scene .about-owner-photo{min-height:640px}.owner-scroll-scene .owner-description{left:24px;width:calc(100% - 48px);top:35%;font-size:16px;line-height:24px}.owner-scroll-scene .owner-services{left:24px;right:24px;bottom:24px;grid-template-columns:1fr;gap:16px}.owner-scroll-scene .owner-services p{font-size:12px;line-height:18px;white-space:normal;margin-top:7px}.owner-scroll-scene .owner-service-line{height:1px}.owner-scroll-scene .owner-car{left:-80%;width:220%;height:100%;top:0}.owner-scroll-scene .owner-side-shade{width:100%;background:linear-gradient(90deg,#0008,transparent)}}
@media(prefers-reduced-motion:reduce){.owner-copy-enter-active,.owner-copy-leave-active,.owner-scroll-scene .owner-background{transition:none;scale:1}}
</style>
