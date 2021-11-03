<template>
  <div class="menu_box">
    <el-menu
      :default-active="activeNum"
      class="el-menu-vertical-demo"
      mode="horizontal"
      background-color="transparent"
      text-color="#ffffff"
      active-text-color="WhiteSmoke"
      @open="handleOpen"
      @close="handleClose"
      @select="select_menu"
    >
      <el-menu-item class="el-menu-item_cus" index="1">
        <!-- <i class="el-icon-video-camera"></i> -->
        <span slot="title">项目介绍</span>
      </el-menu-item>
      <el-menu-item class="el-menu-item_cus" index="2">
        <span slot="title">评审专家名单</span>
      </el-menu-item>
      <el-menu-item class="el-menu-item_cus" index="11">
        <span slot="title">优秀案例名单</span>
      </el-menu-item>
      <el-menu-item class="el-menu-item_cus" index="3" v-show="accountGrade===-1">
        <span slot="title">注册/登录</span>
      </el-menu-item>

      <!-- <el-menu-item class="el-menu-item_cus" index="4" v-show="accountGrade===-1">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            注册
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="newUserRegister">新用户注册</el-dropdown-item>
            <el-dropdown-item command="expertRegister">点评专家注册</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item> -->

      <el-menu-item class="el-menu-item_cus" index="10" v-show="accountGrade === 6">
        <span slot="title">优秀案例</span>
      </el-menu-item>

      <el-menu-item class="el-menu-item_cus" index="5" v-show="accountGrade === 0">
        <span slot="title">提交案例</span>
      </el-menu-item>
      <el-menu-item class="el-menu-item_cus" index="6" v-show="accountGrade===1">
        <span slot="title">评审案例</span>
      </el-menu-item>
      <el-menu-item class="el-menu-item_cus" index="9" v-show="accountGrade===1">
        <span slot="title">方案点评</span>
      </el-menu-item>
      
      
      <el-menu-item class="el-menu-item_cus" index="7" v-show="accountGrade===2">
        <!-- <span slot="title">用户管理</span> -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            后台管理
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="accountManager">用户管理</el-dropdown-item>
            <el-dropdown-item command="allCase">查看案例</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item class="el-menu-item_cus" index="8" v-show="accountGrade!==-1">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            账号设置
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="exitItem" command="exit_func">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import Vue from "vue";
import { mapState } from "vuex";

export default {
  name: "HeaderMenu",
  data() {
    return {
      activeNum: this.$route.meta.activeNum || "1",
      data11: [],
      appoint_name: "",
      appoint_id: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select_menu(key, keyPath) {
      console.log(key, keyPath);
      this.activeNum = key + "";
      if (this.$store.state.detailIsEdited) {
        this.$message({
          showClose: true,
          message: "您还没有修改完",
          type: "warning",
        });
        return;
      }
      if (key == 1) {
        this.$router.push({ path: "/msite" });
      }
      if (key == 2) {
        this.$router.push({ path: "/expert" });
      }
      if (key == 3) {
        this.$router.push({ path: "/login" });
      }
      if (key == 4) {
        // this.$router.push({ path: "/msite" });
      }
      if (key == 5) {
        this.$router.push({ path: "/case" });
      }
      if (key == 6) {
        this.$router.push({ path: "/review" });
      }
      if (key == 7) {
        // this.$router.push({ path: "/account" });
      }
      if (key == 8) {
        this.$router.push({ path: "/setting" });
      }
      if (key == 9) {
        this.$router.push({ path: "/VideoReview" });
      }
      if(key == 10) {
        this.$router.push({ path: "/caselist" })
      }
      if(key == 11) {
        this.$router.push({ path: "/namelist" })
      }
    },
    errorMessage: function (res) {
      const error = res.response.data.Message;
      this.$message.error(error);
    },
    exit_func() {
      // this.$store.commit("clear");
      this.$router.replace("/login");
      localStorage.removeItem("UltraToken");
      localStorage.removeItem("DBJLoginInfo");
      localStorage.removeItem("DBJLoginName");
      localStorage.removeItem("DBJLoginDate");
      // localStorage.setItem("DBJAccountGrade", -1);
      this.$store.dispatch("recordAccountGrade", -1);
    },
    handleCommand(command) {
      if (command == "newUserRegister") {
        this.newUserRegister();
      }
      if (command == "expertRegister") {
        this.expertRegister();
      }
      if (command == "exit_func") {
        this.exit_func();
      }
      if (command == "accountManager") {
        this.accountManager();
      }
      if (command == "allCase") {
        this.allCase();
      }
    },
    newUserRegister() {
      this.$router.push("/register");
    },
    expertRegister() {
      this.$router.push("/register/registerjudge");
    },
    accountManager() {
      this.$router.push({ path: "/account" });
    },
    allCase() {
      this.$router.push({ path: "/allCase" });
    },
  },
  computed: {
    ...mapState(["accountGrade"]),
  },
  created: function () {
    // this.activeNum = this.$route.meta.activeNum;
    // console.log(this);
    // console.log(this.accountGrade);
    console.log(this.$route.meta.activeNum);
  },
  mounted() {},
  updated() {
    // alert(this.accountGrade);
    // alert(this.$route.meta.activeNum);
    // console.log(this.accountGrade)
    console.log("12312313123");
    setTimeout(() => {
      this.activeNum = this.$route.meta.activeNum;
    }, 100);
  },
};
</script>


<style scoped>
.exitItem {
  font-family: SourceHanSansSC-Medium, Avenir, Helvetica, Arial, sans-serif,
    "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, MingLiu;
}

span {
  font-size: 18px;
  margin-block-start: 0;
  margin-block-end: 0;
  font-weight: 400;
  font-family: SourceHanSansSC-Medium;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}
.sub_h2 {
  display: inline;
}
.el-menu-item_cus {
  height: 50px !important;
  line-height: 50px !important;
}
.el-menu-item_cus * {
  vertical-align: baseline;
}
.el-menu--popup {
  background-color: #ffffff !important;
}
.el-dropdown {
  color: #ffffff;
}
.el-menu-item:hover {
  /* background-color: #000000; */
  /* height: 55px!important; */
  background-color: transparent !important;
  opacity: 0.8;
}
</style>

