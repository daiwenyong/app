<template>
    <div class="mb">
      <!--<head-nav title="图文分享"></head-nav>-->
      <header>
        <router-link  :to="{path:'/'}" class="iconfont icon-fanhui2">
          返回
        </router-link>
        <span>图文分享</span>
        <a href="javascript:;" class="iconfont icon-diandian"></a>
      </header>

      <div class="starList">
        <router-link :to="{name:item.tip}"
                     href="javascript:;"
                     v-for="item in starList"
                     class='starNav'
                     :key="item.id"
                     :class="item.id==1?'on':''">{{item.title}}
        </router-link>
      </div>
      <div class="imgList">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <!--<div class="conList" :class="'show'" v-show="isShow">-->
          <!--<ul>-->
            <!--<li v-for="(item) in womanStar" :key="item.id">-->
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

      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              isShow:true,
              starList:[],
              womanStar:{},
              manStar:{},
              fullView:{},
            }
        },
        async created(){
          let starList = await this.$axios.get(this.dataURL('vue.php','shareNav'));
          this.starList =  starList.data;
          console.log(this.starList);
          this.$nextTick(this.changeStar)
         // this.changeStar()
          this.getImgs('womanStar')
          this.getImgs('manStar')
          this.getImgs('fullView')
        },
        methods:{
          async getImgs(title){
            let result = await this.$axios.get(this.dataURL('vue.php',title));
            this[title] = result.data;
          },
          changeStar(){
            let that = this;
            that.$jq('.starList a').click(function () {
              //console.log(this);this==>a
              that.$jq(this).addClass('on').siblings().removeClass('on');

            })
          }
        }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{}
  header{
    height: 80/@rem;
    background: #3c3f41;
    color: white !important;
    font-size: 35/@rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 2px;
    text-align: center;
    a{

      width: 2rem;
      color: white !important;

    }
  }
    .starList{
      display: flex;
      font-size:20px;
      a{
        flex:1;
        color: #26a2ff;
        padding: 30/@rem 0;
        text-align: center;
      }
      a.on{
        border-bottom:.05rem solid #26a2ff;
        color:#000
      }
    }




</style>
