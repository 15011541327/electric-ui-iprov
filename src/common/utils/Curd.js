import { Message } from 'element-ui'
/**
 * 前台与后台交互工具
 */
export default class Curd {
  /**
   * 检查返回结果
   * @param res 后台返回数据
   * @returns {boolean}
   */
  static checkResultData (res) {
    if (res.status !== 200 || !res.data.successful) {
      return false
    }
    return true
  }
  /**
   * 查询数据
   * @param _this 当前vue对象
   * @param url url
   * @param queryData 查询条件
   * @param method 方法（默认post）
   * @param config ajax配置
   * @returns {Promise<AxiosResponse<any> | never>|Promise<any>}
   */
  static query (_this, url, queryData, method, config) {
    // 请求前检查
    if (_this.page.isPage) _this.page.isPage = false
    if (url == null || url === '') {
      Message.warning('请输入查询地址')
      return new Promise((resolve, reject) => { resolve({ successful: false, resultHint: '请输入查询地址' }) })
    } else {
      url = '/' + url
    }
    // 构建请求
    let http = method === 'get' ? _this.$http.get(url + queryData, config) : _this.$http.post(url, { pageIndex: _this.page.pageIndex, pageSize: _this.page.pageSize, data: queryData }, config)
    return http.then(v => {
      _this.loading = false
      return v.data.resultValue
    }).catch(v => {
      _this.loading = false
      return v
    })
  }
  /**
   * 批量删除
   * @param  _this 当前vue对象
   * @param  url  删除路径
   * @param data 删除数据的集合
   * @param method 方法（默认post）
   * @param config ajax配置
   * */
  static deleteById (_this, url, data, method, config) {
    // 删除前检查
    _this.loading = true
    if (url == null || url === '') {
      Message.warning('请输入删除地址')
      return new Promise((resolve, reject) => { resolve({ successful: false, resultHint: '请输入查询地址' }) })
    } else {
      url = '/' + url
    }
    if (data == null || data === '') {
      Message.warning('请选择要删除的数据')
    } else {
      // 构建请求
      let http = method === 'get' ? _this.$http.get(url + data, config) : _this.$http.post(url, data, config)
      return http.then(v => {
        _this.loading = false
        if (this.checkResultData(v)) {
          Message.success('删除成功')
        } else {
          Message.error('删除失败' + v.data.resultHint)
        }
        return v
      }).catch(v => {
        _this.loading = false
        Message.error('删除失败' + v)
        return v
      })
    }
  }
  /**
   * 批量新增
   * @function save
   * @param  _this
   * @param [String] url     新增请求路径
   * @param [Array]  data    新增数据
   * @param [Object] config  配置信息
   * */
  static save (_this, url, data, config) {
    let isURLEmpty = _this.$Utils.isValueEmpty(url, '请输入地址')
    let isDataEmpty = _this.$Utils.isValueEmpty(data, '请输入要提交的数据')
    if (isURLEmpty && isDataEmpty) {
      // url = '/' + url
      let http = _this.$http.post(url, data, config)
      return http.then(v => {
        _this.loading = false
        if (this.checkResultData(v)) {
          Message.success('新增成功')
        } else {
          Message.error('新增失败' + v.data.resultHint)
        }
        return v.data.resultValue
      }).catch(v => {
        _this.loading = false
        Message.error('新增失败' + v)
        return v
      })
    }
  }
  /**
   * 批量修改
   * @param _this         当前vue对象
   * @param url           保存路径
   * @param [Array] data  需要保存的数据
   * @param config        配置信息
   * */

  static update (_this, url, data, config) {
    let isURLEmpty = _this.$Utils.isValueEmpty(url, '请输入地址')
    let isDataEmpty = _this.$Utils.isValueEmpty(data, '请选择要修改的数据')
    // 判断url 和 data 是否为空
    if (isURLEmpty && isDataEmpty) {
      let http = _this.$http.post(url, data, config)
      return http.then(v => {
        _this.loading = false
        if (this.checkResultData(v)) {
          Message.success('修改成功')
        } else {
          Message.error('修改失败' + v.data.resultHint)
        }
        return v.data.resultValue
      }).catch(v => {
        _this.loading = false
        Message.error('修改失败' + v)
        return v
      })
    }
  }
  /**
   * 执行方法
   * @param functionObj 方法体
   * */
  static execFunction (functionObj, data) {
    if (functionObj != null) {
      functionObj(data)
    }
  }
  /**
   *
   * @param _this 当前vue对象
   * @param exportData 查询条件
   * @param fileName 导出文件名字
   * @param url 导出路径
   */
  static export (_this, exportData, fileName, url) {
    let data = 'params:{"columns":"","filter":"' + _this.$Utils.objectToQueryData(exportData) + '","sorter":"' + '' + '","pageIndex":"' + '' + '","pageSize":"' + '' + '"}'
    let exportUrl = _this.$Utils.getUrl(_this, url)
    _this.$http.post(exportUrl, data, {
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      responseType: 'arraybuffer'
    }).then((res) => {
      let excelData = res.data
      let blob = new Blob([excelData], {type: 'application/vnd.ms-excel'})
      let downloadElement = document.createElement('a')
      let objBlobUrl = URL.createObjectURL(blob)
      downloadElement.href = objBlobUrl
      downloadElement.download = fileName
      document.body.appendChild(downloadElement)
      downloadElement.click()
      downloadElement.preventDefault()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(objBlobUrl)
      window.location.href = objBlobUrl
    })
  }
  /**
   * 导出时点数据
   * @param _this 当前vue对象
   * @param headerName 导出表格的表头
   * @param headerVo 表头对应字段
   * @param fileName 导出文件名字
   */
  static exportTimePoint (_this, headerName, headerVo, fileName) {
    require.ensure([], () => {
      const {export_json_to_excel} = require('../../vendor/Export2Excel.js')
      const tHeader = headerName
      const filterVal = headerVo
      const list = _this.tableData
      const data = this.formatJson(filterVal, list)
      export_json_to_excel(tHeader, data, fileName)
    })
  }
  /**
   * 导出选中数据数据
   * @param _this 当前vue对象
   * @param headerName 导出表格的表头
   * @param headerVo 表头对应字段
   * @param fileName 导出文件名字
   */
  static exportChoiceData (_this, headerName, headerVo, fileName) {
    require.ensure([], () => {
      const {export_json_to_excel} = require('../../vendor/Export2Excel.js')
      const tHeader = headerName
      const filterVal = headerVo
      const list = _this.choiceData
      const data = this.formatJson(filterVal, list)
      export_json_to_excel(tHeader, data, fileName)
    })
  }
  static formatJson (filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  }
}
