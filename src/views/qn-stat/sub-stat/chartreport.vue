<template>
<div id='sum'>
    <div >
        <h1 >图表报告</h1>
    </div>
    <div >
        <el-card class="box-card investigation">
        <div slot="header" class="clearfix" style="display:inline">
            <h3 style="display:inline">问题{{nowid}}</h3>
            <div v-if="nowid!=1" style="display:inline">
            <el-button style="float: left; padding: 3px 0" type="text" @click="frontpage">上一页</el-button>
            </div>
            <div v-else style="display:inline">
            <el-button disabled style="float: left; padding: 3px 0" type="text">上一页</el-button>
            </div>
            <div v-if="nowid!=questions.length" style="display:inline">
            <el-button style="float: right; padding: 3px 0" type="text" @click="nextpage">下一页</el-button>
            </div>
            <div v-else style="display:inline">
            <el-button disabled style="float: right; padding: 3px 0" type="text">下一页</el-button>
            </div>
        </div>
        <div id="que">
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
        </div>

        <div>
        <div v-if="item.type!='text'">
        <div style="margin: 20px; float: left; clear:both" >
        <el-radio-group v-model="radio2" size="medium">
            <el-radio-button label="饼图" @click.native="pieswi"></el-radio-button>
            <el-radio-button label="柱状图" @click.native="histoswi"></el-radio-button>
            <el-radio-button label="折线图" @click.native="lineswi"></el-radio-button>
        </el-radio-group>
        </div>
        <div style="clear:both;">
            <histogram3 v-if="choose==2"></histogram3>
            <linechart3 v-else-if="choose==3"></linechart3>
            <piechart3 v-else></piechart3>
        </div>        
        </div>
        <div v-else>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="num"
                label="编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="answer"
                label="文本答案">
                </el-table-column>
            </el-table>
        </div>
        </div>
        </el-card>
    </div>
</div>
</template>

<script>
import histogram3 from '../Echart/histogram3.vue'
import linechart3 from '../Echart/linechart3.vue'
import piechart3 from '../Echart/piechart3.vue'
export default{
    components:{
    histogram3,
    linechart3,
    piechart3
    },
    data() {
        return{
        nowid: 1,
        item:{},
        radio2: '饼图',
        choose: 1,
        tableData:[
        {
            num: 1,
            answer: '下次一定',
        },
        {
            num:2,
            answer:'tired'
        }
        ],
        questions:[
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
        ]
        }
    },
    created: function () {
    this.item=this.questions[this.nowid-1]
    },
    methods:{
        frontpage: function(){
            this.nowid-=1,
            this.item=this.questions[this.nowid-1]
        },
        nextpage: function(){
            this.nowid+=1,
            this.item=this.questions[this.nowid-1]
        },
        pieswi: function(){
            this.choose=1
        },
        histoswi: function(){
            this.choose=2
        },
        lineswi: function(){
            this.choose=3
        }
    }
}
</script>


<style scoped>
    #sum{
        width: 90%;
        /* background-color: cyan; */
    }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 20px;
  }

.investigation .must {
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

/* #que{
    background-color: rgb(197, 224, 255);
    height: 250px;
} */
</style>