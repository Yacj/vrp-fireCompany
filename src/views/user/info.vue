<template>
  <div id="info">
    <navbar title="信息修改" :left-show="true" left-text="返回"></navbar>
    <div class="wrapper">
      <van-cell-group :border="false">
        <van-cell>
          <div slot="title" class="flex align-center" style="height: 100%">
            上传头像
          </div>
          <div class="avatar" slot="extra">
            <van-uploader :after-read="afterRead"
                          :before-read="beforeRead">
              <img :src="userInfo.img === null ?require('../../assets/img/Avatar.png'):imgUrL+userInfo.img" alt=""
                   ref="goodsImg" class="round">
            </van-uploader>
          </div>
        </van-cell>
        <van-field
            :value="23"
            label="用户名"
            placeholder="请填写用户名"
            input-align="right"
            v-model="userInfo.username"
        />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button size="large" class="margin-bottom" style="letter-spacing: 2px" color="#4161FF" round
                  @click="SaveUser">
        保存修改
      </van-button>
      <van-button size="large" class="margin-bottom " style="letter-spacing: 2px" round
                  @click="outUser">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import {BaseUrl, storage} from "@/utils/utils";
import {UserService} from "@/api/user";

export default {
  name: "info",
  components: {Navbar},
  data() {
    return {
      imgUrL:BaseUrl,
      userInfo: {},
      phone: '',
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const Getuid = storage.get('uid')
      UserService.getUser({id: Getuid}).then(res => {
        this.userInfo = res.data
      })
    },
    beforeRead(file) {
      const imgType = file.type
      const imgSize = file.size

      if (imgType !== 'image/jpeg' && imgType !== 'image/png') {
        this.$toast('只允许上传jpg/png格式的图片')
        return false
      }

      if (imgSize > 3145709) {
        this.$toast.fail('图片太大，请重新选择')
        return false
      }

      return true
    },
    afterRead(file) {
      this.$refs.goodsImg.src = file.content;
      let formData = new FormData()
      formData.append('file', file.file)
      UserService.singleUploadFile(formData).then(res => {
        this.img = res.data
      })
    },
    SaveUser() {
      const {uid: id} = storage.get('userInfo')
      const data = {
        id,
        username: this.userInfo.username,
        img: this.img
      }
      UserService.saveUser(data).then(res => {
        let code = res.code
        if (code !== 200) {
        }
        this.$toast.success('修改信息成功')
        this.getUserInfo()
      })
    },
    outUser() {
      this.$vConfirm('', '您确定要退出账户么', '', '确认').then(res => {
        localStorage.clear();
        this.$toast.success('退出成功')
        this.$router.back()
      }).catch(err => {})
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-field__control--right {
    margin-right: 15px;
  }
}

#info {
  height: 100vh;
  background-color: #f1f1f1;

  .avatar {
    width: 60px;
    height: 60px;

    img {
      width: 100%;
      height: 60px;
    }
  }

  .btn {
    position: absolute;
    bottom: 50px;
    width: 90%;
    left: 5%;
  }
}
</style>