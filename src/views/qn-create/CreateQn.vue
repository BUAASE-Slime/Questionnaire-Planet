<template>
  <div class="create-que">
      <el-row class="type-choose">
        <el-col :span="6" offset="6">
          <el-card class="box-card" @mouseover.native="isHoverSurvey=true" @mouseout.native="isHoverSurvey=false" >
            <div style="display: table-cell;text-align: center"><img class="image" src="../../assets/images/survey.png"></div>
            <span ><h3>调查</h3></span>
            <div v-if="isHoverSurvey">
              <el-button type="primary" @click="dialogVisible=true;quesType=1;">立即创建</el-button>
            </div>
            <div class="describe" v-else>
              <el-row>丰富题型，强大逻辑</el-row>
              <el-row>问卷密码，红包抽奖</el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card"  @mouseover.native="isHoverTest=true" @mouseout.native="isHoverTest=false">
            <img class="image" src="../../assets/images/test.png" alt="test_img">
            <span><h3>考试</h3></span>
            <div v-if="isHoverTest">
              <el-button type="danger" @click="dialogVisible=true;;quesType=2">立即创建</el-button>
            </div>
            <div class="describe" v-else>
              <el-row>题库抽题，限时作答</el-row>
              <el-row>成绩查询，自动阅卷</el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" @mouseover.native="isHoverVote=true" @mouseout.native="isHoverVote=false">
            <img class="image" src="../../assets/images/vote.png" alt="vote_img">
            <span ><h3>投票</h3></span>
            <div v-if="isHoverVote">
              <el-button type="warning" @click="dialogVisible=true;quesType=3">立即创建</el-button>
            </div>
            <div class="describe" v-else>
              <el-row >图文视频，选项随机</el-row>
              <el-row>实时排行，微信投票</el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <el-row class="type-choose">
      <el-col :span="6" offset="6">
        <el-card class="box-card" @mouseover.native="isHoverForm=true" @mouseout.native="isHoverForm=false">
          <img class="image" src="../../assets/images/form.png" alt="form_img">
          <span ><h3>表单</h3></span>
          <div v-if="isHoverForm">
            <el-button type="success" @click="dialogVisible=true;quesType=4">立即创建</el-button>
          </div>
          <div class="describe" v-else>
            <el-row>信息登记，活动报名</el-row>
            <el-row>Excel导入数据</el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" @mouseover.native="isHoverPunch=true" @mouseout.native="isHoverPunch=false">
          <img class="image" src="../../assets/images/punch.png" alt="punch_img">
          <span ><h3>打卡</h3></span>
          <div v-if="isHoverPunch">
            <el-button type="info" @click="dialogVisible=true;quesType=5">立即创建</el-button>
          </div>
          <div class="describe" v-else>
            <el-row>日常打卡，疫情打卡</el-row>
            <el-row>快速定位，信息上报</el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div><img class="image" src="../../assets/images/wen.png" alt="more_img"></div>
          <span><h3 style="height: 350px;margin: auto">更多内容 敬请期待......</h3><br></span>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title=请输入问卷标题 :visible.sync="dialogVisible" width="30%" style="margin-top: 100px">
      <el-input class="input" v-model="surveyTitle" ></el-input>
        <span slot="footer" class="dialog-footer" style="text-align: center">
          <el-row class="bt-group">
            <el-button :span="6" @click="dialogVisible = false">取 消</el-button>
            <el-button :span="6" type="primary" @click="createConfirm">确 定</el-button>
          </el-row>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "createQue",
  data() {
    return {
      isHoverSurvey: false,
      isHoverTest: false,
      isHoverForm: false,
      isHoverVote: false,
      isHoverPunch: false,
      dialogVisible :false,
      quesType: 1,
      surveyTitle: "",
    }
  },
  methods: {
    createSurvey(tag) {
      var formData = new FormData();
      const userInfo = user.getters.getUser(user.state());
      formData.append("username", userInfo.user.username);
      formData.append("title", this.surveyTitle);

      var editUrlName = '';

      switch (tag) {
        case 1:
          formData.append("type", "1");
          editUrlName = 'Edit';
          break;
        case 2:
          formData.append("type", "2");
          editUrlName = 'Test';
          break;
        case 3:
          formData.append("type", "3");
          editUrlName = 'EditVote';
          break;
        case 4:
          formData.append("type", "4");
          editUrlName = 'SignUpForm';
          break;
        case 5:
          formData.append("type", "5");
          editUrlName = 'EditHate';
          break;
      }

      this.$axios({
        method: 'post',
        url: '/sm/create/qn',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            var surveyId = res.data.qn_id;
            this.$router.push({
              name: editUrlName,
              query: {
                pid: surveyId
              }
            });
            break;
          case 2:
            this.$message.warning("登录信息失效，请重新登录！");
            setTimeout(() => {
              this.$store.dispatch('clear');
              location.reload();
            }, 500);
            break;
          default:
            this.$message.error("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    createConfirm(){
      this.dialogVisible=false;
      this.createSurvey(this.quesType);
    },
  }
}
</script>

<style scoped>
.create-que{
  padding-top: 20px;
  width: 80%;
  text-align: center;
}

.create-que .describe{
  color: #808080;
}

.create-que .describe .el-row{
  margin: 3px;
}

.create-que .el-card__header {
  padding: 0;
  margin: 0;
}

.create-que .type-choose{
  padding-bottom: 22px;
  width: 100%;
  text-align: center;
}

.create-que .box-card:hover{
  margin-top: -5px;
  opacity: 0.85;
}

.create-que .box-card {
  margin-right: 5px;
  margin-left: 5px;
  text-align: center;
  width: 270px;
  height: 350px;
  transition: all .5s;
  cursor: pointer;
}

.create-que .image {
  width: 100%;
  height: 200px;
  display: block;
  margin: 0;
}

.create-que .el-button{
  width: 155px;
}

.create-que .input {
  width: 360px;
}

.create-que .el-button+.el-button {
  margin-left: 50px;
}

.create-que .bt-group {
  margin-bottom: 20px;
}
</style>