<template>
  <div class="find_password_box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      autocomplete="off"
    >
      <el-form-item>
        <el-radio v-model="ruleForm.way" label="0">手机号找回</el-radio>
        <el-radio v-model="ruleForm.way" label="1">邮箱找回</el-radio>
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          v-model="ruleForm.account"
          type="text"
          :placeholder="ruleForm.way === '0' ? '输入您注册的手机号' : '输入您注册的邮箱'"
        ></el-input>
      </el-form-item>
      <el-form-item class="next_btn_box">
        <el-button class="next_btn" type="primary" @click="nextStep('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { PHONE_REG, EMAIL_REG } from "../../../commen/js/commen";
import Vue from 'vue'

export default {
  name: "FindWay",
  data() {
    var checkAccount = (rule, value, callback) => {
      if (this.ruleForm.way === "0") {
        if (!PHONE_REG.test(value)) {
          callback(new Error("手机号码格式不对"));
        } else {
          callback();
        }
      } else {
        if (!EMAIL_REG.test(value)) {
          callback(new Error("邮箱格式不对"));
          // callback();
        } else {
          callback();
        }
      }
    };
    return {
      placeholder: "输入您注册的手机号",
      ruleForm: {
        way: "0",
        account: ""
      },
      rules: {
        account: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: checkAccount, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    nextStep: function(formName) {
      //   const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ValidAccount();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ValidAccount() {
      const that = this;
      Vue.axios
        .post("/Login/ValidAccount", {
          Account: that.ruleForm.account,
          AccountType: that.ruleForm.way
        })
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            let accountInfo = {
              account: that.ruleForm.account,
              way: that.ruleForm.way
            };
            that.$store.dispatch("recordAccount", accountInfo);
            that.$router.push("/findpassword/findvcode");
          }
        })
        .catch(error => {
          that.$message.error(error.response.data.Message);
        });
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.find_password_box {
  width: 350px;
}
</style>