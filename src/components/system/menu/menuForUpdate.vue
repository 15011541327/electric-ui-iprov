<template>
  <div class="formWapper">
    <el-form  ref="insertForm" :inline="false" label-position="right" label-width="100px">
      <el-table ref="enumTableSelectData" :data="enumTableSelectData" border stripe height="250" style="width: 100%" show-overflow-tooltip>
        <!--枚举编码-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举编码">
          <template slot-scope="scope">
            <el-input  v-model="scope.row.code" disabled></el-input>
          </template>
        </el-table-column>
        <!--枚举名称-->
        <el-table-column prop="enumItemName" align="center" header-align="center" label="枚举名称">
          <template slot-scope="scope">
            <el-input  v-model="scope.row.name" ></el-input>
          </template>
        </el-table-column>
        <!--枚举类型-->
        <el-table-column  align="center" header-align="center" label="枚举类型">
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
        <el-table-column  align="center" header-align="center" label="枚举描述">
          <template slot-scope="scope">
            <el-input prop="deta" v-model="scope.row.deta" ></el-input>
          </template>
        </el-table-column>
        <!--枚举父级别-->
        <el-table-column  align="center" header-align="center" label="枚举父级">
          <template slot-scope="scope">
            <el-input   v-model="scope.row.pCode" ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <!--      提交按钮-->
      <div class="bottomBtn">
        <el-form-item>
          <el-button @click="layerClose">取消</el-button>
          <el-button type="primary" @click="update">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
let _this = null
let url = {
  update: 'dict/update'
}
export default {
  name: 'menuForUpdate',
  data () {
    return {
      enumTableSelectData: [],
      oldData: [],
      enumType: [
        {
          value: '01',
          label: '单枚举'
        }, {
          value: '02',
          label: '多层级'
        }
      ]
    }
  },
  methods: {
    update: function () {
      // 修改前后数据对比 需要传递修改唯一标识符号
      let data = _this.$Utils.doObjectContrast(_this.oldData, _this.enumTableSelectData, 'code')
      _this.$Utils.curd.update(_this, url.update, data).then((res) => {
        _this.layerClose(true)
      })
    }
  },
  created () {
    _this = this
    let data = _this.props.oldData
    _this.enumTableSelectData = data
    for (let i = 0; i < data.length; i++) {
      let oldData = {}
      for (let propName in data[i]) {
        oldData[propName] = data[i][propName]
      }
      _this.oldData.push(oldData)
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
  }
</style>
