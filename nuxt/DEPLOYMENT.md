# Production release — 2026-09-15

The owner approved the complete Nuxt migration before this cutover.

- Website: https://vive.onew.design/
- Runtime: generated static Nuxt 4 / Vue 3 / TypeScript (no Node server needed).
- Host: existing Alibaba Cloud Hangzhou ECS, existing `ng-https` container.
- Host document root: `/mnt/httpsNg/vive`.
- Container document root: `/usr/share/nginx/html/vive`.
- New OSS prefix: `oss://vive-onew-design-assets-hz/nuxt-20260915/`.
- New CDN prefix: `https://cdn-vive.onew.design/nuxt-20260915/`.
- Existing compressed media: `https://cdn-vive.onew.design/media-20260914/assets/`.
- Existing favicon: `https://cdn-vive.onew.design/media-20260914/favicon.png`.
- DNS, CDN acceleration settings, bucket permissions and TLS configuration were
  not changed as part of this release.

## Build

From this directory, on Node >= 22.12:

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:carousel
VIVE_PRODUCTION=1 \
NUXT_APP_CDN_URL=https://cdn-vive.onew.design/nuxt-20260915/ \
NUXT_PUBLIC_ASSET_BASE=https://cdn-vive.onew.design/media-20260914/assets/ \
pnpm generate
VIVE_PRODUCTION=1 pnpm test:static
```

The production flag removes preview branding/noindex and sets the canonical
URL. Without it the build remains an unindexed local review build.

Upload `_nuxt/`, `_payload.json`, `index.html`, `200.html` and `404.html` under
the new OSS prefix. Do not overwrite a previously published version prefix.
The existing media is reused rather than duplicated. All 19 uploaded files
were fetched through CDN and matched the local SHA-256 hashes; CORS returned `*`.

## Cutover and rollback

Before replacing the homepage, the old HTML was copied outside the document
root to `/opt/vive/index-before-nuxt-20260915.html`. Its original CDN resources
remain intact. The new entry was staged and then atomically renamed to
`/mnt/httpsNg/vive/index.html`; no nginx restart was necessary.

New HTML SHA-256:
`1085c5ea20419f49276d1e9e4249632fd5c88d5c3e5cd80faf267e834787f80d`

Old HTML SHA-256:
`712b6f70bf8f06eb29198a8355cd038f88e9ffa695dd2b353c7778a1cbaa6c98`

To roll back **only when explicitly requested**, on that same server:

```sh
cp /opt/vive/index-before-nuxt-20260915.html /mnt/httpsNg/vive/index.rollback.html
chmod 644 /mnt/httpsNg/vive/index.rollback.html
mv -f /mnt/httpsNg/vive/index.rollback.html /mnt/httpsNg/vive/index.html
```

Post-cutover checks: production HTTPS homepage exactly matches the generated
HTML; Safari renders the live Nuxt page and opens/plays the WebM video modal.
