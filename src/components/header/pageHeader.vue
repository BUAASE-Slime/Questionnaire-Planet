<template>
  <div class="header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px">
        <img src="../../assets/images/star-logo.png" alt="logo">
        星球问卷
      </el-menu-item>
      <el-menu-item index="2">个人问卷</el-menu-item>
<!--      <el-menu-item index="3">导航二</el-menu-item>-->
      <el-submenu index="4" style="float: right">
        <template slot="title">{{ userName }}</template>
        <el-menu-item index="4-1" class="big-item">账户设置</el-menu-item>
        <el-menu-item index="4-2" class="big-item">退出</el-menu-item>
      </el-submenu>
      <i class="el-icon-bell" style="padding-top: 28px; font-size: 24px; float: right;" @click="openNews"></i>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'pageHeader',
    data() {
      return {
        userName: 'Zuo_zuo',
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      openNews: function () {
        alert('Wow');
      },
    }
  }
</script>


<style>
.header .el-menu{
  height: 80px;
  padding-left: 100px;
  padding-right: 100px;
}

.header .el-menu--horizontal>.el-menu-item {
  float: left;
  height: 80px;
  line-height: 80px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: black;
}

.header .el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid transparent;
  color: #409EFF !important;
}

.header .el-menu-item {
  font-size: 16px;
}

.header .el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 80px;
  line-height: 80px;
  color: black;
}

.header .el-submenu__title {
  font-size: 16px;
  color: black;
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
  color: black;
}

</style>