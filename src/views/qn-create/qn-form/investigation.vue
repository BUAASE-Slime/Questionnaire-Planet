<template>
  <div class="investigation">
    <el-header class="header">
      <edit-header
          :title="title"
          :description="description"
          v-on:titleChanged="changeTitle($event)"
          v-on:descriptionChanged="changeDescription($event)"
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
                <el-tree :data="outline" :props="defaultProps"></el-tree>
              </div>
            </el-tab-pane>

        </el-tabs>
      </el-aside>

      <el-main class="main">
        <div class="ques">

          <div class="title">
            {{ title }}
          </div>
          <div class="description">
            &emsp;&emsp;{{ description }}
          </div>
          <div class="content">
            <el-row class="ques-block" v-for="item in questions" :key="item.num" @mouseover.native="hoverItem=item.id">

              <el-col :span="17" class="block-content">
                <div class="block-title">
                  {{ item.id }}. {{ item.title }} <span class="must" v-if="item.must">(必填)</span>
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

                  <!--                  评分-->
                  <el-rate v-if="item.type==='mark'"
                           v-bind="ans.id"
                           :max="item.score">
                  </el-rate>

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
    <el-dialog :title="qsEditDialogTitle" :visible.sync="qsEditDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="dialog" >
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


        <template v-if="willAddQuestion.type==='text'">
          <el-form-item label="填空">
            <el-input type="textarea"
                      :rows="willAddQuestion.row"  resize="none"></el-input>
          </el-form-item>
          <el-form-item label="行数">
            <el-input-number v-model="willAddQuestion.row" :min="1" :max="10" ></el-input-number>
          </el-form-item>
        </template>

        <template v-if="willAddQuestion.type==='mark'">
          <el-form-item label="最大分数">
            <el-input-number v-model="willAddQuestion.score" :min="1" :max="10" ></el-input-number>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center">
                  <el-row>
                    <el-button :span="6" type="primary" @click="dialogConfirm">确 定</el-button>
                    <el-button :span="6" @click="dialogCancel">取 消</el-button>
                  </el-row>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import editHeader from "../../../components/header/editHeader";

export default {
  name: "investigation",
  data() {
    return {
      editIndex:0,
      selectDisAble:false,
      hoverItem:0,
      activeName: 'first',
      title: this.$route.query.title,
      description: '这是一张测试基本功能的问卷。现阶段完成功能有：问卷题目和说明的修改，不同种问题类型的添加，以及单个问题的五个快捷操作的功能实现。',
      preOutline: {

      },
      outline: [
        {
          id: '1',
          label: '1. 这是一个什么网站？',
        },
        {
          id: '2',
          label: '2. 软工小学期助教都有谁？',
        },
        {
          id: '3',
          label: '3. 软工小学期累不累',
        },
        {
          id: '4',
          label: '4. 您对小学期的评价如何？',
        },
        {
          id: '5',
          label: '5. 给小学期打个分吧~',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      questions: [
        {
          id: '1',
          type: 'radio',
          title: '这是一个什么网站？',
          must: true,
          options: [{
            id: '1',
            title: '问卷系统',
          }, {
            id: '2',
            title: '出版系统',
          }],
          row: '',
          score: '',
        },
        {
          id: '2',
          type: 'checkbox',
          title: '软工小学期助教都有谁？',
          must: false,
          options: [{
            id: '1',
            title: 'ZYH',
          }, {
            id: '2',
            title: 'LKW',
          },{
            id: '3',
            title: 'ZXH',
          }, {
            id: '4',
            title: 'HZH',
          }],
          row: '',
          score: '',
        },
        {
          id: '3',
          type: 'radio',
          title: '软工小学期累不累',
          must: false,
          options: [{
            id: '1',
            title: '累',
          }, {
            id: '2',
            title: '非常累',
          }],
          row: '',
          score: '',
        },
        {
          id: '4',
          type: 'text',
          title: '您对小学期的评价如何？',
          must: false,
          options: [{
            id: '',
            title: '',
          }],
          row: 3,
          score: '',
        },
        {
          id: '5',
          type: 'mark',
          title: '给小学期打个分吧~',
          must: true,
          options: [{
            id: '',
            title: '',
          }],
          row: 1,
          score: 10,
        },
      ],
      qsEditDialogVisible:false,
      qsEditDialogTitle:"新建题目",
      willAddQuestion:{
        id: '0',
        type:'',
        title:'',
        must:false, //是否必填
        options:[
          {
            title:'', //选项标题
            id: '0' //选项id
          }
        ],
        row:1, //填空区域行数
        score:10, //最大评分
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
    }
  },
  components: {
    editHeader,
  },
  methods: {
    edit:function (index){
      index--;
      this.willAddQuestion={
        id:this.questions[index].id,
        type:this.questions[index].type,
        title:this.questions[index].title,
        must:this.questions[index].must,
        options:this.questions[index].options,
        row:this.questions[index].row,
        score:this.questions[index].score,
      };
      this.editIndex=index;
      this.selectDisAble=true;
      this.qsEditDialogTitle="编辑题目";
      this.qsEditDialogVisible=true;
    },
    dialogConfirm(){
      let index=this.editIndex;
      this.qsEditDialogVisible=false;
      if(this.qsEditDialogTitle==="编辑题目"){
        this.questions[index].id=this.willAddQuestion.id;
        this.questions[index].row=this.willAddQuestion.row;
        this.questions[index].must=this.willAddQuestion.must;
        this.questions[index].title=this.willAddQuestion.title;
        this.questions[index].options=this.willAddQuestion.options;
        this.questions[index].score=this.willAddQuestion.score;
        this.qsEditDialogTitle="";
        // 大纲更新
        this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
        // 重置
        this.willAddQuestion={
          id:0,
          type:'',
          title:'',
          must:false,
          options:[
            {
              title:'', //选项标题
              id: '0' //选项id
            }],
          row:1,
          score:10,
        };
        this.selectDisAble=false;
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }
      else{
        this.willAddQuestion.id = this.questions.length + 1;
        // 大纲更新
        this.updateOutline(this.willAddQuestion.id, this.willAddQuestion.title);
        this.questions.push(this.willAddQuestion);
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        // 重置
        this.willAddQuestion={
          id:0,
          type:'',
          title:'',
          must:false,
          options:[
            {
              title:'', //选项标题
              id: '0' //选项id
            }],
          row:1,
          score:10,
        };
      }
    },
    dialogCancel(){
      if(this.qsEditDialogTitle==="编辑题目"){
        this.qsEditDialogTitle="";
        this.willAddQuestion={
          id:0,
          type:'',
          title:'',
          must:false,
          options:[
            {
              title:'', //选项标题
              id: '0' //选项id
            }],
          row:1,
          score:10,
        };
      }
      this.qsEditDialogVisible=false;
      this.selectDisAble=false;
    },
    typeChange(value){
      this.willAddQuestion.type=value;
    },
    addOption(){
      this.willAddQuestion.options.push({
        title:'',
        id:0,
      });
    },
    deleteOption(index){
      this.willAddQuestion.options.splice(index,1);
    },
    changeTitle: function (value) {
      this.title = value;
    },
    changeDescription: function (value) {
      this.description = value;
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
      questions.push(temp);

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
  }
}
</script>

<style>
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
  font-size: 18px;
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
</style>