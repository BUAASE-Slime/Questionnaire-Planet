<template>
  <div class="verify">
    <div class="title">
      <h1>邮件发送成功！</h1>
      <p class="subtitle">邮件验证码将于3天后失效！</p>
    </div>
    <div class="btn">
      <el-button @click="reload">刷新登录</el-button>
      <el-button @click="send_email" type="primary">重新发送邮件</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "verify",
  data() {
    return {
      email: '',
      username: '',
    }
  },
  methods: {
    send_email() {
      this.$axios({
        method: 'GET',
        url: '/user/unverified_email/',
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.$message.success('验证邮件发送成功！');
            this.username = res.data.username;
            this.email = res.data.email;
            break;
          case 401:
            this.$message.warning('用户未登录！');
            break;
          case 402:
            this.$message.warning('用户已验证，无需重新验证！');
            setTimeout(()=> {
              this.$router.push('/');
            }, 1500)
            break;
          case 403:
            this.$message.error('邮件地址错误，请重新注册！');
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    reload() {
      location.reload();
    }
  },

}
</script>

<style scoped>
.title {
  margin: 20px;
}
.subtitle {
  margin-top: 30px;
}
.btn {
  margin-top: 30px;
}
</style>