<script setup lang="ts">
const asset = useAsset()
// Same copy, photography and specifications as the desktop artboard, in reading order.
const specs = [
  { size:'15×7J',face:'f1',inset:35,clearance:43,price:'74,000' },
  { size:'15×7J',face:'f2',inset:25,clearance:43,price:'74,000' },
  { size:'15×8J',face:'f3',inset:35,clearance:34,price:'77,000' },
  { size:'15×8J',face:'f3',inset:25,clearance:43,price:'77,000' },
]
const values = [
 { image:'5ff31',title:'Fitment Is A System',text:'Fitment goes beyond whether a wheel can be installed.' },
 { image:'c651e',title:'Engineering Validation',text:'continuously refining the product toward its defined engineering targets.' },
 { image:'d1ec7',title:'The Same Standard',text:'VIVE Street does not follow a single visual formula.' },
]
</script>
<template>
 <div class="street-editorial-narrow">
  <section class="street-summary">
   <MotionTitle text="VI-1" /><p data-reveal="lift">A forged wheel designed around the demands of everyday performance — balancing lightweight construction, structural strength and refined proportions for the modern performance vehicle.</p>
   <ArrowButton href="#engineering-narrow">LEARN MORE</ArrowButton>
   <img :src="asset('product-details/ddca6.webp')" alt="VI-1 forged wheel" loading="lazy" />
  </section>
  <section id="engineering-narrow">
   <MotionTitle text="Engineered Beyond Design." /><p data-reveal="lift">Behind every VI-1 is a development process that connects digital engineering, material selection, manufacturing and validation.</p>
   <div class="street-engineering-grid"><figure v-for="(_,i) in 4" :key="i" data-reveal="lift"><div class="street-engineering-image"><img :src="asset('product-details/ec3f8.webp')" alt="R-01 engineering detail" loading="lazy" :style="{left: ['0','-102.91%','-206.19%','0'][i], top: i === 3 ? '-103.48%' : '0'}" /></div><figcaption>R-01</figcaption></figure></div>
  </section>
  <section class="street-specifications">
   <MotionTitle text="VI-1 Specifications" /><ArrowButton href="mailto:info@vivewheels.com?subject=VI-1%20Specifications">LEARN MORE</ArrowButton>
   <div class="street-spec-grid"><article v-for="(spec,i) in [...specs,...specs.slice(2),...specs.slice(0,2)]" :key="i" data-reveal="lift"><h3>{{ spec.size }}</h3><dl><div v-for="[label,value] in [['FACE',spec.face],['INSET',spec.inset],['HUB CLEARANCE (mm)',spec.clearance],['HOLE',4],['P.C.D.',100],['HUB BORE (φ)',65],['DRILL (φ)','29-13'],['COLOR','bl'],['PRICE',`¥${spec.price}`]]" :key="label"><dt>{{ label }}</dt><dd>{{ value }}</dd></div></dl></article></div>
  </section>
  <section class="street-values"><article v-for="value in values" :key="value.title" data-reveal="lift"><img :src="asset(`product-details/${value.image}.svg`)" alt="" loading="lazy" /><h3>{{ value.title }}</h3><p>{{ value.text }}</p></article></section>
 </div>
</template>
<style>
.street-editorial-narrow{display:none}
@media(max-width:1100px){
 .street-editorial-narrow{display:block}
 .inner-page .detail-editorial-section:is([data-design-node="727:2856"],[data-design-node="727:3066"],[data-design-node="727:3087"],[data-design-node="727:2878"]){display:none}
 .street-editorial-narrow section{padding:60px 24px;scroll-margin-top:70px}
 .street-editorial-narrow h2{max-width:850px}
 .street-editorial-narrow p{font-size:15px;line-height:1.65;max-width:700px;margin:24px 0}
 .street-summary>img{display:block;width:min(100%,560px);margin:32px auto 0}
 .street-engineering-grid,.street-spec-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px 20px;margin-top:32px}
 .street-engineering-grid figure{margin:0;min-width:0}
 .street-engineering-image{position:relative;overflow:hidden;aspect-ratio:382/320}
 .street-engineering-image img{position:absolute;width:306.19%;height:203.48%;max-width:none}
 .street-engineering-grid figcaption{font-size:20px;margin-top:16px}
 .street-specifications{background:linear-gradient(#0e0f0fb3,#0e0f0f),url('/assets/product-details/2f6c8.webp') center/cover}
 .street-specifications>.outline-button{margin-top:24px}
 .street-spec-grid h3{font-size:24px;border-bottom:1px solid #fff4;padding-bottom:16px;margin:0}
 .street-spec-grid dl{font-size:14px;line-height:1.6;margin:20px 0}
 .street-spec-grid dl>div{display:flex;gap:16px;justify-content:space-between;margin-top:8px}
 .street-spec-grid dd{margin:0;flex:none}
 .street-values{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;text-align:center}
 .street-values img{width:60px;height:60px;margin:auto}
 .street-values h3{font-size:20px;line-height:1.4;margin:24px 0 0}
 .street-values p{margin-bottom:0}
}
@media(max-width:600px){.street-spec-grid,.street-values{grid-template-columns:1fr}.street-values{gap:48px}}
</style>
