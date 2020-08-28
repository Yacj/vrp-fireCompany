<template>
  <div id="backTop">
    <div class="goTop" v-show="goTopShow" @click="goTop">
      <van-icon name="back-top" class="icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {
      scrollTop: "",
      goTopShow: false
    };
  },
  watch: {
    scrollTop(val) {
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    }
  },
  methods: {
    handleScroll() {
      this.scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      }
    },
    goTop() {
      let timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let isSpeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed
        this.goTopShow = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<style scoped lang="scss">
.goTop {
  position: fixed;
  right: 15px;
  bottom: 60px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.12);

  .icon {
    font-size: 22px;
    color: rgba(51, 153, 255, 0.8);
    margin-right: -1px;

  }
}
</style>