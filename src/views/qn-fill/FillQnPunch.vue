<template>
  <div class="punch-fill">
    <div class="back-bt" v-if="mode==='0' || mode===0">
      <el-button icon="el-icon-arrow-left" type="danger" @click="quit">退出预览</el-button>
    </div>
    <div class="paper">
      <div v-if="success" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="success">打卡成功！</h1>
        <el-button type="primary" size="middle" @click="backToSurvey">继续查看问卷信息</el-button>
      </div>
      <div v-else-if="close" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="close">问卷已结束，感谢您的参与！</h1>
        <el-button type="primary" size="middle" @click="gotoHome">返回</el-button>
      </div>
      <div v-else-if="repeat" style="padding-bottom: 50px">
        <div class="tyn-icon">
          <img src="../../assets/images/survey2.png" alt="">
        </div>
        <h1 v-if="repeat">今日已打卡，无需重复提交！</h1>
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

            <div
                class="q-description"
                v-if="item.description!=='' && item.description!==null && item.description!==undefined"
            >
              {{ item.description }}
            </div>

            <!--                  单选-->
            <div v-if="item.type==='radio'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio v-if="item.type==='radio'" v-model="answers[item.id-1].ans" :label="opt.title">
                  {{ opt.title }}
                </el-radio>
              </div>
            </div>

            <!--                  多选-->
            <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" v-model="answers[item.id-1].ansList">
              <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.title">
                {{ opt.title }}
              </el-checkbox>
            </el-checkbox-group>

            <!--                  填空-->
            <div class="q-opt" v-if="item.type==='text'">
              <el-input
                  v-if="item.row>1"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: item.row}"
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans">
              </el-input>
              <el-input
                  v-if="item.row===1"
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans">
              </el-input>
            </div>

            <!--                  定位-->
            <div class="q-opt" v-if="item.type==='location'">
              <Location v-on:loadLoc="loadLoc"></Location>
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
import Location from "@/components/location";
import getDataApi from "@/utils/getDataApi";
import saveAnsApi from "@/utils/saveDataApi";
export default {
  name: "FillQnPunch",
  mixins: [getDataApi, saveAnsApi],
  components: {Location},
  data() {
    return {
      rootUrl: this.GLOBAL.baseUrl,

      success: false,
      close: false,
      repeat: false,

      mode: this.$route.query.mode,
      open: 1,

      locationInfo: '',
      title: '疫情填报',
      description: '',
      questions: [
        // {
        //   id: 1,
        //   type: 'location',
        //   title: '地理位置填报',
        //   must: true, // 是否必填
        //   description: '', // 问题描述
        //   options: [
        //     {
        //       title: '', // 选项标题
        //       id: 0 // 选项id
        //     }
        //   ],
        //   row: 1, // 填空区域行数
        //   score: 10, // 最大评分
        // },
        // {
        //   id: 2,
        //   type: 'radio',
        //   title: '昨天有没有加班？',
        //   must: true, // 是否必填
        //   description: '谨慎填写', // 问题描述
        //   options: [
        //     {
        //       title: '是', // 选项标题
        //       id: 1 // 选项id
        //     },
        //     {
        //       title: '否', // 选项标题
        //       id: 2 // 选项id
        //     },
        //   ],
        //   row: 1, // 填空区域行数
        //   score: 10, // 最大评分
        // }
      ],
      answers: [
        // {
        //   question_id: '1',
        //   type: 'location',
        //   ans: null,
        //   ansList: [],
        // },
        // {
        //   question_id: '2',
        //   type: 'radio',
        //   ans: null,
        //   ansList: [],
        // },
    ],
      type: ''
    }
  },
  methods: {
    loadLoc(value) {
      this.locationInfo = value;
    },
    gotoHome() {
      this.$router.push('/');
    },
    backToSurvey() {
      this.success = false;
    },
    submit: function () {
      this.submitAns('5');
    },
    quit: function () {
      this.$confirm('请选择返回问卷编辑页面或问卷中心？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '编辑页面',
        cancelButtonText: '问卷中心'
      })
          .then(() => {
            location.href = this.GLOBAL.baseUrl + "/edit_hate?pid=" + this.$route.query.pid;
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
  }
}
</script>

<style>
.tyn-icon {
  margin: 50px ;
  padding-top: 100px;
}
.punch-fill {
  background-image: url("../../assets/images/preview_bk.png");
  background-repeat: repeat-y;
  min-height: 800px;
  overflow: hidden;
  background-position:center;
  background-size: 100% auto;
}

.punch-fill .back-bt {
  position: fixed;
  right: 90px;
  top: 0;
  margin: auto;
}

.punch-fill .back-bt .el-button {
  border-radius: 0 0 15px 15px;
}

.punch-fill .paper {
  margin: 120px auto 0;
  width: 900px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.punch-fill .body {
  margin-left: 80px;
  margin-right: 80px;
}

.punch-fill .body .title {
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 40px;
  padding-top: 45px;
}

.punch-fill .body .description {
  text-align: left;
  font-size: 16px;
  color: black;
  line-height: 30px;
  padding-bottom: 20px;
}

.punch-fill .body .el-divider--horizontal {
  margin: 0;
}

.punch-fill .body .q-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 40px 10px 10px;
  font-weight: bold;
}

.punch-fill .body .q-description {
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
  color: #969696;
}

.punch-fill .body .must {
  font-weight: normal;
  color: crimson;
}

.punch-fill .body .q-opt {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 10px 10px 10px;
}

.punch-fill .body .el-checkbox {
  padding: 10px 0;
  display: block;
}

.punch-fill .body .q-opt .el-textarea__inner {
  max-height: 100px;
}

.punch-fill .body .submit-bt {
  padding-top: 30px;
  padding-bottom: 50px;
}

.punch-fill .tail {
  padding-top: 25px;
  font-size: 15px;
  color: #b9b9b9;
  border-top: solid 1px #e3e3e3;
  height: 50px;
  margin: 0 30px 130px;
}

.punch-fill .ques-block .el-button {
  width: 250px;
}
</style>