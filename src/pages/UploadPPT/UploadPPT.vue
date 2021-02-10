<template>
  <div class="upload_box">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <div class="video_box" v-if="!isUpload">
      <div style="margin: 20px 0;">
          <el-link type="primary" :href="UrlLink">下载{{ pptName }}</el-link>
      </div>
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
      </el-upload>
    </div>
    
  </div>
</template>

<script>
import Vue from "vue";
import { GetPPTInfo } from "../../api/index";

export default {
  name: "UploadPPT",
  data() {
    return {
      title: "上传PPT",
      caseID: this.$route.query.caseID,
      uploadAPI: 'UpLoadPPTFile', // UpLoadPPTFile
      actionUrl: Vue.axios.defaults.baseURL + "/UploadDicom/UpLoadPPTFile?id=" + this.$route.query.caseID,
      // actionUrl: Vue.axios.defaults.baseURL + "/UploadDicom/UpLoadVideoFile",
      req_header: {
        Authorization: localStorage.getItem("UltraToken"),
      },
      post_Data: {
        Id: this.$route.query.caseID,
      },
      UrlLink: "",
      isUpload: true,
      pptName: ""
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
        this.pptName = res.FileName;
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
    // 获取链接
    async GetPPTInfoAsync() {
      const that = this;
      const r = await GetPPTInfo({
        patientcaseid: that.caseID,
      });
      if (r.code === 1) {
        // console.log(r.data);
        that.UrlLink = r.data.Link;
        that.pptName = r.data.Name;
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
    this.GetPPTInfoAsync();
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