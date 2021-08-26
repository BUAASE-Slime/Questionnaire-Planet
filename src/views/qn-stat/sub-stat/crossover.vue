<template>
    <div id='sum'>
        <div><h1>交叉分析</h1></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="display: inline; float:left; margin-left:300px">
                    <span>定义行</span><br>
                      <el-select v-model="value1" placeholder="请选择">
                        <el-option
                        v-for="item in options"
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
                        v-for="item in options"
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
            <div v-if="ans">
                <el-table style="width: 100%" border :data="tableData" :formatter="stateFormat">
                  <template v-for="(item,index) in tableHead">
                    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
                  </template>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ans: false,
        tableHead:[
            {
              column_name: "column_0",column_comment:"子问题"
            },
            {
              column_name: "column_1",column_comment:"不错"
            },
            {
              column_name: "column_2",column_comment:"非常不错"
            },
            {
              column_name: "column_3",column_comment:"难吃"
            }
        ],
        tableData: [{
            column_1: '3(10.00%)',
            column_0: '不错',
            column_2: '4(20.00%)',
            column_3: '1(3.33%)',
          },
          {
            column_1: '3(10.00%)',
            column_0: '非常不错',
            column_2: '4(20.00%)',
            column_3: '1(3.33%)',
          },
          {
            column_1: '3(10.00%)',
            column_0: '难吃',
            column_2: '4(20.00%)',
            column_3: '1(3.33%)',
          },
          {
            column_1: '3(10.00%)',
            column_0: '一般',
            column_2: '4(20.00%)',
            column_3: '1(3.33%)',
          },],
        options: [{
          value1: 1,
          value2:1,
          label: '黄金糕如何',
          answers:[
              {ans:'不错',amount: 10},
              {ans:'非常不错',amount: 5},
              {ans:'不好吃',amount: 3},
          ]
        }, {
          value1: 2,
          value2: 2,
          label: '双皮奶如何',
            answers:[
              {ans:'不错',amount: 10},
              {ans:'非常不错',amount: 5},
              {ans:'不好吃',amount: 3},
          ]
        }, {
          value1: 3,
          value2: 3,
          label: '蚵仔煎如何',
            answers:[
              {ans:'不错',amount: 4},
              {ans:'非常不错',amount: 7},
              {ans:'不好吃',amount: 2},
          ]
        }, {
          value1: 4,
          value2: 4,
          label: '龙须面如何',
            answers:[
              {ans:'不错',amount: 3},
              {ans:'非常不错',amount: 3},
              {ans:'不好吃',amount: 9},
          ]
        }, {
          value1: 5,
          value2: 5,
          label: '北京烤鸭如何',
            answers:[
              {ans:'不错',amount: 1},
              {ans:'非常不错',amount: 2},
              {ans:'不好吃',amount: 6},
          ]
        }],
        value1: '',
        value2: ''
      }
    },
    methods:{
      anlysis: function(){
        this.ans=true
      },
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
</style>