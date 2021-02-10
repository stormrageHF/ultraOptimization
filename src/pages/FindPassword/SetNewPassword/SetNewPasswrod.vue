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

      <el-form-item label="新密码" prop="Password">
        <el-input
          v-model="ruleForm.Password"
          placeholder="设置新密码"
          show-password
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="Password2">
        <el-input v-model="ruleForm.Password2" placeholder="确认新密码" show-password autocomplete="off"></el-input>
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
import { PASSWORD_REG } from "../../../commen/js/commen";
import { mapState } from "vuex";

export default {
  name: "SetNewPassword",
  data() {
    var checkPassword = (rule, value, callback) => {
      if (!PASSWORD_REG.test(value)) {
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

    return {
      ruleForm: {
        Password: "",
        Password2: ""
      },
      rules: {
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
          that.ResetPasswordByAccount();
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // 临时测试
      // that.$router.push("/register/finishinfo");
    },
    ResetPasswordByAccount() {
      const that = this;
      Vue.axios
        .post("/Login/ResetPasswordByAccount", {
          account: that.findPasswordAccount.account,
          AccountType: that.findPasswordAccount.way,
          NewPassword: that.ruleForm.Password
        })
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            that.$router.push("/findpassword/findsuccess");
          }
        })
        .catch(error => {
          that.$message.error(error.response.data.Message);
        });
    }
  },
  computed: {
    ...mapState(["findPasswordAccount"])
  },
  mounted: function() {}
};
</script>

<style scoped>

</style>