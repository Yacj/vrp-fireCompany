<template>
  <div id="user">
    <navbar title="我的"></navbar>
    <div class="header flex align-center bg-blue text-white">
      <div class="header-left">
        <img
            :src="userInfo.img === undefined ? require('../../assets/img/Avatar.png'):(userInfo.img === null ?require('../../assets/img/Avatar.png'):imgUrL+userInfo.img)"
            alt=""
            class="round">
      </div>
      <div class="header-right">
        <template v-if="userInfo.username === undefined ">
          <router-link to="/user/login" class="text-lg flex align-center">请登录</router-link>
        </template>
        <template v-else>
          <router-link to="/user/info">
            <div class="flex">
              <div class="text-lg text-bold">{{ userInfo.username === null ? userInfo.name : userInfo.username }}</div>
              <div class="user-btn text-sm">
                <span>{{Permissions}}</span>
              </div>
            </div>
            <p class="text-lg text-bold" v-if="userInfo.username !== null">{{ formatPhone(userInfo.name) }}</p>
          </router-link>
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
import {BaseUrl, storage} from "@/utils/utils";
import {UserService} from "@/api/user";

export default {
  name: "user",
  components: {Navbar, Tabbar},
  data() {
    return {
      imgUrL: BaseUrl,
      userInfo: {},
      getInfo: {},
      cellList: [
        {
          icon: require('../../assets/img/user-icon2.png'),
          text: '我的申请',
          url: '/myApplication'
        },
        {
          icon: require('../../assets/img/user-icon3.png'),
          text: '信息修改',
          url: '/user/info'
        }
      ],
      Permissions: ""
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    formatPhone(p) {
      return p.substring(0, 3) + '*****' + p.substring(p.length - 2);
    },
    getUserInfo() {
      const Getuid = storage.get('uid')
      if (Getuid === null) return
      UserService.getUser({id: Getuid}).then(res => {
        const {id: uid, username, name: phone, deptName} = res.data
        this.userInfo = res.data
        const deptId = this.userInfo.deptId !== null ? this.userInfo.deptId : 0
        const userInfo = {deptId, uid, username, phone, deptName}
        if (deptName === null) {
          this.Permissions = '暂无权限'
        } else {
          this.Permissions = deptName
        }
        storage.set('userInfo', userInfo)
        // const list = new Map([
        //   [0, '暂无权限'],
        //   [17, '主管领导'],
        //   [22, '消防科室分管领导'],
        //   [26, '车管领导'],
        //   [27, '驾驶员'],
        //   [28, '消防科室']
        // ])
        // const userPermissions = (id) => {
        //   return list.get(id)
        // }
      })
    },
    goPath(url) {
      if (this.userInfo.name === undefined) {
        return this.$vConfirm('', '您尚未登录，请登录后重试', '返回', '去登陆')
            .then((res) => {
              this.$router.push({
                path: '/user/login'
              })
            })
            .catch((err) => {
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

      .flex {
        margin-bottom: 2px;

        .text-lg {
          margin: 0 10px 6px 0;
        }

        .user-btn {
          margin-bottom: 6px;
          background: rgba(28, 61, 220, 1);
          box-shadow: 0 0 5px 1px rgba(39, 40, 89, 0.19);
          border-radius: 21px;
          padding: 3px 7px 3px 7px
        }
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