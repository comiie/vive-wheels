# Nuxt migration — staged review

This directory is an independent Nuxt 4 / Vue 3 / TypeScript application on
`codex/nuxt-vue3-migration`. The root React application and production deployment
remain unchanged. Do not merge or deploy over production until every stage has
been approved by the owner.

## Run

```sh
cd nuxt
pnpm install
pnpm dev
```

Preview: http://localhost:3100. `pnpm typecheck` validates TypeScript;
`pnpm generate` produces a static website in `.output/public`.
After generating, `pnpm test:static` checks prerendered content, word spacing,
review-only metadata and all local asset references. Requires Node >= 22.12.
Assets and the approved CSS are shared read-only with `../public` and
`../src/style.css`. `NUXT_PUBLIC_ASSET_BASE` can point to an OSS/CDN asset prefix.
No credentials or production deployment actions are part of this app.

## Review gates

- [ ] Stage 1: navigation, hero video, staggered title, subtitle/card reveal,
  hover frames, down-hide/up-show header, video modal, refresh-to-top.
- [ ] Stage 2: product filters, colors, drag/inertia, draggable progress.
- [ ] Stage 3: engineering tabs and full-card stack transitions.
- [ ] Stage 4: pinned story sequence, about video, rolling statistics.
- [ ] Stage 5: journal hover, contact and footer.
- [ ] Full-page desktop/mobile/Safari regression review and owner approval.
- [ ] Separate deployment preview approved, then explicit production cutover.

Only Stage 1 is implemented. The labelled sections below the hero are scroll
and anchor test fixtures, not migrated page content. EN and mobile MENU retain
the original placeholder behavior; this migration does not invent translations
or a new mobile menu. Production reference: https://vive.onew.design/.

## Stage 1 verification — 2026-09-15

- TypeScript strict check: passed.
- Static generation (Nuxt 4.5.2 / Vue 3.5.42): passed.
- Static smoke check: passed, including 14 asset references and SSR content.
- Safari desktop at 1116 px window width: hero/typography/video visible;
  modal plays WebM, Escape closes; header hides on downward scrolling and
  reappears upward; reload from a scrolled position restores the first screen.
- The original stylesheet is loaded unchanged, including title stagger timings,
  responsive rules, hover frames and reduced-motion rules.
- Full 1920×1080/mobile cross-browser visual acceptance is still pending.
- Owner approval: pending. Later screens are intentionally not migrated yet.
- No production HTML, OSS, CDN, DNS or server configuration has been changed.
