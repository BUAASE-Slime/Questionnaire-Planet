<template>
  <div class="punch">
    <el-header class="header">
      <edit-header
          :title="title"
          :description="description"
          :isReleased="isReleased"
          v-on:titleChanged="changeTitle($event)"
          v-on:descriptionChanged="changeDescription($event)"
          v-on:advancedSetting="openSetting($event)"
          v-on:publishClicked="publish($event)"
          v-on:saveClicked="save($event)"
          v-on:qnPreview="preview($event)"
          v-on:onConfirm="dialogCancel($event)"
          v-on:shareClicked="share($event)"
      >
      </edit-header>
    </el-header>

    <el-container class="container">

      <el-aside class="side">
        <el-tabs v-model="activeName" @tab-click="initOutline">

            <el-tab-pane label="题目类型" name="first">
              <div class="edit">
                <div class="ques-type">
                  <i class="el-icon-check"></i>
                  <span> 单选题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                  <i class="el-icon-circle-plus type-icon" @click="willAddQuestion.type='radio';qsEditDialogVisible=true"></i>
                </div>
                <div class="ques-type">
                  <i class="el-icon-finished"></i>
                  <span> 多选题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                  <i class="el-icon-circle-plus type-icon" @click="willAddQuestion.type='checkbox';qsEditDialogVisible=true"></i>
                </div>
                <div class="ques-type">
                  <i class="el-icon-edit-outline"></i>
                  <span> 填空题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                  <i class="el-icon-circle-plus type-icon" @click="willAddQuestion.type='text';qsEditDialogVisible=true"></i>
                </div>
                <div class="ques-type">
                  <i class="el-icon-star-off"></i>
                  <span> 评分题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                  <i class="el-icon-circle-plus type-icon" @click="willAddQuestion.type='mark';qsEditDialogVisible=true"></i>
                </div>
                <div class="ques-type">
                  <i class="el-icon-location-outline"></i>
                  <span> 定位题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                  <i class="el-icon-circle-plus type-icon" @click="willAddQuestion.type='location';willAddQuestion.title='所在地理位置';qsEditDialogVisible=true"></i>
                </div>
                <div>
                  <el-row class="sideTitle">问题模板</el-row>
                  <div class="ques-type">
                    <i class="el-icon-user"></i>
                    <span class="chooseLabel">姓名 </span>
                    <i class="el-icon-circle-plus type-icon" @click="addName"></i>&emsp;&emsp;
                    <i class="el-icon-tickets"></i>
                    <span class="chooseLabel">学号 </span>
                    <i class="el-icon-circle-plus type-icon" @click="addStuID"></i>
                  </div>
                  <div class="ques-type">
                    <i class="el-icon-tickets"></i>
                    <span class="chooseLabel">体温 </span>
                    <i class="el-icon-circle-plus type-icon" @click="addTem"></i>&emsp;&emsp;
                    <i class="el-icon-phone-outline"></i>
                    <span class="chooseLabel">手机 </span>
                    <i class="el-icon-circle-plus type-icon" @click="addPhone"></i>
                  </div>
                  <div class="ques-type">
                    <i class="el-icon-tickets"></i>
                    <span class="chooseLabel">本人情况是否正常&emsp;&emsp;&emsp;</span>
                    <i class="el-icon-circle-plus type-icon" @click="addHealthy"></i>
                  </div>
                  <div class="ques-type">
                    <i class="el-icon-tickets"></i>
                    <span class="chooseLabel">14日内环境安全&emsp;&emsp;&emsp;&emsp;</span>
                    <i class="el-icon-circle-plus type-icon" @click="addEnvironment"></i>
                  </div>
                </div>
              </div>
            </el-tab-pane>

          <el-tab-pane label="问卷大纲" name="second">
            <div class="outline">
              <el-tree
                  :data="outline"
                  node-key="id"
                  :props="defaultProps"
                  @node-drop="handleDrop"
                  draggable
                  :allow-drop="allowDrop"
              ></el-tree>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-aside>

      <el-main class="main">
        <div class="ques">

          <div class="title">
            {{ title }}
          </div>
          <div class="description" v-if="this.description!=='' && this.description!==null && this.description !== undefined">
            &emsp;&emsp;{{ description }}
          </div>
          <div class="content">
            <el-row class="ques-block" v-for="item in questions" :key="item.num" @mouseover.native="hoverItem=item.id">

              <el-col :span="17" class="block-content">
                <div class="block-title">
                  {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
                </div>

                <div
                    class="block-description"
                    v-if="item.description!=='' && item.description!==null && item.description!==undefined"
                >
                  {{ item.description }}
                </div>
                <div v-if="item.type==='radio'||item.type==='checkbox'||item.type==='text'">
                  <div class="block-choice" v-for="ans in item.options" :key="ans.id" >

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
                        v-if="item.type==='text'&&item.row>1"
                        type="textarea"
                        placeholder="请输入内容"
                        v-bind="ans.title">
                    </el-input>
                    <el-input
                        v-if="item.type==='text'&&item.row===1"
                        placeholder="请输入内容"
                        v-bind="ans.title">
                    </el-input>
                  </div>
                </div>

                <div class="block-choice" v-if="item.type==='mark'">
                  <!--                  评分-->
                  <el-rate value="0" :max="item.score"></el-rate>
                </div>

                <div class="block-location" v-if="item.type==='location'">
                  <!--                  定位-->
                  <el-button icon="el-icon-map-location" plain class="locabtn" @click="alertGetLocation">点击获取地理位置</el-button>
                </div>
              </el-col>

              <el-col :span="7" class="block-button" style="text-align: right" v-if="hoverItem===item.id">
                <el-button-group>
                  <el-tooltip class="item" effect="light" content="编辑" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-edit" @click="edit(item.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="复制" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-document-copy" @click="copy(item.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="删除" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-delete" @click="del_pre(item.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="上移" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-caret-top" @click="up(item.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="下移" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-caret-bottom" @click="down(item.id)"></el-button>
                  </el-tooltip>
                </el-button-group>
              </el-col>

            </el-row>
          </div>

        </div>
      </el-main>

    </el-container>

    <el-dialog :title="qsEditDialogTitle" :visible.sync="qsEditDialogVisible"  :before-close="cancel_pre" class="dialog" >
      <el-form ref="form" :model="willAddQuestion" label-width="100px">
        <el-form-item label="题目类型" >
          <el-select :disabled="selectDisAble" v-model="willAddQuestion.type" placeholder="请选择题目类型" @change="typeChange">
            <el-option
                v-for="item in allType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题目标题" style="width: 100%;" v-if="willAddQuestion.type!=='location'">
          <el-input v-model="willAddQuestion.title" placeholder="请输入标题" ></el-input>
        </el-form-item>

        <el-form-item label="题目描述" style="width: 100%;">
          <el-input v-model="willAddQuestion.description" placeholder="请输入题目描述"></el-input>
        </el-form-item>

        <el-form-item label="是否必填" >
          <el-checkbox v-model="willAddQuestion.must">必填</el-checkbox>
        </el-form-item>

        <template v-if="willAddQuestion.type==='radio'||willAddQuestion.type==='checkbox'">
          <el-form-item :label="'选项'+(index+1)" v-for="(item,index) in willAddQuestion.options" :key="index">
            <el-row>
              <el-col :span="16">
                <el-input  v-model="item.title" placeholder="请输入选项名" ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="danger" plain class="deleteOptionButton" @click="deleteOption(index)" >删除选项</el-button>
              </el-col>
            </el-row>

          </el-form-item>
          <el-button type="primary" plain class="addOptionButton" @click="addOption">新增选项</el-button>
        </template>

        <template v-if="willAddQuestion.type==='text'" >
          <el-form-item label="填空">
            <el-input
                type="textarea"
                :rows="willAddQuestion.row"
                resize="none">
            </el-input>
          </el-form-item>
          <el-form-item label="行数">
            <el-input-number v-model="willAddQuestion.row" :min="1" :max="10" ></el-input-number>
          </el-form-item>
        </template>

        <template v-if="willAddQuestion.type==='mark'">
          <el-form-item label="最大分数">
            <el-input-number v-model="willAddQuestion.score" :min="3" :max="10" ></el-input-number>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-row>
          <el-button :span="6" type="primary" @click="dialogConfirm">确定</el-button>
          &emsp;
          <el-button :span="6" @click="cancel_pre" >取消</el-button>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="qsLinkDialogVisible" :title="qsLinkDialogTitle" class="linkDialog" :show-close="false" width="800px" >
      <el-row>
        <el-col span="8" style="text-align: center">
          <el-row>
            <div id="qrcode_2" style="height:200px; width:200px; margin-left: 22px;"></div>
          </el-row>
        </el-col>
        <el-col span="16">
          <el-row><h2>链接与二维码</h2></el-row>
          <el-row style="margin-top:15px">
            <el-col :span="16" style="margin-right: 5px">
              <el-input :placeholder=linkShare v-model="linkShare" id="copyText" :disabled="true">
              </el-input>
            </el-col>
            <el-button type="info" plain id="copyBtn" @click="copyToClip">复制链接</el-button></el-row>
          <el-row style="margin-top: 25px">
            <el-button type="primary" plain @click="download">下载二维码</el-button>
            <el-button type="primary" @click="genCodeAgain" style="margin-left: 30px">重新生成链接</el-button>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" style="text-align: center">
                  <el-row>
                    <el-button :span="6" type="success" style="width: 80px"  @click="finish">完 成</el-button>
                  </el-row>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="editWrongMsgVisible"  class="linkDialog" :show-close="false" :close-on-click-modal="false" width="300px" >
      <span>{{ editWrongMsg }}</span>
      <span slot="footer" class="dialog-footer" style="text-align: center">
                  <el-row>
                    <el-button :span="6" type="danger" style="width: 80px"  @click="editWrongMsgVisible=false">知道了</el-button>
                  </el-row>
      </span>
    </el-dialog>
    <!--    高级设置弹框-->
    <el-dialog :title="settingDialogTitle" :visible.sync="settingDialogVisible" class="settingDialog" width="30%">
      <div class="timeBlock" style="margin-bottom: 30px">
        <span class="demonstration" style="margin-right: 15px">截止时间</span>
        <el-date-picker style="margin-left: 100px"
                        v-model="timeFrame"
                        @change="formatTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm"
                        placeholder="选择结束时间">
        </el-date-picker>
      </div>
      <div class="setting-bt">
        <el-button type="primary" @click="settingSuccess">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editHeader from "../../../components/header/editHeader";
import QRCode from "qrcodejs2";
import getDataApi from "@/utils/getDataApi";
import saveDataApi from "@/utils/saveDataApi";
import user from "@/store/user";

export default {
  name: "punch",
  mixins: [getDataApi, saveDataApi],
  data() {
    return {
      max_recycling: 10000,
      hasRecycleLimit: false,
      timer: '',
      value:'',
      qrcode: null,
      timeFrame: '',
      linkShare: '',
      editWrongMsg: "",
      editWrongMsgVisible: false,
      qsLinkDialogVisible: false,
      dialogVisibleAsso: false,
      qsLinkDialogTitle: "发布成功！",
      settingDialogTitle: "高级设置",   // 高级设置弹框的标题
      settingDialogVisible:false,     // 高级设置对话框可见性
      closingDate: null,   // 高级设置中问卷回收的截止日期
      isReleased: false,   // 是否发布
      editIndex: 0,
      selectDisAble: false,
      hoverItem: 0,
      activeName: 'first',
      title: '',
      description: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      type: 1,
      questions: [],
      outline: [],
      pid: this.$route.query.pid,
      qsEditDialogVisible:false,
      qsEditDialogTitle:"新建题目",
      willAddQuestion: {
        question_id: 0,
        id: 0,
        type: '',
        title: '',
        must: true, // 是否必填
        description: '', // 问题描述
        options:[
          {
            title: '', // 选项标题
            id: 0 // 选项id
          }
        ],
        row: 1, // 填空区域行数
        score: 5, // 最大评分
      },
      allType:[
        {
          value:'radio',
          label:'单选题',
        },
        {
          value:'checkbox',
          label:'多选题',
        },
        {
          value:'text',
          label:'填空题',
        },{
          value: 'mark',
          label: '评分题',
        },
        {
          value: 'location',
          label: '定位题',
        }
      ],

      xiaoxueqi_questions: [
        {
          id: 1,
          type: 'radio',
          title: '这是一个什么网站？',
          description: '请考虑妥当后填写',
          must: true,
          options: [{
            id: 1,
            title: '问卷系统',
          }, {
            id: 2,
            title: '出版系统',
          }],
          row: 0,
          score: 0,
        },
        {
          id: 2,
          type: 'checkbox',
          title: '软工小学期助教都有谁？',
          description: '请考虑妥当后填写',
          must: false,
          options: [{
            id: 1,
            title: 'ZYH',
          }, {
            id: 2,
            title: 'LKW',
          },{
            id: 3,
            title: 'ZXH',
          }, {
            id: 4,
            title: 'HZH',
          }],
          row: 0,
          score: 0,
        },
        {
          id: 3,
          type: 'radio',
          title: '软工小学期累不累',
          description: '请考虑妥当后填写',
          must: false,
          options: [{
            id: 1,
            title: '累',
          }, {
            id: 2,
            title: '非常累',
          }],
          row: 0,
          score: 0,
        },
        {
          id: 4,
          type: 'text',
          title: '您对小学期的评价如何？',
          description: '请考虑妥当后填写',
          must: false,
          options: [{
            id: 0,
            title: '',
          }],
          row: 3,
          score: 0,
        },
        {
          id: 5,
          type: 'mark',
          title: '给小学期打个分吧~',
          description: '请考虑妥当后填写',
          must: true,
          options: [{
            id: 0,
            title: '',
          }],
          row: 0,
          score: 10,
        },
      ],
      xiaoxueqi_outline: [
      {
        id: 1,
        label: '1. 这是一个什么网站？',
      },
      {
        id: 2,
        label: '2. 软工小学期助教都有谁？',
      },
      {
        id: 3,
        label: '3. 软工小学期累不累',
      },
      {
        id: 4,
        label: '4. 您对小学期的评价如何？',
      },
      {
        id: 5,
        label: '5. 给小学期打个分吧~',
      },
    ],
    }
  },
  components: {
    editHeader,
  },
  methods: {
    autoSave() {
      this.saveQnInfo('autosave', '5');
    },
    genCodeAgain() {
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/qn/change/code',
        data: formData,
      })
      .then(res => {
        if (res.data.status_code === 1) {
          this.linkShare = this.GLOBAL.baseUrl + "/fill?mode=1&code=" + res.data.code;

          if (this.qrcode == null) {
            this.qrcode = new QRCode(document.getElementById("qrcode_2"), {
              width: 200, //生成的二维码的宽度
              height: 200, //生成的二维码的高度
              colorDark : "#000000", // 生成的二维码的深色部分
              colorLight : "#ffffff", //生成二维码的浅色部分
              correctLevel : QRCode.CorrectLevel.H
            });
          }
          this.qrcode.clear();
          this.qrcode.makeCode(this.linkShare);
        } else {
          this.$message.error("请求失败！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    addName(){
      this.willAddQuestion={
        id: this.questions.length+1,
        type: 'text',
        title: '姓名：',
        description: '请考虑妥当后填写',
        must: true,
        options: [{
          id: 0,
          title: '',
        }],
        row: 1,
        score: 10,
      };
      this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
      this.questions.push(this.willAddQuestion);
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      this.resetWillAdd();
    },
    addStuID(){
      this.willAddQuestion={
        id: this.questions.length+1,
        type: 'text',
        title: '学号：',
        description: '请考虑妥当后填写',
        must: true,
        options: [{
          id: 0,
          title: '',
        }],
        row: 1,
        score: 10,
      };
      this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
      this.questions.push(this.willAddQuestion);
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      this.resetWillAdd();
    },
    addPhone(){
      this.willAddQuestion={
        id: this.questions.length+1,
        type: 'text',
        title: '手机号：',
        description: '请考虑妥当后填写',
        must: true,
        options: [{
          id: 0,
          title: '',
        }],
        row: 1,
        score: 10,
      };
      this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
      this.questions.push(this.willAddQuestion);
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      this.resetWillAdd();
    },
    addTem(){
      this.willAddQuestion={
        id: this.questions.length+1,
        type: 'radio',
        title: '体温：',
        description: '请考虑妥当后填写',
        must: true,
        options: [{
          id: 1,
          title: '36.0℃以下',
        },
          {
            id: 2,
            title: '36.0℃~36.5℃',
          },
          {
            id: 3,
            title: '36.5℃~37.0℃',
          },
          {
            id: 4,
            title: '37.0℃~37.5℃',
          },
          {
            id: 5,
            title: '37.5℃以上',
          }],
        row: 1,
        score: 10,
      };
      this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
      this.questions.push(this.willAddQuestion);
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      this.resetWillAdd();
    },
    addEnvironment(){
      this.willAddQuestion={
        id: this.questions.length+1,
        type: 'radio',
        title: '近14日内，所接触环境和人员是否一切正常？',
        description: '请考虑妥当后填写',
        must: true,
        options: [{
          id: 1,
          title: '是（未接触风险地区和人员、无入境共居人员且社区无确诊）',
        },
          {
            id: 2,
            title: '否',
          }],
        row: 1,
        score: 10,
      };
      this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
      this.questions.push(this.willAddQuestion);
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      this.resetWillAdd();
    },
    addHealthy(){
      this.willAddQuestion={
        id: this.questions.length+1,
        type: 'radio',
        title: '今日本人情况是否正常？',
        description: '请考虑妥当后填写',
        must: true,
        options: [{
          id: 1,
          title: '是（本人健康且未处于隔离期）',
        },
          {
            id: 2,
            title: '否',
          }],
        row: 1,
        score: 10,
      };
      this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
      this.questions.push(this.willAddQuestion);
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      this.resetWillAdd();
    },

    download() {
      // 获取base64的图片节点
      var img = document.getElementById('qrcode_2').getElementsByTagName('img')[0];
      // 构建画布
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      // 构造url
      var url = canvas.toDataURL('image/png');
      console.log(url);
      // 构造a标签并模拟点击
      var downloadLink = document.createElement('a');
      downloadLink.download = '二维码.png';
      downloadLink.href = url;
      downloadLink.click();
      downloadLink.remove();
    },
    formatTime(time) {
      this.timeFrame = time;
    },
    alertGetLocation() {
      this.$message.success("用户点击将自动获取地理位置");
    },
    finish(){
      this.qsLinkDialogVisible = false;
      this.$router.push('/index') // 跳转到问卷中心？
    },
    publishSuccess:function (){
      this.qsLinkDialogVisible=true;
    },
    edit:function (index){
      index--;
      this.willAddQuestion = {
        question_id:this.questions[index].question_id,
        id: this.questions[index].id,
        type: this.questions[index].type,
        title: this.questions[index].title,
        must: this.questions[index].must,
        description: this.questions[index].description,
        options: JSON.parse(JSON.stringify(this.questions[index].options)),
        row: this.questions[index].row,
        score: this.questions[index].score,
      };
      this.editIndex = index;
      this.selectDisAble = true;
      this.qsEditDialogTitle = "编辑题目";
      this.qsEditDialogVisible = true;
    },
    isExistEmptyOption:function (){
      for(let i=0;i<this.willAddQuestion.options.length;i++){
        if(this.willAddQuestion.options[i].title==='') return true;
      }
      return false;
    },
    isExistSameOption:function (){
      for(let i=0;i<this.willAddQuestion.options.length;i++){
        for(let j=0;j<this.willAddQuestion.options.length;j++){
          if(i!==j&&this.willAddQuestion.options[i].title===this.willAddQuestion.options[j].title) return true;
        }
      }
      return false;
    },
    dialogConfirm(){
      let index = this.editIndex;
      if(this.qsEditDialogTitle==="编辑题目") {
        if (this.willAddQuestion.title === '') {
          this.$message({
            type: 'error',
            message: '标题不能为空!'
          });
        }
        else if((this.willAddQuestion.type==="radio"||this.willAddQuestion.type==="checkbox")&&this.isExistEmptyOption()){
          this.$message({
            type: 'error',
            message: '选项名不能为空!'
          });
        }
        else if((this.willAddQuestion.type==="radio"||this.willAddQuestion.type==="checkbox")&&this.isExistSameOption()){
          this.$message({
            type: 'error',
            message: '选项名不能重复!'
          });
        }
        else {
          this.questions[index].id = this.willAddQuestion.id;
          this.questions[index].row = this.willAddQuestion.row;
          this.questions[index].must = this.willAddQuestion.must;
          this.questions[index].description = this.willAddQuestion.description;
          this.questions[index].title = this.willAddQuestion.title;
          this.questions[index].options = this.willAddQuestion.options;
          this.questions[index].score = this.willAddQuestion.score;
          // 大纲更新
          this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
          this.qsEditDialogTitle = "";
          this.qsEditDialogVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          // 重置
          this.resetWillAdd();
          this.selectDisAble = false;
        }
      }
      else{
        if (this.willAddQuestion.title === '') {
          this.$message({
            type: 'error',
            message: '标题不能为空!'
          });
        }
        else if((this.willAddQuestion.type==="radio"||this.willAddQuestion.type==="checkbox")&&this.isExistEmptyOption()){
          this.$message({
            type: 'error',
            message: '选项名不能为空!'
          });
        }
        else if((this.willAddQuestion.type==="radio"||this.willAddQuestion.type==="checkbox")&&this.isExistSameOption()){
          this.$message({
            type: 'error',
            message: '选项名不能重复!'
          });
        }
        else {
          this.qsEditDialogVisible = false;
          this.willAddQuestion.id = this.questions.length + 1;
          // 大纲更新
          this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
          this.questions.push(this.willAddQuestion);
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          // 重置
          this.resetWillAdd();
        }
      }
    },
    resetWillAdd(){
      this.willAddQuestion={
        question_id: 0,
        id: 0,
        type:'',
        title:'',
        must: true, // 是否必填
        description: '', // 问题描述
        options:[
          {
            title: '', // 选项标题
            id: 0 // 选项id
          }
        ],
        row: 1, // 填空区域行数
        score: 5, // 最大评分
    }
    },
    dialogCancel: function(){
      this.qsEditDialogTitle="新建题目";
      this.resetWillAdd();
      this.qsEditDialogVisible=false;
      this.selectDisAble=false;
    },
    cancel_pre: function () {
      this.$confirm('已编辑的题目信息将不会保存,确认关闭？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogCancel();
      }).catch(() => {
      });
    },
    typeChange(value) {
      this.willAddQuestion.type = value;
    },
    addOption(){
      this.willAddQuestion.options.push({
        title: '',
        id: 0,
      });
    },
    deleteOption(index){
      if(this.willAddQuestion.options.length===1){
        this.$message({
          type:"error",
          message:"至少需要设置一个选项！"
        })
      }
      else this.willAddQuestion.options.splice(index,1);
    },
    changeTitle: function (value) {
      this.title = value;
    },
    changeDescription: function (value) {
      this.description = value;
    },
    openSetting: function () {
      this.settingDialogVisible = true;
    },
    settingSuccess: function () {
      this.settingDialogVisible = false;
      this.$message({
        type: 'success',
        message: '设置已生效'
      });
    },
    publish() {
      if (this.questions.length === 0) {
        this.$message.error("题目为空，无法发布！");
        return;
      }

      this.$confirm('确认发布？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
        this.publishSuccess();
        var new_questions = JSON.parse(JSON.stringify(this.questions));
        let url = '/sm/save/qn/deploy';
        const userInfo = user.getters.getUser(user.state());
        var param = {
          username: userInfo.user.username,
          title: this.title,
          finished_time: this.timeFrame,
          description: this.description,
          type: this.type,
          qn_id: this.$route.query.pid,
          questions: new_questions
        };
        var paramer = JSON.stringify(param, {questions: 'brackets'})
        this.$axios({
          method: 'post',
          url: url,
          data: paramer,
        })
            .then(res => {
              loadingIns.close();
              if (res.data.status_code === 1) {
                this.linkShare = this.GLOBAL.baseUrl + '/fill_hate?mode=1&code=' + res.data.code;

                if (this.qrcode == null) {
                  this.qrcode = new QRCode(document.getElementById("qrcode_2"), {
                    width: 200, //生成的二维码的宽度
                    height: 200, //生成的二维码的高度
                    colorDark : "#000000", // 生成的二维码的深色部分
                    colorLight : "#ffffff", //生成二维码的浅色部分
                    correctLevel : QRCode.CorrectLevel.H
                  });
                }
                this.qrcode.clear();
                this.qrcode.makeCode(this.linkShare);
              }
              else if (res.data.status_code === 2) {
                this.$message.error("题目为空，无法发布！");
              }
            })
            .catch(err => {
              console.log(err);
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消发布'
        });
      });
    },
    share() {
      this.publish();
    },
    saveinfo(tag) {
      this.saveQnInfo(tag, "5");
    },
    save() {
      this.saveinfo('save');
    },
    preview() {
      this.saveinfo('preview');
    },
    up: function (index) {
      index--;
      let questions = this.questions;
      if (index!==0) {
        // 问卷更新
        questions[index].id--;
        questions[index-1].id++;
        let temp = questions[index];
        questions[index] = questions[index-1];
        questions[index-1] = temp;
        // 大纲更新
        this.updateOutline(index, questions[index-1].title);
        this.updateOutline(index+1, questions[index].title);
      }
    },
    down: function (index) {
      index--;
      let questions = this.questions;
      if (index!==questions.length-1) {
        // 问卷更新
        questions[index].id++;
        questions[index+1].id--;
        let temp = questions[index];
        questions[index] = questions[index+1];
        questions[index+1] = temp;
        // 大纲更新
        this.updateOutline(index+1, questions[index].title);
        this.updateOutline(index+2, questions[index+1].title);
      }
    },
    del_pre: function (index) {
      this.$confirm('确认删除（不可恢复）？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(index)
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
    del: function (index) {
      index--;
      let questions = this.questions;
      let outline = this.outline;
      for (let num=index+1; num<questions.length; num++) {
        questions[num].id--;
      }
      outline.splice(index,1);
      questions.splice(index,1);
      for (let num=index; num<outline.length; num++) {
        this.updateOutline(num+1, questions[num].title);
      }
    },
    copy: function (index) {
      index--;
      let questions = this.questions;
      // 大纲更新
      this.updateOutline(this.outline.length + 1, questions[index].title);
      // 问卷更新
      let temp = this.deepClone(questions[index]);
      temp.id = questions.length+1;
      temp.question_id = 0;
      questions.push(temp);
      this.$message.success("问题复制成功，已粘贴至问卷末尾");
    },
    deepClone :function(initialObj) {
      let obj = {};
      try {
        obj = JSON.parse(JSON.stringify(initialObj));
        // eslint-disable-next-line no-empty
      } finally {}
      return obj;
    },    // 深拷贝
    updateOutline: function (id, label) {
      if (label.length > 12) {
        label = id + '. ' + label.substring(0, 11) + '...';
      } else {
        label = id + '. ' + label;
      }
      if (id <= this.questions.length) {
        this.outline[id-1].id = id;
        this.outline[id-1].label = label;
      } else {
        this.outline.push({
          id: id,
          label: label,
        })
      }
    },
    updateQuestions: function (start, end) {
      let offset = end - start;
      if (offset > 0) {
        for (let i=0; i<offset; i++) {
          this.down(start+i);
        }
      } else {
        for (let i=0; i<offset*-1; i++) {
          this.up(start-i);
        }
      }
    },  // good
    toFillQn: function (value) {
      this.$router.push({
        name: 'FillQn',
        query: {
          mode: value,
          title: this.title,
        }
      });
    },
    InitOutline() {
      for (var i = 0; i < this.questions.length; i++) {
        this.outline.push({
          id: this.questions[i].id,
          label: (i+1) + ". " + this.questions[i].title
        })
      }
    },
    copyToClip(message) {
      var aux = document.createElement("input");
      aux.setAttribute("value", this.linkShare);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message !== null) {
        this.$message.success("复制成功");
      } else{
        this.$message.error("复制失败");
      }
    },
    // 大纲拖拽处理函数
    handleDrop(draggingNode, dropNode, dropType) {
      console.log('tree drop: ', draggingNode.key, dropNode.key, dropType);
      this.updateQuestions(draggingNode.key, dropNode.key);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.key > dropNode.key) return type==='prev';
      else return type==='next';
    },
  },
  created() {
    this.getQnDataSelf();
  },
  mounted() {
    this.timer = setInterval(this.autoSave, 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>

<style>
.punch .linkDialog{
  text-align: left;
}
.punch .container {
  padding: 0;
  height: auto;
  min-height: 610px;
}

.punch header {
  padding: 0 100px;
}

.punch .el-container {
  padding: 0 100px;
}

.punch .side {
  border-top: solid 1px #e3e3e3;
  border-right: solid 1px #e3e3e3;
  background: #FFFFFF;
}

.punch .main {
  border-top: solid 1px #e3e3e3;
  background: #FFFFFF;
}

.punch .edit {
  margin-top: 0;
  overflow: auto;
  height: 550px;
}

.punch .outline {
  overflow: auto;
  height: 550px;
}

.punch .ques-type {
  padding: 15px 0;
  font-size: 16px;
  border-bottom: dashed #e3e3e3 1px;
}

.punch .type-icon {
  color: #1687fd;
  display: inline-block;
}

.punch .type-icon:hover {
  color: #409EFF;
  cursor: pointer;
}

.punch .el-tabs__nav-scroll {
  text-align: center;
  height: 60px;
  margin: 0 60px;
}

.punch .el-tabs__item {
  font-weight: bold;
  padding: 0 20px;
  height: 60px;
  box-sizing: border-box;
  line-height: 60px;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  color: black;
  position: relative;
}

.punch .el-tabs__header {
  margin: 0;
}

.punch .el-tree-node__content {
  padding-left: 10px !important;
  height: 40px;
}

.punch .main {
  max-height: 610px;
}

.punch .ques .title {
  font-size: 28px;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 26px;
}

.punch .ques .description {
  text-align: left;
  font-size: 16px;
  padding-bottom: 30px;
  color: black;
  line-height: 30px;
}

.punch .ques-block {
  padding-bottom: 15px;
  border-top: solid #e3e3e3 1px;
}

.punch .ques-block:hover {
  background: #f5f5f5;
  transition: .3s;
}

.punch .ques-block .must {
  font-weight: normal;
  color: crimson;
}

.punch .block-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 20px 10px 10px;
  font-weight: bold;
}

.punch .block-description {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 5px;
  padding-bottom: 15px;
  padding-left: 10px;
  color: #969696;
}

.punch .block-choice {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 5px 10px 10px;
}
.punch .block-location {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 5px 10px 10px;
}

.punch .el-button-group>.el-button:first-child {
  border-radius: 0 0 0 8px;
}

.punch .el-button-group>.el-button:last-child {
  border-radius: 0 0 8px 0;
}

.punch .block-button .el-button {
  background: #b9b9b9;
  border: transparent;
}

.punch .block-button .el-button:hover {
  background: #989898;
  border: transparent;
}

.punch .bt {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.punch .block-choice .el-textarea__inner {
  max-height: 100px;
}
.punch .dialog{
  text-align: left;
  font-size: large;
}
.punch .addOptionButton{
  display: inline-block;
  margin-left: 100px;
}
.punch .deleteOptionButton{
  margin-left: 20px;
}

.punch .setting-item {
  text-align: left;
}

.punch .setting-bt {
  margin-top: 28px;
}

.punch .setting .el-dialog__header {
  text-align: left;
}

.punch .setting .item-title {
  padding-right: 20px;
}
.punch .sideTitle{
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}
.punch .easyChoose{
  font-size: medium;
  margin-top: 10px;
}
.punch .chooseLabel{
  margin-right: 10px;
  margin-left: 5px;
}

.locabtn{
  text-align: center;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding: 12px 20px;
  height: 40px;
  width: 300px;
  line-height: 1;
}


</style>