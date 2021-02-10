<template>
  <div class="success_box">
    <!-- <span>注册成功</span> -->
    <el-button type="primary" @click="goMain">进入系统</el-button>
  </div>
</template>

<script>
export default {
  name: "RegisterSuccess",
  data() {
    return {};
  },
  methods: {
    goMain() {
      this.$router.replace('/msite')
    }
  }
};
</script>

<style scoped>
.success_box {
  text-align: center;
  height: calc(100vh - 270px);
}
</style>