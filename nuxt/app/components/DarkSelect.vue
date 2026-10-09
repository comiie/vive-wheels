<script setup lang="ts">
const props = defineProps<{ modelValue: string; options: { value: string; label: string }[]; label: string; placeholder?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const root = ref<HTMLElement | null>(null)
const opened = ref(false)
const active = ref(0)
let search = ''
let lastKeyTime = 0
const id = useId()
const choices = computed(() => props.options.filter(option => option.value !== ''))
const selected = computed(() => props.options.find(o => o.value === props.modelValue)?.label ?? props.placeholder ?? props.label)
const close = () => { opened.value = false }
const choose = (value: string) => { emit('update:modelValue', value); close(); root.value?.querySelector('button')?.focus() }
const toggle = () => { opened.value = !opened.value; active.value = Math.max(0, choices.value.findIndex(o => o.value === props.modelValue)); root.value?.querySelector('button')?.focus() }
const keydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' || event.key === 'Tab') { close(); return }
  if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault()
    if (!opened.value) toggle()
    const now = Date.now()
    search = now - lastKeyTime > 700 ? event.key : search + event.key
    lastKeyTime = now
    const index = choices.value.findIndex(option => option.label.toLowerCase().startsWith(search.toLowerCase()))
    if (index >= 0) active.value = index
    return
  }
  if (!['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(event.key)) return
  event.preventDefault()
  if (!opened.value) { toggle(); return }
  if (event.key === 'Enter' || event.key === ' ') { const option = choices.value[active.value]; if (option) choose(option.value); return }
  if (!choices.value.length) return
  active.value = event.key === 'Home' ? 0 : event.key === 'End' ? choices.value.length - 1 : (active.value + (event.key === 'ArrowDown' ? 1 : choices.value.length - 1)) % choices.value.length
}
watch([active, opened], async () => {
  if (!opened.value) return
  await nextTick()
  const list = root.value?.querySelector<HTMLElement>('.dark-select-list')
  const option = list?.children[active.value] as HTMLElement | undefined
  if (!list || !option) return
  if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop
  else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight
})
const outside = (event: PointerEvent) => { if (!root.value?.contains(event.target as Node)) close() }
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside))
</script>
<template>
  <div ref="root" class="dark-select" :class="{ 'is-open': opened }" @focusout="!root?.contains($event.relatedTarget as Node) && close()">
    <button type="button" class="dark-select-trigger" :aria-label="label" aria-haspopup="listbox" :aria-expanded="opened" :aria-controls="id" :aria-activedescendant="opened ? `${id}-${active}` : undefined" @click="toggle" @keydown="keydown"><span>{{ selected }}</span><ArrowIcon :direction="opened ? 'up' : 'down'" /></button>
    <Transition name="select-menu"><div v-show="opened" class="dark-select-panel" :inert="!opened" :aria-hidden="!opened"><ul :id="id" role="listbox" :aria-label="label" class="dark-select-list" data-lenis-prevent><li v-for="(option, i) in choices" :id="`${id}-${i}`" :key="option.value" role="option" :aria-selected="modelValue === option.value" :class="{ active: active === i, selected: modelValue === option.value }" @pointerenter="active = i" @pointerdown.prevent @click="choose(option.value)">{{ option.label }}</li></ul></div></Transition>
  </div>
</template>
<style>
.select-menu-enter-active,.select-menu-leave-active{transition:opacity .2s ease,transform .24s cubic-bezier(.22,.68,.1,1)}
.select-menu-enter-from,.select-menu-leave-to{opacity:0;transform:translateY(-6px)}
@media(prefers-reduced-motion:reduce){.select-menu-enter-active,.select-menu-leave-active{transition:none}}
.dark-select.is-open{z-index:50}.dark-select-list{max-height:50vh;overflow-y:auto;overscroll-behavior:contain}
.dark-select{position:relative;z-index:6;color:#fff;font:inherit}.dark-select-trigger{width:100%;height:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:10px 24px;background:transparent;border:1px solid #ccc;color:inherit;font:inherit;text-align:left}.dark-select-panel{position:absolute;top:100%;left:0;right:0;z-index:60}.dark-select-list{position:relative;margin:0;padding:0;list-style:none;background:#141616;border:1px solid #888;border-top:0;z-index:60;box-shadow:0 12px 24px #0005}.dark-select-list li{padding:16px 24px;border-bottom:1px solid #ffffff25;cursor:pointer;transition:color .25s,background .25s}.dark-select-list li:last-child{border-bottom:0}.dark-select-list li.active{background:#fff;color:#111}.dark-select-list li.selected{box-shadow:inset 3px 0 white}
</style>
