<template>
    <div id='sum'>
        <div><h1>回收数据</h1></div>
        <el-card class="box-card">
        <div>
              <div>
              <el-button id="down" type="primary" @click="downloadExcel" style="float: right;margin: 30px;">下载</el-button>
              </div>
              <div>
              <el-table
                    v-loading="loading"
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    :default-sort="{ prop: 'submit_time'}"
                    :show-summary="is_test"
                    :summary-method="getAverage"
                    sum-text="平均分"
                    style="width: 100%; font-size: 14px"
                    :row-style="{height:'50px'}"
                    :cell-style="{padding:'0px'}"
                    @sort-change="sort_change">
                    <el-table-column
                    prop="num"
                    label="序号"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                        sortable
                    prop="submit_time"
                    label="提交时间"
                    align="center">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="填写用户"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        sortable
                    prop="answer_num"
                    label="完成题目数量"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="answer_percent"
                    label="完成率"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="score"
                    sortable
                    label="得分"
                    width="180"
                    align="center"
                    v-if="is_test">
                    </el-table-column>
                    <el-table-column label="操作" width="250" align="center">
                        <template slot-scope="scope">
                          <div style="display:inline">
                            <el-button type="text" class="el-icon-delete op" style="color: red" @click="delSubmit(scope.row.submit_id, scope.row.num)">删除</el-button>
                          </div>
                          <div style="display:inline">
                            <el-button type="text" class="el-icon-document op" style="color: black " @click="openBox(scope.$index+(currentPage-1)*pageSize+1, scope.row.submit_id)">预览</el-button>
                          </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="sizes, prev, pager, next, jumper" 
                background
                :current-page="currentPage" 
                :page-size="pageSize"
                :page-sizes="pageSizes" 
                :total="tableData.length" 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                style="margin: 20px"
                v-if="!loading">
                </el-pagination>
                </div>
        </div>
        <div>
        <el-dialog
          :title='"答卷序号："+indexnum'
          :visible.sync="dialogVisible"
          class="dialog"
          width="50%"
          >
          <div id="dia">
          <div class="main">
          <div class="title" style="clear:both">
            {{ title }}
          </div>

          <div class="description" v-if="this.description!==''">
            &emsp;&emsp;{{ description }}
          </div>
          <el-divider></el-divider>

          <div v-if="is_test">
            <el-row :gutter="1">
            <el-col :span="8"><div ><h2>用户： {{user_name}}</h2></div></el-col>
            <el-col :span="8"><div ><h2>得分： {{score}} </h2></div></el-col>
            <!-- / {{sum_score}} -->
            <el-col :span="8"><div ><h2>排名： {{rank}}</h2></div></el-col>
            
            </el-row>
            <el-divider></el-divider>
          </div>

          
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

            <div v-if="item.type==='radio'||item.type==='judge'">
              <div class="q-opt" v-for="opt in item.options" :key="opt.id">
                <el-radio  v-model="answers[item.id-1].ans" :label="opt.title">
                  {{ opt.title }}
                </el-radio>
              </div>
            </div>

            <el-checkbox-group class="q-opt" v-if="item.type==='checkbox'" v-model="answers[item.id-1].ansList">
              <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.title">
                {{ opt.title }}
              </el-checkbox>
            </el-checkbox-group>

            <div class="q-opt" v-if="item.type==='text'||item.type==='name'||item.type==='stuId'||item.type==='class'||item.type==='school'||item.type==='location'">
              <el-input
                  type="textarea"
                  v-if="item.row>1"
                  :autosize="{ minRows: 2, maxRows: item.row}"
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans"
                  readonly="true">
              </el-input>
              <el-input
                  v-if="item.row===1"
                  placeholder="请输入内容"
                  v-model="answers[item.id-1].ans"
                  >
              </el-input>
            </div>

            <div class="q-opt" v-if="item.type==='mark'">
              <el-rate disabled show-score text-color="#ff9900" v-model="answers[item.id-1].ans" :max="item.score"></el-rate>
            </div>

            <div v-if="is_test && !isInfo(item)">
              <div class="block-point">
                <div v-if="answers[item.id-1].correct" style="color: #51c215;">得分：{{ item.point }}</div>
                <div v-else style="color:red;">得分：0</div>
              </div>
              <div class="block-refer" >
                <div v-if="item.refer===''">参考答案：无</div>
                <div v-if="item.refer!==''">参考答案：{{ item.refer }}</div>
<!--                <div v-else>-->
<!--                  <span>参考答案：</span>-->
<!--                  <span></span>-->
<!--                    <span v-for="(one,index) in item.right_answerList" :key="index">{{one}}; </span>-->
<!--                </div>-->
              </div>
            </div>
            <el-divider></el-divider>
          </div>

          </div>
          <span slot="footer" class="dialog-footer" >
            <el-button v-if="indexnum>1"  @click="frontpage" style="margin:10px">上一页</el-button>
            <el-button v-if="indexnum<tableData.length"  @click="nextpage" style="margin:10px">下一页</el-button>
            <el-button type="primary" @click="dialogVisible = false" style="margin:10px">返 回</el-button>
          </span>
          </div>
        </el-dialog>
        </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title:"小学期问卷",
        description:"愉快的小学期",
        indexnum: 0,
        dialogVisible: false,
        currentPage: 1,
        pageSize: 7,
        pageSizes:[3,5,7],
        loading: true,

        is_test: true,//是考试问卷
        user_name: 'MissTong',//填写人
        rank:3,//排名
        score: 6,//个人得分
        sum_score: 21,//总分
        answers:[
            // {
            //     question_id: 66,
            //     type: "radio",
            //     ans: "问卷星球",
            //     ansList: [],
            //     answer: "问卷星球",
            //     correct: true,
            // },
            // {
            //     question_id: 67,
            //     type: "checkbox",
            //     ans: null,
            //     ansList: [
            //         "ZXH",
            //         "ZYH",
            //         "HZY"
            //     ],
            //     answer: "ZXH-<^-^>-ZYH-<^-^>-HZY",
            //     correct: false,
            // },
            // {
            //     question_id: 68,
            //     type: "radio",
            //     ans: "感受不到",
            //     ansList: [],
            //     answer: "感受不到",
            //     correct: false,
            // },
            // {
            //     question_id: 69,
            //     type: "radio",
            //     ans: "1-3小时",
            //     ansList: [],
            //     answer: "1-3小时",
            //     correct: false,
            // },
            // {
            //     question_id: 70,
            //     type: "mark",
            //     ans: 9,
            //     ansList: [],
            //     answer: "9",
            //     correct: false,
            // },
            // {
            //     question_id: 230,
            //     type: "text",
            //     ans: "填空题回答",
            //     ansList: [],
            //     answer: "填空题回答",
            //     correct: false,
            // },
            // {
            //     question_id:231,
            //     type: "judge",
            //     ans: "对",
            //     ansList: [],
            //     answer: "对",
            //     correct: true,
            // },
        ],
        questions: [
            // {
            //     question_id: 66,
            //     row: 1,
            //     score: 10,
            //     title: "小学期开发的内容是？",
            //     description: "看看你们是不是还没看需求",
            //     must: true,
            //     right_answer: "问卷系统",
            //     point: 5,
            //     is_exam_question: true,
            //     correct_people: 1,
            //     answer_sum: 3,
            //     accuracy: 0.33333333,
            //     type: "radio",
            //     qn_id: 18,
            //     sequence: 1,
            //     option_num: 14,
            //     id: 1,
            //     options: [
            //         {
            //             id: 762,
            //             title: "问卷星球"
            //         },
            //         {
            //             id: 763,
            //             title: "出版系统"
            //         }
            //     ],
            //     answer: ""
            // },
            // {
            //     question_id: 67,
            //     row: 1,
            //     score: 10,
            //     title: "本次小学期的助教有？",
            //     description: "不会吧不会吧，不会有人真以为助教只是助教吧？",
            //     must: true,
            //     point: 10,
            //     is_exam_question: true,
            //     correct_people: 1,
            //     answer_sum: 3,
            //     accuracy: 0.3333,
            //     right_answerList: [
            //         "LKW",
            //         "ZXH"
            //     ],
            //     type: "checkbox",
            //     qn_id: 18,
            //     sequence: 2,
            //     option_num: 35,
            //     id: 2,
            //     options: [
            //         {
            //             id: 764,
            //             title: "ZXH"
            //         },
            //         {
            //             id: 765,
            //             title: "ZYH"
            //         },
            //         {
            //             id: 766,
            //             title: "HZY"
            //         },
            //         {
            //             id: 767,
            //             title: "ZHT"
            //         },
            //         {
            //             id: 768,
            //             title: "LKW"
            //         }
            //     ],
            //     answer: ""
            // },
            // {
            //     question_id: 68,
            //     row: 1,
            //     score: 10,
            //     title: "敏捷开发中你感受得到一丝丝快乐吗？",
            //     description: "",
            //     must: false,
            //     type: "radio",
            //     qn_id: 18,
            //     sequence: 3,
            //     option_num: 14,
            //     refer: "",
            //     point: 0,
            //     id: 3,
            //     options: [
            //         {
            //             id: 769,
            //             title: "感受不到"
            //         },
            //         {
            //             id: 770,
            //             title: "一丝丝都感受不到"
            //         }
            //     ],
            //     answer: ""
            // },
            // {
            //     question_id: 69,
            //     row: 1,
            //     score: 10,
            //     title: "第一次迭代验收前每天平均睡眠时间",
            //     description: "有人在第一次验收前夜通宵了吗，我看到 JBW 鏖战了20多小时",
            //     must: true,
            //     type: "radio",
            //     qn_id: 18,
            //     sequence: 4,
            //     option_num: 28,
            //     refer: "",
            //     point: 0,
            //     id: 4,
            //     options: [
            //         {
            //             id: 771,
            //             title: "1-3小时"
            //         },
            //         {
            //             id: 772,
            //             title: "3-5小时"
            //         },
            //         {
            //             id: 773,
            //             title: "5-7小时"
            //         },
            //         {
            //             id: 774,
            //             title: "睡啥觉，起来敲代码"
            //         }
            //     ],
            //     answer: ""
            // },
            // {
            //     question_id: 70,
            //     row: 1,
            //     score: 10,
            //     title: "小学期作为乙方的感受",
            //     description: "请谨慎回答",
            //     must: true,
            //     type: "mark",
            //     qn_id: 18,
            //     sequence: 5,
            //     option_num: 1,
            //     refer: "",
            //     point: 0,
            //     id: 5,
            //     options: [],
            //     answer: ""
            // },
            // {
            //     question_id: 230,
            //     row: 2,
            //     score: 5,
            //     title: "这是一道填空题",
            //     description: "这是描述",
            //     must: false,
            //     right_answer: "好",
            //     point: 5,
            //     is_exam_question: true,
            //     correct_people: 1,
            //     answer_sum: 3,
            //     accuracy: 0.7096,
            //     type: "text",
            //     qn_id: 18,
            //     sequence: 6,
            //     option_num: 1,
            //     id: 6,
            //     options: [],
            //     answer: ""
            // },
            // {
            //     question_id: 231,
            //     row: 1,
            //     score: 1,
            //     title: "小学期开发的内容是这个吗？",
            //     description: "看看你们是不是还没看需求",
            //     must: true,
            //     right_answer: "对",
            //     point: 1,
            //     is_exam_question: true,
            //     correct_people: 1,
            //     answer_sum: 3,
            //     accuracy: 0.33333333,
            //     type: "judge",
            //     qn_id: 18,
            //     sequence: 1,
            //     option_num: 24,
            //     id: 7,
            //     options: [
            //         {
            //             id: 775,
            //             title: "对"
            //         },
            //         {
            //             id: 776,
            //             title: "错"
            //         }
            //     ],
            //     answer: ""
            // },
        ],
        tableData: [
        // {
        // num: 1,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 2,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 3,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 4,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 5,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 6,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 7,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 8,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 9,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 10,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 11,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 12,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 13,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 14,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 15,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 16,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        ],

      }
    },
    created() {
      let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn/all_submit',
        data: formData,
      })
      .then(res => {
        loadingIns.close();
        if (res.data.status_code === 1) {
          this.tableData = res.data.submits;
          this.is_test = res.data.type === "2";
          this.loading = false;
        } else {
          this.$message.error("请求失败！");
          setTimeout(() => {
            this.$router.push('/index');
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },

    methods: {

      sort_change(column) { // column是个形参，具体查看element-ui文档
        this.currentPage = 1 // return to the first page after sorting
        this.total = this.tableData.length
        this.tableData = this.tableData.sort(this.sortFun(column.prop, column.order === 'ascending'));
        // this.showedData = this.tableData.slice(0, this.pageSize) // 排序完显示到第一页
      },
      sortFun (attr, rev) {
        //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
        if (rev === undefined) {
          rev = 1;
        } else {
          rev = (rev) ? 1 : -1;
        }
        return function (a, b) {
          a = a[attr];
          b = b[attr];
          if (a < b) {
            return rev * -1;
          }
          if (a > b) {
            return rev * 1;
          }
          return 0;
        }
      },
      getAverage(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '平均';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return 'N/A';
              }
            }, 0);
            sums[index] = (sums[index]/this.tableData.length).toFixed(2);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      isInfo: function (item) {
        return item.type === 'name' || item.type === 'stuId' || item.type === 'class' || item.type === 'school'
      },
      getSidFromNum(num) {
        for (var i=0; i<this.tableData.length; i++) {
          if (this.tableData[i].num === num) {
            return this.tableData[i].submit_id;
          }
        }
      },
      nextpage(){
        let ele=document.getElementById('dia');
        ele.scrollTop = 0;
        this.indexnum=this.indexnum+1;
        this.getDataBySid(this.getSidFromNum(this.indexnum));
      },
      frontpage(){
        let ele=document.getElementById('dia');
        ele.scrollTop = 0;
        this.indexnum=this.indexnum-1;
        this.getDataBySid(this.getSidFromNum(this.indexnum));
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
      getDataBySid(sid) {
        let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
        var data = [];
        const formData1 = new FormData();
        formData1.append("submit_id", sid);
        this.$axios({
          method: 'post',
          url: '/sm/get/submit_answers',
          data: formData1,
        })
        .then(res => {
          loadingIns.close();
          if (res.data.status_code === 1) {
            data = res.data.answers;
            console.log(data);
            this.questions = res.data.questions;
            console.log(this.questions);
            this.description = res.data.description;
            this.title = res.data.title;

            if (this.is_test) {
              this.user_name = res.data.username;
              this.rank = res.data.rank;
              this.score = res.data.score;
              this.sum_score = res.data.sum_score;
            }

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
            this.dialogVisible = false;
          }
        });
      },
      openBox(index, sid) {
        this.indexnum=index;
        this.dialogVisible = true;
        this.getDataBySid(sid);
        console.log(this.indexnum);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      delSubmit(index, num) {
        this.$confirm('此操作将永久删除该答卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const formData = new FormData();
          formData.append("submit_id", index);
          this.$axios({
            method: 'post',
            url: '/sm/delete/submit',
            data: formData,
          })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                this.$message.success("删除成功");
                this.tableData.splice(num-1, 1);
                for (var i=num+1; i<=this.tableData.length+1; i++)
                  this.tableData[i-2].num -= 1;
                break;
              default:
                this.$message.error("执行操作失败");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          });
        }).catch(() => {
        });
      },
      downloadExcel() {
        let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
        const formData = new FormData();
        formData.append('qn_id', this.$route.query.pid);
        this.$axios({
          method: 'post',
          url: '/sm/export/excel',
          data: formData
        })
        .then(res => {
          loadingIns.close();
          switch (res.data.status_code) {
            case 1:
              var url = res.data.excel_url;
              var downloadLink = document.createElement('a');
              downloadLink.download = res.data.excel_name;
              downloadLink.href = url;
              downloadLink.click();
              downloadLink.remove();
              break;
            case 3:
              this.$message.error("该问卷暂无提交，无法导出");
              break;
            default:
              this.$message.error("请求失败！");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
 #sum{
         width: 90%;
        /* background-color: cyan; */
 }
 .op{
    float: right;
    margin: 0 30px;
 }
 .box-card{
     margin: 20px;
 }
.must {
  font-weight: normal;
  color: crimson;
}
 .main .el-radio{
   pointer-events: none;
}
.main .el-checkbox{
  pointer-events: none;
}
#dia{
  height: 500px;
  overflow: auto;
}

 .dialog .el-divider--horizontal {
   margin: 15px 0;
 }

.q-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 40px 10px 10px;
  font-weight: bold;
}
.q-description {
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
  color: #969696;
}
.q-opt {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 10px 10px 10px;
}
.el-checkbox {
  padding: 10px 0;
  display: block;
}
.title {
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 25px;
}

.description {
  text-align: left;
  font-size: 16px;
  color: #969696;
  line-height: 30px;
  padding-bottom: 10px;
}

.block-refer {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #969696;
  padding-right: 60px;
  margin-bottom: 20px;
}

.block-point {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  /* color: #e59824; */
  padding-right: 60px;
}
</style>