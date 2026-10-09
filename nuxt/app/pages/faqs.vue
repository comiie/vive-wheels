<script setup lang="ts">
useHead({ title: 'Frequently Asked Questions — VIVE' })
const activeCategory = ref(0)
const expanded = ref<string | null>(null)
const categories = [
  { id: 'product-basics', title: 'Product Basics' },
  { id: 'transportation-installation', title: 'Transportation & Installation' },
  { id: 'customization-expansion', title: 'Customization & Expansion' },
]
// The design repeats these five questions in all three groups. Keep its copy;
// editorial category-specific questions can replace these without layout changes.
const questions = [
  { title: 'What materials are VIVE wheels made from?', answer: 'Materials vary by wheel model and construction. Please refer to the product specification or contact VIVE to confirm the material for your selected wheel.' },
  { title: 'How do I choose the right wheels for my vehicle?', answer: 'Share your vehicle model, year and current wheel specification with VIVE. Size, width, offset, bolt pattern, hub bore and brake clearance should all be confirmed before ordering.' },
  { title: 'Can VIVE wheels be customized?', answer: 'Contact VIVE to discuss the finish and configuration you have in mind. Available options depend on the wheel model and vehicle fitment.' },
  { title: 'What is hub-centric fitment?', answer: 'Hub-centric fitment centers the wheel on the vehicle’s hub. Confirm the center bore and any required fitment hardware for your specific wheel and vehicle before installation.' },
  { title: 'How does VIVE ensure wheel quality?', answer: 'Explore our Technology page for an overview of material selection, precision manufacturing, inspection and engineering validation.' },
]
let categoryFrame = 0
const syncCategory = () => {
  if (categoryFrame) return
  categoryFrame = requestAnimationFrame(() => {
    const marker = window.innerHeight * .3
    let current = 0
    categories.forEach((category, index) => {
      if ((document.getElementById(category.id)?.getBoundingClientRect().top ?? Infinity) <= marker) current = index
    })
    activeCategory.value = current
    categoryFrame = 0
  })
}
onMounted(() => {
  window.addEventListener('scroll', syncCategory, { passive: true })
  window.addEventListener('resize', syncCategory)
  syncCategory()
})
onBeforeUnmount(() => { window.removeEventListener('scroll', syncCategory); window.removeEventListener('resize', syncCategory); cancelAnimationFrame(categoryFrame) })
</script>
<template>
  <InnerPage :upgrade="false" class="faq-page">
    <div class="faq-page-layout">
      <aside class="faq-page-sidebar">
        <MotionTitle as="h1" text="FREQUENTLY ASKED QUESTIONS" data-reveal-group="faq-entry" />
        <nav aria-label="FAQ categories" data-reveal="fade" data-reveal-group="faq-entry">
          <a v-for="(category, i) in categories" :key="category.id" :href="`#${category.id}`" data-anchor-duration="0.6" :aria-current="activeCategory === i ? 'location' : undefined"><span>{{ category.title }}</span></a>
        </nav>
      </aside>
      <div class="faq-page-groups">
        <section v-for="category in categories" :id="category.id" :key="category.id" class="faq-page-group" :aria-labelledby="`${category.id}-title`">
          <h2 :id="`${category.id}-title`" data-reveal="fade">{{ category.title }}</h2>
          <div class="faq-page-questions" data-reveal="fade">
            <article v-for="(question, i) in questions" :key="question.title">
              <h3><button :id="`${category.id}-question-${i}`" :aria-expanded="expanded === `${category.id}-${i}`" :aria-controls="`${category.id}-answer-${i}`" @click="expanded = expanded === `${category.id}-${i}` ? null : `${category.id}-${i}`"><span>{{ question.title }}</span><span class="faq-page-plus" :class="{ 'is-open': expanded === `${category.id}-${i}` }" aria-hidden="true">+</span></button></h3>
              <SmoothCollapse :id="`${category.id}-answer-${i}`" :open="expanded === `${category.id}-${i}`" role="region" :aria-labelledby="`${category.id}-question-${i}`"><div class="faq-page-answer"><p>{{ question.answer }}</p><a v-if="i === 4" href="/technology">EXPLORE TECHNOLOGY <ArrowIcon /></a></div></SmoothCollapse>
            </article>
          </div>
        </section>
      </div>
    </div>
  </InnerPage>
</template>
<style>
.faq-page-layout{padding:calc(180 * var(--u)) calc(80 * var(--u)) calc(100 * var(--u));display:grid;grid-template-columns:calc(574 * var(--u)) minmax(0,1fr);gap:calc(80 * var(--u));align-items:start}
.faq-page-sidebar{position:sticky;top:calc(130 * var(--u))}.faq-page-sidebar h1{max-width:calc(441 * var(--u))}
.faq-page-sidebar nav{display:flex;flex-direction:column;gap:calc(26 * var(--u));margin-top:calc(64 * var(--u));width:calc(335 * var(--u))}
.faq-page-sidebar nav a{display:flex;align-items:center;justify-content:center;text-align:center;min-height:calc(40 * var(--u));border:1px solid #fff;font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));padding:calc(9 * var(--u)) calc(10 * var(--u))}
.faq-page-sidebar nav a{background:transparent;color:#fff;transition:background-color .14s ease-out,color .14s ease-out}.faq-page-sidebar nav a[aria-current="location"],.faq-page-sidebar nav a:hover{background:#fff;color:#111}
.faq-page-group{scroll-margin-top:calc(120 * var(--u))}.faq-page-group+.faq-page-group{margin-top:calc(80 * var(--u))}
.faq-page-group h2{font-size:calc(16 * var(--u));line-height:calc(24 * var(--u));letter-spacing:calc(.8 * var(--u));margin:0 calc(24 * var(--u)) calc(24 * var(--u))}
.faq-page-questions{border-bottom:1px solid #ffffff40}.faq-page-questions article{border-top:1px solid #ffffff40}
.faq-page-questions h3{margin:0}.faq-page-questions h3 button{display:flex;align-items:center;justify-content:space-between;gap:calc(24 * var(--u));width:100%;min-height:calc(76 * var(--u));padding:calc(24 * var(--u));border:0;background:none;color:#fff9;text-transform:uppercase;text-align:left;font-family:inherit;font-size:calc(20 * var(--u));line-height:calc(28 * var(--u));transition:color .2s}
.faq-page-questions h3 button:is(:hover,:focus-visible,[aria-expanded=true]){color:#fff}
.faq-page-plus{flex:none;width:calc(16 * var(--u));height:calc(16 * var(--u));display:grid;place-content:center;font-size:calc(20 * var(--u));transition:rotate .45s cubic-bezier(.22,.68,.1,1)}.faq-page-plus.is-open{rotate:45deg}
.faq-page-answer{padding:0 calc(24 * var(--u)) calc(28 * var(--u));color:#bbb;font-size:calc(18 * var(--u));line-height:1.7}.faq-page-answer a{display:inline-flex;align-items:center;gap:8px;margin-top:16px;color:white;font-size:calc(14 * var(--u))}
.inner-page.faq-page .footer{margin-top:0}
@media(max-width:1100px){.faq-page-layout{display:block;padding:110px 24px 60px}.faq-page-sidebar{position:static}.faq-page-sidebar h1{max-width:400px;font-size:36px;line-height:1.2}.faq-page-sidebar nav{width:100%;margin-top:30px;gap:12px}.faq-page-sidebar nav a{font-size:13px;min-height:42px;padding:10px}.faq-page-groups{margin-top:50px}.faq-page-group+.faq-page-group{margin-top:48px}.faq-page-group h2{font-size:18px;line-height:24px;margin:0 0 20px}.faq-page-questions h3 button{font-size:16px;line-height:24px;padding:20px 0;min-height:76px;gap:20px}.faq-page-plus{width:16px;height:16px;font-size:20px}.faq-page-answer{padding:0 0 24px;font-size:15px}.faq-page-answer a{font-size:13px}.faq-page-group{scroll-margin-top:80px}}
@media(max-width:1100px){.faq-page-group h2{font-size:16px}}
</style>
