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

              <!--                  图片-->
              <el-row class="block-img" v-for="(i,index) in item.imgList" :key="i.index">
                <el-col :offset="4" :span="8" class="demo-image__preview" v-if="index%2===0">
                  <el-image
                      style="width: 200px; height: 200px"
                      :src="i.url"
                      :preview-src-list="[i.url]">
                  </el-image>
                </el-col>
                <el-col :span="8" class="demo-image__preview" v-if="index%2===0&&index+1<=item.imgList.length-1">
                  <el-image
                      style="width: 200px; height: 200px"
                      :src="item.imgList[index+1].url"
                      :preview-src-list="[item.imgList[index+1].url]">
                  </el-image>
                </el-col>
              </el-row>
              <span style="color: #9b9ea0;font-size: x-small;margin: 5px" v-if="item.imgList.length!==0">（点击图片查看大图）</span>


              <!--                视频-->
              <el-row class="block-img" v-for="i in item.videoList" :key="i.index">
                <embed width=400 height=230 transparentatstart=true
                       animationatstart=false autostart=true autosize=false volume=100
                       displaysize=0 showdisplay=true showstatusbar=true showcontrols=true
                       showaudiocontrols=true showtracker=true showpositioncontrols=true
                       balance=true :src="i.url">
              </el-row>


              <!--                  单选-->
            <div v-if="item.type==='radio'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio v-if="item.type==='radio'" @change="changeHandler(item.id,answers[item.id-1].ans)" v-model="answers[item.id-1].ans" :label="opt.title">
                  {{ opt.title }}
                </el-radio>
              </div>
            </div>

            <!--                  多选-->
            <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" @change="changeHandler2(item.id,answers[item.id-1].ansList)" v-model="answers[item.id-1].ansList">
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

      mode: this.$route.query.mode,
      title: '',
      description: '',
      type: '',
      answers:[
            // {
            //     question_id: 66,
            //     type: "radio",
            //     ans: "",
            //     ansList: [],
            //     answer: ""
            // },
            // {
            //     question_id: 67,
            //     type: "checkbox",
            //     ans: null,
            //     ansList: [],
            //     answer: ""
            // },
            // {
            //     question_id: 68,
            //     type: "radio",
            //     ans: "",
            //     ansList: [],
            //     answer: ""
            // },
            // {
            //     question_id: 69,
            //     type: "radio",
            //     ans: "",
            //     ansList: [],
            //     answer: ""
            // },
            // {
            //     question_id: 70,
            //     type: "mark",
            //     ans: 9,
            //     ansList: [],
            //     answer: "9"
            // },
      ],
      questions: [
          // {
          //     last_question: 0,
          //     last_option: 0,
          //     is_shown: true,
          //     question_id: 222,
          //     row: 1,
          //     score: 10,
          //     title: "小学期开发的内容是？",
          //     description: "看看你们是不是还没看需求",
          //     must: true,
          //     type: "radio",
          //     qn_id: 97,
          //     refer: "问卷星球",
          //     point: 20,
          //     id: 1,
          //     options: [
          //         {
          //             id: 1,
          //             title: "问卷星球"
          //         },
          //         {
          //             id: 2,
          //             title: "出版系统"
          //         }
          //     ],
          //     answer: "",
          //     imgList: [{
          //       name: '1.jpg',
          //       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          //     },{
          //       name: '2.jpg',
          //       url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
          //     }],
          //     videoList: [
          //     ]
          // },
          // {
          //     last_question: 1,
          //     last_option: 1,
          //     is_shown: false,
          //     question_id: 223,
          //     row: 1,
          //     score: 10,
          //     title: "本次小学期的助教有？",
          //     description: "不会吧不会吧，不会有人真以为助教只是助教吧？",
          //     must: true,
          //     type: "checkbox",
          //     refer: "ZXH-<^-^>-HZY",
          //     point: 30,
          //     id: 2,
          //     options: [
          //         {
          //             id: 1,
          //             title: "ZXH"
          //         },
          //         {
          //             id: 2,
          //             title: "ZYH"
          //         },
          //         {
          //             id: 3,
          //             title: "HZY"
          //         },
          //         {
          //             id: 4,
          //             title: "ZHT"
          //         },
          //         {
          //             id: 5,
          //             title: "LKW"
          //         }
          //     ],
          //     answer: "",
          //     imgList: [],
          //     videoList: [
          //       {
          //         name:"1.mp4",
          //         url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
          //       }
          //     ]
          // },
          // {
          //     last_question: 2,
          //     last_option: 1,
          //     is_shown: false,
          //     question_id: 224,
          //     row: 1,
          //     score: 10,
          //     title: "敏捷开发中你感受得到一丝丝快乐吗？",
          //     description: "",
          //     must: false,
          //     type: "radio",
          //     refer: "感受不到",
          //     point: 5,
          //     id: 3,
          //     options: [
          //         {
          //             id: 1,
          //             title: "感受不到"
          //         },
          //         {
          //             id: 2,
          //             title: "一丝丝都感受不到"
          //         }
          //     ],
          //     answer: ""
          // },
          // {
          //     last_question: 3,
          //     last_option: 1,
          //     is_shown: false,
          //     question_id: 225,
          //     row: 1,
          //     score: 10,
          //     title: "第一次迭代验收前每天平均睡眠时间",
          //     description: "有人在第一次验收前夜通宵了吗，我看到 JBW 鏖战了20多小时",
          //     must: true,
          //     type: "radio",
          //     refer: "1-3小时",
          //     point: 6,
          //     id: 4,
          //     options: [
          //         {
          //             id: 1,
          //             title: "1-3小时"
          //         },
          //         {
          //             id: 2,
          //             title: "3-5小时"
          //         },
          //         {
          //             id: 3,
          //             title: "5-7小时"
          //         },
          //         {
          //             id: 4,
          //             title: "睡啥觉，起来敲代码"
          //         }
          //     ],
          //     answer: ""
          // }
      ]

    }
  },
  methods: {
    ahead(qid){
        if(qid===0) return true;
        for(let i=0;i<this.questions.length;i++){
          if(this.questions[i].id===qid){
            if(this.questions[i].is_shown===true) return this.ahead(this.questions[i].last_question);
            else return false;
          }
        }
        return false;
    },
    changeHandler(id,value) {
        console.log( id+ '改变之后的值是:' + value);
        let pid=0;
        for(let j=0;j<this.questions[id-1].options.length;j++){
          if(value===this.questions[id-1].options[j].title) pid=this.questions[id-1].options[j].id;
        }
        for(let i=id;i<this.questions.length;i++){
          if(this.questions[i].last_question===id&&this.questions[i].last_option===pid){
            this.questions[i].is_shown=true;
          }
          else if(this.questions[i].last_question===id){
            this.questions[i].is_shown=false;
          }
        }
    },
    changeHandler2(id,value){
      console.log( id+ '改变之后的值是:' + value);
      let pid=[];
      let a=0;
      let find=false;
        for(let j=0;j<this.questions[id-1].options.length;j++){
          for(let k=0;k<value.length;k++){
            if(value[k]===this.questions[id-1].options[j].title) {
              pid[a++]=this.questions[id-1].options[j].id;
              break;
            }
          }
        }
        for(let i=id;i<this.questions.length;i++){
          if(this.questions[i].last_question===id){
            for(let k=0;k<pid.length;k++){
              if(this.questions[i].last_option===pid[k]){
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
      this.repeat = false;
      this.close = false;
      location.reload();
    },
    submit: function () {
      this.submitAns('1');
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
  created() {
    if (this.mode === '0') {
      this.getQnDataForPreview();
    }
    else if (this.mode === '1') {
      this.getQnDataForFill(false,false);
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