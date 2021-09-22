<template>
  <div id="main">
    <!-- <div class="img_box">
      <img class="bg_img" src="./images/ultraBgLogo.jpg" alt="bgimg">
    </div>-->
    <div class="login_box_content">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
        <el-form-item class="custom_item" label="帐号" prop="username">
          <el-input
            type="text"
            placeholder="邮箱/手机号"
            prefix-icon="el-icon-user"
            v-model="ruleForm2.username"
            auto-complete="off"
            @keyup.enter.native="submitForm('ruleForm2')"
          ></el-input>
        </el-form-item>

        <el-form-item class="custom_item" label="密码" prop="password">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm2.password"
            auto-complete="off"
            maxlength="18"
            v-on:keyup.enter.native="submitForm('ruleForm2')"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item class="custom_item" label="验证码" prop="vCode">
          <el-input
            type="text"
            placeholder="验证码"
            prefix-icon="el-icon-finished"
            v-model="ruleForm2.vcode"
            auto-complete="off"
            maxlength="4"
            v-on:keyup.enter.native="submitForm('ruleForm2')"
          >

            <template class="append_box" slot="append">
              <img class="vcodeImg" :src="vcodeurl" title="看不清楚，换一张" />
            </template>
          </el-input>
        </el-form-item>-->

        <div>
          <label class="el-form-item__label forget" @click="findPassword">忘记密码？</label>
        </div>

        <el-form-item class="btn_box">
          <el-button class="login_btn" type="primary" @click="submitForm('ruleForm2')">登 录</el-button>
        </el-form-item>

        <el-form-item>
          <el-button class="n_register_btn" type="primary" @click="goNewRegister">用户注册</el-button>
          <!-- <el-button class="register_btn" type="text" @click="goRegister">新用户注册</el-button> -->
          <!-- <el-button class="register_btn" type="text" @click="goJudgeRegister">点评专家注册</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="company-info-box">
      <span>京ICP备16058577号</span>
      <span class="company_name">联系我们 contact@ultra-optimization.com</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Base64 } from "js-base64";

export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      } else {
        callback();
      }
    };

    var validateVcode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    return {
      vcodeurl: "http://cmaes.medline.org.cn/ajax/validateCode.ashx",
      workCode: 0,
      labelPosition: "top",
      sintime: {},
      ruleForm2: {
        username: "",
        password: "",
        vcode: ""
      },
      rules2: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        vcode: [{ validator: validateVcode, trigger: "blur" }]
      },
      img_url: "./images/ultraBgLogo.jpg"
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.loginRequest(function(res) {
            if (res.status == 204 || res.status == 200) {
              if(res.data.AccountGrade != 2){ // 非管理员
                res.data.AccountGrade = 6; // 全部都是6
              }
              that.$store.dispatch("recordAccountGrade", res.data.AccountGrade);
              that.saveInfo(res.data);
              if (res.data.IsNeedUserInfo) {
                localStorage.setItem("ultra_accountid", res.data.ID);
                that.$router.push("./register/finishinfo");
              } else {
                // that.$message.success("登录成功");
                if (res.data.AccountGrade === 0) {
                  that.$router.replace("/case");
                } else if (res.data.AccountGrade === 1) {
                  that.$router.replace("/VideoReview");
                } else if (res.data.AccountGrade === 2) {
                  that.$router.replace("/account");
                }  else if (res.data.AccountGrade === 6) {
                  that.$router.replace("/CaseList");
                }else {
                  that.$router.replace("/");
                }
              }
            } else {
              that.$message.error(res.response.data.Message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveInfo(data) {
      const that = this;
      const s = Base64.encode(data.ID + ":" + data.Token);
      localStorage.setItem("UltraToken", s);
      localStorage.DBJLoginDate = new Date().toDateString();
      localStorage.DBJLoginInfo = JSON.stringify(that.ruleForm2);
      localStorage.DBJLoginName = data.AccountName;
      Vue.axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "UltraToken"
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginRequest(func) {
      const t = this;
      const u = t.ruleForm2.username;
      const p = t.ruleForm2.password;
      Vue.axios
        .post("/Login/ValidateUserByPasswordForToken", {
          AccountName: u,
          Password: p
        })
        .then(response => {
          if (typeof func == "function") {
            func(response);
          }
        })
        .catch(error => {
          if (typeof func == "function") {
            func(error);
          }
        });
    },
    goNewRegister(){
      this.$router.push("/nRegister")
    },
    goRegister() {
      this.$router.push("/register");
    },
    goJudgeRegister() {
      this.$router.push("/register/registerjudge");
    },
    findPassword() {
      this.$router.push("/findpassword");
    }
  },
  computed: {},
  mounted: function() {
    // const that = this;
    // document.onkeydown = function(event) {
    //   const e = event || window.event || arguments.callee.caller.arguments[0];
    //   const _key = e.keyCode;
    //   if (_key === 13) {
    //     that.submitForm("ruleForm2");
    //   }
    // };
    //
    // if (localStorage.SFYLoginInfo) {
    //   that.ruleForm2 = JSON.parse(localStorage.SFYLoginInfo);
    // }
  }
};
</script>

<style scoped>
#main {
  background: url(../../assets/images/1611594024580_.pic.jpg) no-repeat right bottom;
  background-size: cover;
  min-height: 100%;
  min-width: 1000px;
  /* width: 100%; */
  /* height: calc(100vh - 190px); */
  /* height: 1000px; */
  /* z-index: 0; */
  margin-top: 0px;
  padding: 0px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}
.img_box {
  padding: 0;
  margin: 0;
}
.bg_img {
  width: 100%;
  /* height: 100%; */
  display: block;
}
.logo_box {
  text-align: center;
  /* margin-bottom: 30px; */
}
.header_box {
  line-height: 100px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  color: #006273;
}
.title_box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo_img {
  height: 90px;
  /* width: 90px; */
  margin-right: 10px;
}
.login_log {
  height: 35px;
  vertical-align: baseline;
  margin-right: 10px;
  display: none;
}
.login_box {
  margin: 0 auto;
  /* margin-top: 60px; */
  background-color: #ffffff;
}
.login_box h1 {
  text-align: center;
}
.login_box_content {
  width: 300px;
  /*border: 1px solid #e6e6e6;*/
  border-radius: 5px;
  padding: 30px;
  margin: 0 auto;
  background-color: #ffffff;
  position: absolute;
  left: 9%;
  top: calc(100vh - 402px) / 2;
  z-index: 1000;
}

.get_verify_btn {
  float: right;
}

.login_btn {
  width: 100%;
  margin-top: 20px;
}
.register_btn {
  width: 45%;
}
.n_register_btn {
  width: 100%;
}
.custom_item {
  margin-bottom: 10px !important;
}
.btn_box {
  margin-top: 40px;
  margin-bottom: 20px;
}

.vcodeImg {
  height: 30px;
}
.append_box {
  padding: 0 10px;
}
.forget {
  color: black;
  cursor: pointer;
}
.company-info-box {
  background-color: transparent;
  display: block;
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 40px;
  z-index: 1000;
}
.company_name {
  padding-left: 20px;
}
</style>>

