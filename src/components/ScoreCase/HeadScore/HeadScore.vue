<template>
  <div>
    <el-form
      class="score_box"
      label-position="top"
      label-width="80px"
      :model="TJScore"
      :disabled="disabled"
    >
      <el-form-item label="临床资料的完备性（满分10分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/headImage/LCZLScore.png" />
        <el-input-number v-model="TJScore.LCZLScore" :min="0" :max="10" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="方案合理性（满分40分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/headImage/FAHLScore.png" />
        <el-input-number v-model="TJScore.FAHLScore" :min="0" :max="40" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="增强效果（满分20分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/headImage/ZQXGScore.png" />
        <el-input-number v-model="TJScore.ZQXGScore" :min="0" :max="20" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="满足临床需求（满分20分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/headImage/LCXQScore.png" />
        <el-input-number v-model="TJScore.LCXQScore" :min="0" :max="20" label="得分"></el-input-number>
      </el-form-item>
      <el-form-item label="病例小结（满分10分）" required>
        <img class="socre_image" src="../../../assets/images/scoreImages/headImage/BLXJScore.png" />
        <el-input-number v-model="TJScore.BLXJScore" :min="0" :max="10" label="得分"></el-input-number>
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
  name: "HeadScore",
  props: {
    TJScore: {
      type: Object,
      default: () => {
        return {
          LCZLScore: "0",
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
    return {
      TotleScore: 0,
    };
  },
  methods: {
    submitScore() {
      this.TJScore.TotleScore = this.TotleScore;
      this.$emit("submit", {
        TJScore: this.TJScore,
      });
    },
  },
  computed: {
    getTotal() {
      let tt =
        this.TJScore.LCZLScore +
        this.TJScore.FAHLScore +
        this.TJScore.ZQXGScore +
        this.TJScore.LCXQScore +
        this.TJScore.BLXJScore +
        0;
        // 计算属性不可以直接修改 data 
      return tt;
    },
  },
  watch:{
    // 监听计算属性变化
    getTotal:function (val){
      this.TotleScore = val
    }
  }
};
</script>

<style scoped>
.socre_image {
  width: 90%;
}
</style>