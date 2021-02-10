<template>
  <div class="content_box_cus">
    <div v-if="!CreateCaseVisible">
      <div class="filter_box">
        <el-form :inline="true" :model="filterModel">
          <el-form-item label="姓名">
            <el-input
              v-model="filterModel.DoctorName"
              type="text"
              placeholder="输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="医院">
            <el-input
              v-model="filterModel.HospitalName"
              type="text"
              placeholder="输入医院"
            ></el-input>
          </el-form-item>
          <el-form-item label="分组">
            <el-select v-model="filterModel.GroupName" placeholder="请选择分组">
              <el-option label="头颈分组" value="头颈分组"></el-option>
              <el-option label="心胸分组" value="心胸分组"></el-option>
              <el-option label="腹部分组" value="腹部分组"></el-option>
              <el-option label="外周分组" value="外周分组"></el-option>
              <el-option label="全部" value></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分">
            <el-select v-model="filterModel.ScoreState" placeholder="选择评分状态">
              <el-option label="全部" value="10"></el-option>
              <el-option label="未评分" value="0"></el-option>
              <el-option label="已评分" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ExportCase">导出列表</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="dataSource">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="姓名" prop="DoctorName"></el-table-column>
        <el-table-column label="医院" prop="HospitalName"></el-table-column>
        <el-table-column label="扫描部位" prop="JSMBW"></el-table-column>
        <el-table-column label="机器品牌" prop="JJQPP"></el-table-column>
        <el-table-column label="排数" prop="JPS"></el-table-column>
        <el-table-column label="对比剂品牌" prop="DDBJPP"></el-table-column>
        <el-table-column label="区域" prop="Area"></el-table-column>
        <el-table-column label="提交时间" width="150">
          <template slot-scope="scope">
            <!-- <i class="el-icon-date"></i> -->
            <span>{{ scope.row.CreateTime | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分状态">
          <template slot-scope="scope">
            <span>{{ scope.row.ScoreState | formatState }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="60"
          label="总分"
          prop="TotleScore"
        ></el-table-column>
        <el-table-column label="评分医生" prop="AuditAccountName">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row)" type="text" size="medium"
              >查看</el-button
            >
            <!-- <el-button
            @click="updateClick(scope.row)"
            type="text"
            size="medium"
          >编辑</el-button>
          <el-button
            @click="deleteClick(scope.row)"
            type="text"
            size="medium"
            >删除</el-button>-->
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
        :isScoring="true"
        :scoreReadOnly="true"
      ></CreateCase>
    </div>
  </div>
</template>

<script>
import CreateCase from "@/components/CreateCase/CreateCase";
import { GetPaitentCaseByPage, ExportCase } from "@/api/index.js";

export default {
  name: "AllCase",
  data() {
    return {
      title: "",
      CreateCaseVisible: false,
      dataSource: [],
      tableRow: {
        readOnly: false,
        caseForm: null,
      },
      filterModel: {
        GroupName: "",
        HospitalName: "",
        DoctorName: "",
        ScoreState:"10"
      },
      currentPage: 1,
      total: 1,
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
    viewClick(row) {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = true;
      this.tableRow.caseForm = row;
      this.title = "查看案例";
    },
    async GetPaitentCaseByPageAsync() {
      const r = await GetPaitentCaseByPage({
        PageIndex: this.currentPage,
        GroupName: this.filterModel.GroupName,
        DoctorName: this.filterModel.DoctorName,
        HospitalName: this.filterModel.HospitalName,
        ScoreState: this.filterModel.ScoreState
      });
      if (r.code === 1) {
        console.log(r.data);
        this.dataSource = r.data.DataList;
        this.total = r.data.totalNum;
        this.currentPage = r.data.CurrentPage;
      } else {
        this.$alertError(r.error);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetPaitentCaseByPageAsync();
    },
    searchClick() {
      this.GetPaitentCaseByPageAsync();
    },
    ExportCase() {
      this.ExportCaseAsync();
    },
    async ExportCaseAsync() {
      const r = await ExportCase({
        GroupName: this.filterModel.GroupName,
        DoctorName: this.filterModel.DoctorName,
        HospitalName: this.filterModel.HospitalName,
        ScoreState: this.filterModel.ScoreState
      });
      if (r.code === 1) {
        // console.log(r.data.XlsLink);
        let _xurl = r.data.XlsLink;
        let aTag = document.createElement("a");
        aTag.download = "score";
        aTag.href = _xurl;
        aTag.click();
      } else {
        this.$alertError(r.error);
      }
    },
  },
  components: {
    CreateCase: CreateCase,
  },
  filters: {
    formatTime(value) {
      return value.replace("T", " ").substr(0, 16);
    },
    formatState(value) {
      return value == 1 ? "已评分" : "未评分";
    },
  },
  mounted() {
    this.GetPaitentCaseByPageAsync();
  },
};
</script>

<style scoped>
.content_box_cus {
  min-width: 1000px;
  width: 1200px;
  background-color: #ffffff;
  padding: 20px;
  margin: 40px auto;
}
.dialog_box {
  max-height: 600px;
}
.filter_box {
  margin-bottom: 20px;
  margin-top: 20px;
}
.btn_box {
  margin-bottom: 40px;
}
.pagination_box {
  margin-top: 20px;
}
</style>