<template>
  <div id="leaderAssigned">
    <navbar title="车管领导分配" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper">
      <div class="header bg-gray flex align-center">
        <span class="left flex-1 margin-left text-df ">
          单据号：100002456
        </span>
        <span class="right margin-right text-green text-df ">
          已通过
        </span>
      </div>
      <div class="cell">
        <van-cell-group>
          <van-cell title="用车人：" value="张云"></van-cell>
          <van-cell title="目的地：" value="芜湖"></van-cell>
          <van-cell title="时间：" value="2019-08-22"></van-cell>
        </van-cell-group>
        <div class="divHeight"></div>
        <div class="cu-bar bg-white">
          <span class="text-df text-black margin-left">
            指派车辆
          </span>
        </div>
        <div class="form-select flex align-center" @click="showCar = true">
          <span class="flex-1" :class="carVal === '选择车辆'?'text-gray':'text-black'">
           {{carVal}}
          </span>
          <van-icon name="arrow-down"/>
        </div>
        <div class="cu-bar bg-white">
          <span class="text-df text-black margin-left">
            指派驾驶员
          </span>
        </div>
        <div class="form-select flex align-center" @click="showDriver = true">
          <span class="flex-1" :class="driverVal === '选择驾驶员'?'text-gray':'text-black'">
           {{driverVal}}
          </span>
          <van-icon name="arrow-down"/>
        </div>
        <div class="button padding margin-top-xl">
          <van-button type="primary" size="large" style="letter-spacing: 2px" color="#4161FF" round>
            确定
          </van-button>
        </div>
      </div>
    </div>
    <van-popup v-model="showCar" position="bottom">
      <van-picker
          show-toolbar
          :columns="catList"
          @confirm="onCar"
          @cancel="showCar = false"
      />
    </van-popup>
    <van-popup v-model="showDriver" position="bottom">
      <van-picker
          show-toolbar
          :columns="DriverList"
          @confirm="onDriver"
          @cancel="showDriver = false"
      />
    </van-popup>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";


export default {
  name: "leaderAssigned",
  components: {Navbar},
  data() {
    return {
      carVal: '选择车辆',
      driverVal: '选择驾驶员',
      showCar: false,
      catList: [
        {
          id: 1,
          text: '皖01'
        }, {
          id: 2,
          text: '皖B25352'
        }, {
          id:3,
          text: '皖B25352 拷贝'
        }, {
          id: 4,
          text: '皖B25352 拷贝'
        }, {
          id: 5,
          text: '皖B25352 拷贝'
        }
      ],
      showDriver: false,
      DriverList: [
        {
          text: '驾驶员a',
          id: 1
        }
      ]
    }
  },
  created() {
  },
  methods: {
    onCar(val) {
      this.carVal = val.text
      this.showCar = false
    },
    onDriver(val) {
      this.driverVal = val.text
      this.showDriver = false
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