<template>
  <div id="leaderReview">
    <navbar :title="title" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper margin-top" v-if="Review.time !== undefined">
      <van-cell-group :border="false">
        <van-cell title="用车事由：" :value="Review.account"/>
        <van-cell title="时间：" :value="Review.time"/>
        <van-cell title="目的地：" value="市外"/>
        <van-cell title="车辆：" value="5座以上"/>
        <van-cell title="车辆驾驶：" value="调派驾驶员"/>
        <div class="cu-form-group">
          <div class="title">备注 <i class="text-red">*</i></div>
        </div>
        <div class="textarea flex justify-center align-center">
          <van-field
              class="area"
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              placeholder="请输入留言"
              show-word-limit
          />
        </div>
        <div class="sure margin margin-top-xl" v-if="userAuth === 2">
          <van-checkbox v-model="checked">由主管领导审批</van-checkbox>
        </div>
      </van-cell-group>
      <transition name="fade">
        <div class="leader-name margin-lg box-shadow flex align-center" style="height:50px" v-if="checked === true">
         <span class="margin-left">
            上级领导：王虎
         </span>
        </div>
      </transition>
      <div class="button padding">
        <van-button type="primary"
                    size="large"
                    class="margin-bottom"
                    style="letter-spacing: 2px"
                    color="#4161FF"
                    round
                    @click="goRouter"
                    :disabled="isDisabled === false">
          审核通过
        </van-button>
        <van-button type="info" size="large" style="letter-spacing: 2px" plain hairline round>审核不通过</van-button>
      </div>
    </div>
    <div class="nodata margin-top-sm" v-else>
      <van-empty description="暂无审核信息"/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "leaderReview",
  components: {Navbar},
  data() {
    return {
      Review: {},
      title: '分管领导审核',
      userAuth: 2,
      message: '',
      checked: false,
    }
  },
  created() {
    let data = {
      account: '12',
      time: 1,
    }
    Object.assign(this.Review,data)
    console.log(this.Review.time)
  },
  methods: {
    goRouter() {
      this.$router.push({
        path: '/leaderAssigned'
      })
    }
  },
  computed: {
    isDisabled() {
      let userAuth = this.userAuth
      if (userAuth === 2) {
        return this.message !== '' && this.checked === true
      }
      return this.message !== ''
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell__value {
    color: #332D29;
  }
}

.wrapper {
  .area {
    width: 95%;
    box-shadow: 0 0 2.13333vw 0 rgba(3, 0, 0, 0.09);
    border-radius: 3.2vw;
    height: 40vw;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>