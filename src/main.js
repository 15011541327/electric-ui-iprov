// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router' // 路由
import axios from 'axios' // ajax
import './common/css/index.css' // 全局样式
import ElementUI from './common/config/ElementUI.js' // element ui
import './assets/css/icon.css' // 图标
import './common/system/element-ui/css/index.css' // element ui 默认主题
import Utils from './common/utils/Utils.js' // 公共方法的js
import valid from './common/utils/ValidateUtil'// 表单验证
import store from './common/vuex/Store.js' // vuex状态管理
import SystemConfig from './common/config/System.js' // 系统配置项
import 'vue-easytable/libs/themes-base/index.css' // 引入easytable样式
import {VTable, VPagination} from 'vue-easytable' // 导入easytable table和 分页组件
import layer from './common/layer/layer' // 弹窗插件
import 'font-awesome/css/font-awesome.min.css' // z字体图标
// 主题颜色
import './styles/greengw.scss'
// 自定义通用控件
import './styles/common.scss'
Vue.config.productionTip = false
Vue.use(valid) // 验证规则
Vue.use(Vuex)
Vue.use(Utils)
Vue.use(SystemConfig, axios)
Vue.use(ElementUI) // 项目引用element ui并设置默认值
Vue.prototype.$ELEMENT = { size: 'mini' }
// 注册easytable到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.prototype.$http = axios // 使用ajax
Vue.prototype.$SystemConfig = SystemConfig // 统一全局配置
Vue.prototype.$layer = layer(Vue) // 加载到Vue

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
