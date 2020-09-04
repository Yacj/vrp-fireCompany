<template>
  <div id="Loading">
    <img src="../../assets/img/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style scoped lang="scss">
#Loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: table-cell;
  vertical-align: middle;
  text-align: center;

  img {
    width: 1rem;
    height: 1rem;
    margin: 7.5rem auto;
  }
}
</style>