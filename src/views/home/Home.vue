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
    </div>
<!--    <img src="/static/images/demo1.png" class="demoImg"><br>-->
<!--    <img src="/static/images/demo2.png" class="demoImg"><br>-->
<!--    <img src="/static/images/demo3.png" class="demoImg"><br><br>-->

    <el-footer class="bottom">
      <p>Copyright © 2021 Zewan.cc. All rights reserved.</p>
      <p>官方邮箱：<a href="mailto:zewancc@126.com">zewancc@126.com</a></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021021248号</a></p>
    </el-footer>
  </div>
</template>

<script>
import user from "@/store/user";

export default{
  data(){
    return{
      userNum: 100,
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
      ]
    }
  },
  methods: {
    gotoLogin() {
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        this.$router.push('/home');
      } else {
        this.$router.push('/login');
      }
    }
  }
}
</script>
<style scoped>
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
.bottom{
  height: 150px!important;
  background-color: #f1f3f5;
  color: #9b9ea0;
  position: relative;
  padding: 20px;
}
.bottom a {
  text-decoration: none;
}
.bottom a:link {
  color: #9b9ea0;
}
.bottom a:hover {
  color: #00aeff;
}
.bottom a:visited {
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
.lj{

}
.b{
  font-weight: 700;
}

</style>