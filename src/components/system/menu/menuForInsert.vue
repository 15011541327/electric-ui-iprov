<template>
  <div class="formWapper">

    <el-form :model="insertForm" :rules="insertFormRules" ref="insertForm" :inline="false" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="枚举编码:" prop="enumCode" >
            <el-input v-model="insertForm.enumCode" placeholder="枚举编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="枚举名称:" prop="enumName" >
            <el-input v-model="insertForm.enumName" placeholder="枚举名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" size="small" @click="doAddInsertRow">新建</el-button>
      <el-table ref="enumTableSelectData" :data="enumTableSelectData" border stripe height="250" style="width: 100%" show-overflow-tooltip>
        <!--枚举编码-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举编码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.code" ></el-input>
          </template>
        </el-table-column>
        <!--枚举名称-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" ></el-input>
          </template>
        </el-table-column>
        <!--枚举类型-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" placeholder="请选择">
              <el-option
                v-for="item in enumType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!--枚举描述-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举描述">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deta" ></el-input>
          </template>
        </el-table-column>
        <!--枚举父级别-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举父级">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pCode" ></el-input>
          </template>
        </el-table-column>
        <!--移除功能-->
        <el-table-column fixed="right" align="center" header-align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="enumDataOpation(scope)" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  提交按钮-->
      <div class="bottomBtn">
        <el-form-item>
          <el-button @click="layerClose">取消</el-button>
          <el-button type="primary" @click="insert('insertForm')">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
let _this = null
let url = {
  insert: 'dict/insert'
}
export default {
  name: 'menuForInsert',
  data () {
    return {
      insertForm: {
        enumCode: null,
        enumName: null
      },
      // 新增的数据
      enumTableSelectData: [],
      // 枚举类型
      enumType: [
        {
          value: '01',
          label: '单枚举'
        }, {
          value: '02',
          label: '多层级'
        }
      ],
      type: '',

      // 表单验证
      insertFormRules: {
      }
    }
  },
  // 页面初始化加载方法
  created: function () {
    _this = this
    // 初始化页面布局
    _this.$Utils.initStyleLayer(_this)
  },
  methods: {
    // 新增行
    doAddInsertRow: function () {
      this.enumTableSelectData.push({})
    },
    // 选择数据操作
    enumDataOpation: function (scope) {
      this.enumTableSelectData.splice(scope.$index, 1)
    },
    // 新增方法
    insert: function (formName) {
      this.$set(this.insertForm, 'items', this.enumTableSelectData)
      _this.$Utils.curd.save(_this, url.insert, _this.enumTableSelectData).then((res) => {
        _this.layerClose(true)
      })
    }
  }
}
</script>

<style scoped>
.formWapper{
  width: 100%;
  height: 100%;
}
  .bottomBtn{
    float: right;
    margin-right: 30px;
    margin-top: 30px;
  }
</style>
