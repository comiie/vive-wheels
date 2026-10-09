# VIVE Wheels

Production VIVE Wheels website built with Nuxt 4, Vue 3 and TypeScript.
The active application is in `nuxt/`. The original React/Vite files at the
repository root remain as a rollback/reference implementation.

## Development

```bash
cd nuxt
pnpm install
pnpm dev
```

## Production build

```bash
cd nuxt
VIVE_PRODUCTION=1 \
NUXT_APP_CDN_URL=https://cdn-vive.onew.design/nuxt-20260915/ \
NUXT_PUBLIC_ASSET_BASE=https://cdn-vive.onew.design/media-20260914/assets/ \
pnpm generate
```

Use a new versioned CDN prefix for each future release. Publish generated
resources first, verify them, then atomically replace the server HTML entry.
See `nuxt/DEPLOYMENT.md` for the deployed release and rollback instructions.

## Vercel review deployment

Import `comiie/vive-wheels` with the repository root as Root Directory and
Node.js 22.x or newer. The root `vercel.json` explicitly builds the Nuxt app
and publishes `nuxt/.output/public`, not the retained React/Vite app.
Use branch `codex/inner-pages-static` for the current inner-page review.
No environment variables are required: JS, images and videos use local URLs.
Leave `VIVE_PRODUCTION`, `NUXT_APP_CDN_URL` and `NUXT_PUBLIC_ASSET_BASE` unset
for this separate review site; the existing Alibaba production release is
unchanged. Review builds retain `noindex, nofollow`.

## Media

Original raster images and videos are preserved in `source-media/` (not deployed).
`public/assets/` contains WebP images and VP9/Opus WebM videos; SVG vectors and
the WebP favicon are retained. Journal images load lazily and decode asynchronously.

To regenerate with Pillow and FFmpeg installed:

```bash
FFMPEG=/path/to/ffmpeg python3 scripts/compress-media.py
```

Images are capped at 2400 px, quality 84; transparency and small marks are lossless.
Videos are capped at 1920 px and 30 fps, preserving their duration and any audio.
For legacy React builds only, use `VITE_CDN_BASE` and `VITE_ASSET_BASE`.
