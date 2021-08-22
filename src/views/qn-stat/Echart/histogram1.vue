<template>
    <div>
        <div id="myChart1" class="chart-view"></div>
    </div>
</template>

<script>
var that;
export default {
  name: 'echart',
  data () {
    return {
      chart1_title: '',
      chart1_dataName:'填写人数',
      chart1_name:null,
      chart1_data:null,
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
                data:that.chart1_name,
                name: '日期'
            },
            yAxis: {
                type: 'value',
                name: '填写人数',
                axisLabel: {
                    formatter: '{value} '
                }
            },
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
  width: 500px;
  height: 500px;
}


.chart-view-4{
  margin: 20px auto;
  width: 800px;
  height: 600px;
}
</style>