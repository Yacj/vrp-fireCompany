<template>
  <div id="carApplication">
    <navbar title="用车申请" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper">
      <van-cell-group :border="false">
        <van-field
            v-model="CreateBy"
            label="申请人："
            placeholder="请填写申请人"
            input-align="right"
        />
        <van-field
            v-model="entourage"
            label="随行人："
            placeholder="填写随行人姓名"
            input-align="right"
        />
        <select-field label="目的地："
                      placeholder="市内/市外"
                      v-model="destination"
                      :columns="[{text:'市内'},{text:'市外'}]"
                      @getMessage="setDestination"
        ></select-field>
        <select-field label="车辆座位："
                      placeholder="五座以上/五座以下"
                      v-model="carSeats"
                      :columns="[{text:'五座以上'},{text:'五座以下'}]"
                      @getMessage="setCarSeats"
        ></select-field>
        <select-field
            v-if="carSeats !== ''"
            label="车辆牌号："
            placeholder="请选择车辆牌号"
            v-model="carName"
            :name="carName"
            :columns="carNameList"
            @getMessage="setCarName"></select-field>
        <select-field label="车辆驾驶："
                      placeholder="自行驾驶/调派驾驶员"
                      v-model="carDriving"
                      :columns="[{text:'自行驾驶'},{text:'调派驾驶员'}]"
                      @getMessage="setCarDriving"></select-field>
        <select-field v-if="carDriving === '调派驾驶员'"
                      label="驾驶员："
                      placeholder="请选择驾驶员"
                      v-model="carPeople"
                      :columns="carPeopleList"
                      @getMessage="setCarPeople"></select-field>
        <van-cell value="备注："/>
        <div class="textarea flex justify-center align-center">
          <van-field
              class="area"
              v-model="remarks"
              rows="2"
              autosize
              type="textarea"
              placeholder="请输入留言"
              show-word-limit
          />
        </div>
      </van-cell-group>
      <div class="button">
        <van-button type="primary"
                    size="large"
                    class="btn"
                    color="#4161FF"
                    round
                    :disabled="carInfo === false"
                    :hairline="true"
                    @click="Post"
        >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import SelectField from "@/components/select/selectField";

import {storage} from "@/utils/utils";
import {homeService} from "@/api/home";

export default {
  name: "carApplication",
  components: {SelectField, Navbar},
  data() {
    return {
      CreateBy: '',
      entourage: '',
      remarks: '',
      destination: '',
      carSeats: '',
      carName: '',
      carDriving: '',
      carPeople: '',
      carNameList: [],
      carPeopleList: []
    }
  },
  computed: {
    carInfo() {
      return this.CreateBy !== '' && this.entourage !== '' && this.destination !== '' && this.carSeats !== '' && this.carName !== '' && this.carDriving !== '' && this.remarks !== ''
    },
  },
  watch: {
    carSeats(val) {
      if (val === '五座以上') {
        this.carName = this.data_1[0].text
        this.carNameList = this.data_1
        this.carId = this.carNameList[0].id
      } else {
        this.carName = ''
        this.carNameList = this.data_2
      }
    }
  },
  created() {
    this.getCar()
  },
  methods: {
    async getCar() {
      await homeService.getCar().then(res => {
        this.data_1 = res.data[1].map(item => {
          return {
            text: item.carNum,
            id: item.id
          }
        })
        this.data_2 = res.data[2].map(item => {
          return {
            text: item.carNum,
            id: item.id
          }
        })
      })
      await homeService.getCarUser().then(res => {
        let data = res.data
        this.carPeopleList = data.map(item => {
          return {
            text: item.username,
            id: item.id
          }
        })
      })
    },
    setDestination(data) {
      this.destination = data.text
    },
    setCarSeats(data) {
      this.carSeats = data.text
    },
    setCarName(data) {
      this.carName = data.text
      this.carId = data.id
    },
    setCarDriving(data) {
      this.carDriving = data.text
    },
    setCarPeople(data) {
      this.carPeople = data.text
      this.carPeopleId = data.id
    },
    Post() {
      let {uid,deptId} = storage.get('userInfo')
      let data = {
        createId:uid,
        deptId,
        createBy: this.CreateBy,
        entourage: this.entourage,
        destination: this.destination,
        carSeats: this.carSeats,
        carDriving: this.carDriving,
        remarks: this.remarks,
        carName: this.carName,
        carPeople: this.carPeople,
        carId:this.carId,
        carPeopleId:this.carPeopleId
      }
      homeService.addApply(data).then(res => {
        let code = res.code
        if (code !== 200) {
          return this.$vAlert('',`申请失败,${res.msg}`)
        }
        this.$vConfirm('', '申请成功,请等待领导审核', '返回', '查看我的申请').then(res => {
          this.$router.push({
            path: '/myApplication'
          })
        }).catch(res => {
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

#carApplication {
  .wrapper {
    margin-top: 5px;

    .textarea {
      width: 100%;

      .area {
        width: 90%;
        box-shadow: 0 0 (16px/2) 0 rgba(3, 0, 0, 0.09);
        border-radius: (24px/2);
        height: 150px;
      }
    }

    .button {
      margin: 40px 10px;

      .btn {
        font-size: 18px;
        letter-spacing: 5px;
      }
    }
  }
}
</style>