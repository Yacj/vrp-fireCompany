<template>
  <div id="register">
    <div class="header bg-white">
      <div class="title text-black">
        注册
      </div>
    </div>
    <div class="wrapper">
      <div class="register-form">
        <van-cell-group :border="false">
          <van-field v-model="phone" type="number" label="" left-icon="iconfont icon-phone" placeholder="请输入手机号码">
            <template slot="left-icon">
              <i class="iconfont icon-phone text-xl"></i>
            </template>
          </van-field>
          <van-field
              v-model="code"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
          >
            <van-button slot="button"
                        size="small"
                        type="primary"
                        color="#1989fa"
                        :disabled="sendCodeDis"
                        @click="sendCode"
            >{{sendBtnText}}
            </van-button>
          </van-field>
          <van-field v-model="password" :type="passwordType" placeholder="请输入8-16位密码" maxlength="16">
            <template slot="left-icon">
              <i class="iconfont icon-passwd text-xl"></i>
            </template>
            <van-icon slot="right-icon" @click="showPassword" :name="passwordIcon"/>
          </van-field>
        </van-cell-group>
      </div>
      <div class="register-btn">
        <van-button type="primary"
                    size="large"
                    class="btn"
                    color="#4161FF"
                    round
                    :disabled="isLogin === false"
                    :hairline="true"
                    @click="Register">
          注册账户
        </van-button>
        <div class="tips text-gray text-center  text-lg">
          <router-link to="login">
            已有账户返回登录 >
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isPhone} from "@/utils/validation";
import {Notify} from 'vant'

export default {
  name: "register",
  data() {
    return {
      phone: '',
      password: '',
      code: '',
      passwordType: 'password',
      sendBtnText: "发送验证码",
      sendCodeDis: false,
    }
  },
  computed: {
    isLogin() {
      return this.phone !== "" && this.code !== "" && this.password !== ""
    },
    passwordIcon() {
      return this.passwordType === 'password' ? 'closed-eye' : 'eye'
    },
  },
  mounted() {
  },
  methods: {
    showPassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    sendCode() {
      let phone = this.phone
      if (phone === '' || !isPhone(phone)) {
        return Notify('手机号有误，请重新输入')
      }
      let ss = 60;
      this.sendBtnText = ss + 's';
      this.sendCodeDis = true;
      let timer = setInterval(() => {
        ss = ss - 1;
        this.sendBtnText = ss + 's'
        if (this.sendBtnText === '0s') {
          clearInterval(timer)
          this.sendBtnText = "发送验证码"
          this.sendCodeDis = false
        }
      }, 1000);
    },
    Register() {
    }
  }
}
</script>

<style scoped lang="scss">
#register {
  .header {
    position: relative;
    overflow-y: hidden;
    padding: 40px 20px 30px;

    .title {
      font-size: 22px;
      letter-spacing: 2px;
      text-align: center;
      font-weight: 400;
    }
  }

  .wrapper {
    margin: 15px;

    .register-btn {
      margin-top: 30px;

      .btn {
        font-size: 18px;
        letter-spacing: 5px;
      }

      .no-register {
        margin-top: 20px;
      }
    }

    .tips {
      bottom: 40vw;
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>