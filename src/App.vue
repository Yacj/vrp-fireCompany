<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name:'App',
    created() {
      this.resize(document,window)
    },
    methods:{
      resize(doc, win) {
        var docE1 = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                  var clientWidth = docE1.clientWidth;
                  if (!clientWidth) return;
                  //docE1.style.fontSize = clientWidth / 375  + 'px'; 这里希望设置 1rem = 1px，实验证明，这样做 会导致 html 的 fontsize小于 12px
                  docE1.style.fontSize = (clientWidth / (375 * 2)) * 100 + 'px'; //乘以100的意义是，1为了不受fontsize小于12的影响，2为了计算方便；
                };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      },
    }
  }
</script>
<style lang="scss">

</style>
