<template>
  <div :id="options.id" class="layer-home app-scss" :style="homeStyle" ref="layerHome">
    <div class="layer-top" @mousedown="moveStart" @mousemove="move" @mouseup="moveEnd">
      <span class="layer-title">{{options.title}}</span>
<!--      <span class="layer-opation">-->
<!--        <i class="minus" @click="layerSmall('close')">_</i>-->
<!--      </span>-->
<!--      <span class="layer-opation">-->
<!--        <i class="plus" @click="layerBig('close')"></i>-->
<!--      </span>-->
      <span class="layer-opation">
        <i class="close" @click="layerClose('close')"></i>
      </span>
    </div>
    <div
      style="box-sizing: border-box;background-color: #fff;height: 100%;width: 100%;overflow: auto; color: #333;"
      @mousemove="move"
      @mouseup="moveEnd"
    >
      <div :id="content_id" style="width:100%"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import helper from "../helper";
export default {
  name: "iframe_layer",
  data() {
    return {
      content_id: this.options.id + "_content",
      isMove: false,
      clientX: 0,
      clientY: 0,
      homeStyle: {
        zIndex: this.options.zIndex,
        visibility: "hidden"
      },
      copyHomeStyle:{},
      currentstyle:{
          left:"",
          top:"",
          width:"",
          height:""
      },

    };
  },
  props: { options: {} },
  async mounted() {
    // 添加内容
    this.getContent();
    // 初始化高和宽
    helper.getArea(this.homeStyle, this.options.area, this);
    // 计算初始位置
    this.initOffset();
    // 为遮罩层注册弹窗的移动事件
    if (this.options.shade) {
      document
        .getElementById(this.options.id + "_mask")
        .addEventListener("mousemove", event => {
          this.move(event);
        });
      document
        .getElementById(this.options.id + "_mask")
        .addEventListener("mouseup", event => {
          this.moveEnd(event);
        });
    }
    setTimeout(()=>{
        for(var p in this.homeStyle){
          this.copyHomeStyle[p]=this.homeStyle[p];
        }
    },500)

  },

  methods: {
      layerSmall(){
        for(var p in this.copyHomeStyle){
          if(this.copyHomeStyle[p]){
            this.homeStyle[p]=this.copyHomeStyle[p]
          }
        }
      },
    layerBig(){
        this.homeStyle.top="0px";
        this.homeStyle.left="0px";
        this.homeStyle.height="100%";
        this.homeStyle.width="100%"
    },
    // 初始化组件位置
    async initOffset() {
      let _this = this;
      helper.sleep(10).then(function() {
        helper.initOffset(
          _this.homeStyle,
          _this.options.offset,
          _this,
          document.getElementById(_this.options.id)
        );
      });
    },
    // 获取组件内容
    async getContent() {
      let _this = this;
      helper.sleep(10).then(function() {
        let propsData = helper.deepClone(_this.options.content.data);
        if (propsData == null) {
          propsData = {}
        }
        propsData.style = _this.homeStyle
        propsData.style.title = {}
        propsData.style.title.height = 42
        // console.log(propsData)
        let props = {
          props: propsData
        };
        let instance = new _this.options.content.Content({
          parent: _this.options.content.parent,
          data: props,
          methods: {
            layerClose: function(data) {
              let home = document.getElementById(_this.options.id);
              if (home != null) {
                document.body.removeChild(home);
              }
              let mask = document.getElementById(_this.options.id + "_mask");
              if (mask != null) {
                document.body.removeChild(mask);
              }
              try {
                if (_this.options.close != null) {
                  _this.options.close(data, _this.options.content.parent);
                }
              } catch (e) {
                console.log(e);
              }
            }
          }
        });
        instance.vm = instance.$mount();
        document.getElementById(_this.content_id).appendChild(instance.vm.$el);
      });
    },
    // 移动开始事件
    moveStart() {
      this.isMove = true;
      this.clientX = event.clientX;
      this.clientY = event.clientY;
    },
    // 移动事件
    move(event) {
      if (this.isMove) {
        helper.move(this.homeStyle, event, this);
      }
    },
    // 移动结束事件
    moveEnd() {
      this.isMove = false;
    },
    // 关闭事件
    layerClose(data) {
      this.options.layer.close(
        this.options.id,
        data,
        this.options.content.parent
      );
    },
  //  提交事件
    submit(){
        console.log(this.options)
    }
  }
};
</script>

<style scoped>
.minus {
  border-radius: 15px;
  line-height: 40px;
  text-align: center;
  font-size: 22px;
  padding: 8px;
  margin-right: 60px;
}
.minus:hover {
  color: red;
  cursor: auto;
}
.plus {
  border-radius: 15px;
  line-height: 40px;
  text-align: center;
  font-size: 22px;
  padding: 8px;
  margin-right: 30px;
}
.plus::before {
  content: "\2610";
}
.plus:hover {
  color: red;
  cursor: auto;
}
.close {
  border-radius: 15px;
  line-height: 40px;
  text-align: center;
  font-size: 22px;
  padding: 8px;
  font-style: normal;
}
.close::before {
  content: "\2715";
}
.close:hover {
  color: red;
  cursor: auto;
}
.layer-title{
  color: #00827B;
  font-weight: bold;
}

</style>
