import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
const root = fileURLToPath(new URL('../.output/public/', import.meta.url))
for (const route of ['faqs', 'technology']) {
  const html = readFileSync(resolve(root, route, 'index.html'), 'utf8')
  assert.match(html, /data-ssr="true"/)
  assert.match(html, /href="\/faqs"/)
  assert.match(html, /href="\/technology"/)
  assert.doesNotMatch(html, /Toggle product navigation/)
  assert.match(html, /aria-label="Footer navigation"[^>]*>[\s\S]*?href="\/technology"/)
  assert.doesNotMatch(html, /class="inner-upgrade"/)
  assert.doesNotMatch(html, /www\.figma\.com\/api\/mcp\/asset/)
  for (const asset of new Set([...html.matchAll(/\/assets\/[\w./-]+\.(?:webp|svg)/g)].map(m => m[0]))) assert.ok(statSync(resolve(root, '.' + asset)).size, asset)
  if (route === 'faqs') {
    assert.equal((html.match(/class="faq-page-group"/g) || []).length, 3)
    assert.equal((html.match(/id="[a-z-]+-question-\d"/g) || []).length, 15)
    assert.match(html, /Customization &amp; Expansion/)
    assert.match(html, /aria-expanded="false"/)
  } else {
    assert.match(html, /hero-hd.webp/)
    assert.equal((html.match(/<article[^>]*\btechnology-step\b/g) || []).length, 8)
    assert.equal((html.match(/id="material-tab-\d"/g) || []).length, 6)
    assert.equal((html.match(/id="validation-tab-\d"/g) || []).length, 2)
    assert.match(html, /role="tabpanel"/)
    assert.match(html, /series=OFF-ROAD/)
    assert.match(html, /YOU’LL NEVER NEED THE WARRANTY/)
  }
  console.log(`PASS ${route}: prerender, navigation, assets and interactive markup`)
}

for (const route of ['journal', 'journal/brand-1', 'journal/engineering-23', 'journal/case-studies-16', 'contact']) {
  const html = readFileSync(resolve(root, route, 'index.html'), 'utf8')
  assert.match(html, /data-ssr="true"/)
  assert.match(html, /href="\/journal"/)
  assert.match(html, /href="\/contact"/)
  assert.doesNotMatch(html, /www\.figma\.com\/api\/mcp\/asset/)
  for (const asset of new Set([...html.matchAll(/\/assets\/[\w./-]+\.(?:webp|svg)/g)].map(m => m[0]))) assert.ok(statSync(resolve(root, '.' + asset)).size, asset)
  if (route === 'journal') {
    assert.doesNotMatch(html, /class="inner-upgrade"/)
    assert.equal((html.match(/class="editorial-card"/g) || []).length, 8)
    assert.match(html, /Search journal/)
    assert.match(html, /Journal pages/)
    assert.match(html.replace(/<[^>]*>/g, ''), /ENGINEERING（23）/)
  } else if (route.startsWith('journal/')) {
    assert.match(html, /BACK TO JOURNAL/)
    assert.match(html, /YOU MIGHT ALSO LIKE/)
    assert.match(html, /1216f.webp/)
    assert.match(html, /Article navigation/)
    assert.doesNotMatch(html, /class="inner-upgrade"/)
    assert.doesNotMatch(html, /outline-button wipe-control is-filled/)
  } else {
    assert.match(html, /WHERE TO FIND US/)
    assert.match(html, /type="email"[^>]*required/)
    assert.match(html, /type="checkbox"[^>]*required/)
    assert.match(html, /<iframe[^>]*title="Google Maps — Irvine, California"[^>]*output=embed/)
    assert.match(html, /class="contact-social-x"/)
    assert.match(html, /aria-label="Country \/ Region" aria-haspopup="listbox"/)
    assert.match(html, /name="country-name"/)
    assert.match(html, /role="option"[^>]*>United States</)
    const countryField = html.match(/class="contact-country"[\s\S]*?name="country-name"/)?.[0] || ''
    assert.equal((countryField.match(/role="option"/g) || []).length, 249)
    assert.doesNotMatch(countryField, /Please select/)
    assert.match(countryField, /class="dark-select-trigger"[^>]*><span><\/span>/)
    assert.match(html, /class="contact-submit[^>]*>[\s\S]*?vive-arrow-right/)
    assert.match(html, /does not send or store form entries/)
    assert.doesNotMatch(html, /Message sent successfully/)
  }
  console.log(`PASS ${route}: prerender, local assets, navigation and controls`)
}
