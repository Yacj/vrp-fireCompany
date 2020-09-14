<template>
  <div id="maintain">
    <navbar title="车辆维修" :left-show="true" left-text="返回" class="navFixed"></navbar>
    <div class="wrapper" style="padding-top:50px">
      <div class="wrapper-1 margin">
        <div class="header text-lg">
          <h1>车辆信息</h1>
        </div>
        <div class="form margin-top-sm">
          <van-cell-group :border="false">
            <van-cell>
              <div slot="default" class="text-df">
                车牌号<i class="text-red margin-left-xs">*</i>
              </div>
            </van-cell>
            <van-field v-model="carName" placeholder="请输入车牌号" readonly/>
            <van-cell>
              <div slot="default" class="text-df">
                报修人<i class="text-red margin-left-xs">*</i>
              </div>
            </van-cell>
            <van-field v-model="carPeople" placeholder="请输入报修人" readonly/>
            <van-cell>
              <div slot="default" class="text-df">
                维修时间<i class="text-red margin-left-xs">*</i>
              </div>
            </van-cell>
            <van-field v-model="repairTime" placeholder="请输入维修时间" readonly @click="showTime = true "
            />
          </van-cell-group>
        </div>
      </div>
      <div class="divHeight" style="height: 7px"></div>
      <div class="wrapper-2 margin">
        <div class="header text-lg">
          <h1>车辆维修</h1>
        </div>
        <div class="form margin-top-sm">
          <van-cell-group :border="false">
            <van-cell>
              <div slot="default" class="text-df">
                损坏部件<i class="text-red margin-left-xs">*</i>
              </div>
            </van-cell>
            <van-field v-model="damagedParts" placeholder="请输入损坏部件"/>
            <van-cell>
              <div slot="default" class="text-df">
                维修费用<i class="text-red margin-left-xs">*</i>
              </div>
            </van-cell>
            <van-field v-model="repairMoney" placeholder="请输入维修费用" type="number"/>
            <van-cell>
              <div slot="default" class="text-df">
                维修内容<i class="text-red margin-left-xs">*</i>
              </div>
            </van-cell>
            <div class="textarea flex justify-center align-center">
              <van-field
                  class="area"
                  v-model="repairContent"
                  rows="2"
                  autosize
                  type="textarea"
                  placeholder="请输入维修内容"
                  show-word-limit
              />
            </div>
          </van-cell-group>
        </div>
        <div class="button margin-top-xll">
          <van-button
              :disabled="disabled === false"
              color="#4162FF" block round class="text-xl" style="letter-spacing: 4px" @click="Post">提交
          </van-button>
        </div>
      </div>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择维修时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="getTime"
          @cancel="showTime = false"
      />
    </van-popup>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import {DriverServe} from "@/api/Driver";
import {getTime} from "@/utils/utils";

export default {
  name: "maintain",
  components: {Navbar},
  data() {
    return {
      showTime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      carName: 0,
      repairTime: '',
      carPeople: '',
      damagedParts: '',
      repairMoney:'',
      repairContent: ''
    }
  },
  created() {
    this.id = +this.$route.query.id
    this.getDriverUserApplyDetails()
  },
  methods: {
    getDriverUserApplyDetails() {
      let id = this.id
      DriverServe.getDriverUserApplyDetails({id}).then(res => {
        let {carName, carPeople, createId} = res.data[0]
        this.createId = createId
        this.carName = carName
        this.carPeople = carPeople
      })
    },
    getTime() {
      const time = Date.parse(this.currentDate)
      this.repairTime = getTime(time)
      this.showTime = false
    },
    Post() {
      let data = {
        applyId: this.id,
        createId: this.createId,
        damagedParts: this.damagedParts,
        repairMoney: +this.repairMoney,
        repairContent: this.repairContent,
        repairTime: this.repairTime + ":00"
      }
      DriverServe.addDriverRepair(data).then(res => {
        let code = res.code
        if (code !== 200) {
        }
        this.$vAlert('', '维修报告提交成功').then(res => {
        })
      })
    }
  },
  computed: {
    disabled() {
      return this.damagedParts !== "" && this.repairMoney !== "" && this.repairContent !== "" && this.repairTime !== ""
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell {
    padding-left: 2px;
  }

  .van-field {
    border: 2px solid #eff2f5;
    border-radius: 9px;
  }

  .van-cell__value {
    margin-left: 5px;
  }
}

#maintain {
  .area {
    box-shadow: 0 0 (16px/2) 0 rgba(3, 0, 0, 0.09);
    border-radius: (24px/2);
    height: 150px;
  }
}
</style>