<template>
    <div class="">
      <form action="" v-show="!user">
       <mt-field label="用户名" placeholder="请输入用户名" v-model="name"></mt-field>
       <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="loginReg">
          <div @click="login">登陆</div>
          <div @click="register">注册</div>
        </div>
      </form>
      <div v-show="user">
        <p>{{user}}已登陆</p>
        <div @click="exit" class="exit">退出登陆</div>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
              name:'',
              password:'',
              user:JSON.parse(localStorage.getItem('user'))||''
            }
        },
        created(){

        },
        methods:{
          register(){
            let that = this;
            that.$jq.post('/api/register',{
              name:that.name,
              password:that.password
            },function (result) {
              if(result.errno){
                //alert('已经被注册了')
                Toast('已经被注册了');
              }else{
                Toast('注册成功');
              }
            })
          },
          login(){
            let that = this;
            that.$jq.post('/api/login',{
              name:that.name,
              password:that.password
            },function (result) {
              if(!result.errno){
                //alert('已经被注册了')
                Toast('没有注册');
              }else{
                Toast('登陆成功');
                localStorage.setItem('user',JSON.stringify(that.name));
                window.location.reload()
              }
            })
          },
          exit(){
            this.user = ''
            localStorage.setItem('user','')
          }
        }
    }
</script>

<style scoped lang="less">
.loginReg{
  display: flex;
  div{
    flex: 1;
    text-align: center;
  }
}
.exit{
  font-size: 16px;
  border:1px solid #ccc
}
</style>
