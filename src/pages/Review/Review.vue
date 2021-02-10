<template>
  <div class="content_box_cus">
    <div v-if="!CreateCaseVisible">
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
            <span>{{scope.row.ScoreState | formatState}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总分" prop="TotleScore"></el-table-column>

        <el-table-column fixed="right" label="操作" width="70">
          <template slot-scope="scope">
            <el-button @click="scoreClick(scope.row)" type="text" size="medium">评分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <CreateCase
        :tablerow="tableRow"
        :title="title"
        @goBack="CreateCaseVisible = false"
        :isScoring="true"
        :scoreReadOnly="true"
      ></CreateCase>
    </div>
  </div>
</template>

<script>
import { GetPaitentCaseForScore } from "@/api/index.js";
import CreateCase from "@/components/CreateCase/CreateCase";

export default {
  name: "Review",
  data() {
    return {
      title: "",
      dataSource: [],
      CreateCaseVisible: false,
      tableRow: {
        readOnly: false,
        caseForm: null,
      },
    };
  },
  methods: {
    async GetPaitentCaseForScoreAsync() {
      const r = await GetPaitentCaseForScore();
      if (r.code === 1) {
        console.log(r.data);
        this.dataSource = r.data;
      } else {
        this.$alertError(r.error);
      }
    },
    scoreClick(row) {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = true;
      this.tableRow.caseForm = row;
      this.title = "案例评分";
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
    CreateCase,
  },
  mounted() {
    this.GetPaitentCaseForScoreAsync();
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