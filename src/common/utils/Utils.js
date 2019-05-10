import system from '@/common/system/js/System-Utils.js'
import curd from '@/common/utils/Curd.js'
import { Message } from 'element-ui'
import SystemConfig from '../config/System'

const Utils = {
  system: system,
  curd: curd,
  /**
   * 动态懒加载组件
   */
  getComponent: function (path) {
    return resolve => require(['@/components/' + path], resolve)
  },
  /**
   * 深度拷贝数据
   * @param source 元数据
   * @param ignoreNull 是否拷贝集合
   * @returns 拷贝后的集合
   */
  deepClone: function (source, ignoreNull) {
    if (!source || typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    if (ignoreNull == null) {
      ignoreNull = false
    }
    let targetObj = source.constructor === Array ? [] : {}
    for (let keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          if (ignoreNull) {
            if (source[keys] != null && source[keys] !== '') {
              targetObj[keys] = source[keys]
            }
          } else {
            targetObj[keys] = source[keys]
          }
        }
      }
    }
    return targetObj
  },
  /**
   * 执行方法
   * @param fun 方法
   */
  execFunction: function (fun) {
    if (fun != null) {
      fun()
    }
  },
  /**
   * 初始化方法
   * @param _this
   */
  init: function (_this) {
    _this.loading = true
  },
  /**
   * 初始化表格
   * @param _this 当前vue对象
   */
  initTable: function (_this) {
    _this.tableNullContent = '没有查询到相关数据'
  },
  /**
   * 查询数据后表格后置处理
   * @param _this 当前vue对象
   * @param page 返回的表格数据
   * @param name 需要赋值的表格显示对象
   */
  mountedTable: function (_this, page, name) {
    _this[name] = page.records
    _this.page.total = page.total
  },
  /**
   * 初始化翻页
   * @param _this
   */
  initPage: function (_this, fun) {
    _this.page = this.deepClone(_this.$SYSTEM.page)
    _this.pageChange = function (index) {
      _this.page.pageIndex = index
      _this.page.isPage = true
      _this.$Utils.execFunction(fun)
    }
    _this.pageSizeChange = function (size) {
      _this.page.pageSize = size
      _this.page.isPage = true
      _this.$Utils.execFunction(fun)
    }
  },
  /**
   *判断值是否为空,并提示对应提示语
   * */
  isValueEmpty: function (data, note) {
    if (typeof (data) === 'undefined' || data.length === 0) {
      Message.info(note)
      return false
    }
    return true
  },
  /**
   * 创建删除的id数据
   * @param datas
   * @param codes
   */
  createDeleteByIds: function (datas, name) {
    if (datas == null || name == null) {
      return null
    }
    let ids = ''
    datas.forEach(v => {
      ids = ids + ',' + v[name]
    })
    return ids
  },
  /**
   * 同一对象修改前后对比,返回对比结果
   * @param  [Array] oldData    修改之前的数据
   * @param  [Array] updateData 修改之后的数据
   * @return [Array] data      对比后产生的新数据
   * */
  doObjectContrast: function (oldData, updateData, id) {
    let data = [] // 要返回的数据
    if (oldData.length > 0) {
      let propNames = Object.getOwnPropertyNames(oldData[0]) // 取得修改之前数据对象的属性
      for (let i = 0; i < oldData.length; i++) {
        let saveData = {}
        saveData[id] = oldData[i][id]
        for (let n = 0; n < propNames.length - 1; n++) {
          let propName = propNames[n] // 属性名
          // 判断属性是否更改,更改则进行存储
          if (oldData[i][propName] !== updateData[i][propName]) {
            saveData[propName] = updateData[i][propName]
          }
        }
        data.push(saveData)
      }
      return data
    }
  },
  /**
   * 获取url,必须先设置 gateway_url
   * @param _this 当前vue对象
   * @param url 访问的url
   * @returns {*}
   */
  getUrl: function (_this, url) {
    if (_this.$SystemConfig.gateway_flag) {
      return _this.gateway_module + '/' + url
    }
    return url
  },
  /**
   * 组装查询数据
   * @param obj 查询对象
   * @returns {string}
   */
  objectToQueryData: function (obj) {
    let queryStr = ''
    for (let key in obj) {
      let value = obj[key]
      if (value != null && value !== '' && value.length !== 0) {
        queryStr += key + '=' + value + '&'
      }
    }
    if (obj == null) {
      return queryStr
    }
    queryStr = queryStr.substr(0, queryStr.length - 1)
    return queryStr
  },
  /**
   * 初始化高度
   * @param _this
   * @param btnHeight
   */
  initStyleLayer: function (_this, btnHeight) {
    _this.mainStyle = {}
    if (btnHeight == null) {
      btnHeight = 50
    }
    _this.mainStyle.height = parseInt(_this.props.style.height) - parseInt(_this.props.style.title.height) - btnHeight + 15 + 'px'
    _this.mainStyle.padding = '10px 10px 10px 10px'
    _this.mainStyle.overflow = 'auto'

    _this.btnStyle = {}
    _this.btnStyle.paddingRight = '10px'
    _this.btnStyle.marginTop = '5px'
    _this.btnStyle.height = btnHeight + 'px'
    _this.btnStyle.lineHeight = '40px'
    _this.btnStyle.textAlign = 'right'
    _this.btnStyle.borderTop = '1px solid #ccc'
  }
}

// 对CommonUtils的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$Utils', { value: Utils })
  }
}
