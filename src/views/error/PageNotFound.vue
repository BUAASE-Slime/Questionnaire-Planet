<template>
  <div class="page-not-found"></div>
</template>

<script>
export default {
  name: "PageNotFound",
  created() {
    this.$message.warning("您访问的页面不存在，3秒后将自动跳转首页！");
    setTimeout(() => {
      this.$router.push('/');
    }, 3000);
  }
}
</script>

<style scoped>
.page-not-found{
  background: url("../../assets/images/error-bg.png") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  position: fixed;
}
</style>