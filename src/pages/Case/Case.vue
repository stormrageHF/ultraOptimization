<template>
  <div class="content_box_cus">
    <div v-if="!CreateCaseVisible">
      <div class="filter_box">
        <div class="btn_box">
          <el-button
            type="primary"
            @click="submitCase"
            v-if="$store.state.case_enable"
            >提交案例</el-button
          >
          <span v-else class="red_info"
            >提交案例已于2020年11月5日截止，感谢您的参与。</span
          >
          <div>
            <el-button type="primary" plain @click="showPdf = true"
              >查看录制上传说明</el-button
            >

            <el-button type="primary" plain @click="GetVideoLoginInfoAsync"
              >获取Windows录课账号</el-button
            >
            <el-button
              type="primary"
              plain
              @click="GetVideoLoginInfoForMacAsync"
              >获取Mac录课账号</el-button
            >
          </div>
        </div>
      </div>

      <el-table :data="dataSource">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="扫描部位" prop="JSMBW"></el-table-column>
        <el-table-column label="机器品牌" prop="JJQPP"></el-table-column>
        <el-table-column label="排数" prop="JPS"></el-table-column>
        <el-table-column label="对比剂品牌" prop="DDBJPP"></el-table-column>
        <el-table-column label="提交时间">
          <template slot-scope="scope">
            <!-- <i class="el-icon-date"></i> -->
            <span>{{ scope.row.CreateTime | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row)" type="text" size="medium"
              >查看</el-button
            >
            <el-button
              @click="updateClick(scope.row)"
              type="text"
              size="medium"
              v-show="accountGrade === 0"
              v-if="false"
              disabled
              >编辑</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              type="text"
              size="medium"
              v-show="accountGrade === 0"
              v-if="false"
              disabled
              >删除</el-button
            >
            <el-button
              v-if="scope.row.IsUploadVideo"
              @click="uploadVideo(scope.row)"
              type="text"
              size="medium"
              >{{ scope.row.UploadVideoed ? "查看视频" : "上传视频" }}
            </el-button>
            <el-button
              v-if="scope.row.IsUploadVideo"
              @click="uploadPPT(scope.row)"
              type="text"
              size="medium"
              >{{ scope.row.UploadPPTed ? "查看PPT" : "上传PPT" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination_box"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="false"
      ></el-pagination>
    </div>

    <div v-else>
      <CreateCase
        :tablerow="tableRow"
        :title="title"
        @goBack="CreateCaseVisible = false"
        @submitForm="submitForm"
        @updateForm="updateForm"
        @cancel-submit="cancelSubmit"
      ></CreateCase>
    </div>
    <!-- <el-dialog class="dialog_box" title="提交案例" :visible.sync="dialogFormVisible">
    </el-dialog>-->

    <el-dialog
      title="账号密码"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
    >
      <div class="account_box">账号：{{ recordAccount.VideoLoginName }}</div>
      <div class="account_box">密码：{{ recordAccount.VideoPassword }}</div>
      <p style="color: #f56c6c">密码由项目组统一管理，请勿更改密码，谢谢合作</p>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showPdf">
      <ViewPDF v-if="showPdf" :pdfUrl="pdfUrl"></ViewPDF>
    </el-dialog>

  </div>
</template>

<script>
import CreateCase from "../../components/CreateCase/CreateCase";
import ViewPDF from '../../components/ViewPDF/ViewPDF'
import Vue from "vue";
import {
  GetPaitentCaseForPatientByPage,
  GetVideoLoginInfo,
  GetVideoLoginInfoForMac,
} from "@/api/index.js";
import { mapState } from "vuex";

export default {
  name: "Case",
  data() {
    return {
      CreateCaseVisible: false,
      dataSource: [],
      tableRow: {
        readOnly: false,
        caseForm: null,
      },
      currentPage: 1,
      total: 1,
      recordAccount: {},
      dialogVisible: false,
      showPdf: false,
      pdfUrl: "https://www.ultra-optimization.com/pdf/recordSpec.pdf",
    };
  },
  methods: {
    submitCase() {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = false;
      this.tableRow.caseForm = null;
      this.title = "提交案例";
    },
    submitForm(data) {
      this.CreateCaseVisible = false;
      this.dataSource.push(data);
    },
    updateForm(data) {
      this.CreateCaseVisible = false;
      for (let i in this.dataSource) {
        if (this.dataSource[i].ID === data.ID) {
          this.dataSource[i] = data;
        }
      }
    },
    cancelSubmit() {
      this.CreateCaseVisible = false;
    },
    async GetPaitentCaseByPageAsync() {
      const r = await GetPaitentCaseForPatientByPage({
        PageIndex: this.currentPage,
      });
      if (r.code === 1) {
        // console.log(r.data);
        this.dataSource = r.data.DataList;
        this.total = r.data.totalNum;
        this.currentPage = r.data.CurrentPage;
      } else {
        this.$alertError(r.error);
      }
    },
    viewClick(row) {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = true;
      this.tableRow.caseForm = row;
      this.title = "查看案例";
    },
    updateClick(row) {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = false;
      this.tableRow.caseForm = row;
      this.title = "修改案例";
    },
    deleteClick(item) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.DeletePatientCase(item.ID, (res) => {
            if (res.status === 200 || res.status === 204) {
              for (let i in this.dataSource) {
                if (this.dataSource[i].ID === item.ID) {
                  this.dataSource.splice(i, 1);
                  break;
                }
              }
            } else {
              this.$message.error(res.response.data.Message);
            }
          });
        })
        .catch(() => {});
    },
    DeletePatientCase(Id, func) {
      // const t = this;
      Vue.axios
        .post("/PatientCase/DeletePatientCase", {
          Id: Id,
        })
        .then((response) => {
          if (typeof func == "function") {
            func(response);
          }
        })
        .catch((error) => {
          if (typeof func == "function") {
            func(error);
          }
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetPaitentCaseByPageAsync();
    },
    searchClick() {
      this.GetPaitentCaseByPageAsync();
    },
    uploadVideo(row) {
      // console.log(row);
      this.$router.push({ path: "/UploadVideo", query: { caseID: row.ID } });
    },
    uploadPPT(row) {
      this.$router.push({ path: "/UploadPPT", query: { caseID: row.ID } });
    },
    getRecordAccount() {},
    async GetVideoLoginInfoAsync() {
      const that = this;
      const r = await GetVideoLoginInfo();
      if (r.code === 1) {
        // console.log(r.data);
        that.recordAccount = r.data;
        that.dialogVisible = true;
      } else {
        this.$alertError(r.error);
      }
    },
    async GetVideoLoginInfoForMacAsync() {
      const that = this;
      const r = await GetVideoLoginInfoForMac();
      if (r.code === 1) {
        // console.log(r.data);
        that.recordAccount = r.data;
        that.dialogVisible = true;
      } else {
        this.$alertError(r.error);
      }
    },
  },
  components: {
    CreateCase: CreateCase,
    ViewPDF,
  },
  computed: {
    ...mapState(["accountGrade"]),
  },
  filters: {
    formatTime(value) {
      return value.replace("T", " ").substr(0, 16);
    },
  },
  mounted() {
    // window.scroll({ top: 0, left: 0, behavior: "auto" });
    this.GetPaitentCaseByPageAsync();
  },
};
</script>

<style scoped>
.content_box_cus {
  max-width: 1000px;
  background-color: #ffffff;
  padding: 20px;
  margin: 40px auto;
}
.dialog_box {
  max-height: 600px;
}
.filter_box {
  margin-bottom: 20px;
}
.btn_box {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination_box {
  margin-top: 20px;
}
.red_info {
  color: red;
  font-size: 14px;
  margin-left: 15px;
}
.account_box {
  margin: 20px 0;
}
.getAccountBtn {
  float: right;
}
</style>