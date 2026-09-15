import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../.output/public/', import.meta.url))
const html = readFileSync(resolve(root, 'index.html'), 'utf8')
const productionRelease = process.env.VIVE_PRODUCTION === '1'
assert.match(html, /data-ssr="true"/, 'The hero must be prerendered, not client-only')
assert.match(html, /ENGINEERED<\/i> <i[^>]*>FOR/, 'Keep the approved title word spacing')
assert.match(html, /THE<\/i> <i[^>]*>DRIVEN/, 'Keep the second title line spacing')
assert.match(html, productionRelease ? /content="index, follow"/ : /noindex, nofollow/, 'Use the correct indexing policy')
assert.match(html, /scrollRestoration/, 'Refresh-to-top bootstrap must be present')
if (productionRelease) {
  assert.doesNotMatch(html, /Nuxt Preview/, 'Remove preview branding for production')
  assert.match(html, /rel="canonical" href="https:\/\/vive.onew.design\/"/, 'Use the production canonical URL')
} else assert.match(html, /Nuxt Preview/, 'Clearly distinguish the preview from production')
assert.doesNotMatch(html, /migration-checkpoint|待迁移/, 'Remove all staged placeholders')
for (const id of ['top', 'products', 'engineering', 'about', 'journal', 'footer']) {
  assert.match(html, new RegExp(`id="${id}"`), `Missing section: ${id}`)
}
assert.equal((html.match(/class="product-card"/g) ?? []).length, 8, 'Keep eight draggable product cards')
assert.equal((html.match(/class="journal-card"/g) ?? []).length, 4, 'Keep four journal cards')
assert.equal((html.match(/role="tab"/g) ?? []).length, 7, 'Keep seven engineering anchors')
assert.equal((html.match(/data-count-target=/g) ?? []).length, 4, 'Keep four animated statistics')
assert.match(html, /--engineering-mask:/, 'Render SVG masks before hydration')
assert.match(html, /--journal-mask:/, 'Render journal mask before hydration')
assert.match(html, /is-preview/, 'The engineering stack must have a persistent preview layer')
assert.match(html, /who-we-are-bg.webm/, 'Retain the about background video')
const files = new Set([...html.matchAll(/(?:src|href|poster)="(\/[^"#?]+)"/g)].map((match) => match[1]))
for (const file of files) assert.ok(existsSync(resolve(root, `.${file}`)), `Missing static asset: ${file}`)
assert.match(html, /\.webm/, 'Use the compressed WebM video')
assert.match(html, /\.webp/, 'Use the compressed WebP images')
console.log(`PASS: all six sections, product/journal counts, engineering stack, statistics, SSR masks, word spacing and ${files.size} static asset references`)
