<template>
  <div class="find_pass_box greybg">
      <div class="top">
        <p>
          已有账号，
          <span class="blue" @click="goLogin">马上登录</span>
        </p>
      </div>
    <div class="column whitebg">
      <div>
        <h2>{{ sub_title }}</h2>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindPassword",
  data() {
    return {
      sub_title: this.$route.meta.subTitle
    };
  },
  methods: {
      goLogin(){
          this.$router.replace("/login")
      }
  },
  mounted: function() {},
  updated: function() {
    this.sub_title = this.$route.meta.subTitle;
    // console.log(this.$route.meta);
  }
};
</script>

<style scoped>
.find_pass_box {
  box-sizing: border-box;
  padding-bottom: 40px;
  margin-top: 100px;
}

.column {
  width: 968px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 40px;
  /* margin-top: -15px; */
}
.whitebg {
  background: #fff;
}
.column h2 {
  height: 60px;
  background: #3d5368;
  color: #65d3e3;
  padding-left: 30px;
  line-height: 60px;
}

.top {
  text-align: right;
  margin-right: 16px;
  line-height: 30px;
  background-color: #f6f8f9;
   width: 968px;
  margin: 0 auto;

}
.top p {
    margin-bottom: -12px;
}
.blue {
  cursor: pointer;
  color: #51b8cb;
}
</style>