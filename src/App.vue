<template>
  <div id="app" class="app-scss">
    <router-view/>
  </div>
</template>

<script>
let _this = null
export default {
  name: 'App',
  created () {
    _this = this
    // 设置系统名称和系统图标
    this.$store.state.SystemState.systemName = this.$SYSTEM.systemName
    this.$store.state.SystemState.systemLogo = this.$SYSTEM.systemLogo
    // 加载一级菜单和二级菜单
    this.$Utils.system.loadMenu(_this).then(v => {
      // 获取当前路由
      let path = _this.$route.path
      if (path !== '/' && path !== '/home') {
        // 保留激活的路由
        if (path.substring(0, 1) === '/') {
          path = path.substring(1, path.length)
        }
      }
      return path
    }).then(path => {
      // 加载激活的一级菜单
      let key = _this.$store.state.SystemState.left_top_data[path]
      _this.$store.state.SystemState.top_active = key
      // 加载激活的二级菜单
      _this.$Utils.system.leftNavSelect(_this, _this.$store.state.SystemState.left_top_data[path])
      // 刷新添加激活的tab
      this.$Utils.system.tabAdd(_this, path)
    })
  },
  computed: {
    // 对二级菜单进行监测
    left_data_all: function () {
      return this.$store.state.SystemState.left_data_all
    }
  },
  watch: {
    // 监听路由
    $route (to, from) {
      let path = to.path
      if (path.substring(0, 1) === '/') {
        path = path.substring(1, path.length)
      }
      this.$Utils.system.tabAdd(this, path)
    },
    // 监听二级菜单的数据变化
    left_data_all: {
      handler: function (value, old) {
        if (value == null) {
          this.$store.state.SystemState.left_data_all = {}
        } else {
          this.$Utils.system.analysisLeftData(_this)
        }
      },
      deep: true
    }
  }
}
</script>

<style>
	@import "./assets/css/main.css";
	@import "./assets/css/color-dark.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
  body {
    margin: 0px;
  }
</style>
