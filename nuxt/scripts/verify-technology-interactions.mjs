import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8')
const dataContext = vm.createContext({ exports: {} })
vm.runInContext(ts.transpileModule(read('../app/data/technology.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, dataContext)
const data = dataContext.exports
function setup(name, expose) {
  let render, mounted, intersection, preference
  const callbacks = new Map()
  let id = 0
  const context = vm.createContext({
    ...data, ref: value => ({ value }), useAsset: () => path => path,
    onMounted: fn => { mounted = fn }, onBeforeUnmount: () => {}, watch: () => {},
    useScrollScene: (_, fn) => { render = fn },
    requestAnimationFrame: fn => { callbacks.set(++id, fn); return id },
    cancelAnimationFrame: id => callbacks.delete(id),
    IntersectionObserver: class { constructor(fn) { intersection = fn } observe() {} },
    document: { hidden: false, addEventListener() {}, getElementById: () => ({ focus() {} }) },
    window: { innerWidth: 1000, scrollY: 0, scrollTo() {}, matchMedia: () => ({ matches: false, addEventListener: (_, fn) => { preference = fn } }) },
  })
  const script = read(`../app/components/${name}.vue`).match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1].replace(/^import .*$/gm, '')
  vm.runInContext(ts.transpileModule(script + `\nglobalThis.api = { ${expose} }`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context)
  return { ...context.api, render, context, mount: () => mounted(), intersect: ratio => intersection([{ intersectionRatio: ratio }]), preference: () => preference(), advance: time => { const batch = [...callbacks.values()]; callbacks.clear(); batch.forEach(fn => fn(time)) }, callbacks }
}

const flow = setup('TechnologyWorkflow', 'scene, viewport, track, progress, pinned, railVisible')
let top = 0
flow.scene.value = { style: {}, getBoundingClientRect: () => ({ top }) }
flow.viewport.value = { clientWidth: 1000, scrollLeft: 0 }
flow.track.value = { scrollWidth: 4000, style: {} }
flow.render(800, true)
assert.equal(flow.scene.value.style.height, '3800px')
top = -1500
flow.render(800, true)
assert.equal(flow.progress.value, .5)
assert.equal(flow.railVisible.value, true)
assert.equal(flow.track.value.style.transform, 'translate3d(-1500px,0,0)')
top = -5000
flow.render(800, true)
assert.equal(flow.progress.value, 1)
assert.equal(flow.railVisible.value, false, 'completed rail disappears before the section scrolls away')
top = -2000
flow.render(800, true)
assert.equal(flow.railVisible.value, true, 'reverse scrolling restores the progress rail')
flow.render(800, false)
assert.equal(flow.scene.value.style.height, 'auto')
assert.equal(flow.track.value.style.transform, '')

const carousel = setup('TechnologyValidation', 'screen, validation, progress, paused, reduced, select, sync, entered')
carousel.screen.value = {}
carousel.mount()
carousel.intersect(1)
assert.equal(carousel.entered.value, true)
for (let t = 1; t <= 5501; t += 100) carousel.advance(t)
assert.equal(carousel.validation.value, 1, 'DEV advances to PEV')
carousel.paused.value = true
carousel.sync()
assert.equal(carousel.callbacks.size, 0, 'pause cancels animation frame')
carousel.select(0)
assert.equal(carousel.progress.value, 0)
carousel.paused.value = false
carousel.reduced.value = true
carousel.sync()
assert.equal(carousel.callbacks.size, 0, 'reduced motion disables autoplay')
carousel.reduced.value = false
carousel.intersect(0)
assert.equal(carousel.callbacks.size, 0, 'offscreen carousel is idle')
assert.equal(data.validationSlides[1].stages.length, 8)
assert.equal(data.validationSlides[1].links.length, 4)
assert.equal(data.validationSlides[1].image, '198cc')

const materials = setup('TechnologyMaterials', 'material, select, keydown')
materials.select(3)
assert.equal(materials.material.value, 3)
materials.keydown({ key: 'End', preventDefault() {} }, 3)
assert.equal(materials.material.value, 5)
materials.keydown({ key: 'ArrowDown', preventDefault() {} }, 5)
assert.equal(materials.material.value, 0)
const materialMarkup = read('../app/components/TechnologyMaterials.vue')
assert.doesNotMatch(materialMarkup, /<i\s/, 'material tabs do not add plus or close icons')
assert.match(materialMarkup, /border-top:1px solid #ffffff66/)
assert.match(materialMarkup, /height:175svh/)
assert.match(read('../app/components/TechnologyWorkflow.vue'), /<div data-reveal="lift"><h3>/)

const sources = JSON.parse(read('./finish-reference-assets.json'))
assert.equal(sources.length, 44)
for (const sample of sources) for (let angle = 0; angle < 2; angle++) assert.ok(statSync(new URL(`../../public/assets/finish-reference/${sample.id}-${angle}.webp`, import.meta.url)).size > 1000)
assert.equal((read('../app/components/RelatedAccessories.vue').match(/hoverImage:\s*'7de27'/g) || []).length, 5)
console.log('PASS technology interactions: horizontal boundaries, carousel autoplay/pause/reduced motion, material keyboard switching, PEV content, 88 finish images and shared accessory hover')
