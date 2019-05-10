const System = {
  systemName: '怪兽系统',
  systemLogo: '../../../assets/logo.png', // 暂时不管用
  url: 'http://10.2.40.91:8088', // 请求网关地址
  gateway_flag: false, // 网关开关
  gateway_module: {}, // 网关模块
  page: { total: 0, pageIndex: 0, size: 'middle', howPagingCount: 5, pageSize: 10, pageSizeOption: [10, 20, 30, 40, 50], layout: ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'] }
}

// 对CommonUtils的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, axios) {
    axios.defaults.baseURL = System.url // 设置ajax的全局默认前缀路径
    axios.defaults.headers.post['Content-type'] = 'application/json;charset=UTF-8'
    Object.defineProperty(Vue.prototype, '$SYSTEM', { value: System })
  }
}
