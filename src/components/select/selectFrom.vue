<template>
  <div>
    <div class="cu-bar bg-white" v-if="titleShow">
          <span class="text-df text-black margin-left">
            {{title}}
          </span>
    </div>
    <div class="form-select flex align-center" @click="show = !show">
          <span class="flex-1" :class="result !== undefined ? 'text-black':'text-gray'">
            {{result !== undefined ? result : $attrs.label}}
          </span>
      <van-icon name="arrow-down"/>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
          :columns="columns"
          show-toolbar
          @cancel="show = !show"
          :title="$attrs.label"
          @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "selectFrom",
  props: {
    title: {
      type: String
    },
    columns: {
      type: Array
    },
    selectValue: {
      type: String
    },
    name: {
      type: String
    },
    titleShow:{
      type:Boolean,
      default:true
    }
  },
  created() {
  },
  data() {
    return {
      show: false,
      result: this.selectValue
    };
  },
  methods: {
    onConfirm(value) {
      const {text, id} = value
      this.result = text
      this.show = !this.show;
      let data = {
        text,
        id
      }
      this.$emit("getMessage", data);
    },
  },
  watch: {
    name(val) {
      this.result = val !== undefined ? val : ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>