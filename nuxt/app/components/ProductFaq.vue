<script setup lang="ts">
const query = ref('')
const asset = useAsset()
const expanded = ref(-1)
const showAll = ref(false)
const questions = [
  ['What are Zinc Lug Nuts & Bolts used for?', 'They secure a wheel to the vehicle. The correct hardware depends on the wheel and vehicle fitment. Ask VIVE to confirm the specification for your installation.'],
  ['How do I know which hardware fits my vehicle?', 'Send VIVE your vehicle model, year and wheel specification. Thread size, seat type and length must be confirmed before installation.'],
  ['Are all lug nuts and bolts interchangeable?', 'No. Use only hardware confirmed to match both your vehicle and wheels.'],
  ['Can I use VIVE hardware with other wheels?', 'Compatibility must be checked for the specific wheel and vehicle. Contact VIVE before ordering.'],
  ['What finishes are available?', 'Select a finish above to preview the options, then contact VIVE to confirm current availability.'],
  ['How can I request a custom fitment?', 'Email info@vivewheels.com with your vehicle details and the configuration you would like to discuss.'],
]
const visible = computed(() => questions.map((item, index) => ({ question: item[0]!, answer: item[1]!, index })).filter(item => item.question.toLowerCase().includes(query.value.toLowerCase())))
watch(query, () => { expanded.value = -1 })
</script>
<template>
  <section id="product-faq" class="product-faq">
    <div class="product-faq-intro"><MotionTitle text="FAQs" /><p data-reveal="fade">Find answers to common questions about VIVE wheels, fitment, customization, engineering, and ownership.</p><label class="product-faq-search"><img :src="asset('product-details/51c32.svg')" alt="" style="width:calc(16 * var(--u));height:calc(16 * var(--u))" /><input v-model="query" type="search" aria-label="Search product FAQs" /></label></div>
    <div class="product-faq-list" data-reveal="fade">
      <div class="faq-items">
        <SmoothCollapse v-for="(item, row) in visible" :key="item.index" as="article" :open="row < 5 || showAll || !!query" class="faq-item">
          <h3><button :aria-expanded="expanded === item.index" :aria-controls="`faq-answer-${item.index}`" @click="expanded = expanded === item.index ? -1 : item.index">{{ item.question }}<span :class="{ expanded: expanded === item.index }">+</span></button></h3>
          <SmoothCollapse :id="`faq-answer-${item.index}`" :open="expanded === item.index" class="faq-answer"><p>{{ item.answer }}</p></SmoothCollapse>
        </SmoothCollapse>
      </div>
      <p v-if="!visible.length" class="faq-empty" role="status">No matching questions. Try another search.</p>
      <button v-if="!query" class="faq-more" :aria-expanded="showAll" @click="showAll = !showAll"><span>{{ showAll ? 'LESS' : 'MORE' }}</span><ArrowIcon :direction="showAll ? 'up' : 'down'" /></button>
    </div>
  </section>
</template>
<style>
.product-detail .product-faq-list article{border:0;box-shadow:none}.product-detail .product-faq-list article:last-of-type{border:0;box-shadow:none}.faq-item>.smooth-collapse-content>h3{border-top:1px solid #ffffff55}.faq-items{border-bottom:1px solid #ffffff55}
.product-faq{position:relative;min-height:calc(660 * var(--u));padding:calc(100 * var(--u)) calc(80 * var(--u)) calc(100 * var(--u));display:grid;grid-template-columns:calc(574 * var(--u)) 1fr;gap:calc(80 * var(--u))}.product-faq-intro>p{font-size:calc(20 * var(--u));line-height:calc(24 * var(--u));letter-spacing:calc(.8 * var(--u));color:#fffc;margin-top:calc(24 * var(--u));width:100%;min-height:calc(70 * var(--u))}.product-faq-search{margin-top:calc(60 * var(--u));border:1px solid #fff;width:calc(420 * var(--u));height:calc(42 * var(--u));display:flex;align-items:center;padding:0 calc(24 * var(--u));gap:calc(12 * var(--u));font-size:calc(24 * var(--u))}.product-faq-search input{min-width:0;width:100%;background:none;border:0;outline:none;color:#fff;font:inherit;font-size:calc(16 * var(--u))}.product-faq-search:focus-within{outline:none}.product-faq-search input:focus{outline:none;box-shadow:none}.product-faq-list article{border-top:1px solid #ffffff55}.product-faq-list article:last-of-type{border-bottom:1px solid #ffffff55}.product-faq-list h3{margin:0}.product-faq-list h3 button{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:calc(76 * var(--u));padding:calc(20 * var(--u)) calc(24 * var(--u));border:0;background:none;color:white;font-family:inherit;font-size:calc(20 * var(--u));line-height:calc(24 * var(--u));text-align:left;text-transform:uppercase;gap:calc(20 * var(--u))}.product-faq-list h3 button:hover{background:#ffffff08}.product-faq-list h3 span{font-size:calc(24 * var(--u));transition:rotate .55s cubic-bezier(.22,.68,.1,1)}.product-faq-list h3 span.expanded{rotate:45deg}.faq-answer p{padding:0 calc(24 * var(--u)) calc(24 * var(--u));color:#bbb;font-size:calc(18 * var(--u));line-height:1.7}.faq-more{display:flex;align-items:center;justify-content:center;min-height:42px;transition:color .3s;gap:calc(8 * var(--u));margin:calc(60 * var(--u)) auto 0;background:none;border:0;color:white;font-size:calc(16 * var(--u));line-height:calc(20 * var(--u));padding:0}.faq-empty{padding:30px 0;color:#aaa}
</style>
