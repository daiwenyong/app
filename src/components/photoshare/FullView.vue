<template>
    <common-photo :commonphoto="fullView"></common-photo>
      <!--<div class="conList">-->
        <!--<ul>-->
          <!--<li v-for="(item) in fullView" :key="item.id">-->
            <!--<router-link :to="{name:'photo.details',query:{id:item.id,title:item.tip}}">-->
              <!--<div class="pic ">-->
                <!--<img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">-->
              <!--</div>-->
              <!--<div class="con ">-->
                <!--<h2 v-text="item.title"></h2>-->
              <!--</div>-->
            <!--</router-link>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
</template>

<script>
  import CommonPhoto from '../common/CommonPhoto'
    export default {
        data() {
            return {
              fullView:{},
            }
        },
        async created(){
          let result = await this.$axios.get(this.dataURL('vue.php','fullView'));
          this.fullView = result.data;
        },
        components:{
          CommonPhoto
        }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  ul li{
    padding: 25/@rem 0;
    border-bottom: 1px solid #ddd;
  }
  a{
    /*display: block !important;*/
    display: flex;
    justify-content: center;
  }
  .pic{
    width: 110/@rem;
    height: 110/@rem;
    margin-right: 25/@rem;
  }
  .con{
    width: 550/@rem;
    height: 110/@rem;

    display: flex;
    align-items: center;
  }
  h2{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #555;
    font-weight: normal;
    font-size: 25/@rem;
  }
  p{
    width: 100%;
    color: #999;
    font-size: 22/@rem;
  }
</style>
