<template>
  <div class="content_box">
    <div class="imgbox">
      <img src="@/assets/images/expert/committee2.svg" alt />
    </div>
    <div class="imgbox">
      <img src="@/assets/images/expert/head.svg" alt />
    </div>
    <div class="imgbox">
      <img src="@/assets/images/expert/chest.svg" alt />
    </div>
    <div class="imgbox">
      <img src="@/assets/images/expert/abdomen.svg" alt />
    </div>
    <div class="imgbox">
      <img src="@/assets/images/expert/peripheral.svg" alt />
    </div>
  </div>

  <!-- <div class="content_box">
    <el-carousel class="carouselBox" height="150px">
      <el-carousel-item v-for="url in imgs" :key="url">
        <el-image
          style="width: 100%;"
          :src="url"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div> -->
  
</template>

<script>
export default {
  name: "Expert",
  data() {
    return {
      // imgs: [require("@/pages/Expert/ExpertImages/committee.svg")],
    };
  },
};
</script>

<style scoped>
.content_box {
  /* background: url(../../assets/images/1611594024580_.pic.jpg) no-repeat right
    bottom;
  background-size: cover;
  min-height: 700px;
  min-width: 1000px; */

  margin-top: 0px;
  padding: 0px;
}
.imgbox {
  width: 100%;
  display: block;
}
img {
  width: 100%;
}
.carouselBox {

}
</style>