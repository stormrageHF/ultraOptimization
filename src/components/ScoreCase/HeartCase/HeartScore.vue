<template>
  <div>
    <el-form
      class="score_box"
      label-position="top"
      label-width="80px"
      :model="XXScore"
      :disabled="disabled"
    >
      <el-form-item label="临床资料的完备性（满分9分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/chestImage/LCZLScore.png" />
        <el-input-number v-model="XXScore.LCZLScore" :min="0" :max="9" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="扫描技术（满分35分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/chestImage/SMJSScore.png" />
        <el-input-number v-model="XXScore.SMJSScore" :min="0" :max="35" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="增强效果（满分25分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/chestImage/ZQXGScore.png" />
        <el-input-number v-model="XXScore.ZQXGScore" :min="0" :max="25" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="诊断与鉴别诊断（满分21分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/chestImage/ZDJBScore.png" />
        <el-input-number v-model="XXScore.ZDJBScore" :min="0" :max="21" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="病例小结（满分10分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/chestImage/BLXJScore.png" />
        <el-input-number v-model="XXScore.BLXJScore" :min="0" :max="10" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="总分" required>
        <span>{{getTotal}} 分</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitScore">提交评分</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeartScore",
  props: {
    XXScore: {
      type: Object,
      default: () => {
        return {
          LCZLScore: "0",
          SMJSScore: "0",
          ZQXGScore: "0",
          ZDJBScore: "0",
          BLXJScore: "0",
          TotleScore: "0",
        };
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    submitScore() {
      this.$emit("submit", {
        XXScore: this.XXScore,
      });
    },
  },
  computed: {
    getTotal() {
      let tt =
        this.XXScore.LCZLScore +
        this.XXScore.SMJSScore +
        this.XXScore.ZQXGScore +
        this.XXScore.ZDJBScore +
        this.XXScore.BLXJScore +
        0;
      // 计算属性不可以直接修改 data
      return tt;
    },
  },
  watch: {
    // 监听计算属性变化
    getTotal: function (val) {
      this.XXScore.TotleScore = val;
    },
  },
};
</script>

<style scoped>
.socre_image {
  width: 90%;
}
</style>