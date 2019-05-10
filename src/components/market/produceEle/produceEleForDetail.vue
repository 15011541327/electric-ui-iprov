<template>
  <div style="padding: 10px">
    <el-form :model="insertForm" ref="insertForm" :inline="false" label-position="right" label-width="170px" :disabled="true">
      <el-row>
        <el-col :span="12">
          <el-form-item label="发电企业编码：" prop="memberCode">
            <el-input v-model="insertForm.memberCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="隶属集团名称：" prop="companyId">
            <el-select clearable v-model="insertForm.companyId" placeholder="">
              <el-option v-for="item in props.selectData.COMPANY_ID" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发电企业名称：" prop="memberName">
            <el-input v-model="insertForm.memberName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级单位：" prop="superiorUnit">
            <el-input v-model="insertForm.superiorUnitName">
              <el-button slot="append" icon="el-icon-more"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发电企业简称：" prop="shortName">
            <el-input v-model="insertForm.shortName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电能类型：" prop="memberType">
            <el-select clearable v-model="insertForm.memberType" placeholder="">
              <el-option v-for="item in props.selectData.MEMBER_TYPE_FDLX" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="市场成员类型：" required prop="classType">
            <el-select clearable v-model="insertForm.classType" placeholder="" :disabled="true">
              <el-option v-for="item in props.selectData.CLASS_TYPE" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电厂性质：" prop="powerPlantType">
            <el-select clearable v-model="insertForm.powerPlantType" placeholder="">
              <el-option v-for="item in props.selectData.POWER_PLANT_TYPE" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码：" prop="socialCode">
            <el-input v-model="insertForm.socialCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设计库容量：" prop="storageCapacity">
            <el-input v-model="insertForm.storageCapacity">
              <template slot="append">万立方米</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人代表：" prop="legalRepre">
            <el-input v-model="insertForm.legalRepre"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总装机容量：" prop="installCapacity">
            <el-input v-model="insertForm.installCapacity">
              <template slot="append">千千瓦</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册地址：" prop="address">
            <el-input v-model="insertForm.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地理区域：" prop="geogRegion">
            <el-input v-model="insertForm.geogRegion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册资金：" prop="reditMoney">
            <el-input v-model="insertForm.reditMoney">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="控制区域：" prop="controlRegion">
            <el-input v-model="insertForm.controlRegion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开户银行：" prop="acctBankName">
            <el-input v-model="insertForm.acctBankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购(售)电层级：" prop="buyLevel">
            <el-select clearable v-model="insertForm.buyLevel" placeholder="">
              <el-option v-for="item in props.selectData.BUY_LEVEL" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开户名称：" prop="acctName">
            <el-input v-model="insertForm.acctName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购(售)电结算单位：" prop="settleCompanyId">
            <el-input v-model="insertForm.settleCompanyId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="银行账号：" prop="acctCode">
            <el-input v-model="insertForm.acctCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效时间：" prop="startTime">
            <el-date-picker v-model="insertForm.startTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" validate-event></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="银行联行号：" prop="acctLiaison">
            <el-input v-model="insertForm.acctLiaison"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="失效时间：" prop="endTime">
            <el-date-picker v-model="insertForm.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" validate-event></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="增值税率：" prop="taxRate">
            <el-input v-model="insertForm.taxRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对应供应商编码：" prop="supplierCode">
            <el-input v-model="insertForm.supplierCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用协议书编号：" prop="agreementCode">
            <el-input v-model="insertForm.agreementCode">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="市场成员状态：" prop="memberStatus">
            <el-select clearable v-model="insertForm.memberStatus" placeholder="">
              <el-option v-for="item in props.selectData.MEMBER_STATUS" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
let _this = null
export default {
  name: 'produceEleForDetail',
  data: function () {
    return {
      props: {
        insertForm: null,
        selectData: null
      },
      insertForm: null,
      selectData: null
    }
  },
  created: function () {
    _this = this
    _this.insertForm = _this.$commonUtil.deepClone(_this.props.insertForm)
    _this.selectData = _this.$commonUtil.deepClone(_this.props.selectData)
  }
}
</script>

<style scoped>

</style>
