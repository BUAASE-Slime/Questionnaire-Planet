<template>
  <div class="qn-fill">
    <div class="back-bt" v-if="mode==='0' || mode===0">
      <el-button icon="el-icon-arrow-left" type="danger" @click="quit">退出预览</el-button>
    </div>
    <div class="paper">
      <div class="body">

        <div class="title">
          {{ title }}
        </div>

        <div class="description" v-if="this.description!==''">
          &emsp;&emsp;{{ description }}
        </div>

        <el-divider></el-divider>

        <div class="main">
          <div class="ques-block" v-for="item in questions" :key="item.id">

            <div class="q-title">
              {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
            </div>

            <!--                  单选-->
            <div v-if="item.type==='radio'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio v-if="item.type==='radio'" v-model="answers[item.id-1].ans" :label="opt.id">
                  {{ opt.title }}
                  <span style="color: #aaaaaa;font-size: small;margin-left: 15px" v-if="opt.hasNumLimit">剩余{{opt.supply-opt.consume}}</span>
                </el-radio>
              </div>
            </div>

            <!--                  多选-->
            <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" v-model="answers[item.id-1].ansList">
              <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.id">
                {{ opt.title }}
                <span style="color: #aaaaaa;font-size: small;margin-left: 15px" v-if="opt.hasNumLimit">剩余{{opt.supply-opt.consume}}</span>
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

        <div class="submit-bt">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>

      </div>

      <div class="tail">
        <a href="http://localhost:8080/">星球问卷</a>&ensp;提供技术支持
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FillQn",
  data() {
    return {
      mode: this.$route.query.mode,
      title: '',
      description: '',
      questions: [{
        id: 1,
        type:'radio',
        title:'test',
        must: true, // 是否必填
        description: '', // 问题描述
        options:[
          {
            hasNumLimit:true,
            title:'11111', // 选项标题
            id: 0 ,// 选项id
            supply:11,
            consume:0,
          },
          {
            hasNumLimit:true,
            title:'22222', // 选项标题
            id: 0 ,// 选项id
            supply:11,
            consume:0,
          }
        ],
        row:1, // 填空区域行数
        score:10, // 最大评分
      },
        {
          id: 2,
          type:'text',
          title:'',
          must: false, // 是否必填
          description: '', // 问题描述
          options:[
            {
              hasNumLimit:false,
              title:'', // 选项标题
              id: 0 ,// 选项id
              supply:1,
              consume:0,
            }
          ],
          row:1, // 填空区域行数
          score:10, // 最大评分
        }],
      answers: [
        {
          question_id: '1',
          type: '1',
          ans: null,
          ansList: [],
        },
        {
          question_id: '2',
          type: '2',
          ans: null,
          ansList: [],
        },
        {
          question_id: '3',
          type: '1',
          ans: null,
          ansList: [],
        },
        {
          question_id: '4',
          type: '3',
          ans: null,
          ansList: [],
        },
        {
          question_id: '5',
          type: '4',
          ans: null,
          ansList: [],
        },
      ],
      type: ''
    }
  },
  methods: {
    submit: function () {
      // 必选检查
      let answers = this.answers;
      let questions = this.questions;
      let bool = false;
      let num = '';
      for (let i=0; i<answers.length; i++) {
        if (questions[i].must
            && (answers[i].ans===null || answers[i].ans==='' || (answers[i].ans===0 && answers[i].type==='4'))
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
      if (this.mode==='0') {
        this.$message({
          type: 'warning',
          message: '预览模式下无法提交问卷'
        });
        return;
      }
      // 提交确认
      this.$confirm('确认提交问卷？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '问卷提交成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消提交'
        });
      });
    },
    quit: function () {
      this.$router.push('/index');
    },
  },
  created() {
    const formData = new FormData();
    formData.append("qn_id", this.$route.query.pid)

    if (this.mode === '0') {
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

.qn-fill .body  .q-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 40px 10px 10px;
  font-weight: bold;
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