import {
  Container, Header, Aside, Main, Footer, // 布局组件
  Menu, Submenu, MenuItem, // 菜单组件
  Tabs, TabPane, // tabs组件
  Message, MessageBox, // 提示信息
  Form, FormItem, Input, Button, // 表单组件,
  Table, TableColumn, // 表格组件
  Radio, // 单选组件
  Select, Option, // 下拉框组
  Row, Col, // el-row el-col
  Pagination // 分页组件

} from 'element-ui'

// 对CommonUtils的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue) {
    // 布局管理
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Footer)
    // 菜单组件
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    // tabs组件
    Vue.use(Tabs)
    Vue.use(TabPane)
    // 提示组件
    Vue.prototype.$message = Message
    Vue.prototype.$messageBok = MessageBox
    // 表单组件
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    // 表格组件
    Vue.use(Table)
    Vue.use(TableColumn)
    // 单选组件
    Vue.use(Radio)
    // 下拉框组件
    Vue.use(Select)
    Vue.use(Option)
    // 布局组件
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Pagination)
  }
}
