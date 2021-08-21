<template>
  <div class="all-body">
    <el-container>
      <el-aside class="left-nav">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
          <el-menu-item index="1">
            <i class="el-icon-time nav-icon"></i>
            <br>
            <span slot="title">回收概况</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-data nav-icon"></i>
            <br>
            <span slot="title">图表报告</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-data-analysis nav-icon"></i>
            <br>
            <span slot="title">交叉分析</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-download nav-icon"></i>
            <br>
            <span slot="title">下载答卷</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <h1>sadas</h1>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "QnStat",
  data() {
    return {
      qnId: '',
      qnTitle: '问卷标题',
    };
  },
  methods: {

  },
  created() {
    this.qnId = this.$route.query.qn_id;
  }
}

</script>

<style scoped>
.left-nav {
  width: 240px;
  /*margin-left: 50px;*/
}
.left-nav .el-menu-item {
  font-size: 16px;
  padding: 20px;
  text-align: center!important;
}
.left-nav .el-menu-item, .el-submenu__title {
  height: 120px;
  line-height: 30px;
}

.left-nav .nav-icon {
  font-size: 50px;
}

.all-body {
  height: 100%;
}
</style>