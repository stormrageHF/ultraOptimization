<template>
  <div class="content_box_cus">
    <div class="filter_box">
      <el-form :inline="true" :model="filterModel">
        <el-form-item label="扫描部位" prop="JSMBW" required>
          <el-col :span="11">
            <el-select
              filterable
              placeholder="部位"
              v-model="filterModel.JSMBW"
              @change="selected"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :label="item.label"
                :key="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-col>

          <el-col class="line" :span="2">-</el-col>

          <el-col :span="11">
            <el-select
              filterable
              placeholder="二级部位"
              v-model="filterModel.JSMBW1"
              style="width: 100%"
            >
              <el-option
                v-for="item in options2"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <!-- <el-form-item label="机器品牌">
          <el-input
            v-model="filterModel.JJQPP"
            type="text"
            placeholder="机器品牌"
          ></el-input>
        </el-form-item> -->

        <el-form-item label="机器品牌">
          <el-select
            v-model="filterModel.JJQPP"
            placeholder="机器品牌"
            style="width: 100%"
          >
            <el-option label="西门子" value="西门子"></el-option>
            <el-option label="GE" value="GE"></el-option>
            <el-option label="飞利浦" value="飞利浦"></el-option>
            <el-option label="东芝" value="东芝"></el-option>
            <el-option label="东软" value="东软"></el-option>
            <el-option label="联影" value="联影"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchClick">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="dataSource">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="提供案例医生" prop="DoctorName"></el-table-column>
        <el-table-column label="医院" prop="HospitalName" width="200"></el-table-column>
        <el-table-column label="扫描部位" prop="JSMBW"></el-table-column>
        <el-table-column label="机器品牌" prop="JJQPP"></el-table-column>
        <!-- <el-table-column label="排数" prop="JPS"></el-table-column> -->
        <el-table-column label="对比剂品牌" prop="DDBJPP"></el-table-column>
        <!-- <el-table-column label="评分状态">
          <template slot-scope="scope">
            <span>{{ scope.row.VideoScoreState | formatState }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="点评专家" prop="AuditDoctorName"></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="scoreClick(scope.row)" type="text" size="medium"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

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
</template>

<script>
import { GetPaitentCaseForQueryByPage } from "@/api/index.js";

export default {
  name: "CaseList",
  data() {
    return {
      title: "",
      dataSource: [],
      tableRow: {
        readOnly: false,
        caseForm: null,
      },
      filterModel: {
        PageIndex: this.currentPage,
        filterModel: "",
        JSMBW: "",
        JSMBW1: "",
      },
      options: [
        {
          label: "头颈",
          options: [
            {
              value: "颅脑",
              label: "颅脑",
            },
            {
              value: "颈部",
              label: "颈部",
            },
            {
              value: "中枢神经",
              label: "中枢神经",
            },
            {
              value: "脊髓",
              label: "脊髓",
            },
            {
              value: "甲状腺",
              label: "甲状腺",
            },
            // {
            //   value: "其他",
            //   label: "其他",
            // },
          ],
        },
        {
          label: "心胸",
          options: [
            {
              value: "心脏",
              label: "心脏",
            },
            {
              value: "冠脉",
              label: "冠脉",
            },
            {
              value: "肺部",
              label: "肺部",
            },
            // {
            //   value: "其他",
            //   label: "其他",
            // },
          ],
        },
        {
          label: "腹部",
          options: [
            {
              value: "盆腔",
              label: "盆腔",
            },
            {
              value: "泌尿",
              label: "泌尿",
            },
            {
              value: "肝",
              label: "肝",
            },
            {
              value: "胆",
              label: "胆",
            },
            {
              value: "胰",
              label: "胰",
            },
            {
              value: "脾",
              label: "脾",
            },
            {
              value: "肾",
              label: "肾",
            },
            // {
            //   value: "其他",
            //   label: "其他",
            // },
          ],
        },
        {
          label: "外周",
          options: [
            {
              value: "手臂",
              label: "手臂",
            },
            {
              value: "双下肢",
              label: "双下肢",
            },
            // {
            //   value: "其他",
            //   label: "其他",
            // },
          ],
        },
        // {
        //   label: "其他",
        //   options: [
        //     {
        //       value: "其他",
        //       label: "其他",
        //     },
        //   ],
        // },
      ],
      options2: [],
      currentPage: 1,
      total: 1,
    };
  },
  methods: {
    selected(item) {
      // console.log(item);
      this.options2 = this.options.filter((cur) => {
        return cur.label === item;
      })[0].options;
    },
    async GetPaitentCaseForQueryByPageAsync() {
      const r = await GetPaitentCaseForQueryByPage({
        ...this.filterModel,
      });
      if (r.code === 1) {
        // console.log(r.data);
        this.dataSource = r.data.DataList;
        this.currentPage = r.data.CurrentPage;
        this.total = r.data.totalNum;
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
      });
      this.$router.push({ path: "/ViewVideo", query: { caseID: row.ID } });
    },
    searchClick() {
      this.GetPaitentCaseForQueryByPageAsync();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filterModel.PageIndex = val;
      this.GetPaitentCaseForQueryByPageAsync();
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
  components: {},
  mounted() {
    this.GetPaitentCaseForQueryByPageAsync();
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
.line {
  text-align: center;
}
</style>