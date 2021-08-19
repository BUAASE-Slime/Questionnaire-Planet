<template>
  <div class="confirm">
    <div v-if="success" class="register-success">
      <el-row>
        <div class="msg">
          <h1>恭喜您验证成功！</h1>
        </div>
      </el-row>
    </div>
    <h3 v-else>验证失败，请检查验证链接，或链接已失效</h3>
  </div>
</template>

<script>
import user from "../../store/user";

export default {
  name: "confirm",
  data(){
    return {
      success: false,
    }
  },
  mounted() {
    const codeForm = new FormData();
    codeForm.append("code", this.$route.query.code);  // this.$route.query.code获取url中?code=后的参数
    this.$axios({
      method: 'post',
      url: '/user/confirm/',
      data: codeForm,
    })
    .then(res => {
      switch (res.data.status_code) {
        case '2000':
          this.success = true;
          break;
        case '4001':
          this.$message.error('无效的确认请求');
          setTimeout(()=> {
            this.$router.push('/');
          }, 2000);
          break;
        case '4002':
          this.$message.error('验证码已过期，请重新注册');
          setTimeout(()=> {
            this.$router.push('/unverified_email');
          }, 2000);
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods: {
    applyToAuthor() {
      this.$axios({
        method: 'GET',
        url: '/apply/',
      })
      .then(res => {
        switch (res.data.status_code) {
          case '2000':
            this.$message.success('申请成功！');
            user.getters.getUser(user.state()).user.usertype = '作者';
            setTimeout(()=> {
              this.$router.push('/');
            },1500);
            break;
          case '4001':
            this.$message.warning('请先完成邮箱验证！');
            setTimeout(()=> {
              this.$router.push('/unverified_email');
            },1500);
            break;
          case '4002':
            this.$message.warning('请完善个人资料！');
            setTimeout(()=> {
              this.$router.push('/edit');
            },1500);
            break;
          case '4003':
            this.$message.warning('您已是作者，请勿重复申请！');
            setTimeout(()=> {
              this.$router.push('/');
            },1500);
            break;
          default:
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
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