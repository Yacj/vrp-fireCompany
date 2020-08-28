<template>
  <div id="login">
    <div class="header bg-blue">
      <div class="title">
        公务用车调度平台
      </div>
      <div class="bg flex justify-center align-center">
        <img src="../../../src/assets/img/login-bg.png" alt="">
      </div>
    </div>
    <div class="wrapper">
      <div class="login-form">
        <van-cell-group :border="false">
          <van-field v-model="phone" type="number" label="" left-icon="iconfont icon-phone" placeholder="请输入手机号码">
          <template slot="left-icon">
            <i class="iconfont icon-phone text-xl"></i>
          </template>
          </van-field>
          <van-field v-model="password" :type="passwordType"   placeholder="请输入8-16位密码" maxlength="16">
            <template slot="left-icon">
              <i class="iconfont icon-passwd text-xl"></i>
            </template>
            <van-icon slot="right-icon" @click="showPassword" :name="passwordIcon"/>
          </van-field>
          <div class="text-gray text-df tips">
            *该系统仅供内部员工使用
          </div>
        </van-cell-group>
      </div>
      <div class="login-btn">
        <van-button type="primary"
                    size="large"
                    class="btn"
                    color="#4161FF"
                    round
                    :disabled="isLogin === false"
                    :hairline="true"
                    @click="Login">
          登录
        </van-button>
        <div class="no-register text-lg text-center text-gray">
          <router-link to="register">
            没有账号？  立即注册  >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import {isPhone, isPossWord} from "@/utils/validation";
import {Notify} from 'vant'
export default {
  name: "login",
  components: {Navbar},
  data(){
    return{
      phone:'',
      password:'',
      passwordType: 'password',
    }
  },
  created() {
  },
  methods:{
    showPassword(){
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    Login(){
      let phone = this.phone
      let password = this.password
      if(!isPhone(phone)){
        return Notify('手机号有误，请重新输入')
      }
      if(!isPossWord(password)){
        return  Notify('密码不符合规范，请重新输入')
      }
    }
  },
  computed:{
    isLogin() {
      return this.phone !== "" && this.password !== ""
    },
    passwordIcon(){
      return this.passwordType === 'password' ? 'closed-eye' : 'eye'
    },
  }
}
</script>

<style scoped lang="scss">
#login{
  .header{
    position: relative;
    overflow-y: hidden;
    padding: 40px 20px 50px;
    .title{
      font-size:22px;
      letter-spacing: 2px;
      text-align: center;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .bg{
      width: 100%;
      height: auto;
      margin: 35px 0 25px 0;
      img{
        width: 200px;
      }
    }
  }
  .wrapper{
    top: -25px;
    background: #fff;
    display: block;
    padding: 30px 15px 0;
    position: relative;
    border-radius: 30px 30px 0 0;
    .login-form{
      margin: 10px;
      .tips{
        margin: 15px 0 0 20px;
      }
    }
    .login-btn{
      margin-top: 30px;
      .btn{
        font-size:18px;
        letter-spacing: 5px;
      }
      .no-register{
        margin-top: 20px;
      }
    }
  }
}
</style>