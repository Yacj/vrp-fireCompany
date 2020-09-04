<template>
  <div id="app">
    <Loading v-show="LOADING"></Loading>
    <router-view/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Loading from "@/components/Loading/Loading";

export default {
  name: 'App',
  components: {Loading},
  computed: {
    ...mapState([
      'LOADING'
    ])
  },
  created() {
    this.resize(document, window)
    const dataA = [
      {cid: 125, name: 'y1'},
      {cid: 845, name: 'y2'},
      {cid: 956, name: 'y3'},
      {cid: 634, name: 'y4'},
    ]
    const dataB = [
      {uid: 984, name: 'x1'},
      {uid: 9634, name: 'x2'},
      {uid: 6574, name: 'x3'},
      {uid: 39764, name: 'x4'},
      {uid: 3164, name: 'x5'},
      {uid: 7421, name: 'x6'},
    ]
    const dataC = [
      {id: 1245, cid: 125, uid: 984},
      {id: 1237, cid: 845, uid: 3164}
    ]
    const CrossData = dataA.map(iA => {
      return [iA.name, ...dataB.map(iB => {
        let c = dataC.find(iC => iC.cid === iA.cid && iC.uid === iB.uid)
        return {
          cid: iA.cid, uid: iB.uid, id: c && c.id, exist: !!c
        }
      })]
    })
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
