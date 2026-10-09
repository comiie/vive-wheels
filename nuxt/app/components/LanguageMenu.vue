<script setup lang="ts">
const language = useState('preview-language', () => 'EN')
const options = ['EN','FR','DE','ES'].map(value => ({ value, label: value }))
</script>
<template><DarkSelect v-model="language" class="language-menu" :options="options" label="Language" /></template>
<style>
.language-menu .dark-select-trigger::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;background:linear-gradient(white,white) left top/14px 1px no-repeat,linear-gradient(white,white) left top/1px 14px no-repeat,linear-gradient(white,white) right top/14px 1px no-repeat,linear-gradient(white,white) right top/1px 14px no-repeat,linear-gradient(white,white) left bottom/14px 1px no-repeat,linear-gradient(white,white) left bottom/1px 14px no-repeat,linear-gradient(white,white) right bottom/14px 1px no-repeat,linear-gradient(white,white) right bottom/1px 14px no-repeat;transition:opacity .25s,background-size .4s}.language-menu .dark-select-trigger:hover::after,.language-menu.is-open .dark-select-trigger::after{opacity:1;background-size:18px 1px,1px 18px,18px 1px,1px 18px,18px 1px,1px 18px,18px 1px,1px 18px}.language-menu .dark-select-trigger:hover{outline:0!important}
.language-menu{width:100%;height:100%;font:inherit}.language-menu .dark-select-trigger{justify-content:center;padding:0;border-top:0;border-bottom:0;border-color:#ffffff29}.language-menu .vive-arrow{display:none}.language-menu .dark-select-list{background:#101113;border-color:#ffffff29}.language-menu .dark-select-list li{display:grid;place-items:center;height:80px;padding:0}.language-menu .dark-select-list li.selected{display:none}.language-menu .dark-select-trigger:hover{outline:1px solid white;outline-offset:-1px}
</style>
