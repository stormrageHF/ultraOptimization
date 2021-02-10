<template>
  <div class="content_box">
    <div class="side_box">
      <SideMenu :menuArr="sideMenuArr" @select-menu="selectMenu"></SideMenu>
    </div>

    <div class="body_box">
      <ResetAccountInfo key="setPassword" v-if="displayIndex==='1'" :PhoneOrEmail="displayIndex"></ResetAccountInfo>
      <ResetAccountInfo key="setEmail" v-else-if="displayIndex==='2'" :PhoneOrEmail="displayIndex"></ResetAccountInfo>
    </div>
  </div>
</template>

<script>
import ResetAccountInfo from "../../components/ResetAccountInfo/ResetAccountInfo";
import SideMenu from "../../components/SideMenu/SideMenu";
// import Vue from 'vue'

export default {
  name: "Setting",
  data() {
    return {
      displayIndex: "1",
      sideMenuArr: ["修改密码", "绑定邮箱"]
    };
  },
  methods: {
    selectMenu(index) {
      this.displayIndex = index;
    }
  },
  components: {
    SideMenu,
    ResetAccountInfo
  },
  mounted() {
    console.log(this);
    window.scroll({ top: 0, left: 0, behavior: "auto" });
  }
};
</script>

<style scoped>
.content_box {
  /* background-color: #ffffff; */
}
.side_box {
  width: 240px;
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 178px;
  transition: padding-top 0.3s;
}
.body_box {
  padding-left: 270px;
  padding-right: 170px;
  padding-top: 100px;
  /* width: calc(100% - 340px); */
}
</style>