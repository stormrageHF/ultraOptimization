<template>
  <div class="header_nav">
    <div class="header_content">
      <div class="nav_menu" v-if="$route.meta.showUserInfo">
        <HeaderMenu ref="el-header-menu" v-show="true"></HeaderMenu>
      </div>
      <!-- <div class="nav_section" v-show="$route.meta.showUserInfo">
        <div>
          <span>账号：</span>
          <span>{{ username }}</span>
          <span></span>
          <span class="exit_btn" @click="exit_func">退出</span>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import HeaderMenu from "../HeaderMenu/HeaderMenu";

export default {
  name: "HeaderNav",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    // exit_func() {
    //   // this.$store.commit("clear");
    //   this.$router.replace("/login");
    //   localStorage.removeItem("UltraToken");
    //   localStorage.removeItem("DBJLoginInfo");
    //   localStorage.removeItem("DBJLoginName");
    //   localStorage.removeItem("DBJLoginDate");
    //   localStorage.removeItem("DBJAccountGrade");
    // }
    // get_data(obj) {
    //    this.$refs.child.get_data(obj.id, obj.name);
    // }
  },
  components: {
    HeaderMenu: HeaderMenu
  },
  computed: {},
  updated() {
    if (localStorage.DBJLoginName) {
      // this.username = JSON.parse(localStorage.DBJLoginName);
      this.username = localStorage.DBJLoginName;
    }
  },
  mounted: function() {
    if (localStorage.DBJLoginName) {
      // this.username = JSON.parse(localStorage.DBJLoginName);
      this.username = localStorage.DBJLoginName;
    }
  }
};
</script>

<style scoped>
@import "../../commen/css/global.css";

.header_nav {
  height: 51px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6 !important;
  background-image: linear-gradient(90deg, #45abe3 18%, #d05d7f 100%);
}
.header_content {
  /* max-width: 1300px; */
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.nav_log_box {
  float: left;
  height: 100%;
  /* padding-left: 40px; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo_img {
  height: 60px;
  /* width: 60px; */
  margin-right: 0px !important;
}

.nav_title {
  padding: 18px;
  display: inline-block;
  /* float: left; */
  color: black;
  /* font-weight: 100; */
  font-size: 25px;
}

.title_text {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: bold;
  vertical-align: baseline;
  color: #000000;
}

.nav_menu {
  float: left;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: flex-end;
}

.nav_section {
  display: inline-block;
  float: right;
  color: #000000;
  margin-right: 50px;
  text-align: left;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */
}

.exit_btn {
  cursor: pointer;
  padding-left: 15px;
}
.title_style {
  font-family: YouSheBiaoTiHei;
  font-size: 70px;
  color: #18b3e5;
  letter-spacing: 0;
  text-align: center;
  /* background-image: linear-gradient(to right, #45ABE3, #D05D7F); */
  background-image: -webkit-gradient(
    linear,
    left 0,
    right 0,
    from(#45abe3),
    to(#d05d7f)
  );
  /*必需加前缀 -webkit- 才支持这个text值 */
  -webkit-background-clip: text;
  /*text-fill-color会覆盖color所定义的字体颜色： */
  -webkit-text-fill-color: transparent;
}
</style>