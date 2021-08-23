<template>
    <div id='sum'>
        <div><h1>交叉分析</h1></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="display: inline; float:left; margin-left:300px">
                    <span>定义行</span><br>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: inline; float:right; margin-right:300px" >
                    <span>定义列</span><br>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="clear:both;">
                    <el-button type="primary">分析</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">

                    <el-table-column
                    v-for= "(item,index) in options[0].answer " :key="index"
                    :prop="item"
                    :label=item.ans
                    >
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        //   x: 1,
        // tableData:[
        //     {
        //         item0:10,
        //         item1:11,
        //         item2:11
        //     }
        // ],
        options: [{
          value: 1,
          label: '黄金糕如何',
          answers:[
              {ans:'不错',amount: 10},
              {ans:'非常不错',amount: 5},
              {ans:'不好吃',amount: 3},
          ]
        }, {
          value: 2,
          label: '双皮奶如何',
            answers:[
              {ans:'不错',amount: 10},
              {ans:'非常不错',amount: 5},
              {ans:'不好吃',amount: 3},
          ]
        }, {
          value: 3,
          label: '蚵仔煎如何',
            answers:[
              {ans:'不错',amount: 4},
              {ans:'非常不错',amount: 7},
              {ans:'不好吃',amount: 2},
          ]
        }, {
          value: 4,
          label: '龙须面如何',
            answers:[
              {ans:'不错',amount: 3},
              {ans:'非常不错',amount: 3},
              {ans:'不好吃',amount: 9},
          ]
        }, {
          value: 5,
          label: '北京烤鸭如何',
            answers:[
              {ans:'不错',amount: 1},
              {ans:'非常不错',amount: 2},
              {ans:'不好吃',amount: 6},
          ]
        }],
        value: ''
      }
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