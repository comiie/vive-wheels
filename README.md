# VIVE Wheels

Interactive VIVE Wheels website built with React and Vite.

## Development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

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
For Alibaba deployment set `VITE_CDN_BASE` and `VITE_ASSET_BASE` at build time.
