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
                  <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name !== 'id'"></el-table-column>
                </template>
              </el-table>
              </div>
            </div>
            <div v-if="isClick">
              <div style="margin: 20px; float: left; clear:both" >
                    <el-radio-group v-model="radio3" size="medium">
                      <el-radio-button label="柱状图" @click.native="histoswi"></el-radio-button>
                      <el-radio-button label="折线图" @click.native="lineswi"></el-radio-button>
                      <el-radio-button label="雷达图" @click.native="rayswi"></el-radio-button>
                    </el-radio-group>
                  </div>
                  <div style="clear:both;">
                      <histogram4
                          v-if="choose===1"
                          :dimensions_data="dimensions_data"
                          :source_data="source_data"
                          :series_data="series_data"
                          ref="his"
                      ></histogram4>
                      <linechart4
                          v-else-if="choose===2"
                          :legend_data="legend_data"
                          :x_data="x_data"
                          :series_data="series_data_l"
                          ref="lin"
                      ></linechart4>
                      <raychart4
                          v-else
                          :legend_data="legend_data"
                          :indecatior_data="indecatior_data"
                          :series_data="series_data_r"
                          ref="ray"
                      ></raychart4>
                  </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import histogram4 from '../Echart/histogram4.vue'
import linechart4 from '../Echart/linechart4.vue'
import raychart4 from '../Echart/raychart4.vue'
import toolApi from "@/utils/toolApi";
  export default {
    components:{
    histogram4,
    linechart4,
    raychart4
    },
    mixins: [toolApi],
    data() {
      return {
        isClick: false,
        radio3: "柱状图",
        choose:1,
        ans: false,
        tableHead:[],
        tableData: [],
        questions: [],
        value1: '',
        value2: '',
        loading: true,

        dimensions_data: [],
        source_data: [],
        series_data: [],

        legend_data: [],
        x_data: [],
        series_data_l: [],

        indecatior_data: [],
        series_data_r: [],
      }
    },
    methods:{
      computeRayData() {
        //indecatior_data
        this.indecatior_data.push({
          name: this.x_data[0],
          max: 100,
          axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'},formatter: '{value} %'}
        })
        for (var i=1; i<this.x_data.length; i++) {
          this.indecatior_data.push({
            name: this.x_data[i],
            max: 100
          });
        }
        //series_data_r
        var matrix = [];
        for (var kk=0; kk<this.tableData.length; kk++) {
          var ta = [];
          for (var key in this.tableData[kk])
            ta.push(this.tableData[kk][key]);
          ta.splice(0,1);
          ta.splice(ta.length-1, 1);
          matrix.push(ta);
        }
        for (var ii=0; ii<matrix.length; ii++)
          for (var jj=0; jj<matrix[ii].length; jj++)
            matrix[ii][jj] = parseFloat(this.getStrClear(matrix[ii][jj]));
        for (var k=0; k<this.legend_data.length; k++) {
          this.series_data_r.push({
            name: this.legend_data[k],
            value: matrix.map(function(value) { return value[k]; })
          })
        }
      },
      computeLinData() {
        //legend_data
        for (var i=1; i<this.tableHead.length-1; i++) {
          this.legend_data.push(this.tableHead[i].column_comment);
        }
        //x_data
        for (var j=0; j<this.tableData.length; j++) {
          this.x_data.push(this.tableData[j]['column_0']);
        }
        //series_data_l
        var matrix = [];
        for (var kk=0; kk<this.tableData.length; kk++) {
          var ta = [];
          for (var key in this.tableData[kk])
            ta.push(this.tableData[kk][key]);
          ta.splice(0,1);
          ta.splice(ta.length-1, 1);
          matrix.push(ta);
        }
        for (var ii=0; ii<matrix.length; ii++)
          for (var jj=0; jj<matrix[ii].length; jj++)
            matrix[ii][jj] = parseFloat(this.getStrClear(matrix[ii][jj]));
        for (var k=0; k<this.legend_data.length; k++) {
          this.series_data_l.push({
            name: this.legend_data[k],
            type: 'line',
            data: matrix.map(function(value) { return value[k]; })
          })
        }
      },
      computeHisData() {
        //dimensions_data
        this.dimensions_data.push('choice');
        const column_num = this.tableHead.length-2;
        for (var i=1; i<this.tableHead.length-1; i++) {
          this.dimensions_data.push(this.tableHead[i].column_comment);
        }
        //source_data
        for (var j=0; j<this.tableData.length; j++) {
          var tmp = [];
          for (var key in this.tableData[j])
            tmp.push(this.tableData[j][key]);
          var tmp_dict = { choice: tmp[0] };
          for (var ii=1; ii<tmp.length-1; ii++) {
            tmp_dict[this.dimensions_data[ii]] = parseFloat(this.getStrClear(tmp[ii]));
          }
          this.source_data.push(tmp_dict);
        }
        //series_data
        for (var k=0; k<column_num; k++) {
          this.series_data.push({type: 'bar'});
        }
      },
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

            //-------------------------------compute
            this.isClick = true;
            this.computeHisData();
            this.computeLinData();
            this.computeRayData();

            //-------------------------------mount
            switch (this.choose) {
              case 1:
                this.$refs.his.showChart1();
                break;
              case 2:
                this.$refs.lin.showChart4();
                break;
              case 3:
                this.$refs.ray.showChart2();
                break;
            }
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
      let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn/question/analysis',
        data: formData,
      })
      .then(res => {
        loadingIns.close();
        if (res.data.status_code === 1) {
          this.questions = res.data.questions;
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