<template>
  <div class="verify">
    <div class="title">
      <el-result icon="success" title="操作成功" subTitle="邮箱验证码已发送至您的邮箱，3天内有效，请及时确认！">
        <template slot="extra">
          <el-button size="medium" @click="gotoHome">返回首页</el-button>
          <el-button @click="send_email" type="primary" size="medium">重新发送邮件</el-button>
        </template>
      </el-result>
    </div>
    <div>
      <el-dialog width="500px" title="更换邮箱地址" :visible.sync="dialogFormVisible2" center>
        <el-form :model="form">
          <el-form-item label="邮箱地址" label-width="70px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" label-width="70px">
            <el-input v-model="form.code" style="width: 240px"></el-input>
            <el-button @click="sendConfirmCode">发送验证码</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clearEmailForm">取 消</el-button>
          <el-button type="primary" @click="changeEmail">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "verify",
  data() {
    return {
      email: '',
      username: '',
      dialogFormVisible2: false,
      form: {
        email: '',
        code: '',
      },
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/index');
    },
    send_email() {
      this.$axios({
        method: 'GET',
        url: '/user/send_verify_email',
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            this.$message.success('验证邮件发送成功！');
            this.username = res.data.username;
            this.email = res.data.email;
            break;
          case 2:
            this.$message.warning('用户未登录！');
            break;
          case 3:
            this.$message.warning('用户已验证，无需重新验证！');
            setTimeout(()=> {
              this.$router.push('/');
            }, 1500)
            break;
          case 4:
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
    },
    clearEmailForm() {
      this.dialogFormVisible2 = false;
      this.form.email = '';
    },
    sendConfirmCode() {
      if (this.form.email === '') {
        this.$message.warning("输入不能为空！");
        return;
      }
      const formData = new FormData();
      formData.append("email", this.form.email);
      this.$axios({
        method: 'post',
        url: '/user/send/code',
        data: formData,
      })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                this.$message.success("验证码发送成功，3日内有效");
                break;
              case 2:
                this.$message.error("发送验证码失败，请检查您的邮箱是否正确");
                this.form.email = '';
                break;
              case 4:
                this.$message.warning("邮箱已注册，不可用！");
                this.form.email = '';
                break;
              default:
                this.$message.error("请求失败");
                this.form.email = '';
                break;
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    changeEmail() {
      if (this.form.code === '' || this.form.email === '') {
        this.$message.warning("输入不能为空！");
        return;
      }

      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("code", this.form.code.trim());
      this.$axios({
        url: '/user/change/email',
        method: 'post',
        data: formData
      })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                this.$message.success("修改邮箱成功！");
                this.email = this.form.email;
                this.form.code = '';
                this.form.email = '';
                this.dialogFormVisible2 = false;
                this.$store.dispatch('saveUserInfo', {user: {
                    'username': user.getters.getUser(user.state()).user.username,
                    'confirmed': true,
                  }});
                break;
              case 2:
                this.$message.error("验证码错误！");
                this.form.code = '';
                break;
              case 3:
                this.$message.error("验证码失效，请重新获取！");
                this.form.code = '';
                break;
              case 4:
                this.$message.warning("邮箱已注册，不可用！");
                this.form.email = '';
                this.form.code = '';
                break;
            }
          })
          .then(err => {
            console.log(err);
          });
    },
  },

}
</script>

<style scoped>
.verify {
  height: 100%
}
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