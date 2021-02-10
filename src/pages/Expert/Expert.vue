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
</template>

<script>
export default {
  name: "Expert"
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
</style>