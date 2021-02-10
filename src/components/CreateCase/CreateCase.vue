<template>
  <div>
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="isScoring ? 12 : 24">
        <div class="submit_case_box" :class="isScoring ? 'boxScroll': ''">
          <el-form
            :model="submitCaseForm"
            ref="submitCaseForm"
            :rules="rules"
            label-width="160px"
            :disabled="FormIsDisabled"
          >
            <div class="case_title">
              <h2>病史</h2>
            </div>

            <el-form-item label="患者年龄" prop="PAge">
              <!-- <el-input v-model="submitCaseForm.PAge" type="text" placeholder="患者年龄"></el-input> -->
              <el-select v-model="submitCaseForm.PAge" placeholder="患者年龄" style="width:100%">
                <el-option label="成人" value="成人"></el-option>
                <el-option label="儿童" value="儿童"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="患者性别" prop="PSex">
          <el-radio v-model="submitCaseForm.PSex" label="0">男</el-radio>
          <el-radio v-model="submitCaseForm.PSex" label="1">女</el-radio>
            </el-form-item>-->
            <!-- 18-21；21-25；25以上；无信息 -->
            <el-form-item label="BMI" prop="PBMI">
              <el-select v-model="submitCaseForm.PBMI" placeholder="BMI" style="width:100%">
                <el-option label="18-21" value="18-21"></el-option>
                <el-option label="21-25" value="21-25"></el-option>
                <el-option label="25以上" value="25以上"></el-option>
                <el-option label="无信息" value="无信息"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主诉" prop="PZS">
              <el-input
                v-model="submitCaseForm.PZS"
                type="textarea"
                rows="5"
                placeholder="主诉"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="病史及检查结果" prop="PBSJC">
              <el-input
                v-model="submitCaseForm.PBSJC"
                type="textarea"
                rows="5"
                placeholder="病史及检查结果"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次检查关注问题" prop="PGZWT">
              <el-input
                v-model="submitCaseForm.PGZWT"
                type="textarea"
                rows="5"
                placeholder="本次检查关注问题"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="高危因素筛查" prop="PGWYS">
              <el-select v-model="submitCaseForm.PGWYS" placeholder="高危因素筛查" style="width:100%">
                <el-option label="低危" value="低危"></el-option>
                <el-option label="中危" value="中危"></el-option>
                <el-option label="高危" value="高危"></el-option>
                <el-option label="未知" value="未知"></el-option>
              </el-select>
            </el-form-item>

            <el-divider></el-divider>

            <div class="case_title">
              <h2>检查方案</h2>
            </div>
            <el-form-item label="扫描部位" prop="JSMBW" required>
              <el-col :span="11">
                <el-select
                  filterable
                  placeholder="部位"
                  v-model="submitCaseForm.JSMBW"
                  @change="selected"
                  style="width:100%"
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
                  v-model="submitCaseForm.JSMBW1"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in options2"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>

              <!-- <el-select v-model="submitCaseForm.JSMBW" placeholder="扫描部位" style="width:100%">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-option-group>
              </el-select>-->
            </el-form-item>
            <el-form-item label="机器品牌" prop="JJQPP">
              <el-select v-model="submitCaseForm.JJQPP" placeholder="机器品牌" style="width:100%">
                <el-option label="西门子" value="西门子"></el-option>
                <el-option label="GE" value="GE"></el-option>
                <el-option label="飞利浦" value="飞利浦"></el-option>
                <el-option label="东芝" value="东芝"></el-option>
                <el-option label="东软" value="东软"></el-option>
                <el-option label="联影" value="联影"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排数" prop="JPS">
              <el-select v-model="submitCaseForm.JPS" style="width:100%">
                <el-option label="64排以下" value="64排以下"></el-option>
                <el-option label="64排" value="64排"></el-option>
                <el-option label="128排" value="128排"></el-option>
                <el-option label="128排以上" value="128排以上"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管电压" prop="JGDY">
              <el-input v-model.number="submitCaseForm.JGDY" type="text" placeholder="管电压">
                <template slot="append">kV</template>
              </el-input>
            </el-form-item>
            <el-form-item label="旋转时间" prop="JXZSJ">
              <el-input v-model="submitCaseForm.JXZSJ" type="text" placeholder="旋转时间">
                <template slot="append">s</template>
              </el-input>
            </el-form-item>
            <el-form-item label="准直" prop="JZZ">
              <el-input v-model.number="submitCaseForm.JZZ" type="text" placeholder="准直">
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="螺距" prop="JLJ">
              <el-input v-model="submitCaseForm.JLJ" type="text" placeholder="螺距"></el-input>
            </el-form-item>
            <el-form-item label="层厚" prop="JCH">
              <el-input v-model="submitCaseForm.JCH" type="text" placeholder="层厚">
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>

            <el-divider></el-divider>

            <div class="case_title">
              <h2>对比剂注射方案</h2>
            </div>
            <el-form-item label="使用对比剂品牌" prop="DDBJPP">
              <el-input v-model="submitCaseForm.DDBJPP" type="text" placeholder="使用对比剂品牌"></el-input>
            </el-form-item>
            <el-form-item label="浓度" prop="DND">
              <el-input v-model="submitCaseForm.DND" type="text" placeholder="浓度">
                <template slot="append">mg I/mL</template>
              </el-input>
            </el-form-item>
            <el-form-item label="注射剂量" prop="DZSJL">
              <el-input v-model="submitCaseForm.DZSJL" type="text" placeholder="注射剂量">
                <template slot="append">mL</template>
              </el-input>
            </el-form-item>
            <el-form-item label="流速" prop="DLS">
              <el-input v-model="submitCaseForm.DLS" type="text" placeholder="流速">
                <template slot="append">mL/s</template>
              </el-input>
            </el-form-item>
            <el-form-item label="碘流率 IDR" prop="IDR">
              <el-input v-model="IDR" type="text" placeholder="碘流率 IDR = (浓度*流速)/1000">
                <template slot="append">gI/s</template>
              </el-input>
            </el-form-item>
            <el-form-item label="碘总量 TIL" prop="TIL">
              <el-input v-model="TIL" type="text" placeholder="碘总量 TIL = 浓度*注射剂量">
                <template slot="append">mg</template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="注射方式" prop="DZSFS">
          <el-input v-model="submitCaseForm.DZSFS" type="text" placeholder="注射方式"></el-input>
            </el-form-item>-->

            <el-divider></el-divider>

            <div class="case_title">
              <h2>扫描方案制定思路</h2>
            </div>
            <el-form-item prop="YXBX" label="扫描方案制定思路">
              <el-input
                v-model="submitCaseForm.YXBX"
                type="textarea"
                minlength="50"
                show-word-limit
                placeholder="50字以上"
                rows="5"
                resize="none"
              ></el-input>
            </el-form-item>

            <el-divider></el-divider>

            <div v-if="!FormIsDisabled && submitCaseForm.Files.length === 0">
              <div class="case_title">
                <h2>上传案例</h2>
              </div>
              <el-form-item prop="Files" label="上传案例" required>
                <Upload @upload-success="uploadSuccess"></Upload>
              </el-form-item>
            </div>

            <div v-else>
              <div class="case_title">
                <h2>下载案例</h2>
              </div>
              <el-form-item>
                <p v-if="submitCaseForm.Files.length === 0">暂无案例</p>
                <div v-else class="download_box">
                  <div v-for="(item, index) in submitCaseForm.Files" :key="index">
                    <el-link type="success" :href="item.Link" target="_blank">
                      <span class="green_text">{{item.Name}}</span>
                    </el-link>
                    <div>文件大小：{{ item.FileSize | formatSize }}</div>
                  </div>
                  <div>
                    <el-button size="small" type="warning" round @click="uploadAgain">
                      重新上传
                      <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                  </div>
                </div>
              </el-form-item>
            </div>

            <el-form-item class="btn_box" v-show="!FormIsDisabled">
              <el-button style="width: 100px" @click="cancelForm">取消</el-button>
              <el-button
                style="width: 100px"
                type="primary"
                @click="submitForm('submitCaseForm')"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="isScoring ? 12 : 0">
        <ScoreCase
          v-if="isScoring"
          :patientCaseId="submitCaseForm.ID"
          :scoreType="submitCaseForm.JSMBW"
          :disabled="scoreReadOnly"
        ></ScoreCase>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  POSITIVE_NUMBER_REG,
  INTEGER_NUMBER_REG,
} from "../../commen/js/commen";
import Vue from "vue";
import Upload from "../Upload/Upload";
import { DeleteFile } from "@/api/index.js";
import ScoreCase from "../ScoreCase/ScoreCase";

export default {
  name: "CreateCase",
  props: {
    tablerow: Object,
    title: String,
    // 开启评分
    isScoring: {
      type: Boolean,
      default: false,
    },
    scoreReadOnly:{
      type: Boolean,
      default: false
    }
  },
  data() {
    // 选填正数
    var validateNumber1 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!POSITIVE_NUMBER_REG.test(value)) {
        callback(new Error("必须是大于0的数字"));
      } else {
        callback();
      }
    };
    // // 必须填正数
    // var validateNumber11 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback();
    //   } else if (!POSITIVE_NUMBER_REG.test(value)) {
    //     callback(new Error("必须是大于0的数字"));
    //   } else {
    //     callback();
    //   }
    // };

    // 选填正整数
    var validateNumber2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!INTEGER_NUMBER_REG.test(value)) {
        callback(new Error("必须是大于0的整数"));
      } else {
        callback();
      }
    };
    // // 必填正整数
    // var validateNumber22 = (rule, value, callback) => {
    //   if (!INTEGER_NUMBER_REG.test(value)) {
    //     callback(new Error("必须是大于0的整数"));
    //   } else {
    //     callback();
    //   }
    // };
    // 大于50字
    var validateNumber50 = (rule, value, callback) => {
      if (value.length < 50) {
        callback(new Error("字数不够50"));
      } else {
        callback();
      }
    };
    var validateFiles = (rule, value, callback) => {
      console.log("验证上传文件");
      console.log(value);

      if (value.length === 0) {
        callback("必须上传文件");
      } else {
        callback();
      }
    };
    return {
      caseForm: {
        // ID: "",
        // PSex: "0",
        PAge: "",
        PBMI: "",
        PZS: "",
        PBSJC: "",
        PGZWT: "",
        PGWYS: "",
        JSMBW: "",
        JSMBW1: "",
        JJQPP: "",
        JPS: "",
        JGDY: "",
        JXZSJ: "",
        JZZ: "",
        JLJ: "",
        JCH: "",
        DDBJPP: "",
        DND: "",
        DZSJL: "",
        DLS: "",
        IDR: "",
        TIL: "",
        DZSFS: "",
        YXBX: "",
        Files: [],
      },
      rules: {
        // PAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        PBMI: [
          { required: true, message: "请选择BMI", trigger: "blur" },
          // { validator: validateNumber1, trigger: "blur" },
        ],
        PZS: [{ required: false, message: "请输入主诉", trigger: "blur" }],
        PBSJC: [
          { required: false, message: "请输入病史及检查结果", trigger: "blur" },
        ],
        PGZWT: [
          {
            required: false,
            message: "请输入本次检查关注问题",
            trigger: "blur",
          },
        ],
        PGWYS: [
          { required: true, message: "请输入高危因素筛查", trigger: "blur" },
        ],
        JSMBW: [{ required: true, message: "请选择扫描部位", trigger: "blur" }],
        JJQPP: [{ required: true, message: "请选择机器品牌", trigger: "blur" }],
        JPS: [{ required: true, message: "请选择排数", trigger: "blur" }],
        JGDY: [
          { required: true, message: "请输入管电压", trigger: "blur" },
          { validator: validateNumber2, trigger: "blur" },
        ],
        JXZSJ: [
          { required: false, message: "请输入旋转时间", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        JZZ: [
          { required: false, message: "请输入准直", trigger: "blur" },
          { validator: validateNumber2, trigger: "blur" },
        ],
        JLJ: [
          { required: false, message: "请输入螺距", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        JCH: [
          { required: false, message: "请输入层厚", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        DDBJPP: [
          { required: true, message: "请输入使用对比剂品牌", trigger: "blur" },
        ],
        DND: [
          { required: true, message: "请输入浓度", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        DZSJL: [
          { required: true, message: "请输入注射剂量", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        DLS: [
          { required: true, message: "请输入流速", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        IDR: [{ required: true, message: "请输入碘流率", trigger: "blur" }],
        TIL: [{ required: true, message: "请输入碘总量", trigger: "blur" }],
        DZSFS: [{ required: true, message: "请输入注射方式", trigger: "blur" }],
        YXBX: [
          {
            required: true,
            message: "扫描方案制定思路",
            trigger: "blur",
          },
          {
            validator: validateNumber50,
            trigger: "blur",
          },
        ],
        Files: [{ validator: validateFiles }],
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
            {
              value: "其他",
              label: "其他",
            },
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
            {
              value: "其他",
              label: "其他",
            },
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
            {
              value: "其他",
              label: "其他",
            },
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
            {
              value: "其他",
              label: "其他",
            },
          ],
        },
        {
          label: "其他",
          options: [
            {
              value: "其他",
              label: "其他",
            },
          ],
        },
      ],
      options2: [],
      FormIsDisabled: this.tablerow.readOnly,
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((value) => {
        if (value) {
          if (that.submitCaseForm.Files.length === 0) {
            that.$message.error("必须上传案例");
            return;
          }
          if (that.tablerow.caseForm) {
            // 修改
            that.UpdatePatientCase((res) => {
              if (res.status == 204 || res.status == 200) {
                that.$message.success("修改成功");
                const form1 = res.data;
                that.$emit("updateForm", form1);
              } else {
                that.$message.error(res.response.data.Message);
              }
            });
          } else {
            // 提交
            that.SavePatientCase((res) => {
              if (res.status == 204 || res.status == 200) {
                that.$message.success("提交成功");
                const form1 = res.data;
                that.$emit("submitForm", form1);
              } else {
                that.$message.error(res.response.data.Message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    SavePatientCase(func) {
      this.stringToNumber();

      const t = this;
      Vue.axios
        .post("/PatientCase/SavePatientCase", t.submitCaseForm)
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
    UpdatePatientCase(func) {
      this.stringToNumber();

      const t = this;
      Vue.axios
        .post("/PatientCase/UpdatePatientCase", t.submitCaseForm)
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
    stringToNumber() {
      /*
     
  "JGDY": 12,
  "JXZSJ": 13.0,
  "JZZ": 14,
  "JLJ": 15.0,
  "JCH": 16.0,
  
  "DND": 18.0,
  "DZSJL": 19.0,
  "DLS": 20.0,
 
      */
      this.submitCaseForm.JGDY = parseFloat(this.submitCaseForm.JGDY);
      // this.submitCaseForm.JXZSJ = parseFloat(this.submitCaseForm.JXZSJ);
      // this.submitCaseForm.JZZ = parseInt(this.submitCaseForm.JZZ);
      // this.submitCaseForm.JLJ = parseFloat(this.submitCaseForm.JLJ);
      // this.submitCaseForm.JCH = parseFloat(this.submitCaseForm.JCH);
      this.submitCaseForm.DND = parseFloat(this.submitCaseForm.DND);
      this.submitCaseForm.DZSJL = parseFloat(this.submitCaseForm.DZSJL);
      this.submitCaseForm.DLS = parseFloat(this.submitCaseForm.DLS);
      this.submitCaseForm.IDR = parseFloat(this.submitCaseForm.IDR);
      this.submitCaseForm.TIL = parseFloat(this.submitCaseForm.TIL);
    },
    cancelForm() {
      window.removeEventListener("beforeunload", (e) =>
        this.beforeunloadHandler(e)
      );
      this.$emit("cancel-submit");
    },
    goBack() {
      // console.log('go back');
      window.removeEventListener("beforeunload", (e) =>
        this.beforeunloadHandler(e)
      );
      this.$emit("goBack");
    },
    beforeunloadHandler(e) {
      e = e | window.event;
      if (e) {
        e.returnValue = "有内容未保存";
      }
      return "有内容未保存";
    },
    selected(item) {
      // console.log(item);
      this.options2 = this.options.filter((cur) => {
        return cur.label === item;
      })[0].options;
    },
    keyUp(value) {
      console.log(value);
    },
    uploadSuccess(res) {
      this.submitCaseForm.Files.push({
        Id: res.UploadUniqueSN,
        Link: res.UrlLink,
        Name: res.FileName,
        FileSize: res.FileSize,
      });
    },
    uploadAgain() {
      this.$confirm("此操作将永久删除原案例, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.DeleteFileAsync();
        })
        .catch(() => {});
    },
    async DeleteFileAsync() {
      const result = await DeleteFile({
        fileId: this.submitCaseForm.Files[0].Id,
        patientCaseId: this.submitCaseForm.ID,
      });
      if (result.code === 1) {
        this.submitCaseForm.Files = [];
      } else {
        this.$alertError(result.error);
      }
    },
  },
  computed: {
    submitCaseForm: function () {
      if (this.tablerow.caseForm) {
        return this.tablerow.caseForm;
      }
      return this.caseForm;
    },
    IDR: function () {
      if (this.submitCaseForm.DND && this.submitCaseForm.DLS) {
        let dnd = this.submitCaseForm.DND;
        let dls = this.submitCaseForm.DLS;
        return ((dnd * dls) / 1000).toFixed(2);
      }
      return "";
    },
    TIL: function () {
      if (this.submitCaseForm.DND && this.submitCaseForm.DZSJL) {
        let dnd = this.submitCaseForm.DND;
        let dzsjl = this.submitCaseForm.DZSJL;
        return (dnd * dzsjl).toFixed(2);
      }
      return "";
    },
  },
  watch: {
    IDR: function (val) {
      this.submitCaseForm.IDR = val;
    },
    TIL: function (val) {
      this.submitCaseForm.TIL = val;
    },
  },
  filters: {
    formatSize: function (value) {
      // console.log(value / 1024);
      let v = value / 1024;
      if (v < 1024) {
        return Math.floor(v) + "K";
      }
      return Math.floor(v / 1024) + "M";
    },
  },
  components: {
    // PositiveNumberInput
    Upload,
    ScoreCase,
  },
  created() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    //
  },
  updated() {
    // console.log(this.submitCaseForm);
  },
  mounted() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    // if (!this.FormIsDisabled) {
    //   window.onbeforeunload = function(e) {
    //     e = e || window.event;
    //     // 兼容IE8和Firefox 4之前的版本
    //     if (e) {
    //       e.returnValue = "有内容未保存";
    //     }
    //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //     return "有内容未保存";
    //   };
    // }
  },
  destroyed() {
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
  },
  beforeRouteLeave(to, form, next) {
    const answer = window.confirm("有内容未保存");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style scoped>
.submit_case_box {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.boxScroll {
  max-height: 600px;
  overflow-y: auto;
}
.case_title {
  margin-top: 40px;
}
.btn_box {
  margin-top: 60px;
}
.line {
  text-align: center;
}
.download_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.green_text {
}
</style>
<style>
.el-textarea.is-disabled .el-textarea__inner,
.el-input.is-disabled .el-input__inner
 {
  color: #2c3e50!important;
}
</style>