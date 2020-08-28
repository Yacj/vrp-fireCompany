<template>
  <div id="Navbar">
    <van-nav-bar
        :title="title"
        :left-arrow="leftShow"
        :left-text="leftText"
        @click-left="clickLeft">
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: {
      type: String
    },
    leftShow: {
      type: Boolean,
      default: false
    },
    leftText: {
      default: ''
    }
  },
  methods: {
    clickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-nav-bar {
    background: #4161FF;
    color: #fff !important;
    border-bottom: none !important;
  }

  .van-nav-bar__text {
    color: #fff;
  }

  .van-hairline--bottom::after {
    border: none;
  }

  .van-icon {
    color: #fff !important;
  }

  .van-nav-bar__title {
    color: #fff !important;
  }
}

</style>