<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    autocomplete="off"
  >
    <el-form-item label="手机号" prop="Phone">
      <el-input v-model="ruleForm.Phone" placeholder="输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="CaptchCode">
      <el-input v-model="ruleForm.CaptchCode" placeholder="输入验证码" maxlength="6">
        <CaptchaButton slot="append" @get-code="getCode"></CaptchaButton>
      </el-input>
    </el-form-item>
    <el-form-item class="next_btn_box">
      <el-button class="next_btn" type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from 'vue'
import CaptchaButton from "../CaptchaButton/CaptchaButton";
import { VCODE_REG } from "../../commen/js/commen";

export default {
  name: "PhoneVerify",
  data() {
    var checkCaptchCode = (rule, value, callback) => {
      if (!VCODE_REG.test(value)) {
        callback(new Error("必须是6位数字"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!/^1(3|4|5|7|8|9)\d{9}$/.test(value)) {
        callback(new Error("手机号码格式不对"));
      } else {
        callback();
      }
    };

    return {
      workCode: 0,
      ruleForm: {
        AccountType: "0",
        Phone: "",
        CaptchCode: "",
        WorkCode: ""
      },
      rules: {
        Phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        CaptchCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: checkCaptchCode, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$emit("verify-success", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getCode(workCode) {
      this.workCode = workCode;
      this.ruleForm.WorkCode = workCode;
      this.getVerifyCode();
    },
    getVerifyCode() {
      this.getPhondeVerifyCode();
    },
    getPhondeVerifyCode() {
      //
      const t = this;
      const u = t.ruleForm.Phone;
      if (u == "") {
        return;
      }
      Vue.axios
        .post("/Captcha/CreateAndSendCaptcha", {
          Phone: u,
          WorkCode: t.workCode
        })
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            t.$message(response.data.Message);
            // console.log(response.data);
          }
        })
        .catch(error => {
          console.log(error.response.data.Message);
          t.$message.error(error.response.data.Message);
        });
    },
  },
  computed: {},
  components: {
    CaptchaButton: CaptchaButton
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>