<template>
  <div id="user">
    <navbar title="我的"></navbar>
    <div class="header flex align-center bg-blue text-white">
      <div class="header-left">
        <img src="../../assets/img/Avatar.png" alt="">
      </div>
      <div class="header-right">
        <template v-if="userInfo.name === ''">
          <router-link to="/user/login" class="text-lg flex align-center">请登录</router-link>
        </template>
        <template v-else>
          <div class="flex" style="margin-bottom: 2px">
            <div class="text-lg text-bold" style="margin-bottom:6px;margin-right: 10px">{{userInfo.name}}</div>
            <div class="user-btn text-sm" style="margin-bottom: 6px">
              <span>机关科室</span>
            </div>
          </div>
          <p class="text-lg text-bold">{{userInfo.phone}}</p>
        </template>
      </div>
    </div>
    <div class="wrapper">
      <div class="cell">
        <van-cell-group :border="false">
          <van-cell :title="item.text"
                    is-link
                    v-for="(item,index) in cellList"
                    :key="index"
                    @click="goPath(item.url)">
            <template slot="icon">
              <img :src="item.icon" :alt="item.text">
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <tabbar :active="1"></tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar/Tabbar";
import Navbar from "@/components/Navbar/Navbar";
import {cookie} from "@/utils/utils";

export default {
  name: "user",
  components: {Navbar, Tabbar},
  data() {
    return {
      userInfo: {
        name: '',
      },
      cellList: [
        {
          icon: require('../../assets/img/user-icon1.png'),
          text: '待审核',
          url: '/home'
        },
        {
          icon: require('../../assets/img/user-icon2.png'),
          text: '我的申请',
          url: '/leaderReview'
        },
        {
          icon: require('../../assets/img/user-icon3.png'),
          text: '其它',
          url: '/user/info'
        }
      ]
    }
  },
  created() {
  },
  methods: {
    goPath(url) {
      let uid = cookie.getCookie('uid')
      if (uid === '') {
        return this.$vConfirm('', '您尚未登录，请登录后重试', '返回', '去登陆')
                .then((res) => {
                 this.$router.push({
                   path:'/user/login'
                 })
               })
                .catch((err) => {
              console.log(err)
            })
      }
      this.$router.push({
        path: url
      })
    }
  }
}
</script>

<style scoped lang="scss">

#user {
  height: 100%;

  .header {
    padding: 5px 15px 20px 15px;
    height: 100px;
    border-radius: 0 0 50px 0;

    .header-left {
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 60px;
      }
    }

    .header-right {
      flex: 1;
      padding-left: 10px;

      .user-btn {
        background: rgba(28, 61, 220, 1);
        box-shadow: 0 0 5px 1px rgba(39, 40, 89, 0.19);
        border-radius: 21px;
        padding: 3px 7px 3px 7px
      }
    }
  }

  .wrapper {
    margin-top: 20px;

    .cell {
      img {
        width: 18px;
        height: 18px;
        margin-right: 20px;
        position: relative;
        top: 3px;
      }
    }
  }
}
</style>