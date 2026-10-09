import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Exercise the actual setup code with measured DOM dimensions (no browser globals needed).
function setup(component, expose) {
  const file = new URL(`../app/components/${component}.vue`, import.meta.url)
  const script = readFileSync(file, 'utf8').match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1]
  let render
  const context = vm.createContext({
    ref: value => ({ value }), useAsset: () => path => path,
    onMounted: () => {}, onBeforeUnmount: () => {},
    useScrollScene: (_root, callback) => { render = callback },
  })
  vm.runInContext(ts.transpileModule(script + `\nglobalThis.exposed = { ${expose} }`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context)
  return { ...context.exposed, render }
}

const story = setup('PerformanceStory', 'viewport, overflowing, thumbSize, thumbTop, measure, seek')
const area = { scrollHeight: 120, clientHeight: 240, scrollTop: 0 }
story.viewport.value = area
story.measure()
assert.equal(story.overflowing.value, false, 'short copy has no progress rail')
Object.assign(area, { scrollHeight: 960, scrollTop: 360 })
story.measure()
assert.equal(story.overflowing.value, true)
assert.equal(story.thumbSize.value, 25)
assert.equal(story.thumbTop.value, 37.5)
area.scrollTop = 720
story.measure()
assert.equal(story.thumbTop.value + story.thumbSize.value, 100, 'thumb reaches rail bottom')
story.seek({ type: 'pointerdown', pointerId: 1, clientY: 150, currentTarget: { setPointerCapture() {}, getBoundingClientRect: () => ({ top: 100, height: 200 }) } })
assert.equal(area.scrollTop, 180, 'rail supports pointer seeking')
Object.assign(area, { clientHeight: 1000, scrollTop: 0 })
story.measure()
assert.equal(story.overflowing.value, false, 'resizing to fit hides the rail again')

const craft = setup('DetailCraft', 'scene')
const values = []
let tops = [950, 710, 100]
craft.scene.value = { querySelectorAll: () => tops.map((top, i) => ({ getBoundingClientRect: () => ({ top }), style: { setProperty: (_key, value) => { values[i] = Number(value) } } })) }
craft.render(1000, true)
assert.deepEqual(values, [0, .5, 1], 'cards unfold continuously as they enter')
tops = [1100, 1100, 1100]
craft.render(1000, false)
assert.deepEqual(values, [1, 1, 1], 'mobile/reduced-motion keeps every card visible')

const gallery = setup('ProductGallery', 'scene')
const columns = Array.from({ length: 4 }, () => ({ style: {} }))
let top = 0
gallery.scene.value = { getBoundingClientRect: () => ({ top, height: 1400 }), querySelectorAll: () => columns }
gallery.render(1000, true)
const first = columns.map(column => column.style.transform)
assert.equal(new Set(first).size, 4, 'four independent column speeds')
top = -400
gallery.render(1000, true)
assert.ok(columns.every((column, i) => column.style.transform !== first[i]), 'scrolling updates all columns')
gallery.render(1000, false)
assert.ok(columns.every(column => column.style.transform === ''), 'reduced motion clears transforms')
console.log('PASS interaction behavior: short/long copy, resize, rail seek, scroll unfolding and gallery speeds')
