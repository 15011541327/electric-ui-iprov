/* eslint-disable */
// 长度校验
let validLength = (rule, value, callback) => {
  let val = value
  // 数据长度校验
  let min = rule.min == null ? 0 : rule.min
  let max = rule.max
  val = val == null ? '' : val + ''
  val = rule.type == 'number' ? val = val.replace('.', '') : val
  let length = val.length
  // 检测
  if (length > max || length < min) {
    if (min === 0) {
      callback(new Error('最多可输入' + max + '个字符'))
    } else {
      callback(new Error('最多可输入' + min + '-' + max + '个字符'))
    }
  }
  if (rule.isCheck == null) {
    callback()
  }
}
// 字符串黑名单校验
let validBlackList = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!new RegExp(/^[（）()[\]【】#“”‘’，。,\w\/\*\-\+\.\u4e00-\u9fa5]+$/).test(value)) {
      callback(new Error('输入中不能包含特殊字符'))
    }
  }
  callback()
}
// 字符串校验
let validCheckChar = (rule, value, callback) => {
  rule.isCheck = '000001'
  // 长度校验
  if ((rule.min == null ? 0 : rule.min) > 0 || rule.max > 0) {
    validLength(rule, value, callback)
  }
  // 其余字符串校验
  let reg = null
  if (value != null && value !== '') {
    switch (rule.type) {
      case 'numberAndLetter':
        reg = new RegExp(/^[a-zA-Z0-9]+$/)
        if (!reg.test(value)) {
          callback(new Error('只能输入数字和字母'))
        }
        break
      case 'number':
        reg = new RegExp(/^\d+(?=\.{0,1}\d*$|$)/  )
        if (!reg.test(value)) {
          callback(new Error('请输入正确的数'))
          break
        }
        // 校验数字小数位
        let dec = rule.dec
        if (dec > 0) {
          value = '' + value
          if (value.indexOf('.') > 0) {
            if (value.split('.')[1].length > dec) {
              callback(new Error('保留小数点后' + dec + '位'))
            }
          }
        }
        break
      case 'int':
        reg = new RegExp(/^\d+$/  )
        if (!reg.test(value)) {
          callback(new Error('只能输入整数'))
        }
        break
      case 'chinese':
        reg = new RegExp(/^[\u4e00-\u9fa5()（）]+$/)
        if (!reg.test(value)) {
          callback(new Error('只能输入汉字'))
        }
        break
      case 'chineseAndLetter':
        reg = new RegExp(/^[a-zA-Z\u4e00-\u9fa5（）()#[\]【】‘’，。,\/\*\-\+\.]+$/)
        if (!reg.test(value)) {
          callback(new Error('存在非法字符'))
        }
        break
      case 'numberLetterSign':
        reg = new RegExp(/^[（）()[\]【】“”‘’，。,\w\/\*\-\+\.]+$/)
        if (!reg.test(value)) {
          callback(new Error('有非法字符，请检查'))
        }
        break
      case 'blackList':
        reg = new RegExp(/^[（）()[\]【】#“”‘’，。,\w\/\*\-\+\.\u4e00-\u9fa5]+$/)
        if (!reg.test(value)) {
          callback(new Error('有非法字符，请检查'))
        }
        break
    }
  }
  callback()
  rule.isCheck = null
}

const Validator = {
  // 长度校验 min: 1, max: 50, message: ''
  length () {
    return validLength
  },
  // 字符串黑名单校验
  blackList () {
    return validBlackList
  },
  // 字符串校验 type === 'numberAndLetter'：数字和字母
  checkChar () {
    return validCheckChar
  }
}
// 对Validator的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$valid', { value: Validator })
  }
}
