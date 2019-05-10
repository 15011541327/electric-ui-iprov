<template>
  <div>
    <hr/>
    <div style="margin: 40px 10px 5px 10px;height: 80px; overflow: scroll">
      <span style="font-size: 15px;">文本标签:</span>
      <input style="width: 240px;height: 25px;" type="text" placeholder="请选择文件……">
      <!--      <button style="position:relative;top:-1px;width: 60px;height: 28px;margin-left: -6px;" @click="handleUploadFile">浏览</button>-->
      <!--      <input ref="filElem" type="file" class="upload-file" @change="getFile">-->
      <el-upload
        class="upload-demo"
        ref="upload"
        multiple
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :on-change='fileChange'
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button class="uploadButton" slot="trigger" size="small" type="primary">浏览</el-button>
      </el-upload>
    </div>
    <hr/>
    <div class="el-dialog__footer">
      <el-button class="download" size="mini" @click="layerClose">下载模板</el-button>
      <el-button size="mini" @click="layerClose">取消</el-button>
      <el-button type="primary" size="mini" @click="uploadFile">确定</el-button>
    </div>
    <!--        <div>-->
    <!--          <el-button slot="trigger" size="small" type="primary">导出模板</el-button>-->
    <!--          <el-upload-->
    <!--            class="upload-demo"-->
    <!--            ref="upload"-->
    <!--            multiple-->
    <!--            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"-->
    <!--            :on-change = 'fileChange'-->
    <!--            :on-remove="handleRemove"-->
    <!--            :file-list="fileList"-->
    <!--            :auto-upload="false">-->
    <!--            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
    <!--            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>-->
    <!--          </el-upload>-->
    <!--        </div>-->

  </div>
</template>

<script>
let _this = null
export default {
  name: 'updataExcel',
  data: function () {
    return {
      props: {
        importURL: null
      },
      // 文件显示列表
      fileList: [],
      // 上传文件
      uploadSaveFile: []
    }
  },
  methods: {
    /**
       * 文件改变的时候 将file放到文件数组里并判断文件是否重复
       * @event */
    fileChange: function (file, fileList) {
      var a = 0
      fileList.forEach((item, idx) => {
        // 在此处，对比文件名，将文件名相同的对比次数累加，
        // 相同的文件名累加值为 2 时，说明文件名已经重复，直接删掉。
        if (file.name === item.name) {
          a++
          this.uploadSaveFile.push(file)
          if (a === 2) {
            this.$message({
              message: '文件名不能重复',
              type: 'info'
            })
            fileList.splice(idx, 1)
          }
        }
      })
    },
    /**
       * 移除文件
       * @event
       * */
    handleRemove: function (file) {
      for (var i = 0; i < _this.uploadSaveFile.length; i++) {
        if (_this.uploadSaveFile[i].name === file.name) {
          _this.uploadSaveFile.splice(i, 1)
        }
      }
    },
    /**
       * 上传文件
       * @event
       * */
    uploadFile: function () {
      let uploadSaveFile = this.uploadSaveFile
      let SaveFile = []
      if (uploadSaveFile.length) {
        for (var i = 0; i < uploadSaveFile.length; i++) {
          SaveFile.push(uploadSaveFile[i].raw)
        }
      } else {
        this.$message.error('请选择需要上传的文件')
      }
      let SaveFile1 = new FormData()
      SaveFile.forEach(function (file) {
        SaveFile1.append('file', file, file.name)
      })

      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      _this.$http
        .post(
          this.$commonUtil.getUrl(_this, this.props.importURL),
          SaveFile1,
          config
        )
        .then(res => {
          console.log(res)
          if (_this.$commonUtil.checkResultData(res)) {
            this.$Message.success('提交成功!')
            _this.layerClose(true)
          } else {
            this.$Message.error('server通知' + res.data.resultHint)
          }
        })
        .catch(err => {
          this.$Message.error('server通知' + err)
        })
    },
    layerClose: function () {
      this.uploadSaveFile = null
    }
  },
  created: function () {
    _this = this
    _this.gateway_url = _this.$Config.gateway_module.common
  }
}
</script>

<style scoped>
  .uploadButton {
    position: relative;
    top: -30px;
    left: 312px;
  }

  .download {
    float: left;
  }
</style>
