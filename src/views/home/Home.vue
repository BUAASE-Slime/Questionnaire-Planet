<template>
  <div class="main">
    <el-carousel height="450px" >
      <el-carousel-item v-for="(item, index) in topImg" :key="index">
        <img :src="item.url" style="width: 100%; height: 100%;" alt="">
        <div class="cover">
          {{item.title}}<br>
          <span style="font-size: 35px">{{item.subTitle}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="body">
      <div class="body-show">
        <p>当前已经为广大用户完成 <span class="userNum">{{userNum}}</span> 份问卷回收</p>
      </div>
      <el-row class="button-row">
        <el-button type="primary" @click="gotoLogin">免费使用</el-button>
      </el-row>
      <el-divider/>

      <div id="model">
        <h2>热门模板</h2>
        <el-row>
          <el-col :span="4" offset="0">
            <el-card shadow="hover" class="box-card" @click.native="dialogVisible=true;quesType=1;" >
              <div style="display: table-cell;text-align: center"><img class="image" src="../../assets/images/survey3.png"></div>
              <span style="display: block; font-weight:bold; text-align: center">调查</span>
            </el-card>
          </el-col>
          <el-col :span="4" offset="1">
            <el-card shadow="hover" class="box-card" @click.native="dialogVisible=true;quesType=2;" >
              <div style="display: table-cell;text-align: center"><img class="image" src="../../assets/images/test3.png"></div>
              <span style="display: block; font-weight:bold; text-align: center">考试</span>
            </el-card>
          </el-col>
          <el-col :span="4" offset="1">
            <el-card shadow="hover" class="box-card" @click.native="dialogVisible=true;quesType=3;" >
              <div style="display: table-cell;text-align: center"><img class="image" src="../../assets/images/vote3.png"></div>
              <span style="display: block; font-weight:bold; text-align: center">投票</span>
            </el-card>
          </el-col>
          <el-col :span="4" offset="1">
            <el-card shadow="hover" class="box-card" @click.native="dialogVisible=true;quesType=4;" >
              <div style="display: table-cell;text-align: center"><img class="image" src="../../assets/images/form3.png"></div>
              <span style="display: block; font-weight:bold; text-align: center">表单</span>
            </el-card>
          </el-col>
          <el-col :span="4" offset="1">
            <el-card shadow="hover" class="box-card" @click.native="dialogVisible=true;quesType=5;" >
              <div style="display: table-cell;text-align: center"><img class="image" src="../../assets/images/punch3.png"></div>
              <span style="display: block; font-weight:bold; text-align: center">打卡</span>
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
      <div id="introduction" >
        <el-row >
          <el-col :span="15" offset="0">
            <div class="block">
              <el-carousel>
                <el-carousel-item v-for="(item, index) in topImg2" :key="index">
                  <img :src="item.url" style="width: 100%; height: 100%;" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="7" offset="2">
            <div id="qrcode">
              <el-image
                style="width: 250px; height: 250px"
                :src="require('../../assets/images/example.jpg')"
                :fit="fit"></el-image>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
<!--    <img src="/static/images/demo1.png" class="demoImg"><br>-->
<!--    <img src="/static/images/demo2.png" class="demoImg"><br>-->
<!--    <img src="/static/images/demo3.png" class="demoImg"><br><br>-->

    <el-footer class="footbottom">
      <p>Copyright © 2021 {{ domain }}. All rights reserved.</p>
      <p>官方邮箱：<a :href=sendtoEmail>{{ email }}</a></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021021248号</a></p>
    </el-footer>
  </div>
</template>

<script>
import user from "@/store/user";

export default{
  data(){
    return{
      dialogVisible :false,
      quesType: 1,
      surveyTitle: "",
      userNum: 100,
      domain: this.GLOBAL.domain,
      sendtoEmail: 'mailto:' + this.GLOBAL.email,
      email: this.GLOBAL.email,
      topImg:[
        {
          'title':'免费问卷调查系统',
          'subTitle':'Free Questionnaire System',
          'url':'https://img-1304418829.cos.ap-beijing.myqcloud.com/6.jpg'
        },
        {
         'title':'大数据统计与可视化',
         'subTitle':'Big data statistics and visualization',
         'url':'https://img-1304418829.cos.ap-beijing.myqcloud.com/joshua-mayo-HASoyURgPMY-unsplash.jpg'
        },
        {
         'title':'多样化的辅助工具',
         'subTitle':'Diversified auxiliary tools',
         'url':'https://img-1304418829.cos.ap-beijing.myqcloud.com/internet-banner.jpg'
        },
      ],
      topImg2:[
        {
          'title':'免费问卷调查系统',
          'subTitle':'Free Questionnaire System',
          'url':'https://img-1304418829.cos.ap-beijing.myqcloud.com/6.jpg'
        },
        {
         'title':'大数据统计与可视化',
         'subTitle':'Big data statistics and visualization',
         'url':'https://img-1304418829.cos.ap-beijing.myqcloud.com/joshua-mayo-HASoyURgPMY-unsplash.jpg'
        },
        {
         'title':'多样化的辅助工具',
         'subTitle':'Diversified auxiliary tools',
         'url':'https://img-1304418829.cos.ap-beijing.myqcloud.com/internet-banner.jpg'
        },
      ]
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
    gotoLogin() {
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        this.$router.push('/index');
      } else {
        // this.$message.warning('请先登录！');
        // setTimeout(() => {
          this.$router.push('/login');
        // }, 500);
      }
    }
  },
  created() {
    this.$axios({
      method: 'post',
      url: '/all_count/submit',
    })
    .then(res => {
      switch (res.data.status_code) {
        case 1:
          this.userNum = res.data.count;
          break;
        default:
          this.$message.warning("后端服务出问题了！");
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>
<style scoped>
  #qrcode{
    margin-left: 25px;
    margin-top: 25px;
  }
  #introduction .el-carousel{
    height: 300px;
    margin-left: 50px;
    margin-bottom: 50px;
  }
  #model{
    margin: 20px;
    margin-bottom: 50px;
  }
  #model .time {
    font-size: 13px;
    color: #999;
  }
  
  #model .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  #model .button {
    padding: 0;
    float: right;
  }

  #model .image {
    width: 100%;
    display: block;
  }

  #model .clearfix:before,
  #model .clearfix:after {
      display: table;
      content: "";
  }
  
  #model .clearfix:after {
      clear: both
  }

.main{
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1500px;
}
.body {
  margin-left: 180px;
  margin-right: 180px;
  text-align: left;
  max-width: 1200px;
}
.body .button-row {
  padding: 30px;
  float: right;
  display: inline-block;
}
.body .button-row button{
  width: 180px;
  height: 50px;
  margin: 10px 20px;
  font-size: 20px;
}
.body-show {
  height: 70px!important;
  color: #9b9ea0;
  padding: 30px;
  position: relative;
  text-align: left;
  display: inline-block;
}
.userNum {
  font-size: 32px;
  color: #00aeff;
}
.footbottom{
  height: 150px!important;
  background-color: #ebecec;
  color: #9b9ea0;
  position: relative;
  padding: 20px;
}
.footbottom a {
  text-decoration: none;
}
.footbottom a:link {
  color: #9b9ea0;
}
.footbottom a:hover {
  color: #00aeff;
}
.footbottom a:visited {
  color: #9b9ea0;
}
.demoImg{
  width: 800px;
  height:500px;
  /*border-radius: 5px;*/

  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.cover{
  position:absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);z-index: 100;left: 0;top:0;color: white;font-size: 50px;line-height: 60px;padding-top: 180px;
}

</style>