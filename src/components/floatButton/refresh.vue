<template>
  <div id="refresh">
    <div class="refresh">
      <van-icon name="replay" class="icon"
                @click="refresh"
                :class = "{refreshRe: isRotate}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "refresh",
  data() {
    return {
      isRotate: false
    }
  },
  methods: {
    refresh() {
      this.isRotate = true;
      setTimeout(()=> {
        this.isRotate = false;
      }, 1100)
    },
  },
}
</script>

<style scoped lang="scss">
.refresh {
  position: fixed;
  right: 15px;
  bottom: 110px;
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
    bottom:1.5px;
  }
}
.refreshRe {
  -webkit-animation: rotate 1.2s linear infinite; /*Safari and Chrome*/
}
@keyframes rotate {
  0%{
    transform:rotate(0deg);
    -ms-transform:rotate(0deg);     /* IE 9 */
    -moz-transform:rotate(0deg);    /* Firefox */
    -o-transform:rotate(0deg);
  }
  100% {
    transform:rotate(360deg);
    -ms-transform:rotate(360deg);   /* IE 9 */
    -moz-transform:rotate(360deg);  /* Firefox */
    -o-transform:rotate(360deg);
  }
}

</style>