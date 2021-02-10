<template>
  <div class="register_info_box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
      autocomplete="off"
    >
      <el-form-item label="姓名" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="Sex">
        <el-radio-group v-model="ruleForm.Sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生年月" prop="BirthDay">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.BirthDay"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="执业证书编码" prop="LicenseNumber">
        <el-input v-model="ruleForm.LicenseNumber" placeholder="输入执业证书编码" maxlength="25"></el-input>
      </el-form-item>
      <el-form-item label="工作单位" prop="Hospital">
        <el-cascader
          style="width:100%"
          size="large"
          :options="regionData"
          v-model="selectedOptions2"
          @change="handleChange"
        ></el-cascader>
        <el-input v-model="ruleForm.Hospital" placeholder="输入医院"></el-input>
      </el-form-item>
      <el-form-item label="科室" prop="Department">
        <el-input v-model="ruleForm.Department" placeholder="输入科室"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="DoctorTitle">
        <el-select v-model="ruleForm.DoctorTitle" placeholder="请选择职称" style="width: 100%;">
          <el-option label="住院医师" value="住院医师"></el-option>
          <el-option label="主治医师" value="主治医师"></el-option>
          <el-option label="副主任医师" value="副主任医师"></el-option>
          <el-option label="主任医师" value="主任医师"></el-option>
          <el-option label="技师" value="技师"></el-option>
          <el-option label="主管技师" value="主管技师"></el-option>
          <el-option label="技士" value="技士"></el-option>
          <el-option label="副主任技师" value="副主任技师"></el-option>
          <el-option label="主任技师" value="主任技师"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="info" plain @click="goLogin">退出</el-button> -->
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import Vue from "vue";
import { mapState } from "vuex";
// import { checkLicenseNumber } from "@/commen/js/commen";

export default {
  name: "RegisterFinishInfo",
  data() {
    return {
      regionData,
      CodeToText,
      selectedOptions2: [],
      ruleForm: {
        AccountId: localStorage.getItem("ultra_accountid"),
        Name: "",
        Sex: "0",
        BirthDay: "",
        Provice: "",
        City: "",
        Region: "",
        Hospital: "",
        Department: "",
        DoctorTitle: "",
        LicenseNumber: ""
      },
      rules: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        BirthDay: [{ required: true, message: "请选择生日", trigger: "blur" }],
        Provice: [{ required: true, message: "请输入省", trigger: "blur" }],
        City: [{ required: true, message: "请输入城市", trigger: "blur" }],
        Region: [{ required: true, message: "请输入区域", trigger: "blur" }],
        Hospital: [{ required: true, message: "请输入医院", trigger: "blur" }],
        Department: [
          { required: true, message: "请输入科室", trigger: "blur" }
        ],
        DoctorTitle: [
          { required: true, message: "请选择职称", trigger: "change" }
        ],
        LicenseNumber: [
          { required: true, message: "请输入执业证书编码", trigger: "blur" },
          // { validator: checkLicenseNumber, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.UpdateAccountInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // test
      // that.$router.push("/register/regsuccess");
    },
    handleChange(value) {
      // console.log(value);
      // console.log(this.selectedOptions2);
      // console.log(this.CodeToText[value[0]], this.CodeToText[value[1]], this.CodeToText[value[2]]);
      this.ruleForm.Provice = this.CodeToText[value[0]];
      this.ruleForm.City = this.CodeToText[value[1]];
      this.ruleForm.Region = this.CodeToText[value[2]];
    },
    UpdateAccountInfo() {
      const that = this;
      Vue.axios
        .post("/Login/UpdateAccountInfo", that.ruleForm)
        .then(response => {
          if (response.status == 200 || response.status == 204) {
            that.$message.success("提交成功");
            that.$router.push("/register/regsuccess");
          }
        })
        .catch(error => {
          that.$message.error(error.response.data.Message);
        });
    }
  },
  computed: {
    ...mapState(["regUserInfo"])
  },
  mounted: function() {
    // this.ruleForm.AccountId = this.regUserInfo.Id | localStorage.getItem('ultra_accountid');
    console.log(this.ruleForm.AccountId);
  }
};
</script>

<style scoped>
</style>