<template>
  <div id="returnVehicle">
    <navbar title="车辆归还" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper">
      <div class="form">
        <!--        <div class="cu-bar bg-white">-->
        <!--          <div class="action">-->
        <!--              <span class="text-xl text-bold">-->
        <!--                车辆状况-->
        <!--              </span>-->
        <!--          </div>-->
        <!--        </div>-->
        <select-from title="车辆是否归还"
                     label="是/否"
                     v-model="Sure"
                     :columns="[{id:1,text:'是'},{id:2,text:'否'}]"
                     @getMessage="onConfirm"
        />
        <div class="cu-bar bg-white">
          <div class="action">
              <span class="text-df text-black">
                车辆归还时间 <i class="text-red">*</i>
              </span>
          </div>
        </div>
        <div class="time">{{nowTime}}</div>
        <div class="cu-bar bg-white">
          <div class="action">
              <span class="text-df text-black">
                备注
                <i class="text-red">*</i>
              </span>
          </div>
        </div>
        <div class="textarea flex justify-center align-center">
          <van-field
              class="area"
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              placeholder="请输入用车后车辆状况"
              show-word-limit
          />
        </div>
      </div>
    </div>
    <div class="button margin-xl">
      <van-button type="primary"
                  size="large"
                  class="btn"
                  color="#4161FF"
                  round
                  :disabled="buttonStu === false"
                  :hairline="true"
                  @click="carBack"
      >
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import {getTime} from "@/utils/utils";
import SelectFrom from "@/components/select/selectFrom";
import {homeService} from "@/api/home";

export default {
  name: "returnVehicle",
  components: {SelectFrom, Navbar},
  data() {
    return {
      value1: '',
      Sure: '是/否',
      showPicker: false,
      nowTime: 0,
      message: ''
    }
  },
  computed: {
    buttonStu() {
      return this.Sure !== '是/否' && this.message !== ''
    }
  },
  created() {
    const {id, carId} = this.$route.query
    const time = Date.parse(new Date())
    this.nowTime = getTime(time)
    this.id = id
    this.carId = carId
  },
  methods: {
    onConfirm(data) {
      this.Sure = data.text
    },
    carBack() {
      this.$vConfirm('', '确认归还车辆？', '取消', '确认')
          .then(res => {
            this.returnUserApply()
          })
          .catch(() => {
          })
    },
    returnUserApply() {
      let data = {
        id: +this.id,
        carId: +this.carId,
        returnRemarks: this.message,
        returnIs: "已归还"
      }
      homeService.returnUserApply(data).then(res => {
        const code = res.code
        if (code !== 200) {
          return this.$vAlert('', `归还失败,${res.msg}`)
        }
        this.$vAlert('', '归还成功').then(res => {})
      })
    }
  }
}
</script>

<style scoped lang="scss">
#returnVehicle {
  .wrapper {
    .form {
      .time {
        margin: 0 25px 0 25px;
        font-size: 20px;
      }

      .textarea {
        width: 100%;

        .area {
          width: 89%;
          box-shadow: 0 0 (16px/2) 0 rgba(3, 0, 0, 0.09);
          border-radius: (24px/2);
          height: 150px;
        }
      }
    }
  }
}
</style>