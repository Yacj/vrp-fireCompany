<template>
  <div id="leaderList">
    <navbar title="审核列表" left-text="返回" :left-show="true" class="navFixed"></navbar>
    <div class="wrapper margin-top-xll" v-if="leaderList.length > 0">
      <list :list="leaderList" @getData="goRouter"></list>
      <refresh @click.native="test"></refresh>
    </div>
    <div class="nodata margin-top-xll" v-else>
      <van-empty description="暂无审核信息"/>
    </div>

    <back-top></back-top>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import list from "@/components/List/List";
import BackTop from "@/components/floatButton/backTop";
import Refresh from "@/components/floatButton/refresh";

export default {
  name: "leaderList",
  components: {Refresh, BackTop, list, Navbar},
  data(){
    return{
      leaderList:[]
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      this.leaderList = [
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
        {
          order: 1212,
          people: '张三',
          review: '王虎',
          id: 23
        },
      ]
    },
    goRouter(data){
      this.$router.push({
        path:'/leaderReview'
      })
    },
    test(){
      console.log(this)
      this.getList()
      window.scrollTo(0, 0);
      this.$toast('刷新成功')
    }
  }
}
</script>

<style scoped lang="scss">

</style>