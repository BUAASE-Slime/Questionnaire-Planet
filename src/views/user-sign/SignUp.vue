<template>
  <div class="register">
    <div>
      <img class="logo-name" src="../../assets/images/sign-in-logo.png" alt="logo" @click="handleToHome"/>
    </div>

    <div class="register-wrap">
      <h1 class="title">注册</h1>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input
                placeholder="用户名"
                type="username"
                v-model="ruleForm.username"
                autocomplete="off"
                @keyup.enter.native="register('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
                placeholder="邮箱"
                type="email"
                v-model="ruleForm.email"
                autocomplete="off"
                @keyup.enter.native="register('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
                placeholder="密码"
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                @keyup.enter.native="register('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
                placeholder="确认密码"
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                @keyup.enter.native="register('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item class="register-btn">
            <el-button type="primary" @click="register('ruleForm')">注 册</el-button>
          </el-form-item>
        </el-form>
        <div class="login-text">
          <p @click="handleCommand">已有账号？直接登录</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.register-btn {
  margin-top: 25px;
  text-align: center;
}
.register-btn button{
  width:100%;
  height:38px;
}
.logo-name {
  margin-top: 30px;
  width: 350px;
  height: 175px;
  cursor: pointer;
  overflow: hidden;
}
.login-text {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
.register {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/sign-in-5.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  position: fixed;
}
.title{
  text-align: center;
  margin-bottom: 25px;
}
.register-wrap {
  width: 350px;
  height: 440px;
  padding: 20px 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgb(255, 255, 255, 0.85);
  border-radius: 20px;
}
</style>

<script>
export default {
  name: "register",
  data() {
    var checkUsername = (rule, value, callback) => {
      const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('用户名由中英文、数字或下划线组成'))
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        var reg_pwd=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        if (!reg_pwd.test(value)) {
          callback(new Error('密码至少同时包含字母和数字，且长度为8-18'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    register: function (formName) {
      const self = this;
      const formData = new FormData();
      formData.append("username", self.ruleForm.username);
      formData.append("email", self.ruleForm.email);
      formData.append("password1", self.ruleForm.pass);
      formData.append("password2", self.ruleForm.checkPass);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios({
            method: 'post',
            url: '/user/register',
            data: formData,
          })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                this.$store.dispatch('saveUserInfo', {user: {
                    'username': this.ruleForm.username,
                    'confirmed': false,
                  }});
                this.$message.success('注册成功！');
                setTimeout(()=> {
                  this.$router.push('/unverified_email');
                },1500);
                break;
              case -1:
                this.$message.warning('请检查填写的内容！');
                break;
              case 2:
                this.$message.warning('用户名已注册！');
                break;
              case 3:
                this.$message.error('邮箱已注册或不可用！');
                break;
              case 4:
                this.$message.error('密码不符合规则，需满足8-18，英文字母+数字！');
                break;
              case 5:
                this.$message.error('两次输入的密码不一致！');
                break;
              case 6:
                this.$message.error('邮件验证码发送失败，请检查邮箱是否填写正确！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
        } else {
          console.log('提交失败!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand() {
      this.$router.push("/login");
    },
    handleToHome() {
      this.$router.push('/');
    }
  }
}
</script>
