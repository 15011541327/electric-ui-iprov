import utils from '@/common/utils/SystemUtils'
/**
 * 系统工具类
 */
export default class SystemUtils {
  /**
   * @param _this vue当前页面实例
   * @returns {{state}}
   */
  static getStore (_this) {
    return _this.$store.state.SystemState
  }
  /**
   * 加载菜单 vuex 当前对象
   * @param _this vue当前页面实例
   * @returns {Promise<any | never>}
   */
  static loadMenu (_this) {
    let store = this.getStore(_this)
    return utils.loadMenu().then(menu => {
      store.top_data = menu.top_data
      store.left_data_all = menu.left_data_all
      return menu
    }).then(menu => {
      this.analysisLeftData(_this)
      return menu
    })
  }

  /**
   * 解析二级菜单到map共后期使用
   * @param _this vue当前页面实例
   */
  static analysisLeftData (_this) {
    let store = this.getStore(_this)
    for (let key in store.left_data_all) {
      this.analysisLeftDataLoop(_this, store.left_data_all[key], key)
    }
  }

  /**
   * 解析二级菜单到map共后期使用
   * @param _this vue当前页面实例
   * @param value 二级菜单的数据
   * @param key 一级菜单的key
   */
  static analysisLeftDataLoop (_this, value, key) {
    let store = this.getStore(_this)
    if (value instanceof Array) {
      value.forEach(val => {
        this.analysisLeftDataLoop(_this, val, key)
      })
    } else {
      // 二级菜单数据保存 key：二级菜单的name，value: 二级菜单的对象数据
      store.left_data_map[value.name] = value
      // key二级菜单的name,value一级菜单的name
      store.left_top_data[value.name] = key
      // 动态添加路由信息
      this.addRoute(_this, value)
      if (value.child) {
        this.analysisLeftDataLoop(_this, value.child, key)
      }
    }
  }

  /**
   * 每个一级菜单点击事件
   * @param _this vue当前页面实例
   * @param path 一级菜单的path
   */
  static leftNavSelect (_this, path) {
    let store = this.getStore(_this)
    let leftData = store.left_data_all[path]
    if (leftData == null) {
      // 加载二级菜单
      utils.loadLeftData(path).then(val => {
        store.left_data_all[path] = val
        store.left_data = val
      })
    } else {
      store.left_data = leftData
    }
  }

  /**
   * 添加tab标签
   * @param _this vue当前页面实例
   * @param path 路由路径
   */
  static tabAdd (_this, path) {
    let store = this.getStore(_this)
    // 获取二级菜单的数据
    let data = store.left_data_map[path]
    if (data == null) {
      return
    }
    let tabData = store.tabs.filter(v => v.name === data.name)
    if (tabData.length === 0) {
      store.tabs.push(data)
    }
    store.tab_active = data.name
  }

  /**
   * 关闭选项卡
   * @param _this vue当前页面实例
   * @param name 选项卡名称=路由名称
   */
  static tabRemove (_this, name) {
    let store = this.getStore(_this)
    let data = { name: 'home' }
    for (let i in store.tabs) {
      if (store.tabs[i].name === name) {
        store.tabs.splice(i, 1)
        break
      }
      data = store.tabs[i]
    }
    // 把激活的tab置为上一个
    store.tab_active = data.name
    // 改变为上一个的路由
    _this.$router.push(data.name)
  }

  /**
   * 动态添加路由
   * @param _this vue当前页面实例
   * @param router 路由信息
   */
  static addRoute (_this, router) {
    let store = this.getStore(_this)
    if (store.router[router.name] != null) {
      return
    }
    if (router.child != null && router.child.length !== 0) {
      return
    }
    // 添加路由
    let route = {
      name: router.name,
      path: router.name,
      component: _this.$Utils.getComponent(router.path),
      query: router
    }
    _this.$router.options.routes[0].children.push(route)
    _this.$router.addRoutes(_this.$router.options.routes)
    store.router[router.name] = router
  }
}
