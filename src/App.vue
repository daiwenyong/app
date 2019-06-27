<template>

  <div id="app">
    <header></header>
    <header class="fixed">davion的第一个app开发</header>

    <!--<keep-alive>-->
      <router-view></router-view>
    <!--</keep-alive>-->

  <!--//  <footer></footer>-->
    <footer>
      <router-link class="link on" :to="{name:'index'}">
        <div class="svg iconfont icon-shouye"></div>
        <p>首页</p>
      </router-link>
      <router-link class="link"  :to="{name:'map'}">
        <div class="svg iconfont icon-ditu"></div>
        <p>地图</p>
      </router-link>
      <router-link class="link"  :to="{name:'weather'}">
        <div class="svg iconfont icon-tianqichaxun"></div>
        <p>天气</p>
      </router-link>
      <router-link class="link"  :to="{name:'shopcar'}">
        <div class="svg iconfont icon-gouwuche count">
          <i class="showNum" v-if="pickNum">{{this.$store.state.num}}</i>
        </div>
        <p>购物车</p>
      </router-link>
      <router-link class="link" :to="{name:'my'}">
        <div class="svg iconfont icon-weibiaoti2fuzhi12"></div>
        <p>我的</p>
      </router-link>
    </footer>
  </div>
</template>

<script>
  //import $ from 'jquery'


  export default {
  data(){
    return {
      title:'',
      pickNum:this.$store.state.num
    }
  },
  name: 'App',
  async created(){

    function remChange() {
      var html = document.documentElement;
      var width = html.getBoundingClientRect().width;
      if(width>=750){
        width = 750
      }
      html.style.fontSize = width/10+'px'
    };
    window.addEventListener('resize',remChange);
    remChange();

   // let homeTitle = await this.$axios.get(this.dataURL('vue.php','vueTitle'));
    //this.title = homeTitle.data;


    this.addClass()
    },

  methods:{
    //下标加类名
    addClass(){
      let that = this;
      //console.log(that.$jq('footer a'));
      that.$jq('footer a').click(function () {
        that.$jq(this).addClass('on').siblings().removeClass('on')
      })
    }
  }
}
</script>

<style scoped lang="less">
  @rem:750/10rem;
#app {
  header{
    height: 80/@rem;
    line-height: 80/@rem;
    font-size: 30/@rem;
    color: white!important;
    background: #26a2ff;
    text-align: center;
  }
  header.fixed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    z-index: 999;
  }
}
footer{
  display: flex;
  height: 100/@rem;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index:2;
  background-color: #fff;
  }
  .count{
    position: relative;
  }
  .count .showNum{
    position: absolute;
    margin: auto;
    width: 40/@rem;
    height: 40/@rem;
    line-height: 40/@rem;
    background: red;
    color: #fff;
    font-size: 12/@rem;
    border-radius: 50%;
    text-align: center;
    font-style: normal;
  }
  .link{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:#18b4ed;
    .svg{
      font-size: 44/@rem;
    }
  }
  .on{
    color:red;
  }
  p{
    color: inherit;
    font-size: 24/@rem;
    padding-top: 10/@rem
  }
  icon{
    width: 1rem;
    height: 1rem;
  }


</style>
