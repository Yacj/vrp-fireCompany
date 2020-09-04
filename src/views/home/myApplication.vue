<template>
  <div id="myApplication">
    <navbar title="我的申请" :left-show="true" left-text="返回" class="navFixed"></navbar>
    <div class="wrapper margin-top-xll" v-if="applicationList.length > 0">
      <list :list="applicationList"></list>
      <refresh @click.native="reFresh"></refresh>
    </div>
    <div class="emptyCenter" v-else>
      <van-empty description="暂无申请信息"/>
    </div>
    <back-top></back-top>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import BackTop from "@/components/floatButton/backTop";
import List from "@/components/List/List";
import Refresh from "@/components/floatButton/refresh";
import {homeService} from "@/api/home";
import {storage} from "@/utils/utils";

export default {
  name: "myApplication",
  components: {Refresh, List, BackTop, Navbar},
  data() {
    return {
      applicationList: []
    }
  },
  created() {
  },
  mounted() {
    this.getApplyList()
  },
  methods: {
    getApplyList() {
      this.$toast({
        message: '加载中..',
        type: 'loading'
      })
      let data = {
        createId: storage.get("userInfo").uid
      }
      homeService.getUserApply(data).then(res => {
        this.applicationList = res.data
        this.$toast.clear()
      })
    },
    reFresh() {
      this.getApplyList()
    }
  }
}
</script>

<style scoped lang="scss">
#myApplication {
}
</style>