<template>
  <div id="carApplication">
    <navbar title="用车申请" :left-show="true"  left-text="返回"></navbar>
    <div class="wrapper">
      <van-cell-group :border="false">
        <van-field
            v-model="account"
            label="用车事由："
            placeholder="填写用车事由"
            input-align="right"
        />
        <van-field
            v-model="pepole"
            label="随行人："
            placeholder="填写随行人姓名"
            input-align="right"
        />
        <van-field
            readonly
            v-model="Destinationval"
            label="目的地："
            placeholder="市内/市外"
            input-align="right"
            right-icon="arrow"
            @click="showDestination = true"
        />
        <van-field
            readonly
            v-model="carVal"
            label="车辆："
            placeholder="5座以内/5座以上"
            input-align="right"
            right-icon="arrow"
            @click="showCar = true"
        />
        <van-field
            readonly
            v-model="driveVal"
            label="车辆驾驶："
            placeholder="自行驾驶/调派驾驶员"
            input-align="right"
            right-icon="arrow"
            @click="showdrive = true"
        />
        <van-cell value="备注："/>
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
      </van-cell-group>
      <div class="button">
        <van-button type="primary"
                    size="large"
                    class="btn"
                    color="#4161FF"
                    round
                    :disabled="info === false"
                    :hairline="true"
                    @click="Post"
        >
          提交
        </van-button>
      </div>
      <van-popup v-model="showDestination" position="bottom">
        <van-picker
            show-toolbar
            :columns="[
                {
                  id:1,
                  text:'市内'
                },
                {
                  id:2,
                  text:'市外'
                }
            ]"
            @confirm="onConfirm"
            @cancel="showDestination = false"
        />
      </van-popup>
      <van-popup v-model="showCar" position="bottom">
        <van-picker
            show-toolbar
            :columns="[
             {
                  id:1,
                  text:'5座以内'
                },
                {
                  id:2,
                  text:'5座以上'
                }
            ]"
            @confirm="onCar"
            @cancel="showCar = false"
        />
      </van-popup>
      <van-popup v-model="showdrive" position="bottom">
        <van-picker
            show-toolbar
            :columns="[
             {
                  id:1,
                  text:'自行驾驶'
                },
                {
                  id:2,
                  text:'调派驾驶员'
                }
            ]"
            @confirm="onDrive"
            @cancel="showdrive = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "carApplication",
  components: {Navbar},
  data() {
    return {
      account: '',
      pepole: '',
      message: '',
      Destinationval: '',
      showDestination: false,
      carVal: '',
      showCar: false,
      driveVal:'',
      showdrive:false
    }
  },
  computed:{
    info(){
      return this.account !== '' && this.pepole !== '' && this.Destinationval !== '' && this.carVal !== '' && this.driveVal !== '' && this.message !== ''
    }
  },
  methods: {
    back(){
      this.$router.back()
    },
    onConfirm(val) {
      this.Destinationval = val.text;
      this.Destinationid = val.id
      this.showDestination = false;
    },
    onCar(val) {
      this.carVal = val.text;
      this.showCar = false;
    },
    onDrive(val){
      this.driveVal = val.text;
      this.showdrive = false;
    },
    Post(){
      this.$vConfirm('','提交成功,请等待领导审核','返回','查看我的申请').then(res=>{
        this.$router.push({
          path:'/myApplication'
        })
      }).catch(res=>{

      })
    }
  }
}
</script>

<style scoped lang="scss">

#carApplication {
  .wrapper {
    margin-top: 15px;

    .textarea {
      width: 100%;

      .area {
        width: 95%;
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