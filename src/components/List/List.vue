<template>
  <div id="List">
    <div class="list" v-for="(item,index) in List" :key="index" @click="getId(item.id,item.carId)">
      <div class="top padding flex align-center van-hairline--bottom">
        <div class="img">
          <img src="../../assets/img/Application-1.png" alt="">
        </div>
        <div class="text">
          单据号：{{item.document}}
        </div>
      </div>
      <div class="bottom padding flex">
        <div class="img">
          <img src="../../assets/img/Application-2.png" alt="">
        </div>
        <div class="text">
          <p>申请人：{{item.createBy}}</p>
          <p>随行人：{{item.entourage}}</p>
          <p>驾驶员：{{item.carPeople === "" ? '自行驾驶' : item.carPeople}}</p>
          <p>目的地：{{item.destination}}</p>
          <!--          <p>分管领导：{{item.chargeLeaderName === null ? "" : item.chargeLeaderName}}</p>-->
          <p>
            分管审核：
            <span :class="{'text-red':item.chargeLeaderStatus !== '通过'}">
              {{item.chargeLeaderStatus === '通过' ? item.chargeLeaderStatus : "待审核"}} <template v-if="item.directorLeaderIs === 1">(需主官审核)</template>
          </span>
          </p>
          <p v-if="item.directorLeaderName !== null">主官审核：通过</p>
          <p v-if="item.carLeaderStatus !== null">车管审核：{{item.carLeaderStatus !== null ? '通过' : ''}}</p>
          <div class="time text-gray">{{item.createTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    List: {
      default: Array
    }
  },
  methods: {
    getId(id,carId) {
      let data = {
        id,
        carId
      }
      this.$emit('getData', data)
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  margin: (31px/2);
  height: 100%;
  background: #fff;
  box-shadow: 0 6px 21px 0 rgba(65, 97, 255, 0.17);
  border-radius: 10px;

  .top {
    .img {
      img {
        width: 25px;
      }
    }

    .text {
      margin-left: 25px;
      font-size: (34px/2);
    }
  }

  .bottom {
    .img {
      img {
        width: 25px;
      }
    }

    .text {
      font-size: (34px/2);
      margin: -8px 0 0 25px;

      p {
        line-height: 36px;
      }
    }

    .time {
      margin-top: 5px;
      font-size: (28px/2);
    }
  }
}
</style>