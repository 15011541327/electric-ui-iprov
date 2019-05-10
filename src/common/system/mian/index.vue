<template>
  <el-container>
    <el-header :height="HeaderHeight">
      <electric-header ref="header" v-bind:HeaderHeight="HeaderHeight" v-bind:AsideWidth="AsideWidth"></electric-header>
    </el-header>
    <el-container>
      <el-aside :width="AsideWidth">
        <electric-aside ref="aside" v-bind:leftNavHeight="leftNavHeight"></electric-aside>
      </el-aside>
      <el-container>
        <el-main v-bind:style="{height: height}">
          <electric-main ref="main"></electric-main>
        </el-main>
        <el-footer :height="FooterHeight">
          <electric-footer></electric-footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import electricHeader from './monster-header.vue'
import electricAside from './monster-aside.vue'
import electricMain from './monster-main.vue'
import electricFooter from './monster-footer.vue'
let _this = this
export default {
  name: 'App',
  components: {electricHeader, electricAside, electricMain, electricFooter},
  data () {
    return {
      AsideWidth: '230px',
      HeaderHeight: '46px',
      FooterHeight: '40px',
      leftNavHeight: '200px',
      height: '200px'
    }
  },
  created () {
    _this = this
    _this.initHeight()
    // 页面高度变化从新计算高度
    window.addEventListener('resize', () => {
      _this.initHeight()
    })
  },
  mounted () {

  },
  methods: {
    // 计算高度的方法
    initHeight: function () {
      this.height = window.innerHeight - parseInt(this.HeaderHeight) - parseInt(this.FooterHeight) + 'px'
      this.leftNavHeight = window.innerHeight - parseInt(this.HeaderHeight) + 'px'
    }
  }
}
</script>

<style>
  body {
    margin: 0px;
  }
  .el-header {
    padding: 0px;
  }
  .el-footer {
    padding: 0px;
  }
  .el-main {
    padding: 0px;
  }
</style>
