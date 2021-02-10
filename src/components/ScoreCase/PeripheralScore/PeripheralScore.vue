<template>
  <div>
    <el-form class="score_box" label-position="top" label-width="80px" :model="WZScore">
      <el-form-item label="方案合理性（满分30分）" required>
        <img
          class="socre_image"
          src="../../../assets/images/scoreImages/PeripheralImage/FAHLScore.png"
        />
        <el-input-number v-model="WZScore.FAHLScore" :min="0" :max="30" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="增强效果（满分30分）" required>
        <img
          class="socre_image"
          src="../../../assets/images/scoreImages/PeripheralImage/ZQXGScore.png"
        />
        <el-input-number v-model="WZScore.ZQXGScore" :min="0" :max="30" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="满足临床需求（满分30分）" required>
        <img
          class="socre_image"
          src="../../../assets/images/scoreImages/PeripheralImage/LCXQScore.png"
        />
        <el-input-number v-model="WZScore.LCXQScore" :min="0" :max="30" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="病例小结（满分10分）" required>
        <img
          class="socre_image"
          src="../../../assets/images/scoreImages/PeripheralImage/BLXJScore.png"
        />
        <el-input-number v-model="WZScore.BLXJScore" :min="0" :max="10" label="得分"></el-input-number>
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
  name: "PeripheralScore",
  props: {
    WZScore: {
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
        WZScore: this.WZScore,
      });
    },
  },
    computed: {
    getTotal() {
      let tt =
        this.WZScore.FAHLScore +
        this.WZScore.ZQXGScore +
        this.WZScore.LCXQScore +
        this.WZScore.BLXJScore +
        0;
      // 计算属性不可以直接修改 data
      return tt;
    },
  },
  watch: {
    // 监听计算属性变化
    getTotal: function (val) {
      this.WZScore.TotleScore = val;
    },
  },
};
</script>

<style scoped>
.socre_image {
  width: 90%;
}
</style>