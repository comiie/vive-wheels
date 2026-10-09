import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../.output/public/', import.meta.url))
for (const route of ['about', 'products']) {
  const html = readFileSync(resolve(root, route, 'index.html'), 'utf8')
  assert.match(html, /data-ssr="true"/, route + ' must prerender')
  assert.match(html, /noindex, nofollow/, 'Preview must not be indexed')
  assert.doesNotMatch(html, /www\.figma\.com\/api\/mcp\/asset/, 'No temporary asset URLs')
  const assets = new Set([...html.matchAll(/\/assets\/[\w./-]+\.(?:webp|svg)/g)].map(m => m[0]))
  for (const asset of assets) assert.ok(statSync(resolve(root, '.' + asset)).size > 0, asset)
  assert.match(html, /inner-header/)
  if (route === 'about') assert.doesNotMatch(html, /class="inner-upgrade"/)
  else assert.match(html, /class="inner-upgrade"/)
  assert.match(html, /data-reveal="words"/, 'Headings use the shared word reveal')
  assert.match(html, /data-reveal="lift"/, 'Content uses the shared entrance')
  assert.match(html, /href="\/journal"/, 'Journal opens the dedicated listing')
  assert.match(html, /href="\/contact"/, 'Contact CTA opens the contact page')
  assert.match(html, /class="footer footer-updated"/)
  if (route === 'products') {
    assert.equal((html.match(/class="catalog-card"/g) || []).length, 16)
    assert.equal((html.match(/class="catalog-introduction"/g) || []).length, 2)
    assert.match(html, /catalog-filters/)
    assert.match(html, /VXE-73/)
    assert.match(html, /aria-label="Sort wheels"/)
    assert.doesNotMatch(html, /Size and price are preferences|catalog-filter-notice/)
    assert.match(html, /catalog-filter-options/)
  } else {
    for (const title of ['WHO WE ARE', 'SAFETY', 'ENGINEERING WITH PURPOSE', 'OWNER EXPERIENCE', 'WARRANTY &amp; OWNER SUPPORT', 'EVERY VIVE WHEEL HUB']) assert.ok(html.includes(title), title)
    assert.equal((html.match(/class="support-icon"/g) || []).length, 4)
    assert.match(html, /b2901.webp/, 'Manufacturing conveyor image')
    assert.match(html, /role="slider"/, 'Gallery progress is interactive')
    assert.match(html, /role="tablist"/, 'Owner experience supports keyboard tabs')
  }
  console.log('PASS ' + route + ': SSR, shared components, content, ' + assets.size + ' nonempty local assets')
}
