import vue from 'vue'
import vuex from 'vuex'
import SystemState from '@/common/system/js/System-Store.js' // 系统的一些参数和方法
vue.use(vuex)

const store = new vuex.Store({
  modules: {
    SystemState: SystemState
  }
})

export default store
