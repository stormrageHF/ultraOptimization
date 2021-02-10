<template>
  <div class="find_password_box">
    <el-form>
      <el-form-item class="next_btn_box">
        <el-button class="next_btn" type="primary" @click="goLogin">重新登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { reqRegister } from "../../../api";

export default {
  name: "FindPasswordSuccess",
  data() {
    return {};
  },
  methods: {
    goLogin() {
      this.$router.replace("/login");
    }
  },
  computed: {},
  mounted: function() {}
};
</script>

<style scoped>

</style>