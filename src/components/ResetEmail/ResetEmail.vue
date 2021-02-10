<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="邮箱" prop="Mail">
      <el-input type="text" v-model="ruleForm.Mail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from "vue";
import { ResetMail } from "@/api/index.js";
import { checkEmail } from "@/commen/js/commen.js";

export default {
  name: "ResetEmail",
  data() {
    return {
      ruleForm: {
        Mail: ""
      },
      rules: {
        Mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.ResetMailAsync();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async ResetMailAsync() {
      const result = await ResetMail({
        AccountName: JSON.parse(localStorage.DBJLoginName),
        Mail: this.ruleForm.Mail
      });
      if (result.code === 1) {
        this.$emit("reset-email");
      } else {
        this.$alertError(result.error);
      }
    }
  },
  mounted() {
    console.log(Vue);
  }
};
</script>

<style scoped>
.demo-ruleForm {
  width: 40%;
  max-width: 450px;
  margin: 20px auto;
}
</style>