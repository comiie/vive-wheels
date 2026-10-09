import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
const run = promisify(execFile)
const items = JSON.parse(await readFile(new URL('./finish-reference-assets.json', import.meta.url), 'utf8'))
const directory = new URL('../../public/assets/finish-reference/', import.meta.url)
const originals = new URL('../../source-media/finish-reference/', import.meta.url)
await mkdir(directory, { recursive: true })
await mkdir(originals, { recursive: true })
const queue = items.flatMap(item => item.images.map((url, index) => ({ url, name: `${item.id}-${index}.jpg` })))
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const item = queue.shift()
    const response = await fetch(item.url)
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Image download failed: ${item.url}`)
    const original = new URL(item.name, originals)
    await writeFile(original, Buffer.from(await response.arrayBuffer()))
    // Preserve downloaded JPEGs outside public; serve only compressed WebPs.
    await run(process.env.PYTHON || 'python3', ['-c', `
from PIL import Image, ImageOps
from pathlib import Path
import sys
with Image.open(sys.argv[1]) as original:
    image = ImageOps.exif_transpose(original).convert('RGB')
    image.thumbnail((600, 600), Image.Resampling.LANCZOS)
    destination = Path(sys.argv[2])
    temporary = destination.with_suffix('.webp.tmp')
    image.save(temporary, 'WEBP', quality=84, method=6)
    temporary.replace(destination)
`, fileURLToPath(original), fileURLToPath(new URL(item.name.replace(/\.jpg$/, '.webp'), directory))])
  }
}))
console.log(`Downloaded and optimized ${items.length * 2} WebP swatches (requires Python + Pillow)`)
