import { fileURLToPath } from 'node:url'

const productionRelease = process.env.VIVE_PRODUCTION === '1'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-15',
  devtools: { enabled: false },
  // Reuse the approved assets and CSS; retain React sources for rollback.
  dir: { public: '../public' },
  css: [
    '@fontsource/space-mono/400.css',
    fileURLToPath(new URL('../src/style.css', import.meta.url)),
  ],
  runtimeConfig: { public: { assetBase: '/assets/' } },
  typescript: { strict: true },
  app: {
    cdnURL: process.env.NUXT_APP_CDN_URL || '',
    head: {
      htmlAttrs: { lang: 'en' },
      title: productionRelease ? 'VIVE Wheels' : 'VIVE Wheels — Nuxt Preview',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#0e0f0f' },
        { name: 'description', content: 'VIVE Wheels — engineered for the driven.' },
        { name: 'robots', content: productionRelease ? 'index, follow' : 'noindex, nofollow' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '100x100', href: productionRelease ? 'https://cdn-vive.onew.design/media-20260914/favicon.png' : '/favicon.png' },
        ...(productionRelease ? [{ rel: 'canonical' as const, href: 'https://vive.onew.design/' }] : []),
      ],
      script: [{ innerHTML: "if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; if (location.hash) history.replaceState(null, '', location.pathname + location.search); scrollTo(0, 0);" }],
    },
  },
})
