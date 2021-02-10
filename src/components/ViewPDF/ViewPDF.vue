<template>
  <div>
    <div class="pdf-tips" v-if="showTips">
      按“ESC”键可关闭PDF<el-button type="text"
        ><i
          class="el-icon-close"
          @click="
            pdfTop = 0;
            showTips = false;
          "
        ></i
      ></el-button>
    </div>
    <div id="pdf-content" :style="{ top: pdfTop + 'px' }"></div>
  </div>
</template>

<script>
import pdf from "pdfobject";

export default {
  name: "ViewPDF",
  props: {
    pdfUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pdfTop: 40,
      showTips: true,
    };
  },
  created() {},
  methods: {},
  beforeMount() {
    var that = this;
    that.$nextTick(function () {
      pdf.embed(that.pdfUrl, "#pdf-content");
    });
  },
};
</script>

<style scoped>
.pdf-tips {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 999999999999;
  background: #fff;
}
#pdf-content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 999999999999;
  background: #999;
}
</style>