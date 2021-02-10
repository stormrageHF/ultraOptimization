<template>
  <div class="scoreCaseBox">
    <div v-if="scoreType === '头颈'">
      <HeadScore :TJScore="scoreForm" @submit="submitScore" :disabled="disabled"></HeadScore>
    </div>
    <div v-else-if="scoreType === '心胸'">
      <HeartCase :XXScore="scoreForm" @submit="submitScore" :disabled="disabled"></HeartCase>
    </div>
    <div v-else-if="scoreType === '腹部'">
      <AbdomenScore :FBScore="scoreForm" @submit="submitScore" :disabled="disabled"></AbdomenScore>
    </div>
    <div v-else-if="scoreType === '外周'">
      <PeripheralScore :WZScore="scoreForm" @submit="submitScore" :disabled="disabled"></PeripheralScore>
    </div>
  </div>
</template>

<script>
import { SocrePatientCase, GetScore } from "@/api/index.js";
import HeadScore from "./HeadScore/HeadScore";
import HeartCase from "./HeartCase/HeartScore";
import AbdomenScore from "./AbdomenScore/AbdomenScore";
import PeripheralScore from "./PeripheralScore/PeripheralScore";

export default {
  name: "ScoreCase",
  props: {
    patientCaseId: String,
    scoreType: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scoreForm: {
        LCZLScore: "0",
        FAHLScore: "0",
        SMJSScore: "0",
        ZQXGScore: "0",
        ZDJBScore: "0",
        LCXQScore: "0",
        BLXJScore: "0",
        TotleScore: "0",
      },
      submitForm: null,
    };
  },
  methods: {
    async SocrePatientCaseAsync() {
      const that = this;
      const r = await SocrePatientCase(this.submitForm);
      if (r.code === 1) {
        // console.log(r.data);
        that.$message.success("评分成功");
      } else {
        this.$alertError(r.error);
      }
    },
    async GetScoreAsync() {
      const that = this;
      const r = await GetScore({
        patientCaseId: that.patientCaseId,
      });
      if (r.code === 1) {
        console.log(r.data);
        if (that.scoreType === "头颈") {
          that.scoreForm = r.data.TJScore;
        }
        if (that.scoreType === "心胸") {
          that.scoreForm = r.data.XXScore;
        }
        if (that.scoreType === "腹部") {
          that.scoreForm = r.data.FBScore;
        }
        if (that.scoreType === "外周") {
          that.scoreForm = r.data.WZScore;
        }
      } else {
        this.$alertError(r.error);
      }
    },
    submitScore(obj) {
      this.submitForm = Object.assign(
        { PatientCaseId: this.patientCaseId },
        obj
      );
      this.SocrePatientCaseAsync();
    },
  },
  components: {
    HeadScore,
    HeartCase,
    AbdomenScore,
    PeripheralScore,
  },
  created() {
    this.GetScoreAsync();
  },
  mounted() {},
};
</script>

<style scoped>
.score_box {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
.scoreCaseBox {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  max-height: 600px;
  overflow-y: auto;
}
</style>