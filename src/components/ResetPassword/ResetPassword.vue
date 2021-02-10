<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="旧密码" prop="old_pass">
      <el-input type="password" v-model="ruleForm.old_pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import Vue from "vue";
import { ResetPassword } from "@/api/index.js";

export default {
  name: "ResetPasswrod",
  data() {
    const tt = this;
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        // if(this.ruleForm.old_pass !== ""){
        //   this.$ref.ruleForm.validateField("old_pass");
        // }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== tt.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        old_pass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        old_pass: [{ validator: validateOldPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.ResetPasswordAsync();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async ResetPasswordAsync() {
      const t = this;
      const data = {
        OldPassword: t.ruleForm.pass,
        AccountName: JSON.parse(localStorage.DBJLoginName),
        NewPassword: t.ruleForm.pass
      };
      const result = await ResetPassword(data);
      if (result.code === 1) {
        this.$emit("reset-password");
      } else {
        this.$alertError(result.error);
      }
    },
  },
  mounted() {}
};
</script>

<style scoped>
.demo-ruleForm {
  width: 40%;
  max-width: 450px;
  margin: 20px auto;
}
.steps_box {
  background-color: #ffffff;
}
.reset_box {
  background-color: #ffffff;
}
</style>