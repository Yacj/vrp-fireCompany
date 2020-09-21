<template>
  <div id="leaderList">
    <navbar title="审核列表" left-text="返回" :left-show="true" class="navFixed"></navbar>
    <div class="wrapper margin-top-xll" v-if="leaderList.length > 0">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="load_more">
        <list :list="leaderList" @getData="goRouter"></list>
      </van-list>
      <refresh @click.native="test"></refresh>
    </div>
    <div class="emptyCenter" v-else>
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
import {homeService} from "@/api/home";
import {storage} from "@/utils/utils";

export default {
  name: "leaderList",
  components: {Refresh, BackTop, list, Navbar},
  data() {
    return {
      loading: false,
      finished: false,
      leaderList: [],
      pageNum: 1
    }
  },
  created() {
    const {deptId,deptName} = storage.get("userInfo")

    if (deptId === 27 || deptName.includes("科室") === true) {
      return this.$vAlert('', '此页面需主管权限才可进入').then(res => {
        this.$router.back()
      })
    }
  },
  mounted() {
    // console.log(this.$store.state.userInfo.uid)
    this.getList()
  },
  methods: {
    load_more() {
      let timer = setTimeout(() => {
        this.getList()
        this.pageNum++;
        this.finished && clearTimeout(timer)
      }, 100)
    },
    getList() {
      // this.$store.commit('showLoading')
      // this.$store.commit('hideLoading')
      let pageNum = this.pageNum
      let data = {
        pageNum
      }
      homeService.GetOrderCheck(data).then(res => {
        let content = res.data.content
        this.leaderList = content
        if (content.length === 0 || content.length <= 10) {
          this.finished = true
          return
        }
        this.leaderList.push(...content)
        this.loading = false
      })
    },
    goRouter(data) {
      let id = data.id
      let deptId = storage.get("userInfo").deptId
      if (deptId === 22 || deptId === 17) {
        this.$router.push({
          path: '/leaderReview',
          query: {id,deptId}
        })
      } else {
        this.$router.push({
          path: '/leaderAssigned',
          query: {id,deptId}
        })
      }
    },
    test() {
      this.getList()
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
      this.$toast('数据刷新成功')
    }
  }
}
</script>

<style scoped lang="scss">
</style>