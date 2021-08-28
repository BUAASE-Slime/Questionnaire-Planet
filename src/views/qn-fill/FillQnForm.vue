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
        <h1 v-if="success">报名成功，感谢您的参与！</h1>
        <el-button type="primary" size="middle" @click="gotoHome">返回首页</el-button>
      </div>
      <div v-else-if="repeat" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="repeat">您已报名成功，请勿重复填写！</h1>
        <el-button type="primary" size="middle" @click="gotoHome">返回首页</el-button>
      </div>
      <div v-else-if="full" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="full">所选活动报名人数已满，可返回查看！</h1>
        <el-button type="primary" size="middle" @click="backToSurvey">返回查看</el-button>
      </div>
      <div v-else-if="allfull" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="allfull">报名人数已满，感谢参与！</h1>
        <el-button type="primary" size="middle" @click="gotoHome">返回首页</el-button>
      </div>
      <div v-else-if="close" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="close">问卷已结束，感谢您的参与！</h1>
        <el-button type="primary" size="middle" @click="gotoHome">返回首页</el-button>
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

            <div class="q-title">
              {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
            </div>

            <!--                  单选-->
            <div v-if="item.type==='radio'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio v-if="item.type==='radio'" v-model="answers[item.id-1].ans" :label="opt.title">
                  {{ opt.title }}
                  <span style="color: #aaaaaa;font-size: small;margin-left: 15px" v-if="opt.hasNumLimit">剩余{{opt.supply-opt.consume}}</span>
                </el-radio>
              </div>
            </div>

            <!--                  多选-->
            <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" v-model="answers[item.id-1].ansList">
              <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.title">
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
        <a :href="rootUrl">问卷星球</a>&ensp;提供技术支持
      </div>
    </div>
  </div>
</template>

<script>
import getDataApi from "@/utils/getDataApi";
import saveAnsApi from "@/utils/saveDataApi";
export default {
  name: "FillQn",
  mixins: [getDataApi, saveAnsApi],
  data() {
    return {
      rootUrl: this.GLOBAL.baseUrl,

      success: false,
      close: false,
      repeat: false,
      full: false,
      allfull: false,

      mode: this.$route.query.mode,
      title: '',
      description: '',
      questions: [
      //     {
      //   id: 1,
      //   type:'radio',
      //   title:'test',
      //   must: true, // 是否必填
      //   description: '', // 问题描述
      //   options:[
      //     {
      //       hasNumLimit:true,
      //       title:'11111', // 选项标题
      //       id: 0 ,// 选项id
      //       supply:11,
      //       consume:0,
      //     },
      //     {
      //       hasNumLimit:true,
      //       title:'22222', // 选项标题
      //       id: 1 ,// 选项id
      //       supply:11,
      //       consume:0,
      //     }
      //   ],
      //   row:1, // 填空区域行数
      //   score:10, // 最大评分
      // },
      //   {
      //     id: 2,
      //     type:'text',
      //     title:'',
      //     must: false, // 是否必填
      //     description: '', // 问题描述
      //     options:[
      //       {
      //         hasNumLimit:false,
      //         title:'', // 选项标题
      //         id: 0 ,// 选项id
      //         supply:1,
      //         consume:0,
      //       }
      //     ],
      //     row:1, // 填空区域行数
      //     score:10, // 最大评分
      //   }],
      // answers: [
      //   {
      //     question_id: '1',
      //     type: '1',
      //     ans: null,
      //     ansList: [],
      //   },
      //   {
      //     question_id: '2',
      //     type: '2',
      //     ans: null,
      //     ansList: [],
      //   },
      ],
      answers: [],
      type: ''
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/');
    },
    backToSurvey() {
      this.success = false;
      this.full = false;
      this.allfull = false;
      this.repeat = false;
      this.close = false;
      location.reload();
    },
    submit: function () {
      this.submitAns("4");
    },
    quit: function () {
      this.$confirm('请选择返回问卷编辑页面或问卷中心？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '编辑页面',
        cancelButtonText: '问卷中心'
      })
      .then(() => {
        location.href = this.GLOBAL.baseUrl + "/edit_form?pid=" + this.$route.query.pid;
      })
      .catch(action => {
        if (action === 'cancel') {
          this.$router.push('/index');
        }
      });

    },
  },
  created() {
    if (this.mode === '0') {
      this.getQnDataForPreview();
    }
    else if (this.mode === '1') {
      this.getQnDataForFill();
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