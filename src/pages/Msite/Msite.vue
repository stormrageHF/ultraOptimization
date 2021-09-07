<template>
  <div class="content_box">
    <div class="video_box">
      <el-carousel
        height="450px"
        arrow="always"
        indicator-position="outside"
        interval="10000"
      >
        <el-carousel-item key="img">
          <div>
            <img
              style="width: 800px"
              src="./images/bgLogo.png"
              alt=""
            />
          </div>
        </el-carousel-item>
        <el-carousel-item key="video">
          <div>
            <video
              src="https://video.idoctor.cc/cabea50bed3e4cf0b84ea8304754771f/d2fddb36b422f5023df60ff1caff3b00-fd.mp4"
              controls="controls"
              poster="https://video.idoctor.cc/image/cover/E0374B9C0E2C4B8A8CED7C5F6C5913F7-6-2.png"
              loop
              width="800"
              height="450"
            >
              您的浏览器不支持 video 标签。
            </video>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Msite",
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style scoped>
.content_box {
  background: url(../../assets/images/1611594024580_.pic.jpg) no-repeat right
    bottom;
  background-size: cover;
  min-height: 700px;
  min-width: 1000px;
  /* width: 100%; */
  /* height: calc(100vh - 190px); */
  /* height: 1000px; */
  /* z-index: 0; */
  margin-top: 0px;
  padding: 0px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}
.content_box {
  min-height: 750px;
  height: 100%;
  /* margin: 40px auto 0; */
  box-sizing: border-box;
}
.video_box {
  position: absolute;
  width: 800px;
  height: 450px;
  left: 160px;
  top: 110px;
  /* background-color: #ffffff; */
}
</style>