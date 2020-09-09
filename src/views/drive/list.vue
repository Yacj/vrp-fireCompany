<template>
  <div id="list">
    <navbar title="车辆列表" left-text="返回" :left-show="true" class="navFixed"></navbar>
    <div class="wrapper margin-top-xll">
      <div class="list" v-for="(item,index) in DriveList" :key="index" @click="goPages(item.id)">
        <div class="top padding flex align-center van-hairline--bottom">
          <div class="img">
            <img src="../../assets/img/Application-1.png" alt="">
          </div>
          <div class="text">
            单据号：{{item.document}}
          </div>
        </div>
        <div class="bottom padding flex">
          <div class="img">
            <img src="../../assets/img/Application-2.png" alt="">
          </div>
          <div class="text">
            <p>车辆驾驶员：{{item.carPeople === "" ? '自行驾驶' : item.carPeople}}</p>
            <p>车辆牌照：{{item.carName}}</p>
            <p>车辆座位：{{item.carSeats}}</p>
          </div>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </div>
</template>

<script>
import {DriverServe} from "@/api/Driver";
import Navbar from "@/components/Navbar/Navbar";
import BackTop from "@/components/floatButton/backTop";

export default {
  name: "list",
  components: {BackTop, Navbar},
  data() {
    return {
      DriveList: []
    }
  },
  created() {
    this.queryId = this.$route.query.id
  },
  mounted() {
    this.getDriveList()
  },
  methods: {
    async getDriveList() {
      this.$toast({
        type:'loading',
        message:'加载中....',
        mask:true
      })
      await DriverServe.getDriverUserApply({
        carPeopleId: 9
      }).then(res => {
        this.$toast.clear()
        this.DriveList = res.data
      })
    },
    goPages(id) {
      let queryId = +this.queryId
      switch (queryId) {
        case 1:
          this.$router.push({
            path: '/drive/maintain',
            query: {id}
          })
          break;
        case 2:
          this.$router.push({
            path: '/drive/fuel',
            query: {id}
          })
          break;
        case 3:
          this.$router.push({
            path: '/drive/other',
            query: {id}
          })
          break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  margin: (31px/2);
  height: 100%;
  background: #fff;
  box-shadow: 0 6px 21px 0 rgba(65, 97, 255, 0.17);
  border-radius: 10px;

  .top {
    .img {
      img {
        width: 25px;
      }
    }

    .text {
      margin-left: 25px;
      font-size: (34px/2);
    }
  }

  .bottom {
    .img {
      img {
        width: 25px;
      }
    }

    .text {
      font-size: (34px/2);
      margin: -8px 0 0 25px;

      p {
        line-height: 36px;
      }
    }

    .time {
      margin-top: 5px;
      font-size: (28px/2);
    }
  }
}
</style>