<template>
  <div id="app">
    <el-container>
      <el-header style="height: 0px">
        <HeaderLogoBox @title-click='titleClick'></HeaderLogoBox>
        <HeaderNav ref="cus-header-nav" v-show="true"></HeaderNav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer v-show="false">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav/HeaderNav.vue";
import Footer from "./components/Footer/Footer.vue";
import HeaderLogoBox from "./components/HeaderLogoBox/HeaderLogoBox.vue";

export default {
  name: "App",
  data() {
    return {
      isLoginView: this.$route.path === "/login"
    };
  },
  methods:{
    titleClick(){
      this.$router.push({ path: "/msite" });
      this.$refs['cus-header-nav'].$refs['el-header-menu'].activeNum = "1"
    }
  },
  components: {
    HeaderNav,
    Footer,
    HeaderLogoBox
  },
  created() {
    document.title = "碘对比剂扫描方案全面优化系统";
  },
  mounted() {
    // this.isLoginView = this.$route.path === '/login'
  },
  updated() {
    this.isLoginView = this.$route.path === "/login";
  }
};
</script>

<style>
@import "./commen/font/font.css";

</style>

<style scoped>
#app {
  font-family: SourceHanSansSC-Medium ,Avenir, Helvetica, Arial, sans-serif,"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,MingLiu ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  /* min-height: 750px; */
  min-width: 1000px;
  position: relative;
}

.el-header {
  padding: 0;
  /* height: 128px !important; */
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1500;
  min-width: 1000px;
  /* display: none; */
}

.el-main {
  height: calc(100vh - 178px);
}

.el-main {
  padding: 0;
  background-color: #f6f8f9;
  margin-top: 178px;
}

.el-footer {
  padding: 0 !important;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1500;
  height: 90px !important;
}
.max_main {
  margin-top: 0;
}

</style>
<style>
.find_password_box, .register_info_box {
  max-width: 400px;
  margin: 40px auto;
  box-sizing: border-box;
}
</style>


