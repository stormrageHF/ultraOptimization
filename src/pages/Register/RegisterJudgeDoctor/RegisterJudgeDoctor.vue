<template>
  <div class="register_info_box judge_box">
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
          <el-button type="primary" slot="append" @click="getVerifyCode">{{ verifyText }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="Mail">
        <el-input v-model="ruleForm.Mail" placeholder="输入邮箱地址" autocomplete="off"></el-input>
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

      <el-form-item>
        <el-button type="info" plain @click="goLogin">退出</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
// import { reqRegister } from "../../../api";
import { VCODE_REG, EMAIL_REG } from "@/commen/js/commen";

export default {
  name: "RegisterUserInfo",
  data() {
    // 手机号码格式规则
    var checkPhone = (rule, value, callback) => {
      if (!/^1(3|4|5|7|8|9)\d{9}$/.test(value)) {
        callback(new Error("手机号码格式不对"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      const patt = EMAIL_REG;
      if (!patt.test(value)) {
        // callback(new Error("邮箱格式不对"));
        callback();
      } else {
        callback();
      }
    };
    var checkCaptchCode = (rule, value, callback) => {
      if (!VCODE_REG.test(value)) {
        callback(new Error("必须是6位数字"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
      if (!reg.test(value)) {
        callback(new Error("密码包含字母和数字"));
      } else if (value.length < 6) {
        callback(new Error("密码至少6位"));
      } else {
        callback();
      }
    };
    var checkPassword2 = (rule, value, callback) => {
      if (value !== this.ruleForm.Password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    // var checkAgreement = (rule, value, callback) => {
    //   if (value) {
    //     callback();
    //   } else {
    //     callback(new Error("必须同意协议"));
    //   }
    // };
    return {
      agreement_text:
        "我已经看过并同意 《<xxxxxxxxxx>社有限责任公司网络使用协议》",
      workCode: 0,
      verifyText: "获取验证码",
      mailVerifyText: "获取邮件验证码",
      sintime: {},
      sinmailtime: {},
      ruleForm: {
        Phone: "",
        CaptchCode: "",
        WorkCode: "",
        Mail: "",
        Password: "",
        Password2: ""
      },
      rules: {
        Phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        CaptchCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: checkCaptchCode, trigger: "blur" }
        ],
        Mail: [
          { required: false, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        Password: [
          { required: true, message: "设置登录密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" }
        ],
        Password2: [
          { required: true, message: "再次输入密码", trigger: "blur" },
          { validator: checkPassword2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // 临时测试
      //   that.$router.push("/register/finishinfo");
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

      //验证码秒数倒数
      t.waitGetCode();
      //点一次获取一次服务码
      t.getWorkCode();
      //
      Vue.axios
        .post("/Captcha/CreateAndSendCaptcha", {
          Phone: u,
          WorkCode: t.workCode
        })
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            //              alert(response.data.Message);
            t.$message(response.data.Message);
            // console.log(response.data);
          }
        })
        .catch(error => {
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
      that.sintime = setInterval(function() {
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
    },
    register() {
      const that = this;
      Vue.axios
        .post("/Login/ManagerRegister", that.ruleForm)
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            const regUserInfo = response.data;
            localStorage.setItem("ultra_accountid", regUserInfo.Id);
            that.$store.dispatch("recordUser", regUserInfo);
            that.$alert("跳转到登录", "注册成功", {
              confirmButtonText: "确定",
              callback: action => {
                if (action == "confirm") {
                  that.$router.replace({ path: "/login" });
                }
              }
            });
            // that.$router.push("/register/finishinfo");
          }
        })
        .catch(error => {
          that.$message.error(error.response.data.Message);
        });
    }
  },
  computed: {},
  mounted: function() {}
};
</script>

<style scoped>
.userinfo {
  max-width: 400px;
  margin: 40px auto;
  box-sizing: border-box;
}
.judge_box {
  height: calc(100vh - 190px);
}
</style>