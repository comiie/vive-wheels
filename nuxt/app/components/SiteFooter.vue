<script setup lang="ts">
const asset = useAsset()
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer-content" data-reveal="lift">
      <div class="footer-nav"><span>NAVI</span><a href="#products">PRODUCTS</a><a href="#about">ABOUT</a><a href="#journal">JOURNAL</a><a href="#footer">FAQS</a></div>
      <div class="footer-contact">
        <div><span>TEL</span><a href="tel:+19499786024">+1 (949) 978-6024</a></div>
        <div><span>EMAIL</span><a href="mailto:info@vivewheels.com">info@vivewheels.com</a></div>
        <div><span>ADDRESS</span><p>Irvine,California,United States</p></div>
      </div>
      <div class="footer-social">
        <span>FOLLOW US</span>
        <div class="social-icons">
          <img class="social-icons-group" :src="asset('imgGroup2085661577.svg')" alt="Facebook, Instagram, YouTube, TikTok, Reddit and Discord">
          <span class="social-x-cover" aria-hidden="true" /><img class="social-x" :src="asset('imgSocialX.webp')" alt="X">
        </div>
        <a href="#footer">Privacy Policy</a><p>© 2026,VIVE. All Rights Reserved.</p>
      </div>
    </div>
    <img class="footer-mark" :src="asset('imgFooterMark.webp')" alt="">
  </footer>
</template>
