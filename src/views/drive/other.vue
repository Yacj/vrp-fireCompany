<template>
  <div id="other">
    <navbar title="其他事项" left-text="返回" :left-show="true"></navbar>
    <div class="wrapper margin">
      <div class="header text-lg">
        <h1>用车其他事项</h1>
      </div>
      <div class="form margin-top-sm">
        <van-cell-group :border="false">
          <van-cell>
            <div slot="default" class="text-df">
              车辆日常状态 <i class="text-red">*</i>
            </div>
          </van-cell>
          <select-from :title-show="false"
                       label="选择状态"
                       v-model="carStatus"
                       :columns="[{
                        text:'正常'
                      },{text:'待维修'},{text:'维修中'}]"
                       @getMessage="onCarStatus"/>
          <van-cell>
            <div slot="default" class="text-df">
              有无随行人员运送物资 <i class="text-red">*</i>
            </div>
          </van-cell>
          <select-from :title-show="false"
                       label="有/无"
                       v-model="isMaterial"
                       :columns="[{
                        text:'有随行人员配送物资'
                      },{text:'无随行人员配送物资'}]"
                       @getMessage="onIsMaterial"/>
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
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import SelectFrom from "@/components/select/selectFrom";
import {DriverServe} from "@/api/Driver";

export default {
  name: "other",
  components: {SelectFrom, Navbar},
  data() {
    return {
      carStatus: '',
      isMaterial: ''
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
    onCarStatus(data) {
      const {text} = data
      this.carStatus = text
    },
    onIsMaterial(data) {
      const {text} = data
      this.isMaterial = text
    },
    Post() {
      let data = {
        applyId: this.id,
        createId: this.createId,
        carStatus: this.carStatus,
        isMaterial: this.isMaterial
      }
      DriverServe.addDriverMatter(data).then(res => {
        let code = res.code
        if (code !== 200) {
          return this.$vAlert('', `提交失败,${res.msg}`).then(res => {
          })
        }
        this.$vAlert('', '提交成功').then(res => {
        })
      })
    }
  },
  computed: {
    disabled() {
      return this.carStatus !== "" && this.isMaterial !== ""
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

  .form-select {
    margin: 0;
  }
}
</style>