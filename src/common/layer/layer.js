let layer = function (vue) {
  // 主页面
  let Home = vue.extend(require('./home.vue').default)
  // 遮罩层
  let Mask = vue.extend(require('./page/layer_mask.vue').default)
  // 层级取数开始数字
  let zIndex = 500
  const defaultOptions = {
    type: 0, // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
    title: '', // 标题
    content: null, // 数据内容
    shade: true, // 是否显示遮罩层
    area: 'auto', // 宽度和高度
    offset: 'center', // 初始定位 center:居中
    close: null // 关闭的回调函数
  }
  let self = {}
  self.open = function (options) {
    // 合并数据
    options = mergeJson(options, defaultOptions)
    // 获取层级
    options.zIndex = self.getIndex(2)
    // 获取id
    options.id = `notification_${new Date().getTime()}_${options.zIndex}`
    // 将方法对象封装到参数
    options.layer = self
    if (parseInt(options.type) === 2) {
      options.content.Content = vue.extend(options.content.content)
    }
    // 添加遮罩层
    if (options.shade) {
      let maskInstance = new Mask({
        data: options,
        methods: {
          getLayerMaskIndex () {
            return options.zIndex - 1
          }
        }
      })
      maskInstance.vm = maskInstance.$mount()
      document.body.appendChild(maskInstance.vm.$el)
    }
    // 获取新的展示对象并添加到页面上
    let instance = new Home({ data: options })
    instance.id = options.id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)

    /**
     * 关闭弹窗
     */
    self.close = function (id) {
      let home = document.getElementById(id)
      if (home != null) {
        document.body.removeChild(home)
      }
      let mask = document.getElementById(id + '_mask')
      if (mask != null) {
        document.body.removeChild(mask)
      }
    }
    return options.id
  }

  self.iframe = function (options) {
    options.type = 2
    self.open(options)
  }

  /**
   * 获取z-index
   */
  self.getIndex = function (i) {
    zIndex = zIndex + (i == null ? 1 : i)
    return zIndex
  }
  /**
   * 合并js数据
   */
  function mergeJson (options, def) {
    for (let key in def) {
      if (options[key] === undefined) {
        options[key] = def[key]
      }
    }
    return options
  }
  return self
}
module.exports = layer
