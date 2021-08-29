<template>
  <div class="all-body">

    <el-container>
      <el-aside class="left-nav">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            router>
          <router-link :to="{name: 'recyconcept', query: {pid: this.pid}}">
            <el-menu-item>
              <i class="el-icon-time nav-icon"></i>
              <br>
              <span slot="title">回收概况</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{name: 'chartreport', query: {pid: this.pid}}">
            <el-menu-item>
              <i class="el-icon-s-data nav-icon"></i>
              <br>
              <span slot="title">图表报告</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{name: 'answerdata', query: {pid: this.pid}}">
            <el-menu-item>
              <i class="el-icon-document nav-icon"></i>
              <br>
              <span slot="title">回收数据</span>
            </el-menu-item>
          </router-link>

<!--          <router-link :to="{name: 'ranking', query: {pid: this.pid}}" v-if="this.type==2">-->
<!--            <el-menu-item>-->
<!--              <i class="el-icon-trophy nav-icon"></i>-->
<!--              <br>-->
<!--              <span slot="title">成绩排名</span>-->
<!--            </el-menu-item>-->
<!--          </router-link>-->

          <router-link :to="{name: 'crossover', query: {pid: this.pid}}">
            <el-menu-item>
              <i class="el-icon-data-analysis nav-icon"></i>
              <br>
              <span slot="title">交叉分析</span>
            </el-menu-item>
          </router-link>

          <router-link to="/index">
            <el-menu-item>
              <i class="el-icon-back nav-icon"></i>
              <br>
              <span slot="title">返回中心</span>
            </el-menu-item>
          </router-link>
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
      pid: this.$route.query.pid,
      type: 2,
    };
  },
  methods: {

  },
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