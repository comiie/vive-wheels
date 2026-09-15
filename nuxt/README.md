# Nuxt migration — full-page review

This directory is an independent Nuxt 4 / Vue 3 / TypeScript application on
`codex/nuxt-vue3-migration`. The root React application and production deployment
remain unchanged. All homepage sections are migrated for a single full-page
review. Do not merge or deploy over production until the owner approves it.

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
`pnpm test:carousel` verifies fractional progress settling, free drag stops,
pointer cancellation, keyboard controls and animation cleanup.
Assets and the approved CSS are shared read-only with `../public` and
`../src/style.css`. `NUXT_PUBLIC_ASSET_BASE` can point to an OSS/CDN asset prefix.
No credentials or production deployment actions are part of this app.

For a production-generated local preview, use a server with HTTP Range support
(required for reliable Safari video playback), for example:

```sh
pnpm generate
pnpm dlx serve@14.2.5 .output/public --listen tcp://127.0.0.1:3101 --no-clipboard
```

Static preview: http://127.0.0.1:3101. A plain Python `http.server` is not suitable
for video acceptance because it does not serve partial byte-range responses.

## Migrated scope

- [x] Navigation, hero video, staggered title, subtitle/card reveal,
  hover frames, down-hide/up-show header, video modal, refresh-to-top.
- [x] Product filter selection, colors, drag/inertia, draggable progress.
- [x] Seven engineering tabs and full-card stack transitions.
- [x] Pinned story sequence, about video, rolling statistics.
- [x] Journal hover, contact and footer.
- [ ] Full-page desktop/mobile/Safari regression review and owner approval.
- [ ] Separate deployment preview approved, then explicit production cutover.

EN, mobile MENU, filter datasets and placeholder CTA destinations retain the
original behavior; migration does not add unapproved translations, menus,
product datasets or inner pages. Production reference: https://vive.onew.design/.

## Verification — 2026-09-15

- TypeScript strict check: passed.
- Static generation (Nuxt 4.5.2 / Vue 3.5.42): passed.
- Static smoke check: passed, including all six anchored sections, eight product
  cards, four journal cards, seven engineering tabs, four counters, SSR masks,
  word spacing and local asset references.
- Deterministic carousel tests: passed, including integer-rounded scrollLeft
  with a fractional target (no endless RAF loop).
- Safari desktop at 1116 px window width: hero/typography/video visible;
  modal plays WebM, Escape closes; header hides on downward scrolling and
  reappears upward; reload from a scrolled position restores the first screen.
- Full-page Safari functional checks: red swatch changes the wheel image;
  cards and progress bar drag and settle freely; all seven engineering steps
  cycle correctly with the rear stack visible; about WebM displays and counters
  advance to their targets; journal images and footer render.
- The original stylesheet is loaded unchanged, including title stagger timings,
  responsive rules, hover frames and reduced-motion rules.
- Full 1920×1080/mobile cross-browser visual acceptance is still pending.
- Full-page owner approval: pending. No staged placeholder sections remain.
- No production HTML, OSS, CDN, DNS or server configuration has been changed.
