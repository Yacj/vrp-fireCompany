<template>
  <div class="home">
    <navbar title="消防公务用车调度平台" class="navFixed"></navbar>
    <div class="header" style="margin-top: 46px">
      <div class="header-img">
        <img src="../../assets/img/home-bg.png" alt="">
      </div>
    </div>
    <div class="wrapper margin">
      <div class="wrapper-1">
        <div class="margin-top bg-white" v-for="(item,index) in homeList" :key="index">
          <div @click="goRouter(item.url,item.id)">
            <div class="content flex align-center justify-center">
              <div class="img">
                <img :src="item.leftImg" alt="">
              </div>
              <div class="center-txt margin-left-xl text-lg" style="font-weight: bold">
                {{item.topTitle}}
                <div class="margin-top-sm text-sm text-gray" style="font-weight: normal">
                  {{item.bottomTitle}}
                </div>
              </div>
              <div class="right-icon">
                <van-icon name="arrow" class="text-xxl "/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="deptId === 27">
        <div class="wrapper-2">
          <div class="text text-white text-bold flex align-center justify-center text-lg radius">
            驾驶员功能
          </div>
          <div class="icon flex align-center justify-center text-lg">
            <van-icon name="play" class="" size="50px"/>
          </div>
        </div>
        <div class="wrapper-3">
          <van-grid :column-num="3">
            <van-grid-item v-for="(item,index) in gridList" :key="index" :to="'/drive/list?id='+(index+1)">
              <img :src="item.icon">
              <span>
              {{item.text}}
            </span>
            </van-grid-item>
          </van-grid>
        </div>
      </template>
    </div>
    <div style="height: 50px"></div>
    <tabbar :active="0"></tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/Tabbar/Tabbar";
import Navbar from "@/components/Navbar/Navbar";
import {storage} from "@/utils/utils";
import user from "@/views/user/user";

export default {
  name: 'Home',
  components: {Navbar, Tabbar},
  data() {
    return {
      homeList: [
        {
          leftImg: require('../../assets/img/home-icon1.png'),
          topTitle: '用车申请',
          bottomTitle: '预约申请，按时出车',
          url: '/carApplication',
        },
        {
          leftImg: require('../../assets/img/home-icon2.png'),
          topTitle: '我的申请',
          bottomTitle: '申请详情，随时查看',
          url: '/myApplication',
        },
        {
          leftImg: require('../../assets/img/home-icon3.png'),
          topTitle: '车辆归还',
          bottomTitle: '用车完毕，还车入库',
          url: '/returnVehicle',
        },
        {
          leftImg: require('../../assets/img/home-icon4.png'),
          topTitle: '领导审核',
          bottomTitle: '认真负责，安全用车',
          url: '/leaderList',
        }
      ],
      gridList: [
        {
          icon: require('../../assets/img/home-icon5.png'),
          text: '车辆维修',
          url:'/home'
        },
        {
          icon: require('../../assets/img/home-icon6.png'),
          text: '加油登记',
          url:'/drive/fuel'
        },
        {
          icon: require('../../assets/img/home-icon7.png'),
          text: '其它事项',
          url:'/home'
        }
      ],
      deptId: 0
    }
  },
  created() {
    let userInfo = storage.get('userInfo')
    console.log(userInfo)
    if(userInfo !== null){
      this.userInfo = userInfo
      this.deptId = this.userInfo.deptId
    }
  },
  methods: {
    goRouter(url, id) {
      if (this.deptId === 0) {
        return this.$vConfirm('', '您尚未登录，请登录后重试', '取消', '去登陆')
            .then(res => {
              this.$router.push({
                path: '/user/login'
              })
            })
            .catch(err => {
            })
      }
      this.$router.push({
        path: url
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.home {
  background: #f6f6f6;
  min-height: 100vh;

  .hd {
    padding: 80px 10px;
  }

  .cell {
    padding: 0 15px;
  }

  .wrapper {
    .wrapper-1 {
      .content {
        margin: 20px;
        height: 100px;

        .img {
          width: 50px;

          img {
            position: relative;
            width: 43px;
          }
        }

        .center-txt {
          flex: 1;
          margin-left: 20px;
          font-size: (36px/2);

          .margin-top-sm {
            margin-top: 15px;
            font-size: (28px/2);
          }
        }

        .right-icon {
        }
      }
    }

    .wrapper-2 {
      width: 100%;

      .text {
        height: 50px;
        letter-spacing: 3px;
      }

      .radius {
        background: linear-gradient(-90deg, rgba(65, 97, 255, 1), rgba(70, 100, 242, 1));
        border-radius: 9px;
      }

      .icon {
        position: relative;
        top: -25px;
        z-index: 100;

        i {
          transform: rotate(90deg);
          color: rgba(65, 97, 255, 1);
        }
      }
    }

    .wrapper-3 {
      position: relative;
      top: -47px;

      img {
        width: (84px/2);
        height: (84px/2);
      }

      span {
        margin-top: 8px;
        font-size: (27px/2);
      }
    }
  }
}
</style>