<template>
  <div>
    <el-form
      class="score_box"
      label-position="top"
      label-width="80px"
      :model="FBScore"
      :disabled="disabled"
    >
      <el-form-item label="方案合理性（满分30分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/abdomenImage/FAHLScore.png" />
        <el-input-number v-model="FBScore.FAHLScore" :min="0" :max="30" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="增强效果（满分30分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/abdomenImage/ZQXGScore.png" />
        <el-input-number v-model="FBScore.ZQXGScore" :min="0" :max="30" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="满足临床需求（满分30分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/abdomenImage/LCXQScore.png" />
        <el-input-number v-model="FBScore.LCXQScore" :min="0" :max="30" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="病例小结（满分10分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/abdomenImage/BLXJScore.png" />
        <el-input-number v-model="FBScore.BLXJScore" :min="0" :max="10" label="得分"></el-input-number>
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
  name: "AbdomenScore",
  props: {
    FBScore: {
      type: Object,
      default: () => {
        return {
          FAHLScore: "0",
          ZQXGScore: "0",
          LCXQScore: "0",
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
    return {};
  },
  methods: {
    submitScore() {
      this.$emit("submit", {
        FBScore: this.FBScore,
      });
    },
  },
  computed: {
    getTotal() {
      let tt =
        this.FBScore.FAHLScore +
        this.FBScore.ZQXGScore +
        this.FBScore.LCXQScore +
        this.FBScore.BLXJScore +
        0;
      // 计算属性不可以直接修改 data
      return tt;
    },
  },
  watch: {
    // 监听计算属性变化
    getTotal: function (val) {
      this.FBScore.TotleScore = val;
    },
  },
};
</script>

<style scoped>
.socre_image {
  width: 90%;
}
</style>