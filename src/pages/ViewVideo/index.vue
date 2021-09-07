<template>
  <div class="upload_box">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <div class="video_box">
      <h2 class="explain_title">视频讲解</h2>
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

      <div v-if="false">
        <h2 class="explain_title">幻灯片</h2>
        <el-button type="primary" @click="viewPPT">查看幻灯片</el-button>
      </div>
    </div>

    <div style="padding: 20px">
      <div>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          label-position="top"
          :rules="rules"
        >

         <el-form-item label="视频提供">
            <div style="font-size: 16px">
              <span>姓名: {{ form.AccountName }}</span>
              <span style="padding-left: 40px"
                >医院: {{ form.HospitalName }}</span
              >
            </div>
          </el-form-item>

          <el-form-item label="点评专家">
            <div style="font-size: 16px">
              <span>姓名: {{ form.VideoAuditAccountName }}</span>
              <span style="padding-left: 40px"
                >医院: {{ form.VideoAuditHospitalName }}</span
              >
            </div>
          </el-form-item>

          <el-form-item label="方案质量">
            <!-- <el-input
              type="textarea"
              :placeholder="FAZL_Placeholder"
              :autosize="{ minRows: 2, maxRows: 8 }"
              v-model="form.FAZL"
            ></el-input> -->
            <p class="textContent">
              {{ form.FAZL }}
            </p>
          </el-form-item>

          <el-form-item label="可推广性">
            <!-- <el-input
              type="textarea"
              :placeholder="KTGX_Placeholder"
              :autosize="{ minRows: 2, maxRows: 8 }"
              v-model="form.KTGX"
            ></el-input> -->
            <p class="textContent">
              {{ form.KTGX }}
            </p>
          </el-form-item>

          <el-form-item label="方案亮点">
            <!-- <el-input
              type="textarea"
              :placeholder="FALD_Placeholder"
              :autosize="{ minRows: 2, maxRows: 8 }"
              v-model="form.FALD"
            ></el-input> -->
            <p class="textContent">
              {{ form.FALD }}
            </p>
          </el-form-item>

          <el-form-item label="方案待改进的地方">
            <!-- <el-input
              type="textarea"
              :placeholder="FADG_Placeholder"
              :autosize="{ minRows: 2, maxRows: 8 }"
              v-model="form.FADG"
            ></el-input> -->
            <p class="textContent">
              {{ form.FADG }}
            </p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  GetVideoLink,
  SocreVideoPatientCase,
  GetPPTInfo,
  GetPatientCaseDetailForQuery,
} from "../../api/index";

export default {
  name: "ViewVideo",
  data() {
    return {
      pptUrl: "",
      showPPT: false,
      title: "方案点评",
      caseID: this.$route.query.caseID,
      uploadAPI: "UpLoadApiFile", // UpLoadVideoFile
      actionUrl:
        Vue.axios.defaults.baseURL +
        "/UploadDicom/UpLoadVideoFile?id=" +
        this.$route.query.caseID,
      // actionUrl: Vue.axios.defaults.baseURL + "/UploadDicom/UpLoadVideoFile",
      req_header: {
        Authorization: localStorage.getItem("UltraToken"),
      },
      post_Data: {
        Id: this.$route.query.caseID,
      },
      UrlLink: "",
      desc: "请审阅参与者扫描方案的幻灯片及视频讲解，每个方案需撰写不少于 100 字的点评",
      form: {
        PatientCaseId: this.$route.caseID,
        FAZL: "",
        KTGX: "",
        FALD: "",
        FADG: "",
        VideoAuditAccountName: "",
        VideoAuditHospitalName: "",
      },
      FAZL_Placeholder:
        "扫描方案选择是否根据临床病史选择了正确的检查方法\n扫描范围是否包含该检查部位的全部，或者病变范围的全部\n扫描参数是否选择了正确的参数（包括但不限于kV、mAs、层厚、螺距等）\n对比剂注射的流速、剂量、时机是否合适\n是否有重建图像，重建图像的方向、层面是否得当，是否把靶器官和/或病变充分显示",
      KTGX_Placeholder: "扫描方案是否具有普遍适应性和可推广性",
      FALD_Placeholder: "扫描方案的独特之处",
      FADG_Placeholder: "方案待改进的地方",
      rules: {
        FAZL: [{ required: true, message: "请输入方案质量", trigger: "blur" }],
        KTGX: [{ required: true, message: "请输入可推广性", trigger: "blur" }],
        FALD: [{ required: true, message: "请输入方案亮点", trigger: "blur" }],
        FADG: [
          {
            required: true,
            message: "请输入方案待改进的地方",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    viewPPT() {
      const pathUrl = encodeURIComponent(this.pptUrl);
      window.open(
        "http://view.officeapps.live.com/op/view.aspx?src=" + pathUrl
      );
    },
    goBack() {
      this.$router.go(-1);
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
      } else {
        this.$alertError(r.error);
      }
    },
    // 获取链接
    async GetPPTInfoAsync() {
      const that = this;
      const r = await GetPPTInfo({
        patientcaseid: that.caseID,
      });
      if (r.code === 1) {
        // console.log(r.data);
        that.pptUrl = r.data.Link || "";
        // that.pptName = r.data.Name;
      } else {
        this.$alertError(r.error);
      }
    },
    async SocreVideoPatientCaseAsync() {
      const that = this;
      const r = await SocreVideoPatientCase(this.form);
      if (r.code === 1) {
        // console.log(r.data);
        that.$message.success("评分成功");
      } else {
        this.$alertError(r.error);
      }
    },
    async GetPatientCaseDetailForQueryAsync() {
      const r = await GetPatientCaseDetailForQuery({
        patientcaseid: this.caseID,
      });
      if (r.code === 1) {
        Object.assign(this.form, r.data);
        this.UrlLink = r.data.VideoLink;
        console.log(this.form);
      } else {
        this.$alertError(r.error);
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((value) => {
        if (value) {
          if (this.totalNum < 100) {
            this.$message({
              type: "warning",
              message: "点评不能少于 100 字",
            });
            return false;
          }
          this.SocreVideoPatientCaseAsync();
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    totalNum() {
      return (
        this.form.FAZL.length +
        this.form.KTGX.length +
        this.form.FALD.length +
        this.form.FADG.length
      );
    },
  },
  components: {},
  created() {
    if (sessionStorage.VideoReviewForm) {
      this.form = JSON.parse(sessionStorage.VideoReviewForm);
    }
    this.GetPatientCaseDetailForQueryAsync();
  },
  mounted() {
    // this.GetPPTInfoAsync();
    // this.GetVideoLinkAsync();
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
.score_desc {
  font-size: 18px;
  margin-bottom: 20px;
}
.el-form-item >>> .el-form-item__label {
  font-size: 18px;
  font-weight: bold;
}
.explain_title {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 20px;
  color: #606266;
}
.textContent {
  font-size: 16px;
}
</style>