<template>
  <el-button type="primary" :disabled="disabled" @click="btnClick">{{ codeText }}</el-button>
</template>

<script>
export default {
  name: "CaptchaButton",
  data() {
    return {
      codeText: "获取验证码",
      disabled: false,
      workCode: 0,
      sintime: {}
    };
  },
  methods: {
    btnClick() {
      const that = this;
      that.disabled = true;
      that.getWorkCode(); // 获取 workdcode
      that.waitGetCode(); // 开始倒计时
      that.$emit('get-code', that.workCode);
    },
    getWorkCode() {
      this.workCode = parseInt(Math.random() * 10000);
    },
    waitGetCode() {
      let s = 60;
      const that = this;
      that.codeText = s + "秒";
      that.sintime = setInterval(function() {
        if (s > 0) {
          s--;
          that.codeText = s + "秒";
        }
        if (s == 0) {
          s = 60;
          that.stopTime();
        }
      }, 1000);
    },
    stopTime() {
      clearInterval(this.sintime);
      this.codeText = "获取验证码";
      this.disabled = false;
    }
  },
  updated(){
      console.log('updated');   
  },
  destroyed(){
      this.stopTime();
      console.log("teardown");
  }
};
</script>

<style>
</style>