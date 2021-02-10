<template>
  <div class="upload_box">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <div class="video_box" v-if="!isUpload">
      <video
        :src="UrlLink"
        controls="controls"
        poster=""
        loop
        width="800"
        height="450"
      >
        您的浏览器不支持 video 标签。
      </video>
      <div>
        <el-button type="primary" @click="reUpload">重新上传</el-button>
      </div>
    </div>
    <div class="upload_video_content_box" v-else>
      <el-upload
        class="upload-demo"
        drag
        :action="actionUrl"
        :headers="req_header"
        :on-success="uploadSuccess"
        :on-error="uploadError"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">
          <p>1.请提供200张以上的案例影像图片，格式为JPG/PNG</p>
          <p>2.请将所有的图片压缩成一个文件后上传</p>
          <p>3.压缩文件不能超过100M</p>
        </div> -->
      </el-upload>
    </div>
    
  </div>
</template>

<script>
import Vue from "vue";
import { GetVideoLink } from "../../api/index";

export default {
  name: "UploadVideo",
  data() {
    return {
      title: "上传视频",
      caseID: this.$route.query.caseID,
      uploadAPI: 'UpLoadApiFile', // UpLoadVideoFile
      actionUrl: Vue.axios.defaults.baseURL + "/UploadDicom/UpLoadVideoFile?id=" + this.$route.query.caseID,
      // actionUrl: Vue.axios.defaults.baseURL + "/UploadDicom/UpLoadVideoFile",
      req_header: {
        Authorization: localStorage.getItem("UltraToken"),
      },
      post_Data: {
        Id: this.$route.query.caseID,
      },
      UrlLink: "",
      isUpload: true,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 上传成功
    uploadSuccess(res) {
      // this.$emit("upload-success", res);
      // console.log(res);
      // const that = this;
      this.UrlLink = res.UrlLink;
      if(this.UrlLink !== ''){
        this.isUpload = false;
        // that.UrlLink = URL.createObjectURL(new Blob([that.UrlLink], {type: 'video/mp4'}));
        this.$message({
           message: '上传成功',
           type: 'success'
        })
      }
    },
    // 上传失败
    uploadError(error){
      console.log(error);
      this.$message({
           message: '上传失败',
           type: 'error'
      })
    },
    // 获取视频链接
    async GetVideoLinkAsync() {
      const that = this;
      const r = await GetVideoLink({
        patientcaseid: that.caseID,
      });
      if (r.code === 1) {
        // console.log(r.data);
        that.UrlLink = r.data.VideoLink;
        if(that.UrlLink === ''){
          that.isUpload = true;
        }else{
          that.isUpload = false;
          // that.UrlLink = URL.createObjectURL(new Blob(that.UrlLink));
        }
      } else {
        this.$alertError(r.error);
      }
    },
    reUpload(){
      this.isUpload = true;
    }
  },
  mounted() {
    // console.log(this.caseID);
    this.GetVideoLinkAsync();
  },
};
</script>

<style scoped>
.upload_box {
  max-width: 1000px;
  background-color: #ffffff;
  padding: 20px;
  margin: 40px auto;
}
.upload_video_content_box {
  margin-top: 40px;
}
.video_box {
  padding: 20px;
}
</style>