<template>
  <div class="investigation">
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
            <el-row class="ques-block" v-for="item in questions" :key="item.id" @mouseover.native="hoverItem=item.id">

              <el-col :span="16" class="block-content">
                <div class="block-title">
                  {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
                </div>

                <div
                    class="block-description"
                    v-if="item.description!=='' && item.description!==null && item.description!==undefined"
                >
                  {{ item.description }}
                </div>

                <!--                  图片-->
                <el-row class="block-img" v-for="(i,index) in item.imgList" :key="i.index">
                  <el-col :offset="2" :span="10" class="demo-image__preview" v-if="index%2===0">
                    <el-image
                        style="width: 200px; height: 200px"
                        :src="i.url"
                        :preview-src-list="[i.url]">
                    </el-image>
                  </el-col>
                  <el-col :span="10" class="demo-image__preview" v-if="index%2===0&&index+1<=item.imgList.length-1">
                    <el-image
                        style="width: 200px; height: 200px"
                        :src="item.imgList[index+1].url"
                        :preview-src-list="[item.imgList[index+1].url]">
                    </el-image>
                  </el-col>
                </el-row>
                <span style="color: #9b9ea0;font-size: x-small" v-if="item.imgList.length!==0">（点击图片查看大图）</span>


                <!--                视频-->
                <el-row class="block-img" v-for="i in item.videoList" :key="i.index">
                  <embed width=400 height=230 transparentatstart=true
                         animationatstart=false autostart=true autosize=false volume=100
                         displaysize=0 showdisplay=true showstatusbar=true showcontrols=true
                         showaudiocontrols=true showtracker=true showpositioncontrols=true
                         balance=true :src="i.url">
                </el-row>


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

                <div class="block-choice" v-if="item.type==='mark'">
                  <!--                  评分-->
                  <el-rate value="0" :max="item.score"></el-rate>
                </div>

                <!--                 关联信息-->
                <div class="block-relation" v-if="isLogic && item.last_question!==0">
                  <div>{{ relatedQs(item) }}</div>
                </div>
              </el-col>

              <el-col :span="8" class="block-button" style="text-align: right" v-if="hoverItem===item.id">
                <el-button-group>
                  <el-tooltip class="item" effect="light" content="编辑" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-edit" @click="edit(item.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" v-if="isLogic" effect="light" content="添加关联逻辑" placement="bottom" open-delay="400">
                    <el-button class="bt" type="primary" icon="el-icon-paperclip" @click="logic(item.id)"></el-button>
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

        <el-form-item label="题目标题" style="width: 100%;">
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
          <el-button type="primary" plain class="addOptionButton" @click="addOption" style="margin-bottom: 20px">新增选项</el-button>
          <!-- <el-button type="primary" plain class="addOptionButton" @click="dialogVisibleAsso=true">添加关联</el-button> -->
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

        <el-form-item label="上传图片">
          <el-upload
              class="upload-img"
              :action=uploadImgUrl
              multiple
              :http-request="upLoadImage"
              :before-upload="beforeImageUpload"
              :file-list="willAddQuestion.imgList"
              :limit="6">
            <el-button size="small"  plain style="width: 100px">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&emsp;只能上传jpg/png文件，且不超过5mb</span>
          </el-upload>
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
              class="upload-video"
              :action=uploadVideoUrl
              :http-request="upLoadVideo"
              :before-upload="beforeVideoUpload"
              :file-list="willAddQuestion.videoList"
              :limit="1">
            <el-button size="small" plain style="width: 100px">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&emsp;只能上传mp4/mkv文件，且不超过5mb</span>
          </el-upload>
        </el-form-item>
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
    <!--    关联问题弹框-->
    <el-dialog :title="qsLogicDialogTitle" :visible.sync="qsLogicDialogVisible"  :before-close="cancel_pre_logic" class="dialog" >
      <el-form v-if="questions.length !== 0" class="logic-form" ref="form" label-width="80px">

        <div class="logic-title">
          当前题目：{{ questions[logicIndex].id }}. {{ questions[logicIndex].title }}
        </div>

        <el-form-item label="关联题目">
          <el-select v-model="willAddLogic.question_id" placeholder="请选择关联题目">
            <el-option
                v-for="item in questionsFilter"
                :key="item.id"
                :label="idTitle(item)"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关联选项" v-if="willAddLogic.question_id!==0">
          <el-select v-model="willAddLogic.option_id" placeholder="请选择关联选项">
            <el-option
                v-for="item in questions[willAddLogic.question_id-1].options"
                :key="item.id"
                :label="item.title"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="logic-info" v-if="willAddLogic.question_id!==0">
          <!--          保存加入后选项id记得减一-->
          当题目<span style="color: #1687fd"> "{{ idTitle(questions[willAddLogic.question_id-1]) }}" </span>选择选项<span style="color: #1687fd"> "{{ questions[willAddLogic.question_id-1].options[willAddLogic.option_id-1].title}}" </span>时此题才会显示
        </div>
        <div class="logic-info" v-if="questionsFilter.length===1">
          题目之前不存在单（多）选题，无法设置关联题目
        </div>

        <div class="logic-bt">
          <el-button type="primary" @click="logicConfirm(logicIndex)">确定</el-button>
        </div>

      </el-form>
    </el-dialog>
    <!--    高级设置弹框-->
    <el-dialog :title="settingDialogTitle" :visible.sync="settingDialogVisible" class="settingDialog" width="30%">
      <el-form class="setting-form" ref="form" label-width="130px">
        <el-form-item label="问卷回收截止时间">
          <el-date-picker
              v-model="timeFrame"
              @change="formatTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="题目关联逻辑开关">
          <el-switch
              v-model="isLogic"
              active-text="开"
              inactive-text="关"
              @change="closeGlobalLogic"
          >
          </el-switch>
        </el-form-item>

        <div class="logic-description">
          题目关联打开时，可设置一个题目的显示同前面某个题目的某个选项被选中关联在一起【问题右侧按钮处设置】
        </div>

        <div class="logic-description important" v-if="isLogic">
          为确保您的问卷关联逻辑正确，建议您最后为问卷设计关联逻辑
        </div>
      </el-form>

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
  name: "investigation",
  mixins: [getDataApi, saveDataApi],
  data() {
    return {
      logicQuestionState: 0,  // 用于判断用户是否更改关联问题设置
      logicOptionState: 0,    // 用于判断用户是否更改关联选项设置

      uploadImgUrl: this.GLOBAL.backUrl + 'upload/image',
      uploadVideoUrl: this.GLOBAL.backUrl + 'upload/video',

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
      settingDialogVisible: false,     // 高级设置对话框可见性
      closingDate: null,   // 高级设置中问卷回收的截止日期
      isLogic: true,      // 问卷是否引入关联逻辑
      isReleased: false,   // 是否发布
      editIndex: 0,
      logicIndex: 0,          // 当前添加题目逻辑的问题ID
      selectDisAble: false,
      hoverItem: 0,
      activeName: 'first',
      title: '',
      description: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      type: '1',
      questions: [],
      // questions: [{
      //   question_id: 123,
      //   id: 1,
      //   type: 'text',
      //   title: '图片测试',
      //   must: false, // 是否必填
      //   description: '', // 问题描述
      //   options: [
      //     {
      //       title: '', // 选项标题
      //       id: 0 // 选项id
      //     }
      //   ],
      //   row: 1, // 填空区域行数
      //   score: 5, // 最大评分
      //   imgList: [{
      //     name: '1.jpg',
      //     url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      //   },{
      //     name: '2.jpg',
      //     url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      //   }],
      //   videoList: [
      //   ]
      // },{
      //   question_id: 123,
      //   id: 2,
      //   type: 'mark',
      //   title: '视频测试',
      //   must: false, // 是否必填
      //   description: '', // 问题描述
      //   options: [
      //     {
      //       title: '', // 选项标题
      //       id: 0 // 选项id
      //     }
      //   ],
      //   row: 1, // 填空区域行数
      //   score: 5, // 最大评分
      //   imgList: [],
      //   videoList: [
      //     {
      //       name:"1.mp4",
      //       url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      //     }
      //   ]
      // }],
      outline: [],
      max_recycling: 10000,
      hasRecycleLimit: false,
      pid: this.$route.query.pid,
      qsEditDialogVisible:false,
      qsEditDialogTitle:"新建题目",
      qsLogicDialogVisible:false,
      qsLogicDialogTitle: "关联逻辑设置",
      willAddQuestion: {
        question_id: 0,
        id: 0,
        type: '',
        title: '',
        must: false, // 是否必填
        is_shown: true,   // 是否显示
        last_question: 0,   // 前导问题
        last_option: 0,     // 前导选项
        description: '', // 问题描述
        options:[
          {
            title: '', // 选项标题
            id: 1 // 选项id
          }
        ],
        row: 1, // 填空区域行数
        score: 5, // 最大评分
        imgList: [],
        videoList: [],
        // imgList:[{
        //   name:'1.jpg',
        //   url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fbg_w1180%2F00%2F22%2F20%2F2F89KQ0UnA.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632713364&t=82be18770c43c56fd28895cc938f6a0b"
        // },],
        // videoList:[{
        //   name: "1.mp4",
        //   url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        // }]
      },
      willAddLogic: {
        question_id: 0,
        option_id: 1,
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
        }
      ],

      // questions: [
      //   {
      //     id: 1,
      //     type: 'radio',
      //     title: '这是一个什么网站？',
      //     description: '请考虑妥当后填写',
      //     must: true,
      //     options: [{
      //       id: 1,
      //       title: '问卷系统',
      //     }, {
      //       id: 2,
      //       title: '出版系统',
      //     }],
      //     row: 0,
      //     score: 0,
      //   },
      //   {
      //     id: 2,
      //     type: 'checkbox',
      //     title: '软工小学期助教都有谁？',
      //     description: '请考虑妥当后填写',
      //     must: false,
      //     options: [{
      //       id: 1,
      //       title: 'ZYH',
      //     }, {
      //       id: 2,
      //       title: 'LKW',
      //     },{
      //       id: 3,
      //       title: 'ZXH',
      //     }, {
      //       id: 4,
      //       title: 'HZH',
      //     }],
      //     row: 0,
      //     score: 0,
      //   },
      //   {
      //     id: 3,
      //     type: 'radio',
      //     title: '软工小学期累不累',
      //     description: '请考虑妥当后填写',
      //     must: false,
      //     options: [{
      //       id: 1,
      //       title: '累',
      //     }, {
      //       id: 2,
      //       title: '非常累',
      //     }],
      //     row: 0,
      //     score: 0,
      //   },
      //   {
      //     id: 4,
      //     type: 'text',
      //     title: '您对小学期的评价如何？',
      //     description: '请考虑妥当后填写',
      //     must: false,
      //     options: [{
      //       id: 0,
      //       title: '',
      //     }],
      //     row: 3,
      //     score: 0,
      //   },
      //   {
      //     id: 5,
      //     type: 'mark',
      //     title: '给小学期打个分吧~',
      //     description: '请考虑妥当后填写',
      //     must: true,
      //     options: [{
      //       id: 0,
      //       title: '',
      //     }],
      //     row: 0,
      //     score: 10,
      //   },
      // ],
    //   outline: [
    //   {
    //     id: 1,
    //     label: '1. 这是一个什么网站？',
    //   },
    //   {
    //     id: 2,
    //     label: '2. 软工小学期助教都有谁？',
    //   },
    //   {
    //     id: 3,
    //     label: '3. 软工小学期累不累',
    //   },
    //   {
    //     id: 4,
    //     label: '4. 您对小学期的评价如何？',
    //   },
    //   {
    //     id: 5,
    //     label: '5. 给小学期打个分吧~',
    //   },
    // ],
    }
  },
  components: {
    editHeader,
  },
  methods: {
    //---------------------------Image and video--------------------------------//
    upLoadImage(file) {
      const formData = new FormData();
      formData.append('image', file.file);
      this.$axios({
        method: 'post',
        url: this.uploadImgUrl,
        data: formData,
      })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                var name = res.data.name;
                var url = res.data.url;
                this.willAddQuestion.imgList.push({
                  name: name,
                  url: url
                });
                console.log(this.willAddQuestion.imgList);
                break;
              case 2:
                // this.$message.error("上传文件格式错误！");
                break;
              default:
                this.$message.error("操作失败！");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    upLoadVideo(file) {
      const formData = new FormData();
      formData.append('video', file.file);
      const instance = this.$axios.create({
        withCredentials: true,
      })
      instance({
        method: 'post',
        url: this.uploadVideoUrl,
        data: formData,
      })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                var name = res.data.name;
                var url = res.data.url;
                this.willAddQuestion.videoList.push({
                  name: name,
                  url: url
                });
                console.log(this.willAddQuestion.videoList);
                break;
              case 2:
                // this.$message.error("上传文件格式错误！");
                break;
              default:
                this.$message.error("操作失败！");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    beforeImageUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 10;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      } else if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return (isJPG || isPNG) && isLt5M;
    },
    beforeVideoUpload(file) {
      const filename = file.name;
      var suffix = '';
      var isVideo = false;
      const isLt2M = file.size / 1024 / 1024 < 10;
      try {
        var flieArr = filename.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      var videoList = ['mp4', 'mkv'];
      var judge = videoList.some(function (item) {
        return item === suffix;
      });
      if (judge) {
        isVideo = true;
      }
      if (!isVideo) {
        this.$message.error('上传视频文件只能是 MP4/MKV 格式!');
      } else if (!isLt2M) {
        this.$message.error('上传视频文件大小不能超过 10MB!');
      }
      return isLt2M && isVideo;
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$message("移除成功")
    },
    //--------------------------------------------------------------------------//
    autoSave() {
      this.saveQnInfo('autosave', '1');
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
        is_shown: this.questions[index].is_shown,
        last_question: this.questions[index].last_question,
        last_option: this.questions[index].last_option,
        imgList: JSON.parse(JSON.stringify(this.questions[index].imgList)),
        videoList: JSON.parse(JSON.stringify(this.questions[index].videoList)),
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
          this.questions[index].is_shown = this.willAddQuestion.is_shown;
          this.questions[index].last_question = this.willAddQuestion.last_question;
          this.questions[index].last_option = this.willAddQuestion.last_option;
          this.questions[index].options = JSON.parse(JSON.stringify(this.willAddQuestion.options));
          this.questions[index].imgList=JSON.parse(JSON.stringify(this.willAddQuestion.imgList));
          this.questions[index].videoList=JSON.parse(JSON.stringify(this.willAddQuestion.videoList));
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
        type: '',
        title: '',
        must: false, // 是否必填
        is_shown: true,   // 是否显示
        last_question: 0,   // 前导问题
        last_option: 0,     // 前导选项
        description: '', // 问题描述
        options:[
          {
            title: '', // 选项标题
            id: 1 // 选项id
          }
        ],
        row: 1, // 填空区域行数
        score: 5, // 最大评分
        imgList:[],
        videoList:[]
      }
    },
    dialogCancel: function() {
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
    LogicDialogCancel: function () {
      this.qsLogicDialogVisible = false;
      this.resetLogic();
    },
    cancel_pre_logic: function () {
      this.$confirm('已编辑的题目关联逻辑将不会保存,确认关闭？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.LogicDialogCancel();
      }).catch(() => {
      });
    },
    logicConfirm: function(index) {
      console.log(this.questions);
      let questions = this.questions;
      let willAddLogic = this.willAddLogic;
      questions[index].last_question = willAddLogic.question_id;
      questions[index].last_option = willAddLogic.option_id;
      questions[index].is_shown = willAddLogic.question_id === 0;
      if (this.willAddLogic.question_id !== this.logicQuestionState || this.willAddLogic.option_id !== this.logicOptionState) {
        this.$message({
          type: 'success',
          message: '问题关联设置成功'
        });
      }
      this.qsLogicDialogVisible = false;
      this.resetLogic();
    },
    logic: function (index) {
      this.logicIndex = index-1;
      this.willAddLogic.question_id = this.questions[index-1].last_question;
      if (this.questions[index-1].last_option!==0) { this.willAddLogic.option_id = this.questions[index-1].last_option; }
      else this.willAddLogic.option_id = 1;
      console.log(this.questions);
      this.qsLogicDialogVisible = true;
      this.logicQuestionState = this.willAddLogic.question_id;
      this.logicOptionState = this.willAddLogic.option_id;
    },
    resetLogic(){
      this.willAddLogic = {
        question_id: 0,
        option_id: 1,
      };
      this.logicIndex = 0;
    },
    typeChange(value) {
      this.willAddQuestion.type = value;
    },
    addOption(){
      // 问题关联检查
      if (this.willAddQuestion.id !== 0 && this.sonGroup(this.willAddQuestion.id-1).length !== 0) {
        this.$message({
          type: 'warning',
          message: '此问题已被关联，无法新增选项，请删除关联信息后再试'
        });
        return;
      }
      this.willAddQuestion.options.push({
        title: '',
        id: this.willAddQuestion.options.length + 1,
      });
    },
    deleteOption(index){
      if(this.willAddQuestion.options.length===1){
        this.$message({
          type:"error",
          message:"至少需要设置一个选项！"
        })
      }
      else {
        // 问题关联检查
        if (this.willAddQuestion.id !== 0 && this.sonGroup(this.willAddQuestion.id-1).length !== 0) {
          this.$message({
            type: 'warning',
            message: '此问题已被关联，无法删除选项，请删除关联信息后再试'
          });
          return;
        }
        // id重排
        for(let i=index+1; i<this.willAddQuestion.options.length; i++) {
          this.willAddQuestion.options[i].id--;
        }
        this.willAddQuestion.options.splice(index,1);
      }
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
            this.linkShare = this.GLOBAL.baseUrl + '/fill?mode=1&code=' + res.data.code;

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
    save() {
      this.saveQnInfo('save', "1");
    },
    preview() {
      this.saveQnInfo('preview', "1");
    },
    up: function (index) {
      index--;
      let questions = this.questions;
      if (index!==0) {
        // 非法移动
        if (questions[index].last_question === index) {
          this.$message.error("拒绝移动！（试图将关联问题移至被关联问题上方，请检查您的关联逻辑）");
          return;
        }
        // 关联维护
        let arr = this.sonGroup(index);
        let willSubtract = [];
        if(arr.length !== 0) {
          for(let j=0; j<arr.length; j++) {
            willSubtract.push(arr[j].id-1);
          }
        }
        arr = this.sonGroup(index-1);
        if(arr.length !== 0) {
          for(let j=0; j<arr.length; j++) {
            questions[arr[j].id-1].last_question++;
          }
        }
        for (let i=0; i<willSubtract.length; i++) {
          questions[willSubtract[i]].last_question--;
        }
        // 题序维护
        questions[index].id--;
        questions[index-1].id++;
        let temp = questions[index];
        questions[index] = questions[index-1];
        questions[index-1] = temp;
        // 大纲维护
        this.updateOutline(index, questions[index-1].title);
        this.updateOutline(index+1, questions[index].title);
      }
    },
    down: function (index) {
      index--;
      let questions = this.questions;
      if (index!==questions.length-1) {
        // 非法移动
        if (questions[index+1].last_question === index+1) {
          this.$message.error("拒绝移动！（试图将关联问题移至被关联问题上方，请检查您的关联逻辑）");
          return;
        }
        // 关联维护
        let arr = this.sonGroup(index);
        let willAdd = [];
        if(arr.length !== 0) {
          for(let j=0; j<arr.length; j++) {
            willAdd.push(arr[j].id-1);
          }
        }
        arr = this.sonGroup(index+1);
        if(arr.length !== 0) {
          for(let j=0; j<arr.length; j++) {
            questions[arr[j].id-1].last_question--;
          }
        }
        for (let i=0; i<willAdd.length; i++) {
          questions[willAdd[i]].last_question++;
        }
        // 题序维护
        questions[index].id++;
        questions[index+1].id--;
        let temp = questions[index];
        questions[index] = questions[index+1];
        questions[index+1] = temp;
        // 大纲维护
        this.updateOutline(index+1, questions[index].title);
        this.updateOutline(index+2, questions[index+1].title);
      }
    },
    del_pre: function (index) {
      // 问题关联检查
      if (this.sonGroup(index-1).length !== 0) {
        this.$confirm('该问题已被关联，删除此问题会删除所有相关关联信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.del_relation(index);
          this.del(index)
          this.$message({
            type: 'success',
            message: '问题及关联信息已成功删除'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除题目及关联'
          });
        });
      } else {
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
      }
    },
    del: function (index) {
      index--;
      let questions = this.questions;
      let outline = this.outline;
      // 维护关联关系
      for (let i=index+1; i<questions.length; i++) {
        let arr = this.sonGroup(i);
        if(arr.length !== 0) {
          for(let j=0; j<arr.length; j++) {
            if (questions[arr[j].id-1] !== index) {
              questions[arr[j].id-1].last_question--;
            }
          }
        }
      }
      // 维护题序
      for (let i=index+1; i<questions.length; i++) {
        questions[i].id--;
      }
      outline.splice(index,1);
      questions.splice(index,1);
      // 维护大纲
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
    // 大纲拖拽处理函数(下3个)
    handleDrop(draggingNode, dropNode, dropType) {
      console.log('tree drop: ', draggingNode.key, dropNode.key, dropType);
      if (this.isRightRelation(draggingNode.key, dropNode.key)) {
        this.updateQuestions(draggingNode.key, dropNode.key);
      } else {
        this.outline.splice(0, this.outline.length);
        this.InitOutline();
        this.$message.error("拒绝移动！（试图将关联问题移至被关联问题上方，请检查您的关联逻辑）");
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.key > dropNode.key) {
        return type === 'prev';
      } else  {
        return type==='next';
      }
    },
    isRightRelation: function (index1, index2) {
      console.log(index1, index2);
      index1--;
      index2--;
      let questions=this.questions;
      if (index1 < index2) {
        for (let i=index1+1; i<=index2; i++) {
          if (questions[i].last_question === index1+1) {
            return false;
          }
        }
        return true;
      } else {
        for (let i=index1-1; i>=index2; i--) {
          if (questions[index1].last_question === i+1) {
            return false;
          }
        }
        return true;
      }
    },
    idTitle: function (item) {
      if (item.id === 0) {
        return item.title;
      } else {
        return item.id + ". " + item.title;
      }
    },
    relatedQs: function (item) {
      return "关联问题：" + this.questions[item.last_question-1].id + "." + this.questions[item.last_question-1].title + "(" + this.questions[item.last_question-1].options[item.last_option-1].title + ")";
    },
    // 遍历得爸爸
    fatherIndex: function (qs_id) {
      for (let i=0; i<this.questions.length; i++) {
        if (this.questions[i].question_id === qs_id) {
          return i;
        }
      }
    },
    // 遍历得儿子
    sonGroup: function (index) {
      let arr = [];
      for (let i=0; i<this.questions.length; i++) {
        if (this.questions[i].last_question === this.questions[index].id) {
          arr.push(this.questions[i]);
        }
      }
      return arr;
    },
    // 连带删除关联信息
    del_relation: function (index) {
      for (let i=0; i<this.questions.length; i++) {
        // 保存加入后,下面需修改id为question_id
        if (this.questions[i].last_question === this.questions[index-1].id) {
          this.questions[i].last_option = 0;
          this.questions[i].last_question = 0;
          this.questions[i].is_shown = true;
        }
      }
    },
    // 关联信息存在性判断
    isExistRelation: function () {
      for (let i=0; i<this.questions.length; i++) {
        if (this.questions[i].last_question !== 0) {
          return true;
        }
      }
      return false;
    },
    // 监听：全局删除关联信息
    closeGlobalLogic: function(state) {
      if(!state && this.isExistRelation()) {
        this.$confirm('检测到您已为题目添加关联，关闭设置将会删除所有关联信息，是否继续？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteGlobalRelation();
          this.$message.info("关联信息已全部删除");
        }).catch(() => {
          this.isLogic = true;
          this.$message.info("取消操作");
        });
      }
    },
    // 删除全局关联信息
    deleteGlobalRelation: function () {
      for (let i=0; i<this.questions.length; i++) {
        this.questions[i].last_question = 0;
        this.questions[i].last_option = 0;
        this.questions[i].is_shown = true;
      }
    },
  },
  computed: {
    questionsFilter: function () {
      let questions = this.questions;
      let arr = [{
        question_id: 0,
        id: 0,
        type: '',
        title: '不设置关联题目',
        must: false, // 是否必填
        is_shown: true,   // 是否显示
        last_question: 0,   // 前导问题
        last_option: 0,     // 前导选项
        description: '', // 问题描述
        options:[
          {
            title: '', // 选项标题
            id: 0 // 选项id
          }
        ],
        row: 1, // 填空区域行数
        score: 5, // 最大评分
      }];
      for (let i=0; i<this.logicIndex; i++) {
        if (questions[i].type === "radio" || questions[i].type === "checkbox") {
          arr.push(questions[i]);
        }
      }
      return arr;
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
.investigation .linkDialog{
  text-align: left;
}
.investigation .container {
  padding: 0;
  height: auto;
  min-height: 610px;
}

.investigation header {
  padding: 0 100px;
}

.investigation .el-container {
  padding: 0 100px;
}

.investigation .side {
  border-top: solid 1px #e3e3e3;
  border-right: solid 1px #e3e3e3;
  background: #FFFFFF;
}

.investigation .main {
  border-top: solid 1px #e3e3e3;
  background: #FFFFFF;
}

.investigation .edit {
  margin-top: 0;
  overflow: auto;
  height: 550px;
}

.investigation .outline {
  overflow: auto;
  height: 550px;
}

.investigation .ques-type {
  padding: 15px 0;
  font-size: 16px;
  border-bottom: dashed #e3e3e3 1px;
}

.investigation .type-icon {
  color: #1687fd;
  display: inline-block;
}

.investigation .type-icon:hover {
  color: #409EFF;
  cursor: pointer;
}

.investigation .el-tabs__nav-scroll {
  text-align: center;
  height: 60px;
  margin: 0 60px;
}

.investigation .el-tabs__item {
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

.investigation .el-tabs__header {
  margin: 0;
}

.investigation .el-tree-node__content {
  padding-left: 10px !important;
  height: 40px;
}

.investigation .main {
  max-height: 610px;
}

.investigation .ques .title {
  font-size: 28px;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 26px;
}

.investigation .ques .description {
  text-align: left;
  font-size: 16px;
  padding-bottom: 30px;
  color: black;
  line-height: 30px;
}

.investigation .ques-block {
  padding-bottom: 15px;
  border-top: solid #e3e3e3 1px;
}

.investigation .ques-block:hover {
  background: #f5f5f5;
  transition: .3s;
}

.investigation .ques-block .must {
  font-weight: normal;
  color: crimson;
}

.investigation .block-title {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 20px 10px 10px;
  font-weight: bold;
}

.investigation .block-description {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 5px;
  padding-bottom: 15px;
  padding-left: 10px;
  color: #969696;
}

.investigation .block-choice {
  text-align: left;
  /*border: solid 1px black;*/
  font-size: 16px;
  padding: 5px 10px 10px;
}

.investigation .el-button-group>.el-button:first-child {
  border-radius: 0 0 0 8px;
}

.investigation .el-button-group>.el-button:last-child {
  border-radius: 0 0 8px 0;
}

.investigation .block-button .el-button {
  background: #b9b9b9;
  border: transparent;
  padding: 12px 16px;
  font-size: 16px;
}

.investigation .block-button .el-button:hover {
  background: #989898;
  border: transparent;
}

.investigation .bt {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.investigation .block-choice .el-textarea__inner {
  max-height: 100px;
}
.investigation .dialog{
  text-align: left;
  font-size: large;
}
.investigation .addOptionButton{
  display: inline-block;
  margin-left: 100px;
}
.investigation .deleteOptionButton{
  margin-left: 20px;
}

.investigation .logic-description {
  margin-top: -15px;
  margin-bottom: 30px;
  text-align: left;
  padding-left: 6px;
  font-size: 14px;
  color: #aaaaaa;
}

.investigation .important {
  color: crimson;
}

.investigation .logic-title {
  font-size: 16px;
  font-weight: bold;
  padding-left: 12px;
  padding-bottom: 30px;
}

.investigation .logic-bt {
  text-align: center;
}

.investigation .logic-form .el-input--suffix .el-input__inner {
  width: 620px;
}

.investigation .logic-info {
  color: #aaaaaa;
  padding-top: 2px;
  padding-left: 12px;
  padding-bottom: 25px;
}

.investigation .block-relation {
  text-align: right;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding-top: 8px;
  padding-left: 10px;
  color: #1687fd;
}
</style>