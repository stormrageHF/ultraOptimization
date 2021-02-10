<template>
  <div class="judges_box">
    <el-page-header v-if="mode !== 1" @back="goBack" content="修改信息"></el-page-header>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="JudgesForm"
      label-width="90px"
      class="judges_Form"
      autocomplete="off"
    >
      <el-form-item label="姓名" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="Sex">
        <el-radio-group v-model="ruleForm.Sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="PhoneNumber">
        <el-input v-model="ruleForm.PhoneNumber" placeholder="输入手机号"></el-input>
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
      <el-form-item label="分组">
        <el-select v-model="ruleForm.GroupName" placeholder="请选择分组" style="width: 100%;">
          <el-option label="头颈分组" value="头颈分组"></el-option>
          <el-option label="心胸分组" value="心胸分组"></el-option>
          <el-option label="腹组分组" value="腹组分组"></el-option>
          <el-option label="外周分组" value="外周分组"></el-option>
          <el-option label="项目管理委员会" value="项目管理委员会"></el-option>
        </el-select>
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
        </el-select>
      </el-form-item>

      <el-form-item>
        <!-- <el-button type="info" plain @click="goLogin">退出</el-button> -->
        <el-button style="width:100%" type="primary" @click="submitForm('JudgesForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { checkPhone } from "@/commen/js/commen.js";

export default {
  name: "CreateJudges",
  props: {
    dataForm: Object,
    mode: {
      type: Number,
      default: () => {
        return 1; // 代表非修改模式
      }
    }
  },
  data() {
    return {
      regionData,
      CodeToText,
      selectedOptions2: [],
      ruleForm: {
        ID: "",
        Name: "",
        Sex: "-1",
        PhoneNumber: "",
        Provice: "",
        City: "",
        Region: "",
        Hospital: "",
        Department: "",
        DoctorTitle: "",
        GroupName: "",
        CreateTime: ""
      },
      rules: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // Sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        PhoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
        // Provice: [{ required: true, message: "请输入省", trigger: "blur" }],
        // City: [{ required: true, message: "请输入城市", trigger: "blur" }],
        // Region: [{ required: true, message: "请输入区域", trigger: "blur" }],
        // Hospital: [{ required: true, message: "请输入医院", trigger: "blur" }],
        // Department: [
        //   { required: true, message: "请输入科室", trigger: "blur" }
        // ],
        // DoctorTitle: [
        //   { required: true, message: "请选择职称", trigger: "change" }
        // ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$emit("submit-click", that.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(value) {
      this.ruleForm.Provice = this.CodeToText[value[0]];
      this.ruleForm.City = this.CodeToText[value[1]];
      this.ruleForm.Region = this.CodeToText[value[2]];
    },
    goBack() {
      this.$emit("go-back");
    }
  },
  mounted() {
    console.log(this.dataForm);
    for (var key in this.ruleForm) {
      this.ruleForm[key] = this.dataForm[key];
    }
  }
};
</script>

<style scoped>
.judges_box {
  background-color: #ffffff;
  padding: 40px;
}
.judges_Form {
  max-width: 450px;
  margin: 0 auto;
}
</style>