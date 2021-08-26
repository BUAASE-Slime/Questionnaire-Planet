<template>
  <div class="confirm">
  </div>
</template>

<script>

import user from "@/store/user";

export default {
  name: "confirm",
  data(){
    return {
      success: false,
    }
  },
  created() {
    const codeForm = new FormData();
    codeForm.append("code", this.$route.query.code);  // this.$route.query.code获取url中?code=后的参数
    this.$axios({
      method: 'post',
      url: '/user/confirm/email',
      data: codeForm,
    })
    .then(res => {
      switch (res.data.status_code) {
        case 1:
          this.success = true;
          this.$message.success('恭喜您验证成功!');
          this.$store.dispatch('saveUserInfo', {user: {
              'username': user.getters.getUser(user.state()).user.username,
              'confirmed': true,
            }});
          setTimeout(()=> {
            this.$router.push('/');
          }, 2000);
          break;
        case 2:
          this.$message.error('无效的确认请求');
          setTimeout(()=> {
            this.$router.push('/');
          }, 2000);
          break;
        case 3:
          this.$message.error('验证码已过期，请重新注册');
          setTimeout(()=> {
            this.$router.push('/register');
          }, 2000);
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.confirm {
  margin-top: 15px;
}
.el-card__header {
  padding: 0;
  margin: 0;
}

.identity-choose{
  text-align: center;
}

.box-card:hover{
  margin-top: -5px;
}

.box-card {
  width: 300px;
  transition: all .5s;
  text-align: center;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0;
}
</style>