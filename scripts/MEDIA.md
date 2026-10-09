# Media optimization

Run `python3 scripts/optimize-public-media.py` with Pillow installed after
importing new raster assets, then `python3 scripts/verify-media.py`.

- Photos: WebP quality 84, maximum 2400 × 2400 bounding box, no upscaling.
- Transparent product photos: quality 88 with lossless alpha.
- Tiny logos/gradients: lossless; SVG vectors are kept as vectors.
- Already compact WebPs and the two existing WebM videos are not re-encoded.
- Original assets and a hash/size report are preserved under
  `source-media/public-originals/`, never shipped in `public/`.
- Reruns skip unchanged outputs to avoid accumulating lossy compression.
- Finish swatch downloads preserve JPEG originals outside `public/` and emit
  WebP directly. That importer needs Python + Pillow (`PYTHON` may override it).

The favicon is now `/favicon.webp`. For the next production release, publish
the optimized assets under a **new** media version prefix and use it for
`NUXT_PUBLIC_ASSET_BASE`; do not reuse the historical `media-20260914` prefix.
Include `favicon.webp` with the generated site. This change does not upload
assets or deploy the website.
