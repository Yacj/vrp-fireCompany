<template>
  <div id="Tabbar">
    <van-tabbar v-model="actives">
      <van-tabbar-item
          :info="item.info"
          @click="footerNavigateTo(item)"
          v-for="(item,index) in footerlist"
          :key="index">
        {{ item.name }}
        <template #icon="props">
          <img :src="props.active ? item.active : item.normal" alt="" class="icon">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
let buyersFooterList = [
  {
    index: 0,
    name: '首页',
    path: '/home',
    active:require('../../assets/img/0-active.png'),
    normal:require('../../assets/img/0-normal.png'),
    info: ''// 此处为空时 dom不显示
  },
  {
    index: 1,
    name: '我的',
    path: '/user',
    active:require('../../assets/img/1-active.png'),
    normal:require('../../assets/img/1-normal.png'),
    info: ''
  },
]
export default {
  name: "Tabbar",
  data() {
    return {
      actives: this.active,
      footerlist: buyersFooterList
    }
  },
  props: ['active'],
  mounted() {
  },
  methods: {
    footerNavigateTo(obj) {
      this.$router.push({path: obj.path})
    }
  },
  component: {
    //someComponent
  }
}
</script>
<style scoped lang="scss">
::v-deep{
  .van-tabbar{
    z-index: 1024;
  }
}
.icon{
  width: 20px;
  height: 20px;
}
</style>