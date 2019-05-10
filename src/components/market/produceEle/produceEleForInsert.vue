<template>
  <div>
    <div :style="this.mainStyle">
      <el-form :model="insertForm" :rules="insertFormRules" ref="insertForm" :inline="false" label-position="right" label-width="170px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="发电企业编码：" prop="memberCode">
              <el-input v-model="insertForm.memberCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隶属集团名称：" prop="companyId">
              <el-select clearable v-model="insertForm.companyId" placeholder="请选择">
                <el-option v-for="item in props.selectData.COMPANY_ID" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发电企业名称：" prop="memberName">
              <el-input v-model="insertForm.memberName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级单位：" prop="superiorUnit">
              <el-select clearable v-model="insertForm.superiorUnit" collapse-tags  placeholder="请选择" filterable remote reserve-keyword @focus="remoteSaleMember" :remote-method="remoteSaleMember" style="width: 194px;float:left">
                <el-option v-for="item in selectSaleData" :key="item.id" :label="item.memberName" :value="item.id"></el-option>
              </el-select>
              <el-button icon="el-icon-more" @click="memberFocus"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发电企业简称：" prop="shortName">
              <el-input v-model="insertForm.shortName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电能类型：" prop="memberType">
              <el-select clearable v-model="insertForm.memberType" placeholder="请选择">
                <el-option v-for="item in props.selectData.MEMBER_TYPE_FDLX" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="市场成员类型：" required prop="classType">
              <el-select clearable v-model="insertForm.classType" placeholder="请选择" :disabled="true">
                <el-option v-for="item in props.selectData.CLASS_TYPE" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电厂性质：" prop="powerPlantType">
              <el-select clearable v-model="insertForm.powerPlantType" placeholder="请选择">
                <el-option v-for="item in props.selectData.POWER_PLANT_TYPE" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码：" prop="socialCode">
              <el-input v-model="insertForm.socialCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设计库容量：" prop="storageCapacity">
              <el-input v-model="insertForm.storageCapacity" placeholder="请输入">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人代表：" prop="legalRepre">
              <el-input v-model="insertForm.legalRepre" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总装机容量：" prop="installCapacity">
              <el-input v-model="insertForm.installCapacity" placeholder="请输入">
                <template slot="append">千千瓦</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地址：" prop="address">
              <el-input v-model="insertForm.address" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地理区域：" prop="geogRegion">
              <el-input v-model="insertForm.geogRegion" clearable @focus="areaFocus('geo')" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册资金：" prop="reditMoney">
              <el-input v-model="insertForm.reditMoney" placeholder="请输入">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="控制区域：" prop="controlRegion">
              <el-input v-model="insertForm.controlRegion" clearable @focus="areaFocus('con')" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户银行：" prop="acctBankName">
              <el-input v-model="insertForm.acctBankName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购(售)电层级：" prop="buyLevel">
              <el-select clearable v-model="insertForm.buyLevel" placeholder="请选择">
                <el-option v-for="item in props.selectData.BUY_LEVEL" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户名称：" prop="acctName">
              <el-input v-model="insertForm.acctName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购(售)电结算单位：" prop="settleCompanyId">
              <el-input v-model="insertForm.settleCompanyId" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行账号：" prop="acctCode">
              <el-input v-model="insertForm.acctCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效时间：" prop="startTime">
              <el-date-picker :picker-options="pickerOptionsStart" v-model="insertForm.startTime" placeholder="请输入" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" validate-event></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行联行号：" prop="acctLiaison">
              <el-input v-model="insertForm.acctLiaison" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效时间：" prop="endTime">
              <el-date-picker :picker-options="pickerOptionsEnd" v-model="insertForm.endTime" placeholder="请输入" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" validate-event></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="增值税率：" prop="taxRate">
              <el-input v-model="insertForm.taxRate" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对应供应商编码：" prop="supplierCode">
              <el-input v-model="insertForm.supplierCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用协议书编号：" prop="agreementCode">
              <el-input v-model="insertForm.agreementCode" placeholder="请输入">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市场成员状态：" prop="memberStatus">
              <el-select clearable v-model="insertForm.memberStatus" placeholder="请选择">
                <el-option v-for="item in props.selectData.MEMBER_STATUS" :key="item.enumItemCode" :label="item.enumItemName" :value="item.enumItemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div :style=this.btnStyle>
      <el-button @click="layerClose">取消</el-button>
      <el-button type="primary" @click="insert('insertForm')">确定</el-button>
    </div>
  </div>
</template>

<script>
let _this = null
let insertUrl = 'marketmember/save'
let selectUrl = {
  query: 'marketmember/query',
  queryPower: 'marketmember/query'
}
export default {
  name: 'produceEleForInsert',
  data () {
    return {
      props: {
        selectData: null
      },
      queryData: {
        memberCode: null, // 枚举code
        memberId: null, // 市场成员id
        socialCode: null, // 社会信用编码
        classType: '01' // 市场成员类型默认01：发电企业
      },
      memberCodeData: [],
      insertForm: {
        memberCode: null, // 发电企业编码
        companyId: null, // 隶属集团名称
        memberName: null, // 发电企业名称
        superiorUnit: null, // 上级单位
        superiorUnitName: null, // 上级单位
        shortName: null, // 发电企业简称
        memberType: null, // 电能类型
        classType: '01', // 市场成员类型
        powerPlantType: null, // 电厂性质
        socialCode: null, // 统一社会信用代码
        storageCapacity: null, // 设计库容量
        legalRepre: null, // 法人代表
        installCapacity: null, // 总装机容量
        address: null, // 注册地址
        geogRegion: null, // 地理区域
        reditMoney: null, // 注册资金
        controlRegion: null, // 控制区域
        controlRegionName: null, // 控制区域
        acctBankName: null, // 开户银行
        buyLevel: null, // 购(售)电层级
        acctName: null, // 开户名称
        settleCompanyId: null, // 购售电结算单位
        acctCode: null, // 银行帐号
        startTime: null, // 生效时间
        acctLiaison: null, // 银行联行号
        endTime: null, // 失效时间
        taxRate: null, // 增值税率
        memberStatus: '01', // 成员状态
        agreementCode: null, // 使用协议书编号
        supplierCode: null, // 对应供应商编码
        dataSource: '01'
      }, // 表单数据
      insertFormRules: {
        memberCode: [
          { required: true, message: '请输入发电企业编码', trigger: ['blur', 'change'] },
          {validator: this.$valid.checkChar(), type: 'numberLetterSign', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ],
        agreementCode: [
          {validator: this.$valid.checkChar(), type: 'numberLetterSign', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ],
        memberName: [
          { required: true, message: '发电企业名称', trigger: ['blur', 'change'] },
          {validator: this.$valid.checkChar(), type: 'chineseAndLetter', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 100, trigger: ['blur', 'change']}
        ],
        shortName: [
          {validator: this.$valid.checkChar(), type: 'chineseAndLetter', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 20, trigger: ['blur', 'change']}
        ],
        socialCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: ['blur', 'change'] },
          {validator: this.$valid.checkChar(), type: 'numberAndLetter', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 18, trigger: ['blur', 'change']}
        ],
        storageCapacity: [
          {validator: this.$valid.checkChar(), type: 'number', max: 20, dec: 4, trigger: ['blur', 'change']}
        ],
        legalRepre: [
          {validator: this.$valid.checkChar(), type: 'chineseAndLetter', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ],
        installCapacity: [
          {validator: this.$valid.checkChar(), type: 'number', trigger: 'blur'}
        ],
        address: [
          {validator: this.$valid.blackList(), trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 200, trigger: ['blur', 'change']}
        ],
        geogRegion: [
          {validator: this.$valid.blackList(), trigger: ['blur', 'change']}
        ],
        reditMoney: [
          {validator: this.$valid.checkChar(), type: 'number', max: 20, dec: 2, trigger: ['blur', 'change']}
        ],
        controlRegion: [
          {validator: this.$valid.blackList(), trigger: ['blur', 'change']}
        ],
        acctBankName: [
          {validator: this.$valid.checkChar(), type: 'chinese', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 100, trigger: ['blur', 'change']}
        ],
        acctName: [
          {validator: this.$valid.checkChar(), type: 'chineseAndLetter', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 100, trigger: ['blur', 'change']}
        ],
        settleCompanyId: [
          {validator: this.$valid.checkChar(), type: 'chineseAndLetter', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 100, trigger: ['blur', 'change']}
        ],
        acctCode: [
          {validator: this.$valid.checkChar(), type: 'int', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ],
        acctLiaison: [
          {validator: this.$valid.checkChar(), type: 'numberLetterSign', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ],
        taxRate: [
          {validator: this.$valid.checkChar(), type: 'int', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 2, trigger: ['blur', 'change']}
        ],
        supplierCode: [
          {validator: this.$valid.checkChar(), type: 'numberLetterSign', trigger: ['blur', 'change']},
          {validator: this.$valid.length(), min: 0, max: 50, trigger: ['blur', 'change']}
        ]
      }, // 表单验证数据
      selectSaleData: [], // 上级单位
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.insertForm.endTime
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.insertForm.startTime
          if (beginDateVal) {
            if (new Date(beginDateVal).getTime() < new Date().getTime()) {
              return (
                time.getTime() < new Date().getTime()
              )
            } else {
              return (
                time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              )
            }
          }
        }
      } // 结束时间限制
    }
  },
  methods: {
    // 上级单位弹窗事件
    memberFocus: function () {
      _this.$layer.iframe({
        title: '请选择上级单位',
        area: [750, 430],
        content: {
          content: require('@/components/market/marketForSelect').default,
          parent: this,
          data: {classType: '01', classTypeDisabled: true}
        },
        close: function (obj) {
          _this.selectSaleData = [obj]
          _this.insertForm.superiorUnit = obj.id
          _this.insertForm.superiorUnitName = obj.memberName
        }
      })
    },
    areaFocus: function (str) {
      _this.$layer.iframe({
        title: '请选择区域',
        area: [750, 430],
        content: {
          content: require('../areaSelect').default,
          parent: this,
          data: {}
        },
        close: function (obj) {
          if(str === 'con'){
            _this.insertForm.controlRegion = obj.enumName
          } else if(str === 'geo') {
            _this.insertForm.geogRegion = obj.enumName
          }
        }
      })
    },
    // 查询上级单位
    remoteSaleMember (query) {
      if (!(typeof (query) === 'string')) { query = null }
      _this.$commonUtil.execCheckFunction(_this, 'queryData', function () {
        _this.queryPowerField = {}
        _this.queryPowerField.memberName = query || null
        _this.queryPowerField.classType = '01'
        _this.gateway_url = _this.$Config.gateway_module.common
        _this.$curdUtil.query(_this, selectUrl.queryPower, _this.$commonUtil.objectToQueryData(_this.queryPowerField), '').then((res) => { _this.selectSaleData = res.data.resultValue.items })
      })
    },
    // 保存数据
    insert: function (formName) {
      // 如果发电企业编码重复，不能保存
      let data = _this.$commonUtil.objectToQueryData(_this.queryData)
      _this.$curdUtil.query(_this, selectUrl.query, data, '').then((res) => {
        let data = res.data.resultValue.items
        _this.memberCodeData = []
        for (var i = 0; i < data.length; i++) {
          _this.memberCodeData.push(data[i].memberCode)
        }
        if (_this.memberCodeData.indexOf(_this.insertForm.memberCode) !== -1) {
          _this.$message.warning('发电企业编码重复，请检查')
        } else {
          _this.$curdUtil.saveOrUpdate(_this, insertUrl, this.insertForm, formName).then((res) => {
            _this.layerClose(true)
          })
        }
      })
    }
  },
  created: function () {
    _this = this
    // 添加网关
    _this.gateway_url = _this.$Config.gateway_module.common
    // 初始化页面布局
    _this.$commonUtil.initStyleLayer(_this)
  }
}
</script>

<style>
  .formWapper {
    padding: 20px 40px 0px 15px;
  }
  .formWapper .el-form-item--small.el-form-item {
    margin-bottom: 13px;
  }
  .bottomBtn {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .bottomBtn .el-form-item__content{
    margin-left: 0!important;
    text-align: center!important;
  }

</style>
