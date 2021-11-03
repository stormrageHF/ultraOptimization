<template>
  <div class="content_box">
    <div class="imgbox" v-for="img in imgs" :key="img">
      <img :src="img" alt />
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
  name: "NameList",
  data() {
    return {
      imgs: [
        require("@/pages/NameList/NameImages/excellent1.jpg"),
        require("@/pages/NameList/NameImages/excellent2.jpg"),
        require("@/pages/NameList/NameImages/excellent3.jpg"),
        require("@/pages/NameList/NameImages/excellent4.jpg"),
        require("@/pages/NameList/NameImages/excellent5.jpg"),
        require("@/pages/NameList/NameImages/excellent6.jpg"),
        require("@/pages/NameList/NameImages/excellent7.jpg"),
        require("@/pages/NameList/NameImages/excellent8.jpg"),
        require("@/pages/NameList/NameImages/excellent9.jpg"),
      ],
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
  vertical-align: middle;
}
.carouselBox {
}
</style>