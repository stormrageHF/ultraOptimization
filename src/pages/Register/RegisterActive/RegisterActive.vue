<template>
  <div class="register_info_box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>
        <span>已经给您的邮箱{{ regUserInfo.Mail }}发送了验证邮件</span>
      </el-form-item>
      <!-- <el-form-item label="邮箱激活码" prop="ecode">
        <el-input v-model="ruleForm.ecode" type="text"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button type="info" plain @click="goLogin">退出</el-button> -->
        <el-button type="primary">
          <a :href="mailto">查看邮箱 </a>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RegisterActive",
  data() {
    return {
      mailto: "mailto:",
      ruleForm: {
        ecode: ""
      },
      rules: {
        ecode: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          //   that.$router.push("/register/finishinfo");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      that.$router.push("/register/finishinfo");
    }
  },
  computed: {
    ...mapState(["regUserInfo"])
  },
  mounted: function() {
    console.log(this.regUserInfo);
    this.mailto += this.regUserInfo.Mail
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff
}
</style>