<template>
  <div class="qn-result">
    <div class="paper">
      <div style="padding-top: 50px; padding-bottom: 6px" >
        <span><h1>恭喜你完成测试！您的分数是</h1></span>
        <span style="color: red;"><h1>{{ actualScore }}/{{ totalScore }}</h1>
        </span>
      </div>

      <div class="note">
        您的总分 / 满分
      </div>

      <el-divider></el-divider>

      <div class="title">
        <h2>评阅结果与参考答案</h2>
      </div>

      <div class="main">
        <div v-bind:class="{ 'ques-block-info' : isInfo(item) ,'ques-block-right': isRight(item), 'ques-block-wrong': !isRight(item) }" v-for="item in questions" :key="item.id">

          <div class="q-title">
            {{ item.id }}. {{ item.title }}
            <span class="must" v-if="item.must">(必填)</span>
            <span class="point" v-if="!isInfo(item)">
              &ensp;[分值 : {{ item.point }}]
            </span>
          </div>

          <div
              class="q-description"
              v-if="item.description!=='' && item.description!==null && item.description!==undefined"
          >
            {{ item.description }}
          </div>

          <!--     姓名/学号/班级/学校-->
          <div class="q-opt" v-if="isInfo(item)">
            <el-input
                placeholder="请输入内容"
                v-model="answers[item.id-1].ans"
                :disabled="true">
            </el-input>
          </div>

          <!--              判断/单选-->
          <div v-if="item.type==='radio' || item.type === 'judge'">
            <div class="q-opt" v-for="opt in item.options" :key="opt.id">
              <el-radio v-model="answers[item.id-1].ans" :label="opt.title" :disabled="true">
                {{ opt.title }}
              </el-radio>
            </div>
          </div>

          <!--                  多选-->
          <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" v-model="answers[item.id-1].ansList">
            <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.title" :disabled="true">
              {{ opt.title }}
            </el-checkbox>
          </el-checkbox-group>

          <!--                  填空-->
          <div class="q-opt" v-if="item.type==='text'">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: item.row}"
                placeholder="请输入内容"
                v-model="answers[item.id-1].ans"
                :disabled="true">
            </el-input>
          </div>

          <div v-if="!isInfo(item)" class="tail-info">
            <div class="tail-point">
              <div v-if="answers[item.id-1].correct">您的得分：{{ item.point }}</div>
              <div v-else>您的得分：0</div>
            </div>

            <div class="tail-refer" v-if="item.refer!==null && item.refer!==undefined">
              <div v-if="item.type==='radio' || item.type==='judge'">您的答案：{{ answers[item.id-1].ans }}</div>
              <div v-if="item.type==='checkbox'">您的答案：{{ answers[item.id-1].ansList }}</div>
              <div v-if="item.type==='text'">您的答案：{{ answers[item.id-1].ans }}</div>
              <div v-if="item.refer!==''">参考答案：{{ item.refer }}</div>
              <div v-if="item.refer===''">参考答案：无</div>
            </div>
          </div>

        </div>
      </div>

      <div class="tail">
        <a :href="rootUrl">问卷星球</a>&ensp;提供技术支持
      </div>

    </div>

  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "FinishTest",
  props: {
    quesStorage: []
  },
  data(){
    return{
      rootUrl: this.GLOBAL.baseUrl,

      hoverColor:{
        "--hcolor":"red"
      },
      questions: [],
      answers: [],
      totalScore: null,
      actualScore: null,
      // questions: [
      //   {
      //     id: 1,
      //     type: 'name',
      //     title: '姓名',
      //     must: true, // 是否必填
      //     description: '', // 问题描述
      //     options: [
      //       {
      //         title: '', // 选项标题
      //         id: 0 // 选项id
      //       },
      //     ],
      //     row: 1, // 填空区域行数
      //     refer: '', // 参考答案
      //     point: 0,  // 分值
      //   },
      //   {
      //     id: 2,
      //     type: 'stuId',
      //     title: '学号',
      //     must: true, // 是否必填
      //     description: '', // 问题描述
      //     options: [
      //       {
      //         title: '', // 选项标题
      //         id: 0 // 选项id
      //       },
      //     ],
      //     row: 1, // 填空区域行数
      //     refer: '', // 参考答案
      //     point: 0,  // 分值
      //   },
      //   {
      //     id: 3,
      //     type: 'class',
      //     title: '班级',
      //     must: true, // 是否必填
      //     description: '', // 问题描述
      //     options: [
      //       {
      //         title: '', // 选项标题
      //         id: 0 // 选项id
      //       },
      //     ],
      //     row: 1, // 填空区域行数
      //     refer: '', // 参考答案
      //     point: 0,  // 分值
      //   },
      //   {
      //     id: 4,
      //     type: 'school',
      //     title: '学校',
      //     must: true, // 是否必填
      //     description: '', // 问题描述
      //     options: [
      //       {
      //         title: '', // 选项标题
      //         id: 0 // 选项id
      //       },
      //     ],
      //     row: 1, // 填空区域行数
      //     refer: '', // 参考答案
      //     point: 0,  // 分值
      //   },
      //   {
      //     id: 5,
      //     type: 'radio',
      //     title: '这是一个什么问卷？',
      //     must: true, // 是否必填
      //     description: '请谨慎做答', // 问题描述
      //     options: [
      //       {
      //         title: '考试问卷', // 选项标题
      //         id: 1 // 选项id
      //       },
      //       {
      //         title: '调查问卷', // 选项标题
      //         id: 2 // 选项id
      //       },
      //     ],
      //     row: 0, // 填空区域行数
      //     refer: '考试问卷', // 参考答案
      //     point: 10,  // 分值
      //   },
      //   {
      //     id: 6,
      //     type: 'checkbox',
      //     title: '软工助教都有谁？',
      //     must: false, // 是否必填
      //     description: '', // 问题描述
      //     options: [
      //       {
      //         title: 'ZYH', // 选项标题
      //         id: 1 // 选项id
      //       },
      //       {
      //         title: 'LKW', // 选项标题
      //         id: 2 // 选项id
      //       },
      //       {
      //         title: 'MHY', // 选项标题
      //         id: 3 // 选项id
      //       },
      //       {
      //         title: 'HZH', // 选项标题
      //         id: 4 // 选项id
      //       },
      //     ],
      //     row: 0, // 填空区域行数
      //     refer: '["LKW", "MHY"]', // 参考答案
      //     point: 20,  // 分值
      //   },
      //   {
      //     id: 7,
      //     type: 'text',
      //     title: '小学期累不累？',
      //     must: false, // 是否必填
      //     description: '请谨慎考虑做答', // 问题描述
      //     options: [
      //       {
      //         title: '', // 选项标题
      //         id: 0 // 选项id
      //       },
      //     ],
      //     row: 5, // 填空区域行数
      //     refer: '', // 参考答案
      //     point: 30,  // 分值
      //   },
      //   {
      //     id: 8,
      //     type: 'judge',
      //     title: '从来没有加过班',
      //     must: true, // 是否必填
      //     description: '请谨慎考虑做答', // 问题描述
      //     options: [
      //       {
      //         title: '对', // 选项标题
      //         id: 1 // 选项id
      //       },
      //       {
      //         title: '错', // 选项标题
      //         id: 2 // 选项id
      //       },
      //     ],
      //     row: 0, // 填空区域行数
      //     refer: '对', // 参考答案
      //     point: 50,  // 分值
      //   },
      // ],
      // answers: [
      //   {
      //     question_id: '1',
      //     type: 'name',
      //     ans: 'Zuo_zuo',
      //     ansList: [],
      //     correct: null,
      //   },
      //   {
      //     question_id: '2',
      //     type: 'stuId',
      //     ans: '19373260',
      //     ansList: [],
      //     correct: null,
      //   },
      //   {
      //     question_id: '3',
      //     type: 'class',
      //     ans: '192111',
      //     ansList: [],
      //     correct: null,
      //   },
      //   {
      //     question_id: '4',
      //     type: 'school',
      //     ans: '北航',
      //     ansList: [],
      //     correct: null,
      //   },
      //   {
      //     question_id: '5',
      //     type: 'radio',
      //     ans: '调查问卷',
      //     ansList: [],
      //     correct: null,
      //   },
      //   {
      //     question_id: '6',
      //     type: 'checkbox',
      //     ans: null,
      //     ansList: ["LKW", "MHY"],
      //     correct: null,
      //   },
      //   {
      //     question_id: '7',
      //     type: 'text',
      //     ans: '累死啦',
      //     ansList: [],
      //     correct: null,
      //   },
      //   {
      //     question_id: '8',
      //     type: 'judge',
      //     ans: '对',
      //     ansList: [],
      //     correct: null,
      //   },
      // ],
    }
  },
  methods: {
    isInfo: function (item) {
      return item.type === 'name' || item.type === 'stuId' || item.type === 'class' || item.type === 'school'
    },
    isRight: function (item) {
      return this.answers[item.id-1].correct;
    },
    judge() {
      // 判卷
      let questions = this.questions;
      let answers = this.answers;
      let total = 0;
      let score = 0;
      for (let i=0; i<questions.length; i++) {
        // 略过信息和主观题
        if (this.isInfo(questions[i])) { continue;}
        // 统计
        if (questions[i].type === 'radio' || questions[i].type === 'judge') {
          if (questions[i].refer === answers[i].ans) {
            answers[i].correct = true;
            score += questions[i].point;
          }
          total += questions[i].point;
        }
        if (questions[i].type === 'checkbox') {
          // 预处理
          let reference = questions[i].refer;
          // let reference = questions[i].refer.substring(1, questions[i].refer.length-1).replace(/"/g, "").split(', ');
          if (reference.sort().toString() === answers[i].ansList.sort().toString()) {
            answers[i].correct = true;
            score += questions[i].point;
          }
          total += questions[i].point;
        } else if (questions[i].type === 'text') {
          if (questions[i].refer === answers[i].ans) {
            answers[i].correct = true;
            score += questions[i].point;
          }
          total += questions[i].point;
        }
      }
      this.actualScore = score;
      this.totalScore = total;
    },
  },
  created() {
    var data = [];
    this.questions = this.quesStorage;
    const userInfo = user.getters.getUser(user.state());
    const formData = new FormData();
    formData.append("code", this.$route.query.code);
    formData.append("username", userInfo.user.username);
    this.$axios({
      method: 'post',
      url: '/sm/get/submit_answers/code',
      data: formData,
    })
    .then(res => {
      if (res.data.status_code === 1) {
        data = res.data.answers;
        this.questions = res.data.questions;

        for (var m=0; m<this.questions.length; m++) {
          if (this.questions[m].type === 'checkbox') {
            this.questions[m].refer = this.questions[m].refer.split('-<^-^>-');
          }
        }

        this.answers = [];
        //建立答案框架
        for (var i=0; i<this.questions.length; i++) {
          this.answers.push({
            question_id: this.questions[i].question_id,
            type: this.questions[i].type,
            ans: null,
            ansList: [],
            answer: ''
          });
        }
        for (var j=0; j<this.answers.length; j++) {
          for (var k=0; k<data.length; k++) {
            if (this.answers[j].question_id === data[k].question_id) {
              switch (this.answers[j].type) {
                case 'checkbox':
                  this.answers[j].ansList = data[k].answer.split('-<^-^>-');
                  break;
                case 'mark':
                  this.answers[j].ans = parseInt(data[k].answer);
                  this.answers[j].answer = data[k].answer;
                  break;
                case 'radio':
                  this.answers[j].ans = data[k].answer;
                  this.answers[j].answer = data[k].answer;
                  break;
                default:
                  this.answers[j].ans = data[k].answer;
                  this.answers[j].answer = data[k].answer;
                  break;
              }
            }
          }
        }

        this.judge();
      } else {
        this.$message.error("请求失败！");
      }
    });
  },

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

.qn-result .note {
  color: #b9b9b9;
  font-size: 14px;
}

.qn-result .block-refer {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #a3a3a3;
}

.qn-result .block-yourAnswer {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #a3a3a3;
}

.qn-result .block-point {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #e59824;
}

.qn-result .title {
  margin-top: 40px;
  margin-bottom: 40px;
  color: #1687fd;
}

.qn-result .ques-block-info {
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  padding:20px
}

.qn-result .ques-block-info:hover {
  background: #f6f6f6 !important;
  transition: .3s;
}

.qn-result .ques-block-right {
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  padding:20px
}

.qn-result .ques-block-right:hover {
  background: #eef6fd;
  transition: .3s;
}

.qn-result .ques-block-wrong {
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  padding:20px
}

.qn-result .ques-block-wrong:hover {
  background: #fff2f2;
  transition: .3s;
}

.qn-result .q-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 0 10px 10px;
  font-weight: bold;
}

.qn-result .q-description {
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
  color: #969696;
}

.qn-result .must {
  font-weight: normal;
  color: crimson;
}

.qn-result .point {
  font-weight: normal;
  color: #EC9D2D;
}

.qn-result .q-opt {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 10px 10px 10px;
}

.qn-result .el-checkbox {
  padding: 10px 0;
  display: block;
}

.qn-result .q-opt .el-textarea__inner {
  max-height: 100px;
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

.qn-result .tail-refer {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #0404c9;
}

.tail-info {
  padding: 0 10px;
}
</style>