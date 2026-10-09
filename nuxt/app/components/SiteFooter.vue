<script setup lang="ts">
const props = defineProps<{ designPreview?: boolean }>()
const asset = useAsset()
</script>

<template>
  <footer id="footer" class="footer footer-updated">
    <div class="footer-content" data-reveal="lift">
      <nav class="footer-nav" aria-label="Footer navigation"><span>NAVI</span><a href="/products">PRODUCTS</a><a href="/technology">TECHNOLOGY</a><a href="/about">ABOUT</a><a href="/journal">JOURNAL</a><a href="/faqs">FAQS</a></nav>
      <div class="footer-contact">
        <div><span>TEL</span><a href="tel:+19499786024">+1 (949) 978-6024</a></div>
        <div><span>EMAIL</span><a href="mailto:info@vivewheels.com">info@vivewheels.com</a></div>
        <div><span>ADDRESS</span><p>Irvine,California,United States</p></div>
      </div>
      <div class="footer-social">
        <span>FOLLOW US</span>
        <div class="social-icons">
          <img class="social-icons-group" :src="asset(props.designPreview ? 'inner-pages/9fc92.svg' : 'imgGroup2085661577.svg')" alt="Facebook, X, Instagram, YouTube, TikTok, Reddit and Discord">
          <span class="social-x-cover" aria-hidden="true" /><img class="social-x" :src="asset('imgSocialX.webp')" alt="X">
        </div>
        <a href="#footer">Privacy Policy</a><p>© 2026,VIVE. All Rights Reserved.</p>
      </div>
    </div>
    <img class="footer-mark" :src="asset(props.designPreview ? 'inner-pages/3e6f2.webp' : 'imgFooterMark.webp')" alt="">
  </footer>
</template>

<style>
footer.footer.footer-updated{--footer-u:var(--u,1px);height:calc(792 * var(--footer-u))}
.footer.footer-updated .footer-content{position:relative;inset:auto;display:grid;grid-template-columns:calc(219 * var(--footer-u)) 1fr calc(297 * var(--footer-u));padding:calc(80 * var(--footer-u));align-items:stretch}
.footer.footer-updated .footer-nav,.footer.footer-updated .footer-contact,.footer.footer-updated .footer-social{position:relative;inset:auto;width:auto;height:calc(256 * var(--footer-u));margin:0}
.footer.footer-updated .footer-nav{display:flex;flex-direction:column;align-items:flex-start;gap:calc(30 * var(--footer-u))}
.footer.footer-updated .footer-nav>span{position:static;margin:0 0 calc(-14 * var(--footer-u));line-height:calc(20 * var(--footer-u))}
.footer.footer-updated .footer-content .footer-nav a{position:relative;inset:auto;white-space:nowrap}
.footer.footer-updated .footer-contact{display:flex;flex-direction:column;justify-content:space-between;gap:0}
.footer.footer-updated .footer-contact>div{position:static;gap:calc(16 * var(--footer-u))}
.footer.footer-updated .footer-social{display:flex;flex-direction:column}
.footer.footer-updated .footer-social>.social-icons{position:relative;inset:auto;margin-top:calc(16 * var(--footer-u));flex:none}
.footer.footer-updated .footer-social>a{position:static;margin-top:auto}
.footer.footer-updated .footer-social>p{position:static;margin-top:calc(20 * var(--footer-u))}
.footer.footer-updated .footer-nav a::before,.footer.footer-updated .footer-nav a::after{position:absolute;top:50%;opacity:0;line-height:1;pointer-events:none;transition:opacity .18s ease,transform .35s cubic-bezier(.16,1,.3,1)}
.footer.footer-updated .footer-nav a::before{content:'「';right:calc(100% + 8 * var(--footer-u));transform:translate(4px,-50%)}
.footer.footer-updated .footer-nav a::after{content:'」';left:calc(100% + 8 * var(--footer-u));transform:translate(-4px,-50%)}
.footer.footer-updated .footer-nav a:is(:hover,:focus-visible)::before,.footer.footer-updated .footer-nav a:is(:hover,:focus-visible)::after{opacity:1;transform:translate(0,-50%)}
.inner-header nav{gap:calc(64 * var(--u))}.main-nav{gap:64px}
@media(max-width:1200px){.main-nav{gap:32px}}
@media(max-width:1100px){
 footer.footer.footer-updated{--footer-u:1px;height:auto;min-height:860px}
 .footer.footer-updated .footer-content{grid-template-columns:1fr 1.5fr;gap:48px 24px;padding:60px 24px 300px}
 .footer.footer-updated .footer-nav{font-size:13px;line-height:20px}
 .footer.footer-updated .footer-nav a{line-height:20px}
 .footer.footer-updated .footer-nav>span,.footer.footer-updated .footer-contact span,.footer.footer-updated .footer-social>span{font-size:12px;line-height:20px}
 .footer.footer-updated .footer-contact{font-size:12px;line-height:18px}
 .footer.footer-updated .footer-contact :is(a,p){font-size:12px;line-height:18px;white-space:normal}
 .footer.footer-updated .footer-social{grid-column:1/-1;height:160px;font-size:12px}
 .footer.footer-updated .footer-social :is(a,p){font-size:12px;line-height:18px}
 .footer.footer-updated .social-icons,.footer.footer-updated .social-icons-group{width:297px;height:20px}
 .footer.footer-updated .social-x-cover{left:34px;width:42px;height:20px}
 .footer.footer-updated .social-x{left:40px;top:1.5px;width:17px;height:17px}
}
@media(prefers-reduced-motion:reduce){.footer.footer-updated .footer-nav a::before,.footer.footer-updated .footer-nav a::after{transition:none}}
</style>
