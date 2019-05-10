<template>
    <div class="leftMenu">
      <el-menu :style="{height:leftNavHeight}" active-text-color="rgb(31, 111, 111)" unique-opened router :default-active="activeIndex">
        <template v-for="menu in $store.state.SystemState.left_data">
          <!-- 最后一级菜单 -->
          <el-menu-item v-if="!menu.child" :key="menu.id" :data="menu" :index="menu.name">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
          </el-menu-item>
          <!-- 此菜单下还有子菜单 -->
          <el-submenu v-if="menu.child" :key="menu.id" :data="menu" :index="menu.name">
            <template slot="title">
              <i v-if="menu.icon"  :class="menu.icon"></i>
              <span>{{menu.title}}</span>
            </template>

            <!-- 第二级菜单 -->
            <template v-for="menuOne in menu.child">
              <!-- 最后一级菜单 -->
              <el-menu-item v-if="!menuOne.child" :key="menuOne.id" :data="menuOne" :index="menuOne.name">
                <i v-if="menuOne.icon" :class="menuOne.icon"></i>
                <span slot="title">{{menuOne.title}}</span>
              </el-menu-item>
              <!-- 此菜单下还有子菜单 -->
              <el-submenu v-if="menuOne.child" :key="menuOne.id" :data="menu" :index="menuOne.name">
                <template slot="title">
                  <i v-if="menuOne.icon"  :class="menuOne.icon"></i>
                  <span>{{menuOne.title}}</span>
                </template>

                <!-- 第三级菜单 -->
                <template v-for="menuTwo in menuOne.child">
                  <!-- 最后一级菜单 -->
                  <el-menu-item v-if="!menuTwo.child" :key="menuTwo.id" :data="menuTwo" :index="menuTwo.name">
                    <i v-if="menuTwo.icon" :class="menuTwo.icon"></i>
                    <span slot="title">{{menuTwo.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>

          </el-submenu>
        </template>
      </el-menu>
    </div>
</template>

<script>
export default {
  name: 'monster-aside',
  props: ['leftNavHeight'],
  data () {
    return {
    }
  },
  computed: {
    // 当前激活的菜单和路由一样
    activeIndex () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
.el-menu {
  background-color: rgb(242, 242, 242)
}
.leftMenu .el-menu-item {
  height: 36px;
  line-height: 36px;
  text-align: left;
}

</style>
