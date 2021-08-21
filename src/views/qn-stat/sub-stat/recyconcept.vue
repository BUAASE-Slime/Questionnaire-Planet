<template>
    <div id='sum'>
        <div id=title>
            <h1>问卷回收量</h1>
        </div>
        <div id="chartswitch"  >
            <el-radio-group v-model="radio2" size="medium">
            <el-radio-button label="柱状图" ></el-radio-button>
            <el-radio-button label="折线图"></el-radio-button>
            </el-radio-group>
        </div>
        <div>
            <div style="margin-left: 300px">
            <span>总回收量</span>
            <span>日回收量</span>
            <span>周回收量</span>
            </div>
            <br>
            <h2 style="display: inline;">{{sum_collect}}</h2>
            <h2 style="display: inline;">{{day_collect}}</h2>
            <h2 style="display: inline;">{{week_collect}}</h2>
        </div>
        <div>
            <div id="myChart1" class="chart-view"></div>
        </div>
    </div>
</template>

<script>
var that;
export default {
  name: 'echart',
  data () {
    return {
      chart1_title: '周视图',
      chart1_dataName:'填写人数',
      chart1_name:null,
      chart1_data:null,
      sum_collect: 115,
      day_collect: 3,
      week_collect: 104
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    that = this

    that.chart1_name =  ["8.15","8.16","8.17","8.18","8.19","8.20","8.21"];
    that.chart1_data =  [5, 20, 36, 10, 10, 20, 3];
  },
  mounted(){
    //页面加载完成后,才执行
    that.showChart1();
  },
  methods: {
    showChart1()
    {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = that.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
            title: { text: that.chart1_title },
            tooltip: {},
            xAxis: {
                data:that.chart1_name
            },
            yAxis: {},
            series: [{
                name: that.chart1_dataName,
                type: 'bar',
                data:that.chart1_data,
            }]
        });
    },
  }
}
</script>

<style scoped>
    #sum{
        width: 90%;
        /* background-color: cyan; */
    }
    h1{
        margin: 20px 50px;

    }
    #chartswitch{
        width: 100%;
    }
    .el-radio-group{
        /* position: absolute;
        right: 80px; */
        width: 300px;
        float: right;
    }
    #myChart1{
        vertical-align: middle;
    }
    span{
        font-size: 16px;
        padding: 0 50px;
    }
    h2{
        padding: 30px 70px;
    }


.page_view
{
  padding:20px 3%;
  text-align: center;
}

.title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.chart-view{
  margin: 20px auto;
  width: 400px;
  height: 400px;
}


.chart-view-4{
  margin: 20px auto;
  width: 800px;
  height: 600px;
}
</style>