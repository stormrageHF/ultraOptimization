<template>
  <div class="register_box greybg">
    <div class="registersteps" v-if="isShow">
      <el-steps class="steps_box" :active="active" finish-status="success" align-center>
        <el-step title="设置注册信息"></el-step>
        <!-- <el-step title="激活账号"></el-step> -->
        <el-step title="完善个人信息"></el-step>
        <el-step title="注册成功"></el-step>
      </el-steps>
    </div>
    <div class="column whitebg">
      <div>
        <h2>{{ sub_title }}</h2>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      active: this.$route.meta.stepActiveNum,
      sub_title: this.$route.meta.subTitle,
      isShow: this.$route.meta.stepActiveNum === -2 ? false : true
    };
  },
  mounted: function() {},
  updated: function() {
    this.active = this.$route.meta.stepActiveNum;
    this.sub_title = this.$route.meta.subTitle;
    // console.log(this.$route.meta);
  }
};
</script>

<style scoped>
.register_box {
  box-sizing: border-box;
  padding-bottom: 40px;
}
.registersteps {
  width: 1000px;
  height: 178px;
  margin: 0 auto;
  position: relative;
}
.steps_box {
  height: 100%;
  align-items: center;
}
.column {
  width: 968px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 40px;
  /* margin-top: -15px; */
}
.whitebg {
  background: #fff;
}
.column h2 {
  height: 60px;
  background: #3d5368;
  color: #65d3e3;
  padding-left: 30px;
  line-height: 60px;
}
</style>