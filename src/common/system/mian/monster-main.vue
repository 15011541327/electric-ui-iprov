<template>
  <div>
    <el-tabs class="navTabList" type="card" @tab-click="tabClick" v-model="$store.state.SystemState.tab_active" @tab-remove="tabRemove">
      <el-tab-pane label="首页" name="home" :closable="false"/>
      <el-tab-pane v-for="v in $store.state.SystemState.tabs" :key="v.title" :label="v.title" :name="v.name" closable></el-tab-pane>
    </el-tabs>
    <section class="content-container">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </section>
  </div>
</template>

<script>
export default {
  name: 'monster-main',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    // 关闭选项卡
    tabRemove: function (name) {
      this.$Utils.system.tabRemove(this, name)
    },
    // 选项卡激活事件
    tabClick: function (tab) {
      this.$router.push(tab.name)
    }
  }
}
</script>

<style scoped>
	.content-container{
		padding: 0 10px;
	}
</style>
