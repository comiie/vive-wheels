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

## Media

Original raster images and videos are preserved in `source-media/` (not deployed).
`public/assets/` contains WebP images and VP9/Opus WebM videos; SVG vectors and
the small PNG favicon are retained. Journal images load lazily and decode asynchronously.

To regenerate with Pillow and FFmpeg installed:

```bash
FFMPEG=/path/to/ffmpeg python3 scripts/compress-media.py
```

Images are capped at 2400 px, quality 84; transparency and small marks are lossless.
Videos are capped at 1920 px and 30 fps, preserving their duration and any audio.
For legacy React builds only, use `VITE_CDN_BASE` and `VITE_ASSET_BASE`.
