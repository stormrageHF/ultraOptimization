<template>
  <div class="find_password_box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      autocomplete="off"
    >
      <el-form-item :label="findPasswordAccount.way === '0' ? '手机号' : '邮箱'">
        <span>{{ findPasswordAccount.account }}</span>
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
  </div>
</template>

<script>
import Vue from "vue";
// import { reqRegister } from "../../../api";
import { VCODE_REG } from "../../../commen/js/commen";
import { mapState } from "vuex";
import CaptchaButton from "../../../components/CaptchaButton/CaptchaButton";

export default {
  name: "FindVcode",
  data() {
    var checkCaptchCode = (rule, value, callback) => {
      if (!VCODE_REG.test(value)) {
        callback(new Error("必须是6位数字"));
      } else {
        callback();
      }
    };

    return {
      workCode: 0,
      ruleForm: {
        way: "",
        account: "",
        Phone: "",
        CaptchCode: "",
        WorkCode: "",
        Mail: ""
      },
      rules: {
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
          that.ValidResetCode();
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
    getCode(workCode) {
      this.workCode = workCode;
      this.ruleForm.WorkCode = workCode;
      this.getVerifyCode();
    },
    getVerifyCode() {
      if (this.findPasswordAccount.way === "0") {
        this.getPhondeVerifyCode();
      } else {
        this.getMailVerifyCode();
      }
    },
    getPhondeVerifyCode() {
      //
      const t = this;
      const u = t.findPasswordAccount.account;
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
    getMailVerifyCode() {
      //
      const t = this;
      const u = t.findPasswordAccount.account;
      if (u == "") {
        return;
      }
      Vue.axios
        .post("/Login/SendValidMain", {
          Mail: u
        })
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            console.log(response);
            t.$message("邮件验证码已发送");
          }
        })
        .catch(error => {
          console.log(error.response.data.Message);
          t.$message.error(error.response.data.Message);
        });
    },
    ValidResetCode() {
      const that = this;
      var obj = {
        AccountType: that.findPasswordAccount.way,
        Phone: that.findPasswordAccount.account,
        WordCode: that.ruleForm.WorkCode,
        EMail: that.findPasswordAccount.account,
        Code: that.ruleForm.CaptchCode
      };
      Vue.axios
        .post("/Login/ValidResetCode", obj)
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            that.$router.push("/findpassword/setnewpassword");
          }
        })
        .catch(error => {
          that.$message.error(error.response.data.Message);
        });
    },
    
  },
  computed: {
    ...mapState(["findPasswordAccount"])
  },
  components: {
    CaptchaButton: CaptchaButton
  },
  mounted: function() {
    // this.ruleForm.account = this.findPasswordAccount.account;
    // this.ruleForm.way = this.findPasswordAccount.way;
    console.log(this.ruleForm);
  }
};
</script>

<style scoped>
</style>