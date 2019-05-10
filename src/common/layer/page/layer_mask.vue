<template>
  <div :id="id + '_mask'" class="layer_mask" :style="maskStyle"></div>

</template>
<script>
export default {
  name: 'layer_mask',
  data () {
    return {
      id: '',
      maskStyle: {
        zIndex: this.getLayerMaskIndex()
      }
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .layer_mask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    filter: alpha(opacity = 20);
    opacity: 0.2;
  }
</style>
