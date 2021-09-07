<template>
  <div class="content_box_cus">
    <div>
      <el-table :data="dataSource">
        <el-table-column type="index" width="50"></el-table-column>
        <!-- <el-table-column label="姓名" prop="DoctorName"></el-table-column> -->
        <!-- <el-table-column label="医院" prop="HospitalName"></el-table-column> -->
        <el-table-column label="扫描部位" prop="JSMBW"></el-table-column>
        <el-table-column label="机器品牌" prop="JJQPP"></el-table-column>
        <el-table-column label="排数" prop="JPS"></el-table-column>
        <el-table-column label="对比剂品牌" prop="DDBJPP"></el-table-column>
        <el-table-column label="评分状态">
          <template slot-scope="scope">
            <span>{{scope.row.VideoScoreState | formatState}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="总分" prop="TotleScore"></el-table-column> -->

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="scoreClick(scope.row)" type="text" size="medium">方案点评</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   
  </div>
</template>

<script>
import { GetPaitentCaseForVideoAudit } from "@/api/index.js";

export default {
  name: "VideoReview",
  data() {
    return {
      title: "",
      dataSource: [],
      tableRow: {
        readOnly: false,
        caseForm: null,
      },
    };
  },
  methods: {
    async GetPaitentCaseForVideoAuditAsync() {
      const r = await GetPaitentCaseForVideoAudit();
      if (r.code === 1) {
        console.log(r.data);
        this.dataSource = r.data;
      } else {
        this.$alertError(r.error);
      }
    },
    scoreClick(row) {
      // console.log(row);
      sessionStorage.VideoReviewForm = JSON.stringify({
        PatientCaseId: row.ID,
        FAZL: row.FAZL,
        KTGX: row.KTGX,
        FALD: row.FALD,
        FADG: row.FADG,
      })
      this.$router.push({ path: "/ScoreVideo", query: { caseID: row.ID } });
    },
  },
  filters: {
    formatTime(value) {
      return value.replace("T", " ").substr(0, 16);
    },
    formatState(value) {
      return value == 1 ? "已评分" : "未评分";
    },
  },
  components: {
    
  },
  mounted() {
    this.GetPaitentCaseForVideoAuditAsync();
  },
};
</script>

<style scoped>
.content_box_cus {
  min-width: 1000px;
  width: 1200px;
  background-color: #ffffff;
  padding: 20px;
  margin: 5px auto;
}
p {
  text-align: center;
  opacity: 0.8;
}
</style>