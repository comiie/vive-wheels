import { fileURLToPath } from 'node:url'

const productionRelease = process.env.VIVE_PRODUCTION === '1'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-15',
  devtools: { enabled: false },
  // Reuse the approved assets and CSS; retain React sources for rollback.
  dir: { public: '../public' },
  css: [
    'lenis/dist/lenis.css',
    '@fontsource/space-mono/400.css',
    fileURLToPath(new URL('../src/style.css', import.meta.url)),
    '~/assets/inner-pages.css',
    '~/assets/inner-motion.css',
    '~/assets/product-details.css',
    '~/assets/technology.css',
    '~/assets/editorial.css',
    '~/assets/responsive.css',
    '~/assets/navigation.css',
  ],
  runtimeConfig: { public: { assetBase: '/assets/' } },
  typescript: { strict: true },
  nitro: { prerender: { routes: [
    ...Array.from({ length: 12 }, (_, i) => `/journal/brand-${i + 1}`),
    ...Array.from({ length: 23 }, (_, i) => `/journal/engineering-${i + 1}`),
    ...Array.from({ length: 16 }, (_, i) => `/journal/case-studies-${i + 1}`),
  ] } },
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
        { rel: 'icon', type: 'image/webp', sizes: '100x100', href: '/favicon.webp' },
        ...(productionRelease ? [{ rel: 'canonical' as const, href: 'https://vive.onew.design/' }] : []),
      ],
      script: [{ innerHTML: "if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; if (performance.getEntriesByType('navigation')[0]?.type === 'reload' && location.hash) history.replaceState(null, '', location.pathname + location.search); scrollTo(0, 0);" }],
    },
  },
})
