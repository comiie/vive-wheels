import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-15',
  devtools: { enabled: false },
  // Keep the approved React build and its deployment completely independent.
  dir: { public: '../public' },
  css: [
    '@fontsource/space-mono/400.css',
    fileURLToPath(new URL('../src/style.css', import.meta.url)),
  ],
  runtimeConfig: { public: { assetBase: '/assets/' } },
  typescript: { strict: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'VIVE Wheels — Nuxt Preview',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#0e0f0f' },
        { name: 'description', content: 'VIVE Wheels — engineered for the driven.' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [{ rel: 'icon', type: 'image/png', sizes: '100x100', href: '/favicon.png' }],
      script: [{ innerHTML: "if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; if (location.hash) history.replaceState(null, '', location.pathname + location.search); scrollTo(0, 0);" }],
    },
  },
})
