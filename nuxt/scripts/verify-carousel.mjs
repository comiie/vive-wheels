import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Exercise the real composable with deterministic DOM/RAF adapters, including
// browsers that round scrollLeft. Nuxt normally supplies these auto-imports.
const source = readFileSync(new URL('../app/composables/useProductCarousel.ts', import.meta.url), 'utf8')
const code = ts.transpile(source.replace('export function', 'function'), { target: ts.ScriptTarget.ES2022 })
const mounted = [], cleanup = [], frames = new Map()
let id = 0, now = 0, left = 0
const viewport = {
  scrollWidth: 3000, clientWidth: 1000,
  get scrollLeft() { return left },
  set scrollLeft(value) { left = Math.round(Math.max(0, Math.min(2000, value))) },
}
const captures = new Set()
const target = {
  setPointerCapture: id => captures.add(id),
  hasPointerCapture: id => captures.has(id),
  releasePointerCapture: id => captures.delete(id),
  getBoundingClientRect: () => ({ left: 0, width: 1000 }),
  closest: () => null,
}
const event = (clientX, pointerId = 1) => ({ clientX, pointerId, button: 0, currentTarget: target, target })
const create = new Function('ref', 'onMounted', 'onBeforeUnmount', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'window', 'ResizeObserver', `${code}; return useProductCarousel`)
const useCarousel = create(
  value => ({ value }), callback => mounted.push(callback), callback => cleanup.push(callback),
  callback => { frames.set(++id, callback); return id }, frame => frames.delete(frame),
  { now: () => now }, { addEventListener() {}, removeEventListener() {} },
  class { observe() {} disconnect() {} },
)
const carousel = useCarousel({ value: viewport })
mounted.forEach(callback => callback())
function settle() {
  let count = 0
  while (frames.size && count++ < 600) {
    const pending = [...frames.values()]
    frames.clear()
    now += 16
    pending.forEach(callback => callback(now))
  }
  assert.equal(frames.size, 0, 'Motion must settle without an endless RAF loop')
}
// Fractional target cannot be represented exactly by an integer scrollLeft.
carousel.startProgressDrag(event(147 + 843 * 0.5633))
carousel.finishProgressDrag(event(147 + 843 * 0.5633))
assert.equal(carousel.progressDragging.value, false)
settle()
assert.equal(left, 1127)
assert.equal(carousel.progress.value, 1127 / 2000)
assert.equal(captures.size, 0)

// Dragging can stop anywhere, and a pause before release must not fling.
carousel.startDrag(event(500))
now += 20
carousel.moveDrag(event(400))
const stopped = left
now += 150
carousel.finishDrag(event(400))
settle()
assert.equal(left, stopped)
assert.equal(carousel.dragging.value, false)

// Cancellation cannot leave a grabbed state or running momentum behind.
carousel.startDrag(event(500))
carousel.cancelDrag(event(490))
settle()
assert.equal(carousel.dragging.value, false)
assert.equal(captures.size, 0)
for (const [key, expected] of [['Home', 0], ['ArrowRight', 40], ['End', 2000], ['ArrowLeft', 1960]]) {
  carousel.onKeydown({ key, preventDefault() {} })
  assert.equal(left, expected)
}
carousel.startProgressDrag(event(500))
cleanup.forEach(callback => callback())
assert.equal(frames.size, 0, 'Unmount cancels animation callbacks')
console.log('PASS: arbitrary drag stop, fractional progress settling, cancellation, keyboard and RAF cleanup')
