<template>
    <div class="shopcar" >
      <!--<div v-show="shopArr" style="padding:20px">购物车空空如也</div>-->
      <div ref="wrapper" class="wrap">
        <div class="seller-wrapper">
          <ul>
            <li v-for="(item,index) in shopArr">
              <input type="checkbox" v-model="item.isSelected" @change="changeOne">
              <img :src="item.imgUrl" alt="">
              <div class="detail">
                <p>{{item.des}}</p>
                <span>￥{{item.price*item.amount}}</span>
                <div class="remove">
                  <input type="number" min="1" style="width:.5rem" value="1" v-model="item.amount">
                  <span class="remove-item" @click="remove(index)">删除</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>
        <div class="bottom-sum">
          <input type="checkbox" id="sum" @change="changeAll" v-model="checkAll">
          <label for="sum">全选</label>
          <span class="sum">合计：￥{{sum}}</span>
          <div class="settle">去结算({{selectNum}})</div>
        </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { MessageBox } from 'mint-ui';
  export default {
        data() {
            return {
              shopArr:[],
              checkAll:false,
            }
        },
        created(){
          if(localStorage.getItem('user')){
            this.getShopcar();
          }

        },
        methods:{
          getShopcar(){
            let that = this;
            let name = JSON.parse(localStorage.getItem('user'));
            that.$jq.post('/api/shopcar',{name},function (data) {
              //console.log(data);
              // that.shopArr = data;
              data.forEach(car=>{
                that.$axios.get(that.dataURL('vue.php','likeYou',car)).then(res=>{
                 // console.log();
                  res.data.amount = 1;
                  res.data.isSelected = false;
                  that.shopArr.push(res.data)
                })
              })
            })
          },
          changeAll(){
            this.shopArr.forEach(v=>{
              v.isSelected = this.checkAll
            })
          },
          changeOne(){
            this.checkAll = this.shopArr.every(v=>{
              return v.isSelected==true
            })
          },
          remove(index){
          //  MessageBox.confirm('确定删除购物车?').then(action => {
             // if(action){
                let that = this;
                that.shopArr.splice(index,1);
                let id = that.shopArr[index]['id'];
                console.log(that.shopArr,index,id);
                let name = JSON.parse(localStorage.getItem('user'));
                that.$jq.post('/api/removecar',{name,id},function (data) {
                  
                })
              //}
           // });
          }
        },
        mounted(){
         this.$nextTick(()=> {
          this.scroll = new BScroll(this.$refs.wrapper,{click:true})
          })
         //  this.$nextTick(() => {
         //    //$refs绑定元素
         //    if(!this.scroll){
         //      this.scroll = new BScroll(this.$refs.wrapper, {
         //        //开启点击事件 默认为false
         //        click:true
         //      })
         //      // console.log(this.scroll)
         //    }else if(!this.$refs.wrapper){
         //      return
         //    }
         //    else{
         //      this.scroll.refresh();
         //
         //    }
         //  })
        },
        computed:{
          sum(){
            return this.shopArr.reduce((pre,cur)=>{
              return  pre+(cur.isSelected?+cur.price*cur.amount:0)
            },0)
          },
          selectNum(){
            return this.shopArr.filter(v=>{
              return v.isSelected==true
            }).length
          }
        }


     }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .shopcar {
    font-size: 16/@rem;
    height: 14.1rem;
    .wrap{
      position:fixed;
      top:1.03rem;
      bottom:2.63rem;
      left: 0;
      right: 0;
      width: 100%;
      height: 14.1rem;
      overflow: hidden;
    }
    .seller-wrapper{
      height:auto
    }
    li{
      display: flex;
      padding: 15/@rem;
      align-items: center;
      height:150/@rem;
      img{
        display: block;
        width:150/@rem;
        padding:0 15/@rem;
        height:100%
      };
      .detail{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .remove{
          display: flex;
          justify-content: space-between;
          .remove-item{
            border:1px solid #ccc;
            background-color: #df5000;
            padding:10/@rem;
            border-radius:10/@rem;
            color:#fff;
          }
        }
      }
    }

    .bottom-sum {
      position: fixed;
      padding: 0 10/@rem;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      bottom: 1.33rem;
      line-height: 100/@rem;
      background-color: #ccc;
      .sum {
        font-size: 20/@rem;
        flex: 1;
        padding-left: 20/@rem;
      }
      .settle {
        color: #fff;
        background-color: red;
        width: 150/@rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80/@rem;
        border-radius: 40/@rem
        //float:right;

      }
    }
  }
</style>
