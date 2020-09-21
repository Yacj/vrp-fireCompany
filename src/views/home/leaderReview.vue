<template>
  <div id="leaderReview">
    <navbar :title="title" :left-show="true" left-text="返回" class="navFixed"></navbar>
    <div class="wrapper margin-top-xll">
      <van-cell-group :border="false">
        <van-cell title="申请人：" :value="Review.createBy"/>
        <van-cell title="随行人：" :value="Review.entourage"/>
        <van-cell title="时间：" :value="Review.createTime"/>
        <van-cell title="目的地：" :value="Review.destination"/>
        <van-cell title="车辆座位：" :value="Review.carSeats"/>
        <van-cell title="车辆驾驶：" :value="Review.carDriving"/>
        <div class="cu-form-group">
          <div class="title">备注</div>
        </div>
        <div class="textarea flex justify-center align-center">
          <van-field
              class="area"
              v-model="Review.remarks"
              rows="2"
              autosize
              type="textarea"
              placeholder="请输入留言"
              show-word-limit
              disabled
          />
        </div>
        <div class="sure margin margin-top-xl" v-if="deptId === 22">
          <van-checkbox v-model="checked">由主官领导审批</van-checkbox>
        </div>
      </van-cell-group>
      <transition name="fade">
        <div class="leader-name margin-lg box-shadow flex align-center" style="height:85px" v-if="checked === true">
         <span class="margin-left" style="width: 100%">
         上级领导:<van-radio-group v-model="radio" direction="horizontal">
            <template v-for="(item,index) in LeaderList">
                           <van-radio :name="index+1" @click="selectLeader(item)">{{item.username}}</van-radio>
            </template>
           </van-radio-group>
         </span>
        </div>
      </transition>
    </div>
    <div class="button padding">
      <van-button
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
    <!--    <div class="nodata margin-top-sm" v-else>-->
    <!--      <van-empty description="暂无审核信息"/>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import {homeService} from "@/api/home";
import {storage} from "@/utils/utils";

export default {
  name: "leaderReview",
  components: {Navbar},
  data() {
    return {
      Review: {},
      title: '',
      message: '',
      checked: false,
      LeaderList: [],
      id: 0,
      deptId: 0,
      radio: 1
    }
  },
  created() {
    let {id, deptId} = this.$route.query
    this.id = +id
    this.deptId = +deptId

    this.title = this.deptId === 22 ? '分管领导审核' : '主官领导审核'

    this.getList()
    this.getLeader()

  },
  methods: {
    async getList() {
      let id = this.id
      await homeService.GetOrderCheckList({id}).then(res => {
        this.Review = res.data[0]
      })
    },
    async getLeader() {
      await homeService.GetDirectorLeader().then(res => {
        this.LeaderList = res.data
        const {id, username, name} = this.LeaderList[0]
        this.chargeLeaderId = id
        this.directorLeaderPhone = name
        this.chargeLeaderName = username
      })
    },
    goRouter() {
      if(this.deptId === 17){
        this.DirectorLeaderCheck()
        return
      }
      this.checked === true ? this.ChargeLeaderCheck() : this.DirectorLeaderCheck()
    },
    selectLeader(e) {
      const {id, username, name} = e
      this.chargeLeaderId = id
      this.directorLeaderPhone = name
      this.chargeLeaderName = username
    },
    ChargeLeaderCheck() {
      const id = this.id
      const directorLeaderIs = this.checked === true ? 1 : ''
      const data = {
        id,
        chargeLeaderId: this.chargeLeaderId,
        chargeLeaderName: this.chargeLeaderName,
        directorLeaderPhone: this.directorLeaderPhone,
        chargeLeaderStatus: "通过",
        createBy: this.Review.createBy,
        directorLeaderIs
      }
      console.log(data)
      homeService.ChargeLeaderCheck(data).then(res => {
        let code = res.code
        let text = this.checked === true ? '提交成功,已提交给主官领导审批' : '审核成功'

        if (code !== 200) {
          return this.$vConfirm('', `提交失败 ${res.msg}`).then(res => {
          })
        }
        this.$vConfirm('', text, '取消', '返回审核列表').then(res => {
          this.$router.back()
        }).catch(error => {
        })
      })
    },
    DirectorLeaderCheck() {
      const directorLeaderIs = this.checked === true ? 1 : ''
      const id = this.id
      const {username: directorLeaderName, uid: directorLeaderId} = storage.get('userInfo');

      let data = {
        id,
        directorLeaderId,
        directorLeaderName,
        directorLeaderStatus: "通过",
        directorLeaderIs
      }
      console.log(data)
      homeService.DirectorLeaderCheck(data).then(res => {
        let code = res.code
        if (code !== 200) {
          return this.$vConfirm('', `审核失败 ${res.msg}`).then(res => {
          })
        }
        this.$vConfirm('', '审核成功', '取消', '返回审核列表').then(res => {
          this.$router.back()
        }).catch(error => {
        })
      })
    }
  },
  computed: {
    isDisabled() {
      // let userAuth = this.userAuth
      // if (userAuth === 2) {
      //   this.checked === true
      // }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell__value {
    color: #332D29;
  }

  .van-field__control:disabled {
    color: #000000;
  }

  .van-radio {
    height: 50px;
  }
}

#leaderReview {
  height: 100vh;

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
}
</style>