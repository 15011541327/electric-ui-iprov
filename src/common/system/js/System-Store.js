export default {
  state: {
    systemName: '', // 系统名称
    systemLogo: '',
    top_data: [], // 头部数据菜单显示数据
    top_active: 'home', // 一级菜单激活的name
    left_data: [], // 左侧菜单显示所有
    left_data_all: {}, // 所有的左侧菜单数据
    left_data_map: {}, // 把所有的二级菜单以name：value保存
    left_top_data: {}, // 二级菜单对应的一级菜单name key:二级菜单的name,value:一级菜单的name
    tabs: [], // tabs数据
    tab_active: 'home', // 激活的tab
    router: {} // 存放所有已存在的动态加载的路由信息key：路由的名称 value：路由的对象（或者名称）
  }
}
