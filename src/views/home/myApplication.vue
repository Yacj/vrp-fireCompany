<template>
  <div id="myApplication">
    <navbar title="我的申请" :left-show="true" left-text="返回" class="navFixed"></navbar>
    <div class="wrapper margin-top-xll" v-if="applicationList.length > 0">
      <list :list="applicationList"></list>
      <refresh @click.native="test"></refresh>
    </div>
    <div v-else>
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

export default {
  name: "myApplication",
  components: {Refresh, List, BackTop, Navbar},
  data() {
    return {
      applicationList: [
        {
          order: 1212,
          people: '张三',
          review: '王虎'
        }
      ]
    }
  },
  methods: {
    test(){
      console.log("23")
    }
  }
}
</script>

<style scoped lang="scss">
#myApplication {
}
</style>