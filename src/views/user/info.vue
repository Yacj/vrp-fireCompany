<template>
  <div id="info">
    <navbar title="其他" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper margin-top">
      <van-cell-group :border="false">
        <van-cell title="微信号" value="15555555"/>
        <van-cell title="微信号" value="15555555"/>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="primary" size="large" class="margin-bottom" style="letter-spacing: 2px" color="#4161FF" round>
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "info",
  components: {Navbar}
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
    left:5%;
  }
}
</style>