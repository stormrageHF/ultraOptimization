<template>
  <div>
    <el-menu default-active="1" class="el-menu-vertical" @select="selectMenu">
      <el-menu-item v-for="(item, i) in menuArr" :index="String(i+1)" :key="item">
        <i class="el-icon-document"></i>
        <span slot="title">{{item}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    menuArr: Array
  },
  data() {
    return {};
  },
  methods: {
    selectMenu(index) {
      this.$emit("select-menu", index);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical {
  width: 200px;
  min-height: calc(100vh - 90px);
}
</style>