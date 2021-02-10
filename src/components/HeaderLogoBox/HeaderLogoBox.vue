<template>
  <div class="header_box">
    <span class="nav_title title_style" @click="titleClick">{{ nav_title }}</span>
    <span class="nav_title_en">{{ nav_title_en }}</span>
    <div class="logo_box">
      <img class="logo_img" src="./images/foda_logo.svg" alt />
      <img class="logo_img" src="./images/cr_LOGO.svg" alt />
      <img class="logo_img" src="./images/bayer_.pic_hd.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderLogoBox",
  data() {
    return {
      nav_title: "碘对比剂扫描方案全面优化",
      nav_title_en: "U l t r a  \xa0  O p t i m i z a t i o n"
    };
  },
  methods: {
    titleClick() {
      this.$emit('title-click')  
    }
  }
};
</script>

<style scoped>
.header_box {
  height: 128px;
  background-image: linear-gradient(180deg, #ffffff 0%, #19aaf7 800%);
  /* background-color: #19aaf7; */
  position: relative;
}
.logo_box {
  position: absolute;
  top: 24px;
  right: 40px;
  z-index: 1000;
}
.logo_img {
  width: 80px;
  height: 80px;
}
.nav_title {
  font-size: 50px;
  position: absolute;
  top: 20px;
  left: 40px;
  z-index: 1000;
  cursor: pointer;
}
.nav_title_en {
  font-family: OpenSans-Italic;
  /* font-size: 30px; */
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  /* text-align: center; */
  position: absolute;
  bottom: 20px;
  left: 420px;
  z-index: 1000;
}
.title_style {
  font-family: YouSheBiaoTiHei;
  /* font-size: 70px; */
  /* color: #18b3e5; */
  letter-spacing: 0;
  text-align: center;
  /* background-image: linear-gradient(to right, #45ABE3, #D05D7F); */
  /* background-image: -webkit-gradient(
    linear,
    left 0,
    right 0,
    from(#45abe3),
    to(#d05d7f)
  ); */
  background-image: linear-gradient(to right, #45abe3 , #d05d7f);
  /*必需加前缀 -webkit- 才支持这个text值 */
  -webkit-background-clip: text;
  /*text-fill-color会覆盖color所定义的字体颜色： */
  -webkit-text-fill-color: transparent;
}
</style>