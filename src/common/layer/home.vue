<template lang="html">
  <component :options="this.$data" :is="getActiveName"></component>
</template>

<script>
import iframe from './page/iframe'
export default {
  name: 'home',
  date () {
    return {
      type: 0, // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
      shade: true, // 是否显示遮罩层
      area: 'auto', // 宽度和高度
      title: '', // 标题
      content: null // 数据内容
    }
  },
  methods: {

  },
  computed: {
    getActiveName () {
      let comps = [ '', '', iframe, '', '', '', '' ]
      return comps[this.$data.type]
    }
  }
}
</script>
<style>
@import "./layer.css";
</style>
