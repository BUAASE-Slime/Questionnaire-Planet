<template>
    <div id='sum'>
        <div><h1>交叉分析</h1></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="display: inline; float:left; margin-left:300px">
                    <span>定义行</span><br>
                      <el-select v-model="value1" placeholder="请选择">
                        <el-option
                        v-for="item in questions"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: inline; float:right; margin-right:300px" >
                    <span>定义列</span><br>
                      <el-select v-model="value2" placeholder="请选择">
                        <el-option
                        v-for="item in questions"
                        :key="item.value2"
                        :label="item.label"
                        :value="item.value2">
                        </el-option>
                    </el-select>
                </div>
                <div style="clear:both;">
                    <el-button type="primary" @click="anlysis">分析</el-button>
                </div>
            </div>
            <div v-if="ans" v-loading="loading">
              <div>
                <span class="axis" style="margin-top:10px; margin-bottom:10px">x: {{questions[value1-1].label}}</span>
                <i class="el-icon-sort"></i>
                <span class="axis" style="margin-bottom:20px; margin-top: 10px">y: {{questions[value2-1].label}}</span>
              </div>
              <div>
              <el-table style="width: 100%" border :data="tableData" >
                <template v-for="(item,index) in tableHead">
                  <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
                </template>
              </el-table>
              </div>
            </div>
            <div>
              <div style="margin: 20px; float: left; clear:both" >
                    <el-radio-group v-model="radio3" size="medium">
                      <el-radio-button label="柱状图" @click.native="histoswi"></el-radio-button>
                      <el-radio-button label="折线图" @click.native="lineswi"></el-radio-button>
                      <el-radio-button label="雷达图" @click.native="rayswi"></el-radio-button>
                    </el-radio-group>
                  </div>
                  <div style="clear:both;">
                      <histogram4 v-if="choose==1"></histogram4>
                      <linechart4 v-else-if="choose==2"></linechart4>
                      <raychart4 v-else></raychart4>
                  </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import histogram4 from '../Echart/histogram4.vue'
import linechart4 from '../Echart/linechart4.vue'
import raychart4 from '../Echart/raychart4.vue'
  export default {
    components:{
    histogram4,
    linechart4,
    raychart4
    },
    data() {
      return {
        radio3: "柱状图",
        choose:1,
        ans: false,
        tableHead:[],
        tableData: [],
        questions: [],
        value1: '',
        value2: '',
        loading: true,
      }
    },
    methods:{
        rayswi: function(){
            this.choose=3
        },
        histoswi: function(){
            this.choose=1
        },
        lineswi: function(){
            this.choose=2
        },
      anlysis: function(){
        this.ans = true;

        const formData = new FormData();
        var id_1 = this.questions[this.value1-1].question_id;
        var id_2 = this.questions[this.value2-1].question_id;
        // console.log(id_1);
        // console.log(id_2);
        formData.append("question_id_1", id_1);
        formData.append("question_id_2", id_2);
        this.$axios({
          method: 'post',
          url: '/sm/cross/analysis',
          data: formData,
        })
        .then(res => {
          if (res.data.status_code === 1) {
            this.tableHead = res.data.tableHead;
            this.tableData = res.data.tableData;
            this.loading = false;
            console.log(this.tableHead);
            console.log(this.tableData);
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn/question/analysis',
        data: formData,
      })
      .then(res => {
        if (res.data.status_code === 1) {
          this.questions = res.data.questions;
          console.log(this.questions);
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
    #sum{
        width: 90%;
        /* background-color: cyan; */
    }
    .box-card{
        margin: 20px;
    }
    .el-select{
        margin: 10px;
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
  .axis{
    display: block;
    font-size: 16px;
    color: #969696;
    /* margin: 20px; */
  }
</style>