import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../.output/public/', import.meta.url))
const html = readFileSync(resolve(root, 'index.html'), 'utf8')
assert.match(html, /data-ssr="true"/, 'The hero must be prerendered, not client-only')
assert.match(html, /ENGINEERED<\/i> <i[^>]*>FOR/, 'Keep the approved title word spacing')
assert.match(html, /THE<\/i> <i[^>]*>DRIVEN/, 'Keep the second title line spacing')
assert.match(html, /noindex, nofollow/, 'Review builds must not be indexed')
assert.match(html, /scrollRestoration/, 'Refresh-to-top bootstrap must be present')
assert.match(html, /第一屏待验收/, 'Clearly distinguish the staged preview from production')
const files = new Set([...html.matchAll(/(?:src|href|poster)="(\/[^"#?]+)"/g)].map((match) => match[1]))
for (const file of files) assert.ok(existsSync(resolve(root, `.${file}`)), `Missing static asset: ${file}`)
assert.ok([...files].some((file) => file.endsWith('.webm')), 'Use the compressed WebM video')
assert.ok([...files].some((file) => file.endsWith('.webp')), 'Use the compressed WebP images')
console.log(`PASS: prerendered hero, word spacing, preview isolation and ${files.size} static asset references`)
