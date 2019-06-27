<template>
    <el-amap id="mapcointainer" style="height: 600px;"></el-amap>

</template>

<script>
  import Vue from 'vue'
  import {lazyAmapApiLoaderInstanse} from 'vue-amap';
    export default {
        data() {
            return {
            }
        },
      created(){
          //Vue.set(this.arr,1,6)

      },
      mounted() {
        this.map = new AMap.Map('mapcointainer', {
          resizeEnable:true,
          zoom:11,
          center:[116.397428,39.90923]
        })
      }
    }
</script>

<style scoped lang="less">
  .map{
    height: 100%;
  }
</style>
