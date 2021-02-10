<template>
  <div class="list_box">
    <el-table :data="tableData" style="min-width: 960px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.Name }}</span>
            </el-form-item>
            <el-form-item label="医院">
              <span>{{ props.row.Hospital }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.Sex === -1 ? "" : (props.row.Sex == 0 ? '男' : '女') }}</span>
            </el-form-item>
            <el-form-item label="科室">
              <span>{{ props.row.Department }}</span>
            </el-form-item>
            <el-form-item label="手机">
              <span>{{ props.row.PhoneNumber }}</span>
            </el-form-item>
            <el-form-item label="职称">
              <span>{{ props.row.DoctorTitle }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.Mail }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.Provice + '/' + props.row.City + '/' + props.row.Region }}</span>
            </el-form-item>
            <el-form-item label="执业证书编码">
              <span>{{ props.row.LicenseNumber }}</span>
            </el-form-item>
            <el-form-item label="分组">
              <span>{{ props.row.GroupName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column type="index" width="50"></el-table-column> -->
      <el-table-column prop="Name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="PhoneNumber" label="手机" width="130"></el-table-column>
      <el-table-column prop="GroupName" label="分组" width="100"></el-table-column>
      <el-table-column prop="Hospital" label="医院"></el-table-column>
      <el-table-column prop="Department" label="科室" width="100"></el-table-column>
      <el-table-column prop="DoctorTitle" label="职称" width="100"></el-table-column>
      <el-table-column label="是否注册" v-if="listType==='2'" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.AccountState ? '已注册' : '未注册' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.CreateTime.substr(0,4) !== '0001' ? scope.row.CreateTime.substr(0,10) : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="EditClick(scope.row)" type="text" size="small" v-if="listType==='2'">编辑</el-button>
          <el-button @click="DeleteClick(scope.row)" type="text" size="small">删除</el-button>
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
</template>

<script>
export default {
  name: "DoctorList",
  props: {
    tableData: Array,
    listType: String,
    total: Number,
    currentPage: Number
  },
  data() {
    /*
    "ID": "032ad26d7aa84e558a76c1da23dd479f",
    "UserName": "sample string 2",
    "PhoneNumber": "sample string 3",
    "Mail": "sample string 4",
    "Name": "sample string 5",
    "Sex": 1,
    "BirthDay": "2020-06-24T14:15:40",
    "Provice": "sample string 6",
    "City": "sample string 7",
    "Region": "sample string 8",
    "Hospital": "sample string 9",
    "Department": "sample string 10",
    "DoctorTitle": "sample string 11",
    "LicenseNumber": "sample string 12"
    */

    return {};
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("current-change", val);
    },
    EditClick(val) {
      this.$emit("edit-click", val);
    },
    DeleteClick(val){
      this.$emit("delete-change", val);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
  /* background-color: #fafafa; */
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<style>
.demo-table-expand label {
  /* width: 90px; */
  color: #99a9bf !important;
}
.pagination_box {
  margin-top: 20px;
}
</style>
