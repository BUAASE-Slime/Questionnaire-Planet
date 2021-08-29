<template>
  <div class="login">
    <div>
      <img class="logo-name" src="../../assets/images/sign-in-logo.png" alt="logo" @click="handleToHome"/>
    </div>
    <div class="login-wrap">
      <h1 class="title">登录</h1>
      <el-form :model="form" ref="form" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="用户名" type="username" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item id="password" prop="pass">
          <el-input
              placeholder="密码"
              type="password"
              v-model="form.password"
              autocomplete="off"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="register-text">
        <p @click="handleCommand">注册帐号</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.logo-name {
  margin-top: 30px;
  width: 350px;
  height: 175px;
  cursor: pointer;
  overflow: hidden;
}
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/sign-in-5.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  position: fixed;
}
.login-wrap {
  width: 350px;
  height: 330px;
  padding: 20px 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgb(255, 255, 255, 0.85);
  border-radius: 20px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.login-btn {
  margin-top: 25px;
  text-align: center;
}
.login-btn button{
  width:100%;
  height:38px;
}
.register-text {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
.title{
  text-align: center;
  margin-bottom: 25px;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      is_login: true,
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const self = this;
      const formData = new FormData();
      formData.append("username", self.form.username);
      formData.append("password", self.form.password);

      self.$axios({
        method: 'post',
        url: '/user/login',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            // location.reload();
            // 前端保存用户信息
              this.$message.success("登录成功");
            this.$store.dispatch('saveUserInfo', {user: {
              'username': this.form.username,
              'confirmed': true,
            }});
            var curr = localStorage.getItem('preRoute');
            if (curr == null) {
              this.$router.push('/index');
            } else {
              this.$router.push({ path: curr });
            }
            break;
          case -1:
            this.$message.error('请检查填写的内容！');
            break;
          case 2:
            this.$message.warning('用户已登录！');
            break;
          case 3:
            this.$message.error('用户名不存在！');
            break;
          case 4:
            this.$message.error('用户名或密码错误！');
            break;
          case 5:
            this.$message.warning('用户未通过邮件确认，请及时确认！');
            this.$store.dispatch('saveUserInfo', {user: {
              'username': this.form.username,
              'confirmed': false,
            }});
            var cur = localStorage.getItem('preRoute');
            if (cur == null) {
              this.$router.push('/unverified_email');
            } else {
              this.$router.push({ path: cur });
            }
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand() {
      this.$router.push("/register");
    },
    handleToHome() {
      this.$router.push('/');
    },
  }
}
</script>
