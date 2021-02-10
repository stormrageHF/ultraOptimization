<template>
  <div class="reset_box">
    <el-steps class="steps_box" :active="active" simple>
      <el-step title="验证" icon="el-icon-edit"></el-step>
      <el-step :title="title" icon="el-icon-upload"></el-step>
      <el-step title="完成" icon="el-icon-finished"></el-step>
    </el-steps>

    <div class="set_box">
      <div v-if="active===1">
        <PhoneVerify @verify-success="nextStep"></PhoneVerify>
      </div>

      <div v-else-if="active===2">
        <div v-if="PhoneOrEmail==='1'">
          <ResetPassword @reset-password="ResetSuccess"></ResetPassword>
        </div>
        <div v-else>
          <ResetEmail @reset-email="ResetSuccess"></ResetEmail>
        </div>
      </div>

      <div v-else>
        <p class="finish_p">设置完成</p>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneVerify from "../PhoneVerify/PhoneVerify";
import ResetPassword from "../ResetPassword/ResetPassword";
import ResetEmail from "../ResetEmail/ResetEmail";
import { ValidPhoneCodeForAccount } from "@/api/index.js";

export default {
  name: "ResetAccountInfo",
  props: ["PhoneOrEmail"],
  data() {
    return {
      active: 1,
      title: this.PhoneOrEmail === "1" ? "修改密码" : "绑定邮箱"
    };
  },
  methods: {
    nextStep(form) {
      this.ValidResetCodeAsync(form);
    },
    ResetSuccess() {
      this.active = 3;
    },
    async ValidResetCodeAsync(form) {
      const result = await ValidPhoneCodeForAccount({
        Phone: form.Phone,
        WorkCode: form.WorkCode,
        Code: form.CaptchCode
      });
      if (result.code === 1) {
        this.active = 2;
      } else {
        this.$alertError(result.error);
      }
    }
  },
  computed: {},
  components: {
    PhoneVerify,
    ResetPassword,
    ResetEmail
  },
  created: function() {
    // console.log(this.cardData);
  }
};
</script>


<style scoped>
.demo-ruleForm {
  max-width: 450px;
  margin: 20px auto;
}
.steps_box {
  background-color: #ffffff;
  max-width: 840px;
  margin: 0 auto;
}
.reset_box {
  background-color: #ffffff;
  padding-bottom: 40px;
  padding-top: 40px;
}
.set_box {
  margin-top: 60px;
  margin-bottom: 60px;
}
.finish_p {
  text-align: center;
}
</style>
