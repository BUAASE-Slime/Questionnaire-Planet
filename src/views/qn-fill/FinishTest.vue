<template>
  <div class="qn-result">
    <div class="paper">
      <div style="margin-bottom: 80px" ><span><h1>恭喜你完成测试！您的分数是</h1></span><span style="color: red;"><h1>{{actualScore}}/{{fullScore}}</h1></span></div>

      <el-row style="text-align: left;margin-left: 30px;color: #409EFF;border-top: solid #e3e3e3 1px;">
        <span><h2>评阅结果与参考答案</h2></span>
      </el-row>
      <el-row class="ques-block" :style="hoverColor" v-for="item in questions" :key="item.num" >
        <el-col :span="24" class="block-content">
          <div class="block-title" v-if="item.type==='judge'">
            {{ item.id }}. 判断：{{ item.title }}
          </div>
          <div v-else class="block-title">
            {{ item.id }}. {{ item.title }}
          </div>
          <div
              class="block-description"
              v-if="item.description!=='' && item.description!==null && item.description!==undefined"
          >
            {{ item.description }}
          </div>
          <div class="block-choice" v-for="ans in item.options" :key="ans.id">
            <!--                  单选-->
            <el-radio v-if="item.type==='radio'" value="0">
              {{ ans.title }}
            </el-radio>
            <!--                  多选-->
            <el-checkbox v-if="item.type==='checkbox'" value="0">
              {{ ans.title }}
            </el-checkbox>
            <!--                  填空-->
            <el-input
                v-if="item.type==='text'"
                type="textarea"
                placeholder="请输入内容"
                v-bind="ans.title">
            </el-input>
            <!--                  判断-->
            <el-radio v-if="item.type==='judge'" value="0">
              {{ ans.title }}
            </el-radio>
          </div>

          <div class="block-point" v-if="item.point!==null && item.point!==undefined">
            <div v-if="item.point===''">分值：0</div>
            <div v-else>分值：{{ item.point }}</div>
          </div>

          <div class="block-refer" v-if="item.refer!==null && item.refer!==undefined">
            <div v-if="item.refer===''">答案：无</div>
            <div v-else>参考答案：{{ item.refer }}</div>
          </div>

          <div class="block-yourAnswer" v-if="item.yourAnswer!==null && item.yourAnswer!==undefined">
            <div v-if="item.yourAnswer===''">答案：无</div>
            <div v-else>你的答案：{{ item.yourAnswer }}</div>
            <div v-if="item.isCorrect===true" style="color: #51c215;margin-top: 3px">正确</div>
            <div v-else style="color: red;margin-top: 3px">错误</div>
          </div>

        </el-col>
      </el-row>
    </div>

      <div class="tail">
        <a href="http://localhost:8080/">星球问卷</a>&ensp;提供技术支持
      </div>
    </div>
</template>

<script>
export default {
  name: "FinishTest",
  data(){
    return{
      hoverColor:{
        "--hcolor":"red"
      },
      fullScore:100,
      actualScore:75,
      questions:[
        {
          id: 1,
          type: 'radio',
          title: '第一题',
          must: false, // 是否必填
          description: '123456', // 问题描述
          options:[
            {
              title: 'AAAA', // 选项标题
              id: 0 // 选项id
            },
            {
              title: 'BBBB', // 选项标题
              id: 0 // 选项id
            },
          ],
          row: 1, // 填空区域行数
          score: 10, // 最大评分
          refer: 'BBBB', // 参考答案
          point: 25,  // 分值
          yourAnswer:'BBBB',
          isCorrect:true,
        },
        {
          id: 2,
          type: 'checkbox',
          title: '第二题',
          must: true, // 是否必填
          description: '123456', // 问题描述
          options:[
            {
              title: 'a', // 选项标题
              id: 1 // 选项id
            },
            {
              title: 'b', // 选项标题
              id: 2 // 选项id
            },{
              title: 'c', // 选项标题
              id: 3 // 选项id
            },
          ],
          row: 1, // 填空区域行数
          score: 10, // 最大评分
          refer: 'a;b;c', // 参考答案
          point: 25,  // 分值
          yourAnswer:'d',
          isCorrect:false,
        },
        {
          id: 3,
          type: 'judge',
          title: '第三题',
          must: true, // 是否必填
          description: '123456', // 问题描述
          options:[
            {
              title: '对', // 选项标题
              id: 1 // 选项id
            },
            {
              title: '错', // 选项标题
              id: 2 // 选项id
            }
          ],
          row: 1, // 填空区域行数
          score: 10, // 最大评分
          refer: '对', // 参考答案
          point: 25,  // 分值
          yourAnswer:'对',
          isCorrect:true,
        },
        {
          id: 4,
          type: 'text',
          title: '第四题',
          must: true, // 是否必填
          description: '123456', // 问题描述
          options:[
            {
              title: '对', // 选项标题
              id: 1 // 选项id
            }
          ],
          row: 1, // 填空区域行数
          score: 10, // 最大评分
          refer: '这是答案', // 参考答案
          point: 25,  // 分值
          yourAnswer:'这是答案',
          isCorrect:true,
        },
      ]
    }
  },
}
</script>

<style scoped>
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
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
.qn-result .ques-block {
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  padding:20px
}
.qn-result .ques-block:hover {
  background: #f5f5f5;
  transition: .3s;
}



.qn-result .ques-block {
  padding-bottom: 15px;
  border-top: solid #e3e3e3 1px;
}

.qn-result .ques-block:hover {
  background: #f5f5f5;
  transition: .3s;
}

.qn-result .ques-block .must {
  font-weight: normal;
  color: crimson;
}

.qn-result .block-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 20px 10px 10px;
  font-weight: bold;
}

.qn-result .block-description {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 5px;
  padding-bottom: 10px;
  padding-left: 10px;
  color: #969696;
}



.qn-result .block-point {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #e59824;
}

.qn-result .block-choice {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 5px 10px 10px;
}
</style>