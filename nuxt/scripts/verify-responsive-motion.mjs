import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

let mount, refresh, cleanup, offset, top = 0, enabled = true
const media = { get matches() { return enabled }, addEventListener:(_,fn)=>{refresh=fn}, removeEventListener(){} }
const context = vm.createContext({
 exports:{}, onMounted:fn=>{mount=fn}, onBeforeUnmount:fn=>{cleanup=fn},
 window:{innerHeight:1080,matchMedia:()=>media,addEventListener(){},removeEventListener(){}},
 requestAnimationFrame:()=>1,cancelAnimationFrame(){},
 IntersectionObserver:class{observe(){}disconnect(){}},ResizeObserver:class{observe(){}disconnect(){}},
})
const source=readFileSync(new URL('../app/composables/useScrollScene.ts',import.meta.url),'utf8')
vm.runInContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context)
const root={value:{style:{setProperty:(_,value)=>{offset=Number.parseFloat(value)}},getBoundingClientRect:()=>({top,bottom:top+2400})}}
context.exports.useScrollScene(root,()=>{})
mount()
const position=x=>{top=x;refresh();return Math.min(Math.max(x,0),x+2400-1080)+offset}
for(const boundary of [0,-1320]){
 const before=position(boundary-1),at=position(boundary),after=position(boundary+1)
 assert.ok(Math.abs(after-at)<.52&&Math.abs(at-before)<.52,'rounded pin boundary has no position jump')
 assert.ok(Math.abs((after-at)-(at-before))<.02,'entry/exit velocity is continuous')
}
position(100);assert.equal(offset,0)
position(-100);assert.equal(offset,0)
position(-1500);assert.equal(offset,0)
enabled=false;position(0);assert.equal(offset,0,'reduced motion and mobile have no pin offset')
cleanup()
const owner=readFileSync(new URL('../app/components/AboutOwnerExperience.vue',import.meta.url),'utf8')
const backgrounds=[...owner.matchAll(/'(inner-pages\/[a-f0-9]+|technology\/[a-f0-9]+)'/g)].map(m=>m[1])
assert.equal(new Set(backgrounds).size,5)
for(const image of backgrounds)assert.ok(existsSync(new URL(`../../public/assets/${image}.webp`,import.meta.url)))
assert.match(owner,/is-active': active === i/)
assert.match(readFileSync(new URL('../app/assets/editorial.css',import.meta.url),'utf8'),/border-block:1px solid #ffffff33/)
console.log('PASS responsive motion: five real backgrounds, continuous sticky entry/exit, reduced-motion fallback, 20% contact dividers')

// These guard the cascade/layout contract only. They do not replace browser QA.
const config=readFileSync(new URL('../nuxt.config.ts',import.meta.url),'utf8')
const responsive=readFileSync(new URL('../app/assets/responsive.css',import.meta.url),'utf8')
assert.ok(config.indexOf('~/assets/responsive.css')>config.indexOf('~/assets/editorial.css'),'responsive rules load after shared page styles')
assert.match(readFileSync(new URL('../app/pages/index.vue',import.meta.url),'utf8'),/<main class="home-page">/)
assert.match(responsive,/\.home-page \.hero\.screen\{min-height:600px;height:100svh\}/)
assert.match(responsive,/\.home-page \.engineering-panel\{height:auto;min-height:0;display:grid/)
assert.match(responsive,/\.home-page \.journal-grid\{grid-template-columns:1fr/)
assert.match(responsive,/\.editorial-card-title h3\{display:block;-webkit-line-clamp:unset/)
assert.match(responsive,/html,body,#__nuxt\{min-height:100%;background:#0e0f0f\}/)
console.log('PASS responsive layout contracts: deterministic cascade, viewport hero, natural-height cards, readable complete titles and dark page background')
