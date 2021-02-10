<template>
  <div class="content_box">
    <div class="side_box">
      <SideMenu :menuArr="sideMenuArr" @select-menu="selectMenu"></SideMenu>
    </div>

    <div class="body_box" v-if="!isEdited">
      
      <el-form v-if="displayIndex==='1'">
        <el-form-item>
          <el-button type="primary" @click="ExportAccount">导出列表</el-button>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="filterModel" v-if="displayIndex === '2'">
        <el-form-item label="姓名">
          <el-input v-model="filterModel.Name" type="text" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="filterModel.groupName" placeholder="请选择分组">
            <el-option label="头颈分组" value="头颈分组"></el-option>
            <el-option label="心胸分组" value="心胸分组"></el-option>
            <el-option label="腹部分组" value="腹部分组"></el-option>
            <el-option label="外周分组" value="外周分组"></el-option>
            <el-option label="项目管理委员会" value="项目管理委员会"></el-option>
            <el-option label="全部" value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否注册">
          <el-switch v-model="filterModel.accountState"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchClick">搜索</el-button>
          <el-button type="primary" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>

      <div v-if="displayIndex==='1'">
        <DoctorList
          key="normal"
          :total="norTotal"
          :currentPage="norCurPageIndex"
          listType="1"
          :tableData="normalList"
          @current-change="norCurChange"
          @delete-change="DeleteClick"
        ></DoctorList>
      </div>
      <div v-else-if="displayIndex==='2'">
        <DoctorList
          key="judges"
          :total="judTotal"
          :currentPage="judCurPageIndex"
          listType="2"
          :tableData="judgesList"
          @current-change="judCurChange"
          @edit-click="EidtClick"
          @delete-change="DeleteClick"
        ></DoctorList>
      </div>
      <div v-else-if="displayIndex==='3'">
        <CreateJudges @submit-click="submitEvent"></CreateJudges>
      </div>
    </div>

    <div class="body_box" v-else>
      <CreateJudges
        :mode="2"
        :data-form="update_data_form"
        @go-back="goBack"
        @submit-click="updateEvent"
      ></CreateJudges>
    </div>
  </div>
</template>

<script>
import SideMenu from "../../components/SideMenu/SideMenu";
import DoctorList from "../../components/DoctorList/DoctorList";
import CreateJudges from "../../components/CreateJudges/CreateJudges";
import {
  GetDoctorInfosByPage,
  GetDoctorManagerInfosByPage,
  AddManagerAccount,
  UpdateDoctorInfo,
  DeleteUser,
  ExportAccount,
} from "@/api/index.js";
import Vue from "vue";

export default {
  name: "Account",
  data() {
    return {
      displayIndex: "1",
      sideMenuArr: ["查看注册医生", "查看评委医生", "新建评委"],
      judgesList: [],
      normalList: [],
      norCurPageIndex: 1,
      norTotal: 0,
      judCurPageIndex: 1,
      judTotal: 0,
      filterModel: {
        groupName: "",
        accountState: false,
        Name: "",
      },
      isEdited: false, //是否进入编辑
      update_data_form: {}, // 编辑模式传入的数据
    };
  },
  methods: {
    selectMenu(index) {
      this.displayIndex = index;
      this.isEdited = false;
    },
    async GetDoctorManagerInfosByPageAsync() {
      const result = await GetDoctorManagerInfosByPage({
        pageIndex: this.judCurPageIndex,
        groupName: this.filterModel.groupName,
        accountState: this.filterModel.accountState ? 1 : 0,
        Name: this.filterModel.Name,
      });
      if (result.code === 1) {
        if (result.data) {
          this.judgesList = result.data.DataList;
          this.judTotal = result.data.totalNum;
          console.log(this.judgesList);
          console.log("jud");
        } else {
          this.$message.error("数据不存在");
        }
      } else {
        this.$alertError(result.error);
      }
    },
    async GetDoctorInfosByPageAsync() {
      const result = await GetDoctorInfosByPage({
        pageIndex: this.norCurPageIndex,
      });
      if (result.code === 1) {
        if (result.data) {
          this.normalList = result.data.DataList;
          this.norTotal = result.data.totalNum;
          console.log(this.normalList);
          console.log("reg");
        } else {
          this.$message.error("数据不存在");
        }
      } else {
        this.$alertError(result.error);
      }
    },
    norCurChange(c_val) {
      this.norCurPageIndex = c_val;
      this.GetDoctorInfosByPageAsync();
    },
    judCurChange(c_val) {
      this.judCurPageIndex = c_val;
      this.GetDoctorManagerInfosByPageAsync();
    },
    async AddManagerAccountAsync(data) {
      const result = await AddManagerAccount(data);
      if (result.code === 1) {
        this.judgesList.push(result.data);
        this.$message.success("提交成功");
      } else {
        this.$alertError(result.error);
      }
    },
    async UpdateDoctorInfoAsync(data) {
      const result = await UpdateDoctorInfo(data);
      if (result.code === 1) {
        // 更新数据
        for (let t in this.judgesList) {
          if (this.judgesList[t].ID === data.ID) {
            // this.judgesList[t] = data; // 不是响应式的
            Vue.set(this.judgesList, t, data);
            break;
          }
        }
      } else {
        this.$alertError(result.error);
      }
    },
    submitEvent(info) {
      this.AddManagerAccountAsync(info);
    },
    updateEvent(val) {
      this.isEdited = false;
      this.UpdateDoctorInfoAsync(val);
    },
    EidtClick(info) {
      this.isEdited = true;
      this.update_data_form = info;
    },
    DeleteClick(val) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.DeleteUserAsync({
            Id: val.ID,
          });
        })
        .catch(() => {});
    },
    async DeleteUserAsync(data) {
      const result = await DeleteUser(data);
      if (result.code === 1) {
        // 删除数据
        for (let t in this.judgesList) {
          if (this.judgesList[t].ID === data.Id) {
            Vue.delete(this.judgesList, t);
            return;
          }
        }
        for (let t in this.normalList) {
          if (this.normalList[t].ID === data.Id) {
            Vue.delete(this.normalList, t);
            return;
          }
        }
      } else {
        this.$alertError(result.error);
      }
    },
    searchClick() {
      this.GetDoctorManagerInfosByPageAsync();
    },
    resetClick() {
      this.judCurPageIndex = 1;
      this.filterModel.groupName = "";
      this.filterModel.accountState = false;
      this.filterModel.Name = "";
      this.GetDoctorManagerInfosByPageAsync();
    },
    goBack() {
      this.isEdited = false;
      this.update_data_form = {};
    },
    ExportAccount() {
      this.ExportAccountAsync();
    },
    async ExportAccountAsync() {
      const r = await ExportAccount();
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
    SideMenu,
    DoctorList,
    CreateJudges,
  },
  mounted() {
    //获取评委医生列表
    this.GetDoctorManagerInfosByPageAsync();
    this.GetDoctorInfosByPageAsync();
    window.scroll({ top: 0, left: 0, behavior: "auto" });
  },
};
</script>

<style scoped>
.side_box {
  width: 240px;
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 178px;
  transition: padding-top 0.3s;
  z-index: 1500;
}
.body_box {
  padding-left: 270px;
  padding-right: 170px;
  padding-top: 30px;
  padding-bottom: 30px;
  /* width: calc(100% - 340px); */
  min-width: 1000px;
}
.filter_box {
  margin-bottom: 20px;
}
.filter_input {
  width: 150px;
  margin-right: 10px;
}
</style>