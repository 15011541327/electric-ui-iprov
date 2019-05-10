<template>
  <div>
    <!--查询条件-->
    <div ref="queryDiv" class="searchDiv">
      <el-form :inline="true" ref="queryData" :model="queryData" label-width="55px">
        <el-form-item label="编码：" prop="aisleCode">
          <el-input v-model="queryData.memberCode" style="width: 120px;" @keyup.enter.native="querySearch" placeholder="成员编码"></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="memberName">
          <el-input v-model="queryData.memberName" style="width: 120px;" @keyup.enter.native="querySearch" placeholder="成员名称"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="classType">
          <el-select clearable v-model="queryData.classType" style="width: 120px;" placeholder="全部" :disabled="disabled.classTypeDisabled">
            <el-option v-for="item in enum_data.CLASS_TYPE" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="querySearch">查询</el-button>
          <el-button type="primary" @click="confirmData">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表数据-->
    <el-table :data="tableData" ref="marketTable" :height="tableHeights" row-key="memberCode" border stripe  style="width: 100%;overflow: auto" :show-overflow-tooltip="!props.multiple" :highlight-current-row="!props.multiple" @selection-change="selectionChange" @current-change="currentTableChange" @row-dblclick="rowDblclick">
      <el-table-column v-if="props.multiple" type="selection" reserve-selection prop="memberCode"  fixed="left" width="40"></el-table-column>
      <el-table-column prop="memberCode" show-overflow-tooltip label="市场成员编码"></el-table-column>
      <el-table-column prop="memberName" show-overflow-tooltip label="市场成员名称"></el-table-column>
      <el-table-column prop="shortName" show-overflow-tooltip label="简称"></el-table-column>
      <el-table-column prop="classTypeName" show-overflow-tooltip label="市场成员类型"></el-table-column>
    </el-table>
    <el-pagination background small :page-sizes="page.pageSizes" :page-size="page.pageSize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="page.total" @current-change="currentChange" @size-change="sizeChange" style="position: absolute;bottom: -20;right: 0; "></el-pagination>
  </div>
</template>

<script>
let _this = null
let url = {
  query: 'marketmember/query'
}
export default {
  name: 'marketIndex',
  data () {
    return {
      enum_code: 'CLASS_TYPE:classType',
      enum_data: [],
      queryData: {
        memberName: null, // 实诚成员名称
        memberCode: null, // 市场成员编码
        classType: null // 市场成员类型
      },
      props: {
        size: null, // 默认每业显示条数
        select: null, // 已经选择的数据集合
        multiple: false, // 是否多选 默认单选
        classType: null, // 市场成员类型
        classTypeDisabled: false // 是否锁定市场成员类型
      },
      disabled: {
        classTypeDisabled: false
      },
      tableData: [],
      currentRow: [],
      tableHeights: null
    }
  },
  created: function () {
    _this = this
    // 添加网关
    _this.gateway_url = _this.$Config.gateway_module.common
    _this.queryData.classType = _this.props.classType
    _this.disabled.classTypeDisabled = _this.props.classTypeDisabled
    // 页面自定义
    let size = _this.props.size == null ? 10 : _this.props.size
    _this.page = {total: 0, pageSize: size, currentPage: 1, pageSizes: [size, 20, 50, 100]}
    // 初始页面数据
    _this.$commonUtil.init(_this, _this.querySearch)
    this.tableHeights = parseInt(this.props.style.height) - 70
    // 已选择的数据
    _this.currentRow = _this.props.select
  },
  // 模板渲染完成以后的处理
  mounted: function () {
    if (_this.props.multiple && _this.currentRow != null) {
      _this.currentRow.forEach((v) => {
        _this.$refs.marketTable.toggleRowSelection(v, true)
      })
    }
  },
  methods: {
    // 查询
    querySearch: function () {
      _this.$commonUtil.execCheckFunction(_this, 'queryData', function () {
        // 组装查询条件
        let data = _this.$commonUtil.objectToQueryData(_this.queryData)
        _this.$curdUtil.query(_this, url.query, data, 'createTime=desc').then((res) => {
          let data = res.data.resultValue.items
          _this.tableData = data
          if (!_this.props.multiple) {
            // 单选
            _this.$refs.marketTable.setCurrentRow(_this.currentRow)
          }
        })
      })
    },
    // 双击事件
    rowDblclick: function (row) {
      if (this.props.multiple) {
        return
      }
      this.currentRow = row
      this.layerClose(this.currentRow)
    },
    // 选择数据事件(多选)
    selectionChange: function (row) {
      if (!this.props.multiple) {
        return
      }
      this.currentRow = row
    },
    // 选择数据事件(单选)
    currentTableChange: function (row) {
      if (this.props.multiple || row == null) {
        return
      }
      this.currentRow = this.$commonUtil.deepClone(row)
    },
    //  确认数据
    confirmData: function () {
      if (this.currentRow == null || this.currentRow.length === 0) {
        this.$message.info('请选择数据后确认')
      } else {
        this.layerClose(this.currentRow)
      }
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 120px;
  }
  .el-select {
    width: 120px;
  }
</style>
