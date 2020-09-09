<template>
  <div id="leaderAssigned">
    <navbar title="车管领导分配" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper">
      <div class="header bg-gray flex align-center">
        <span class="left flex-1 margin-left text-df ">
          单据号：{{Review.document}}
        </span>
        <span class="right margin-right text-green text-df ">
          {{Review.chargeLeaderStatus === '通过' ? Review.chargeLeaderStatus : "待审核"}}
        </span>
      </div>
      <div class="cell">
        <van-cell-group>
          <van-cell title="申请人：" :value="Review.createBy"></van-cell>
          <van-cell title="随行人：" :value="Review.entourage"></van-cell>
          <van-cell title="用车座位" :value="Review.carSeats"></van-cell>
          <van-cell title="目的地：" :value="Review.destination"></van-cell>
          <van-cell title="申请时间：" :value="Review.createTime"></van-cell>
        </van-cell-group>
        <div class="divHeight"></div>
        <select-from title="指派车辆"
                     label="选择车辆"
                     :name="carName"
                     :columns="catList"
                     v-model="carName"
                     @getMessage="onCar">
        </select-from>
        <select-from title="指派驾驶员"
                     label="选择驾驶员"
                     :columns="DriverList"
                     :name="driverVal"
                     v-model="driverVal"
                     @getMessage="onDriver">
        </select-from>
        <div class="button padding margin-top-xl">
          <van-button type="primary" size="large" style="letter-spacing: 2px" color="#4161FF" round @click="Post">
            确定
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import SelectFrom from "@/components/select/selectFrom";
import {homeService} from "@/api/home";
import {storage} from "@/utils/utils";

export default {
  name: "leaderAssigned",
  components: {SelectFrom, Navbar},
  data() {
    return {
      Review: {},
      catList: [],
      DriverList: [],
      carName: '',
      driverVal: '',
    }
  },
  created() {
    let {id, deptId} = this.$route.query
    this.id = +id
    this.deptId = +deptId

    this.chargeLeaderId = storage.get("userInfo").uid
    this.chargeLeaderName = storage.get('wxInfo').name

    this.getList()
    this.getCar()

  },
  methods: {
    async getList() {
      let id = this.id
      await homeService.GetOrderCheckList({id}).then(res => {
        this.Review = res.data[0]
        let {carId, carName, carDriving, carPeopleId, carPeople} = this.Review
        this.carId = carId
        this.carName = carName
        this.carDriving = carDriving
        this.carPeopleId = carPeopleId
        this.carPeople = carPeople
        this.driverVal = this.carPeople === null ? '自行驾驶' : this.carPeople
      })
    },
    async getCar() {
      await homeService.getCar().then(res => {
        let data = res.data[1]
        data.push(...res.data[2])
        this.catList = data.map(item => {
          return {
            text: item.carNum,
            id: item.id
          }
        })
      })
      await homeService.getCarUser().then(res => {
        let data = res.data
        this.DriverList = data.map(item => {
          return {
            text: item.username,
            id: item.id
          }
        })
      })
    },
    onCar(data) {
      let {text, id} = data
      this.carId = id
      this.carName = text
    },
    onDriver(data) {
      let {text, id} = data
      this.carPeopleId = id
      this.carPeople = text
    },
    Post() {
      let data = {
        id: this.id,
        carLeaderId: this.chargeLeaderId,
        carLeaderName: this.chargeLeaderName,
        carLeaderStatus: "通过",
        carId: this.carId,
        carName: this.carName,
        carDriving: this.carDriving,
        carPeopleId: this.carPeopleId,
        carPeople: this.carPeople
      }
      homeService.CarLeaderCheck(data).then(res => {
        let code = res.code
        if (code !== 200) {
          return this.$vConfirm('', `审核失败 ${res.msg}`).then(res => {
          })
        }
        this.$vConfirm('', '提交成功', '取消', '返回审核列表').then(res => {
          this.$router.back()
        }).catch(error => {
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell__value {
    color: #332E29;
  }
}

.wrapper {
  .header {
    height: (92px/2);
  }
}
</style>