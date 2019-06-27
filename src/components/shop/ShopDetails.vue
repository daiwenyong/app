<template>
  <div class="mb ">
    <head-nav title="商品详情"></head-nav>
    <div class="shopdedatils" v-if="newsDetails">
      <!--<img :src="newsDetails.imgUrl"  width="80%" >-->
      <img v-lazy="newsDetails.imgUrl"  width="80%" >
      <h3 v-text="newsDetails.des"></h3>
      <p class="money">
        <span class="symbol" v-text="newsDetails.symbol"></span>
        <span class="price" v-text="newsDetails.price"></span>
      </p>
      <p class="courier">快递：包邮 <span class="fr" v-text="newsDetails.alreadyPaid"></span></p>
      <div class="buyNum clearFix">
        <p class="fl buyfont">购买数量</p>
        <p class="addNum fr">
          <a href="javascript:;" class="reduce" @click="shopReduce">-</a>
          <a href="javascript:;" class="num">{{num}}</a>
          <!--<input type="number" min=0 v-model="num">-->
          <a href="javascript:;" class="add" @click="shopAdd">+</a>
        </p>
      </div>
      <div class="buy">
        <a href="javascript:;" class="addCart" @click="addCart">加入购物车</a>
        <router-link :to="{name:'shopcart'}" class="nowBuy" @click="nowBuy">立即购买</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
        data() {
            return {
              newsDetails:[],
              num:0,
              index:0
            }
        },
        async created(){
          let id = this.$route.query.id;
          let title = this.$route.query.title;
          let result = await this.$axios.get(this.dataURL('vue.php',title,id));
          this.newsDetails = result.data;
          //console.log(result.data);
        },
        methods:{
          shopReduce(){
            if(this.num>0){
              this.num--
            }
          },
          shopAdd(){
            this.num++;
          },
          addCart(){
              if(!localStorage.getItem('user')){
                alert('你还没有登陆');
                return;
              }
              let that = this;
              let name = JSON.parse(localStorage.getItem('user'));
              that.$jq.post('/api/addcart',{
                name,
                id:that.$route.query.id,
                num:that.num
              },function (result) {
                if(result.errno){
                  Toast('加入成功');
                  //this.$store.commit('changeNum',1)
                }else{
                  Toast('已经在购物车了');
                }
              })
            this.$store.commit('changeNum',1)
          },
          nowBuy(){},
        }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .shopdedatils{
    padding: 22/@rem;
    position: relative;
    text-align: left;
    background: white;
    img{
      display: block;
      margin: auto;
    }
    h3{
      font-size: 33/@rem;
    }
    .money{
      color: red;
      .symbol{
        font-size: 22/@rem;
      }
      .price{
        font-size: 32/@rem;
      }
    }
    .courier{
      font-size: 25/@rem;
      color: #999;
    }
    .buyNum{
      border: 1px solid #e7e7e7;
      border-left: none;
      border-right: none;

      padding: 20/@rem;
      .buyfont{
        font-size: 40/@rem;
      }
      .addNum{
        font-size: 40/@rem;
        a{
          width: 60/@rem;
          line-height: 60/@rem;
          background: #f1f1f1;
          display: inline-block;
          color: #878787;
          text-align: center;
        }
        a:active{
          background: #ddd;
        }
      }
    }
    .buy{
      display: flex;
      height: 96/@rem;
      text-align: center;
      line-height: 96/@rem;
      a{
        flex: 1;
        color: white;
        font-size: 31/@rem;
      }
      .addCart{
        background: #ff9402;
      }
      .nowBuy{
        background: #ff5000;
      }
    }
  }
</style>
