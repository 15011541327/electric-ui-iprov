<template>
  <div>
    <!-- 查询条件 -->
    <div class=" queryDiv ">
      <el-form :inline="true" ref="queryData" :rules="insertFormRules" :model="queryData" label-width="114px">
        <el-form-item label="通道名称：" prop="name">
          <el-input v-model="queryData.name" @keyup.enter.native="querySearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="通道编码：" prop="name">
          <el-input v-model="queryData.name" @keyup.enter.native="querySearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="通道属性：" prop="name">
          <el-input v-model="queryData.name" @keyup.enter.native="querySearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="querySearch">查询</el-button>
          <el-button type="text" @click="resetQueryForm('queryData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 控制按钮 -->
    <div>
      <el-button type="text" @click="insertClick"><i class="fa fa-plus"></i> 新增</el-button>
      <el-button type="text" @click="updateClick"><i class="fa fa-pencil"></i> 修改</el-button>
      <el-button type="text" @click="deleteClick"><i class="fa fa-trash-o"></i> 删除</el-button>
      <el-button type="text" @click="importClick"><i class="fa fa-inbox"></i> 导入</el-button>
      <el-button type="text" @click="exportClick"><i class="fa fa-external-link"></i> 导出</el-button>
      <el-button type="text" @click="exportClick"><i class="fa fa-history"></i> 历史调价记录</el-button>
      <span style="float: right;font-size: 12px;">单位：元/千千瓦时</span>
    </div>
    <!-- 列表显示 -->
    <el-table :data="tableData" ref="userTable" border stripe style="width: 100%" :height="tableHeight" show-overflow-tooltip  @selection-change="handleCurrentChange">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="feeYear" label="通道编码" align="center"></el-table-column>
      <el-table-column prop="memberName" label="通道名称" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="genName" label="通道属性" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="genCapacity" label="通道模式" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="capacityPrice" label="输电价格" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="capacityFee" label="网损/线损" show-overflow-tooltip align="center"></el-table-column>
    </el-table>
    <el-pagination background small :page-sizes="page.pageSizeOption" :page-size="page.pageSize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="page.total" @current-change="pageChange" @size-change="pageSizeChange" style="text-align: right"></el-pagination>
  </div>
</template>

<script>
let url = {
  query: 'dict/query',
  delete: 'dict/rm/',
  export: 'marketmember/export',
  import: 'marketmember/import'
}
let _this = this
export default {
  name: 'channelForIndex',
  data () {
    return {
      // 查询数据
      queryData: {
        name: '',
        code: '',
        state: ''
      },
      // 表格数据
      tableData: [],
      // 表格的高度
      tableHeight: window.innerHeight - 257,
      // 数据监测
      insertFormRules: {
        name: [
          {validator: this.$valid.blackList(), trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ]
      },
      layer_area: [450, 450]
    }
  },
  created () {
    _this = this
    // 初始化页面
    this.$Utils.init(this)
    // 初始化表格
    this.$Utils.initTable(this)
    // 初始化翻页
    this.$Utils.initPage(this, _this.querySearch)
  },
  methods: {
    // 查询数据
    querySearch: function (queryData) {
      this.$Utils.curd.query(this, url.query, this.query).then(v => {
        _this.$Utils.mountedTable(_this, v, 'tableData')
      })
    },
    // 查询条件重置
    resetQueryForm: function (formName) {
      _this.$refs[formName].resetFields()
    },
    // 选择数据事件
    handleCurrentChange (row) {
      _this.choiceData = row
    },
    // 删除数据
    deleteClick: function () {
      let ids = _this.$Utils.createDeleteByIds(_this.tableDataSelect, 'code')
      _this.$Utils.curd.deleteById(_this, url.delete, ids, 'get').then(_this.queryTableData)
    },
    // 打开新增页面
    insertClick: function () {
      _this.layerOpen('新增通道', require('./channelForInsert'))
    },
    // 修改数据事件
    updateClick: function () {
      if (_this.tableDataSelect.length === 0) {
        _this.$message.info('请选择数据')
      } else {
        let data = {
          oldData: _this.tableDataSelect
        }
        _this.layerOpen('修改枚举', require('./channelForUpdate'), data)
      }
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
    // 导入
    importClick () {
      let config = {
        title: '导入文件',
        area: [500, 180],
        content: {
          content: require('../../market/updataExcel').default,
          data: {
            importURL: url.import
          }
        },
        close: this.layerClose
      }
      this.$layer.iframe(config)
    },
    // 导出
    exportClick () {
      if (_this.choiceData.length > 0) {
        let tableHeader = ['通道编码', '通道名称', '通道属性', '通道模式', '输电价格', '网损/线损']
        let tableVal = ['memberCode', 'memberName', 'shortName', 'classTypeName', 'socialCode', 'legalRepre']
        _this.$curdUtil.exportChoiceData(_this, tableHeader, tableVal, '通道管理')
      } else {
        _this.$curdUtil.export(_this, _this.queryData, '通道管理.xls', url.export)
      }
    }
  }
}
</script>

<style scoped>

</style>
