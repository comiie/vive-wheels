import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

let render
let scrollTarget
const context = vm.createContext({
  exports: {}, ref: value => ({ value }),
  useScrollScene: (_, fn) => { render = fn },
  window: { scrollY: 2500, scrollTo: options => { scrollTarget = options.top } },
})
const source = readFileSync(new URL('../app/composables/usePinnedSteps.ts', import.meta.url), 'utf8')
vm.runInContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context)
for (const count of [3, 5]) {
  let top = 1000
  const scene = { value: { style: {}, getBoundingClientRect: () => ({ top }) } }
  const state = context.exports.usePinnedSteps(scene, count, .75)
  render(1000, true)
  assert.equal(scene.value.style.height, `${1000 + count * 750}px`)
  assert.equal(state.active.value, 0)
  top = -1125
  render(1000, true)
  assert.equal(state.active.value, 1)
  assert.equal(state.progress.value, .5)
  top = -count * 750 - 100
  render(1000, true)
  assert.equal(state.active.value, count - 1)
  assert.equal(state.progress.value, 1)
  top = -375
  render(1000, true)
  assert.equal(state.active.value, 0, 'scrolling back selects the earlier item')
  state.select(count - 1)
  assert.equal(scrollTarget, 2500 - 375 + (count - 1) * 750 + 1)
  render(1000, false)
  assert.equal(scene.value.style.height, 'auto')
  assert.equal(state.pinned.value, false)
  state.select(1)
  assert.equal(state.active.value, 1, 'mobile and reduced-motion retain manual controls')
}
const principles = readFileSync(new URL('../app/components/AboutPrinciples.vue', import.meta.url), 'utf8')
const owner = readFileSync(new URL('../app/components/AboutOwnerExperience.vue', import.meta.url), 'utf8')
assert.match(principles, /SmoothCollapse :open="active === i"/)
assert.match(owner, /scaleX\(/)
assert.doesNotMatch(owner, /setInterval|requestAnimationFrame/, 'owner progress follows scroll, not a timer')
assert.match(owner, /about-owner\.about-owner-scroll\{height:auto\}/, 'scroll scene must participate in page flow')
const css = readFileSync(new URL('../app/assets/inner-pages.css', import.meta.url), 'utf8')
assert.match(css, /\.inner-about-intro\s*\{\s*height:100svh;/, 'About hero fits one viewport independently of width')
assert.match(css, /padding-top:41\.76svh/, 'hero copy position follows viewport height')
console.log('PASS about scroll: three/five-stage sequencing, progress, reverse scrolling, manual seeking, mobile/reduced motion and expandable copy')
