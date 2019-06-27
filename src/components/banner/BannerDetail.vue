<template>
    <div class="banner">
      <head-nav title="banner详情"></head-nav>
      <div class="con">
        <h2 class="title" v-text="bannerDetails.title"></h2>
        <span class="source">{{bannerDetails.source}}</span>
        <span class="time" v-text="bannerDetails.time"></span>
        <img :src="bannerDetails.picUrl" alt="" class="pic">
        <div class="content" v-html="bannerDetails.des"></div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              bannerDetails:{}
            }
        },
        created(){
          this.$axios.get(this.dataURL('vue.php','banner',this.$route.params.id)).then(res=>{
            this.bannerDetails = res.data;
          })
        }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .banner{
    margin-bottom: 130/@rem;
  }
  .con{
    padding: 0 40/@rem;

  h2{
    text-align: left;
  }
  .title{
    font-size: 40/@rem;
    color: #3f4146;
  }
  .source{
    font-size: 24/@rem;
  }
  .time{
    font-size: 20/@rem;
  }
  .pic{
    display: block;
    margin: auto;
    width: 670/@rem;
  }
  .content{
    font-size: 32/@rem;
    text-align: left;
    text-indent: 2em;
  }

  }
</style>
