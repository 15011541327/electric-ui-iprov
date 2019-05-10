import dev from '@/common/dev/dev'

/**
 * 系统工具类
 */
export default class SystemUtils {
  /**
   * 加载菜单一级菜单和二级菜单
   一级菜单所有数据
   [{
      id: '0',
      name: 'system',
      icon: 'el-icon-message',
      title: '系统管理',
      child: []
    }]
   二级菜单所有数据
   key： 一级菜单的name
   value： 相应的菜单数据
   {
      system:[{
        id: '0',
        name: 'system',
        icon: 'el-icon-message',
        title: '系统管理'
      }]
    }
   * @returns {Promise<any>}
   */
  static loadMenu () {
    let result = {
      top_data: [], // 一级菜单数据
      left_data_all: {} // 二级菜单数据
    }
    let load = function (resolve, reject) {
      result.top_data = dev.top
      result.left_data_all = dev.left
      resolve(result)
    }
    // 菜单数据
    return new Promise(load)
  }
  /**
   * 二级菜单数据懒加载方法
   * @param name 一级菜单的名称
   * @returns {Promise<any>}
   */
  static loadLeftData (name) {
    let load = function (resolve, reject) {
      // 单个菜单数据
      let data = dev.leftOne
      resolve(data)
    }
    return new Promise(load)
  }
}
