export default class helper {
  /**
   * 休眠
   */
  static sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 初始化高度或者宽度
   * 为style里面加width和height
   */
  static getArea (style, area, _this) {
    if (area !== 'auto') {
      _this.$set(style, 'width', area[0] + 'px')
      _this.$set(style, 'height', area[1] + 'px')
    }
  }

  /**
   * 计算弹框初始位置
   */
  static initOffset (style, offset, _this, dom) {
    if (offset === 'center') {
      _this.$set(style, 'top', ((window.innerHeight / 2) - (parseInt(dom.scrollHeight) / 2)) + 'px')
      _this.$set(style, 'left', ((window.innerWidth / 2) - (parseInt(dom.scrollWidth) / 2)) + 'px')
      style.visibility = ''
    }
  }

  /**
   * 移动事件
   */
  static move (style, event, _this) {
    style.top = parseInt(style.top) + (event.clientY - _this.clientY) + 'px'
    style.left = parseInt(style.left) + (event.clientX - _this.clientX) + 'px'
    _this.clientY = event.clientY
    _this.clientX = event.clientX
  }

  // 深度拷贝
  static deepClone (source) {
    if (source == null) {
      return null
    }
    if (!source || typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    let targetObj = source.constructor === Array ? [] : {}
    for (let keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  }
}
