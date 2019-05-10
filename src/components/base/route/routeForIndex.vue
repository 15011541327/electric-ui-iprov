<template>
  <div>
    <!--查询-->
    <div class=" queryDiv ">
      <el-form :inline="true" ref="queryData" :rules="insertFormRules" :model="queryData" label-width="114px">
        <el-form-item label="路径名称：" prop="name">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="路径编码："  prop="code">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="querySearch">查询</el-button>
          <el-button type="text" @click="resetQueryForm('queryData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--控制按钮-->
    <div>
      <el-button type="text" @click="insertClick"><i class="fa fa-plus"></i>新增</el-button>
      <el-button type="text" @click="updateClick"><i class="fa fa-plus"></i>修改</el-button>
      <el-button type="text" @click="deleteClick"><i class="fa fa-plus"></i>删除</el-button>
      <el-button type="text" @click="importClick"><i class="fa fa-plus"></i>导入</el-button>
      <el-button type="text" @click="exportClick"><i class="fa fa-plus"></i>导出</el-button>
      <span style="float: right;font-size: 12px;">单位：元/千千瓦时</span>
    </div>
    <!--列表-->
    <div>
      <el-table :data="tableData" ref="userTable" border stripe show-overflow-tooltip style="width: 100%" :height="tableHeight" @selection-change="handleCurrentChange">
        <el-table-column type="selection"  width="35"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="routeCode" label="路径编码" align="center"></el-table-column>
        <el-table-column prop="routeName" label="路径名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="outOrganCode" label="送出机构编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="outOrganName" label="送出机构名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="inOrganCode" label="受入机构编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="inOrganName" label="受入机构名称" show-overflow-tooltip align="center"></el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination background small :page-sizes="page.pageSizeOption"
                     :page-size="page.pageSize" :pager-count="5"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.total" @current-change="pageChange"
                     @size-change="pageSizeChange" style="text-align: right;margin-top:20px;">

      </el-pagination>
    </div>
  </div>

</template>

<script>
  let url={
    query: 'dict/query',
    delete: 'dict/rm/',
    export: 'marketmember/export',
    import: 'marketmember/import'
  };
  let _this = this;
  export default {
    name: 'routeForIndex',
    data(){
      return{
        insertFormRules:[],
        // 查询数据
        queryData:{
          name:'',
          code:''
        },
        // 数据监测
        insertFormRules: {
          name: [
            {validator: this.$valid.blackList(), trigger: ['blur', 'change']},
            {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
          ]
        },
        // 表格数据
        tableData: [],
        // 表格的高度
        tableHeight: window.innerHeight - 257,
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
    methods:{
      // 查询数据
      querySearch(queryData){
        this.$Utils.curd.query(this, url.query, this.query).then(v => {
          _this.$Utils.mountedTable(_this, v, 'tableData')
        })
      },
      // 查询条件重置
      resetQueryForm: function (formName) {
        _this.$refs[formName].resetFields()
      },
      //打开新增页面
      insertClick(){
        _this.layerOpen('新增通道', require('./routeForInsert'))
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
        };
        _this.$layer.iframe(config)
      },
      // 窗口关闭
      layerClose: function (data) {
        _this.queryTableData()
      },
      //修改
      updateClick(){

      },
      //删除
      deleteClick(){

      },
      //导入
      importClick(){

      },
      //导出
      exportClick(){

      }
    }
  }
</script>

<style scoped>

</style>
