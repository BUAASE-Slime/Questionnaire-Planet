<template>
  <div class="all-body">

    <el-container>
      <el-aside class="left-nav">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            router>
          <router-link :to="{name: 'recyconcept', query: {pid: pid }}">
          <el-menu-item >
            <i class="el-icon-time nav-icon"></i>
            <br>
            <span slot="title">回收概况</span>
          </el-menu-item>
          </router-link>

          <router-link :to="{name: 'answerdata', query: {pid: pid }}">
          <el-menu-item>
            <i class="el-icon-document nav-icon"></i>
            <br>
            <span slot="title">回收数据</span>
          </el-menu-item>
          </router-link>

          <router-link :to="{name: 'chartreport', query: {pid: pid }}">
          <el-menu-item>
            <i class="el-icon-s-data nav-icon"></i>
            <br>
            <span slot="title">图表报告</span>
          </el-menu-item>
          </router-link>

          <router-link :to="{name: 'crossover', query: {pid: pid }}">
          <el-menu-item>
            <i class="el-icon-data-analysis nav-icon"></i>
            <br>
            <span slot="title">交叉分析</span>
          </el-menu-item>
          </router-link>
          <!-- <el-menu-item index="/download">
            <i class="el-icon-download nav-icon"></i>
            <br>
            <span slot="title">下载答卷</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
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
      pid: 17
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
.el-aside {
  width: 120px !important;
  /*margin-left: 50px;*/
}
.el-menu-item{
  height: 120px !important;
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
a {
  text-decoration: none;
}
.el-container{
  margin-bottom: 20px;
}
</style>