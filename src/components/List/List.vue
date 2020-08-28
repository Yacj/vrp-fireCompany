<template>
  <div id="List">
    <div class="list" v-for="(item,index) in List" :key="index"  @click="getId(item.id)">
      <div class="top padding flex align-center van-hairline--bottom">
        <div class="img">
          <img src="../../assets/img/Application-1.png" alt="">
        </div>
        <div class="text">
          单据号：{{item.order}}
        </div>
      </div>
      <div class="bottom padding flex">
        <div class="img">
          <img src="../../assets/img/Application-2.png" alt="">
        </div>
        <div class="text">
          <p>用车人：{{item.people}}</p>
          <p>到达地：{{item.address}}</p>
          <p>审批人：{{item.review}}</p>
          <p>状态：待审批</p>
          <div class="time text-gray">2020-08-12 14:00-2020-08-12 16:30</div>
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
    getId(id) {
      let data = {
        id
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
      margin-left: 20px;
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
      margin-left: 20px;
      font-size: (34px/2);

      p {
        line-height: 1.8;
      }
    }

    .time {
      margin-top: 5px;
      font-size: (28px/2);
    }
  }
}
</style>