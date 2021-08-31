<template>
  <div class="qn-result">
    <div class="paper">
      <div style="padding-top: 30px; padding-bottom: 6px" >
        <span><h1>您已完成投票</h1></span>
      </div>
      <el-divider></el-divider>
      <div class="title">
        <h2>投票结果</h2>
        <span style="color: #9b9ea0">(红色为您做出的选择)</span>
      </div>

      <div class="main">
        <div class="qs-block" v-for="item in voteQuestions" v-bind:key="item.id">
          <div class="qs-title"><h3>{{item.title}}</h3></div>
          <div class="option-block" v-for="op in item.options" v-bind:key="op.id">
            <el-row class="op-title">{{op.title}}<i class="el-icon-success" v-if="op.is_selected" style="margin-left: 20px;color: #409EFF"></i></el-row>
            <el-row :class="{selected:op.is_selected}">
              <el-progress :stroke-width="20" :format="f(op.num)" :percentage="op.num/item.max_num*100">
              </el-progress>
            </el-row>
          </div>
        </div>
        <div class="tail">
          <a :href="rootUrl">问卷星球</a>&ensp;提供技术支持
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "FinishVote",
  data(){
    return{
      rootUrl: this.GLOBAL.baseUrl,
      voteQuestions: [
        // {
        //   question_id: 1,
        //   id: 1,
        //   type:'radio',
        //   title:'第一题',
        //   must: false, // 是否必填
        //   isVote:true,//是否是投票题
        //   description: '', // 问题描述
        //   max_num: 12,//投票人数最多的选项的人数
        //   options:[
        //     {
        //       title:'A.不太行', // 选项标题
        //       id: 1 ,// 选项id
        //       num: 2,//**********选该项人数
        //     },
        //     {
        //       title:'B.一般般', // 选项标题
        //       id: 2 ,// 选项id
        //       num: 8,
        //     },
        //     {
        //       title:'C.挺好的', // 选项标题
        //       id: 3 ,// 选项id
        //       num: 12,
        //     },
        //     {
        //       title:'D.非常好', // 选项标题
        //       id:4 ,// 选项id
        //       num: 9,
        //     }
        //   ],
        //   row: 1, // 填空区域行数
        //   score: 5, // 最大评分
        // },
        // {
        //   question_id: 2,
        //   id: 2,
        //   type:'checkbox',
        //   title:'第二题',
        //   must: true, // 是否必填
        //   isVote:true,//是否是投票题
        //   description: '', // 问题描述
        //   max_num: 18,//投票人数最多的选项的人数
        //   options:[
        //     {
        //       title:'A', // 选项标题
        //       id: 1 ,// 选项id
        //       num: 15,//**********选该项人数
        //     },
        //     {
        //       title:'B', // 选项标题
        //       id: 2 ,// 选项id
        //       num: 6,
        //     },
        //     {
        //       title:'C', // 选项标题
        //       id: 3 ,// 选项id
        //       num: 18,
        //     },
        //     {
        //       title:'D', // 选项标题
        //       id:4 ,// 选项id
        //       num: 3,
        //     }
        //   ],
        //   row: 1, // 填空区域行数
        //   score: 5, // 最大评分
        // },
      ]
    }
  },
  methods: {
    f(x) {
      return ()=>{
        return x;
      };
    }
  },
  created() {
    const formData = new FormData();
    formData.append("code", this.$route.query.code);
    this.$axios({
      method: 'post',
      url: '/sm/get/vote/current_situation/from/code',
      data: formData,
    })
    .then(res => {
      switch (res.data.status_code) {
        case 1:
          this.voteQuestions = res.data.questions;
          break;
        case 2:
          this.$router.push("PageNotFound");
          break;
        case 3:
          this.$message.error("问卷已结束！");
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
          break;
        default:
          this.$message.error("访问失败！");
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
          break;
      }
    })
  }
}
</script>

<style>
.qn-result {
  background-image: url("../../assets/images/preview_bk.png");
  background-repeat: repeat-y;
  min-height: 800px;
  overflow: hidden;
  background-position:center;
  background-size: 100% auto;
}

.qn-result .paper {
  margin: 120px auto 0;
  width: 900px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.qn-result .title {
  margin-top: 40px;
  margin-bottom: 40px;
  color: #1687fd;
}


.qn-result .tail {
  padding-top: 25px;
  font-size: 15px;
  color: #b9b9b9;
  border-top: solid 1px #e3e3e3;
  height: 50px;
  margin: 0 30px 130px;
}

.qn-result .tail-point {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: crimson;
}


.qn-result .qs-block{
  margin-top: 20px;
  text-align: left;
  width: 85%;
  padding-left: 110px;
  margin-bottom: 50px;
}

.qn-result .option-block{
  margin-top: 5px;
}

.qn-result .progress{
  width: 700px;
}

.qn-result .op-title{
  margin-top: 5px;
  margin-bottom: 3px;
  padding: 5px;
}

.qn-result .progress{
  margin-bottom: 5px;
}

.el-progress-bar__inner{
  background-image: linear-gradient(to right, #3587d8 , #a8a4ff);
}

.selected .el-progress-bar__inner{
  background-image: linear-gradient(to right, #fe4365, #fc9d9a);
}
</style>