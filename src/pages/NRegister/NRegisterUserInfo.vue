<template>
  <div class="register_info_box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      autocomplete="off"
    >
      <el-form-item label="手机号" prop="Phone">
        <el-input
          v-model="ruleForm.Phone"
          placeholder="输入手机号"
          maxlength="11"
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="CaptchCode">
        <el-input
          v-model="ruleForm.CaptchCode"
          placeholder="输入验证码"
          maxlength="6"
        >
          <el-button
            :disabled="phoneDisabled"
            type="primary"
            slot="append"
            @click="getVerifyCode"
            >{{ verifyText }}</el-button
          >
        </el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="Mail">
        <el-input
          v-model="ruleForm.Mail"
          placeholder="输入邮箱地址"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="医院" prop="Hospital">
        <el-input v-model="ruleForm.Hospital" placeholder="输入医院"></el-input>
      </el-form-item>

       <el-form-item label="科室" prop="Department">
        <el-input v-model="ruleForm.Department" placeholder="输入科室"></el-input>
      </el-form-item>

      <el-form-item label="登录密码" prop="Password">
        <el-input
          v-model="ruleForm.Password"
          placeholder="设置登录密码"
          show-password
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="Password2">
        <el-input
          v-model="ruleForm.Password2"
          placeholder="确认登录密码"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="isAgreement">
        <el-checkbox v-model="ruleForm.isAgreement">
          <el-link
            href="https://cdn.ultra-optimization.com/agree.html"
            target="_blank"
            type="primary"
            >{{ agreement_text }}</el-link
          >
        </el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="info" plain @click="goLogin">退出</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
// import { QueryUserRegister } from "@/api";
import {
  checkPhone,
  checkEmail,
  checkPassword,
  checkCaptchCode,
} from "@/commen/js/commen";

export default {
  name: "NRegisterUserInfo",
  data() {
    const checkPassword2 = (rule, value, callback) => {
      if (value !== this.ruleForm.Password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    var checkAgreement = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请同意协议"));
      }
    };
    return {
      phoneDisabled: false,
      mailDisabled: false,
      agreement_text:
        "我已经看过并同意 《中华国际医学交流基金会网络使用服务协议》",
      workCode: 0,
      verifyText: "获取验证码",
      sintime: {},
      sinmailtime: {},
      ruleForm: {
        Phone: "",
        CaptchCode: "",
        WorkCode: "",
        Mail: "",
        Name: "",
        Hospital: "",
        Department:"",
        Password: "",
        Password2: "",
        isAgreement: false,
      },
      rules: {
        Phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        CaptchCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: checkCaptchCode, trigger: "blur" },
        ],
        Mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Hospital: [{ required: true, message: "请输入医院", trigger: "blur" }],
        Department: [{ required: true, message: "请输入科室", trigger: "blur" }],
        Password: [
          { required: true, message: "设置登录密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" },
        ],
        Password2: [
          { required: true, message: "再次输入密码", trigger: "blur" },
          { validator: checkPassword2, trigger: "blur" },
        ],
        isAgreement: [{ validator: checkAgreement }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // 临时测试
      // that.$router.push("/register/finishinfo");
    },
    goLogin() {
      this.$router.replace("/login");
    },
    getVerifyCode() {
      // 主动校验手机号是否满足条件
      this.$refs.ruleForm.validateField("Phone");
      //
      const t = this;
      const u = t.ruleForm.Phone;
      if (u == "") {
        return;
      }
      t.phoneDisabled = true;
      //验证码秒数倒数
      t.waitGetCode();
      //点一次获取一次服务码
      t.getWorkCode();
      //
      Vue.axios
        .post("/Captcha/CreateAndSendCaptcha", {
          Phone: u,
          WorkCode: t.workCode,
        })
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            //              alert(response.data.Message);
            t.$message(response.data.Message);
            // console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.Message);
          t.stopTime();
          t.$message.error(error.response.data.Message);
        });
    },
    getWorkCode() {
      this.workCode = parseInt(Math.random() * 10000);
      this.ruleForm.WorkCode = this.workCode;
    },
    waitGetCode() {
      let s = 60;
      const that = this;
      that.sintime = setInterval(function () {
        if (s > 0) {
          s--;
          that.verifyText = s + "秒";
        }
        if (s == 0) {
          s = 60;
          that.stopTime();
        }
      }, 1000);
    },
    stopTime() {
      clearInterval(this.sintime);
      this.verifyText = "获取验证码";
      this.phoneDisabled = false;
    },

    getMailVerifyCode() {
      // 主动校验手机号是否满足条件
      this.$refs.ruleForm.validateField("Mail");
      //
      const t = this;
      const u = t.ruleForm.Mail;
      if (u == "") {
        return;
      }
      t.mailDisabled = true;
      //验证码秒数倒数
      t.waitGetMailCode();
      // //点一次获取一次服务码
      // t.getWorkCode();
      // //
      Vue.axios
        .post("/Login/SendValidMain", {
          Mail: u,
        })
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            console.log(response);
            t.$message("邮件验证码已发送");
          }
        })
        .catch((error) => {
          console.log(error.response.data.Message);
          t.stopMaileTime();
          t.$message.error(error.response.data.Message);
        });
    },

    waitGetMailCode() {
      let s = 60;
      const that = this;
      that.sinmailtime = setInterval(function () {
        if (s > 0) {
          s--;
          that.mailVerifyText = s + "秒";
        }
        if (s == 0) {
          s = 60;
          that.stopMaileTime();
        }
      }, 1000);
    },
    stopMaileTime() {
      clearInterval(this.sinmailtime);
      this.mailVerifyText = "获取邮件验证码";
      this.mailDisabled = false;
    },
    loginRequest(func) {
      const t = this;
      const u = t.ruleForm.Phone;
      const p = t.ruleForm.Password;
      Vue.axios
        .post("/Login/ValidateUserByPasswordForToken", {
          AccountName: u,
          Password: p,
        })
        .then((response) => {
          if (typeof func == "function") {
            func(response);
          }
        })
        .catch((error) => {
          if (typeof func == "function") {
            func(error);
          }
        });
    },
    register() {
      const that = this;
      Vue.axios
        .post("/Login/QueryUserRegister", that.ruleForm)
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            const regUserInfo = response.data;
            localStorage.setItem("ultra_accountid", regUserInfo.Id);
            that.$store.dispatch("recordUser", regUserInfo);
            // 注册成功 开始登录
            that.loginRequest(function (res) {
              if (res.status == 204 || res.status == 200) {
                res.data.AccountGrade = 6; // 全部都是6
                that.$store.dispatch(
                  "recordAccountGrade",
                  res.data.AccountGrade
                );
                that.saveInfo(res.data);
                if (res.data.AccountGrade === 6) {
                  that.$router.replace("/CaseList");
                }
              } else {
                that.$message.error(res.response.data.Message);
              }
            });
          }
        })
        .catch((error) => {
          that.$message.error(error.response.data.Message);
        });
    },
  },
  computed: {},
  mounted: function () {},
};
</script>

<style scoped>
.userinfo {
  max-width: 400px;
  margin: 40px auto;
  box-sizing: border-box;
}
</style>