<template>
  <div id="fuel">
    <navbar title="加油登记" left-text="返回" :left-show="true"></navbar>
    <div class="wrapper margin">
      <div class="header text-lg">
        <h1>加油记录</h1>
      </div>
      <div class="form margin-top-sm">
        <van-cell-group :border="false">
          <van-cell>
            <div slot="default" class="text-df">
              公里数 <i class="text-red">*</i>
            </div>
          </van-cell>
          <van-field v-model="kilometers" placeholder="请输入公里数" type="number">
            <div slot="extra">
              公里
            </div>
          </van-field>
          <van-cell>
            <div slot="default" class="text-df">
              油品<i class="text-red margin-left-xs">*</i>
            </div>
          </van-cell>
          <van-field v-model="gasolineBrand" placeholder="请输入油品"/>
          <van-cell>
            <div slot="default" class="text-df">
              加油数量<i class="text-red margin-left-xs">*</i>
            </div>
          </van-cell>
          <van-field v-model="gasolineNumber" placeholder="请输入加油数量" type="number">
            <div slot="extra">
              L
            </div>
          </van-field>
          <van-cell>
            <div slot="default" class="text-df">
              加油时间<i class="text-red margin-left-xs">*</i>
            </div>
          </van-cell>
          <van-field v-model="gasolineTime" readonly placeholder="请选择加油时间" @click="showTime = true"></van-field>
          <van-cell>
            <div slot="default" class="text-df">
              金额<i class="text-red margin-left-xs">*</i>
            </div>
          </van-cell>
          <van-field v-model="gasolineMoney" placeholder="请输入金额" type="number">
            <div slot="extra">
              ￥
            </div>
          </van-field>
        </van-cell-group>
      </div>
      <div class="button margin-top-xll">
        <van-button color="#4162FF" block round class="text-xl" style="letter-spacing: 4px"
                    :disabled="disabled === false"
                    @click="Post">提交
        </van-button>
      </div>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择加油时间"
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
  name: "fuel",
  components: {Navbar},
  data() {
    return {
      kilometers: '',
      gasolineBrand: '',
      gasolineMoney: '',
      gasolineNumber: '',
      gasolineTime: '',
      showTime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
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
        let {createId} = res.data[0]
        this.createId = createId
      })
    },
    getTime() {
      const time = Date.parse(this.currentDate)
      this.gasolineTime = getTime(time)
      this.showTime = false
    },
    Post() {
      let data = {
        applyId: this.id,
        createId: this.createId,
        kilometers: +this.kilometers,
        gasolineBrand: this.gasolineBrand,
        gasolineMoney: +this.gasolineMoney,
        gasolineNumber: +this.gasolineNumber,
        gasolineTime: this.gasolineTime + ":00"
      }
      DriverServe.addDriverGasoline(data).then(res => {
        let code = res.code
        if (code !== 200) {
          return this.$vAlert('', `登记失败,${res.msg}`).then(res => {})
        }
        this.$vAlert('', '登记成功').then(res => {})
      })
    }
  },
  computed: {
    disabled() {
      return this.kilometers !== "" && this.gasolineBrand !== "" && this.gasolineMoney !== "" && this.gasolineNumber !== "" && this.gasolineTime !== ""
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

#fuel {
}
</style>