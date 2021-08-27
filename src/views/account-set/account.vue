<template>
    <div id="sum">
        <el-row :gutter="20">
        <el-col :span="6" style="width:480px"><div class="grid-content ">
            <el-card class="box-card1">
            <!-- <div>
                <h2 style="">{{name}}</h2>
                <span >id: {{userid}}</span><br>
                <div style="margin: 20px;">
                <img src="../../assets/images/star2.png">
                </div>
            </div> -->
            <div style="padding:25px 0;">
                <img src="../../assets/images/star4.png">
                <h2 style="">{{name}}</h2>
<!--                <span >id: {{userid}}</span><br>-->
            </div>
            </el-card>
        </div></el-col>

        <el-col :span="6"><div class="grid-content">
            <el-card class="box-card2">
            <div slot="header" class="clearfix" style="display:flex">
                <div id="accountinfo">
                    <h2 style="margin-left: 80px; text-align: left;">账户信息</h2>
                    <div class="ainfo2" style="margin-top:50px"><span>用户名：{{name}}</span></div>
<!--                    <div class="ainfo2"><span>用户id：{{userid}}</span></div>-->
                </div>
            </div>
            <div style="display:flex" id="set">
              <div>
                  <h2 style="margin-left: 80px; text-align: left;">账户设置</h2>
                  <!-- <div class="ainfo2" style="margin-top:50px"  v-if="havephone">
                    <span style="display:inline-block; width: 400px">手机号：{{phone}}</span>
                    <el-button type="primary" size="small" >更改</el-button>
                  </div>
                  <div class="ainfo2" style="margin-top:50px"  v-else >
                    <span style="display:inline-block; width: 400px">手机号：未绑定</span>
                    <el-button type="primary" size="small" >去绑定</el-button>
                  </div> -->
                  <div class="ainfo2" v-if="haveemail" >
                    <span style="display:inline-block; width: 400px">邮箱地址：{{email}}</span>
                    <el-button type="primary" size="small" @click="dialogFormVisible2=true">更改</el-button>
                  </div>
                  <div class="ainfo2" v-else >
                    <span style="display:inline-block; width: 400px">邮箱地址：未绑定</span>
                    <el-button type="primary" size="small" @click="dialogFormVisible2=true">去绑定</el-button>
                  </div>
                  <div class="ainfo2">
                    <span style="display:inline-block; width: 100px">密码：</span>
                    <el-button type="primary" size="small" @click="dialogFormVisible = true">修改密码</el-button>
                  </div>

                  <div>
                  <el-dialog  width="515px" title="修改密码" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="旧密码" :label-width="formLabelWidth">
                        <el-input type="password" v-model="form.old" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码" :label-width="formLabelWidth">
                        <el-input type="password" v-model="form.new" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" :label-width="formLabelWidth">
                        <el-input  type="password" v-model="form.newagain" autocomplete="off"></el-input>
                      </el-form-item>                                            
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="clearPasswordForm">取 消</el-button>
                      <el-button type="primary" @click="changePassword">确 定</el-button>
                    </div>
                  </el-dialog>
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
            </div>
            </el-card>
        </div></el-col>
        </el-row>
    </div>
</template>

<script>
  import user from "@/store/user";

  export default {
    data() {
      return {
          name: "",
          userid: "",
          phone: "",
          email: "",
          password: "",
          haveemail:false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          old:'',
          new:'',
          newagain:'',
          email: '',
          code: '',
        },
        formLabelWidth: '120px'
      }
    },
    created() {
      this.$axios({
        method: 'get',
        url: '/user/get/userinfo',
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            this.userid = res.data.user_id;
            this.name = res.data.username;
            this.haveemail = res.data.is_confirmed;
            this.email = res.data.email;
            break;
          case 2:
            this.$message.error("登录信息错误，请重新登录");
            this.$store.dispatch('clear');
            location.reload();
            break;
          case 3:
            this.$message.error("未检测到登录信息，请重新登录");
            this.$store.dispatch('clear');
            location.reload();
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    methods: {
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
      clearPasswordForm() {
        this.dialogFormVisible = false;
        this.form.newagain = '';
        this.form.old = '';
        this.form.new = '';
      },
      changePassword() {
        if (this.form.new !== this.form.newagain) {
          this.$message.error("两次输入的密码不同");
          this.form.newagain = '';
          this.form.old = '';
          this.form.new = '';
          return;
        }
        const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (!reg.test(this.form.new)) {
          this.$message.error("密码不符合规范，须由8-18个字符组成，且同时包含字母和数字");
          this.form.newagain = '';
          this.form.old = '';
          this.form.new = '';
          return;
        }

        const formData = new FormData();
        formData.append("old_password", this.form.old);
        formData.append("new_password_1", this.form.new);
        formData.append("new_password_2", this.form.newagain);

        this.$axios({
          method: 'post',
          url: '/user/change/password',
          data: formData,
        })
        .then(res => {
          switch (res.data.status_code) {
            case 1:
              this.$message.success("修改成功");
              this.dialogFormVisible = false;
              break;
            case 2:
              this.$message.error("两次输入的密码不同");
              break;
            case 3:
              this.$message.error("新旧密码相同");
              break;
            case 4:
              this.$message.error("输入的原密码错误");
              break;
            case 5:
              this.$message.error("输入的密码不符合规范，密码须由8-18个字符组成，且同时包含字母和数字");
              break;
            default:
              this.$message.error("操作失败");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
        this.form.newagain = '';
        this.form.old = '';
        this.form.new = '';
      }
    }
  }
</script>

<style scoped>
#sum{
    width: 95%;
    /* background-color: cyan; */
    padding: 20px;
}

.el-button{
  color: #2d94d4;
  background-color: white;
  font-size: 14px;
  margin-left: 20px;
}

.ainfo2{
    margin:30px;
    margin-left: 80px;
    text-align: left;
}

.text {
font-size: 14px;
}

.item {
padding: 18px 0;
}

.box-card1 {
width: 425px;
margin: 10px;
}
.box-card2 {
width: 900px;
margin: 10px 30px;
}
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>