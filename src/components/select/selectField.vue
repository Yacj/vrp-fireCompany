<template>
  <div id="selectField" class="van-hairline--bottom">
    <van-field
        v-model="result"
        v-bind="$attrs"
        readonly
        is-link
        input-align="right"
        @click="show = !show"
    />
    <van-popup v-model="show" position="bottom">
      <van-picker
          :columns="columns"
          show-toolbar
          :title="$attrs.label.replace(/：/g, '')"
          @cancel="show = !show"
          @confirm="onConfirm"
      />
    </van-popup>

  </div>
</template>

<script>
export default {
  name: "selectField",
  props: {
    columns: {
      type: Array
    },
    selectValue: {
      type: String
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      result: this.selectValue
    };
  },
  created() {
    if(this.name !== undefined){
      this.result = this.name
    }
  },
  methods: {
    onConfirm(value) {
      console.warn(value)
      this.result = value.text;
      this.show = !this.show;
      let data = {
        text: value.text,
        id:value.id
      }
      this.$emit("getMessage", data);
    },
  },
  watch: {
    selectValue: function (newVal) {
      this.result = newVal;
    },
    result(newVal) {
      this.$emit("input", newVal);
    },
    name(val) {
      if (val !== undefined) {
        this.result = val
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>