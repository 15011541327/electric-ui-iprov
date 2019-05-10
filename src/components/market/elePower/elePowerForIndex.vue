<template>
  <div>
    <!--查询条件-->

    <div ref="queryDiv" class="queryDiv">
      <el-form :inline="true" ref="queryData" :rules="queryDataRules" :model="queryData">
        <el-form-item label="电网公司编码：" prop="memberCode">
          <el-input v-model="queryData.memberCode" @keyup.enter.native="querySearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="电网公司名称：" prop="memberName">
          <el-input v-model="queryData.memberName" @keyup.enter.native="querySearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：" prop="socialCode">
          <el-input v-model="queryData.socialCode" @keyup.enter.native="querySearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="querySearch">查询</el-button>
          <el-button type="text" @click="resetQueryForm('queryData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 控制按钮 -->
    <div class="toolbar-group">
      <el-button type="text" @click="insertClick"><i class="fa fa-plus"></i> 新增</el-button>
      <el-button type="text" @click="updateClick"><i class="fa fa-pencil"></i> 修改</el-button>
      <el-button type="text" @click="deleteClick"><i class="fa fa-trash-o"></i> 删除</el-button>
      <el-button type="text" @click="importClick"><i class="fa fa-inbox"></i> 导入</el-button>
      <el-button type="text" @click="exportClick"><i class="fa fa-external-link"></i> 导出</el-button>
      <span style="float: right;font-size: 14px;">
        单位：万元、%
      </span>
    </div>
    <!-- 列表显示 -->
    <el-table :data="tableData" ref="aisleTable" border stripe v-loading="loading" style="width: 100%" :height="tableHeight" @selection-change="handleCurrentChange" @row-dblclick="detailClick">
      <el-table-column type="selection"  fixed="left" width="40"></el-table-column>
      <el-table-column type="index" fixed="left" align="center" label="序号" width="56"></el-table-column>
      <el-table-column prop="memberCode" fixed="left" show-overflow-tooltip width="128" align="center" label="电网公司编码"></el-table-column>
      <el-table-column prop="memberName" fixed="left" show-overflow-tooltip width="184" align="left" label="电网公司名称"></el-table-column>
      <el-table-column prop="shortName" show-overflow-tooltip width="184" align="left" label="电网公司简称"></el-table-column>
      <el-table-column prop="classTypeName" show-overflow-tooltip width="120" align="left" label="市场成员类型"></el-table-column>
      <el-table-column prop="socialCode" show-overflow-tooltip width="184" align="center" label="统一社会信用代码"></el-table-column>
      <el-table-column prop="legalRepre" show-overflow-tooltip width="184" align="center" label="法人代表"></el-table-column>
      <el-table-column prop="address" show-overflow-tooltip width="184" align="center" label="注册地址"></el-table-column>
      <el-table-column prop="reditMoney" show-overflow-tooltip width="184" align="right" label="注册资金"></el-table-column>
      <el-table-column prop="acctBankName" show-overflow-tooltip width="184" align="center" label="开户银行"></el-table-column>
      <el-table-column prop="acctName" show-overflow-tooltip width="184" align="center" label="开户名称"></el-table-column>
      <el-table-column prop="acctCode" show-overflow-tooltip width="184" align="center" label="银行账号"></el-table-column>
      <el-table-column prop="acctLiaison" show-overflow-tooltip width="184" align="center" label="银行联行号"></el-table-column>
      <el-table-column prop="taxRate" show-overflow-tooltip width="80" align="center" label="增值税率"></el-table-column>
      <el-table-column prop="agreementCode" show-overflow-tooltip width="156" align="center" label="使用协议书编号"></el-table-column>
      <el-table-column prop="memberTypeName" show-overflow-tooltip width="184" align="center" label="电网公司类型"></el-table-column>
      <el-table-column prop="superiorUnitName" show-overflow-tooltip width="184" align="center" label="上级单位名称"></el-table-column>
      <el-table-column prop="geogRegion" show-overflow-tooltip width="184" align="center" label="地理区域"></el-table-column>
      <el-table-column prop="controlRegion" show-overflow-tooltip width="184" align="center" label="控制区域"></el-table-column>
      <el-table-column prop="startTime" show-overflow-tooltip width="184" align="center" label="生效时间"></el-table-column>
      <el-table-column prop="endTime" show-overflow-tooltip width="184" align="center" label="失效时间"></el-table-column>
      <el-table-column prop="supplierCode" show-overflow-tooltip width="156" align="center" label="对应供应商编码"></el-table-column>
      <el-table-column prop="memberStatusName" show-overflow-tooltip width="156" align="center" label="市场成员状态"></el-table-column>
      <el-table-column prop="dataSourceName" show-overflow-tooltip width="156" align="center" label="数据来源"></el-table-column>
    </el-table>
    <el-pagination background small :page-sizes="page.pageSizes" :page-size="page.pageSize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="page.total" @current-change="currentChange" @size-change="sizeChange" style="text-align: right"></el-pagination>
  </div>
</template>
<script>
let _this = this
let url = {
  query: 'marketmember/query',
  del: 'marketmember/delete',
  import: 'marketmember/import',
  export: 'marketmember/export'
}
export default {
  name: 'elePowerForIndex',
  data: function () {
    return {
      enum_code: 'MEMBER_TYPE_DWGS:memberType,CLASS_TYPE:classType,MEMBER_STATUS:memberStatus,DATA_SOURCE:dataSource',
      enum_data: [],
      tableHeight: window.innerHeight - 245,
      // 加载等待
      loading: false,
      // 新增导入按钮禁用
      isDisabled: false,
      // 查询条件数据
      queryData: {
        memberCode: null,
        memberName: null,
        socialCode: null,
        classType: '02'
      },
      queryDataRules: {
        memberCode: [
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']},
          {validator: this.$valid.checkChar(), type: 'numberLetterSign', trigger: ['blur', 'change']}
        ],
        memberName: [
          {validator: this.$valid.length(), min: 0, max: 100, trigger: ['blur', 'change']},
          {validator: this.$valid.blackList(), trigger: ['blur', 'change']}
        ],
        socialCode: [
          {validator: this.$valid.length(), min: 0, max: 18, trigger: ['blur', 'change']},
          {validator: this.$valid.checkChar(), type: 'numberLetterSign', trigger: ['blur', 'change']}
        ]
      }, // 查询数据检查
      ifDisable: false,
      // 表格数据
      tableData: [],
      // 表格选择数据
      choiceData: [],
      layer_area: [850, 450]
    }
  },
  created: function () {
    _this = this
    // 添加网关
    _this.gateway_url = _this.$Config.gateway_module.common
    // 初始页面数据
    _this.$commonUtil.init(_this, _this.querySearch)
    // 初始化字典（目前在查询的方法里有）
  },
  methods: {
    // 查询表格数据事件
    querySearch: () => {
      // 组装查询条件
      let data = _this.$commonUtil.objectToQueryData(_this.queryData)
      _this.$curdUtil.query(_this, url.query, data, 'createTime=desc').then((res) => {
        let data = res.data.resultValue.items
        data.forEach((e) => {
          e.startTime = e.startTime ? _this.$commonUtil.formatDate(e.startTime) : e.startTime
          e.endTime = e.endTime ? _this.$commonUtil.formatDate(e.endTime) : e.endTime
        })
        _this.tableData = data
        console.log(_this.tableData)
        // 如果有集成数据，新增导入按钮禁用
        for (var i = 0; i < _this.tableData.length; i++) {
          if (_this.tableData[i].dataStatus === '02') {
            _this.isDisabled = true
          }
        }
      })
    },
    // 删除
    deleteClick () {
      // 如果是集成记录，不能删除
      if (_this.choiceData[0].dataStatus === '02') {
        _this.$message.warning('集成记录，不能删除')
      } else {
        let deleteData = _this.$commonUtil.objectToDeleteIds(_this.choiceData, 'id')
        _this.$curdUtil.delete(_this, url.del, deleteData).then(_this.querySearch)
      }
    },
    // 查询条件重置事件
    resetQueryForm (formName) {
      _this.$refs[formName].resetFields()
    },
    // 选择数据事件
    handleCurrentChange (row) {
      _this.choiceData = row
      if (this.choiceData.length > 0) {
        for (let i = 0; i < this.choiceData.length; i++) {
          if (this.choiceData[i].dataSource === '02') {
            this.ifDisable = true
            return
          }
        }
        this.ifDisable = false
      }
    },
    // 新增
    insertClick () {
      _this.layerOpen('新增', require('./elePowerForInsert'), { selectData: _this.enum_data })
    },
    // 修改
    updateClick () {
      if (this.choiceData.length === 0) {
        this.$message.warning('请选择一条要修改的记录')
      } else if (this.choiceData.length !== 1) {
        this.$message.warning('只能同时修改一条记录')
      } else {
        let data = {
          insertForm: _this.choiceData[0],
          selectData: _this.enum_data,
          ifDisable: _this.ifDisable
        }
        _this.layerOpen('修改', require('./elePowerForUpdate'), data)
      }
    },
    // 双击打开详情
    detailClick (row) {
      let data = {
        insertForm: row,
        selectData: _this.enum_data
      }
      _this.layerOpen('电网企业详情', require('./elePowerForDetail'), data)
    },
    // 打开弹窗
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
    // 窗口关闭时间
    layerClose: function (res) {
      if (res) {
        _this.querySearch()
      }
    },
    // 导入
    importClick () {
      let config = {
        title: '导入文件',
        area: [500, 180],
        content: {
          content: require('../updataExcel').default,
          data: {
            importURL: url.import
          }
        },
        close: (res) => {
          if (res) {
            _this.querySearch()
          }
        }
      }
      this.$layer.iframe(config)
    },
    // 导出
    exportClick () {
      if (_this.choiceData.length > 0) {
        let tableHeader = ['电网公司编码', '电网公司名称', '电网公司简称', '市场成员类型', '统一社会信用代码', '法人代表', '注册地址', '注册资金',
          '开户银行', '开户名称', '银行账号', '银行联行号', '增值税率', '使用协议书编号', '电网公司类型', '上级单位名称', '地理区域', '控制区域',
          '生效时间', '失效时间', '对应供应商编码', '市场成员状态', '数据来源'
        ]
        let tableVal = ['memberCode', 'memberName', 'shortName', 'classTypeName', 'socialCode', 'legalRepre', 'address', 'reditMoney', 'acctBankName',
          'acctName', 'acctCode', 'acctLiaison', 'taxRate', 'agreementCode', 'memberTypeName', 'superiorUnitName', 'geogRegion', 'controlRegion',
          'startTime', 'endTime', 'supplierCode', 'memberStatusName', 'dataSourceName'
        ]
        _this.$curdUtil.exportChoiceData(_this, tableHeader, tableVal, '电网企业')
      } else {
        _this.$curdUtil.export(_this, _this.queryData, '电网企业.xls', url.export)
      }
    }
  }
}
</script>

<style scoped>

</style>
