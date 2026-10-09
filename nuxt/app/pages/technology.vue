<script setup lang="ts">
import '../assets/technology.css'
useHead({ title: 'Technology — VIVE' })
const asset = useAsset()
</script>
<template>
  <InnerPage :upgrade="false" class="technology-page">
    <section class="technology-hero inner-photo">
      <img class="inner-background" :src="asset('technology/hero-hd.webp')" alt="Performance car and wheels in a dark studio" fetchpriority="high" />
      <div class="inner-shade" />
      <div class="technology-hero-copy"><MotionTitle as="h1" text="ENGINEERING DEFINES PERFORMANCE" /><p data-reveal="fade">From materials science to precision manufacturing, engineering drives every stage of VIVE wheel development.</p></div>
    </section>
    <section class="technology-statement"><h2 data-reveal="fade"><span>Materials determine a product’s potential</span><span>engineering determines its quality</span><span>and continuous innovation determines its future</span></h2></section>
    <section class="technology-quality">
      <div class="technology-quality-photo inner-photo" data-reveal="lift"><img class="inner-background" :src="asset('technology/3e5fc.webp')" alt="Quality control and manufacturing at VIVE" loading="lazy" /><div class="inner-shade" /></div>
      <div class="technology-quality-copy"><MotionTitle text="QUALITY CONTROL" /><div data-reveal="fade"><p>VIVE has established a comprehensive quality management system that covers all aspects of development, manufacturing, quality control, and continuous improvement. From the selection of raw materials, process control, precision machining, to final engineering verification, every step follows unified engineering standards and quality requirements. This ensures that products are stable, reliable, and safe.</p><p>Our manufacturing system operates in accordance with international automotive industry quality management standards. We have established a comprehensive quality traceability mechanism, ensuring full-process monitoring and data management of key stages in the product manufacturing process. This helps to continuously improve manufacturing quality and production stability.</p></div></div>
    </section>
    <TechnologyWorkflow />
    <TechnologyMaterials />
    <section class="technology-validation-intro"><p data-reveal="fade">All products must undergo digital engineering validation (DEV) before being released into production. For racing vehicles, new technology platforms, and research and development projects, additional performance engineering validation (PEV) is required to meet higher standards in terms of performance, safety, and reliability.</p></section>
    <TechnologyValidation />
    <section class="technology-warranty inner-photo"><img class="inner-background" :src="asset('technology/42a6c.webp')" alt="Wheel engineering and craftsmanship" loading="lazy" /><div class="inner-shade" /><div><p data-reveal="fade">We build every wheel with the goal that</p><MotionTitle text="YOU’LL NEVER NEED THE WARRANTY." /></div></section>
  </InnerPage>
</template>
