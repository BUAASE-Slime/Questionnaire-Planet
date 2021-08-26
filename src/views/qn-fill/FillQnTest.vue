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
              {{ item.id }}. {{ item.title }}
              <span class="must" v-if="item.must">(必填)</span>
              <span
                  class="point"
                  v-if="item.type!=='name'
                   && item.type!=='stuId'
                   && item.type!=='class'
                   && item.type!=='school'"
              >
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
            <div class="q-opt"
                 v-if="item.type === 'name'
                   || item.type === 'stuId'
                   || item.type === 'class'
                   || item.type === 'school'">
              <el-input
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans">
              </el-input>
            </div>

            <!--              判断/单选-->
            <div v-if="item.type==='radio' || item.type === 'judge'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio v-model="answers[item.id-1].ans" :label="opt.title">
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
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: item.row}"
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans">
              </el-input>
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
      title: '考试问卷Beta',
      description: '测试考试问卷的预览模式',
      questions: [
        {
          id: 1,
          type: 'name',
          title: '姓名',
          must: true, // 是否必填
          description: '', // 问题描述
          options: [
            {
              title: '', // 选项标题
              id: 0 // 选项id
            },
          ],
          row: 1, // 填空区域行数
          refer: '', // 参考答案
          point: 0,  // 分值
        },
        {
          id: 2,
          type: 'stuId',
          title: '学号',
          must: true, // 是否必填
          description: '', // 问题描述
          options: [
            {
              title: '', // 选项标题
              id: 0 // 选项id
            },
          ],
          row: 1, // 填空区域行数
          refer: '', // 参考答案
          point: 0,  // 分值
        },
        {
          id: 3,
          type: 'class',
          title: '班级',
          must: true, // 是否必填
          description: '', // 问题描述
          options: [
            {
              title: '', // 选项标题
              id: 0 // 选项id
            },
          ],
          row: 1, // 填空区域行数
          refer: '', // 参考答案
          point: 0,  // 分值
        },
        {
          id: 4,
          type: 'school',
          title: '学校',
          must: true, // 是否必填
          description: '', // 问题描述
          options: [
            {
              title: '', // 选项标题
              id: 0 // 选项id
            },
          ],
          row: 1, // 填空区域行数
          refer: '', // 参考答案
          point: 0,  // 分值
        },
        {
          id: 5,
          type: 'radio',
          title: '这是一个什么问卷？',
          must: true, // 是否必填
          description: '请谨慎做答', // 问题描述
          options: [
            {
              title: '考试问卷', // 选项标题
              id: 1 // 选项id
            },
            {
              title: '调查问卷', // 选项标题
              id: 2 // 选项id
            },
          ],
          row: 0, // 填空区域行数
          refer: '考试问卷', // 参考答案
          point: 10,  // 分值
        },
        {
          id: 6,
          type: 'checkbox',
          title: '软工助教都有谁？',
          must: false, // 是否必填
          description: '', // 问题描述
          options: [
            {
              title: 'ZYH', // 选项标题
              id: 1 // 选项id
            },
            {
              title: 'LKW', // 选项标题
              id: 2 // 选项id
            },
            {
              title: 'MHY', // 选项标题
              id: 3 // 选项id
            },
            {
              title: 'HZH', // 选项标题
              id: 4 // 选项id
            },
          ],
          row: 0, // 填空区域行数
          refer: '["LKW", "MHY"]', // 参考答案
          point: 10,  // 分值
        },
        {
          id: 7,
          type: 'text',
          title: '小学期累不累？',
          must: false, // 是否必填
          description: '请谨慎考虑做答', // 问题描述
          options: [
            {
              title: '', // 选项标题
              id: 0 // 选项id
            },
          ],
          row: 5, // 填空区域行数
          refer: '', // 参考答案
          point: 30,  // 分值
        },
        {
          id: 8,
          type: 'judge',
          title: '从来没有加过班',
          must: true, // 是否必填
          description: '请谨慎考虑做答', // 问题描述
          options: [
            {
              title: '对', // 选项标题
              id: 1 // 选项id
            },
            {
              title: '错', // 选项标题
              id: 2 // 选项id
            },
          ],
          row: 0, // 填空区域行数
          refer: '对', // 参考答案
          point: 50,  // 分值
        },
      ],
      answers: [
        {
          question_id: '1',
          type: 'name',
          ans: null,
          ansList: [],
        },
        {
          question_id: '2',
          type: 'stuId',
          ans: null,
          ansList: [],
        },
        {
          question_id: '3',
          type: 'class',
          ans: null,
          ansList: [],
        },
        {
          question_id: '4',
          type: 'school',
          ans: null,
          ansList: [],
        },
        {
          question_id: '5',
          type: 'radio',
          ans: null,
          ansList: [],
        },
        {
          question_id: '6',
          type: 'checkbox',
          ans: null,
          ansList: [],
        },
        {
          question_id: '7',
          type: 'text',
          ans: null,
          ansList: [],
        },
        {
          question_id: '8',
          type: 'judge',
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
      // 答案调试
      console.log(answers)
      // 预览mode判断
      if (this.mode==='0' || this.mode===0) {
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

.qn-fill .body .point {
  font-weight: normal;
  color: #EC9D2D;
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