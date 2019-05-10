<template>
  <el-container>
    <el-header>
        <el-form ref="queryForm" :inline="true" :model="query" :rules="queryRules" label-width="100px">
          <el-form-item label="字典编码：" prop="code">
            <el-input v-model="query.code" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="字典名称：" prop="name">
            <el-input v-model="query.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="queryTableData">查询</el-button>
            <el-button type="text" @click="resetQueryForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </el-header>

    <el-main>
      <div style="">
        <el-button type="text" @click="insertClick"><i class="fa fa-plus"></i>新增枚举</el-button>
        <el-button type="text" @click="deleteClick"><i class="fa fa-trash-o"></i>删除</el-button>
        <el-button type="text" @click="updateClick"><i class="fa fa-trash-o"></i>修改</el-button>
      </div>
      <div>
        <v-table :is-loading="loading" :columns="columns" :table-data="tableData" is-horizontal-resize is-vertical-resize  :vertical-resize-offset="120" columns-width-drag style="width:100%" row-hover-color="#eee" row-click-color="#edf7ff" :error-content="tableNullContent" :select-change="selectChange"></v-table>
      </div>
    </el-main>

    <el-footer>
      <v-pagination :total="page.total" :layout="page.layout" :pageSize="page.pageSize" :pageSizeOption="page.pageSizeOption" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </el-footer>
  </el-container>

</template>

<script>
// url
let url = {
  query: 'dict/query',
  delete: 'dict/rm/'
}
let _this = this
export default {
  name: 'menuForIndex',
  data () {
    return {
      query: {
        code: null,
        name: null
      },
      // 验证
      queryRules: {},
      // 表头
      columns: [
        {width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection', isFrozen: true},
        {field: 'code', title: '编码', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, isFrozen: true},
        {field: 'name', title: '名称', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'type', title: '类型', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true}
      ],
      // 表格显示数据
      tableData: [],
      // 表格选择数据
      tableDataSelect: [],
      // 窗口打开大小
      layer_area: [750, 430]
    }
  },
  created () {
    _this = this
    // 初始化页面
    this.$Utils.init(this)
    // 初始化表格
    this.$Utils.initTable(this)
    // 初始化翻页
    this.$Utils.initPage(this, _this.queryTableData)
    // 第一次调用查询方法
    this.queryTableData()
  },
  methods: {
    // 查询数据
    queryTableData: function (queryForm) {
      this.$Utils.curd.query(this, url.query, this.query).then(v => {
        _this.$Utils.mountedTable(_this, v, 'tableData')
      })
    },
    // 删除数据
    deleteClick: function () {
      debugger
      let ids = _this.$Utils.createDeleteByIds(_this.tableDataSelect, 'code')
      _this.$Utils.curd.deleteById(_this, url.delete, ids, 'get').then(_this.queryTableData)
    },
    // 打开新增页面
    insertClick: function () {
      _this.layerOpen('新增枚举', require('./menuForInsert'))
    },
    // 窗口打开
    layerOpen: function (title, page, data) {
      let config = {
        title: title,
        area: _this.layer_area,
        content: {
          content: page.default,
          data: data
        },
        close: this.layerClose
      }
      _this.$layer.iframe(config)
    },
    // 窗口关闭
    layerClose: function (data) {
      _this.queryTableData()
    },

    // 修改数据事件
    updateClick: function () {
      if (_this.tableDataSelect.length === 0) {
        _this.$message.info('请选择数据')
      } else {
        let data = {
          oldData: _this.tableDataSelect
        }
        _this.layerOpen('修改枚举', require('./menuForUpdate'), data)
      }
    },
    // 选择数据回调
    selectChange: function (selection) {
      this.tableDataSelect = selection
    },

    // 查询条件重置
    resetQueryForm: function (formName) {
      _this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
