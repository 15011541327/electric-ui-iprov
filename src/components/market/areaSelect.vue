<template>
  <div>
  <el-tree :data="enumDataTree" node-key="enumCode" :props="tree_props" @node-click="nodeTree" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let _this = null
export default {
  name: 'areaSelect',
  data () {
    return {
      tree_props: {
        label: 'enumName',
        children: 'trees'
      },
      enumDataTree: [],
      area: {}
    }
  },
  created: function () {
    _this = this
    _this.tree_code = '33000'
    // 添加网关
    _this.gateway_url = _this.$Config.gateway_module.common
    this.$curdUtil.queryClassTree(this).then(res => {
      _this.enumDataTree = res
    }).catch(err => {
      console.log(err)
    })
    // 初始化页面布局
    this.$commonUtil.initStyleLayer(this)
  },
  methods: {
    nodeTree: function (node) {
      this.area = node
      this.layerClose(this.area)
    }
  }
}
</script>

<style scoped>

</style>
