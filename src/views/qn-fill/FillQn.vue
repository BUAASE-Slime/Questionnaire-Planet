<template>
  <div class="qn-fill">
    <div class="back-bt" v-if="mode==='0' || mode===0">
      <el-button icon="el-icon-arrow-left" type="danger" @click="quit">退出预览</el-button>
    </div>
    <div class="paper">
      <div v-if="success" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="success">提交成功，感谢您的参与！</h1>
        <el-button type="primary" size="middle" @click="backToSurvey">继续查看问卷信息</el-button>
      </div>
      <div v-else-if="close" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="close">问卷已结束，感谢您的参与！</h1>
        <el-button type="primary" size="middle" @click="gotoHome">返回</el-button>
      </div>
      <div class="body" v-else>

        <div class="title">
          {{ title }}
        </div>

        <div class="description" v-if="this.description!==''">
          &emsp;&emsp;{{ description }}
        </div>

        <el-divider></el-divider>

        <div class="main">
          <div class="ques-block" v-for="item in questions" :key="item.id">
            <div v-if="item.is_shown&&ahead(item.last_question)">
            <div class="q-title">
              {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
            </div>

            <div
                class="q-description"
                v-if="item.description!=='' && item.description!==null && item.description!==undefined"
            >
              {{ item.description }}
            </div>

            <!--                  单选-->
            <div v-if="item.type==='radio'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio v-if="item.type==='radio'" @change="changeHandler(item.question_id,item.id,answers[item.id-1].ans)" v-model="answers[item.id-1].ans" :label="opt.title">
                  {{ opt.title }}
                </el-radio>
              </div>
            </div>

            <!--                  多选-->
            <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" @change="changeHandler2(item.question_id,item.id,answers[item.id-1].ansList)" v-model="answers[item.id-1].ansList">
              <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.title">
                {{ opt.title }}
              </el-checkbox>
            </el-checkbox-group>

            <!--                  填空-->
            <div class="q-opt" v-if="item.type==='text'">
              <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: item.row}"
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans">
              </el-input>
            </div>

            <!--                  评分-->
            <div class="q-opt" v-if="item.type==='mark'">
              <el-rate v-model="answers[item.id-1].ans" :max="item.score"></el-rate>
            </div>
          </div>
          </div>
        </div>

        <div class="submit-bt">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>

      </div>

      <div class="tail">
        <a :href="rootUrl">问卷星球</a>&ensp;提供技术支持
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FillQn",
  data() {
    return {
      rootUrl: this.GLOBAL.baseUrl,

      success: false,
      close: false,

      mode: this.$route.query.mode,
      title: '',
      description: '',
      // questions: [],
      // answers: [],
      type: '',
      answers:[
            {
                question_id: 66,
                type: "radio",
                ans: "",
                ansList: [],
                answer: ""
            },
            {
                question_id: 67,
                type: "checkbox",
                ans: null,
                ansList: [],
                answer: ""
            },
            {
                question_id: 68,
                type: "radio",
                ans: "",
                ansList: [],
                answer: ""
            },
            {
                question_id: 69,
                type: "radio",
                ans: "",
                ansList: [],
                answer: ""
            },
            {
                question_id: 70,
                type: "mark",
                ans: 9,
                ansList: [],
                answer: "9"
            },     
      ],
      questions: [
          {
              last_question: 0,
              last_option: 0,
              is_shown: true,
              question_id: 222,
              row: 1,
              score: 10,
              title: "小学期开发的内容是？",
              description: "看看你们是不是还没看需求",
              must: true,
              type: "radio",
              qn_id: 97,
              refer: "问卷星球",
              point: 20,
              id: 1,
              options: [
                  {
                      id: 590,
                      title: "问卷星球"
                  },
                  {
                      id: 591,
                      title: "出版系统"
                  }
              ],
              answer: ""
          },
          {
              last_question: 222,
              last_option: 590,
              is_shown: false,
              question_id: 223,
              row: 1,
              score: 10,
              title: "本次小学期的助教有？",
              description: "不会吧不会吧，不会有人真以为助教只是助教吧？",
              must: true,
              type: "checkbox",
              refer: "ZXH-<^-^>-HZY",
              point: 30,
              id: 2,
              options: [
                  {
                      id: 592,
                      title: "ZXH"
                  },
                  {
                      id: 593,
                      title: "ZYH"
                  },
                  {
                      id: 594,
                      title: "HZY"
                  },
                  {
                      id: 595,
                      title: "ZHT"
                  },
                  {
                      id: 596,
                      title: "LKW"
                  }
              ],
              answer: ""
          },
          {
              last_question: 223,
              last_option: 592,
              is_shown: false,
              question_id: 224,
              row: 1,
              score: 10,
              title: "敏捷开发中你感受得到一丝丝快乐吗？",
              description: "",
              must: false,
              type: "radio",
              refer: "感受不到",
              point: 5,
              id: 3,
              options: [
                  {
                      id: 597,
                      title: "感受不到"
                  },
                  {
                      id: 598,
                      title: "一丝丝都感受不到"
                  }
              ],
              answer: ""
          },
          {
              last_question: 224,
              last_option: 597,
              is_shown: false,
              question_id: 225,
              row: 1,
              score: 10,
              title: "第一次迭代验收前每天平均睡眠时间",
              description: "有人在第一次验收前夜通宵了吗，我看到 JBW 鏖战了20多小时",
              must: true,
              type: "radio",
              refer: "1-3小时",
              point: 6,
              id: 4,
              options: [
                  {
                      id: 599,
                      title: "1-3小时"
                  },
                  {
                      id: 600,
                      title: "3-5小时"
                  },
                  {
                      id: 601,
                      title: "5-7小时"
                  },
                  {
                      id: 602,
                      title: "睡啥觉，起来敲代码"
                  }
              ],
              answer: ""
          }
      ]

    }
  },
  methods: {
    ahead(qid){
        if(qid==0) return true;
        for(let i=0;i<this.questions.length;i++){
          if(this.questions[i].question_id==qid){
            if(this.questions[i].is_shown==true) return this.ahead(this.questions[i].last_question);
            else return false;
          }
        }
        return false;
    },
    changeHandler(qid,id,value) {
        console.log( id+ '改变之后的值是:' + value);
        let pid=0;
        for(let j=0;j<this.questions[id-1].options.length;j++){
          if(value==this.questions[id-1].options[j].title) pid=this.questions[id-1].options[j].id;
        }
        for(let i=id;i<this.questions.length;i++){
          if(this.questions[i].last_question==qid&&this.questions[i].last_option==pid){
            this.questions[i].is_shown=true;
          }
          else if(this.questions[i].last_question==qid){
            this.questions[i].is_shown=false;
          }
        }
    },
    changeHandler2(qid,id,value){
      console.log( id+ '改变之后的值是:' + value);
      let pid=[];
      let a=0;
      let find=false;
        for(let j=0;j<this.questions[id-1].options.length;j++){
          for(let k=0;k<value.length;k++){
            if(value[k]==this.questions[id-1].options[j].title) {
              pid[a++]=this.questions[id-1].options[j].id;
              break;
            }
          }
        }
        for(let i=id;i<this.questions.length;i++){
          if(this.questions[i].last_question==qid){
            for(let k=0;k<pid.length;k++){
              if(this.questions[i].last_option==pid[k]){
                this.questions[i].is_shown=true; 
                find=true; 
                break;
              }
            }
            if(!find) this.questions[i].is_shown=false;
          }
        }
    },
    gotoHome() {
      this.$router.push('/');
    },
    backToSurvey() {
      this.success = false;
    },
    submit: function () {
      // 必选检查
      let answers = this.answers;
      let questions = this.questions;
      let bool = false;
      let num = '';
      for (let i=0; i<answers.length; i++) {
        if (questions[i].must
            && (answers[i].ans===null || answers[i].ans==='' || (answers[i].ans===0 && answers[i].type==='mark'))
            && answers[i].ansList.length===0) {
          num += (i+1).toString() + ' ';
          bool = true;
        }
      }
      if (bool) {
        this.$message.warning('必填问题 ' + num + ' 尚未作答完毕，无法提交');
        return;
      }
      // 预览mode判断
      if (this.mode==='0' || this.mode===0) {
        this.$message({
          type: 'warning',
          message: '预览模式下无法提交问卷'
        });
        return;
      }
      // 数据转换
      for (var i=0; i<this.answers.length; i++) {
        var ans = this.answers[i].ans;
        var anslist = this.answers[i].ansList;
        this.answers[i].question_id = this.questions[i].question_id;
        switch (this.answers[i].type) {
          case "radio":
            this.answers[i].answer = this.answers[i].ans;
            break;
          case "checkbox":
            this.answers[i].answer = anslist.join('-<^-^>-');
            break;
          case "text":
            this.answers[i].answer = ans;
            break;
          case "mark":
            this.answers[i].answer = ans.toString();
            break;
        }
      }
      // 提交确认
      this.$confirm('确认提交问卷？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          code: this.$route.query.code,
          answers: this.answers,
        };
        var paramer = JSON.stringify(param, {answers: 'brackets'})
        this.$axios({
          method: 'post',
          url: '/qn/save_ans',
          data: paramer,
        })
        .then(res => {
          switch (res.data.status_code) {
            case 1:
              this.$message({
                type: 'success',
                message: '问卷提交成功'
              });
              this.success = true;
              break;
            case 2:
              this.$message.warning("问卷已结束，感谢您的参与！");
              this.close = true;
              break;
            case 3:
              this.$message.warning("问卷已结束，感谢您的参与！");
              this.close = true;
              break;
            default:
              this.$message.error("操作失败！");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }).catch(() => {

      });
    },
    quit: function () {
      this.$confirm('请选择返回问卷编辑页面或问卷中心？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '编辑页面',
        cancelButtonText: '问卷中心'
      })
          .then(() => {
            location.href = this.GLOBAL.baseUrl + "/edit?pid=" + this.$route.query.pid;
          })
          .catch(action => {
            if (action === 'cancel') {
              this.$router.push('/index');
            }
          });

    },
  },
  mounted() {
  },
  created() {

    if (this.mode === '0') {
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn_detail',
        data: formData,
      })
          .then(res => {
            switch (res.data.status_code) {
              case 0:
                this.$message.error("您无权访问！");
                this.$router.push('/');
                break;
              case 1:
                this.title = res.data.title;
                this.description = res.data.description;
                this.type = res.data.type;
                this.questions = res.data.questions;

                //建立答案框架
                for (var i=0; i<this.questions.length; i++) {
                  this.answers.push({
                    question_id: this.questions[i].question_id,
                    type: this.questions[i].type,
                    ans: null,
                    ansList: [],
                    answer: ''
                  })
                }

                break;
              default:
                this.$message.error("访问失败！");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
    else if (this.mode === '1') {
      const formData = new FormData();
      formData.append("code", this.$route.query.code);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn_for_fill',
        data: formData,
      })
          .then(res => {
            switch (res.data.status_code) {
              case 2:
                this.$router.push('PageNotFound');
                break;
              case 1:
                this.title = res.data.title;
                this.description = res.data.description;
                this.type = res.data.type;
                this.questions = res.data.questions;

                //建立答案框架
                for (var i=0; i<this.questions.length; i++) {
                  this.answers.push({
                    question_id: this.questions[i].question_id,
                    type: this.questions[i].type,
                    ans: null,
                    ansList: [],
                    answer: ''
                  })
                }
                break;
              case 3:
                this.close = true;
                break;
              default:
                this.$message.error("访问失败！");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
  },
}
</script>

<style>
.tyn-icon {
  margin: 50px ;
  padding-top: 100px;
}
.qn-fill {
  background-image: url("../../assets/images/preview_bk.png");
  background-repeat: repeat-y;
  min-height: 800px;
  overflow: hidden;
  background-position:center;
  background-size: 100% auto;
}

.qn-fill .back-bt {
  position: fixed;
  right: 90px;
  top: 0;
  margin: auto;
}

.qn-fill .back-bt .el-button {
  border-radius: 0 0 15px 15px;
}

.qn-fill .paper {
  margin: 120px auto 0;
  width: 900px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.qn-fill .body {
  margin-left: 80px;
  margin-right: 80px;
}

.qn-fill .body .title {
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 40px;
  padding-top: 45px;
}

.qn-fill .body .description {
  text-align: left;
  font-size: 16px;
  color: black;
  line-height: 30px;
  padding-bottom: 20px;
}

.qn-fill .body .el-divider--horizontal {
  margin: 0;
}

.qn-fill .body .q-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 40px 10px 10px;
  font-weight: bold;
}

.qn-fill .body .q-description {
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
  color: #969696;
}

.qn-fill .body .must {
  font-weight: normal;
  color: crimson;
}

.qn-fill .body .q-opt {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 10px 10px 10px;
}

.qn-fill .body .el-checkbox {
  padding: 10px 0;
  display: block;
}

.qn-fill .body .q-opt .el-textarea__inner {
  max-height: 100px;
}

.qn-fill .body .submit-bt {
  padding-top: 30px;
  padding-bottom: 50px;
}

.qn-fill .tail {
  padding-top: 25px;
  font-size: 15px;
  color: #b9b9b9;
  border-top: solid 1px #e3e3e3;
  height: 50px;
  margin: 0 30px 130px;
}
</style>