import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
import vm from 'node:vm'

const source = readFileSync(new URL('../app/utils/engineeringMotion.ts', import.meta.url), 'utf8')
const context = vm.createContext({ exports: {} })
vm.runInContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context)
const motion = context.exports.engineeringMotion
const timing = context.exports.storyTiming
for (const height of [860, 1080, 1440]) {
  assert.equal(motion(0, height, height).translate, 0)
  assert.equal(motion(-100, height, height).translate, 0)
  let previous = 0
  for (let offset = 1; offset <= height * 1.45; offset++) {
    const state = motion(offset, height, height)
    const visualTop = -offset + state.translate
    assert.ok(visualTop <= previous + .001, 'Screen must not reverse while scrolling down')
    assert.ok(previous - visualTop < 1.3, 'No doubled natural-scroll + transform speed')
    previous = visualTop
  }
  assert.equal(motion(height * 1.45, height, height).progress, 1)
  assert.ok(motion(1, height, height).progress < .000001, 'Soft start')
  const halfway = motion(height * .725, height, height)
  assert.ok(Math.abs(halfway.progress - .5) < .00001)
  assert.deepEqual(motion(height * .725, height, height), halfway, 'Reverse scroll has no stale temporal state')
  const schedule = timing(height, height, height)
  assert.ok(schedule.journalEntry - schedule.engineeringEnd >= height * .89, 'About has a full reading pause after Engineering exits')
  assert.equal(height + schedule.spacerHeight - schedule.journalEntry, height, 'Journal only reaches viewport bottom after pause')
  assert.equal(height + schedule.spacerHeight - schedule.journalTop, 0, 'Journal reaches top at the scheduled offset')
}
const shortScreen = timing(860, 860, 720)
assert.ok(shortScreen.journalEntry > 860 * 1.45, 'Minimum section height is included in timing')
const drawer = readFileSync(new URL('../app/components/FinishDrawer.vue', import.meta.url), 'utf8')
assert.match(drawer, /inset:0 0 0 auto/, 'Drawer is right anchored')
assert.match(drawer, /overflow:clip;transform:translateX\(100%\)/, 'Entire dialog starts offscreen, without a scrollable outer container')
assert.doesNotMatch(drawer, /clipPath|clip-path|@starting-style/, 'Contents move with the panel, not a stationary-content reveal')
assert.match(drawer, /repeat\(4,minmax/)
assert.match(drawer, /repeat\(5,minmax/)
const animations = []
let reducedMotion = false
let unmount
const animatedPanel = {
  style: { transform: 'translateX(100%)' },
  animate(frames, options) {
    let resolve, reject
    const finished = new Promise((yes, no) => { resolve = yes; reject = no })
    const animation = { frames, options, finished, resolve, cancel() { reject(new Error('cancelled')) } }
    animations.push(animation)
    return animation
  },
}
let focused = false
const mockDialog = { ...animatedPanel, open: false, showModal() { this.open = true }, close() { this.open = false; drawerContext.api.closed() } }
const drawerContext = vm.createContext({
  finishSamples: [], defineEmits: () => () => {}, useAsset: () => () => '',
  ref: value => ({ value }), inject: (_, fallback) => fallback, computed: fn => ({ get value() { return fn() } }),
  defineExpose: () => {}, onBeforeUnmount: fn => { unmount = fn },
  document: { body: { style: { overflow: 'auto' } }, activeElement: { focus() { focused = true } } },
  window: { matchMedia: () => ({ matches: reducedMotion }) },
  getComputedStyle: target => ({ transform: target.style.transform }),
})
const drawerScript = drawer.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1].replace(/^import .*$/m, '')
vm.runInContext(ts.transpileModule(drawerScript + '\nglobalThis.api = { open, close, closed, dialog };', { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, drawerContext)
drawerContext.api.dialog.value = mockDialog
drawerContext.api.open()
assert.equal(animations[0].frames[0].transform, 'translateX(100%)')
assert.equal(animations[0].frames[1].transform, 'translateX(0%)')
assert.equal(animations[0].options.duration, 480)
assert.equal(mockDialog.open, true)
// Closing during entrance must cancel it, then wait for the exit to finish.
drawerContext.api.close()
assert.equal(mockDialog.open, true)
animations[1].resolve()
await new Promise(resolve => setImmediate(resolve))
assert.equal(mockDialog.open, false)
assert.equal(focused, true)
assert.equal(drawerContext.document.body.style.overflow, 'auto')
drawerContext.api.open()
assert.equal(animations[2].frames[0].transform, 'translateX(100%)', 'Repeat openings start offscreen')
animations[2].resolve()
await new Promise(resolve => setImmediate(resolve))
reducedMotion = true
drawerContext.api.close()
assert.equal(animations[3].options.duration, 0)
unmount()
assert.equal(drawerContext.document.body.style.overflow, 'auto')
const gallery = readFileSync(new URL('../app/components/ProductGallery.vue', import.meta.url), 'utf8')
assert.match(gallery, /product-editorial-gallery::before\{[^}]*inset:0 0 auto[^}]*z-index:1/)
assert.match(gallery, /isolation:isolate;overflow:clip/)
assert.doesNotMatch(gallery, /product-gallery-heading\{[^}]*background:linear-gradient/, 'Mask cannot fade with title')
console.log('PASS: engineering soft lift/reverse/speed, About reading pause, right-hand drawer/easing/4–5 columns, independent gallery shade')
