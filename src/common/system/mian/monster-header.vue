<template>
  <div :style="{height: HeaderHeight}" class="header">
    <div :style="{width: AsideWidth, float: 'left'}">
      <div style="text-align: left;padding: 3.5px">
        <img style="float: left" :src="logoUrl" alt="logo">
        <span style="color: #fff;font-size: 18px;font-weight: bold;float: left;display: block;margin-top: 8px;">
          {{$store.state.SystemState.systemName}}
        </span>
      </div>
    </div>
    <div style="float: left;">
      <el-menu @select="select" background-color="#009c84" text-color="#fff" active-text-color="#fff" mode="horizontal" :default-active="$store.state.SystemState.top_active">
        <template v-for="menu in $store.state.SystemState.top_data">
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
  </div>
</template>

<script>
export default {
  name: 'monster-header',
  props: ['HeaderHeight', 'AsideWidth'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    // 每个菜单点击事件
    select: function (path) {
      this.$Utils.system.leftNavSelect(this, path)
    }
  },
  computed: {
    logoUrl: function () {
      return require('../../../assets/logo.png')
    }
  }
}
</script>

<style lang="scss">
.header{
  background-color: #009c84;
  height: 46px;
  overflow: hidden;
  .el-menu{
    background: transparent;
    border-bottom: 0;
  }
  .el-menu--horizontal{
    .el-menu-item,
    .el-submenu .el-submenu__title{
      color: rgba(255,255,255,.8);
      border-bottom: 0;
      height: 46px;
      line-height: 46px;
    }
    .el-menu-item.is-active,
    .el-menu-item:not(.is-disabled):focus{
      color: rgba(255,255,255,1);
      font-weight: bold;
      background: rgba(255,255,255,.1);
      border-bottom-color: transparent;
    }
    .el-menu-item:not(.is-disabled):hover,
    .el-submenu .el-submenu__title:hover{
      color: rgba(255,255,255,.8);
      background: rgba(255,255,255,.05);
      border-bottom-color: transparent;
    }
    .el-submenu.is-active{
      background: rgba(255,255,255,.1);
      .el-submenu__title{
        color: rgba(255, 255, 255, 0.8);
        border-bottom:none;
      }
    }
  }
}
</style>
