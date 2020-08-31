<template>
  <div id="info">
    <navbar title="其他" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper margin-top">
      <van-cell-group :border="false">
        <van-cell title="手机号码" :value="phone"/>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="primary" size="large" class="margin-bottom" style="letter-spacing: 2px" color="#4161FF" round
                  @click="outUser">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import {storage} from "@/utils/utils";

export default {
  name: "info",
  components: {Navbar},
  data() {
    return {
      phone: ''
    }
  },
  created() {
    let {phone} = storage.get('userInfo')
    this.phone = phone
  },
  methods: {
    outUser() {
      this.$vConfirm('提示', '您确定要退出账户么', '', '确认').then(res => {
        storage.remove('userInfo')
        this.$toast.success('退出成功')
        this.$router.back()
      }).catch(err => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
#info {
  height: 100vh;
  background-color: #f1f1f1;

  .btn {
    position: absolute;
    bottom: 50px;
    width: 90%;
    left: 5%;
  }
}
</style>