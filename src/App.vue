<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Loading from "@/components/Loading/Loading";

export default {
  name: 'App',
  components: {Loading},
  computed: {
  },
  created() {
    this.resize(document, window)
  },
  methods: {
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
